
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { LanguageCode, Conversation } from '../../types';
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

  useEffect(() => {
    const list = getAllConversations();
    setConversations(list);
    if (list.length > 0) setSelectedId(list[0].id);
  }, []);

  const selectedConv = conversations.find(c => c.id === selectedId);

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
              <div className="text-sm font-bold text-gray-900">
                {new Date(c.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{new Date(c.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-600">{c.messages.length} msgs</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail View */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${!selectedConv && window.innerWidth < 768 ? 'hidden' : 'block'}`}>
          {/* Mobile Back Button for Detail View */}
          <div className="md:hidden mb-4">
            <button onClick={() => setSelectedId(null)} className="text-sm text-blue-600 font-bold flex items-center gap-1">
                <Icons.ArrowLeft className="w-4 h-4" /> Back to list
            </button>
          </div>

          {selectedConv ? (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex gap-1 mb-6 border-b border-gray-200">
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

               {activeTab === 'summary' && (
                  <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                      {selectedConv.summary ? (
                         <div className="prose prose-sm max-w-none text-gray-800">
                             <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                                <Icons.FileText className="w-4 h-4"/> AI Summary
                             </h3>
                             <div dangerouslySetInnerHTML={{ __html: marked.parse(selectedConv.summary) as string }} />
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
                  <div className="space-y-6">
                      {selectedConv.messages.map(m => (
                          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                              <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-gray-100 text-gray-900 rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-900 rounded-tl-sm'}`}>
                                  <div dangerouslySetInnerHTML={{ __html: marked.parse(m.text) as string }} />
                              </div>
                              <span className="text-[10px] text-gray-400 mt-1 px-1">
                                  {m.sender === 'user' ? 'You' : 'Assistant'} • {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                          </div>
                      ))}
                  </div>
               )}
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
