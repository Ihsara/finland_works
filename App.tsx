
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { Icons } from './components/Icon';
import { AppView, Conversation, Message, Sender, UserProfile, GUEST_PROFILE, LanguageCode } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import WikiView from './components/WikiView';
import ProfileWizard from './components/ProfileWizard';
import { getAllFlattenedArticles } from './data/wikiContent';
import { t, SUPPORTED_LANGUAGES } from './data/languages';
import { LanguageSelector } from './components/LanguageSelector';

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
  const [wikiStats, setWikiStats] = useState({ total: 0, done: 0, percentage: 0 });
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  // Chat State
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Profile Edit State
  const [yamlInput, setYamlInput] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Initialization
  useEffect(() => {
    // 1. Load API Key from local storage (User Manual Input)
    // initializeEnv returns the stored key AND sets it to process.env.API_KEY
    const localKey = Storage.initializeEnv();
    
    if (localKey) {
      setApiKey(localKey);
    } else if (process.env.API_KEY) {
      // 2. Fallback: If no local key, check if one was injected by the environment/build
      setApiKey(process.env.API_KEY);
    }

    // 3. Load Language Preference
    const storedLang = localStorage.getItem('fw_language') as LanguageCode;
    if (storedLang && SUPPORTED_LANGUAGES.some(l => l.code === storedLang)) {
      setLanguage(storedLang);
    }

    refreshProfiles();

    // Check for pending summaries on boot
    processPendingSummaries();
  }, []);

  // Refresh stats whenever view changes to Dashboard or profile changes
  useEffect(() => {
    if (profile) {
      calculateWikiStats(profile);
      calculateProfileCompleteness(profile);
    }
  }, [view, profile, language]); // Recalculate when language changes too

  const calculateWikiStats = (currentProfile: UserProfile) => {
    const progressData = Storage.getWikiProgress(currentProfile.id);
    // Use flattened list for total count based on current language
    const allArticles = getAllFlattenedArticles(language);
    const total = allArticles.length;
    const doneCount = Object.values(progressData.items).filter(item => item.status === 'done').length;
    
    setWikiStats({
      total,
      done: doneCount,
      percentage: total === 0 ? 0 : Math.round((doneCount / total) * 100)
    });
  };

  const calculateProfileCompleteness = (p: UserProfile) => {
    const fields = [
      p.name,
      p.ageRange,
      p.originCountry,
      p.residencePermitType,
      p.maritalStatus,
      p.profession,
      p.education?.degree,
      p.languages?.length > 0 ? 'yes' : '',
      p.aspirations?.length > 0 ? 'yes' : ''
    ];
    const filled = fields.filter(f => f && f !== 'Unknown').length;
    const total = fields.length;
    setProfileCompleteness(Math.round((filled / total) * 100));
  }

  const refreshProfiles = () => {
    const profiles = Storage.getAllProfiles();
    setAllProfiles(profiles);
    
    const active = Storage.getActiveProfile();
    setProfile(active);
    if (active) {
      setYamlInput(Storage.profileToYaml(active));
      calculateWikiStats(active);
      calculateProfileCompleteness(active);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, isTyping]);

  const processPendingSummaries = async () => {
    const pendingIds = Storage.getPendingSummaries();
    if (pendingIds.length === 0) return;

    console.log(`Processing ${pendingIds.length} pending summaries...`);
    
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

  const handleSaveKey = () => {
    if (keyInput.trim().length > 10) {
      const newKey = keyInput.trim();
      Storage.saveApiKey(newKey);
      setApiKey(newKey);
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
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentConversation) return;
    
    // Ensure a profile exists for context, defaulting if necessary
    const activeProfile = profile || Storage.getActiveProfile();
    if (!activeProfile) {
        alert("Please create a profile first so I can help you better.");
        setView(AppView.QUIZ);
        return;
    }

    const userMsg: Message = {
      id: uuidv4(),
      sender: Sender.USER,
      text: inputText,
      timestamp: Date.now()
    };

    const updatedMessages = [...currentConversation.messages, userMsg];
    const updatedConv = { ...currentConversation, messages: updatedMessages };
    
    setCurrentConversation(updatedConv);
    Storage.saveConversation(updatedConv);
    setInputText('');
    setIsTyping(true);

    try {
      // Get the latest Wiki progress to pass to context
      // If guest, getWikiProgress handles unknown ID gracefully
      const progress = Storage.getWikiProgress(activeProfile.id);
      
      // Pass flattened articles for AI context based on CURRENT LANGUAGE
      const allArticles = getAllFlattenedArticles(language);

      const responseText = await Gemini.sendMessageToGemini(
        updatedMessages.slice(0, -1), 
        userMsg.text, 
        activeProfile,
        progress,
        allArticles,
        language // Pass selected language
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

  // --- Profile Handling ---
  const handleSwitchProfile = (id: string) => {
    Storage.setActiveProfileId(id);
    refreshProfiles();
    setIsProfileMenuOpen(false);
    // If switching profile from DASHBOARD, stay there.
    // If switching from PROFILE view, refresh content.
  };

  const handleSaveProfileEdit = () => {
    try {
      const updated = Storage.saveProfileFromYaml(yamlInput);
      setProfile(updated);
      refreshProfiles(); // Update list if name changed
      setView(AppView.PROFILE); // Go back to visual profile
    } catch (e) {
      alert("Invalid YAML format.");
    }
  };

  const handleCreateNewProfile = () => {
    // Clear current profile ID effectively by going to empty Quiz
    // But Quiz uses internal state, so just switching view is enough if we don't pass initialData
    setProfile(null); // Temporary clear for the wizard context
    setView(AppView.QUIZ);
  };

  const handleEditProfileVisual = () => {
     setView(AppView.QUIZ);
  };

  const handleWizardComplete = (newProfile: UserProfile) => {
    Storage.saveProfile(newProfile);
    Storage.setActiveProfileId(newProfile.id);
    refreshProfiles();
    setView(AppView.DASHBOARD);
  };

  const handleLoadDemoProfile = (silent: boolean = false) => {
    // Instant Load: No confirmation dialog for smoother "Demo" experience
    
    try {
      // 1. Refresh profiles (getAllProfiles internal logic ensures 'demo-gabriela' exists)
      const profiles = Storage.getAllProfiles();
      
      // 2. Try to switch to the standard demo profile
      let targetProfile = profiles.find(p => p.id === 'demo-gabriela');
      
      if (!targetProfile) {
         // Fallback: Create a new demo profile if the standard one is missing for some reason
         try {
             targetProfile = Storage.createDemoProfile();
         } catch (e) {
             console.error("Failed to create demo profile", e);
             if (!silent) alert("Could not load the sample profile.");
             return;
         }
      }

      // 3. Activate and Transition
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

  // --- HELPER: Avatar URL Generator ---
  const getAvatarUrl = (p: UserProfile | null) => {
    const name = p?.name || 'Guest';
    // Seed composition: Name + Country + Age + ID to ensure diversity even with similar names
    const extraSeed = (p?.originCountry || '') + (p?.ageRange || '') + (p?.id || '');
    const seed = encodeURIComponent(name + extraSeed);
    return `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&backgroundColor=transparent`;
  };

  // --- RENDERERS ---

  if (!apiKey) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <Icons.Key className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Finland Works!</h1>
          <p className="text-gray-700 max-w-md">
            To ensure your privacy, this app runs locally. Please provide your Google Gemini API Key to start. 
            This key is stored only on your device in <code className="bg-gray-100 px-1 rounded">data/.env</code>.
          </p>
          <input 
            type="password" 
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter Gemini API Key"
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button 
            onClick={handleSaveKey}
            disabled={keyInput.length < 5}
            className="w-full max-w-md bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            Save & Continue
          </button>
          <p className="text-xs text-gray-500">Don't have a key? Get a free one from Google AI Studio.</p>
        </div>
      </Layout>
    );
  }

  if (view === AppView.LANDING) {
      return (
          <Layout>
              <div className="flex flex-col items-center justify-center h-full p-8 relative bg-white">
                  {/* Top Right: Language Selector */}
                  <div className="absolute top-8 right-8 z-50">
                      <LanguageSelector 
                        currentLanguage={language} 
                        onSelect={handleLanguageSelect} 
                        className="min-w-[140px]"
                      />
                  </div>

                  {/* Main Content */}
                  <div className="max-w-xl w-full text-center">
                      <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">{t('landing_welcome', language)}</h1>
                      <p className="text-xl text-gray-700 mb-12 font-light">{t('landing_subtitle', language)}</p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <button 
                              onClick={() => {
                                setProfile(null);
                                setView(AppView.QUIZ);
                              }}
                              className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-lg font-medium hover:bg-black transition shadow-lg min-w-[240px]"
                          >
                              <Icons.CheckSquare className="w-5 h-5" />
                              {t('landing_btn_quiz', language)}
                          </button>
                          <button 
                              onClick={() => {
                                  // Set GUEST_PROFILE for an anonymous session.
                                  setProfile(GUEST_PROFILE);
                                  startNewChat();
                              }}
                              className="flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-300 px-8 py-5 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm min-w-[240px]"
                          >
                              <Icons.MessageSquare className="w-5 h-5" />
                              {t('landing_btn_ask', language)}
                          </button>
                      </div>
                  </div>

                  {/* Footer Area: Clear Cache & Sample Profile */}
                  <div className="absolute bottom-6 flex flex-col items-center">
                       <div className="flex gap-4 text-xs text-gray-500 items-center">
                          <button 
                              onClick={() => handleLoadDemoProfile(false)} 
                              className="hover:text-gray-700 underline underline-offset-2 p-2 cursor-pointer"
                          >
                              {t('landing_load_sample', language)}
                          </button>
                          <span>•</span>
                          <button 
                              onClick={handleResetData} 
                              className="hover:text-red-700 text-gray-500 transition-colors p-2 cursor-pointer"
                          >
                              {t('landing_erase', language)}
                          </button>
                          <span>•</span>
                          <button 
                              onClick={() => setApiKey(null)} 
                              className="hover:text-gray-700 text-gray-500 transition-colors p-2 cursor-pointer"
                          >
                              {t('landing_add_key', language)}
                          </button>
                      </div>
                  </div>
              </div>
          </Layout>
      );
  }

  if (view === AppView.WIKI) {
    return (
      <Layout>
        <WikiView 
          profile={profile}
          onClose={() => setView(AppView.PROFILE)} // Back to Profile
          language={language}
          onLanguageSelect={handleLanguageSelect}
        />
      </Layout>
    );
  }

  if (view === AppView.QUIZ) {
    return (
      <Layout>
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => setView(AppView.DASHBOARD)} 
          language={language}
          onLanguageSelect={handleLanguageSelect}
          initialData={profile} // Pass current profile if editing
        />
      </Layout>
    );
  }

  if (view === AppView.PROFILE_EDIT) {
    return (
      <Layout>
         <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white z-50">
             <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-gray-900">
                  <Icons.Edit3 className="w-5 h-5" /> {t('dash_edit_profile', language)} (YAML)
                </h2>
             </div>
             <div className="flex items-center gap-3">
                <LanguageSelector currentLanguage={language} onSelect={handleLanguageSelect} />
                <button onClick={() => setView(AppView.PROFILE)} className="text-gray-600 hover:text-gray-800">
                  <Icons.X className="w-6 h-6" />
                </button>
             </div>
          </div>
          <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Update details for: <span className="font-bold text-black">{profile?.name}</span>
              </p>
              <button onClick={() => handleLoadDemoProfile(false)} className="text-xs text-blue-700 hover:underline flex items-center gap-1">
                 <Icons.User className="w-3 h-3" /> Load Demo
              </button>
            </div>
            <textarea 
              className="flex-1 w-full font-mono text-sm p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none shadow-inner text-gray-900"
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              spellCheck={false}
              placeholder="name: ..."
            />
          </div>
          <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50">
             <button 
              onClick={handleSaveProfileEdit}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-2 shadow-md transition transform active:scale-[0.98]"
            >
              <Icons.Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (view === AppView.CHAT && currentConversation) {
    return (
      <Layout>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                FW
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm md:text-base">{t('chat_header_assistant', language)}</h2>
                <p className="text-[10px] md:text-xs text-green-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <LanguageSelector currentLanguage={language} onSelect={handleLanguageSelect} className="hidden sm:block" />
                <button 
                  onClick={handleEndSession}
                  className="text-sm text-gray-700 hover:text-red-700 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-red-50 transition"
                >
                  <Icons.LogOut className="w-4 h-4" /> <span className="hidden md:inline">{t('chat_end_session', language)}</span>
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white">
            {currentConversation.messages.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                <Icons.MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Start the conversation by asking a question below.</p>
              </div>
            )}
            {currentConversation.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm leading-relaxed shadow-sm overflow-hidden
                    ${msg.sender === Sender.USER 
                      ? 'bg-gray-100 text-gray-900 rounded-tr-sm border border-gray-200' 
                      : 'bg-white border border-gray-200 text-gray-900 rounded-tl-sm'
                    }`}
                >
                   <div 
                      className={`prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                        ${msg.sender === Sender.USER ? 'prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900' : 'prose-headings:text-gray-900 prose-p:text-gray-900'}
                      `}
                      dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }} 
                   />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('chat_placeholder', language)}
                disabled={isTyping}
                className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition shadow-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-30 transition"
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // --- DETAILED PROFILE VIEW (Screenshot 2) ---
  if (view === AppView.PROFILE) {
    return (
      <Layout>
        <div className="flex flex-col h-full bg-white overflow-y-auto">
          {/* New Robust Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
             <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setView(AppView.DASHBOARD)} 
                   className="flex items-center gap-2 text-gray-800 hover:text-black transition font-medium px-3 py-2 hover:bg-gray-50 rounded-lg"
                 >
                   <Icons.ArrowLeft className="w-5 h-5" />
                   <span className="hidden sm:inline">{t('btn_back_dashboard', language)}</span>
                 </button>
             </div>
             
             <div className="flex items-center gap-3 relative">
                 <LanguageSelector currentLanguage={language} onSelect={handleLanguageSelect} />
                 
                 <div className="relative">
                    <button 
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="text-xs font-bold text-gray-700 hover:text-black flex items-center gap-1 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-full border border-gray-100"
                    >
                      {t('dash_switch_profile', language)} <Icons.ChevronDown className="w-3 h-3" />
                    </button>
                    {isProfileMenuOpen && (
                            <div className="absolute right-0 top-10 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                              <div className="max-h-64 overflow-y-auto">
                                  {allProfiles.map(p => (
                                    <button 
                                      key={p.id}
                                      onClick={() => handleSwitchProfile(p.id)}
                                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0 ${profile?.id === p.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                                    >
                                      <span className="font-medium">{p.name}</span>
                                      {profile?.id === p.id && <Icons.CheckCircle className="w-3 h-3" />}
                                    </button>
                                  ))}
                                  <button 
                                    onClick={handleCreateNewProfile}
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-blue-600 font-bold flex items-center gap-2"
                                  >
                                    <Icons.UserPlus className="w-4 h-4" /> {t('dash_new_profile', language)}
                                  </button>
                              </div>
                            </div>
                      )}
                 </div>
             </div>
          </div>

          <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
             {/* Top Section: Avatar + Info + Progress */}
             <div className="flex flex-col md:flex-row gap-8 mb-10 items-start md:items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg relative group">
                   {profile ? (
                      <img 
                        src={getAvatarUrl(profile)} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Icons.User className="w-12 h-12" />
                      </div>
                   )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                   <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile?.name || 'Guest'}</h1>
                   <div className="text-gray-700 space-y-1">
                      <p className="flex items-center gap-2"><Icons.Calendar className="w-4 h-4 opacity-70"/> {profile?.ageRange || 'Age unknown'}</p>
                      <p className="flex items-center gap-2"><Icons.Home className="w-4 h-4 opacity-70"/> {profile?.originCountry || 'Unknown Origin'}</p>
                      <p className="flex items-center gap-2"><Icons.Heart className="w-4 h-4 opacity-70"/> {profile?.maritalStatus || 'Unknown Status'}</p>
                   </div>
                </div>

                <div className="w-full md:w-72 flex flex-col justify-center gap-3 bg-gray-50 p-5 rounded-xl">
                    <div className="flex justify-between items-end">
                       <span className="text-sm font-bold text-black">{t('profile_completeness', language, { percentage: profileCompleteness.toString() })}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-black rounded-full transition-all duration-1000 ease-out" style={{ width: `${profileCompleteness}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-700">{t('profile_completeness_hint', language)}</p>
                    <button 
                       onClick={handleEditProfileVisual}
                       className="bg-white border border-gray-200 text-black py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition shadow-sm"
                    >
                      {profileCompleteness === 100 ? t('profile_btn_update', language) : t('profile_btn_continue', language)}
                    </button>
                </div>
             </div>

             {/* Action Buttons */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <button 
                  onClick={() => setView(AppView.WIKI)}
                  className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-black transition group bg-white shadow-sm hover:shadow-md"
                >
                   <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-black group-hover:text-white transition">
                        <Icons.BookMarked className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-900">{t('profile_btn_guide', language)}</span>
                        <span className="text-sm text-gray-600">{t('profile_btn_guide_desc', language)}</span>
                      </div>
                   </div>
                   <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black" />
                </button>
                <button className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-black transition group bg-white shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-50 p-3 rounded-full text-green-600 group-hover:bg-black group-hover:text-white transition">
                        <Icons.Rocket className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <span className="block text-lg font-bold text-gray-900">{t('profile_btn_plan', language)}</span>
                        <span className="text-sm text-gray-600">{t('profile_btn_plan_desc', language)}</span>
                      </div>
                   </div>
                   <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black" />
                </button>
             </div>

             {/* Info Cards - CRASH FIXED: Added Optional Chaining throughout */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Languages */}
                <div className="bg-gray-50 p-6 rounded-2xl relative group">
                   <button onClick={handleEditProfileVisual} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
                      <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
                   </button>
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.Languages className="w-5 h-5"/> {t('profile_sect_languages', language)}</h3>
                   <div className="space-y-3">
                      {(profile?.languages && profile.languages.length > 0) ? (
                        profile.languages.map((l, i) => (
                          <div key={i} className="flex flex-col pb-2 border-b border-gray-200 last:border-0">
                             <span className="font-bold text-gray-800">{l.language}</span>
                             <span className="text-sm text-gray-700">{l.level}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No languages specified.</p>
                      )}
                   </div>
                </div>

                {/* Education */}
                <div className="bg-gray-50 p-6 rounded-2xl relative group">
                   <button onClick={handleEditProfileVisual} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
                      <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
                   </button>
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.GraduationCap className="w-5 h-5"/> {t('profile_sect_skills', language)}</h3>
                   <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-black mb-1 text-sm uppercase tracking-wide text-gray-600">{t('profile_label_education', language)}</h4>
                        <p className="text-gray-800 font-medium">
                          {profile?.education?.degree || 'Not specified'} 
                          {profile?.education?.field ? ` in ${profile.education.field}` : ''}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-1 text-sm uppercase tracking-wide text-gray-600">{t('profile_label_profession', language)}</h4>
                        <p className="text-gray-800 font-medium">{profile?.profession || 'Not specified'}</p>
                      </div>
                   </div>
                </div>

                {/* Narrative - Full Width */}
                <div className="bg-gray-50 p-6 rounded-2xl relative group md:col-span-2">
                   <button onClick={handleEditProfileVisual} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
                      <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
                   </button>
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.User className="w-5 h-5"/> {t('profile_sect_narrative', language)}</h3>
                   <div className="space-y-6">
                      <div>
                         <h4 className="font-bold text-black mb-2">{t('profile_label_aspirations', language)}</h4>
                         <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {(profile?.aspirations && profile.aspirations.length > 0) ? (
                                profile.aspirations.map((a, i) => <li key={i}>{a}</li>)
                            ) : (
                                <li className="text-gray-500 italic list-none ml-[-1rem]">No aspirations listed yet.</li>
                            )}
                         </ul>
                      </div>
                      <div>
                         <h4 className="font-bold text-black mb-2">{t('profile_label_challenges', language)}</h4>
                         <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {(profile?.challenges && profile.challenges.length > 0) ? (
                                profile.challenges.map((a, i) => <li key={i}>{a}</li>)
                            ) : (
                                <li className="text-gray-500 italic list-none ml-[-1rem]">No challenges listed yet.</li>
                            )}
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Layout>
    );
  }

  // --- MAIN DASHBOARD VIEW (Screenshot 1) ---
  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        {/* Simple Header */}
        <div className="p-6 flex justify-between items-center">
             <LanguageSelector currentLanguage={language} onSelect={handleLanguageSelect} />

             <button 
               onClick={() => setView(AppView.PROFILE)}
               className="p-1 hover:scale-105 transition transform duration-200 group relative"
             >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-black shadow-sm">
                    <img 
                        src={getAvatarUrl(profile)} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    ME
                </div>
             </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32 text-center max-w-2xl mx-auto w-full animate-in fade-in duration-700">
             <div className="mb-8 relative">
                <button
                    onClick={() => setView(AppView.PROFILE)} 
                    className="w-24 h-24 block rounded-full bg-gray-100 mx-auto overflow-hidden mb-4 border-4 border-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    title="View Profile"
                >
                    <img 
                        src={getAvatarUrl(profile)} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                    />
                </button>
             </div>

             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
               {profile ? t('dash_greeting', language, { name: profile.name?.split(' ')[0] || 'Friend' }) : t('dash_greeting_guest', language)}
             </h1>
             <p className="text-xl text-gray-800 mb-12 font-light">
               {profileCompleteness < 100 && profile
                  ? t('profile_completeness_hint', language)
                  : profile 
                    ? t('dash_subtitle', language)
                    : t('dash_subtitle_guest', language)
                }
             </p>

             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {profileCompleteness === 100 ? (
                    <button 
                       onClick={() => setView(AppView.WIKI)}
                       className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg min-w-[260px]"
                    >
                       <Icons.BookMarked className="w-5 h-5" /> 
                       {t('dash_btn_guide', language)}
                    </button>
                ) : (
                    <button 
                       onClick={() => setView(AppView.QUIZ)}
                       className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg min-w-[260px]"
                    >
                       <Icons.CheckSquare className="w-5 h-5" /> 
                       {t('landing_btn_quiz', language)}
                    </button>
                )}
                <button 
                   onClick={startNewChat}
                   className="flex items-center justify-center gap-3 bg-white text-black border border-gray-300 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-sm min-w-[260px]"
                >
                   <Icons.MessageSquare className="w-5 h-5" /> 
                   {t('landing_btn_ask', language)}
                </button>
             </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
