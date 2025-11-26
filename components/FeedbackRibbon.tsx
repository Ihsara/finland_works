
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const FeedbackRibbon: React.FC = () => {
  const { t } = useLanguage();
  const link = "https://docs.google.com/forms/d/e/1FAIpQLSeZ9xgACOhnwVmiBntvIn80rzxvBoT9kixqUXwWvTSWKQ-gpQ/viewform";

  return (
    <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border-y border-yellow-100 dark:border-yellow-800/30">
      <div className="w-full flex justify-center py-2 px-4">
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-yellow-800 dark:text-yellow-200 uppercase tracking-wider hover:underline flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-sm">📣</span> 
          {t('feedback_action')}
          <span className="opacity-50 ml-1">→</span>
        </a>
      </div>
    </div>
  );
};
