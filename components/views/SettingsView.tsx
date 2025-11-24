
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { LanguageCode, LengthPreference, ThemePreference } from '../../types';
import { t } from '../../data/languages';
import { 
    getGlobalLengthPreference, 
    saveGlobalLengthPreference,
    getThemePreference,
    saveThemePreference,
    resetApplicationData
} from '../../services/storageService';

interface SettingsViewProps {
  language: LanguageCode;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ language, onBack }) => {
  const [prefLength, setPrefLength] = useState<LengthPreference>('ask');
  const [prefTheme, setPrefTheme] = useState<ThemePreference>('system');
  const [expandedSection, setExpandedSection] = useState<string | null>('general');

  useEffect(() => {
    setPrefLength(getGlobalLengthPreference());
    setPrefTheme(getThemePreference());
  }, []);

  const handleSave = () => {
    saveGlobalLengthPreference(prefLength);
    saveThemePreference(prefTheme);
    
    // Force Theme Apply Immediately
    const root = document.documentElement;
    if (prefTheme === 'dark') {
        root.classList.add('dark');
    } else if (prefTheme === 'light') {
        root.classList.remove('dark');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
        else root.classList.remove('dark');
    }
    
    onBack();
  };

  const handleClearData = () => {
      if (window.confirm("Are you sure you want to erase all data? This cannot be undone.")) {
          resetApplicationData();
          window.location.reload();
      }
  };

  const toggleSection = (id: string) => {
      setExpandedSection(prev => prev === id ? null : id);
  };

  const lengthOptions = [
    { value: 'ask', label: t('settings_opt_ask', language), icon: Icons.MessageSquare },
    { value: 'short', label: t('settings_opt_short', language), icon: Icons.Zap },
    { value: 'long', label: t('settings_opt_long', language), icon: Icons.BookOpen },
  ];

  const themeOptions = [
      { value: 'system', label: t('settings_theme_system', language), icon: Icons.LayoutGrid },
      { value: 'light', label: t('settings_theme_light', language), icon: Icons.Sun },
      { value: 'dark', label: t('settings_theme_dark', language), icon: Icons.Moon },
  ];

  const AccordionSection = ({ 
      id, 
      title, 
      icon: Icon, 
      children 
  }: { id: string, title: string, icon: any, children: React.ReactNode }) => {
      const isOpen = expandedSection === id;
      return (
          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
              <button 
                  onClick={() => toggleSection(id)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${isOpen ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isOpen ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                          <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-lg">{title}</span>
                  </div>
                  {isOpen ? <Icons.ChevronDown className="w-5 h-5 text-gray-400" /> : <Icons.ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>
              
              <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                  <div className="p-5 pt-0">
                      {children}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center bg-white dark:bg-gray-950 sticky top-0 z-20">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
        >
          <Icons.ArrowLeft className="w-5 h-5" />
          <span>{t('btn_back_dashboard', language)}</span>
        </button>
        <h2 className="ml-4 text-lg font-bold text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-700 pl-4">
            {t('settings_title', language)}
        </h2>
      </div>

      <div className="flex-1 p-6 md:p-10 max-w-2xl mx-auto w-full overflow-y-auto">
         <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
             
             {/* General Section */}
             <AccordionSection id="general" title={t('settings_sect_general', language)} icon={Icons.Settings}>
                 <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 mt-2">{t('settings_length_label', language)}</h4>
                 <div className="space-y-2">
                     {lengthOptions.map((opt) => {
                         const isSelected = prefLength === opt.value;
                         const Icon = opt.icon;
                         return (
                             <button
                                 key={opt.value}
                                 onClick={() => setPrefLength(opt.value as LengthPreference)}
                                 className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all ${
                                     isSelected 
                                        ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-sm' 
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                                 }`}
                             >
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                                     <Icon className="w-4 h-4" />
                                 </div>
                                 <span className={`font-medium ${isSelected ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                     {opt.label}
                                 </span>
                                 {isSelected && <Icons.CheckCircle className="w-5 h-5 text-black dark:text-white ml-auto" />}
                             </button>
                         );
                     })}
                 </div>
             </AccordionSection>

             {/* Appearance Section */}
             <AccordionSection id="appearance" title={t('settings_sect_appearance', language)} icon={Icons.Eye}>
                 <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 mt-2">{t('settings_theme_label', language)}</h4>
                 <div className="grid grid-cols-3 gap-2">
                     {themeOptions.map((opt) => {
                         const isSelected = prefTheme === opt.value;
                         const Icon = opt.icon;
                         return (
                             <button
                                 key={opt.value}
                                 onClick={() => setPrefTheme(opt.value as ThemePreference)}
                                 className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                                     isSelected 
                                        ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-sm' 
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300'
                                 }`}
                             >
                                 <Icon className={`w-6 h-6 ${isSelected ? 'text-black dark:text-white' : 'text-gray-400'}`} />
                                 <span className={`text-xs font-bold ${isSelected ? 'text-black dark:text-white' : 'text-gray-500'}`}>
                                     {opt.label}
                                 </span>
                             </button>
                         );
                     })}
                 </div>
             </AccordionSection>

             {/* Data Section */}
             <AccordionSection id="data" title={t('settings_sect_data', language)} icon={Icons.Database}>
                 <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                     <h4 className="text-red-800 dark:text-red-400 font-bold flex items-center gap-2">
                         <Icons.Trash2 className="w-4 h-4" /> {t('settings_clear_data', language)}
                     </h4>
                     <p className="text-red-600 dark:text-red-300 text-sm mt-1 mb-3">
                         {t('settings_clear_data_desc', language)}
                     </p>
                     <button 
                        onClick={handleClearData}
                        className="bg-white dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/40 transition"
                     >
                         {t('settings_btn_clear', language)}
                     </button>
                 </div>
             </AccordionSection>

         </div>

         <div className="mt-8 flex justify-center">
             <button
                 onClick={handleSave}
                 className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg flex items-center gap-2 transform active:scale-95 duration-200"
             >
                 <Icons.Save className="w-4 h-4" /> {t('btn_save', language)}
             </button>
         </div>
      </div>
    </div>
  );
};
