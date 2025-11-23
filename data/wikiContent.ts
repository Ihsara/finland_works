import { Icons } from "../components/Icon";
import { LanguageCode } from "../types";

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export interface WikiArticle {
  id: string;          // Semantic ID (e.g., 'dvv_registration'). Stable for storage.
  title: string;       // Display Title
  icon: keyof typeof Icons; // Icon name matching Lucide-react exports
  tags: string[];      // Tags for AI filtering and User Profile matching
  content: string;     // Markdown content
}

export interface WikiCategory {
  id: string;          // Semantic Category ID (e.g., 'bureaucracy')
  title: string;       // Group Title
  icon: keyof typeof Icons;
  theme: {             // New visual theme properties
    border: string;    // e.g. 'border-rose-500'
    text: string;      // e.g. 'text-rose-600'
    shadow: string;    // e.g. 'shadow-rose-100'
    hoverBg: string;   // e.g. 'group-hover:bg-rose-50'
  };
  articles: WikiArticle[];
}

// ---------------------------------------------------------------------------
// TRANSLATION DICTIONARY FOR WIKI TITLES
// ---------------------------------------------------------------------------
const TRANSLATED_TITLES: Record<string, Record<LanguageCode, string>> = {
  // Categories
  'Bureaucracy & Legal Foundation': {
    en: 'Bureaucracy & Legal Foundation',
    vi: 'Thủ tục hành chính & Pháp lý',
    'pt-br': 'Burocracia & Base Legal',
    'pt-pt': 'Burocracia & Base Legal',
    ru: 'Бюрократия и Закон'
  },
  'Job Search & Applications': {
    en: 'Job Search & Applications',
    vi: 'Tìm việc & Ứng tuyển',
    'pt-br': 'Busca de Emprego',
    'pt-pt': 'Procura de Emprego',
    ru: 'Поиск работы и заявки'
  },
  'Recruitment Process': {
    en: 'Recruitment Process',
    vi: 'Quy trình tuyển dụng',
    'pt-br': 'Processo Seletivo',
    'pt-pt': 'Processo de Recrutamento',
    ru: 'Процесс найма'
  },
  'Networking & Hidden Jobs': {
    en: 'Networking & Hidden Jobs',
    vi: 'Mạng lưới & Việc làm ẩn',
    'pt-br': 'Networking & Vagas Ocultas',
    'pt-pt': 'Networking & Vagas Ocultas',
    ru: 'Нетворкинг и скрытые вакансии'
  },
  'Work Culture': {
    en: 'Work Culture',
    vi: 'Văn hóa làm việc',
    'pt-br': 'Cultura de Trabalho',
    'pt-pt': 'Cultura de Trabalho',
    ru: 'Рабочая культура'
  },
  'Work Rights & Unions': {
    en: 'Work Rights & Unions',
    vi: 'Quyền lao động & Công đoàn',
    'pt-br': 'Direitos & Sindicatos',
    'pt-pt': 'Direitos & Sindicatos',
    ru: 'Трудовые права и профсоюзы'
  },
  'Learning Finnish': {
    en: 'Learning Finnish',
    vi: 'Học tiếng Phần Lan',
    'pt-br': 'Aprendendo Finlandês',
    'pt-pt': 'Aprender Finlandês',
    ru: 'Изучение финского'
  },
  'Work-Life Balance': {
    en: 'Work-Life Balance',
    vi: 'Cân bằng cuộc sống',
    'pt-br': 'Equilíbrio Vida-Trabalho',
    'pt-pt': 'Equilíbrio Vida-Trabalho',
    ru: 'Баланс работы и жизни'
  },
  'Entrepreneurship': {
    en: 'Entrepreneurship',
    vi: 'Khởi nghiệp',
    'pt-br': 'Empreendedorismo',
    'pt-pt': 'Empreendedorismo',
    ru: 'Предпринимательство'
  },
  'Volunteering & Internships': {
    en: 'Volunteering & Internships',
    vi: 'Tình nguyện & Thực tập',
    'pt-br': 'Voluntariado & Estágios',
    'pt-pt': 'Voluntariado & Estágios',
    ru: 'Волонтерство и стажировки'
  },
  'Your Employment Plan': {
    en: 'Your Employment Plan',
    vi: 'Kế hoạch việc làm',
    'pt-br': 'Seu Plano de Emprego',
    'pt-pt': 'O Teu Plano de Emprego',
    ru: 'План трудоустройства'
  },
  
  // Articles
  'The DVV & Personal ID': { en: 'The DVV & Personal ID', vi: 'Mã số định danh DVV', 'pt-br': 'DVV & ID Pessoal', 'pt-pt': 'DVV & ID Pessoal', ru: 'DVV и Личный ID' },
  'Migri & Residence Permits': { en: 'Migri & Residence Permits', vi: 'Migri & Giấy phép cư trú', 'pt-br': 'Migri & Vistos', 'pt-pt': 'Migri & Autorizações', ru: 'Migri и ВНЖ' },
  'Asylum & Protection Basics': { en: 'Asylum & Protection Basics', vi: 'Cơ bản về Tị nạn', 'pt-br': 'Asilo & Proteção', 'pt-pt': 'Asilo & Proteção', ru: 'Основы убежища' },
  'Banking & Strong Auth': { en: 'Banking & Strong Auth', vi: 'Ngân hàng & Định danh', 'pt-br': 'Banco & Auth Forte', 'pt-pt': 'Banca & Autenticação', ru: 'Банки и авторизация' },
  'Job Market Overview': { en: 'Job Market Overview', vi: 'Tổng quan thị trường', 'pt-br': 'Visão do Mercado', 'pt-pt': 'Visão do Mercado', ru: 'Обзор рынка труда' },
  'The Finnish CV Style': { en: 'The Finnish CV Style', vi: 'Phong cách CV Phần Lan', 'pt-br': 'CV Estilo Finlandês', 'pt-pt': 'CV Estilo Finlandês', ru: 'Финский стиль резюме' },
  'The Cover Letter': { en: 'The Cover Letter', vi: 'Thư xin việc', 'pt-br': 'Carta de Apresentação', 'pt-pt': 'Carta de Apresentação', ru: 'Сопроводительное письмо' },
  'Finnish Interview Style': { en: 'Finnish Interview Style', vi: 'Phong cách phỏng vấn', 'pt-br': 'Estilo de Entrevista', 'pt-pt': 'Estilo de Entrevista', ru: 'Стиль собеседования' },
  'Psychological Tests': { en: 'Psychological Tests', vi: 'Bài kiểm tra tâm lý', 'pt-br': 'Testes Psicológicos', 'pt-pt': 'Testes Psicológicos', ru: 'Психологические тесты' },
  'How Hiring Really Works': { en: 'How Hiring Really Works', vi: 'Cách tuyển dụng thực tế', 'pt-br': 'Como Funciona Contratação', 'pt-pt': 'Como Funciona o Recrutamento', ru: 'Как нанимают на самом деле' },
  'LinkedIn Strategy': { en: 'LinkedIn Strategy', vi: 'Chiến lược LinkedIn', 'pt-br': 'Estratégia LinkedIn', 'pt-pt': 'Estratégia LinkedIn', ru: 'Стратегия LinkedIn' },
  'Trust & Autonomy': { en: 'Trust & Autonomy', vi: 'Niềm tin & Tự chủ', 'pt-br': 'Confiança & Autonomia', 'pt-pt': 'Confiança & Autonomia', ru: 'Доверие и автономия' },
  'Flat Hierarchy': { en: 'Flat Hierarchy', vi: 'Cấu trúc phẳng', 'pt-br': 'Hierarquia Plana', 'pt-pt': 'Hierarquia Plana', ru: 'Плоская иерархия' },
  'Barriers: Racism & Reality': { en: 'Barriers: Racism & Reality', vi: 'Rào cản & Thực tế', 'pt-br': 'Barreiras & Realidade', 'pt-pt': 'Barreiras & Realidade', ru: 'Барьеры и реальность' },
  'Employee Rights': { en: 'Employee Rights', vi: 'Quyền nhân viên', 'pt-br': 'Direitos do Empregado', 'pt-pt': 'Direitos do Trabalhador', ru: 'Права работника' },
  'Unions & Unemployment': { en: 'Unions & Unemployment', vi: 'Công đoàn & Thất nghiệp', 'pt-br': 'Sindicatos & Desemprego', 'pt-pt': 'Sindicatos & Desemprego', ru: 'Профсоюзы и безработица' },
  'Occupational Health': { en: 'Occupational Health', vi: 'Sức khỏe lao động', 'pt-br': 'Saúde Ocupacional', 'pt-pt': 'Saúde Ocupacional', ru: 'Охрана труда' },
  'Workplace Finnish': { en: 'Workplace Finnish', vi: 'Tiếng Phần nơi công sở', 'pt-br': 'Finlandês no Trabalho', 'pt-pt': 'Finlandês no Trabalho', ru: 'Финский на работе' },
  'Roadmap A1-B1': { en: 'Roadmap A1-B1', vi: 'Lộ trình A1-B1', 'pt-br': 'Roteiro A1-B1', 'pt-pt': 'Roteiro A1-B1', ru: 'Дорожная карта A1-B1' },
  'Lifestyle & Nature': { en: 'Lifestyle & Nature', vi: 'Lối sống & Thiên nhiên', 'pt-br': 'Estilo de Vida & Natureza', 'pt-pt': 'Estilo de Vida & Natureza', ru: 'Стиль жизни и природа' },
  'Family & Work': { en: 'Family & Work', vi: 'Gia đình & Công việc', 'pt-br': 'Família & Trabalho', 'pt-pt': 'Família & Trabalho', ru: 'Семья и работа' },
  'Starting a Business (Toiminimi)': { en: 'Starting a Business (Toiminimi)', vi: 'Khởi nghiệp (Toiminimi)', 'pt-br': 'Abrindo Empresa', 'pt-pt': 'Criar Empresa', ru: 'Открытие бизнеса' },
  'Light Entrepreneurship': { en: 'Light Entrepreneurship', vi: 'Khởi nghiệp nhẹ', 'pt-br': 'Empreendedorismo Leve', 'pt-pt': 'Empreendedorismo Leve', ru: 'Легкое предпринимательство' },
  'Volunteering': { en: 'Volunteering', vi: 'Tình nguyện', 'pt-br': 'Voluntariado', 'pt-pt': 'Voluntariado', ru: 'Волонтерство' },
  'Internships & Työkokeilu': { en: 'Internships & Työkokeilu', vi: 'Thực tập & Thử việc', 'pt-br': 'Estágios & Työkokeilu', 'pt-pt': 'Estágios & Työkokeilu', ru: 'Стажировки' },
  'The TE-Office Plan': { en: 'The TE-Office Plan', vi: 'Kế hoạch văn phòng TE', 'pt-br': 'Plano do TE-Office', 'pt-pt': 'Plano do TE-Office', ru: 'План TE-офиса' },
  'Personal Strategy': { en: 'Personal Strategy', vi: 'Chiến lược cá nhân', 'pt-br': 'Estratégia Pessoal', 'pt-pt': 'Estratégia Pessoal', ru: 'Личная стратегия' }
};

const translate = (text: string, lang: LanguageCode): string => {
  const entry = TRANSLATED_TITLES[text];
  if (entry && entry[lang]) return entry[lang];
  return text;
};

// ---------------------------------------------------------------------------
// CONTENT FACTORY
// ---------------------------------------------------------------------------

// We define the ENGLISH content as the master source. 
const WIKI_EN: WikiCategory[] = [
  {
    id: 'foundation',
    title: 'Bureaucracy & Legal Foundation',
    icon: 'Building2',
    theme: { 
      border: 'border-slate-600', 
      text: 'text-slate-700', 
      shadow: 'hover:shadow-slate-100',
      hoverBg: 'group-hover:bg-slate-50'
    },
    articles: [
      {
        id: 'bureaucracy_dvv',
        title: 'The DVV & Personal ID',
        icon: 'Fingerprint',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# The DVV (Digital and Population Data Services Agency) 🆔

**Priority: IMMEDIATE**

### The Mission
To legally exist in Finland. Without this, you are a ghost in the system.

### The Prize
Your **Personal Identity Code** (henkilötunnus). It looks like *010190-123X*.
You need this for:
1.  Opening a bank account.
2.  Getting a phone contract.
3.  Getting a tax card.
4.  Visiting a doctor.

### How to get it
*   **Students/Workers:** You might have started the request at Migri.
*   **EU Citizens:** You register your right of residence at Migri, then go to DVV.
*   **Action:** You must visit a DVV service point physically to verify your identity. Book an appointment online WEEKS in advance if possible.
`
      },
      {
        id: 'bureaucracy_migri',
        title: 'Migri & Residence Permits',
        icon: 'CreditCard',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# Migri (Finnish Immigration Service) 🛂

### The Mission
To stay in Finland legally.

### The Prize
Your **Residence Permit Card** (oleskelulupa).

### The Golden Rule: Address Updates
If you move (even to the building next door), you **must** notify DVV/Migri.
*   If Migri sends you a letter asking for information and you don't reply because you didn't get the mail, they can cancel your permit.
*   Always use the Posti "Muuttoilmoitus" (Notification of Move) service immediately.
`
      },
      {
        id: 'bureaucracy_asylum',
        title: 'Asylum & Protection Basics',
        icon: 'Shield',
        tags: ['refugee', 'asylum', 'arrival'],
        content: `
# Reception Centers (Vastaanottokeskus) 🏢

### Where do I live?
When you seek asylum or temporary protection, you are registered at a reception center.
*   **Housing:** You are offered a bed in a shared room. Families usually get their own room.
*   **Private Accommodation:** You *can* live with friends/relatives, but you must pay the rent yourself. You still need to be registered at a specific reception center to get your money (vastaanottoraha) and health services.

### Right to Work (Asylum)
*   **3-Month Rule:** If you presented a valid passport when applying.
*   **6-Month Rule:** If you did not have a passport.
*   **Temporary Protection (Ukraine):** Immediate right to work.
`
      },
      {
        id: 'bureaucracy_strong_auth',
        title: 'Banking & Strong Auth',
        icon: 'Key',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# Banking & Digital Identity 🏦

### Strong Electronic Identification (Vahva tunnistautuminen)
This is the "Key to the Kingdom".
*   **What it is:** Bank codes (Mobiiliavain / Tunnuslukulaite).
*   **What it unlocks:** Kela, Tax Office (Vero), Health Services (Omakanta), Post Office, Job Applications.

### The Catch-22
Banks are strict. To give you these codes, they often require:
1.  Finnish Personal ID (DVV).
2.  Finnish Address.
3.  Passport + Residence Permit + Finnish ID Card (Policet).

**Advice:** Do not leave the bank until you understand exactly what document is missing. Be persistent.
`
      }
    ]
  },
  {
    id: 'job_search',
    title: 'Job Search & Applications',
    icon: 'Briefcase',
    theme: { 
      border: 'border-blue-600', 
      text: 'text-blue-600', 
      shadow: 'hover:shadow-blue-100',
      hoverBg: 'group-hover:bg-blue-50'
    },
    articles: [
      {
        id: 'job_market_overview',
        title: 'Job Market Overview',
        icon: 'LayoutGrid',
        tags: ['worker', 'general'],
        content: `
# The Finnish Job Market 📊

### The "Hidden" Market
*   **Fact:** Approx. 70-80% of jobs in Finland are never advertised publicly. They are filled through internal transfers, networks, or direct headhunting.
*   **Conclusion:** If you only apply to public ads on LinkedIn/Oikotie, you are fighting for the smallest slice of the pie against the highest number of people.

### Growing Sectors
1.  **ICT & Tech:** High demand, English often sufficient.
2.  **Health & Social Care:** Massive shortage (Nurses, Practical Nurses), but requires fluent Finnish/Swedish.
3.  **CleanTech & Energy:** Hydrogen, wind power, battery technology.
4.  **Service & Tourism:** Lapland season (Winter) and Helsinki summer.
`
      },
      {
        id: 'job_cv_standards',
        title: 'The Finnish CV Style',
        icon: 'FileText',
        tags: ['worker', 'student', 'mandatory'],
        content: `
# The One-Page CV Standard 📄

Finnish recruiters value efficiency. Do not send a 5-page academic CV unless applying for a PhD.

### Essentials
1.  **Photo:** Yes, it is standard here. Professional, smiling, neutral background.
2.  **Length:** Maximum 2 pages. Ideally 1 page.
3.  **Structure:** 
    *   **Profile/Summary:** 3 sentences at the top. Who you are, what you offer.
    *   **Key Skills:** Bullet points (e.g., "Java", "Project Management", "B2 Sales").
    *   **Experience:** Reverse chronological. Focus on *results*, not just duties.

### The "Gap" Fear
Finns dislike unexplained gaps. If you were unemployed for a year, mention "Sabbatical", "Full-time Studies", or "Parental Leave". Do not leave it blank.
`
      },
      {
        id: 'job_cover_letter',
        title: 'The Cover Letter',
        icon: 'Edit3',
        tags: ['worker', 'student'],
        content: `
# Cover Letter Strategy ✍️

### Do not repeat your CV
The cover letter answers: "Why do you want *this* job?" and "Why do you fit *this* team?"

### Finnish Style: Direct & Honest
*   **Avoid:** "I am a passionate, enthusiastic ninja superstar." (Too much fluff).
*   **Use:** "I have 5 years of experience in X. I noticed your company uses tool Y. I used tool Y in my previous project to achieve Z."
*   **Length:** Max 1 page. 3-4 paragraphs.
*   **Salary Request:** If the ad asks for a "Palkkatoive", you **MUST** include a number. "According to TES" (Collective Agreement) is a safe answer for blue-collar jobs. For specialists, give a range.
`
      }
    ]
  },
  {
    id: 'recruitment',
    title: 'Recruitment Process',
    icon: 'Users',
    theme: { 
      border: 'border-indigo-600', 
      text: 'text-indigo-600', 
      shadow: 'hover:shadow-indigo-100',
      hoverBg: 'group-hover:bg-indigo-50'
    },
    articles: [
      {
        id: 'recruitment_interviews',
        title: 'Finnish Interview Style',
        icon: 'MessageSquare',
        tags: ['worker', 'general'],
        content: `
# The Interview: Brutal Honesty 🤝

### The Tone
Finnish interviews are often less formal than US/UK ones, but very structured.
*   **Small Talk:** Very brief. Weather, traffic, then straight to business.
*   **Honesty:** If asked "What is your weakness?", do not say "I work too hard." Say a real weakness and how you manage it. Finns have a built-in radar for BS.

### Silence is Okay
If you answer a question and the recruiter stays silent, **do not panic**. They are processing or writing notes. Do not ramble to fill the silence. Wait.
`
      },
      {
        id: 'recruitment_tests',
        title: 'Psychological Tests',
        icon: 'CheckSquare',
        tags: ['worker', 'specialist'],
        content: `
# Suitability Assessments (Soveltuvuusarviointi) 🧠

For specialist and management roles, it is standard to send top candidates to an external psychologist.

1.  **Logic Tests:** Patterns, math, verbal logic.
2.  **Personality Tests:** Hundreds of questions. Be consistent.
3.  **The Interview:** A psychologist will grill you on your life history, motivation, and stress handling.
*   **Tip:** Be yourself. These tests are designed to catch people "faking good."
`
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & Hidden Jobs',
    icon: 'Handshake',
    theme: { 
      border: 'border-violet-600', 
      text: 'text-violet-600', 
      shadow: 'hover:shadow-violet-100',
      hoverBg: 'group-hover:bg-violet-50'
    },
    articles: [
      {
        id: 'networking_reality',
        title: 'How Hiring Really Works',
        icon: 'Siren',
        tags: ['worker', 'general'],
        content: `
# The Trust Economy 🔗

Finland is a small country. "Everyone knows everyone" is not a joke.
Employers fear **risk**. Hiring a foreigner is seen as a "risk" (language, culture, paperwork).
**Networking reduces risk.** If someone inside the company vouches for you, you skip the line.

### Direct Contact (Open Applications)
*   Don't wait for an ad.
*   Find the **Head of Department** or **Team Lead** on the company site (NOT HR).
*   Email them directly: "I am X. I do Y. I can solve problem Z for you. Can we have coffee?"
`
      },
      {
        id: 'networking_linkedin',
        title: 'LinkedIn Strategy',
        icon: 'Globe',
        tags: ['worker', 'student'],
        content: `
# LinkedIn in Finland 🌐

It is essential for white-collar jobs.
1.  **Location:** Set it to "Helsinki" (or your Finnish city), not your home country. Recruiters filter by location.
2.  **Keywords:** Use the English AND Finnish job titles in your bio (e.g., "Software Engineer / Ohjelmistokehittäjä").
3.  **Activity:** Commenting on others' posts is more visible than posting your own. Engage with Finnish content (even in English).
`
      }
    ]
  },
  {
    id: 'work_culture',
    title: 'Work Culture',
    icon: 'Coffee',
    theme: { 
      border: 'border-emerald-600', 
      text: 'text-emerald-600', 
      shadow: 'hover:shadow-emerald-100',
      hoverBg: 'group-hover:bg-emerald-50'
    },
    articles: [
      {
        id: 'culture_essentials',
        title: 'Trust & Autonomy',
        icon: 'Shield',
        tags: ['culture', 'worker'],
        content: `
# No Micromanagement 🙅‍♂️

*   **Trust:** Your boss expects you to work. They will not stand behind your shoulder.
*   **Autonomy:** If you see a problem, fix it or suggest a fix. Do not wait for permission for every tiny step.
*   **Punctuality:** If the meeting starts at 09:00, you are there at 08:59. 09:05 is rude.
`
      },
      {
        id: 'culture_hierarchy',
        title: 'Flat Hierarchy',
        icon: 'Users',
        tags: ['culture', 'worker'],
        content: `
# First-Name Basis 👋

*   **The CEO:** You call them "Pekka" or "Sanna". No "Mr. CEO" or "Sir".
*   **Coffee Table:** In the break room, the CEO sits with the interns. This is the best place to network internally.
*   **Speaking Up:** It is okay to disagree with the boss in a meeting, provided you are polite and constructive.
`
      },
      {
        id: 'culture_barriers',
        title: 'Barriers: Racism & Reality',
        icon: 'AlertCircle',
        tags: ['worker', 'refugee', 'culture'],
        content: `
# The Hard Truths: Racism & Reluctance 🚧

It is important to be realistic. Finland has a very homogeneous working culture.

### Name Discrimination
*   Studies show that applicants with non-Finnish names need to send 2-4x more applications to get an interview.
*   **Strategy:** Do not take rejections personally. It is a structural issue. Focus on volume and networking.

### The "Finnish Required" Myth
*   Many ads say "Fluent Finnish required" even if the job doesn't need it.
*   **Apply anyway.** If your skills are perfect, they might make an exception.
*   **Pro Tip:** Write the first sentence of your application in Finnish (even if simple) to show effort. "Opiskelen suomea" (I am learning Finnish).
`
      }
    ]
  },
  {
    id: 'work_rights',
    title: 'Work Rights & Unions',
    icon: 'Scale',
    theme: { 
      border: 'border-red-600', 
      text: 'text-red-600', 
      shadow: 'hover:shadow-red-100',
      hoverBg: 'group-hover:bg-red-50'
    },
    articles: [
       {
        id: 'rights_basics',
        title: 'Employee Rights',
        icon: 'FileText',
        tags: ['worker', 'mandatory'],
        content: `
# Know Your Rights 📜

Finland does not have a universal minimum wage law. Wages are defined by **TES (Työehtosopimus)** - The Collective Agreement of your sector.

*   **Probation Period (Koeaika):** Max 6 months. You can be fired (or quit) with no notice.
*   **Working Hours:** Usually 37.5 or 40 hours/week. Overtime MUST be paid (usually +50% or +100%).
*   **Holidays:** You earn ~2-2.5 days of holiday for every month you work.
`
      },
      {
        id: 'rights_unions',
        title: 'Unions & Unemployment',
        icon: 'Umbrella',
        tags: ['worker', 'student', 'refugee'],
        content: `
# The Union & The Kassa 🛡️

### The Secret
Basic unemployment money from Kela is low (approx €800/mo taxable).
**Earnings-related allowance** is much higher (based on your salary).

### How to get it
You must join an **Unemployment Fund (Työttömyyskassa)** (e.g., YTK or a specific Union) **while you are working**.
*   **Cost:** Usually €60–€100 per year.
*   **Rule:** You typically need to work and be a member for 26 weeks (approx 6 months) to qualify.
*   **If you get fired:** The fund pays you for up to 300-400 days.
`
      },
      {
        id: 'rights_health',
        title: 'Occupational Health',
        icon: 'Stethoscope',
        tags: ['worker', 'health'],
        content: `
# Työterveys (Occupational Health) 🩺

If you have a contract, your employer **must** provide preventative healthcare.
Most employers also provide medical care (GP visits).

*   **Where:** Private clinics (Terveystalo, Mehiläinen, Pihlajalinna).
*   **Cost:** Free for you.
*   **Speed:** You get a doctor same-day. Use this instead of the public health center when you are employed.
`
      }
    ]
  },
  {
    id: 'learning_finnish',
    title: 'Learning Finnish',
    icon: 'Languages',
    theme: { 
      border: 'border-cyan-600', 
      text: 'text-cyan-600', 
      shadow: 'hover:shadow-cyan-100',
      hoverBg: 'group-hover:bg-cyan-50'
    },
    articles: [
      {
        id: 'lang_workplace',
        title: 'Workplace Finnish',
        icon: 'MessageSquare',
        tags: ['language', 'worker'],
        content: `
# Is English Enough? 🇬🇧

*   **Tech/IT:** Often yes.
*   **Everything else:** Usually no.

Even if the job is in English, the "coffee table talk" is in Finnish. If you don't learn, you will feel isolated socially.
**The "Puhukieli" (Spoken Language) Problem:**
Textbooks teach: "Minä olen..." (I am).
Real people say: "Mä oon..."
Be prepared that real life sounds different than Duolingo.
`
      },
      {
        id: 'lang_roadmap',
        title: 'Roadmap A1-B1',
        icon: 'Map',
        tags: ['language', 'education'],
        content: `
# The Roadmap to B1 (Functional) 🗺️

B1 is the magic level. It is where you can handle bad situations (doctor, police, Kela) without an interpreter. It is often required for Citizenship.

1.  **A1 (Basics):** Duolingo / Folk High Schools (Kansalaisopisto).
2.  **A2 (Basic Interaction):** Intensive courses. Integration training (Kotoutumiskoulutus) via TE Office.
3.  **B1 (Independent):** YKI Test preparation. You need to consume media (Yle Uutiset Selkosuomeksi - News in Simple Finnish).
`
      }
    ]
  },
  {
    id: 'work_life',
    title: 'Work-Life Balance',
    icon: 'Sun',
    theme: { 
      border: 'border-orange-500', 
      text: 'text-orange-600', 
      shadow: 'hover:shadow-orange-100',
      hoverBg: 'group-hover:bg-orange-50'
    },
    articles: [
      {
        id: 'life_rhythm',
        title: 'Lifestyle & Nature',
        icon: 'TreePine',
        tags: ['culture', 'general'],
        content: `
# The 4 PM Exodus 🕓

*   Finns work hard, but they leave on time. Staying late is not seen as "committed", it is seen as "inefficient" or "bad planning".
*   **Nature:** Use **Jokamiehenoikeudet** (Everyman's Rights). You can walk in any forest and pick berries. It is the primary mental health tool here.
`
      },
      {
        id: 'life_family',
        title: 'Family & Work',
        icon: 'Baby',
        tags: ['family', 'worker'],
        content: `
# Finland is for Families 👨‍👩‍👧‍👦

*   **Parental Leave:** Generous and can be shared between parents. Dads taking months off is normal and encouraged.
*   **Daycare (Päiväkoti):** Heavily subsidized. Your child has a *subjective right* to daycare, even if you are unemployed.
*   **Sick Kids:** If your child (under 10) is sick, you have the right to stay home (temporary care leave). Your boss cannot fire you for this.
`
      }
    ]
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    icon: 'Rocket',
    theme: { 
      border: 'border-pink-600', 
      text: 'text-pink-600', 
      shadow: 'hover:shadow-pink-100',
      hoverBg: 'group-hover:bg-pink-50'
    },
    articles: [
      {
        id: 'ent_toiminimi',
        title: 'Starting a Business (Toiminimi)',
        icon: 'Briefcase',
        tags: ['worker', 'business'],
        content: `
# Freelancing & Toiminimi 💼

If you can't find a job, create one.
*   **Toiminimi (Private Trader):** The simplest form. You are personally liable. Good for consultants, cleaners, designers.
*   **Starttiraha (Startup Grant):** TE Office can pay you ~€700/month for 6-12 months to support you while you start. **Critical:** You must apply *before* you register the company.
`
      },
      {
        id: 'ent_light',
        title: 'Light Entrepreneurship',
        icon: 'Zap',
        tags: ['worker', 'business'],
        content: `
# Kevytyrittäjyys (Light Entrepreneurship) ⚡

Want to bill a client but hate paperwork?
Services like **Ukko.fi** or **Free.fi** allow you to invoice without a company ID (Y-tunnus).
*   **Pros:** They handle taxes and insurance. No bureaucracy.
*   **Cons:** They take a cut (5-7%).
*   **Status:** You are technically "employed" by them or a "entrepreneur" depending on the contract. Check how this affects your unemployment benefits!
`
      }
    ]
  },
  {
    id: 'volunteering',
    title: 'Volunteering & Internships',
    icon: 'Heart',
    theme: { 
      border: 'border-lime-600', 
      text: 'text-lime-700', 
      shadow: 'hover:shadow-lime-100',
      hoverBg: 'group-hover:bg-lime-50'
    },
    articles: [
      {
        id: 'vol_networking',
        title: 'Volunteering',
        icon: 'Heart',
        tags: ['culture', 'general'],
        content: `
# Networking via Doing 🤝

You can't network by asking for things. You network by giving.
*   **Events:** Slush, Nordic Business Forum (Apply as volunteer).
*   **NGOs:** Red Cross, Mannerheim League.
*   **Why:** Finns trust people they have "done something" with. If they see you work hard for free, they trust you will work hard for money.
`
      },
      {
        id: 'vol_internship',
        title: 'Internships & Työkokeilu',
        icon: 'GraduationCap',
        tags: ['worker', 'student'],
        content: `
# Työkokeilu (Work Trial) 🛠️

A program via the TE Office.
*   **Deal:** You work for a company for 1-6 months. The company pays you nothing. You get your unemployment benefit + €9/day expense allowance.
*   **Why do it?** It gets your foot in the door. It proves your skills. Many immigrants get hired after the trial.
*   **Warning:** Don't let companies exploit you for free labor forever. There must be a path to a job.
`
      }
    ]
  },
  {
    id: 'plan',
    title: 'Your Employment Plan',
    icon: 'CheckCircle',
    theme: { 
      border: 'border-gray-800', 
      text: 'text-gray-900', 
      shadow: 'hover:shadow-gray-200',
      hoverBg: 'group-hover:bg-gray-100'
    },
    articles: [
      {
        id: 'plan_te',
        title: 'The TE-Office Plan',
        icon: 'FileText',
        tags: ['worker', 'mandatory', 'unemployed'],
        content: `
# The Integration Plan (Kotoutumissuunnitelma) 📝

If you are an unemployed immigrant, TE Office will make a plan with you.
*   **The Deal:** If you follow the plan (e.g., attend Finnish course 20h/week), you get higher integration allowance.
*   **The Trap:** If you miss classes or refuse an internship offered by them, they cut your money.
*   **Review:** The plan is reviewed every 6 months. Be active. Demand the training you need.
`
      },
      {
        id: 'plan_personal',
        title: 'Personal Strategy',
        icon: 'Target',
        tags: ['worker', 'general'],
        content: `
# Your Strategy 🎯

1.  **Define the Goal:** "I want to be a Junior Dev in Helsinki."
2.  **Gap Analysis:** "I have the coding skills, but no network and no Finnish."
3.  **Action:** 
    *   Morning: Apply to 1 job (Quality over Quantity).
    *   Afternoon: Learn Finnish (1h).
    *   Weekly: Attend 1 meetup or contact 1 new person.
4.  **Track:** Use Excel or Trello. Job hunting is a project. Manage it like one.
`
      }
    ]
  }
];

// Modified to support dynamic translation of titles
export const getWikiCategories = (lang: LanguageCode): WikiCategory[] => {
  if (lang === 'en') return WIKI_EN;

  // Deep clone and translate titles
  return WIKI_EN.map(cat => ({
    ...cat,
    title: translate(cat.title, lang),
    articles: cat.articles.map(art => ({
      ...art,
      title: translate(art.title, lang)
    }))
  }));
};

// ---------------------------------------------------------------------------
// DYNAMIC HELPERS
// ---------------------------------------------------------------------------

// Helper interface for flattened consumption
export interface EnrichedWikiArticle extends WikiArticle {
  categoryTitle: string;
  displayId: string; // e.g., "1.1"
  categoryId: string;
}

// Flattens the hierarchy and generates the "1.1" style IDs dynamically
export const getAllFlattenedArticles = (lang: LanguageCode): EnrichedWikiArticle[] => {
  const categories = getWikiCategories(lang);
  
  return categories.flatMap((cat, catIdx) => 
    cat.articles.map((art, artIdx) => ({
      ...art,
      categoryTitle: cat.title,
      categoryId: cat.id,
      displayId: `${catIdx + 1}.${artIdx + 1}` // Generates 1.1, 1.2, 2.1, etc.
    }))
  );
};