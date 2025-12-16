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
import { ProfileDetailView } from './components/views/ProfileDetailView';
import { PlanView } from './components/views/PlanView';
import { ProfileEditView } from './components/views/ProfileEditView';
import { HistoryView } from './components/views/HistoryView';
import { CvImportView } from './components/views/CvImportView';
import { SettingsView } from './components/views/SettingsView';
import { AchievementsView } from './components/views/AchievementsView';

marked.use({ gfm: true, breaks: true });

const AchievementToast = ({ notification, onClose }: { notification: { id: string, title: string, icon: any, color?: string } | null, onClose: () => void }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (notification) {
            setVisible(true);
            const timer = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 3000);
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

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [view, setView] = useState<AppView>(AppView.LANDING);
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
  const [notification, setNotification] = useState<{ id: string, title: string, icon: any, color?: string } | null>(null);
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
    refreshProfiles();
    setTimeout(() => processPendingSummaries(), 1000);
  }, []);

  useEffect(() => {
    if (profile) setProfileCompleteness(calculateProfileCompleteness(profile));
  }, [view, profile]);

  const changeView = (newView: AppView, addToHistory: boolean = true) => {
      if (view === newView) return;
      if (viewHistory.length > 0 && viewHistory[viewHistory.length - 1] === newView) {
          handleGlobalBack();
          return;
      }
      if (addToHistory) setViewHistory(prev => [...prev.slice(-9), view]);
      setView(newView);
  };

  const handleGlobalBack = () => {
      if (viewHistory.length > 0) {
          const prevView = viewHistory[viewHistory.length - 1];
          setViewHistory(viewHistory.slice(0, -1));
          setView(prevView);
          if (view === AppView.WIKI && prevView !== AppView.WIKI) setActiveWikiArticleId(null);
      } else if (view !== AppView.DASHBOARD && view !== AppView.LANDING) {
          setView(AppView.DASHBOARD);
      }
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }; };
  const handleTouchEnd = (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartRef.current.x - touchEndX;
      const diffY = touchStartRef.current.y - touchEndY;
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          if (diffX > 0) { /* Next */ } else { if (viewHistory.length > 0) handleGlobalBack(); }
      }
      touchStartRef.current = null;
  };

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
            Storage.removePendingSummary(id); 
        }
    } else {
        Storage.removePendingSummary(id);
        setTimeout(() => processPendingSummaries(), 100);
    }
  };

  const handleUnlockAchievement = (achId: string) => {
      if (profile && profile.id !== 'guest') {
          const isNew = Storage.unlockAchievement(profile.id, achId);
          if (isNew) {
              const def = ACHIEVEMENTS[achId];
              if (def) setNotification({ id: achId, title: def.title, icon: (Icons as any)[def.icon], color: def.color });
          }
      }
  };

  const startNewChat = (fromLanding: boolean = false) => {
    if (!profile) setProfile(GUEST_PROFILE);
    const globalPref = Storage.getGlobalLengthPreference();
    let initialMessages: Message[] = [{ id: uuidv4(), sender: Sender.MODEL, text: t('chat_ai_greeting'), timestamp: Date.now() }];
    if (globalPref === 'ask') {
        initialMessages.push({
            id: uuidv4(), sender: Sender.MODEL, text: t('chat_ask_length'), timestamp: Date.now(),
            structuredData: {
                type: 'interactive_choice',
                data: { message: t('chat_ask_length'), question_header: t('settings_length_label'), options: [{ id: 'short', label: t('settings_opt_short'), value: 'short' }, { id: 'long', label: t('settings_opt_long'), value: 'long' }] }
            }
        });
    }
    const newConv: Conversation = { id: uuidv4(), startTime: Date.now(), messages: initialMessages, isSummarized: false, summaryStatus: 'idle', responseLength: globalPref !== 'ask' ? globalPref : undefined };
    setCurrentConversation(newConv);
    Storage.saveConversation(newConv);
    if (fromLanding) { setViewHistory([AppView.DASHBOARD]); setView(AppView.CHAT); } else { changeView(AppView.CHAT); }
    if (profile && profile.id !== 'guest') { Storage.trackChatSession(profile.id); handleUnlockAchievement('ai_first_contact'); }
    return newConv;
  };

  const handleSendMessage = async (messageText: string, contextOverride?: string, conversationOverride?: Conversation, displayLabel?: string) => {
    const conversation = conversationOverride || currentConversation;
    if (!messageText.trim() || !conversation) return;
    let activeProfile = profile || Storage.getActiveProfile() || GUEST_PROFILE;
    if (!activeProfile && view === AppView.CHAT) setProfile(GUEST_PROFILE);

    const globalPref = Storage.getGlobalLengthPreference();
    let effectivePref = conversation.responseLength || (globalPref !== 'ask' ? globalPref : undefined);
    
    if (!effectivePref && (messageText === 'short' || messageText === 'long')) {
        const newPref = messageText as 'short' | 'long';
        const nextConv = { ...conversation, messages: [...conversation.messages, { id: uuidv4(), sender: Sender.USER, text: displayLabel || (messageText === 'short' ? t('settings_opt_short') : t('settings_opt_long')), timestamp: Date.now() }, { id: uuidv4(), sender: Sender.MODEL, text: t('chat_length_set_confirm'), timestamp: Date.now() + 100 }], responseLength: newPref };
        setCurrentConversation(nextConv); Storage.saveConversation(nextConv); return; 
    } 
    
    const userMsg: Message = { id: uuidv4(), sender: Sender.USER, text: displayLabel || messageText, timestamp: Date.now() };
    const updatedConv = { ...conversation, messages: [...conversation.messages, userMsg] };
    if (!effectivePref) { effectivePref = 'short'; updatedConv.responseLength = 'short'; }
    setCurrentConversation(updatedConv); Storage.saveConversation(updatedConv); setInputText(''); setIsTyping(true);
    
    if (activeProfile.id !== 'guest') { handleUnlockAchievement('curious_mind'); Storage.trackUserMessage(activeProfile.id); }

    try {
      const progress = Storage.getWikiProgress(activeProfile.id);
      const allArticles = getAllFlattenedArticles(language);
      const messagePayload = contextOverride ? `${contextOverride}\n\nUSER QUESTION: ${messageText}` : messageText;
      const responseText = await Gemini.sendMessageToGemini(updatedConv.messages, messagePayload, activeProfile, progress, allArticles, language, effectivePref as 'short' | 'long' | undefined);
      const parsed = parseTaggedResponse(responseText);
      let modelMsg: Message = { id: uuidv4(), sender: Sender.MODEL, text: parsed.text || '', timestamp: Date.now() };
      if (parsed.structuredData) modelMsg.structuredData = parsed.structuredData as any;
      else {
          const json = extractJsonFromText(responseText);
          if (json && (json.type === 'navigation_link' || json.type === 'interactive_choice')) modelMsg.structuredData = json;
      }
      const finalConv = { ...updatedConv, messages: [...updatedConv.messages, modelMsg] };
      setCurrentConversation(finalConv); Storage.saveConversation(finalConv);
    } catch (error: any) { alert("Error: " + error.message); } finally { setIsTyping(false); }
  };

  const handleStartChatWithContext = (context: string, sentence: string) => {
     const conversation = startNewChat();
     const userPrompt = t('chat_prompt_context_inquiry', { sentence });
     handleSendMessage(userPrompt, context, conversation);
  };

  const handleEndSession = async () => {
    if (!currentConversation) return;
    if (currentConversation.messages.length > 0 && apiKey) {
        Storage.saveConversation({ ...currentConversation, summaryStatus: 'generating' });
        Storage.addPendingSummary(currentConversation.id);
        processPendingSummaries();
    }
    setCurrentConversation(null);
    changeView(AppView.DASHBOARD);
  };

  const handleNavigateToArticle = (articleId: string) => { setActiveWikiArticleId(articleId); setWikiViewConfig(null); changeView(AppView.WIKI); };

  if (!apiKey) return <Layout layoutMode={layoutMode}><ApiKeyView onSave={(k) => { if(k.length > 5) { Storage.saveApiKey(k); setApiKey(k); } }} /></Layout>;

  return (
    <Layout onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} layoutMode={layoutMode}>
      <AchievementToast notification={notification} onClose={() => setNotification(null)} />
      {view === AppView.LANDING && (
        <LandingView 
          profile={profile}
          onStartQuiz={() => { setProfile(null); setViewHistory([AppView.DASHBOARD]); setView(AppView.QUIZ); }}
          onOpenGuide={() => changeView(AppView.DASHBOARD)} 
          onBrowseWiki={() => { setViewHistory([AppView.DASHBOARD]); setView(AppView.WIKI); }}
          onStartChat={() => startNewChat(true)}
          onLoadDemo={() => { try { let p = Storage.getAllProfiles().find(x => x.id === 'demo-gabriela') || Storage.createDemoProfile(); Storage.setActiveProfileId(p.id); refreshProfiles(); changeView(AppView.DASHBOARD); } catch(e){} }}
          onReset={() => { if(confirm("Erase all?")) { Storage.resetApplicationData(); window.location.reload(); } }}
          onOpenSettings={() => changeView(AppView.SETTINGS)}
          onSetGuest={(p) => setProfile(p)}
        />
      )}
      {view === AppView.DASHBOARD && (
        <DashboardView 
          profile={profile}
          profileCompleteness={profileCompleteness}
          onNavigateToProfile={() => changeView(AppView.PROFILE)}
          onNavigateToWiki={(id, type) => { if (type === 'article') setActiveWikiArticleId(id || null); else if (type === 'category') setWikiViewConfig({ categoryId: id }); else if (type === 'tag') setWikiViewConfig({ tag: id }); changeView(AppView.WIKI); }}
          onNavigateToQuiz={() => changeView(AppView.QUIZ)}
          onStartChat={() => startNewChat()}
          onNavigateToHistory={() => changeView(AppView.HISTORY)}
          onNavigateToCvImport={() => changeView(AppView.CV_IMPORT)}
          onNavigateToSettings={() => changeView(AppView.SETTINGS)}
          onNavigateToLanding={() => changeView(AppView.LANDING)}
          onNavigateToPlan={() => changeView(AppView.PLAN)}
        />
      )}
      {view === AppView.SETTINGS && <SettingsView onBack={handleGlobalBack} onToggleLayout={(m) => setLayoutMode(m)} />}
      {view === AppView.HISTORY && <HistoryView onBack={handleGlobalBack} />}
      {view === AppView.CV_IMPORT && <CvImportView onBack={handleGlobalBack} onProfileUpdated={refreshProfiles} />}
      {view === AppView.WIKI && <WikiView profile={profile} onClose={handleGlobalBack} activeArticleId={activeWikiArticleId} viewConfig={wikiViewConfig} onArticleSelect={(a) => { setActiveWikiArticleId(a?.id || null); if(a) setWikiViewConfig(null); }} onStartChatWithContext={handleStartChatWithContext} onNavigateToChat={() => startNewChat()} onNavigateToProfile={() => changeView(AppView.PROFILE)} onNavigateToLanding={() => changeView(AppView.LANDING)} onNavigateToPlan={() => changeView(AppView.PLAN)} onNavigateToSettings={() => changeView(AppView.SETTINGS)} onUnlockAchievement={handleUnlockAchievement} />}
      {view === AppView.QUIZ && <ProfileWizard onComplete={(p) => { Storage.saveProfile(p, true); refreshProfiles(); changeView(AppView.PLAN); }} onCancel={() => { if(!profile || profile.id === 'guest') setProfile(GUEST_PROFILE); changeView(AppView.DASHBOARD); }} initialData={profile} />}
      {view === AppView.PROFILE_EDIT && <ProfileEditView profile={profile} yamlInput={yamlInput} onYamlChange={setYamlInput} onSave={() => { try { setProfile(Storage.saveProfileFromYaml(yamlInput)); refreshProfiles(); changeView(AppView.PROFILE); } catch(e) { alert("Invalid YAML"); } }} onCancel={() => changeView(AppView.PROFILE)} onLoadDemo={() => {}} />}
      {view === AppView.CHAT && currentConversation && <ChatView conversation={currentConversation} isTyping={isTyping} inputText={inputText} onInputChange={setInputText} onSendMessage={(t, l) => handleSendMessage(t || inputText, undefined, undefined, l)} onEndSession={handleEndSession} onNavigateToArticle={handleNavigateToArticle} onNavigateToProfile={() => changeView(AppView.PROFILE)} onNavigateToWiki={() => changeView(AppView.WIKI)} onNavigateToLanding={() => changeView(AppView.LANDING)} onNavigateToPlan={() => changeView(AppView.PLAN)} onNavigateToSettings={() => changeView(AppView.SETTINGS)} />}
      {view === AppView.PROFILE && <ProfileDetailView profile={profile} profileCompleteness={profileCompleteness} allProfiles={allProfiles} onNavigateBack={() => changeView(AppView.DASHBOARD)} onSwitchProfile={(id) => { Storage.setActiveProfileId(id); refreshProfiles(); }} onCreateProfile={() => { setProfile(null); changeView(AppView.QUIZ); }} onEditVisual={() => changeView(AppView.QUIZ)} onEditYaml={() => changeView(AppView.PROFILE_EDIT)} onNavigateToWiki={() => changeView(AppView.WIKI)} onNavigateToLanding={() => changeView(AppView.LANDING)} onNavigateToPlan={() => changeView(AppView.PLAN)} onNavigateToChat={() => startNewChat()} onNavigateToAchievements={() => changeView(AppView.ACHIEVEMENTS)} onNavigateToSettings={() => changeView(AppView.SETTINGS)} />}
      {view === AppView.PLAN && <PlanView profile={profile} onNavigateToWiki={() => changeView(AppView.WIKI)} onNavigateToLanding={() => changeView(AppView.LANDING)} onNavigateToProfile={() => changeView(AppView.PROFILE)} onNavigateToChat={() => startNewChat()} onNavigateToAchievements={() => changeView(AppView.ACHIEVEMENTS)} onNavigateToSettings={() => changeView(AppView.SETTINGS)} onNavigateToArticle={handleNavigateToArticle} onUnlockAchievement={handleUnlockAchievement} onNavigateToDashboard={() => changeView(AppView.DASHBOARD)} />}
      {view === AppView.ACHIEVEMENTS && <AchievementsView onBack={handleGlobalBack} profile={profile} />}
    </Layout>
  );
};
export default App;