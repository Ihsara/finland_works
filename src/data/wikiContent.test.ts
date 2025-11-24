import { describe, it, expect } from 'vitest';
import { getWikiCategories, getAllFlattenedArticles } from './wikiContent';
import { SUPPORTED_LANGUAGES } from './languages';
import { LanguageCode } from '../types';

describe('Wiki Content System (DoD)', () => {
  
  // CRITICAL: This ensures the app never crashes when a user switches language
  it('returns valid categories and articles for EVERY supported language', () => {
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const categories = getWikiCategories(lang.code);
      
      expect(categories).toBeDefined();
      expect(categories.length).toBeGreaterThan(0);

      categories.forEach(cat => {
        expect(cat.id).toBeDefined();
        expect(cat.title).toBeTruthy();
        // Fallback check: If translation missing, title should not be empty
        expect(cat.title.length).toBeGreaterThan(0);
        
        expect(cat.articles).toBeDefined();
        cat.articles.forEach(article => {
          expect(article.id).toBeDefined();
          expect(article.title).toBeTruthy();
          expect(article.content).toBeTruthy();
        });
      });
    });
  });

  // EDGE CASE: Content Fallback
  it('ensures content is not empty even if language is obscure', () => {
    // Somali might not have full translations yet, so we check that it falls back to *something* (English)
    const somaliArticles = getAllFlattenedArticles('so');
    const englishArticles = getAllFlattenedArticles('en');
    
    expect(somaliArticles.length).toBe(englishArticles.length);
    
    const article = somaliArticles[0];
    expect(article.content.length).toBeGreaterThan(10);
  });

  // NEW FEATURE: Profession Guides
  it('includes the new Profession Guides category', () => {
    const enCats = getWikiCategories('en');
    const profCat = enCats.find(c => c.id === 'professions');
    
    expect(profCat).toBeDefined();
    expect(profCat?.articles.length).toBeGreaterThanOrEqual(6); // We added 6 guides
    
    // Check specific new guide existence
    const techGuide = profCat?.articles.find(a => a.id === 'prof_tech');
    expect(techGuide).toBeDefined();
  });
});
