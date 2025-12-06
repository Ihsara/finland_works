
import React from 'react';
import { AppView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_IDS } from '../data/system/identifiers';
import { Icons } from './Icon';

interface NavigationLinksProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  className?: string;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({ currentView, onNavigate, className = '' }) => {
  const { t } = useLanguage();

  const navItems = [
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_KB, 
      view: AppView.WIKI, 
      label: t('profile_btn_guide'), // "My Guide" / Knowledge Base
      icon: Icons.BookOpen 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_CHAT, 
      view: AppView.CHAT, 
      label: t('landing_btn_ask'), // "Chat"
      icon: Icons.MessageSquare 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_PLAN, 
      view: AppView.PROFILE, 
      label: t('profile_btn_plan'), // "My Plan"
      icon: Icons.User 
    }
  ];

  return (
    <div className={`flex items-center gap-1 md:gap-6 ${className}`}>
      {/* Logo / Home */}
      <button
        data-testid={APP_IDS.VIEWS.GLOBAL_NAV.LOGO}
        onClick={() => onNavigate(AppView.DASHBOARD)}
        className="font-black text-lg md:text-xl tracking-tight mr-2 md:mr-4 hover:opacity-70 active:scale-95 transition-all flex items-center gap-2 min-h-[44px] touch-manipulation"
      >
        <span>FW</span>
        <span className="hidden lg:inline font-normal opacity-50 text-sm">| Finland Works</span>
      </button>

      {/* Links */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 touch-manipulation">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.id}
              data-testid={item.id}
              onClick={() => onNavigate(item.view)}
              className={`
                flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200
                min-h-[40px] min-w-[44px] justify-center
                active:scale-95
                ${isActive 
                  ? 'bg-white dark:bg-gray-950 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50 active:bg-gray-200'
                }
              `}
            >
              <item.icon className={`w-4 h-4 md:w-4 md:h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className={`${isActive ? 'inline' : 'hidden sm:inline'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
