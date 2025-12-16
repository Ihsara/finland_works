import jsYaml from 'js-yaml';
import { UserProfile, Conversation, DEFAULT_PROFILE_YAML, LengthPreference, ThemePreference, LayoutPreference } from '../types';
import { v4 as uuidv4 } from 'uuid';

declare var process: { env: { API_KEY: string } };

const PREFIX = 'fw_';
const KEYS = {
  API_KEY: `${PREFIX}data/.env`,
  PROFILES_PREFIX: `${PREFIX}data/profiles/`, 
  ACTIVE_PROFILE_ID: `${PREFIX}data/active_profile_id`,
  CONVERSATIONS_DIR: `${PREFIX}data/conversations/`,
  SUMMARY_DIR: `${PREFIX}data/summary/`,
  PENDING_SUMMARIES: `${PREFIX}pending_summaries`,
  WIKI_PROGRESS_PREFIX: `${PREFIX}data/wiki_progress_v2/`,
  PREF_RESPONSE_LENGTH: `${PREFIX}settings/response_length`,
  PREF_THEME: `${PREFIX}settings/theme`,
  PREF_LAYOUT: `${PREFIX}settings/layout`
};

export const initializeEnv = (): string | null => {
  const stored = localStorage.getItem(KEYS.API_KEY);
  if (stored) {
    process.env.API_KEY = stored;
    return stored;
  }
  return null;
};

export const getApiKey = (): string | null => localStorage.getItem(KEYS.API_KEY);
export const saveApiKey = (key: string): void => {
  localStorage.setItem(KEYS.API_KEY, key);
  process.env.API_KEY = key;
};

export const getGlobalLengthPreference = (): LengthPreference => {
  const stored = localStorage.getItem(KEYS.PREF_RESPONSE_LENGTH);
  if (stored === 'short' || stored === 'long' || stored === 'ask') return stored as LengthPreference;
  return 'ask';
};
export const saveGlobalLengthPreference = (pref: LengthPreference): void => localStorage.setItem(KEYS.PREF_RESPONSE_LENGTH, pref);

export const getThemePreference = (): ThemePreference => {
  const stored = localStorage.getItem(KEYS.PREF_THEME);
  return (stored === 'light' || stored === 'dark' || stored === 'system') ? stored as ThemePreference : 'system';
};
export const saveThemePreference = (pref: ThemePreference): void => localStorage.setItem(KEYS.PREF_THEME, pref);

export const getLayoutPreference = (): LayoutPreference => {
  const stored = localStorage.getItem(KEYS.PREF_LAYOUT);
  return (stored === 'fullscreen' || stored === 'windowed') ? stored as LayoutPreference : 'fullscreen';
};
export const saveLayoutPreference = (pref: LayoutPreference): void => localStorage.setItem(KEYS.PREF_LAYOUT, pref);

const getProfileKey = (id: string) => `${KEYS.PROFILES_PREFIX}${id}`;
export const getActiveProfileId = (): string | null => localStorage.getItem(KEYS.ACTIVE_PROFILE_ID);
export const setActiveProfileId = (id: string): void => localStorage.setItem(KEYS.ACTIVE_PROFILE_ID, id);

export const saveProfile = (profile: UserProfile, makeActive: boolean = false): void => {
  if (!profile.id) profile.id = uuidv4();
  localStorage.setItem(getProfileKey(profile.id), JSON.stringify(profile));
  if (makeActive) setActiveProfileId(profile.id);
};

export const createDemoProfile = (): UserProfile => {
  const profile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
  profile.id = uuidv4();
  saveProfile(profile, true);
  return profile;
};

export const getAllProfiles = (): UserProfile[] => {
  const profiles: UserProfile[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(KEYS.PROFILES_PREFIX)) {
      try {
        const data = localStorage.getItem(key);
        if (data) profiles.push(data.trim().startsWith('{') ? JSON.parse(data) : jsYaml.load(data) as UserProfile);
      } catch (e) { console.warn(`Failed to load profile`, e); }
    }
  }
  const defaultId = 'demo-gabriela';
  if (!profiles.some(p => p.id === defaultId)) {
    try {
        const defaultProfile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
        defaultProfile.id = defaultId; 
        saveProfile(defaultProfile, false);
        profiles.push(defaultProfile);
    } catch (e) {}
  }
  return profiles;
};

export const getActiveProfile = (): UserProfile | null => {
  const activeId = getActiveProfileId();
  if (activeId) {
    const found = getAllProfiles().find(p => p.id === activeId);
    if (found) return found;
    localStorage.removeItem(KEYS.ACTIVE_PROFILE_ID);
  }
  return null;
};

export const deleteProfile = (id: string): void => {
  localStorage.removeItem(getProfileKey(id));
  if (getActiveProfileId() === id) localStorage.removeItem(KEYS.ACTIVE_PROFILE_ID);
};

export const profileToYaml = (profile: UserProfile): string => jsYaml.dump(profile);
export const saveProfileFromYaml = (yamlStr: string): UserProfile => {
  const profile = jsYaml.load(yamlStr) as UserProfile;
  if (!profile.id) profile.id = uuidv4(); 
  saveProfile(profile, true);
  return profile;
};

export const resetApplicationData = (): void => {
  localStorage.clear();
  try {
    const defaultProfile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
    defaultProfile.id = 'demo-gabriela'; 
    localStorage.setItem(`${KEYS.PROFILES_PREFIX}${defaultProfile.id}`, JSON.stringify(defaultProfile));
  } catch (e) {}
};

export const saveConversation = (conversation: Conversation): void => {
  localStorage.setItem(`${KEYS.CONVERSATIONS_DIR}${conversation.id}.json`, JSON.stringify(conversation));
};

export const getConversation = (id: string): Conversation | null => {
  const data = localStorage.getItem(`${KEYS.CONVERSATIONS_DIR}${id}.json`);
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

export const saveSummary = (id: string, summaryText: string, title?: string): void => {
  localStorage.setItem(`${KEYS.SUMMARY_DIR}${id}.txt`, summaryText);
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

export type WikiItemStatus = 'done' | 'later' | undefined;
export interface WikiItemData { status: WikiItemStatus; lastUpdated: number; markedLaterAt?: number; viewsSinceLater: number; }
export interface WikiProgressData {
  items: Record<string, WikiItemData>;
  unlockedQuests: string[];
  achievements: string[];
  globalStats: {
    totalSessions: number; firstSessionAt: number; lastSessionAt: number; sessionsWithoutUpdate: number;
    totalChatMessages: number; totalChatConversations: number;
  };
}

export const getWikiProgress = (profileId: string): WikiProgressData => {
  const data = localStorage.getItem(`${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`);
  if (data) {
    const parsed = JSON.parse(data);
    if (!parsed.unlockedQuests) parsed.unlockedQuests = [];
    if (!parsed.achievements) parsed.achievements = [];
    if (!parsed.globalStats) parsed.globalStats = {};
    if (parsed.globalStats.totalChatMessages === undefined) parsed.globalStats.totalChatMessages = 0;
    if (parsed.globalStats.totalChatConversations === undefined) parsed.globalStats.totalChatConversations = 0;
    return parsed;
  }
  return {
    items: {}, unlockedQuests: [], achievements: [],
    globalStats: { totalSessions: 0, firstSessionAt: Date.now(), lastSessionAt: Date.now(), sessionsWithoutUpdate: 0, totalChatMessages: 0, totalChatConversations: 0 }
  };
};

export const saveWikiProgress = (profileId: string, data: WikiProgressData) => localStorage.setItem(`${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`, JSON.stringify(data));

export const trackWikiSession = (profileId: string): void => {
  const data = getWikiProgress(profileId);
  data.globalStats.totalSessions += 1;
  data.globalStats.lastSessionAt = Date.now();
  data.globalStats.sessionsWithoutUpdate += 1;
  Object.values(data.items).forEach(item => {
    if (item.status === 'later') item.viewsSinceLater = (item.viewsSinceLater || 0) + 1;
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
  const newItem: WikiItemData = { ...existing, status: status, lastUpdated: Date.now() };
  if (status === 'later' && existing.status !== 'later') {
      newItem.markedLaterAt = Date.now();
      newItem.viewsSinceLater = 0;
  } else {
    newItem.markedLaterAt = undefined;
    newItem.viewsSinceLater = 0;
  }
  if (status === undefined) delete data.items[articleId]; else data.items[articleId] = newItem;
  saveWikiProgress(profileId, data);
};

export const unlockQuest = (profileId: string, questId: string): void => {
    const data = getWikiProgress(profileId);
    if (!data.unlockedQuests.includes(questId)) {
        data.unlockedQuests.push(questId);
        saveWikiProgress(profileId, data);
    }
};

export const unlockAchievement = (profileId: string, achievementId: string): boolean => {
    const data = getWikiProgress(profileId);
    if (!data.achievements) data.achievements = [];
    if (!data.achievements.includes(achievementId)) {
        data.achievements.push(achievementId);
        saveWikiProgress(profileId, data);
        return true;
    }
    return false;
};