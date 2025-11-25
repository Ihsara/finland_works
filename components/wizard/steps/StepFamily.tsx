
import React from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { WizardStepProps } from '../types';
import { MultiSelectGrid } from '../shared/WizardUI';

// --- Sub-Component: Marital Selector ---
const MaritalSelector = ({ current, onSelect, t }: { current: string, onSelect: (v: string) => void, t: any }) => {
  const options = [
      { 
          id: 'Solo', 
          value: "Solo (Single/Divorced/Widowed)",
          title: t('wizard_marital_solo_title'),
          desc: t('wizard_marital_solo_desc'),
          icon: Icons.User,
          color: 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'
      },
      { 
          id: 'Partnered', 
          value: "Accompanied (Partner/Family)",
          title: t('wizard_marital_pair_title'),
          desc: t('wizard_marital_pair_desc'),
          icon: Icons.Users,
          color: 'bg-pink-100 text-pink-600 border-pink-200 hover:bg-pink-200'
      },
      { 
          id: 'Secret', 
          value: "Prefer not to say",
          title: t('wizard_marital_secret_title'),
          desc: t('wizard_marital_secret_desc'),
          icon: Icons.Ghost,
          color: 'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200'
      }
  ];

  return (
      <div className="grid grid-cols-1 gap-4 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {options.map(opt => {
               const isSelected = current.includes(opt.value.split(' ')[0]) || 
                                  (opt.id === 'Partnered' && current.includes('Partnered')); 

               return (
                  <button
                      key={opt.id}
                      onClick={() => onSelect(opt.value)}
                      className={`
                          flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 group text-left
                          ${isSelected 
                              ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-md scale-[1.02]' 
                              : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }
                      `}
                  >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-black dark:bg-white text-white dark:text-black' : opt.color}`}>
                          <opt.icon className="w-8 h-8" />
                      </div>
                      <div>
                          <h3 className={`font-bold text-lg ${isSelected ? 'text-black dark:text-white' : 'text-gray-900 dark:text-gray-200'}`}>{opt.title}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{opt.desc}</p>
                      </div>
                      {isSelected && (
                           <div className="ml-auto">
                              <Icons.CheckCircle className="w-6 h-6 text-black dark:text-white" />
                           </div>
                      )}
                  </button>
               );
          })}
      </div>
  );
};

// --- Step 4: Marital Status ---
export const StepMarital: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step3_title')}</h2>
      </div>
      <MaritalSelector 
          current={formData.maritalStatus}
          onSelect={(v) => {
              handleChange('maritalStatus', v);
              setTimeout(handleNext, 350);
          }}
          t={t}
      />
    </div>
  );
};

// --- Step 5: Children Boolean ---
export const StepChildren: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  const BabyIcon = Icons.Baby || Icons.User;
  
  return (
     <div className="space-y-6 animate-in fade-in duration-500">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_children_title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_children_desc')}</p>
         </div>
         <div className="grid grid-cols-2 gap-4 mt-6">
             <button
                onClick={() => {
                    handleChange('hasChildren', true);
                    setTimeout(handleNext, 200);
                }}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    formData.hasChildren === true
                    ? 'border-black dark:border-white bg-blue-50 dark:bg-blue-900/20 text-black dark:text-white'
                    : 'border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200'
                }`}
             >
                 <BabyIcon className="w-10 h-10" />
                 <span className="text-xl font-bold">{t('wizard_children_yes')}</span>
             </button>

             <button
                onClick={() => {
                    handleChange('hasChildren', false);
                    setTimeout(handleNext, 200);
                }}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                    formData.hasChildren === false
                    ? 'border-black dark:border-white bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                    : 'border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200'
                }`}
             >
                 <Icons.X className="w-10 h-10" />
                 <span className="text-xl font-bold">{t('wizard_children_no')}</span>
             </button>
         </div>
     </div>
  );
};

// --- Step 6: Family Details ---
export const StepFamilyDetails: React.FC<WizardStepProps> = ({ formData, handleChange }) => {
  const { t } = useLanguage();

  const handleChildToggle = (group: string) => {
      const current = formData.childAgeGroups;
      if (current.includes(group)) {
          handleChange('childAgeGroups', current.filter((g: string) => g !== group));
      } else {
          handleChange('childAgeGroups', [...current, group]);
      }
  };

  return (
     <div className="space-y-8 animate-in fade-in duration-500">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_family_details_title')}</h2>
         </div>
         
         <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <label className="block text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
                {t('wizard_family_count_label')}
            </label>
            <div className="flex gap-2">
                {['1', '2', '3', '4+'].map(num => (
                    <button
                        key={num}
                        onClick={() => handleChange('childCount', num)}
                        className={`w-12 h-12 rounded-full font-bold transition-all ${
                            formData.childCount === num 
                            ? 'bg-black dark:bg-white text-white dark:text-black scale-110 shadow-lg' 
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white'
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
         </div>

         <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                {t('wizard_family_ages_label')}
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('wizard_family_ages_hint')}</p>
            
            <MultiSelectGrid 
                options={[
                    { value: '0-6', label: t('wizard_age_group_0_6') },
                    { value: '7-12', label: t('wizard_age_group_7_12') },
                    { value: '13-17', label: t('wizard_age_group_13_17') },
                    { value: '18+', label: t('wizard_age_group_18') },
                ]}
                selected={formData.childAgeGroups}
                onToggle={handleChildToggle}
            />
         </div>
     </div>
  );
};
