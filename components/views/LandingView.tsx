
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile, LanguageCode, GUEST_PROFILE } from '../../types';
import { t } from '../../data/languages';

interface LandingViewProps {
  language: LanguageCode;
  profile: UserProfile | null;
  onLanguageSelect: (code: LanguageCode, supported: boolean) => void;
  onStartQuiz: () => void;
  onOpenGuide: () => void;
  onStartChat: () => void;
  onLoadDemo: (silent: boolean) => void;
  onReset: () => void;
  onClearKey: () => void;
  onSetGuest: (p: UserProfile) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  language,
  profile,
  onLanguageSelect,
  onStartQuiz,
  onOpenGuide,
  onStartChat,
  onLoadDemo,
  onReset,
  onClearKey,
  onSetGuest
}) => {
  const showGuideBtn = profile && profile.id !== 'guest';

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 relative bg-white animate-in fade-in duration-500">
      {/* Top Right: Language Selector */}
      <div className="absolute top-8 right-8 z-50">
        <LanguageSelector 
          currentLanguage={language} 
          onSelect={onLanguageSelect} 
          className="min-w-[140px]"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">{t('landing_welcome', language)}</h1>
        <p className="text-xl text-gray-700 mb-12 font-light">{t('landing_subtitle', language)}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button 
            onClick={() => {
              if (showGuideBtn) {
                onOpenGuide();
              } else {
                onStartQuiz();
              }
            }}
            className="flex items-center justify-center gap-3 bg-black text-white border-2 border-black px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg w-full sm:w-auto sm:min-w-[260px] min-h-[64px]"
          >
            {showGuideBtn ? <Icons.BookMarked className="w-5 h-5" /> : <Icons.CheckSquare className="w-5 h-5" />}
            {showGuideBtn ? t('landing_btn_continue', language) : t('landing_btn_quiz', language)}
          </button>
          <button 
            onClick={() => {
              onSetGuest(GUEST_PROFILE);
              onStartChat();
            }}
            className="flex items-center justify-center gap-3 bg-white text-black border-2 border-gray-200 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition shadow-sm w-full sm:w-auto sm:min-w-[260px] min-h-[64px]"
          >
            <Icons.MessageSquare className="w-5 h-5" />
            {t('landing_btn_ask', language)}
          </button>
        </div>
      </div>

      {/* Footer Area: Clear Cache & Sample Profile */}
      <div className="absolute bottom-6 flex flex-col items-center">
        <div className="flex gap-4 text-xs text-gray-500 items-center">
          <button 
            onClick={() => onLoadDemo(false)} 
            className="hover:text-gray-700 underline underline-offset-2 p-2 cursor-pointer"
          >
            {t('landing_load_sample', language)}
          </button>
          <span>•</span>
          <button 
            onClick={onReset} 
            className="hover:text-red-700 text-gray-500 transition-colors p-2 cursor-pointer"
          >
            {t('landing_erase', language)}
          </button>
          <span>•</span>
          <button 
            onClick={onClearKey} 
            className="hover:text-gray-700 text-gray-500 transition-colors p-2 cursor-pointer"
          >
            {t('landing_add_key', language)}
          </button>
        </div>
      </div>
    </div>
  );
};
