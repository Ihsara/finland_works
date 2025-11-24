
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { UserProfile, LanguageCode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { COUNTRIES, isEUCountry } from '../data/countries';
import { t as translate } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';
import { generateNickname } from '../data/nicknameData';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  initialData?: UserProfile | null;
}

interface OptionItem {
  label: string;
  value: string;
}

// --- HELPER FUNCTIONS (Using injected t function) ---

const getFinnishLevelOptions = (t: any): OptionItem[] => [
  { value: "None yet", label: t('wizard_opt_lang_none') },
  { value: "Basics (A1)", label: t('wizard_opt_lang_basics') },
  { value: "Intermediate (A2-B1)", label: t('wizard_opt_lang_inter') },
  { value: "Fluent (B2+)", label: t('wizard_opt_lang_fluent') }
];

const getEnglishLevelOptions = (t: any): OptionItem[] => [
  { value: "None", label: t('wizard_opt_lang_en_none') },
  { value: "Basic", label: t('wizard_opt_lang_en_basic') },
  { value: "Working Proficiency", label: t('wizard_opt_lang_en_working') },
  { value: "Native/Fluent", label: t('wizard_opt_lang_en_fluent') }
];

const getCultureOptions = (t: any): OptionItem[] => [
    { value: "A beautiful mystery", label: t('wizard_opt_cult_low') },
    { value: "Happily observing", label: t('wizard_opt_cult_med') },
    { value: "Diving in deep", label: t('wizard_opt_cult_high') },
];

const getInfoLevelOptions = (t: any): OptionItem[] => [
    { value: "Foggy", label: t('wizard_opt_info_none') },
    { value: "Clearing up", label: t('wizard_opt_info_some') },
    { value: "Crystal clear", label: t('wizard_opt_info_high') },
];

const getExcitementOptions = (t: any): OptionItem[] => [
    { value: "Career opportunities", label: t('wizard_opt_excite_career') },
    { value: "Quality of life", label: t('wizard_opt_excite_life') },
    { value: "Nature and culture", label: t('wizard_opt_excite_nature') },
    { value: "Adventure", label: t('wizard_opt_excite_adventure') },
];

const getDisplayLabel = (value: string, options: OptionItem[]) => {
    if (!value) return null;
    const found = options.find(o => o.value === value);
    return found ? found.label : value;
};

// --- SUB-COMPONENTS ---

const Logo = () => (
  <svg width="100" height="37" viewBox="0 0 100 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-none cursor-pointer">
    <path d="M65.1545 15.4172H61.0295L56.6946 3.82056L53.9153 11.0139H50.0881L54.5823 0.00708008H58.8987L65.1545 15.4172Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M92.2647 36.9749C90.8453 36.9749 89.4426 36.7156 88.0565 36.197C86.6705 35.6784 85.4348 34.959 84.3494 34.0388L86.754 30.902C87.8228 31.7719 88.808 32.3993 89.7098 32.7841C90.6115 33.1522 91.5717 33.3362 92.5903 33.3362C93.2583 33.3362 93.8261 33.2693 94.2936 33.1354C94.7612 33.0016 95.1202 32.8092 95.3707 32.5582C95.6212 32.2906 95.7465 31.9811 95.7465 31.6297C95.7465 31.1446 95.5628 30.7682 95.1954 30.5005C94.828 30.2328 94.2018 30.0237 93.3167 29.8731L89.4593 29.1956C88.0398 28.9446 86.9461 28.4009 86.1779 27.5644C85.4098 26.7279 85.0257 25.6656 85.0257 24.3774C85.0257 23.2398 85.3096 22.2611 85.8773 21.4413C86.4618 20.6215 87.2884 19.9942 88.3571 19.5592C89.4426 19.1242 90.7284 18.9067 92.2146 18.9067C93.5171 18.9067 94.828 19.1326 96.1472 19.5843C97.4665 20.0193 98.6103 20.6299 99.5789 21.4162L97.2995 24.6032C95.496 23.2147 93.7008 22.5204 91.914 22.5204C91.3296 22.5204 90.8202 22.5873 90.3861 22.7211C89.9686 22.8382 89.643 23.0139 89.4092 23.2481C89.1921 23.4656 89.0835 23.7333 89.0835 24.0511C89.0835 24.4861 89.2422 24.8207 89.5595 25.0549C89.8934 25.2892 90.4278 25.4732 91.1626 25.607L94.7946 26.2093C96.4812 26.477 97.7587 27.0374 98.627 27.8906C99.5121 28.7439 99.9546 29.848 99.9546 31.2031C99.9546 32.3909 99.6457 33.4198 99.0278 34.2898C98.4099 35.143 97.5249 35.8038 96.3727 36.2723C95.2204 36.7407 93.8511 36.9749 92.2647 36.9749Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M66.3013 36.7239V19.1576H70.6096V26.8366L77.6984 19.1576H82.9085L74.7927 27.4137L83.3593 36.7239H77.6483L70.6096 28.6685V36.7239H66.3013Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M47.6814 36.7239V19.1576H56.6488C57.8511 19.1576 58.9198 19.4002C59.855 19.8853 60.7901 20.3538 61.5165 21.0146C62.0342 21.8678 62.8358 23.6663 62.8358 24.7537C62.8358 25.8579 62.5352 26.8449 61.934 27.7149C61.3329 28.5848 60.5396 29.2457 59.5544 29.6974L63.3868 36.7239H58.5775L55.2711 30.3247H51.9897V36.7239H47.6814ZM51.9897 26.8115H56.248C56.916 26.8115 57.4503 26.6274 57.8511 26.2594C58.2686 25.8913 58.4773 25.4145 58.4773 24.829C58.4773 24.2434 58.2686 23.7667 57.8511 23.3986C57.4503 23.0305 56.916 22.8465 56.248 22.8465H51.9897V26.8115Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M34.77 37C33.4508 37 32.2234 36.7741 31.0879 36.3224C29.9523 35.854 28.9587 35.2099 28.1071 34.3901C27.2554 33.5536 26.5875 32.5917 26.1032 31.5042C25.6356 30.4001 25.4019 29.2122 25.4019 27.9408C25.4019 26.6693 25.6356 25.4899 26.1032 24.4024C26.5875 23.2983 27.2554 22.3363 28.1071 21.5165C28.9587 20.68 29.9523 20.0359 31.0879 19.5842C32.2234 19.1158 33.4508 18.8816 34.77 18.8816C36.0892 18.8816 37.3166 19.1158 38.4521 19.5842C39.5877 20.0359 40.5813 20.68 41.4329 21.5165C42.2846 22.3363 42.9442 23.2983 43.4118 24.4024C43.896 25.4899 44.1382 26.6693 44.1382 27.9408C44.1382 29.2122 43.896 30.4001 43.4118 31.5042C42.9442 32.5917 42.2846 33.5536 41.4329 34.3901C40.5813 35.2099 39.5877 35.854 38.4521 36.3224C37.3166 36.7741 36.0892 37 34.77 37ZM34.77 33.035C35.4714 33.035 36.1226 32.9095 36.7238 32.6586C37.325 32.3909 37.8426 32.0312 38.2768 31.5795C38.7277 31.1278 39.0784 30.5924 39.3288 29.9734C39.5793 29.3377 39.7046 28.6602 39.7046 27.9408C39.7046 27.2047 39.5793 26.5271 39.3288 25.9081C39.0784 25.2891 38.7277 24.7537 38.2768 24.302C37.8426 23.8503 37.325 23.499 36.7238 23.2481C36.1226 22.9804 35.4714 22.8466 34.77 22.8466C34.0687 22.8466 33.4174 22.9804 32.8162 23.2481C32.2151 23.499 31.689 23.8503 31.2382 24.302C30.804 24.7537 30.4617 25.2891 30.2112 25.9081C29.9607 26.5271 29.8354 27.2047 29.8354 27.9408C29.8354 28.6602 29.9607 29.3377 30.2112 29.9734C30.4617 30.5924 30.804 31.1278 31.2382 31.5795C31.689 32.0312 32.2151 32.3909 32.8162 32.6586C33.4174 32.9095 34.0687 33.035 34.77 33.035Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M3.90757 36.7239L0 19.1576H4.43359L6.56272 29.9985L9.61864 19.1576H13.6515L16.7074 29.9985L18.8365 19.1576H23.1198L19.2122 36.7239H14.6534L11.5724 25.5316L8.46641 36.7239H3.90757Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M89.3989 12.0748H91.7742C92.3754 12.0748 92.9326 11.9647 93.4458 11.7443C93.9736 11.524 94.4355 11.2155 94.8314 10.8189C95.2273 10.4223 95.5352 9.96687 95.7551 9.45274C95.9751 8.92391 96.085 8.35837 96.085 8.75609C96.085 7.13913 95.9751 6.56624 95.7551 6.03741C95.5352 5.4939 95.2273 5.02383 94.8314 4.62722C94.4355 4.2306 93.9736 3.92212 93.4458 3.70177C92.9326 3.46674 92.3754 3.34922 91.7742 3.34922H89.3989V12.0748ZM85.616 15.424V0H91.8622C93.0059 0 94.0689 0.198309 95.0513 0.594928C96.0337 0.991546 96.8915 1.54241 97.6246 2.2475C98.3724 2.9526 98.9516 3.77522 99.3621 4.71535C99.7873 5.65549 99.9999 6.66907 99.9999 7.75609C99.9999 8.82843 99.7873 9.82732 99.3621 10.7528C98.9516 11.6782 98.3724 12.4935 97.6246 13.1986C96.8915 13.889 96.0337 14.4325 95.0513 14.8291C94.0689 15.2257 93.0059 15.424 91.8622 15.424H85.616Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M67.8491 15.424V0H71.4121L78.4062 8.94595V0H81.9692V15.424H78.6261L71.4121 6.12555V15.424H67.8491Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M42.0657 15.424V0H45.8486V12.0748H53.9643V15.424H42.0657Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M24.2988 15.424V0H27.8618L34.8559 8.94595V0H38.4189V15.424H35.0758L27.8618 6.12555V15.424H24.2988Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M16.8625 15.424V0H20.6455V15.424H16.8625Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M1.41553 15.424V0H13.6441V3.28312H5.19847V6.16962H10.8289V9.34257H5.19847V15.424H1.41553Z" fill="#181818" className="fill-current dark:text-white"/>
    <path d="M48.2991 9.45691C48.2991 8.62848 48.9706 7.95691 49.7991 7.95691H51.9647V11.0172H48.2991V9.45691Z" fill="#181818" className="fill-current dark:text-white"/>
  </svg>
);

const OptionGrid = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onSelect(opt.value)}
        className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left flex items-center ${
          current === opt.value 
            ? 'border-black dark:border-white ring-1 ring-black dark:ring-white text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 shadow-sm' 
            : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm bg-white dark:bg-gray-900'
        }`}
      >
        {current === opt.value && <Icons.CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-black dark:text-white" />}
        {opt.label}
      </button>
    ))}
  </div>
);

const MultiSelectGrid = ({ options, selected, onToggle }: { options: OptionItem[], selected: string[], onToggle: (v: string) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
    {options.map(opt => {
      const isSelected = selected.includes(opt.value);
      return (
        <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left flex items-center ${
            isSelected
                ? 'border-black dark:border-white ring-1 ring-black dark:ring-white text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm bg-white dark:bg-gray-900'
            }`}
        >
            <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${isSelected ? 'bg-black dark:bg-white border-black dark:border-white' : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800'}`}>
                {isSelected && <Icons.CheckCircle className="w-3.5 h-3.5 text-white dark:text-black" />}
            </div>
            {opt.label}
        </button>
      );
    })}
  </div>
);

const RatingScale = ({ current, onSelect, minLabel, maxLabel, t }: { current: string, onSelect: (v: string) => void, minLabel: string, maxLabel: string, t: any }) => {
  const levels = [
    { value: "1", icon: Icons.Snowflake, label: t('wizard_rating_winter'), color: "text-cyan-400", activeBg: "bg-cyan-500", borderColor: "border-cyan-100 hover:border-cyan-300" },
    { value: "2", icon: Icons.CloudSun, label: t('wizard_rating_thaw'), color: "text-sky-400", activeBg: "bg-sky-500", borderColor: "border-sky-100 hover:border-sky-300" },
    { value: "3", icon: Icons.Sprout, label: t('wizard_rating_growth'), color: "text-green-500", activeBg: "bg-green-600", borderColor: "border-green-100 hover:border-green-300" },
    { value: "4", icon: Icons.Flower2, label: t('wizard_rating_bloom'), color: "text-pink-400", activeBg: "bg-pink-500", borderColor: "border-pink-100 hover:border-pink-300" },
    { value: "5", icon: Icons.Sun, label: t('wizard_rating_summer'), color: "text-amber-400", activeBg: "bg-amber-500", borderColor: "border-amber-100 hover:border-amber-300" }
  ];

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase max-w-[100px] leading-tight">{minLabel}</span>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase max-w-[100px] leading-tight text-right">{maxLabel}</span>
      </div>
      <div className="flex justify-between items-center gap-2 sm:gap-3">
        {levels.map((lvl) => {
           const isActive = current === lvl.value;
           const Icon = lvl.icon;
           return (
             <button
               key={lvl.value}
               onClick={() => onSelect(lvl.value)}
               className={`
                  group relative flex flex-col items-center justify-center gap-2 transition-all duration-300
                  flex-1
               `}
             >
               <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border-2
                  ${isActive 
                      ? `${lvl.activeBg} border-transparent shadow-md scale-110 z-10 ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-800` 
                      : `bg-white dark:bg-gray-800 ${lvl.borderColor} ${lvl.color}`
                  }
               `}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${isActive ? 'text-white scale-110' : ''}`} />
               </div>
               <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                   {lvl.label}
               </span>
             </button>
           )
        })}
      </div>
    </div>
  );
};

const ProgressiveSelector = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {options.map((opt, idx) => {
          const isSelected = current === opt.value;
          const position = idx / (options.length - 1 || 1);
          
          let baseColorClass = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900';
          let selectedColorClass = 'ring-1 shadow-md text-black dark:text-white';
          let iconColor = 'text-gray-400 dark:text-gray-500';
          
          if (position <= 0.25) {
               if (isSelected) selectedColorClass += ' border-blue-300 dark:border-blue-500 ring-blue-300 dark:ring-blue-500 bg-blue-50 dark:bg-blue-900/20';
               iconColor = isSelected ? 'text-blue-500 dark:text-blue-400' : 'text-gray-300 dark:text-gray-600';
          } else if (position <= 0.75) {
               if (isSelected) selectedColorClass += ' border-purple-300 dark:border-purple-500 ring-purple-300 dark:ring-purple-500 bg-purple-50 dark:bg-purple-900/20';
               iconColor = isSelected ? 'text-purple-500 dark:text-purple-400' : 'text-gray-300 dark:text-gray-600';
          } else {
               if (isSelected) selectedColorClass += ' border-green-300 dark:border-green-500 ring-green-300 dark:ring-green-500 bg-green-50 dark:bg-green-900/20';
               iconColor = isSelected ? 'text-green-500 dark:text-green-400' : 'text-gray-300 dark:text-gray-600';
          }

          return (
              <button
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  className={`
                      relative p-4 rounded-xl border-2 text-left transition-all duration-200 group
                      ${isSelected ? selectedColorClass : baseColorClass}
                  `}
              >
                  <div className="flex items-center justify-between w-full">
                      <span className={`font-medium ${isSelected ? 'font-bold' : ''}`}>{opt.label}</span>
                      {isSelected && <Icons.CheckCircle className={`w-5 h-5 ${iconColor}`} />}
                  </div>
              </button>
          );
      })}
    </div>
  );
};

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
          value: "Partnered (Married/Cohabiting)",
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

interface RegionGridProps {
  originCountry: string;
  isEuropeSelected: boolean;
  onSelect: (id: string, value: string) => void;
  t: any;
}

const RegionGrid: React.FC<RegionGridProps> = ({ originCountry, isEuropeSelected, onSelect, t }) => {
    const regions = [
        { id: 'europe', value: 'Europe', label: t('wizard_region_europe'), icon: Icons.Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { id: 'americas', value: 'Americas', label: t('wizard_region_americas'), icon: Icons.Map, color: 'text-green-600 bg-green-50 border-green-200' },
        { id: 'asia', value: 'Asia', label: t('wizard_region_asia'), icon: Icons.Mountain, color: 'text-red-600 bg-red-50 border-red-200' },
        { id: 'africa', value: 'Africa', label: t('wizard_region_africa'), icon: Icons.Sun, color: 'text-orange-600 bg-orange-50 border-orange-200' },
        { id: 'oceania', value: 'Oceania', label: t('wizard_region_oceania'), icon: Icons.Waves, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
        { id: 'middle_east', value: 'Middle East', label: t('wizard_region_middle_east'), icon: Icons.Palmtree, color: 'text-purple-600 bg-purple-50 border-purple-200' }, 
    ];

    return (
           <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
               {regions.map(r => {
                   // Check against stable value (English), not translated label
                   const isSelected = originCountry.includes(r.value) || (r.id === 'europe' && isEuropeSelected);
                   return (
                      <button
                          key={r.id}
                          // Pass canonical value
                          onClick={() => onSelect(r.id, r.value)}
                          className={`
                              flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 gap-3
                              ${isSelected 
                                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-md ring-1 ring-black dark:ring-white' 
                                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-1'
                              }
                          `}
                      >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${r.color}`}>
                              <r.icon className="w-6 h-6" />
                          </div>
                          <span className={`font-bold text-sm ${isSelected ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{r.label}</span>
                      </button>
                   );
               })}
           </div>
    );
};

// --- MAIN COMPONENT ---

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete, onCancel, initialData }) => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const totalSteps = 17; // Increased steps for family details logic
  const [showCountryList, setShowCountryList] = useState(false);
  const countryWrapperRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Origin Logic
  const [originInputMode, setOriginInputMode] = useState<'search' | 'region'>('search');
  const [isEuropeSelected, setIsEuropeSelected] = useState(false);
  
  // Accordion State Management
  const [activeSection, setActiveSection] = useState<string>('origin');

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    originCountry: '',
    residencePermitType: '',
    maritalStatus: '',
    // Children logic temporary state
    hasChildren: null as boolean | null,
    childCount: '1',
    childAgeGroups: [] as string[],
    
    educationDegree: '',
    profession: '',
    languageFinnish: '',
    languageEnglish: '',
    aspirations: '',
    challenges: '',
    // New Fields
    finnishMotivation: '',
    cultureInterest: '',
    confidenceLife: '',
    confidenceCareer: '',
    infoLevel: '',
    primaryExcitement: ''
  });

  // Pre-fill data if editing
  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            name: (initialData.name === 'Friend' || initialData.name === 'Guest') ? '' : initialData.name,
            ageRange: initialData.ageRange === 'Unknown' ? '' : initialData.ageRange,
            originCountry: (initialData.originCountry === 'Unknown' || initialData.originCountry === 'Abroad') ? '' : initialData.originCountry,
            residencePermitType: (initialData.residencePermitType === 'Unknown' || initialData.residencePermitType === 'General') ? '' : initialData.residencePermitType,
            maritalStatus: (initialData.maritalStatus === 'Unknown' || initialData.maritalStatus === 'Single') ? '' : initialData.maritalStatus,
            educationDegree: (initialData.education?.degree === 'Unknown' || initialData.education?.degree === 'Not specified') ? '' : initialData.education?.degree,
            profession: (initialData.profession === 'Unknown' || initialData.profession === 'Job Seeker') ? '' : initialData.profession,
            languageFinnish: initialData.languages?.find(l => l.language === 'Finnish')?.level || '',
            languageEnglish: initialData.languages?.find(l => l.language === 'English')?.level || '',
            aspirations: initialData.aspirations?.join(', ') || '',
            challenges: initialData.challenges?.join(', ') || '',
            finnishMotivation: initialData.finnishMotivation || '',
            cultureInterest: initialData.cultureInterest || '',
            confidenceLife: initialData.confidenceLife || '',
            confidenceCareer: initialData.confidenceCareer || '',
            infoLevel: initialData.infoLevel || '',
            primaryExcitement: initialData.primaryExcitement || ''
        }));
        
        // Determine Origin Mode & Accordion state
        if (initialData.originCountry && initialData.originCountry.startsWith('Region:')) {
           setOriginInputMode('region');
           if (initialData.originCountry.includes('Europe')) {
               setIsEuropeSelected(true);
               setActiveSection('eu');
           }
        }
    }
  }, [initialData]);

  // Helper to display origin nicely
  const getOriginDisplay = () => {
      const val = formData.originCountry;
      if (!val) return t('wizard_step4_desc');
      
      if (val.startsWith('Region: ')) {
          const region = val.replace('Region: ', '');
          
          // Sub-cases for Europe
          if (region.includes('Europe')) {
              const base = t('wizard_region_europe');
              if (region.includes('EU/EEA')) return `${base} (EU/EEA)`;
              if (region.includes('Non-EU')) return `${base} (Non-EU)`;
              return base;
          }

          // Direct mapping
          const map: Record<string, string> = {
              'Americas': t('wizard_region_americas'),
              'Asia': t('wizard_region_asia'),
              'Africa': t('wizard_region_africa'),
              'Oceania': t('wizard_region_oceania'),
              'Middle East': t('wizard_region_middle_east')
          };
          
          return map[region] || val; // Fallback
      }
      return val;
  };

  // Calculate filtered countries
  const filteredCountries = formData.originCountry 
    ? COUNTRIES
        .filter(c => c.toLowerCase().includes(formData.originCountry.toLowerCase()))
        .sort((a, b) => {
            const query = formData.originCountry.toLowerCase();
            const aStarts = a.toLowerCase().startsWith(query);
            const bStarts = b.toLowerCase().startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.localeCompare(b);
        })
    : COUNTRIES;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryWrapperRef.current && !countryWrapperRef.current.contains(event.target as Node)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showCountryList) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredCountries.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filteredCountries.length) % filteredCountries.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowCountryList(false);
        break;
    }
  };

  const handleCountrySelect = (country: string) => {
    const isEU = isEUCountry(country);
    setFormData(prev => ({ 
        ...prev, 
        originCountry: country,
        residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
    }));
    setShowCountryList(false);
    // Auto-advance with delay
    setTimeout(() => {
        handleNext();
    }, 350);
  };

  const handleNext = () => {
    // Auto-generate name if empty on Step 1
    if (step === 1 && !formData.name.trim()) {
        const nickname = generateNickname(language);
        setFormData(prev => ({ ...prev, name: nickname }));
    }

    // --- NAVIGATION LOGIC ---

    // 1. From Marital Status (Step 4)
    if (step === 4) {
        // If Solo -> Skip child logic, Go to Permit (Step 7)
        if (formData.maritalStatus.includes('Solo')) {
            setStep(7);
            return;
        }
        // If Partnered/Secret -> Go to Child Question (Step 5)
        setStep(5);
        return;
    }

    // 2. From "Has Children?" (Step 5)
    if (step === 5) {
        // If No -> Skip child details, Go to Permit (Step 7)
        if (formData.hasChildren === false) {
             setStep(7);
             return;
        }
        // If Yes -> Go to Child Details (Step 6)
        setStep(6);
        return;
    }

    // 3. From "Child Details" (Step 6) -> Go to Permit (Step 7)
    if (step === 6) {
        setStep(7);
        return;
    }

    // 4. From Permit (Step 7) -> Logic for EU Skip
    if (step === 7) {
        if (isEUCountry(formData.originCountry) || formData.residencePermitType === 'EU Registration') {
            setStep(8);
            setActiveSection('level');
            return;
        }
        // Standard path to Education/Language
        setStep(8);
        setActiveSection('level');
        return;
    }

    // Standard increment
    if (step < totalSteps) {
        setStep(step + 1);
        if (step + 1 === 2) setActiveSection('origin');
        if (step + 1 === 9) setActiveSection('level'); // Finnish language section
    }
    else finishWizard();
  };

  const handleBack = () => {
    // 1. Intra-step Back Navigation
    if (step === 2 && activeSection === 'eu') {
        setActiveSection('origin');
        return;
    }
    if (step === 9 && activeSection === 'motivation') {
        setActiveSection('level');
        return;
    }

    // 2. Backward Logic from English (Step 8)
    if (step === 8) {
        setStep(7);
        return;
    }

    // 3. Backward from Permit (Step 7)
    if (step === 7) {
        // Did we come from Child Details (Step 6), Child Boolean (Step 5), or Marital (Step 4)?
        if (formData.maritalStatus.includes('Solo')) {
            // Came from Step 4
            setStep(4);
        } else {
             // Came from Step 5 or 6. 
             // If we have children = true, came from 6. If false, came from 5.
             if (formData.hasChildren === true) setStep(6);
             else setStep(5);
        }
        return;
    }

    // 4. Backward from Child Details (Step 6) -> Step 5
    if (step === 6) {
        setStep(5);
        return;
    }

    // 5. Backward from Child Boolean (Step 5) -> Step 4
    if (step === 5) {
        setStep(4);
        return;
    }

    // Standard Back
    if (step > 1) {
        setStep(step - 1);
        
        if (step - 1 === 2) {
             setActiveSection(formData.originCountry.includes('Europe') || isEUCountry(formData.originCountry) ? 'eu' : 'origin');
        }
        if (step - 1 === 9) {
            setActiveSection(formData.languageFinnish ? 'motivation' : 'level');
        }
    }
  };

  const handleChange = (field: string, value: string | boolean | string[]) => {
    if (field === 'originCountry') {
        const isEU = isEUCountry(value as string);
        setFormData(prev => ({ 
            ...prev, 
            [field]: value as string,
            residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
        }));
    } else {
        setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSelectionNext = (field: string, value: string) => {
    handleChange(field, value);
    setTimeout(() => {
        handleNext();
    }, 350);
  };

  const handleChildToggle = (group: string) => {
      setFormData(prev => {
          const current = prev.childAgeGroups;
          if (current.includes(group)) {
              return { ...prev, childAgeGroups: current.filter(g => g !== group) };
          } else {
              return { ...prev, childAgeGroups: [...current, group] };
          }
      });
  };

  const handleGenerateName = () => {
      const nickname = generateNickname(language);
      handleChange('name', nickname);
  };

  const handleRegionSelect = (regionKey: string, regionName: string) => {
      if (regionKey === 'europe') {
          setIsEuropeSelected(true); 
          setActiveSection('eu'); 
          setFormData(prev => ({ ...prev, originCountry: `Region: ${regionName}` }));
      } else {
          setIsEuropeSelected(false);
          setFormData(prev => ({ 
            ...prev, 
            originCountry: `Region: ${regionName}`,
            residencePermitType: prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType
          }));
          setTimeout(() => {
             handleNext();
          }, 350);
      }
  };

  const handleEuropeCitizenSelect = (isCitizen: boolean) => {
      setFormData(prev => ({ 
        ...prev, 
        originCountry: isCitizen ? 'Region: Europe (EU/EEA)' : 'Region: Europe (Non-EU)',
        residencePermitType: isCitizen ? 'EU Registration' : ''
      }));
      
      setTimeout(() => {
         handleNext();
      }, 350);
  };

  const handleFinnishLevelSelect = (value: string) => {
      handleChange('languageFinnish', value);
      setActiveSection('motivation');
  };

  const finishWizard = () => {
    // Construct sophisticated marital status string
    let finalMarital = formData.maritalStatus || 'Single';
    if (formData.hasChildren) {
        const count = formData.childCount || 'some';
        const ages = formData.childAgeGroups.join(', ');
        // E.g. "Partnered, with 2 children (0-6, 7-12)"
        finalMarital = `${finalMarital}, with ${count} children${ages ? ` (${ages})` : ''}`;
    }

    const profile: UserProfile = {
      id: initialData?.id || uuidv4(),
      name: formData.name || 'Friend',
      ageRange: formData.ageRange || 'Unknown',
      originCountry: formData.originCountry || 'Abroad',
      residencePermitType: formData.residencePermitType || 'General',
      maritalStatus: finalMarital,
      languages: [
        { language: 'Finnish', level: formData.languageFinnish || 'None' },
        { language: 'English', level: formData.languageEnglish || 'None' }
      ],
      education: {
        degree: formData.educationDegree || 'Not specified',
        field: 'General'
      },
      profession: formData.profession || 'Job Seeker',
      aspirations: formData.aspirations.split(',').map(s => s.trim()).filter(s => s),
      challenges: formData.challenges.split(',').map(s => s.trim()).filter(s => s),
      finnishMotivation: formData.finnishMotivation,
      cultureInterest: formData.cultureInterest,
      confidenceLife: formData.confidenceLife,
      confidenceCareer: formData.confidenceCareer,
      infoLevel: formData.infoLevel,
      primaryExcitement: formData.primaryExcitement
    };
    onComplete(profile);
  };

  const getPhaseTitle = () => {
      if (step <= 1) return t('wizard_phase_identity');
      if (step <= 6) return t('wizard_phase_demo');
      if (step === 7) return t('wizard_phase_status');
      if (step <= 11) return t('wizard_phase_skills');
      if (step <= 16) return t('wizard_phase_mindset');
      return t('wizard_phase_vision');
  };

  const renderStepContent = () => {
    // Safe icon access
    const BabyIcon = Icons.Baby || Icons.User;
    
    switch(step) {
      case 1: // Name
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
      case 2: // Origin
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step4_title')}</h2>
               <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{t('wizard_step4_desc')}</p>
            </div>

            <div className={`border rounded-2xl transition-all duration-500 ${activeSection === 'origin' ? 'border-black dark:border-white shadow-md bg-white dark:bg-gray-900 overflow-visible' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 overflow-hidden'}`}>
                 <div 
                    className="w-full flex items-center justify-between p-5 text-left cursor-default"
                 >
                    <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'origin' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                             <Icons.Map className="w-4 h-4" />
                         </div>
                         <span className="font-bold text-gray-900 dark:text-white text-lg">
                             {getOriginDisplay()}
                         </span>
                    </div>
                    {activeSection === 'origin' ? <Icons.ChevronDown className="w-5 h-5 text-gray-500" /> : <Icons.ChevronRight className="w-5 h-5 text-gray-500" />}
                 </div>

                 {activeSection === 'origin' && (
                     <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2">
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-4 mt-4">
                            <button 
                            onClick={() => setOriginInputMode('search')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                                originInputMode === 'search' ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                            >
                            {t('wizard_btn_search_country')}
                            </button>
                            <button 
                            onClick={() => setOriginInputMode('region')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                                originInputMode === 'region' ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                            >
                            {t('wizard_btn_select_region')}
                            </button>
                        </div>

                        {originInputMode === 'search' ? (
                            <div className="relative" ref={countryWrapperRef}>
                                <input 
                                    type="text" 
                                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none text-gray-900 dark:text-white"
                                    placeholder={t('wizard_step4_placeholder')}
                                    value={formData.originCountry.startsWith('Region:') ? '' : formData.originCountry}
                                    onChange={(e) => {
                                        handleChange('originCountry', e.target.value);
                                        setShowCountryList(true);
                                    }}
                                    onFocus={() => setShowCountryList(true)}
                                    onKeyDown={handleKeyDown}
                                />
                                {showCountryList && (
                                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-200">
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country, index) => (
                                            <button
                                            type="button"
                                            key={country}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleCountrySelect(country)}
                                            className={`w-full text-left px-4 py-3 text-sm transition border-b border-gray-50 dark:border-gray-700 last:border-0 block
                                                ${index === highlightedIndex ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                                            `}
                                            >
                                            {country}
                                            </button>
                                        ))
                                        ) : (
                                        <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 italic">{t('wizard_step4_no_match')}</div>
                                        )}
                                    </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <RegionGrid 
                              originCountry={formData.originCountry}
                              isEuropeSelected={isEuropeSelected}
                              onSelect={handleRegionSelect}
                              t={t}
                            />
                        )}
                     </div>
                 )}
            </div>

            {isEuropeSelected && (
                <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeSection === 'eu' ? 'border-blue-500 shadow-md bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
                    <div className="p-5 flex items-center justify-between min-h-[80px]">
                         <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'eu' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                <Icons.Flag className="w-4 h-4" />
                             </div>
                             <span className={`font-bold text-lg ${activeSection === 'eu' ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                 {t('wizard_eu_question')}
                             </span>
                         </div>
                         
                         {activeSection === 'eu' && (
                             <div className="flex bg-white dark:bg-gray-900 rounded-full p-1 shadow-sm border border-blue-200 dark:border-blue-800">
                                 <button
                                     onClick={() => handleEuropeCitizenSelect(true)}
                                     className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                         formData.residencePermitType === 'EU Registration' 
                                         ? 'bg-blue-600 text-white shadow-md' 
                                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                     }`}
                                 >
                                     {t('wizard_eu_yes')}
                                 </button>
                                 <button
                                     onClick={() => handleEuropeCitizenSelect(false)}
                                     className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                         formData.originCountry.includes('Non-EU')
                                         ? 'bg-gray-800 dark:bg-gray-700 text-white shadow-md' 
                                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                     }`}
                                 >
                                     {t('wizard_eu_no')}
                                 </button>
                             </div>
                         )}
                    </div>
                </div>
            )}

          </div>
        );
      case 3: // Age
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
                  onClick={() => handleSelectionNext('ageRange', opt)}
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
      case 4: // Marital
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step3_title')}</h2>
            </div>
            <MaritalSelector 
                current={formData.maritalStatus}
                onSelect={(v) => handleSelectionNext('maritalStatus', v)}
                t={t}
            />
          </div>
        );
      case 5: // Has Children (New Step)
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
      case 6: // Children Details (New Step)
         return (
             <div className="space-y-8 animate-in fade-in duration-500">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_family_details_title')}</h2>
                 </div>
                 
                 {/* Question 1: How Many */}
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

                 {/* Question 2: Age Ranges */}
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
      case 7: // Permit
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step5_title')}</h2>
            </div>
            <PermitSelector 
                current={formData.residencePermitType}
                onSelect={(v) => handleSelectionNext('residencePermitType', v)}
                t={t}
            />
          </div>
        );
      case 8: // English
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step9_title')}</h2>
             </div>
             <ProgressiveSelector 
                options={getEnglishLevelOptions(t)}
                current={formData.languageEnglish}
                onSelect={(v) => handleSelectionNext('languageEnglish', v)}
             />
          </div>
        );
      case 9: // Finnish
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step8_title')}</h2>
             </div>

             <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeSection === 'level' ? 'border-black dark:border-white shadow-md bg-white dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
                 <div 
                    className="w-full flex items-center justify-between p-5 text-left cursor-default"
                 >
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
                                onSelect={(v) => handleSelectionNext('finnishMotivation', v)}
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
      case 10: // Education
         return (
           <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step6_title')}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wizard_step6_desc')}</p>
             </div>
             <EducationSelector 
                current={formData.educationDegree}
                onSelect={(v) => handleSelectionNext('educationDegree', v)}
                t={t}
             />
           </div>
         );
      case 11: // Profession
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
      case 12: // Career Confidence
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step14_title')}</h2>
             </div>
             <RatingScale 
                current={formData.confidenceCareer}
                onSelect={(v) => handleSelectionNext('confidenceCareer', v)}
                minLabel={t('wizard_scale_1_career')}
                maxLabel={t('wizard_scale_5_career')}
                t={t}
             />
          </div>
        );
      case 13: // Life Confidence
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step13_title')}</h2>
             </div>
             <RatingScale 
                current={formData.confidenceLife}
                onSelect={(v) => handleSelectionNext('confidenceLife', v)}
                minLabel={t('wizard_scale_1_life')}
                maxLabel={t('wizard_scale_5_life')}
                t={t}
             />
          </div>
        );
      case 14: // Culture
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step12_title')}</h2>
             </div>
             <ProgressiveSelector 
                options={getCultureOptions(t)}
                current={formData.cultureInterest}
                onSelect={(v) => handleSelectionNext('cultureInterest', v)}
             />
          </div>
        );
      case 15: // Info Level
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step15_title')}</h2>
             </div>
             <ProgressiveSelector 
                options={getInfoLevelOptions(t)}
                current={formData.infoLevel}
                onSelect={(v) => handleSelectionNext('infoLevel', v)}
             />
          </div>
        );
      case 16: // Excitement
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step16_title')}</h2>
             </div>
             <OptionGrid 
                options={getExcitementOptions(t)}
                current={formData.primaryExcitement}
                onSelect={(v) => handleSelectionNext('primaryExcitement', v)}
             />
          </div>
        );
      case 17: // Goals/Vision
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step10_title')}</h2>
             </div>
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
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 font-sans">
       <div className="flex-shrink-0 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center bg-white dark:bg-gray-950 border-b border-gray-50 dark:border-gray-800">
          <div onClick={onCancel} className="cursor-pointer hover:opacity-70 transition scale-90 md:scale-100 origin-left">
             <Logo />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             {formData.name.trim().length > 0 && (
                 <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 font-bold text-xs md:text-sm border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-right-4 duration-500">
                    <span className="text-base md:text-lg">👋</span>
                    <span className="max-w-[100px] md:max-w-[150px] truncate">
                        {t('wizard_greeting_short', { name: formData.name.split(' ')[0] })}
                    </span>
                 </div>
             )}

             <button 
               onClick={onCancel} 
               className="hidden md:flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200 text-xs md:text-sm font-bold tracking-tight"
             >
               <Icons.MessageSquare className="w-4 h-4 text-gray-900 dark:text-white" /> 
               <span className="hidden lg:inline">{t('wizard_btn_ask')}</span>
             </button>

             <div className="relative z-50">
               <LanguageSelector 
                 className="min-w-[auto] md:min-w-[140px]"
                 direction="down"
               />
             </div>
          </div>
       </div>

       <div className="px-6 md:px-8 mb-4 md:mb-8 max-w-3xl mx-auto w-full mt-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
             <div className="flex-1">
                 <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 animate-in fade-in" key={`phase`}>
                    {getPhaseTitle()}
                 </p>
                 
                 <h1 
                    className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-300"
                    key={`title-${formData.name}`}
                 >
                    {formData.name.trim().length > 0 
                        ? t('wizard_title_custom', { name: formData.name.split(' ')[0] }) 
                        : t('wizard_title_init')
                    }
                 </h1>
             </div>

             <div className="flex items-center gap-4 w-full md:w-1/3">
                <span className="text-sm font-bold whitespace-nowrap w-8 text-right text-gray-900 dark:text-gray-100">{step}/{totalSteps}</span>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full w-full overflow-hidden">
                   <div 
                      className="h-full bg-black dark:bg-white transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                   ></div>
                </div>
             </div>
          </div>
       </div>

       <div className="flex-1 px-6 md:px-8 overflow-y-auto pb-32">
          <div className="max-w-3xl mx-auto" key={`${step}`}>
             {renderStepContent()}
          </div>
       </div>

       <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex gap-4 items-center bg-white dark:bg-gray-950 sticky bottom-0 border-t border-gray-50 dark:border-gray-800" key={`footer`}>
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-full border font-medium transition flex items-center gap-2 ${
              step === 1 
                ? 'border-transparent text-transparent cursor-default' 
                : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-900 dark:hover:border-white hover:bg-white dark:hover:bg-gray-900'
            }`}
          >
            <Icons.ArrowLeft className="w-4 h-4" /> {t('wizard_btn_prev')}
          </button>
          
          {step > 1 && step < totalSteps && (
            <button
               onClick={finishWizard}
               className="hidden sm:block px-4 py-3 text-sm text-gray-500 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-white ml-auto mr-4"
            >
               {t('wizard_btn_finish_early')}
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg flex items-center gap-2 ${step < totalSteps && step <= 1 ? 'ml-auto' : ''}`}
          >
            {step === totalSteps ? t('wizard_btn_submit') : t('wizard_btn_next')}
            {step !== totalSteps && <Icons.ArrowRight className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
