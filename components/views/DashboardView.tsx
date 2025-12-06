
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { APP_IDS } from '../../data/system/identifiers';

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

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.DASHBOARD}
      className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500 relative overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto relative w-full">
        {/* Simple Header */}
        <div className="p-6 flex justify-between items-center">
          <LanguageSelector data-testid={APP_IDS.COMPONENTS.NAVBAR.LANG_SELECTOR} />

          <div className="flex items-center gap-3">
              {onNavigateToSettings && (
                  <button 
                    data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_SETTINGS}
                    onClick={onNavigateToSettings}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition text-gray-600 dark:text-gray-400"
                    title="Settings"
                  >
                      <Icons.Settings className="w-6 h-6" />
                  </button>
              )}
              <button 
                data-testid={APP_IDS.VIEWS.DASHBOARD.AVATAR}
                onClick={onNavigateToProfile}
                className="p-1 hover:scale-105 transition transform duration-200 group relative"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white shadow-sm">
                  <img 
                    src={getAvatarUrl(profile)} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">
                  ME
                </div>
              </button>
          </div>
        </div>

        {/* Feedback Ribbon */}
        <div className="mb-6">
           <FeedbackRibbon />
        </div>

        <div className="flex flex-col items-center justify-center px-8 pb-32 text-center max-w-2xl mx-auto w-full">
          <div className="mb-8 relative">
            <button
              onClick={onNavigateToProfile} 
              className="w-24 h-24 block rounded-full bg-gray-100 dark:bg-gray-800 mx-auto overflow-hidden mb-4 border-4 border-white dark:border-gray-800 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer"
              title="View Profile"
            >
              <img 
                src={getAvatarUrl(profile)} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-12">
            {!isGuest ? t('dash_greeting', { name: profile!.name?.split(' ')[0] || 'Friend' }) : t('dash_greeting_guest')}
          </h1>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-6 flex-wrap">
            {!isGuest ? (
              // Standard Profile Actions
              <>
                <button 
                  data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_GUIDE}
                  onClick={onNavigateToWiki}
                  className="flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg w-full sm:w-auto sm:min-w-[260px]"
                >
                  <Icons.BookMarked className="w-5 h-5" /> 
                  {t('dash_btn_guide')}
                </button>
                <button 
                  data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_CHAT}
                  onClick={onStartChat}
                  className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm w-full sm:w-auto sm:min-w-[260px]"
                >
                  <Icons.MessageSquare className="w-5 h-5" /> 
                  {t('landing_btn_ask')}
                </button>
              </>
            ) : (
              // Guest Actions
              <>
                <button 
                  onClick={onNavigateToQuiz}
                  className="flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg w-full sm:w-auto sm:min-w-[260px]"
                >
                  <Icons.CheckSquare className="w-5 h-5" /> 
                  {t('landing_btn_quiz')}
                </button>
                
                <button 
                  data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_GUIDE}
                  onClick={onNavigateToWiki}
                  className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm w-full sm:w-auto sm:min-w-[260px]"
                >
                  <Icons.BookOpen className="w-5 h-5" /> 
                  {t('dash_btn_browse')}
                </button>

                <button 
                  data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_CHAT}
                  onClick={onStartChat}
                  className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 px-8 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm w-full sm:w-auto sm:min-w-[260px]"
                >
                  <Icons.MessageSquare className="w-5 h-5" /> 
                  {t('landing_btn_ask')}
                </button>
              </>
            )}
          </div>

          {/* Secondary Actions (History & CV) */}
          {!isGuest && (
            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto sm:min-w-[536px]">
               <button
                 data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_HISTORY}
                 onClick={onNavigateToHistory}
                 className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 px-4 py-4 rounded-xl font-medium text-sm transition"
               >
                  <Icons.History className="w-6 h-6" />
                  {t('dash_btn_history')}
               </button>
               <button
                 data-testid={APP_IDS.VIEWS.DASHBOARD.BTN_CV}
                 onClick={onNavigateToCvImport}
                 className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 px-4 py-4 rounded-xl font-medium text-sm transition"
               >
                  <Icons.FileText className="w-6 h-6" />
                  {t('dash_btn_cv')}
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
