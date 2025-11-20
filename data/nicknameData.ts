
import { LanguageCode } from "../types";

interface TranslatableTerm {
  emoji?: string;
  translations: Record<LanguageCode, string>;
}

// Top 20 Common Finnish Animals
const ANIMALS: TranslatableTerm[] = [
  { 
    emoji: '🐻', 
    translations: { en: 'Bear', vi: 'Gấu', 'pt-br': 'Urso', 'pt-pt': 'Urso', ru: 'Медведь' } 
  },
  { 
    emoji: '🦢', 
    translations: { en: 'Swan', vi: 'Thiên Nga', 'pt-br': 'Cisne', 'pt-pt': 'Cisne', ru: 'Лебедь' } 
  },
  { 
    emoji: '🦌', 
    translations: { en: 'Reindeer', vi: 'Tuần Lộc', 'pt-br': 'Rena', 'pt-pt': 'Rena', ru: 'Олень' } 
  },
  { 
    emoji: '🦊', 
    translations: { en: 'Fox', vi: 'Cáo', 'pt-br': 'Raposa', 'pt-pt': 'Raposa', ru: 'Лиса' } 
  },
  { 
    emoji: '🐱', 
    translations: { en: 'Lynx', vi: 'Linh Miêu', 'pt-br': 'Lince', 'pt-pt': 'Lince', ru: 'Рысь' } 
  },
  { 
    emoji: '🦭', 
    translations: { en: 'Saimaa Seal', vi: 'Hải Cẩu', 'pt-br': 'Foca', 'pt-pt': 'Foca', ru: 'Нерпа' } 
  },
  { 
    emoji: '🦉', 
    translations: { en: 'Owl', vi: 'Cú', 'pt-br': 'Coruja', 'pt-pt': 'Coruja', ru: 'Сова' } 
  },
  { 
    emoji: '🐰', 
    translations: { en: 'Arctic Hare', vi: 'Thỏ Rừng', 'pt-br': 'Lebre', 'pt-pt': 'Lebre', ru: 'Заяц' } 
  },
  { 
    emoji: '🫎', 
    translations: { en: 'Moose', vi: 'Nai Sừng Tấm', 'pt-br': 'Alce', 'pt-pt': 'Alce', ru: 'Лось' } 
  },
  { 
    emoji: '🐿️', 
    translations: { en: 'Squirrel', vi: 'Sóc', 'pt-br': 'Esquilo', 'pt-pt': 'Esquilo', ru: 'Белка' } 
  },
  { 
    emoji: '🦔', 
    translations: { en: 'Hedgehog', vi: 'Nhím', 'pt-br': 'Ouriço', 'pt-pt': 'Ouriço', ru: 'Еж' } 
  },
  { 
    emoji: '🐺', 
    translations: { en: 'Wolf', vi: 'Sói', 'pt-br': 'Lobo', 'pt-pt': 'Lobo', ru: 'Волк' } 
  },
  { 
    emoji: '🐟', 
    translations: { en: 'Pike', vi: 'Cá Chó', 'pt-br': 'Lúcio', 'pt-pt': 'Lúcio', ru: 'Щука' } 
  },
  { 
    emoji: '🐦', 
    translations: { en: 'Woodpecker', vi: 'Gõ Kiến', 'pt-br': 'Pica-Pau', 'pt-pt': 'Pica-Pau', ru: 'Дятел' } 
  },
  { 
    emoji: '🪿', 
    translations: { en: 'Crane', vi: 'Sếu', 'pt-br': 'Grou', 'pt-pt': 'Grou', ru: 'Журавль' } 
  },
  { 
    emoji: '🐞', 
    translations: { en: 'Ladybug', vi: 'Bọ Rùa', 'pt-br': 'Joaninha', 'pt-pt': 'Joaninha', ru: 'Божья коровка' } 
  },
  { 
    emoji: '🦦', 
    translations: { en: 'Otter', vi: 'Rái Cá', 'pt-br': 'Lontra', 'pt-pt': 'Lontra', ru: 'Выдра' } 
  },
  { 
    emoji: '🦇', 
    translations: { en: 'Bat', vi: 'Dơi', 'pt-br': 'Morcego', 'pt-pt': 'Morcego', ru: 'Летучая мышь' } 
  },
  { 
    emoji: '🦫', 
    translations: { en: 'Beaver', vi: 'Hải Ly', 'pt-br': 'Castor', 'pt-pt': 'Castor', ru: 'Бобр' } 
  },
  { 
    emoji: '🐜', 
    translations: { en: 'Ant', vi: 'Kiến', 'pt-br': 'Formiga', 'pt-pt': 'Formiga', ru: 'Муравей' } 
  }
];

// Adjectives: Optimistic, Realistic, Melancholic, Inclusive
const ADJECTIVES: TranslatableTerm[] = [
  { 
    translations: { en: 'Resilient', vi: 'Kiên cường', 'pt-br': 'Resiliente', 'pt-pt': 'Resiliente', ru: 'Стойкий' } 
  },
  { 
    translations: { en: 'Gentle', vi: 'Nhẹ nhàng', 'pt-br': 'Gentil', 'pt-pt': 'Gentil', ru: 'Нежный' } 
  },
  { 
    translations: { en: 'Brave', vi: 'Dũng cảm', 'pt-br': 'Valente', 'pt-pt': 'Valente', ru: 'Смелый' } 
  },
  { 
    translations: { en: 'Quiet', vi: 'Trầm lặng', 'pt-br': 'Tranquilo', 'pt-pt': 'Tranquilo', ru: 'Тихий' } 
  },
  { 
    translations: { en: 'Steady', vi: 'Vững vàng', 'pt-br': 'Firme', 'pt-pt': 'Firme', ru: 'Устойчивый' } 
  },
  { 
    translations: { en: 'Hopeful', vi: 'Hy vọng', 'pt-br': 'Esperançoso', 'pt-pt': 'Esperançoso', ru: 'Надежный' } 
  },
  { 
    translations: { en: 'Curious', vi: 'Tò mò', 'pt-br': 'Curioso', 'pt-pt': 'Curioso', ru: 'Любопытный' } 
  },
  { 
    translations: { en: 'Honest', vi: 'Chân thật', 'pt-br': 'Honesto', 'pt-pt': 'Honesto', ru: 'Честный' } 
  },
  { 
    translations: { en: 'Kind', vi: 'Tốt bụng', 'pt-br': 'Amável', 'pt-pt': 'Amável', ru: 'Добрый' } 
  },
  { 
    translations: { en: 'Wistful', vi: 'Man mác', 'pt-br': 'Nostálgico', 'pt-pt': 'Nostálgico', ru: 'Задумчивый' } 
  }
];

export const generateNickname = (lang: LanguageCode): string => {
  const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const randomAdj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

  const adjText = randomAdj.translations[lang];
  const animalText = randomAnimal.translations[lang];

  // Format: "Emoji Adjective Animal"
  // Note: In some languages (like VN), Adjective usually comes after noun, 
  // but for "Nicknames" (like "Brave Bear"), Adjective-Noun is often understood stylistically 
  // or we stick to the western "Adjective Noun" format for consistency as a 'handle'.
  
  if (lang === 'vi') {
     // Vietnamese natural order: Animal + Adjective
     return `${randomAnimal.emoji} ${animalText} ${adjText}`;
  }

  return `${randomAnimal.emoji} ${adjText} ${animalText}`;
};
