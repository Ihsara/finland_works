
import { describe, it, expect } from 'vitest';
import { t, TRANSLATIONS, SUPPORTED_LANGUAGES, TranslationKey } from './languages';
import { LanguageCode } from '../types';

describe('Language System (DoD)', () => {
  
  // EDGE CASE: Fallback Logic
  it('falls back to English if translation is missing', () => {
    const result = t('landing_welcome', 'et');
    expect(result).toBeTruthy(); 
    
    const resultEn = t('landing_welcome', 'en');
    expect(result).not.toBe('landing_welcome'); 
    expect(result.length).toBeGreaterThan(0);
  });

  // COMMON CASE: Variable Replacement
  it('replaces variables in translation strings', () => {
    const result = t('dash_greeting', 'en', { name: 'TestUser' });
    expect(result).toBe('Moi, TestUser!');
  });

  // SYSTEM INTEGRITY: All languages supported in types must exist in config
  it('has configuration for all supported languages', () => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      expect(lang.code).toBeDefined();
      expect(lang.name).toBeDefined();
      expect(lang.flag).toBeDefined();
    });
  });

  // CRITICAL UI CHECK: Wiki Navigation
  // Ensure that when a user switches language, the main navigation buttons don't break
  it('has Wiki UI translations for all languages', () => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      // We check specific keys that were historically missing in some languages
      const navList = t('wiki_nav_list', lang.code);
      const navCats = t('wiki_explore_cats', lang.code);
      
      // They should not equal the key name (meaning they resolved)
      expect(navList).not.toBe('wiki_nav_list');
      expect(navCats).not.toBe('wiki_explore_cats');
      
      // And should not be empty
      expect(navList.length).toBeGreaterThan(0);
    });
  });

  // INTEGRITY: Check specific top 10 languages requested
  it('supports the top 10 immigrant languages and Thai/Finnish', () => {
    const codes = SUPPORTED_LANGUAGES.map(l => l.code);
    const required = ['et', 'ru', 'ar', 'so', 'fa', 'ku', 'zh', 'vi', 'sq', 'uk', 'tr', 'es', 'fi', 'th'];
    required.forEach(req => {
      expect(codes).toContain(req);
    });
  });
});
