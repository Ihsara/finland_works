
import { describe, it, expect } from 'vitest';
import { getAllFlattenedArticles } from '../../data/wikiContent';

describe('Wiki Content Data', () => {
  it('contains all required networking articles for English', () => {
    const articles = getAllFlattenedArticles('en');
    
    const deepNet = articles.find(a => a.id === 'net_intro_deep');
    const introvert = articles.find(a => a.id === 'net_introvert'); // Note: 'net_introvert' wasn't explicitly in my wikiContent list but let's check standard ones. 
    // Correction: 'net_introvert' is not an article ID in the new map, it was an option value in networkingContent.
    // The article mapped to CONFIRM_NET_INTROVERT is 'culture_smalltalk'.
    
    // Let's check the ones we explicitly added to wikiContent.ts
    const school = articles.find(a => a.id === 'net_school');
    const hackathons = articles.find(a => a.id === 'net_hackathons');
    const coldMsg = articles.find(a => a.id === 'net_cold_msg');
    const linkedin = articles.find(a => a.id === 'net_linkedin');

    expect(school).toBeDefined();
    expect(hackathons).toBeDefined();
    expect(coldMsg).toBeDefined();
    expect(linkedin).toBeDefined();

    // Check content exists
    expect(school?.content).toContain('Student Advantage');
    expect(hackathons?.content).toContain('Junction');
  });

  it('contains translated articles for Finnish', () => {
    const articles = getAllFlattenedArticles('fi');
    const school = articles.find(a => a.id === 'net_school');
    
    expect(school).toBeDefined();
    expect(school?.title).toBe('Verkostoituminen opiskellessa');
    expect(school?.content).toContain('Opiskelijan etu');
  });
});
