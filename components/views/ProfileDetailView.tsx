
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
import { getWikiCategories } from '../../data/wikiContent';
import * as Storage from '../../services/storageService';
import { ACHIEVEMENTS } from '../../data/achievements';

// Simple Confetti Component
const Confetti = ({ active }: { active: boolean }) => {
    if (!active) return null;
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute animate-confetti" 
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-10%`,
                        backgroundColor: ['#FFC700', '#FF0000', '#2E3192', '#41BBC7'][Math.floor(Math.random() * 4)],
                        width: '10px',
                        height: '10px',
                        animationDuration: `${Math.random() * 2 + 2}s`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                />
            ))}
        </div>
    );
};

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
  onUnlockAchievement?: (id: string) => void;
}

const FUN_FACTS = {
    foundation: "In Finland, your personal ID code (henkilötunnus) tells your birthday and gender! The separator char (+, -, A) tells the century you were born in.",
    job_strategy: "70-80% of jobs in Finland are never advertised publicly. They are filled through networking and direct contact.",
    workplace: "Coffee breaks are statutory in Finland! Almost every contract mandates two 15-minute coffee breaks per day.",
    industries: "Finland has the most metal bands per capita in the world. Even Nokia was originally a rubber boot company.",
    life: "Finland has over 3 million saunas for 5.5 million people. That's more than one sauna for every two people!",
};

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
  onNavigateToArticle,
  onUnlockAchievement
}) => {
  const { t, language } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [wikiProgress, setWikiProgress] = useState<Storage.WikiProgressData | null>(null);
  const [activeTab, setActiveTab] = useState<'identity' | 'career' | 'life' | 'trophies'>('career');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [showCompleted, setShowCompleted] = useState(false);
  
  // Fun Fact Modal State
  const [funFact, setFunFact] = useState<{title: string, text: string, moduleId: string} | null>(null);
  
  // Confetti State
  const [celebrate, setCelebrate] = useState(false);

  const isGuest = !profile || profile.id === 'guest';

  // Font logic
  const isLatinBased = ['en', 'fi', 'vi', 'pt-br', 'pt-pt', 'tr', 'es', 'et'].includes(language);
  const headingFont = isLatinBased ? 'font-serif' : 'font-sans';

  useEffect(() => {
      if (profile && !isGuest) {
          setWikiProgress(Storage.getWikiProgress(profile.id));
      }
  }, [profile, isGuest]);

  const triggerCelebration = () => {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3000);
  };

  // Derived Data: Progress, Levels, Categories
  const planData = useMemo(() => {
      if (!profile || isGuest) return null;
      
      const categories = getWikiCategories(language);
      const progress = wikiProgress?.items || {};
      
      // Split categories into tracks
      const careerCats = categories.filter(c => ['foundation', 'job_strategy', 'workplace', 'industries'].includes(c.id));
      const lifeCats = categories.filter(c => ['life', 'family'].includes(c.id)); 

      const processCategory = (cat: any) => {
          const allArticles = cat.subsections.flatMap((s: any) => s.articles);
          const total = allArticles.length;
          const completed = allArticles.filter((a: any) => progress[a.id]?.status === 'done').length;
          const saved = allArticles.filter((a: any) => progress[a.id]?.status === 'later').length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          
          // Check for Topic Master Achievement
          if (percent === 100 && onUnlockAchievement) {
              const achId = `master_${cat.id}`;
              onUnlockAchievement(achId);
          }

          return { ...cat, total, completed, saved, percent, articles: allArticles };
      };

      const careerModules = careerCats.map(processCategory);
      const lifeModules = lifeCats.map(processCategory);

      const totalCompleted = [...careerModules, ...lifeModules].reduce((acc, m) => acc + m.completed, 0);
      const level = 1 + Math.floor(totalCompleted / 5);
      const xp = totalCompleted % 5;

      return { careerModules, lifeModules, level, xp };
  }, [profile, isGuest, wikiProgress, language, onUnlockAchievement]);

  const toggleModule = (id: string) => {
      setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkDone = (articleId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!profile) return;
      
      // If marking as done, trigger celebration if it wasn't done before
      if (wikiProgress?.items[articleId]?.status !== 'done') {
          triggerCelebration();
      }
      
      Storage.saveWikiArticleStatus(profile.id, articleId, 'done');
      setWikiProgress(Storage.getWikiProgress(profile.id));
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

  // Render Logic for a Module Card
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
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${statusColor}`}>
                          {(() => {
                              const IconComponent = (Icons as any)[module.icon] || Icons.FileText;
                              return <IconComponent className="w-6 h-6" />;
                          })()}
                          {isLocked && (
                              <div className="absolute -top-1 -right-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1 border border-white dark:border-gray-900">
                                  <Icons.Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                              </div>
                          )}
                          {hasOngoing && !isComplete && !isLocked && (
                              <div className="absolute -top-1 -right-1 bg-amber-100 dark:bg-amber-900 rounded-full p-1 border border-white dark:border-gray-900">
                                  <Icons.Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              </div>
                          )}
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{module.title}</h3>
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
                  <div className="text-gray-400">
                      {isExpanded ? <Icons.ChevronDown className="w-5 h-5" /> : <Icons.ChevronRight className="w-5 h-5" />}
                  </div>
              </button>

              {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 p-2 animate-in slide-in-from-top-2 duration-300">
                      {module.articles.map((article: any) => {
                          const status = wikiProgress?.items[article.id]?.status;
                          const isDone = status === 'done';
                          const isLater = status === 'later';
                          
                          return (
                              <div key={article.id} className="flex items-center justify-between p-3 hover:bg-white dark:hover:bg-white/5 rounded-xl transition group">
                                  <button 
                                      onClick={() => onNavigateToArticle && onNavigateToArticle(article.id)}
                                      className="flex-1 text-left flex items-center gap-3"
                                  >
                                      <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500' : isLater ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
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

  const filterModules = (modules: any[]) => {
      if (showCompleted) return modules;
      return modules.filter(m => m.percent < 100);
  };

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.PROFILE}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] relative overflow-hidden transition-colors duration-700"
    >
        <Confetti active={celebrate} />

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
                // GUEST VIEW (Unchanged)
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
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button 
                                onClick={() => setActiveTab('identity')} 
                                className={`px-6 py-3 rounded-full font-bold text-sm transition whitespace-nowrap ${activeTab === 'identity' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                            >
                                <div className="flex items-center gap-2"><Icons.User className="w-4 h-4" /> Identity</div>
                            </button>
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
                            <button 
                                onClick={() => setActiveTab('trophies')} 
                                className={`px-6 py-3 rounded-full font-bold text-sm transition whitespace-nowrap ${activeTab === 'trophies' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                            >
                                {t('quest_tab_achievements')}
                            </button>
                        </div>

                        {/* Show Completed Toggle */}
                        {activeTab !== 'trophies' && activeTab !== 'identity' && (
                            <button 
                                onClick={() => setShowCompleted(!showCompleted)}
                                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition ${showCompleted ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${showCompleted ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                                    {showCompleted && <Icons.CheckCircle className="w-3 h-3 text-white" />}
                                </div>
                                Show Completed
                            </button>
                        )}
                    </div>

                    {/* Identity Tab Content */}
                    {activeTab === 'identity' && profile && (
                        <div className="bg-white dark:bg-[#151b2e] p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-white/10 animate-in slide-in-from-bottom-2">
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-white/10 overflow-hidden bg-gray-50">
                                        <img src={getAvatarUrl(profile)} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-6 w-full">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                            <Icons.Map className="w-4 h-4" /> {profile.originCountry} • {profile.ageRange}
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">{t('profile_label_profession')}</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{profile.profession || 'Not set'}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">{t('profile_label_education')}</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{profile.education?.degree || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <button onClick={onEditVisual} className="px-5 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                                            <Icons.Edit3 className="w-4 h-4" /> {t('dash_edit_profile')} (Wizard)
                                        </button>
                                        <button onClick={onEditYaml} className="px-5 py-3 border-2 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                                            <Icons.Code className="w-4 h-4" /> Advanced (YAML)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modules Grid - Optimized for Life Content */}
                    <div className={`grid gap-6 pb-20 ${activeTab === 'life' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {activeTab === 'career' && filterModules(planData?.careerModules || []).map((m: any, i: number) => renderModuleCard(m, i, true))}
                        {activeTab === 'life' && filterModules(planData?.lifeModules || []).map((m: any, i: number) => renderModuleCard(m, i, false))}
                        
                        {/* Achievements Tab */}
                        {activeTab === 'trophies' && (
                            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.values(ACHIEVEMENTS).map(ach => {
                                    const unlocked = wikiProgress?.achievements?.includes(ach.id);
                                    const IconComponent = (Icons as any)[ach.icon] || Icons.Award;
                                    
                                    return (
                                        <div key={ach.id} className={`p-6 rounded-2xl border transition-all ${unlocked ? 'bg-white dark:bg-[#1a233b] border-yellow-200 dark:border-yellow-900/30 shadow-md scale-[1.02]' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 grayscale opacity-60'}`}>
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${unlocked ? ach.color : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{ach.title}</h3>
                                                    {unlocked && <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">UNLOCKED</span>}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{ach.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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
