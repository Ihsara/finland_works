
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';
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
  onNavigateToHistory?: () => void;
  onNavigateToCvImport?: () => void;
  onNavigateToSettings?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  profileCompleteness,
  onNavigateToProfile,
  onNavigateToWiki,
  onNavigateToQuiz,
  onStartChat,
  onNavigateToHistory,
  onNavigateToCvImport,
  onNavigateToSettings
}) => {
  const { t } = useLanguage();
  const isGuest = !profile || profile.id === 'guest';

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) onStartChat();
      if (view === AppView.PROFILE) onNavigateToProfile();
      if (view === AppView.DASHBOARD) { /* Already here */ }
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.DASHBOARD}
      className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500 relative overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto relative w-full">
        {/* Header with Nav */}
        <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center sticky top-0 z-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
          <NavigationLinks 
             currentView={AppView.DASHBOARD} 
             onNavigate={handleNav} 
          />

          <div className="flex items-center gap-3">
              <LanguageSelector className="hidden sm:block" />
              {onNavigateToSettings && (
                  <button 
                    data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_SETTINGS}
                    onClick={onNavigateToSettings}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition text-gray-600 dark:text-gray-400"
                    title="Settings"
                  >
                      <Icons.Settings className="w-5 h-5" />
                  </button>
              )}
              <button 
                data-testid={APP_IDS.VIEWS.DASHBOARD.AVATAR}
                onClick={onNavigateToProfile}
                className="p-1 hover:scale-105 transition transform duration-200 group relative"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white shadow-sm">
                  <img 
                    src={getAvatarUrl(profile)} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
          </div>
        </div>

        <FeedbackRibbon />

        <div className="flex flex-col items-center justify-center px-8 pb-32 text-center max-w-2xl mx-auto w-full pt-12">
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            {!isGuest ? t('dash_greeting', { name: profile!.name?.split(' ')[0] || 'Friend' }) : t('dash_greeting_guest')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
             {isGuest ? t('dash_subtitle_guest') : t('dash_subtitle')}
          </p>

          {/* Primary Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
             {/* Guide */}
             <button
               onClick={onNavigateToWiki}
               className="flex items-center gap-4 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-left group"
             >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icons.BookOpen className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t('dash_btn_guide')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explore articles</p>
                </div>
             </button>

             {/* Chat */}
             <button
               onClick={onStartChat}
               className="flex items-center gap-4 p-5 bg-purple-50 dark:bg-purple-900/10 rounded-2xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition text-left group"
             >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icons.MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{t('landing_btn_ask')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
                </div>
             </button>
          </div>

          {/* Secondary Actions */}
          {!isGuest && (
            <div className="flex gap-4">
               <button
                 onClick={onNavigateToHistory}
                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
               >
                  <Icons.History className="w-4 h-4" /> {t('dash_btn_history')}
               </button>
               <button
                 onClick={onNavigateToCvImport}
                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
