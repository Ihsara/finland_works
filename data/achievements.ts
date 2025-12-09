
import { Icons } from '../components/Icon';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
  color: string;
}

export const ACHIEVEMENTS: Record<string, AchievementDef> = {
  // Wizard & Profile
  'true_identity': {
    id: 'true_identity',
    title: 'True Identity',
    description: 'You used your real name instead of a generated one.',
    icon: 'UserCheck',
    color: 'text-blue-500 bg-blue-100 border-blue-200'
  },
  'planner_initiated': {
    id: 'planner_initiated',
    title: 'The Architect',
    description: 'You created your profile and started the journey.',
    icon: 'Map',
    color: 'text-purple-500 bg-purple-100 border-purple-200'
  },
  'quiz_master': {
    id: 'quiz_master',
    title: 'Self-Awareness',
    description: 'You completed the entire profile questionnaire.',
    icon: 'Award',
    color: 'text-yellow-600 bg-yellow-100 border-yellow-200'
  },

  // Wiki Interactions
  'first_step': {
    id: 'first_step',
    title: 'First Step',
    description: 'You marked your first guide item as Done.',
    icon: 'Footprints', 
    color: 'text-green-500 bg-green-100 border-green-200'
  },
  'time_lord': {
    id: 'time_lord',
    title: 'Time Lord',
    description: 'You used "Remind Me Later" for the first time.',
    icon: 'Clock',
    color: 'text-amber-500 bg-amber-100 border-amber-200'
  },
  'backlog_champion': {
    id: 'backlog_champion',
    title: 'Backlog Champion',
    description: 'You have 10 items saved for later. Busy bee!',
    icon: 'Layers',
    color: 'text-orange-500 bg-orange-100 border-orange-200'
  },
  
  // Chat Interactions
  'curious_mind': {
    id: 'curious_mind',
    title: 'Curious Mind',
    description: 'You asked the AI Assistant your first real question.',
    icon: 'Sparkles',
    color: 'text-indigo-500 bg-indigo-100 border-indigo-200'
  },
  'talkative_type': {
    id: 'talkative_type',
    title: 'Talkative Type',
    description: 'You have sent 5 messages to the assistant. Keep asking!',
    icon: 'MessageCircle',
    color: 'text-teal-500 bg-teal-100 border-teal-200'
  },
  'serial_conversationalist': {
    id: 'serial_conversationalist',
    title: 'Serial Conversationalist',
    description: 'You have started 5 different chat sessions.',
    icon: 'MessageSquare',
    color: 'text-pink-500 bg-pink-100 border-pink-200'
  },

  // Category Masters
  'master_foundation': { id: 'master_foundation', title: 'Bureaucracy Slayer', description: 'Completed all Basic Essentials.', icon: 'Landmark', color: 'text-blue-600 bg-blue-100' },
  'master_job_strategy': { id: 'master_job_strategy', title: 'Headhunter', description: 'Completed Job Strategy.', icon: 'Briefcase', color: 'text-green-600 bg-green-100' },
  'master_workplace': { id: 'master_workplace', title: 'Culture Vulture', description: 'Mastered Finnish Work Culture.', icon: 'Coffee', color: 'text-orange-600 bg-orange-100' },
  
  // New Life Achievements
  'master_life': { id: 'master_life', title: 'Local Hero', description: 'Mastered Housing & Family.', icon: 'Home', color: 'text-pink-600 bg-pink-100' },
  'master_daily_life': { id: 'master_daily_life', title: 'City Survivor', description: 'Mastered Groceries & Transport.', icon: 'Bus', color: 'text-cyan-600 bg-cyan-100' },
  'master_nature': { id: 'master_nature', title: 'Forest Dweller', description: 'Mastered Nature & Winter skills.', icon: 'TreePine', color: 'text-emerald-600 bg-emerald-100' },
};
