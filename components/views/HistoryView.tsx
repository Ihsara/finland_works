
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../Icon';
import { Conversation, Sender } from '../../types';
import { getAllConversations } from '../../services/storageService';
import { useLanguage } from '../../contexts/LanguageContext';
import { marked } from 'marked';

interface HistoryViewProps {
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  const pollInterval = useRef<any>(null);

  // Load conversations on mount and set up polling for pending summaries
  useEffect(() => {
    const loadData = () => {
        const list = getAllConversations();
        setConversations(list);
        
        // If there are any conversations generating summaries, poll for updates
        const hasPending = list.some(c => c.summaryStatus === 'generating');
        if (hasPending && !pollInterval.current) {
            pollInterval.current = setInterval(() => {
                const refreshedList = getAllConversations();
                setConversations(refreshedList);
                if (!refreshedList.some(c => c.summaryStatus === 'generating')) {
                    if (pollInterval.current) {
                        clearInterval(pollInterval.current);
                        pollInterval.current = null;
                    }
                }
            }, 2000);
        } else if (!hasPending && pollInterval.current) {
             clearInterval(pollInterval.current);
             pollInterval.current = null;
        }
        
        // Initial select if none selected
        if (!selectedId && list.length > 0) setSelectedId(list[0].id);
    };

    loadData();

    return () => {
        if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []); // Intentionally empty dep array for initial mount logic, poll handles updates

  const selectedConv = conversations.find(c => c.id === selectedId);

  // Helper for locale-aware dates
  const formatDate = (timestamp: number, fmt: 'short' | 'time') => {
      const localeMap: Record<string, string> = {
          'en': 'en-GB',
          'vi': 'vi-VN',
          'pt-br': 'pt-BR',
          'pt-pt': 'pt-PT',
          'ru': 'ru-RU'
      };
      const locale = localeMap[language] || 'en-GB';
      
      if (fmt === 'time') {
          return new Date(timestamp).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
      }
      return new Date(timestamp).toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center bg-white dark:bg-gray-950 sticky top-0 z-20 shadow-sm">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          <span>{t('btn_back_dashboard')}</span>
        </button>
        <h2 className="ml-4 text-lg font-bold text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-700 pl-4">{t('history_title')}</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-full md:w-80 border-r border-gray-100 dark:border-gray-800 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex-shrink-0" style={{ display: window.innerWidth < 768 && selectedConv ? 'none' : 'block' }}>
          {conversations.length === 0 && (
             <div className="p-10 text-gray-400 dark:text-gray-600 text-sm text-center flex flex-col items-center gap-2">
                <Icons.MessageSquare className="w-8 h-8 opacity-20" />
                {t('history_empty')}
             </div>
          )}
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 transition flex flex-col gap-1 ${
                  selectedId === c.id 
                  ? 'bg-white dark:bg-gray-800 border-l-4 border-l-black dark:border-l-white shadow-sm relative z-10' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                  <div className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2">
                    {c.title ? c.title : formatDate(c.startTime, 'short')}
                  </div>
                  {c.summaryStatus === 'generating' && (
                     <div className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full animate-pulse flex-shrink-0">
                        <Icons.Clock className="w-3 h-3 animate-spin" />
                        Run
                     </div>
                  )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-500">{formatDate(c.startTime, 'time')}</span>
                <span className="text-[10px] bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded-full text-gray-600 dark:text-gray-300">{c.messages.length} msgs</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail View */}
        <div className={`flex-1 overflow-y-auto ${!selectedConv && window.innerWidth < 768 ? 'hidden' : 'block'}`}>
          {/* Mobile Back Button for Detail View */}
          <div className="md:hidden p-4 border-b border-gray-100 dark:border-gray-800">
            <button onClick={() => setSelectedId(null)} className="text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                <Icons.ArrowLeft className="w-4 h-4" /> Back to list
            </button>
          </div>

          {selectedConv ? (
            <div className="flex flex-col h-full bg-white dark:bg-gray-950">
               {/* Header Title */}
               <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{selectedConv.title || formatDate(selectedConv.startTime, 'short')}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {selectedConv.id.substring(0,8)}... (Technical)</p>
               </div>

               {/* Tabs */}
               <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 px-6 pt-4 sticky top-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-10">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className={`pb-3 px-4 text-sm font-bold transition border-b-2 ${
                        activeTab === 'summary' 
                        ? 'border-black dark:border-white text-black dark:text-white' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {t('history_tab_summary')}
                  </button>
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`pb-3 px-4 text-sm font-bold transition border-b-2 ${
                        activeTab === 'transcript' 
                        ? 'border-black dark:border-white text-black dark:text-white' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {t('history_tab_transcript')}
                  </button>
               </div>

               {/* Content Area */}
               <div className="flex-1 overflow-y-auto p-4 md:p-8">
                  {activeTab === 'summary' && (
                      <div className="max-w-3xl mx-auto">
                          {selectedConv.summaryStatus === 'generating' ? (
                             <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex flex-col items-center justify-center text-center">
                                 <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                                 <h3 className="text-blue-900 dark:text-blue-300 font-bold text-lg">{t('history_generating')}</h3>
                                 <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">{t('history_generating_desc')}</p>
                             </div>
                          ) : selectedConv.summary ? (
                            <div className="bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-300 dark:prose-invert">
                                    <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                                        <Icons.FileText className="w-4 h-4"/> {t('history_tab_summary')}
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(selectedConv.summary) as string }} />
                                </div>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-600">
                                <Icons.Ghost className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                <p>{t('history_no_summary')}</p>
                            </div>
                          )}
                      </div>
                  )}

                  {activeTab === 'transcript' && (
                      <div className="space-y-6 max-w-3xl mx-auto pb-10">
                          {selectedConv.messages.map(msg => (
                              <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
                              >
                                {msg.sender === Sender.MODEL && (
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-2">
                                        FW
                                    </div>
                                )}
                                
                                <div className="flex flex-col max-w-[85%] md:max-w-[75%]">
                                    <div 
                                    className={`rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm leading-relaxed shadow-sm overflow-hidden
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
                                    </div>
                                    <div className={`text-[10px] mt-1 opacity-50 text-gray-500 dark:text-gray-400 ${msg.sender === Sender.USER ? 'text-right' : 'text-left pl-1'}`}>
                                        {formatDate(msg.timestamp, 'time')}
                                    </div>
                                </div>

                                {msg.sender === Sender.USER && (
                                     <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ml-2 mt-2 overflow-hidden flex-shrink-0">
                                         {/* Placeholder or actual user avatar if available in context, but for history view generic is fine */}
                                          <Icons.User className="w-full h-full p-1.5 text-gray-500 dark:text-gray-400" />
                                     </div>
                                )}
                              </div>
                          ))}
                      </div>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-700 hidden md:flex">
                <Icons.MessageSquare className="w-16 h-16 mb-4 opacity-10" />
                <p>Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
