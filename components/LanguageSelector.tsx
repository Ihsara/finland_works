
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

  // Dynamic Alignment Logic: Detect screen edge to prevent overflow
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const screenW = window.innerWidth;
        const dropdownW = 256; // w-64 = 256px

        // Heuristic: Default to right alignment (expanding left) if on the right half of screen
        let nextAlign: 'left' | 'right' = rect.left > screenW / 2 ? 'right' : 'left';

        // Check boundaries to force flip if needed
        if (nextAlign === 'right') {
            // If aligning right (right edge anchored), check if left side goes off screen
            // Left edge of dropdown would be at (rect.right - dropdownW)
            if (rect.right - dropdownW < 10) {
                // Too far left? Switch to left align (anchor left edge)
                nextAlign = 'left';
            }
        } else {
            // Aligning left (left edge anchored), check if right side goes off screen
            // Right edge of dropdown would be at (rect.left + dropdownW)
            if (rect.left + dropdownW > screenW - 10) {
                nextAlign = 'right';
            }
        }
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
          flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          hover:border-gray-300 dark:hover:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-750
          shadow-sm text-sm font-medium text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500/20
        `}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
         <span className="text-xl leading-none" role="img" aria-hidden="true">
            {currentLangObj.flag}
         </span>
         <span className="hidden md:block truncate max-w-[100px] text-left">
            {currentLangObj.name}
         </span> 
         <Icons.ChevronDown 
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
         />
      </button>
      
      {isOpen && (
        <div 
          className={`
            absolute w-64 z-[100]
            ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} 
            ${align === 'right' ? 'right-0' : 'left-0'}
            bg-white dark:bg-gray-800 
            rounded-xl shadow-xl 
            border border-gray-100 dark:border-gray-700 
            overflow-hidden animate-in fade-in zoom-in-95 duration-200
            ring-1 ring-black/5 dark:ring-white/5
          `}
        >
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Select Language
                </span>
            </div>
            
            <div className="max-h-[320px] overflow-y-auto py-1">
              {SUPPORTED_LANGUAGES.map(lang => {
                const isSelected = language === lang.code;
                return (
                  <button 
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    disabled={!lang.supported}
                    className={`
                      w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors
                      ${isSelected 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                      ${!lang.supported ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                    `}
                  >
                    {/* Flag */}
                    <span className="text-2xl leading-none flex-shrink-0 w-8 text-center">
                      {lang.flag}
                    </span>
                    
                    {/* Text */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'}`}>
                        {lang.nativeName}
                      </span>
                      <span className={`text-xs truncate ${isSelected ? 'text-blue-600/80 dark:text-blue-400/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {lang.name}
                      </span>
                    </div>

                    {/* Checkmark */}
                    {isSelected && (
                       <Icons.CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
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
