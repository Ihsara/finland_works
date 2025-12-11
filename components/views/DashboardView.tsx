
import React from 'react';
import { Icons } from '../Icon';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { APP_IDS } from '../../data/system/identifiers';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';

interface DashboardViewProps {
  profile: UserProfile | null;
  profileCompleteness: number;
  onNavigateToProfile: () => void;
  onNavigateToWiki: () => void;
  onNavigateToQuiz: () => void;
  onStartChat: () => void;
  onNavigateToPlan: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToCvImport?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToLanding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  profileCompleteness,
  onNavigateToProfile,
  onNavigateToWiki,
  onNavigateToQuiz,
  onStartChat,
  onNavigateToPlan,
  onNavigateToHistory,
  onNavigateToCvImport,
  onNavigateToSettings,
  onNavigateToLanding
}) => {
  const { t, language } = useLanguage();
  const isGuest = !profile || profile.id === 'guest';

  // Font logic: Playfair for Latin, Sans for others (Consistent with Landing)
  const isLatinBased = ['en', 'fi', 'vi', 'pt-br', 'pt-pt', 'tr', 'es', 'et'].includes(language);
  const headingFont = isLatinBased ? 'font-serif' : 'font-sans';

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) onStartChat();
      if (view === AppView.PROFILE) onNavigateToProfile();
      if (view === AppView.PLAN) onNavigateToPlan();
      if (view === AppView.LANDING) onNavigateToLanding();
      if (view === AppView.DASHBOARD) { /* Already here */ }
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.DASHBOARD}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] animate-in fade-in duration-500 relative overflow-hidden transition-colors duration-700"
    >
      {/* Background Aurora for Dashboard */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-300/20 dark:bg-emerald-500/5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-300/20 dark:bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="flex-1 overflow-y-auto relative z-10 w-full">
        {/* Header with Nav */}
        <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center sticky top-0 z-20 bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
          <button 
             onClick={onNavigateToLanding}
             className="font-black text-lg text-gray-900 dark:text-white hover:opacity-70 transition flex items-center gap-2"
          >
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-emerald-400 dark:to-cyan-400">FW</span>
             <span className="hidden md:inline font-normal opacity-50 text-sm border-l pl-2 border-gray-300 dark:border-gray-700 ml-1">Finland Works</span>
          </button>

          <div className="flex items-center gap-2 md:gap-4">
              <NavigationLinks 
                 currentView={AppView.DASHBOARD} 
                 onNavigate={handleNav} 
              />
              {onNavigateToSettings && (
                  <button 
                    data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_SETTINGS}
                    onClick={onNavigateToSettings}
                    className="p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    title="Settings"
                  >
                      <Icons.Settings className="w-5 h-5" />
                  </button>
              )}
          </div>
        </div>

        <FeedbackRibbon />

        <div className="flex flex-col items-center justify-center px-6 pb-32 text-center max-w-3xl mx-auto w-full pt-8 md:pt-12">
          
          <h1 className={`text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2 ${headingFont}`}>
            {!isGuest ? t('dash_greeting', { name: profile!.name?.split(' ')[0] || 'Friend' }) : t('dash_greeting_guest')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-md">
             {isGuest ? t('dash_subtitle_guest') : t('dash_subtitle')}
          </p>

          {/* Guest State CTA */}
          {isGuest && (
              <div className="mb-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <button
                      data-testid={APP_IDS.VIEWS.PROFILE.BTN_TAKE_QUIZ}
                      onClick={onNavigateToQuiz} 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-emerald-500 dark:to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                      {t('landing_btn_quiz')} <Icons.ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-medium uppercase tracking-wide">
                      Takes 2 minutes • No account required
                  </p>
              </div>
          )}

          {/* Primary Actions Grid - Compact & Saturated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
             {/* Guide */}
             <button
               data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_GUIDE}
               onClick={onNavigateToWiki}
               className="flex items-center gap-4 p-5 bg-white/70 dark:bg-white/5 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition text-left group border border-blue-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-emerald-500/50"
             >
                <div className="w-12 h-12 bg-blue-100 dark:bg-emerald-900/30 text-blue-600 dark:text-emerald-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icons.BookOpen className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={`font-bold text-gray-900 dark:text-white text-lg ${headingFont}`}>{t('dash_btn_guide')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explore articles</p>
                </div>
             </button>

             {/* Chat */}
             <button
               data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_CHAT}
               onClick={onStartChat}
               className="flex items-center gap-4 p-5 bg-white/70 dark:bg-white/5 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition text-left group border border-purple-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500/50"
             >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icons.MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h3 className={`font-bold text-gray-900 dark:text-white text-lg ${headingFont}`}>{t('landing_btn_ask')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
                </div>
             </button>
          </div>

          {/* Secondary Actions */}
          {!isGuest && (
            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto sm:flex sm:gap-4">
               <button
                 data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_HISTORY}
                 onClick={onNavigateToHistory}
                 className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition shadow-sm"
               >
                  <Icons.History className="w-4 h-4" /> {t('dash_btn_history')}
               </button>
               <button
                 data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_CV}
                 onClick={onNavigateToCvImport}
                 className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition shadow-sm"
               >
                  <Icons.Upload className="w-4 h-4" /> {t('dash_btn_cv')}
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
