
import React from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { WizardStepProps } from '../types';
import { ProgressiveSelector, RatingScale } from '../shared/WizardUI';

const getFinnishLevelOptions = (t: any) => [
  { value: "None yet", label: t('wizard_opt_lang_none') },
  { value: "Basics (A1)", label: t('wizard_opt_lang_basics') },
  { value: "Intermediate (A2-B1)", label: t('wizard_opt_lang_inter') },
  { value: "Fluent (B2+)", label: t('wizard_opt_lang_fluent') }
];

const getDisplayLabel = (value: string, options: any[]) => {
    if (!value) return null;
    const found = options.find(o => o.value === value);
    return found ? found.label : value;
};

const StepFinnish: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext, activeSection = 'level', setActiveSection }) => {
  const { t } = useLanguage();

  const handleFinnishLevelSelect = (value: string) => {
      handleChange('languageFinnish', value);
      if (setActiveSection) setActiveSection('motivation');
  };

  const handleMotivationSelect = (value: string) => {
      handleChange('finnishMotivation', value);
      setTimeout(handleNext, 350);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
       <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step8_title')}</h2>
       </div>

       <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeSection === 'level' ? 'border-black dark:border-white shadow-md bg-white dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
           <div className="w-full flex items-center justify-between p-5 text-left cursor-default">
              <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'level' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                       <Icons.Languages className="w-4 h-4" />
                   </div>
                   <span className="font-bold text-gray-900 dark:text-white text-lg">
                       {getDisplayLabel(formData.languageFinnish, getFinnishLevelOptions(t)) || t('wizard_lbl_finnish_level')}
                   </span>
              </div>
              {activeSection === 'level' ? <Icons.ChevronDown className="w-5 h-5" /> : <Icons.ChevronRight className="w-5 h-5" />}
           </div>

           {activeSection === 'level' && (
               <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2">
                  <ProgressiveSelector 
                      options={getFinnishLevelOptions(t)}
                      current={formData.languageFinnish}
                      onSelect={handleFinnishLevelSelect}
                   />
               </div>
           )}
       </div>

       {formData.languageFinnish && (
          <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeSection === 'motivation' ? 'border-blue-500 shadow-md bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
              <div className="p-5">
                   <div className="flex items-center gap-3 mb-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'motivation' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                          <Icons.Zap className="w-4 h-4" />
                       </div>
                       <span className={`font-bold text-lg ${activeSection === 'motivation' ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                           {t('wizard_lbl_finnish_motivation')}
                       </span>
                   </div>
                   
                   {activeSection === 'motivation' && (
                       <RatingScale 
                          current={formData.finnishMotivation}
                          onSelect={handleMotivationSelect}
                          minLabel={t('wizard_scale_1_motivation')}
                          maxLabel={t('wizard_scale_5_motivation')}
                          t={t}
                       />
                   )}
              </div>
          </div>
       )}
    </div>
  );
};

export default StepFinnish;
