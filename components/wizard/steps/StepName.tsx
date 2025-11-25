
import React from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { generateNickname } from '../../../data/nicknameData';
import { WizardStepProps } from '../types';

const StepName: React.FC<WizardStepProps> = ({ formData, handleChange }) => {
  const { t, language } = useLanguage();

  const handleGenerateName = () => {
      const nickname = generateNickname(language);
      handleChange('name', nickname);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_title_name')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_desc_name')}</p>
      </div>
      <div className="relative">
          <input 
            type="text" 
            className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none text-gray-900 dark:text-white"
            placeholder={t('wizard_placeholder_name')}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            autoFocus
          />
          <button
            onClick={handleGenerateName}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <Icons.Zap className="w-3 h-3" /> 
              {t('wizard_btn_generate_name')}
            </span>
          </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          {t('wizard_nickname_hint')}
      </p>
    </div>
  );
};

export default StepName;
