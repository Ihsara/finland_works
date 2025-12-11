
/**
 * SCENE REGISTRY
 * 
 * This file defines the atomic elements (Buttons, Inputs, Areas) for each scene.
 * Each scene object MUST contain an `ID` property for the root container.
 */

export const LANDING = {
  ID: 'scene_landing',
  HERO_TITLE: 'landing_hero_title',
  BTN_QUIZ: 'btn_landing_start_quiz',
  BTN_CONTINUE: 'btn_landing_continue',
  BTN_CHAT: 'btn_landing_start_chat',
  BTN_BROWSE: 'btn_landing_browse',
  LINK_SAMPLE: 'link_landing_load_sample',
  LINK_RESET: 'link_landing_reset_data',
  LINK_SETTINGS: 'link_landing_settings'
};

export const DASHBOARD = {
  ID: 'scene_dashboard',
  AVATAR: 'dashboard_avatar_main',
  PROGRESS_BAR: 'dashboard_progress_bar',
  BTN_GUIDE: 'btn_dashboard_guide',
  BTN_CHAT: 'btn_dashboard_chat',
  BTN_HISTORY: 'btn_dashboard_history',
  BTN_CV: 'btn_dashboard_cv_import',
  BTN_SETTINGS: 'btn_dashboard_settings'
};

export const CHAT = {
  ID: 'scene_chat',
  MSG_LIST: 'chat_message_list',
  INPUT_FIELD: 'input_chat_message',
  BTN_SEND: 'btn_chat_send',
  BTN_END: 'btn_chat_end_session'
};

export const WIKI = {
  ID: 'scene_wiki',
  SIDEBAR: 'wiki_sidebar',
  CONTENT_AREA: 'wiki_content_area',
  BTN_TOGGLE_VIEW: 'btn_wiki_toggle_view',
  // Dynamic ID generators
  CARD_CATEGORY: (id: string) => `card_wiki_cat_${id}`,
  ITEM_ARTICLE: (id: string) => `item_wiki_article_${id}`,
  BTN_MARK_DONE: 'btn_wiki_mark_done',
  BTN_MARK_LATER: 'btn_wiki_mark_later',
  BTN_MARK_SAVED: 'btn_wiki_mark_saved' // Alias for LATER
};

export const CV_IMPORT = {
  ID: 'scene_cv_import',
  INPUT_TEXT: 'input_cv_text',
  BTN_ANALYZE: 'btn_cv_analyze',
  INPUT_API_KEY: 'input_cv_api_key'
};

export const PROFILE = { 
  ID: 'scene_profile',
  BTN_TAKE_QUIZ: 'btn_profile_take_quiz',
  BTN_GUEST_START: 'btn_profile_guest_start',
  BTN_TO_PLAN: 'btn_profile_to_plan',
  LINK_INSTR_CV: 'link_profile_instr_cv',
  LINK_INSTR_TAX: 'link_profile_instr_tax'
};

export const PLAN = {
  ID: 'scene_plan',
  TAB_CAREER: 'tab_plan_career',
  TAB_LIFE: 'tab_plan_life',
  BTN_TROPHIES: 'btn_plan_trophies',
};

export const ACHIEVEMENTS = {
  ID: 'scene_achievements',
  LIST: 'list_achievements',
  BTN_BACK: 'btn_achievements_back'
};

// Simple ID containers for scenes that don't have complex internal element targeting yet
export const PROFILE_EDIT = { ID: 'scene_profile_edit' };
export const QUIZ = { ID: 'scene_quiz' };
export const HISTORY = { ID: 'scene_history' };
export const SETTINGS = { ID: 'scene_settings' };
export const API_KEY = { ID: 'scene_api_key_entry' };

export const GLOBAL_NAV = {
  LINK_KB: 'nav_link_knowledge_base',
  LINK_CHAT: 'nav_link_chat',
  LINK_PLAN: 'nav_link_my_plan',
  LINK_PROFILE: 'nav_link_profile',
  LOGO: 'nav_logo_home'
};
