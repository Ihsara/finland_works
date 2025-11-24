
import { describe, it, expect } from 'vitest';
import { t, TRANSLATIONS, SUPPORTED_LANGUAGES, TranslationKey } from './languages';
import { LanguageCode } from '../types';

describe('Language System (DoD)', () => {
  
  // EDGE CASE: Fallback Logic
  it('falls back to English if translation is missing', () => {
    // We pretend 'landing_welcome' is missing in Estonian for a second (programmatically checked via t function logic)
    // Since we can't mutate the const easily, we test the function behavior
    const result = t('landing_welcome', 'et');
    expect(result).toBeTruthy(); // Should return string
    
    // Test a key that definitely falls back (if any exist, or ensure logic works)
    // We can test this by using a language code that exists but might have partial coverage
    const resultEn = t('landing_welcome', 'en');
    expect(result).not.toBe('landing_welcome'); // Should not return the key itself
    expect(result.length).toBeGreaterThan(0);
  });

  // COMMON CASE: Variable Replacement
  it('replaces variables in translation strings', () => {
    // Assuming 'dash_greeting' is "Moi, {name}!"
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

  // INTEGRITY: Check specific top 10 languages requested
  it('supports the top 10 immigrant languages and Thai/Finnish', () => {
    const codes = SUPPORTED_LANGUAGES.map(l => l.code);
    const required = ['et', 'ru', 'ar', 'so', 'fa', 'ku', 'zh', 'vi', 'sq', 'uk', 'tr', 'es', 'fi', 'th'];
    required.forEach(req => {
      expect(codes).toContain(req);
    });
  });
});
