import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icon';
import { LanguageCode, AppLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onSelect: (code: LanguageCode, supported: boolean) => void;
  className?: string;
  direction?: 'down' | 'up';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  currentLanguage, 
  onSelect,
  className = "",
  direction = 'down'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (l: AppLanguage) => {
    onSelect(l.code, l.supported);
    setIsOpen(false);
  }

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm z-50"
      >
         <span className="text-lg leading-none">{currentLangObj?.flag}</span>
         <span className="hidden md:inline">{currentLangObj?.name}</span> 
         <Icons.ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 ${direction === 'up' ? 'bottom-full mb-2' : 'mt-2'} w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5`}>
            <div className="p-2 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">
                Select Language
            </div>
            <div className="max-h-80 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map(lang => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button 
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className={`w-full px-4 py-3 text-left border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group
                      ${!lang.supported ? 'opacity-50 bg-gray-50 cursor-not-allowed' : ''}
                      ${isSelected ? 'bg-blue-50/50' : ''}
                    `}
                  >
                    {/* Grid Layout for Perfect Alignment */}
                    <div className="grid grid-cols-[24px_1fr_20px] gap-3 items-center">
                      {/* Column 1: Flag */}
                      <span className="text-xl leading-none flex justify-center">{lang.flag}</span>
                      
                      {/* Column 2: Text Labels */}
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className={`font-medium truncate ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                          {lang.nativeName}
                        </span>
                        <span className={`text-[11px] truncate ${isSelected ? 'text-blue-600/80' : 'text-gray-500'}`}>
                          {lang.name}
                        </span>
                      </div>

                      {/* Column 3: Checkmark */}
                      <div className="flex justify-end">
                         {isSelected && <Icons.CheckCircle className="w-5 h-5 text-blue-600" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
        </div>
      )}
    </div>
  );
};