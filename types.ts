
// Enums
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD', // Main Home
  CHAT = 'CHAT',
  PROFILE = 'PROFILE', // Visual Profile Page
  PROFILE_EDIT = 'PROFILE_EDIT', // YAML Editor
  SETTINGS = 'SETTINGS',
  QUIZ = 'QUIZ',
  WIKI = 'WIKI'
}

export enum Sender {
  USER = 'user',
  MODEL = 'model'
}

export type LanguageCode = 'en' | 'vi' | 'pt-br' | 'pt-pt' | 'ru';

export interface AppLanguage {
  code: LanguageCode;
  name: string; // English name
  nativeName: string; // Native name
  flag: string; // Emoji flag
  supported: boolean; // If false, greys out/defaults to EN
}

// Interfaces
export interface Message {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  startTime: number;
  messages: Message[];
  summary?: string;
  isSummarized: boolean;
}

export interface UserProfile {
  id: string; // Unique ID for the profile
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
}

// Default Profile Data (YAML Template)
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
`.trim();

export const TEMPLATE_PROFILE_YAML = `
id: [UUID]
name: [Your Name]
residencePermitType: [e.g. Work, Student, Family, EU Registration]
ageRange: [e.g. 25-30]
originCountry: [Country]
maritalStatus: [Status]
languages:
  - language: [Language 1]
    level: [Level]
  - language: [Language 2]
    level: [Level]
education:
  degree: [Degree]
  field: [Field of Study]
profession: [Current Profession]
aspirations:
  - [Goal 1]
  - [Goal 2]
challenges:
  - [Challenge 1]
  - [Challenge 2]
`.trim();

export const GUEST_PROFILE: UserProfile = {
  id: 'guest',
  name: 'Guest',
  residencePermitType: 'Unknown',
  ageRange: 'Unknown',
  originCountry: 'Unknown',
  maritalStatus: 'Unknown',
  languages: [],
  education: {
    degree: 'Unknown',
    field: 'Unknown'
  },
  profession: 'Unknown',
  aspirations: [],
  challenges: []
};
