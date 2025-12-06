
/**
 * Unique Identifier System (UIS) Registry
 * 
 * This file contains the Single Source of Truth for all automated testing IDs,
 * accessibility relationships, and scene management references.
 * 
 * Structure:
 * - SCENES: Top-level page containers.
 * - COMPONENTS: Reusable UI widgets.
 * - VIEWS: Specific view-local elements organized by Scene.
 */

export const APP_IDS = {
  // --- ROOTS ---
  ROOT: 'root',
  LAYOUT_CONTAINER: 'layout_container',

  // --- SCENES (Top Level Views) ---
  SCENES: {
    LANDING: 'scene_landing',
    DASHBOARD: 'scene_dashboard',
    CHAT: 'scene_chat',
    PROFILE: 'scene_profile',
    PROFILE_EDIT: 'scene_profile_edit',
    QUIZ: 'scene_quiz', // Wizard
    WIKI: 'scene_wiki',
    HISTORY: 'scene_history',
    CV_IMPORT: 'scene_cv_import',
    SETTINGS: 'scene_settings',
    API_KEY: 'scene_api_key_entry'
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
  VIEWS: {
    LANDING: {
      HERO_TITLE: 'landing_hero_title',
      BTN_QUIZ: 'btn_landing_start_quiz',
      BTN_CONTINUE: 'btn_landing_continue',
      BTN_CHAT: 'btn_landing_start_chat',
      BTN_BROWSE: 'btn_landing_browse',
      LINK_SAMPLE: 'link_landing_load_sample',
      LINK_RESET: 'link_landing_reset_data',
      LINK_KEY: 'link_landing_add_key'
    },
    DASHBOARD: {
      AVATAR: 'dashboard_avatar_main',
      PROGRESS_BAR: 'dashboard_progress_bar',
      BTN_GUIDE: 'btn_dashboard_guide',
      BTN_CHAT: 'btn_dashboard_chat',
      BTN_HISTORY: 'btn_dashboard_history',
      BTN_CV: 'btn_dashboard_cv_import',
      BTN_SETTINGS: 'btn_dashboard_settings'
    },
    CHAT: {
      MSG_LIST: 'chat_message_list',
      INPUT_FIELD: 'input_chat_message',
      BTN_SEND: 'btn_chat_send',
      BTN_END: 'btn_chat_end_session'
    },
    WIKI: {
      SIDEBAR: 'wiki_sidebar',
      CONTENT_AREA: 'wiki_content_area',
      BTN_TOGGLE_VIEW: 'btn_wiki_toggle_view',
      CARD_CATEGORY: (id: string) => `card_wiki_cat_${id}`,
      ITEM_ARTICLE: (id: string) => `item_wiki_article_${id}`,
      BTN_MARK_DONE: 'btn_wiki_mark_done',
      BTN_MARK_LATER: 'btn_wiki_mark_later'
    },
    CV_IMPORT: {
      INPUT_TEXT: 'input_cv_text',
      BTN_ANALYZE: 'btn_cv_analyze',
      INPUT_API_KEY: 'input_cv_api_key'
    }
  }
} as const;
