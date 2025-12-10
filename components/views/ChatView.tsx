
import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Icons } from '../Icon';
import { Conversation, Sender } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_IDS } from '../../data/system/identifiers';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';

interface ChatViewProps {
  conversation: Conversation;
  isTyping: boolean;
  inputText: string;
  onInputChange: (val: string) => void;
  onSendMessage: (text?: string, displayLabel?: string) => void; 
  onEndSession: () => void;
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToWiki: () => void;
  onNavigateToLanding: () => void;
  onNavigateToPlan: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversation,
  isTyping,
  inputText,
  onInputChange,
  onSendMessage,
  onEndSession,
  onNavigateToArticle,
  onNavigateToProfile,
  onNavigateToWiki,
  onNavigateToLanding,
  onNavigateToPlan
}) => {
  const { t } = useLanguage();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages, isTyping]);

  const handleOptionClick = (value: string, label: string) => {
      onSendMessage(value, label);
  };

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) { /* Already here */ }
      if (view === AppView.PROFILE) onNavigateToProfile();
      if (view === AppView.PLAN) onNavigateToPlan();
      if (view === AppView.LANDING) onNavigateToLanding();
      if (view === AppView.DASHBOARD) onEndSession(); // Logic decision: Home = End Session
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSendMessage();
      }
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.CHAT}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] relative overflow-hidden transition-colors duration-700"
    >
      {/* Background Aurora for Chat (Subtler) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-40">
         <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-300/20 dark:bg-emerald-500/10 blur-[120px] rounded-full animate-pulse duration-[8000ms]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-300/20 dark:bg-purple-600/10 blur-[120px] rounded-full animate-pulse duration-[10000ms]"></div>
      </div>

      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100/50 dark:border-white/10 flex justify-between items-center bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl sticky top-0 z-20">
        <button 
            data-testid={APP_IDS.VIEWS.CHAT.BTN_END}
            onClick={onEndSession}
            className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-900/20 transition shadow-sm"
        >
            <Icons.ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">{t('btn_back_dashboard')}</span>
        </button>

        <div className="flex items-center gap-3">
          <NavigationLinks 
              currentView={AppView.CHAT} 
              onNavigate={handleNav} 
          />
        </div>
      </div>

      {/* Messages */}
      <div 
        data-testid={APP_IDS.VIEWS.CHAT.MSG_LIST}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10 scroll-smooth"
      >
        {conversation.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500 dark:text-gray-400 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Icons.MessageSquare className="w-10 h-10 text-teal-600 dark:text-emerald-400" />
            </div>
            <p className="font-medium text-lg">{t('chat_empty_state')}</p>
          </div>
        )}
        {conversation.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === Sender.USER ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div 
              className={`max-w-[90%] md:max-w-[75%] rounded-2xl px-5 py-4 text-sm md:text-base leading-relaxed shadow-sm relative overflow-hidden
                ${msg.sender === Sender.USER 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-emerald-600 dark:to-teal-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-[#1a233b] border border-gray-100 dark:border-white/10 text-gray-900 dark:text-gray-100 rounded-tl-sm shadow-md'
                }`}
            >
              {/* Shine effect for user messages */}
              {msg.sender === Sender.USER && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
              )}

              <div 
                className={`prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                  ${msg.sender === Sender.USER 
                    ? 'prose-headings:text-white prose-p:text-white prose-strong:text-white prose-a:text-white prose-li:text-white prose-code:text-white' 
                    : 'prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-900 dark:prose-p:text-gray-100'
                  }
                `}
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }} 
              />
              
              {msg.structuredData && msg.structuredData.type === 'navigation_link' && onNavigateToArticle && (
                  <div className={`mt-4 pt-3 border-t ${msg.sender === Sender.USER ? 'border-white/20' : 'border-gray-100 dark:border-white/10'}`}>
                      <button
                          onClick={() => onNavigateToArticle && onNavigateToArticle((msg.structuredData as any).data.articleId)}
                          className={`flex items-center gap-2 font-bold hover:underline ${msg.sender === Sender.USER ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}
                      >
                          <Icons.BookOpen className="w-4 h-4" />
                          {(msg.structuredData as any).data.buttonText || t('profile_btn_guide')}
                      </button>
                  </div>
              )}
            </div>

            {msg.structuredData && msg.structuredData.type === 'interactive_choice' && (
                <div className="mt-3 w-full max-w-[90%] md:max-w-[75%] animate-in fade-in slide-in-from-top-2">
                    {msg.structuredData.data.question_header && (
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide ml-1">
                            {msg.structuredData.data.question_header}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {msg.structuredData.data.options.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleOptionClick(opt.value, opt.label)}
                                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95 text-left border bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200"
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white dark:bg-[#1a233b] border border-gray-100 dark:border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} className="pb-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-gray-100 dark:border-white/10 bg-white/90 dark:bg-[#0b1021]/90 backdrop-blur-xl relative z-20">
        <div className="relative max-w-4xl mx-auto">
          <input
            data-testid={APP_IDS.VIEWS.CHAT.INPUT_FIELD}
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat_placeholder')}
            disabled={isTyping}
            className="w-full pl-5 pr-14 py-4 bg-gray-50 dark:bg-[#151b2e] border border-gray-200 dark:border-white/10 rounded-2xl text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#1a233b] focus:outline-none transition shadow-inner"
          />
          <button 
            data-testid={APP_IDS.VIEWS.CHAT.BTN_SEND}
            onClick={() => onSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shadow-md"
          >
            <Icons.Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
