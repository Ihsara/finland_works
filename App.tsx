
import React, { useState, useEffect, useRef } from 'react';
// CSS is linked in index.html to avoid bundler errors
// import './styles.css'; 

import Layout from './components/Layout';
import { AppView, Conversation, Message, Sender, UserProfile, LayoutPreference } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import WikiView from './components/views/WikiView';
import ProfileWizard from './components/ProfileWizard';
import { getAllFlattenedArticles } from './data/wikiContent';
import { calculateProfileCompleteness } from './utils/profileUtils';
import { useLanguage } from './contexts/LanguageContext';
import { extractJsonFromText, parseTaggedResponse } from './utils/textUtils';

// Import Views
import { ApiKeyView } from './components/views/ApiKeyView';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { ChatView } from './components/views/ChatView';
import { ProfileDetailView } from './components/views/ProfileDetailView';
import { ProfileEditView } from './components/views/ProfileEditView';
import { HistoryView } from './components/views/HistoryView';
import { CvImportView } from './components/views/CvImportView';
import { SettingsView } from './components/views/SettingsView';

// Configure marked options for basic GitHub Flavored Markdown support
marked.use({
  gfm: true,
  breaks: true
});

const App: React.FC = () => {
  // Use Context for Language
  const { language, t } = useLanguage();

  // Changed default view to LANDING
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  // Multi-Profile State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  
  // Progress State
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  // Wiki State (Refactored to use ID for dynamic language content)
  const [activeWikiArticleId, setActiveWikiArticleId] = useState<string | null>(null);

  // Chat State
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pendingChatQuery, setPendingChatQuery] = useState<string | null>(null);

  // Profile Edit State
  const [yamlInput, setYamlInput] = useState('');

  // App Settings State
  const [layoutMode, setLayoutMode] = useState<LayoutPreference>('windowed');

  // Navigation Refs
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  // Initialization
  useEffect(() => {
    // 1. API Key
    const localKey = Storage.initializeEnv();
    if (localKey) {
      setApiKey(localKey);
    } else if (process.env.API_KEY) {
      setApiKey(process.env.API_KEY);
    }

    // 2. Theme Initialization
    const applyTheme = () => {
        const pref = Storage.getThemePreference();
        const root = document.documentElement;
        if (pref === 'dark') {
            root.classList.add('dark');
        } else if (pref === 'light') {
            root.classList.remove('dark');
        } else {
            // System
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };
    applyTheme();

    // 3. Layout Initialization
    setLayoutMode(Storage.getLayoutPreference());

    // Listen for system changes if preference is 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        if (Storage.getThemePreference() === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', handleChange);

    refreshProfiles();
    
    // Process pending summaries in background
    setTimeout(() => {
        processPendingSummaries();
    }, 1000);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Refresh stats whenever view changes to Dashboard or profile changes
  useEffect(() => {
    if (profile) {
      setProfileCompleteness(calculateProfileCompleteness(profile));
    }
  }, [view, profile]);

  // --- NAVIGATION LOGIC (Swipe & Keyboard) ---
  const handleNavigation = (direction: 'next' | 'prev') => {
      // Priority 1: Inner Wiki Navigation (Article to Article)
      if (view === AppView.WIKI && activeWikiArticleId) {
          const allArticles = getAllFlattenedArticles(language);
          const currentIndex = allArticles.findIndex(a => a.id === activeWikiArticleId);
          
          if (currentIndex === -1) {
              setActiveWikiArticleId(null);
              return;
          }

          if (direction === 'next') {
              if (currentIndex < allArticles.length - 1) {
                  setActiveWikiArticleId(allArticles[currentIndex + 1].id);
              } else {
                  setActiveWikiArticleId(null);
              }
          } else {
              if (currentIndex > 0) {
                  setActiveWikiArticleId(allArticles[currentIndex - 1].id);
              } else {
                  setActiveWikiArticleId(null);
              }
          }
          return; 
      }

      // Priority 2: App View Navigation
      if (![AppView.DASHBOARD, AppView.PROFILE, AppView.WIKI, AppView.CHAT].includes(view)) return;

      // Spatial Map: [PROFILE] <-> [DASHBOARD] <-> [WIKI (Index)] <-> [CHAT]
      if (direction === 'next') { 
          if (view === AppView.PROFILE) setView(AppView.DASHBOARD);
          else if (view === AppView.DASHBOARD) setView(AppView.WIKI);
          else if (view === AppView.WIKI) setView(AppView.CHAT);
          else if (view === AppView.CHAT) setView(AppView.DASHBOARD); 
      } else { 
          if (view === AppView.PROFILE) setView(AppView.DASHBOARD);
          else if (view === AppView.DASHBOARD) setView(AppView.PROFILE);
          else if (view === AppView.WIKI) setView(AppView.DASHBOARD);
          else if (view === AppView.CHAT) setView(AppView.WIKI);
      }
  };

  // Keyboard Navigation
  useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

          if (e.key === 'ArrowLeft') handleNavigation('prev');
          if (e.key === 'ArrowRight') handleNavigation('next');
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
  }, [view, activeWikiArticleId, language]); 

  // Touch Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
      touchStartRef.current = {
          x: e.targetTouches[0].clientX,
          y: e.targetTouches[0].clientY
      };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartRef.current.x - touchEndX;
      const diffY = touchStartRef.current.y - touchEndY;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          if (diffX > 0) handleNavigation('next');
          else handleNavigation('prev');
      }
      touchStartRef.current = null;
  };

  const refreshProfiles = () => {
    const profiles = Storage.getAllProfiles();
    setAllProfiles(profiles);
    
    const active = Storage.getActiveProfile();
    setProfile(active);
    if (active) {
      setYamlInput(Storage.profileToYaml(active));
      setProfileCompleteness(calculateProfileCompleteness(active));
    }
  };

  const processPendingSummaries = async () => {
    const pendingIds = Storage.getPendingSummaries();
    if (pendingIds.length === 0) return;

    const id = pendingIds[0];
    const conv = Storage.getConversation(id);
      
    if (conv && !conv.isSummarized && conv.messages.length > 0) {
        try {
            conv.summaryStatus = 'generating';
            Storage.saveConversation(conv);

            const result = await Gemini.summarizeConversation(conv.messages);
            
            const freshConv = Storage.getConversation(id);
            if (freshConv) {
                freshConv.summary = result.summary;
                freshConv.title = result.title;
                freshConv.isSummarized = true;
                freshConv.summaryStatus = 'completed';
                Storage.saveConversation(freshConv);
                Storage.saveSummary(id, result.summary, result.title);
            }
            Storage.removePendingSummary(id);
            
            setTimeout(() => processPendingSummaries(), 2000);
        } catch (e) {
            console.error(`Failed to summarize ${id}`, e);
            const freshConv = Storage.getConversation(id);
            if (freshConv) {
                freshConv.summaryStatus = 'failed';
                Storage.saveConversation(freshConv);
            }
            Storage.removePendingSummary(id); 
        }
    } else {
        Storage.removePendingSummary(id);
        setTimeout(() => processPendingSummaries(), 100);
    }
  };

  const handleSaveKey = (newKey: string) => {
    if (newKey.trim().length > 10) {
      const key = newKey.trim();
      Storage.saveApiKey(key);
      setApiKey(key);
    }
  };

  const startNewChat = () => {
    const globalPref = Storage.getGlobalLengthPreference();
    
    let initialMessages: Message[] = [];
    
    // If preference is to always ask, inject the question immediately
    if (globalPref === 'ask') {
        initialMessages.push({
            id: uuidv4(),
            sender: Sender.MODEL,
            text: t('chat_ask_length'),
            timestamp: Date.now(),
            structuredData: {
                type: 'interactive_choice',
                data: {
                    message: t('chat_ask_length'),
                    question_header: t('settings_length_label'), 
                    options: [
                        { id: 'short', label: t('settings_opt_short'), value: 'short' },
                        { id: 'long', label: t('settings_opt_long'), value: 'long' }
                    ]
                }
            }
        });
    }

    const newConv: Conversation = {
      id: uuidv4(),
      startTime: Date.now(),
      messages: initialMessages,
      isSummarized: false,
      summaryStatus: 'idle',
      // If a global preference exists (short/long), use it immediately
      responseLength: globalPref !== 'ask' ? globalPref : undefined
    };
    
    setCurrentConversation(newConv);
    setPendingChatQuery(null); 
    Storage.saveConversation(newConv);
    setView(AppView.CHAT);
    return newConv;
  };

  const handleSendMessage = async (messageText: string, contextOverride?: string, conversationOverride?: Conversation, displayLabel?: string) => {
    const conversation = conversationOverride || currentConversation;
    if (!messageText.trim() || !conversation) return;
    
    const activeProfile = profile || Storage.getActiveProfile();
    if (!activeProfile) {
        alert("Please create a profile first so I can help you better.");
        setView(AppView.QUIZ);
        return;
    }

    const globalPref = Storage.getGlobalLengthPreference();
    let effectivePref = conversation.responseLength || (globalPref !== 'ask' ? globalPref : undefined);
    
    // HANDLE LENGTH SELECTION RESPONSE: If no preference set and user sends 'short' or 'long'
    if (!effectivePref && (messageText === 'short' || messageText === 'long')) {
        const newPref = messageText as 'short' | 'long';
        
        // Add User selection message visually using localized label if provided, or fallback
        const selectionMsg: Message = {
            id: uuidv4(),
            sender: Sender.USER,
            text: displayLabel || (messageText === 'short' ? t('settings_opt_short') : t('settings_opt_long')),
            timestamp: Date.now()
        };

        let nextMessages = [...conversation.messages, selectionMsg];
        let nextConv = { ...conversation, messages: nextMessages, responseLength: newPref };

        // Case A: "Ask First" flow completed (User opened chat -> Bot asked -> User answered). No pending query.
        if (!pendingChatQuery) {
            const confirmMsg: Message = {
                id: uuidv4(),
                sender: Sender.MODEL,
                text: t('chat_length_set_confirm'),
                timestamp: Date.now() + 100
            };
            nextConv.messages.push(confirmMsg);
            setCurrentConversation(nextConv);
            Storage.saveConversation(nextConv);
            return; // Stop here, waiting for user's actual question
        } 
        
        // Case B: "Interruption" flow. Pending query exists.
        // Update conversation state, then allow logic to fall through to send the pending query to Gemini.
        effectivePref = newPref;
        messageText = pendingChatQuery; // Swap input for the pending query
        setPendingChatQuery(null);
        
        // Update conversation reference so subsequent logic uses correct history
        setCurrentConversation(nextConv);
        Storage.saveConversation(nextConv);
        conversation.messages = nextMessages; 
        conversation.responseLength = newPref;
    } else {
        // NORMAL FLOW: Add user message
        const userMsg: Message = {
          id: uuidv4(),
          sender: Sender.USER,
          text: displayLabel || messageText, // Use display label if available (e.g. "Design" button clicked)
          timestamp: Date.now()
        };
        const updatedMessages = [...conversation.messages, userMsg];
        let updatedConv = { ...conversation, messages: updatedMessages };
        setCurrentConversation(updatedConv);
        Storage.saveConversation(updatedConv);
        setInputText('');

        // INTERRUPTION CHECK: If preference is still needed and we aren't in a selection flow
        if (!effectivePref && !pendingChatQuery) {
            setPendingChatQuery(messageText); 
            
            const botQuestion: Message = {
                id: uuidv4(),
                sender: Sender.MODEL,
                text: t('chat_ask_length'),
                timestamp: Date.now() + 100,
                structuredData: {
                    type: 'interactive_choice',
                    data: {
                        message: t('chat_ask_length'),
                        question_header: t('settings_length_label'),
                        options: [
                            { id: 'short', label: t('settings_opt_short'), value: 'short' },
                            { id: 'long', label: t('settings_opt_long'), value: 'long' }
                        ]
                    }
                }
            };
            
            updatedConv = { ...updatedConv, messages: [...updatedMessages, botQuestion] };
            setCurrentConversation(updatedConv);
            Storage.saveConversation(updatedConv);
            return; // Stop and wait for user selection
        }
    }

    let queryToSend = messageText;
    let finalPref = effectivePref;
    
    setIsTyping(true);

    try {
      const progress = Storage.getWikiProgress(activeProfile.id);
      const allArticles = getAllFlattenedArticles(language);

      const messagePayload = contextOverride 
         ? `${contextOverride}\n\nUSER QUESTION: ${queryToSend}` 
         : queryToSend;

      const responseText = await Gemini.sendMessageToGemini(
        conversation.messages, // Use current state of messages
        messagePayload, 
        activeProfile,
        progress,
        allArticles,
        language,
        finalPref as 'short' | 'long' | undefined
      );

      // Use New XML Tag Parser logic primarily
      const parsed = parseTaggedResponse(responseText);
      
      let modelMsg: Message = {
        id: uuidv4(),
        sender: Sender.MODEL,
        text: parsed.text || '',
        timestamp: Date.now()
      };

      if (parsed.structuredData) {
          // 1. It was a new format XML interactive response
          modelMsg.structuredData = parsed.structuredData as any;
      } else {
          // 2. Fallback: Check if it was an old JSON response (e.g. Networking Interception Link)
          const json = extractJsonFromText(responseText);
          if (json && (json.type === 'navigation_link' || json.type === 'interactive_choice')) {
              modelMsg.structuredData = json;
              if (json.data?.message) {
                  modelMsg.text = json.data.message;
              }
          }
      }

      // Ensure text is at least empty string if undefined
      if (!modelMsg.text) modelMsg.text = "";

      // Re-fetch conversation from state or use local reference carefully
      const msgsToAppendTo = conversation.messages; 
      const finalMessages = [...msgsToAppendTo, modelMsg];
      const finalConv = { ...conversation, messages: finalMessages };
      
      setCurrentConversation(finalConv);
      Storage.saveConversation(finalConv);

    } catch (error: any) {
      alert("Error generating response: " + error.message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartChatWithContext = (context: string, sentence: string) => {
     const conversation = startNewChat();
     const userPrompt = t('chat_prompt_context_inquiry', { sentence });
     handleSendMessage(userPrompt, context, conversation);
  };

  const handleEndSession = async () => {
    if (!currentConversation) return;

    const convId = currentConversation.id;

    if (currentConversation.messages.length > 0 && apiKey) {
        const updatedConv: Conversation = { 
            ...currentConversation, 
            summaryStatus: 'generating' 
        };
        Storage.saveConversation(updatedConv);
        Storage.addPendingSummary(convId);
        processPendingSummaries();
    }

    setCurrentConversation(null);
    setView(AppView.DASHBOARD);
  };

  const handleSwitchProfile = (id: string) => {
    Storage.setActiveProfileId(id);
    refreshProfiles();
  };

  const handleSaveProfileEdit = () => {
    try {
      const updated = Storage.saveProfileFromYaml(yamlInput);
      setProfile(updated);
      refreshProfiles(); 
      setView(AppView.PROFILE); 
    } catch (e) {
      alert("Invalid YAML format.");
    }
  };

  const handleCreateNewProfile = () => {
    setProfile(null); 
    setView(AppView.QUIZ);
  };

  const handleWizardComplete = (newProfile: UserProfile) => {
    Storage.saveProfile(newProfile, true);
    Storage.setActiveProfileId(newProfile.id);
    refreshProfiles();
    setView(AppView.DASHBOARD);
  };

  const handleLoadDemoProfile = (silent: boolean = false) => {
    try {
      const profiles = Storage.getAllProfiles();
      let targetProfile = profiles.find(p => p.id === 'demo-gabriela');
      if (!targetProfile) {
         try {
             targetProfile = Storage.createDemoProfile();
         } catch (e) {
             console.error("Failed to create demo profile", e);
             if (!silent) alert("Could not load the sample profile.");
             return;
         }
      }
      if (targetProfile) {
        Storage.setActiveProfileId(targetProfile.id);
        refreshProfiles();
        setView(AppView.DASHBOARD);
      }
    } catch (e) {
      console.error("Error loading demo profile:", e);
      if(!silent) alert("Sorry, could not load the demo profile.");
    }
  };

  const handleResetData = () => {
      if (window.confirm("Are you sure you want to erase all data and cache? This action cannot be undone. The app will reset.")) {
          Storage.resetApplicationData();
          window.location.reload();
      }
  };

  // New handler to navigate to specific articles
  const handleNavigateToArticle = (articleId: string) => {
      setActiveWikiArticleId(articleId);
      setView(AppView.WIKI);
  };

  if (!apiKey) {
    return (
      <Layout layoutMode={layoutMode}>
        <ApiKeyView onSave={handleSaveKey} />
      </Layout>
    );
  }

  return (
    <Layout onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} layoutMode={layoutMode}>
      {view === AppView.LANDING && (
        <LandingView 
          profile={profile}
          onStartQuiz={() => {
            setProfile(null);
            setView(AppView.QUIZ);
          }}
          onOpenGuide={() => setView(AppView.DASHBOARD)}
          onBrowseWiki={() => setView(AppView.WIKI)}
          onStartChat={() => startNewChat()}
          onLoadDemo={handleLoadDemoProfile}
          onReset={handleResetData}
          onClearKey={() => setApiKey(null)}
          onSetGuest={(p) => setProfile(p)}
        />
      )}

      {view === AppView.DASHBOARD && (
        <DashboardView 
          profile={profile}
          profileCompleteness={profileCompleteness}
          onNavigateToProfile={() => setView(AppView.PROFILE)}
          onNavigateToWiki={() => setView(AppView.WIKI)}
          onNavigateToQuiz={() => setView(AppView.QUIZ)}
          onStartChat={() => startNewChat()}
          onNavigateToHistory={() => setView(AppView.HISTORY)}
          onNavigateToCvImport={() => setView(AppView.CV_IMPORT)}
          onNavigateToSettings={() => setView(AppView.SETTINGS)}
        />
      )}

      {view === AppView.SETTINGS && (
        <SettingsView 
          onBack={() => setView(AppView.DASHBOARD)}
          onToggleLayout={(mode) => setLayoutMode(mode)}
        />
      )}

      {view === AppView.HISTORY && (
        <HistoryView 
          onBack={() => setView(AppView.DASHBOARD)}
        />
      )}

      {view === AppView.CV_IMPORT && (
        <CvImportView 
          onBack={() => setView(AppView.DASHBOARD)}
          onProfileUpdated={refreshProfiles}
        />
      )}

      {view === AppView.WIKI && (
        <WikiView 
          profile={profile}
          onClose={() => activeWikiArticleId ? setActiveWikiArticleId(null) : setView(AppView.PROFILE)}
          activeArticleId={activeWikiArticleId}
          onArticleSelect={(article) => setActiveWikiArticleId(article?.id || null)}
          onStartChatWithContext={handleStartChatWithContext}
        />
      )}

      {view === AppView.QUIZ && (
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => setView(AppView.DASHBOARD)} 
          initialData={profile} 
        />
      )}

      {view === AppView.PROFILE_EDIT && (
        <ProfileEditView 
          profile={profile}
          yamlInput={yamlInput}
          onYamlChange={setYamlInput}
          onSave={handleSaveProfileEdit}
          onCancel={() => setView(AppView.PROFILE)}
          onLoadDemo={() => handleLoadDemoProfile(false)}
        />
      )}

      {view === AppView.CHAT && currentConversation && (
        <ChatView 
          conversation={currentConversation}
          isTyping={isTyping}
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={(text, label) => handleSendMessage(text || inputText, undefined, undefined, label)}
          onEndSession={handleEndSession}
          onNavigateToArticle={handleNavigateToArticle}
        />
      )}

      {view === AppView.PROFILE && (
        <ProfileDetailView 
          profile={profile}
          profileCompleteness={profileCompleteness}
          allProfiles={allProfiles}
          onNavigateBack={() => setView(AppView.DASHBOARD)}
          onSwitchProfile={handleSwitchProfile}
          onCreateProfile={handleCreateNewProfile}
          onEditVisual={() => setView(AppView.QUIZ)}
          onEditYaml={() => setView(AppView.PROFILE_EDIT)}
          onNavigateToWiki={() => setView(AppView.WIKI)}
        />
      )}
    </Layout>
  );
};

export default App;
