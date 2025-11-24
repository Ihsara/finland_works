
import { Icons } from "../components/Icon";
import { LanguageCode } from "../types";

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export interface WikiArticle {
  id: string;          
  title: string;       
  icon: keyof typeof Icons; 
  tags: string[];      
  content: string;     
}

export interface WikiSubsection {
  title: string;
  articles: WikiArticle[];
}

export interface WikiCategory {
  id: string;          
  title: string;       
  icon: keyof typeof Icons;
  theme: {             
    border: string;    
    text: string;      
    shadow: string;    
    hoverBg: string;   
  };
  subsections: WikiSubsection[];
}

export interface EnrichedWikiArticle extends WikiArticle {
  categoryTitle: string;
  displayId: string; // e.g., "1.1.1"
  categoryId: string;
}

// ---------------------------------------------------------------------------
// RAW CONTENT STORE
// ---------------------------------------------------------------------------

type ContentSet = {
  title: string;
  content: string;
};

// Helper for multilingual titles
const getTitle = (key: string, lang: LanguageCode, defaultText: string): string => {
  const map = TRANSLATED_TITLES[key];
  // Normalize pt-br/pt-pt to pt if specific not found
  const code = lang.toLowerCase();
  const base = code.split('-')[0];
  
  return map?.[code] || map?.[base] || map?.['en'] || defaultText;
};

// TITLES DICTIONARY (Ensures Sidebar is localized even if content isn't)
const TRANSLATED_TITLES: Record<string, Partial<Record<string, string>>> = {
  // --- BUREAUCRACY ---
  social_unemployment: { 
    en: 'Unemployment Benefits', fi: 'Työttömyysturva', vi: 'Trợ cấp thất nghiệp', th: 'สวัสดิการการว่างงาน', 
    ru: 'Пособие по безработице', et: 'Töötuhüvitised', ar: 'إعانات البطالة', fa: 'مزایای بیکاری', 
    so: 'Lacagta shaqo la\'aanta', ku: 'Yarmetiyên bêkariyê', zh: '失业救济金', sq: 'Përfitimet e papunësisë', 
    uk: 'Допомога по безробіттю', es: 'Prestaciones por desempleo', tr: 'İşsizlik Yardımları', pt: 'Subsídio de Desemprego' 
  },
  social_housing: { 
    en: 'Housing Allowance', fi: 'Asumistuki', vi: 'Trợ cấp nhà ở', th: 'เงินช่วยเหลือค่าเช่าบ้าน', 
    ru: 'Жилищное пособие', et: 'Eluasemetoetus', ar: 'بدل السكن', fa: 'کمک هزینه مسکن', 
    so: 'Kaalmada guriga', ku: 'Alîkariya xaniyan', zh: '住房补贴', sq: 'Ndihma për strehim', 
    uk: 'Житлова субсидія', es: 'Subsidio de vivienda', tr: 'Konut Yardımı', pt: 'Subsídio de Habitação' 
  },
  social_pension: { 
    en: 'Pension System', fi: 'Eläkejärjestelmä', vi: 'Hệ thống lương hưu', th: 'ระบบบำนาญ', 
    ru: 'Пенсионная система', et: 'Pensionisüsteem', ar: 'نظام التقاعد', fa: 'سیستم بازنشستگی', 
    so: 'Nidaamka hawlgabka', ku: 'Pergala teqawidiyê', zh: '养老金制度', sq: 'Sistemi i pensioneve', 
    uk: 'Пенсійна система', es: 'Sistema de pensiones', tr: 'Emeklilik Sistemi', pt: 'Sistema de Pensões' 
  },
  bureaucracy_dvv: {
    en: 'The DVV & Personal ID', fi: 'DVV & Henkilötunnus', vi: 'Mã số định danh (DVV)', th: 'DVV & เลขประจำตัว',
    ru: 'DVV и Личный код', uk: 'DVV та персональний код', zh: '人口登记处 & 个人ID', es: 'DVV e Identidad', 
    ar: 'التسجيل السكاني والهوية', tr: 'DVV ve Kimlik No', pt: 'DVV e ID Pessoal'
  },
  bureaucracy_migri: {
    en: 'Migri (Immigration)', fi: 'Migri (Maahanmuutto)', vi: 'Cục di trú (Migri)', th: 'ตม. (Migri)',
    ru: 'Миграционная служба', uk: 'Міграційна служба', zh: '移民局 (Migri)', es: 'Migración (Migri)',
    ar: 'دائرة الهجرة', tr: 'Göçmenlik Dairesi', pt: 'Imigração (Migri)'
  },
  bureaucracy_tax: {
    en: 'Tax Card', fi: 'Verokortti', vi: 'Thẻ thuế', th: 'บัตรภาษี',
    ru: 'Налоговая карта', uk: 'Податкова картка', zh: '税卡', es: 'Tarjeta de impuestos',
    ar: 'البطاقة الضريبية', tr: 'Vergi Kartı', pt: 'Cartão de Impostos'
  },

  // --- JOBS ---
  job_te_office: { 
    en: 'TE Services', fi: 'TE-toimisto', vi: 'Văn phòng TE', th: 'บริการ TE', 
    ru: 'TE-офис', et: 'Töötukassa', ar: 'مكتب العمل', fa: 'خدمات اشتغال', 
    so: 'Xafiiska shaqada', ku: 'Nivîsgeha TE', zh: '就业服务 (TE)', sq: 'Zyra e Punës', 
    uk: 'Служба зайнятості', es: 'Oficina de empleo', tr: 'İş ve İşçi Bulma Kurumu', pt: 'Serviços TE' 
  },
  job_portals: { 
    en: 'Job Boards', fi: 'Työpaikkasivustot', vi: 'Trang web việc làm', th: 'เว็บหางาน', 
    ru: 'Сайты вакансий', et: 'Tööportaalid', ar: 'مواقع التوظيف', fa: 'سایت‌های کاریابی', 
    so: 'Boggaga shaqada', ku: 'Malperên kar', zh: '求职网站', sq: 'Portalet e punës', 
    uk: 'Сайти пошуку роботи', es: 'Portales de empleo', tr: 'İş İlanı Siteleri', pt: 'Portais de Emprego' 
  },
  job_entrepreneurship: { 
    en: 'Entrepreneurship', fi: 'Yrittäjyys', vi: 'Khởi nghiệp', th: 'การเป็นผู้ประกอบการ', 
    ru: 'Предпринимательство', et: 'Ettevõtlus', ar: 'ريادة الأعمال', fa: 'کارآفرینی', 
    so: 'Ganacsiga', ku: 'Karsazî', zh: '创业', sq: 'Sipërmarrja', 
    uk: 'Підприємництво', es: 'Emprendimiento', tr: 'Girişimcilik', pt: 'Empreendedorismo' 
  },
  
  // --- TOOLS ---
  job_cover_letter: { 
    en: 'Cover Letter', fi: 'Hakemuskirje', vi: 'Thư xin việc', th: 'จดหมายสมัครงาน', 
    ru: 'Сопроводительное письмо', et: 'Kaaskiri', ar: 'رسالة التغطية', fa: 'نامه پوششی', 
    so: 'Warqadda codsiga', ku: 'Nameya serlêdanê', zh: '求职信', sq: 'Letër motivimi', 
    uk: 'Супровідний лист', es: 'Carta de presentación', tr: 'Ön Yazı', pt: 'Carta de Apresentação' 
  },
  job_interview: { 
    en: 'Job Interview', fi: 'Työhaastattelu', vi: 'Phỏng vấn', th: 'การสัมภาษณ์งาน', 
    ru: 'Собеседование', et: 'Tööintervjuu', ar: 'مقابلة العمل', fa: 'مصاحبه شغلی', 
    so: 'Waraysiga shaqada', ku: 'Hevpeyvîna kar', zh: '面试', sq: 'Intervista e punës', 
    uk: 'Співбесіда', es: 'Entrevista de trabajo', tr: 'İş Görüşmesi', pt: 'Entrevista de Emprego' 
  },
  job_linkedin: { 
    en: 'LinkedIn Tips', fi: 'LinkedIn-vinkit', vi: 'Mẹo LinkedIn', th: 'เคล็ดลับ LinkedIn', 
    ru: 'Советы по LinkedIn', zh: 'LinkedIn 技巧', ar: 'نصائح لينكد إن', es: 'Consejos de LinkedIn',
    pt: 'Dicas de LinkedIn', tr: 'LinkedIn İpuçları'
  },
  job_recognition: { 
    en: 'Degree Recognition', fi: 'Tutkintojen tunnustaminen', vi: 'Công nhận bằng cấp', th: 'การรับรองวุฒิ', 
    ru: 'Признание диплома', et: 'Diplomi tunnustamine', ar: 'الاعتراف بالشهادات', fa: 'تایید مدرک تحصیلی',
    zh: '学历认证', uk: 'Визнання диплома', es: 'Homologación de títulos', tr: 'Diploma Denkligi'
  },

  // --- RIGHTS ---
  work_contract: { 
    en: 'Employment Contract', fi: 'Työsopimus', vi: 'Hợp đồng lao động', th: 'สัญญาจ้างงาน', 
    ru: 'Трудовой договор', et: 'Tööleping', ar: 'عقد العمل', fa: 'قرارداد کار', 
    so: 'Heshiiska shaqada', ku: 'Peymana kar', zh: '劳动合同', sq: 'Kontrata e punës', 
    uk: 'Трудовий договір', es: 'Contrato de trabajo', tr: 'İş Sözleşmesi', pt: 'Contrato de Trabalho' 
  },
  work_hours: { 
    en: 'Working Hours', fi: 'Työajat', vi: 'Giờ làm việc', th: 'ชั่วโมงทำงาน', 
    ru: 'Рабочее время', et: 'Tööaeg', ar: 'ساعات العمل', fa: 'ساعات کاری',
    zh: '工作时间', uk: 'Робочий час', es: 'Horario laboral', tr: 'Çalışma Saatleri'
  },
  work_holidays: { 
    en: 'Annual Holidays', fi: 'Vuosiloma', vi: 'Nghỉ phép năm', th: 'วันหยุดประจำปี', 
    ru: 'Ежегодный отпуск', et: 'Puhkus', ar: 'الإجازات السنوية', fa: 'مرخصی سالانه',
    zh: '年假', uk: 'Щорічна відпустка', es: 'Vacaciones anuales', tr: 'Yıllık İzin'
  },

  // --- NORMS ---
  culture_meetings: { 
    en: 'Meeting Culture', fi: 'Kokouskulttuuri', vi: 'Văn hóa họp', th: 'วัฒนธรรมการประชุม', 
    ru: 'Культура встреч', ar: 'ثقافة الاجتماعات', zh: '会议文化', es: 'Cultura de reuniones',
    tr: 'Toplantı Kültürü', pt: 'Cultura de Reuniões'
  },
  culture_feedback: { 
    en: 'Giving Feedback', fi: 'Palautteenanto', vi: 'Đưa ra phản hồi', th: 'การให้ผลตอบรับ', 
    ru: 'Обратная связь', ar: 'تقديم الملاحظات', zh: '给予反馈', es: 'Dar feedback',
    tr: 'Geri Bildirim', pt: 'Dar Feedback'
  },
  culture_emails: { 
    en: 'Email Etiquette', fi: 'Sähköpostietiketti', vi: 'Nghi thức email', th: 'มารยาทอีเมล', 
    ru: 'Этикет электронной почты', ar: 'آداب البريد الإلكتروني', zh: '邮件礼仪', es: 'Etiqueta de email'
  },

  // --- SOCIAL ---
  culture_names: { 
    en: 'First Names', fi: 'Sinuttelu', vi: 'Xưng hô tên', th: 'การเรียกชื่อต้น', 
    ru: 'Обращение по имени', ar: 'الأسماء الأولى', zh: '直呼其名', es: 'Nombres de pila'
  },
  culture_lunch: { 
    en: 'Lunch Culture', fi: 'Lounaskulttuuri', vi: 'Văn hóa ăn trưa', th: 'วัฒนธรรมอาหารกลางวัน', 
    ru: 'Обед', ar: 'ثقافة الغداء', zh: '午餐文化', es: 'Cultura del almuerzo'
  },
  culture_afterwork: { 
    en: 'Afterwork', fi: 'Afterwork', vi: 'Sau giờ làm', th: 'สังสรรค์หลังเลิกงาน', 
    ru: 'После работы', ar: 'ما بعد العمل', zh: '下班后的社交', es: 'Afterwork'
  },

  // --- PROFESSIONS ---
  prof_engineering: { en: 'Engineering', fi: 'Insinöörityö', vi: 'Kỹ thuật', th: 'วิศวกรรม', ru: 'Инженерия', zh: '工程', es: 'Ingeniería', ar: 'هندسة' },
  prof_business: { en: 'Business & Finance', fi: 'Kaupallinen ala', vi: 'Kinh doanh & Tài chính', th: 'ธุรกิจและการเงิน', ru: 'Бизнес и финансы', zh: '商业与金融', es: 'Negocios', ar: 'الأعمال والمالية' },
  prof_creative: { en: 'Creative Industries', fi: 'Luovat alat', vi: 'Ngành sáng tạo', th: 'อุตสาหกรรมสร้างสรรค์', ru: 'Творческие индустрии', zh: '创意产业', es: 'Industrias creativas', ar: 'الصناعات الإبداعية' },
  prof_logistics: { en: 'Logistics & Driving', fi: 'Logistiikka & Kuljetus', vi: 'Hậu cần & Lái xe', th: 'โลจิสติกส์', ru: 'Логистика', zh: '物流与驾驶', es: 'Logística', ar: 'اللوجستيات' },
  prof_tech: { en: 'Tech & IT', fi: 'Teknologia & IT', vi: 'Công nghệ', ru: 'IT и технологии', zh: '科技与IT', es: 'Tecnología', ar: 'تكنولوجيا المعلومات' },
  prof_health: { en: 'Healthcare', fi: 'Terveydenhuolto', vi: 'Y tế', ru: 'Здравоохранение', zh: '医疗保健', es: 'Salud', ar: 'الرعاية الصحية' },

  // --- HOUSING & LIFE ---
  housing_contracts: { 
    en: 'Rental Contracts', fi: 'Vuokrasopimus', vi: 'Hợp đồng thuê nhà', th: 'สัญญาเช่า', 
    ru: 'Договор аренды', et: 'Üürileping', ar: 'عقود الإيجار', zh: '租赁合同', es: 'Contratos de alquiler',
    tr: 'Kira Sözleşmeleri', pt: 'Contratos de Arrendamento'
  },
  housing_recycling: { 
    en: 'Recycling Rules', fi: 'Kierrätys', vi: 'Quy tắc tái chế', th: 'การรีไซเคิล', 
    ru: 'Переработка', et: 'Taaskasutus', ar: 'قواعد إعادة التدوير', zh: '回收规则', es: 'Reciclaje'
  },
  transport_driving: { 
    en: 'Driving License', fi: 'Ajokortti', vi: 'Bằng lái xe', th: 'ใบขับขี่', 
    ru: 'Водительские права', et: 'Juhiluba', ar: 'رخصة القيادة', zh: '驾照', es: 'Licencia de conducir'
  },
  family_school: { 
    en: 'School System', fi: 'Koulujärjestelmä', vi: 'Hệ thống trường học', th: 'ระบบโรงเรียน', 
    ru: 'Школьная система', et: 'Koolisüsteem', ar: 'النظام المدرسي', zh: '学校制度', es: 'Sistema escolar'
  },
  family_hobbies: { 
    en: 'Hobbies', fi: 'Harrastukset', vi: 'Sở thích', th: 'งานอดิเรก', 
    ru: 'Хобби', et: 'Hobid', ar: 'الهوايات', zh: '爱好', es: 'Pasatiempos'
  },

  // --- LANGUAGE ---
  lang_courses: { 
    en: 'Finding Courses', fi: 'Kielikurssit', vi: 'Tìm khóa học', th: 'หาคอร์สเรียน', 
    ru: 'Поиск курсов', et: 'Keelekursused', ar: 'البحث عن دورات', zh: '寻找课程', es: 'Buscar cursos'
  },
  lang_yki: { 
    en: 'YKI Test', fi: 'YKI-testi', vi: 'Kỳ thi YKI', th: 'การสอบ YKI', 
    ru: 'Тест YKI', ar: 'اختبار YKI', zh: 'YKI 考试', es: 'Examen YKI'
  },
  lang_puhu: { 
    en: 'Dare to Speak', fi: 'Puhu rohkeasti', vi: 'Dám nói', th: 'กล้าที่จะพูด', 
    ru: 'Говорите смело', ar: 'تجرأ على التحدث', zh: '敢于开口', es: 'Atrévete a hablar'
  }
};

const ARTICLE_CONTENT: Record<string, Record<string, ContentSet>> = {
  // --- IDENTITY (Existing) ---
  'guide_start': {
    en: {
      title: 'Welcome to Finland! 🇫🇮',
      content: `# Your Survival Guide\n\n**The Philosophy:**\nFinland works on trust, silence, and coffee. It is a society where systems work, but you must know how to use them.\n\n### How to use this app\n1. **Read:** Browse the guides for bureaucracy and work culture.\n2. **Chat:** Ask the AI Assistant specific questions about your situation.\n3. **Profile:** Keep your info updated so the advice is accurate.\n\n*Sisu* (Guts) is all you need!`
    },
    fi: {
      title: 'Tervetuloa Suomeen! 🇫🇮',
      content: `# Selviytymisoppaasi\n\n**Filosofia:**\nSuomi toimii luottamuksella, hiljaisuudella ja kahvilla.\n\n### Kuinka käytät tätä sovellusta\n1. **Lue:** Selaa oppaita.\n2. **Keskustele:** Kysy tekoälyltä.\n3. **Profiili:** Pidä tietosi ajan tasalla.`
    },
    vi: { title: 'Chào mừng đến Phần Lan! 🇫🇮', content: `# Cẩm nang sinh tồn\n\n**Triết lý:**\nPhần Lan vận hành dựa trên niềm tin, sự im lặng và cà phê.\n\n### Cách dùng:\n1. **Đọc:** Xem hướng dẫn.\n2. **Chat:** Hỏi AI.\n3. **Hồ sơ:** Cập nhật thông tin.` },
    th: { title: 'ยินดีต้อนรับสู่ฟินแลนด์! 🇫🇮', content: `# คู่มือการเอาตัวรอด\n\n**ปรัชญา:**\nฟินแลนด์ขับเคลื่อนด้วยความไว้วางใจ\n\n### วิธีใช้:\n1. **อ่าน:** คู่มือ\n2. **แชท:** ถาม AI\n3. **โปรไฟล์:** อัปเดตข้อมูล` }
  },
  'bureaucracy_dvv': {
    en: {
      title: 'The DVV & Personal ID',
      content: `# The DVV (Digital Agency) 🆔\n\n**Priority: IMMEDIATE**\n\n### The Mission\nTo legally exist in Finland. Without this, you are a ghost.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). Format: *010190-123X*.\n\n### Why you need it\n1. Bank account.\n2. Phone contract.\n3. Tax card.\n4. Health services.`
    },
    fi: { title: 'DVV & Henkilötunnus', content: `# DVV (Digi- ja väestötietovirasto) 🆔\n\n**Prioriteetti: HETI**\n\n### Tehtävä\nOlla olemassa virallisesti. Tarvitset **henkilötunnuksen**.\n\n### Mihin tarvitset sitä?\n1. Pankkitili.\n2. Puhelinliittymä.\n3. Verokortti.` }
  },
  'bureaucracy_migri': {
      en: { title: 'Migri (Immigration)', content: `# Migri 🛂\n\n### The Mission\nTo get your Residence Permit (oleskelulupa).\n\n### Tips\n* **Book Early:** Queues are long.\n* **Enter Finland:** Ensure you have the right visa to enter before your permit is ready if applying from abroad.\n* **Fast Track:** Available for specialists.` },
      fi: { title: 'Migri (Maahanmuuttovirasto)', content: `# Migri 🛂\n\n### Tehtävä\nHanki oleskelulupa.\n\n### Vinkit\n* **Varaa aika ajoissa:** Jonot ovat pitkiä.\n* **Pikakaista:** Erityisasiantuntijoille.` }
  },
  'bureaucracy_strong_auth': {
      en: { title: 'Strong Identification', content: `# Strong Electronic ID 🔐\n\n**The Key to the Kingdom.**\n\n### What is it?\nYour digital ID for logging into everything (Kela, Tax, Posti).\n\n### How to get it\nYou usually need a Finnish ID Code and a Passport to get it from a bank. Visit a branch physically.` },
      fi: { title: 'Vahva tunnistautuminen', content: `# Vahva tunnistautuminen 🔐\n\n**Avain kaikkeen.**\n\n### Mikä se on?\nDigitaalinen henkilöllisyytesi (pankkitunnukset). Tarvitset tätä kirjautuaksesi Kelaan, verottajalle jne.` }
  },
  'bureaucracy_tax': {
      en: { title: 'Tax Card', content: `# The Tax Card (Verokortti) 💳\n\n**Rule:** No card = 60% tax.\n\n### Process\n1. Log into **MyTax (OmaVero)**.\n2. Estimate income.\n3. Get PDF.\n4. Send to employer.` },
      fi: { title: 'Verokortti', content: `# Verokortti 💳\n\n**Sääntö:** Ilman korttia vero on 60%.\n\n### Prosessi\n1. Kirjaudu **OmaVeroon**.\n2. Arvioi tulot.\n3. Lähetä kortti työnantajalle.` }
  },

  // --- SECURITY (New) ---
  'bureaucracy_kela': {
      en: { title: 'Kela (Social Security)', content: `# Kela 🏥\n\n### Basics\nKela provides basic security for permanent residents.\n\n### Coverage\n* **Work:** Covered if earning ~800€/mo.\n* **Students:** Usually not covered (need private insurance).` },
      fi: { title: 'Kela', content: `# Kela 🏥\n\n### Perusteet\nKela tarjoaa perusturvan vakituisesti asuville.\n\n### Kattavuus\n* **Työ:** Kuulut piiriin, jos tienaat n. 800€/kk.` }
  },
  'health_services': {
      en: { title: 'Health Services', content: `# Public vs Occupational 🏥\n\n### Public (Terveysasema)\n* Cheap but slow.\n* Call your local center.\n\n### Occupational (Työterveys)\n* Paid by employer.\n* Fast access. Use this for sick leave!` },
      fi: { title: 'Terveyspalvelut', content: `# Julkinen vs Työterveys 🏥\n\n### Julkinen\n* Edullinen, mutta jonoja.\n\n### Työterveys\n* Työnantajan maksama.\n* Nopea. Käytä tätä sairaslomissa!` }
  },
  'social_unemployment': {
      en: { title: 'Unemployment Benefits', content: `# Lost your job? 📉\n\n### 1. Register immediately\nRegister as a job seeker at **TE Services** on your first day of unemployment. If you delay, you lose money.\n\n### 2. The Payers\n* **Kela:** Pays basic unemployment allowance.\n* **Unions (Kassa):** Pays earnings-related allowance (much higher) if you have been a member for 6+ months.` },
      fi: { title: 'Työttömyysturva', content: `# Jäitkö työttömäksi? 📉\n\n### 1. Ilmoittaudu heti\nIlmoittaudu työnhakijaksi **TE-toimistoon** heti ensimmäisenä päivänä.\n\n### 2. Maksajat\n* **Kela:** Peruspäiväraha.\n* **Työttömyyskassa:** Ansiopäiväraha (jos olet jäsen).` }
  },
  'social_housing': {
      en: { title: 'Housing Allowance', content: `# Housing Allowance (Asumistuki) 🏠\n\n### Who gets it?\nLow-income households living permanently in Finland. It covers part of your rent.\n\n### Application\nApply via Kela online. You need a rental contract and proof of income.` },
      fi: { title: 'Asumistuki', content: `# Yleinen asumistuki 🏠\n\n### Kenelle?\nPienituloisille ruokakunnille. Korvaa osan vuokrasta.\n\n### Hakeminen\nHae Kelan asiointipalvelussa. Tarvitset vuokrasopimuksen.` }
  },
  'social_pension': {
      en: { title: 'Pension System', content: `# Pensions in Finland 👴\n\n### Two Pillars\n1. **Earnings-related (Työeläke):** Accumulates from your work. Paid by pension providers (Ilmarinen, Varma).\n2. **National Pension (Kansaneläke):** Paid by Kela if your working pension is too small.\n\n### Check your pension\nYou can check your accrued pension at **Tyoelake.fi**.` },
      fi: { title: 'Eläkejärjestelmä', content: `# Eläkkeet Suomessa 👴\n\n### Kaksi pilaria\n1. **Työeläke:** Kertyy työstä.\n2. **Kansaneläke:** Kelan maksama vähimmäisturva.` }
  },

  // --- MARKET (New) ---
  'job_market_overview': {
      en: { title: 'Market Overview', content: `# The Hidden Market 📉\n\n**70-80% of jobs are hidden.**\n\n### Strategies\n* **Network:** Most jobs go to friends of friends.\n* **Direct Contact:** Email companies directly.` },
      fi: { title: 'Työmarkkinat', content: `# Piilotyöpaikat 📉\n\n**70-80% paikoista ei ole julkisessa haussa.**\n\n### Strategiat\n* **Verkostoidu:** Suurin osa paikoista menee suhteilla.\n* **Ota yhteyttä:** Lähetä avoin hakemus.` }
  },
  'job_networking': {
      en: { title: 'Networking', content: `# How to Network 🤝\n\n1. **LinkedIn:** Essential.\n2. **Events:** Goes to industry meetups.\n3. **Volunteering:** Great way to meet locals.` },
      fi: { title: 'Verkostoituminen', content: `# Kuinka verkostoitua 🤝\n\n1. **LinkedIn:** Välttämätön.\n2. **Tapahtumat:** Käy alan tapahtumissa.\n3. **Vapaaehtoistyö:** Loistava tapa tutustua.` }
  },
  'job_te_office': {
      en: { title: 'TE Services', content: `# TE Services (TE-palvelut) 🏢\n\n### What is it?\nThe government employment office. \n\n### Services\n* **Integration Plan:** If you are an immigrant, they make a plan for you (language courses, training).\n* **Job Board:** Tyomarkkinatori.fi is the official site.` },
      fi: { title: 'TE-palvelut', content: `# TE-palvelut 🏢\n\n### Mikä se on?\nValtion työnvälitys.\n\n### Palvelut\n* **Kotoutumissuunnitelma:** Maahanmuuttajille tehdään suunnitelma (kielikurssit, koulutus).\n* **Työmarkkinatori:** Virallinen työpaikkasivusto.` }
  },
  'job_portals': {
      en: { title: 'Job Boards', content: `# Where to look? 🔍\n\n### Major Sites\n1. **LinkedIn:** #1 for specialists/English jobs.\n2. **Oikotie.fi:** Major Finnish site.\n3. **Duunitori.fi:** User friendly, lots of articles.\n4. **Tyomarkkinatori.fi:** Official government site.` },
      fi: { title: 'Työpaikkasivustot', content: `# Mistä etsiä? 🔍\n\n### Tärkeimmät sivut\n1. **LinkedIn:** Paras asiantuntijoille.\n2. **Oikotie:** Suuri suomalainen sivusto.\n3. **Duunitori:** Helppokäyttöinen.\n4. **Työmarkkinatori:** Virallinen sivusto.` }
  },
  'job_entrepreneurship': {
      en: { title: 'Entrepreneurship', content: `# Becoming an Entrepreneur 🚀\n\n### Toiminimi (Sole Trader)\nEasiest way to start. You sell your skills and invoice clients.\n\n### Light Entrepreneurship (Kevytyrittäjyys)\nServices like Ukko.fi or eTasku allow you to invoice without a business ID (Y-tunnus). Great for testing the market.` },
      fi: { title: 'Yrittäjyys', content: `# Yrittäjäksi ryhtyminen 🚀\n\n### Toiminimi\nHelpoin tapa aloittaa.\n\n### Kevytyrittäjyys\nPalvelut kuten Ukko.fi mahdollistavat laskutuksen ilman omaa yritystä.` }
  },

  // --- TOOLS (New) ---
  'job_cv_standards': {
      en: { title: 'CV Standards', content: `# Finnish CV 📄\n\n* **Length:** Max 2 pages.\n* **Photo:** Yes, standard.\n* **Tone:** Honest, concise.` },
      fi: { title: 'CV-standardit', content: `# Suomalainen CV 📄\n\n* **Pituus:** Max 2 sivua.\n* **Kuva:** Kyllä, tavallista.\n* **Sävy:** Rehellinen, tiivis.` }
  },
  'job_cover_letter': {
      en: { title: 'Cover Letter', content: `# The Application Letter ✉️\n\n**Goal:** Answer "Why us?" and "Why you?".\n\n### Structure\n1. **Hook:** Why are you interested?\n2. **Proof:** Examples of your skills.\n3. **Fit:** Cultural match.\n4. **Call to Action:** "I'd love to discuss more..."\n\nKeep it under 1 page.` },
      fi: { title: 'Hakemuskirje', content: `# Hakemuskirje ✉️\n\n**Tavoite:** Vastaa "Miksi me?" ja "Miksi sinä?".\n\n### Rakenne\n1. **Koukku:** Miksi olet kiinnostunut?\n2. **Todisteet:** Esimerkkejä taidoista.\n3. **Sopivuus:** Kulttuurinen yhteensopivuus.\n\nPidä alle sivun mittaisena.` }
  },
  'job_interview': {
      en: { title: 'Job Interview', content: `# The Interview 🎙️\n\n### Style\nFormal but relaxed. Shake hands (firmly). Look in the eye.\n\n### Common Questions\n* "Tell me about yourself." (Keep it professional)\n* "Why do you want to work here?"\n* "Salary request?" (Be prepared with a number).` },
      fi: { title: 'Työhaastattelu', content: `# Haastattelu 🎙️\n\n### Tyyli\nAsiallinen mutta rento. Kättele jämäkästi. Katso silmiin.\n\n### Kysymyksiä\n* "Kerro itsestäsi."\n* "Miksi haluat meille?"\n* "Palkkatoive?" (Valmistaudu luvulla).` }
  },
  'job_linkedin': {
      en: { title: 'LinkedIn Tips', content: `# LinkedIn in Finland 🔗\n\nIt is the primary tool for recruiters in Tech/Business.\n\n### Tips\n* **Open to Work:** Use the green banner.\n* **Keywords:** Use Finnish keywords even in an English profile (e.g., "Project Manager / Projektipäällikkö").\n* **Activity:** Comment on Finnish companies' posts.` },
      fi: { title: 'LinkedIn-vinkit', content: `# LinkedIn Suomessa 🔗\n\nRekrytoijien ykköstyökalu.\n\n### Vinkit\n* **Open to Work:** Käytä vihreää kehystä.\n* **Avainsanat:** Käytä myös suomenkielisiä titeleitä.\n* **Aktiivisuus:** Kommentoi julkaisuja.` }
  },
  'job_recognition': {
      en: { title: 'Degree Recognition', content: `# Recognising Degrees 🎓\n\n### OPH (Agency for Education)\nIf you want to work in regulated professions (Teacher, Doctor, Nurse, Law), you MUST get your foreign degree recognized by OPH.\n\n* **Process:** Takes months and costs money.\n* **Non-regulated:** For IT/Business, usually not needed.` },
      fi: { title: 'Tutkintojen tunnustaminen', content: `# Tutkintojen rinnastaminen 🎓\n\n### OPH\nJos haluat toimia säännellyssä ammatissa (Opettaja, Lääkäri), tutkinto pitää tunnustaa.\n\n* **Prosessi:** Kestää kuukausia ja maksaa.` }
  },

  // --- RIGHTS (New) ---
  'work_unions': {
      en: { title: 'Trade Unions', content: `# Unions 🤝\n\n**Join one.**\n\n### Why?\n1. **Money:** Better unemployment fund.\n2. **Law:** Legal help.\n3. **Negotiation:** They set the salary levels.` },
      fi: { title: 'Ammattiliitot', content: `# Liitot 🤝\n\n**Liity jäseneksi.**\n\n### Miksi?\n1. **Raha:** Parempi työttömyysturva.\n2. **Laki:** Oikeusapu.\n3. **Neuvottelu:** Ne määrittelevät palkkatason.` }
  },
  'job_bias': {
      en: { title: 'Handling Bias', content: `# Discrimination 🚫\n\nIt exists. \n\n### Tactics\n* **Call:** Always call before applying to show language skills/personality.\n* **Name:** Highlight your *permit status* clearly.` },
      fi: { title: 'Syrjintä', content: `# Syrjintä 🚫\n\nSitä on olemassa.\n\n### Taktiikat\n* **Soita:** Soita aina ennen hakemista.\n* **Lupa:** Korosta oleskelulupasi statusta.` }
  },
  'work_contract': {
      en: { title: 'Employment Contract', content: `# The Contract (Työsopimus) 📝\n\n**Always written.**\n\n### Checklist\n1. **Duration:** Indefinite (toistaiseksi) or Fixed-term (määräaikainen)? Fixed-term requires a valid reason.\n2. **Trial Period:** Max 6 months. You can be fired easily during this time.\n3. **TES:** Which Collective Agreement applies?` },
      fi: { title: 'Työsopimus', content: `# Työsopimus 📝\n\n**Aina kirjallisena.**\n\n### Tarkistuslista\n1. **Kesto:** Toistaiseksi voimassa oleva vai määräaikainen?\n2. **Koeaika:** Max 6kk.\n3. **TES:** Mikä työehtosopimus pätee?` }
  },
  'work_hours': {
      en: { title: 'Working Hours', content: `# Hours & Overtime ⏰\n\n### Standard\n8 hours/day, 37.5 or 40 hours/week.\n\n### Overtime (Ylityö)\nMust be agreed upon. Paid extra (+50% or +100%). Many experts have "flexible hours" (liukuva työaika) where you bank hours.` },
      fi: { title: 'Työajat', content: `# Työajat & Ylityö ⏰\n\n### Vakio\n8h/päivä, 37.5h/viikko.\n\n### Ylityö\nMaksetaan korotettuna (+50% tai +100%). Monilla on liukuva työaika.` }
  },
  'work_holidays': {
      en: { title: 'Annual Holidays', content: `# Holidays (Vuosiloma) 🏖️\n\nFinland has generous holidays.\n\n### Earning\nYou earn ~2-2.5 days per month worked. \n* **Summer Holiday:** Usually 4 weeks in July.\n* **Holiday Pay:** You get paid + often a "Holiday Bonus" (Lomaraha, 50% extra).` },
      fi: { title: 'Vuosiloma', content: `# Vuosiloma 🏖️\n\nSuomessa on anteliaat lomat.\n\n### Ansainta\nTienaat n. 2-2.5 päivää kuukaudessa.\n* **Kesäloma:** Yleensä 4 viikkoa heinäkuussa.\n* **Lomaraha:** Ylimääräinen 50% palkasta.` }
  },

  // --- NORMS (New) ---
  'culture_essentials': {
      en: { title: 'Core Values', content: `# Trust & Silence 🤫\n\n1. **Trust:** Do what you say.\n2. **Silence:** Don't fill silence with noise.` },
      fi: { title: 'Arvot', content: `# Luottamus & Hiljaisuus 🤫\n\n1. **Luottamus:** Tee mitä lupaat.\n2. **Hiljaisuus:** Älä täytä hiljaisuutta turhalla puheella.` }
  },
  'culture_hierarchy': {
      en: { title: 'Flat Hierarchy', content: `# Low Hierarchy 📉\n\nBosses are colleagues. You can disagree.` },
      fi: { title: 'Matala hierarkia', content: `# Matala hierarkia 📉\n\nPomo on kollega. Voit olla eri mieltä.` }
  },
  'culture_meetings': {
      en: { title: 'Meeting Culture', content: `# Meetings 📅\n\n**Efficient & Punctual.**\n\n* **Start on time:** Exactly.\n* **Agenda:** Stick to it.\n* **No fluff:** Get to the point. Small talk is minimal in meetings.` },
      fi: { title: 'Kokouskulttuuri', content: `# Kokoukset 📅\n\n**Tehokkaita & Täsmällisiä.**\n\n* **Aloitus:** Tismalleen ajoissa.\n* **Asialista:** Pysy siinä.\n* **Ei turinaa:** Mene asiaan.` }
  },
  'culture_feedback': {
      en: { title: 'Giving Feedback', content: `# Feedback 🗣️\n\nFinns are direct but polite.\n\n* **Criticism:** Usually given privately.\n* **Silence = Good:** If nobody complains, you are doing well. We don't constantly praise.` },
      fi: { title: 'Palautteenanto', content: `# Palaute 🗣️\n\n* **Kritiikki:** Annetaan kahden kesken.\n* **Hiljaisuus = Hyvä:** Jos kukaan ei valita, menee hyvin. Emme kehu jatkuvasti.` }
  },
  'culture_emails': {
      en: { title: 'Email Etiquette', content: `# Emails 📧\n\n**Short & Functional.**\n\n* No need for "I hope this email finds you well".\n* "Hi Matti," -> Content -> "Br, Name".\n* Reply quickly.` },
      fi: { title: 'Sähköpostietiketti', content: `# Sähköpostit 📧\n\n**Lyhyitä & Toimivia.**\n\n* Ei turhia korulauseita.\n* "Moi Matti," -> Asia -> "T. Nimi".` }
  },

  // --- SOCIAL (New) ---
  'work_coffee': {
      en: { title: 'Coffee Break', content: `# Kahvitauko ☕\n\n**Mandatory.**\n\nGo to the break room. Bond with colleagues.` },
      fi: { title: 'Kahvitauko', content: `# Kahvitauko ☕\n\n**Pakollinen.**\n\nMene taukotilaan. Tutustu kollegoihin.` }
  },
  'work_social': {
      en: { title: 'Parties', content: `# Pikkujoulut 🎉\n\nOffice Christmas party. What happens there, stays there.` },
      fi: { title: 'Pikkujoulut', content: `# Pikkujoulut 🎉\n\nFirman bileet. Mitä siellä tapahtuu, jää sinne.` }
  },
  'culture_names': {
      en: { title: 'First Names', content: `# First Name Basis 🏷️\n\nAlmost everyone is "Sinä" (You) and called by First Name.\n\n* **Exception:** Maybe the President or very old people.\n* **Titles:** Rarely used (No "Mr. Engineer").` },
      fi: { title: 'Sinuttelu', content: `# Sinuttelu 🏷️\n\nLähes kaikki ovat "sinut".\n\n* **Poikkeus:** Presidentti tai hyvin iäkkäät.\n* **Tittelit:** Ei käytetä ("Herra Insinööri").` }
  },
  'culture_lunch': {
      en: { title: 'Lunch Culture', content: `# Lunch (Lounas) 🥗\n\n* **Time:** 11:00 - 12:00. Early!\n* **Duration:** 30 mins.\n* **Lounasseteli:** Employers often subsidize lunch (Epassi/Edenred). It's a warm meal, not a sandwich.` },
      fi: { title: 'Lounaskulttuuri', content: `# Lounas 🥗\n\n* **Aika:** 11:00 - 12:00. Aikaisin!\n* **Kesto:** 30 min.\n* **Lounasetu:** Työnantaja tukee usein lounasta. Se on lämmin ateria.` }
  },
  'culture_afterwork': {
      en: { title: 'Afterwork', content: `# Afterwork 🍻\n\n"AW" culture is growing, especially in Helsinki.\n\n* **Casual:** A beer/cider after work on Friday.\n* **Not mandatory:** Finns value free time, so don't feel pressured.` },
      fi: { title: 'Afterwork', content: `# Afterwork 🍻\n\nAW-kulttuuri kasvaa.\n\n* **Rento:** Olut/siideri töiden jälkeen.\n* **Ei pakollinen:** Suomalaiset arvostavat vapaa-aikaa.` }
  },

  // --- PROFESSIONS (New) ---
  'prof_tech': {
      en: { title: 'Tech & IT', content: `# IT Sector 💻\n\nEnglish is the main language.` },
      fi: { title: 'Tech & IT', content: `# IT-ala 💻\n\nEnglanti on pääkieli.` }
  },
  'prof_academia': {
      en: { title: 'Academia', content: `# Academia 🎓\n\nGrant funding is key.` },
      fi: { title: 'Akatemia', content: `# Akatemia 🎓\n\nApurahat ovat avainasemassa.` }
  },
  'prof_engineering': {
      en: { title: 'Engineering', content: `# Engineering ⚙️\n\n**Strong Demand.**\n\n* **Fields:** Energy, Marine, Paper, Construction.\n* **Language:** Often English works in large global firms (Kone, Wärtsilä, Neste), but Finnish helps in meetings.` },
      fi: { title: 'Insinöörityö', content: `# Insinöörityö ⚙️\n\n**Kova kysyntä.**\n\n* **Alat:** Energia, Meri, Paperi, Rakennus.\n* **Kieli:** Englanti toimii isoissa firmoissa, mutta suomi auttaa.` }
  },
  'prof_business': {
      en: { title: 'Business', content: `# Business & Sales 💼\n\n**Hard for foreigners.**\n\n* **Reason:** Sales usually requires native-level Finnish to build trust.\n* **Niche:** Export sales or international account management.` },
      fi: { title: 'Kaupallinen ala', content: `# Kaupallinen ala 💼\n\n**Haastava ulkomaalaisille.**\n\n* **Syy:** Myynti vaatii usein täydellistä suomea.\n* **Rako:** Vientimyynti.` }
  },
  'prof_creative': {
      en: { title: 'Creative', content: `# Creative Industries 🎨\n\n**Gaming & Design.**\n\n* **Gaming:** Huge in Finland (Supercell, Rovio). Very international.\n* **Design:** Functional, minimalist. Networking is everything.` },
      fi: { title: 'Luovat alat', content: `# Luovat alat 🎨\n\n**Pelit & Muotoilu.**\n\n* **Pelit:** Suuri ala Suomessa. Hyvin kansainvälinen.\n* **Muotoilu:** Funktionaalista. Verkostot ovat kaikkea.` }
  },
  'prof_logistics': {
      en: { title: 'Logistics', content: `# Logistics & Driving 🚚\n\n**Easy Entry.**\n\n* **Driving:** Need a valid license (convert yours!). C-license is valuable.\n* **Warehousing:** Physical work, often through staffing agencies.` },
      fi: { title: 'Logistiikka', content: `# Logistiikka 🚚\n\n**Helppo pääsy.**\n\n* **Ajaminen:** Tarvitset ajokortin.\n* **Varastotyö:** Fyysistä, usein vuokrafirmojen kautta.` }
  },
  // Existing hands-on
  'prof_general': { en: { title: 'General Work', content: `General advice.` }, fi: { title: 'Yleinen työ', content: `Yleisohjeet.` } },
  'prof_health': { en: { title: 'Healthcare', content: `Nursing.` }, fi: { title: 'Hoitoala', content: `Hoitotyö.` } },
  'prof_service': { en: { title: 'Service', content: `Cleaning & Food.` }, fi: { title: 'Palveluala', content: `Siivous & Ruoka.` } },
  'prof_construction': { en: { title: 'Construction', content: `Cards needed.` }, fi: { title: 'Rakennusala', content: `Kortit vaaditaan.` } },

  // --- LIFE (New) ---
  'housing_general': { en: { title: 'Finding Housing', content: `Oikotie & Vuokraovi.` }, fi: { title: 'Asunnonhaku', content: `Oikotie & Vuokraovi.` } },
  'housing_contracts': {
      en: { title: 'Rental Contracts', content: `# The Lease 📝\n\n* **Deposit:** Usually 2 months.\n* **Notice:** Usually 1 calendar month for tenant.\n* **Home Insurance:** Mandatory.` },
      fi: { title: 'Vuokrasopimus', content: `# Sopimus 📝\n\n* **Takuuvuokra:** Yleensä 2kk.\n* **Irtisanominen:** 1kk.\n* **Kotivakuutus:** Pakollinen.` }
  },
  'housing_recycling': {
      en: { title: 'Recycling', content: `# Recycling Rules ♻️\n\nFinns are strict.\n\n* **Bio:** Food waste.\n* **Carton:** Milk cartons, boxes.\n* **Plastic:** Packaging.\n* **Bottles:** Return to store for money (Pantti)!` },
      fi: { title: 'Kierrätys', content: `# Kierrätys ♻️\n\n* **Bio:** Ruoka.\n* **Kartonki:** Tölkit.\n* **Muovi:** Pakkaukset.\n* **Pullot:** Palauta kauppaan (Pantti)!` }
  },
  'transport_public': { en: { title: 'Public Transport', content: `HSL & VR.` }, fi: { title: 'Julkinen liikenne', content: `HSL & VR.` } },
  'transport_driving': {
      en: { title: 'Driving', content: `# Driving in Finland 🚗\n\n* **Winter:** Winter tires are mandatory Dec-Feb.\n* **License:** EU licenses valid. Non-EU must be exchanged within 2 years.` },
      fi: { title: 'Ajaminen', content: `# Ajaminen 🚗\n\n* **Talvi:** Talvirenkaat pakolliset.\n* **Kortti:** EU-kortit käyvät.` }
  },

  // --- FAMILY (New) ---
  'family_neuvola': { en: { title: 'Neuvola', content: `Child health.` }, fi: { title: 'Neuvola', content: `Lastenneuvola.` } },
  'family_daycare': { en: { title: 'Daycare', content: `Päiväkoti.` }, fi: { title: 'Päiväkoti', content: `Varhaiskasvatus.` } },
  'family_teens': { en: { title: 'Teens', content: `Wilma.` }, fi: { title: 'Nuoret', content: `Wilma.` } },
  'family_school_system': {
      en: { title: 'School System', content: `# Comprehensive School 🎒\n\n**Peruskoulu.**\n\n* **Free:** Everything. Lunch, books, tools.\n* **Start:** Age 7.\n* **Quality:** One of the best in the world. No need to shop for "good schools", the nearest one is good.` },
      fi: { title: 'Koulujärjestelmä', content: `# Peruskoulu 🎒\n\n* **Ilmainen:** Kaikki. Ruoka, kirjat.\n* **Alkaa:** 7-vuotiaana.\n* **Laatu:** Lähikoulu on paras koulu.` }
  },
  'family_hobbies': {
      en: { title: 'Hobbies', content: `# Hobbies (Harrastukset) ⚽\n\nCritical for kids' social life.\n\n* **Sports:** Football, Ice Hockey, Floorball.\n* **Arts:** Music schools (Musiikkiopisto).\n* **Cost:** Can be high, but cities support low-income families.` },
      fi: { title: 'Harrastukset', content: `# Harrastukset ⚽\n\nTärkeää sosiaalistumiselle.\n\n* **Urheilu:** Jalkapallo, Jääkiekko, Salibandy.\n* **Taide:** Musiikkiopisto.` }
  },

  // --- LANGUAGE (New) ---
  'lang_roadmap': { en: { title: 'Roadmap', content: `Learning plan.` }, fi: { title: 'Tiekartta', content: `Oppimissuunnitelma.` } },
  'culture_norms': { en: { title: 'Norms', content: `Social rules.` }, fi: { title: 'Normit', content: `Säännöt.` } },
  'lang_courses': {
      en: { title: 'Finding Courses', content: `# Courses 🏫\n\n* **Finnishcourses.fi:** The big search engine.\n* **Työväenopisto:** Cheap evening classes.\n* **Yle:** Free online materials.` },
      fi: { title: 'Kielikurssit', content: `# Kurssit 🏫\n\n* **Finnishcourses.fi:** Hakukone.\n* **Työväenopisto:** Halvat iltakurssit.` }
  },
  'lang_yki': {
      en: { title: 'YKI Test', content: `# YKI Certificate 📜\n\n**For Citizenship.**\n\n* **Level:** You need Intermediate (Keskitaso) level 3 or 4.\n* **Booking:** Be fast! Tests fill up in minutes.` },
      fi: { title: 'YKI-testi', content: `# YKI-todistus 📜\n\n**Kansalaisuutta varten.**\n\n* **Taso:** Keskitaso 3 tai 4.\n* **Varaus:** Ole nopea!` }
  },
  'lang_puhu': {
      en: { title: 'Dare to Speak', content: `# Puhu rohkeasti 🗣️\n\nFinns might switch to English to be "polite".\n\n* **Strategy:** Say "Puhun suomea" (I speak Finnish) and continue in Finnish.\n* **Mistakes:** Nobody cares. Just communicate.` },
      fi: { title: 'Puhu rohkeasti', content: `# Puhu rohkeasti 🗣️\n\nSuomalaiset vaihtavat helposti englantiin.\n\n* **Strategia:** Sano "Puhun suomea".\n* **Virheet:** Ei haittaa.` }
  }
};

// ---------------------------------------------------------------------------
// CATEGORY DEFINITIONS (METADATA)
// ---------------------------------------------------------------------------

// Helper to safely get content with fallback
const getContent = (id: string, lang: LanguageCode): ContentSet => {
  const article = ARTICLE_CONTENT[id];
  
  if (!article) {
      return { title: getTitle(id, lang, 'Guide'), content: 'Content updating...' };
  }
  
  // 1. Try exact language body
  if (article[lang]) return article[lang];
  
  // 2. Fallback to English Body, but use Localized Title if available in lookup
  const fallback = article['en'];
  if (fallback) {
      return {
          title: getTitle(id, lang, fallback.title),
          content: fallback.content // Content remains EN
      };
  }
  
  return { title: 'Content Pending', content: 'This guide is being written.' };
};

// Helper to get localized Category Titles
const getCatTitle = (id: string, lang: LanguageCode): string => {
    const titles: Record<string, Record<string, string>> = {
        foundation: {
            en: 'The Essentials', et: 'Põhitõed', ar: 'الأساسيات', fi: 'Perusasiat',
            ru: 'Основы', uk: 'Основи', th: 'สิ่งจำเป็น', vi: 'Cơ bản',
            zh: '基本要素', es: 'Lo esencial', tr: 'Temel Bilgiler',
            fa: 'اصول اولیه', ku: 'Bingehîn', sq: 'Bazat', pt: 'O Essencial', so: 'Aasaaska'
        },
        job_strategy: {
            en: 'Job Search Strategy', et: 'Tööotsingu strateegia', ar: 'استراتيجية البحث عن عمل',
            fi: 'Työnhakustrategia', ru: 'Стратегия поиска работы', uk: 'Стратегія пошуку роботи',
            th: 'กลยุทธ์การหางาน', vi: 'Chiến lược tìm việc',
            zh: '求职策略', es: 'Estrategia de búsqueda', tr: 'İş Arama Stratejisi',
            fa: 'استراتژی جستجوی کار', ku: 'Stratejiya lêgerîna kar', sq: 'Strategjia e kërkimit', pt: 'Estratégia de Emprego', so: 'Qorshaha Shaqo Raadinta'
        },
        workplace: {
            en: 'Workplace Culture', et: 'Töökultuur', ar: 'ثقافة العمل',
            fi: 'Työkulttuuri', ru: 'Рабочая культура', uk: 'Робоча культура',
            th: 'วัฒนธรรมที่ทำงาน', vi: 'Văn hóa làm việc',
            zh: '职场文化', es: 'Cultura laboral', tr: 'İşyeri Kültürü',
            fa: 'فرهنگ محیط کار', ku: 'Çanda kargehê', sq: 'Kultura e punës', pt: 'Cultura de Trabalho', so: 'Dhaqanka Shaqada'
        },
        industries: {
            en: 'Industry Guides', et: 'Tööstusharud', ar: 'أدلة الصناعة',
            fi: 'Toimialaoppaat', ru: 'Гиды по отраслям', uk: 'Галузеві гіди',
            th: 'คู่มืออุตสาหกรรม', vi: 'Hướng dẫn ngành nghề',
            zh: '行业指南', es: 'Guías por industria', tr: 'Sektör Rehberleri',
            fa: 'راهنمای صنایع', ku: 'Rêberên pîşesaziyê', sq: 'Udhëzues industrie', pt: 'Guias da Indústria', so: 'Tilmaamaha Warshadaha'
        },
        life: {
            en: 'Life & Balance', et: 'Elu ja tasakaal', ar: 'الحياة والتوازن',
            fi: 'Elämä & Tasapaino', ru: 'Жизнь и баланс', uk: 'Життя та баланс',
            th: 'ชีวิตและความสมดุล', vi: 'Cuộc sống & Cân bằng',
            zh: '生活与平衡', es: 'Vida y equilibrio', tr: 'Yaşam ve Denge',
            fa: 'زندگی و تعادل', ku: 'Jiyan û hevsengî', sq: 'Jeta dhe ekuilibri', pt: 'Vida e Equilíbrio', so: 'Nolosha & Dheelitirka'
        }
    };
    
    // Normalize lang
    const code = lang.toLowerCase();
    const base = code.split('-')[0];
    const catTitles = titles[id];
    
    return catTitles?.[code] || catTitles?.[base] || catTitles?.['en'] || id;
};

const getSubTitle = (id: string, lang: LanguageCode): string => {
    const titles: Record<string, Record<string, string>> = {
        identity: { 
            en: 'Identity & Permits', fi: 'Henkilöllisyys & luvat', vi: 'Danh tính & Giấy phép',
            zh: '身份与许可', es: 'Identidad y permisos', tr: 'Kimlik ve İzinler', 
            ar: 'الهوية والتصاريح', uk: 'Особистість та дозволи', pt: 'Identidade e Permissões',
            ru: 'Личность и разрешения', fa: 'هویت و مجوزها'
        },
        security: { 
            en: 'Social Security', fi: 'Sosiaaliturva', vi: 'An sinh xã hội',
            zh: '社会保障', es: 'Seguridad Social', tr: 'Sosyal Güvenlik',
            ar: 'الضمان الاجتماعي', uk: 'Соціальне забезпечення', pt: 'Segurança Social',
            ru: 'Социальное обеспечение', fa: 'تامین اجتماعی'
        },
        market: { 
            en: 'The Market', fi: 'Työmarkkinat', vi: 'Thị trường lao động',
            zh: '就业市场', es: 'El Mercado', tr: 'İş Piyasası',
            ar: 'سوق العمل', uk: 'Ринок праці', pt: 'O Mercado',
            ru: 'Рынок труда', fa: 'بازار کار'
        },
        tools: { 
            en: 'Tools', fi: 'Työkalut', vi: 'Công cụ',
            zh: '求职工具', es: 'Herramientas', tr: 'Araçlar',
            ar: 'الأدوات', uk: 'Інструменти', pt: 'Ferramentas',
            ru: 'Инструменты', fa: 'ابزارها'
        },
        rights: { 
            en: 'Rights & Bias', fi: 'Oikeudet & Syrjintä', vi: 'Quyền lợi',
            zh: '权利与偏见', es: 'Derechos y sesgos', tr: 'Haklar',
            ar: 'الحقوق والتحيز', uk: 'Права', pt: 'Direitos',
            ru: 'Права', fa: 'حقوق'
        },
        social: { 
            en: 'Social Rituals', fi: 'Sosiaaliset rituaalit', vi: 'Nghi thức xã hội',
            zh: '社交礼仪', es: 'Rituales sociales', tr: 'Sosyal Ritüeller',
            ar: 'الطقوس الاجتماعية', uk: 'Соціальні ритуали', pt: 'Rituais Sociais',
            ru: 'Социальные ритуалы', fa: 'آداب اجتماعی'
        },
        norms: { 
            en: 'Professional Norms', fi: 'Ammatilliset normit', vi: 'Quy tắc nghề nghiệp',
            zh: '职业规范', es: 'Normas profesionales', tr: 'Profesyonel Normlar',
            ar: 'المعايير المهنية', uk: 'Професійні норми', pt: 'Normas Profissionais',
            ru: 'Профессиональные нормы', fa: 'هنجارهای حرفه‌ای'
        },
        specialist: { 
            en: 'Specialist Roles', fi: 'Asiantuntijat', vi: 'Chuyên gia',
            zh: '专家角色', es: 'Roles especializados', tr: 'Uzmanlık Rolleri',
            ar: 'الأدوار المتخصصة', uk: 'Спеціалісти', pt: 'Funções Especializadas',
            ru: 'Специалисты', fa: 'نقش‌های تخصصی'
        },
        hands_on: { 
            en: 'Hands-on Work', fi: 'Käytännön työ', vi: 'Lao động phổ thông',
            zh: '实操工作', es: 'Trabajo manual', tr: 'Pratik İşler',
            ar: 'العمل اليدوي', uk: 'Робочі спеціальності', pt: 'Trabalho Prático',
            ru: 'Рабочие специальности', fa: 'کارهای عملی'
        },
        housing: { 
            en: 'Housing & Transport', fi: 'Asuminen & Liikenne', vi: 'Nhà ở & Đi lại',
            zh: '住房与交通', es: 'Vivienda y transporte', tr: 'Konut ve Ulaşım',
            ar: 'السكن والمواصلات', uk: 'Житло та транспорт', pt: 'Habitação e Transporte',
            ru: 'Жилье и транспорт', fa: 'مسکن و حمل و نقل'
        },
        family: { 
            en: 'Family Support', fi: 'Perhe', vi: 'Gia đình',
            zh: '家庭支持', es: 'Apoyo familiar', tr: 'Aile Desteği',
            ar: 'دعم الأسرة', uk: 'Підтримка сім\'ї', pt: 'Apoio Familiar',
            ru: 'Поддержка семьи', fa: 'حمایت از خانواده'
        },
        language: { 
            en: 'Language', fi: 'Kieli', vi: 'Ngôn ngữ',
            zh: '语言', es: 'Idioma', tr: 'Dil',
            ar: 'اللغة', uk: 'Мова', pt: 'Idioma',
            ru: 'Язык', fa: 'زبان'
        }
    };
    const code = lang.toLowerCase();
    const base = code.split('-')[0];
    const t = titles[id];
    return t?.[code] || t?.[base] || t?.['en'] || id;
};

export const getWikiCategories = (lang: LanguageCode): WikiCategory[] => {
  return [
    {
      id: 'foundation',
      title: getCatTitle('foundation', lang),
      icon: 'Building2',
      theme: { 
        border: 'border-slate-600 dark:border-slate-500', 
        text: 'text-slate-700 dark:text-slate-300', 
        shadow: 'hover:shadow-slate-100 dark:hover:shadow-slate-900/50',
        hoverBg: 'group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'
      },
      subsections: [
        {
            title: getSubTitle('identity', lang),
            articles: [
                { id: 'guide_start', icon: 'Flag', tags: ['general', 'arrival'], ...getContent('guide_start', lang) },
                { id: 'bureaucracy_dvv', icon: 'Fingerprint', tags: ['general', 'arrival'], ...getContent('bureaucracy_dvv', lang) },
                { id: 'bureaucracy_migri', icon: 'CreditCard', tags: ['general', 'arrival'], ...getContent('bureaucracy_migri', lang) },
                { id: 'bureaucracy_strong_auth', icon: 'Key', tags: ['general', 'arrival'], ...getContent('bureaucracy_strong_auth', lang) },
                { id: 'bureaucracy_tax', icon: 'Percent', tags: ['general', 'work'], ...getContent('bureaucracy_tax', lang) }
            ]
        },
        {
            title: getSubTitle('security', lang),
            articles: [
                { id: 'bureaucracy_kela', icon: 'Umbrella', tags: ['general', 'family'], ...getContent('bureaucracy_kela', lang) },
                { id: 'health_services', icon: 'Stethoscope', tags: ['general', 'health'], ...getContent('health_services', lang) },
                { id: 'social_unemployment', icon: 'Briefcase', tags: ['work', 'benefits'], ...getContent('social_unemployment', lang) },
                { id: 'social_housing', icon: 'Home', tags: ['housing', 'benefits'], ...getContent('social_housing', lang) },
                { id: 'social_pension', icon: 'Coins', tags: ['work', 'future'], ...getContent('social_pension', lang) }
            ]
        }
      ]
    },
    {
      id: 'job_strategy',
      title: getCatTitle('job_strategy', lang),
      icon: 'Briefcase',
      theme: { 
        border: 'border-blue-600 dark:border-blue-500', 
        text: 'text-blue-600 dark:text-blue-400', 
        shadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/50',
        hoverBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50'
      },
      subsections: [
          {
              title: getSubTitle('market', lang),
              articles: [
                  { id: 'job_market_overview', icon: 'LayoutGrid', tags: ['worker', 'general'], ...getContent('job_market_overview', lang) },
                  { id: 'job_networking', icon: 'Users', tags: ['worker', 'networking'], ...getContent('job_networking', lang) },
                  { id: 'job_te_office', icon: 'Building', tags: ['worker', 'unemployment'], ...getContent('job_te_office', lang) },
                  { id: 'job_portals', icon: 'Search', tags: ['worker', 'search'], ...getContent('job_portals', lang) },
                  { id: 'job_entrepreneurship', icon: 'Rocket', tags: ['worker', 'business'], ...getContent('job_entrepreneurship', lang) }
              ]
          },
          {
              title: getSubTitle('tools', lang),
              articles: [
                  { id: 'job_cv_standards', icon: 'FileText', tags: ['worker', 'student'], ...getContent('job_cv_standards', lang) },
                  { id: 'job_cover_letter', icon: 'PenTool', tags: ['worker', 'application'], ...getContent('job_cover_letter', lang) },
                  { id: 'job_linkedin', icon: 'Linkedin', tags: ['worker', 'networking'], ...getContent('job_linkedin', lang) },
                  { id: 'job_interview', icon: 'Mic', tags: ['worker', 'interview'], ...getContent('job_interview', lang) },
                  { id: 'job_recognition', icon: 'Award', tags: ['worker', 'degree'], ...getContent('job_recognition', lang) }
              ]
          },
          {
              title: getSubTitle('rights', lang),
              articles: [
                  { id: 'work_unions', icon: 'Handshake', tags: ['worker', 'rights'], ...getContent('work_unions', lang) },
                  { id: 'job_bias', icon: 'Scale', tags: ['worker', 'discrimination'], ...getContent('job_bias', lang) },
                  { id: 'work_contract', icon: 'FileSignature', tags: ['worker', 'contract'], ...getContent('work_contract', lang) },
                  { id: 'work_hours', icon: 'Clock', tags: ['worker', 'contract'], ...getContent('work_hours', lang) },
                  { id: 'work_holidays', icon: 'Palmtree', tags: ['worker', 'contract'], ...getContent('work_holidays', lang) }
              ]
          }
      ]
    },
    {
      id: 'workplace',
      title: getCatTitle('workplace', lang),
      icon: 'Coffee',
      theme: { 
        border: 'border-emerald-600 dark:border-emerald-500', 
        text: 'text-emerald-600 dark:text-emerald-400', 
        shadow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/50',
        hoverBg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/50'
      },
      subsections: [
          {
              title: getSubTitle('norms', lang),
              articles: [
                  { id: 'culture_essentials', icon: 'Shield', tags: ['culture', 'worker'], ...getContent('culture_essentials', lang) },
                  { id: 'culture_hierarchy', icon: 'Users', tags: ['culture', 'worker'], ...getContent('culture_hierarchy', lang) },
                  { id: 'culture_meetings', icon: 'Calendar', tags: ['culture', 'worker'], ...getContent('culture_meetings', lang) },
                  { id: 'culture_feedback', icon: 'MessageCircle', tags: ['culture', 'worker'], ...getContent('culture_feedback', lang) },
                  { id: 'culture_emails', icon: 'Mail', tags: ['culture', 'worker'], ...getContent('culture_emails', lang) }
              ]
          },
          {
              title: getSubTitle('social', lang),
              articles: [
                  { id: 'work_coffee', icon: 'Coffee', tags: ['culture', 'worker'], ...getContent('work_coffee', lang) },
                  { id: 'work_social', icon: 'GlassWater', tags: ['culture', 'worker'], ...getContent('work_social', lang) },
                  { id: 'culture_names', icon: 'Tag', tags: ['culture', 'social'], ...getContent('culture_names', lang) },
                  { id: 'culture_lunch', icon: 'Utensils', tags: ['culture', 'social'], ...getContent('culture_lunch', lang) },
                  { id: 'culture_afterwork', icon: 'Beer', tags: ['culture', 'social'], ...getContent('culture_afterwork', lang) }
              ]
          }
      ]
    },
    {
      id: 'industries',
      title: getCatTitle('industries', lang),
      icon: 'HardHat',
      theme: { 
        border: 'border-zinc-600 dark:border-zinc-500', 
        text: 'text-zinc-600 dark:text-zinc-400', 
        shadow: 'hover:shadow-zinc-100 dark:hover:shadow-zinc-900/50',
        hoverBg: 'group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/50'
      },
      subsections: [
          {
              title: getSubTitle('specialist', lang),
              articles: [
                  { id: 'prof_tech', icon: 'Code', tags: ['worker', 'tech'], ...getContent('prof_tech', lang) },
                  { id: 'prof_academia', icon: 'GraduationCap', tags: ['worker', 'education'], ...getContent('prof_academia', lang) },
                  { id: 'prof_engineering', icon: 'Settings', tags: ['worker', 'engineering'], ...getContent('prof_engineering', lang) },
                  { id: 'prof_business', icon: 'Briefcase', tags: ['worker', 'business'], ...getContent('prof_business', lang) },
                  { id: 'prof_creative', icon: 'PenTool', tags: ['worker', 'creative'], ...getContent('prof_creative', lang) }
              ]
          },
          {
              title: getSubTitle('hands_on', lang),
              articles: [
                  { id: 'prof_general', icon: 'Briefcase', tags: ['worker', 'general'], ...getContent('prof_general', lang) },
                  { id: 'prof_health', icon: 'Stethoscope', tags: ['worker', 'health'], ...getContent('prof_health', lang) },
                  { id: 'prof_service', icon: 'Utensils', tags: ['worker', 'service'], ...getContent('prof_service', lang) },
                  { id: 'prof_construction', icon: 'Hammer', tags: ['worker', 'construction'], ...getContent('prof_construction', lang) },
                  { id: 'prof_logistics', icon: 'Truck', tags: ['worker', 'logistics'], ...getContent('prof_logistics', lang) }
              ]
          }
      ]
    },
    {
      id: 'life',
      title: getCatTitle('life', lang),
      icon: 'Home',
      theme: { 
        border: 'border-purple-600 dark:border-purple-500', 
        text: 'text-purple-600 dark:text-purple-400', 
        shadow: 'hover:shadow-purple-100 dark:hover:shadow-purple-900/50',
        hoverBg: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/50'
      },
      subsections: [
          {
              title: getSubTitle('housing', lang),
              articles: [
                  { id: 'housing_general', icon: 'Home', tags: ['general', 'arrival'], ...getContent('housing_general', lang) },
                  { id: 'housing_contracts', icon: 'FileText', tags: ['housing', 'legal'], ...getContent('housing_contracts', lang) },
                  { id: 'housing_recycling', icon: 'Recycle', tags: ['housing', 'daily'], ...getContent('housing_recycling', lang) },
                  { id: 'transport_public', icon: 'Train', tags: ['general', 'daily'], ...getContent('transport_public', lang) },
                  { id: 'transport_driving', icon: 'Car', tags: ['general', 'daily'], ...getContent('transport_driving', lang) }
              ]
          },
          {
              title: getSubTitle('family', lang),
              articles: [
                  { id: 'family_neuvola', icon: 'Heart', tags: ['family', 'health'], ...getContent('family_neuvola', lang) },
                  { id: 'family_daycare', icon: 'Sprout', tags: ['family', 'education'], ...getContent('family_daycare', lang) },
                  { id: 'family_school_system', icon: 'Book', tags: ['family', 'education'], ...getContent('family_school_system', lang) },
                  { id: 'family_hobbies', icon: 'Music', tags: ['family', 'leisure'], ...getContent('family_hobbies', lang) },
                  { id: 'family_teens', icon: 'Headphones', tags: ['family', 'youth'], ...getContent('family_teens', lang) }
              ]
          },
          {
              title: getSubTitle('language', lang),
              articles: [
                  { id: 'lang_roadmap', icon: 'Map', tags: ['language'], ...getContent('lang_roadmap', lang) },
                  { id: 'lang_courses', icon: 'School', tags: ['language'], ...getContent('lang_courses', lang) },
                  { id: 'lang_yki', icon: 'Award', tags: ['language'], ...getContent('lang_yki', lang) },
                  { id: 'lang_puhu', icon: 'MessageCircle', tags: ['language'], ...getContent('lang_puhu', lang) },
                  { id: 'culture_norms', icon: 'Info', tags: ['culture', 'daily'], ...getContent('culture_norms', lang) }
              ]
          }
      ]
    }
  ];
};

export const getAllFlattenedArticles = (lang: LanguageCode): EnrichedWikiArticle[] => {
  const categories = getWikiCategories(lang);
  
  const all: EnrichedWikiArticle[] = [];
  
  categories.forEach((cat, catIdx) => {
      cat.subsections.forEach((sub, subIdx) => {
          sub.articles.forEach((art, artIdx) => {
              all.push({
                  ...art,
                  categoryTitle: cat.title,
                  categoryId: cat.id,
                  displayId: `${catIdx + 1}.${subIdx + 1}.${artIdx + 1}`
              });
          });
      });
  });
  
  return all;
};
