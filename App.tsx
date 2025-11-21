
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { AppView, Conversation, Message, Sender, UserProfile, GUEST_PROFILE, LanguageCode } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import WikiView from './components/WikiView';
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

  // Profile Edit State
  const [yamlInput, setYamlInput] = useState('');

  // Navigation Refs
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  // Initialization
  useEffect(() => {
    const localKey = Storage.initializeEnv();
    if (localKey) {
      setApiKey(localKey);
    } else if (process.env.API_KEY) {
      setApiKey(process.env.API_KEY);
    }

    const storedLang = localStorage.getItem('fw_language') as LanguageCode;
    if (storedLang && SUPPORTED_LANGUAGES.some(l => l.code === storedLang)) {
      setLanguage(storedLang);
    }

    refreshProfiles();
    processPendingSummaries();
  }, []);

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

    for (const id of pendingIds) {
      const conv = Storage.getConversation(id);
      if (conv && !conv.isSummarized && conv.messages.length > 0) {
        try {
          const summary = await Gemini.summarizeConversation(conv.messages);
          Storage.saveSummary(id, summary);
          Storage.removePendingSummary(id);
        } catch (e) {
          console.error(`Failed to summarize ${id}`, e);
        }
      } else {
        Storage.removePendingSummary(id);
      }
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
      isSummarized: false
    };
    setCurrentConversation(newConv);
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

    const userMsg: Message = {
      id: uuidv4(),
      sender: Sender.USER,
      text: messageText,
      timestamp: Date.now()
    };

    const updatedMessages = [...conversation.messages, userMsg];
    const updatedConv = { ...conversation, messages: updatedMessages };
    
    setCurrentConversation(updatedConv);
    Storage.saveConversation(updatedConv);
    setInputText('');
    setIsTyping(true);

    try {
      const progress = Storage.getWikiProgress(activeProfile.id);
      const allArticles = getAllFlattenedArticles(language);

      // If contextOverride exists (from wiki), we prepend it to the message sent to Gemini
      // but NOT to the UI history above (to keep UI clean).
      const messageToSend = contextOverride 
         ? `${contextOverride}\n\nUSER QUESTION: ${messageText}` 
         : messageText;

      const responseText = await Gemini.sendMessageToGemini(
        updatedMessages.slice(0, -1), 
        messageToSend, 
        activeProfile,
        progress,
        allArticles,
        language
      );

      const modelMsg: Message = {
        id: uuidv4(),
        sender: Sender.MODEL,
        text: responseText,
        timestamp: Date.now()
      };

      const finalMessages = [...updatedMessages, modelMsg];
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

    const shouldSummarize = window.confirm("Would you like to summarize this conversation before exiting? This helps track your progress.");

    if (shouldSummarize && apiKey) {
      try {
        setIsTyping(true);
        const summary = await Gemini.summarizeConversation(currentConversation.messages);
        Storage.saveSummary(currentConversation.id, summary);
        alert("Summary saved.");
      } catch (e) {
        alert("Could not generate summary right now. Flagged for later.");
        Storage.addPendingSummary(currentConversation.id);
      } finally {
        setIsTyping(false);
      }
    } else {
      Storage.addPendingSummary(currentConversation.id);
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
