import { Icons } from "../components/Icon";
import { LanguageCode } from "../types";
import { getResource } from "./translations";

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export interface WikiArticle {
  id: string;          
  title: string;       
  icon: keyof typeof Icons; 
  tags: string[];      
  content: string;     
}

export interface WikiSubsection {
  title: string;
  articles: WikiArticle[];
}

export interface WikiCategory {
  id: string;          
  title: string;       
  icon: keyof typeof Icons;
  theme: {             
    border: string;    
    text: string;      
    shadow: string;    
    hoverBg: string;   
  };
  subsections: WikiSubsection[];
}

export interface EnrichedWikiArticle extends WikiArticle {
  categoryTitle: string;
  displayId: string; // e.g., "1.1.1"
  categoryId: string;
}

// ---------------------------------------------------------------------------
// DATA ACCESSORS
// ---------------------------------------------------------------------------

const getLocalizedTitle = (key: string, lang: LanguageCode, defaultText: string): string => {
  const resource = getResource(lang);
  // Fallback chain: Specific Lang Title -> English Title -> Default Text
  return resource.wiki.titles[key] || getResource('en').wiki.titles[key] || defaultText;
};

const getLocalizedArticle = (id: string, lang: LanguageCode): { title: string, content: string } => {
  const resource = getResource(lang);
  const article = resource.wiki.articles[id];
  
  if (article) return article;
  
  // Fallback to English content but try to use a Translated Title from the titles map if the article itself isn't translated
  const enArticle = getResource('en').wiki.articles[id];
  if (enArticle) {
      const localTitle = getLocalizedTitle(id, lang, enArticle.title);
      return { title: localTitle, content: enArticle.content };
  }

  return { title: "Content Pending", content: "This guide is being updated." };
};

// ---------------------------------------------------------------------------
// CATEGORY DEFINITIONS
// ---------------------------------------------------------------------------

export const getWikiCategories = (lang: LanguageCode): WikiCategory[] => {
  return [
    {
      id: 'foundation',
      title: getLocalizedTitle('foundation', lang, 'The Essentials'),
      icon: 'Building2',
      theme: { 
        border: 'border-slate-600 dark:border-slate-500', 
        text: 'text-slate-700 dark:text-slate-300', 
        shadow: 'hover:shadow-slate-100 dark:hover:shadow-slate-900/50',
        hoverBg: 'group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'
      },
      subsections: [
        {
            title: getLocalizedTitle('identity', lang, 'Identity'),
            articles: [
                { id: 'guide_start', icon: 'Flag', tags: ['general', 'arrival'], ...getLocalizedArticle('guide_start', lang) },
                { id: 'bureaucracy_dvv', icon: 'Fingerprint', tags: ['general', 'arrival'], ...getLocalizedArticle('bureaucracy_dvv', lang) },
                { id: 'bureaucracy_migri', icon: 'CreditCard', tags: ['general', 'arrival'], ...getLocalizedArticle('bureaucracy_migri', lang) },
                { id: 'bureaucracy_tax', icon: 'Percent', tags: ['general', 'work'], ...getLocalizedArticle('bureaucracy_tax', lang) }
            ]
        },
        {
            title: getLocalizedTitle('security', lang, 'Social Security'),
            articles: [
                { id: 'social_unemployment', icon: 'Briefcase', tags: ['work', 'benefits'], ...getLocalizedArticle('social_unemployment', lang) },
                { id: 'social_housing', icon: 'Home', tags: ['housing', 'benefits'], ...getLocalizedArticle('social_housing', lang) },
                { id: 'social_pension', icon: 'Coins', tags: ['work', 'future'], ...getLocalizedArticle('social_pension', lang) }
            ]
        }
      ]
    },
    {
      id: 'job_strategy',
      title: getLocalizedTitle('job_strategy', lang, 'Job Strategy'),
      icon: 'Briefcase',
      theme: { 
        border: 'border-blue-600 dark:border-blue-500', 
        text: 'text-blue-600 dark:text-blue-400', 
        shadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/50',
        hoverBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50'
      },
      subsections: [
          {
              title: getLocalizedTitle('market', lang, 'Market'),
              articles: [
                  { id: 'job_market_overview', icon: 'LayoutGrid', tags: ['worker', 'general'], ...getLocalizedArticle('job_market_overview', lang) },
                  { id: 'job_te_office', icon: 'Building', tags: ['worker', 'unemployment'], ...getLocalizedArticle('job_te_office', lang) },
                  { id: 'job_portals', icon: 'Search', tags: ['worker', 'search'], ...getLocalizedArticle('job_portals', lang) },
                  { id: 'job_entrepreneurship', icon: 'Rocket', tags: ['worker', 'business'], ...getLocalizedArticle('job_entrepreneurship', lang) }
              ]
          },
          {
              title: getLocalizedTitle('tools', lang, 'Tools'),
              articles: [
                  { id: 'job_cover_letter', icon: 'PenTool', tags: ['worker', 'application'], ...getLocalizedArticle('job_cover_letter', lang) },
                  { id: 'job_linkedin', icon: 'Linkedin', tags: ['worker', 'networking'], ...getLocalizedArticle('job_linkedin', lang) },
                  { id: 'job_interview', icon: 'Mic', tags: ['worker', 'interview'], ...getLocalizedArticle('job_interview', lang) },
                  { id: 'job_recognition', icon: 'Award', tags: ['worker', 'degree'], ...getLocalizedArticle('job_recognition', lang) }
              ]
          },
          {
              title: getLocalizedTitle('rights', lang, 'Rights'),
              articles: [
                  { id: 'work_contract', icon: 'FileSignature', tags: ['worker', 'contract'], ...getLocalizedArticle('work_contract', lang) },
                  { id: 'work_hours', icon: 'Clock', tags: ['worker', 'contract'], ...getLocalizedArticle('work_hours', lang) },
                  { id: 'work_holidays', icon: 'Palmtree', tags: ['worker', 'contract'], ...getLocalizedArticle('work_holidays', lang) }
              ]
          }
      ]
    },
    {
      id: 'workplace',
      title: getLocalizedTitle('workplace', lang, 'Workplace'),
      icon: 'Coffee',
      theme: { 
        border: 'border-emerald-600 dark:border-emerald-500', 
        text: 'text-emerald-600 dark:text-emerald-400', 
        shadow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/50',
        hoverBg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/50'
      },
      subsections: [
          {
              title: getLocalizedTitle('norms', lang, 'Norms'),
              articles: [
                  { id: 'culture_essentials', icon: 'Shield', tags: ['culture', 'worker'], ...getLocalizedArticle('culture_essentials', lang) },
                  { id: 'culture_meetings', icon: 'Calendar', tags: ['culture', 'worker'], ...getLocalizedArticle('culture_meetings', lang) },
                  { id: 'culture_feedback', icon: 'MessageCircle', tags: ['culture', 'worker'], ...getLocalizedArticle('culture_feedback', lang) }
              ]
          },
          {
              title: getLocalizedTitle('social', lang, 'Social'),
              articles: [
                  { id: 'culture_names', icon: 'Tag', tags: ['culture', 'social'], ...getLocalizedArticle('culture_names', lang) }
              ]
          }
      ]
    },
    {
      id: 'industries',
      title: getLocalizedTitle('industries', lang, 'Industries'),
      icon: 'HardHat',
      theme: { 
        border: 'border-zinc-600 dark:border-zinc-500', 
        text: 'text-zinc-600 dark:text-zinc-400', 
        shadow: 'hover:shadow-zinc-100 dark:hover:shadow-zinc-900/50',
        hoverBg: 'group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/50'
      },
      subsections: [
          {
              title: getLocalizedTitle('specialist', lang, 'Specialist'),
              articles: [
                  { id: 'prof_engineering', icon: 'Settings', tags: ['worker', 'engineering'], ...getLocalizedArticle('prof_engineering', lang) },
                  { id: 'prof_business', icon: 'Briefcase', tags: ['worker', 'business'], ...getLocalizedArticle('prof_business', lang) }
              ]
          }
      ]
    },
    {
      id: 'life',
      title: getLocalizedTitle('life', lang, 'Life'),
      icon: 'Home',
      theme: { 
        border: 'border-purple-600 dark:border-purple-500', 
        text: 'text-purple-600 dark:text-purple-400', 
        shadow: 'hover:shadow-purple-100 dark:hover:shadow-purple-900/50',
        hoverBg: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/50'
      },
      subsections: [
          {
              title: getLocalizedTitle('housing', lang, 'Housing'),
              articles: [
                  { id: 'housing_contracts', icon: 'FileText', tags: ['housing', 'legal'], ...getLocalizedArticle('housing_contracts', lang) }
              ]
          },
          {
              title: getLocalizedTitle('family', lang, 'Family'),
              articles: [
                  { id: 'family_school', icon: 'Book', tags: ['family', 'education'], ...getLocalizedArticle('family_school', lang) }
              ]
          }
      ]
    }
  ];
};

export const getAllFlattenedArticles = (lang: LanguageCode): EnrichedWikiArticle[] => {
  const categories = getWikiCategories(lang);
  
  const all: EnrichedWikiArticle[] = [];
  
  categories.forEach((cat, catIdx) => {
      cat.subsections.forEach((sub, subIdx) => {
          sub.articles.forEach((art, artIdx) => {
              all.push({
                  ...art,
                  categoryTitle: cat.title,
                  categoryId: cat.id,
                  displayId: `${catIdx + 1}.${subIdx + 1}.${artIdx + 1}`
              });
          });
      });
  });
  
  return all;
};
