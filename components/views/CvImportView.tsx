
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { analyzeCV } from '../../services/geminiService';
import { saveProfile, getActiveProfile, saveApiKey, getApiKey } from '../../services/storageService';

interface CvImportViewProps {
  onBack: () => void;
  onProfileUpdated: () => void;
}

export const CvImportView: React.FC<CvImportViewProps> = ({ onBack, onProfileUpdated }) => {
  const { t, headingFont } = useLanguage();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  useEffect(() => {
    const key = getApiKey();
    setHasKey(!!key);
    if (!key) setShowKeyInput(true);
  }, []);

  const handleSaveKey = () => {
    if (keyInput.trim().length > 5) {
      saveApiKey(keyInput.trim());
      setHasKey(true);
      setShowKeyInput(false);
      setKeyInput('');
      alert(t('cv_alert_success'));
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCV(text);
      const currentProfile = getActiveProfile();
      if (currentProfile) {
         const updatedProfile: UserProfile = {
             ...currentProfile,
             profession: result.profession || currentProfile.profession,
             education: result.education ? {
                 degree: result.education.degree || currentProfile.education.degree,
                 field: result.education.field || currentProfile.education.field
             } : currentProfile.education,
             aspirations: Array.from(new Set([...currentProfile.aspirations, ...(result.aspirations || [])])),
             challenges: Array.from(new Set([...currentProfile.challenges, ...(result.challenges || [])])),
             languages: currentProfile.languages.length > 0 ? currentProfile.languages : (result.languages || [])
         };
         saveProfile(updatedProfile, true);
         alert("Profile updated successfully!");
         onProfileUpdated();
         onBack();
      }
    } catch (e) {
      alert(t('cv_alert_error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b1021] animate-in fade-in duration-500">
      {/* Header - Standardized Padding */}
      <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 dark:border-white/10 flex items-center bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl sticky top-0 z-20 justify-between">
        <div className="flex items-center">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg h-10">
                <Icons.ArrowLeft className="w-5 h-5" />
                <span>{t('btn_back_dashboard')}</span>
            </button>
            <h2 className={`ml-4 text-lg font-bold text-gray-900 dark:text-white hidden sm:block ${headingFont}`}>{t('cv_title')}</h2>
        </div>
        <button onClick={() => setShowKeyInput(!showKeyInput)} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white p-2 flex items-center gap-2 text-sm font-medium" title="Manage API Key">
            <Icons.Key className="w-4 h-4" /> <span className="hidden sm:inline">{t('cv_btn_manage_key')}</span>
        </button>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-3xl mx-auto w-full overflow-y-auto">
         {showKeyInput && (
            <div className="mb-8 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl animate-in slide-in-from-top-2 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl text-yellow-700 dark:text-yellow-400">
                        <Icons.Key className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{hasKey ? t('cv_key_update') : t('cv_key_required')}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('cv_key_desc')}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} className="flex-1 p-3 border border-gray-300 dark:border-white/10 bg-white dark:bg-[#151b2e] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white" placeholder={t('cv_key_placeholder')}/>
                            <button onClick={handleSaveKey} disabled={keyInput.length < 5} className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 whitespace-nowrap min-h-[44px]">{t('cv_key_save')}</button>
                        </div>
                    </div>
                </div>
            </div>
         )}

         <div className="text-center mb-8">
             <div className="bg-blue-50 dark:bg-blue-900/30 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 shadow-sm">
                 <Icons.Upload className="w-10 h-10" />
             </div>
             <h1 className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${headingFont}`}>{t('cv_title')}</h1>
             <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">{t('cv_subtitle')}</p>
         </div>

         <div className="bg-white dark:bg-white/5 rounded-3xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
             <textarea className="w-full h-64 p-4 bg-transparent border-none resize-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 leading-relaxed text-sm md:text-base" placeholder={t('cv_placeholder')} value={text} onChange={(e) => setText(e.target.value)}/>
         </div>

         <div className="mt-8 flex justify-center">
             <button onClick={handleAnalyze} disabled={!text.trim() || isAnalyzing} className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 min-h-[56px] min-w-[200px] justify-center">
                {isAnalyzing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin"></div>{t('cv_btn_processing')}</> : <><Icons.Zap className="w-5 h-5" />{t('cv_btn_analyze')}</>}
             </button>
         </div>
      </div>
    </div>
  );
};
