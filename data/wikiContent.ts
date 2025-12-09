
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
      // Fallback to English or empty placeholder
      const en = getResource('en');
      return en.wiki.articles[id] || { title: 'Article Not Found', summary: 'Content missing', content: 'Content missing' };
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
    title: getLocalizedTitle('foundation', lang), // "Bureaucracy & Basics"
    icon: 'Landmark',
    theme: { border: 'border-blue-200', text: 'text-blue-700', hoverBg: 'bg-blue-50', shadow: 'shadow-blue-200' },
    subsections: [
        {
            title: getLocalizedTitle('identity', lang),
            articles: [
                { id: 'bureaucracy_dvv', icon: 'Fingerprint', tags: ['mandatory', 'arrival', 'legal'], ...getLocalizedArticle('bureaucracy_dvv', lang) },
                { id: 'bureaucracy_migri', icon: 'Plane', tags: ['mandatory', 'arrival', 'legal'], ...getLocalizedArticle('bureaucracy_migri', lang) },
                { id: 'bureaucracy_tax', icon: 'CreditCard', tags: ['mandatory', 'work', 'finance'], ...getLocalizedArticle('bureaucracy_tax', lang) },
                { id: 'bureaucracy_bank', icon: 'Landmark', tags: ['mandatory', 'finance', 'arrival'], ...getLocalizedArticle('bureaucracy_bank', lang) }
            ]
        },
        {
            title: getLocalizedTitle('security', lang),
            articles: [
                { id: 'social_kela_card', icon: 'Heart', tags: ['health', 'welfare'], ...getLocalizedArticle('social_kela_card', lang) },
                { id: 'social_health', icon: 'Stethoscope', tags: ['health', 'welfare'], ...getLocalizedArticle('social_health', lang) },
                { id: 'social_unemployment', icon: 'Umbrella', tags: ['work', 'welfare', 'unemployment'], ...getLocalizedArticle('social_unemployment', lang) },
                { id: 'social_housing', icon: 'Home', tags: ['housing', 'welfare'], ...getLocalizedArticle('social_housing', lang) },
                { id: 'social_pension', icon: 'PiggyBank', tags: ['work', 'finance', 'long-term'], ...getLocalizedArticle('social_pension', lang) }
            ]
        }
    ]
  },
  {
    id: 'job_strategy',
    title: getLocalizedTitle('job_strategy', lang),
    icon: 'Briefcase',
    theme: { border: 'border-green-200', text: 'text-green-700', hoverBg: 'bg-green-50', shadow: 'shadow-green-200' },
    subsections: [
        {
            title: getLocalizedTitle('market', lang),
            articles: [
                { id: 'job_market_overview', icon: 'BarChart', tags: ['work', 'market'], ...getLocalizedArticle('job_market_overview', lang) },
                { id: 'net_hidden', icon: 'Ghost', tags: ['work', 'Networking', 'Job searching'], ...getLocalizedArticle('net_hidden', lang) },
                { id: 'job_entrepreneurship', icon: 'Rocket', tags: ['work', 'Entrepreneurship'], ...getLocalizedArticle('job_entrepreneurship', lang) }
            ]
        },
        {
            title: getLocalizedTitle('tools', lang),
            articles: [
                { id: 'job_cv_tips', icon: 'FileText', tags: ['work', 'application'], ...getLocalizedArticle('job_cv_tips', lang) },
                { id: 'job_cover_letter', icon: 'Mail', tags: ['work', 'application'], ...getLocalizedArticle('job_cover_letter', lang) },
                { id: 'net_linkedin', icon: 'Linkedin', tags: ['work', 'Networking', 'digital'], ...getLocalizedArticle('net_linkedin', lang) },
                { id: 'job_portals', icon: 'Search', tags: ['work', 'Job searching'], ...getLocalizedArticle('job_portals', lang) },
                { id: 'job_te_office', icon: 'Building2', tags: ['work', 'support', 'unemployment'], ...getLocalizedArticle('job_te_office', lang) }
            ]
        },
        {
            title: getLocalizedTitle('networking', lang),
            articles: [
                { id: 'net_intro_deep', icon: 'Globe', tags: ['Networking', 'culture'], ...getLocalizedArticle('net_intro_deep', lang) },
                { id: 'net_culture', icon: 'Users', tags: ['Networking', 'culture'], ...getLocalizedArticle('net_culture', lang) },
                { id: 'net_school', icon: 'GraduationCap', tags: ['student', 'Networking', 'education', 'Recruitment'], ...getLocalizedArticle('net_school', lang) },
                { id: 'net_hackathons', icon: 'Code', tags: ['worker', 'tech', 'event', 'Networking'], ...getLocalizedArticle('net_hackathons', lang) },
                { id: 'net_slush', icon: 'Zap', tags: ['worker', 'event', 'Networking', 'Entrepreneurship'], ...getLocalizedArticle('net_slush', lang) },
                { id: 'net_cold_msg', icon: 'MessageCircle', tags: ['worker', 'communication', 'Networking', 'Job searching'], ...getLocalizedArticle('net_cold_msg', lang) },
                { id: 'net_hobbies', icon: 'Music', tags: ['Networking', 'culture', 'hobbies'], ...getLocalizedArticle('net_hobbies', lang) },
                { id: 'net_parents', icon: 'Baby', tags: ['Networking', 'family'], ...getLocalizedArticle('net_parents', lang) },
                { id: 'net_introvert', icon: 'BookOpen', tags: ['Networking', 'culture'], ...getLocalizedArticle('net_introvert', lang) },
                { id: 'net_volunteering', icon: 'Heart', tags: ['Networking', 'Volunteering Internships'], ...getLocalizedArticle('net_volunteering', lang) }
            ]
        }
    ]
  },
  {
    id: 'workplace',
    title: getLocalizedTitle('workplace', lang),
    icon: 'Coffee',
    theme: { border: 'border-orange-200', text: 'text-orange-700', hoverBg: 'bg-orange-50', shadow: 'shadow-orange-200' },
    subsections: [
        {
            title: getLocalizedTitle('rights', lang),
            articles: [
                { id: 'work_contract', icon: 'FileSignature', tags: ['Work Rights', 'legal'], ...getLocalizedArticle('work_contract', lang) },
                { id: 'work_hours', icon: 'Clock', tags: ['Work Rights', 'Work-life Balance'], ...getLocalizedArticle('work_hours', lang) },
                { id: 'work_holidays', icon: 'Sun', tags: ['Work Rights', 'Work-life Balance'], ...getLocalizedArticle('work_holidays', lang) },
                { id: 'work_unions', icon: 'Shield', tags: ['Work Rights', 'union'], ...getLocalizedArticle('work_unions', lang) },
                { id: 'work_probation', icon: 'HelpCircle', tags: ['Work Rights', 'contracts'], ...getLocalizedArticle('work_probation', lang) }
            ]
        },
        {
            title: getLocalizedTitle('norms', lang),
            articles: [
                { id: 'culture_meetings', icon: 'Calendar', tags: ['Work Culture'], ...getLocalizedArticle('culture_meetings', lang) },
                { id: 'culture_feedback', icon: 'MessageSquare', tags: ['Work Culture'], ...getLocalizedArticle('culture_feedback', lang) },
                { id: 'culture_names', icon: 'User', tags: ['Work Culture'], ...getLocalizedArticle('culture_names', lang) },
                { id: 'culture_punctuality', icon: 'Watch', tags: ['Work Culture'], ...getLocalizedArticle('culture_punctuality', lang) },
                { id: 'culture_coffee', icon: 'Coffee', tags: ['Work Culture'], ...getLocalizedArticle('culture_coffee', lang) }
            ]
        },
        {
            title: getLocalizedTitle('social', lang),
            articles: [
                { id: 'culture_afterwork', icon: 'Beer', tags: ['Work Culture', 'social'], ...getLocalizedArticle('culture_afterwork', lang) },
                { id: 'culture_sauna', icon: 'ThermometerSun', tags: ['Work Culture', 'culture'], ...getLocalizedArticle('culture_sauna', lang) },
                { id: 'culture_smalltalk', icon: 'Mic', tags: ['Work Culture', 'communication'], ...getLocalizedArticle('culture_smalltalk', lang) },
                { id: 'culture_party', icon: 'PartyPopper', tags: ['Work Culture', 'social'], ...getLocalizedArticle('culture_party', lang) }
            ]
        }
    ]
  },
  {
    id: 'industries',
    title: getLocalizedTitle('industries', lang),
    icon: 'Factory',
    theme: { border: 'border-purple-200', text: 'text-purple-700', hoverBg: 'bg-purple-50', shadow: 'shadow-purple-200' },
    subsections: [
        {
            title: getLocalizedTitle('specialist', lang),
            articles: [
                { id: 'prof_engineering', icon: 'HardHat', tags: ['Recruitment', 'engineering'], ...getLocalizedArticle('prof_engineering', lang) },
                { id: 'prof_it', icon: 'Laptop', tags: ['Recruitment', 'tech'], ...getLocalizedArticle('prof_it', lang) },
                { id: 'prof_business', icon: 'LineChart', tags: ['Recruitment', 'business'], ...getLocalizedArticle('prof_business', lang) },
                { id: 'prof_health', icon: 'Stethoscope', tags: ['Recruitment', 'health'], ...getLocalizedArticle('prof_health', lang) },
                { id: 'job_recognition', icon: 'Award', tags: ['Recruitment', 'legal'], ...getLocalizedArticle('job_recognition', lang) }
            ]
        },
        {
            title: getLocalizedTitle('hands_on', lang),
            articles: [
                { id: 'prof_service', icon: 'Utensils', tags: ['Recruitment', 'service'], ...getLocalizedArticle('prof_service', lang) }
            ]
        }
    ]
  },
  {
    id: 'life',
    title: getLocalizedTitle('life', lang), // "Nordic Life & Impact"
    icon: 'Smile',
    theme: { border: 'border-pink-200', text: 'text-pink-700', hoverBg: 'bg-pink-50', shadow: 'shadow-pink-200' },
    subsections: [
        {
            title: getLocalizedTitle('housing', lang),
            articles: [
                { id: 'housing_finding', icon: 'Search', tags: ['housing'], ...getLocalizedArticle('housing_finding', lang) },
                { id: 'housing_contracts', icon: 'FileSignature', tags: ['housing', 'legal'], ...getLocalizedArticle('housing_contracts', lang) },
                { id: 'housing_utilities', icon: 'Zap', tags: ['housing'], ...getLocalizedArticle('housing_utilities', lang) },
                { id: 'housing_recycling', icon: 'Recycle', tags: ['housing', 'environment'], ...getLocalizedArticle('housing_recycling', lang) },
                { id: 'housing_sauna', icon: 'Waves', tags: ['housing', 'culture'], ...getLocalizedArticle('housing_sauna', lang) }
            ]
        },
        {
            title: getLocalizedTitle('family', lang),
            articles: [
                { id: 'family_school', icon: 'School', tags: ['family', 'education'], ...getLocalizedArticle('family_school', lang) },
                { id: 'family_daycare', icon: 'Baby', tags: ['family', 'education'], ...getLocalizedArticle('family_daycare', lang) },
                { id: 'family_activities', icon: 'Music', tags: ['family', 'leisure'], ...getLocalizedArticle('family_activities', lang) },
                { id: 'family_winter', icon: 'Snowflake', tags: ['family', 'winter'], ...getLocalizedArticle('family_winter', lang) },
                { id: 'family_safety', icon: 'ShieldCheck', tags: ['family', 'safety'], ...getLocalizedArticle('family_safety', lang) }
            ]
        },
        {
            title: getLocalizedTitle('giving', lang), // "Giving Back"
            articles: [
                { id: 'vol_redcross', icon: 'Heart', tags: ['volunteering', 'community'], ...getLocalizedArticle('vol_redcross', lang) },
                { id: 'vol_animals', icon: 'Cat', tags: ['volunteering', 'nature'], ...getLocalizedArticle('vol_animals', lang) },
                { id: 'vol_events', icon: 'Ticket', tags: ['volunteering', 'events'], ...getLocalizedArticle('vol_events', lang) },
                { id: 'vol_humanitarian', icon: 'Handshake', tags: ['volunteering', 'society'], ...getLocalizedArticle('vol_humanitarian', lang) }
            ]
        }
    ]
  },
  // NEW CATEGORIES FOR "Living in Finland"
  {
    id: 'daily_life',
    title: 'Daily Life',
    icon: 'Bus',
    theme: { border: 'border-cyan-200', text: 'text-cyan-700', hoverBg: 'bg-cyan-50', shadow: 'shadow-cyan-200' },
    subsections: [
        {
            title: 'Essentials',
            articles: [
                { 
                    id: 'daily_transport', 
                    title: 'Public Transport (HSL/VR)', 
                    summary: 'How to use trains, buses, and the zone system.',
                    content: `# Moving Around\n\n### HSL (Helsinki Region)\n* **Zones:** Ticket price depends on zones (ABCD). Helsinki is AB.\n* **App:** Download HSL app. It is cheaper than buying from driver.\n* **Penalty:** No ticket = 80€ fine.\n\n### VR (Trains)\nFor long distance. Book early for cheap tickets.`,
                    icon: 'Train', 
                    tags: ['arrival', 'life'] 
                },
                { 
                    id: 'daily_groceries', 
                    title: 'Grocery Shopping', 
                    summary: 'Weigh your own veggies and deposit bottles.', 
                    content: `# Supermarket Rules\n\n1. **Weighing:** You must weigh fruit/veg and stick the price tag on the bag *before* the checkout.\n2. **S-Group vs K-Group:** Two main chains. Get a bonus card (S-Etukortti) if you stay long.\n3. **Alcohol:** Beer is in supermarkets until 9pm. Stronger stuff is only in **Alko** (state monopoly).`,
                    icon: 'ShoppingBag', 
                    tags: ['life', 'food'] 
                },
                {
                    id: 'daily_pantti',
                    title: 'Bottle Recycling (Pantti)',
                    summary: 'Don\'t throw away cans! They are money.',
                    content: `# Pantti System\n\nAlmost every bottle and can in Finland has a deposit value (10c to 40c).\n\n1. **Collect:** Don't crush them.\n2. **Return:** Machines are in every supermarket entrance.\n3. **Money:** You get a receipt. Use it at checkout for money off groceries.`,
                    icon: 'Recycle',
                    tags: ['life', 'environment']
                }
            ]
        }
    ]
  },
  {
    id: 'nature',
    title: 'Nature & Seasons',
    icon: 'TreePine',
    theme: { border: 'border-emerald-200', text: 'text-emerald-700', hoverBg: 'bg-emerald-50', shadow: 'shadow-emerald-200' },
    subsections: [
        {
            title: 'Outdoor Life',
            articles: [
                { 
                    id: 'nature_everyman', 
                    title: 'Everyman\'s Rights', 
                    summary: 'You can walk almost anywhere and pick berries.', 
                    content: `# Jokamiehenoikeudet\n\nYou have the right to:\n1. **Walk:** Anywhere in forests (except private gardens).\n2. **Pick:** Berries and mushrooms freely.\n3. **Camp:** Temporarily in nature.\n\n**Rules:** Do not disturb birds, do not leave trash, do not cut trees.`,
                    icon: 'Map', 
                    tags: ['nature', 'legal'] 
                },
                { 
                    id: 'nature_winter', 
                    title: 'Surviving Winter', 
                    summary: 'Darkness and Vitamin D.', 
                    content: `# The Darkness (Kaamos)\n\nIn Nov-Jan, sunlight is rare.\n* **Vitamin D:** Take supplements. Mandatory.\n* **Reflectors:** Wear them. It's the law.\n* **Spikes:** Shoes with spikes prevent slipping on ice.`,
                    icon: 'Snowflake', 
                    tags: ['nature', 'health'] 
                },
                {
                    id: 'nature_summer',
                    title: 'Summer Cottages (Mökki)',
                    summary: 'The Finnish soul lives here.',
                    content: `# Mökki Life\n\nIn July, cities empty. Everyone goes to a cottage.\n* **Simple:** Many have no electricity or running water.\n* **Activity:** Sauna, swim, grill, repeat.`,
                    icon: 'Sun',
                    tags: ['nature', 'culture']
                }
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
