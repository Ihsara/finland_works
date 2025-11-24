import { TranslationResource } from "./types";

export const vi: TranslationResource = {
  ui: {
    landing_welcome: "Chào mừng!", landing_subtitle: "Tìm con đường sự nghiệp tại Phần Lan", landing_btn_quiz: "Kể về bạn", landing_btn_continue: "Mở hướng dẫn", landing_btn_ask: "Hỏi AI", landing_btn_browse: "Xem cẩm nang",
    dash_greeting: "Chào, {name}!", dash_subtitle: "Chào mừng trở lại với người hướng dẫn của bạn.", dash_btn_guide: "Mở Cẩm Nang", dash_btn_browse: "Xem Cẩm Nang", dash_btn_ask: "Trò chuyện AI", dash_btn_history: "Lịch sử", dash_btn_cv: "Nhập CV", dash_profile_overview: "Hồ sơ",
    wiki_header_title: "Phần Lan Works!", wiki_explore_cats: "Khám phá chủ đề", wiki_full_index: "Mục lục", wiki_nav_list: "Danh sách", wiki_nav_icons: "Biểu tượng", wiki_section_chapters: "Chương", wiki_btn_mark_done: "Hoàn thành", wiki_btn_later: "Để sau", wiki_stat_articles: "bài viết", wiki_stat_complete: "xong",
    profile_btn_guide: "Cẩm nang", profile_btn_plan: "Kế hoạch", profile_sect_languages: "Ngôn ngữ", profile_sect_skills: "Kỹ năng",
    chat_placeholder: "Hỏi gì đó...", chat_end_session: "Kết thúc", chat_header_assistant: "Trợ lý",
    settings_title: "Cài đặt", settings_theme_label: "Giao diện", settings_length_label: "Độ dài câu trả lời", settings_opt_ask: "Luôn hỏi", settings_opt_short: "Ngắn gọn", settings_opt_long: "Chi tiết",
    btn_back_dashboard: "Quay lại",
    wizard_title_init: "Tạo hồ sơ", wizard_title_name: "Bạn tên gì?", wizard_btn_next: "Tiếp", wizard_btn_prev: "Lùi", wizard_step4_title: "Bạn đến từ đâu?", wizard_btn_search_country: "Tìm nước", wizard_region_europe: "Châu Âu"
  },
  wiki: {
    titles: {
      foundation: 'Cơ bản', job_strategy: 'Chiến lược tìm việc', workplace: 'Văn hóa làm việc', industries: 'Hướng dẫn ngành nghề', life: 'Cuộc sống & Cân bằng',
      identity: 'Danh tính & Giấy phép', security: 'An sinh xã hội', market: 'Thị trường lao động', tools: 'Công cụ', rights: 'Quyền lợi',
      social: 'Nghi thức xã hội', norms: 'Quy tắc nghề nghiệp', specialist: 'Chuyên gia', hands_on: 'Lao động phổ thông', housing: 'Nhà ở & Đi lại',
      family: 'Gia đình', language: 'Ngôn ngữ',
      social_unemployment: 'Trợ cấp thất nghiệp', social_housing: 'Trợ cấp nhà ở', social_pension: 'Hệ thống lương hưu',
      bureaucracy_dvv: 'Mã số định danh (DVV)', bureaucracy_migri: 'Cục di trú (Migri)', bureaucracy_tax: 'Thẻ thuế',
      job_te_office: 'Văn phòng TE', job_portals: 'Trang web việc làm', job_entrepreneurship: 'Khởi nghiệp',
      job_cover_letter: 'Thư xin việc', job_interview: 'Phỏng vấn', job_linkedin: 'Mẹo LinkedIn', job_recognition: 'Công nhận bằng cấp',
      work_contract: 'Hợp đồng lao động', work_hours: 'Giờ làm việc', work_holidays: 'Nghỉ phép năm',
      culture_meetings: 'Văn hóa họp', culture_feedback: 'Đưa ra phản hồi', culture_names: 'Xưng hô tên',
      prof_engineering: 'Kỹ thuật', prof_business: 'Kinh doanh & Tài chính',
      housing_contracts: 'Hợp đồng thuê nhà', family_school: 'Hệ thống trường học'
    },
    articles: {
      'guide_start': { title: 'Chào mừng đến Phần Lan! 🇫🇮', content: `# Cẩm nang sinh tồn\n\n**Triết lý:**\nPhần Lan vận hành dựa trên niềm tin, sự im lặng và cà phê.\n\n### Cách dùng:\n1. **Đọc:** Xem hướng dẫn.\n2. **Chat:** Hỏi AI.\n3. **Hồ sơ:** Cập nhật thông tin.` },
      'bureaucracy_dvv': { title: 'DVV & Mã số định danh', content: `# DVV (Cơ quan Kỹ thuật số) 🆔\n\n**Ưu tiên: NGAY LẬP TỨC**\n\n### Nhiệm vụ\nĐăng ký sự tồn tại hợp pháp. Nếu không, bạn như "người vô hình".\n\n### Phần thưởng\n**Mã số định danh cá nhân** (henkilötunnus).\n\n### Tại sao cần?\nNgân hàng, Sim điện thoại, Thẻ thuế, Y tế.` },
      'bureaucracy_migri': { title: 'Cục di trú (Migri)', content: `# Migri 🛂\n\n### Nhiệm vụ\nLấy Giấy phép cư trú (oleskelulupa).\n\n### Mẹo\n* **Đặt lịch sớm:** Hàng đợi rất dài.\n* **Làn nhanh:** Dành cho chuyên gia.` },
      'bureaucracy_tax': { title: 'Thẻ thuế', content: `# Thẻ thuế (Verokortti) 💳\n\n**Quy tắc:** Không thẻ = 60% thuế.\n\n### Quy trình\n1. Đăng nhập **MyTax (OmaVero)**.\n2. Ước tính thu nhập.\n3. Lấy PDF.\n4. Gửi cho sếp.` },
      'social_unemployment': { title: 'Trợ cấp thất nghiệp', content: `# Mất việc? 📉\n\n### 1. Đăng ký ngay\nĐăng ký tìm việc tại **Văn phòng TE** ngay ngày đầu tiên thất nghiệp.\n\n### 2. Nơi chi trả\n* **Kela:** Trợ cấp cơ bản.\n* **Công đoàn (Kassa):** Trợ cấp theo lương (cao hơn nhiều).` },
      'job_market_overview': { title: 'Thị trường lao động', content: `# Thị trường ẩn 📉\n\n**70-80% việc làm không được đăng công khai.**\n\n### Chiến lược\n* **Mạng lưới:** Nhờ bạn bè giới thiệu.\n* **Liên hệ trực tiếp:** Gửi email cho công ty.` },
      'culture_meetings': { title: 'Văn hóa họp', content: `# Cuộc họp 📅\n\n**Hiệu quả & Đúng giờ.**\n\n* **Đúng giờ:** Chính xác từng phút.\n* **Nội dung:** Bám sát lịch trình.\n* **Thẳng thắn:** Vào thẳng vấn đề.` },
      'culture_essentials': { title: 'Giá trị cốt lõi', content: `# Niềm tin & Sự im lặng 🤫\n\n1. **Niềm tin:** Nói được làm được.\n2. **Im lặng:** Đừng cố lấp đầy khoảng lặng.` }
    }
  }
};
