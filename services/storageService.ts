
import jsYaml from 'js-yaml';
import { UserProfile, Conversation, DEFAULT_PROFILE_YAML } from '../types';
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
  WIKI_PROGRESS_PREFIX: `${PREFIX}data/wiki_progress_v2/`
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

// --- Profile Management (Multi-User) ---

// Helper to get the full key for a profile ID
const getProfileKey = (id: string) => `${KEYS.PROFILES_PREFIX}${id}`;

export const getActiveProfileId = (): string | null => {
  return localStorage.getItem(KEYS.ACTIVE_PROFILE_ID);
};

export const setActiveProfileId = (id: string): void => {
  localStorage.setItem(KEYS.ACTIVE_PROFILE_ID, id);
};

export const saveProfile = (profile: UserProfile): void => {
  if (!profile.id) {
    profile.id = uuidv4();
  }
  // Store as JSON for reliability, convert to YAML only for UI editing
  localStorage.setItem(getProfileKey(profile.id), JSON.stringify(profile));
  
  // If this is the only profile, or specifically requested, make it active
  if (!getActiveProfileId()) {
    setActiveProfileId(profile.id);
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
      saveProfile(legacyProfile);
      
      // Clean up legacy
      localStorage.removeItem(KEYS.LEGACY_PROFILE);
      profiles.push(legacyProfile);
    } catch (e) {
      console.error("Migration failed", e);
    }
  }

  // 3. Ensure Default Profile ("Gabriela") Exists
  // This ensures that even if the user deletes everything or starts fresh, 
  // the demo profile is available as an option.
  const defaultId = 'demo-gabriela';
  const hasDefault = profiles.some(p => p.id === defaultId);
  
  if (!hasDefault) {
    try {
        const defaultProfile = jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
        defaultProfile.id = defaultId; 
        saveProfile(defaultProfile);
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
    return all.find(p => p.id === activeId) || all[0] || null;
  }
  
  // Default to first available if no active ID set
  if (all.length > 0) {
    setActiveProfileId(all[0].id);
    return all[0];
  }
  
  return null;
};

export const deleteProfile = (id: string): void => {
  localStorage.removeItem(getProfileKey(id));
  if (getActiveProfileId() === id) {
    localStorage.removeItem(KEYS.ACTIVE_PROFILE_ID);
  }
};

// Utility to get YAML representation for the editor
export const profileToYaml = (profile: UserProfile): string => {
  return jsYaml.dump(profile);
};

// Utility to parse YAML from editor and save
export const saveProfileFromYaml = (yamlStr: string): UserProfile => {
  const profile = jsYaml.load(yamlStr) as UserProfile;
  if (!profile.id) {
    // Try to preserve existing ID if we are editing an existing profile? 
    // For now, ensure it has one.
    profile.id = uuidv4(); 
  }
  saveProfile(profile);
  return profile;
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
export const saveSummary = (id: string, summaryText: string): void => {
  const key = `${KEYS.SUMMARY_DIR}${id}.txt`;
  localStorage.setItem(key, summaryText);
  
  const conversation = getConversation(id);
  if (conversation) {
    conversation.isSummarized = true;
    conversation.summary = summaryText;
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
  lastUpdated: number; // Timestamp of last status change
  markedLaterAt?: number; // Timestamp when it was marked as 'later'
  viewsSinceLater: number; // How many times user opened guide while this was 'later'
}

export interface WikiProgressData {
  items: Record<string, WikiItemData>;
  globalStats: {
    totalSessions: number; // How many times they opened the Wiki view
    firstSessionAt: number; // Timestamp of very first visit
    lastSessionAt: number; // Timestamp of current/last visit
    sessionsWithoutUpdate: number; // Consecutive sessions where NOTHING was changed
  };
}

export const getWikiProgress = (profileId: string): WikiProgressData => {
  const key = `${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`;
  const data = localStorage.getItem(key);
  
  if (data) {
    const parsed = JSON.parse(data);
    // Handle migration from old V1 structure (simple record) to V2
    if (!parsed.items && !parsed.globalStats) {
      // It's likely old format
      const newStructure: WikiProgressData = {
        items: {},
        globalStats: {
          totalSessions: 1,
          firstSessionAt: Date.now(),
          lastSessionAt: Date.now(),
          sessionsWithoutUpdate: 0
        }
      };
      // Convert old entries
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
  
  // Default Empty
  return {
    items: {},
    globalStats: {
      totalSessions: 0,
      firstSessionAt: Date.now(),
      lastSessionAt: Date.now(),
      sessionsWithoutUpdate: 0
    }
  };
};

const saveWikiProgress = (profileId: string, data: WikiProgressData) => {
   localStorage.setItem(`${KEYS.WIKI_PROGRESS_PREFIX}${profileId}`, JSON.stringify(data));
};

// Call this when the User opens the Wiki View
export const trackWikiSession = (profileId: string): void => {
  const data = getWikiProgress(profileId);
  
  data.globalStats.totalSessions += 1;
  data.globalStats.lastSessionAt = Date.now();
  data.globalStats.sessionsWithoutUpdate += 1; // We assume no update yet; if they update, we reset this.

  // Increment anxiety counters for items marked "later"
  Object.values(data.items).forEach(item => {
    if (item.status === 'later') {
      item.viewsSinceLater = (item.viewsSinceLater || 0) + 1;
    }
  });

  saveWikiProgress(profileId, data);
};

export const saveWikiArticleStatus = (profileId: string, articleId: string, status: WikiItemStatus): void => {
  const data = getWikiProgress(profileId);
  
  // Reset the "Stagnation" counter because the user just did something!
  data.globalStats.sessionsWithoutUpdate = 0;

  const existing = data.items[articleId] || { status: undefined, lastUpdated: 0, viewsSinceLater: 0 };

  const newItem: WikiItemData = {
    ...existing,
    status: status,
    lastUpdated: Date.now()
  };

  if (status === 'later') {
    // If it was already later, keep the original timestamp, otherwise set new
    if (existing.status !== 'later') {
        newItem.markedLaterAt = Date.now();
        newItem.viewsSinceLater = 0;
    }
  } else {
    // If moving to done or undefined, clear 'later' metrics
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
