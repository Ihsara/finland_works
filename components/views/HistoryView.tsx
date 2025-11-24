
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../Icon';
import { LanguageCode, Conversation, Sender } from '../../types';
import { getAllConversations } from '../../services/storageService';
import { t } from '../../data/languages';
import { marked } from 'marked';

interface HistoryViewProps {
  language: LanguageCode;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ language, onBack }) => {
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
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-20 shadow-sm">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-800 hover:text-black transition font-medium px-3 py-2 hover:bg-gray-50 rounded-lg"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          <span>{t('btn_back_dashboard', language)}</span>
        </button>
        <h2 className="ml-4 text-lg font-bold text-gray-900 border-l border-gray-200 pl-4">{t('history_title', language)}</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-full md:w-80 border-r border-gray-100 overflow-y-auto bg-gray-50 flex-shrink-0" style={{ display: window.innerWidth < 768 && selectedConv ? 'none' : 'block' }}>
          {conversations.length === 0 && (
             <div className="p-10 text-gray-400 text-sm text-center flex flex-col items-center gap-2">
                <Icons.MessageSquare className="w-8 h-8 opacity-20" />
                {t('history_empty', language)}
             </div>
          )}
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-white transition flex flex-col gap-1 ${selectedId === c.id ? 'bg-white border-l-4 border-l-black shadow-sm relative z-10' : 'text-gray-600'}`}
            >
              <div className="flex items-center justify-between w-full">
                  <div className="text-sm font-bold text-gray-900 truncate pr-2">
                    {c.title ? c.title : formatDate(c.startTime, 'short')}
                  </div>
                  {c.summaryStatus === 'generating' && (
                     <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full animate-pulse flex-shrink-0">
                        <Icons.Clock className="w-3 h-3 animate-spin" />
                        Run
                     </div>
                  )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{formatDate(c.startTime, 'time')}</span>
                <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-600">{c.messages.length} msgs</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail View */}
        <div className={`flex-1 overflow-y-auto ${!selectedConv && window.innerWidth < 768 ? 'hidden' : 'block'}`}>
          {/* Mobile Back Button for Detail View */}
          <div className="md:hidden p-4 border-b border-gray-100">
            <button onClick={() => setSelectedId(null)} className="text-sm text-blue-600 font-bold flex items-center gap-1">
                <Icons.ArrowLeft className="w-4 h-4" /> Back to list
            </button>
          </div>

          {selectedConv ? (
            <div className="flex flex-col h-full">
               {/* Header Title */}
               <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-bold text-xl text-gray-900">{selectedConv.title || formatDate(selectedConv.startTime, 'short')}</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: {selectedConv.id.substring(0,8)}... (Technical)</p>
               </div>

               {/* Tabs */}
               <div className="flex gap-1 border-b border-gray-200 px-6 pt-4 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className={`pb-3 px-4 text-sm font-bold transition border-b-2 ${activeTab === 'summary' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                  >
                    {t('history_tab_summary', language)}
                  </button>
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`pb-3 px-4 text-sm font-bold transition border-b-2 ${activeTab === 'transcript' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                  >
                    {t('history_tab_transcript', language)}
                  </button>
               </div>

               {/* Content Area */}
               <div className="flex-1 overflow-y-auto p-4 md:p-8">
                  {activeTab === 'summary' && (
                      <div className="max-w-3xl mx-auto">
                          {selectedConv.summaryStatus === 'generating' ? (
                             <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center">
                                 <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                 <h3 className="text-blue-900 font-bold text-lg">{t('history_generating', language)}</h3>
                                 <p className="text-blue-700 text-sm mt-1">{t('history_generating_desc', language)}</p>
                             </div>
                          ) : selectedConv.summary ? (
                            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <div className="prose prose-sm max-w-none text-gray-800">
                                    <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                                        <Icons.FileText className="w-4 h-4"/> {t('history_tab_summary', language)}
                                    </h3>
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(selectedConv.summary) as string }} />
                                </div>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-gray-500">
                                <Icons.Ghost className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                <p>{t('history_no_summary', language)}</p>
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
                                  <div className={`text-[10px] mt-2 opacity-50 ${msg.sender === Sender.USER ? 'text-right' : 'text-left'}`}>
                                      {formatDate(msg.timestamp, 'time')}
                                  </div>
                                </div>
                              </div>
                          ))}
                      </div>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 hidden md:flex">
                <Icons.MessageSquare className="w-16 h-16 mb-4 opacity-10" />
                <p>Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
