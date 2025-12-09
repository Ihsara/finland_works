
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
      view: AppView.PLAN, // Now points to PLAN view
      label: t('profile_btn_plan'), // "My Plan"
      icon: Icons.Map // Changed icon to Map to signify journey/plan
    }
  ];

  return (
    <div className={`flex bg-gray-100/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1 border border-gray-200/50 dark:border-white/10 touch-manipulation ${className}`}>
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.id}
            data-testid={item.id}
            onClick={() => onNavigate(item.view)}
            className={`
              flex items-center gap-2 px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200
              min-h-[40px] min-w-[44px] justify-center
              active:scale-95
              ${isActive 
                ? 'bg-white dark:bg-white/20 text-black dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }
            `}
          >
            <item.icon className={`w-4 h-4 md:w-4 md:h-4 ${isActive ? 'text-blue-600 dark:text-emerald-300' : ''}`} />
            <span className={`${isActive ? 'inline' : 'hidden sm:inline'}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
