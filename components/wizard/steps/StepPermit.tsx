
import React from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { WizardStepProps } from '../types';

const PermitSelector = ({ current, onSelect, t }: { current: string, onSelect: (v: string) => void, t: any }) => {
    const options = [
      {
          id: 'Unlimited',
          value: "Unlimited (Family/Permanent/Asylum)",
          title: t('wizard_permit_full_title'),
          desc: t('wizard_permit_full_desc'),
          icon: Icons.CheckCircle,
          color: 'bg-green-100 text-green-600 border-green-200 hover:bg-green-200'
      },
      {
          id: 'Restricted',
          value: "Work-based (Restricted)",
          title: t('wizard_permit_restricted_title'),
          desc: t('wizard_permit_restricted_desc'),
          icon: Icons.Building2,
          color: 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'
      },
      {
          id: 'Student',
          value: "Student",
          title: t('wizard_permit_student_title'),
          desc: t('wizard_permit_student_desc'),
          icon: Icons.GraduationCap,
          color: 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200'
      }
    ];

    return (
      <div className="grid grid-cols-1 gap-4 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {options.map(opt => {
               const isSelected = current === opt.value;
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

const StepPermit: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step5_title')}</h2>
      </div>
      <PermitSelector 
          current={formData.residencePermitType}
          onSelect={(v) => {
              handleChange('residencePermitType', v);
              setTimeout(handleNext, 350);
          }}
          t={t}
      />
    </div>
  );
};

export default StepPermit;
