
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { AppView, Conversation, Message, Sender, UserProfile, LayoutPreference, GUEST_PROFILE } from './types';
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

import { ApiKeyView } from './components/views/ApiKeyView';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { ChatView } from './components/views/ChatView';
import { ProfileDetailView } from './components/views/ProfileDetailView';
import { ProfileEditView } from './components/views/ProfileEditView';
import { HistoryView } from './components/views/HistoryView';
import { CvImportView } from './components/views/CvImportView';
import { SettingsView } from './components/views/SettingsView';

marked.use({ gfm: true, breaks: true });

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [activeWikiArticleId, setActiveWikiArticleId] = useState<string | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [yamlInput, setYamlInput] = useState('');
  const [layoutMode, setLayoutMode] = useState<LayoutPreference>('windowed');
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

  const handleNavigation = (direction: 'next' | 'prev') => {
      if (view === AppView.WIKI && activeWikiArticleId) {
          const allArticles = getAllFlattenedArticles(language);
          const currentIndex = allArticles.findIndex(a => a.id === activeWikiArticleId);
          if (currentIndex === -1) { setActiveWikiArticleId(null); return; }
          if (direction === 'next') {
              if (currentIndex < allArticles.length - 1) setActiveWikiArticleId(allArticles[currentIndex + 1].id);
              else setActiveWikiArticleId(null);
          } else {
              if (currentIndex > 0) setActiveWikiArticleId(allArticles[currentIndex - 1].id);
              else setActiveWikiArticleId(null);
          }
          return; 
      }
      if (![AppView.DASHBOARD, AppView.PROFILE, AppView.WIKI, AppView.CHAT].includes(view)) return;
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

  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }; };
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
    // Only overwrite if we found an active profile on disk, otherwise keep existing (e.g. Guest)
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

  const startNewChat = () => {
    // Ensure we have a profile context when starting chat, even if it's Guest
    if (!profile) setProfile(GUEST_PROFILE);

    const globalPref = Storage.getGlobalLengthPreference();
    let initialMessages: Message[] = [];
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
    setView(AppView.CHAT);
    return newConv;
  };

  const handleSendMessage = async (messageText: string, contextOverride?: string, conversationOverride?: Conversation, displayLabel?: string) => {
    const conversation = conversationOverride || currentConversation;
    if (!messageText.trim() || !conversation) return;
    
    // SAFETY FIX: Robustly determine profile. 
    // If state is null (e.g. reload or race condition), check storage.
    // If storage is null (Guest mode not saved), fallback to GUEST_PROFILE if we are already in chat.
    let activeProfile = profile || Storage.getActiveProfile();
    
    // Fallback for Guest in Chat: If we are already in the Chat view, force Guest profile instead of redirecting
    if (!activeProfile && (view === AppView.CHAT || conversationOverride)) {
        activeProfile = GUEST_PROFILE;
        setProfile(GUEST_PROFILE);
    }

    if (!activeProfile) {
        // Truly uninitialized state
        alert("Please create a profile first.");
        setView(AppView.QUIZ);
        return;
    }

    const globalPref = Storage.getGlobalLengthPreference();
    let effectivePref = conversation.responseLength || (globalPref !== 'ask' ? globalPref : undefined);
    
    // Explicit Preference Selection (via buttons or exact text)
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
    
    // Standard User Message
    const userMsg: Message = { id: uuidv4(), sender: Sender.USER, text: displayLabel || messageText, timestamp: Date.now() };
    const updatedMessages = [...conversation.messages, userMsg];
    let updatedConv = { ...conversation, messages: updatedMessages };
    
    // Implicit Default: If preference wasn't set, assume 'short' and proceed without asking again
    if (!effectivePref) {
        effectivePref = 'short';
        updatedConv.responseLength = 'short';
    }

    setCurrentConversation(updatedConv);
    Storage.saveConversation(updatedConv);
    setInputText('');
    
    // Send to Gemini
    let queryToSend = messageText;
    let finalPref = effectivePref;
    setIsTyping(true);
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
    setView(AppView.DASHBOARD);
  };

  const handleSwitchProfile = (id: string) => { Storage.setActiveProfileId(id); refreshProfiles(); };
  const handleSaveProfileEdit = () => {
    try {
      const updated = Storage.saveProfileFromYaml(yamlInput);
      setProfile(updated);
      refreshProfiles(); 
      setView(AppView.PROFILE); 
    } catch (e) { alert("Invalid YAML."); }
  };
  const handleCreateNewProfile = () => { setProfile(null); setView(AppView.QUIZ); };
  
  // LOGIC UPDATE: Route to PROFILE after Quiz
  const handleWizardComplete = (newProfile: UserProfile) => {
    Storage.saveProfile(newProfile, true);
    Storage.setActiveProfileId(newProfile.id);
    refreshProfiles();
    setView(AppView.PROFILE); 
  };

  const handleLoadDemoProfile = (silent: boolean = false) => {
    try {
      const profiles = Storage.getAllProfiles();
      let targetProfile = profiles.find(p => p.id === 'demo-gabriela');
      if (!targetProfile) targetProfile = Storage.createDemoProfile();
      if (targetProfile) {
        Storage.setActiveProfileId(targetProfile.id);
        refreshProfiles();
        setView(AppView.DASHBOARD);
      }
    } catch (e) { if(!silent) alert("Error loading demo."); }
  };

  const handleResetData = () => {
      if (window.confirm("Erase all data?")) {
          Storage.resetApplicationData();
          window.location.reload();
      }
  };

  const handleNavigateToArticle = (articleId: string) => { setActiveWikiArticleId(articleId); setView(AppView.WIKI); };

  if (!apiKey) {
    return <Layout layoutMode={layoutMode}><ApiKeyView onSave={handleSaveKey} /></Layout>;
  }

  return (
    <Layout onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} layoutMode={layoutMode}>
      {view === AppView.LANDING && (
        <LandingView 
          profile={profile}
          onStartQuiz={() => { setProfile(null); setView(AppView.QUIZ); }}
          onOpenGuide={() => setView(AppView.DASHBOARD)} // Returning user goes to Dashboard (Hub)
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
          onNavigateToLanding={() => setView(AppView.LANDING)}
        />
      )}

      {view === AppView.SETTINGS && (
        <SettingsView 
          onBack={() => setView(AppView.DASHBOARD)}
          onToggleLayout={(mode) => setLayoutMode(mode)}
        />
      )}

      {view === AppView.HISTORY && (
        <HistoryView onBack={() => setView(AppView.DASHBOARD)} />
      )}

      {view === AppView.CV_IMPORT && (
        <CvImportView onBack={() => setView(AppView.DASHBOARD)} onProfileUpdated={refreshProfiles} />
      )}

      {view === AppView.WIKI && (
        <WikiView 
          profile={profile}
          onClose={() => activeWikiArticleId ? setActiveWikiArticleId(null) : setView(AppView.DASHBOARD)}
          activeArticleId={activeWikiArticleId}
          onArticleSelect={(article) => setActiveWikiArticleId(article?.id || null)}
          onStartChatWithContext={handleStartChatWithContext}
          onNavigateToChat={() => startNewChat()}
          onNavigateToProfile={() => setView(AppView.PROFILE)}
          onNavigateToLanding={() => setView(AppView.LANDING)}
        />
      )}

      {view === AppView.QUIZ && (
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => {
             // Logic: If user is a Guest (no profile yet), canceling the quiz should probably return them to Landing 
             // because going to Dashboard just shows the "Take Quiz" CTA again, which is a loop.
             if (!profile || profile.id === 'guest') {
                 setView(AppView.LANDING);
             } else {
                 setView(AppView.DASHBOARD);
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
          onNavigateToProfile={() => setView(AppView.PROFILE)}
          onNavigateToWiki={() => setView(AppView.WIKI)}
          onNavigateToLanding={() => setView(AppView.LANDING)}
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
          onNavigateToLanding={() => setView(AppView.LANDING)}
        />
      )}
    </Layout>
  );
};

export default App;
