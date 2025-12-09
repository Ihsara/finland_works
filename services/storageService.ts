
import jsYaml from 'js-yaml';
import { UserProfile, Conversation, DEFAULT_PROFILE_YAML, LengthPreference, ThemePreference, LayoutPreference } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Polyfill declaration for TypeScript
declare var process: { env: { API_KEY: string } };

const PREFIX = 'fw_';
const KEYS = {
  API_KEY: `${PREFIX}data/.env`,
  // Legacy single profile key (for migration)
  LEGACY_PROFILE: `${PREFIX}data/profile.yaml`, 
  // New structure
  PROFILES_PREFIX: `${PREFIX}data/profiles/`, 
  ACTIVE_PROFILE_ID: `${PREFIX}data/active_profile_id`,
  
  CONVERSATIONS_DIR: `${PREFIX}data/conversations/`,
  SUMMARY_DIR: `${PREFIX}data/summary/`,
  PENDING_SUMMARIES: `${PREFIX}pending_summaries`,
  
  // Wiki Progress
  WIKI_PROGRESS_PREFIX: `${PREFIX}data/wiki_progress_v2/`,

  // Settings
  PREF_RESPONSE_LENGTH: `${PREFIX}settings/response_length`,
  PREF_THEME: `${PREFIX}settings/theme`,
  PREF_LAYOUT: `${PREFIX}settings/layout`
};

// --- API Key Management ---

export const initializeEnv = (): string | null => {
  const stored = localStorage.getItem(KEYS.API_KEY);
  if (stored) {
    process.env.API_KEY = stored;
    return stored;
  }
  return null;
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(KEYS.API_KEY);
};

export const saveApiKey = (key: string): void => {
  localStorage.setItem(KEYS.API_KEY, key);
  process.env.API_KEY = key;
};

// --- Settings Management ---

export const getGlobalLengthPreference = (): LengthPreference => {
  const stored = localStorage.getItem(KEYS.PREF_RESPONSE_LENGTH);
  if (stored === 'short' || stored === 'long' || stored === 'ask') {
    return stored as LengthPreference;
  }
  return 'ask'; // Default
};

export const saveGlobalLengthPreference = (pref: LengthPreference): void => {
  localStorage.setItem(KEYS.PREF_RESPONSE_LENGTH, pref);
};

export const getThemePreference = (): ThemePreference => {
  const stored = localStorage.getItem(KEYS.PREF_THEME);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored as ThemePreference;
  }
  return 'system';
};

export const saveThemePreference = (pref: ThemePreference): void => {
  localStorage.setItem(KEYS.PREF_THEME, pref);
};

export const getLayoutPreference = (): LayoutPreference => {
  const stored = localStorage.getItem(KEYS.PREF_LAYOUT);
  if (stored === 'fullscreen' || stored === 'windowed') {
    return stored as LayoutPreference;
  }
  return 'windowed'; // Default
};

export const saveLayoutPreference = (pref: LayoutPreference): void => {
  localStorage.setItem(KEYS.PREF_LAYOUT, pref);
};

// --- Profile Management (Multi-User) ---

// Helper to get the full key for a profile ID
const getProfileKey = (id: string) => `${KEYS.PROFILES_PREFIX}${id}`;

export const getActiveProfileId = (): string | null => {
  return localStorage.getItem(KEYS.ACTIVE_PROFILE_ID);
};

export const setActiveProfileId = (id: string): void => {
  localStorage.setItem(KEYS.ACTIVE_PROFILE_ID, id);
};

export const saveProfile = (profile: UserProfile, makeActive: boolean = false): void => {
  if (!profile.id) {
    profile.id = uuidv4();
  }
  // Store as JSON for reliability, convert to YAML only for UI editing
  localStorage.setItem(getProfileKey(profile.id), JSON.stringify(profile));
  
  if (makeActive) {
    setActiveProfileId(profile.id);
  }
};

export const createDemoProfile = (): UserProfile => {
  try {
    const profile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
    profile.id = uuidv4(); // Always generate a fresh ID for the "Load Sample" action
    saveProfile(profile, true); // Force active when explicitly creating demo via button
    return profile;
  } catch (e) {
    console.error("Failed to create demo profile", e);
    throw e;
  }
};

export const getAllProfiles = (): UserProfile[] => {
  const profiles: UserProfile[] = [];
  
  // 1. Scan local storage for existing profiles
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(KEYS.PROFILES_PREFIX)) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          // We store profiles as JSON strings internally for robustness, 
          // but support YAML import/export in the UI.
          let profile: UserProfile;
          if (data.trim().startsWith('{')) {
             profile = JSON.parse(data);
          } else {
             profile = jsYaml.load(data) as UserProfile;
          }
          profiles.push(profile);
        }
      } catch (e) {
        console.warn(`Failed to load profile at ${key}`, e);
      }
    }
  }
  
  // 2. Legacy Migration
  // Check if legacy profile exists and hasn't been migrated
  const legacyYaml = localStorage.getItem(KEYS.LEGACY_PROFILE);
  if (legacyYaml) {
    try {
      const legacyProfile = jsYaml.load(legacyYaml) as UserProfile;
      // Assign ID if missing
      if (!legacyProfile.id) legacyProfile.id = uuidv4();
      
      // Save to new format
      saveProfile(legacyProfile, true);
      
      // Clean up legacy
      localStorage.removeItem(KEYS.LEGACY_PROFILE);
      profiles.push(legacyProfile);
    } catch (e) {
      console.error("Migration failed", e);
    }
  }

  // 3. Ensure Default Profile ("Gabriela" or similar) Exists
  const defaultId = 'demo-gabriela';
  const hasDefault = profiles.some(p => p.id === defaultId);
  
  if (!hasDefault) {
    try {
        const defaultProfile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
        defaultProfile.id = defaultId; 
        saveProfile(defaultProfile, false);
        profiles.push(defaultProfile);
    } catch (e) {
        console.error("Failed to initialize default profile", e);
    }
  }

  return profiles;
};

export const getActiveProfile = (): UserProfile | null => {
  const activeId = getActiveProfileId();
  const all = getAllProfiles();
  
  if (activeId) {
    const found = all.find(p => p.id === activeId);
    if (found) return found;
    localStorage.removeItem(KEYS.ACTIVE_PROFILE_ID);
  }
  
  return null;
};

export const deleteProfile = (id: string): void => {
  localStorage.removeItem(getProfileKey(id));
  if (getActiveProfileId() === id) {
    localStorage.removeItem(KEYS.ACTIVE_PROFILE_ID);
  }
};

export const profileToYaml = (profile: UserProfile): string => {
  return jsYaml.dump(profile);
};

export const saveProfileFromYaml = (yamlStr: string): UserProfile => {
  const profile = jsYaml.load(yamlStr) as UserProfile;
  if (!profile.id) {
    profile.id = uuidv4(); 
  }
  saveProfile(profile, true);
  return profile;
};

export const resetApplicationData = (): void => {
  localStorage.clear();
  try {
    const defaultProfile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
    defaultProfile.id = 'demo-gabriela'; 
    localStorage.setItem(`${KEYS.PROFILES_PREFIX}${defaultProfile.id}`, JSON.stringify(defaultProfile));
  } catch (e) {
    console.error("Failed to restore default profile during reset", e);
  }
};

// --- Conversation Management ---
export const saveConversation = (conversation: Conversation): void => {
  const key = `${KEYS.CONVERSATIONS_DIR}${conversation.id}.json`;
  localStorage.setItem(key, JSON.stringify(conversation));
};

export const getConversation = (id: string): Conversation | null => {
  const key = `${KEYS.CONVERSATIONS_DIR}${id}.json`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const getAllConversations = (): Conversation[] => {
  const conversations: Conversation[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(KEYS.CONVERSATIONS_DIR)) {
      const data = localStorage.getItem(key);
      if (data) conversations.push(JSON.parse(data));
    }
  }
  return conversations.sort((a, b) => b.startTime - a.startTime);
};

// --- Summary Management ---
export const saveSummary = (id: string, summaryText: string, title?: string): void => {
  const key = `${KEYS.SUMMARY_DIR}${id}.txt`;
  localStorage.setItem(key, summaryText);
  
  const conversation = getConversation(id);
  if (conversation) {
    conversation.isSummarized = true;
    conversation.summary = summaryText;
    if (title) conversation.title = title;
    saveConversation(conversation);
  }
};

export const addPendingSummary = (id: string): void => {
  const pending = getPendingSummaries();
  if (!pending.includes(id)) {
    pending.push(id);
    localStorage.setItem(KEYS.PENDING_SUMMARIES, JSON.stringify(pending));
  }
};

export const removePendingSummary = (id: string): void => {
  const pending = getPendingSummaries();
  const newPending = pending.filter(pid => pid !== id);
  localStorage.setItem(KEYS.PENDING_SUMMARIES, JSON.stringify(newPending));
};

export const getPendingSummaries = (): string[] => {
  const data = localStorage.getItem(KEYS.PENDING_SUMMARIES);
  return data ? JSON.parse(data) : [];
};

// --- Wiki Progress Management (Complex Metrics) ---

export type WikiItemStatus = 'done' | 'later' | undefined;

export interface WikiItemData {
  status: WikiItemStatus;
  lastUpdated: number; 
  markedLaterAt?: number; 
  viewsSinceLater: number; 
}

export interface WikiProgressData {
  items: Record<string, WikiItemData>;
  unlockedQuests: string[]; // IDs of soft-locked quests that have been unlocked by user
  achievements: string[]; // IDs of unlocked achievements
  globalStats: {
    totalSessions: number;
    firstSessionAt: number; 
    lastSessionAt: number;
    sessionsWithoutUpdate: number;
    // Chat stats
    totalChatMessages: number;
    totalChatConversations: number;
  };
}

export const getWikiProgress = (profileId: string): WikiProgressData => {
  const key = `${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`;
  const data = localStorage.getItem(key);
  
  if (data) {
    const parsed = JSON.parse(data);
    // Migration: Ensure new fields exist
    if (!parsed.unlockedQuests) parsed.unlockedQuests = [];
    if (!parsed.achievements) parsed.achievements = [];
    if (!parsed.globalStats) parsed.globalStats = {};
    if (parsed.globalStats.totalChatMessages === undefined) parsed.globalStats.totalChatMessages = 0;
    if (parsed.globalStats.totalChatConversations === undefined) parsed.globalStats.totalChatConversations = 0;
    
    // Handle migration from old V1 structure
    if (!parsed.items && !parsed.globalStats.firstSessionAt) {
      const newStructure: WikiProgressData = {
        items: {},
        unlockedQuests: [],
        achievements: [],
        globalStats: {
          totalSessions: 1,
          firstSessionAt: Date.now(),
          lastSessionAt: Date.now(),
          sessionsWithoutUpdate: 0,
          totalChatMessages: 0,
          totalChatConversations: 0
        }
      };
      Object.entries(parsed as Record<string, string>).forEach(([k, v]) => {
        newStructure.items[k] = {
          status: v as WikiItemStatus,
          lastUpdated: Date.now(),
          viewsSinceLater: 0
        };
      });
      return newStructure;
    }
    return parsed;
  }
  
  return {
    items: {},
    unlockedQuests: [],
    achievements: [],
    globalStats: {
      totalSessions: 0,
      firstSessionAt: Date.now(),
      lastSessionAt: Date.now(),
      sessionsWithoutUpdate: 0,
      totalChatMessages: 0,
      totalChatConversations: 0
    }
  };
};

export const saveWikiProgress = (profileId: string, data: WikiProgressData) => {
   localStorage.setItem(`${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`, JSON.stringify(data));
};

export const trackWikiSession = (profileId: string): void => {
  const data = getWikiProgress(profileId);
  data.globalStats.totalSessions += 1;
  data.globalStats.lastSessionAt = Date.now();
  data.globalStats.sessionsWithoutUpdate += 1; 

  Object.values(data.items).forEach(item => {
    if (item.status === 'later') {
      item.viewsSinceLater = (item.viewsSinceLater || 0) + 1;
    }
  });

  saveWikiProgress(profileId, data);
};

export const trackChatSession = (profileId: string): void => {
  const data = getWikiProgress(profileId);
  data.globalStats.totalChatConversations = (data.globalStats.totalChatConversations || 0) + 1;
  saveWikiProgress(profileId, data);
};

export const trackUserMessage = (profileId: string): void => {
  const data = getWikiProgress(profileId);
  data.globalStats.totalChatMessages = (data.globalStats.totalChatMessages || 0) + 1;
  saveWikiProgress(profileId, data);
};

export const saveWikiArticleStatus = (profileId: string, articleId: string, status: WikiItemStatus): void => {
  const data = getWikiProgress(profileId);
  data.globalStats.sessionsWithoutUpdate = 0;

  const existing = data.items[articleId] || { status: undefined, lastUpdated: 0, viewsSinceLater: 0 };

  const newItem: WikiItemData = {
    ...existing,
    status: status,
    lastUpdated: Date.now()
  };

  if (status === 'later') {
    if (existing.status !== 'later') {
        newItem.markedLaterAt = Date.now();
        newItem.viewsSinceLater = 0;
    }
  } else {
    newItem.markedLaterAt = undefined;
    newItem.viewsSinceLater = 0;
  }

  if (status === undefined) {
    delete data.items[articleId];
  } else {
    data.items[articleId] = newItem;
  }
  
  saveWikiProgress(profileId, data);
};

export const unlockQuest = (profileId: string, questId: string): void => {
    const data = getWikiProgress(profileId);
    if (!data.unlockedQuests.includes(questId)) {
        data.unlockedQuests.push(questId);
        saveWikiProgress(profileId, data);
    }
};

// Returns TRUE if the achievement was newly unlocked
export const unlockAchievement = (profileId: string, achievementId: string): boolean => {
    const data = getWikiProgress(profileId);
    if (!data.achievements) data.achievements = []; // Safety init
    
    if (!data.achievements.includes(achievementId)) {
        data.achievements.push(achievementId);
        saveWikiProgress(profileId, data);
        return true;
    }
    return false;
};
