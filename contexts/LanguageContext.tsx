
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode } from '../types';
import { t as translate, SUPPORTED_LANGUAGES, TranslationKey, TRANSLATIONS } from '../data/languages';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
  headingFont: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const stored = localStorage.getItem('fw_language') as LanguageCode;
    if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
      setLanguageState(stored);
    } else {
        // Browser detection fallback
        const browserLangs = navigator.languages || [navigator.language];
        const findMatch = (input: string): LanguageCode | undefined => {
            const lower = input.toLowerCase();
            const exact = SUPPORTED_LANGUAGES.find(l => l.code === lower);
            if (exact) return exact.code;
            const base = lower.split('-')[0];
            const baseMatch = SUPPORTED_LANGUAGES.find(l => l.code === base);
            if (baseMatch) return baseMatch.code;
            return undefined;
        };
        for (const lang of browserLangs) {
            const match = findMatch(lang);
            if (match) {
                setLanguageState(match);
                break;
            }
        }
    }
  }, []);

  // Effect to update HTML document attributes when language changes
  useEffect(() => {
      const rtlLangs = ['ar', 'fa', 'ku'];
      if (rtlLangs.includes(language)) {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = language;
      } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = language;
      }
  }, [language]);

  const setLanguage = (code: LanguageCode) => {
    const isSupported = SUPPORTED_LANGUAGES.some(l => l.code === code && l.supported);
    if (isSupported) {
        setLanguageState(code);
        localStorage.setItem('fw_language', code);
    }
  };

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    const text = translate(key, language, params);
    // Developer Aid: Log missing translations to console if in a non-English mode
    // and the text matches the English fallback exactly (implying it wasn't overridden)
    // This helps verifying dynamic updates.
    if (language !== 'en' && process.env.NODE_ENV === 'development') {
        // We check if the key exists in the target language object explicitly
        const hasTranslation = TRANSLATIONS[language]?.[key];
        if (!hasTranslation) {
            console.warn(`[Missing Translation] Lang: ${language}, Key: ${key}`);
        }
    }
    return text;
  };

  // Determine appropriate font class based on language script
  // Latin/Cyrillic scripts use Serif (Playfair Display) for headings.
  // Scripts like Arabic, Thai, Chinese use Sans (Inter) as fallback or their system default
  // to avoid rendering issues or aesthetic clashes.
  const headingFont = ['ar', 'fa', 'ku', 'th', 'zh'].includes(language) ? 'font-sans' : 'font-serif';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, headingFont }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
