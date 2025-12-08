
import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';
import { APP_IDS } from '../../data/system/identifiers';
import { getAllFlattenedArticles, WikiArticle, getWikiCategories } from '../../data/wikiContent';
import * as Storage from '../../services/storageService';

interface ProfileDetailViewProps {
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
  onNavigateToArticle?: (articleId: string) => void;
}

export const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({
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
  onNavigateToArticle
}) => {
  const { t, language } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [wikiProgress, setWikiProgress] = useState<Storage.WikiProgressData | null>(null);
  const [activeTab, setActiveTab] = useState<'career' | 'life' | 'achievements'>('career');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  
  const isGuest = !profile || profile.id === 'guest';

  // Font logic
  const isLatinBased = ['en', 'fi', 'vi', 'pt-br', 'pt-pt', 'tr', 'es', 'et'].includes(language);
  const headingFont = isLatinBased ? 'font-serif' : 'font-sans';

  useEffect(() => {
      if (profile && !isGuest) {
          setWikiProgress(Storage.getWikiProgress(profile.id));
      }
  }, [profile, isGuest]);

  // Derived Data: Progress, Levels, Categories
  const planData = useMemo(() => {
      if (!profile || isGuest) return null;
      
      const categories = getWikiCategories(language);
      const progress = wikiProgress?.items || {};
      
      // Split categories into tracks
      const careerCats = categories.filter(c => ['foundation', 'job_strategy', 'workplace', 'industries'].includes(c.id));
      const lifeCats = categories.filter(c => ['life', 'family'].includes(c.id)); // Assuming 'life' contains housing/family logic or adding family if separate

      const processCategory = (cat: any) => {
          const allArticles = cat.subsections.flatMap((s: any) => s.articles);
          const total = allArticles.length;
          const completed = allArticles.filter((a: any) => progress[a.id]?.status === 'done').length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          return { ...cat, total, completed, percent, articles: allArticles };
      };

      const careerModules = careerCats.map(processCategory);
      const lifeModules = lifeCats.map(processCategory);

      const totalCompleted = [...careerModules, ...lifeModules].reduce((acc, m) => acc + m.completed, 0);
      const level = 1 + Math.floor(totalCompleted / 5);
      const xp = totalCompleted % 5;

      return { careerModules, lifeModules, level, xp };
  }, [profile, isGuest, wikiProgress, language]);

  const toggleModule = (id: string) => {
      setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkDone = (articleId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!profile) return;
      Storage.saveWikiArticleStatus(profile.id, articleId, 'done');
      setWikiProgress(Storage.getWikiProgress(profile.id));
  };

  // Render Logic for a Module Card
  const renderModuleCard = (module: any, index: number, isCareer: boolean) => {
      const isExpanded = expandedModules[module.id];
      const isComplete = module.percent === 100;
      const isLocked = isCareer && index > 0 && planData!.careerModules[index - 1].percent < 50; // Simple locking logic

      return (
          <div key={module.id} className={`bg-white dark:bg-white/5 border ${isComplete ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-white/10'} rounded-2xl overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-60 grayscale' : 'shadow-sm hover:shadow-md'}`}>
              <button 
                  onClick={() => !isLocked && toggleModule(module.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
              >
                  <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isComplete ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                          {/* We need to render icon dynamically, but Icon component is imported as a map object. */}
                          {/* Assuming module.icon is a string key */}
                          {(() => {
                              const IconComponent = (Icons as any)[module.icon] || Icons.FileText;
                              return <IconComponent className="w-6 h-6" />;
                          })()}
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{module.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${module.percent}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{module.completed}/{module.total}</span>
                          </div>
                      </div>
                  </div>
                  <div className="text-gray-400">
                      {isLocked ? <Icons.Lock className="w-5 h-5" /> : (isExpanded ? <Icons.ChevronDown className="w-5 h-5" /> : <Icons.ChevronRight className="w-5 h-5" />)}
                  </div>
              </button>

              {isExpanded && !isLocked && (
                  <div className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 p-2">
                      {module.articles.map((article: any) => {
                          const isDone = wikiProgress?.items[article.id]?.status === 'done';
                          return (
                              <div key={article.id} className="flex items-center justify-between p-3 hover:bg-white dark:hover:bg-white/5 rounded-xl transition group">
                                  <button 
                                      onClick={() => onNavigateToArticle && onNavigateToArticle(article.id)}
                                      className="flex-1 text-left flex items-center gap-3"
                                  >
                                      <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                      <span className={`text-sm font-medium ${isDone ? 'text-gray-500 line-through decoration-gray-300' : 'text-gray-900 dark:text-white'}`}>{article.title}</span>
                                  </button>
                                  <button
                                      onClick={(e) => handleMarkDone(article.id, e)}
                                      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition ${isDone ? 'text-green-500' : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-500'}`}
                                  >
                                      {isDone ? <Icons.CheckCircle className="w-5 h-5" /> : <Icons.CheckSquare className="w-5 h-5" />}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
              )}
          </div>
      );
  };

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) { /* Chat navigation logic if needed */ }
      if (view === AppView.PROFILE) { /* Already here */ }
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
                    className="relative p-1 rounded-full border-2 border-gray-200 dark:border-white/20 hover:border-black dark:hover:border-white transition overflow-hidden"
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
                        <h1 className={`text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4 ${headingFont}`}>
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

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-8 opacity-80">
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                            <Icons.CheckCircle className="w-6 h-6 text-green-500 mb-2 mx-auto" />
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{t('profile_guest_col1')}</h3>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                            <Icons.Briefcase className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{t('profile_guest_col2')}</h3>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10 backdrop-blur-sm">
                            <Icons.Heart className="w-6 h-6 text-pink-500 mb-2 mx-auto" />
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{t('profile_guest_col3')}</h3>
                        </div>
                    </div>
                </div>
            ) : (
                // PLAN VIEW (Authenticated)
                <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
                    {/* Header Card */}
                    <div className="bg-white dark:bg-[#151b2e] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Icons.Map className="w-64 h-64 text-black dark:text-white transform translate-x-12 -translate-y-12" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {t('quest_level', { level: planData?.level.toString() || '1' })}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                        {t('quest_xp', { current: (planData?.xp || 0).toString(), max: '5' })}
                                    </span>
                                </div>
                                <h1 className={`text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2 ${headingFont}`}>
                                    {t('profile_btn_plan')}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                    {t('dash_subtitle')}
                                </p>
                            </div>
                            
                            <div className="flex gap-3">
                                <button onClick={onEditVisual} className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-xl font-bold text-sm text-gray-900 dark:text-white transition">
                                    {t('dash_edit_profile')}
                                </button>
                                <button onClick={onCreateProfile} className="px-4 py-2 border-2 border-gray-200 dark:border-white/20 hover:border-black dark:hover:border-white rounded-xl font-bold text-sm text-gray-900 dark:text-white transition">
                                    {t('dash_new_profile')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button 
                            onClick={() => setActiveTab('career')} 
                            className={`px-6 py-3 rounded-full font-bold text-sm transition whitespace-nowrap ${activeTab === 'career' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                        >
                            {t('plan_track_career')}
                        </button>
                        <button 
                            onClick={() => setActiveTab('life')} 
                            className={`px-6 py-3 rounded-full font-bold text-sm transition whitespace-nowrap ${activeTab === 'life' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                        >
                            {t('plan_track_life')}
                        </button>
                    </div>

                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                        {activeTab === 'career' && planData?.careerModules.map((m: any, i: number) => renderModuleCard(m, i, true))}
                        {activeTab === 'life' && planData?.lifeModules.map((m: any, i: number) => renderModuleCard(m, i, false))}
                    </div>
                </div>
            )}
        </div>

        {/* Profile Switcher Modal (Simple implementation) */}
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
