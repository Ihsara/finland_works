
import { TranslationResource } from "./types";

export const et: TranslationResource = {
  ui: {
    landing_welcome: "Tere tulemast!", landing_subtitle: "Leia oma tee tööle Soomes", landing_btn_quiz: "Räägi endast", landing_btn_continue: "Ava minu juhend", landing_btn_ask: "Alusta vestlust", landing_btn_browse: "Sirvi juhendit", landing_load_sample: "Laadi näidis", landing_erase: "Kustuta andmed", landing_add_key: "Lisa API võti", landing_choose_lang: "Vali keel",
    dash_greeting: "Tere, {name}!", dash_greeting_guest: "Tere!", dash_subtitle: "Tere tulemast tagasi oma Soome juhendisse.", dash_subtitle_guest: "Loome profiili, et alustada.", dash_btn_guide: "Ava Juhend", dash_btn_browse: "Sirvi Juhendit", dash_btn_ask: "Küsi tehisintellektilt", dash_btn_history: "Ajalugu", dash_btn_cv: "Impordi CV", dash_switch_profile: "Vaheta", dash_new_profile: "Uus", dash_edit_profile: "Muuda", dash_profile_overview: "Profiil",
    dash_education: "Haridus", dash_profession: "Amet", dash_languages: "Keeled", dash_narrative_aspirations: "Eesmärgid", dash_narrative_challenges: "Väljakutsed",
    chat_placeholder: "Küsi midagi...", chat_end_session: "Lõpeta", chat_header_assistant: "Assistent", chat_prompt_context_inquiry: "Räägi rohkem sellest: \"{sentence}\"", chat_ask_length: "Lühike või pikk vastus?",
    btn_back_dashboard: "Tagasi", btn_save: "Salvesta",
    profile_btn_guide: "Minu Juhend", profile_btn_guide_desc: "Soovitatud artiklid", profile_btn_plan: "Minu Plaan", profile_btn_plan_desc: "Tulekul", profile_sect_languages: "Keeled", profile_sect_skills: "Oskused", profile_sect_narrative: "Lugu", profile_label_aspirations: "Eesmärgid", profile_label_challenges: "Hirmud / Väljakutsed", profile_label_education: "Haridus", profile_label_profession: "Amet", profile_completeness: "{percentage}% valmis", profile_completeness_hint: "Vasta veel paarile küsimusele", profile_btn_update: "Uuenda profiili", profile_btn_continue: "Jätka",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Koostatud: {name}", wiki_explore_cats: "Sirvi kategooriaid", wiki_explore_subtitle: "Vali teema detailideks.", wiki_full_index: "Indeks", wiki_full_index_subtitle: "Sirvi kõike.", wiki_nav_list: "Nimekiri", wiki_nav_icons: "Ikoonid", wiki_section_chapters: "Peatükid", wiki_btn_mark_done: "Tehtud", wiki_btn_later: "Hiljem", wiki_btn_saved: "Salvestatud", wiki_btn_completed: "Valmis", wiki_ctx_ask: "Küsi selle kohta", wiki_topic_label: "Teema: {tag}", wiki_topic_desc: "Ülevaade & Artiklid", wiki_guide_prefix: "JUHEND", wiki_stat_articles: "artiklit", wiki_stat_complete: "valmis", wiki_section_prefix: "Osa",
    wizard_header_quiz: "Küsimustik", wizard_greeting_short: "Tere, {name}!", wizard_title_init: "Loo profiil", wizard_title_custom: "{name} Loomine", wizard_phase_identity: "FAAS 1: IDENTITEET", wizard_phase_demo: "FAAS 2: TAUST", wizard_phase_status: "FAAS 3: STAATUS", wizard_phase_skills: "FAAS 4: OSKUSED", wizard_phase_mindset: "FAAS 5: MÕTTEVIIS", wizard_phase_vision: "FAAS 6: VISIOON", wizard_nickname_hint: "* Võid kasutada hüüdnime.", wizard_btn_ask: "Küsi", wizard_btn_next: "Edasi", wizard_btn_prev: "Tagasi", wizard_btn_submit: "Valmis", wizard_btn_finish_early: "Salvesta & Lõpeta", wizard_btn_generate_name: "Genereeri nimi", wizard_ribbon_greeting: "Meeldiv tutvuda, {name}!", wizard_title_name: "Mis on sinu nimi?", wizard_desc_name: "Sisesta nimi või vali hüüdnimi", wizard_placeholder_name: "Sinu nimi",
    wizard_step2_title: "Kui vana sa oled?", wizard_step2_desc: "Vali vanusegrupp", wizard_step2_placeholder: "Vanus (nt 29)",
    wizard_step3_title: "Perekonnaseis?",
    wizard_marital_solo_title: "Üksinda", wizard_marital_solo_desc: "Pole kaaslast ega lapsi kaasas", wizard_marital_pair_title: "Perega", wizard_marital_pair_desc: "Kaaslane või lapsed", wizard_marital_secret_title: "Saladus", wizard_marital_secret_desc: "Keeruline / Ei avalda",
    wizard_children_title: "Kas sul on lapsi?", wizard_children_desc: "See aitab meil nõustada koolide ja lasteaedade osas.", wizard_children_yes: "Jah", wizard_children_no: "Ei", wizard_family_details_title: "Räägi oma perest", wizard_family_count_label: "Mitu last?", wizard_family_ages_label: "Mis vanuses?", wizard_family_ages_hint: "Vali kõik sobivad.", wizard_age_group_0_6: "Lasteaed (0-6)", wizard_age_group_7_12: "Kool (7-12)", wizard_age_group_13_17: "Teismelised (13-17)", wizard_age_group_18: "Täiskasvanud (18+)",
    wizard_step4_title: "Kust sa pärit oled?", wizard_step4_desc: "Vali päritolu", wizard_step4_placeholder: "Trüki riigi nimi...", wizard_step4_no_match: "Ei leitud", wizard_btn_search_country: "Otsi riiki", wizard_btn_select_region: "Vali regioon", wizard_region_europe: "Euroopa", wizard_region_americas: "Ameerika", wizard_region_asia: "Aasia", wizard_region_africa: "Aafrika", wizard_region_oceania: "Okeaania", wizard_region_middle_east: "Lähis-Ida", wizard_eu_question: "EL kodanik?", wizard_eu_yes: "Jah", wizard_eu_no: "Ei",
    wizard_step5_title: "Tööõigus & Luba", wizard_permit_full_title: "Piiramatu", wizard_permit_full_desc: "Püsiv, Pere, EL või Soome kraad", wizard_permit_restricted_title: "Piiratud", wizard_permit_restricted_desc: "Tööluba seotud tööandjaga", wizard_permit_student_title: "Tudeng", wizard_permit_student_desc: "Piiratud töötunnid",
    wizard_step6_title: "Haridustase", wizard_step6_desc: "Mis kirjeldab sind parimini?", wizard_step6_field_label: "Eriala (Valikuline)", wizard_step6_field_placeholder: "nt Insener", wizard_edu_general_title: "Üldharidus", wizard_edu_general_desc: "Keskkool. Kutset pole.", wizard_edu_applied_title: "Kutseharidus", wizard_edu_applied_desc: "Ametikool või Rakenduskõrgkool.", wizard_edu_uni_title: "Ülikool", wizard_edu_uni_desc: "Akadeemiline kraad.",
    wizard_step7_title: "Mis on sinu amet?", wizard_step7_desc: "Või mis tööd otsid?", wizard_step7_placeholder: "nt Keevitaja, Kokk",
    wizard_step8_title: "Soome keel", wizard_lbl_finnish_level: "Tase", wizard_lbl_finnish_motivation: "Motivatsioon", wizard_opt_lang_none: "Puudub", wizard_opt_lang_basics: "Algteadmised (A1)", wizard_opt_lang_inter: "Kesktase (A2-B1)", wizard_opt_lang_fluent: "Sujuv (B2+)", wizard_scale_1_motivation: "Uudishimulik", wizard_scale_5_motivation: "Pidamatu",
    wizard_step9_title: "Inglise keel", wizard_opt_lang_en_none: "Puudub", wizard_opt_lang_en_basic: "Algeline", wizard_opt_lang_en_working: "Töökeel", wizard_opt_lang_en_fluent: "Sujuv",
    wizard_step10_title: "Visioon", wizard_step10_aspirations_label: "Eesmärgid", wizard_step10_aspirations_placeholder: "Mida soovid saavutada?", wizard_step10_challenges_label: "Väljakutsed", wizard_step10_challenges_placeholder: "Mis teeb muret?",
    wizard_step12_title: "Kuidas Soome kultuur tundub?", wizard_opt_cult_low: "Müsteerium", wizard_opt_cult_med: "Vaatlen rõõmuga", wizard_opt_cult_high: "Sukeldun sügavale",
    wizard_step13_title: "Kuidas elurütm tundub?", wizard_scale_1_life: "Alles harjun", wizard_scale_5_life: "Nagu kodus",
    wizard_step14_title: "Kui kindel oled tööotsingutes?", wizard_scale_1_career: "Vajan suunda", wizard_scale_5_career: "Plaan olemas",
    wizard_step15_title: "Kui selge on tulevik?", wizard_opt_info_none: "Udune", wizard_opt_info_some: "Selgineb", wizard_opt_info_high: "Kristallselge",
    wizard_step16_title: "Mis toob rõõmu?", wizard_opt_excite_career: "Karjäär", wizard_opt_excite_life: "Rahu ja turvalisus", wizard_opt_excite_nature: "Loodus", wizard_opt_excite_adventure: "Seiklus",
    wizard_rating_winter: "Talv", wizard_rating_thaw: "Sula", wizard_rating_growth: "Kasv", wizard_rating_bloom: "Õitseng", wizard_rating_summer: "Suvi",
    history_title: "Ajalugu", history_empty: "Vestlusi pole.", history_tab_summary: "Kokkuvõte", history_tab_transcript: "Täistekst", history_no_summary: "Kokkuvõte puudub.", history_generating: "AI kirjutab...", history_generating_desc: "Toimub taustal.",
    cv_title: "Analüüsi CV-d", cv_subtitle: "Kleebi CV tekst profiili täitmiseks.", cv_placeholder: "Kleebi CV siia...", cv_btn_analyze: "Analüüsi", cv_btn_processing: "Töötlen...", cv_warning_key: "Vajalik API võti.", cv_key_update: "Uuenda võtit", cv_key_required: "Võti puudu", cv_key_desc: "Privaatsuse tagamiseks kasuta oma võtit.", cv_key_placeholder: "Kleebi võti...", cv_key_save: "Salvesta", cv_alert_success: "Salvestatud.", cv_alert_error: "Viga.", cv_btn_manage_key: "API Võti",
    settings_title: "Seaded", settings_sect_general: "Üldine", settings_sect_appearance: "Välimus", settings_sect_data: "Andmed", settings_length_label: "Vastuse pikkus", settings_theme_label: "Teema", settings_theme_system: "Süsteem", settings_theme_light: "Hele", settings_theme_dark: "Tume", settings_opt_ask: "Küsi alati", settings_opt_short: "Lühike", settings_opt_long: "Pikk", settings_clear_data: "Kustuta andmed", settings_clear_data_desc: "Kustutab kõik.", settings_btn_clear: "Kustuta kõik"
  },
  wiki: {
    titles: {
      foundation: 'Põhitõed', job_strategy: 'Tööotsing', workplace: 'Töökultuur', industries: 'Tööstusharud', life: 'Elu & Tasakaal',
      identity: 'Identiteet', security: 'Sotsiaalkaitse', market: 'Turg', tools: 'Tööriistad', rights: 'Õigused',
      social: 'Sotsiaalne', norms: 'Normid', specialist: 'Spetsialist', hands_on: 'Oskustöö', housing: 'Eluase',
      family: 'Pere', language: 'Keel',
      social_unemployment: 'Töötuskindlustus', social_housing: 'Eluasemetoetus', social_pension: 'Pension',
      bureaucracy_dvv: 'DVV & Isikukood', bureaucracy_migri: 'Migri', bureaucracy_tax: 'Maksukaart',
      job_te_office: 'TE-büroo', job_portals: 'Tööportaalid', job_entrepreneurship: 'Ettevõtlus',
      job_cover_letter: 'Kaaskiri', job_interview: 'Intervjuu', job_linkedin: 'LinkedIn', job_recognition: 'Kraadide tunnustamine',
      work_contract: 'Tööleping', work_hours: 'Tööaeg', work_holidays: 'Puhkus',
      culture_meetings: 'Koosolekud', culture_feedback: 'Tagasiside', culture_names: 'Sina-vorm',
      prof_engineering: 'Inseneeria', prof_business: 'Äri',
      housing_contracts: 'Üürileping', family_school: 'Koolisüsteem'
    },
    articles: {
      'guide_start': { title: 'Tere tulemast Soome! 🇫🇮', content: `# Ellujäämisjuhend\n\n**Filosoofia:**\nSoome toimib usaldusel, vaikusel ja kohvil.\n\n### Kuidas kasutada\n1. **Loe:** Sirvi juhendeid.\n2. **Vestle:** Küsi AI-lt.\n3. **Profiil:** Hoia andmed värsked.` },
      'bureaucracy_dvv': { title: 'DVV & Isikukood', content: `# DVV 🆔\n\n**Prioriteet: KOHE**\n\n### Missioon\nEksisteerida ametlikult. Saad **isikukoodi**.\n\n### Milleks?\nPangakonto, telefon, maksukaart.` },
      'bureaucracy_migri': { title: 'Migri', content: `# Migri 🛂\n\n### Missioon\nElamisluba.\n\n### Vihjed\n* **Broneeri aegsasti:** Järjekorrad on pikad.\n* **Kiirrada:** Spetsialistidele.` },
      'bureaucracy_tax': { title: 'Maksukaart', content: `# Verokortti 💳\n\n**Reegel:** Ilma kaardita tulumaks 60%.\n\n### Protsess\n1. Logi sisse **OmaVero**.\n2. Hinda tulu.\n3. Saada tööandjale.` },
      'social_unemployment': { title: 'Töötushüvitis', content: `# Töötu? 📉\n\n### 1. Registreeri kohe\nRegistreeri **TE-büroos** esimesel päeval.\n\n### 2. Maksjad\n* **Kela:** Põhiraha.\n* **Kassa:** Sissetulekupõhine (kui oled liige).` },
      'job_market_overview': { title: 'Tööturg', content: `# Peidetud turg 📉\n\n**70-80% töökohtadest pole avalikud.**\n\n### Strateegiad\n* **Võrgustik:** Sõbrad ja tuttavad.\n* **Otsekontakt:** Kirjuta firmadele.` },
      'culture_meetings': { title: 'Koosolekud', content: `# Koosolekud 📅\n\n**Efektiivsed & Täpsed.**\n\n* **Algus:** Täpselt õigel ajal.\n* **Päevakava:** Püsi teemas.\n* **Ei mingit tühja juttu.**` },
      'culture_essentials': { title: 'Väärtused', content: `# Usaldus & Vaikus 🤫\n\n1. **Usaldus:** Tee, mida lubad.\n2. **Vaikus:** Ära karda vaikust.` }
    }
  }
};
