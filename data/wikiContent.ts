
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
  summary?: string; // Short summary for UI/AI
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
  return resource.wiki.titles[key] || getResource('en').wiki.titles[key] || defaultText;
};

const getLocalizedArticle = (id: string, lang: LanguageCode): { title: string, summary: string, content: string } => {
  const resource = getResource(lang);
  const article = resource.wiki.articles[id];
  
  if (article) {
      return {
          title: article.title,
          summary: article.summary || article.content.split('\n\n')[0].replace(/[#*]/g, '').trim(), 
          content: article.content
      };
  }
  
  const enArticle = getResource('en').wiki.articles[id];
  if (enArticle) {
      const localTitle = getLocalizedTitle(id, lang, enArticle.title);
      return { 
          title: localTitle, 
          summary: enArticle.summary || enArticle.content.split('\n\n')[0],
          content: enArticle.content 
      };
  }

  return { title: "Content Pending", summary: "No summary available.", content: "This guide is being updated." };
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
                { id: 'guide_start', icon: 'Flag', tags: ['general', 'arrival', 'mandatory'], ...getLocalizedArticle('guide_start', lang) },
                { id: 'bureaucracy_dvv', icon: 'Fingerprint', tags: ['general', 'arrival', 'mandatory'], ...getLocalizedArticle('bureaucracy_dvv', lang) },
                { id: 'bureaucracy_migri', icon: 'Globe', tags: ['general', 'arrival'], ...getLocalizedArticle('bureaucracy_migri', lang) },
                { id: 'bureaucracy_tax', icon: 'Percent', tags: ['general', 'work'], ...getLocalizedArticle('bureaucracy_tax', lang) },
                { id: 'bureaucracy_bank', icon: 'CreditCard', tags: ['general', 'arrival'], ...getLocalizedArticle('bureaucracy_bank', lang) }
            ]
        },
        {
            title: getLocalizedTitle('security', lang, 'Social Security'),
            articles: [
                { id: 'social_kela_card', icon: 'Heart', tags: ['health', 'benefits', 'Work Rights'], ...getLocalizedArticle('social_kela_card', lang) },
                { id: 'social_health', icon: 'Stethoscope', tags: ['health', 'general', 'Work-life Balance'], ...getLocalizedArticle('social_health', lang) },
                { id: 'social_unemployment', icon: 'Umbrella', tags: ['work', 'benefits', 'Work Rights'], ...getLocalizedArticle('social_unemployment', lang) },
                { id: 'social_housing', icon: 'Home', tags: ['housing', 'benefits', 'Work-life Balance'], ...getLocalizedArticle('social_housing', lang) },
                { id: 'social_pension', icon: 'Coins', tags: ['work', 'future', 'Work Rights'], ...getLocalizedArticle('social_pension', lang) }
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
                  { id: 'job_market_overview', icon: 'LayoutGrid', tags: ['worker', 'general', 'Job searching'], ...getLocalizedArticle('job_market_overview', lang) },
                  { id: 'job_te_office', icon: 'Building', tags: ['worker', 'unemployment', 'Job searching', 'Learning Finnish'], ...getLocalizedArticle('job_te_office', lang) },
                  { id: 'job_portals', icon: 'Search', tags: ['worker', 'search', 'Job searching', 'Recruitment'], ...getLocalizedArticle('job_portals', lang) },
                  { id: 'job_entrepreneurship', icon: 'Rocket', tags: ['worker', 'business', 'Entrepreneurship'], ...getLocalizedArticle('job_entrepreneurship', lang) }
              ]
          },
          {
              title: getLocalizedTitle('networking', lang, 'Networking'),
              articles: [
                  { id: 'net_intro_deep', icon: 'Sprout', tags: ['worker', 'networking', 'culture', 'Networking', 'Work Culture'], ...getLocalizedArticle('net_intro_deep', lang) },
                  { id: 'net_cold_msg', icon: 'MessageCircle', tags: ['worker', 'networking', 'communication', 'Networking', 'Job searching'], ...getLocalizedArticle('net_cold_msg', lang) },
                  { id: 'net_linkedin', icon: 'Linkedin', tags: ['worker', 'networking', 'digital', 'Networking', 'Recruitment', 'Job searching'], ...getLocalizedArticle('net_linkedin', lang) },
                  { id: 'net_design', icon: 'PenTool', tags: ['worker', 'networking', 'specialist', 'Networking', 'Recruitment'], ...getLocalizedArticle('net_design', lang) },
                  { id: 'net_hobbies', icon: 'Bike', tags: ['worker', 'networking', 'social', 'Networking', 'Learning Finnish'], ...getLocalizedArticle('net_hobbies', lang) },
                  { id: 'net_places', icon: 'Map', tags: ['worker', 'networking', 'places', 'Networking', 'Work Culture'], ...getLocalizedArticle('net_places', lang) },
                  { id: 'net_parents', icon: 'Baby', tags: ['worker', 'networking', 'family', 'Networking'], ...getLocalizedArticle('net_parents', lang) },
                  { id: 'net_introvert', icon: 'Coffee', tags: ['worker', 'networking', 'culture', 'Networking'], ...getLocalizedArticle('net_introvert', lang) },
                  { id: 'net_prof_style', icon: 'User', tags: ['worker', 'networking', 'culture', 'Networking', 'Work Culture'], ...getLocalizedArticle('net_prof_style', lang) },
                  { id: 'net_plan', icon: 'List', tags: ['worker', 'networking', 'strategy', 'Networking'], ...getLocalizedArticle('net_plan', lang) },
                  { id: 'net_hidden', icon: 'Ghost', tags: ['worker', 'networking', 'strategy', 'Job searching', 'Networking'], ...getLocalizedArticle('net_hidden', lang) },
                  { id: 'net_volunteering', icon: 'Heart', tags: ['worker', 'networking', 'social', 'Volunteering Internships', 'Networking', 'Learning Finnish'], ...getLocalizedArticle('net_volunteering', lang) }
              ]
          },
          {
              title: getLocalizedTitle('tools', lang, 'Tools'),
              articles: [
                  { id: 'job_cv_tips', icon: 'FileText', tags: ['worker', 'application', 'Recruitment'], ...getLocalizedArticle('job_cv_tips', lang) },
                  { id: 'job_cover_letter', icon: 'PenTool', tags: ['worker', 'application', 'Recruitment'], ...getLocalizedArticle('job_cover_letter', lang) },
                  { id: 'job_interview', icon: 'Mic', tags: ['worker', 'interview', 'Recruitment'], ...getLocalizedArticle('job_interview', lang) },
                  { id: 'job_recognition', icon: 'Award', tags: ['worker', 'degree', 'Recruitment'], ...getLocalizedArticle('job_recognition', lang) }
              ]
          },
          {
              title: getLocalizedTitle('rights', lang, 'Rights'),
              articles: [
                  { id: 'work_contract', icon: 'FileSignature', tags: ['worker', 'contract', 'Work Rights'], ...getLocalizedArticle('work_contract', lang) },
                  { id: 'work_hours', icon: 'Clock', tags: ['worker', 'contract', 'Work Rights', 'Work-life Balance'], ...getLocalizedArticle('work_hours', lang) },
                  { id: 'work_holidays', icon: 'Palmtree', tags: ['worker', 'contract', 'Work Rights', 'Work-life Balance'], ...getLocalizedArticle('work_holidays', lang) },
                  { id: 'work_unions', icon: 'Shield', tags: ['worker', 'union', 'Work Rights'], ...getLocalizedArticle('work_unions', lang) },
                  { id: 'work_probation', icon: 'HelpCircle', tags: ['worker', 'contract', 'Work Rights'], ...getLocalizedArticle('work_probation', lang) }
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
                  { id: 'culture_essentials', icon: 'Scale', tags: ['culture', 'worker', 'Work Culture'], ...getLocalizedArticle('culture_essentials', lang) },
                  { id: 'culture_punctuality', icon: 'Watch', tags: ['culture', 'worker', 'Work Culture'], ...getLocalizedArticle('culture_punctuality', lang) },
                  { id: 'culture_meetings', icon: 'Calendar', tags: ['culture', 'worker', 'Work Culture'], ...getLocalizedArticle('culture_meetings', lang) },
                  { id: 'culture_feedback', icon: 'MessageCircle', tags: ['culture', 'worker', 'Work Culture'], ...getLocalizedArticle('culture_feedback', lang) },
                  { id: 'culture_coffee', icon: 'Coffee', tags: ['culture', 'worker', 'Work Culture'], ...getLocalizedArticle('culture_coffee', lang) }
              ]
          },
          {
              title: getLocalizedTitle('social', lang, 'Social'),
              articles: [
                  { id: 'culture_names', icon: 'Tag', tags: ['culture', 'social', 'Work Culture'], ...getLocalizedArticle('culture_names', lang) },
                  { id: 'culture_smalltalk', icon: 'Wind', tags: ['culture', 'social', 'Work Culture', 'Networking'], ...getLocalizedArticle('culture_smalltalk', lang) },
                  { id: 'culture_afterwork', icon: 'Beer', tags: ['culture', 'social', 'Work Culture'], ...getLocalizedArticle('culture_afterwork', lang) },
                  { id: 'culture_sauna', icon: 'ThermometerSun', tags: ['culture', 'social', 'Work Culture', 'Work-life Balance'], ...getLocalizedArticle('culture_sauna', lang) },
                  { id: 'culture_party', icon: 'Gift', tags: ['culture', 'social', 'Work Culture'], ...getLocalizedArticle('culture_party', lang) }
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
                  { id: 'prof_it', icon: 'Laptop', tags: ['worker', 'engineering', 'Recruitment'], ...getLocalizedArticle('prof_it', lang) },
                  { id: 'prof_engineering', icon: 'Settings', tags: ['worker', 'engineering', 'Recruitment'], ...getLocalizedArticle('prof_engineering', lang) },
                  { id: 'prof_business', icon: 'Briefcase', tags: ['worker', 'business', 'Learning Finnish'], ...getLocalizedArticle('prof_business', lang) },
                  { id: 'prof_health', icon: 'Stethoscope', tags: ['worker', 'health', 'Learning Finnish'], ...getLocalizedArticle('prof_health', lang) },
                  { id: 'prof_service', icon: 'Utensils', tags: ['worker', 'service', 'Learning Finnish'], ...getLocalizedArticle('prof_service', lang) }
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
                  { id: 'housing_finding', icon: 'Search', tags: ['housing', 'general'], ...getLocalizedArticle('housing_finding', lang) },
                  { id: 'housing_contracts', icon: 'FileText', tags: ['housing', 'legal'], ...getLocalizedArticle('housing_contracts', lang) },
                  { id: 'housing_utilities', icon: 'Zap', tags: ['housing', 'general'], ...getLocalizedArticle('housing_utilities', lang) },
                  { id: 'housing_recycling', icon: 'Recycle', tags: ['housing', 'general', 'Work Culture'], ...getLocalizedArticle('housing_recycling', lang) },
                  { id: 'housing_sauna', icon: 'Droplets', tags: ['housing', 'general', 'Work-life Balance'], ...getLocalizedArticle('housing_sauna', lang) }
              ]
          },
          {
              title: getLocalizedTitle('family', lang, 'Family'),
              articles: [
                  { id: 'family_daycare', icon: 'Baby', tags: ['family', 'education', 'Work-life Balance'], ...getLocalizedArticle('family_daycare', lang) },
                  { id: 'family_school', icon: 'Book', tags: ['family', 'education'], ...getLocalizedArticle('family_school', lang) },
                  { id: 'family_activities', icon: 'Bike', tags: ['family', 'general', 'Work-life Balance', 'Networking'], ...getLocalizedArticle('family_activities', lang) },
                  { id: 'family_winter', icon: 'Snowflake', tags: ['family', 'general'], ...getLocalizedArticle('family_winter', lang) },
                  { id: 'family_safety', icon: 'Shield', tags: ['family', 'general'], ...getLocalizedArticle('family_safety', lang) }
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
