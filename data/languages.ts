
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
  | 'landing_btn_continue' // New key
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
  | 'wiki_btn_saved'
  | 'wiki_btn_later'
  | 'wiki_btn_completed'
  | 'wiki_btn_mark_done'
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
  // New Marital Keys
  | 'wizard_marital_solo_title'
  | 'wizard_marital_solo_desc'
  | 'wizard_marital_pair_title'
  | 'wizard_marital_pair_desc'
  | 'wizard_marital_secret_title'
  | 'wizard_marital_secret_desc'
  | 'wizard_step4_title'
  | 'wizard_step4_desc'
  | 'wizard_step4_placeholder'
  | 'wizard_step4_no_match'
  // New Region Keys
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
  // New Permit Cards
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
  // New Education Cards
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
  
  // New Scale Keys
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
  | 'wizard_opt_cult_unsure'
  | 'wizard_step13_title'
  | 'wizard_opt_conf_life_low'
  | 'wizard_opt_conf_life_med'
  | 'wizard_opt_conf_life_high'
  | 'wizard_step14_title'
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
    wiki_btn_saved: "Saved",
    wiki_btn_later: "Later",
    wiki_btn_completed: "Completed",
    wiki_btn_mark_done: "Mark Done",
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
    
    // Marital
    wizard_marital_solo_title: "Flying Solo",
    wizard_marital_solo_desc: "Single, divorced, or widowed",
    wizard_marital_pair_title: "Partnered Up",
    wizard_marital_pair_desc: "Married or partnered",
    wizard_marital_secret_title: "It's a Mystery",
    wizard_marital_secret_desc: "It's complicated / secret",

    wizard_step4_title: "Where do you come from?",
    wizard_step4_desc: "Select your origin",
    wizard_step4_placeholder: "Start typing country name...",
    wizard_step4_no_match: "No matches found",
    
    // Region
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
    
    // Education Cards
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
    
    wizard_scale_1_motivation: "Low / None",
    wizard_scale_5_motivation: "Very High",
    
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
    
    wizard_scale_1_career: "I don't know anything",
    wizard_scale_5_career: "I know what to do",

    wizard_scale_1_life: "Still adjusting",
    wizard_scale_5_life: "Feels like home",

    // Step 12 - Reframed
    wizard_step12_title: "How connected do you feel to Finnish culture?",
    wizard_opt_cult_high: "I want to fully integrate",
    wizard_opt_cult_med: "I enjoy it, but I'm an observer",
    wizard_opt_cult_low: "It's all new & mysterious",
    wizard_opt_cult_unsure: "Not sure yet",

    // Step 13 - Reframed
    wizard_step13_title: "How much does the Finnish lifestyle resonate with you?",
    wizard_opt_conf_life_low: "Still adjusting",
    wizard_opt_conf_life_med: "Getting there",
    wizard_opt_conf_life_high: "Feels like home",

    wizard_step14_title: "Confidence in Job Hunting",
    
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
    landing_welcome: "Chào mừng!",
    landing_subtitle: "Tìm đường đến với công việc tại Phần Lan",
    landing_btn_quiz: "Giới thiệu về bạn",
    landing_btn_continue: "Khám phá Cẩm Nang",
    landing_btn_ask: "Bắt đầu trò chuyện",
    landing_load_sample: "Tải mẫu (Gabriela)",
    landing_erase: "Xóa bộ nhớ đệm",
    landing_add_key: "Thêm khóa API Gemini",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Chào mừng bạn trở lại với hướng dẫn viên Phần Lan của bạn.",
    dash_subtitle_guest: "Hãy thiết lập hồ sơ để bắt đầu.",
    dash_btn_guide: "Mở Cẩm Nang",
    dash_btn_ask: "Bắt đầu trò chuyện",
    dash_switch_profile: "Đổi hồ sơ",
    dash_new_profile: "Mới",
    dash_edit_profile: "Sửa",
    chat_placeholder: "Hỏi gì đó...",
    chat_end_session: "Kết thúc",
    chat_header_assistant: "Trợ lý",
    btn_back_dashboard: "Về Trang Chủ",
    profile_btn_guide: "Cẩm Nang",
    profile_btn_guide_desc: "Bài viết gợi ý",
    profile_btn_plan: "Kế Hoạch",
    profile_btn_plan_desc: "Sắp ra mắt",
    profile_sect_languages: "Ngôn ngữ",
    profile_sect_skills: "Kỹ năng",
    profile_sect_narrative: "Câu chuyện cá nhân",
    profile_label_aspirations: "Nguyện vọng",
    profile_label_challenges: "Nỗi lo / Thử thách",
    profile_label_education: "Giáo dục",
    profile_label_profession: "Nghề nghiệp",
    profile_completeness: "Hoàn thành {percentage}%",
    profile_completeness_hint: "Trả lời thêm vài câu hỏi để được tư vấn tốt hơn",
    profile_btn_update: "Cập nhật hồ sơ",
    profile_btn_continue: "Tiếp tục làm Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Dành riêng cho {name}",
    wiki_nav_list: "Danh sách",
    wiki_nav_icons: "Biểu tượng",
    wiki_explore_cats: "Khám phá Danh mục",
    wiki_explore_subtitle: "Chọn chủ đề để xem chi tiết.",
    wiki_full_index: "Mục lục đầy đủ",
    wiki_full_index_subtitle: "Duyệt tất cả chủ đề bên dưới.",
    wiki_btn_saved: "Đã lưu",
    wiki_btn_later: "Để sau",
    wiki_btn_completed: "Đã xong",
    wiki_btn_mark_done: "Đánh dấu xong",
    wizard_header_quiz: "Quiz",
    wizard_greeting_short: "Chào, {name}!",
    wizard_title_init: "Tạo Hồ Sơ",
    wizard_title_custom: "Hành trình của {name}",
    wizard_phase_identity: "PHẦN 1: DANH TÍNH",
    wizard_phase_demo: "PHẦN 2: THÔNG TIN CƠ BẢN",
    wizard_phase_status: "PHẦN 3: TRẠNG THÁI",
    wizard_phase_skills: "PHẦN 4: KỸ NĂNG",
    wizard_phase_mindset: "PHẦN 5: TƯ DUY",
    wizard_phase_vision: "PHẦN 6: TẦM NHÌN",
    wizard_nickname_hint: "* Bạn có thể dùng biệt danh để ẩn danh.",
    wizard_btn_ask: "Đặt câu hỏi",
    wizard_btn_next: "Tiếp theo",
    wizard_btn_prev: "Quay lại",
    wizard_btn_submit: "Hoàn tất",
    wizard_btn_finish_early: "Lưu & Xong ngay",
    wizard_btn_generate_name: "Tạo biệt danh!",
    wizard_ribbon_greeting: "Rất vui được gặp bạn, {name}!",
    wizard_title_name: "Bạn muốn được gọi là gì?",
    wizard_desc_name: "Nhập tên hoặc chọn biệt danh",
    wizard_placeholder_name: "Tên của bạn",
    wizard_step2_title: "Bạn bao nhiêu tuổi?",
    wizard_step2_desc: "Chọn nhóm tuổi của bạn",
    wizard_step2_placeholder: "Tuổi (ví dụ 29)",
    wizard_step3_title: "Tình trạng hôn nhân?",
    
    wizard_marital_solo_title: "Độc hành",
    wizard_marital_solo_desc: "Độc thân, ly hôn hoặc góa",
    wizard_marital_pair_title: "Có đôi",
    wizard_marital_pair_desc: "Đã kết hôn hoặc có bạn đời",
    wizard_marital_secret_title: "Bí mật",
    wizard_marital_secret_desc: "Tôi không muốn nói",

    wizard_step4_title: "Bạn đến từ đâu?",
    wizard_step4_desc: "Chọn nguồn gốc của bạn",
    wizard_step4_placeholder: "Nhập tên quốc gia...",
    wizard_step4_no_match: "Không tìm thấy",
    
    wizard_btn_search_country: "Tìm Quốc Gia",
    wizard_btn_select_region: "Chọn Khu Vực",
    wizard_region_europe: "Châu Âu",
    wizard_region_americas: "Châu Mỹ",
    wizard_region_asia: "Châu Á",
    wizard_region_africa: "Châu Phi",
    wizard_region_oceania: "Châu Đại Dương",
    wizard_region_middle_east: "Trung Đông",
    wizard_eu_question: "Công dân EU/EEA?",
    wizard_eu_yes: "Có",
    wizard_eu_no: "Không",

    wizard_step5_title: "Giấy phép cư trú của bạn cho phép làm việc gì?",
    wizard_permit_full_title: "Không giới hạn",
    wizard_permit_full_desc: "Vĩnh trú, Gia đình, EU hoặc Bằng cấp Phần Lan",
    wizard_permit_restricted_title: "Giới hạn ngành",
    wizard_permit_restricted_desc: "Giấy phép lao động theo ngành/công ty",
    wizard_permit_student_title: "Sinh viên",
    wizard_permit_student_desc: "Giờ làm việc hạn chế",

    wizard_step6_title: "Trình độ học vấn cao nhất",
    wizard_step6_desc: "Chọn con đường phù hợp với bạn nhất",
    wizard_step6_field_label: "Ngành học (Tùy chọn)",
    wizard_step6_field_placeholder: "ví dụ: Kỹ thuật, Nghệ thuật",
    
    wizard_edu_general_title: "Giáo dục Phổ thông",
    wizard_edu_general_desc: "Trung học / Chưa có bằng nghề.",
    wizard_edu_applied_title: "Nghề & Ứng dụng",
    wizard_edu_applied_desc: "Trường nghề (Amis) hoặc ĐH Ứng dụng (AMK).",
    wizard_edu_uni_title: "Bằng Đại học",
    wizard_edu_uni_desc: "Học thuật (Cử nhân, Thạc sĩ, Tiến sĩ).",

    wizard_step7_title: "Nghề nghiệp của bạn?",
    wizard_step7_desc: "Hoặc công việc bạn đang tìm kiếm?",
    wizard_step7_placeholder: "ví dụ: Y tá, Thợ hàn, Lập trình viên",
    wizard_step8_title: "Tiếng Phần Lan",
    wizard_lbl_finnish_level: "Trình độ",
    wizard_lbl_finnish_motivation: "Động lực học tập",
    wizard_opt_lang_none: "Chưa biết gì",
    wizard_opt_lang_basics: "Cơ bản (A1)",
    wizard_opt_lang_inter: "Trung cấp (A2-B1)",
    wizard_opt_lang_fluent: "Thành thạo (B2+)",

    wizard_scale_1_motivation: "Thấp",
    wizard_scale_5_motivation: "Rất cao",

    wizard_step9_title: "Trình độ tiếng Anh",
    wizard_opt_lang_en_none: "Không",
    wizard_opt_lang_en_basic: "Cơ bản",
    wizard_opt_lang_en_working: "Sử dụng trong công việc",
    wizard_opt_lang_en_fluent: "Bản ngữ / Thành thạo",
    wizard_step10_title: "Tầm nhìn của bạn",
    wizard_step10_aspirations_label: "Nguyện vọng",
    wizard_step10_aspirations_placeholder: "Bạn hy vọng đạt được điều gì?",
    wizard_step10_challenges_label: "Thử thách",
    wizard_step10_challenges_placeholder: "Bạn có lo lắng điều gì không?",
    
    wizard_step12_title: "Bạn cảm thấy thế nào về văn hóa Phần Lan?",
    wizard_opt_cult_high: "Muốn hòa nhập hoàn toàn",
    wizard_opt_cult_med: "Thích thú, nhưng chỉ quan sát",
    wizard_opt_cult_low: "Mọi thứ còn mới mẻ & bí ẩn",
    wizard_opt_cult_unsure: "Chưa chắc chắn",
    
    wizard_step13_title: "Lối sống Phần Lan phù hợp với bạn thế nào?",
    wizard_opt_conf_life_low: "Vẫn đang thích nghi",
    wizard_opt_conf_life_med: "Đang dần quen",
    wizard_opt_conf_life_high: "Như ở nhà",
    
    wizard_step14_title: "Tự tin tìm việc?",
    
    wizard_scale_1_career: "Mù tịt",
    wizard_scale_5_career: "Biết rõ cần làm gì",
    
    wizard_scale_1_life: "Đang thích nghi",
    wizard_scale_5_life: "Như ở nhà",

    wizard_step15_title: "Bạn nắm thông tin về Phần Lan thế nào?",
    wizard_opt_info_none: "Chưa biết gì",
    wizard_opt_info_some: "Biết sơ sơ",
    wizard_opt_info_yes: "Có hiểu biết",
    wizard_opt_info_high: "Rất am hiểu",
    wizard_step16_title: "Điều gì làm bạn hào hứng nhất?",
    wizard_opt_excite_career: "Cơ hội nghề nghiệp",
    wizard_opt_excite_life: "Chất lượng cuộc sống & An toàn",
    wizard_opt_excite_nature: "Thiên nhiên & Văn hóa",
    wizard_opt_excite_edu: "Giáo dục",
    wizard_opt_excite_idk: "Vẫn đang tìm hiểu"
  },
  "pt-br": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre seu caminho na Finlândia",
    landing_btn_quiz: "Fale sobre você",
    landing_btn_continue: "Explorar Meu Guia",
    landing_btn_ask: "Começar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
    landing_add_key: "Add Chave API Gemini",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bem-vindo de volta ao seu guia pessoal.",
    dash_subtitle_guest: "Vamos configurar seu perfil para começar.",
    dash_btn_guide: "Abrir Meu Guia",
    dash_btn_ask: "Começar conversa",
    dash_switch_profile: "Trocar Perfil",
    dash_new_profile: "Novo",
    dash_edit_profile: "Editar",
    chat_placeholder: "Pergunte algo...",
    chat_end_session: "Encerrar",
    chat_header_assistant: "Assistente",
    btn_back_dashboard: "Voltar ao Início",
    profile_btn_guide: "Meu Guia",
    profile_btn_guide_desc: "Artigos recomendados",
    profile_btn_plan: "Meu Plano",
    profile_btn_plan_desc: "Em breve",
    profile_sect_languages: "Idiomas",
    profile_sect_skills: "Habilidades",
    profile_sect_narrative: "Narrativa Pessoal",
    profile_label_aspirations: "Aspirações",
    profile_label_challenges: "Medos / Desafios",
    profile_label_education: "Educação",
    profile_label_profession: "Profissão",
    profile_completeness: "{percentage}% completo",
    profile_completeness_hint: "Responda mais algumas perguntas",
    profile_btn_update: "Atualizar Perfil",
    profile_btn_continue: "Continuar o Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Curado para {name}",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    wiki_explore_cats: "Explorar Categorias",
    wiki_explore_subtitle: "Selecione um tópico para ver detalhes.",
    wiki_full_index: "Índice Completo",
    wiki_full_index_subtitle: "Navegue por todos os tópicos.",
    wiki_btn_saved: "Salvo",
    wiki_btn_later: "Depois",
    wiki_btn_completed: "Concluído",
    wiki_btn_mark_done: "Concluir",
    wizard_header_quiz: "Quiz",
    wizard_greeting_short: "Olá, {name}!",
    wizard_title_init: "Criar Perfil",
    wizard_title_custom: "Jornada de {name}",
    wizard_phase_identity: "FASE 1: IDENTIDADE",
    wizard_phase_demo: "FASE 2: HISTÓRICO",
    wizard_phase_status: "FASE 3: STATUS",
    wizard_phase_skills: "FASE 4: HABILIDADES",
    wizard_phase_mindset: "FASE 5: MINDSET",
    wizard_phase_vision: "FASE 6: VISÃO",
    wizard_nickname_hint: "* Você pode usar um apelido para anonimato.",
    wizard_btn_ask: "Fazer pergunta",
    wizard_btn_next: "Próximo",
    wizard_btn_prev: "Anterior",
    wizard_btn_submit: "Enviar",
    wizard_btn_finish_early: "Salvar e Finalizar",
    wizard_btn_generate_name: "Me dê um apelido!",
    wizard_ribbon_greeting: "Prazer em te conhecer, {name}!",
    wizard_title_name: "Como você quer ser chamado?",
    wizard_desc_name: "Digite seu nome ou escolha um apelido",
    wizard_placeholder_name: "Seu nome",
    wizard_step2_title: "Qual sua idade?",
    wizard_step2_desc: "Selecione sua faixa etária",
    wizard_step2_placeholder: "Sua idade (ex: 29)",
    wizard_step3_title: "Estado civil?",

    wizard_marital_solo_title: "Voo Solo",
    wizard_marital_solo_desc: "Solteiro(a), divorciado(a) ou viúvo(a)",
    wizard_marital_pair_title: "Em Dupla",
    wizard_marital_pair_desc: "Casado(a) ou em união",
    wizard_marital_secret_title: "Mistério",
    wizard_marital_secret_desc: "Prefiro não dizer",

    wizard_step4_title: "De onde você vem?",
    wizard_step4_desc: "Selecione sua origem",
    wizard_step4_placeholder: "Digite o nome do país...",
    wizard_step4_no_match: "Nenhum resultado",

    wizard_btn_search_country: "Buscar País",
    wizard_btn_select_region: "Selecionar Região",
    wizard_region_europe: "Europa",
    wizard_region_americas: "Américas",
    wizard_region_asia: "Ásia",
    wizard_region_africa: "África",
    wizard_region_oceania: "Oceania",
    wizard_region_middle_east: "Oriente Médio",
    wizard_eu_question: "Cidadão da UE/EEE?",
    wizard_eu_yes: "Sim",
    wizard_eu_no: "Não",

    wizard_step5_title: "Que tipo de trabalho seu visto permite?",
    wizard_permit_full_title: "Ilimitado",
    wizard_permit_full_desc: "Permanente, Família, UE, ou Curso Sup. Finlandês",
    wizard_permit_restricted_title: "Restrito à Área",
    wizard_permit_restricted_desc: "Visto de trabalho atrelado a setor/empresa",
    wizard_permit_student_title: "Estudante",
    wizard_permit_student_desc: "Horas limitadas durante estudos",

    wizard_step6_title: "Nível de Escolaridade",
    wizard_step6_desc: "Qual caminho melhor descreve seu histórico?",
    wizard_step6_field_label: "Área de Estudo (Opcional)",
    wizard_step6_field_placeholder: "ex: Engenharia, Artes",
    
    wizard_edu_general_title: "Educação Geral",
    wizard_edu_general_desc: "Ensino Médio. Sem qualificação técnica.",
    wizard_edu_applied_title: "Profissionalizante & Aplicada",
    wizard_edu_applied_desc: "Escola técnica (Amis) ou Uni. de Ciências Aplicadas (AMK).",
    wizard_edu_uni_title: "Universidade",
    wizard_edu_uni_desc: "Grau acadêmico (Bacharelado, Mestrado, PhD).",

    wizard_step7_title: "Qual sua profissão?",
    wizard_step7_desc: "Ou que trabalho você procura?",
    wizard_step7_placeholder: "ex: Enfermeiro, Soldador, Dev",
    wizard_step8_title: "Idioma Finlandês",
    wizard_lbl_finnish_level: "Nível Atual",
    wizard_lbl_finnish_motivation: "Motivação para Aprender",
    wizard_opt_lang_none: "Nenhum",
    wizard_opt_lang_basics: "Básico (A1)",
    wizard_opt_lang_inter: "Intermediário (A2-B1)",
    wizard_opt_lang_fluent: "Fluente (B2+)",

    wizard_scale_1_motivation: "Baixa",
    wizard_scale_5_motivation: "Muito Alta",

    wizard_step9_title: "Nível de Inglês",
    wizard_opt_lang_en_none: "Nenhum",
    wizard_opt_lang_en_basic: "Básico",
    wizard_opt_lang_en_working: "Profissional",
    wizard_opt_lang_en_fluent: "Fluente/Nativo",
    wizard_step10_title: "Sua Visão",
    wizard_step10_aspirations_label: "Aspirações",
    wizard_step10_aspirations_placeholder: "O que você espera alcançar?",
    wizard_step10_challenges_label: "Desafios",
    wizard_step10_challenges_placeholder: "Alguma preocupação específica?",
    
    wizard_step12_title: "Quão conectado você se sente à cultura finlandesa?",
    wizard_opt_cult_high: "Quero me integrar totalmente",
    wizard_opt_cult_med: "Gosto, mas sou observador",
    wizard_opt_cult_low: "É tudo novo e misterioso",
    wizard_opt_cult_unsure: "Não tenho certeza",
    
    wizard_step13_title: "O quanto o estilo de vida finlandês ressoa com você?",
    wizard_opt_conf_life_low: "Ainda me adaptando",
    wizard_opt_conf_life_med: "Chegando lá",
    wizard_opt_conf_life_high: "Sinto-me em casa",

    wizard_step14_title: "Confiança na busca por emprego",

    wizard_scale_1_career: "Não sei nada",
    wizard_scale_5_career: "Sei o que fazer",
    
    wizard_scale_1_life: "Ainda me adaptando",
    wizard_scale_5_life: "Sinto-me em casa",

    wizard_step15_title: "Quão informado você está?",
    wizard_opt_info_none: "Nada informado",
    wizard_opt_info_some: "Um pouco informado",
    wizard_opt_info_yes: "Informado",
    wizard_opt_info_high: "Muito informado",
    wizard_step16_title: "O que mais te anima?",
    wizard_opt_excite_career: "Oportunidades de carreira",
    wizard_opt_excite_life: "Qualidade de vida e segurança",
    wizard_opt_excite_nature: "Natureza e cultura",
    wizard_opt_excite_edu: "Educação",
    wizard_opt_excite_idk: "Ainda estou descobrindo"
  },
  "pt-pt": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontra o teu caminho na Finlândia",
    landing_btn_quiz: "Fala-me sobre ti",
    landing_btn_continue: "Explorar o Meu Guia",
    landing_btn_ask: "Iniciar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
    landing_add_key: "Add Chave API Gemini",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bem-vindo de volta ao teu guia pessoal.",
    dash_subtitle_guest: "Vamos configurar o teu perfil para começar.",
    dash_btn_guide: "Abrir o Meu Guia",
    dash_btn_ask: "Iniciar conversa",
    dash_switch_profile: "Trocar Perfil",
    dash_new_profile: "Novo",
    dash_edit_profile: "Editar",
    chat_placeholder: "Pergunta algo...",
    chat_end_session: "Terminar",
    chat_header_assistant: "Assistente",
    btn_back_dashboard: "Voltar ao Início",
    profile_btn_guide: "O Meu Guia",
    profile_btn_guide_desc: "Artigos recomendados",
    profile_btn_plan: "O Meu Plano",
    profile_btn_plan_desc: "Em breve",
    profile_sect_languages: "Línguas",
    profile_sect_skills: "Competências",
    profile_sect_narrative: "Narrativa Pessoal",
    profile_label_aspirations: "Aspirações",
    profile_label_challenges: "Medos / Desafios",
    profile_label_education: "Educação",
    profile_label_profession: "Profissão",
    profile_completeness: "{percentage}% completo",
    profile_completeness_hint: "Responde a mais algumas perguntas",
    profile_btn_update: "Atualizar Perfil",
    profile_btn_continue: "Continuar o Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Curado para {name}",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    wiki_explore_cats: "Explorar Categorias",
    wiki_explore_subtitle: "Seleciona um tópico para ver detalhes.",
    wiki_full_index: "Índice Completo",
    wiki_full_index_subtitle: "Navega por todos os tópicos.",
    wiki_btn_saved: "Guardado",
    wiki_btn_later: "Depois",
    wiki_btn_completed: "Concluído",
    wiki_btn_mark_done: "Concluir",
    wizard_header_quiz: "Quiz",
    wizard_greeting_short: "Olá, {name}!",
    wizard_title_init: "Criar Perfil",
    wizard_title_custom: "Jornada de {name}",
    wizard_phase_identity: "FASE 1: IDENTIDADE",
    wizard_phase_demo: "FASE 2: HISTÓRICO",
    wizard_phase_status: "FASE 3: STATUS",
    wizard_phase_skills: "FASE 4: COMPETÊNCIAS",
    wizard_phase_mindset: "FASE 5: MINDSET",
    wizard_phase_vision: "FASE 6: VISÃO",
    wizard_nickname_hint: "* Podes usar uma alcunha para anonimato.",
    wizard_btn_ask: "Fazer pergunta",
    wizard_btn_next: "Seguinte",
    wizard_btn_prev: "Anterior",
    wizard_btn_submit: "Submeter",
    wizard_btn_finish_early: "Guardar e Sair",
    wizard_btn_generate_name: "Dá-me uma alcunha!",
    wizard_ribbon_greeting: "Prazer em conhecer-te, {name}!",
    wizard_title_name: "Como queres ser tratado?",
    wizard_desc_name: "Introduz o teu nome ou escolhe",
    wizard_placeholder_name: "O teu nome",
    wizard_step2_title: "Qual a tua idade?",
    wizard_step2_desc: "Seleciona a tua faixa etária",
    wizard_step2_placeholder: "A tua idade (ex: 29)",
    wizard_step3_title: "Estado civil?",
    
    wizard_marital_solo_title: "Voo Solo",
    wizard_marital_solo_desc: "Solteiro(a), divorciado(a) ou viúvo(a)",
    wizard_marital_pair_title: "A Dois",
    wizard_marital_pair_desc: "Casado(a) ou em união",
    wizard_marital_secret_title: "Mistério",
    wizard_marital_secret_desc: "Prefiro não dizer",

    wizard_step4_title: "De onde vens?",
    wizard_step4_desc: "Seleciona a tua origem",
    wizard_step4_placeholder: "Escreve o nome do país...",
    wizard_step4_no_match: "Sem resultados",

    wizard_btn_search_country: "Procurar País",
    wizard_btn_select_region: "Selecionar Região",
    wizard_region_europe: "Europa",
    wizard_region_americas: "Américas",
    wizard_region_asia: "Ásia",
    wizard_region_africa: "África",
    wizard_region_oceania: "Oceânia",
    wizard_region_middle_east: "Médio Oriente",
    wizard_eu_question: "Cidadão da UE/EEE?",
    wizard_eu_yes: "Sim",
    wizard_eu_no: "Não",

    wizard_step5_title: "Que trabalho permite a tua autorização?",
    wizard_permit_full_title: "Ilimitado",
    wizard_permit_full_desc: "Permanente, Família, UE, ou Curso Sup. Finlandês",
    wizard_permit_restricted_title: "Restrito à Área",
    wizard_permit_restricted_desc: "Visto de trabalho atrelado a setor/empresa",
    wizard_permit_student_title: "Estudante",
    wizard_permit_student_desc: "Horas limitadas durante estudos",

    wizard_step6_title: "Nível de Escolaridade",
    wizard_step6_desc: "Que percurso descreve melhor o teu histórico?",
    wizard_step6_field_label: "Área de Estudo (Opcional)",
    wizard_step6_field_placeholder: "ex: Engenharia, Artes",
    
    wizard_edu_general_title: "Ensino Geral",
    wizard_edu_general_desc: "Ensino Secundário. Sem qualificação técnica.",
    wizard_edu_applied_title: "Profissional & Aplicada",
    wizard_edu_applied_desc: "Ensino Profissional (Amis) ou Uni. de Ciências Aplicadas (AMK).",
    wizard_edu_uni_title: "Universidade",
    wizard_edu_uni_desc: "Grau académico (Licenciatura, Mestrado, Doutoramento).",

    wizard_step7_title: "Qual a tua profissão?",
    wizard_step7_desc: "Ou que trabalho procuras?",
    wizard_step7_placeholder: "ex: Enfermeiro, Soldador, Dev",
    wizard_step8_title: "Língua Finlandesa",
    wizard_lbl_finnish_level: "Nível Atual",
    wizard_lbl_finnish_motivation: "Motivação para Aprender",
    wizard_opt_lang_none: "Nenhum",
    wizard_opt_lang_basics: "Básico (A1)",
    wizard_opt_lang_inter: "Intermédio (A2-B1)",
    wizard_opt_lang_fluent: "Fluente (B2+)",

    wizard_scale_1_motivation: "Baixa",
    wizard_scale_5_motivation: "Muito Alta",

    wizard_step9_title: "Nível de Inglês",
    wizard_opt_lang_en_none: "Nenhum",
    wizard_opt_lang_en_basic: "Básico",
    wizard_opt_lang_en_working: "Profissional",
    wizard_opt_lang_en_fluent: "Fluente/Nativo",
    wizard_step10_title: "A tua Visão",
    wizard_step10_aspirations_label: "Aspirações",
    wizard_step10_aspirations_placeholder: "O que esperas alcançar?",
    wizard_step10_challenges_label: "Desafios",
    wizard_step10_challenges_placeholder: "Alguma preocupação específica?",
    
    wizard_step12_title: "Quão ligado te sentes à cultura finlandesa?",
    wizard_opt_cult_high: "Quero integrar-me totalmente",
    wizard_opt_cult_med: "Gosto, mas sou observador",
    wizard_opt_cult_low: "É tudo novo e misterioso",
    wizard_opt_cult_unsure: "Não tenho a certeza",
    
    wizard_step13_title: "Quanto é que o estilo de vida finlandês ressoa contigo?",
    wizard_opt_conf_life_low: "Ainda a ajustar-me",
    wizard_opt_conf_life_med: "A melhorar",
    wizard_opt_conf_life_high: "Sinto-me em casa",

    wizard_step14_title: "Confiança na procura de emprego",

    wizard_scale_1_career: "Não sei nada",
    wizard_scale_5_career: "Sei o que fazer",
    
    wizard_scale_1_life: "Ainda a ajustar-me",
    wizard_scale_5_life: "Sinto-me em casa",

    wizard_step15_title: "Quão informado estás?",
    wizard_opt_info_none: "Nada informado",
    wizard_opt_info_some: "Um pouco informado",
    wizard_opt_info_yes: "Informado",
    wizard_opt_info_high: "Muito informado",
    wizard_step16_title: "O que mais te entusiasma?",
    wizard_opt_excite_career: "Oportunidades de carreira",
    wizard_opt_excite_life: "Qualidade de vida e segurança",
    wizard_opt_excite_nature: "Natureza e cultura",
    wizard_opt_excite_edu: "Educação",
    wizard_opt_excite_idk: "Ainda estou a descobrir"
  },
  ru: {
    landing_welcome: "Добро пожаловать!",
    landing_subtitle: "Найдите свой путь в Финляндии",
    landing_btn_quiz: "Расскажите о себе",
    landing_btn_continue: "Исследовать мой гид",
    landing_btn_ask: "Начать чат",
    landing_load_sample: "Загрузить пример (Габриэла)",
    landing_erase: "Сброс данных",
    landing_add_key: "Добавить ключ API",
    landing_choose_lang: "Выберите язык",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "С возвращением к вашему гиду по Финляндии.",
    dash_subtitle_guest: "Давайте настроим ваш профиль для начала.",
    dash_btn_guide: "Открыть Мой Гид",
    dash_btn_ask: "Начать чат",
    dash_switch_profile: "Сменить профиль",
    dash_new_profile: "Новый",
    dash_edit_profile: "Ред.",
    chat_placeholder: "Спросите что-нибудь...",
    chat_end_session: "Завершить",
    chat_header_assistant: "Ассистент",
    btn_back_dashboard: "На главную",
    profile_btn_guide: "Мой Гид",
    profile_btn_guide_desc: "Рекомендации",
    profile_btn_plan: "Мой План",
    profile_btn_plan_desc: "Скоро",
    profile_sect_languages: "Языки",
    profile_sect_skills: "Навыки",
    profile_sect_narrative: "О себе",
    profile_label_aspirations: "Цели",
    profile_label_challenges: "Страхи / Вызовы",
    profile_label_education: "Образование",
    profile_label_profession: "Профессия",
    profile_completeness: "{percentage}% заполнено",
    profile_completeness_hint: "Ответьте еще на пару вопросов",
    profile_btn_update: "Обновить профиль",
    profile_btn_continue: "Продолжить опрос",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Для {name}",
    wiki_nav_list: "Список",
    wiki_nav_icons: "Иконки",
    wiki_explore_cats: "Категории",
    wiki_explore_subtitle: "Выберите тему для изучения.",
    wiki_full_index: "Полный индекс",
    wiki_full_index_subtitle: "Просмотр всех тем.",
    wiki_btn_saved: "Сохранено",
    wiki_btn_later: "Позже",
    wiki_btn_completed: "Готово",
    wiki_btn_mark_done: "Завершить",
    wizard_header_quiz: "Опрос",
    wizard_greeting_short: "Привет, {name}!",
    wizard_title_init: "Создать профиль",
    wizard_title_custom: "Персонаж: {name}",
    wizard_phase_identity: "ЭТАП 1: ЛИЧНОСТЬ",
    wizard_phase_demo: "ЭТАП 2: ДЕМОГРАФИЯ",
    wizard_phase_status: "ЭТАП 3: СТАТУС",
    wizard_phase_skills: "ЭТАП 4: НАВЫКИ",
    wizard_phase_mindset: "ЭТАП 5: НАСТРОЙ",
    wizard_phase_vision: "ЭТАП 6: ВИДЕНИЕ",
    wizard_nickname_hint: "* Вы можете использовать ник для анонимности.",
    wizard_btn_ask: "Задать вопрос",
    wizard_btn_next: "Далее",
    wizard_btn_prev: "Назад",
    wizard_btn_submit: "Готово",
    wizard_btn_finish_early: "Сохранить и выйти",
    wizard_btn_generate_name: "Придумай мне ник!",
    wizard_ribbon_greeting: "Приятно познакомиться, {name}!",
    wizard_title_name: "Как к вам обращаться?",
    wizard_desc_name: "Введите имя или выберите ник",
    wizard_placeholder_name: "Ваше имя",
    wizard_step2_title: "Сколько вам лет?",
    wizard_step2_desc: "Выберите возрастную группу",
    wizard_step2_placeholder: "Возраст (напр. 29)",
    wizard_step3_title: "Семейное положение?",
    
    wizard_marital_solo_title: "Соло",
    wizard_marital_solo_desc: "Холост(а), разведен(а) или вдовец/вдова",
    wizard_marital_pair_title: "В паре",
    wizard_marital_pair_desc: "Женат/Замужем или в отношениях",
    wizard_marital_secret_title: "Секрет",
    wizard_marital_secret_desc: "Предпочитаю не говорить",

    wizard_step4_title: "Откуда вы приехали?",
    wizard_step4_desc: "Выберите страну происхождения",
    wizard_step4_placeholder: "Начните вводить страну...",
    wizard_step4_no_match: "Не найдено",

    wizard_btn_search_country: "Поиск страны",
    wizard_btn_select_region: "Выбор региона",
    wizard_region_europe: "Европа",
    wizard_region_americas: "Америка",
    wizard_region_asia: "Азия",
    wizard_region_africa: "Африка",
    wizard_region_oceania: "Океания",
    wizard_region_middle_east: "Ближний Восток",
    wizard_eu_question: "Гражданин ЕС/ЕЭЗ?",
    wizard_eu_yes: "Да",
    wizard_eu_no: "Нет",

    wizard_step5_title: "Какую работу позволяет ваш ВНЖ?",
    wizard_permit_full_title: "Без ограничений",
    wizard_permit_full_desc: "ПМЖ, Семья, ЕС или Финский диплом",
    wizard_permit_restricted_title: "Ограниченный",
    wizard_permit_restricted_desc: "Рабочий ВНЖ с привязкой к сфере",
    wizard_permit_student_title: "Студент",
    wizard_permit_student_desc: "Ограниченные часы работы",

    wizard_step6_title: "Уровень образования",
    wizard_step6_desc: "Выберите наиболее подходящий путь",
    wizard_step6_field_label: "Специальность (необязательно)",
    wizard_step6_field_placeholder: "напр. Инженерия, Искусство",

    wizard_edu_general_title: "Общее образование",
    wizard_edu_general_desc: "Старшая школа. Без специальности.",
    wizard_edu_applied_title: "Профессиональное / AMK",
    wizard_edu_applied_desc: "Колледж или Университет прикладных наук.",
    wizard_edu_uni_title: "Университет",
    wizard_edu_uni_desc: "Академическая степень (Бакалавр, Магистр, PhD).",

    wizard_step7_title: "Ваша профессия?",
    wizard_step7_desc: "Или какую работу ищете?",
    wizard_step7_placeholder: "напр. Медсестра, Сварщик, Программист",
    wizard_step8_title: "Финский язык",
    wizard_lbl_finnish_level: "Текущий уровень",
    wizard_lbl_finnish_motivation: "Мотивация учить",
    wizard_opt_lang_none: "Нулевой",
    wizard_opt_lang_basics: "Базовый (A1)",
    wizard_opt_lang_inter: "Средний (A2-B1)",
    wizard_opt_lang_fluent: "Свободный (B2+)",

    wizard_scale_1_motivation: "Нет",
    wizard_scale_5_motivation: "Очень высокая",

    wizard_step9_title: "Уровень английского",
    wizard_opt_lang_en_none: "Нулевой",
    wizard_opt_lang_en_basic: "Базовый",
    wizard_opt_lang_en_working: "Рабочий",
    wizard_opt_lang_en_fluent: "Свободный/Родной",
    wizard_step10_title: "Ваши планы",
    wizard_step10_aspirations_label: "Чего хотите достичь?",
    wizard_step10_aspirations_placeholder: "Ваши цели...",
    wizard_step10_challenges_label: "Проблемы",
    wizard_step10_challenges_placeholder: "Что вас беспокоит?",
    
    wizard_step12_title: "Насколько вы связаны с финской культурой?",
    wizard_opt_cult_high: "Хочу полностью интегрироваться",
    wizard_opt_cult_med: "Мне нравится, но я наблюдатель",
    wizard_opt_cult_low: "Все новое и загадочное",
    wizard_opt_cult_unsure: "Не уверен",
    
    wizard_step13_title: "Насколько вам близок финский образ жизни?",
    wizard_opt_conf_life_low: "Все еще привыкаю",
    wizard_opt_conf_life_med: "Осваиваюсь",
    wizard_opt_conf_life_high: "Чувствую себя как дома",
    
    wizard_step14_title: "Уверенность в поиске работы",
    
    wizard_scale_1_career: "Не знаю ничего",
    wizard_scale_5_career: "Знаю что делать",
    
    wizard_scale_1_life: "Привыкаю",
    wizard_scale_5_life: "Как дома",

    wizard_step15_title: "Насколько вы информированы?",
    wizard_opt_info_none: "Вообще не знаю",
    wizard_opt_info_some: "Немного знаю",
    wizard_opt_info_yes: "Знаю",
    wizard_opt_info_high: "Отлично знаю",
    wizard_step16_title: "Что вас больше всего радует?",
    wizard_opt_excite_career: "Карьерные возможности",
    wizard_opt_excite_life: "Качество жизни и безопасность",
    wizard_opt_excite_nature: "Природа и культура",
    wizard_opt_excite_edu: "Образование",
    wizard_opt_excite_idk: "Пока не знаю"
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
