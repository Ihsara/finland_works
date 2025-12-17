
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { Logo } from '../Logo';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile, GUEST_PROFILE } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_IDS } from '../../data/system/identifiers';

interface LandingViewProps {
  profile: UserProfile | null;
  onStartQuiz: () => void;
  onOpenGuide: () => void;
  onBrowseWiki: () => void;
  onStartChat: () => void;
  onLoadDemo: (silent: boolean) => void;
  onReset: () => void;
  onOpenSettings: () => void;
  onSetGuest: (p: UserProfile) => void;
}

// Internal Component: Rotating City Name
const CitySlideshow = () => {
  const [index, setIndex] = useState(0);
  const cities = ["Finland", "Vantaa"];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % cities.length);
        setVisible(true);
      }, 500); // Duration matches transition
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid grid-cols-1 justify-items-end">
      {/* Invisible spacer to reserve width of the longest city */}
      <span className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none" aria-hidden="true">Finland</span>
      
      {/* Animated visible text */}
      <span className={`
        col-start-1 row-start-1
        inline-block transition-all duration-500 ease-in-out transform
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        bg-clip-text text-transparent bg-gradient-to-r 
        ${index === 0 
          ? 'from-blue-600 to-indigo-600 dark:from-emerald-200 dark:via-teal-200 dark:to-cyan-200' 
          : 'from-fuchsia-600 to-pink-600 dark:from-fuchsia-300 dark:to-pink-300' 
        }
      `}>
        {cities[index]}
      </span>
    </span>
  );
};

// Internal Component: Compact Rotating Button (Horizontal on Mobile, Vertical on Desktop)
const RotatingButtonContent = ({ 
  primaryText, 
  secondaryText, 
  icon: Icon,
  fontClass,
  colorClass,
  gradientClass
}: { 
  primaryText: string, 
  secondaryText: string, 
  icon: any,
  fontClass: string,
  colorClass: string,
  gradientClass: string
}) => {
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // 3.5 seconds interval for better readability
    const interval = setInterval(() => {
      setShowSecondary(prev => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative z-10 w-full h-full p-4 md:p-6 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-between gap-4 overflow-hidden`}>
       {/* Icon Container - Aurora Glow in Dark Mode */}
       <div className={`
          p-3 rounded-2xl md:rounded-3xl 
          bg-white/80 dark:bg-black/40 backdrop-blur-md 
          border border-white/40 dark:border-white/10 
          shadow-sm ${colorClass} 
          shrink-0 transition-transform duration-500 group-hover:scale-110
       `}>
          <Icon className="w-6 h-6 md:w-8 md:h-8" />
       </div>
       
       <div className="relative flex-1 h-12 md:h-20 md:w-full md:mt-2 flex items-center md:items-start">
          {/* Primary Text (Title) */}
          <h3 className={`absolute left-0 w-full text-lg md:text-2xl font-bold text-gray-900 dark:text-white transition-all duration-700 transform ${fontClass} leading-tight ${showSecondary ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
            {primaryText}
          </h3>
          
          {/* Secondary Text (Slogan) - Aurora Gradient Text in Dark Mode */}
          <h3 className={`absolute left-0 w-full text-lg md:text-2xl font-bold text-transparent bg-clip-text ${gradientClass} transition-all duration-700 transform ${fontClass} leading-tight ${showSecondary ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {secondaryText}
          </h3>
       </div>
       
       {/* Decorative Arrow */}
       <div className={`shrink-0 transition-all duration-500 transform ${showSecondary ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-0'} md:opacity-100 md:translate-x-0`}>
          <Icons.ArrowRight className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 dark:text-gray-500`} />
       </div>
    </div>
  );
};

export const LandingView: React.FC<LandingViewProps> = ({
  profile,
  onStartQuiz,
  onOpenGuide,
  onBrowseWiki,
  onStartChat,
  onLoadDemo,
  onReset,
  onOpenSettings,
  onSetGuest
}) => {
  const { t, headingFont } = useLanguage();
  const showGuideBtn = profile && profile.id !== 'guest';

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.LANDING}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] relative overflow-hidden font-sans transition-colors duration-700"
    >
      {/* 1. Background Effects (Aurora & Bloom) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Light Mode Blobs (Saturated) */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/30 blur-[120px] rounded-full animate-pulse dark:opacity-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-400/30 blur-[120px] rounded-full animate-pulse delay-1000 dark:opacity-0"></div>
        
        {/* Dark Mode Aurora (Northern Lights) */}
        <div className="absolute top-[-20%] left-[20%] w-[80%] h-[60%] bg-emerald-500/10 blur-[100px] rounded-[100%] opacity-0 dark:opacity-100 animate-pulse duration-[5000ms]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-[100%] opacity-0 dark:opacity-100 animate-pulse duration-[7000ms] delay-1000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-teal-500/10 blur-[90px] rounded-[100%] opacity-0 dark:opacity-100 animate-pulse duration-[6000ms] delay-500"></div>
      </div>

      {/* 2. Top Navigation Bar */}
      <div className="w-full p-4 md:p-6 flex justify-between items-center relative z-50 shrink-0">
          <Logo className="h-6 w-auto text-gray-900 dark:text-white" />
          <LanguageSelector className="text-gray-900 dark:text-white bg-white/70 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm" />
      </div>

      {/* 3. Main Content Container */}
      <div className="flex-1 overflow-y-auto relative z-10 w-full">
        <div className="flex flex-col items-center justify-center p-4 md:p-8 max-w-5xl mx-auto min-h-full">
          
          {/* Hero Title */}
          <div className="text-center mb-8 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 
              data-testid={APP_IDS.VIEWS.LANDING.HERO_TITLE}
              className={`text-5xl md:text-8xl font-bold tracking-tight drop-shadow-sm ${headingFont}`}
            >
              <CitySlideshow />
              <span className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-300"> Works!</span>
            </h1>
          </div>

          {/* Action Grid - Compact Banners on Mobile (flex-col) to avoid scrolling */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6 w-full pb-8">
              
              {/* CARD 1: BROWSE (1st) */}
              <button
                 data-testid={APP_IDS.VIEWS.LANDING.BTN_BROWSE}
                 onClick={() => {
                   onSetGuest(GUEST_PROFILE);
                   onBrowseWiki();
                 }}
                 className="group relative h-24 md:h-80 w-full rounded-2xl md:rounded-[2.5rem] bg-white/70 dark:bg-[#151b2e]/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left ring-1 ring-blue-100 dark:ring-blue-900/30 hover:ring-blue-400 dark:hover:ring-blue-500/50"
               >
                 <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-br from-blue-100/50 via-transparent to-transparent dark:from-blue-500/10 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <RotatingButtonContent 
                    primaryText={t('landing_btn_browse')} 
                    secondaryText={t('landing_btn_browse_alt') || "Make Vantaa works!"}
                    icon={Icons.BookOpen}
                    fontClass={headingFont}
                    colorClass="text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30"
                    gradientClass="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300"
                 />
               </button>

              {/* CARD 2: CHAT (2nd) */}
              <button 
                data-testid={APP_IDS.VIEWS.LANDING.BTN_CHAT}
                onClick={() => {
                  onSetGuest(GUEST_PROFILE);
                  onStartChat();
                }}
                className="group relative h-24 md:h-80 w-full rounded-2xl md:rounded-[2.5rem] bg-white/70 dark:bg-[#151b2e]/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left ring-1 ring-teal-100 dark:ring-teal-900/30 hover:ring-teal-400 dark:hover:ring-teal-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-br from-teal-100/50 via-transparent to-transparent dark:from-teal-500/10 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <RotatingButtonContent 
                    primaryText={t('landing_btn_ask')}
                    secondaryText={t('landing_btn_ask_alt') || "Come and ask!"}
                    icon={Icons.MessageSquare}
                    fontClass={headingFont}
                    colorClass="text-teal-600 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30"
                    gradientClass="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-300 dark:to-emerald-300"
                 />
              </button>

              {/* CARD 3: QUIZ (3rd) */}
              <button 
                data-testid={showGuideBtn ? APP_IDS.VIEWS.LANDING.BTN_CONTINUE : APP_IDS.VIEWS.LANDING.BTN_QUIZ}
                onClick={() => {
                  if (showGuideBtn) onOpenGuide();
                  else onStartQuiz();
                }}
                className="group relative h-24 md:h-80 w-full rounded-2xl md:rounded-[2.5rem] bg-white/70 dark:bg-[#151b2e]/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left ring-1 ring-purple-100 dark:ring-purple-900/30 hover:ring-purple-400 dark:hover:ring-purple-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-br from-purple-100/50 via-transparent to-transparent dark:from-purple-500/10 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <RotatingButtonContent 
                    primaryText={showGuideBtn ? t('landing_btn_continue') : t('landing_btn_quiz')}
                    secondaryText={t('landing_btn_quiz_alt') || "Tell me! Who are you?"}
                    icon={showGuideBtn ? Icons.BookMarked : Icons.UserPlus}
                    fontClass={headingFont}
                    colorClass="text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30"
                    gradientClass="bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-purple-300 dark:to-fuchsia-300"
                 />
              </button>

          </div>

          {/* 4. Footer Links */}
          <div className="w-full text-center py-4">
              <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <button 
                    data-testid={APP_IDS.VIEWS.LANDING.LINK_SAMPLE}
                    onClick={() => onLoadDemo(false)} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {t('landing_load_sample')}
                </button>
                <span className="opacity-30">/</span>
                <button 
                    data-testid={APP_IDS.VIEWS.LANDING.LINK_RESET}
                    onClick={onReset} 
                    className="hover:text-red-500 transition-colors"
                >
                    {t('landing_erase')}
                </button>
                <span className="opacity-30">/</span>
                <button 
                    data-testid={APP_IDS.VIEWS.LANDING.LINK_SETTINGS}
                    onClick={onOpenSettings} 
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                    {t('settings_title')}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
