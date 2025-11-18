import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { Icons } from './components/Icon';
import { AppView, Conversation, Message, Sender, UserProfile, DEFAULT_PROFILE_YAML, TEMPLATE_PROFILE_YAML } from './types';
import * as Storage from './services/storageService';
import * as Gemini from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import WikiView from './components/WikiView';
import ProfileWizard from './components/ProfileWizard';

// Configure marked options for basic GitHub Flavored Markdown support
marked.use({
  gfm: true,
  breaks: true
});

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Chat State
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Profile Edit State
  const [yamlInput, setYamlInput] = useState('');
  const [keyInput, setKeyInput] = useState('');

  // Initialization
  useEffect(() => {
    // Load API Key from storage into process.env
    const envKey = Storage.initializeEnv();
    if (envKey) {
      setApiKey(envKey);
    }

    // Load Profile
    const loadedProfile = Storage.getProfileObject();
    setProfile(loadedProfile);
    setYamlInput(Storage.getProfileYaml());

    // Check for pending summaries on boot
    processPendingSummaries();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, isTyping]);

  const processPendingSummaries = async () => {
    // Key is already in process.env if initializeEnv worked
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
        // Clean up if invalid
        Storage.removePendingSummary(id);
      }
    }
  };

  const handleSaveKey = () => {
    if (keyInput.trim().length > 10) {
      const newKey = keyInput.trim();
      Storage.saveApiKey(newKey); // This also updates process.env.API_KEY
      setApiKey(newKey);
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
    if (!inputText.trim() || !currentConversation || !profile) return;

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
      const responseText = await Gemini.sendMessageToGemini(
        updatedMessages.slice(0, -1), // History excluding current
        userMsg.text, 
        profile
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
        setIsTyping(true); // Reuse typing indicator for loading
        const summary = await Gemini.summarizeConversation(currentConversation.messages);
        Storage.saveSummary(currentConversation.id, summary);
        alert("Summary saved to data/summary/");
      } catch (e) {
        alert("Could not generate summary right now. We've flagged it to try again next time you open the app.");
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
  const handleSaveProfile = () => {
    try {
      Storage.saveProfileYaml(yamlInput);
      setProfile(Storage.getProfileObject()); // Reload object
      setView(AppView.DASHBOARD);
    } catch (e) {
      alert("Invalid YAML format.");
    }
  };

  const handleCreateNewProfile = () => {
    const confirmMsg = "Start a new profile setup? This will replace your current settings.";
    if (window.confirm(confirmMsg)) {
      setView(AppView.QUIZ);
    }
  };

  const handleWizardComplete = (yamlStr: string) => {
    Storage.saveProfileYaml(yamlStr);
    setProfile(Storage.getProfileObject());
    setYamlInput(yamlStr);
    setView(AppView.DASHBOARD);
  };

  const handleLoadDemoProfile = () => {
    if (window.confirm("Load the demo 'Gabriela' profile? This will overwrite current changes.")) {
      const demoYaml = DEFAULT_PROFILE_YAML;
      Storage.saveProfileYaml(demoYaml); // Save immediately for better UX on "Load"
      setProfile(Storage.getProfileObject());
      setYamlInput(demoYaml);
      alert("Demo profile 'Gabriela' loaded!");
    }
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
          <p className="text-gray-600 max-w-md">
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
          <p className="text-xs text-gray-400">Don't have a key? Get a free one from Google AI Studio.</p>
        </div>
      </Layout>
    );
  }

  if (view === AppView.WIKI) {
    return (
      <Layout>
        <WikiView onClose={() => setView(AppView.DASHBOARD)} />
      </Layout>
    );
  }

  if (view === AppView.QUIZ) {
    return (
      <Layout>
        <ProfileWizard 
          onComplete={handleWizardComplete} 
          onCancel={() => setView(AppView.DASHBOARD)} 
        />
      </Layout>
    );
  }

  if (view === AppView.PROFILE) {
    return (
      <Layout>
         <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icons.Edit3 className="w-5 h-5" /> Edit Profile (YAML)
            </h2>
            <button onClick={() => setView(AppView.DASHBOARD)} className="text-gray-500 hover:text-gray-700">
              <Icons.X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">
                Update your details here. This helps the AI provide better advice.
              </p>
              <button onClick={handleLoadDemoProfile} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                 <Icons.User className="w-3 h-3" /> Load Demo Profile
              </button>
            </div>
            <textarea 
              className="flex-1 w-full font-mono text-sm p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none shadow-inner"
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              spellCheck={false}
              placeholder="name: ..."
            />
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50">
             <button 
              onClick={handleSaveProfile}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-2 shadow-md transition transform active:scale-[0.98]"
            >
              <Icons.Save className="w-4 h-4" /> Save Profile
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
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                FW
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Finland Works Assistant</h2>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={handleEndSession}
              className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-red-50 transition"
            >
              <Icons.LogOut className="w-4 h-4" /> End Session
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {currentConversation.messages.length === 0 && (
              <div className="text-center text-gray-400 py-10">
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
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm overflow-hidden
                    ${msg.sender === Sender.USER 
                      ? 'bg-gray-100 text-gray-900 rounded-tr-sm border border-gray-200' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                    }`}
                >
                   {/* Markdown Renderer */}
                   <div 
                      className={`prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                        ${msg.sender === Sender.USER ? 'prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900' : ''}
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
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask something about life in Finland..."
                disabled={isTyping}
                className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none transition shadow-sm"
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

  // DASHBOARD VIEW
  return (
    <Layout>
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        {/* Top Bar / Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {profile?.name && profile.name !== '[Your Name]' ? `Moi, ${profile.name}!` : 'Moi! (Hi!)'}
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        {profile?.name && profile.name !== '[Your Name]' 
                            ? "Welcome back to your personal Finland guide." 
                            : "Let's set up your profile to get started."}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleCreateNewProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm whitespace-nowrap"
                    >
                        <Icons.UserPlus className="w-3 h-3" />
                        New Profile
                    </button>
                    <button 
                         onClick={() => setView(AppView.PROFILE)}
                         className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition shadow-sm whitespace-nowrap"
                    >
                        <Icons.Edit3 className="w-3 h-3" />
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="px-6 md:px-8 py-8 flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => setView(AppView.WIKI)}
            className="flex-1 bg-blue-600 text-white h-24 rounded-xl flex items-center justify-center gap-3 font-medium hover:bg-blue-700 transition shadow-lg group overflow-hidden relative"
          >
             {/* Decorative blob */}
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500 rounded-full opacity-50 group-hover:scale-110 transition duration-500"></div>
            <Icons.Languages className="w-6 h-6 z-10" />
            <span className="z-10 text-lg">What is even Finland?</span>
          </button>
          <button 
            onClick={startNewChat}
            className="flex-1 bg-white border border-gray-200 text-gray-900 h-24 rounded-xl flex items-center justify-center gap-3 font-medium hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition shadow-sm"
          >
            <Icons.MessageSquare className="w-5 h-5 text-blue-600" />
            <span className="text-lg">Ask a question</span>
          </button>
        </div>

        {/* Profile Summary Section */}
        <div className="px-6 md:px-8 pb-8 flex-1">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 h-full">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Profile Overview</h2>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-24 md:w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[70%]"></div>
                  </div>
                  <span className="font-bold text-gray-700 text-xs">70% complete</span>
                </div>
             </div>

             {/* User Card */}
             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 transition hover:shadow-md">
               <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-blue-500">
                    <Icons.User className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{profile?.name || 'New User'}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                         <span>{profile?.ageRange}</span>
                         <span className="text-gray-300">•</span>
                         <span>{profile?.originCountry}</span>
                         <span className="text-gray-300">•</span>
                         <span>{profile?.maritalStatus}</span>
                    </div>
                  </div>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Languages */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                          <Icons.Languages className="w-4 h-4 text-gray-400"/> Languages
                      </h4>
                   </div>
                   <ul className="space-y-2 text-sm">
                      {profile?.languages && profile.languages.length > 0 ? (
                        profile.languages.map((lang, idx) => (
                          <li key={idx} className="flex justify-between">
                              <span className="font-medium text-gray-900">{lang.language}</span> 
                              <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">{lang.level}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic text-xs">No languages listed</li>
                      )}
                   </ul>
                </div>

                {/* Education */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                          <Icons.Rocket className="w-4 h-4 text-gray-400"/> Education & Profession
                      </h4>
                   </div>
                    <div className="space-y-3">
                      <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Education</p>
                          <p className="text-sm text-gray-800 font-medium">
                            {profile?.education ? `${profile.education.degree} in ${profile.education.field}` : 'Not specified'}
                          </p>
                      </div>
                      <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Profession</p>
                          <p className="text-sm text-gray-800 font-medium">{profile?.profession || 'Not specified'}</p>
                      </div>
                    </div>
                </div>
             </div>

             {/* Narrative */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 transition hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Icons.FileText className="w-4 h-4 text-gray-400"/> Personal Narrative
                  </h4>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-2 text-gray-700">Aspirations</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1 marker:text-blue-500">
                      {profile?.aspirations && profile.aspirations.length > 0 ? (
                        profile.aspirations.map((item, i) => <li key={i}>{item}</li>)
                      ) : (
                        <li className="text-gray-400 italic">No aspirations listed</li>
                      )}
                    </ul>
                  </div>
                   <div>
                    <p className="font-semibold mb-2 text-gray-700">Challenges</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1 marker:text-red-500">
                      {profile?.challenges && profile.challenges.length > 0 ? (
                        profile.challenges.map((item, i) => <li key={i}>{item}</li>)
                      ) : (
                        <li className="text-gray-400 italic">No challenges listed</li>
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
};

export default App;