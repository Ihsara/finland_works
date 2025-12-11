
import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../Icon';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_IDS } from '../../data/system/identifiers';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';
import { getWikiCategories } from '../../data/wikiContent';
import * as Storage from '../../services/storageService';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { getAvatarUrl } from '../../utils/profileUtils';
import { PuzzleProgress, PuzzleModule } from '../PuzzleProgress';
import { getPuzzleImageById } from '../../data/puzzleImages';

interface PlanViewProps {
  profile: UserProfile | null;
  onNavigateToWiki: () => void;
  onNavigateToLanding: () => void;
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
  onNavigateToAchievements: () => void;
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToSettings?: () => void;
  onUnlockAchievement?: (id: string) => void;
}

const FUN_FACTS = {
    foundation: "In Finland, your personal ID code (henkilötunnus) tells your birthday and gender! The separator char (+, -, A) tells the century you were born in.",
    job_strategy: "70-80% of jobs in Finland are never advertised publicly. They are filled through networking and direct contact.",
    workplace: "Coffee breaks are statutory in Finland! Almost every contract mandates two 15-minute coffee breaks per day.",
    industries: "Finland has the most metal bands per capita in the world. Even Nokia was originally a rubber boot company.",
    life: "Finland has over 3 million saunas for 5.5 million people. That's more than one sauna for every two people!",
};

// Finnish Cultural Ranks
const SISU_RANKS = [
    "Turisti 📷",      // Tourist
    "Tulokas 🏠",      // Newcomer
    "Kuntalainen 🏙️",  // Resident/Citizen
    "Tietäjä 🧠",      // Sage (Kalevala reference)
    "Sisu Mestari 🔥"  // Sisu Master
];

export const PlanView: React.FC<PlanViewProps> = ({
  profile,
  onNavigateToWiki,
  onNavigateToLanding,
  onNavigateToProfile,
  onNavigateToChat,
  onNavigateToAchievements,
  onNavigateToArticle,
  onNavigateToSettings,
  onUnlockAchievement
}) => {
  const { t, language } = useLanguage();
  // Simplified tabs: Career vs Life
  const [activeTab, setActiveTab] = useState<'career' | 'life'>('career');
  const [wikiProgress, setWikiProgress] = useState<Storage.WikiProgressData | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [funFact, setFunFact] = useState<{title: string, text: string, moduleId: string} | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showGraduation, setShowGraduation] = useState(false);

  const isGuest = !profile || profile.id === 'guest';

  useEffect(() => {
      if (profile && !isGuest) {
          setWikiProgress(Storage.getWikiProgress(profile.id));
      }
  }, [profile, isGuest]);

  const handleNav = (view: AppView) => {
      if (view === AppView.WIKI) onNavigateToWiki();
      if (view === AppView.CHAT) onNavigateToChat();
      if (view === AppView.PROFILE) onNavigateToProfile();
      if (view === AppView.LANDING) onNavigateToLanding();
      if (view === AppView.SETTINGS && onNavigateToSettings) onNavigateToSettings();
      if (view === AppView.PLAN) { /* Already here */ }
  };

  const handleToggleArticleStatus = (e: React.MouseEvent, articleId: string) => {
      e.stopPropagation(); // Prevent opening the module or navigating
      if (!profile) return;

      const currentStatus = wikiProgress?.items[articleId]?.status;
      const newStatus = currentStatus === 'done' ? undefined : 'done'; // Toggle Done/Undone
      
      Storage.saveWikiArticleStatus(profile.id, articleId, newStatus);
      const newData = Storage.getWikiProgress(profile.id);
      setWikiProgress(newData);

      // Trigger achievement check
      if (newStatus === 'done' && onUnlockAchievement) {
          const doneCount = Object.values(newData.items).filter(i => i.status === 'done').length;
          if (doneCount === 1) onUnlockAchievement('first_step');
      }
  };

  const planData = useMemo(() => {
      if (!profile || isGuest) return null;
      
      const categories = getWikiCategories(language);
      const progress = wikiProgress?.items || {};
      
      const careerCats = categories.filter(c => ['foundation', 'job_strategy', 'workplace', 'industries'].includes(c.id));
      const lifeCats = categories.filter(c => ['life', 'family', 'daily_life', 'nature'].includes(c.id)); 

      const processCategory = (cat: any) => {
          const allArticles = cat.subsections.flatMap((s: any) => s.articles);
          const total = allArticles.length;
          const completed = allArticles.filter((a: any) => progress[a.id]?.status === 'done').length;
          const saved = allArticles.filter((a: any) => progress[a.id]?.status === 'later').length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          
          if (percent === 100 && onUnlockAchievement) {
              const achId = `master_${cat.id}`;
              onUnlockAchievement(achId);
          }

          return { ...cat, total, completed, saved, percent, articles: allArticles };
      };

      const careerModules = careerCats.map(processCategory);
      const lifeModules = lifeCats.map(processCategory);

      // Global Progress for Puzzle
      const allModules = [...careerModules, ...lifeModules];
      
      // Map to PuzzleModule format
      const puzzleModules: PuzzleModule[] = allModules.map(m => ({
          id: m.id,
          title: m.title,
          icon: m.icon,
          percent: m.percent,
          total: m.total,
          completed: m.completed
      }));

      const grandTotal = allModules.reduce((acc, m) => acc + m.total, 0);
      const grandCompleted = allModules.reduce((acc, m) => acc + m.completed, 0);
      const grandPercent = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;

      const level = 1 + Math.floor(grandCompleted / 5);
      const xp = grandCompleted % 5;

      return { careerModules, lifeModules, puzzleModules, level, xp, grandPercent };
  }, [profile, isGuest, wikiProgress, language, onUnlockAchievement]);

  // Check for Graduation (100%)
  useEffect(() => {
      if (planData?.grandPercent === 100 && onUnlockAchievement) {
          const isNew = Storage.unlockAchievement(profile!.id, 'sisu_graduate');
          if (isNew) {
              setShowGraduation(true);
              onUnlockAchievement('sisu_graduate');
          }
      }
  }, [planData?.grandPercent]);

  // Get Background Image from Profile ID
  const puzzleImageUrl = useMemo(() => {
      if (!profile) return undefined;
      const imgDef = getPuzzleImageById(profile.puzzleImageId);
      return imgDef.url;
  }, [profile]);

  const toggleModule = (id: string) => {
      setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleModuleClick = (module: any, index: number, isCareer: boolean) => {
      const isPermanentlyUnlocked = wikiProgress?.unlockedQuests?.includes(module.id);
      const prevModule = isCareer ? planData!.careerModules[index - 1] : planData!.lifeModules[index - 1];
      const isHardLocked = index > 0 && prevModule.percent < 50;
      
      const isLocked = isHardLocked && !isPermanentlyUnlocked;
      
      if (isLocked) {
          const fact = (FUN_FACTS as any)[module.id] || "Finland has more saunas than cars!";
          setFunFact({
              title: module.title,
              text: fact,
              moduleId: module.id
          });
      } else {
          toggleModule(module.id);
      }
  };

  const unlockAndEnter = () => {
      if (funFact && profile) {
          Storage.unlockQuest(profile.id, funFact.moduleId);
          setWikiProgress(Storage.getWikiProgress(profile.id));
          setExpandedModules(prev => ({ ...prev, [funFact.moduleId]: true }));
          setFunFact(null);
      }
  };

  const renderModuleCard = (module: any, index: number, isCareer: boolean) => {
      const isExpanded = expandedModules[module.id];
      const isComplete = module.percent === 100;
      const hasOngoing = module.saved > 0;
      
      const isPermanentlyUnlocked = wikiProgress?.unlockedQuests?.includes(module.id);
      const prevModule = isCareer ? planData!.careerModules[index - 1] : planData!.lifeModules[index - 1];
      const isHardLocked = index > 0 && prevModule.percent < 50;
      const isLocked = isHardLocked && !isPermanentlyUnlocked;

      let statusColor = 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'; 
      if (isComplete) statusColor = 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      else if (hasOngoing) statusColor = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';

      return (
          <div key={module.id} className={`bg-white dark:bg-white/5 border ${isComplete ? 'border-green-200 dark:border-green-800' : hasOngoing ? 'border-amber-200 dark:border-amber-800' : 'border-gray-200 dark:border-white/10'} rounded-2xl overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-75 grayscale-[0.5]' : 'shadow-sm hover:shadow-md'}`}>
              <button 
                  onClick={() => handleModuleClick(module, index, isCareer)}
                  className="w-full p-5 flex items-center justify-between text-left"
              >
                  <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center relative flex-shrink-0 ${statusColor}`}>
                          {(() => {
                              const IconComponent = (Icons as any)[module.icon] || Icons.FileText;
                              return <IconComponent className="w-6 h-6" />;
                          })()}
                          {isLocked && (
                              <div className="absolute -top-1 -right-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1 border border-white dark:border-gray-900">
                                  <Icons.Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                              </div>
                          )}
                      </div>
                      <div className="min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate pr-2">{module.title}</h3>
                          {isLocked ? (
                              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                  <Icons.Lock className="w-3 h-3" /> Locked
                              </span>
                          ) : (
                              <div className="flex items-center gap-2 mt-1">
                                  <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                      <div className={`h-full rounded-full ${isComplete ? 'bg-green-500' : hasOngoing ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${module.percent}%` }}></div>
                                  </div>
                                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{module.completed}/{module.total}</span>
                              </div>
                          )}
                      </div>
                  </div>
                  <div className="text-gray-400 flex-shrink-0">
                      {isExpanded ? <Icons.ChevronDown className="w-5 h-5" /> : <Icons.ChevronRight className="w-5 h-5" />}
                  </div>
              </button>

              {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 p-2 animate-in slide-in-from-top-2 duration-300">
                      {module.articles.map((article: any) => {
                          const status = wikiProgress?.items[article.id]?.status;
                          const isDone = status === 'done';
                          
                          return (
                              <div key={article.id} className="flex items-center justify-between p-3 hover:bg-white dark:hover:bg-white/5 rounded-xl transition group">
                                  <button 
                                      onClick={() => onNavigateToArticle && onNavigateToArticle(article.id)}
                                      className="flex-1 text-left flex items-center gap-3 min-w-0"
                                  >
                                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isDone ? 'bg-green-500' : status === 'later' ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                      <span className={`text-sm font-medium truncate ${isDone ? 'text-gray-500 line-through decoration-gray-300' : 'text-gray-900 dark:text-white'}`}>{article.title}</span>
                                  </button>
                                  <button
                                      onClick={(e) => handleToggleArticleStatus(e, article.id)}
                                      className={`p-2 rounded-full flex-shrink-0 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${isDone ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}
                                  >
                                      {isDone ? <Icons.CheckCircle className="w-6 h-6" strokeWidth={2.5} /> : <Icons.CheckSquare className="w-6 h-6" strokeWidth={1.5} />}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
              )}
          </div>
      );
  };

  const filterModules = (modules: any[]) => {
      if (showCompleted) return modules;
      return modules.filter(m => m.percent < 100);
  };

  const currentLevelIndex = planData ? Math.min(planData.level - 1, SISU_RANKS.length - 1) : 0;
  const currentRankTitle = SISU_RANKS[currentLevelIndex];

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.PLAN}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] relative overflow-hidden transition-colors duration-700"
    >
        {/* Graduation Modal */}
        {showGraduation && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-700">
                <div className="bg-white dark:bg-[#151b2e] rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative overflow-hidden border border-yellow-400/30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-500/10 animate-pulse pointer-events-none"></div>
                    
                    <div className="mb-6 flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            <Icons.Crown className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 font-serif">
                        Sisu Master!
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        You have completed the entire survival guide. You've unlocked the secrets of bureaucracy, work culture, and life in the North.
                        <br/><br/>
                        <span className="font-bold text-black dark:text-white">You are ready for your Year One in Finland.</span>
                    </p>
                    
                    <button 
                        onClick={() => setShowGraduation(false)}
                        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                        Embark on the Journey
                    </button>
                </div>
            </div>
        )}

        {/* Fun Fact Modal */}
        {funFact && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-[#151b2e] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-2">
                            <Icons.Lightbulb className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">{t('quest_fun_fact_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                            "{funFact.text}"
                        </p>
                        <button 
                            onClick={unlockAndEnter}
                            className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
                        >
                            {t('quest_btn_unlock')}
                        </button>
                    </div>
                    <button 
                        onClick={() => setFunFact(null)} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                        <Icons.X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        )}

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
                    currentView={AppView.PLAN} 
                    onNavigate={handleNav} 
                />
            </div>
        </div>

        <FeedbackRibbon />

        <div className="flex-1 overflow-y-auto relative z-10 w-full p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* 1. The Puzzle Progress - Enhanced Visuals */}
                {planData && <PuzzleProgress modules={planData.puzzleModules} imageUrl={puzzleImageUrl} />}

                {/* 2. Gamified Stats Header */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight font-serif">
                            {t('profile_btn_plan')}
                        </h1>
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                            {/* Standard Level Badge */}
                            <span className="bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {t('quest_level', { level: planData?.level.toString() || '1' })}
                            </span>
                            
                            {/* Finnish Rank Badge */}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">
                                {currentRankTitle}
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono ml-1">
                                {t('quest_xp', { current: (planData?.xp || 0).toString(), max: '5' })}
                            </span>
                        </div>
                    </div>
                    <button 
                        data-testid={APP_IDS.VIEWS.PLAN.BTN_TROPHIES}
                        onClick={onNavigateToAchievements}
                        className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition shadow-sm w-full md:w-auto justify-center"
                    >
                        <Icons.Trophy className="w-5 h-5" />
                        {t('quest_tab_achievements')}
                    </button>
                </div>

                {/* 3. Main Tabs & Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div className="p-1 bg-gray-100 dark:bg-white/5 rounded-2xl sm:rounded-full w-full sm:w-auto">
                        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                            <button 
                                onClick={() => setActiveTab('career')} 
                                className={`px-3 py-3 rounded-xl sm:rounded-full font-bold text-sm transition flex items-center justify-center gap-2 w-full sm:w-auto ${activeTab === 'career' ? 'bg-white dark:bg-[#151b2e] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'}`}
                            >
                                <Icons.Briefcase className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{t('plan_track_career')}</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('life')} 
                                className={`px-3 py-3 rounded-xl sm:rounded-full font-bold text-sm transition flex items-center justify-center gap-2 w-full sm:w-auto ${activeTab === 'life' ? 'bg-white dark:bg-[#151b2e] text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'}`}
                            >
                                <Icons.Coffee className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{t('plan_track_life')}</span>
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowCompleted(!showCompleted)}
                        className={`flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition w-full sm:w-auto ${showCompleted ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                    >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${showCompleted ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                            {showCompleted && <Icons.CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span>Show Completed</span>
                    </button>
                </div>

                {/* 4. Modules Grid */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 pb-20">
                    {activeTab === 'career' && filterModules(planData?.careerModules || []).map((m: any, i: number) => renderModuleCard(m, i, true))}
                    {activeTab === 'life' && filterModules(planData?.lifeModules || []).map((m: any, i: number) => renderModuleCard(m, i, false))}
                </div>
            </div>
        </div>
    </div>
  );
};
