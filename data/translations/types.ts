
import { TranslationKey } from "../languages";

// Structure for a single language's data
export interface TranslationResource {
  // UI Strings (Buttons, Headers, Labels)
  ui: Partial<Record<TranslationKey, string>>;
  
  // Wiki Content (Guides, Articles)
  wiki: {
    // Sidebar/Menu Titles (Short)
    titles: Record<string, string>;
    // Full Article Content
    articles: Record<string, {
      title: string;
      summary: string; // Short form for AI Context & Intro
      content: string;  // Detailed content
    }>;
  };
}
