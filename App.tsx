
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { AppView, Conversation, Message, Sender, UserProfile, LayoutPreference, GUEST_PROFILE } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import { WikiView } from './components/views/WikiView';
import ProfileWizard from './components/ProfileWizard';
import { getAllFlattenedArticles } from './data/wikiContent';
import { calculateProfileCompleteness } from './utils/profileUtils';
import { useLanguage } from './contexts/LanguageContext';
import { extractJsonFromText, parseTaggedResponse } from './utils/textUtils';
import { ACHIEVEMENTS } from './data/achievements';
import { Icons } from './components/Icon';

import { ApiKeyView } from './components/views/ApiKeyView';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { ChatView } from './components/views/ChatView';
import { ProfileDetailView } from './components/views/ProfileDetailView'; // Renamed conceptually to ProfileView
import { PlanView } from './components/views/PlanView'; // New View
import { ProfileEditView } from './components/views/ProfileEditView';
import { HistoryView } from './components/views/HistoryView';
import { CvImportView } from './components/views/CvImportView';
import { SettingsView } from './components/views/SettingsView';
import { AchievementsView } from './components/views/AchievementsView';

marked.use({ gfm: true, breaks: true });

// --- Global Components ---

const AchievementToast = ({ notification, onClose }: { notification: { id: string, title: string, icon: any, color?: string } | null, onClose: () => void }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300); // Wait for fade out
            }, 3000); // Reduced to 3s
            return () => clearTimeout(timer);
        }
    }, [notification, onClose]);

    if (!notification) return null;

    const Icon = notification.icon || Icons.Award;

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
            <div className="bg-white dark:bg-[#1a233b] border-2 border-yellow-400 rounded-2xl shadow-2xl p-4 flex items-center gap-4 min-w-[280px]">
                <div className={`p-2 rounded-full ${notification.color || 'bg-yellow-100 text-yellow-600'} dark:bg-opacity-20`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Achievement Unlocked!</p>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{notification.title}</p>
                </div>
            </div>
        </div>
    );
};

// --- App ---

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [view, setView] = useState<AppView>(AppView.LANDING);
  
  // Navigation History Stack (Max 10 items)
  const [viewHistory, setViewHistory] = useState<AppView[]>([]);

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [activeWikiArticleId, setActiveWikiArticleId] = useState<string | null>(null);
  const [wikiViewConfig, setWikiViewConfig] = useState<{ categoryId?: string, tag?: string } | null>(null);

  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [yamlInput, setYamlInput] = useState('');
  const [layoutMode, setLayoutMode] = useState<LayoutPreference>('windowed');
  
  // Global Notification State
  const [notification, setNotification] = useState<{ id: string, title: string, icon: any, color?: string } | null>(null);
  
  // Touch Handling for Global Gestures
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const localKey = Storage.initializeEnv();
    if (localKey) setApiKey(localKey);
    else if (process.env.API_KEY) setApiKey(process.env.API_KEY);

    const applyTheme = () => {
        const pref = Storage.getThemePreference();
        const root = document.documentElement;
        if (pref === 'dark') root.classList.add('dark');
        else if (pref === 'light') root.classList.remove('dark');
        else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
            else root.classList.remove('dark');
        }
    };
    applyTheme();
    setLayoutMode(Storage.getLayoutPreference());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => { if (Storage.getThemePreference() === 'system') applyTheme(); };
    mediaQuery.addEventListener('change', handleChange);

    refreshProfiles();
    setTimeout(() => processPendingSummaries(), 1000);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (profile) setProfileCompleteness(calculateProfileCompleteness(profile));
  }, [view, profile]);

  // --- SMART NAVIGATION LOGIC ---

  const changeView = (newView: AppView, addToHistory: boolean = true) => {
      if (view === newView) return;
      
      // LOOP GUARD: 
      // If the user is going back to the view they *just* came from (e.g. Profile -> Wiki -> Profile),
      // we interpret this as a "Back" action rather than pushing a new "Profile" onto the stack.
      // This keeps the history clean and prevents A -> B -> A -> B -> A loops.
      if (viewHistory.length > 0 && viewHistory[viewHistory.length - 1] === newView) {
          handleGlobalBack();
          return;
      }

      if (addToHistory) {
          // Push current view to history, limit to 10 previous views
          setViewHistory(prev => [...prev.slice(-9), view]);
      }
      setView(newView);
  };

  const handleGlobalBack = () => {
      // Dynamic Back Mechanism:
      // If we have history, pop the last view.
      if (viewHistory.length > 0) {
          const prevView = viewHistory[viewHistory.length - 1];
          const newHistory = viewHistory.slice(0, -1);
          
          setViewHistory(newHistory);
          setView(prevView);
          
          // Cleanup: If we are leaving Wiki, clear the active article
          if (view === AppView.WIKI && prevView !== AppView.WIKI) {
              setActiveWikiArticleId(null);
          }
      } else {
          // Fallback: If no history (e.g. refresh), go to Dashboard or Landing
          if (view !== AppView.DASHBOARD && view !== AppView.LANDING) {
              setView(AppView.DASHBOARD);
          }
      }
  };

  // Helper for Landing Page Navigation
  // Ensures that when entering the app from Landing, the "Back" button goes to Dashboard (Home), not Landing.
  const navigateFromLanding = (target: AppView) => {
      setViewHistory([AppView.DASHBOARD]);
      setView(target);
  };

  // --- GESTURES & SHORTCUTS ---

  const handleNavigation = (direction: 'next' | 'prev') => {
      // 1. Deep Wiki Navigation (Article to Article)
      if (view === AppView.WIKI && activeWikiArticleId) {
          const allArticles = getAllFlattenedArticles(language);
          const currentIndex = allArticles.findIndex(a => a.id === activeWikiArticleId);
          if (currentIndex === -1) { setActiveWikiArticleId(null); return; }
          
          if (direction === 'next') {
              if (currentIndex < allArticles.length - 1) setActiveWikiArticleId(allArticles[currentIndex + 1].id);
          } else {
              if (currentIndex > 0) setActiveWikiArticleId(allArticles[currentIndex - 1].id);
              // If at start of article list, swipe back shouldn't close view, handled by separate logic
          }
          return; 
      }
      
      // 2. Global Tab Cycle (Optional, can be disabled if confusing)
      // Only cycle main tabs if we are at root level
      if (![AppView.DASHBOARD, AppView.PROFILE, AppView.WIKI, AppView.CHAT, AppView.PLAN].includes(view)) return;
      
      // Simple Cycle: Dashboard <-> Wiki <-> Chat <-> Plan <-> Profile
      const cycle = [AppView.DASHBOARD, AppView.WIKI, AppView.CHAT, AppView.PLAN, AppView.PROFILE];
      const idx = cycle.indexOf(view);
      if (idx === -1) return;

      if (direction === 'next') {
          const nextView = cycle[(idx + 1) % cycle.length];
          changeView(nextView, true);
      } else {
          const prevView = cycle[(idx - 1 + cycle.length) % cycle.length];
          changeView(prevView, true);
      }
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }; };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartRef.current.x - touchEndX;
      const diffY = touchStartRef.current.y - touchEndY;
      
      // Horizontal Swipe Detection (Threshold 50px)
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          if (diffX > 0) {
              // Swipe Left (Next)
              handleNavigation('next');
          } else {
              // Swipe Right (Back / Prev)
              // If we have history and we are swiping right, treated as "Back"
              if (viewHistory.length > 0) {
                  handleGlobalBack();
              } else {
                  handleNavigation('prev');
              }
          }
      }
      touchStartRef.current = null;
  };

  // --- DATA OPERATIONS ---

  const refreshProfiles = () => {
    const profiles = Storage.getAllProfiles();
    setAllProfiles(profiles);
    const active = Storage.getActiveProfile();
    if (active) {
        setProfile(active);
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
      Storage.saveApiKey(newKey.trim());
      setApiKey(newKey.trim());
    }
  };

  // Central Notification Trigger
  const handleUnlockAchievement = (achId: string) => {
      // Logic to actually unlock in DB
      if (profile && profile.id !== 'guest') {
          const isNew = Storage.unlockAchievement(profile.id, achId);
          if (isNew) {
              const def = ACHIEVEMENTS[achId];
              if (def) {
                  setNotification({
                      id: achId,
                      title: def.title,
                      icon: (Icons as any)[def.icon],
                      color: def.color
                  });
              }
          }
      }
  };

  const startNewChat = (fromLanding: boolean = false) => {
    if (!profile) setProfile(GUEST_PROFILE);

    const globalPref = Storage.getGlobalLengthPreference();
    let initialMessages: Message[] = [];

    // Add Funny AI Greeting
    initialMessages.push({
        id: uuidv4(),
        sender: Sender.MODEL,
        text: t('chat_ai_greeting'),
        timestamp: Date.now()
    });

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
      responseLength: globalPref !== 'ask' ? globalPref : undefined
    };
    setCurrentConversation(newConv);
    Storage.saveConversation(newConv);
    
    if (fromLanding) {
        // If starting from Landing, set history to Dashboard so back goes Home
        setViewHistory([AppView.DASHBOARD]);
        setView(AppView.CHAT);
    } else {
        changeView(AppView.CHAT);
    }

    // Track Session Count Achievement
    if (profile && profile.id !== 'guest') {
        Storage.trackChatSession(profile.id);
        const progress = Storage.getWikiProgress(profile.id);
        
        // Unlock First Contact Achievement for opening first chat
        handleUnlockAchievement('ai_first_contact');

        if (progress.globalStats.totalChatConversations === 5) {
            handleUnlockAchievement('serial_conversationalist');
        }
    }

    return newConv;
  };

  const handleSendMessage = async (messageText: string, contextOverride?: string, conversationOverride?: Conversation, displayLabel?: string) => {
    const conversation = conversationOverride || currentConversation;
    if (!messageText.trim() || !conversation) return;
    
    let activeProfile = profile || Storage.getActiveProfile();
    
    if (!activeProfile && (view === AppView.CHAT || conversationOverride)) {
        activeProfile = GUEST_PROFILE;
        setProfile(GUEST_PROFILE);
    }

    if (!activeProfile) {
        alert("Please create a profile first.");
        changeView(AppView.QUIZ);
        return;
    }

    const globalPref = Storage.getGlobalLengthPreference();
    let effectivePref = conversation.responseLength || (globalPref !== 'ask' ? globalPref : undefined);
    
    // Check if this message is a preference selection (short/long)
    if (!effectivePref && (messageText === 'short' || messageText === 'long')) {
        const newPref = messageText as 'short' | 'long';
        const selectionMsg: Message = { id: uuidv4(), sender: Sender.USER, text: displayLabel || (messageText === 'short' ? t('settings_opt_short') : t('settings_opt_long')), timestamp: Date.now() };
        let nextMessages = [...conversation.messages, selectionMsg];
        let nextConv = { ...conversation, messages: nextMessages, responseLength: newPref };
        
        const confirmMsg: Message = { id: uuidv4(), sender: Sender.MODEL, text: t('chat_length_set_confirm'), timestamp: Date.now() + 100 };
        nextConv.messages.push(confirmMsg);
        setCurrentConversation(nextConv);
        Storage.saveConversation(nextConv);
        return; 
    } 
    
    // Process Real User Message
    const userMsg: Message = { id: uuidv4(), sender: Sender.USER, text: displayLabel || messageText, timestamp: Date.now() };
    const updatedMessages = [...conversation.messages, userMsg];
    let updatedConv = { ...conversation, messages: updatedMessages };
    
    if (!effectivePref) {
        effectivePref = 'short';
        updatedConv.responseLength = 'short';
    }

    setCurrentConversation(updatedConv);
    Storage.saveConversation(updatedConv);
    setInputText('');
    
    let queryToSend = messageText;
    let finalPref = effectivePref;
    setIsTyping(true);
    
    // --- ACHIEVEMENT CHECKS: FIRST QUESTION & CHAT COUNT ---
    if (activeProfile.id !== 'guest') {
        handleUnlockAchievement('curious_mind'); // Unlocked on first REAL query to Gemini
        
        Storage.trackUserMessage(activeProfile.id);
        const progress = Storage.getWikiProgress(activeProfile.id);
        if (progress.globalStats.totalChatMessages === 5) {
            handleUnlockAchievement('talkative_type');
        }
    }

    try {
      const progress = Storage.getWikiProgress(activeProfile.id);
      const allArticles = getAllFlattenedArticles(language);
      const messagePayload = contextOverride ? `${contextOverride}\n\nUSER QUESTION: ${queryToSend}` : queryToSend;
      const responseText = await Gemini.sendMessageToGemini(conversation.messages, messagePayload, activeProfile, progress, allArticles, language, finalPref as 'short' | 'long' | undefined);
      const parsed = parseTaggedResponse(responseText);
      let modelMsg: Message = { id: uuidv4(), sender: Sender.MODEL, text: parsed.text || '', timestamp: Date.now() };
      if (parsed.structuredData) {
          modelMsg.structuredData = parsed.structuredData as any;
      } else {
          const json = extractJsonFromText(responseText);
          if (json && (json.type === 'navigation_link' || json.type === 'interactive_choice')) {
              modelMsg.structuredData = json;
              if (json.data?.message) modelMsg.text = json.data.message;
          }
      }
      if (!modelMsg.text) modelMsg.text = "";
      const finalMessages = [...conversation.messages, modelMsg];
      const finalConv = { ...conversation, messages: finalMessages };
      setCurrentConversation(finalConv);
      Storage.saveConversation(finalConv);
    } catch (error: any) {
      alert("Error: " + error.message);
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
        const updatedConv: Conversation = { ...currentConversation, summaryStatus: 'generating' };
        Storage.saveConversation(updatedConv);
        Storage.addPendingSummary(convId);
        processPendingSummaries();
    }
    setCurrentConversation(null);
    changeView(AppView.DASHBOARD);
  };

  const handleSwitchProfile = (id: string) => { Storage.setActiveProfileId(id); refreshProfiles(); };
  const handleSaveProfileEdit = () => {
    try {
      const updated = Storage.saveProfileFromYaml(yamlInput);
      setProfile(updated);
      refreshProfiles(); 
      changeView(AppView.PROFILE); 
    } catch (e) { alert("Invalid YAML."); }
  };
  const handleCreateNewProfile = () => { setProfile(null); changeView(AppView.QUIZ); };
  
  const handleWizardComplete = (newProfile: UserProfile) => {
    Storage.saveProfile(newProfile, true);
    Storage.setActiveProfileId(newProfile.id);
    refreshProfiles();
    changeView(AppView.PLAN); 
  };

  const handleLoadDemoProfile = (silent: boolean = false) => {
    try {
      const profiles = Storage.getAllProfiles();
      let targetProfile = profiles.find(p => p.id === 'demo-gabriela');
      if (!targetProfile) targetProfile = Storage.createDemoProfile();
      if (targetProfile) {
        Storage.setActiveProfileId(targetProfile.id);
        refreshProfiles();
        changeView(AppView.DASHBOARD);
      }
    } catch (e) { if(!silent) alert("Error loading demo."); }
  };

  const handleResetData = () => {
      if (window.confirm("Erase all data?")) {
          Storage.resetApplicationData();
          window.location.reload();
      }
  };

  // Navigates to wiki and sets history so 'Back' works correctly
  const handleNavigateToArticle = (articleId: string) => { 
      setActiveWikiArticleId(articleId); 
      setWikiViewConfig(null);
      changeView(AppView.WIKI);
  };

  if (!apiKey) {
    return <Layout layoutMode={layoutMode}><ApiKeyView onSave={handleSaveKey} /></Layout>;
  }

  return (
    <Layout onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} layoutMode={layoutMode}>
      <AchievementToast notification={notification} onClose={() => setNotification(null)} />

      {view === AppView.LANDING && (
        <LandingView 
          profile={profile}
          onStartQuiz={() => { 
              setProfile(null); 
              navigateFromLanding(AppView.QUIZ);
          }}
          onOpenGuide={() => changeView(AppView.DASHBOARD)} 
          onBrowseWiki={() => {
              navigateFromLanding(AppView.WIKI);
          }}
          onStartChat={() => startNewChat(true)}
          onLoadDemo={handleLoadDemoProfile}
          onReset={handleResetData}
          onOpenSettings={() => changeView(AppView.SETTINGS)}
          onSetGuest={(p) => setProfile(p)}
        />
      )}

      {view === AppView.DASHBOARD && (
        <DashboardView 
          profile={profile}
          profileCompleteness={profileCompleteness}
          onNavigateToProfile={() => changeView(AppView.PROFILE)}
          // Update: allow deep linking to specific articles, categories or tags
          onNavigateToWiki={(id, type = 'article') => {
              if (type === 'article') {
                  setActiveWikiArticleId(id || null);
                  setWikiViewConfig(null);
              } else if (type === 'category') {
                  setActiveWikiArticleId(null);
                  setWikiViewConfig({ categoryId: id });
              } else if (type === 'tag') {
                  setActiveWikiArticleId(null);
                  setWikiViewConfig({ tag: id });
              } else {
                  setActiveWikiArticleId(null);
                  setWikiViewConfig(null);
              }
              changeView(AppView.WIKI);
          }}
          onNavigateToQuiz={() => changeView(AppView.QUIZ)}
          onStartChat={() => startNewChat()}
          onNavigateToHistory={() => changeView(AppView.HISTORY)}
          onNavigateToCvImport={() => changeView(AppView.CV_IMPORT)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToPlan={() => changeView(AppView.PLAN)}
        />
      )}

      {view === AppView.SETTINGS && (
        <SettingsView 
          onBack={handleGlobalBack}
          onToggleLayout={(mode) => setLayoutMode(mode)}
        />
      )}

      {view === AppView.HISTORY && (
        <HistoryView onBack={handleGlobalBack} />
      )}

      {view === AppView.CV_IMPORT && (
        <CvImportView onBack={handleGlobalBack} onProfileUpdated={refreshProfiles} />
      )}

      {view === AppView.WIKI && (
        <WikiView 
          profile={profile}
          onClose={handleGlobalBack} 
          activeArticleId={activeWikiArticleId}
          viewConfig={wikiViewConfig}
          onArticleSelect={(article) => {
              setActiveWikiArticleId(article?.id || null);
              if (article) setWikiViewConfig(null); 
          }}
          onStartChatWithContext={handleStartChatWithContext}
          onNavigateToChat={() => startNewChat()}
          onNavigateToProfile={() => changeView(AppView.PROFILE)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToPlan={() => changeView(AppView.PLAN)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
          onUnlockAchievement={handleUnlockAchievement}
        />
      )}

      {view === AppView.QUIZ && (
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => {
             // If cancelling quiz (likely started from Landing as Guest), 
             // go to Dashboard instead of back to Landing to serve as Home
             if (!profile || profile.id === 'guest') {
                 setProfile(GUEST_PROFILE);
                 changeView(AppView.DASHBOARD);
             } else {
                 changeView(AppView.DASHBOARD);
             }
          }} 
          initialData={profile} 
        />
      )}

      {view === AppView.PROFILE_EDIT && (
        <ProfileEditView 
          profile={profile}
          yamlInput={yamlInput}
          onYamlChange={setYamlInput}
          onSave={handleSaveProfileEdit}
          onCancel={() => changeView(AppView.PROFILE)}
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
          onNavigateToProfile={() => changeView(AppView.PROFILE)}
          onNavigateToWiki={() => changeView(AppView.WIKI)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToPlan={() => changeView(AppView.PLAN)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
        />
      )}

      {view === AppView.PROFILE && (
        <ProfileDetailView 
          profile={profile}
          profileCompleteness={profileCompleteness}
          allProfiles={allProfiles}
          onNavigateBack={() => changeView(AppView.DASHBOARD)}
          onSwitchProfile={handleSwitchProfile}
          onCreateProfile={handleCreateNewProfile}
          onEditVisual={() => changeView(AppView.QUIZ)}
          onEditYaml={() => changeView(AppView.PROFILE_EDIT)}
          onNavigateToWiki={() => changeView(AppView.WIKI)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToPlan={() => changeView(AppView.PLAN)}
          onNavigateToChat={() => startNewChat()}
          onNavigateToAchievements={() => changeView(AppView.ACHIEVEMENTS)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
        />
      )}

      {view === AppView.PLAN && (
        <PlanView 
          profile={profile}
          onNavigateToWiki={() => changeView(AppView.WIKI)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToProfile={() => changeView(AppView.PROFILE)}
          onNavigateToChat={() => startNewChat()}
          onNavigateToAchievements={() => changeView(AppView.ACHIEVEMENTS)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
          onNavigateToArticle={handleNavigateToArticle}
          onUnlockAchievement={handleUnlockAchievement}
          onNavigateToDashboard={() => changeView(AppView.DASHBOARD)}
        />
      )}

      {view === AppView.ACHIEVEMENTS && (
        <AchievementsView 
          onBack={handleGlobalBack}
          profile={profile}
        />
      )}
    </Layout>
  );
};

export default App;
