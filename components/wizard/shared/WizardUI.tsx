
import React from 'react';
import { Icons } from '../../Icon';

export interface OptionItem {
  label: string;
  value: string;
}

export const Logo = () => (
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

export const OptionGrid = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => (
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

export const MultiSelectGrid = ({ options, selected, onToggle }: { options: OptionItem[], selected: string[], onToggle: (v: string) => void }) => (
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

export const RatingScale = ({ current, onSelect, minLabel, maxLabel, t }: { current: string, onSelect: (v: string) => void, minLabel: string, maxLabel: string, t: any }) => {
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

export const ProgressiveSelector = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => {
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
