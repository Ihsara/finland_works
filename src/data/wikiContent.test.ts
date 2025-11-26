
import { describe, it, expect } from 'vitest';
import { getAllFlattenedArticles } from '../../data/wikiContent';

describe('Wiki Content Data', () => {
  it('contains all required networking articles for English', () => {
    const articles = getAllFlattenedArticles('en');
    
    // Check the ones we added
    const deepNet = articles.find(a => a.id === 'net_intro_deep');
    const school = articles.find(a => a.id === 'net_school');
    const hackathons = articles.find(a => a.id === 'net_hackathons');
    const slush = articles.find(a => a.id === 'net_slush');
    const coldMsg = articles.find(a => a.id === 'net_cold_msg');
    const parents = articles.find(a => a.id === 'net_parents');
    const hobbies = articles.find(a => a.id === 'net_hobbies');

    expect(deepNet).toBeDefined();
    expect(school).toBeDefined();
    expect(hackathons).toBeDefined();
    expect(slush).toBeDefined();
    expect(coldMsg).toBeDefined();
    expect(parents).toBeDefined();
    expect(hobbies).toBeDefined();

    // Check content integrity
    expect(school?.content).toContain('Vocational (Amis)');
    expect(hackathons?.content).toContain('Junction');
    expect(slush?.content).toContain('Anti-Conference');
    expect(deepNet?.content).toContain('Trust');
  });

  it('contains translated articles for Finnish', () => {
    const articles = getAllFlattenedArticles('fi');
    const school = articles.find(a => a.id === 'net_school');
    
    expect(school).toBeDefined();
    expect(school?.title).toBe('Verkostoituminen opiskellessa');
    expect(school?.content).toContain('Opiskelijan etu');
  });

  it('uses unified Networking tag', () => {
    const articles = getAllFlattenedArticles('en');
    const netArticles = articles.filter(a => a.categoryId === 'job_strategy');
    
    netArticles.forEach(article => {
        const tags = article.tags;
        // Should contain 'Networking' if relevant, never 'networking'
        if (tags.some(t => t.toLowerCase() === 'networking')) {
            expect(tags).toContain('Networking');
            expect(tags).not.toContain('networking');
        }
    });
  });
});
