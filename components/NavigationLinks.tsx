
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
      label: t('profile_btn_guide'), // "My Guide"
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
      view: AppView.PLAN, 
      label: t('profile_btn_plan'), // "My Plan"
      icon: Icons.Map 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_PROFILE, 
      view: AppView.PROFILE, 
      label: t('dash_profile_overview'), // "Profile"
      icon: Icons.User
    },
    {
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_SETTINGS,
      view: AppView.SETTINGS,
      label: t('settings_title'), // "Settings"
      icon: Icons.Settings
    }
  ];

  return (
    <div className={`flex items-center gap-1 bg-gray-100/80 dark:bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-gray-200/50 dark:border-white/10 touch-manipulation overflow-x-auto no-scrollbar max-w-[calc(100vw-80px)] md:max-w-none ${className}`}>
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.id}
            data-testid={item.id}
            onClick={() => onNavigate(item.view)}
            title={item.label}
            className={`
              group relative flex items-center justify-center rounded-full transition-all duration-300 ease-out
              h-11 px-3 md:px-0 md:w-11 md:hover:w-auto
              active:scale-95 flex-shrink-0
              ${isActive 
                ? 'bg-white dark:bg-white/20 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }
            `}
          >
            <item.icon className={`w-5 h-5 transition-colors flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-emerald-300' : ''}`} />
            
            <span className={`
                whitespace-nowrap overflow-hidden transition-all duration-300 font-medium text-xs ml-2 md:ml-0
                
                // Mobile Behavior: Always visible
                opacity-100 max-w-[100px]
                
                // Desktop Behavior: Hidden by default, visible on hover
                md:opacity-0 md:max-w-0 md:group-hover:max-w-[100px] md:group-hover:opacity-100 md:group-hover:ml-2
            `}>
                {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
