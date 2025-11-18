// Enums
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  QUIZ = 'QUIZ',
  WIKI = 'WIKI'
}

export enum Sender {
  USER = 'user',
  MODEL = 'model'
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
  name: string;
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
name: Gabriela
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
name: [Your Name]
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