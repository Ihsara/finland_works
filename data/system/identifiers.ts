
/**
 * Unique Identifier System (UIS) Registry
 * 
 * This file acts as the AGGREGATOR for the modular system definition.
 * 
 * - See `data/system/scenes/` for component definitions.
 * - See `data/system/links/` for navigation mapping.
 */

import * as GENERATED_SCENES from './scenes';
import { MANUAL_SCENES } from './manual_overrides';
import { NAV_LINKS } from './links';

// --- CONFIGURATION ---
// Set this to true if you are manually fixing data in `manual_overrides.ts`
// and want those values to take precedence over the generated files.
const USE_MANUAL_OVERRIDES = false;

// --- LOGIC ---
// We merge the generated scenes with manual overrides if the flag is set.
// This allows us to "import" manual fixes instead of just "exporting" generated ones.
const ACTIVE_SCENES = USE_MANUAL_OVERRIDES 
  ? { ...GENERATED_SCENES, ...MANUAL_SCENES } 
  : GENERATED_SCENES;

export const APP_IDS = {
  // --- ROOTS ---
  ROOT: 'root',
  LAYOUT_CONTAINER: 'layout_container',

  // --- SCENES (Top Level IDs) ---
  // We map the keys from the active scenes to ensure we always have a valid ID structure
  SCENES: {
    LANDING: ACTIVE_SCENES.LANDING?.ID || 'scene_landing',
    DASHBOARD: ACTIVE_SCENES.DASHBOARD?.ID || 'scene_dashboard',
    CHAT: ACTIVE_SCENES.CHAT?.ID || 'scene_chat',
    PROFILE: ACTIVE_SCENES.PROFILE?.ID || 'scene_profile',
    PROFILE_EDIT: ACTIVE_SCENES.PROFILE_EDIT?.ID || 'scene_profile_edit',
    QUIZ: ACTIVE_SCENES.QUIZ?.ID || 'scene_quiz',
    WIKI: ACTIVE_SCENES.WIKI?.ID || 'scene_wiki',
    HISTORY: ACTIVE_SCENES.HISTORY?.ID || 'scene_history',
    CV_IMPORT: ACTIVE_SCENES.CV_IMPORT?.ID || 'scene_cv_import',
    SETTINGS: ACTIVE_SCENES.SETTINGS?.ID || 'scene_settings',
    API_KEY: ACTIVE_SCENES.API_KEY?.ID || 'scene_api_key_entry'
  },

  // --- SHARED COMPONENTS ---
  COMPONENTS: {
    NAVBAR: {
      CONTAINER: 'comp_navbar',
      LANG_SELECTOR: 'comp_navbar_lang_selector',
      BTN_BACK: 'comp_navbar_btn_back',
      BTN_CLOSE: 'comp_navbar_btn_close',
    },
    FEEDBACK_RIBBON: 'comp_feedback_ribbon',
    WIZARD_PROGRESS: 'comp_wizard_progress',
  },

  // --- VIEW SPECIFIC ELEMENTS ---
  // We export the entire active scene objects so views can access internal IDs (e.g. BTN_QUIZ)
  VIEWS: ACTIVE_SCENES,

  // --- NAVIGATION MAP ---
  LINKS: NAV_LINKS

} as const;
