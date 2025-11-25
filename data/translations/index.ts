import { TranslationResource } from "./types";
import { en } from "./en";
import { fi } from "./fi";
import { vi } from "./vi";
import { th } from "./th";
import { et } from "./et";
import { ru } from "./ru";
import { ar } from "./ar";
import { so } from "./so";
import { fa } from "./fa";
import { ku } from "./ku";
import { zh } from "./zh";
import { sq } from "./sq";
import { uk } from "./uk";
import { es } from "./es";
import { tr } from "./tr";
import { ptBr } from "./pt_br";
import { ptPt } from "./pt_pt";

export const RESOURCES: Record<string, TranslationResource> = {
  en,
  fi,
  vi,
  th,
  et,
  ru,
  ar,
  so,
  fa,
  ku,
  zh,
  sq,
  uk,
  es,
  tr,
  'pt-br': ptBr,
  'pt-pt': ptPt
};

// Helper to deep merge fallback English with specific language overrides (if any partials exist)
// This allows us to maintain the "Responsibility" separation even for languages that are WIP.
export const getResource = (lang: string): TranslationResource => {
  const exact = RESOURCES[lang];
  if (exact) return exact;
  
  const base = lang.split('-')[0];
  if (RESOURCES[base]) return RESOURCES[base];
  
  return en;
};