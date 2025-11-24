
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { LanguageCode, UserProfile } from '../../types';
import { t } from '../../data/languages';
import { analyzeCV } from '../../services/geminiService';
import { saveProfile, getActiveProfile, saveApiKey, getApiKey } from '../../services/storageService';

interface CvImportViewProps {
  language: LanguageCode;
  onBack: () => void;
  onProfileUpdated: () => void;
}

export const CvImportView: React.FC<CvImportViewProps> = ({ language, onBack, onProfileUpdated }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  useEffect(() => {
    // Check if we have a personalized key stored locally
    const key = getApiKey();
    setHasKey(!!key);
    // If no key is found, expand the input section by default
    if (!key) setShowKeyInput(true);
  }, []);

  const handleSaveKey = () => {
    if (keyInput.trim().length > 5) {
      saveApiKey(keyInput.trim());
      setHasKey(true);
      setShowKeyInput(false);
      setKeyInput('');
      alert(t('cv_alert_success', language));
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeCV(text);
      const currentProfile = getActiveProfile();
      
      if (currentProfile) {
         // Merge logic
         const updatedProfile: UserProfile = {
             ...currentProfile,
             profession: result.profession || currentProfile.profession,
             education: result.education ? {
                 degree: result.education.degree || currentProfile.education.degree,
                 field: result.education.field || currentProfile.education.field
             } : currentProfile.education,
             // Merge lists uniquely
             aspirations: Array.from(new Set([...currentProfile.aspirations, ...(result.aspirations || [])])),
             challenges: Array.from(new Set([...currentProfile.challenges, ...(result.challenges || [])])),
             // Preserve existing language data if new data is scant, or manual merge could be better. 
             // Here we keep existing to avoid overwriting user edits with potentially vague AI guesses unless empty.
             languages: currentProfile.languages.length > 0 ? currentProfile.languages : (result.languages || [])
         };
         
         saveProfile(updatedProfile, true);
         alert("Profile updated successfully!");
         onProfileUpdated();
         onBack();
      }
    } catch (e) {
      alert(t('cv_alert_error', language));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center bg-white dark:bg-gray-950 sticky top-0 z-20 justify-between">
        <div className="flex items-center">
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            >
                <Icons.ArrowLeft className="w-5 h-5" />
                <span>{t('btn_back_dashboard', language)}</span>
            </button>
            <h2 className="ml-4 text-lg font-bold text-gray-900 dark:text-white hidden sm:block">{t('cv_title', language)}</h2>
        </div>
        <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white p-2 flex items-center gap-2 text-sm font-medium"
            title="Manage API Key"
        >
            <Icons.Key className="w-4 h-4" /> 
            <span className="hidden sm:inline">{t('cv_btn_manage_key', language)}</span>
        </button>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-3xl mx-auto w-full overflow-y-auto">
         
         {/* API Key Banner/Input */}
         {showKeyInput && (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl animate-in slide-in-from-top-2">
                <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-yellow-700 dark:text-yellow-400">
                        <Icons.Key className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                            {hasKey ? t('cv_key_update', language) : t('cv_key_required', language)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {t('cv_key_desc', language)}
                        </p>
                        <div className="flex gap-2">
                            <input 
                                type="password" 
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
                                placeholder={t('cv_key_placeholder', language)}
                            />
                            <button 
                                onClick={handleSaveKey}
                                disabled={keyInput.length < 5}
                                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 whitespace-nowrap"
                            >
                                {t('cv_key_save', language)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         )}

         <div className="text-center mb-8">
             <div className="bg-blue-50 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                 <Icons.Upload className="w-8 h-8" />
             </div>
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('cv_title', language)}</h1>
             <p className="text-gray-600 dark:text-gray-400">{t('cv_subtitle', language)}</p>
         </div>

         <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
             <textarea 
               className="w-full h-64 p-4 bg-transparent border-none resize-none focus:ring-0 text-gray-900