import jsYaml from 'js-yaml';
import { UserProfile, Conversation, DEFAULT_PROFILE_YAML } from '../types';

// Polyfill declaration for TypeScript
declare var process: { env: { API_KEY: string } };

const PREFIX = 'fw_';
const KEYS = {
  API_KEY: `${PREFIX}data/.env`,
  PROFILE: `${PREFIX}data/profile.yaml`,
  CONVERSATIONS_DIR: `${PREFIX}data/conversations/`,
  SUMMARY_DIR: `${PREFIX}data/summary/`,
  PENDING_SUMMARIES: `${PREFIX}pending_summaries`
};

// --- API Key Management ---

// Initialize process.env.API_KEY from local storage
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
  // Also update the runtime environment
  process.env.API_KEY = key;
};

// --- Profile Management (YAML) ---
export const getProfileYaml = (): string => {
  const stored = localStorage.getItem(KEYS.PROFILE);
  if (!stored) {
    localStorage.setItem(KEYS.PROFILE, DEFAULT_PROFILE_YAML);
    return DEFAULT_PROFILE_YAML;
  }
  return stored;
};

export const getProfileObject = (): UserProfile => {
  const yamlStr = getProfileYaml();
  try {
    return jsYaml.load(yamlStr) as UserProfile;
  } catch (e) {
    console.error("Failed to parse profile YAML", e);
    return jsYaml.load(DEFAULT_PROFILE_YAML) as UserProfile;
  }
};

export const saveProfileYaml = (yamlStr: string): void => {
  localStorage.setItem(KEYS.PROFILE, yamlStr);
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
  
  // Update the conversation object as well
  const conversation = getConversation(id);
  if (conversation) {
    conversation.isSummarized = true;
    conversation.summary = summaryText;
    saveConversation(conversation);
  }
};

// --- Pending Tasks (Checkpoints) ---
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