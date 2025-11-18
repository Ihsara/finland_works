import React, { useState } from 'react';
import { Icons } from './Icon';
import { WIKI_CONTENT, WikiArticle } from '../data/wikiContent';
import { marked } from 'marked';
import { AppView } from '../types';

interface WikiViewProps {
  onClose: () => void;
}

const WikiView: React.FC<WikiViewProps> = ({ onClose }) => {
  const [activeArticle, setActiveArticle] = useState<WikiArticle>(WIKI_CONTENT[0]);

  // Helper to render icons dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.FileText;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Icons.Languages className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-xl">What is even Finland?</h2>
            <p className="text-xs text-gray-500">Essential guide for newcomers</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <Icons.X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 md:w-1/4 bg-gray-50 border-r border-gray-100 overflow-y-auto p-4 space-y-2">
          {WIKI_CONTENT.map((article) => (
            <button
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition ${
                activeArticle.id === article.id 
                  ? 'bg-white shadow-sm text-blue-600 border border-blue-100' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={activeArticle.id === article.id ? 'text-blue-500' : 'text-gray-400'}>
                {renderIcon(article.icon)}
              </span>
              <span className="text-sm font-medium hidden md:block">{article.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          <article className="prose prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl">
             <div dangerouslySetInnerHTML={{ __html: marked.parse(activeArticle.content) as string }} />
          </article>
          
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between text-sm text-gray-400">
            <span>Was this helpful?</span>
            <span className="italic">Finland Works! Guide</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiView;
