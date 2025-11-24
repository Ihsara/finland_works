
import { AppLanguage, LanguageCode } from "../types";

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', supported: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', supported: true },
  // Ordered by approximate speaker population in Finland / Strategic Importance
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', supported: true },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti keel', flag: '🇪🇪', supported: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', supported: true, rtl: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', supported: true },
  { code: 'so', name: 'Somali', nativeName: 'Af-Soomaali', flag: '🇸🇴', supported: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', supported: true, rtl: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🇹🇯', supported: true, rtl: true }, // Flag approximation
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', supported: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', supported: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', supported: true },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', supported: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', supported: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', supported: true },
  { code: 'pt-br', name: 'Portuguese (BR)', nativeName: 'Português (BR)', flag: '🇧🇷', supported: true },
  { code: 'pt-pt', name: 'Portuguese (PT)', nativeName: 'Português (PT)', flag: '🇵🇹', supported: true },
];

export type TranslationKey = 
  | 'landing_welcome' | 'landing_subtitle' | 'landing_btn_quiz' | 'landing_btn_continue' | 'landing_btn_ask' | 'landing_btn_browse' | 'landing_load_sample' | 'landing_erase' | 'landing_add_key' | 'landing_choose_lang'
  | 'dash_greeting' | 'dash_greeting_guest' | 'dash_subtitle' | 'dash_subtitle_guest' | 'dash_btn_guide' | 'dash_btn_browse' | 'dash_btn_ask' | 'dash_btn_history' | 'dash_btn_cv' | 'dash_switch_profile' | 'dash_new_profile' | 'dash_edit_profile' | 'dash_profile_overview'
  | 'dash_education' | 'dash_profession' | 'dash_languages' | 'dash_narrative_aspirations' | 'dash_narrative_challenges'
  | 'chat_placeholder' | 'chat_end_session' | 'chat_header_assistant' | 'chat_prompt_context_inquiry' | 'chat_ask_length'
  | 'btn_back_dashboard' | 'btn_save'
  | 'profile_btn_guide' | 'profile_btn_guide_desc' | 'profile_btn_plan' | 'profile_btn_plan_desc' | 'profile_sect_languages' | 'profile_sect_skills' | 'profile_sect_narrative' | 'profile_label_aspirations' | 'profile_label_challenges' | 'profile_label_education' | 'profile_label_profession' | 'profile_completeness' | 'profile_completeness_hint' | 'profile_btn_update' | 'profile_btn_continue'
  | 'wiki_header_title' | 'wiki_header_subtitle' | 'wiki_nav_list' | 'wiki_nav_icons' | 'wiki_explore_cats' | 'wiki_explore_subtitle' | 'wiki_full_index' | 'wiki_full_index_subtitle' | 'wiki_section_chapters' | 'wiki_btn_saved' | 'wiki_btn_later' | 'wiki_btn_completed' | 'wiki_btn_mark_done' | 'wiki_ctx_ask' | 'wiki_topic_label' | 'wiki_topic_desc' | 'wiki_guide_prefix' | 'wiki_stat_articles' | 'wiki_stat_complete' | 'wiki_section_prefix'
  | 'wizard_header_quiz' | 'wizard_greeting_short' | 'wizard_title_init' | 'wizard_title_custom' | 'wizard_phase_identity' | 'wizard_phase_demo' | 'wizard_phase_status' | 'wizard_phase_skills' | 'wizard_phase_mindset' | 'wizard_phase_vision' | 'wizard_nickname_hint' | 'wizard_btn_ask' | 'wizard_btn_next' | 'wizard_btn_prev' | 'wizard_btn_submit' | 'wizard_btn_finish_early' | 'wizard_btn_generate_name' | 'wizard_ribbon_greeting' | 'wizard_title_name' | 'wizard_desc_name' | 'wizard_placeholder_name'
  | 'wizard_step2_title' | 'wizard_step2_desc' | 'wizard_step2_placeholder' | 'wizard_step3_title'
  | 'wizard_marital_solo_title' | 'wizard_marital_solo_desc' | 'wizard_marital_pair_title' | 'wizard_marital_pair_desc' | 'wizard_marital_secret_title' | 'wizard_marital_secret_desc'
  | 'wizard_children_title' | 'wizard_children_desc' | 'wizard_children_yes' | 'wizard_children_no' | 'wizard_family_details_title' | 'wizard_family_count_label' | 'wizard_family_ages_label' | 'wizard_family_ages_hint' | 'wizard_age_group_0_6' | 'wizard_age_group_7_12' | 'wizard_age_group_13_17' | 'wizard_age_group_18'
  | 'wizard_step4_title' | 'wizard_step4_desc' | 'wizard_step4_placeholder' | 'wizard_step4_no_match' | 'wizard_btn_search_country' | 'wizard_btn_select_region' | 'wizard_region_europe' | 'wizard_region_americas' | 'wizard_region_asia' | 'wizard_region_africa' | 'wizard_region_oceania' | 'wizard_region_middle_east' | 'wizard_eu_question' | 'wizard_eu_yes' | 'wizard_eu_no'
  | 'wizard_step5_title' | 'wizard_permit_full_title' | 'wizard_permit_full_desc' | 'wizard_permit_restricted_title' | 'wizard_permit_restricted_desc' | 'wizard_permit_student_title' | 'wizard_permit_student_desc'
  | 'wizard_step6_title' | 'wizard_step6_desc' | 'wizard_step6_field_label' | 'wizard_step6_field_placeholder' | 'wizard_edu_general_title' | 'wizard_edu_general_desc' | 'wizard_edu_applied_title' | 'wizard_edu_applied_desc' | 'wizard_edu_uni_title' | 'wizard_edu_uni_desc'
  | 'wizard_step7_title' | 'wizard_step7_desc' | 'wizard_step7_placeholder'
  | 'wizard_step8_title' | 'wizard_lbl_finnish_level' | 'wizard_lbl_finnish_motivation' | 'wizard_opt_lang_none' | 'wizard_opt_lang_basics' | 'wizard_opt_lang_inter' | 'wizard_opt_lang_fluent' | 'wizard_scale_1_motivation' | 'wizard_scale_5_motivation'
  | 'wizard_step9_title' | 'wizard_opt_lang_en_none' | 'wizard_opt_lang_en_basic' | 'wizard_opt_lang_en_working' | 'wizard_opt_lang_en_fluent'
  | 'wizard_step10_title' | 'wizard_step10_aspirations_label' | 'wizard_step10_aspirations_placeholder' | 'wizard_step10_challenges_label' | 'wizard_step10_challenges_placeholder'
  | 'wizard_step12_title' | 'wizard_opt_cult_high' | 'wizard_opt_cult_med' | 'wizard_opt_cult_low'
  | 'wizard_step13_title' | 'wizard_scale_1_life' | 'wizard_scale_5_life'
  | 'wizard_step14_title' | 'wizard_scale_1_career' | 'wizard_scale_5_career'
  | 'wizard_step15_title' | 'wizard_opt_info_none' | 'wizard_opt_info_some' | 'wizard_opt_info_high'
  | 'wizard_step16_title' | 'wizard_opt_excite_career' | 'wizard_opt_excite_life' | 'wizard_opt_excite_nature' | 'wizard_opt_excite_adventure'
  | 'wizard_rating_winter' | 'wizard_rating_thaw' | 'wizard_rating_growth' | 'wizard_rating_bloom' | 'wizard_rating_summer'
  | 'history_title' | 'history_empty' | 'history_tab_summary' | 'history_tab_transcript' | 'history_no_summary' | 'history_generating' | 'history_generating_desc'
  | 'cv_title' | 'cv_subtitle' | 'cv_placeholder' | 'cv_btn_analyze' | 'cv_btn_processing' | 'cv_warning_key' | 'cv_key_update' | 'cv_key_required' | 'cv_key_desc' | 'cv_key_placeholder' | 'cv_key_save' | 'cv_alert_success' | 'cv_alert_error' | 'cv_btn_manage_key'
  | 'settings_title' | 'settings_sect_general' | 'settings_sect_appearance' | 'settings_sect_data' | 'settings_length_label' | 'settings_theme_label' | 'settings_theme_system' | 'settings_theme_light' | 'settings_theme_dark' | 'settings_opt_ask' | 'settings_opt_short' | 'settings_opt_long' | 'settings_clear_data' | 'settings_clear_data_desc' | 'settings_btn_clear';

const EN_DEFAULTS: Record<TranslationKey, string> = {
    landing_welcome: "Welcome!", landing_subtitle: "Find your way to work in Finland", landing_btn_quiz: "Tell me about yourself", landing_btn_continue: "Explore My Guide", landing_btn_ask: "Start a conversation", landing_btn_browse: "Browse the Guide", landing_load_sample: "Load Sample", landing_erase: "Erase Cache", landing_add_key: "Add Gemini API Key", landing_choose_lang: "Choose Language",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Welcome back to your personal Finland guide.", dash_subtitle_guest: "Let's set up your profile to get started.", dash_btn_guide: "Open My Guide", dash_btn_browse: "Browse Guide", dash_btn_ask: "Start a conversation", dash_btn_history: "Past Conversations", dash_btn_cv: "Import CV", dash_switch_profile: "Switch Profile", dash_new_profile: "New", dash_edit_profile: "Edit", dash_profile_overview: "My Profile Overview",
    dash_education: "Education", dash_profession: "Profession", dash_languages: "Languages", dash_narrative_aspirations: "Aspirations", dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...", chat_end_session: "End Session", chat_header_assistant: "Assistant", chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"", chat_ask_length: "Should I keep it brief, or would you like the full details?",
    btn_back_dashboard: "Back to Dashboard", btn_save: "Save",
    profile_btn_guide: "My Guide", profile_btn_guide_desc: "Recommended articles", profile_btn_plan: "My Plan", profile_btn_plan_desc: "Coming soon", profile_sect_languages: "Languages", profile_sect_skills: "Skills", profile_sect_narrative: "Personal Narrative", profile_label_aspirations: "Aspirations", profile_label_challenges: "Fears / challenges", profile_label_education: "Education", profile_label_profession: "Profession", profile_completeness: "{percentage}% complete", profile_completeness_hint: "Answer a few more questions for better advice", profile_btn_update: "Update Profile", profile_btn_continue: "Continue the Quiz",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Curated for {name}", wiki_nav_list: "List", wiki_nav_icons: "Icons", wiki_explore_cats: "Explore Categories", wiki_explore_subtitle: "Select a topic to dive into the details.", wiki_full_index: "Full Index", wiki_full_index_subtitle: "Browse all topics below.", wiki_section_chapters: "Chapters", wiki_btn_saved: "Saved", wiki_btn_later: "Later", wiki_btn_completed: "Completed", wiki_btn_mark_done: "Mark Done", wiki_ctx_ask: "Start a chat with this sentence", wiki_topic_label: "Topic: {tag}", wiki_topic_desc: "Topic Overview & Related Articles", wiki_guide_prefix: "GUIDE", wiki_stat_articles: "Articles", wiki_stat_complete: "Complete", wiki_section_prefix: "Section",
    wizard_header_quiz: "Quiz", wizard_greeting_short: "Hi, {name}!", wizard_title_init: "Create Your Profile", wizard_title_custom: "{name} Character Creation", wizard_phase_identity: "PHASE 1: IDENTITY", wizard_phase_demo: "PHASE 2: BACKGROUND", wizard_phase_status: "PHASE 3: STATUS", wizard_phase_skills: "PHASE 4: SKILLS", wizard_phase_mindset: "PHASE 5: MINDSET", wizard_phase_vision: "PHASE 6: VISION", wizard_nickname_hint: "* You can use a generated nickname to stay anonymous.", wizard_btn_ask: "Ask a question", wizard_btn_next: "Next", wizard_btn_prev: "Previous", wizard_btn_submit: "Submit", wizard_btn_finish_early: "Save & Finish Now", wizard_btn_generate_name: "Give me a nickname!", wizard_ribbon_greeting: "Nice to meet you, {name}!", wizard_title_name: "What would you like to be called?", wizard_desc_name: "Enter your own name or choose", wizard_placeholder_name: "Your name",
    wizard_step2_title: "How old are you?", wizard_step2_desc: "Select your age group", wizard_step2_placeholder: "Your age (e.g. 29)",
    wizard_step3_title: "What's your marital status?", wizard_marital_solo_title: "Flying Solo", wizard_marital_solo_desc: "Single, divorced, or widowed", wizard_marital_pair_title: "Partnered Up", wizard_marital_pair_desc: "Married or partnered", wizard_marital_secret_title: "It's a Mystery", wizard_marital_secret_desc: "It's complicated / secret",
    wizard_children_title: "Do you have children?", wizard_children_desc: "This helps us give relevant advice about schools and daycare.", wizard_children_yes: "Yes", wizard_children_no: "No", wizard_family_details_title: "Tell us about your family", wizard_family_count_label: "How many children?", wizard_family_ages_label: "What age groups are they in?", wizard_family_ages_hint: "Select all that apply. This changes the advice for schools.", wizard_age_group_0_6: "Daycare (0-6)", wizard_age_group_7_12: "School (7-12)", wizard_age_group_13_17: "Teens (13-17)", wizard_age_group_18: "Adults (18+)",
    wizard_step4_title: "Where do you come from?", wizard_step4_desc: "Select your origin", wizard_step4_placeholder: "Start typing country name...", wizard_step4_no_match: "No matches found", wizard_btn_search_country: "Search Country", wizard_btn_select_region: "Select Region", wizard_region_europe: "Europe", wizard_region_americas: "Americas", wizard_region_asia: "Asia", wizard_region_africa: "Africa", wizard_region_oceania: "Oceania", wizard_region_middle_east: "Middle East", wizard_eu_question: "EU/EEA Citizen?", wizard_eu_yes: "Yes", wizard_eu_no: "No",
    wizard_step5_title: "Working Rights & Permit", wizard_permit_full_title: "Unlimited Rights", wizard_permit_full_desc: "Permanent, Family, EU, or Finnish Degree", wizard_permit_restricted_title: "Sector Restricted", wizard_permit_restricted_desc: "Work Permit tied to a specific field/employer", wizard_permit_student_title: "Student Permit", wizard_permit_student_desc: "Limited hours allowed alongside studies",
    wizard_step6_title: "Highest Education Level", wizard_step6_desc: "Which path best describes your background?", wizard_step6_field_label: "Field of Study (Optional)", wizard_step6_field_placeholder: "e.g. Engineering, Arts", wizard_edu_general_title: "General Education", wizard_edu_general_desc: "High School / Lukio only. No trade qualification.", wizard_edu_applied_title: "Vocational & Applied", wizard_edu_applied_desc: "Trade School (Amis) or Applied Sciences (AMK).", wizard_edu_uni_title: "University Degree", wizard_edu_uni_desc: "Academic degree (Bachelor's, Master's, PhD).",
    wizard_step7_title: "What is your profession?", wizard_step7_desc: "Or what job are you looking for?", wizard_step7_placeholder: "e.g. Nurse, Welder, Developer",
    wizard_step8_title: "Finnish Language", wizard_lbl_finnish_level: "Current Level", wizard_lbl_finnish_motivation: "Motivation to Learn", wizard_opt_lang_none: "None yet", wizard_opt_lang_basics: "Basics (A1)", wizard_opt_lang_inter: "Intermediate (A2-B1)", wizard_opt_lang_fluent: "Fluent (B2+)", wizard_scale_1_motivation: "Curious", wizard_scale_5_motivation: "Unstoppable",
    wizard_step9_title: "English Language Level", wizard_opt_lang_en_none: "None", wizard_opt_lang_en_basic: "Basic", wizard_opt_lang_en_working: "Working Proficiency", wizard_opt_lang_en_fluent: "Native/Fluent",
    wizard_step10_title: "Your Vision", wizard_step10_aspirations_label: "Aspirations", wizard_step10_aspirations_placeholder: "What do you hope to achieve?", wizard_step10_challenges_label: "Challenges", wizard_step10_challenges_placeholder: "Any specific worries?",
    wizard_step12_title: "How does Finnish culture feel to you right now?", wizard_opt_cult_low: "It's a beautiful mystery", wizard_opt_cult_med: "I'm happily observing", wizard_opt_cult_high: "I'm diving in deep",
    wizard_step13_title: "How are you finding the rhythm of life here?", wizard_scale_1_life: "Still thawing", wizard_scale_5_life: "Feels like home",
    wizard_step14_title: "How confident are you in your job search?", wizard_scale_1_career: "I need direction", wizard_scale_5_career: "I have a plan",
    wizard_step15_title: "How clear is your path forward?", wizard_opt_info_none: "It's a bit foggy", wizard_opt_info_some: "The clouds are clearing", wizard_opt_info_high: "Crystal clear",
    wizard_step16_title: "What brings you the most joy here?", wizard_opt_excite_career: "Building my career", wizard_opt_excite_life: "The peace & safety", wizard_opt_excite_nature: "Nature & seasons", wizard_opt_excite_adventure: "Just being on an adventure",
    wizard_rating_winter: "Winter", wizard_rating_thaw: "Thaw", wizard_rating_growth: "Growth", wizard_rating_bloom: "Bloom", wizard_rating_summer: "Summer",
    history_title: "Past Conversations", history_empty: "No conversations recorded yet.", history_tab_summary: "Summary (AI)", history_tab_transcript: "Transcript", history_no_summary: "No summary available for this conversation.", history_generating: "AI is writing summary...", history_generating_desc: "This happens in the background. You can check back in a few seconds.",
    cv_title: "Analyze CV", cv_subtitle: "Paste your CV text to automatically update your profile.", cv_placeholder: "Paste your CV/Resume text here...", cv_btn_analyze: "Analyze & Import", cv_btn_processing: "Processing...", cv_warning_key: "Personalized API Key required.", cv_key_update: "Update API Key", cv_key_required: "API Key Required", cv_key_desc: "To analyze your CV securely, please provide your own Google Gemini API key. It is stored locally on your device.", cv_key_placeholder: "Paste API Key here...", cv_key_save: "Save Key", cv_alert_success: "API Key saved successfully.", cv_alert_error: "Failed to analyze CV. Please try again or check your API key validity.", cv_btn_manage_key: "API Key",
    settings_title: "Settings", settings_sect_general: "General", settings_sect_appearance: "Appearance", settings_sect_data: "Data & Privacy", settings_length_label: "Answer Length", settings_theme_label: "Theme", settings_theme_system: "System Default", settings_theme_light: "Light", settings_theme_dark: "Dark", settings_opt_ask: "Always Ask Me", settings_opt_short: "Short & Concise", settings_opt_long: "Detailed", settings_clear_data: "Reset Application Data", settings_clear_data_desc: "This will erase all profiles, history, and keys.", settings_btn_clear: "Reset Everything"
};

const createTranslations = (overrides: Partial<Record<TranslationKey, string>>) => ({
  ...EN_DEFAULTS,
  ...overrides
});

export const TRANSLATIONS: Record<LanguageCode, Partial<Record<TranslationKey, string>>> = {
  en: EN_DEFAULTS,
  fi: createTranslations({
    landing_welcome: "Tervetuloa!",
    landing_subtitle: "Löydä polkusi työhön Suomessa",
    landing_btn_quiz: "Kerro itsestäsi",
    landing_btn_continue: "Avaa oppaani",
    landing_btn_ask: "Aloita keskustelu",
    landing_btn_browse: "Selaa opasta",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Tervetuloa takaisin henkilökohtaiseen oppaaseesi.",
    dash_btn_guide: "Avaa opas",
    dash_btn_browse: "Selaa opasta",
    dash_btn_ask: "Kysy tekoälyltä",
    wizard_title_init: "Luo profiilisi",
    wizard_title_name: "Mikä on nimesi?",
    wizard_btn_next: "Seuraava",
    wizard_btn_prev: "Edellinen",
    // New
    wizard_step10_title: "Visiosi",
    wizard_step10_aspirations_label: "Tavoitteet",
    wizard_step10_aspirations_placeholder: "Mitä toivot saavuttavasi?",
    wizard_step10_challenges_label: "Haasteet",
    wizard_step10_challenges_placeholder: "Huolestuttaako jokin?",
    history_title: "Historia",
    cv_title: "CV-analyysi",
    settings_title: "Asetukset",
    btn_back_dashboard: "Takaisin"
  }),
  th: createTranslations({
    landing_welcome: "ยินดีต้อนรับ!",
    landing_subtitle: "ค้นหาเส้นทางสู่อาชีพในฟินแลนด์",
    landing_btn_quiz: "เล่าเกี่ยวกับตัวคุณ",
    landing_btn_continue: "สำรวจคู่มือ",
    landing_btn_ask: "เริ่มบทสนทนา",
    landing_btn_browse: "เรียกดูคู่มือ",
    dash_greeting: "สวัสดี {name}!",
    dash_greeting_guest: "สวัสดี!",
    dash_subtitle: "ยินดีต้อนรับกลับสู่คู่มือส่วนตัวของคุณ",
    dash_btn_guide: "เปิดคู่มือ",
    dash_btn_browse: "เรียกดูคู่มือ",
    dash_btn_ask: "ถาม AI",
    wizard_title_init: "สร้างโปรไฟล์ของคุณ",
    wizard_title_name: "คุณชื่ออะไร?",
    wizard_btn_next: "ถัดไป",
    wizard_btn_prev: "ก่อนหน้า",
    // New
    wizard_step10_title: "วิสัยทัศน์ของคุณ",
    wizard_step10_aspirations_label: "ความมุ่งหวัง",
    wizard_step10_aspirations_placeholder: "คุณหวังว่าจะบรรลุอะไร?",
    wizard_step10_challenges_label: "ความท้าทาย",
    wizard_step10_challenges_placeholder: "มีความกังวลอะไรเป็นพิเศษไหม?",
    history_title: "ประวัติ",
    cv_title: "วิเคราะห์ CV",
    settings_title: "การตั้งค่า",
    btn_back_dashboard: "ย้อนกลับ"
  }),
  et: createTranslations({
    landing_welcome: "Tere tulemast!",
    landing_subtitle: "Sinu tee tööle Soomes",
    landing_btn_quiz: "Räägi endast",
    landing_btn_continue: "Ava minu teejuht",
    landing_btn_ask: "Alusta vestlust",
    landing_btn_browse: "Sirvi teatmikku",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Tere tulemast tagasi oma isiklikku teejuhisesse.",
    dash_btn_guide: "Ava teejuht",
    dash_btn_ask: "Küsi AI-lt",
    wizard_title_init: "Loo oma profiil",
    wizard_title_name: "Kuidas sind kutsuda?",
    wizard_btn_next: "Edasi",
    wizard_btn_prev: "Tagasi"
  }),
  ru: createTranslations({
    landing_welcome: "Добро пожаловать!",
    landing_subtitle: "Ваш путь к работе в Финляндии",
    landing_btn_quiz: "Расскажите о себе",
    landing_btn_continue: "Открыть гид",
    landing_btn_ask: "Начать чат",
    landing_btn_browse: "Читать гид",
    landing_load_sample: "Загрузить пример",
    landing_erase: "Сброс данных",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Добро пожаловать в ваш персональный гид.",
    dash_btn_guide: "Открыть гид",
    dash_btn_ask: "Спросить AI",
    wizard_title_init: "Создать профиль",
    wizard_btn_next: "Далее",
    wizard_btn_prev: "Назад"
  }),
  ar: createTranslations({
    landing_welcome: "أهلاً بك!",
    landing_subtitle: "اعثر على طريقك للعمل في فنلندا",
    landing_btn_quiz: "أخبرني عن نفسك",
    landing_btn_continue: "استكشف دليلك",
    landing_btn_ask: "ابدأ محادثة",
    landing_btn_browse: "تصفح الدليل",
    dash_greeting: "مرحباً، {name}!",
    dash_greeting_guest: "مرحباً!",
    dash_subtitle: "مرحباً بعودتك إلى دليلك الشخصي.",
    dash_btn_guide: "افتح دليلي",
    dash_btn_ask: "اسأل الذكاء الاصطناعي",
    wizard_title_init: "أنشئ ملفك الشخصي",
    wizard_title_name: "ما هو اسمك؟",
    wizard_btn_next: "التالي",
    wizard_btn_prev: "السابق"
  }),
  so: createTranslations({
    landing_welcome: "Soo dhowow!",
    landing_subtitle: "Hel jidkaaga shaqo ee Finland",
    landing_btn_quiz: "Iiga waran naftaada",
    landing_btn_continue: "Sahami Hagahayga",
    landing_btn_ask: "Bilow wada hadal",
    landing_btn_browse: "Baadh Hagaha",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Ku soo dhowow hagahaaga gaarka ah.",
    dash_btn_guide: "Fur Hagaha",
    dash_btn_ask: "Weydii AI",
    wizard_title_init: "Samee astaantaada",
    wizard_title_name: "Magacaa?",
    wizard_btn_next: "Xiga",
    wizard_btn_prev: "Hore"
  }),
  fa: createTranslations({
    landing_welcome: "خوش آمدید!",
    landing_subtitle: "راه خود را برای کار در فنلاند پیدا کنید",
    landing_btn_quiz: "درباره خودتان بگویید",
    landing_btn_continue: "کاوش در راهنما",
    landing_btn_ask: "شروع گفتگو",
    landing_btn_browse: "مرور راهنما",
    dash_greeting: "سلام، {name}!",
    dash_greeting_guest: "سلام!",
    dash_subtitle: "به راهنمای شخصی خود خوش آمدید.",
    dash_btn_guide: "باز کردن راهنما",
    dash_btn_ask: "پرسش از هوش مصنوعی",
    wizard_title_init: "نمایه خود را بسازید",
    wizard_title_name: "نام شما چیست؟",
    wizard_btn_next: "بعدی",
    wizard_btn_prev: "قبلی"
  }),
  ku: createTranslations({
    landing_welcome: "Bi xêr hatî!",
    landing_subtitle: "Rêya xwe ya kar li Fînlandiyayê bibîne",
    landing_btn_quiz: "Li ser xwe bêje",
    landing_btn_continue: "Rêbera min veke",
    landing_btn_ask: "Dest bi axaftinê bike",
    landing_btn_browse: "Rêbernameyê bigere",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bi xêr hatî rêberê xwe yê şexsî.",
    dash_btn_guide: "Rêbernameyê veke",
    dash_btn_ask: "Ji AI bipirse",
    wizard_title_init: "Profîla xwe çêbike",
    wizard_title_name: "Navê te çi ye?",
    wizard_btn_next: "Pêş",
    wizard_btn_prev: "Paş"
  }),
  zh: createTranslations({
    landing_welcome: "欢迎！",
    landing_subtitle: "寻找你在芬兰的职业道路",
    landing_btn_quiz: "介绍一下你自己",
    landing_btn_continue: "探索指南",
    landing_btn_ask: "开始对话",
    landing_btn_browse: "浏览指南",
    dash_greeting: "你好, {name}!",
    dash_greeting_guest: "你好!",
    dash_subtitle: "欢迎回到你的个人芬兰指南。",
    dash_btn_guide: "打开指南",
    dash_btn_ask: "向AI提问",
    wizard_title_init: "创建你的个人资料",
    wizard_title_name: "怎么称呼你？",
    wizard_btn_next: "下一步",
    wizard_btn_prev: "上一步"
  }),
  vi: createTranslations({
    landing_welcome: "Chào mừng!",
    landing_subtitle: "Tìm đường đến Phần Lan làm việc",
    landing_btn_quiz: "Giới thiệu bản thân",
    landing_btn_continue: "Khám phá hướng dẫn",
    landing_btn_ask: "Bắt đầu trò chuyện",
    landing_btn_browse: "Xem Hướng dẫn",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Mở Hướng dẫn",
    dash_btn_ask: "Hỏi AI",
    wizard_title_init: "Tạo hồ sơ của bạn",
    wizard_title_name: "Bạn muốn được gọi là gì?",
    wizard_btn_next: "Tiếp theo",
    wizard_btn_prev: "Quay lại"
  }),
  sq: createTranslations({
    landing_welcome: "Mirë se vini!",
    landing_subtitle: "Gjeni rrugën tuaj për punë në Finlandë",
    landing_btn_quiz: "Më trego për veten",
    landing_btn_continue: "Eksploro Udhëzuesin",
    landing_btn_ask: "Fillo bisedën",
    landing_btn_browse: "Shfleto Udhëzuesin",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Mirë se vini përsëri në udhëzuesin tuaj.",
    dash_btn_guide: "Hap Udhëzuesin",
    dash_btn_ask: "Pyet AI",
    wizard_title_init: "Krijo Profilin",
    wizard_title_name: "Si quheni?",
    wizard_btn_next: "Tjetra",
    wizard_btn_prev: "Prapa"
  }),
  uk: createTranslations({
    landing_welcome: "Ласкаво просимо!",
    landing_subtitle: "Знайдіть свій шлях до роботи у Фінляндії",
    landing_btn_quiz: "Розкажіть про себе",
    landing_btn_continue: "Відкрити гід",
    landing_btn_ask: "Почати чат",
    landing_btn_browse: "Переглянути гід",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Ласкаво просимо до вашого персонального гіда.",
    dash_btn_guide: "Відкрити гід",
    dash_btn_ask: "Запитати AI",
    wizard_title_init: "Створити профіль",
    wizard_title_name: "Як вас звати?",
    wizard_btn_next: "Далі",
    wizard_btn_prev: "Назад"
  }),
  es: createTranslations({
    landing_welcome: "¡Bienvenido!",
    landing_subtitle: "Encuentra tu camino laboral en Finlandia",
    landing_btn_quiz: "Cuéntame sobre ti",
    landing_btn_continue: "Explorar Guía",
    landing_btn_ask: "Empezar chat",
    landing_btn_browse: "Navegar Guía",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Abrir Guía",
    dash_btn_ask: "Preguntar a IA",
    wizard_title_init: "Crea tu perfil",
    wizard_title_name: "¿Cómo te llamas?",
    wizard_btn_next: "Siguiente",
    wizard_btn_prev: "Atrás"
  }),
  tr: createTranslations({
    landing_welcome: "Hoş geldiniz!",
    landing_subtitle: "Finlandiya'da iş yolunuzu bulun",
    landing_btn_quiz: "Kendinizden bahsedin",
    landing_btn_continue: "Rehberi Keşfet",
    landing_btn_ask: "Sohbet başlat",
    landing_btn_browse: "Rehbere Göz At",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Rehberi Aç",
    dash_btn_ask: "YZ'ye Sor",
    wizard_title_init: "Profil Oluştur",
    wizard_title_name: "Adınız nedir?",
    wizard_btn_next: "İleri",
    wizard_btn_prev: "Geri"
  }),
  "pt-br": createTranslations({
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre seu caminho na Finlândia",
    landing_btn_quiz: "Conte sobre você",
    landing_btn_continue: "Explorar Guia",
    landing_btn_ask: "Começar conversa",
    landing_btn_browse: "Navegar no Guia",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Abrir Guia",
    dash_btn_ask: "Perguntar AI"
  }),
  "pt-pt": createTranslations({
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontra o teu caminho na Finlândia",
    landing_btn_quiz: "Fala sobre ti",
    landing_btn_continue: "Explorar Guia",
    landing_btn_ask: "Começar conversa",
    landing_btn_browse: "Navegar no Guia",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Abrir Guia",
    dash_btn_ask: "Perguntar AI"
  })
};

export const t = (key: TranslationKey, lang: LanguageCode, params?: Record<string, string>): string => {
  // Fallback chain: Specific Lang -> English -> Key Name
  let text = TRANSLATIONS[lang]?.[key];
  if (!text) {
    text = TRANSLATIONS['en'][key] || key;
  }
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text!.replace(`{${k}}`, v);
    });
  }
  return text!;
};
