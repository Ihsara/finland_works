import { TranslationResource } from "./types";
import { en } from "./en";
import { fi } from "./fi";
import { vi } from "./vi";
import { th } from "./th";

// We aggregate other languages here for simplicity in this example, 
// but in a production app, each would be a separate file.
const createFallback = (uiOverrides: any): TranslationResource => ({
    ui: { ...en.ui, ...uiOverrides },
    wiki: {
        titles: en.wiki.titles, // Fallback to English titles
        articles: {} // Articles fallback handled by accessor logic
    }
});

export const RESOURCES: Record<string, TranslationResource> = {
  en,
  fi,
  vi,
  th,
  // Basic UI overrides for other languages
  et: createFallback({ landing_welcome: "Tere tulemast!", dash_greeting: "Tere, {name}!", btn_back_dashboard: "Tagasi" }),
  ru: createFallback({ landing_welcome: "Добро пожаловать!", dash_greeting: "Привет, {name}!", btn_back_dashboard: "Назад" }),
  ar: createFallback({ landing_welcome: "أهلاً بك!", dash_greeting: "مرحباً {name}!", btn_back_dashboard: "عودة" }),
  so: createFallback({ landing_welcome: "Soo dhowow!", dash_greeting: "Haye, {name}!", btn_back_dashboard: "Dib u noqo" }),
  fa: createFallback({ landing_welcome: "خوش آمدید!", dash_greeting: "سلام {name}!", btn_back_dashboard: "بازگشت" }),
  ku: createFallback({ landing_welcome: "Bi xêr hatî!", dash_greeting: "Silav, {name}!", btn_back_dashboard: "Paş" }),
  zh: createFallback({ landing_welcome: "欢迎！", dash_greeting: "你好, {name}!", btn_back_dashboard: "返回" }),
  sq: createFallback({ landing_welcome: "Mirë se vini!", dash_greeting: "Përshëndetje, {name}!", btn_back_dashboard: "Kthehu" }),
  uk: createFallback({ landing_welcome: "Ласкаво просимо!", dash_greeting: "Привіт, {name}!", btn_back_dashboard: "Назад" }),
  es: createFallback({ landing_welcome: "¡Bienvenido!", dash_greeting: "¡Hola, {name}!", btn_back_dashboard: "Volver" }),
  tr: createFallback({ landing_welcome: "Hoş geldiniz!", dash_greeting: "Merhaba, {name}!", btn_back_dashboard: "Geri" }),
  "pt-br": createFallback({ landing_welcome: "Bem-vindo!", dash_greeting: "Olá, {name}!", btn_back_dashboard: "Voltar" }),
  "pt-pt": createFallback({ landing_welcome: "Bem-vindo!", dash_greeting: "Olá, {name}!", btn_back_dashboard: "Voltar" })
};

export const getResource = (lang: string): TranslationResource => {
  const exact = RESOURCES[lang];
  if (exact) return exact;
  
  const base = lang.split('-')[0];
  if (RESOURCES[base]) return RESOURCES[base];
  
  return en;
};
