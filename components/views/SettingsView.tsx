
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { LanguageCode, LengthPreference } from '../../types';
import { t } from '../../data/languages';
import { getGlobalLengthPreference, saveGlobalLengthPreference } from '../../services/storageService';

interface SettingsViewProps {
  language: LanguageCode;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ language, onBack }) => {
  const [pref, setPref] = useState<LengthPreference>('ask');

  useEffect(() => {
    setPref(getGlobalLengthPreference());
  }, []);

  const handleSave = () => {
    saveGlobalLengthPreference(pref);
    onBack();
  };

  const options: { value: LengthPreference; label: string; icon: any }[] = [
    { value: 'ask', label: t('settings_opt_ask', language), icon: Icons.MessageSquare },
    { value: 'short', label: t('settings_opt_short', language), icon: Icons.Zap },
    { value: 'long', label: t('settings_opt_long', language), icon: Icons.BookOpen },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white sticky top-0 z-20">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-800 hover:text-black transition font-medium px-3 py-2 hover:bg-gray-50 rounded-lg"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          <span>{t('btn_back_dashboard', language)}</span>
        </button>
        <h2 className="ml-4 text-lg font-bold text-gray-900 border-l border-gray-200 pl-4">
            {t('settings_title', language)}
        </h2>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-2xl mx-auto w-full">
         <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
             <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                     <Icons.Settings className="w-6 h-6 text-gray-700" />
                 </div>
                 <h3 className="font-bold text-xl text-gray-900">{t('settings_length_label', language)}</h3>
             </div>
             
             <div className="space-y-3">
                 {options.map((opt) => {
                     const isSelected = pref === opt.value;
                     const Icon = opt.icon;
                     return (
                         <button
                             key={opt.value}
                             onClick={() => setPref(opt.value)}
                             className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                                 isSelected 
                                    ? 'border-black bg-white shadow-md' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                             }`}
                         >
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                 <Icon className="w-5 h-5" />
                             </div>
                             <span className={`font-bold ${isSelected ? 'text-black' : 'text-gray-700'}`}>
                                 {opt.label}
                             </span>
                             {isSelected && <Icons.CheckCircle className="w-5 h-5 text-black ml-auto" />}
                         </button>
                     );
                 })}
             </div>
         </div>

         <div className="mt-8 flex justify-center">
             <button
                 onClick={handleSave}
                 className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
             >
                 <Icons.Save className="w-4 h-4" /> {t('btn_save', language)}
             </button>
         </div>
      </div>
    </div>
  );
};
