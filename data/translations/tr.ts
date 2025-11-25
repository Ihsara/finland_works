
import { TranslationResource } from "./types";

export const tr: TranslationResource = {
  ui: {
    landing_welcome: "Hoş geldiniz!", landing_subtitle: "Finlandiya'da iş yolunuzu bulun", landing_btn_quiz: "Kendinizden bahsedin", landing_btn_continue: "Rehberimi Aç", landing_btn_ask: "Sohbet başlat", landing_btn_browse: "Rehbere Göz At", landing_load_sample: "Örnek Yükle", landing_erase: "Verileri Sil", landing_add_key: "API Anahtarı", landing_choose_lang: "Dil",
    dash_greeting: "Merhaba, {name}!", dash_greeting_guest: "Merhaba!", dash_subtitle: "Kişisel Finlandiya rehberinize tekrar hoş geldiniz.", dash_subtitle_guest: "Başlamak için profil oluşturalım.", dash_btn_guide: "Rehberi Aç", dash_btn_browse: "Göz At", dash_btn_ask: "AI'ya Sor", dash_btn_history: "Geçmiş", dash_btn_cv: "CV Yükle", dash_switch_profile: "Değiştir", dash_new_profile: "Yeni", dash_edit_profile: "Düzenle", dash_profile_overview: "Profil",
    dash_education: "Eğitim", dash_profession: "Meslek", dash_languages: "Diller", dash_narrative_aspirations: "Hedefler", dash_narrative_challenges: "Zorluklar",
    chat_placeholder: "Bir şey sor...", chat_end_session: "Bitir", chat_header_assistant: "Asistan", chat_prompt_context_inquiry: "\"{sentence}\" hakkında daha fazla anlat", chat_ask_length: "Kısa mı uzun mu?",
    btn_back_dashboard: "Geri", btn_save: "Kaydet",
    profile_btn_guide: "Rehberim", profile_btn_guide_desc: "Önerilen yazılar", profile_btn_plan: "Planım", profile_btn_plan_desc: "Yakında", profile_sect_languages: "Diller", profile_sect_skills: "Beceriler", profile_sect_narrative: "Hikaye", profile_label_aspirations: "Umutlar", profile_label_challenges: "Korkular", profile_label_education: "Eğitim", profile_label_profession: "Meslek", profile_completeness: "%{percentage} tamamlandı", profile_completeness_hint: "Birkaç soru daha cevapla", profile_btn_update: "Güncelle", profile_btn_continue: "Devam et",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "{name} için", wiki_explore_cats: "Kategoriler", wiki_explore_subtitle: "Bir konu seç.", wiki_full_index: "İndeks", wiki_full_index_subtitle: "Hepsi.", wiki_nav_list: "Liste", wiki_nav_icons: "İkonlar", wiki_section_chapters: "Bölümler", wiki_btn_mark_done: "Tamamlandı", wiki_btn_later: "Sonra", wiki_btn_saved: "Kaydedildi", wiki_btn_completed: "Bitti", wiki_ctx_ask: "Bunu sor", wiki_topic_label: "Konu: {tag}", wiki_topic_desc: "Özet & Makaleler", wiki_guide_prefix: "REHBER", wiki_stat_articles: "makale", wiki_stat_complete: "bitti", wiki_section_prefix: "Bölüm",
    wizard_header_quiz: "Anket", wizard_greeting_short: "Selam, {name}!", wizard_title_init: "Profil Oluştur", wizard_title_custom: "{name} Oluşturuluyor", wizard_phase_identity: "1. AŞAMA: KİMLİK", wizard_phase_demo: "2. AŞAMA: GEÇMİŞ", wizard_phase_status: "3. AŞAMA: DURUM", wizard_phase_skills: "4. AŞAMA: BECERİLER", wizard_phase_mindset: "5. AŞAMA: ZİHNİYET", wizard_phase_vision: "6. AŞAMA: VİZYON", wizard_nickname_hint: "* Takma ad kullanabilirsin.", wizard_btn_ask: "Sor", wizard_btn_next: "İleri", wizard_btn_prev: "Geri", wizard_btn_submit: "Gönder", wizard_btn_finish_early: "Kaydet", wizard_btn_generate_name: "İsim üret", wizard_ribbon_greeting: "Memnun oldum, {name}!", wizard_title_name: "Adınız nedir?", wizard_desc_name: "İsminizi girin", wizard_placeholder_name: "Adınız",
    wizard_step2_title: "Kaç yaşındasınız?", wizard_step2_desc: "Yaş grubu", wizard_step2_placeholder: "Yaş",
    wizard_step3_title: "Medeni durum?",
    wizard_marital_solo_title: "Tek", wizard_marital_solo_desc: "Eş veya çocuk yok", wizard_marital_pair_title: "Aileli", wizard_marital_pair_desc: "Eş veya çocuklar", wizard_marital_secret_title: "Gizli", wizard_marital_secret_desc: "Söylemem",
    wizard_children_title: "Çocuk var mı?", wizard_children_desc: "Okul tavsiyeleri için.", wizard_children_yes: "Evet", wizard_children_no: "Hayır", wizard_family_details_title: "Aile Detayları", wizard_family_count_label: "Kaç çocuk?", wizard_family_ages_label: "Yaşlar?", wizard_family_ages_hint: "Hepsini seç.", wizard_age_group_0_6: "Kreş (0-6)", wizard_age_group_7_12: "Okul (7-12)", wizard_age_group_13_17: "Genç (13-17)", wizard_age_group_18: "Yetişkin (18+)",
    wizard_step4_title: "Nerelisiniz?", wizard_step4_desc: "Geldiğiniz ülke", wizard_step4_placeholder: "Ülke adı...", wizard_step4_no_match: "Bulunamadı", wizard_btn_search_country: "Ara", wizard_btn_select_region: "Bölge Seç", wizard_region_europe: "Avrupa", wizard_region_americas: "Amerika", wizard_region_asia: "Asya", wizard_region_africa: "Afrika", wizard_region_oceania: "Okyanusya", wizard_region_middle_east: "Orta Doğu", wizard_eu_question: "AB Vatandaşı?", wizard_eu_yes: "Evet", wizard_eu_no: "Hayır",
    wizard_step5_title: "Çalışma Hakkı", wizard_permit_full_title: "Sınırsız", wizard_permit_full_desc: "Sürekli, Aile, AB", wizard_permit_restricted_title: "Sınırlı", wizard_permit_restricted_desc: "İşverene bağlı", wizard_permit_student_title: "Öğrenci", wizard_permit_student_desc: "Sınırlı saat",
    wizard_step6_title: "Eğitim", wizard_step6_desc: "Seviyeniz?", wizard_step6_field_label: "Alan (İsteğe bağlı)", wizard_step6_field_placeholder: "örn. Mühendislik", wizard_edu_general_title: "Genel", wizard_edu_general_desc: "Lise.", wizard_edu_applied_title: "Mesleki", wizard_edu_applied_desc: "Meslek lisesi.", wizard_edu_uni_title: "Üniversite", wizard_edu_uni_desc: "Akademik derece.",
    wizard_step7_title: "Mesleğiniz?", wizard_step7_desc: "Veya aradığınız iş?", wizard_step7_placeholder: "örn. Hemşire",
    wizard_step8_title: "Fince", wizard_lbl_finnish_level: "Seviye", wizard_lbl_finnish_motivation: "Motivasyon", wizard_opt_lang_none: "Yok", wizard_opt_lang_basics: "Temel (A1)", wizard_opt_lang_inter: "Orta (A2-B1)", wizard_opt_lang_fluent: "Akıcı (B2+)", wizard_scale_1_motivation: "Meraklı", wizard_scale_5_motivation: "Durdurulamaz",
    wizard_step9_title: "İngilizce", wizard_opt_lang_en_none: "Yok", wizard_opt_lang_en_basic: "Temel", wizard_opt_lang_en_working: "İş", wizard_opt_lang_en_fluent: "Akıcı",
    wizard_step10_title: "Vizyon", wizard_step10_aspirations_label: "Hedefler", wizard_step10_aspirations_placeholder: "Ne başarmak istiyorsunuz?", wizard_step10_challenges_label: "Zorluklar", wizard_step10_challenges_placeholder: "Sizi ne endişelendiriyor?",
    wizard_step12_title: "Kültür?", wizard_opt_cult_low: "Gizem", wizard_opt_cult_med: "Gözlem", wizard_opt_cult_high: "Dalıyorum",
    wizard_step13_title: "Hayat ritmi?", wizard_scale_1_life: "Yabancı", wizard_scale_5_life: "Ev gibi",
    wizard_step14_title: "İş arama güveni?", wizard_scale_1_career: "Yön lazım", wizard_scale_5_career: "Planım var",
    wizard_step15_title: "Yol net mi?", wizard_opt_info_none: "Bulanık", wizard_opt_info_some: "Netleşiyor", wizard_opt_info_high: "Kristal netliğinde",
    wizard_step16_title: "Sizi ne mutlu eder?", wizard_opt_excite_career: "Kariyer", wizard_opt_excite_life: "Güvenlik", wizard_opt_excite_nature: "Doğa", wizard_opt_excite_adventure: "Macera",
    wizard_rating_winter: "Kış", wizard_rating_thaw: "Erime", wizard_rating_growth: "Büyüme", wizard_rating_bloom: "Çiçeklenme", wizard_rating_summer: "Yaz",
    history_title: "Geçmiş", history_empty: "Sohbet yok.", history_tab_summary: "Özet", history_tab_transcript: "Metin", history_no_summary: "Özet yok.", history_generating: "Yazıyor...", history_generating_desc: "Arka planda.",
    cv_title: "CV Analiz", cv_subtitle: "CV metnini yapıştır.", cv_placeholder: "Metin...", cv_btn_analyze: "Analiz Et", cv_btn_processing: "İşleniyor...", cv_warning_key: "API Anahtarı gerek.", cv_key_update: "Güncelle", cv_key_required: "Anahtar Gerekli", cv_key_desc: "Güvenlik için.", cv_key_placeholder: "Anahtar...", cv_key_save: "Kaydet", cv_alert_success: "Kaydedildi.", cv_alert_error: "Hata.", cv_btn_manage_key: "API Anahtarı",
    settings_title: "Ayarlar", settings_sect_general: "Genel", settings_sect_appearance: "Görünüm", settings_sect_data: "Veri", settings_length_label: "Uzunluk", settings_theme_label: "Tema", settings_theme_system: "Sistem", settings_theme_light: "Açık", settings_theme_dark: "Koyu", settings_opt_ask: "Sor", settings_opt_short: "Kısa", settings_opt_long: "Uzun", settings_clear_data: "Verileri Sil", settings_clear_data_desc: "Her şeyi siler.", settings_btn_clear: "Temizle"
  },
  wiki: {
    titles: {
      foundation: 'Temeller', job_strategy: 'İş Arama', workplace: 'İş Kültürü', industries: 'Sektörler', life: 'Yaşam',
      identity: 'Kimlik', security: 'Sosyal Güvenlik', market: 'Pazar', tools: 'Araçlar', rights: 'Haklar',
      social: 'Sosyal', norms: 'Kurallar', specialist: 'Uzman', hands_on: 'El İşi', housing: 'Konut',
      family: 'Aile', language: 'Dil',
      social_unemployment: 'İşsizlik Maaşı', social_housing: 'Kira Yardımı', social_pension: 'Emeklilik',
      bureaucracy_dvv: 'DVV & Kimlik No', bureaucracy_migri: 'Göçmenlik', bureaucracy_tax: 'Vergi Kartı',
      job_te_office: 'TE Ofisi', job_portals: 'İş Siteleri', job_entrepreneurship: 'Girişimcilik',
      job_cover_letter: 'Ön Yazı', job_interview: 'Mülakat', job_linkedin: 'LinkedIn', job_recognition: 'Denklik',
      work_contract: 'Sözleşme', work_hours: 'Saatler', work_holidays: 'Tatil',
      culture_meetings: 'Toplantılar', culture_feedback: 'Geri Bildirim', culture_names: 'İsimler',
      prof_engineering: 'Mühendislik', prof_business: 'İşletme',
      housing_contracts: 'Kira Kontratı', family_school: 'Okul'
    },
    articles: {
      'guide_start': { title: 'Finlandiya\'ya Hoş Geldiniz! 🇫🇮', content: `# Hayatta Kalma Rehberi\n\n**Felsefe:**\nFinlandiya güven, sessizlik ve kahve ile çalışır.\n\n### Nasıl Kullanılır\n1. **Oku:** Rehberleri incele.\n2. **Sohbet:** AI'ya sor.\n3. **Profil:** Bilgilerini güncel tut.` },
      'bureaucracy_dvv': { title: 'DVV & Kimlik', content: `# DVV 🆔\n\n**Öncelik: HEMEN**\n\n### Görev\nResmi olarak var olmak. **Kişisel Kimlik Kodu** al.\n\n### Neden?\nBanka, telefon, vergi.` },
      'bureaucracy_migri': { title: 'Migri', content: `# Migri 🛂\n\n### Görev\nOturma İzni.\n\n### İpuçları\n* **Erken Rezervasyon:** Kuyruklar uzun.\n* **Hızlı Yol:** Uzmanlar için.` },
      'bureaucracy_tax': { title: 'Vergi Kartı', content: `# Verokortti 💳\n\n**Kural:** Kartsız = %60 vergi.\n\n### Süreç\n1. **OmaVero**'ya gir.\n2. Geliri tahmin et.\n3. PDF al.\n4. Patrona yolla.` },
      'social_unemployment': { title: 'İşsizlik Maaşı', content: `# İşsiz mi kaldın? 📉\n\n### 1. Kayıt Ol\nİlk gün **TE Ofisi**'ne kaydol.\n\n### 2. Ödeyenler\n* **Kela:** Temel.\n* **Fon:** Gelire dayalı (üyeysen).` },
      'job_market_overview': { title: 'İş Pazarı', content: `# Gizli Pazar 📉\n\n**İşlerin %70-80'i ilan edilmez.**\n\n### Stratejiler\n* **Ağ:** Arkadaşlar.\n* **Doğrudan:** Şirketlere yaz.` },
      'culture_meetings': { title: 'Toplantılar', content: `# Toplantılar 📅\n\n**Etkili & Dakik.**\n\n* **Başlangıç:** Tam vaktinde.\n* **Gündem:** Sadık kal.\n* **Boş laf yok.**` },
      'culture_essentials': { title: 'Değerler', content: `# Güven & Sessizlik 🤫\n\n1. **Güven:** Sözünü tut.\n2. **Sessizlik:** Sessizlikten korkma.` }
    }
  }
};
