
import React from 'react';
import { Icons } from '../Icon';
import { Logo } from '../Logo';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_IDS } from '../../data/system/identifiers';
import { AppView } from '../../types';
import { Moose, Rabbit } from '../Illustrations';
import { LanguageSelector } from '../LanguageSelector';

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

// Section Container Component
const Section = ({ 
    title, 
    bgColorClass, 
    children, 
    subtitle,
    action
}: { 
    title: string, 
    bgColorClass: string, 
    children: React.ReactNode, 
    subtitle?: string,
    action?: React.ReactNode
}) => (
    <div className={`w-full py-12 md:py-16 px-4 md:px-8 transition-colors duration-300 ${bgColorClass}`}>
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8 md:mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{title}</h2>
                    {subtitle && <p className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>}
                </div>
                {action}
            </div>
            {children}
        </div>
    </div>
);

// Card Component
const InfoCard = ({ 
    title, 
    icon: Icon, 
    onClick 
}: { 
    title: string, 
    icon: any, 
    onClick: () => void 
}) => (
    <button 
        onClick={onClick}
        className="
            flex flex-col items-center justify-center p-6 md:p-8 
            bg-white/50 dark:bg-white/5 
            border-2 border-black dark:border-white/20 
            rounded-3xl 
            hover:bg-black hover:text-white hover:border-black 
            dark:hover:bg-white dark:hover:text-black dark:hover:border-white
            transition-all duration-300 group h-full w-full min-h-[160px]
            text-gray-900 dark:text-white
        "
    >
        <Icon className="w-8 h-8 md:w-10 md:h-10 mb-4 stroke-[1.5] group-hover:scale-110 transition-transform" />
        {/* Fixed font: Removed uppercase and tracking, increased weight for readability */}
        <span className="font-extrabold text-center text-sm md:text-base leading-tight">{title}</span>
    </button>
);

// Feature Card Component
const FeatureCard = ({ 
    title, 
    onClick 
}: { 
    title: string, 
    onClick: () => void 
}) => (
    <button 
        onClick={onClick}
        className="w-full p-8 md:p-12 border border-gray-600 dark:border-gray-500 rounded-3xl text-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
    >
        <span className="block text-xl md:text-2xl font-bold text-white group-hover:text-black">{title}</span>
    </button>
);

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onNavigateToProfile,
  onNavigateToWiki,
  onNavigateToQuiz,
  onStartChat,
  onNavigateToPlan,
  onNavigateToSettings,
  onNavigateToLanding
}) => {
  const { t } = useLanguage();

  const handleHomeClick = () => {
      // Scroll to top instead of navigating away, as this is the homepage
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.DASHBOARD}
      className="flex flex-col h-full bg-white dark:bg-[#0b1021] font-sans overflow-y-auto transition-colors duration-500"
    >
        {/* 1. Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b1021]/95 backdrop-blur-sm border-b border-gray-100 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <button onClick={handleHomeClick} title="Home">
                    <Logo className="h-6 md:h-8 w-auto text-black dark:text-white" />
                </button>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Navigation Items (Profile & Settings) */}
                    <button 
                        onClick={onNavigateToProfile} 
                        className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <Icons.User className="w-5 h-5" />
                        <span className="hidden md:inline">{t('nav_profile')}</span>
                    </button>

                    <button 
                        onClick={() => onNavigateToSettings && onNavigateToSettings()} 
                        className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title={t('settings_title')}
                    >
                        <Icons.Settings className="w-5 h-5" />
                    </button>
                    
                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                    <LanguageSelector className="scale-90 origin-right text-gray-900 dark:text-white" />
                </div>
            </div>
        </header>

        {/* 2. Hero Section */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-24 px-4 md:px-8 bg-white dark:bg-[#0b1021] transition-colors duration-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-8">
                        {t('dash_hero_title')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                        {t('dash_hero_subtitle')}
                    </p>
                    <button 
                        onClick={onNavigateToQuiz}
                        className="bg-[#FCD34D] text-black text-lg font-bold py-4 px-10 rounded-full hover:bg-[#FBBF24] hover:scale-105 active:scale-95 transition-all shadow-lg border-2 border-transparent dark:border-yellow-300/20"
                    >
                        {t('dash_hero_btn')}
                    </button>
                </div>
                <div className="flex-shrink-0 w-64 md:w-96 relative">
                    <Moose className="w-full h-auto drop-shadow-xl" />
                </div>
            </div>
        </section>

        {/* 3. Intro Banner */}
        <section className="bg-gray-100 dark:bg-white/5 py-12 px-4 md:px-8 border-y border-transparent dark:border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                    {t('dash_intro_text')}
                </p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                    {t('dash_intro_tags')}
                </p>
            </div>
        </section>

        {/* 4. Knowledge Base (Green) */}
        <Section 
            title={t('dash_sect_kb_title')} 
            bgColorClass="bg-[#e6f4d0] dark:bg-emerald-950/40"
            subtitle={t('dash_sect_kb_desc')}
            action={
                <button 
                    onClick={onNavigateToWiki} 
                    className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-black dark:border-white font-bold text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    {t('dash_btn_explore')} <Icons.ArrowRight className="w-4 h-4" />
                </button>
            }
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard title={t('dash_card_networking')} icon={Icons.Users} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_culture')} icon={Icons.Puzzle} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_recruitment')} icon={Icons.Search} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_rights')} icon={Icons.ShieldCheck} onClick={onNavigateToWiki} />
            </div>
            <button 
                onClick={onNavigateToWiki} 
                className="md:hidden w-full mt-6 py-3 rounded-full border border-black dark:border-white font-bold text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex justify-center items-center gap-2"
            >
                {t('dash_btn_explore')} <Icons.ArrowRight className="w-4 h-4" />
            </button>
        </Section>

        {/* 5. Step-by-Step Guides (Orange) */}
        <Section 
            title={t('dash_sect_guides_title')} 
            bgColorClass="bg-[#ffe8cc] dark:bg-orange-950/40"
            action={
                <button 
                    onClick={onNavigateToWiki} 
                    className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-black dark:border-white font-bold text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    {t('dash_btn_explore')} <Icons.ArrowRight className="w-4 h-4" />
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title={t('dash_card_guide_cv')} icon={Icons.FileText} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_guide_tax')} icon={Icons.Percent} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_guide_kela')} icon={Icons.Heart} onClick={onNavigateToWiki} />
            </div>
        </Section>

        {/* 6. Living In Vantaa (Blue) */}
        <Section 
            title={t('dash_sect_living_title')} 
            bgColorClass="bg-[#dbeafe] dark:bg-blue-950/40"
            subtitle={t('dash_sect_living_subtitle')}
            action={
                <button 
                    onClick={onNavigateToWiki} 
                    className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-black dark:border-white font-bold text-sm text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    {t('dash_btn_explore')} <Icons.ArrowRight className="w-4 h-4" />
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title={t('dash_card_living_events')} icon={Icons.Calendar} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_living_sports')} icon={Icons.Dumbbell} onClick={onNavigateToWiki} />
                <InfoCard title={t('dash_card_living_community')} icon={Icons.Users} onClick={onNavigateToWiki} />
            </div>
        </Section>

        {/* 7. Key Features (Dark) */}
        <section className="bg-[#1F2937] dark:bg-gray-800 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
                    {t('dash_sect_features_title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeatureCard title={t('dash_feat_hidden_job')} onClick={onNavigateToWiki} />
                    <FeatureCard title={t('dash_feat_apply_kela')} onClick={onNavigateToWiki} />
                </div>
            </div>
        </section>

        {/* 8. Footer Chat CTA */}
        <section className="bg-[#1F2937] dark:bg-gray-800 border-t border-gray-700 dark:border-gray-700 py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-4xl font-black mb-2">{t('dash_footer_ask')}</h2>
                    <p className="text-gray-400 text-sm mb-6">{t('dash_footer_hint')}</p>
                    <button 
                        onClick={onStartChat}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white font-bold text-white hover:bg-white hover:text-black transition-colors"
                    >
                        {t('dash_btn_go_chat')} <Icons.ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="w-32 md:w-48 relative">
                    <Rabbit className="w-full h-auto" />
                </div>
            </div>
        </section>

        {/* 9. Standard Footer */}
        <footer className="bg-white dark:bg-[#0b1021] py-8 px-4 text-center border-t border-gray-100 dark:border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Logo className="h-5 w-auto text-black dark:text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ9xgACOhnwVmiBntvIn80rzxvBoT9kixqUXwWvTSWKQ-gpQ/viewform" target="_blank" className="text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider hover:underline">
                        {t('feedback_action')}
                    </a>
                    
                    <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <button onClick={() => onNavigateToSettings && onNavigateToSettings()} className="hover:text-black dark:hover:text-white">Settings</button>
                        <span>•</span>
                        <a href="#" className="hover:text-black dark:hover:text-white">About</a>
                        <a href="#" className="hover:text-black dark:hover:text-white">Contact</a>
                        <a href="#" className="hover:text-black dark:hover:text-white">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};
