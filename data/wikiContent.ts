
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
