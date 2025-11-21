import React, { useState } from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile, LanguageCode } from '../../types';
import { t } from '../../data/languages';
import { getAvatarUrl } from '../../utils/profileUtils';

interface ProfileDetailViewProps {
  language: LanguageCode;
  profile: UserProfile | null;
  profileCompleteness: number;
  allProfiles: UserProfile[];
  onLanguageSelect: (code: LanguageCode, supported: boolean) => void;
  onNavigateBack: () => void;
  onSwitchProfile: (id: string) => void;
  onCreateProfile: () => void;
  onEditVisual: () => void;
  onEditYaml: () => void;
  onNavigateToWiki: () => void;
}

export const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({
  language,
  profile,
  profileCompleteness,
  allProfiles,
  onLanguageSelect,
  onNavigateBack,
  onSwitchProfile,
  onCreateProfile,
  onEditVisual,
  onEditYaml,
  onNavigateToWiki
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto animate-in fade-in duration-500">
      {/* New Robust Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateBack} 
            className="flex items-center gap-2 text-gray-800 hover:text-black transition font-medium px-3 py-2 hover:bg-gray-50 rounded-lg"
          >
            <Icons.ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('btn_back_dashboard', language)}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <LanguageSelector currentLanguage={language} onSelect={onLanguageSelect} />
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="text-xs font-bold text-gray-700 hover:text-black flex items-center gap-1 uppercase tracking-wide bg-gray-50 px-3 py-2 rounded-full border border-gray-100"
            >
              {t('dash_switch_profile', language)} <Icons.ChevronDown className="w-3 h-3" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-10 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="max-h-64 overflow-y-auto">
                  {allProfiles.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        onSwitchProfile(p.id);
                        setIsProfileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0 ${profile?.id === p.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                      <span className="font-medium">{p.name}</span>
                      {profile?.id === p.id && <Icons.CheckCircle className="w-3 h-3" />}
                    </button>
                  ))}
                  <button 
                    onClick={() => {
                      onCreateProfile();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-blue-600 font-bold flex items-center gap-2"
                  >
                    <Icons.UserPlus className="w-4 h-4" /> {t('dash_new_profile', language)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        {/* Top Section: Avatar + Info + Progress */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-start md:items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg relative group">
            {profile ? (
              <img 
                src={getAvatarUrl(profile)} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Icons.User className="w-12 h-12" />
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile?.name || 'Guest'}</h1>
            <div className="text-gray-700 space-y-1">
              <p className="flex items-center gap-2"><Icons.Calendar className="w-4 h-4 opacity-70"/> {profile?.ageRange || 'Age unknown'}</p>
              <p className="flex items-center gap-2"><Icons.Home className="w-4 h-4 opacity-70"/> {profile?.originCountry || 'Unknown Origin'}</p>
              <p className="flex items-center gap-2"><Icons.Heart className="w-4 h-4 opacity-70"/> {profile?.maritalStatus || 'Unknown Status'}</p>
            </div>
          </div>

          <div className="w-full md:w-72 flex flex-col justify-center gap-3 bg-gray-50 p-5 rounded-xl">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-black">{t('profile_completeness', language, { percentage: profileCompleteness.toString() })}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full transition-all duration-1000 ease-out" style={{ width: `${profileCompleteness}%` }}></div>
            </div>
            <p className="text-xs text-gray-700">{t('profile_completeness_hint', language)}</p>
            <button 
              onClick={onEditVisual}
              className="bg-white border border-gray-200 text-black py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition shadow-sm"
            >
              {profileCompleteness === 100 ? t('profile_btn_update', language) : t('profile_btn_continue', language)}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button 
            onClick={onNavigateToWiki}
            className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-black transition group bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-black group-hover:text-white transition">
                <Icons.BookMarked className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold text-gray-900">{t('profile_btn_guide', language)}</span>
                <span className="text-sm text-gray-600">{t('profile_btn_guide_desc', language)}</span>
              </div>
            </div>
            <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black" />
          </button>
          <button className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-black transition group bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-full text-green-600 group-hover:bg-black group-hover:text-white transition">
                <Icons.Rocket className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold text-gray-900">{t('profile_btn_plan', language)}</span>
                <span className="text-sm text-gray-600">{t('profile_btn_plan_desc', language)}</span>
              </div>
            </div>
            <Icons.ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black" />
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages */}
          <div className="bg-gray-50 p-6 rounded-2xl relative group">
            <button onClick={onEditYaml} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
              <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.Languages className="w-5 h-5"/> {t('profile_sect_languages', language)}</h3>
            <div className="space-y-3">
              {(profile?.languages && profile.languages.length > 0) ? (
                profile.languages.map((l, i) => (
                  <div key={i} className="flex flex-col pb-2 border-b border-gray-200 last:border-0">
                    <span className="font-bold text-gray-800">{l.language}</span>
                    <span className="text-sm text-gray-700">{l.level}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No languages specified.</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="bg-gray-50 p-6 rounded-2xl relative group">
            <button onClick={onEditYaml} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
              <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.GraduationCap className="w-5 h-5"/> {t('profile_sect_skills', language)}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-black mb-1 text-sm uppercase tracking-wide text-gray-600">{t('profile_label_education', language)}</h4>
                <p className="text-gray-800 font-medium">
                  {profile?.education?.degree || 'Not specified'} 
                  {profile?.education?.field ? ` in ${profile.education.field}` : ''}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-1 text-sm uppercase tracking-wide text-gray-600">{t('profile_label_profession', language)}</h4>
                <p className="text-gray-800 font-medium">{profile?.profession || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Narrative - Full Width */}
          <div className="bg-gray-50 p-6 rounded-2xl relative group md:col-span-2">
            <button onClick={onEditYaml} className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black transition">
              <Icons.Edit3 className="w-3 h-3" /> {t('dash_edit_profile', language)}
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Icons.User className="w-5 h-5"/> {t('profile_sect_narrative', language)}</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-black mb-2">{t('profile_label_aspirations', language)}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {(profile?.aspirations && profile.aspirations.length > 0) ? (
                    profile.aspirations.map((a, i) => <li key={i}>{a}</li>)
                  ) : (
                    <li className="text-gray-500 italic list-none ml-[-1rem]">No aspirations listed yet.</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2">{t('profile_label_challenges', language)}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {(profile?.challenges && profile.challenges.length > 0) ? (
                    profile.challenges.map((a, i) => <li key={i}>{a}</li>)
                  ) : (
                    <li className="text-gray-500 italic list-none ml-[-1rem]">No challenges listed yet.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};