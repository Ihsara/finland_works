
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile, GUEST_PROFILE } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeedbackRibbon } from '../FeedbackRibbon';

interface LandingViewProps {
  profile: UserProfile | null;
  onStartQuiz: () => void;
  onOpenGuide: () => void;
  onBrowseWiki: () => void;
  onStartChat: () => void;
  onLoadDemo: (silent: boolean) => void;
  onReset: () => void;
  onClearKey: () => void;
  onSetGuest: (p: UserProfile) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  profile,
  onStartQuiz,
  onOpenGuide,
  onBrowseWiki,
  onStartChat,
  onLoadDemo,
  onReset,
  onClearKey,
  onSetGuest
}) => {
  const { t } = useLanguage();
  const showGuideBtn = profile && profile.id !== 'guest';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500 relative overflow-hidden">
      {/* Header Bar with Language Selector (Static, not absolute) */}
      <div className="w-full p-4 md:p-6 flex justify-end items-center shrink-0 z-20">
          <LanguageSelector className="md:min-w-[140px]" />
      </div>

      {/* Feedback Ribbon */}
      <div className="shrink-0">
        <FeedbackRibbon />
      </div>

      <div className="flex-1 overflow-y-auto relative w-full flex flex-col items-center justify-center p-8">
        {/* Main Content */}
        <div className="max-w-xl w-full text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">{t('landing_welcome')}</h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-wrap">
            {/* Primary Action: Quiz or Continue */}
            <button 
              onClick={() => {
                if (showGuideBtn) {
                  onOpenGuide();
                } else {
                  onStartQuiz();
                }
              }}
              className="flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg w-full sm:w-auto sm:min-w-[260px] min-h-[64px]"
            >
              {showGuideBtn ? <Icons.BookMarked className="w-5 h-5" /> : <Icons.CheckSquare className="w-5 h-5" />}
              {showGuideBtn ? t('landing_btn_continue') : t('landing_btn_quiz')}
            </button>

            {/* Secondary Action: Chat */}
            <button 
              onClick={() => {
                onSetGuest(GUEST_PROFILE);
                onStartChat();
              }}
              className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-black dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition shadow-sm w-full sm:w-auto sm:min-w-[260px] min-h-[64px]"
            >
              <Icons.MessageSquare className="w-5 h-5" />
              {t('landing_btn_ask')}
            </button>

            {/* Guest Action: Browse Guide (Only if no profile yet) */}
            {!showGuideBtn && (
               <button
                 onClick={() => {
                   onSetGuest(GUEST_PROFILE);
                   onBrowseWiki();
                 }}
                 className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition shadow-sm w-full sm:w-auto sm:min-w-[260px] min-h-[64px]"
               >
                 <Icons.BookOpen className="w-5 h-5" />
                 {t('landing_btn_browse')}
               </button>
            )}
          </div>
        </div>

        {/* Footer Area: Clear Cache & Sample Profile */}
        <div className="mt-12 md:absolute md:bottom-6 flex flex-col items-center">
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 items-center">
            <button 
              onClick={() => onLoadDemo(false)} 
              className="hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2 p-2 cursor-pointer"
            >
              {t('landing_load_sample')}
            </button>
            <span>•</span>
            <button 
              onClick={onReset} 
              className="hover:text-red-700 dark:hover:text-red-400 text-gray-500 dark:text-gray-400 transition-colors p-2 cursor-pointer"
            >
              {t('landing_erase')}
            </button>
            <span>•</span>
            <button 
              onClick={onClearKey} 
              className="hover:text-gray-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-400 transition-colors p-2 cursor-pointer"
            >
              {t('landing_add_key')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
