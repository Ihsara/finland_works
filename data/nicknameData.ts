
import { LanguageCode } from "../types";

interface TranslatableTerm {
  emoji?: string;
  translations: Partial<Record<LanguageCode, string>>; // Partial to allow safe fallback
}

// Helper to get value with fallback to English
const getTerm = (term: TranslatableTerm, lang: LanguageCode): string => {
    return term.translations[lang] || term.translations['en'] || 'Unknown';
};

// Top 20 Common Finnish Animals
const ANIMALS: TranslatableTerm[] = [
  { emoji: '🐻', translations: { en: 'Bear', vi: 'Gấu', 'pt-br': 'Urso', 'pt-pt': 'Urso', ru: 'Медведь', et: 'Karu', ar: 'دب', so: 'Orso', fa: 'خرس', ku: 'Hirç', zh: '熊', sq: 'Ariu', uk: 'Ведмідь', es: 'Oso', tr: 'Ayı', fi: 'Karhu', th: 'หมี' } },
  { emoji: '🦢', translations: { en: 'Swan', vi: 'Thiên Nga', 'pt-br': 'Cisne', 'pt-pt': 'Cisne', ru: 'Лебедь', et: 'Luik', ar: 'بجعة', so: 'Swan', fa: 'قو', ku: 'Quling', zh: '天鹅', sq: 'Mjellma', uk: 'Лебідь', es: 'Cisne', tr: 'Kuğu', fi: 'Joutsen', th: 'หงส์' } },
  { emoji: '🦌', translations: { en: 'Reindeer', vi: 'Tuần Lộc', 'pt-br': 'Rena', 'pt-pt': 'Rena', ru: 'Олень', et: 'Põhjapõder', ar: 'رنة', so: 'Deero', fa: 'گوزن', ku: 'Pezkovî', zh: '驯鹿', sq: 'Dreri', uk: 'Олень', es: 'Reno', tr: 'Ren Geyiği', fi: 'Poro', th: 'กวางเรนเดียร์' } },
  { emoji: '🦊', translations: { en: 'Fox', vi: 'Cáo', 'pt-br': 'Raposa', 'pt-pt': 'Raposa', ru: 'Лиса', et: 'Rebane', ar: 'ثعلب', so: 'Dawaco', fa: 'روباه', ku: 'Rêvî', zh: '狐狸', sq: 'Dhelpra', uk: 'Лисиця', es: 'Zorro', tr: 'Tilki', fi: 'Kettu', th: 'สุนัขจิ้งจอก' } },
  { emoji: '🐱', translations: { en: 'Lynx', vi: 'Linh Miêu', 'pt-br': 'Lince', 'pt-pt': 'Lince', ru: 'Рысь', et: 'Ilves', ar: 'وشق', so: 'Lynx', fa: 'وشق', ku: 'Piling', zh: '猞猁', sq: 'Rrëqebulli', uk: 'Рись', es: 'Lince', tr: 'Vaşak', fi: 'Ilves', th: 'แมวป่า' } },
  { emoji: '🦉', translations: { en: 'Owl', vi: 'Cú', 'pt-br': 'Coruja', 'pt-pt': 'Coruja', ru: 'Сова', et: 'Öökull', ar: 'بومة', so: 'Guamah', fa: 'جغد', ku: 'Bûm', zh: '猫头鹰', sq: 'Bufi', uk: 'Сова', es: 'Búho', tr: 'Baykuş', fi: 'Pöllö', th: 'นกฮูก' } },
  { emoji: '🐰', translations: { en: 'Arctic Hare', vi: 'Thỏ Rừng', 'pt-br': 'Lebre', 'pt-pt': 'Lebre', ru: 'Заяц', et: 'Jänes', ar: 'أرنب', so: 'Bakayle', fa: 'خرگوش', ku: 'Kevroşk', zh: '野兔', sq: 'Lepuri', uk: 'Заєць', es: 'Liebre', tr: 'Tavşan', fi: 'Jänis', th: 'กระต่ายป่า' } },
  { emoji: '🐿️', translations: { en: 'Squirrel', vi: 'Sóc', 'pt-br': 'Esquilo', 'pt-pt': 'Esquilo', ru: 'Белка', et: 'Orav', ar: 'سنجاب', so: 'Dabaqallooc', fa: 'سنجاب', ku: 'Sîxur', zh: '松鼠', sq: 'Ketrio', uk: 'Білка', es: 'Ardilla', tr: 'Sincap', fi: 'Orava', th: 'กระรอก' } },
  { emoji: '🐺', translations: { en: 'Wolf', vi: 'Sói', 'pt-br': 'Lobo', 'pt-pt': 'Lobo', ru: 'Волк', et: 'Hunt', ar: 'ذئب', so: 'Yeey', fa: 'گرگ', ku: 'Gur', zh: '狼', sq: 'Ujku', uk: 'Вовк', es: 'Lobo', tr: 'Kurt', fi: 'Susi', th: 'หมาป่า' } },
  { emoji: '🐦', translations: { en: 'Woodpecker', vi: 'Gõ Kiến', 'pt-br': 'Pica-Pau', 'pt-pt': 'Pica-Pau', ru: 'Дятел', et: 'Rähn', ar: 'نقار الخشب', so: 'Shimbir', fa: 'دارکوب', ku: 'Darkutik', zh: '啄木鸟', sq: 'Qukapiku', uk: 'Дятел', es: 'Pájaro', tr: 'Ağaçkakan', fi: 'Tikka', th: 'นกหัวขวาน' } }
];

// Adjectives
const ADJECTIVES: TranslatableTerm[] = [
  { translations: { en: 'Resilient', vi: 'Kiên cường', 'pt-br': 'Resiliente', 'pt-pt': 'Resiliente', ru: 'Стойкий', et: 'Vastupidav', ar: 'صامد', so: 'Adkaysi', fa: 'مقاوم', ku: 'Xweragir', zh: '坚韧', sq: 'I Fortë', uk: 'Стійкий', es: 'Resiliente', tr: 'Dirençli', fi: 'Sitkeä', th: 'ยืดหยุ่น' } },
  { translations: { en: 'Gentle', vi: 'Nhẹ nhàng', 'pt-br': 'Gentil', 'pt-pt': 'Gentil', ru: 'Нежный', et: 'Õrn', ar: 'لطيف', so: 'Naxariis', fa: 'ملایم', ku: 'Nerm', zh: '温柔', sq: 'I Butë', uk: 'Ніжний', es: 'Gentil', tr: 'Nazik', fi: 'Lempeä', th: 'อ่อนโยน' } },
  { translations: { en: 'Brave', vi: 'Dũng cảm', 'pt-br': 'Valente', 'pt-pt': 'Valente', ru: 'Смелый', et: 'Vapper', ar: 'شجاع', so: 'Geesi', fa: 'شجاع', ku: 'Wêrek', zh: '勇敢', sq: 'Trim', uk: 'Сміливий', es: 'Valiente', tr: 'Cesur', fi: 'Rohkea', th: 'กล้าหาญ' } },
  { translations: { en: 'Steady', vi: 'Vững vàng', 'pt-br': 'Firme', 'pt-pt': 'Firme', ru: 'Устойчивый', et: 'Kindel', ar: 'ثابت', so: 'Deggan', fa: 'ثابت', ku: 'Binge', zh: '稳重', sq: 'I Qëndrueshëm', uk: 'Впевнений', es: 'Firme', tr: 'Kararlı', fi: 'Vakaa', th: 'มั่นคง' } },
  { translations: { en: 'Curious', vi: 'Tò mò', 'pt-br': 'Curioso', 'pt-pt': 'Curioso', ru: 'Любопытный', et: 'Uudishimulik', ar: 'فضولي', so: 'Xiiso', fa: 'کنجکاو', ku: 'Mereq', zh: '好奇', sq: 'Kurioz', uk: 'Допитливий', es: 'Curioso', tr: 'Meraklı', fi: 'Utelias', th: 'อยากรู้อยากเห็น' } }
];

export const generateNickname = (lang: LanguageCode): string => {
  const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const randomAdj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

  const adjText = getTerm(randomAdj, lang);
  const animalText = getTerm(randomAnimal, lang);

  // Languages where Adjective follows Noun usually
  const swapOrder = ['vi', 'ar', 'so', 'fa', 'ku', 'es', 'th'];
  
  if (swapOrder.includes(lang)) {
     return `${randomAnimal.emoji} ${animalText} ${adjText}`;
  }

  return `${randomAnimal.emoji} ${adjText} ${animalText}`;
};
