
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile, GUEST_PROFILE } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { APP_IDS } from '../../data/system/identifiers';

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
    <div 
      data-scene-id={APP_IDS.SCENES.LANDING}
      className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500 relative overflow-hidden"
    >
      {/* Header Bar */}
      <div className="w-full p-4 md:p-6 flex justify-end items-center shrink-0 z-20">
          <LanguageSelector 
            className="md:min-w-[140px]" 
            data-testid={APP_IDS.COMPONENTS.NAVBAR.LANG_SELECTOR}
          />
      </div>

      {/* Feedback Ribbon */}
      <div className="shrink-0">
        <FeedbackRibbon />
      </div>

      <div className="flex-1 overflow-y-auto relative w-full flex flex-col items-center justify-center p-6 md:p-8">
        {/* Main Content */}
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <h1 
            data-testid={APP_IDS.VIEWS.LANDING.HERO_TITLE}
            className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight"
          >
            {t('landing_welcome')}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 md:mb-12 max-w-lg">
            {t('landing_subtitle')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full max-w-3xl">
            
            {/* 1. Go to Knowledge Base (Browse) */}
            <button
               data-testid={APP_IDS.VIEWS.LANDING.BTN_BROWSE}
               onClick={() => {
                 onSetGuest(GUEST_PROFILE);
                 onBrowseWiki();
               }}
               className="w-full md:flex-1 flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 p-5 md:p-8 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 group touch-manipulation text-left md:text-center"
             >
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Icons.BookOpen className="w-6 h-6 md:w-8 md:h-8" />
               </div>
               <span>{t('landing_btn_browse')}</span>
             </button>

            {/* 2. Tell me about you (Quiz) - Primary */}
            <button 
              data-testid={showGuideBtn ? APP_IDS.VIEWS.LANDING.BTN_CONTINUE : APP_IDS.VIEWS.LANDING.BTN_QUIZ}
              onClick={() => {
                if (showGuideBtn) onOpenGuide();
                else onStartQuiz();
              }}
              className="w-full md:flex-1 flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 bg-black dark:bg-white text-white dark:text-black border-2 border-transparent p-5 md:p-8 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg hover:opacity-90 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 group shadow-2xl shadow-black/20 touch-manipulation text-left md:text-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                 {showGuideBtn ? <Icons.BookMarked className="w-6 h-6 md:w-8 md:h-8" /> : <Icons.UserPlus className="w-6 h-6 md:w-8 md:h-8" />}
              </div>
              <span>{showGuideBtn ? t('landing_btn_continue') : t('landing_btn_quiz')}</span>
            </button>

            {/* 3. Start a Chat */}
            <button 
              data-testid={APP_IDS.VIEWS.LANDING.BTN_CHAT}
              onClick={() => {
                onSetGuest(GUEST_PROFILE);
                onStartChat();
              }}
              className="w-full md:flex-1 flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-800 p-5 md:p-8 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 group touch-manipulation text-left md:text-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                 <Icons.MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span>{t('landing_btn_ask')}</span>
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500 items-center">
            <button 
                data-testid={APP_IDS.VIEWS.LANDING.LINK_SAMPLE}
                onClick={() => onLoadDemo(false)} 
                className="p-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors active:scale-95"
            >
                {t('landing_load_sample')}
            </button>
            <button 
                data-testid={APP_IDS.VIEWS.LANDING.LINK_RESET}
                onClick={onReset} 
                className="p-3 hover:text-red-500 transition-colors active:scale-95"
            >
                {t('landing_erase')}
            </button>
            <button 
                data-testid={APP_IDS.VIEWS.LANDING.LINK_KEY}
                onClick={onClearKey} 
                className="p-3 hover:text-gray-600 dark:hover:text-gray-300 transition-colors active:scale-95"
            >
                {t('landing_add_key')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
