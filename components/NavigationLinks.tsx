
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
      label: t('nav_guide'), 
      icon: Icons.BookOpen 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_CHAT, 
      view: AppView.CHAT, 
      label: t('nav_chat'),
      icon: Icons.MessageSquare 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_PLAN, 
      view: AppView.PLAN, 
      label: t('nav_plan'),
      icon: Icons.Map 
    },
    { 
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_PROFILE, 
      view: AppView.PROFILE, 
      label: t('nav_profile'),
      icon: Icons.User
    },
    {
      id: APP_IDS.VIEWS.GLOBAL_NAV.LINK_SETTINGS,
      view: AppView.SETTINGS,
      label: "", // No label for settings
      icon: Icons.Settings
    }
  ];

  return (
    <div className={`flex items-center gap-1 bg-gray-100/80 dark:bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-gray-200/50 dark:border-white/10 touch-manipulation overflow-x-auto no-scrollbar max-w-[calc(100vw-80px)] md:max-w-none ${className}`}>
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        // Only show text if active AND label exists (Settings has empty label)
        const showText = isActive && item.label.length > 0;

        return (
          <button
            key={item.id}
            data-testid={item.id}
            onClick={() => onNavigate(item.view)}
            title={item.label || 'Settings'}
            className={`
              group relative flex items-center justify-center rounded-full transition-all duration-300 ease-out flex-shrink-0
              h-10 
              ${isActive 
                ? 'px-4 bg-white dark:bg-white/20 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                : 'w-10 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }
              active:scale-95
            `}
          >
            <item.icon className={`w-5 h-5 transition-colors flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-emerald-300' : ''}`} />
            
            <span className={`
                whitespace-nowrap font-bold text-xs overflow-hidden transition-all duration-300
                ${showText ? 'max-w-[100px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'}
            `}>
                {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
