
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';
import { APP_IDS } from '../../data/system/identifiers';
import * as Storage from '../../services/storageService';
import { ACHIEVEMENTS } from '../../data/achievements';

interface ProfileViewProps {
  profile: UserProfile | null;
  profileCompleteness: number;
  allProfiles: UserProfile[];
  onNavigateBack: () => void;
  onSwitchProfile: (id: string) => void;
  onCreateProfile: () => void;
  onEditVisual: () => void;
  onEditYaml: () => void;
  onNavigateToWiki: () => void;
  onNavigateToLanding: () => void;
  onNavigateToPlan: () => void;
  onNavigateToChat: () => void;
  onNavigateToAchievements: () => void;
}

export const ProfileDetailView: React.FC<ProfileViewProps> = ({
  profile,
  profileCompleteness,
  allProfiles,
  onNavigateBack,
  onSwitchProfile,
  onCreateProfile,
  onEditVisual,
  onEditYaml,
  onNavigateToWiki,
  onNavigateToLanding,
  onNavigateToPlan,
  onNavigateToChat,
  onNavigateToAchievements
}) => {
  const { t } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const [wikiProgress, setWikiProgress] = React.useState<Storage.WikiProgressData | null>(null);

  const isGuest = !profile || profile.id === 'guest';

  React.useEffect(() => {
      if (profile && !isGuest) {
          setWikiProgress(Storage.getWikiProgress(profile.id));
      }
  }, [profile, isGuest]);

  // Calculate quick stats for the Level Card
  const stats = React.useMemo(() => {
      if (!wikiProgress) return { level: 1, xp: 0 };
      const doneCount = Object.values(wikiProgress.items).filter((i: Storage.WikiItemData) => i.status === 'done').length;
      return {
          level: 1 + Math.floor(doneCount / 5),
          xp: doneCount % 5,
          totalDone: doneCount
      };
  }, [wikiProgress]);

  const unlockedAchievements = React.useMemo(() => {
      if (!wikiProgress?.achievements) return [];
      return wikiProgress.achievements.map(id => ACHIEVEMENTS[id]).filter(Boolean);
  }, [wikiProgress]);

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) onNavigateToChat();
      if (view === AppView.PROFILE) { /* Already here */ }
      if (view === AppView.PLAN) onNavigateToPlan();
      if (view === AppView.LANDING) onNavigateToLanding();
      if (view === AppView.DASHBOARD) onNavigateBack();
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.PROFILE}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] relative overflow-hidden transition-colors duration-700"
    >
        {/* Background Aurora */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
            <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-purple-300/30 dark:bg-purple-900/30 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-blue-300/30 dark:bg-blue-900/30 blur-[100px] rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center sticky top-0 z-20 bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
                <button 
                    onClick={onNavigateToLanding}
                    className="font-black text-lg text-gray-900 dark:text-white hover:opacity-70 transition flex items-center gap-2"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-emerald-400 dark:to-cyan-400">FW</span>
                </button>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <NavigationLinks 
                    currentView={AppView.PROFILE} 
                    onNavigate={handleNav} 
                />
                
                <LanguageSelector className="hidden sm:block text-gray-900 dark:text-white" />
                
                <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="relative p-1 rounded-full border-2 border-black dark:border-white hover:opacity-80 transition overflow-hidden"
                >
                    <img src={getAvatarUrl(profile)} alt="Avatar" className="w-8 h-8 rounded-full bg-white" />
                </button>
            </div>
        </div>

        <FeedbackRibbon />

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative z-10 w-full p-4 md:p-8">
            {isGuest ? (
                // GUEST VIEW
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-20 rounded-full"></div>
                        <div className="relative bg-white dark:bg-white/10 p-8 rounded-[2.5rem] shadow-xl border border-white/50 dark:border-white/10">
                            <Icons.Map className="w-16 h-16 text-blue-600 dark:text-white" />
                        </div>
                    </div>
                    
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4 font-serif">
                            {t('profile_guest_title')}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('profile_guest_subtitle')}
                        </p>
                    </div>

                    <button
                        data-testid={APP_IDS.VIEWS.PROFILE.BTN_TAKE_QUIZ}
                        onClick={onEditVisual} // Triggers quiz
                        className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-3"
                    >
                        <span>{t('profile_guest_btn_start')}</span>
                        <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            ) : (
                // PROFILE VIEW (Identity Focus)
                <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
                    
                    {/* Identity Card */}
                    <div className="bg-white dark:bg-[#151b2e] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="flex-shrink-0 text-center">
                                <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-white/10 overflow-hidden bg-gray-50 mx-auto mb-4">
                                    <img src={getAvatarUrl(profile)} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                                    {profile?.id === 'demo-gabriela' ? 'Demo User' : 'Local User'}
                                </div>
                            </div>
                            <div className="flex-1 space-y-6 w-full text-center md:text-left">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white font-serif">{profile?.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1 font-medium">
                                        <Icons.Map className="w-4 h-4" /> {profile?.originCountry} • {profile?.ageRange}
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                        <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">{t('profile_label_profession')}</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{profile?.profession || 'Not set'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                        <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">{t('profile_label_education')}</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{profile?.education?.degree || 'Not set'}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                                    <button onClick={onEditVisual} className="px-5 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                                        <Icons.Edit3 className="w-4 h-4" /> {t('dash_edit_profile')}
                                    </button>
                                    <button onClick={onEditYaml} className="px-5 py-3 border-2 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                                        <Icons.Code className="w-4 h-4" /> YAML
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Level / Status Card (Links to Plan) */}
                    <button 
                        onClick={onNavigateToPlan}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-emerald-600 dark:to-teal-600 rounded-3xl p-6 md:p-8 shadow-lg text-white text-left relative overflow-hidden group hover:scale-[1.01] transition-all"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                            <Icons.Award className="w-32 h-32 transform rotate-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                                    {t('quest_level', { level: stats.level.toString() })}
                                </span>
                                <span className="text-xs font-mono opacity-80">
                                    {stats.totalDone} actions completed
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black mb-1 font-serif">{t('profile_btn_plan')}</h2>
                            <p className="opacity-90 max-w-sm mb-6 text-sm md:text-base">
                                View your progress, unlocked achievements, and next steps in your integration journey.
                            </p>
                            <div className="flex items-center gap-2 font-bold text-sm bg-white text-blue-600 dark:text-teal-600 px-4 py-2 rounded-full w-fit">
                                Open Plan <Icons.ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </button>

                    {/* Trophy Cabinet (Small Summary) */}
                    {unlockedAchievements.length > 0 && (
                        <div className="bg-white dark:bg-[#151b2e] p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm animate-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Icons.Trophy className="w-5 h-5 text-yellow-500" />
                                    Latest Achievements
                                </h3>
                                <button onClick={onNavigateToAchievements} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {unlockedAchievements.slice(0, 5).map(ach => {
                                    const Icon = (Icons as any)[ach.icon] || Icons.Award;
                                    return (
                                        <div key={ach.id} className="group relative" title={ach.title}>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ach.color} transition-transform hover:scale-110`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    );
                                })}
                                {unlockedAchievements.length > 5 && (
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-500 font-bold text-xs">
                                        +{unlockedAchievements.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>

        {/* Profile Switcher Modal */}
        {isProfileMenuOpen && (
            <div className="absolute top-16 right-4 w-64 bg-white dark:bg-[#1a233b] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">Switch Profile</div>
                {allProfiles.map(p => (
                    <button
                        key={p.id}
                        onClick={() => {
                            onSwitchProfile(p.id);
                            setIsProfileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition ${profile?.id === p.id ? 'bg-gray-100 dark:bg-white/10 font-bold' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                        <img src={getAvatarUrl(p)} className="w-6 h-6 rounded-full bg-gray-200" alt="" />
                        <span className="truncate text-sm text-gray-900 dark:text-white">{p.name}</span>
                    </button>
                ))}
                <div className="border-t border-gray-100 dark:border-white/10 my-2"></div>
                <button onClick={onCreateProfile} className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    <Icons.Plus className="w-4 h-4" /> {t('dash_new_profile')}
                </button>
            </div>
        )}
    </div>
  );
};
