
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
  | 'wizard_step10_challenges_placeholder';

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
    wizard_step10_challenges_placeholder: "Any specific worries?"
  },
  vi: {
    landing_welcome: "Chào mừng!",
    landing_subtitle: "Tìm con đường làm việc tại Phần Lan",
    landing_btn_quiz: "Giới thiệu về bản thân",
    landing_btn_ask: "Bắt đầu trò chuyện",
    landing_load_sample: "Tải mẫu (Gabriela)",
    landing_erase: "Xóa bộ nhớ đệm",
    landing_add_key: "Thêm khóa API Gemini",
    landing_choose_lang: "Chọn ngôn ngữ",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Chào mừng trở lại với hướng dẫn Phần Lan cá nhân của bạn.",
    dash_subtitle_guest: "Hãy thiết lập hồ sơ để bắt đầu.",
    dash_btn_guide: "Mở Hướng dẫn Phần Lan",
    dash_btn_ask: "Bắt đầu trò chuyện",
    dash_switch_profile: "Chuyển hồ sơ",
    dash_new_profile: "Mới",
    dash_edit_profile: "Sửa",
    dash_profile_overview: "Tổng quan hồ sơ",
    dash_education: "Giáo dục",
    dash_profession: "Nghề nghiệp",
    dash_languages: "Ngôn ngữ",
    dash_narrative_aspirations: "Nguyện vọng",
    dash_narrative_challenges: "Thử thách",
    chat_placeholder: "Hỏi gì đó...",
    chat_end_session: "Kết thúc",
    chat_header_assistant: "Trợ lý",
    btn_back_dashboard: "Về trang chủ",
    profile_btn_guide: "Hướng dẫn",
    profile_btn_guide_desc: "Bài viết đề xuất",
    profile_btn_plan: "Kế hoạch",
    profile_btn_plan_desc: "Sắp ra mắt",
    profile_sect_languages: "Ngôn ngữ",
    profile_sect_skills: "Kỹ năng",
    profile_sect_narrative: "Câu chuyện",
    profile_label_aspirations: "Nguyện vọng",
    profile_label_challenges: "Thử thách",
    profile_label_education: "Giáo dục",
    profile_label_profession: "Nghề nghiệp",
    profile_completeness: "Hoàn thành {percentage}%",
    profile_completeness_hint: "Trả lời thêm vài câu hỏi để nhận lời khuyên tốt hơn",
    profile_btn_update: "Cập nhật",
    profile_btn_continue: "Tiếp tục",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Dành riêng cho {name}",
    wiki_nav_list: "Danh sách",
    wiki_nav_icons: "Biểu tượng",
    wiki_explore_cats: "Khám phá Danh mục",
    wiki_explore_subtitle: "Chọn một chủ đề để xem chi tiết.",
    wiki_full_index: "Mục lục",
    wiki_full_index_subtitle: "Duyệt tất cả chủ đề bên dưới.",
    wizard_btn_ask: "Đặt câu hỏi",
    wizard_btn_next: "Tiếp theo",
    wizard_btn_prev: "Quay lại",
    wizard_btn_submit: "Hoàn thành",
    wizard_title_name: "Bạn muốn được gọi là gì?",
    wizard_desc_name: "Nhập tên của bạn hoặc chọn",
    wizard_placeholder_name: "Tên của bạn",
    wizard_step2_title: "Bạn bao nhiêu tuổi?",
    wizard_step2_desc: "Nhập tuổi chính xác hoặc chọn khoảng tuổi",
    wizard_step2_placeholder: "Tuổi của bạn (vd: 29)",
    wizard_step3_title: "Tình trạng hôn nhân của bạn?",
    wizard_opt_single: "Độc thân",
    wizard_opt_married: "Đã kết hôn",
    wizard_opt_partnered: "Sống chung",
    wizard_opt_divorced: "Đã ly hôn",
    wizard_opt_widowed: "Góa bụa",
    wizard_opt_prefer_no: "Không muốn tiết lộ",
    wizard_step4_title: "Bạn đến từ đâu?",
    wizard_step4_desc: "Chọn quốc gia của bạn",
    wizard_step4_placeholder: "Bắt đầu nhập tên quốc gia...",
    wizard_step4_no_match: "Không tìm thấy",
    wizard_step5_title: "Loại giấy phép cư trú của bạn?",
    wizard_opt_work: "Làm việc",
    wizard_opt_student: "Sinh viên",
    wizard_opt_family: "Gia đình",
    wizard_opt_eu: "Đăng ký EU",
    wizard_opt_protection: "Bảo vệ quốc tế",
    wizard_opt_visitor: "Khách du lịch / Khác",
    wizard_step6_title: "Trình độ học vấn cao nhất",
    wizard_step6_field_label: "Ngành học (Tùy chọn)",
    wizard_step6_field_placeholder: "vd: Kỹ thuật, Nghệ thuật",
    wizard_opt_hs: "Trung học",
    wizard_opt_vocational: "Học nghề",
    wizard_opt_bachelors: "Cử nhân",
    wizard_opt_masters: "Thạc sĩ",
    wizard_opt_phd: "Tiến sĩ",
    wizard_opt_other: "Khác",
    wizard_step7_title: "Nghề nghiệp của bạn?",
    wizard_step7_desc: "Hoặc công việc bạn đang tìm kiếm?",
    wizard_step7_placeholder: "vd: Y tá, Thợ hàn, Lập trình viên",
    wizard_step8_title: "Trình độ tiếng Phần Lan",
    wizard_opt_lang_none: "Chưa biết",
    wizard_opt_lang_basics: "Cơ bản (A1)",
    wizard_opt_lang_inter: "Trung cấp (A2-B1)",
    wizard_opt_lang_fluent: "Thành thạo (B2+)",
    wizard_step9_title: "Trình độ tiếng Anh",
    wizard_opt_lang_en_none: "Không",
    wizard_opt_lang_en_basic: "Cơ bản",
    wizard_opt_lang_en_working: "Làm việc được",
    wizard_opt_lang_en_fluent: "Thành thạo",
    wizard_step10_title: "Tầm nhìn của bạn",
    wizard_step10_aspirations_label: "Nguyện vọng",
    wizard_step10_aspirations_placeholder: "Bạn hy vọng đạt được gì?",
    wizard_step10_challenges_label: "Thử thách",
    wizard_step10_challenges_placeholder: "Lo lắng cụ thể nào?"
  },
  "pt-br": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre o seu caminho para trabalhar na Finlândia",
    landing_btn_quiz: "Conte-me sobre você",
    landing_btn_ask: "Iniciar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
    landing_add_key: "Adicionar Chave API Gemini",
    landing_choose_lang: "Escolher Idioma",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bem-vindo de volta ao seu guia pessoal da Finlândia.",
    dash_subtitle_guest: "Vamos configurar seu perfil para começar.",
    dash_btn_guide: "Abrir Guia da Finlândia",
    dash_btn_ask: "Iniciar conversa",
    dash_switch_profile: "Trocar Perfil",
    dash_new_profile: "Novo",
    dash_edit_profile: "Editar",
    dash_profile_overview: "Resumo do Perfil",
    dash_education: "Educação",
    dash_profession: "Profissão",
    dash_languages: "Idiomas",
    dash_narrative_aspirations: "Aspirações",
    dash_narrative_challenges: "Desafios",
    chat_placeholder: "Pergunte algo...",
    chat_end_session: "Encerrar",
    chat_header_assistant: "Assistente",
    btn_back_dashboard: "Voltar ao Painel",
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
    profile_completeness_hint: "Responda a mais algumas perguntas",
    profile_btn_update: "Atualizar Perfil",
    profile_btn_continue: "Continuar Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Curado para {name}",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    wiki_explore_cats: "Explorar Categorias",
    wiki_explore_subtitle: "Selecione um tópico para ver detalhes.",
    wiki_full_index: "Índice Completo",
    wiki_full_index_subtitle: "Navegue por todos os tópicos abaixo.",
    wizard_btn_ask: "Fazer uma pergunta",
    wizard_btn_next: "Próximo",
    wizard_btn_prev: "Voltar",
    wizard_btn_submit: "Enviar",
    wizard_title_name: "Como você gostaria de ser chamado?",
    wizard_desc_name: "Digite seu nome ou escolha",
    wizard_placeholder_name: "Seu nome",
    wizard_step2_title: "Qual a sua idade?",
    wizard_step2_desc: "Digite a idade exata ou escolha uma faixa",
    wizard_step2_placeholder: "Sua idade (ex: 29)",
    wizard_step3_title: "Qual seu estado civil?",
    wizard_opt_single: "Solteiro(a)",
    wizard_opt_married: "Casado(a)",
    wizard_opt_partnered: "União Estável",
    wizard_opt_divorced: "Divorciado(a)",
    wizard_opt_widowed: "Viúvo(a)",
    wizard_opt_prefer_no: "Prefiro não dizer",
    wizard_step4_title: "De onde você vem?",
    wizard_step4_desc: "Selecione seu país de origem",
    wizard_step4_placeholder: "Comece a digitar o país...",
    wizard_step4_no_match: "Nenhum resultado",
    wizard_step5_title: "Qual seu tipo de permissão de residência?",
    wizard_opt_work: "Trabalho",
    wizard_opt_student: "Estudante",
    wizard_opt_family: "Laços Familiares",
    wizard_opt_eu: "Registro UE",
    wizard_opt_protection: "Proteção Internacional",
    wizard_opt_visitor: "Visitante / Outro",
    wizard_step6_title: "Nível de Escolaridade",
    wizard_step6_field_label: "Área de Estudo (Opcional)",
    wizard_step6_field_placeholder: "ex: Engenharia, Artes",
    wizard_opt_hs: "Ensino Médio",
    wizard_opt_vocational: "Profissionalizante",
    wizard_opt_bachelors: "Bacharelado",
    wizard_opt_masters: "Mestrado",
    wizard_opt_phd: "Doutorado",
    wizard_opt_other: "Outro",
    wizard_step7_title: "Qual sua profissão?",
    wizard_step7_desc: "Ou qual trabalho você procura?",
    wizard_step7_placeholder: "ex: Enfermeiro, Soldador, Dev",
    wizard_step8_title: "Nível de Finlandês",
    wizard_opt_lang_none: "Nenhum",
    wizard_opt_lang_basics: "Básico (A1)",
    wizard_opt_lang_inter: "Intermediário (A2-B1)",
    wizard_opt_lang_fluent: "Fluente (B2+)",
    wizard_step9_title: "Nível de Inglês",
    wizard_opt_lang_en_none: "Nenhum",
    wizard_opt_lang_en_basic: "Básico",
    wizard_opt_lang_en_working: "Profissional",
    wizard_opt_lang_en_fluent: "Fluente/Nativo",
    wizard_step10_title: "Sua Visão",
    wizard_step10_aspirations_label: "Aspirações",
    wizard_step10_aspirations_placeholder: "O que você espera alcançar?",
    wizard_step10_challenges_label: "Desafios",
    wizard_step10_challenges_placeholder: "Alguma preocupação específica?"
  },
  "pt-pt": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre o seu caminho para trabalhar na Finlândia",
    landing_btn_quiz: "Conte-me sobre si",
    landing_btn_ask: "Iniciar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
    landing_add_key: "Adicionar Chave API Gemini",
    landing_choose_lang: "Escolher Idioma",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "Bem-vindo de volta ao seu guia pessoal da Finlândia.",
    dash_subtitle_guest: "Vamos configurar o seu perfil para começar.",
    dash_btn_guide: "Abrir Guia da Finlândia",
    dash_btn_ask: "Iniciar conversa",
    dash_switch_profile: "Mudar Perfil",
    dash_new_profile: "Novo",
    dash_edit_profile: "Editar",
    dash_profile_overview: "Resumo do Perfil",
    dash_education: "Educação",
    dash_profession: "Profissão",
    dash_languages: "Idiomas",
    dash_narrative_aspirations: "Aspirações",
    dash_narrative_challenges: "Desafios",
    chat_placeholder: "Pergunte algo...",
    chat_end_session: "Terminar Sessão",
    chat_header_assistant: "Assistente",
    btn_back_dashboard: "Voltar ao Painel",
    profile_btn_guide: "O Meu Guia",
    profile_btn_guide_desc: "Artigos recomendados",
    profile_btn_plan: "O Meu Plano",
    profile_btn_plan_desc: "Em breve",
    profile_sect_languages: "Idiomas",
    profile_sect_skills: "Competências",
    profile_sect_narrative: "Narrativa Pessoal",
    profile_label_aspirations: "Aspirações",
    profile_label_challenges: "Medos / Desafios",
    profile_label_education: "Educação",
    profile_label_profession: "Profissão",
    profile_completeness: "{percentage}% completo",
    profile_completeness_hint: "Responda a mais algumas questões",
    profile_btn_update: "Atualizar Perfil",
    profile_btn_continue: "Continuar Quiz",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Curado para {name}",
    wiki_nav_list: "Lista",
    wiki_nav_icons: "Ícones",
    wiki_explore_cats: "Explorar Categorias",
    wiki_explore_subtitle: "Selecione um tópico para ver detalhes.",
    wiki_full_index: "Índice Completo",
    wiki_full_index_subtitle: "Navegue por todos os tópicos abaixo.",
    wizard_btn_ask: "Fazer uma pergunta",
    wizard_btn_next: "Seguinte",
    wizard_btn_prev: "Anterior",
    wizard_btn_submit: "Submeter",
    wizard_title_name: "Como gostaria de ser chamado?",
    wizard_desc_name: "Digite o seu nome ou escolha",
    wizard_placeholder_name: "O seu nome",
    wizard_step2_title: "Qual a sua idade?",
    wizard_step2_desc: "Indique a idade exata ou escolha um intervalo",
    wizard_step2_placeholder: "A sua idade (ex: 29)",
    wizard_step3_title: "Qual o seu estado civil?",
    wizard_opt_single: "Solteiro(a)",
    wizard_opt_married: "Casado(a)",
    wizard_opt_partnered: "União de Facto",
    wizard_opt_divorced: "Divorciado(a)",
    wizard_opt_widowed: "Viúvo(a)",
    wizard_opt_prefer_no: "Prefiro não dizer",
    wizard_step4_title: "De onde é?",
    wizard_step4_desc: "Selecione o seu país de origem",
    wizard_step4_placeholder: "Comece a escrever o país...",
    wizard_step4_no_match: "Sem resultados",
    wizard_step5_title: "Qual o seu tipo de autorização de residência?",
    wizard_opt_work: "Trabalho",
    wizard_opt_student: "Estudante",
    wizard_opt_family: "Reagrupamento Familiar",
    wizard_opt_eu: "Registo UE",
    wizard_opt_protection: "Proteção Internacional",
    wizard_opt_visitor: "Visitante / Outro",
    wizard_step6_title: "Nível de Escolaridade",
    wizard_step6_field_label: "Área de Estudo (Opcional)",
    wizard_step6_field_placeholder: "ex: Engenharia, Artes",
    wizard_opt_hs: "Ensino Secundário",
    wizard_opt_vocational: "Profissional",
    wizard_opt_bachelors: "Licenciatura",
    wizard_opt_masters: "Mestrado",
    wizard_opt_phd: "Doutoramento",
    wizard_opt_other: "Outro",
    wizard_step7_title: "Qual a sua profissão?",
    wizard_step7_desc: "Ou que trabalho procura?",
    wizard_step7_placeholder: "ex: Enfermeiro, Soldador, Dev",
    wizard_step8_title: "Nível de Finlandês",
    wizard_opt_lang_none: "Nenhum",
    wizard_opt_lang_basics: "Básico (A1)",
    wizard_opt_lang_inter: "Intermédio (A2-B1)",
    wizard_opt_lang_fluent: "Fluente (B2+)",
    wizard_step9_title: "Nível de Inglês",
    wizard_opt_lang_en_none: "Nenhum",
    wizard_opt_lang_en_basic: "Básico",
    wizard_opt_lang_en_working: "Profissional",
    wizard_opt_lang_en_fluent: "Fluente/Nativo",
    wizard_step10_title: "A Sua Visão",
    wizard_step10_aspirations_label: "Aspirações",
    wizard_step10_aspirations_placeholder: "O que espera alcançar?",
    wizard_step10_challenges_label: "Desafios",
    wizard_step10_challenges_placeholder: "Alguma preocupação específica?"
  },
  ru: {
    landing_welcome: "Добро пожаловать!",
    landing_subtitle: "Найдите свой путь к работе в Финляндии",
    landing_btn_quiz: "Расскажите о себе",
    landing_btn_ask: "Начать разговор",
    landing_load_sample: "Загрузить пример (Gabriela)",
    landing_erase: "Очистить кэш",
    landing_add_key: "Добавить ключ Gemini API",
    landing_choose_lang: "Выбрать язык",
    dash_greeting: "Moi, {name}!",
    dash_greeting_guest: "Moi!",
    dash_subtitle: "С возвращением к вашему персональному гиду по Финляндии.",
    dash_subtitle_guest: "Давайте настроим ваш профиль, чтобы начать.",
    dash_btn_guide: "Открыть гид по Финляндии",
    dash_btn_ask: "Начать разговор",
    dash_switch_profile: "Сменить профиль",
    dash_new_profile: "Новый",
    dash_edit_profile: "Ред.",
    dash_profile_overview: "Обзор профиля",
    dash_education: "Образование",
    dash_profession: "Профессия",
    dash_languages: "Языки",
    dash_narrative_aspirations: "Цели",
    dash_narrative_challenges: "Проблемы",
    chat_placeholder: "Спросите что-нибудь...",
    chat_end_session: "Завершить",
    chat_header_assistant: "Ассистент",
    btn_back_dashboard: "Назад на главную",
    profile_btn_guide: "Мой гид",
    profile_btn_guide_desc: "Рекомендации",
    profile_btn_plan: "Мой план",
    profile_btn_plan_desc: "Скоро",
    profile_sect_languages: "Языки",
    profile_sect_skills: "Навыки",
    profile_sect_narrative: "О себе",
    profile_label_aspirations: "Цели",
    profile_label_challenges: "Сложности",
    profile_label_education: "Образование",
    profile_label_profession: "Профессия",
    profile_completeness: "Готово на {percentage}%",
    profile_completeness_hint: "Ответьте на пару вопросов",
    profile_btn_update: "Обновить",
    profile_btn_continue: "Продолжить",
    wiki_header_title: "Finland Works!",
    wiki_header_subtitle: "Подборка для {name}",
    wiki_nav_list: "Список",
    wiki_nav_icons: "Иконки",
    wiki_explore_cats: "Категории",
    wiki_explore_subtitle: "Выберите тему для подробностей.",
    wiki_full_index: "Полный индекс",
    wiki_full_index_subtitle: "Все темы ниже.",
    wizard_btn_ask: "Задать вопрос",
    wizard_btn_next: "Далее",
    wizard_btn_prev: "Назад",
    wizard_btn_submit: "Готово",
    wizard_title_name: "Как к вам обращаться?",
    wizard_desc_name: "Введите имя или выберите",
    wizard_placeholder_name: "Ваше имя",
    wizard_step2_title: "Сколько вам лет?",
    wizard_step2_desc: "Введите точный возраст или выберите диапазон",
    wizard_step2_placeholder: "Ваш возраст (напр. 29)",
    wizard_step3_title: "Ваше семейное положение?",
    wizard_opt_single: "Холост/Не замужем",
    wizard_opt_married: "Женат/Замужем",
    wizard_opt_partnered: "В отношениях",
    wizard_opt_divorced: "Разведен(а)",
    wizard_opt_widowed: "Вдовец/Вдова",
    wizard_opt_prefer_no: "Не хочу говорить",
    wizard_step4_title: "Откуда вы?",
    wizard_step4_desc: "Выберите страну происхождения",
    wizard_step4_placeholder: "Начните вводить страну...",
    wizard_step4_no_match: "Не найдено",
    wizard_step5_title: "Тип вида на жительство?",
    wizard_opt_work: "Рабочий",
    wizard_opt_student: "Студенческий",
    wizard_opt_family: "Семейные связи",
    wizard_opt_eu: "Регистрация ЕС",
    wizard_opt_protection: "Международная защита",
    wizard_opt_visitor: "Посетитель / Другое",
    wizard_step6_title: "Уровень образования",
    wizard_step6_field_label: "Сфера обучения (необязательно)",
    wizard_step6_field_placeholder: "напр. Инженерия, Искусство",
    wizard_opt_hs: "Средняя школа",
    wizard_opt_vocational: "Профессиональное",
    wizard_opt_bachelors: "Бакалавр",
    wizard_opt_masters: "Магистр",
    wizard_opt_phd: "Доктор наук",
    wizard_opt_other: "Другое",
    wizard_step7_title: "Ваша профессия?",
    wizard_step7_desc: "Или какую работу вы ищете?",
    wizard_step7_placeholder: "напр. Медсестра, Сварщик, Разработчик",
    wizard_step8_title: "Уровень финского языка",
    wizard_opt_lang_none: "Нулевой",
    wizard_opt_lang_basics: "Основы (A1)",
    wizard_opt_lang_inter: "Средний (A2-B1)",
    wizard_opt_lang_fluent: "Свободный (B2+)",
    wizard_step9_title: "Уровень английского языка",
    wizard_opt_lang_en_none: "Нулевой",
    wizard_opt_lang_en_basic: "Базовый",
    wizard_opt_lang_en_working: "Рабочий",
    wizard_opt_lang_en_fluent: "Свободный/Родной",
    wizard_step10_title: "Ваши цели",
    wizard_step10_aspirations_label: "Чего хотите достичь?",
    wizard_step10_aspirations_placeholder: "Ваши ожидания",
    wizard_step10_challenges_label: "Сложности",
    wizard_step10_challenges_placeholder: "Чего опасаетесь?"
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
