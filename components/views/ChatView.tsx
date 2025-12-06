
import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
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
  onNavigateToWiki
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
      if (view === AppView.DASHBOARD) onEndSession(); // Logic decision: Home = End Session
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.CHAT}
      className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500"
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-950 sticky top-0 z-10">
        <NavigationLinks 
            currentView={AppView.CHAT} 
            onNavigate={handleNav} 
        />

        <div className="flex items-center gap-3">
          <LanguageSelector className="hidden sm:block" />
          <button 
            data-testid={APP_IDS.VIEWS.CHAT.BTN_END}
            onClick={onEndSession}
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition"
          >
            <Icons.LogOut className="w-4 h-4" /> <span className="hidden md:inline">{t('chat_end_session')}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        data-testid={APP_IDS.VIEWS.CHAT.MSG_LIST}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white dark:bg-gray-950"
      >
        {conversation.messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <Icons.MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>{t('chat_empty_state')}</p>
          </div>
        )}
        {conversation.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === Sender.USER ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm leading-relaxed shadow-sm overflow-hidden
                ${msg.sender === Sender.USER 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tr-sm border border-gray-200 dark:border-gray-700' 
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'
                }`}
            >
              <div 
                className={`prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                  ${msg.sender === Sender.USER 
                    ? 'prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-strong:text-gray-900 dark:prose-strong:text-white' 
                    : 'prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-900 dark:prose-p:text-gray-100'
                  }
                `}
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) as string }} 
              />
              
              {msg.structuredData && msg.structuredData.type === 'navigation_link' && onNavigateToArticle && (
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button
                          onClick={() => onNavigateToArticle && onNavigateToArticle((msg.structuredData as any).data.articleId)}
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                          <Icons.BookOpen className="w-4 h-4" />
                          {(msg.structuredData as any).data.buttonText || t('profile_btn_guide')}
                      </button>
                  </div>
              )}
            </div>

            {msg.structuredData && msg.structuredData.type === 'interactive_choice' && (
                <div className="mt-3 w-full max-w-[85%] md:max-w-[75%] animate-in fade-in slide-in-from-top-2">
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
                                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full transition-all shadow-sm active:scale-95 text-left"
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
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="relative">
          <input
            data-testid={APP_IDS.VIEWS.CHAT.INPUT_FIELD}
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder={t('chat_placeholder')}
            disabled={isTyping}
            className="w-full pl-4 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-base text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition shadow-sm"
          />
          <button 
            data-testid={APP_IDS.VIEWS.CHAT.BTN_SEND}
            onClick={() => onSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-30 transition"
          >
            <Icons.Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
