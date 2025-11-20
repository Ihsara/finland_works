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
         <span className="text-lg">{currentLangObj?.flag}</span>
         <span className="hidden md:inline">{currentLangObj?.name}</span> 
         <Icons.ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 ${direction === 'up' ? 'bottom-full mb-2' : 'mt-2'} w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
            <div className="p-2 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center">
                Select Language
            </div>
            <div className="max-h-80 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button 
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors
                    ${!lang.supported ? 'opacity-50 bg-gray-50' : ''}
                    ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                  `}
                >
                  <span className="text-xl flex-shrink-0">{lang.flag}</span>
                  <div className="flex flex-col leading-tight flex-1">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-600">{lang.name}</span>
                  </div>
                  {currentLanguage === lang.code && <Icons.CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>
        </div>
      )}
    </div>
  );
};
