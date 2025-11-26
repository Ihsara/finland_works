
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { LengthPreference, ThemePreference, LayoutPreference } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
    getGlobalLengthPreference, 
    saveGlobalLengthPreference,
    getThemePreference,
    saveThemePreference,
    getLayoutPreference,
    saveLayoutPreference,
    resetApplicationData
} from '../../services/storageService';

interface SettingsViewProps {
  onBack: () => void;
  onToggleLayout?: (mode: LayoutPreference) => void;
}

interface AccordionSectionProps {
  id: string;
  title: string;
  icon: any;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ 
    id, 
    title, 
    icon: Icon, 
    isOpen,
    onToggle,
    children 
}) => {
    return (
        <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
            <button 
                onClick={() => onToggle(id)}
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-5 pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onToggleLayout }) => {
  const { t } = useLanguage();
  const [prefLength, setPrefLength] = useState<LengthPreference>('ask');
  const [prefTheme, setPrefTheme] = useState<ThemePreference>('system');
  const [prefLayout, setPrefLayout] = useState<LayoutPreference>('windowed');
  const [expandedSection, setExpandedSection] = useState<string | null>('general');

  useEffect(() => {
    setPrefLength(getGlobalLengthPreference());
    setPrefTheme(getThemePreference());
    setPrefLayout(getLayoutPreference());
  }, []);

  const handleSave = () => {
    saveGlobalLengthPreference(prefLength);
    saveThemePreference(prefTheme);
    saveLayoutPreference(prefLayout);
    
    // Update parent state immediately
    if (onToggleLayout) onToggleLayout(prefLayout);
    
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
    { value: 'ask', label: t('settings_opt_ask'), icon: Icons.MessageSquare },
    { value: 'short', label: t('settings_opt_short'), icon: Icons.Zap },
    { value: 'long', label: t('settings_opt_long'), icon: Icons.BookOpen },
  ];

  const themeOptions = [
      { value: 'system', label: t('settings_theme_system'), icon: Icons.LayoutGrid },
      { value: 'light', label: t('settings_theme_light'), icon: Icons.Sun },
      { value: 'dark', label: t('settings_theme_dark'), icon: Icons.Moon },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 animate-in fade-in duration-500">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center bg-white dark:bg-gray-950 sticky top-0 z-20">
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition font-medium px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            >
                <Icons.ArrowLeft className="w-5 h-5" />
                <span>{t('btn_back_dashboard')}</span>
            </button>
            <h2 className="ml-4 text-lg font-bold text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-700 pl-4">{t('settings_title')}</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto py-6">
                
                {/* General Settings */}
                <AccordionSection 
                    id="general" 
                    title={t('settings_sect_general')} 
                    icon={Icons.Settings}
                    isOpen={expandedSection === 'general'}
                    onToggle={toggleSection}
                >
                     <div className="space-y-4 pt-4">
                         <div>
                             <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('settings_length_label')}</label>
                             <div className="grid grid-cols-1 gap-2">
                                 {lengthOptions.map(opt => (
                                     <button
                                         key={opt.value}
                                         onClick={() => setPrefLength(opt.value as LengthPreference)}
                                         className={`flex items-center p-3 rounded-lg border ${prefLength === opt.value ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                     >
                                         <div className={`p-2 rounded-full mr-3 ${prefLength === opt.value ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                            <opt.icon className="w-4 h-4" />
                                         </div>
                                         <span className="font-medium text-gray-900 dark:text-white">{opt.label}</span>
                                         {prefLength === opt.value && <Icons.CheckCircle className="w-5 h-5 ml-auto text-black dark:text-white" />}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>
                </AccordionSection>

                {/* Appearance */}
                <AccordionSection 
                    id="appearance" 
                    title={t('settings_sect_appearance')} 
                    icon={Icons.Eye}
                    isOpen={expandedSection === 'appearance'}
                    onToggle={toggleSection}
                >
                    <div className="space-y-6 pt-4">
                        <div>
                             <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('settings_theme_label')}</label>
                             <div className="grid grid-cols-3 gap-3">
                                 {themeOptions.map(opt => (
                                     <button
                                         key={opt.value}
                                         onClick={() => setPrefTheme(opt.value as ThemePreference)}
                                         className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${prefTheme === opt.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                     >
                                         <opt.icon className="w-6 h-6 mb-2" />
                                         <span className="text-xs font-bold">{opt.label}</span>
                                     </button>
                                 ))}
                             </div>
                        </div>

                        {/* Layout Toggle */}
                        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800 pt-4">
                             <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Desktop Layout</label>
                             <div className="flex gap-3">
                                <button
                                    onClick={() => setPrefLayout('windowed')}
                                    className={`flex-1 p-3 rounded-xl border-2 text-center font-bold text-xs transition-all flex items-center justify-center gap-2 ${prefLayout === 'windowed' ? 'border-black dark:border-white text-black dark:text-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                                >
                                    <div className="w-4 h-6 border-2 border-current rounded-sm"></div>
                                    Windowed (Mobile)
                                </button>
                                <button
                                    onClick={() => setPrefLayout('fullscreen')}
                                    className={`flex-1 p-3 rounded-xl border-2 text-center font-bold text-xs transition-all flex items-center justify-center gap-2 ${prefLayout === 'fullscreen' ? 'border-black dark:border-white text-black dark:text-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                                >
                                    <div className="w-6 h-4 border-2 border-current rounded-sm"></div>
                                    Full Screen
                                </button>
                             </div>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                 "Windowed" simulates a mobile app experience. "Full Screen" uses your entire desktop window.
                             </p>
                        </div>
                    </div>
                </AccordionSection>

                {/* Data & Privacy */}
                <AccordionSection 
                    id="data" 
                    title={t('settings_sect_data')} 
                    icon={Icons.Database}
                    isOpen={expandedSection === 'data'}
                    onToggle={toggleSection}
                >
                     <div className="space-y-4 pt-4">
                         <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                             <h4 className="font-bold text-red-900 dark:text-red-400 mb-1">{t('settings_clear_data')}</h4>
                             <p className="text-sm text-red-700 dark:text-red-300 mb-4">{t('settings_clear_data_desc')}</p>
                             <button 
                                onClick={handleClearData}
                                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition"
                             >
                                {t('settings_btn_clear')}
                             </button>
                         </div>
                     </div>
                </AccordionSection>

            </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <button 
                onClick={handleSave}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg"
            >
                {t('btn_save')}
            </button>
        </div>
    </div>
  );
};
