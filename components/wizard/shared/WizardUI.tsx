
import React from 'react';
import { Icons } from '../../Icon';
import { Logo as SharedLogo } from '../../Logo';

export interface OptionItem {
  label: string;
  value: string;
}

export const Logo = () => (
  <SharedLogo className="h-8 md:h-10 w-auto" />
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
      {/* Changed items-center to items-start to prevent icon misalignment when labels wrap */}
      <div className="flex justify-between items-start gap-2 sm:gap-3">
        {levels.map((lvl) => {
           const isActive = current === lvl.value;
           const Icon = lvl.icon;
           return (
             <button
               key={lvl.value}
               onClick={() => onSelect(lvl.value)}
               className={`
                  group relative flex flex-col items-center gap-2 transition-all duration-300
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
               <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide text-center leading-tight ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
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
