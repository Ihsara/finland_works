import { AppLanguage, LanguageCode } from "../types";
import { getResource, RESOURCES } from "./translations";

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', supported: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', supported: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', supported: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', supported: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', supported: true },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti keel', flag: '🇪🇪', supported: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', supported: true, rtl: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', supported: true },
  { code: 'so', name: 'Somali', nativeName: 'Af-Soomaali', flag: '🇸🇴', supported: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', supported: true, rtl: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🇹🇯', supported: true, rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', supported: true },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', supported: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', supported: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', supported: true },
  { code: 'pt-br', name: 'Portuguese (BR)', nativeName: 'Português (BR)', flag: '🇧🇷', supported: true },
  { code: 'pt-pt', name: 'Portuguese (PT)', nativeName: 'Português (PT)', flag: '🇵🇹', supported: true },
];

// Simplified Type Definition relying on string to avoid circular dependencies during refactor, 
// or we can import Keys from en.ts if we want strict typing.
export type TranslationKey = string; 

// Export TRANSLATIONS for usage in tests/context
export const TRANSLATIONS = Object.keys(RESOURCES).reduce((acc, lang) => {
  acc[lang] = RESOURCES[lang].ui;
  return acc;
}, {} as Record<string, Partial<Record<string, string>>>);

export const t = (key: TranslationKey, lang: LanguageCode, params?: Record<string, string>): string => {
  const resource = getResource(lang);
  let text = resource.ui[key as keyof typeof resource.ui];
  
  // Fallback to English if missing
  if (!text) {
    const en = getResource('en');
    text = en.ui[key as keyof typeof en.ui] || key;
  }

  if (params && text) {
    Object.entries(params).forEach(([k, v]) => {
      text = text!.replace(`{${k}}`, v);
    });
  }
  return text || key;
};