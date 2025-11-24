
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
  articles: WikiArticle[];
}

export interface EnrichedWikiArticle extends WikiArticle {
  categoryTitle: string;
  displayId: string; // e.g., "1.1"
  categoryId: string;
}

// ---------------------------------------------------------------------------
// RAW CONTENT STORE (Keep existing, fallback logic handles new languages)
// ---------------------------------------------------------------------------

type ContentSet = {
  title: string;
  content: string;
};

// Map: ArticleID -> LanguageCode -> Content
// Note: This stores the *Article* content. New languages will fallback to EN automatically.
// To add full translations, add keys 'et', 'ar', etc. here. 
// For now, we rely on the Category titles being translated below.
const ARTICLE_CONTENT: Record<string, Record<string, ContentSet>> = {
  // --- UNIVERSAL START ---
  'guide_start': {
    en: {
      title: 'Welcome to Finland! 🇫🇮',
      content: `# Your Survival Guide\n\n**The Philosophy:**\nFinland works on trust, silence, and coffee. It is a society where systems work, but you must know how to use them.\n\n### How to use this app\n1. **Read:** Browse the guides for bureaucracy and work culture.\n2. **Chat:** Ask the AI Assistant specific questions about your situation.\n3. **Profile:** Keep your info updated so the advice is accurate.\n\n*Sisu* (Guts) is all you need!`
    },
    fi: {
      title: 'Tervetuloa Suomeen! 🇫🇮',
      content: `# Selviytymisoppaasi\n\n**Filosofia:**\nSuomi toimii luottamuksella, hiljaisuudella ja kahvilla. Yhteiskunta toimii, mutta sinun on tiedettävä säännöt.\n\n### Kuinka käytät tätä sovellusta\n1. **Lue:** Selaa oppaita byrokratiasta ja työkulttuurista.\n2. **Keskustele:** Kysy tekoälyltä tarkkoja kysymyksiä.\n3. **Profiili:** Pidä tietosi ajan tasalla.\n\n*Sisu* on kaikki mitä tarvitset!`
    },
    th: {
      title: 'ยินดีต้อนรับสู่ฟินแลนด์! 🇫🇮',
      content: `# คู่มือการเอาตัวรอดของคุณ\n\n**ปรัชญา:**\nฟินแลนด์ขับเคลื่อนด้วยความไว้วางใจ ความเงียบ และกาแฟ\n\n### วิธีใช้แอปนี้\n1. **อ่าน:** เรียกดูคู่มือเกี่ยวกับระบบราชการและวัฒนธรรมการทำงาน\n2. **แชท:** ถามคำถามเจาะจงกับผู้ช่วย AI\n3. **โปรไฟล์:** อัปเดตข้อมูลของคุณเพื่อคำแนะนำที่ดีขึ้น\n\n*Sisu* (ความมุ่งมั่น) คือสิ่งที่คุณต้องมี!`
    },
    et: {
      title: 'Tere tulemast Soome! 🇫🇮',
      content: `# Sinu ellujäämisjuhend\n\n**Filosoofia:**\nSoome toimib usaldusel, vaikusel ja kohvil.\n\n### Kuidas seda rakendust kasutada\n1. **Loe:** Sirvi bürokraatia ja töökultuuri juhendeid.\n2. **Vestle:** Küsi AI-lt konkreetseid küsimusi.\n3. **Profiil:** Hoia oma andmed ajakohasena.\n\n*Sisu* on kõik, mida vajad!`
    },
    ru: {
      title: 'Добро пожаловать в Финляндию! 🇫🇮',
      content: `# Ваш гид по выживанию\n\n**Философия:**\nФинляндия держится на доверии, тишине и кофе.\n\n### Как использовать это приложение\n1. **Читайте:** Изучайте гиды по бюрократии и культуре.\n2. **Чат:** Задавайте AI конкретные вопросы.\n3. **Профиль:** Обновляйте данные для точных советов.\n\n*Sisu* (упорство) — это всё, что вам нужно!`
    },
    ar: {
      title: 'مرحباً بك في فنلندا! 🇫🇮',
      content: `# دليل البقاء الخاص بك\n\n**الفلسفة:**\nتعمل فنلندا على الثقة والصمت والقهوة.\n\n### كيف تستخدم هذا التطبيق\n1. **اقرأ:** تصفح الأدلة حول البيروقراطية وثقافة العمل.\n2. **دردش:** اسأل المساعد الذكي أسئلة محددة.\n3. **الملف الشخصي:** حافظ على تحديث معلوماتك.\n\n*Sisu* (العزيمة) هو كل ما تحتاجه!`
    },
    so: {
      title: 'Ku soo dhowow Finland! 🇫🇮',
      content: `# Hagahaaga Badbaadada\n\n**Falsafadda:**\nFinland waxay ku shaqeysaa aaminaad, aamusnaan, iyo kafee.\n\n### Sida loo isticmaalo abkan\n1. **Akhri:** Baadh hagayaasha ku saabsan xafiisyada iyo dhaqanka shaqada.\n2. **Wada hadal:** Weydii AI su'aalo gaar ah.\n3. **Profile:** Cusbooneysii macluumaadkaaga.\n\n*Sisu* (Adkeysi) waa waxa kaliya ee aad u baahan tahay!`
    },
    fa: {
      title: 'به فنلاند خوش آمدید! 🇫🇮',
      content: `# راهنمای بقای شما\n\n**فلسفه:**\nفنلاند بر پایه اعتماد، سکوت و قهوه می‌چرخد.\n\n### نحوه استفاده از این برنامه\n1. **بخوانید:** راهنماهای بوروکراسی و فرهنگ کار را مرور کنید.\n2. **گفتگو کنید:** از هوش مصنوعی سوالات خاص بپرسید.\n3. **نمایه:** اطلاعات خود را به‌روز نگه دارید.\n\n*Sisu* (استقامت) تنها چیزی است که نیاز دارید!`
    },
    ku: {
      title: 'Bi xêr hatî Fînlandiyayê! 🇫🇮',
      content: `# Rêberê Te yê Jiyanê\n\n**Felsefe:**\nFînlandiya li ser bawerî, bêdengî û qehweyê dixebite.\n\n### Meriv çawa vê sepanê bikar tîne\n1. **Bixwîne:** Rêbernameyên li ser burokrasî û çanda xebatê bigere.\n2. **Chat:** Ji AI pirsên taybet bipirse.\n3. **Profîl:** Agahdariyên xwe nû bike.\n\n*Sisu* (Wêrekî) her tişt e ku hûn hewce ne!`
    },
    zh: {
      title: '欢迎来到芬兰！🇫🇮',
      content: `# 你的生存指南\n\n**哲学：**\n芬兰的运作基于信任、沉默和咖啡。\n\n### 如何使用此应用\n1. **阅读：** 浏览关于官僚机构和工作文化的指南。\n2. **对话：** 向AI助手询问具体问题。\n3. **个人资料：** 保持信息更新以获得更准确的建议。\n\n*Sisu*（毅力）是你唯一需要的！`
    },
    vi: {
      title: 'Chào mừng đến Phần Lan! 🇫🇮',
      content: `# Cẩm nang sinh tồn của bạn\n\n**Triết lý:**\nPhần Lan vận hành dựa trên niềm tin, sự im lặng và cà phê.\n\n### Cách sử dụng ứng dụng này\n1. **Đọc:** Xem các hướng dẫn về thủ tục hành chính và văn hóa làm việc.\n2. **Trò chuyện:** Đặt câu hỏi cụ thể cho Trợ lý AI.\n3. **Hồ sơ:** Cập nhật thông tin của bạn.\n\n*Sisu* (Kiên định) là tất cả những gì bạn cần!`
    },
    sq: {
      title: 'Mirë se vini në Finlandë! 🇫🇮',
      content: `# Udhëzuesi juaj i mbijetesës\n\n**Filozofia:**\nFinlanda funksionon mbi besimin, heshtjen dhe kafenë.\n\n### Si ta përdorni këtë aplikacion\n1. **Lexo:** Shfleto udhëzuesit mbi burokracinë.\n2. **Bisedo:** Pyet AI për pyetje specifike.\n3. **Profili:** Përditëso të dhënat e tua.\n\n*Sisu* (Guximi) është gjithçka që ju nevojitet!`
    },
    uk: {
      title: 'Ласкаво просимо до Фінляндії! 🇫🇮',
      content: `# Ваш гід з виживання\n\n**Філософія:**\nФінляндія тримається на довірі, тиші та каві.\n\n### Як користуватися цим додатком\n1. **Читайте:** Переглядайте гіди з бюрократії.\n2. **Чат:** Задавайте AI конкретні питання.\n3. **Профіль:** Оновлюйте свої дані.\n\n*Sisu* (Стійкість) — це все, що вам потрібно!`
    },
    es: {
      title: '¡Bienvenido a Finlandia! 🇫🇮',
      content: `# Tu guía de supervivencia\n\n**La Filosofía:**\nFinlandia funciona con confianza, silencio y café.\n\n### Cómo usar esta app\n1. **Lee:** Navega por las guías de burocracia.\n2. **Chat:** Haz preguntas específicas a la IA.\n3. **Perfil:** Mantén tus datos actualizados.\n\n¡*Sisu* (Agallas) es todo lo que necesitas!`
    },
    tr: {
      title: 'Finlandiya\'ya Hoş Geldiniz! 🇫🇮',
      content: `# Hayatta Kalma Rehberiniz\n\n**Felsefe:**\nFinlandiya güven, sessizlik ve kahve üzerine kuruludur.\n\n### Bu uygulamayı nasıl kullanırsınız\n1. **Oku:** Bürokrasi rehberlerine göz atın.\n2. **Sohbet:** YZ Asistanına özel sorular sorun.\n3. **Profil:** Bilgilerinizi güncel tutun.\n\nİhtiyacınız olan tek şey *Sisu* (Azim)!`
    },
    'pt-br': {
      title: 'Bem-vindo à Finlândia! 🇫🇮',
      content: `# Seu Guia de Sobrevivência\n\n**A Filosofia:**\nA Finlândia funciona na base da confiança, silêncio e café.\n\n### Como usar este app\n1. **Leia:** Navegue pelos guias de burocracia.\n2. **Chat:** Faça perguntas específicas à IA.\n3. **Perfil:** Mantenha seus dados atualizados.\n\n*Sisu* (Garra) é tudo o que você precisa!`
    },
    'pt-pt': {
      title: 'Bem-vindo à Finlândia! 🇫🇮',
      content: `# O Teu Guia de Sobrevivência\n\n**A Filosofia:**\nA Finlândia funciona na base da confiança, silêncio e café.\n\n### Como usar esta app\n1. **Lê:** Navega pelos guias de burocracia.\n2. **Chat:** Faz perguntas específicas à IA.\n3. **Perfil:** Mantém os teus dados atualizados.\n\n*Sisu* (Garra) é tudo o que precisas!`
    }
  },

  // --- BUREAUCRACY ---
  'bureaucracy_dvv': {
    en: {
      title: 'The DVV & Personal ID',
      content: `# The DVV (Digital and Population Data Services Agency) 🆔\n\n**Priority: IMMEDIATE**\n\n### The Mission\nTo legally exist in Finland. Without this, you are a ghost in the system.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). It looks like *010190-123X*.\nYou need this for:\n1. Opening a bank account.\n2. Getting a phone contract.\n3. Getting a tax card.\n4. Visiting a doctor.\n\n### How to get it\n* **Students/Workers:** You might have started the request at Migri.\n* **EU Citizens:** You register your right of residence at Migri, then go to DVV.\n* **Action:** You must visit a DVV service point physically to verify your identity.`
    },
    vi: {
      title: 'Mã số định danh DVV',
      content: `# DVV (Cơ quan Dữ liệu Dân số và Kỹ thuật số) 🆔\n\n**Ưu tiên: NGAY LẬP TỨC**\n\n### Nhiệm vụ\nĐể tồn tại hợp pháp tại Phần Lan. Không có nó, bạn như người vô hình trong hệ thống.\n\n### Phần thưởng\n**Mã số định danh cá nhân** (henkilötunnus) của bạn. Nó có dạng *010190-123X*.\nBạn cần mã này để:\n1. Mở tài khoản ngân hàng.\n2. Đăng ký thuê bao điện thoại.\n3. Nhận thẻ thuế.\n4. Đi khám bác sĩ.\n\n### Cách lấy mã\n* **Sinh viên/Người đi làm:** Bạn có thể đã yêu cầu mã này tại Migri.\n* **Công dân EU:** Bạn đăng ký quyền cư trú tại Migri, sau đó đến DVV.\n* **Hành động:** Bạn phải trực tiếp đến điểm dịch vụ DVV để xác minh danh tính.`
    },
    'pt-br': {
      title: 'DVV & ID Pessoal',
      content: `# O DVV (Agência de Dados Digitais e Populacionais) 🆔\n\n**Prioridade: IMEDIATA**\n\n### A Missão\nExistir legalmente na Finlândia. Sem isso, você é um fantasma no sistema.\n\n### O Prêmio\nSeu **Código de Identidade Pessoal** (henkilötunnus). Parece com *010190-123X*.\nVocê precisa disso para:\n1. Abrir conta bancária.\n2. Ter um plano de celular.\n3. Obter cartão de imposto.\n4. Ir ao médico.\n\n### Como conseguir\n* **Estudantes/Trabalhadores:** Você pode ter iniciado o pedido no Migri.\n* **Cidadãos da UE:** Registre seu direito de residência no Migri, depois vá ao DVV.\n* **Ação:** Você deve visitar um ponto de serviço do DVV pessoalmente.`
    },
    'pt-pt': {
      title: 'DVV & ID Pessoal',
      content: `# O DVV (Agência de Dados Digitais e Populacionais) 🆔\n\n**Prioridade: IMEDIATA**\n\n### A Missão\nExistir legalmente na Finlândia. Sem isto, és um fantasma no sistema.\n\n### O Prémio\nO teu **Código de Identidade Pessoal** (henkilötunnus). Parece-se com *010190-123X*.\nPrecisas disto para:\n1. Abrir conta bancária.\n2. Ter um plano de telemóvel.\n3. Obter cartão de imposto.\n4. Ir ao médico.\n\n### Como conseguir\n* **Estudantes/Trabalhadores:** Podes ter iniciado o pedido no Migri.\n* **Cidadãos da UE:** Regista o teu direito de residência no Migri, depois vai ao DVV.\n* **Ação:** Deves visitar um ponto de serviço do DVV pessoalmente.`
    },
    ru: {
      title: 'DVV и Личный ID',
      content: `# DVV (Агентство цифровых данных) 🆔\n\n**Приоритет: НЕМЕДЛЕННО**\n\n### Миссия\nЛегально существовать в Финляндии. Без этого вы призрак в системе.\n\n### Приз\nВаш **Личный идентификационный код** (henkilötunnus). Выглядит как *010190-123X*.\nОн нужен для:\n1. Открытия банковского счета.\n2. Контракта на телефон.\n3. Налоговой карты.\n4. Визита к врачу.\n\n### Как получить\n* **Студенты/Рабочие:** Вы могли запросить его в Migri.\n* **Граждане ЕС:** Зарегистрируйте право на проживание в Migri, затем идите в DVV.\n* **Действие:** Вы должны лично посетить DVV для подтверждения личности.`
    }
  },
  'bureaucracy_migri': {
      en: {
          title: 'Migri (Immigration)',
          content: `# Migri (Finnish Immigration Service) 🛂\n\n### The Mission\nTo get your Residence Permit (oleskelulupa) card.\n\n### Tips\n* **Book Early:** Appointments can have a 2-3 month wait time.\n* **Enter Finland First?** Some permits allow you to come to Finland and apply here, but check your visa requirements first.\n* **Fast Track:** Specialists and startup entrepreneurs can use the "Fast Track" service (2 weeks processing).`
      }
  },
  'bureaucracy_strong_auth': {
      en: {
          title: 'Strong Identification',
          content: `# Strong Electronic Identification (Vahva tunnistautuminen) 🔐\n\n**The Key to the Kingdom.**\n\n### What is it?\nYour digital ID. You use it to log into Kela, Tax, Posti, and even buy train tickets sometimes.\n\n### The Catch-22\nYou usually need a **Finnish ID Code** (from DVV) and a **Passport** to get it from a bank.\n\n### Bank Requirements\nMost banks require you to visit a branch physically. Bring your passport and residence permit card.`
      }
  },
  'bureaucracy_tax': {
      en: {
          title: 'Tax Card (Verokortti)',
          content: `# The Tax Card (Verokortti) 💳\n\n**Rule:** If you don't give this to your employer, they MUST deduct **60%** tax.\n\n### Getting it\n1. Log into **MyTax (OmaVero)** using Strong Identification.\n2. Estimate your annual income (be conservative).\n3. It gives you a % (e.g., 18.5%).\n4. Send the PDF to your payroll department.\n\n### Adjusting\nYou can change it anytime online if you earn more or less than expected.`
      }
  },
  'bureaucracy_kela': {
      en: {
          title: 'Kela (Social Security)',
          content: `# Kela (The Social Insurance Institution) 🏥\n\n### The Concept\nKela provides basic security for everyone living in Finland permanently.\n\n### Am I covered?\n* **Students:** Usually NOT covered (must have private insurance).\n* **Workers:** Covered if you earn at least ~800€/month or have a contract of 4+ months.\n* **Family:** Covered if moving permanently.\n\n### The Kela Card\nOnce accepted, you get the Kela card. Show this at pharmacies for discounts and private doctors for small reimbursements.`
      }
  },

  // --- JOB SEARCH ---
  'job_market_overview': {
      en: {
          title: 'Market Overview',
          content: `# The Finnish Job Market 📉\n\n### The Hard Truth\nFinland has a high demand for skilled workers, BUT it is very protective of its language.\n\n### The "Hidden" Market\nUp to **70-80%** of jobs are not published on job boards. They are filled through networks.\n\n### Key Sectors for English Speakers\n1. **ICT / Tech:** Gaming, Software, Telecom (Nokia, Supercell).\n2. **Engineering:** Marine, Energy, CleanTech.\n3. **Startups:** Helsinki is a huge startup hub (Slush).\n4. **Service:** Cleaning, logistics, restaurant work (often requires less Finnish).`
      }
  },
  'job_networking': {
    en: {
      title: 'Networking & Hidden Jobs',
      content: `# The Hidden Job Market 🕵️‍♂️\n\n**Reality Check:** 70-80% of jobs in Finland are never advertised publicly.\n\n### Where are they?\nThey are filled through referrals, internal transfers, and direct contact.\n\n### How to access them?\n1. **LinkedIn:** It is huge here. Optimize your profile. Connect with people in your field, not just recruiters.\n2. **Informational Interviews:** Ask someone for 15 mins of advice, not a job. Finns love to give expert advice.\n3. **Professional Unions:** Join the union for your sector (e.g., TEK, OAJ). They have events and lists.`
    },
    fi: {
      title: 'Verkostoituminen',
      content: `# Piilotyöpaikat 🕵️‍♂️\n\n**Fakta:** 70-80% Suomen työpaikoista ei tule julkiseen hakuun.\n\n### Missä ne ovat?\nNe täytetään suositusten ja suorien kontaktien kautta.\n\n### Miten päästä käsiksi?\n1. **LinkedIn:** Erittäin tärkeä Suomessa. Tuunaa profiilisi.\n2. **Tiedonkeruuhaastattelut:** Pyydä 15 minuutin neuvoa, älä suoraan työtä.\n3. **Ammattiliitot:** Liity alasi liittoon (esim. TEK). Heillä on tapahtumia.`
    },
    th: {
      title: 'การสร้างเครือข่าย',
      content: `# ตลาดงานที่ซ่อนอยู่ 🕵️‍♂️\n\n**ความจริง:** 70-80% ของงานในฟินแลนด์ไม่มีการโฆษณาต่อสาธารณะ\n\n### งานเหล่านี้อยู่ที่ไหน?\nงานเหล่านี้ถูกเติมเต็มผ่านการแนะนำและการติดต่อโดยตรง\n\n### จะเข้าถึงได้อย่างไร?\n1. **LinkedIn:** สำคัญมากที่นี่ ปรับปรุงโปรไฟล์ของคุณ\n2. **การสัมภาษณ์เพื่อขอข้อมูล:** ขอคำแนะนำ 15 นาที ไม่ใช่ขอกาน\n3. **สหภาพแรงงาน:** เข้าร่วมสหภาพในสายงานของคุณ พวกเขามีงานกิจกรรมและรายชื่อผู้ติดต่อ`
    }
  },
  'job_cv_standards': {
      en: {
          title: 'CV & Cover Letter',
          content: `# Finnish CV Style 📄\n\n**Keep it simple.**\n\n### Layout\n* **Photo:** Yes, professional headshot is standard.\n* **Length:** Max 2 pages.\n* **Profile:** Short summary at top.\n* **Skills:** List specific tools/technologies.\n\n### The Cover Letter\n* **Critical:** Finns read this.\n* **Tone:** Humble but confident. Do not brag excessively ("I am the best"), but state facts ("I increased sales by 20%").\n* **Fit:** Explain WHY you want THIS specific company.`
      }
  },
  'job_bias': {
      en: {
          title: 'Handling Bias',
          content: `# Addressing the Elephant 🐘\n\n### "Finnish Language Required"\nMany ads say this even if not true. \n* **Strategy:** Call them. Ask "Is Finnish truly mandatory for the daily tasks?". Often, for experts, it is not.\n\n### Name Discrimination\nStudies show non-Finnish names get fewer callbacks.\n* **Strategy:** Focus on direct networking (bypassing HR filters) and highlight your permit status ("I have a permanent residence permit") clearly at the top.`
      }
  },

  // --- WORK CULTURE ---
  'culture_essentials': {
      en: {
          title: 'Trust & Silence',
          content: `# The Core Values 🇫🇮\n\n### 1. Trust (Luottamus)\nIf you say you will do it, do it. No need to update every hour. If you don't do it, say so immediately. Lying or hiding mistakes is the worst sin.\n\n### 2. Silence is OK\nIn a meeting, if nobody talks, it means they are thinking. Do not rush to fill the silence with chatter. It is considered polite to give space.\n\n### 3. Punctuality\n5 minutes early is on time. 5 minutes late is a crisis. Send a message if you are late.`
      }
  },
  'culture_hierarchy': {
      en: {
          title: 'Flat Hierarchy',
          content: `# Low Hierarchy 📉\n\n### The Boss is a Colleague\n* You call the CEO by their first name.\n* You can disagree with your manager (politely).\n* Experts are respected more than titles.\n\n### Decision Making\nConsensus-based. It takes a long time to decide, but once decided, action is fast. Don't push for a decision in the first meeting.`
      }
  },
  'work_coffee': {
    en: {
      title: 'The Sacred Kahvitauko',
      content: `# The Coffee Break Ritual ☕\n\n**Rule #1:** Never skip the coffee break if you want to integrate.\n\n### What is it?\nFinns drink the most coffee in the world. Twice a day (morning and afternoon), work stops.\n\n### Why it matters\nThis is where decisions happen. It is informal, hierarchy-free, and where you bond with colleagues. If you sit at your desk, you isolate yourself.\n\n* **Tip:** You don't have to drink coffee. Tea or water is fine. Just go to the break room.`
    },
    fi: {
      title: 'Pyhä Kahvitauko',
      content: `# Kahvitaukorituaali ☕\n\n**Sääntö #1:** Älä jätä kahvitaukoa väliin, jos haluat sopeutua.\n\n### Mikä se on?\nSuomalaiset juovat eniten kahvia maailmassa. Kahdesti päivässä työt keskeytyvät.\n\n### Miksi se on tärkeää?\nTäällä tehdään päätökset epävirallisesti. Se on vapaata hierarkiasta. Jos jäät työpöytäsi ääreen, eristät itsesi.`
    },
    th: {
      title: 'ช่วงเวลาพักดื่มกาแฟอันศักดิ์สิทธิ์',
      content: `# พิธีกรรม Kahvitauko ☕\n\n**กฎข้อที่ 1:** อย่าพลาดช่วงพักดื่มกาแฟหากคุณต้องการปรับตัว\n\n### มันคืออะไร?\nชาวฟินน์ดื่มกาแฟมากที่สุดในโลก วันละสองครั้ง งานจะหยุดลงเพื่อสิ่งนี้\n\n### ทำไมจึงสำคัญ\nนี่คือช่วงเวลาที่เกิดการตัดสินใจแบบไม่เป็นทางการ หากคุณนั่งอยู่ที่โต๊ะทำงาน คุณจะพลาดโอกาสในการสร้างความสัมพันธ์`
    }
  },
  'work_social': {
    en: {
        title: 'Pikkujoulut & Socializing',
        content: `# Parties & Boundaries 🎉\n\n**Concept:** Finns are private, until they are not.\n\n### Pikkujoulut (Little Christmas)\nThe office Christmas party. It is often wild. It is the one time of year colleagues drink heavily together. \n\n### Rules\n1. **What happens in Pikkujoulut stays there.**\n2. **Sauna:** There might be a sauna. It is usually non-sexual but can be mixed or separate turns. Ask HR for the policy.\n3. **First Names:** Everyone is on a first-name basis, even the CEO.`
    },
    fi: {
        title: 'Pikkujoulut & Sosiaalisuus',
        content: `# Juhlat & Rajat 🎉\n\n**Konsepti:** Suomalaiset ovat yksityisiä, kunnes eivät ole.\n\n### Pikkujoulut\nToimiston joulujuhla. Se on usein villi tilaisuus, jolloin kollegat juhlivat yhdessä.\n\n### Säännöt\n1. **Mitä pikkujouluissa tapahtuu, jää sinne.**\n2. **Sauna:** Saunominen voi kuulua asiaan. Kysy käytännöistä etukäteen.\n3. **Sinuttelu:** Kaikkia puhutellaan etunimellä, jopa toimitusjohtajaa.`
    },
    th: {
        title: 'ปาร์ตี้และการเข้าสังคม',
        content: `# งานเลี้ยง & ขอบเขต 🎉\n\n**แนวคิด:** ชาวฟินน์รักความเป็นส่วนตัว จนกระทั่งถึงเวลาปาร์ตี้\n\n### Pikkujoulut (คริสต์มาสน้อย)\nปาร์ตี้คริสต์มาสของออฟฟิศ มักจะมีความสนุกสนานเต็มที่\n\n### กฎกติกา\n1. **สิ่งที่เกิดขึ้นในปาร์ตี้ จะถูกทิ้งไว้ที่นั่น**\n2. **ซาวน่า:** อาจมีการเข้าซาวน่า สอบถามนโยบายจาก HR\n3. **การเรียกชื่อ:** ทุกคนเรียกชื่อจริงกัน แม้แต่ CEO`
    }
  },
  'work_unions': {
      en: {
          title: 'Unions & Rights',
          content: `# Trade Unions (Ammattiliitto) 🤝\n\n### Should I join?\n**Yes.** Almost everyone is a member.\n\n### Benefits\n1. **Unemployment Fund:** If you lose your job, the union pays you significantly more than Kela for ~400 days.\n2. **Legal Help:** They check your contract.\n3. **Salary Advice:** They tell you what you *should* be earning.`
      }
  },

  // --- PROFESSION GUIDES ---
  'prof_general': {
      en: {
          title: 'General Job Advice',
          content: `# Finding Work as a Generalist\n\nIf you don't have a specialized degree, focus on:\n1. **Staffing Agencies:** Bolt, Barona, StaffPoint. They hire quickly for construction, cleaning, and logistics.\n2. **Hygiene Pass:** Get this card immediately if you want to work with food.\n3. **Occupational Safety Card:** Essential for construction/logistics.`
      }
  },
  'prof_tech': {
      en: {
          title: 'Tech & IT',
          content: `# IT Sector 💻\n\n**English Friendly?** Yes, very.\n\n### Hot Hubs\n* Helsinki (Kamppi/Ruoholahti)\n* Espoo (Otaniemi/Keilaniemi)\n* Oulu (Radio tech)\n\n### Key Sites\n* The Hub.io\n* LinkedIn\n* MeetAndCode`
      }
  },
  'prof_health': {
      en: {
          title: 'Healthcare & Nursing',
          content: `# Healthcare (Hoitotyö) 🩺\n\n**Language Requirement:** Strict. usually B1-B2 Finnish.\n\n### The Path\n1. **Valvira:** You must get your degree recognized by Valvira.\n2. **Tehy:** The main union.\n3. **Apprenticeships:** Look for 'oppisopimus' to learn while working.`
      }
  },
  'prof_service': {
      en: {
          title: 'Service & Cleaning',
          content: `# Service Sector 🧹\n\n**Entry Level:** Good for starting.\n\n### Key Players\n* SOL, Lassila & Tikanoja, ISS.\n\n### Wages\nStrictly regulated by collective agreements (TES). You get extra pay for evening (ilta) and sunday (pyhä) work. Sunday is double salary (+100%).`
      }
  },
  'prof_construction': {
      en: {
          title: 'Construction',
          content: `# Construction (Rakennus) 🏗️\n\n**Cards Needed:**\n1. **Green Card:** Occupational Safety Card (Työturvallisuuskortti).\n2. **Blue Card:** ID card with tax number (Veronumero).\n\n### Culture\nDirect, masculine, early mornings (7 AM start).`
      }
  },
  'prof_academia': {
      en: {
          title: 'Academia & Research',
          content: `# Academia 🎓\n\n**Funding:** Applying for grants is a full-time job.\n\n### Key Funders\n* Academy of Finland\n* Kone Foundation\n\n### Culture\nVery international, but tenure tracks are competitive.`
      }
  },

  // --- FAMILY ---
  'family_neuvola': {
      en: {
          title: 'Neuvola (Child Health)',
          content: `# Neuvola (Maternity Clinic) 👶\n\n**The Jewel of Finland.**\n\n### What is it?\nFree monitoring for pregnancy and child health up to school age.\n\n### The Baby Box\nEvery expectant mother gets a **Kela Maternity Package** (famous cardboard box with clothes) OR 170€. Take the box for your first child!`
      }
  },
  'family_daycare': {
      en: {
          title: 'Daycare (Päiväkoti)',
          content: `# Daycare (Varhaiskasvatus) 🧸\n\n### The Right\nEvery child has a SUBJECTIVE RIGHT to daycare, even if parents are unemployed.\n\n### Cost\nBased on income. Max ~300€/month. Low income families pay 0€.\n\n### Application\nApply 4 months in advance. For urgent work/study, apply immediately (2 weeks notice).`
      }
  },
  'family_teens': {
      en: {
          title: 'Teens & School',
          content: `# Teenagers 🎒\n\n### Wilma\nThe app used to communicate with schools. You will live on Wilma.\n\n### Independence\nFinnish teens are very independent. They take the bus alone. They have their own hobbies.`
      }
  },

  // --- DAILY LIFE ---
  'housing_general': {
      en: {
          title: 'Finding an Apartment',
          content: `# Housing (Asuminen) 🏠\n\n### Sites\n* Vuokraovi.com\n* Oikotie.fi\n* Lumo / Sato (Corporate landlords, easier for foreigners)\n\n### Deposit\nUsually 1-2 months rent. Kept in a separate account.\n\n### Home Insurance\n**Mandatory.** You usually cannot get keys without showing proof of home insurance (kotivakuutus).`
      }
  },
  'health_services': {
      en: {
          title: 'Health Services',
          content: `# Public vs Private 🏥\n\n### Public (Terveysasema)\n* Almost free.\n* Queues can be long.\n* You must call your designated center.\n\n### Occupational (Työterveys)\n* Paid by employer.\n* Fast access to doctors.\n* Use this for sickness absences!`
      }
  },
  'transport_public': {
      en: {
          title: 'Public Transport',
          content: `# HSL & VR 🚆\n\n### HSL (Helsinki Area)\n* Zones A, B, C, D.\n* **App:** Download the HSL app. Cheaper than buying from driver (which is often impossible).\n* **Fine:** 80€ if caught without ticket.\n\n### VR (Trains)\n* Book early for cheap tickets ("Saver ticket").`
      }
  },

  // --- CULTURE ---
  'culture_religion': {
      en: {
          title: 'Religion',
          content: `# Religion in Finland ⛪\n\n### Secular but Lutheran\nMost Finns belong to the Lutheran church but rarely attend. \n\n### Church Tax\nIf you are a member, you pay 1-2% extra tax. You can resign online if you wish.`
      }
  },
  'culture_holidays': {
      en: {
          title: 'Holidays (Juhannus & Vappu)',
          content: `# Key Holidays 🎉\n\n### Vappu (May 1st)\nStudent & Worker festival. Picnics, white caps, sparkling wine. The one day Finns go crazy.\n\n### Juhannus (Midsummer)\nCities empty. Everyone goes to a cottage (mökki). Bonfires, sauna, mosquitoes.`
      }
  },
  'culture_norms': {
      en: {
          title: 'Social Norms',
          content: `# Unwritten Rules 🤫\n\n* **Personal Space:** Keep 1-2 meters distance at bus stops.\n* **Shoes:** Take them OFF when entering a home.\n* **Small Talk:** Not required. Silence is comfortable.`
      }
  },

  // --- LEARNING FINNISH ---
  'lang_roadmap': {
      en: {
          title: 'Roadmap to Finnish',
          content: `# Learning Strategy 🇫🇮\n\n### Phase 1: Survival\nLearn: "Kiitos", "Anteeksi", numbers, foods.\n\n### Phase 2: Integration Course\nIf unemployed, TE Office provides intensive courses.\n\n### Phase 3: YKI Test\nNeeded for citizenship. Level 3 (B1) is the target.\n\n### Tips\n* Watch "Yle Uutiset Selkosuomeksi" (News in simple Finnish).\n* Don't switch to English immediately!`
      }
  }
};

// ---------------------------------------------------------------------------
// CATEGORY DEFINITIONS (METADATA)
// ---------------------------------------------------------------------------

// Helper to safely get content with fallback
const getContent = (id: string, lang: LanguageCode): ContentSet => {
  const article = ARTICLE_CONTENT[id] || ARTICLE_CONTENT[id.replace('_', '')]; // Resilience
  
  if (!article) {
      // If article entirely missing from map, return placeholder
      return { title: 'Content Pending', content: 'This guide is being written.' };
  }
  
  // 1. Try exact language
  if (article[lang]) return article[lang];
  
  // 2. Try English
  if (article['en']) return article['en'];
  
  // 3. Fallback to any available
  return Object.values(article)[0];
};

// Helper to get localized Category Titles
const getCatTitle = (id: string, lang: LanguageCode): string => {
    const titles: Record<string, Record<string, string>> = {
        foundation: {
            en: 'Bureaucracy & Legal', et: 'Bürokraatia', ar: 'البيروقراطية والقانون', so: 'Xafiisyada & Sharciga',
            fa: 'اداری و قانونی', ku: 'Burokrasî & Yasayî', zh: '官僚与法律', sq: 'Burokracia & Ligji',
            uk: 'Бюрократія та Закон', es: 'Burocracia y Legal', tr: 'Bürokrasi ve Hukuk',
            vi: 'Hành chính & Pháp lý', ru: 'Бюрократия и Закон', 'pt-br': 'Burocracia', 'pt-pt': 'Burocracia',
            fi: 'Byrokratia & Laki', th: 'ระบบราชการและกฎหมาย'
        },
        professions: {
            en: 'Profession Guides', et: 'Ametijuhendid', ar: 'دليل المهن', so: 'Hagaha Xirfadaha',
            fa: 'راهنمای مشاغل', ku: 'Rêberên Pîşeyî', zh: '职业指南', sq: 'Udhëzues Profesionesh',
            uk: 'Гід по професіях', es: 'Guías Profesionales', tr: 'Meslek Rehberleri',
            vi: 'Hướng dẫn nghề nghiệp', ru: 'Гид по профессиям', 'pt-br': 'Profissões', 'pt-pt': 'Profissões',
            fi: 'Ammattioppaat', th: 'คู่มืออาชีพ'
        },
        family: {
            en: 'Family & Education', et: 'Pere ja Haridus', ar: 'الأسرة والتعليم', so: 'Qoyska & Waxbarashada',
            fa: 'خانواده و آموزش', ku: 'Malbat & Perwerde', zh: '家庭与教育', sq: 'Familja & Arsimi',
            uk: 'Сім\'я та Освіта', es: 'Familia y Educación', tr: 'Aile ve Eğitim',
            vi: 'Gia đình & Giáo dục', ru: 'Семья и Образование', 'pt-br': 'Família', 'pt-pt': 'Família',
            fi: 'Perhe & Koulutus', th: 'ครอบครัวและการศึกษา'
        },
        daily_life: {
            en: 'Daily Life & Housing', et: 'Igapäevaelu', ar: 'الحياة اليومية والسكن', so: 'Nolosha & Guriyeynta',
            fa: 'زندگی روزمره و مسکن', ku: 'Jiyana Rojane & Xanî', zh: '日常生活与住房', sq: 'Jeta e Përditshme',
            uk: 'Повсякденне життя', es: 'Vida Diaria', tr: 'Günlük Yaşam',
            vi: 'Đời sống & Nhà cửa', ru: 'Повседневная жизнь', 'pt-br': 'Vida Diária', 'pt-pt': 'Vida Diária',
            fi: 'Arki & Asuminen', th: 'ชีวิตประจำวันและที่อยู่อาศัย'
        },
        culture_society: {
            en: 'Culture & Society', et: 'Kultuur ja Ühiskond', ar: 'الثقافة والمجتمع', so: 'Dhaqanka & Bulshada',
            fa: 'فرهنگ و جامعه', ku: 'Çand & Civak', zh: '文化与社会', sq: 'Kultura & Shoqëria',
            uk: 'Культура та Суспільство', es: 'Cultura y Sociedad', tr: 'Kültür ve Toplum',
            vi: 'Văn hóa & Xã hội', ru: 'Культура и Общество', 'pt-br': 'Cultura', 'pt-pt': 'Cultura',
            fi: 'Kulttuuri & Yhteiskunta', th: 'วัฒนธรรมและสังคม'
        },
        job_search: {
            en: 'Job Search', et: 'Tööotsing', ar: 'البحث عن عمل', so: 'Raadinta Shaqada',
            fa: 'جستجوی کار', ku: 'Lêgerîna Kar', zh: '求职', sq: 'Kërkimi i Punës',
            uk: 'Пошук роботи', es: 'Búsqueda de Empleo', tr: 'İş Arama',
            vi: 'Tìm việc', ru: 'Поиск работы', 'pt-br': 'Empregos', 'pt-pt': 'Empregos',
            fi: 'Työnhaku', th: 'การหางาน'
        },
        work_culture: {
            en: 'Work Culture', et: 'Töökultuur', ar: 'ثقافة العمل', so: 'Dhaqanka Shaqada',
            fa: 'فرهنگ کار', ku: 'Çanda Xebatê', zh: '工作文化', sq: 'Kultura e Punës',
            uk: 'Робоча культура', es: 'Cultura Laboral', tr: 'Çalışma Kültürü',
            vi: 'Văn hóa làm việc', ru: 'Рабочая культура', 'pt-br': 'Cultura de Trabalho', 'pt-pt': 'Cultura de Trabalho',
            fi: 'Työkulttuuri', th: 'วัฒนธรรมการทำงาน'
        },
        learning_finnish: {
            en: 'Learning Finnish', et: 'Soome keele õpe', ar: 'تعلم الفنلندية', so: 'Barashada Finnishka',
            fa: 'یادگیری فنلاندی', ku: 'Fêrbûna Fînî', zh: '学习芬兰语', sq: 'Mëso Finlandishten',
            uk: 'Вивчення мови', es: 'Aprender Finés', tr: 'Fince Öğrenimi',
            vi: 'Học tiếng Phần Lan', ru: 'Изучение финского', 'pt-br': 'Aprender Finlandês', 'pt-pt': 'Aprender Finlandês',
            fi: 'Suomen kielen oppiminen', th: 'การเรียนภาษาฟินแลนด์'
        }
    };
    
    const catTitles = titles[id];
    return catTitles?.[lang] || catTitles?.['en'] || id;
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
      articles: [
        {
          id: 'guide_start',
          icon: 'Flag',
          tags: ['general', 'arrival', 'mandatory'],
          ...getContent('guide_start', lang)
        },
        {
          id: 'bureaucracy_dvv',
          icon: 'Fingerprint',
          tags: ['general', 'arrival', 'mandatory'],
          ...getContent('bureaucracy_dvv', lang)
        },
        {
          id: 'bureaucracy_migri',
          icon: 'CreditCard',
          tags: ['general', 'arrival', 'mandatory'],
          ...getContent('bureaucracy_migri', lang)
        },
        {
          id: 'bureaucracy_strong_auth',
          icon: 'Key',
          tags: ['general', 'arrival', 'mandatory'],
          ...getContent('bureaucracy_strong_auth', lang)
        },
        {
          id: 'bureaucracy_tax',
          icon: 'Percent',
          tags: ['general', 'work', 'mandatory'],
          ...getContent('bureaucracy_tax', lang)
        },
        {
          id: 'bureaucracy_kela',
          icon: 'Umbrella',
          tags: ['general', 'family'],
          ...getContent('bureaucracy_kela', lang)
        }
      ]
    },
    {
      id: 'professions',
      title: getCatTitle('professions', lang),
      icon: 'HardHat',
      theme: { 
        border: 'border-zinc-600 dark:border-zinc-500', 
        text: 'text-zinc-600 dark:text-zinc-400', 
        shadow: 'hover:shadow-zinc-100 dark:hover:shadow-zinc-900/50',
        hoverBg: 'group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/50'
      },
      articles: [
        {
          id: 'prof_general',
          icon: 'Briefcase',
          tags: ['worker', 'general', 'mandatory'],
          ...getContent('prof_general', lang)
        },
        {
          id: 'prof_tech',
          icon: 'Code',
          tags: ['worker', 'tech', 'it'],
          ...getContent('prof_tech', lang)
        },
        {
          id: 'prof_health',
          icon: 'Stethoscope',
          tags: ['worker', 'health', 'nursing'],
          ...getContent('prof_health', lang)
        },
        {
          id: 'prof_service',
          icon: 'Utensils',
          tags: ['worker', 'service', 'cleaning'],
          ...getContent('prof_service', lang)
        },
        {
          id: 'prof_construction',
          icon: 'Hammer',
          tags: ['worker', 'construction', 'logistics'],
          ...getContent('prof_construction', lang)
        },
        {
          id: 'prof_academia',
          icon: 'GraduationCap',
          tags: ['worker', 'education', 'research'],
          ...getContent('prof_academia', lang)
        }
      ]
    },
    {
      id: 'family',
      title: getCatTitle('family', lang),
      icon: 'Baby',
      theme: { 
        border: 'border-pink-600 dark:border-pink-500', 
        text: 'text-pink-600 dark:text-pink-400', 
        shadow: 'hover:shadow-pink-100 dark:hover:shadow-pink-900/50',
        hoverBg: 'group-hover:bg-pink-50 dark:group-hover:bg-pink-900/50'
      },
      articles: [
        {
          id: 'family_neuvola',
          icon: 'Heart',
          tags: ['family', 'health', 'arrival'],
          ...getContent('family_neuvola', lang)
        },
        {
          id: 'family_daycare',
          icon: 'Sprout',
          tags: ['family', 'education'],
          ...getContent('family_daycare', lang)
        },
        {
          id: 'family_teens',
          icon: 'Headphones',
          tags: ['family', 'youth'],
          ...getContent('family_teens', lang)
        }
      ]
    },
    {
      id: 'daily_life',
      title: getCatTitle('daily_life', lang),
      icon: 'Home',
      theme: { 
        border: 'border-orange-600 dark:border-orange-500', 
        text: 'text-orange-600 dark:text-orange-400', 
        shadow: 'hover:shadow-orange-100 dark:hover:shadow-orange-900/50',
        hoverBg: 'group-hover:bg-orange-50 dark:group-hover:bg-orange-900/50'
      },
      articles: [
        {
          id: 'housing_general',
          icon: 'Home',
          tags: ['general', 'arrival'],
          ...getContent('housing_general', lang)
        },
        {
          id: 'health_services',
          icon: 'Stethoscope',
          tags: ['general', 'health'],
          ...getContent('health_services', lang)
        },
        {
          id: 'transport_public',
          icon: 'Train',
          tags: ['general', 'daily'],
          ...getContent('transport_public', lang)
        }
      ]
    },
    {
      id: 'culture_society',
      title: getCatTitle('culture_society', lang),
      icon: 'Globe',
      theme: { 
        border: 'border-purple-600 dark:border-purple-500', 
        text: 'text-purple-600 dark:text-purple-400', 
        shadow: 'hover:shadow-purple-100 dark:hover:shadow-purple-900/50',
        hoverBg: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900/50'
      },
      articles: [
        {
          id: 'culture_religion',
          icon: 'Church',
          tags: ['culture', 'daily'],
          ...getContent('culture_religion', lang)
        },
        {
          id: 'culture_holidays',
          icon: 'Calendar',
          tags: ['culture', 'daily'],
          ...getContent('culture_holidays', lang)
        },
        {
          id: 'culture_norms',
          icon: 'Coffee',
          tags: ['culture', 'daily'],
          ...getContent('culture_norms', lang)
        }
      ]
    },
    {
      id: 'job_search',
      title: getCatTitle('job_search', lang),
      icon: 'Briefcase',
      theme: { 
        border: 'border-blue-600 dark:border-blue-500', 
        text: 'text-blue-600 dark:text-blue-400', 
        shadow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/50',
        hoverBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50'
      },
      articles: [
        {
          id: 'job_market_overview',
          icon: 'LayoutGrid',
          tags: ['worker', 'general'],
          ...getContent('job_market_overview', lang)
        },
        {
          id: 'job_networking',
          icon: 'Users',
          tags: ['worker', 'networking', 'mandatory'],
          ...getContent('job_networking', lang)
        },
        {
          id: 'job_cv_standards',
          icon: 'FileText',
          tags: ['worker', 'student', 'mandatory'],
          ...getContent('job_cv_standards', lang)
        },
        {
          id: 'job_bias',
          icon: 'Scale',
          tags: ['worker', 'discrimination'],
          ...getContent('job_bias', lang)
        }
      ]
    },
    {
      id: 'work_culture',
      title: getCatTitle('work_culture', lang),
      icon: 'Coffee',
      theme: { 
        border: 'border-emerald-600 dark:border-emerald-500', 
        text: 'text-emerald-600 dark:text-emerald-400', 
        shadow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/50',
        hoverBg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/50'
      },
      articles: [
        {
          id: 'culture_essentials',
          icon: 'Shield',
          tags: ['culture', 'worker'],
          ...getContent('culture_essentials', lang)
        },
        {
          id: 'culture_hierarchy',
          icon: 'Users',
          tags: ['culture', 'worker'],
          ...getContent('culture_hierarchy', lang)
        },
        {
          id: 'work_coffee',
          icon: 'Coffee',
          tags: ['culture', 'worker', 'daily'],
          ...getContent('work_coffee', lang)
        },
        {
          id: 'work_social',
          icon: 'GlassWater', // Fallback to icon
          tags: ['culture', 'worker', 'social'],
          ...getContent('work_social', lang)
        },
        {
          id: 'work_unions',
          icon: 'Handshake',
          tags: ['worker', 'rights'],
          ...getContent('work_unions', lang)
        }
      ]
    },
    {
      id: 'learning_finnish',
      title: getCatTitle('learning_finnish', lang),
      icon: 'Languages',
      theme: { 
        border: 'border-cyan-600 dark:border-cyan-500', 
        text: 'text-cyan-600 dark:text-cyan-400', 
        shadow: 'hover:shadow-cyan-100 dark:hover:shadow-cyan-900/50',
        hoverBg: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/50'
      },
      articles: [
        {
          id: 'lang_roadmap',
          icon: 'Map',
          tags: ['language', 'education'],
          ...getContent('lang_roadmap', lang)
        }
      ]
    }
  ];
};

export const getAllFlattenedArticles = (lang: LanguageCode): EnrichedWikiArticle[] => {
  const categories = getWikiCategories(lang);
  
  return categories.flatMap((cat, catIdx) => 
    cat.articles.map((art, artIdx) => ({
      ...art,
      categoryTitle: cat.title,
      categoryId: cat.id,
      displayId: `${catIdx + 1}.${artIdx + 1}` 
    }))
  );
};
