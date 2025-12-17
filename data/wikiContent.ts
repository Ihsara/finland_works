
import { Icons } from '../components/Icon';
import { LanguageCode } from '../types';
import { getResource } from './translations';

export interface WikiArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  icon?: keyof typeof Icons;
  tags: string[];
  categoryId?: string;
  categoryTitle?: string;
  displayId?: string;
}

export interface WikiSubSection {
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
    hoverBg: string;
    shadow: string;
  };
  subsections: WikiSubSection[];
}

export type EnrichedWikiArticle = WikiArticle;

const getLocalizedArticle = (id: string, lang: LanguageCode) => {
  const resource = getResource(lang);
  const article = resource.wiki.articles[id];
  if (!article) {
      const en = getResource('en');
      return en.wiki.articles[id] || { title: `Missing: ${id}`, summary: 'Content missing', content: 'Content missing' };
  }
  return article;
};

const getLocalizedTitle = (key: string, lang: LanguageCode) => {
    const resource = getResource(lang);
    return resource.wiki.titles[key] || key;
};

export const getWikiCategories = (lang: LanguageCode): WikiCategory[] => [
  {
    id: 'foundation',
    title: getLocalizedTitle('foundation', lang),
    icon: 'Landmark',
    theme: { border: 'border-blue-200', text: 'text-blue-700', hoverBg: 'bg-blue-50', shadow: 'shadow-blue-200' },
    subsections: [
        {
            title: getLocalizedTitle('identity', lang),
            articles: [
                { id: 'bureaucracy_migri', icon: 'Plane', tags: ['mandatory', 'arrival', 'legal'], ...getLocalizedArticle('bureaucracy_migri', lang) },
                { id: 'bureaucracy_dvv', icon: 'Fingerprint', tags: ['mandatory', 'arrival', 'legal'], ...getLocalizedArticle('bureaucracy_dvv', lang) },
                { id: 'bureaucracy_ihh', icon: 'Building', tags: ['mandatory', 'arrival', 'help'], ...getLocalizedArticle('bureaucracy_ihh', lang) },
                { id: 'bureaucracy_bank', icon: 'Landmark', tags: ['mandatory', 'finance', 'arrival'], ...getLocalizedArticle('bureaucracy_bank', lang) }
            ]
        },
        {
            title: getLocalizedTitle('security', lang),
            articles: [
                { id: 'social_kela_card', icon: 'Heart', tags: ['health', 'welfare', 'mandatory'], ...getLocalizedArticle('social_kela_card', lang) },
                { id: 'bureaucracy_tax', icon: 'CreditCard', tags: ['mandatory', 'work', 'finance'], ...getLocalizedArticle('bureaucracy_tax', lang) },
                { id: 'social_health', icon: 'Stethoscope', tags: ['health', 'welfare'], ...getLocalizedArticle('social_health', lang) },
                { id: 'social_pension', icon: 'PiggyBank', tags: ['finance', 'future'], ...getLocalizedArticle('social_pension', lang) }
            ]
        }
    ]
  },
  {
    id: 'life',
    title: getLocalizedTitle('life', lang),
    icon: 'Smile',
    theme: { border: 'border-pink-200', text: 'text-pink-700', hoverBg: 'bg-pink-50', shadow: 'shadow-pink-200' },
    subsections: [
        {
            title: getLocalizedTitle('housing', lang),
            articles: [
                { id: 'housing_finding', icon: 'Search', tags: ['housing', 'arrival'], ...getLocalizedArticle('housing_finding', lang) },
                { id: 'housing_contracts', icon: 'FileSignature', tags: ['housing', 'legal'], ...getLocalizedArticle('housing_contracts', lang) },
                { id: 'housing_utilities', icon: 'Zap', tags: ['housing'], ...getLocalizedArticle('housing_utilities', lang) },
                { id: 'housing_recycling', icon: 'Recycle', tags: ['housing', 'eco'], ...getLocalizedArticle('housing_recycling', lang) },
                { id: 'housing_sauna', icon: 'Waves', tags: ['housing', 'culture'], ...getLocalizedArticle('housing_sauna', lang) }
            ]
        },
        {
            title: 'Vantaa Specials',
            articles: [
                { id: 'vantaa_info_points', icon: 'Info', tags: ['vantaa', 'help'], ...getLocalizedArticle('vantaa_info_points', lang) },
                { id: 'vantaa_ring_rail', icon: 'Train', tags: ['vantaa', 'transport'], ...getLocalizedArticle('vantaa_ring_rail', lang) },
                { id: 'vantaa_library_tikkurila', icon: 'BookOpen', tags: ['vantaa', 'leisure'], ...getLocalizedArticle('vantaa_library_tikkurila', lang) },
                { id: 'vantaa_libraries_services', icon: 'Printer', tags: ['vantaa', 'services', 'family'], ...getLocalizedArticle('vantaa_libraries_services', lang) },
                { id: 'vantaa_aviapolis', icon: 'Plane', tags: ['vantaa', 'work'], ...getLocalizedArticle('vantaa_aviapolis', lang) },
                { id: 'vantaa_multicultural', icon: 'Globe', tags: ['vantaa', 'community'], ...getLocalizedArticle('vantaa_multicultural', lang) }
            ]
        },
        {
            title: 'Daily Life',
            articles: [
                { id: 'daily_transport', icon: 'Bus', tags: ['transport', 'arrival'], ...getLocalizedArticle('daily_transport', lang) },
                { id: 'daily_groceries', icon: 'ShoppingBag', tags: ['food'], ...getLocalizedArticle('daily_groceries', lang) },
                { id: 'daily_pantti', icon: 'RefreshCw', tags: ['eco', 'money'], ...getLocalizedArticle('daily_pantti', lang) }
            ]
        }
    ]
  },
  {
    id: 'family',
    title: getLocalizedTitle('family', lang),
    icon: 'Baby',
    theme: { border: 'border-yellow-200', text: 'text-yellow-700', hoverBg: 'bg-yellow-50', shadow: 'shadow-yellow-200' },
    subsections: [
        {
            title: 'Education & Care',
            articles: [
                { id: 'family_daycare', icon: 'Baby', tags: ['family', 'education', 'mandatory'], ...getLocalizedArticle('family_daycare', lang) },
                { id: 'family_school', icon: 'School', tags: ['family', 'education', 'mandatory'], ...getLocalizedArticle('family_school', lang) },
                { id: 'family_activities', icon: 'Music', tags: ['family', 'leisure'], ...getLocalizedArticle('family_activities', lang) },
                { id: 'family_winter', icon: 'Snowflake', tags: ['family', 'winter'], ...getLocalizedArticle('family_winter', lang) },
                { id: 'family_safety', icon: 'ShieldCheck', tags: ['family', 'safety'], ...getLocalizedArticle('family_safety', lang) }
            ]
        }
    ]
  },
  {
    id: 'leisure',
    title: 'Nature & Leisure',
    icon: 'TreePine',
    theme: { border: 'border-emerald-200', text: 'text-emerald-700', hoverBg: 'bg-emerald-50', shadow: 'shadow-emerald-200' },
    subsections: [
        {
            title: 'Nature',
            articles: [
                { id: 'vantaa_parks', icon: 'Sprout', tags: ['vantaa', 'nature', 'family'], ...getLocalizedArticle('vantaa_parks', lang) },
                { id: 'vantaa_river_seasons', icon: 'Waves', tags: ['vantaa', 'nature'], ...getLocalizedArticle('vantaa_river_seasons', lang) },
                { id: 'vantaa_nature', icon: 'TreePine', tags: ['vantaa', 'nature'], ...getLocalizedArticle('vantaa_nature', lang) },
                { id: 'nature_everyman', icon: 'Map', tags: ['nature', 'rights'], ...getLocalizedArticle('nature_everyman', lang) },
                { id: 'nature_winter', icon: 'ThermometerSun', tags: ['nature', 'health'], ...getLocalizedArticle('nature_winter', lang) },
                { id: 'nature_summer', icon: 'Sun', tags: ['nature', 'culture'], ...getLocalizedArticle('nature_summer', lang) }
            ]
        },
        {
            title: 'Sports & Wellness',
            articles: [
                { id: 'vantaa_swimming_halls', icon: 'Droplets', tags: ['vantaa', 'sports', 'family'], ...getLocalizedArticle('vantaa_swimming_halls', lang) },
                { id: 'vantaa_saunas_guide', icon: 'Flame', tags: ['vantaa', 'culture', 'wellness'], ...getLocalizedArticle('vantaa_saunas_guide', lang) }
            ]
        },
        {
            title: 'Volunteering',
            articles: [
                { id: 'net_volunteering', icon: 'Heart', tags: ['volunteering', 'networking'], ...getLocalizedArticle('net_volunteering', lang) },
                { id: 'vol_redcross', icon: 'Plus', tags: ['volunteering'], ...getLocalizedArticle('vol_redcross', lang) },
                { id: 'vol_animals', icon: 'Cat', tags: ['volunteering'], ...getLocalizedArticle('vol_animals', lang) },
                { id: 'vol_events', icon: 'Ticket', tags: ['volunteering'], ...getLocalizedArticle('vol_events', lang) },
                { id: 'vol_humanitarian', icon: 'Handshake', tags: ['volunteering'], ...getLocalizedArticle('vol_humanitarian', lang) }
            ]
        }
    ]
  },
  {
    id: 'workplace',
    title: getLocalizedTitle('workplace', lang),
    icon: 'Briefcase',
    theme: { border: 'border-orange-200', text: 'text-orange-700', hoverBg: 'bg-orange-50', shadow: 'shadow-orange-200' },
    subsections: [
        {
            title: getLocalizedTitle('rights', lang),
            articles: [
                { id: 'work_contract', icon: 'FileSignature', tags: ['work', 'legal', 'worker'], ...getLocalizedArticle('work_contract', lang) },
                { id: 'work_unions', icon: 'Shield', tags: ['work', 'union', 'worker'], ...getLocalizedArticle('work_unions', lang) },
                { id: 'social_unemployment', icon: 'Umbrella', tags: ['work', 'welfare', 'unemployment'], ...getLocalizedArticle('social_unemployment', lang) },
                { id: 'work_hours', icon: 'Clock', tags: ['work', 'rights'], ...getLocalizedArticle('work_hours', lang) },
                { id: 'work_holidays', icon: 'Palmtree', tags: ['work', 'rights'], ...getLocalizedArticle('work_holidays', lang) },
                { id: 'work_probation', icon: 'AlertCircle', tags: ['work', 'rights'], ...getLocalizedArticle('work_probation', lang) }
            ]
        },
        {
            title: getLocalizedTitle('norms', lang),
            articles: [
                { id: 'culture_coffee', icon: 'Coffee', tags: ['work', 'culture'], ...getLocalizedArticle('culture_coffee', lang) },
                { id: 'culture_punctuality', icon: 'Watch', tags: ['work', 'culture'], ...getLocalizedArticle('culture_punctuality', lang) },
                { id: 'culture_meetings', icon: 'Calendar', tags: ['work', 'culture'], ...getLocalizedArticle('culture_meetings', lang) },
                { id: 'culture_feedback', icon: 'MessageSquare', tags: ['work', 'culture'], ...getLocalizedArticle('culture_feedback', lang) },
                { id: 'culture_names', icon: 'User', tags: ['work', 'culture'], ...getLocalizedArticle('culture_names', lang) },
                { id: 'culture_afterwork', icon: 'Beer', tags: ['work', 'culture'], ...getLocalizedArticle('culture_afterwork', lang) },
                { id: 'culture_sauna', icon: 'ThermometerSun', tags: ['work', 'culture'], ...getLocalizedArticle('culture_sauna', lang) },
                { id: 'culture_smalltalk', icon: 'Mic', tags: ['work', 'culture'], ...getLocalizedArticle('culture_smalltalk', lang) },
                { id: 'culture_party', icon: 'PartyPopper', tags: ['work', 'culture'], ...getLocalizedArticle('culture_party', lang) }
            ]
        }
    ]
  },
  {
    id: 'job_strategy',
    title: getLocalizedTitle('job_strategy', lang),
    icon: 'Search',
    theme: { border: 'border-green-200', text: 'text-green-700', hoverBg: 'bg-green-50', shadow: 'shadow-green-200' },
    subsections: [
        {
            title: 'Basics & Hunting',
            articles: [
                { id: 'job_market_overview', icon: 'BarChart', tags: ['work', 'overview'], ...getLocalizedArticle('job_market_overview', lang) },
                { id: 'job_te_office', icon: 'Building2', tags: ['work', 'support'], ...getLocalizedArticle('job_te_office', lang) },
                { id: 'job_portals', icon: 'Laptop', tags: ['work', 'search'], ...getLocalizedArticle('job_portals', lang) },
                { id: 'job_entrepreneurship', icon: 'Rocket', tags: ['work', 'business'], ...getLocalizedArticle('job_entrepreneurship', lang) }
            ]
        },
        {
            title: 'Application Tools',
            articles: [
                { id: 'job_cv_tips', icon: 'FileText', tags: ['work', 'application'], ...getLocalizedArticle('job_cv_tips', lang) },
                { id: 'job_cover_letter', icon: 'Mail', tags: ['work', 'application'], ...getLocalizedArticle('job_cover_letter', lang) },
                { id: 'job_interview', icon: 'Users', tags: ['work', 'application'], ...getLocalizedArticle('job_interview', lang) },
                { id: 'job_recognition', icon: 'Award', tags: ['work', 'education'], ...getLocalizedArticle('job_recognition', lang) }
            ]
        },
        {
            title: 'Networking Strategy',
            articles: [
                { id: 'net_culture', icon: 'Handshake', tags: ['networking'], ...getLocalizedArticle('net_culture', lang) },
                { id: 'net_linkedin', icon: 'Linkedin', tags: ['networking'], ...getLocalizedArticle('net_linkedin', lang) },
                { id: 'net_hidden', icon: 'Ghost', tags: ['work', 'networking'], ...getLocalizedArticle('net_hidden', lang) }
            ]
        },
        {
            title: 'Industry Guides',
            articles: [
                { id: 'prof_engineering', icon: 'HardHat', tags: ['profession', 'engineering'], ...getLocalizedArticle('prof_engineering', lang) },
                { id: 'prof_business', icon: 'Briefcase', tags: ['profession', 'business'], ...getLocalizedArticle('prof_business', lang) },
                { id: 'prof_it', icon: 'Code', tags: ['profession', 'it'], ...getLocalizedArticle('prof_it', lang) },
                { id: 'prof_health', icon: 'Stethoscope', tags: ['profession', 'health'], ...getLocalizedArticle('prof_health', lang) },
                { id: 'prof_service', icon: 'Utensils', tags: ['profession', 'service'], ...getLocalizedArticle('prof_service', lang) }
            ]
        }
    ]
  }
];

export const getAllFlattenedArticles = (lang: LanguageCode): WikiArticle[] => {
    const categories = getWikiCategories(lang);
    const articles: WikiArticle[] = [];
    categories.forEach((cat, catIndex) => {
        cat.subsections.forEach((sub, subIndex) => {
            sub.articles.forEach((art, artIndex) => {
                articles.push({
                    ...art,
                    categoryId: cat.id,
                    categoryTitle: cat.title,
                    displayId: `${catIndex + 1}.${subIndex + 1}.${artIndex + 1}`
                });
            });
        });
    });
    return articles;
};
