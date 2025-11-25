
import React from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { WizardStepProps } from '../types';
import { ProgressiveSelector, OptionGrid, RatingScale } from '../shared/WizardUI';

// --- Step 3: Age ---
export const StepAge: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step2_title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_step2_desc')}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
         {["18–25", "26–35", "36–50", "51+"].map(opt => (
          <button
            key={opt}
            onClick={() => { handleChange('ageRange', opt); setTimeout(handleNext, 350); }}
            className={`p-6 rounded-xl border font-medium text-lg transition-all ${
              formData.ageRange === opt 
              ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50 dark:bg-gray-800 text-black dark:text-white' 
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {opt}
          </button>
         ))}
      </div>
    </div>
  );
};

// --- Step 8: English ---
export const StepEnglish: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  const options = [
    { value: "None", label: t('wizard_opt_lang_en_none') },
    { value: "Basic", label: t('wizard_opt_lang_en_basic') },
    { value: "Working Proficiency", label: t('wizard_opt_lang_en_working') },
    { value: "Native/Fluent", label: t('wizard_opt_lang_en_fluent') }
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step9_title')}</h2>
       </div>
       <ProgressiveSelector 
          options={options}
          current={formData.languageEnglish}
          onSelect={(v) => { handleChange('languageEnglish', v); setTimeout(handleNext, 350); }}
       />
    </div>
  );
};

// --- Step 10: Education ---
const EducationSelector = ({ current, onSelect, t }: { current: string, onSelect: (v: string) => void, t: any }) => {
    const options = [
      {
          id: 'General',
          value: "High School / General",
          title: t('wizard_edu_general_title'),
          desc: t('wizard_edu_general_desc'),
          icon: Icons.BookOpen,
          color: 'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200'
      },
      {
          id: 'Vocational_AMK',
          value: "Vocational / AMK",
          title: t('wizard_edu_applied_title'),
          desc: t('wizard_edu_applied_desc'),
          icon: Icons.Briefcase,
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
      },
      {
          id: 'University',
          value: "University Degree",
          title: t('wizard_edu_uni_title'),
          desc: t('wizard_edu_uni_desc'),
          icon: Icons.GraduationCap,
          color: 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200'
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

export const StepEducation: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step6_title')}</h2>
         <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_step6_desc')}</p>
      </div>
      <EducationSelector 
         current={formData.educationDegree}
         onSelect={(v) => { handleChange('educationDegree', v); setTimeout(handleNext, 350); }}
         t={t}
      />
    </div>
  );
};

// --- Step 11: Profession ---
export const StepProfession: React.FC<WizardStepProps> = ({ formData, handleChange }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step7_title')}</h2>
         <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_step7_desc')}</p>
      </div>
      <input 
         type="text" 
         className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none text-gray-900 dark:text-white"
         placeholder={t('wizard_step7_placeholder')}
         value={formData.profession}
         onChange={(e) => handleChange('profession', e.target.value)}
         autoFocus
       />
    </div>
  );
};

// --- Step 12-16: Confidence & Culture ---
export const StepCareerConfidence: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step14_title')}</h2></div>
       <RatingScale 
          current={formData.confidenceCareer}
          onSelect={(v) => { handleChange('confidenceCareer', v); setTimeout(handleNext, 350); }}
          minLabel={t('wizard_scale_1_career')}
          maxLabel={t('wizard_scale_5_career')}
          t={t}
       />
    </div>
  );
};

export const StepLifeConfidence: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step13_title')}</h2></div>
       <RatingScale 
          current={formData.confidenceLife}
          onSelect={(v) => { handleChange('confidenceLife', v); setTimeout(handleNext, 350); }}
          minLabel={t('wizard_scale_1_life')}
          maxLabel={t('wizard_scale_5_life')}
          t={t}
       />
    </div>
  );
};

export const StepCulture: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  const options = [
    { value: "A beautiful mystery", label: t('wizard_opt_cult_low') },
    { value: "Happily observing", label: t('wizard_opt_cult_med') },
    { value: "Diving in deep", label: t('wizard_opt_cult_high') },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step12_title')}</h2></div>
       <ProgressiveSelector 
          options={options}
          current={formData.cultureInterest}
          onSelect={(v) => { handleChange('cultureInterest', v); setTimeout(handleNext, 350); }}
       />
    </div>
  );
};

export const StepInfoLevel: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  const options = [
    { value: "Foggy", label: t('wizard_opt_info_none') },
    { value: "Clearing up", label: t('wizard_opt_info_some') },
    { value: "Crystal clear", label: t('wizard_opt_info_high') },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step15_title')}</h2></div>
       <ProgressiveSelector 
          options={options}
          current={formData.infoLevel}
          onSelect={(v) => { handleChange('infoLevel', v); setTimeout(handleNext, 350); }}
       />
    </div>
  );
};

export const StepExcitement: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext }) => {
  const { t } = useLanguage();
  const options = [
    { value: "Career opportunities", label: t('wizard_opt_excite_career') },
    { value: "Quality of life", label: t('wizard_opt_excite_life') },
    { value: "Nature and culture", label: t('wizard_opt_excite_nature') },
    { value: "Adventure", label: t('wizard_opt_excite_adventure') },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step16_title')}</h2></div>
       <OptionGrid 
          options={options}
          current={formData.primaryExcitement}
          onSelect={(v) => { handleChange('primaryExcitement', v); setTimeout(handleNext, 350); }}
       />
    </div>
  );
};

// --- Step 17: Vision ---
export const StepVision: React.FC<WizardStepProps> = ({ formData, handleChange }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step10_title')}</h2></div>
       <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('wizard_step10_aspirations_label')}</label>
            <textarea 
              className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none resize-none h-24 text-gray-900 dark:text-white"
              placeholder={t('wizard_step10_aspirations_placeholder')}
              value={formData.aspirations}
              onChange={(e) => handleChange('aspirations', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('wizard_step10_challenges_label')}</label>
            <textarea 
              className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none resize-none h-24 text-gray-900 dark:text-white"
              placeholder={t('wizard_step10_challenges_placeholder')}
              value={formData.challenges}
              onChange={(e) => handleChange('challenges', e.target.value)}
            />
          </div>
       </div>
    </div>
  );
};
