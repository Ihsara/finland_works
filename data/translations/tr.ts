
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
    settings_title: "Ayarlar", settings_sect_general: "Genel", settings_sect_appearance: "Görünüm", settings_sect_data: "Veri", settings_length_label: "Uzunluk", settings_theme_label: "Tema", settings_theme_system: "Sistem", settings_theme_light: "Açık", settings_theme_dark: "Koyu", settings_opt_ask: "Sor", settings_opt_short: "Kısa", settings_opt_long: "Uzun", settings_clear_data: "Verileri Sil", settings_clear_data_desc: "Her şeyi siler.", settings_btn_clear: "Temizle",
    net_intro: "Ağ oluşturmaya hoş geldiniz. Yolunuzu seçin.",
    net_header: "Bugün neye odaklanalım?",
    net_opt_design: "Tasarım Topluluğu",
    net_opt_linkedin: "LinkedIn Stratejisi",
    net_opt_hobbies: "Hobiler & Aktiviteler",
    net_opt_parents: "Ebeveynler için Ağ",
    net_opt_introvert: "İçe Dönükler için İpuçları",
    feedback_action: "Geri Bildirim",
    net_intro_deep: 'Ağ Kurmak Neden Önemli', net_design: 'Tasarım Topluluğu', net_parents: 'Ebeveynler için Ağ', net_introvert: 'Düşük Baskılı Ağ', net_hobbies: 'Hobi ile Ağ Kurma', net_plan: 'Eylem Planın',
    net_cold_msg: 'Soğuk Mesaj Sanatı', net_places: 'Ağ Mekanları', net_prof_style: 'Fin Profesyonel Tarzı',
    net_hackathons: 'Hackathonlar & Junction', net_slush: 'Slush: Anti-Konferans', net_school: 'Okulda Ağ Kurma',

    // Gamified Planner
    quest_level: "Seviye {level} Kaşif",
    quest_xp: "{current}/{max} XP sonraki seviyeye",
    quest_tab_board: "Kariyer Yolculuğu",
    quest_tab_achievements: "Başarılar",
    quest_tab_life: "Yaşam & Refah",
    quest_priority_title: "Öncelikli Görevler",
    quest_priority_subtitle: "Sonrası için kaydedilenler",
    quest_empty_priority: "Öncelikli görev yok. İyi iş!",
    quest_empty_log: "Henüz başarı yok. Yolculuğuna başla!",
    quest_btn_mark_done: "Tamamlandı İşaretle",
    quest_btn_read: "Rehberi Oku",
    quest_achievement_unlocked: "Başarı Kilidi Açıldı!",
    quest_fun_fact_title: "Biliyor muydunuz?",
    quest_btn_unlock: "Kilidi Aç & Oku",
    quest_locked_msg: "Bir sırrı açmak için dokun!",
    
    // New Rubric Labels
    plan_track_career: "Kariyer Yolu",
    plan_track_life: "Kuzey Yaşamı",
    plan_step_completed: "Tamamlandı",
    plan_step_locked: "Kilitli",
    plan_step_available: "Mevcut",
    plan_btn_return: "Plana Dön"
  },
  wiki: {
    titles: {
      foundation: 'Temeller', job_strategy: 'İş Arama', workplace: 'İş Kültürü', industries: 'Sektörler', life: 'Yaşam',
      identity: 'Kimlik', security: 'Sosyal Güvenlik', market: 'Pazar', tools: 'Araçlar', rights: 'Haklar', networking: 'Ağ Oluşturma & Gizli Pazar',
      social: 'Sosyal', norms: 'Kurallar', specialist: 'Uzman', hands_on: 'El İşi', housing: 'Konut',
      family: 'Aile', language: 'Dil',
      social_unemployment: 'İşsizlik Maaşı', social_housing: 'Kira Yardımı', social_pension: 'Emeklilik', social_kela_card: 'Kela Kartı', social_health: 'Sağlık Hizmetleri',
      bureaucracy_dvv: 'DVV & Kimlik No', bureaucracy_migri: 'Göçmenlik', bureaucracy_tax: 'Vergi Kartı', bureaucracy_bank: 'Banka Hesabı',
      job_te_office: 'TE Ofisi', job_portals: 'İş Siteleri', job_entrepreneurship: 'Girişimcilik', job_networking: 'Ağ Oluşturma',
      job_cover_letter: 'Ön Yazı', job_interview: 'Mülakat', net_linkedin: 'LinkedIn', job_recognition: 'Denklik', job_cv_tips: 'Finlandiya CV',
      work_contract: 'Sözleşme', work_hours: 'Saatler', work_holidays: 'Tatil', work_unions: 'Sendikalar', work_probation: 'Deneme Süresi',
      culture_meetings: 'Toplantılar', culture_feedback: 'Geri Bildirim', culture_names: 'İsimler', culture_punctuality: 'Dakiklik', culture_coffee: 'Kahve Molaları',
      culture_afterwork: 'İş Çıkışı', culture_sauna: 'Sauna', culture_smalltalk: 'Sessizlik', culture_party: 'Ofis Partileri',
      prof_engineering: 'Mühendislik', prof_business: 'İşletme', prof_it: 'Bilişim', prof_health: 'Sağlık', prof_service: 'Hizmet',
      housing_contracts: 'Kira Kontratı', housing_finding: 'Ev Bulma', housing_utilities: 'Faturalar', housing_recycling: 'Geri Dönüşüm', housing_sauna: 'Çamaşır & Sauna',
      family_school: 'Okul', family_daycare: 'Kreş', family_activities: 'Hobiler', family_winter: 'Çocuklar & Kış', family_safety: 'Güvenlik',
      net_culture: 'Fin Yolu', net_linkedin_strat: 'LinkedIn Stratejisi', net_hidden: 'Gizli Pazar', net_volunteering: 'Gönüllülük'
    },
    articles: {
      'guide_start': { 
        title: 'Finlandiya\'ya Hoş Geldiniz! 🇫🇮', 
        summary: 'Finlandiya güven, sessizlik ve kahve ile çalışır.', 
        content: `# Hayatta Kalma Rehberi\n\n**Felsefe:**\nFinlandiya güven, sessizlik ve kahve ile çalışır.\n\n### Nasıl Kullanılır\n1. **Oku:** Rehberleri incele.\n2. **Sohbet:** AI'ya sor.\n3. **Profil:** Bilgilerini güncel tut.` 
      },
      'net_culture': {
        title: 'Ağ Kurma: Fin Yolu',
        summary: 'Finler birlikte bir şeyler yaparak bağ kurar, boş konuşarak değil. Güven her şeydir.',
        content: `### "Talkoot" Ruhu\nFinlandiya'da ağ kurmak kokteyl partilerinde kartvizit dağıtmak değildir. **Birlikte çalışmaktır**.\n\n* **Gönüllülük:** Bir etkinliğin (Slush, yerel festivaller) ekibine katılın. Bir Fin ile yan yana çalıştığınızda güven inşa edersiniz. Güven, iş tavsiyelerine yol açar.\n* **Dernekler:** Finlandiya'da her şey için bir dernek (yhdistys) vardır. Mesleğiniz için olanı bulun.`
      },
      'net_intro_deep': {
        title: 'Ağ Kurmak Neden Önemli',
        summary: 'Çoğu iş gizlidir. Ağ kurmak bunları açmanın anahtarıdır.',
        content: `# Gizli İş Pazarı\n\nFinlandiya'da **güven** büyük bir rol oynar. İşverenler size kimin kefil olabileceğini bilmek ister. Bu nedenle, birçok iş asla iş portallarına düşmez.\n\nGizli iş pazarı, Finlandiya'daki açık iş pozisyonlarının **yüzde 70-80'ini** barındırır.`
      },
      'net_linkedin': {
        title: 'LinkedIn Stratejisi',
        summary: 'LinkedIn, Finlandiya\'daki işe alım uzmanları için ana arama motorudur.',
        content: `### Dijital Yüzünüz\n* **Anahtar Kelimeler:** İşe alımcılar becerileri arar, unvanları değil. Başlığınızda "Java", "Proje Yönetimi" kullanın.\n* **Konum:** Finlandiya olarak ayarlayın. Yurtdışındaysanız "Helsinki" olarak değiştirin (ve "Hakkında" bölümünde taşınacağınızı belirtin) ki yerel aramalarda çıkın.\n* **Open to Work:** Yeşil banner burada kültürel olarak kabul görür ve motivasyonu gösterir.`
      },
      'net_hidden': {
        title: 'Gizli Pazarı Hacklemek',
        summary: 'İşlerin %70-80\'i ilan edilmez. Onları bulmalısınız.',
        content: `### Piilotyöpaikat (Gizli İşler)\nŞirketler genellikle ilan vermez çünkü işe alım pahalı ve yavaştır.\n\n1. **Şirket Haritası:** Sevdiğiniz 20 şirketin listesini yapın. Henüz "Açık Pozisyonlar" sayfasına bakmayın.\n2. **Açık Başvuru (Avoin hakemus):** Takım Liderine doğrudan e-posta gönderin (İK'ya değil). "X üzerindeki çalışmalarınızı takip ediyorum. Y becerilerine sahibim. 15 dakikalık bir kahve içebilir miyiz?"\n3. **Bilgi Mülakatları:** İnsanlara işleri hakkında soru sorun, iş *istemeyin*.`
      },
      'net_volunteering': {
        title: 'Gönüllülük',
        summary: 'Entegre olmanın ve becerileri kanıtlamanın en hızlı yolu.',
        content: `### Neden Gönüllülük?\n1. **Dil:** Fince pratiği için düşük baskılı bir ortam.\n2. **Referanslar:** İş ahlakınızı doğrulayabilecek yerel bir referans kazanırsınız.\n3. **Ağ:** Aktif insanlarla tanışırsınız.\n\n### Nerede?\nKızıl Haç, startup etkinlikleri, spor kulüpleri, kütüphaneler.`
      },
      'net_school': {
        title: 'Okurken Ağ Kurmak',
        summary: 'Okul, Finlandiya\'daki ilk profesyonel ağınızdır.',
        content: `# Öğrenci Avantajı\n\nFinlandiya'da okumak, ağ kurmanın tartışmasız en iyi yoludur. Sınıf arkadaşlarınız gelecekteki meslektaşlarınızdır.\n\n### Strateji\nHer staj gününü bir iş görüşmesi gibi değerlendirin.`
      },
      'net_hackathons': {
        title: 'Hackathonlar ve Etkinlikler',
        summary: 'Junction ve Slush altın fırsatlardır.',
        content: `# Teknoloji Etkinlikleri\n\n* **Junction:** Avrupa'nın önde gelen hackathon'u.\n* **Slush:** Startup etkinliği. Burada gönüllü olmak kapıları açar.`
      },
      'net_slush': {
        title: 'Slush ve Girişimler',
        summary: 'Slush\'ta gönüllü olmak çevreye girmenin efsanevi bir yoludur.',
        content: `# Slush\n\nKasım ayında Helsinki'de düzenlenir. Karanlık, gürültülü ve lazerlerle doludur.`
      },
      'net_cold_msg': {
        title: 'Soğuk Mesaj Sanatı',
        summary: 'İnsanlara rahatsız etmeden nasıl yaklaşılır.',
        content: `# Yabancılara Yaklaşmak\n\nFinler meşguldür ama yardımseverdir. Kısa tutun.`
      },
      'net_parents': {
        title: 'Ebeveynler için Ağ',
        summary: 'Bağlantı kurmak için günlük ritminizi kullanın.',
        content: `# Meşgul Ebeveynler için Ağ\n\n* **Oyun Parkı Diplomasisi:** Aynı saatte aynı parka giderseniz, aynı ebeveynleri görürsünüz.\n* **Kreş Etkinlikleri:** "Talkoot" (gönüllü temizlik günü) etkinliklerine katılın. Büyük saygı kazanırsınız.`
      },
      'net_introvert': {
        title: 'Düşük Baskılı Ağ',
        summary: 'Gürültülü olmanıza gerek yok.',
        content: `# Kendi Tarzınızda\n\n1. **Bire Bir:** Finler derin sohbeti tercih eder.\n2. **Çevrimiçi Topluluklar:** Discord veya Slack gruplarına katılın.`
      },
      'net_hobbies': {
        title: 'Hobiler ve Yumuşak Ağ',
        summary: 'İnsanlarla doğal bir şekilde tanışmak için yerel aktivitelere katılın.',
        content: `# Doğal Olarak Tanışın\n\nFinler paylaşılan aktiviteler üzerinden bağ kurar.\n\n* **Kansalaisopisto:** Ucuz bir kurs alın.\n* **Spor:** Yeni başlayanlar grubuna katılmak anında bir sosyal çevre yaratır.`
      },
      'bureaucracy_dvv': { title: 'DVV & Kimlik', summary: 'Resmi olarak var olmak için Kişisel Kimlik Kodu alın.', content: `# DVV 🆔\n\n**Öncelik: HEMEN**\n\n### Görev\nResmi olarak var olmak. **Kişisel Kimlik Kodu** al.\n\n### Neden?\nBanka, telefon, vergi.` },
      'bureaucracy_migri': { title: 'Migri', summary: 'Oturma İzni ve randevu ipuçları.', content: `# Migri 🛂\n\n### Görev\nOturma İzni.\n\n### İpuçları\n* **Erken Rezervasyon:** Kuyruklar uzun.\n* **Hızlı Yol:** Uzmanlar için.` },
      'bureaucracy_tax': { title: 'Vergi Kartı', summary: 'Vergi kartı olmadan vergi oranı %60\'tır.', content: `# Verokortti 💳\n\n**Kural:** Kartsız = %60 vergi.\n\n### Süreç\n1. **OmaVero**'ya gir.\n2. Geliri tahmin et.\n3. PDF al.\n4. Patrona yolla.` },
      'social_unemployment': { title: 'İşsizlik Maaşı', summary: 'İşsizliğin ilk gününde TE Ofisi\'ne kaydolun.', content: `# İşsiz mi kaldın? 📉\n\n### 1. Kayıt Ol\nİlk gün **TE Ofisi**'ne kaydol.\n\n### 2. Ödeyenler\n* **Kela:** Temel.\n* **Fon:** Gelire dayalı (üyeysen).` },
      'social_housing': { title: 'Kira Yardımı', summary: 'Düşük gelirli haneler için Kela desteği.', content: `# Asumistuki 🏠\n\nGelir düşükse Kela kiranın bir kısmını öder.` },
      'social_pension': { title: 'Emeklilik', summary: 'Gelire dayalı biriken maaş.', content: `# Emeklilik 👴\n\nÇalıştıkça birikir. AB içinde taşınabilir.` },
      'social_kela_card': { title: 'Kela Kartı', summary: 'Ulusal sağlık sigortası kanıtı.', content: `# Kela Kartı 🏥\n\nEczanede indirim için gösterin.` },
      'social_health': { title: 'Sağlık', summary: 'Ucuz ama sıralı. İş sağlığını kullanın.', content: `# Sağlık ⚕️\n\n1. **Kamu:** Herkes için.\n2. **İş:** Çalışanlar için (Hızlı).` },
      'job_market_overview': { title: 'İş Pazarı', summary: 'İşlerin %70-80\'i ilan edilmez.', content: `# Gizli Pazar 📉\n\n**İşlerin %70-80'i ilan edilmez.**\n\n### Stratejiler\n* **Ağ:** Arkadaşlar.\n* **Doğrudan:** Şirketlere yaz.` },
      'job_te_office': { title: 'TE Ofisi', summary: 'İşsizlik maaşı için zorunlu.', content: `# TE-toimisto 🏢\n\nKayıt ol, dil kursu ve maaş al.` },
      'job_portals': { title: 'İş Siteleri', summary: 'LinkedIn ve Oikotie ana siteler.', content: `# Nerede aranır 🔍\n\n* **LinkedIn:** Beyaz yaka.\n* **Oikotie:** Her şey.\n* **The Hub:** Girişimler.` },
      'job_entrepreneurship': { title: 'Girişimcilik', summary: 'Şirket kurmak kolaydır. Destek parası var.', content: `# Starttiraha 🚀\n\nYeni girişimciler için 6-12 ay destek.` },
      'job_networking': { title: 'Ağ Kurma', summary: 'Doğrudan ve işlevsel olun.', content: `# Networking 🤝\n\nFinler net hedefleri sever. Gönüllülük harikadır.` },
      'job_cover_letter': { title: 'Ön Yazı', summary: 'Kısa ve "neden" odaklı.', content: `# Cover Letter 📝\n\nMaksimum 1 sayfa. Şirkete ne katacağına odaklan.` },
      'job_interview': { title: 'Mülakat', summary: 'Dürüstlük çok önemli.', content: `# Mülakat 👔\n\nBilmiyorsan söyle. Sessizlik kabul edilebilir.` },
      'job_recognition': { title: 'Denklik', summary: 'Doktor ve öğretmenler için şart.', content: `# Valvira & OPH 🎓\n\nDüzenlenmiş meslekler için onay gerekir.` },
      'job_cv_tips': { title: 'Finlandiya CV', summary: 'Basit, fotoğraflı, maks 2 sayfa.', content: `# CV 📄\n\nFotoğraf ekle. Madde işareti kullan. Kısa tut.` },
      'work_contract': { title: 'Sözleşme', summary: 'Her zaman yazılı.', content: `# Sözleşme ✍️\n\nTES (Toplu Sözleşme) kontrol et. Asgari maaşı o belirler.` },
      'work_hours': { title: 'Saatler', summary: 'Haftada 37.5 saat.', content: `# Saatler ⏰\n\n8-16 arası standarttır. Boş zamana saygı duyulur.` },
      'work_holidays': { title: 'Tatil', summary: 'Yılda 4-5 hafta.', content: `# Tatil ☀️\n\nTemmuz kutsaldır. Her yer durur.` },
      'work_unions': { title: 'Sendikalar', summary: 'Katılmanız önerilir.', content: `# Sendika (Liitto) 🛡️\n\nYasal koruma ve daha iyi işsizlik fonu sağlar.` },
      'work_probation': { title: 'Deneme Süresi', summary: '4-6 ay.', content: `# Koeaika ⏳\n\nİki taraf da anında feshedebilir.` },
      'culture_meetings': { title: 'Toplantılar', summary: 'Toplantılar etkili ve dakiktir.', content: `# Toplantılar 📅\n\n**Etkili & Dakik.**\n\n* **Başlangıç:** Tam vaktinde.\n* **Gündem:** Sadık kal.\n* **Boş laf yok.**` },
      'culture_feedback': { title: 'Geri Bildirim', summary: 'Doğrudan ve dürüst.', content: `# Geri Bildirim 🗣️\n\nFinler doğrudandır. Kişisel algılama.` },
      'culture_names': { title: 'İsimler', summary: 'Herkes için ön ad.', content: `# Resmiyet Yok 👋\n\nPatron dahil herkese ismiyle hitap et.` },
      'culture_punctuality': { title: 'Dakiklik', summary: 'Zaman kutsaldır.', content: `# Dakiklik ⌚\n\nGeç kalma. 5 dakika geciksen bile haber ver.` },
      'culture_coffee': { title: 'Kahve', summary: 'Sosyal ritüel.', content: `# Kahvitauko ☕\n\nEkiple git, su içsen bile. Sosyalleşme yeridir.` },
      'culture_afterwork': { title: 'İş Çıkışı', summary: 'Cuma rahatlaması.', content: `# AW 🍻\n\nİsteğe bağlı. Alkollü veya alkolsüz.` },
      'culture_sauna': { title: 'Sauna', summary: 'Eşitlik yeri.', content: `# Sauna 🧖\n\nİş konuşulur, rahatlanır. Çıplaklık yaygındır.` },
      'culture_smalltalk': { title: 'Sessizlik', summary: 'Sessizliği kabullen.', content: `# Sessizlik 🤫\n\nKonuşmak zorunda değilsin. Sessizlik rahattır.` },
      'culture_party': { title: 'Pikkujoulut', summary: 'Çılgın Noel partisi.', content: `# Pikkujoulut 🎄\n\nŞirket partisi. Her şey olabilir.` },
      'prof_engineering': { title: 'Mühendislik', summary: 'Yüksek talep, İngilizce yaygın.', content: `# Mühendislik ⚙️\n\nBüyük şirketler İngilizce kullanır. Veriye dayalı.` },
      'prof_business': { title: 'İşletme', summary: 'Fince genellikle gerekli.', content: `# İşletme 💼\n\nUluslararası satış veya startup odaklan.` },
      'prof_it': { title: 'Bilişim', summary: 'İngilizce için en iyi alan.', content: `# IT 💻\n\nİngilizce standarttır. Hiyerarşi az.` },
      'prof_health': { title: 'Sağlık', summary: 'Fince zorunlu.', content: `# Sağlık ⚕️\n\nValvira izni ve akıcı dil şart.` },
      'prof_service': { title: 'Hizmet', summary: 'Yaygın giriş noktası.', content: `# Hizmet 🧹\n\nRestoran ve temizlik. PAM sendikası önemlidir.` },
      'housing_contracts': { title: 'Kira', summary: '2 ay depozito.', content: `# Kontrat 🏠\n\nEv sigortası zorunlu. 1 ay ihbar süresi.` },
      'housing_finding': { title: 'Ev Bulma', summary: 'Hızlı ol.', content: `# Arama 🔎\n\nOikotie.fi. Profilin hazır olsun, hemen karar ver.` },
      'housing_utilities': { title: 'Faturalar', summary: 'Elektrik ayrı.', content: `# Faturalar ⚡\n\nElektrik kontratı yap. İnternet bazen dahildir.` },
      'housing_recycling': { title: 'Geri Dönüşüm', summary: 'Ciddiye al.', content: `# Geri Dönüşüm ♻️\n\nHer şeyi ayır. Şişeler para eder (Pantti).` },
      'housing_sauna': { title: 'Çamaşır & Sauna', summary: 'Ortak kullanım.', content: `# Ortak 🧺\n\nListeden sıra al.` },
      'family_school': { title: 'Okul', summary: 'Ücretsiz ve harika.', content: `# Okul 🎒\n\n7 yaşında başlar. Yemek ücretsiz.` },
      'family_daycare': { title: 'Kreş', summary: 'Herkesin hakkı.', content: `# Päiväkoti 🧸\n\nUcuz ve kaliteli. Erken başvur.` },
      'family_activities': { title: 'Aktiviteler', summary: 'Hobiler önemlidir.', content: `# Hobiler ⚽\n\nKütüphane ve spor çok erişilebilir.` },
      'family_winter': { title: 'Kış', summary: 'İyi giyin.', content: `# Soğuk ❄️\n\nKat kat giyin. Reflektör zorunlu.` },
      'family_safety': { title: 'Güvenlik', summary: 'Çok güvenli.', content: `# Güvenlik 🚲\n\nÇocuklar tek başına gezer. Normaldir.` },
      'culture_essentials': { title: 'Değerler', summary: 'Güven ve sessizlik temel değerlerdir.', content: `# Güven & Sessizlik 🤫\n\n1. **Güven:** Sözünü tut.\n2. **Sessizlik:** Sessizlikten korkma.` }
    }
  }
};
