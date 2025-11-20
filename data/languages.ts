
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
  | 'chat_header_assistant';

export const TRANSLATIONS: Record<LanguageCode, Partial<Record<TranslationKey, string>>> = {
  en: {
    landing_welcome: "Welcome!",
    landing_subtitle: "Find your way to work in Finland",
    landing_btn_quiz: "Tell me about yourself",
    landing_btn_ask: "Start a conversation",
    landing_load_sample: "Load Sample (Gabriela)",
    landing_erase: "Erase Cache",
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
    chat_header_assistant: "Assistant"
  },
  vi: {
    landing_welcome: "Chào mừng!",
    landing_subtitle: "Tìm con đường làm việc tại Phần Lan",
    landing_btn_quiz: "Giới thiệu về bản thân",
    landing_btn_ask: "Bắt đầu trò chuyện",
    landing_load_sample: "Tải mẫu (Gabriela)",
    landing_erase: "Xóa bộ nhớ đệm",
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
    chat_header_assistant: "Trợ lý"
  },
  "pt-br": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre o seu caminho para trabalhar na Finlândia",
    landing_btn_quiz: "Conte-me sobre você",
    landing_btn_ask: "Iniciar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
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
    chat_header_assistant: "Assistente"
  },
  "pt-pt": {
    landing_welcome: "Bem-vindo!",
    landing_subtitle: "Encontre o seu caminho para trabalhar na Finlândia",
    landing_btn_quiz: "Conte-me sobre si",
    landing_btn_ask: "Iniciar conversa",
    landing_load_sample: "Carregar Exemplo (Gabriela)",
    landing_erase: "Limpar Cache",
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
    chat_header_assistant: "Assistente"
  },
  ru: {
    landing_welcome: "Добро пожаловать!",
    landing_subtitle: "Найдите свой путь к работе в Финляндии",
    landing_btn_quiz: "Расскажите о себе",
    landing_btn_ask: "Начать разговор",
    landing_load_sample: "Загрузить пример (Gabriela)",
    landing_erase: "Очистить кэш",
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
    chat_header_assistant: "Ассистент"
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
