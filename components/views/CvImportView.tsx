
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
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-20 justify-between">
        <div className="flex items-center">
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-gray-800 hover:text-black transition font-medium px-3 py-2 hover:bg-gray-50 rounded-lg"
            >
                <Icons.ArrowLeft className="w-5 h-5" />
                <span>{t('btn_back_dashboard', language)}</span>
            </button>
            <h2 className="ml-4 text-lg font-bold text-gray-900 hidden sm:block">{t('cv_title', language)}</h2>
        </div>
        <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-gray-500 hover:text-black p-2 flex items-center gap-2 text-sm font-medium"
            title="Manage API Key"
        >
            <Icons.Key className="w-4 h-4" /> 
            <span className="hidden sm:inline">{t('cv_btn_manage_key', language)}</span>
        </button>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-3xl mx-auto w-full overflow-y-auto">
         
         {/* API Key Banner/Input */}
         {showKeyInput && (
            <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl animate-in slide-in-from-top-2">
                <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700">
                        <Icons.Key className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                            {hasKey ? t('cv_key_update', language) : t('cv_key_required', language)}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {t('cv_key_desc', language)}
                        </p>
                        <div className="flex gap-2">
                            <input 
                                type="password" 
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder={t('cv_key_placeholder', language)}
                            />
                            <button 
                                onClick={handleSaveKey}
                                disabled={keyInput.length < 5}
                                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50 whitespace-nowrap"
                            >
                                {t('cv_key_save', language)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
         )}

         <div className="text-center mb-8">
             <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                 <Icons.Upload className="w-8 h-8" />
             </div>
             <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('cv_title', language)}</h1>
             <p className="text-gray-600">{t('cv_subtitle', language)}</p>
         </div>

         <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-inner">
             <textarea 
                className="w-full h-64 bg-transparent border-none focus:ring-0 p-2 text-sm font-mono text-gray-800 resize-none"
                placeholder={t('cv_placeholder', language)}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!hasKey && !process.env.API_KEY} 
             />
         </div>

         <div className="mt-8 flex justify-center">
             <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || text.length < 50 || (!hasKey && !process.env.API_KEY)}
                className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition shadow-lg w-full md:w-auto justify-center"
             >
                 {isAnalyzing ? (
                     <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('cv_btn_processing', language)}
                     </>
                 ) : (
                     <>
                        <Icons.Rocket className="w-5 h-5" />
                        {t('cv_btn_analyze', language)}
                     </>
                 )}
             </button>
         </div>
         
         {!hasKey && !process.env.API_KEY && (
            <p className="text-center text-red-500 text-sm mt-4 font-medium animate-pulse">
                {t('cv_warning_key', language)}
            </p>
         )}
      </div>
    </div>
  );
};
