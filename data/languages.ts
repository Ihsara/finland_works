
import { AppLanguage, LanguageCode } from "../types";

export const SUPPORTED_LANGUAGES: AppLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', supported: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', supported: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', supported: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', supported: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', supported: true },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti keel', flag: '🇪🇪', supported: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', supported: true, rtl: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', supported: true },
  { code: 'so', name: 'Somali', nativeName: 'Af-Soomaali', flag: '🇸🇴', supported: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', supported: true, rtl: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🇹🇯', supported: true, rtl: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', supported: true },
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
    landing_welcome: "Tervetuloa!", landing_subtitle: "Löydä polkusi työhön Suomessa", landing_btn_quiz: "Kerro itsestäsi", landing_btn_continue: "Avaa oppaani", landing_btn_ask: "Aloita keskustelu", landing_btn_browse: "Selaa opasta",
    dash_greeting: "Moi, {name}!", dash_subtitle: "Tervetuloa takaisin henkilökohtaiseen oppaaseesi.", dash_btn_guide: "Avaa opas", dash_btn_browse: "Selaa opasta", dash_btn_ask: "Kysy tekoälyltä", dash_btn_history: "Historia", dash_btn_cv: "Tuo CV", dash_profile_overview: "Profiili",
    wiki_header_title: "Suomi Toimii!", wiki_explore_cats: "Selaa aiheita", wiki_full_index: "Hakemisto", wiki_nav_list: "Lista", wiki_nav_icons: "Kuvakkeet", wiki_section_chapters: "Luvut", wiki_btn_mark_done: "Merkitse tehdyksi", wiki_btn_later: "Myöhemmin", wiki_stat_articles: "artikkelia", wiki_stat_complete: "valmis",
    profile_btn_guide: "Oppaani", profile_btn_plan: "Suunnitelma", profile_sect_languages: "Kielet", profile_sect_skills: "Taidot", profile_sect_narrative: "Tarina",
    chat_placeholder: "Kysy jotain...", chat_end_session: "Lopeta", chat_header_assistant: "Avustaja",
    settings_title: "Asetukset", settings_theme_label: "Teema", settings_length_label: "Vastauksen pituus", settings_opt_ask: "Kysy aina", settings_opt_short: "Tiivis", settings_opt_long: "Kattava",
    btn_back_dashboard: "Takaisin",
    wizard_title_init: "Luo profiilisi", wizard_title_name: "Mikä on nimesi?", wizard_btn_next: "Seuraava", wizard_btn_prev: "Edellinen", wizard_step4_title: "Mistä olet kotoisin?", wizard_btn_search_country: "Hae maa", wizard_region_europe: "Eurooppa", wizard_step5_title: "Työoikeus"
  }),
  vi: createTranslations({
    landing_welcome: "Chào mừng!", landing_subtitle: "Tìm con đường sự nghiệp tại Phần Lan", landing_btn_quiz: "Kể về bạn", landing_btn_continue: "Mở hướng dẫn", landing_btn_ask: "Hỏi AI", landing_btn_browse: "Xem cẩm nang",
    dash_greeting: "Chào, {name}!", dash_subtitle: "Chào mừng trở lại với người hướng dẫn của bạn.", dash_btn_guide: "Mở Cẩm Nang", dash_btn_browse: "Xem Cẩm Nang", dash_btn_ask: "Trò chuyện AI", dash_btn_history: "Lịch sử", dash_btn_cv: "Nhập CV", dash_profile_overview: "Hồ sơ",
    wiki_header_title: "Phần Lan Works!", wiki_explore_cats: "Khám phá chủ đề", wiki_full_index: "Mục lục", wiki_nav_list: "Danh sách", wiki_nav_icons: "Biểu tượng", wiki_section_chapters: "Chương", wiki_btn_mark_done: "Hoàn thành", wiki_btn_later: "Để sau", wiki_stat_articles: "bài viết", wiki_stat_complete: "xong",
    profile_btn_guide: "Cẩm nang", profile_btn_plan: "Kế hoạch", profile_sect_languages: "Ngôn ngữ", profile_sect_skills: "Kỹ năng",
    chat_placeholder: "Hỏi gì đó...", chat_end_session: "Kết thúc", chat_header_assistant: "Trợ lý",
    settings_title: "Cài đặt", settings_theme_label: "Giao diện", settings_length_label: "Độ dài câu trả lời", settings_opt_ask: "Luôn hỏi", settings_opt_short: "Ngắn gọn", settings_opt_long: "Chi tiết",
    btn_back_dashboard: "Quay lại",
    wizard_title_init: "Tạo hồ sơ", wizard_title_name: "Bạn tên gì?", wizard_btn_next: "Tiếp", wizard_btn_prev: "Lùi", wizard_step4_title: "Bạn đến từ đâu?", wizard_btn_search_country: "Tìm nước", wizard_region_europe: "Châu Âu"
  }),
  th: createTranslations({
    landing_welcome: "ยินดีต้อนรับ!", landing_subtitle: "เส้นทางสู่อาชีพในฟินแลนด์", landing_btn_quiz: "เริ่มกันเลย", landing_btn_continue: "คู่มือของฉัน",
    dash_greeting: "สวัสดี {name}!", dash_btn_guide: "เปิดคู่มือ", dash_btn_ask: "คุยกับ AI", dash_btn_history: "ประวัติ",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "หัวข้อ", wiki_nav_list: "รายการ", wiki_btn_mark_done: "เสร็จสิ้น", wiki_stat_articles: "บทความ",
    profile_btn_guide: "คู่มือ", profile_sect_languages: "ภาษา",
    chat_placeholder: "ถามอะไรหน่อย...", chat_header_assistant: "ผู้ช่วย",
    settings_title: "ตั้งค่า", settings_theme_label: "ธีม",
    btn_back_dashboard: "ย้อนกลับ",
    wizard_title_init: "สร้างโปรไฟล์", wizard_title_name: "คุณชื่ออะไร?", wizard_btn_next: "ถัดไป", wizard_btn_prev: "ย้อนกลับ"
  }),
  et: createTranslations({
    landing_welcome: "Tere tulemast!", landing_subtitle: "Sinu tee tööle Soomes",
    dash_greeting: "Tere, {name}!", dash_btn_guide: "Ava juhend", dash_btn_ask: "Küsi AI-lt",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Teemad", wiki_nav_list: "Nimekiri", wiki_btn_mark_done: "Tehtud", wiki_stat_articles: "artiklit",
    profile_btn_guide: "Minu juhend", profile_sect_languages: "Keeled",
    chat_placeholder: "Küsi midagi...", chat_header_assistant: "Assistent",
    settings_title: "Seaded",
    btn_back_dashboard: "Tagasi",
    wizard_title_init: "Loo profiil", wizard_title_name: "Mis on su nimi?", wizard_btn_next: "Edasi", wizard_btn_prev: "Tagasi"
  }),
  ru: createTranslations({
    landing_welcome: "Добро пожаловать!", landing_subtitle: "Ваш путь к работе в Финляндии",
    dash_greeting: "Привет, {name}!", dash_btn_guide: "Открыть гид", dash_btn_ask: "Спросить AI", dash_btn_history: "История",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Темы", wiki_nav_list: "Список", wiki_btn_mark_done: "Готово", wiki_stat_articles: "статей",
    profile_btn_guide: "Мой гид", profile_sect_languages: "Языки",
    chat_placeholder: "Спросите что-нибудь...", chat_header_assistant: "Ассистент",
    settings_title: "Настройки", settings_theme_label: "Тема",
    btn_back_dashboard: "Назад",
    wizard_title_init: "Создать профиль", wizard_title_name: "Как вас зовут?", wizard_btn_next: "Далее", wizard_btn_prev: "Назад"
  }),
  ar: createTranslations({
    landing_welcome: "أهلاً بك!", landing_subtitle: "طريقك للعمل في فنلندا", landing_btn_quiz: "ابدأ",
    dash_greeting: "مرحباً {name}!", dash_btn_guide: "دليلي", dash_btn_ask: "اسأل المساعد",
    wiki_header_title: "العمل في فنلندا", wiki_explore_cats: "استكشف المواضيع", wiki_nav_list: "قائمة", wiki_btn_mark_done: "إتمام", wiki_stat_articles: "مقال",
    profile_btn_guide: "الدليل", profile_sect_languages: "اللغات",
    chat_placeholder: "اسأل شيئاً...", chat_header_assistant: "المساعد", chat_end_session: "إنهاء",
    settings_title: "الإعدادات", settings_theme_label: "المظهر",
    btn_back_dashboard: "عودة",
    wizard_title_init: "ملفك الشخصي", wizard_title_name: "ما اسمك؟", wizard_btn_next: "التالي", wizard_btn_prev: "السابق"
  }),
  so: createTranslations({
    landing_welcome: "Soo dhowow!", landing_subtitle: "Jidkaaga shaqada Finland",
    dash_greeting: "Haye, {name}!", dash_btn_guide: "Fur Tilmaamaha", dash_btn_ask: "Weydii AI",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Mawduucyada", wiki_nav_list: "Liiska", wiki_btn_mark_done: "Dhammaystir",
    profile_btn_guide: "Tilmaamaha",
    chat_placeholder: "Wax weydii...", chat_header_assistant: "Caawiye",
    settings_title: "Dejinta",
    btn_back_dashboard: "Dib u noqo",
    wizard_title_init: "Samee Profile", wizard_title_name: "Magacaa?", wizard_btn_next: "Xiga", wizard_btn_prev: "Hore"
  }),
  fa: createTranslations({
    landing_welcome: "خوش آمدید!", landing_subtitle: "راه شما برای کار در فنلاند",
    dash_greeting: "سلام {name}!", dash_btn_guide: "راهنما", dash_btn_ask: "پرسش از هوش مصنوعی",
    wiki_header_title: "کار در فنلاند", wiki_explore_cats: "موضوعات", wiki_nav_list: "لیست", wiki_btn_mark_done: "انجام شد",
    profile_btn_guide: "راهنمای من",
    chat_placeholder: "چیزی بپرسید...", chat_header_assistant: "دستیار",
    settings_title: "تنظیمات",
    btn_back_dashboard: "بازگشت",
    wizard_title_init: "ساخت پروفایل", wizard_title_name: "نام شما؟", wizard_btn_next: "بعدی", wizard_btn_prev: "قبلی"
  }),
  ku: createTranslations({
    landing_welcome: "Bi xêr hatî!", landing_subtitle: "Rêya te ya xebatê li Fînlandiyayê",
    dash_greeting: "Silav, {name}!", dash_btn_guide: "Rêber", dash_btn_ask: "Pirs bike",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Mijar", wiki_nav_list: "Lîste", wiki_btn_mark_done: "Qediya",
    profile_btn_guide: "Rêbera min",
    chat_placeholder: "Tiştek bipirse...", chat_header_assistant: "Alîkar",
    settings_title: "Mîheng",
    btn_back_dashboard: "Paş",
    wizard_title_init: "Profîl çêbike", wizard_title_name: "Navê te?", wizard_btn_next: "Pêş", wizard_btn_prev: "Paş"
  }),
  zh: createTranslations({
    landing_welcome: "欢迎！", landing_subtitle: "在芬兰工作的指南",
    dash_greeting: "你好, {name}!", dash_btn_guide: "打开指南", dash_btn_ask: "咨询 AI",
    wiki_header_title: "芬兰工作指南", wiki_explore_cats: "浏览主题", wiki_nav_list: "列表", wiki_btn_mark_done: "标记完成", wiki_stat_articles: "文章",
    profile_btn_guide: "我的指南", profile_sect_languages: "语言",
    chat_placeholder: "请输入问题...", chat_header_assistant: "助手",
    settings_title: "设置", settings_theme_label: "主题",
    btn_back_dashboard: "返回",
    wizard_title_init: "创建档案", wizard_title_name: "你叫什么名字？", wizard_btn_next: "下一步", wizard_btn_prev: "上一步"
  }),
  sq: createTranslations({
    landing_welcome: "Mirë se vini!", landing_subtitle: "Rruga juaj drejt punës në Finlandë",
    dash_greeting: "Përshëndetje, {name}!", dash_btn_guide: "Hap Udhëzuesin", dash_btn_ask: "Pyet AI",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Temat", wiki_nav_list: "Lista", wiki_btn_mark_done: "E kryer",
    profile_btn_guide: "Udhëzuesi im",
    chat_placeholder: "Pyet diçka...", chat_header_assistant: "Asistenti",
    settings_title: "Cilësimet",
    btn_back_dashboard: "Kthehu",
    wizard_title_init: "Krijo Profilin", wizard_title_name: "Si quheni?", wizard_btn_next: "Tjetra", wizard_btn_prev: "Prapa"
  }),
  uk: createTranslations({
    landing_welcome: "Ласкаво просимо!", landing_subtitle: "Ваш шлях до роботи у Фінляндії",
    dash_greeting: "Привіт, {name}!", dash_btn_guide: "Відкрити гід", dash_btn_ask: "Запитати AI",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Теми", wiki_nav_list: "Список", wiki_btn_mark_done: "Готово",
    profile_btn_guide: "Мій гід",
    chat_placeholder: "Запитайте щось...", chat_header_assistant: "Асистент",
    settings_title: "Налаштування",
    btn_back_dashboard: "Назад",
    wizard_title_init: "Створити профіль", wizard_title_name: "Як вас звати?", wizard_btn_next: "Далі", wizard_btn_prev: "Назад"
  }),
  es: createTranslations({
    landing_welcome: "¡Bienvenido!", landing_subtitle: "Tu camino al trabajo en Finlandia",
    dash_greeting: "¡Hola, {name}!", dash_btn_guide: "Abrir Guía", dash_btn_ask: "Preguntar a IA",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Explorar temas", wiki_nav_list: "Lista", wiki_btn_mark_done: "Hecho", wiki_stat_articles: "artículos",
    profile_btn_guide: "Mi Guía", profile_sect_languages: "Idiomas",
    chat_placeholder: "Pregunta algo...", chat_header_assistant: "Asistente",
    settings_title: "Ajustes", settings_theme_label: "Tema",
    btn_back_dashboard: "Volver",
    wizard_title_init: "Crear Perfil", wizard_title_name: "¿Cómo te llamas?", wizard_btn_next: "Siguiente", wizard_btn_prev: "Atrás"
  }),
  tr: createTranslations({
    landing_welcome: "Hoş geldiniz!", landing_subtitle: "Finlandiya'da çalışma rehberiniz",
    dash_greeting: "Merhaba, {name}!", dash_btn_guide: "Rehberi Aç", dash_btn_ask: "AI'ya Sor",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Konular", wiki_nav_list: "Liste", wiki_btn_mark_done: "Tamamlandı",
    profile_btn_guide: "Rehberim",
    chat_placeholder: "Bir şey sor...", chat_header_assistant: "Asistan",
    settings_title: "Ayarlar",
    btn_back_dashboard: "Geri",
    wizard_title_init: "Profil Oluştur", wizard_title_name: "Adınız nedir?", wizard_btn_next: "İleri", wizard_btn_prev: "Geri"
  }),
  "pt-br": createTranslations({
    landing_welcome: "Bem-vindo!", landing_subtitle: "Seu caminho para trabalhar na Finlândia",
    dash_greeting: "Olá, {name}!", dash_btn_guide: "Abrir Guia", dash_btn_ask: "Perguntar à IA",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Tópicos", wiki_nav_list: "Lista", wiki_btn_mark_done: "Concluído",
    profile_btn_guide: "Meu Guia",
    chat_placeholder: "Pergunte algo...", chat_header_assistant: "Assistente",
    settings_title: "Configurações",
    btn_back_dashboard: "Voltar",
    wizard_title_init: "Criar Perfil", wizard_title_name: "Qual é o seu nome?", wizard_btn_next: "Próximo", wizard_btn_prev: "Anterior"
  }),
  "pt-pt": createTranslations({
    landing_welcome: "Bem-vindo!", landing_subtitle: "O teu caminho para trabalhar na Finlândia",
    dash_greeting: "Olá, {name}!", dash_btn_guide: "Abrir Guia", dash_btn_ask: "Perguntar à IA",
    wiki_header_title: "Finland Works!", wiki_explore_cats: "Tópicos", wiki_nav_list: "Lista", wiki_btn_mark_done: "Concluído",
    profile_btn_guide: "O Meu Guia",
    chat_placeholder: "Pergunte algo...", chat_header_assistant: "Assistente",
    settings_title: "Definições",
    btn_back_dashboard: "Voltar",
    wizard_title_init: "Criar Perfil", wizard_title_name: "Como te chamas?", wizard_btn_next: "Próximo", wizard_btn_prev: "Anterior"
  })
};

export const t = (key: TranslationKey, lang: LanguageCode, params?: Record<string, string>): string => {
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
