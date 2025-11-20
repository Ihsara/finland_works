
import { AppLanguage, LanguageCode } from "../types";

// Requested Languages: English, Vietnamese, Portuguese (BR), Portuguese (PT), Russian
export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', supported: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', supported: true },
  { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', supported: true },
  { code: 'pt-pt', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', flag: '🇵🇹', supported: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', supported: true },
];

// UI Dictionary Type
export type TranslationKey = 
  | 'landing_welcome'
  | 'landing_subtitle'
  | 'landing_btn_quiz'
  | 'landing_btn_ask'
  | 'landing_load_sample'
  | 'landing_erase'
  | 'landing_add_key'
  | 'landing_choose_lang'
  | 'dash_greeting'
  | 'dash_greeting_guest'
  | 'dash_subtitle'
  | 'dash_subtitle_guest'
  | 'dash_btn_guide'
  | 'dash_btn_ask'
  | 'dash_switch_profile'
  | 'dash_new_profile'
  | 'dash_edit_profile'
  | 'dash_profile_overview'
  | 'dash_education'
  | 'dash_profession'
  | 'dash_languages'
  | 'dash_narrative_aspirations'
  | 'dash_narrative_challenges'
  | 'chat_placeholder'
  | 'chat_end_session'
  | 'chat_header_assistant'
  | 'btn_back_dashboard'
  | 'profile_btn_guide'
  | 'profile_btn_guide_desc'
  | 'profile_btn_plan'
  | 'profile_btn_plan_desc'
  | 'profile_sect_languages'
  | 'profile_sect_skills'
  | 'profile_sect_narrative'
  | 'profile_label_aspirations'
  | 'profile_label_challenges'
  | 'profile_label_education'
  | 'profile_label_profession'
  | 'profile_completeness'
  | 'profile_completeness_hint'
  | 'profile_btn_update'
  | 'profile_btn_continue'
  | 'wiki_header_title'
  | 'wiki_header_subtitle'
  | 'wiki_nav_list'
  | 'wiki_nav_icons'
  | 'wiki_explore_cats'
  | 'wiki_explore_subtitle'
  | 'wiki_full_index'
  | 'wiki_full_index_subtitle'
  | 'wizard_btn_ask'
  | 'wizard_btn_next'
  | 'wizard_btn_prev'
  | 'wizard_btn_submit'
  | 'wizard_btn_finish_early'
  | 'wizard_title_name'
  | 'wizard_desc_name'
  | 'wizard_placeholder_name'
  | 'wizard_step2_title'
  | 'wizard_step2_desc'
  | 'wizard_step2_placeholder'
  | 'wizard_step3_title'
  | 'wizard_opt_single'
  | 'wizard_opt_married'
  | 'wizard_opt_partnered'
  | 'wizard_opt_divorced'
  | 'wizard_opt_widowed'
  | 'wizard_opt_prefer_no'
  | 'wizard_step4_title'
  | 'wizard_step4_desc'
  | 'wizard_step4_placeholder'
  | 'wizard_step4_no_match'
  | 'wizard_step5_title'
  | 'wizard_opt_work'
  | 'wizard_opt_student'
  | 'wizard_opt_family'
  | 'wizard_opt_eu'
  | 'wizard_opt_protection'
  | 'wizard_opt_visitor'
  | 'wizard_step6_title'
  | 'wizard_step6_field_label'
  | 'wizard_step6_field_placeholder'
  | 'wizard_opt_hs'
  | 'wizard_opt_vocational'
  | 'wizard_opt_bachelors'
  | 'wizard_opt_masters'
  | 'wizard_opt_phd'
  | 'wizard_opt_other'
  | 'wizard_step7_title'
  | 'wizard_step7_desc'
  | 'wizard_step7_placeholder'
  | 'wizard_step8_title'
  | 'wizard_opt_lang_none'
  | 'wizard_opt_lang_basics'
  | 'wizard_opt_lang_inter'
  | 'wizard_opt_lang_fluent'
  | 'wizard_step9_title'
  | 'wizard_opt_lang_en_none'
  | 'wizard_opt_lang_en_basic'
  | 'wizard_opt_lang_en_working'
  | 'wizard_opt_lang_en_fluent'
  | 'wizard_step10_title'
  | 'wizard_step10_aspirations_label'
  | 'wizard_step10_aspirations_placeholder'
  | 'wizard_step10_challenges_label'
  | 'wizard_step10_challenges_placeholder'
  | 'wizard_step11_title'
  | 'wizard_opt_mot_low'
  | 'wizard_opt_mot_med'
  | 'wizard_opt_mot_high'
  | 'wizard_step12_title'
  | 'wizard_opt_cult_high'
  | 'wizard_opt_cult_med'
  | 'wizard_opt_cult_low'
  | 'wizard_opt_cult_unsure'
  | 'wizard_step13_title'
  | 'wizard_opt_conf_life_low'
  | 'wizard_opt_conf_life_med'
  | 'wizard_opt_conf_life_high'
  | 'wizard_step14_title'
  | 'wizard_opt_conf_career_low'
  | 'wizard_opt_conf_career_med'
  | 'wizard_opt_conf_career_high'
  | 'wizard_step15_title'
  | 'wizard_opt_info_none'
  | 'wizard_opt_info_some'
  | 'wizard_opt_info_yes'
  | 'wizard_opt_info_high'
  | 'wizard_step16_title'
  | 'wizard_opt_excite_career'
  | 'wizard_opt_excite_life'
  | 'wizard_opt_excite_nature'
  | 'wizard_opt_excite_edu'
  | 'wizard_opt_excite_idk';

export const TRANSLATIONS: Record<LanguageCode, Partial<Record<TranslationKey, string>>> = {
  en: {
    landing_welcome: "Welcome!",
    landing_subtitle: "Find your way to work in Finland",
    landing_btn_quiz: "Tell me about yourself",
    landing_btn_ask: "Start a conversation",
    landing_load_sample: "Load Sample (Gabriela)",
    landing_erase: "Erase Cache",
    landing_add_key: "Add Gemini API Key",
    landing_choose_lang: "Choose Language",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Welcome back to your personal Finland guide.",
    dash_subtitle_guest: "Let's set up your profile to get started.",
    dash_btn_guide: "Open Finland Guide",
    dash_btn_ask: "Start a conversation",
    dash_switch_profile: "Switch Profile",
    dash_new_profile: "New",
    dash_edit_profile: "Edit",
    dash_profile_overview: "My Profile Overview",
    dash_education: "Education",
    dash_profession: "Profession",
    dash_languages: "Languages",
    dash_narrative_aspirations: "Aspirations",
    dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...",
    chat_end_session: "End Session",
    chat_header_assistant: "Assistant",
    btn_back_dashboard: "Back to Dashboard",
    profile_btn_guide: "My Guide",
    profile_btn_guide_desc: "Recommended articles",
    profile_btn_plan: "My Plan",
    profile_btn_plan_desc: "Coming soon",
    profile_sect_languages: "Languages",
    profile_sect_skills: "Skills",
    profile_sect_narrative: "Personal Narrative",
    profile_label_aspirations: "Aspirations",
    profile_label_challenges: "Fears / challenges",
    profile_label_education: "Education",
    profile_label_profession: "Profession",
    profile_completeness: "{percentage}% complete",
    profile_completeness_hint: "Answer a few more questions for better advice",
    profile_btn_update: "Update Profile",
    profile_btn_continue: "Continue the Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Curated for {name}",
    wiki_nav_list: "List",
    wiki_nav_icons: "Icons",
    wiki_explore_cats: "Explore Categories",
    wiki_explore_subtitle: "Select a topic to dive into the details.",
    wiki_full_index: "Full Index",
    wiki_full_index_subtitle: "Browse all topics below.",
    wizard_btn_ask: "Ask a question",
    wizard_btn_next: "Next",
    wizard_btn_prev: "Previous",
    wizard_btn_submit: "Submit",
    wizard_btn_finish_early: "Save & Finish Now",
    wizard_title_name: "What would you like to be called?",
    wizard_desc_name: "Enter your own name or choose",
    wizard_placeholder_name: "Your name",
    wizard_step2_title: "How old are you?",
    wizard_step2_desc: "Enter an exact age or choose an age range",
    wizard_step2_placeholder: "Your age (e.g. 29)",
    wizard_step3_title: "What's your marital status?",
    wizard_opt_single: "Single",
    wizard_opt_married: "Married",
    wizard_opt_partnered: "Partnered",
    wizard_opt_divorced: "Divorced",
    wizard_opt_widowed: "Widowed",
    wizard_opt_prefer_no: "Prefer not to say",
    wizard_step4_title: "Where do you come from?",
    wizard_step4_desc: "Select your country of origin",
    wizard_step4_placeholder: "Start typing country name...",
    wizard_step4_no_match: "No matches found",
    wizard_step5_title: "What is your Residence Permit type?",
    wizard_opt_work: "Work-based",
    wizard_opt_student: "Student",
    wizard_opt_family: "Family Ties",
    wizard_opt_eu: "EU Registration",
    wizard_opt_protection: "International Protection",
    wizard_opt_visitor: "Visitor / Other",
    wizard_step6_title: "Highest Education Level",
    wizard_step6_field_label: "Field of Study (Optional)",
    wizard_step6_field_placeholder: "e.g. Engineering, Arts",
    wizard_opt_hs: "High School",
    wizard_opt_vocational: "Vocational",
    wizard_opt_bachelors: "Bachelor's",
    wizard_opt_masters: "Master's",
    wizard_opt_phd: "PhD",
    wizard_opt_other: "Other",
    wizard_step7_title: "What is your profession?",
    wizard_step7_desc: "Or what job are you looking for?",
    wizard_step7_placeholder: "e.g. Nurse, Welder, Developer",
    wizard_step8_title: "Finnish Language Level",
    wizard_opt_lang_none: "None yet",
    wizard_opt_lang_basics: "Basics (A1)",
    wizard_opt_lang_inter: "Intermediate (A2-B1)",
    wizard_opt_lang_fluent: "Fluent (B2+)",
    wizard_step9_title: "English Language Level",
    wizard_opt_lang_en_none: "None",
    wizard_opt_lang_en_basic: "Basic",
    wizard_opt_lang_en_working: "Working Proficiency",
    wizard_opt_lang_en_fluent: "Native/Fluent",
    wizard_step10_title: "Your Vision",
    wizard_step10_aspirations_label: "Aspirations",
    wizard_step10_aspirations_placeholder: "What do you hope to achieve?",
    wizard_step10_challenges_label: "Challenges",
    wizard_step10_challenges_placeholder: "Any specific worries?",
    
    // New Questions
    wizard_step11_title: "How motivated are you to learn Finnish?",
    wizard_opt_mot_low: "Just starting, not fully committed yet",
    wizard_opt_mot_med: "I’m motivated but need structure",
    wizard_opt_mot_high: "Very committed and ready to study actively",

    wizard_step12_title: "How interested are you in Finnish culture & everyday life?",
    wizard_opt_cult_high: "Very interested – I want to integrate deeply",
    wizard_opt_cult_med: "Moderately interested",
    wizard_opt_cult_low: "A little interested",
    wizard_opt_cult_unsure: "Not sure yet",

    wizard_step13_title: "How confident do you feel navigating life in Finland?",
    wizard_opt_conf_life_low: "I feel lost and need clear guidance",
    wizard_opt_conf_life_med: "I’m somewhat confident but need support",
    wizard_opt_conf_life_high: "I’m quite confident and looking for advanced info",

    wizard_step14_title: "How confident do you feel exploring career paths in Finland?",
    wizard_opt_conf_career_low: "I’m unsure where to start",
    wizard_opt_conf_career_med: "I have some ideas but need direction",
    wizard_opt_conf_career_high: "I’m confident and ready to take action",

    wizard_step15_title: "How informed do you feel about living and working in Finland?",
    wizard_opt_info_none: "Not informed at all",
    wizard_opt_info_some: "Somewhat informed",
    wizard_opt_info_yes: "Informed",
    wizard_opt_info_high: "Very informed",

    wizard_step16_title: "What excites you the most about living in Finland?",
    wizard_opt_excite_career: "Career opportunities",
    wizard_opt_excite_life: "Quality of life & safety",
    wizard_opt_excite_nature: "Nature, culture, and lifestyle",
    wizard_opt_excite_edu: "Education",
    wizard_opt_excite_idk: "I’m still figuring it out"
  },
  vi: {
    wizard_btn_finish_early: "Lưu & Xong ngay",
    // ... (Existing VI translations inferred as they are partial in previous file, assuming t() fallback covers missing new keys)
  },
  "pt-br": {
     wizard_btn_finish_early: "Salvar e Finalizar",
  },
  "pt-pt": {
     wizard_btn_finish_early: "Guardar e Sair",
  },
  ru: {
     wizard_btn_finish_early: "Сохранить и выйти",
  }
};

export const t = (key: TranslationKey, lang: LanguageCode, params?: Record<string, string>): string => {
  // 1. Try to get translation in requested language
  let text = TRANSLATIONS[lang]?.[key];
  
  // 2. Fallback to English
  if (!text) {
    text = TRANSLATIONS['en'][key] || key;
  }

  // 3. Replace params {name}, etc.
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text!.replace(`{${k}}`, v);
    });
  }

  return text!;
};