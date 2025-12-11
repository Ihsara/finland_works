
import React, { useEffect, useState } from 'react';
import { Icons } from '../Icon';
import { useLanguage } from '../../contexts/LanguageContext';
import { APP_IDS } from '../../data/system/identifiers';
import * as Storage from '../../services/storageService';
import { ACHIEVEMENTS } from '../../data/achievements';
import { UserProfile } from '../../types';

interface AchievementsViewProps {
  onBack: () => void;
  profile: UserProfile | null;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onBack, profile }) => {
  const { t } = useLanguage();
  const [wikiProgress, setWikiProgress] = useState<Storage.WikiProgressData | null>(null);

  useEffect(() => {
      if (profile && profile.id !== 'guest') {
          setWikiProgress(Storage.getWikiProgress(profile.id));
      }
  }, [profile]);

  const stats = React.useMemo(() => {
      const unlockedCount = wikiProgress?.achievements?.length || 0;
      const totalCount = Object.keys(ACHIEVEMENTS).length;
      const percentage = Math.round((unlockedCount / totalCount) * 100);
      return { unlockedCount, totalCount, percentage };
  }, [wikiProgress]);

  return (
    <div 
      data-scene-id={APP_IDS.SCENES.ACHIEVEMENTS}
      className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] animate-in fade-in duration-500"
    >
      {/* Header - Standardized Padding */}
      <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 dark:border-white/10 flex items-center bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl sticky top-0 z-20">
        <button 
          data-testid={APP_IDS.VIEWS.ACHIEVEMENTS.BTN_BACK}
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg h-10"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          <span>{t('btn_back_dashboard')}</span>
        </button>
        <h2 className="ml-4 text-lg font-bold text-gray-900 dark:text-white border-l border-gray-200 dark:border-white/10 pl-4">
            {t('quest_tab_achievements')}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
              {/* Stats Hero */}
              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-yellow-200 dark:border-yellow-800/50">
                  <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Icons.Trophy className="w-10 h-10 text-yellow-500" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                      {stats.unlockedCount} / {stats.totalCount}
                  </h1>
                  <p className="text-yellow-800 dark:text-yellow-200 font-bold uppercase tracking-wider text-sm">
                      {t('quest_achievement_unlocked')}
                  </p>
                  <div className="w-full max-w-xs h-2 bg-white/50 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-yellow-500 transition-all duration-1000 ease-out" style={{ width: `${stats.percentage}%` }}></div>
                  </div>
              </div>

              {/* Grid */}
              <div 
                data-testid={APP_IDS.VIEWS.ACHIEVEMENTS.LIST}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                  {Object.values(ACHIEVEMENTS).map(ach => {
                      const unlocked = wikiProgress?.achievements?.includes(ach.id);
                      const IconComponent = (Icons as any)[ach.icon] || Icons.Award;
                      
                      return (
                          <div key={ach.id} className={`p-6 rounded-2xl border transition-all ${unlocked ? 'bg-white dark:bg-[#1a233b] border-yellow-200 dark:border-yellow-900/30 shadow-md scale-[1.02]' : 'bg-gray-100/50 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-70 grayscale'}`}>
                              <div className="flex items-center gap-4 mb-3">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${unlocked ? ach.color : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                                      <IconComponent className="w-6 h-6" />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{ach.title}</h3>
                                      {unlocked ? (
                                          <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">UNLOCKED</span>
                                      ) : (
                                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                              <Icons.Lock className="w-3 h-3" /> Locked
                                          </span>
                                      )}
                                  </div>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">
                                  {ach.description}
                              </p>
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>
    </div>
  );
};
