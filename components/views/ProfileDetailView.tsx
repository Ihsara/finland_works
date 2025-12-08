
import React, { useState } from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';
import { FeedbackRibbon } from '../FeedbackRibbon';
import { NavigationLinks } from '../NavigationLinks';
import { AppView } from '../../types';
import { APP_IDS } from '../../data/system/identifiers';

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
  onNavigateToLanding
}) => {
  const { t } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isGuest = !profile || profile.id === 'guest';

  // Helper to "translate" stored values
  const translateValue = (val: string | undefined) => {
      if (!val) return 'Unknown';
      if (val.includes('Solo')) return t('wizard_marital_solo_title');
      if (val.includes('Partnered')) return t('wizard_marital_pair_title');
      if (val.includes('Accompanied')) return t('wizard_marital_pair_title');
      return val;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 overflow-y-auto animate-in fade-in duration-500">
      
      {/* Header with Global Nav */}
      <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-950 sticky top-0 z-20">
        <NavigationLinks 
            currentView={AppView.PROFILE} 
            onNavigate={(v) => {
                if (v === AppView.DASHBOARD) onNavigateBack();
                if (v === AppView.WIKI) onNavigateToWiki();
                if (v === AppView.LANDING) onNavigateToLanding();
            }} 
        />
        
        <div className="flex items-center gap-2">
          <LanguageSelector className="hidden sm:block" />
          {!isGuest && (
            <div className="relative">
                <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition active:scale-95 touch-manipulation"
                >
                <Icons.Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                    <div className="max-h-64 overflow-y-auto">
                    {allProfiles.map(p => (
                        <button 
                        key={p.id}
                        onClick={() => {
                            onSwitchProfile(p.id);
                            setIsProfileMenuOpen(false);
                        }}
                        className={`w-full text-left px-5 py-4 text-sm flex items-center justify-between border-b border-gray-50 dark:border-gray-800 active:bg-gray-100 dark:active:bg-gray-800 ${profile?.id === p.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                        <span className="font-medium">{p.name}</span>
                        {profile?.id === p.id && <Icons.CheckCircle className="w-4 h-4" />}
                        </button>
                    ))}
                    <button 
                        onClick={() => {
                        onCreateProfile();
                        setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-5 py-4 text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 active:bg-blue-50 dark:active:bg-blue-900/20"
                    >
                        <Icons.UserPlus className="w-4 h-4" /> {t('dash_new_profile')}
                    </button>
                    </div>
                </div>
                )}
            </div>
          )}
        </div>
      </div>

      <FeedbackRibbon />

      {/* Guest View: "My Plan" Empty State */}
      {isGuest ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <Icons.UserPlus className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  {t('profile_btn_plan')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  To get a personalised plan, please take the quiz.
                  <br/>
                  <span className="text-sm opacity-70">(It only takes 2 minutes!)</span>
              </p>
              <button
                  data-testid={APP_IDS.VIEWS.PROFILE.BTN_TAKE_QUIZ}
                  onClick={onEditVisual} 
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 min-h-[56px]"
              >
                  {t('landing_btn_quiz')} <Icons.ArrowRight className="w-5 h-5" />
              </button>
          </div>
      ) : (
          /* Authenticated View: The Plan */
          <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 items-start md:items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border-4 border-white dark:border-gray-900 shadow-lg relative group">
                <img 
                    src={getAvatarUrl(profile)} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{profile?.name}</h1>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                <p className="flex items-center gap-2"><Icons.Calendar className="w-4 h-4 opacity-70"/> {profile?.ageRange}</p>
                <p className="flex items-center gap-2"><Icons.Home className="w-4 h-4 opacity-70"/> {profile?.originCountry}</p>
                <p className="flex items-center gap-2"><Icons.Heart className="w-4 h-4 opacity-70"/> {translateValue(profile?.maritalStatus)}</p>
                </div>
            </div>

            <div className="w-full md:w-72 flex flex-col justify-center gap-3 bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-black dark:text-white">{t('profile_completeness', { percentage: profileCompleteness.toString() })}</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${profileCompleteness}%` }}></div>
                </div>
                <button 
                onClick={onEditVisual}
                className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline text-left p-2 -ml-2 rounded active:bg-blue-50 dark:active:bg-blue-900/30"
                >
                {t('profile_btn_update')} →
                </button>
            </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl relative group border border-gray-100 dark:border-gray-800">
                    <button onClick={onEditYaml} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white active:scale-95">
                    <Icons.Edit3 className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Icons.Languages className="w-5 h-5 text-blue-500"/> {t('profile_sect_languages')}</h3>
                    <div className="space-y-3">
                    {profile?.languages?.map((l, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="font-bold text-gray-800 dark:text-gray-200">{l.language}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{l.level}</span>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl relative group border border-gray-100 dark:border-gray-800">
                    <button onClick={onEditYaml} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white active:scale-95">
                    <Icons.Edit3 className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Icons.GraduationCap className="w-5 h-5 text-green-500"/> {t('profile_sect_skills')}</h3>
                    <div className="space-y-4">
                    <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{t('profile_label_education')}</h4>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{profile?.education?.degree} {profile?.education?.field && `in ${profile.education.field}`}</p>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{t('profile_label_profession')}</h4>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{profile?.profession}</p>
                    </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl relative group md:col-span-2 border border-gray-100 dark:border-gray-800">
                    <button onClick={onEditYaml} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white active:scale-95">
                    <Icons.Edit3 className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Icons.User className="w-5 h-5 text-purple-500"/> {t('profile_sect_narrative')}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">{t('profile_label_aspirations')}</h4>
                            <ul className="list-disc pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                            {profile?.aspirations?.map((a, i) => <li key={i}>{a}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">{t('profile_label_challenges')}</h4>
                            <ul className="list-disc pl-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                            {profile?.challenges?.map((a, i) => <li key={i}>{a}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};
