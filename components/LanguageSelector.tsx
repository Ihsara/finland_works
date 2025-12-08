
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { useLanguage } from '../contexts/LanguageContext';
import { AppLanguage } from '../types';

interface LanguageSelectorProps {
  className?: string;
  direction?: 'down' | 'up';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = "",
  direction = 'down'
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [align, setAlign] = useState<'left' | 'right'>('right');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fallback to first language if current is somehow not found
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const screenW = window.innerWidth;
        const dropdownW = 256; 
        let nextAlign: 'left' | 'right' = rect.left > screenW / 2 ? 'right' : 'left';
        if (nextAlign === 'right' && rect.right - dropdownW < 10) nextAlign = 'left';
        else if (nextAlign === 'left' && rect.left + dropdownW > screenW - 10) nextAlign = 'right';
        setAlign(nextAlign);
    }
  }, [isOpen]);

  const handleSelect = (l: AppLanguage) => {
    if (l.supported) {
      setLanguage(l.code);
      setIsOpen(false);
    }
  }

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
          ${className.includes('bg-') ? '' : 'bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20'}
          ${className.includes('border') ? '' : 'border border-gray-200/20 dark:border-white/10'}
          shadow-sm hover:shadow-md backdrop-blur-md
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
        `}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
         <span className="text-xl leading-none drop-shadow-sm" role="img" aria-hidden="true">
            {currentLangObj.flag}
         </span>
         <span className="hidden md:block truncate max-w-[100px] text-left text-sm font-bold tracking-wide">
            {currentLangObj.code.toUpperCase()}
         </span> 
         <Icons.ChevronDown 
            className={`w-3 h-3 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
         />
      </button>
      
      {isOpen && (
        <div 
          className={`
            absolute w-64 z-[100]
            ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} 
            ${align === 'right' ? 'right-0' : 'left-0'}
            bg-white/90 dark:bg-[#1a233b]/95 backdrop-blur-xl
            rounded-2xl shadow-2xl
            border border-gray-200/50 dark:border-white/10
            overflow-hidden animate-in fade-in zoom-in-95 duration-200
          `}
        >
            <div className="px-4 py-3 bg-gray-50/80 dark:bg-black/20 border-b border-gray-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Select Language
                </span>
            </div>
            
            <div className="max-h-[320px] overflow-y-auto py-1 custom-scrollbar">
              {SUPPORTED_LANGUAGES.map(lang => {
                const isSelected = language === lang.code;
                return (
                  <button 
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    disabled={!lang.supported}
                    className={`
                      w-full px-4 py-3 text-left flex items-center gap-3 transition-colors
                      ${isSelected 
                        ? 'bg-blue-50 dark:bg-blue-900/30' 
                        : 'hover:bg-gray-50 dark:hover:bg-white/5'
                      }
                      ${!lang.supported ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                    `}
                  >
                    <span className="text-2xl leading-none flex-shrink-0 w-8 text-center drop-shadow-sm">
                      {lang.flag}
                    </span>
                    
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-600 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'}`}>
                        {lang.nativeName}
                      </span>
                      <span className={`text-[10px] truncate ${isSelected ? 'text-blue-500/80 dark:text-blue-300/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {lang.name}
                      </span>
                    </div>

                    {isSelected && (
                       <Icons.CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
        </div>
      )}
    </div>
  );
};
