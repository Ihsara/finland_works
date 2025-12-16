// Enums
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  PLAN = 'PLAN',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  PROFILE_EDIT = 'PROFILE_EDIT',
  SETTINGS = 'SETTINGS',
  QUIZ = 'QUIZ',
  WIKI = 'WIKI',
  HISTORY = 'HISTORY',
  CV_IMPORT = 'CV_IMPORT'
}

export enum Sender {
  USER = 'user',
  MODEL = 'model'
}

export type LanguageCode = 
  | 'en' | 'fi' | 'th' | 'vi' | 'pt-br' | 'pt-pt' | 'ru' | 'et' | 'ar' | 'so' | 'fa' | 'ku' | 'zh' | 'sq' | 'uk' | 'es' | 'tr';

export type LengthPreference = 'short' | 'long' | 'ask';
export type ThemePreference = 'system' | 'light' | 'dark';
export type LayoutPreference = 'windowed' | 'fullscreen';

export interface AppLanguage {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  supported: boolean;
  rtl?: boolean;
}

export interface InteractiveOption {
  id: string;
  label: string;
  value: string;
}

export interface InteractiveData {
  message?: string;
  question_header?: string;
  options: InteractiveOption[];
}

export interface NavigationLinkData {
  message: string;
  articleId: string;
  articleTitle?: string;
  buttonText?: string;
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
  structuredData?: {
    type: 'interactive_choice';
    data: InteractiveData;
  } | {
    type: 'navigation_link';
    data: NavigationLinkData;
  };
}

export type SummaryStatus = 'idle' | 'generating' | 'completed' | 'failed';

export interface Conversation {
  id: string;
  startTime: number;
  title?: string;
  messages: Message[];
  summary?: string;
  isSummarized: boolean;
  summaryStatus?: SummaryStatus;
  responseLength?: 'short' | 'long';
}

export interface UserProfile {
  id: string;
  name: string;
  residencePermitType: string;
  ageRange: string;
  originCountry: string;
  maritalStatus: string;
  languages: {
    language: string;
    level: string;
  }[];
  education: {
    degree: string;
    field: string;
  };
  profession: string;
  aspirations: string[];
  challenges: string[];
  finnishMotivation?: string;
  cultureInterest?: string;
  confidenceLife?: string;
  confidenceCareer?: string;
  infoLevel?: string;
  primaryExcitement?: string;
  puzzleImageId?: string;
}

export const DEFAULT_PROFILE_YAML = `
id: demo-gabriela
name: Gabriela
residencePermitType: Work-based (Specialist)
ageRange: 26-35 years old
originCountry: Brazil
maritalStatus: Married, one child (4 years old)
languages:
  - language: Portuguese
    level: Native
  - language: Finnish
    level: Lower intermediate (A2-B1)
  - language: English
    level: Intermediate (B1+)
education:
  degree: Bachelor's degree
  field: Industrial Design
profession: Assembly line worker / aspiring product designer
aspirations:
  - To move from manual factory work to creative or technical design
  - To have her degree recognized in Finland
challenges:
  - Feels underqualified due to language barriers
  - Doesn't know where to find professional networks
finnishMotivation: I’m motivated but need structure
cultureInterest: Very interested – I want to integrate deeply
confidenceLife: I’m somewhat confident but need support
confidenceCareer: I have some ideas but need direction
infoLevel: Somewhat informed
primaryExcitement: Nature, culture, and lifestyle
puzzleImageId: vantaa_iso
`.trim();

export const GUEST_PROFILE: UserProfile = {
  id: 'guest',
  name: 'Guest',
  residencePermitType: 'Unknown',
  ageRange: 'Unknown',
  originCountry: 'Unknown',
  maritalStatus: 'Unknown',
  languages: [],
  education: { degree: 'Unknown', field: 'Unknown' },
  profession: 'Unknown',
  aspirations: [],
  challenges: []
};