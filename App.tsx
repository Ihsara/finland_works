
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { AppView, Conversation, Message, Sender, UserProfile, GUEST_PROFILE, LanguageCode } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import WikiView from './components/views/WikiView';
import ProfileWizard from './components/ProfileWizard';
import { getAllFlattenedArticles, WikiArticle } from './data/wikiContent';
import { SUPPORTED_LANGUAGES, t } from './data/languages';
import { calculateProfileCompleteness } from './utils/profileUtils';

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
  // Changed default view to LANDING
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  // Language State
  const [language, setLanguage] = useState<LanguageCode>('en');
  
  // Multi-Profile State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  
  // Progress State
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  // Wiki State (Lifted for Navigation Control)
  const [activeWikiArticle, setActiveWikiArticle] = useState<WikiArticle | null>(null);

  // Chat State
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pendingChatQuery, setPendingChatQuery] = useState<string | null>(null);

  // Profile Edit State
  const [yamlInput, setYamlInput] = useState('');

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

    // 2. Language
    const storedLang = localStorage.getItem('fw_language') as LanguageCode;
    if (storedLang && SUPPORTED_LANGUAGES.some(l => l.code === storedLang)) {
      setLanguage(storedLang);
    }

    // 3. Theme Initialization
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

  // Update HTML direction for RTL languages
  useEffect(() => {
      const rtlLangs = ['ar', 'fa', 'ku'];
      if (rtlLangs.includes(language)) {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = language;
      } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = language;
      }
  }, [language]);

  // Refresh stats whenever view changes to Dashboard or profile changes
  useEffect(() => {
    if (profile) {
      setProfileCompleteness(calculateProfileCompleteness(profile));
    }
  }, [view, profile, language]);

  // --- NAVIGATION LOGIC (Swipe & Keyboard) ---
  const handleNavigation = (direction: 'next' | 'prev') => {
      // Priority 1: Inner Wiki Navigation (Article to Article)
      if (view === AppView.WIKI && activeWikiArticle) {
          const allArticles = getAllFlattenedArticles(language);
          const currentIndex = allArticles.findIndex(a => a.id === activeWikiArticle.id);
          
          if (currentIndex === -1) {
              setActiveWikiArticle(null);
              return;
          }

          if (direction === 'next') {
              if (currentIndex < allArticles.length - 1) {
                  setActiveWikiArticle(allArticles[currentIndex + 1]);
              } else {
                  setActiveWikiArticle(null);
              }
          } else {
              if (currentIndex > 0) {
                  setActiveWikiArticle(allArticles[currentIndex - 1]);
              } else {
                  setActiveWikiArticle(null);
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
  }, [view, activeWikiArticle]); 

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

    // Process one by one to avoid rate limits
    const id = pendingIds[0];
    const conv = Storage.getConversation(id);
      
    if (conv && !conv.isSummarized && conv.messages.length > 0) {
        try {
            // Update status to generating
            conv.summaryStatus = 'generating';
            Storage.saveConversation(conv);

            // Fetch summary AND title
            const result = await Gemini.summarizeConversation(conv.messages);
            
            // Re-fetch in case state changed
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
            
            // Recursive call for next items with delay
            setTimeout(() => processPendingSummaries(), 2000);
        } catch (e) {
            console.error(`Failed to summarize ${id}`, e);
            // Mark as failed but keep in pending to try again later or manually
            const freshConv = Storage.getConversation(id);
            if (freshConv) {
                freshConv.summaryStatus = 'failed';
                Storage.saveConversation(freshConv);
            }
            // For now, remove it to be safe, user can trigger again via retry logic if we implement it, 
            // but cleaning up prevents infinite retry loops on error.
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

  const handleLanguageSelect = (code: LanguageCode, supported: boolean) => {
    if (supported) {
      setLanguage(code);
      localStorage.setItem('fw_language', code);

      // Force update the active article context to the new language immediately
      if (activeWikiArticle) {
          const allArticles = getAllFlattenedArticles(code);
          const freshArticle = allArticles.find(a => a.id === activeWikiArticle.id);
          if (freshArticle) {
              setActiveWikiArticle(freshArticle);
          }
      }
    } else {
      alert(`We are working on ${code.toUpperCase()} support! Defaulting to English for now.`);
      setLanguage('en');
      localStorage.setItem('fw_language', 'en');
    }
  };

  const startNewChat = () => {
    const newConv: Conversation = {
      id: uuidv4(),
      startTime: Date.now(),
      messages: [],
      isSummarized: false,
      summaryStatus: 'idle'
    };
    setCurrentConversation(newConv);
    setPendingChatQuery(null); // Reset pending query on new chat
    Storage.saveConversation(newConv);
    setView(AppView.CHAT);
    return newConv;
  };

  const handleSendMessage = async (messageText: string, contextOverride?: string, conversationOverride?: Conversation) => {
    const conversation = conversationOverride || currentConversation;
    if (!messageText.trim() || !conversation) return;
    
    const activeProfile = profile || Storage.getActiveProfile();
    if (!activeProfile) {
        alert("Please create a profile first so I can help you better.");
        setView(AppView.QUIZ);
        return;
    }

    // 1. Check Preferences (Global vs Session)
    const globalPref = Storage.getGlobalLengthPreference();
    let effectivePref = conversation.responseLength || (globalPref !== 'ask' ? globalPref : undefined);
    
    // Add user message to UI immediately
    const userMsg: Message = {
      id: uuidv4(),
      sender: Sender.USER,
      text: messageText,
      timestamp: Date.now()
    };
    const updatedMessages = [...conversation.messages, userMsg];
    let updatedConv = { ...conversation, messages: updatedMessages };
    setCurrentConversation(updatedConv);
    Storage.saveConversation(updatedConv);
    setInputText('');

    // --- INTERCEPTION LOGIC START ---
    
    // If no preference set yet, and we are not currently answering the preference question (no pending query)
    if (!effectivePref && !pendingChatQuery) {
        setPendingChatQuery(messageText); // Store original query
        
        // Add Bot Question to UI
        const botQuestion: Message = {
            id: uuidv4(),
            sender: Sender.MODEL,
            text: t('chat_ask_length', language),
            timestamp: Date.now() + 100 // Slight delay
        };
        
        updatedConv = { ...updatedConv, messages: [...updatedMessages, botQuestion] };
        setCurrentConversation(updatedConv);
        Storage.saveConversation(updatedConv);
        return; // Stop here, wait for user answer
    }

    // If we have a pending query, this message IS the preference answer
    let queryToSend = messageText;
    let finalPref = effectivePref;

    if (pendingChatQuery) {
        // Simple heuristic for length preference
        const lower = messageText.toLowerCase();
        if (lower.match(/short|quick|brief|summary/)) finalPref = 'short';
        else if (lower.match(/long|detail|deep|full/)) finalPref = 'long';
        else finalPref = 'long'; // Default fallback

        // Save preference to session
        updatedConv.responseLength = finalPref;
        // Restore the pending query as the actual payload for the AI
        queryToSend = pendingChatQuery;
        
        setPendingChatQuery(null);
    }
    
    // --- INTERCEPTION LOGIC END ---

    setIsTyping(true);

    try {
      const progress = Storage.getWikiProgress(activeProfile.id);
      const allArticles = getAllFlattenedArticles(language);

      // If contextOverride exists (from wiki), we prepend it to the message sent to Gemini
      // but NOT to the UI history above (to keep UI clean).
      const messagePayload = contextOverride 
         ? `${contextOverride}\n\nUSER QUESTION: ${queryToSend}` 
         : queryToSend;

      const responseText = await Gemini.sendMessageToGemini(
        // We send the full history including negotiation for context consistency
        updatedConv.messages, 
        messagePayload, 
        activeProfile,
        progress,
        allArticles,
        language,
        finalPref as 'short' | 'long' | undefined
      );

      const modelMsg: Message = {
        id: uuidv4(),
        sender: Sender.MODEL,
        text: responseText,
        timestamp: Date.now()
      };

      const finalMessages = [...updatedConv.messages, modelMsg];
      const finalConv = { ...updatedConv, messages: finalMessages };
      
      setCurrentConversation(finalConv);
      Storage.saveConversation(finalConv);

    } catch (error: any) {
      alert("Error generating response: " + error.message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartChatWithContext = (context: string, sentence: string) => {
     // 1. Switch to Chat View
     const conversation = startNewChat();
     
     // 2. Prepare the user facing prompt (Clean)
     const userPrompt = t('chat_prompt_context_inquiry', language, { sentence });
     
     // 3. Trigger send immediately using the explicitly created conversation object
     // This avoids stale state closure issues where 'currentConversation' is null
     handleSendMessage(userPrompt, context, conversation);
  };

  const handleEndSession = async () => {
    if (!currentConversation) return;

    const convId = currentConversation.id;

    // Automatically trigger summary generation if messages exist
    if (currentConversation.messages.length > 0 && apiKey) {
        // 1. Mark as generating immediately in local state and storage
        const updatedConv: Conversation = { 
            ...currentConversation, 
            summaryStatus: 'generating' 
        };
        Storage.saveConversation(updatedConv);
        
        // 2. Queue for processing (Background)
        Storage.addPendingSummary(convId);
        
        // 3. Trigger processor immediately (fire and forget)
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

  // --- RENDERERS ---

  if (!apiKey) {
    return (
      <Layout>
        <ApiKeyView onSave={handleSaveKey} />
      </Layout>
    );
  }

  return (
    <Layout onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {view === AppView.LANDING && (
        <LandingView 
          language={language}
          profile={profile}
          onLanguageSelect={handleLanguageSelect}
          onStartQuiz={() => {
            setProfile(null);
            setView(AppView.QUIZ);
          }}
          onOpenGuide={() => setView(AppView.DASHBOARD)}
          onStartChat={() => startNewChat()}
          onLoadDemo={handleLoadDemoProfile}
          onReset={handleResetData}
          onClearKey={() => setApiKey(null)}
          onSetGuest={(p) => setProfile(p)}
        />
      )}

      {view === AppView.DASHBOARD && (
        <DashboardView 
          language={language}
          profile={profile}
          profileCompleteness={profileCompleteness}
          onLanguageSelect={handleLanguageSelect}
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
          language={language}
          onBack={() => setView(AppView.DASHBOARD)}
        />
      )}

      {view === AppView.HISTORY && (
        <HistoryView 
          language={language}
          onBack={() => setView(AppView.DASHBOARD)}
        />
      )}

      {view === AppView.CV_IMPORT && (
        <CvImportView 
          language={language}
          onBack={() => setView(AppView.DASHBOARD)}
          onProfileUpdated={refreshProfiles}
        />
      )}

      {view === AppView.WIKI && (
        <WikiView 
          profile={profile}
          onClose={() => activeWikiArticle ? setActiveWikiArticle(null) : setView(AppView.PROFILE)}
          language={language}
          onLanguageSelect={handleLanguageSelect}
          activeArticle={activeWikiArticle}
          onArticleSelect={setActiveWikiArticle}
          onStartChatWithContext={handleStartChatWithContext}
        />
      )}

      {view === AppView.QUIZ && (
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => setView(AppView.DASHBOARD)} 
          language={language}
          onLanguageSelect={handleLanguageSelect}
          initialData={profile} 
        />
      )}

      {view === AppView.PROFILE_EDIT && (
        <ProfileEditView 
          language={language}
          profile={profile}
          yamlInput={yamlInput}
          onYamlChange={setYamlInput}
          onSave={handleSaveProfileEdit}
          onCancel={() => setView(AppView.PROFILE)}
          onLanguageSelect={handleLanguageSelect}
          onLoadDemo={() => handleLoadDemoProfile(false)}
        />
      )}

      {view === AppView.CHAT && currentConversation && (
        <ChatView 
          language={language}
          conversation={currentConversation}
          isTyping={isTyping}
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={() => handleSendMessage(inputText)}
          onEndSession={handleEndSession}
          onLanguageSelect={handleLanguageSelect}
        />
      )}

      {view === AppView.PROFILE && (
        <ProfileDetailView 
          language={language}
          profile={profile}
          profileCompleteness={profileCompleteness}
          allProfiles={allProfiles}
          onLanguageSelect={handleLanguageSelect}
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