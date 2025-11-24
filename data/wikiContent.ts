
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
// RAW CONTENT STORE
// ---------------------------------------------------------------------------

type ContentSet = {
  title: string;
  content: string;
};

// Map: ArticleID -> LanguageCode -> Content
const ARTICLE_CONTENT: Record<string, Record<LanguageCode, ContentSet>> = {
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
      title: 'Migri & Residence Permits',
      content: `# Migri (Finnish Immigration Service) 🛂\n\n### The Mission\nTo stay in Finland legally.\n\n### The Prize\nYour **Residence Permit Card** (oleskelulupa).\n\n### The Golden Rule: Address Updates\nIf you move (even to the building next door), you **must** notify DVV/Migri.\n* If Migri sends you a letter asking for information and you don't reply because you didn't get the mail, they can cancel your permit.\n* Always use the Posti "Muuttoilmoitus" (Notification of Move) service immediately.`
    },
    vi: {
      title: 'Migri & Giấy phép cư trú',
      content: `# Migri (Sở Di trú Phần Lan) 🛂\n\n### Nhiệm vụ\nĐể cư trú hợp pháp tại Phần Lan.\n\n### Phần thưởng\n**Thẻ Giấy phép Cư trú** (oleskelulupa) của bạn.\n\n### Nguyên tắc vàng: Cập nhật địa chỉ\nNếu bạn chuyển nhà (dù chỉ sang tòa nhà bên cạnh), bạn **phải** thông báo cho DVV/Migri.\n* Nếu Migri gửi thư yêu cầu thông tin mà bạn không trả lời vì không nhận được thư, họ có thể hủy giấy phép của bạn.\n* Luôn sử dụng dịch vụ "Muuttoilmoitus" (Thông báo chuyển chỗ ở) của Posti ngay lập tức.`
    },
    'pt-br': {
      title: 'Migri & Vistos',
      content: `# Migri (Serviço de Imigração) 🛂\n\n### A Missão\nFicar na Finlândia legalmente.\n\n### O Prêmio\nSeu **Cartão de Residência** (oleskelulupa).\n\n### Regra de Ouro: Endereço\nSe você se mudar, **deve** notificar o DVV/Migri.\n* Se o Migri enviar uma carta e você não responder porque não recebeu, eles podem cancelar seu visto.\n* Use sempre o serviço "Muuttoilmoitus" do Posti imediatamente.`
    },
    'pt-pt': {
      title: 'Migri & Autorizações',
      content: `# Migri (Serviço de Imigração) 🛂\n\n### A Missão\nPermanecer na Finlândia legalmente.\n\n### O Prémio\nO teu **Cartão de Residência** (oleskelulupa).\n\n### Regra de Ouro: Morada\nSe mudares de casa, **deves** notificar o DVV/Migri.\n* Se o Migri enviar uma carta e não responderes porque não a recebeste, eles podem cancelar a tua autorização.\n* Usa sempre o serviço "Muuttoilmoitus" dos CTT (Posti) imediatamente.`
    },
    ru: {
      title: 'Migri и ВНЖ',
      content: `# Migri (Иммиграционная служба) 🛂\n\n### Миссия\nЛегально находиться в Финляндии.\n\n### Приз\nВаш **ВНЖ** (oleskelulupa).\n\n### Золотое правило: Адрес\nЕсли вы переезжаете, вы **должны** уведомить DVV/Migri.\n* Если Migri отправит письмо, а вы не ответите, они могут аннулировать разрешение.\n* Всегда используйте сервис "Muuttoilmoitus" (Уведомление о переезде) от Posti.`
    }
  },
  'bureaucracy_strong_auth': {
    en: {
      title: 'Banking & Strong Auth',
      content: `# Banking & Digital Identity 🏦\n\n### Strong Electronic Identification\nThis is the "Key to the Kingdom".\n* **What it is:** Bank codes (Mobiiliavain).\n* **What it unlocks:** Kela, Tax Office, Health Services, Post Office.\n\n### The Catch-22\nBanks are strict. To give you these codes, they often require:\n1. Finnish Personal ID.\n2. Finnish Address.\n3. Passport + Residence Permit + Finnish ID Card (Policet).\n\n**Advice:** Do not leave the bank until you understand exactly what document is missing.`
    },
    vi: {
      title: 'Ngân hàng & Định danh điện tử',
      content: `# Ngân hàng & Định danh số 🏦\n\n### Định danh điện tử mạnh (Vahva tunnistautuminen)\nĐây là "Chìa khóa vạn năng".\n* **Nó là gì:** Mã ngân hàng (Mobiiliavain).\n* **Nó mở khóa:** Kela, Thuế, Y tế, Bưu điện.\n\n### Vòng luẩn quẩn\nCác ngân hàng rất nghiêm ngặt. Để cấp mã này, họ thường yêu cầu:\n1. Mã định danh cá nhân Phần Lan.\n2. Địa chỉ tại Phần Lan.\n3. Hộ chiếu + Giấy phép cư trú + Thẻ căn cước Phần Lan (của Cảnh sát).\n\n**Lời khuyên:** Đừng rời ngân hàng cho đến khi bạn hiểu chính xác mình đang thiếu giấy tờ gì.`
    },
    'pt-br': {
      title: 'Banco & Auth Forte',
      content: `# Banco & Identidade Digital 🏦\n\n### Identificação Eletrônica Forte\nÉ a "Chave do Reino".\n* **O que é:** Códigos bancários.\n* **O que desbloqueia:** Kela, Impostos, Saúde, Correios.\n\n### O Dilema\nBancos são rigorosos. Eles exigem:\n1. ID Finlandês.\n2. Endereço Finlandês.\n3. Passaporte + Visto + ID Card da Polícia.\n\n**Conselho:** Seja persistente e pergunte exatamente qual documento falta.`
    },
    'pt-pt': {
      title: 'Banca & Autenticação',
      content: `# Banca & Identidade Digital 🏦\n\n### Identificação Eletrónica Forte\nÉ a "Chave do Reino".\n* **O que é:** Códigos bancários.\n* **O que desbloqueia:** Kela, Impostos, Saúde, Correios.\n\n### O Dilema\nOs bancos são rigorosos. Exigem:\n1. ID Finlandês.\n2. Morada Finlandesa.\n3. Passaporte + Autorização + Cartão de Cidadão da Polícia.\n\n**Conselho:** Sê persistente e pergunta exatamente qual documento falta.`
    },
    ru: {
      title: 'Банки и авторизация',
      content: `# Банки и Цифровая личность 🏦\n\n### Сильная электронная идентификация\nЭто "Ключ от королевства".\n* **Что это:** Банковские коды.\n* **Что открывает:** Kela, Налоговую, Здравоохранение, Почту.\n\n### Замкнутый круг\nБанки строги. Они требуют:\n1. Финский ID.\n2. Финский адрес.\n3. Паспорт + ВНЖ + Финскую ID карту (Policet).\n\n**Совет:** Не уходите из банка, пока не поймете, какого документа не хватает.`
    }
  },
  'bureaucracy_tax': {
    en: {
      title: 'Tax Card (Vero)',
      content: `# The Tax Office (Vero) 💶\n\n### The 60% Trap\nIf you start working without a tax card, your employer is legally required to deduct **60%** of your salary.\n\n### How to Fix It\n1. **Estimate Income:** Guess how much you will earn this year.\n2. **Order Card:** Go to MyVero (OmaVero) online.\n3. **Send to Boss:** Give the card (pdf) to your employer immediately.\n\n### Progressive Tax\nFinland has progressive tax. The more you earn, the higher percentage you pay.`
    },
    vi: {
      title: 'Thẻ Thuế (Vero)',
      content: `# Sở Thuế (Vero) 💶\n\n### Bẫy 60%\nNếu bạn đi làm mà không có thẻ thuế, chủ lao động buộc phải khấu trừ **60%** lương của bạn theo luật.\n\n### Cách khắc phục\n1. **Ước tính thu nhập:** Dự đoán bạn sẽ kiếm được bao nhiêu trong năm nay.\n2. **Đặt thẻ:** Truy cập MyVero (OmaVero) trực tuyến.\n3. **Gửi cho Sếp:** Đưa thẻ (pdf) cho chủ lao động ngay lập tức.\n\n### Thuế lũy tiến\nPhần Lan đánh thuế lũy tiến. Bạn kiếm càng nhiều, phần trăm đóng thuế càng cao.`
    },
    'pt-br': {
      title: 'Cartão de Imposto (Vero)',
      content: `# Receita Federal (Vero) 💶\n\n### A Armadilha dos 60%\nSe você trabalhar sem cartão de imposto, seu patrão é obrigado a descontar **60%** do seu salário.\n\n### Como Resolver\n1. **Estime a Renda:** Calcule quanto vai ganhar no ano.\n2. **Peça o Cartão:** Vá ao MyVero (OmaVero) online.\n3. **Envie ao Chefe:** Entregue o PDF imediatamente.\n\n### Imposto Progressivo\nNa Finlândia, quem ganha mais, paga uma porcentagem maior.`
    },
    'pt-pt': {
      title: 'Cartão de Imposto (Vero)',
      content: `# Autoridade Tributária (Vero) 💶\n\n### A Armadilha dos 60%\nSe trabalhares sem cartão de imposto, a entidade patronal é obrigada a descontar **60%** do teu salário.\n\n### Como Resolver\n1. **Estima o Rendimento:** Calcula quanto vais ganhar no ano.\n2. **Pede o Cartão:** Vai ao MyVero (OmaVero) online.\n3. **Envia ao Chefe:** Entrega o PDF imediatamente.\n\n### Imposto Progressivo\nNa Finlândia, quem ganha mais, paga uma percentagem maior.`
    },
    ru: {
      title: 'Налоговая карта (Vero)',
      content: `# Налоговая (Vero) 💶\n\n### Ловушка 60%\nЕсли вы начнете работать без налоговой карты, работодатель обязан удержать **60%** вашей зарплаты.\n\n### Что делать\n1. **Оцените доход:** Прикиньте, сколько заработаете за год.\n2. **Закажите карту:** Зайдите в MyVero (OmaVero) онлайн.\n3. **Отправьте боссу:** Немедленно отдайте PDF работодателю.\n\n### Прогрессивный налог\nВ Финляндии налог прогрессивный. Чем больше доход, тем выше процент.`
    }
  },
  'bureaucracy_kela': {
    en: {
      title: 'Social Security (Kela)',
      content: `# Kela (Social Insurance) 🏠\n\n### Are you covered?\nNot everyone is covered by Kela automatically. It depends on your residence type.\n* **Permanent/Work Permit:** Usually covered.\n* **Students:** Limited coverage.\n\n### The Kela Card\nThis is your health insurance card. Show it at pharmacies for direct discounts on medicine.\n\n### Benefits\nKela handles unemployment allowance, housing allowance, and child benefits. You must apply for each separately.`
    },
    vi: {
      title: 'An sinh xã hội (Kela)',
      content: `# Kela (Bảo hiểm xã hội) 🏠\n\n### Bạn có được bảo hiểm không?\nKhông phải ai cũng tự động được Kela bảo vệ. Nó phụ thuộc vào loại cư trú của bạn.\n* **Vĩnh trú/Giấy phép làm việc:** Thường được bao gồm.\n* **Sinh viên:** Bảo hiểm hạn chế.\n\n### Thẻ Kela\nĐây là thẻ bảo hiểm y tế của bạn. Xuất trình tại hiệu thuốc để được giảm giá trực tiếp.\n\n### Phúc lợi\nKela xử lý trợ cấp thất nghiệp, trợ cấp nhà ở và trợ cấp trẻ em. Bạn phải nộp đơn riêng cho từng loại.`
    },
    'pt-br': {
      title: 'Segurança Social (Kela)',
      content: `# Kela (Seguro Social) 🏠\n\n### Você está coberto?\nNem todos são cobertos automaticamente. Depende do seu visto.\n* **Trabalho/Permanente:** Geralmente sim.\n* **Estudantes:** Cobertura limitada.\n\n### O Cartão Kela\nÉ seu cartão de saúde. Mostre na farmácia para descontos em remédios.\n\n### Benefícios\nKela cuida do auxílio-desemprego, auxílio-moradia e benefícios infantis. Você deve solicitar cada um separadamente.`
    },
    'pt-pt': {
      title: 'Segurança Social (Kela)',
      content: `# Kela (Seguro Social) 🏠\n\n### Estás coberto?\nNem todos estão cobertos automaticamente. Depende do teu visto.\n* **Trabalho/Permanente:** Geralmente sim.\n* **Estudantes:** Cobertura limitada.\n\n### O Cartão Kela\nÉ o teu cartão de saúde. Mostra na farmácia para descontos em medicamentos.\n\n### Benefícios\nKela trata do subsídio de desemprego, subsídio de habitação e abono de família. Deves solicitar cada um separadamente.`
    },
    ru: {
      title: 'Соцстрахование (Kela)',
      content: `# Kela (Социальное страхование) 🏠\n\n### Вы застрахованы?\nKela не покрывает всех автоматически. Это зависит от вашего статуса.\n* **Рабочий/ПМЖ:** Обычно да.\n* **Студенты:** Ограниченно.\n\n### Карта Kela\nЭто ваша карта медстрахования. Показывайте её в аптеках для скидок.\n\n### Пособия\nKela занимается пособиями по безработице, жилью и детям. На каждое нужно подавать отдельно.`
    }
  },

  // --- FAMILY & EDUCATION ---
  'family_neuvola': {
    en: {
      title: 'Neuvola (Child Clinics)',
      content: `# Neuvola: The Backbone of Family Health 👶\n\n### What is it?\nNeuvola is a free maternity and child health clinic system. It is not a hospital; it is a preventative support center.\n\n### How it works\n* **Pregnancy:** Regular checkups for the mother and baby.\n* **Childhood (0-6 years):** Regular monitoring of growth, vaccination, and development.\n* **Support:** They also support parents' mental health and family dynamics.\n\n### Cultural Note\nEvery parent in Finland goes to Neuvola. It is highly trusted. You do not need private insurance for this.`
    },
    vi: {
      title: 'Neuvola (Phòng khám trẻ em)',
      content: `# Neuvola: Xương sống của sức khỏe gia đình 👶\n\n### Nó là gì?\nNeuvola là hệ thống phòng khám sức khỏe bà mẹ và trẻ em miễn phí. Đây không phải là bệnh viện; nó là trung tâm hỗ trợ phòng ngừa.\n\n### Cách hoạt động\n* **Thai kỳ:** Kiểm tra định kỳ cho mẹ và bé.\n* **Tuổi thơ (0-6 tuổi):** Theo dõi thường xuyên sự phát triển và tiêm chủng.\n* **Hỗ trợ:** Họ cũng hỗ trợ sức khỏe tinh thần của cha mẹ.\n\n### Lưu ý văn hóa\nMọi cha mẹ ở Phần Lan đều đến Neuvola. Nó rất đáng tin cậy. Bạn không cần bảo hiểm tư nhân cho việc này.`
    },
    'pt-br': {
      title: 'Neuvola (Clínicas Infantis)',
      content: `# Neuvola: Saúde da Família 👶\n\n### O que é?\nNeuvola é um sistema gratuito de clínicas para maternidade e saúde infantil. Não é um hospital, é um centro de prevenção.\n\n### Como funciona\n* **Gravidez:** Check-ups regulares para mãe e bebê.\n* **Infância (0-6 anos):** Monitoramento de crescimento e vacinação.\n* **Apoio:** Também apoiam a saúde mental dos pais.\n\n### Nota Cultural\nTodos os pais na Finlândia usam o Neuvola. É altamente confiável.`
    },
    'pt-pt': {
      title: 'Neuvola (Clínicas Infantis)',
      content: `# Neuvola: Saúde da Família 👶\n\n### O que é?\nNeuvola é um sistema gratuito de clínicas para maternidade e saúde infantil. Não é um hospital, é um centro de prevenção.\n\n### Como funciona\n* **Gravidez:** Check-ups regulares para mãe e bebé.\n* **Infância (0-6 anos):** Monitorização de crescimento e vacinação.\n* **Apoio:** Também apoiam a saúde mental dos pais.\n\n### Nota Cultural\nTodos os pais na Finlândia usam o Neuvola. É altamente confiável.`
    },
    ru: {
      title: 'Нейвола (Детские консультации)',
      content: `# Neuvola: Основа здоровья семьи 👶\n\n### Что это?\nNeuvola — бесплатная система клиник материнства и детства. Это не больница, а центр профилактики.\n\n### Как это работает\n* **Беременность:** Регулярные осмотры матери и ребенка.\n* **Детство (0-6 лет):** Мониторинг роста, вакцинация.\n* **Поддержка:** Поддержка психического здоровья родителей.\n\n### Культура\nВсе родители в Финляндии ходят в Neuvola. Этому доверяют.`
    }
  },
  'family_daycare': {
    en: {
      title: 'Daycare & School',
      content: `# Varhaiskasvatus (Early Education) 🎒\n\n### Subjective Right\nEvery child in Finland has the right to daycare (*päiväkoti*), even if one parent stays at home. It is viewed as education, not just "babysitting".\n\n### Costs\nIt is heavily subsidized. The maximum fee is roughly ~300€/month, but it is often much lower or free for low-income families.\n\n### School Path\n1. **Preschool (Eskari):** Mandatory at age 6. Free.\n2. **Comprehensive School:** Starts at age 7. Free (including lunch and books).`
    },
    vi: {
      title: 'Nhà trẻ & Trường học',
      content: `# Varhaiskasvatus (Giáo dục sớm) 🎒\n\n### Quyền chủ quan\nMọi đứa trẻ ở Phần Lan đều có quyền đi nhà trẻ (*päiväkoti*), ngay cả khi cha mẹ ở nhà. Nó được xem là giáo dục, không chỉ là "trông trẻ".\n\n### Chi phí\nĐược trợ giá rất nhiều. Phí tối đa khoảng ~300€/tháng, nhưng thường thấp hơn nhiều hoặc miễn phí cho gia đình thu nhập thấp.\n\n### Lộ trình\n1. **Tiền tiểu học (Eskari):** Bắt buộc lúc 6 tuổi. Miễn phí.\n2. **Trường phổ thông:** Bắt đầu lúc 7 tuổi. Miễn phí (bao gồm ăn trưa và sách).`
    },
    'pt-br': {
      title: 'Creche e Escola',
      content: `# Varhaiskasvatus (Educação Infantil) 🎒\n\n### Direito Subjetivo\nToda criança tem direito a creche (*päiväkoti*), mesmo que um pai fique em casa. É visto como educação.\n\n### Custos\nFortemente subsidiado. O máximo é ~300€/mês, mas muitas vezes é grátis para baixa renda.\n\n### Caminho Escolar\n1. **Pré-escola (Eskari):** Obrigatório aos 6 anos. Grátis.\n2. **Escola Básica:** Começa aos 7. Grátis (inclui almoço e livros).`
    },
    'pt-pt': {
      title: 'Creche e Escola',
      content: `# Varhaiskasvatus (Educação Infantil) 🎒\n\n### Direito Subjetivo\nToda a criança tem direito a creche (*päiväkoti*), mesmo que um pai fique em casa. É visto como educação.\n\n### Custos\nFortemente subsidiado. O máximo é ~300€/mês, mas muitas vezes é grátis para baixos rendimentos.\n\n### Caminho Escolar\n1. **Pré-escola (Eskari):** Obrigatório aos 6 anos. Grátis.\n2. **Escola Básica:** Começa aos 7. Grátis (inclui almoço e livros).`
    },
    ru: {
      title: 'Садик и Школа',
      content: `# Varhaiskasvatus (Раннее образование) 🎒\n\n### Право\nКаждый ребенок имеет право на садик (*päiväkoti*). Это образование, а не просто "присмотр".\n\n### Расходы\nСильно субсидируется. Максимум ~300€/мес, часто бесплатно для малоимущих.\n\n### Школьный путь\n1. **Preschool (Eskari):** Обязательно в 6 лет. Бесплатно.\n2. **Школа:** С 7 лет. Бесплатно (включая обед и книги).`
    }
  },
  'family_teens': {
    en: {
      title: 'Teenagers & Youth',
      content: `# Youth Integration 🎧\n\n### Hobbies (Harrastukset)\nSocial life for Finnish teens revolves around organized hobbies (sports, arts). Cities often provide "Harrastustakuu" (Hobby Guarantee) ensuring one free hobby per child.\n\n### Youth Work\nFinland has professional Youth Workers (*nuoriso-ohjaaja*) in libraries, schools, and youth centers (*nuorisotalo*). They provide safe, supervised spaces for teens to hang out for free.`
    },
    vi: {
      title: 'Thanh thiếu niên',
      content: `# Hòa nhập cho giới trẻ 🎧\n\n### Sở thích (Harrastukset)\nĐời sống xã hội của thiếu niên Phần Lan xoay quanh các sở thích có tổ chức (thể thao, nghệ thuật). Các thành phố thường có "Harrastustakuu" (Đảm bảo sở thích) để cung cấp một hoạt động miễn phí cho mỗi trẻ.\n\n### Công tác thanh niên\nPhần Lan có các Nhân viên Thanh niên chuyên nghiệp tại thư viện, trường học và trung tâm thanh niên (*nuorisotalo*). Họ cung cấp không gian an toàn, có giám sát cho thanh thiếu niên vui chơi miễn phí.`
    },
    'pt-br': {
      title: 'Adolescentes & Jovens',
      content: `# Integração Juvenil 🎧\n\n### Hobbies (Harrastukset)\nA vida social dos jovens gira em torno de hobbies organizados. Cidades oferecem "Garantia de Hobby" para garantir uma atividade gratuita por criança.\n\n### Trabalho Juvenil\nA Finlândia tem trabalhadores juvenis profissionais em bibliotecas e centros juvenis (*nuorisotalo*). São espaços seguros e gratuitos para jovens.`
    },
    'pt-pt': {
      title: 'Adolescentes & Jovens',
      content: `# Integração Juvenil 🎧\n\n### Hobbies (Harrastukset)\nA vida social dos jovens gira em torno de hobbies organizados. As cidades oferecem "Garantia de Hobby" para garantir uma atividade gratuita por criança.\n\n### Trabalho Juvenil\nA Finlândia tem trabalhadores juvenis profissionais em bibliotecas e centros juvenis (*nuorisotalo*). São espaços seguros e gratuitos para jovens.`
    },
    ru: {
      title: 'Подростки и молодежь',
      content: `# Молодежь 🎧\n\n### Хобби (Harrastukset)\nСоциальная жизнь подростков строится вокруг хобби. Города часто предлагают "Гарантию хобби" (одно бесплатное занятие).\n\n### Работа с молодежью\nВ Финляндии есть профессиональные молодежные работники в библиотеках и молодежных центрах (*nuorisotalo*). Это безопасные места для досуга.`
    }
  },

  // --- DAILY LIFE & HOUSING ---
  'housing_general': {
    en: {
      title: 'Finding a Home',
      content: `# Housing 101 🏢\n\n### Where to look\n* **Oikotie.fi** & **Vuokraovi.com**: The main sites.\n* **City/Municipality Housing:** Cheaper, but long waiting lists.\n\n### The Deposit (Takuuvuokra)\nUsually 1-2 months of rent. You get it back when you move out if the apartment is clean.\n\n### Included?\n* **Water:** Usually extra (~20€/person).\n* **Internet:** Often included (basic speed).\n* **Electricity:** You must make your own contract.`
    },
    vi: {
      title: 'Tìm nhà ở',
      content: `# Nhà ở 101 🏢\n\n### Tìm ở đâu\n* **Oikotie.fi** & **Vuokraovi.com**: Các trang chính.\n* **Nhà ở xã hội/Thành phố:** Rẻ hơn, nhưng danh sách chờ dài.\n\n### Tiền đặt cọc (Takuuvuokra)\nThường là 1-2 tháng tiền thuê. Bạn sẽ nhận lại khi chuyển đi nếu căn hộ sạch sẽ.\n\n### Bao gồm những gì?\n* **Nước:** Thường tính riêng (~20€/người).\n* **Internet:** Thường bao gồm (tốc độ cơ bản).\n* **Điện:** Bạn phải tự ký hợp đồng.`
    },
    'pt-br': {
      title: 'Encontrando Casa',
      content: `# Habitação 🏢\n\n### Onde procurar\n* **Oikotie.fi** & **Vuokraovi.com**: Os principais sites.\n* **Moradia Municipal:** Mais barato, mas filas longas.\n\n### O Depósito (Takuuvuokra)\nGeralmente 1-2 meses de aluguel. Devolvido se o apto estiver limpo na saída.\n\n### O que está incluso?\n* **Água:** Geralmente extra (~20€/pessoa).\n* **Internet:** Muitas vezes inclusa (básica).\n* **Eletricidade:** Você faz seu próprio contrato.`
    },
    'pt-pt': {
      title: 'Encontrar Casa',
      content: `# Habitação 🏢\n\n### Onde procurar\n* **Oikotie.fi** & **Vuokraovi.com**: Os principais sites.\n* **Habitação Municipal:** Mais barato, mas filas longas.\n\n### A Caução (Takuuvuokra)\nGeralmente 1-2 meses de renda. Devolvido se o apto estiver limpo à saída.\n\n### O que está incluído?\n* **Água:** Geralmente extra (~20€/pessoa).\n* **Internet:** Muitas vezes incluída (básica).\n* **Eletricidade:** Fazes o teu próprio contrato.`
    },
    ru: {
      title: 'Поиск жилья',
      content: `# Жилье 🏢\n\n### Где искать\n* **Oikotie.fi** & **Vuokraovi.com**: Главные сайты.\n* **Муниципальное жилье:** Дешевле, но длинные очереди.\n\n### Залог (Takuuvuokra)\nОбычно 1-2 месяца аренды. Возвращается при выезде, если квартира чистая.\n\n### Включено?\n* **Вода:** Обычно отдельно (~20€/чел).\n* **Интернет:** Часто включен (базовый).\n* **Электричество:** Нужен свой контракт.`
    }
  },
  'health_services': {
    en: {
      title: 'Healthcare Basics',
      content: `# Health Services 🏥\n\n### Public vs. Occupational\n* **Public (Terveysasema):** For everyone with a municipality of residence. Slow for non-emergencies. Low cost.\n* **Occupational (Työterveys):** For employees. Paid by employer. Very fast. Use this first!\n\n### Emergency\nCall **112** for life-threatening situations.\nCall **116 117** for advice before going to the ER.`
    },
    vi: {
      title: 'Cơ bản về Y tế',
      content: `# Dịch vụ Y tế 🏥\n\n### Công cộng vs Lao động\n* **Công cộng (Terveysasema):** Dành cho mọi người có hộ khẩu. Chậm nếu không cấp cứu. Chi phí thấp.\n* **Lao động (Työterveys):** Dành cho nhân viên. Chủ trả tiền. Rất nhanh. Hãy dùng cái này trước!\n\n### Khẩn cấp\nGọi **112** cho tình huống đe dọa tính mạng.\nGọi **116 117** để được tư vấn trước khi đi cấp cứu.`
    },
    'pt-br': {
      title: 'Saúde Básica',
      content: `# Serviços de Saúde 🏥\n\n### Pública vs. Ocupacional\n* **Pública (Terveysasema):** Para residentes. Lento para casos leves. Barato.\n* **Ocupacional (Työterveys):** Para funcionários. Pago pelo chefe. Muito rápido. Use este primeiro!\n\n### Emergência\nLigue **112** para risco de vida.\nLigue **116 117** para conselhos antes de ir ao PS.`
    },
    'pt-pt': {
      title: 'Saúde Básica',
      content: `# Serviços de Saúde 🏥\n\n### Pública vs. Ocupacional\n* **Pública (Terveysasema):** Para residentes. Lento para casos leves. Barato.\n* **Ocupacional (Työterveys):** Para funcionários. Pago pelo chefe. Muito rápido. Usa este primeiro!\n\n### Emergência\nLiga **112** para risco de vida.\nLiga **116 117** para conselhos antes de ir às urgências.`
    },
    ru: {
      title: 'Основы здравоохранения',
      content: `# Медицина 🏥\n\n### Гос. vs. Рабочая\n* **Гос. (Terveysasema):** Для резидентов. Медленно, если не срочно. Дешево.\n* **Рабочая (Työterveys):** Для сотрудников. Платит босс. Очень быстро. Используйте это в первую очередь!\n\n### Экстренно\nЗвоните **112** при угрозе жизни.\nЗвоните **116 117** за советом перед поездкой в травмпункт.`
    }
  },
  'transport_public': {
    en: {
      title: 'Public Transport (HSL)',
      content: `# Getting Around 🚌\n\n### The HSL App\nIn Helsinki region, download the **HSL App**. You buy tickets there.\n* **Zones:** Ticket price depends on zones (ABCD). Helsinki is usually AB.\n\n### Important Rules\n* **Trains/Metro:** You MUST have a ticket before entering. Fine is 80€.\n* **Buses:** In blue buses, show ticket to driver. In orange (trunk) buses, just walk in.\n* **Night:** Trains stop around midnight. Night buses run later.`
    },
    vi: {
      title: 'Giao thông công cộng (HSL)',
      content: `# Di chuyển 🚌\n\n### Ứng dụng HSL\nỞ vùng Helsinki, hãy tải **HSL App**. Bạn mua vé ở đó.\n* **Vùng:** Giá vé phụ thuộc vào vùng (ABCD). Helsinki thường là AB.\n\n### Quy tắc quan trọng\n* **Tàu/Metro:** Bạn PHẢI có vé trước khi lên. Phạt 80€.\n* **Xe buýt:** Xe xanh dương, trình vé cho tài xế. Xe cam (trục chính), cứ thế đi lên.\n* **Ban đêm:** Tàu dừng khoảng nửa đêm. Xe buýt đêm chạy muộn hơn.`
    },
    'pt-br': {
      title: 'Transporte Público (HSL)',
      content: `# Locomoção 🚌\n\n### App HSL\nNa região de Helsinque, baixe o **App HSL**. Compre bilhetes lá.\n* **Zonas:** O preço depende das zonas (ABCD). Helsinque geralmente é AB.\n\n### Regras Importantes\n* **Trens/Metrô:** Você DEVE ter bilhete antes de entrar. Multa é 80€.\n* **Ônibus:** Azuis: mostre ao motorista. Laranjas: entre direto.\n* **Noite:** Trens param meia-noite. Ônibus noturnos rodam mais tarde.`
    },
    'pt-pt': {
      title: 'Transporte Público (HSL)',
      content: `# Locomoção 🚌\n\n### App HSL\nNa região de Helsínquia, descarrega a **App HSL**. Compra bilhetes lá.\n* **Zonas:** O preço depende das zonas (ABCD). Helsínquia geralmente é AB.\n\n### Regras Importantes\n* **Comboios/Metro:** DEVES ter bilhete antes de entrar. Multa é 80€.\n* **Autocarros:** Azuis: mostra ao motorista. Laranjas: entra direto.\n* **Noite:** Comboios param à meia-noite. Autocarros noturnos circulam mais tarde.`
    },
    ru: {
      title: 'Общественный транспорт',
      content: `# Транспорт 🚌\n\n### Приложение HSL\nВ регионе Хельсинки скачайте **HSL App**. Билеты там.\n* **Зоны:** Цена зависит от зон (ABCD). Хельсинки обычно AB.\n\n### Важные правила\n* **Поезда/Метро:** Вход ТОЛЬКО с билетом. Штраф 80€.\n* **Автобусы:** В синих покажите билет водителю. В оранжевых заходите просто так.\n* **Ночь:** Поезда встают в полночь. Ночные автобусы ходят дольше.`
    }
  },

  // --- CULTURE & SOCIETY ---
  'culture_religion': {
    en: {
      title: 'Religion & Beliefs',
      content: `# Religion in Finland ⛪\n\n### Secular but Traditional\nFinland is a secular country with freedom of religion. You can practice any faith (or none) safely.\n\n### The Evangelical Lutheran Church\nMost Finns belong to this church culturally. \n* **Church Tax:** Members pay ~1-2% tax. You can leave the church online if you wish to stop paying.\n\n### Cultural Norms\nReligion is considered a **private matter**. It is rarely discussed at work. Wearing religious symbols (like hijabs or crosses) is generally accepted.`
    },
    vi: {
      title: 'Tôn giáo & Tín ngưỡng',
      content: `# Tôn giáo ở Phần Lan ⛪\n\n### Thế tục nhưng Truyền thống\nPhần Lan là quốc gia thế tục với quyền tự do tôn giáo. Bạn có thể thực hành bất kỳ đức tin nào (hoặc không) một cách an toàn.\n\n### Giáo hội Tin lành Luther\nĐa số người Phần Lan thuộc giáo hội này về mặt văn hóa.\n* **Thuế Nhà thờ:** Thành viên đóng thuế ~1-2%. Bạn có thể rời giáo hội trực tuyến nếu muốn ngừng đóng.\n\n### Chuẩn mực văn hóa\nTôn giáo được coi là **vấn đề riêng tư**. Hiếm khi được thảo luận tại nơi làm việc. Việc đeo biểu tượng tôn giáo (như khăn trùm đầu hoặc thánh giá) thường được chấp nhận.`
    },
    'pt-br': {
      title: 'Religião e Crenças',
      content: `# Religião na Finlândia ⛪\n\n### Secular mas Tradicional\nA Finlândia é um país secular com liberdade religiosa. Você pode praticar qualquer fé com segurança.\n\n### A Igreja Luterana\nA maioria dos finlandeses pertence a esta igreja culturalmente.\n* **Imposto da Igreja:** Membros pagam ~1-2%. Você pode sair da igreja online se quiser parar de pagar.\n\n### Normas Culturais\nReligião é um **assunto privado**. Raramente é discutido no trabalho. O uso de símbolos religiosos é geralmente aceito.`
    },
    'pt-pt': {
      title: 'Religião e Crenças',
      content: `# Religião na Finlândia ⛪\n\n### Secular mas Tradicional\nA Finlândia é um país secular com liberdade religiosa. Podes praticar qualquer fé com segurança.\n\n### A Igreja Luterana\nA maioria dos finlandeses pertence a esta igreja culturalmente.\n* **Imposto da Igreja:** Membros pagam ~1-2%. Podes sair da igreja online se quiseres parar de pagar.\n\n### Normas Culturais\nReligião é um **assunto privado**. Raramente é discutido no trabalho. O uso de símbolos religiosos é geralmente aceite.`
    },
    ru: {
      title: 'Религия и вера',
      content: `# Религия в Финляндии ⛪\n\n### Светскость\nФинляндия — светская страна со свободой вероисповедания. Вы можете безопасно исповедовать любую веру.\n\n### Лютеранская церковь\nБольшинство финнов принадлежат к ней.\n* **Церковный налог:** Члены платят ~1-2%. Вы можете покинуть церковь онлайн, чтобы не платить.\n\n### Нормы\nРелигия — это **личное дело**. Она редко обсуждается на работе. Религиозные символы (хиджаб, крест) обычно принимаются.`
    }
  },
  'culture_holidays': {
    en: {
      title: 'Holidays & Traditions',
      content: `# Major Holidays 🎉\n\n### Vappu (May 1st)\nA carnival for workers and students. People wear white caps, drink sparkling wine (sima), and picnic in parks regardless of the weather.\n\n### Juhannus (Midsummer - Late June)\nThe most important summer holiday. Cities become **empty**. Finns go to summer cottages (*mökki*), burn bonfires, and sauna.\n\n### Christmas (Joulu)\nVery quiet and family-oriented. Peace is declared on Christmas Eve. Traditional food includes ham and casseroles.`
    },
    vi: {
      title: 'Ngày lễ & Truyền thống',
      content: `# Các ngày lễ chính 🎉\n\n### Vappu (1 tháng 5)\nLễ hội cho người lao động và sinh viên. Mọi người đội mũ trắng, uống rượu sủi tăm (sima) và dã ngoại trong công viên bất kể thời tiết.\n\n### Juhannus (Giữa hè - Cuối tháng 6)\nKỳ nghỉ hè quan trọng nhất. Các thành phố trở nên **trống rỗng**. Người Phần Lan về nhà tranh mùa hè (*mökki*), đốt lửa trại và tắm hơi.\n\n### Giáng sinh (Joulu)\nRất yên tĩnh và hướng về gia đình. Sự bình yên được tuyên bố vào Đêm Giáng sinh. Món ăn truyền thống gồm giăm bông và các món hầm.`
    },
    'pt-br': {
      title: 'Feriados e Tradições',
      content: `# Principais Feriados 🎉\n\n### Vappu (1º de Maio)\nCarnaval de estudantes e trabalhadores. Piqueniques nos parques, chapéus brancos e espumante.\n\n### Juhannus (São João - Junho)\nO feriado de verão mais importante. As cidades ficam **vazias**. Finlandeses vão para casas de campo (*mökki*), fogueiras e sauna.\n\n### Natal (Joulu)\nMuito quieto e familiar. Comidas tradicionais incluem pernil e caçarolas.`
    },
    'pt-pt': {
      title: 'Feriados e Tradições',
      content: `# Principais Feriados 🎉\n\n### Vappu (1º de Maio)\nCarnaval de estudantes e trabalhadores. Piqueniques nos parques, chapéus brancos e espumante.\n\n### Juhannus (São João - Junho)\nO feriado de verão mais importante. As cidades ficam **vazias**. Finlandeses vão para casas de campo (*mökki*), fogueiras e sauna.\n\n### Natal (Joulu)\nMuito quieto e familiar. Comidas tradicionais incluem pernil e caçarolas.`
    },
    ru: {
      title: 'Праздники и традиции',
      content: `# Главные праздники 🎉\n\n### Vappu (1 мая)\nКарнавал студентов и рабочих. Пикники, белые фуражки и игристое.\n\n### Juhannus (Иванов день - Июнь)\nГлавный летний праздник. Города **пустеют**. Финны едут на дачи (*mökki*), жгут костры и парятся в сауне.\n\n### Рождество (Joulu)\nТихий семейный праздник. Традиционная еда: ветчина и запеканки.`
    }
  },
  'culture_norms': {
    en: {
      title: 'Social Norms',
      content: `# Social Etiquette 🤫\n\n### Silence is Golden\nSilence in conversation is not awkward; it is considered polite listening. Do not rush to fill the gaps.\n\n### Personal Space\nKeep a healthy distance when queuing or talking. No touching unless you are close friends.\n\n### Sauna\nIt is a place of cleansing, not sex. Nudity is standard (separate turns for men/women or mixed with swimsuits depending on the crowd). It is where barriers break down.`
    },
    vi: {
      title: 'Chuẩn mực xã hội',
      content: `# Nghi thức xã giao 🤫\n\n### Im lặng là Vàng\nSự im lặng trong cuộc trò chuyện không ngại ngùng; nó được coi là lịch sự lắng nghe. Đừng vội lấp đầy khoảng trống.\n\n### Không gian cá nhân\nGiữ khoảng cách khi xếp hàng hoặc nói chuyện. Không chạm vào người khác trừ khi là bạn thân.\n\n### Sauna (Tắm hơi)\nNơi để thanh tịnh, không phải tình dục. Khỏa thân là tiêu chuẩn (nam/nữ riêng hoặc chung thì mặc đồ bơi tùy nhóm). Đây là nơi mọi rào cản bị phá bỏ.`
    },
    'pt-br': {
      title: 'Normas Sociais',
      content: `# Etiqueta Social 🤫\n\n### Silêncio é Ouro\nSilêncio na conversa não é estranho; é educação. Não corra para preencher as pausas.\n\n### Espaço Pessoal\nMantenha distância na fila. Sem toques, a menos que sejam amigos íntimos.\n\n### Sauna\nLugar de limpeza, não sexo. Nudez é padrão. É onde as barreiras sociais caem.`
    },
    'pt-pt': {
      title: 'Normas Sociais',
      content: `# Etiqueta Social 🤫\n\n### Silêncio é Ouro\nSilêncio na conversa não é estranho; é educação. Não corras para preencher as pausas.\n\n### Espaço Pessoal\nMantém distância na fila. Sem toques, a menos que sejam amigos íntimos.\n\n### Sauna\nLugar de limpeza, não sexo. Nudez é padrão. É onde as barreiras sociais caem.`
    },
    ru: {
      title: 'Социальные нормы',
      content: `# Этикет 🤫\n\n### Молчание — золото\nПаузы в разговоре — это вежливость, а не неловкость. Не спешите их заполнять.\n\n### Личное пространство\nДержите дистанцию в очереди. Не прикасайтесь к людям без дружбы.\n\n### Сауна\nМесто очищения. Нагота — это норма. В сауне стираются социальные барьеры.`
    }
  },

  // --- PROFESSION GUIDES (NEW) ---
  'prof_general': {
    en: {
      title: 'Universal Work Life',
      content: `# Work Life 101 🇫🇮\n\n### The Golden Rules\nThese apply to **every** job in Finland:\n\n1. **Collective Agreements (TES):** Your minimum wage is not set by law, but by the union agreement for your sector. Always check which TES applies to you.\n2. **Trial Period (Koeaika):** Usually 6 months. You can be fired (or quit) instantly without reason. After this, you are very hard to fire.\n3. **Holiday Pay (Lomaraha):** You earn ~2-2.5 paid holidays per month worked. Many sectors pay an extra "holiday bonus" (50% of holiday pay) in summer.\n4. **Pekkaspäivät:** In some sectors (industry/construction), you work 40h/week but get paid days off to average it down to 37.5h.`
    },
    vi: {
      title: 'Đời sống làm việc',
      content: `# Đi làm tại Phần Lan 101 🇫🇮\n\n### Nguyên tắc vàng\nÁp dụng cho **mọi** công việc:\n\n1. **Thỏa ước lao động tập thể (TES):** Lương tối thiểu không do luật định, mà do thỏa ước ngành. Luôn kiểm tra TES nào áp dụng cho bạn.\n2. **Thời gian thử việc (Koeaika):** Thường là 6 tháng. Bạn có thể bị sa thải (hoặc nghỉ) ngay lập tức không cần lý do. Sau đó, rất khó để sa thải bạn.\n3. **Tiền nghỉ phép (Lomaraha):** Bạn tích lũy ~2-2.5 ngày nghỉ có lương mỗi tháng. Nhiều ngành trả thêm "thưởng nghỉ lễ" (50% lương nghỉ phép) vào mùa hè.\n4. **Pekkaspäivät:** Trong một số ngành (công nghiệp/xây dựng), bạn làm 40h/tuần nhưng được nghỉ bù để trung bình còn 37.5h.`
    },
    'pt-br': {
      title: 'Vida Profissional',
      content: `# Trabalho na Finlândia 101 🇫🇮\n\n### Regras de Ouro\nValem para **todo** emprego:\n\n1. **Acordos Coletivos (TES):** O salário mínimo é definido pelo sindicato, não por lei. Verifique qual TES se aplica a você.\n2. **Período de Experiência (Koeaika):** Geralmente 6 meses. Demissão ou saída imediata sem motivo. Depois disso, é difícil ser demitido.\n3. **Pagamento de Férias (Lomaraha):** Você ganha ~2-2.5 dias pagos por mês. Muitos setores pagam um bônus extra (50%) no verão.\n4. **Pekkaspäivät:** Em alguns setores (indústria), você trabalha 40h/semana mas ganha folgas para compensar a média de 37.5h.`
    },
    'pt-pt': {
      title: 'Vida Profissional',
      content: `# Trabalho na Finlândia 101 🇫🇮\n\n### Regras de Ouro\nValem para **todo** o emprego:\n\n1. **Acordos Coletivos (TES):** O salário mínimo é definido pelo sindicato, não por lei. Verifica qual TES se aplica a ti.\n2. **Período Experimental (Koeaika):** Geralmente 6 meses. Despedimento ou saída imediata sem motivo. Depois disso, é difícil ser despedido.\n3. **Subsídio de Férias (Lomaraha):** Ganhas ~2-2.5 dias pagos por mês. Muitos setores pagam um bónus extra (50%) no verão.\n4. **Pekkaspäivät:** Em alguns setores, trabalhas 40h/semana mas ganhas folgas para compensar a média de 37.5h.`
    },
    ru: {
      title: 'Работа: Основы',
      content: `# Работа в Финляндии 101 🇫🇮\n\n### Золотые правила\nДля **любой** работы:\n\n1. **Коллективный договор (TES):** Минималка зависит от профсоюза, а не закона. Узнайте свой TES.\n2. **Испытательный срок (Koeaika):** Обычно 6 месяцев. Можно уволить/уйти одним днем. После этого уволить сложно.\n3. **Отпускные (Lomaraha):** Вы получаете ~2-2.5 дня за месяц работы. Часто платят бонус (50%) летом.\n4. **Pekkaspäivät:** В промышленности работают 40ч/нед, но дают выходные для усреднения до 37.5ч.`
    }
  },
  'prof_tech': {
    en: {
      title: 'IT & Engineering',
      content: `# The "English Bubble" 💻\n\n### Overview\nSoftware developers, data scientists, and engineers often work entirely in English. The culture is extremely flat and informal.\n\n### Networking\n* **Events:** Slush (huge startup event), IGDA (Game Dev), Junction (Hackathons).\n* **LinkedIn:** Essential. Keep it updated.\n\n### Unions & Salaries\n* **Union:** TEK (Academic Engineers) or Insinööriliitto.\n* **Salaries:** High (3500€ - 6000€+).\n* **Work-Life:** Flexible hours, remote work is standard. No overtime culture (unless in gaming crunch).`
    },
    vi: {
      title: 'CNTT & Kỹ thuật',
      content: `# "Bong bóng tiếng Anh" 💻\n\n### Tổng quan\nLập trình viên, chuyên gia dữ liệu và kỹ sư thường làm việc hoàn toàn bằng tiếng Anh. Văn hóa cực kỳ phẳng và không trang trọng.\n\n### Mạng lưới\n* **Sự kiện:** Slush (khởi nghiệp), IGDA (Phát triển game), Junction (Hackathon).\n* **LinkedIn:** Rất quan trọng. Hãy cập nhật thường xuyên.\n\n### Công đoàn & Lương\n* **Công đoàn:** TEK (Kỹ sư hàn lâm) hoặc Insinööriliitto.\n* **Lương:** Cao (3500€ - 6000€+).\n* **Đời sống:** Giờ giấc linh hoạt, làm từ xa là tiêu chuẩn. Không khuyến khích làm thêm giờ (trừ khi chạy dự án game).`
    },
    'pt-br': {
      title: 'TI e Engenharia',
      content: `# A "Bolha do Inglês" 💻\n\n### Visão Geral\nDevs e engenheiros trabalham 100% em inglês. Cultura informal e horizontal.\n\n### Networking\n* **Eventos:** Slush, IGDA (Games), Junction.\n* **LinkedIn:** Essencial.\n\n### Sindicatos & Salários\n* **Sindicato:** TEK ou Insinööriliitto.\n* **Salários:** Altos (3.5k - 6k+).\n* **Equilíbrio:** Horário flexível, remoto é padrão. Hora extra é rara (exceto games).`
    },
    'pt-pt': {
      title: 'TI e Engenharia',
      content: `# A "Bolha do Inglês" 💻\n\n### Visão Geral\nDevs e engenheiros trabalham 100% em inglês. Cultura informal e horizontal.\n\n### Networking\n* **Eventos:** Slush, IGDA (Games), Junction.\n* **LinkedIn:** Essencial.\n\n### Sindicatos & Salários\n* **Sindicato:** TEK ou Insinööriliitto.\n* **Salários:** Altos (3.5k - 6k+).\n* **Equilíbrio:** Horário flexível, remoto é padrão. Horas extra são raras.`
    },
    ru: {
      title: 'IT и Инженерия',
      content: `# "Английский пузырь" 💻\n\n### Обзор\nРазработчики и инженеры работают на английском. Культура неформальная.\n\n### Нетворкинг\n* **Ивенты:** Slush, IGDA (Геймдев), Junction.\n* **LinkedIn:** Обязательно.\n\n### Профсоюзы и Зарплаты\n* **Профсоюз:** TEK или Insinööriliitto.\n* **Зарплаты:** Высокие (3500€ - 6000€+).\n* **Баланс:** Гибкий график, удаленка. Переработки редки.`
    }
  },
  'prof_health': {
    en: {
      title: 'Healthcare & Nursing',
      content: `# Nursing & Care 🩺\n\n### The Hard Truth\nYou **must** speak Finnish (level B1/B2). Even if patients speak English, the patient records and team communication are in Finnish.\n\n### Valvira Registration\nYour degree must be recognized by **Valvira**. This process can take months or years for non-EU degrees.\n\n### Unions & Work\n* **Unions:** Tehy or Super. Join them immediately for liability insurance.\n* **Culture:** Shift work (3-shift system) is common. Hierarchy exists (Doctors vs Nurses) but teamwork is emphasized.`
    },
    vi: {
      title: 'Y tế & Điều dưỡng',
      content: `# Điều dưỡng & Chăm sóc 🩺\n\n### Sự thật khó khăn\nBạn **phải** nói tiếng Phần Lan (trình độ B1/B2). Dù bệnh nhân nói tiếng Anh, hồ sơ bệnh án và giao tiếp nhóm đều bằng tiếng Phần.\n\n### Đăng ký Valvira\nBằng cấp của bạn phải được **Valvira** công nhận. Quá trình này có thể mất nhiều tháng hoặc năm đối với bằng ngoài EU.\n\n### Công đoàn & Công việc\n* **Công đoàn:** Tehy hoặc Super. Tham gia ngay để có bảo hiểm trách nhiệm.\n* **Văn hóa:** Làm theo ca (3 ca) là phổ biến. Có phân cấp (Bác sĩ vs Y tá) nhưng đề cao làm việc nhóm.`
    },
    'pt-br': {
      title: 'Saúde e Enfermagem',
      content: `# Enfermagem 🩺\n\n### A Realidade\nVocê **deve** falar finlandês (B1/B2). Prontuários e reuniões são em finlandês.\n\n### Valvira\nSeu diploma deve ser validado pela **Valvira**. Demora meses para diplomas fora da UE.\n\n### Trabalho\n* **Sindicatos:** Tehy ou Super. Entre pelo seguro de responsabilidade.\n* **Cultura:** Trabalho em turnos (3 turnos). Hierarquia existe, mas o time é importante.`
    },
    'pt-pt': {
      title: 'Saúde e Enfermagem',
      content: `# Enfermagem 🩺\n\n### A Realidade\n**Deves** falar finlandês (B1/B2). Os registos e reuniões são em finlandês.\n\n### Valvira\nO teu diploma deve ser validado pela **Valvira**. Demora meses para diplomas fora da UE.\n\n### Trabalho\n* **Sindicatos:** Tehy ou Super. Junta-te pelo seguro de responsabilidade.\n* **Cultura:** Trabalho por turnos. A hierarquia existe, mas a equipa é importante.`
    },
    ru: {
      title: 'Медицина',
      content: `# Медсестры и уход 🩺\n\n### Правда\nВы **должны** знать финский (B1/B2). Записи и планерки — на финском.\n\n### Valvira\nДиплом должен быть признан **Valvira**. Это долго для дипломов не из ЕС.\n\n### Работа\n* **Профсоюзы:** Tehy или Super. Вступайте ради страховки.\n* **Культура:** Сменная работа. Иерархия есть, но важна команда.`
    }
  },
  'prof_service': {
    en: {
      title: 'Service & Cleaning',
      content: `# Cleaning & Restaurants 🧹\n\n### Entry Point\nThese sectors employ many immigrants. English is often okay for cleaning; Restaurants require basic Finnish or English depending on the role.\n\n### The Union: PAM\nJoin **PAM** (Service Union United). They are very strong and fight for your rights.\n\n### Watch Out For\n* **0-Hour Contracts:** Avoid if possible. They offer no guaranteed income.\n* **Piecework (Urakkapalkka):** In cleaning, ensure the area is realistic to clean in the given time. Don't run to meet impossible targets.`
    },
    vi: {
      title: 'Dịch vụ & Vệ sinh',
      content: `# Vệ sinh & Nhà hàng 🧹\n\n### Điểm khởi đầu\nCác ngành này tuyển nhiều người nhập cư. Tiếng Anh thường ổn cho việc dọn dẹp; Nhà hàng cần tiếng Phần cơ bản hoặc tiếng Anh tùy vị trí.\n\n### Công đoàn: PAM\nHãy gia nhập **PAM**. Họ rất mạnh và bảo vệ quyền lợi của bạn.\n\n### Cần lưu ý\n* **Hợp đồng 0 giờ:** Tránh nếu có thể. Không đảm bảo thu nhập.\n* **Lương khoán (Urakkapalkka):** Trong dọn dẹp, hãy đảm bảo diện tích được giao là thực tế để làm kịp giờ. Đừng chạy đua để đạt chỉ tiêu không tưởng.`
    },
    'pt-br': {
      title: 'Serviços e Limpeza',
      content: `# Limpeza e Restaurantes 🧹\n\n### Ponto de Entrada\nEmpregam muitos imigrantes. Inglês costuma servir para limpeza.\n\n### Sindicato: PAM\nEntre no **PAM**. Eles lutam forte pelos seus direitos.\n\n### Cuidado Com\n* **Contratos 0-Horas:** Evite. Sem renda garantida.\n* **Empreitada (Urakkapalkka):** Na limpeza, verifique se a área é realista para o tempo. Não corra para cumprir metas impossíveis.`
    },
    'pt-pt': {
      title: 'Serviços e Limpeza',
      content: `# Limpeza e Restaurantes 🧹\n\n### Ponto de Entrada\nEmpregam muitos imigrantes. Inglês costuma servir para limpeza.\n\n### Sindicato: PAM\nJunta-te ao **PAM**. Lutam forte pelos teus direitos.\n\n### Cuidado Com\n* **Contratos 0-Horas:** Evita. Sem rendimento garantido.\n* **Empreitada (Urakkapalkka):** Na limpeza, verifica se a área é realista para o tempo. Não corras para cumprir metas impossíveis.`
    },
    ru: {
      title: 'Сервис и уборка',
      content: `# Уборка и рестораны 🧹\n\n### Старт\nМного иммигрантов. Для уборки часто хватает английского.\n\n### Профсоюз: PAM\nВступайте в **PAM**. Они защищают ваши права.\n\n### Осторожно\n* **0-часовые контракты:** Избегайте. Нет гарантии дохода.\n* **Сдельная (Urakkapalkka):** В уборке убедитесь, что объем реален. Не бегайте, чтобы успеть невозможное.`
    }
  },
  'prof_construction': {
    en: {
      title: 'Construction & Industry',
      content: `# Construction & Logistics 🏗️\n\n### Requirements\n* **Occupational Safety Card (Työturvallisuuskortti):** The "Green Card". Mandatory.\n* **Tax Number:** Required immediately for the ID badge giving access to the site.\n\n### Union: Rakennusliitto\nVery powerful. They inspect sites to catch illegal underpayment. If you are underpaid, call them.\n\n### Culture\nDirect, macho but safety-conscious. Morning shifts start early (07:00). "Pekkaspäivät" give you extra holidays.`
    },
    vi: {
      title: 'Xây dựng & Công nghiệp',
      content: `# Xây dựng & Hậu cần 🏗️\n\n### Yêu cầu\n* **Thẻ an toàn lao động (Työturvallisuuskortti):** "Thẻ xanh". Bắt buộc.\n* **Mã số thuế:** Cần ngay lập tức để làm thẻ ra vào công trường.\n\n### Công đoàn: Rakennusliitto\nRất quyền lực. Họ kiểm tra công trường để bắt lỗi trả lương thấp trái phép. Nếu bị trả thấp, hãy gọi họ.\n\n### Văn hóa\nThẳng thắn, mạnh mẽ nhưng chú trọng an toàn. Ca sáng bắt đầu sớm (07:00). Bạn có thêm ngày nghỉ "Pekkaspäivät".`
    },
    'pt-br': {
      title: 'Construção e Indústria',
      content: `# Construção & Logística 🏗️\n\n### Requisitos\n* **Cartão de Segurança (Työturvallisuuskortti):** O "Green Card". Obrigatório.\n* **Número Fiscal:** Obrigatório para o crachá de acesso.\n\n### Sindicato: Rakennusliitto\nMuito poderoso. Eles fiscalizam obras. Se pagarem menos, ligue para eles.\n\n### Cultura\nDireta, mas focada em segurança. Turnos começam cedo (07:00). "Pekkaspäivät" dão folgas extras.`
    },
    'pt-pt': {
      title: 'Construção e Indústria',
      content: `# Construção & Logística 🏗️\n\n### Requisitos\n* **Cartão de Segurança (Työturvallisuuskortti):** O "Green Card". Obrigatório.\n* **Número Fiscal:** Obrigatório para o crachá de acesso.\n\n### Sindicato: Rakennusliitto\nMuito poderoso. Eles fiscalizam obras. Se pagarem menos, liga para eles.\n\n### Cultura\nDireta, mas focada em segurança. Turnos começam cedo (07:00). "Pekkaspäivät" dão folgas extras.`
    },
    ru: {
      title: 'Строительство',
      content: `# Стройка и Логистика 🏗️\n\n### Требования\n* **Карта безопасности (Työturvallisuuskortti):** Обязательно.\n* **Налоговый номер:** Нужен для пропуска на объект.\n\n### Профсоюз: Rakennusliitto\nОчень мощный. Они ловят нелегальную недоплату. Звоните им при проблемах.\n\n### Культура\nПрямая, но безопасная. Смены с 07:00. Есть доп. выходные "Pekkaspäivät".`
    }
  },
  'prof_academia': {
    en: {
      title: 'Academia & Teaching',
      content: `# Research & Education 🎓\n\n### The Grant System (Apuraha)\nMany PhDs and Postdocs work on **grants**, not employment contracts. \n* **Warning:** Grants do not accumulate pension (unless you pay Mela) and often have no occupational health care.\n\n### Teaching\nTo teach in schools, you usually need a Master's degree + Pedagogical studies (60 ECTS). International schools are the exception.\n\n### Integration\nUniversities are English bubbles. You can live years here without learning Finnish, but it hurts your long-term tenure chances.`
    },
    vi: {
      title: 'Học thuật & Giảng dạy',
      content: `# Nghiên cứu & Giáo dục 🎓\n\n### Hệ thống Học bổng (Apuraha)\nNhiều Nghiên cứu sinh và Tiến sĩ làm việc bằng **học bổng**, không phải hợp đồng lao động.\n* **Cảnh báo:** Học bổng không tích lũy lương hưu (trừ khi bạn đóng Mela) và thường không có y tế lao động.\n\n### Giảng dạy\nĐể dạy ở trường phổ thông, bạn thường cần bằng Thạc sĩ + Chứng chỉ sư phạm (60 tín chỉ). Trường quốc tế là ngoại lệ.\n\n### Hòa nhập\nĐại học là bong bóng tiếng Anh. Bạn có thể sống nhiều năm mà không biết tiếng Phần, nhưng sẽ khó có biên chế lâu dài.`
    },
    'pt-br': {
      title: 'Academia e Ensino',
      content: `# Pesquisa e Educação 🎓\n\n### Bolsas (Apuraha)\nMuitos PhDs trabalham com **bolsas**, não contratos.\n* **Aviso:** Bolsas não geram aposentadoria automática (pague Mela) e muitas vezes sem saúde ocupacional.\n\n### Ensino\nPara dar aula em escolas, precisa de Mestrado + Pedagogia. Escolas internacionais são exceção.\n\n### Integração\nUniversidades são bolhas de inglês. Você vive sem finlandês, mas atrapalha a carreira a longo prazo.`
    },
    'pt-pt': {
      title: 'Academia e Ensino',
      content: `# Investigação e Educação 🎓\n\n### Bolsas (Apuraha)\nMuitos PhDs trabalham com **bolsas**, não contratos.\n* **Aviso:** Bolsas não geram reforma automática (paga Mela) e muitas vezes sem saúde ocupacional.\n\n### Ensino\nPara dar aulas em escolas, precisas de Mestrado + Pedagogia. Escolas internacionais são exceção.\n\n### Integração\nUniversidades são bolhas de inglês. Vives sem finlandês, mas atrapalha a carreira a longo prazo.`
    },
    ru: {
      title: 'Наука и образование',
      content: `# Наука и Образование 🎓\n\n### Гранты (Apuraha)\nМногие PhD работают на **грантах**, а не контрактах.\n* **Важно:** Гранты не копят пенсию (платите Mela) и часто без медицины труда.\n\n### Преподавание\nВ школах нужен Магистр + Педагогика. Исключение — международные школы.\n\n### Интеграция\nВузы — это пузыри английского. Можно жить без финского, но это мешает карьере.`
    }
  },

  // --- JOB SEARCH ---
  'job_market_overview': {
    en: {
      title: 'Job Market Overview',
      content: `# The Finnish Job Market 📊\n\n### The "Hidden" Market\n* **Fact:** Approx. 70-80% of jobs in Finland are never advertised publicly.\n* **Conclusion:** If you only apply to public ads, you are fighting for the smallest slice of the pie.\n\n### Growing Sectors\n1. **ICT & Tech:** High demand, English often sufficient.\n2. **Health Care:** Massive shortage, requires Finnish.\n3. **CleanTech:** Hydrogen, wind power.`
    },
    vi: {
      title: 'Tổng quan thị trường việc làm',
      content: `# Thị trường việc làm Phần Lan 📊\n\n### Thị trường "Ẩn"\n* **Thực tế:** Khoảng 70-80% công việc ở Phần Lan không bao giờ được quảng cáo công khai.\n* **Kết luận:** Nếu bạn chỉ nộp đơn vào các quảng cáo công khai, bạn đang cạnh tranh cho miếng bánh nhỏ nhất.\n\n### Các ngành đang phát triển\n1. **CNTT & Công nghệ:** Nhu cầu cao, tiếng Anh thường là đủ.\n2. **Y tế:** Thiếu hụt lớn, cần tiếng Phần Lan.\n3. **Công nghệ sạch:** Hydro, điện gió.`
    },
    'pt-br': {
      title: 'Visão do Mercado',
      content: `# O Mercado de Trabalho 📊\n\n### O Mercado "Oculto"\n* **Fato:** 70-80% das vagas nunca são anunciadas publicamente.\n* **Conclusão:** Não dependa apenas do LinkedIn.\n\n### Setores em Alta\n1. **TI:** Alta demanda, Inglês ok.\n2. **Saúde:** Grande escassez, exige Finlandês.\n3. **Energia Limpa:** Hidrogênio, eólica.`
    },
    'pt-pt': {
      title: 'Visão do Mercado',
      content: `# O Mercado de Trabalho 📊\n\n### O Mercado "Oculto"\n* **Facto:** 70-80% das vagas nunca são anunciadas publicamente.\n* **Conclusão:** Não dependas apenas do LinkedIn.\n\n### Setores em Alta\n1. **TI:** Alta procura, Inglês ok.\n2. **Saúde:** Grande escassez, exige Finlandês.\n3. **Energia Limpa:** Hidrogénio, eólica.`
    },
    ru: {
      title: 'Обзор рынка труда',
      content: `# Рынок труда Финляндии 📊\n\n### "Скрытый" рынок\n* **Факт:** 70-80% вакансий не публикуются открыто.\n* **Вывод:** Не полагайтесь только на объявления.\n\n### Растущие секторы\n1. **IT:** Высокий спрос, английского часто достаточно.\n2. **Здравоохранение:** Дефицит кадров, нужен финский.\n3. **CleanTech:** Водород, ветроэнергетика.`
    }
  },
  'job_cv_standards': {
    en: {
      title: 'The Finnish CV Style',
      content: `# The One-Page CV Standard 📄\n\nFinnish recruiters value efficiency.\n\n### Essentials\n1. **Photo:** Professional, smiling.\n2. **Length:** Max 2 pages. Ideally 1 page.\n3. **Structure:** Profile, Skills (Bullets), Experience (Reverse chronological).\n\n### The "Gap" Fear\nFinns dislike unexplained gaps. Mention "Sabbatical" or "Studies" rather than leaving it blank.`
    },
    vi: {
      title: 'Phong cách CV Phần Lan',
      content: `# Tiêu chuẩn CV một trang 📄\n\nNhà tuyển dụng Phần Lan coi trọng sự hiệu quả.\n\n### Những điều cần thiết\n1. **Ảnh:** Chuyên nghiệp, tươi cười.\n2. **Độ dài:** Tối đa 2 trang. Lý tưởng là 1 trang.\n3. **Cấu trúc:** Hồ sơ cá nhân, Kỹ năng, Kinh nghiệm.\n\n### Nỗi sợ về "Khoảng trống"\nNgười Phần Lan không thích những khoảng trống không giải thích được trong CV. Hãy ghi "Nghỉ phép" hoặc "Học tập" thay vì để trống.`
    },
    'pt-br': {
      title: 'CV Estilo Finlandês',
      content: `# O Padrão de CV 📄\n\nRecrutadores finlandeses valorizam eficiência.\n\n### Essenciais\n1. **Foto:** Sim, é padrão aqui.\n2. **Tamanho:** Máx 2 páginas. Idealmente 1.\n3. **Estrutura:** Resumo, Habilidades, Experiência.\n\n### Lacunas\nExplique lacunas no currículo. Não deixe em branco.`
    },
    'pt-pt': {
      title: 'CV Estilo Finlandês',
      content: `# O Padrão de CV 📄\n\nRecrutadores finlandeses valorizam eficiência.\n\n### Essenciais\n1. **Foto:** Sim, é padrão aqui.\n2. **Tamanho:** Máx 2 páginas. Idealmente 1.\n3. **Estrutura:** Resumo, Competências, Experiência.\n\n### Lacunas\nExplica lacunas no currículo. Não deixes em branco.`
    },
    ru: {
      title: 'Финский стиль резюме',
      content: `# Стандарт резюме 📄\n\nФинны ценят эффективность.\n\n### Главное\n1. **Фото:** Профессиональное.\n2. **Длина:** Макс 2 страницы. Лучше 1.\n3. **Структура:** Профиль, Навыки, Опыт.\n\n### Пробелы\nОбъясняйте пробелы в стаже (например, "Учеба"). Не оставляйте их пустыми.`
    }
  },
  'job_bias': {
    en: {
      title: 'Navigating Bias',
      content: `# Diversity & Recruitment Bias ⚖️\n\n### The Reality\nStudies in Finland have shown that applicants with Finnish names often get more interviews than those with foreign names. This is an unfortunate reality, though laws and attitudes are slowly improving.\n\n### Strategies\n1. **Direct Contact:** Call the recruiter before sending the application. Breaking the "paper barrier" helps humanize you.\n2. **Networking:** Since bias happens in screening, bypassing screening via referrals is effective.\n3. **International Companies:** Target companies with English as a working language; they often have less bias.\n\n### Your Rights\nDiscrimination based on origin is illegal. The **Non-Discrimination Ombudsman** (*Yhdenvertaisuusvaltuutettu*) offers advice if you suspect foul play.`
    },
    vi: {
      title: 'Đối mặt với Thiên kiến',
      content: `# Đa dạng & Thiên kiến Tuyển dụng ⚖️\n\n### Thực tế\nCác nghiên cứu tại Phần Lan cho thấy ứng viên có tên Phần Lan thường được gọi phỏng vấn nhiều hơn tên nước ngoài. Đây là thực tế đáng buồn, dù luật pháp và thái độ đang dần cải thiện.\n\n### Chiến lược\n1. **Liên hệ trực tiếp:** Gọi cho nhà tuyển dụng trước khi gửi đơn. Phá vỡ "rào cản giấy tờ" giúp họ thấy con người thật của bạn.\n2. **Mạng lưới quan hệ:** Vì thiên kiến xảy ra khi lọc hồ sơ, việc được giới thiệu sẽ giúp bạn vượt qua bước này.\n3. **Công ty quốc tế:** Nhắm vào các công ty dùng tiếng Anh; họ thường ít thiên kiến hơn.\n\n### Quyền của bạn\nPhân biệt đối xử dựa trên nguồn gốc là bất hợp pháp. **Thanh tra Chống phân biệt đối xử** (*Yhdenvertaisuusvaltuutettu*) sẽ tư vấn nếu bạn nghi ngờ có sự bất công.`
    },
    'pt-br': {
      title: 'Navegando o Preconceito',
      content: `# Diversidade e Viés ⚖️\n\n### A Realidade\nEstudos mostram que nomes finlandeses recebem mais entrevistas. É uma realidade infeliz, embora esteja melhorando lentamente.\n\n### Estratégias\n1. **Contato Direto:** Ligue para o recrutador antes de enviar. Quebre a barreira do papel.\n2. **Networking:** Indicações pulam a triagem de currículos onde o viés ocorre.\n3. **Empresas Internacionais:** Foque em empresas que falam inglês; elas costumam ter menos viés.\n\n### Seus Direitos\nDiscriminação é ilegal. O **Ombudsman de Não-Discriminação** (*Yhdenvertaisuusvaltuutettu*) oferece conselhos.`
    },
    'pt-pt': {
      title: 'Navegar o Preconceito',
      content: `# Diversidade e Viés ⚖️\n\n### A Realidade\nEstudos mostram que nomes finlandeses recebem mais entrevistas. É uma realidade infeliz, embora esteja a melhorar lentamente.\n\n### Estratégias\n1. **Contacto Direto:** Liga para o recrutador antes de enviar. Quebra a barreira do papel.\n2. **Networking:** Indicações saltam a triagem de currículos onde o viés ocorre.\n3. **Empresas Internacionais:** Foca-te em empresas que falam inglês; costumam ter menos viés.\n\n### Os teus Direitos\nDiscriminação é ilegal. O **Provedor da Não-Discriminação** (*Yhdenvertaisuusvaltuutettu*) oferece conselhos.`
    },
    ru: {
      title: 'Предвзятость в найме',
      content: `# Дискриминация и поиск ⚖️\n\n### Реальность\nИсследования показывают, что кандидаты с финскими именами чаще получают интервью. Это факт, хотя ситуация медленно меняется.\n\n### Стратегии\n1. **Прямой контакт:** Позвоните рекрутеру до отправки CV. Это выделяет вас.\n2. **Нетворкинг:** Личные рекомендации помогают обойти фильтр резюме.\n3. **Международные фирмы:** Ищите компании с английским языком, там меньше предвзятости.\n\n### Ваши права\nДискриминация незаконна. **Омбудсмен по вопросам дискриминации** (*Yhdenvertaisuusvaltuutettu*) может помочь советом.`
    }
  },

  // --- WORK CULTURE ---
  'culture_essentials': {
    en: {
      title: 'Trust & Autonomy',
      content: `# No Micromanagement 🙅‍♂️\n\n* **Trust:** Your boss expects you to work. They will not stand behind your shoulder.\n* **Autonomy:** If you see a problem, fix it. Do not wait for permission.\n* **Punctuality:** 09:00 means 09:00.`
    },
    vi: {
      title: 'Niềm tin & Tự chủ',
      content: `# Không quản lý vi mô 🙅‍♂️\n\n* **Niềm tin:** Sếp mong đợi bạn làm việc. Họ sẽ không đứng sau lưng bạn.\n* **Tự chủ:** Nếu thấy vấn đề, hãy sửa nó. Đừng chờ xin phép.\n* **Đúng giờ:** 09:00 nghĩa là 09:00.`
    },
    'pt-br': {
      title: 'Confiança & Autonomia',
      content: `# Sem Microgerenciamento 🙅‍♂️\n\n* **Confiança:** Seu chefe espera que você trabalhe sem vigilância.\n* **Autonomia:** Resolva problemas proativamente.\n* **Pontualidade:** Chegue na hora exata.`
    },
    'pt-pt': {
      title: 'Confiança & Autonomia',
      content: `# Sem Microgestão 🙅‍♂️\n\n* **Confiança:** O teu chefe espera que trabalhes sem vigilância.\n* **Autonomia:** Resolve problemas proativamente.\n* **Pontualidade:** Chega à hora exata.`
    },
    ru: {
      title: 'Доверие и автономия',
      content: `# Без микроменеджмента 🙅‍♂️\n\n* **Доверие:** Босс не будет стоять над душой.\n* **Автономия:** Видите проблему — решайте.\n* **Пунктуальность:** 09:00 значит 09:00.`
    }
  },
  'culture_hierarchy': {
    en: {
      title: 'Flat Hierarchy',
      content: `# First-Name Basis 👋\n\n* **The CEO:** You call them by their first name. No "Sir".\n* **Coffee Table:** The best place to network internally.\n* **Speaking Up:** It is okay to disagree with the boss politely.`
    },
    vi: {
      title: 'Cấu trúc phẳng',
      content: `# Gọi tên thân mật 👋\n\n* **CEO:** Bạn gọi họ bằng tên riêng. Không gọi "Thưa Ngài".\n* **Bàn cà phê:** Nơi tốt nhất để giao lưu nội bộ.\n* **Lên tiếng:** Bạn có thể bất đồng quan điểm với sếp một cách lịch sự.`
    },
    'pt-br': {
      title: 'Hierarquia Plana',
      content: `# Sem Formalidades 👋\n\n* **O CEO:** Chame pelo primeiro nome.\n* **Pausa para Café:** O melhor lugar para networking.\n* **Falar:** Tudo bem discordar do chefe com educação.`
    },
    'pt-pt': {
      title: 'Hierarquia Plana',
      content: `# Sem Formalidades 👋\n\n* **O CEO:** Trata pelo primeiro nome.\n* **Pausa para Café:** O melhor lugar para networking.\n* **Falar:** Tudo bem discordar do chefe com educação.`
    },
    ru: {
      title: 'Плоская иерархия',
      content: `# Обращение по имени 👋\n\n* **CEO:** Называйте по имени. Никаких "Сэр".\n* **Кофе-брейк:** Лучшее место для нетворкинга.\n* **Мнение:** С боссом можно вежливо не соглашаться.`
    }
  },
  'work_unions': {
    en: {
      title: 'Trade Unions',
      content: `# Why Join a Union? 🤝\n\n### It's Normal\nJoining a trade union (*ammattiliitto*) is standard in Finland. It is not seen as "rebellious" against the employer.\n\n### Unemployment Fund (Kassa)\nThis is the main reason to join. If you lose your job, the union fund pays a much higher unemployment benefit (earnings-related) than Kela.\n\n### Legal Help\nUnions provide free lawyers if you have a dispute with your employer.`
    },
    vi: {
      title: 'Công đoàn',
      content: `# Tại sao nên tham gia Công đoàn? 🤝\n\n### Chuyện bình thường\nTham gia công đoàn (*ammattiliitto*) là tiêu chuẩn ở Phần Lan. Nó không bị coi là "nổi loạn" chống lại chủ lao động.\n\n### Quỹ thất nghiệp (Kassa)\nĐây là lý do chính để tham gia. Nếu mất việc, quỹ công đoàn trả trợ cấp thất nghiệp cao hơn nhiều (theo thu nhập) so với Kela.\n\n### Hỗ trợ pháp lý\nCông đoàn cung cấp luật sư miễn phí nếu bạn có tranh chấp với chủ lao động.`
    },
    'pt-br': {
      title: 'Sindicatos',
      content: `# Por que entrar no Sindicato? 🤝\n\n### É Normal\nEntrar em um sindicato (*ammattiliitto*) é padrão na Finlândia. Não é visto como rebeldia.\n\n### Fundo de Desemprego\nÉ o principal motivo. Se perder o emprego, o fundo paga um benefício muito maior que o Kela (baseado no salário).\n\n### Ajuda Legal\nSindicatos oferecem advogados gratuitos em caso de disputas.`
    },
    'pt-pt': {
      title: 'Sindicatos',
      content: `# Por que entrar no Sindicato? 🤝\n\n### É Normal\nEntrar num sindicato (*ammattiliitto*) é padrão na Finlândia. Não é visto como rebeldia.\n\n### Fundo de Desemprego\nÉ o principal motivo. Se perderes o emprego, o fundo paga um subsídio muito maior que a Kela (baseado no salário).\n\n### Ajuda Legal\nSindicatos oferecem advogados gratuitos em caso de disputas.`
    },
    ru: {
      title: 'Профсоюзы',
      content: `# Зачем вступать? 🤝\n\n### Это норма\nВступление в профсоюз (*ammattiliitto*) — стандарт в Финляндии. Это не считается бунтом.\n\n### Касса безработицы\nГлавная причина. Если потеряете работу, фонд платит пособие намного выше (зависит от зарплаты), чем Kela.\n\n### Юр. помощь\nПрофсоюзы дают бесплатных юристов при спорах с боссом.`
    }
  },

  // --- LANGUAGE ---
  'lang_roadmap': {
    en: {
      title: 'Roadmap A1-B1',
      content: `# The Roadmap to B1 🗺️\n\nB1 is the magic level for Citizenship.\n\n1. **A1 (Basics):** Duolingo / Folk High Schools.\n2. **A2 (Basic Interaction):** Intensive courses.\n3. **B1 (Independent):** YKI Test preparation. Watch Yle Uutiset Selkosuomeksi.`
    },
    vi: {
      title: 'Lộ trình A1-B1',
      content: `# Lộ trình đến B1 🗺️\n\nB1 là trình độ cần thiết để nhập tịch.\n\n1. **A1 (Cơ bản):** Duolingo / Các trường Folk High Schools.\n2. **A2 (Giao tiếp cơ bản):** Các khóa học cấp tốc.\n3. **B1 (Độc lập):** Luyện thi YKI. Xem tin tức Yle Uutiset Selkosuomeksi.`
    },
    'pt-br': {
      title: 'Roteiro A1-B1',
      content: `# O Caminho para o B1 🗺️\n\nB1 é o nível mágico para Cidadania.\n\n1. **A1 (Básico):** Duolingo / Cursos locais.\n2. **A2 (Interação):** Cursos intensivos.\n3. **B1 (Independente):** Preparação YKI. Assista Yle Uutiset.`
    },
    'pt-pt': {
      title: 'Roteiro A1-B1',
      content: `# O Caminho para o B1 🗺️\n\nB1 é o nível mágico para Cidadania.\n\n1. **A1 (Básico):** Duolingo / Cursos locais.\n2. **A2 (Interação):** Cursos intensivos.\n3. **B1 (Independente):** Preparação YKI. Vê Yle Uutiset.`
    },
    ru: {
      title: 'Дорожная карта A1-B1',
      content: `# Путь к B1 🗺️\n\nB1 нужен для гражданства.\n\n1. **A1 (Основы):** Duolingo / Народные училища.\n2. **A2 (Общение):** Интенсивные курсы.\n3. **B1 (Независимый):** Подготовка к YKI. Смотрите Yle Uutiset Selkosuomeksi.`
    }
  }
};

// ---------------------------------------------------------------------------
// CATEGORY DEFINITIONS (METADATA)
// ---------------------------------------------------------------------------

// Helper to safely get content
const getContent = (id: string, lang: LanguageCode): ContentSet => {
  const article = ARTICLE_CONTENT[id];
  if (!article) return { title: 'Unknown', content: 'Content not found.' };
  
  // Return requested language if exists, else fallback to English, else first available
  return article[lang] || article['en'] || Object.values(article)[0];
};

export const getWikiCategories = (lang: LanguageCode): WikiCategory[] => {
  return [
    {
      id: 'foundation',
      title: lang === 'vi' ? 'Hành chính & Pháp lý' : lang === 'ru' ? 'Бюрократия и Закон' : lang.startsWith('pt') ? 'Burocracia e Base Legal' : 'Bureaucracy & Legal Foundation',
      icon: 'Building2',
      theme: { 
        border: 'border-slate-600 dark:border-slate-500', 
        text: 'text-slate-700 dark:text-slate-300', 
        shadow: 'hover:shadow-slate-100 dark:hover:shadow-slate-900/50',
        hoverBg: 'group-hover:bg-slate-50 dark:group-hover:bg-slate-900/50'
      },
      articles: [
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
      title: lang === 'vi' ? 'Hướng dẫn nghề nghiệp' : lang === 'ru' ? 'Гид по профессиям' : lang.startsWith('pt') ? 'Guias de Profissões' : 'Profession Guides',
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
      title: lang === 'vi' ? 'Gia đình & Giáo dục' : lang === 'ru' ? 'Семья и Образование' : lang.startsWith('pt') ? 'Família e Educação' : 'Family & Education',
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
      title: lang === 'vi' ? 'Đời sống & Nhà cửa' : lang === 'ru' ? 'Повседневная жизнь' : lang.startsWith('pt') ? 'Vida Diária & Moradia' : 'Daily Life & Housing',
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
      title: lang === 'vi' ? 'Văn hóa & Xã hội' : lang === 'ru' ? 'Культура и Общество' : lang.startsWith('pt') ? 'Cultura e Sociedade' : 'Culture & Society',
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
      title: lang === 'vi' ? 'Tìm việc & Ứng tuyển' : lang === 'ru' ? 'Поиск работы' : lang.startsWith('pt') ? 'Busca de Emprego' : 'Job Search & Applications',
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
      title: lang === 'vi' ? 'Văn hóa làm việc' : lang === 'ru' ? 'Рабочая культура' : lang.startsWith('pt') ? 'Cultura de Trabalho' : 'Work Culture',
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
          id: 'work_unions',
          icon: 'Handshake',
          tags: ['worker', 'rights'],
          ...getContent('work_unions', lang)
        }
      ]
    },
    {
      id: 'learning_finnish',
      title: lang === 'vi' ? 'Học tiếng Phần Lan' : lang === 'ru' ? 'Изучение финского' : lang.startsWith('pt') ? 'Aprender Finlandês' : 'Learning Finnish',
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
