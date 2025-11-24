import { describe, it, expect } from 'vitest';
import { wrapSentencesInHtml } from './textUtils';

describe('textUtils', () => {
  
  it('wraps simple sentences in spans', () => {
    const html = '<p>Hello world. This is a test.</p>';
    // We can't easily test Intl.Segmenter in JSDOM without polyfills sometimes,
    // but our fallback logic uses regex.
    const result = wrapSentencesInHtml(html, 'en');
    
    expect(result).toContain('class="interactive-sentence"');
    expect(result).toContain('data-sentence-id');
  });

  it('handles complex HTML structures', () => {
    const html = '<div><h3>Title</h3><p>Sentence one.</p></div>';
    const result = wrapSentencesInHtml(html, 'en');
    
    expect(result).toContain('<h3');
    expect(result).toContain('<p');
    expect(result).toContain('Sentence one.');
  });
});
