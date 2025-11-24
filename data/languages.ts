
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
  | 'landing_btn_continue'
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
  | 'dash_btn_history'
  | 'dash_btn_cv'
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
  | 'chat_prompt_context_inquiry'
  | 'chat_ask_length'
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
  | 'wiki_section_chapters'
  | 'wiki_btn_saved'
  | 'wiki_btn_later'
  | 'wiki_btn_completed'
  | 'wiki_btn_mark_done'
  | 'wiki_ctx_ask' 
  | 'wiki_topic_label'
  | 'wiki_topic_desc'
  | 'wiki_guide_prefix'
  | 'wiki_stat_articles'
  | 'wiki_stat_complete'
  | 'wiki_section_prefix'
  | 'wizard_header_quiz'
  | 'wizard_greeting_short'
  | 'wizard_title_init'
  | 'wizard_title_custom'
  | 'wizard_phase_identity'
  | 'wizard_phase_demo'
  | 'wizard_phase_status'
  | 'wizard_phase_skills'
  | 'wizard_phase_mindset'
  | 'wizard_phase_vision'
  | 'wizard_nickname_hint'
  | 'wizard_btn_ask'
  | 'wizard_btn_next'
  | 'wizard_btn_prev'
  | 'wizard_btn_submit'
  | 'wizard_btn_finish_early'
  | 'wizard_btn_generate_name'
  | 'wizard_ribbon_greeting'
  | 'wizard_title_name'
  | 'wizard_desc_name'
  | 'wizard_placeholder_name'
  | 'wizard_step2_title'
  | 'wizard_step2_desc'
  | 'wizard_step2_placeholder'
  | 'wizard_step3_title'
  | 'wizard_marital_solo_title'
  | 'wizard_marital_solo_desc'
  | 'wizard_marital_pair_title'
  | 'wizard_marital_pair_desc'
  | 'wizard_marital_secret_title'
  | 'wizard_marital_secret_desc'
  
  // Children / Family Steps
  | 'wizard_children_title'
  | 'wizard_children_desc'
  | 'wizard_children_yes'
  | 'wizard_children_no'
  | 'wizard_family_details_title'
  | 'wizard_family_count_label'
  | 'wizard_family_ages_label'
  | 'wizard_family_ages_hint'
  | 'wizard_age_group_0_6'
  | 'wizard_age_group_7_12'
  | 'wizard_age_group_13_17'
  | 'wizard_age_group_18'

  | 'wizard_step4_title'
  | 'wizard_step4_desc'
  | 'wizard_step4_placeholder'
  | 'wizard_step4_no_match'
  | 'wizard_btn_search_country'
  | 'wizard_btn_select_region'
  | 'wizard_region_europe'
  | 'wizard_region_americas'
  | 'wizard_region_asia'
  | 'wizard_region_africa'
  | 'wizard_region_oceania'
  | 'wizard_region_middle_east'
  | 'wizard_eu_question'
  | 'wizard_eu_yes'
  | 'wizard_eu_no'
  | 'wizard_step5_title'
  | 'wizard_permit_full_title'
  | 'wizard_permit_full_desc'
  | 'wizard_permit_restricted_title'
  | 'wizard_permit_restricted_desc'
  | 'wizard_permit_student_title'
  | 'wizard_permit_student_desc'
  | 'wizard_step6_title'
  | 'wizard_step6_desc'
  | 'wizard_step6_field_label'
  | 'wizard_step6_field_placeholder'
  | 'wizard_edu_general_title'
  | 'wizard_edu_general_desc'
  | 'wizard_edu_applied_title'
  | 'wizard_edu_applied_desc'
  | 'wizard_edu_uni_title'
  | 'wizard_edu_uni_desc'
  | 'wizard_step7_title'
  | 'wizard_step7_desc'
  | 'wizard_step7_placeholder'
  | 'wizard_step8_title'
  | 'wizard_lbl_finnish_level'
  | 'wizard_lbl_finnish_motivation'
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
  | 'wizard_scale_1_motivation'
  | 'wizard_scale_5_motivation'
  | 'wizard_scale_1_career'
  | 'wizard_scale_5_career'
  | 'wizard_scale_1_life'
  | 'wizard_scale_5_life'
  | 'wizard_step12_title'
  | 'wizard_opt_cult_high'
  | 'wizard_opt_cult_med'
  | 'wizard_opt_cult_low'
  | 'wizard_step13_title'
  | 'wizard_opt_conf_life_low'
  | 'wizard_opt_conf_life_med'
  | 'wizard_opt_conf_life_high'
  | 'wizard_step14_title'
  | 'wizard_step15_title'
  | 'wizard_opt_info_none'
  | 'wizard_opt_info_some'
  | 'wizard_opt_info_high'
  | 'wizard_step16_title'
  | 'wizard_opt_excite_career'
  | 'wizard_opt_excite_life'
  | 'wizard_opt_excite_nature'
  | 'wizard_opt_excite_adventure'
  | 'wizard_rating_winter'
  | 'wizard_rating_thaw'
  | 'wizard_rating_growth'
  | 'wizard_rating_bloom'
  | 'wizard_rating_summer'
  
  // History & CV
  | 'history_title'
  | 'history_empty'
  | 'history_tab_summary'
  | 'history_tab_transcript'
  | 'history_no_summary'
  | 'history_generating'
  | 'history_generating_desc'
  | 'cv_title'
  | 'cv_subtitle'
  | 'cv_placeholder'
  | 'cv_btn_analyze'
  | 'cv_btn_processing'
  | 'cv_warning_key'
  | 'cv_key_update'
  | 'cv_key_required'
  | 'cv_key_desc'
  | 'cv_key_placeholder'
  | 'cv_key_save'
  | 'cv_alert_success'
  | 'cv_alert_error'
  | 'cv_btn_manage_key'
  
  // Settings
  | 'settings_title'
  | 'settings_length_label'
  | 'settings_opt_ask'
  | 'settings_opt_short'
  | 'settings_opt_long'
  | 'btn_save';

export const TRANSLATIONS: Record<LanguageCode, Partial<Record<TranslationKey, string>>> = {
  en: {
    landing_welcome: "Welcome!",
    landing_subtitle: "Find your way to work in Finland",
    landing_btn_quiz: "Tell me about yourself",
    landing_btn_continue: "Explore My Guide",
    landing_btn_ask: "Start a conversation",
    landing_load_sample: "Load Sample (Gabriela)",
    landing_erase: "Erase Cache",
    landing_add_key: "Add Gemini API Key",
    landing_choose_lang: "Choose Language",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Welcome back to your personal Finland guide.",
    dash_subtitle_guest: "Let's set up your profile to get started.",
    dash_btn_guide: "Open My Guide",
    dash_btn_ask: "Start a conversation",
    dash_btn_history: "Past Conversations",
    dash_btn_cv: "Import CV",
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
    chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"",
    chat_ask_length: "Should I keep it brief, or would you like the full details?",
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
    wiki_section_chapters: "Chapters",
    wiki_btn_saved: "Saved",
    wiki_btn_later: "Later",
    wiki_btn_completed: "Completed",
    wiki_btn_mark_done: "Mark Done",
    wiki_ctx_ask: "Start a chat with this sentence",
    wiki_topic_label: "Topic: {tag}",
    wiki_topic_desc: "Topic Overview & Related Articles",
    wiki_guide_prefix: "GUIDE",
    wiki_stat_articles: "Articles",
    wiki_stat_complete: "Complete",
    wiki_section_prefix: "Section",

    wizard_header_quiz: "Quiz",
    wizard_greeting_short: "Hi, {name}!",
    wizard_title_init: "Create Your Profile",
    wizard_title_custom: "{name} Character Creation",
    wizard_phase_identity: "PHASE 1: IDENTITY",
    wizard_phase_demo: "PHASE 2: BACKGROUND",
    wizard_phase_status: "PHASE 3: STATUS",
    wizard_phase_skills: "PHASE 4: SKILLS",
    wizard_phase_mindset: "PHASE 5: MINDSET",
    wizard_phase_vision: "PHASE 6: VISION",
    wizard_nickname_hint: "* You can use a generated nickname to stay anonymous.",
    wizard_btn_ask: "Ask a question",
    wizard_btn_next: "Next",
    wizard_btn_prev: "Previous",
    wizard_btn_submit: "Submit",
    wizard_btn_finish_early: "Save & Finish Now",
    wizard_btn_generate_name: "Give me a nickname!",
    wizard_ribbon_greeting: "Nice to meet you, {name}!",
    wizard_title_name: "What would you like to be called?",
    wizard_desc_name: "Enter your own name or choose",
    wizard_placeholder_name: "Your name",
    wizard_step2_title: "How old are you?",
    wizard_step2_desc: "Select your age group",
    wizard_step2_placeholder: "Your age (e.g. 29)",
    wizard_step3_title: "What's your marital status?",
    
    wizard_marital_solo_title: "Flying Solo",
    wizard_marital_solo_desc: "Single, divorced, or widowed",
    wizard_marital_pair_title: "Partnered Up",
    wizard_marital_pair_desc: "Married or partnered",
    wizard_marital_secret_title: "It's a Mystery",
    wizard_marital_secret_desc: "It's complicated / secret",

    // Children steps
    wizard_children_title: "Do you have children?",
    wizard_children_desc: "This helps us give relevant advice about schools and daycare.",
    wizard_children_yes: "Yes",
    wizard_children_no: "No",
    wizard_family_details_title: "Tell us about your family",
    wizard_family_count_label: "How many children?",
    wizard_family_ages_label: "What age groups are they in?",
    wizard_family_ages_hint: "Select all that apply. This changes the advice for schools.",
    wizard_age_group_0_6: "Daycare (0-6)",
    wizard_age_group_7_12: "School (7-12)",
    wizard_age_group_13_17: "Teens (13-17)",
    wizard_age_group_18: "Adults (18+)",

    wizard_step4_title: "Where do you come from?",
    wizard_step4_desc: "Select your origin",
    wizard_step4_placeholder: "Start typing country name...",
    wizard_step4_no_match: "No matches found",
    
    wizard_btn_search_country: "Search Country",
    wizard_btn_select_region: "Select Region",
    wizard_region_europe: "Europe",
    wizard_region_americas: "Americas",
    wizard_region_asia: "Asia",
    wizard_region_africa: "Africa",
    wizard_region_oceania: "Oceania",
    wizard_region_middle_east: "Middle East",
    wizard_eu_question: "EU/EEA Citizen?",
    wizard_eu_yes: "Yes",
    wizard_eu_no: "No",

    wizard_step5_title: "Working Rights & Permit",
    wizard_permit_full_title: "Unlimited Rights",
    wizard_permit_full_desc: "Permanent, Family, EU, or Finnish Degree",
    wizard_permit_restricted_title: "Sector Restricted",
    wizard_permit_restricted_desc: "Work Permit tied to a specific field/employer",
    wizard_permit_student_title: "Student Permit",
    wizard_permit_student_desc: "Limited hours allowed alongside studies",

    wizard_step6_title: "Highest Education Level",
    wizard_step6_desc: "Which path best describes your background?",
    wizard_step6_field_label: "Field of Study (Optional)",
    wizard_step6_field_placeholder: "e.g. Engineering, Arts",
    
    wizard_edu_general_title: "General Education",
    wizard_edu_general_desc: "High School / Lukio only. No trade qualification.",
    wizard_edu_applied_title: "Vocational & Applied",
    wizard_edu_applied_desc: "Trade School (Amis) or Applied Sciences (AMK).",
    wizard_edu_uni_title: "University Degree",
    wizard_edu_uni_desc: "Academic degree (Bachelor's, Master's, PhD).",

    wizard_step7_title: "What is your profession?",
    wizard_step7_desc: "Or what job are you looking for?",
    wizard_step7_placeholder: "e.g. Nurse, Welder, Developer",
    wizard_step8_title: "Finnish Language",
    wizard_lbl_finnish_level: "Current Level",
    wizard_lbl_finnish_motivation: "Motivation to Learn",
    wizard_opt_lang_none: "None yet",
    wizard_opt_lang_basics: "Basics (A1)",
    wizard_opt_lang_inter: "Intermediate (A2-B1)",
    wizard_opt_lang_fluent: "Fluent (B2+)",
    
    wizard_scale_1_motivation: "Curious",
    wizard_scale_5_motivation: "Unstoppable",
    
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
    
    wizard_scale_1_career: "I need direction",
    wizard_scale_5_career: "I have a plan",

    wizard_scale_1_life: "Still thawing",
    wizard_scale_5_life: "Feels like home",

    wizard_rating_winter: "Winter",
    wizard_rating_thaw: "Thaw",
    wizard_rating_growth: "Growth",
    wizard_rating_bloom: "Bloom",
    wizard_rating_summer: "Summer",

    wizard_step12_title: "How does Finnish culture feel to you right now?",
    wizard_opt_cult_low: "It's a beautiful mystery",
    wizard_opt_cult_med: "I'm happily observing",
    wizard_opt_cult_high: "I'm diving in deep",

    wizard_step13_title: "How are you finding the rhythm of life here?",
    wizard_step14_title: "How confident are you in your job search?",

    wizard_step15_title: "How clear is your path forward?",
    wizard_opt_info_none: "It's a bit foggy (I need a map)",
    wizard_opt_info_some: "The clouds are clearing",
    wizard_opt_info_high: "Crystal clear",

    wizard_step16_title: "What brings you the most joy here?",
    wizard_opt_excite_career: "Building my career",
    wizard_opt_excite_life: "The peace & safety",
    wizard_opt_excite_nature: "Nature & seasons",
    wizard_opt_excite_adventure: "Just being on an adventure",

    // History & CV
    history_title: "Past Conversations",
    history_empty: "No conversations recorded yet.",
    history_tab_summary: "Summary (AI)",
    history_tab_transcript: "Summary (AI)",
    history_no_summary: "No summary available for this conversation.",
    history_generating: "AI is writing summary...",
    history_generating_desc: "This happens in the background. You can check back in a few seconds.",
    cv_title: "Analyze CV",
    cv_subtitle: "Paste your CV text to automatically update your profile.",
    cv_placeholder: "Paste your CV/Resume text here...",
    cv_btn_analyze: "Analyze & Import",
    cv_btn_processing: "Processing...",
    cv_warning_key: "Personalized API Key required.",
    cv_key_update: "Update API Key",
    cv_key_required: "API Key Required",
    cv_key_desc: "To analyze your CV securely, please provide your own Google Gemini API key. It is stored locally on your device.",
    cv_key_placeholder: "Paste API Key here...",
    cv_key_save: "Save Key",
    cv_alert_success: "API Key saved successfully.",
    cv_alert_error: "Failed to analyze CV. Please try again or check your API key validity.",
    cv_btn_manage_key: "API Key",
    
    // Settings
    settings_title: "Settings",
    settings_length_label: "Answer Length Preference",
    settings_opt_ask: "Always Ask Me",
    settings_opt_short: "Short & Concise",
    settings_opt_long: "Detailed & Comprehensive",
    btn_save: "Save"
  },
  vi: {
    history_title: "Lịch sử trò chuyện",
    history_empty: "Chưa có cuộc trò chuyện nào.",
    history_tab_summary: "Tóm tắt (AI)",
    history_tab_transcript: "Nguyên văn",
    history_no_summary: "Chưa có tóm tắt.",
    history_generating: "AI đang viết tóm tắt...",
    history_generating_desc: "Quá trình này diễn ra trong nền. Bạn có thể kiểm tra lại sau vài giây.",
    cv_title: "Phân tích CV",
    cv_subtitle: "Dán nội dung CV để cập nhật hồ sơ tự động.",
    cv_placeholder: "Dán nội dung CV vào đây...",
    cv_btn_analyze: "Phân tích & Nhập",
    cv_btn_processing: "Đang xử lý...",
    cv_warning_key: "Cần có Khóa API Cá nhân.",
    cv_key_update: "Cập nhật Khóa API",
    cv_key_required: "Yêu cầu Khóa API",
    cv_key_desc: "Để phân tích CV an toàn, vui lòng cung cấp khóa API Google Gemini của riêng bạn. Nó chỉ được lưu trên thiết bị của bạn.",
    cv_key_placeholder: "Dán Khóa API vào đây...",
    cv_key_save: "Lưu Khóa",
    cv_alert_success: "Đã lưu khóa API thành công.",
    cv_alert_error: "Không thể phân tích CV. Vui lòng thử lại hoặc kiểm tra khóa API.",
    cv_btn_manage_key: "Khóa API",
    dash_btn_history: "Lịch sử trò chuyện",
    dash_btn_cv: "Nhập CV",
    // Base overwrites
    landing_welcome: "Chào mừng!",
    landing_subtitle: "Tìm đường đến Phần Lan làm việc",
    landing_btn_quiz: "Giới thiệu bản thân",
    landing_btn_continue: "Khám phá hướng dẫn",
    landing_btn_ask: "Bắt đầu trò chuyện",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Chào mừng trở lại với hướng dẫn cá nhân của bạn.",
    dash_btn_guide: "Mở Hướng dẫn",
    dash_btn_ask: "Hỏi AI",
    profile_btn_guide: "Hướng dẫn của tôi",
    profile_btn_guide_desc: "Các bài viết gợi ý",
    profile_sect_languages: "Ngôn ngữ",
    profile_sect_skills: "Kỹ năng",
    profile_sect_narrative: "Câu chuyện cá nhân",
    profile_completeness: "{percentage}% hoàn thành",
    profile_completeness_hint: "Trả lời thêm vài câu hỏi để nhận lời khuyên tốt hơn",
    wiki_header_title: "Finland Works!",
    wiki_nav_list: "Danh sách",
    wiki_nav_icons: "Biểu tượng",
    wiki_full_index: "Mục lục đầy đủ",
    chat_ask_length: "Bạn muốn câu trả lời ngắn gọn hay chi tiết?",
    settings_title: "Cài đặt",
    settings_length_label: "Độ dài câu trả lời",
    settings_opt_ask: "Luôn hỏi tôi",
    settings_opt_short: "Ngắn gọn & Súc tích",
    settings_opt_long: "Chi tiết & Đầy đủ",
    btn_save: "Lưu",
    wizard_children_title: "Bạn có con không?",
    wizard_children_desc: "Điều này giúp chúng tôi tư vấn về trường học và nhà trẻ.",
    wizard_children_yes: "Có",
    wizard_children_no: "Không",
    wizard_family_details_title: "Thông tin gia đình",
    wizard_family_count_label: "Bao nhiêu trẻ?",
    wizard_family_ages_label: "Độ tuổi của trẻ?",
    wizard_family_ages_hint: "Chọn tất cả các mức phù hợp.",
    wizard_age_group_0_6: "Nhà trẻ (0-6)",
    wizard_age_group_7_12: "Tiểu học (7-12)",
    wizard_age_group_13_17: "Thiếu niên (13-17)",
    wizard_age_group_18: "Trưởng thành (18+)"
  },
  "pt-br": {
    history_title: "Conversas Anteriores",
    history_empty: "Nenhuma conversa gravada.",
    history_tab_summary: "Resumo (IA)",
    history_tab_transcript: "Transcrição Completa",
    history_no_summary: "Sem resumo disponível.",
    history_generating: "A IA está a escrever o resumo...",
    history_generating_desc: "Isto acontece em segundo plano. Podes verificar novamente em alguns segundos.",
    cv_title: "Analisar CV",
    cv_subtitle: "Cole seu CV para atualizar seu perfil automaticamente.",
    cv_placeholder: "Cole o texto do seu CV aqui...",
    cv_btn_analyze: "Analisar & Importar",
    cv_btn_processing: "Processando...",
    cv_warning_key: "Chave de API Personalizada necessária.",
    cv_key_update: "Atualizar Chave API",
    cv_key_required: "Chave API Necessária",
    cv_key_desc: "Para analisar seu CV com segurança, forneça sua chave de API do Google Gemini. Ela é armazenada localmente.",
    cv_key_placeholder: "Cole a Chave API aqui...",
    cv_key_save: "Salvar Chave",
    cv_alert_success: "Chave API salva com sucesso.",
    cv_alert_error: "Falha ao analisar o CV. Verifique sua chave API.",
    cv_btn_manage_key: "Chave API",
    dash_btn_history: "Histórico",
    dash_btn_cv: "Importar CV",
    // Base overwrites
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre seu caminho para trabalhar na Finlândia",
    landing_btn_quiz: "Conte sobre você",
    landing_btn_continue: "Explorar Guia",
    landing_btn_ask: "Começar conversa",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bem-vindo de volta ao seu guia pessoal.",
    dash_btn_guide: "Abrir Guia",
    dash_btn_ask: "Perguntar AI",
    profile_btn_guide: "Meu Guia",
    profile_sect_languages: "Idiomas",
    profile_sect_skills: "Habilidades",
    profile_completeness: "{percentage}% completo",
    wiki_header_title: "Finland Works!",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    wiki_full_index: "Índice Completo",
    chat_ask_length: "Devo ser breve ou você prefere os detalhes completos?",
    settings_title: "Configurações",
    settings_length_label: "Preferência de Resposta",
    settings_opt_ask: "Sempre Perguntar",
    settings_opt_short: "Curto & Conciso",
    settings_opt_long: "Detalhado & Completo",
    btn_save: "Salvar",
    wizard_children_title: "Tem filhos?",
    wizard_children_desc: "Ajuda-nos a aconselhar sobre escolas e creches.",
    wizard_children_yes: "Sim",
    wizard_children_no: "Não",
    wizard_family_details_title: "Detalhes da Família",
    wizard_family_count_label: "Quantas crianças?",
    wizard_family_ages_label: "Faixas etárias?",
    wizard_family_ages_hint: "Selecione todas as aplicáveis.",
    wizard_age_group_0_6: "Creche (0-6)",
    wizard_age_group_7_12: "Escola (7-12)",
    wizard_age_group_13_17: "Adolescentes (13-17)",
    wizard_age_group_18: "Adultos (18+)"
  },
  "pt-pt": {
    history_title: "Conversas Anteriores",
    history_empty: "Nenhuma conversa gravada.",
    history_tab_summary: "Resumo (IA)",
    history_tab_transcript: "Transcrição Completa",
    history_no_summary: "Sem resumo disponível.",
    history_generating: "A IA está a escrever o resumo...",
    history_generating_desc: "Isto acontece em segundo plano. Podes verificar novamente em alguns segundos.",
    cv_title: "Analisar CV",
    cv_subtitle: "Cola o teu CV para atualizar o perfil automaticamente.",
    cv_placeholder: "Cola o texto do teu CV aqui...",
    cv_btn_analyze: "Analisar & Importar",
    cv_btn_processing: "A processar...",
    cv_warning_key: "Chave de API Personalizada necessária.",
    cv_key_update: "Atualizar Chave API",
    cv_key_required: "Chave API Necessária",
    cv_key_desc: "Para analisar o teu CV com segurança, fornece a tua chave de API Google Gemini. Ela é guardada localmente.",
    cv_key_placeholder: "Cola a Chave API aqui...",
    cv_key_save: "Guardar Chave",
    cv_alert_success: "Chave API guardada com sucesso.",
    cv_alert_error: "Falha ao analisar o CV. Verifica a tua chave API.",
    cv_btn_manage_key: "Chave API",
    dash_btn_history: "Histórico",
    dash_btn_cv: "Importar CV",
    // Base overwrites
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontra o teu caminho na Finlândia",
    landing_btn_quiz: "Fala sobre ti",
    landing_btn_continue: "Explorar Guia",
    dash_greeting: "Moi, {name}!",
    dash_btn_guide: "Abrir Guia",
    profile_sect_languages: "Línguas",
    profile_sect_skills: "Competências",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    chat_ask_length: "Devo ser breve ou preferes os detalhes completos?",
    settings_title: "Definições",
    settings_length_label: "Preferência de Resposta",
    settings_opt_ask: "Perguntar Sempre",
    settings_opt_short: "Curto & Conciso",
    settings_opt_long: "Detalhado & Completo",
    btn_save: "Guardar",
    wizard_children_title: "Tens filhos?",
    wizard_children_desc: "Ajuda-nos a aconselhar sobre escolas.",
    wizard_children_yes: "Sim",
    wizard_children_no: "Não",
    wizard_family_details_title: "Detalhes da Família",
    wizard_family_count_label: "Quantos filhos?",
    wizard_family_ages_label: "Faixas etárias?",
    wizard_family_ages_hint: "Seleciona todas as aplicáveis.",
    wizard_age_group_0_6: "Creche (0-6)",
    wizard_age_group_7_12: "Escola (7-12)",
    wizard_age_group_13_17: "Adolescentes (13-17)",
    wizard_age_group_18: "Adultos (18+)"
  },
  "ru": {
    history_title: "История чатов",
    history_empty: "Нет записанных разговоров.",
    history_tab_summary: "Сводка (ИИ)",
    history_tab_transcript: "Полный текст",
    history_no_summary: "Сводка недоступна.",
    history_generating: "ИИ пишет сводку...",
    history_generating_desc: "Это происходит в фоновом режиме. Вы можете проверить через несколько секунд.",
    cv_title: "Анализ CV",
    cv_subtitle: "Вставьте текст CV для автообновления профиля.",
    cv_placeholder: "Вставьте текст резюме сюда...",
    cv_btn_analyze: "Анализ и Импорт",
    cv_btn_processing: "Обработка...",
    cv_warning_key: "Требуется персональный API ключ.",
    cv_key_update: "Обновить API ключ",
    cv_key_required: "Требуется API ключ",
    cv_key_desc: "Для безопасного анализа резюме укажите свой ключ Google Gemini API. Он хранится локально.",
    cv_key_placeholder: "Вставьте ключ API...",
    cv_key_save: "Сохранить",
    cv_alert_success: "API ключ сохранен.",
    cv_alert_error: "Ошибка анализа. Проверьте ключ.",
    cv_btn_manage_key: "API Ключ",
    dash_btn_history: "История",
    dash_btn_cv: "Импорт CV",
    // Base overwrites
    landing_welcome: "Добро пожаловать!",
    landing_subtitle: "Ваш путь к работе в Финляндии",
    landing_btn_quiz: "Расскажите о себе",
    landing_btn_continue: "Открыть гид",
    landing_btn_ask: "Начать чат",
    dash_greeting: "Moi, {name}!",
    dash_subtitle: "Добро пожаловать в ваш персональный гид.",
    dash_btn_guide: "Открыть гид",
    profile_btn_guide: "Мой гид",
    profile_sect_languages: "Языки",
    profile_sect_skills: "Навыки",
    profile_completeness: "Заполнено: {percentage}%",
    wiki_header_title: "Finland Works!",
    wiki_nav_list: "Список",
    wiki_nav_icons: "Иконки",
    wiki_full_index: "Полный индекс",
    chat_ask_length: "Ответить кратко или подробно?",
    settings_title: "Настройки",
    settings_length_label: "Длина ответа",
    settings_opt_ask: "Всегда спрашивать",
    settings_opt_short: "Кратко",
    settings_opt_long: "Подробно",
    btn_save: "Сохранить",
    wizard_children_title: "У вас есть дети?",
    wizard_children_desc: "Это поможет дать советы по школам и садам.",
    wizard_children_yes: "Да",
    wizard_children_no: "Нет",
    wizard_family_details_title: "О семье",
    wizard_family_count_label: "Сколько детей?",
    wizard_family_ages_label: "Возраст детей?",
    wizard_family_ages_hint: "Выберите все подходящие.",
    wizard_age_group_0_6: "Сад (0-6)",
    wizard_age_group_7_12: "Школа (7-12)",
    wizard_age_group_13_17: "Подростки (13-17)",
    wizard_age_group_18: "Взрослые (18+)"
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
