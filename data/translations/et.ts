
import { TranslationResource } from "./types";

export const et: TranslationResource = {
  ui: {
    landing_welcome: "Tere tulemast!", landing_subtitle: "Leia oma tee tööle Soomes", landing_btn_quiz: "Räägi endast", landing_btn_continue: "Ava minu juhend", landing_btn_ask: "Alusta vestlust", landing_btn_browse: "Sirvi juhendit", landing_load_sample: "Laadi näidis", landing_erase: "Kustuta andmed", landing_add_key: "Lisa API võti", landing_choose_lang: "Vali keel",
    dash_greeting: "Tere, {name}!", dash_greeting_guest: "Tere!", dash_subtitle: "Tere tulemast tagasi oma Soome juhendisse.", dash_subtitle_guest: "Loome profiili, et alustada.", dash_btn_guide: "Ava Juhend", dash_btn_browse: "Sirvi Juhendit", dash_btn_ask: "Küsi tehisintellektilt", dash_btn_history: "Ajalugu", dash_btn_cv: "Impordi CV", dash_switch_profile: "Vaheta", dash_new_profile: "Uus", dash_edit_profile: "Muuda", dash_profile_overview: "Profiil",
    dash_education: "Haridus", dash_profession: "Amet", dash_languages: "Keeled", dash_narrative_aspirations: "Eesmärgid", dash_narrative_challenges: "Väljakutsed",
    chat_placeholder: "Küsi midagi...", chat_end_session: "Lõpeta", chat_header_assistant: "Assistent", chat_prompt_context_inquiry: "Räägi rohkem sellest: \"{sentence}\"", chat_ask_length: "Lühike või pikk vastus?", chat_empty_state: "Alusta vestlust, esitades allpool küsimuse.",
    btn_back_dashboard: "Tagasi", btn_save: "Salvesta",
    profile_btn_guide: "Minu Juhend", profile_btn_guide_desc: "Soovitatud artiklid", profile_btn_plan: "Minu Plaan", profile_btn_plan_desc: "Tulekul", profile_sect_languages: "Keeled", profile_sect_skills: "Oskused", profile_sect_narrative: "Lugu", profile_label_aspirations: "Eesmärgid", profile_label_challenges: "Hirmud / Väljakutsed", profile_label_education: "Haridus", profile_label_profession: "Amet", profile_completeness: "{percentage}% valmis", profile_completeness_hint: "Vasta veel paarile küsimusele", profile_btn_update: "Uuenda profiili", profile_btn_continue: "Jätka",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Koostatud: {name}", wiki_explore_cats: "Sirvi kategooriaid", wiki_explore_subtitle: "Vali teema detailideks.", wiki_full_index: "Indeks", wiki_full_index_subtitle: "Sirvi kõike.", wiki_nav_list: "Nimekiri", wiki_nav_icons: "Ikoonid", wiki_section_chapters: "Peatükid", wiki_btn_mark_done: "Tehtud", wiki_btn_later: "Hiljem", wiki_btn_saved: "Salvestatud", wiki_btn_completed: "Valmis", wiki_ctx_ask: "Küsi selle kohta", wiki_topic_label: "Teema: {tag}", wiki_topic_desc: "Ülevaade & Artiklid", wiki_guide_prefix: "JUHEND", wiki_stat_articles: "artiklit", wiki_stat_complete: "valmis", wiki_section_prefix: "Osa",
    wizard_header_quiz: "Küsimustik", wizard_greeting_short: "Tere, {name}!", wizard_title_init: "Loo profiil", wizard_title_custom: "{name} Loomine", wizard_phase_identity: "FAAS 1: IDENTITEET", wizard_phase_demo: "FAAS 2: TAUST", wizard_phase_status: "FAAS 3: STAATUS", wizard_phase_skills: "FAAS 4: OSKUSED", wizard_phase_mindset: "FAAS 5: MÕTTEVIIS", wizard_phase_vision: "FAAS 6: VISIOON", wizard_nickname_hint: "* Võid kasutada hüüdnime.", wizard_btn_ask: "Küsi", wizard_btn_next: "Edasi", wizard_btn_prev: "Tagasi", wizard_btn_submit: "Valmis", wizard_btn_finish_early: "Salvesta & Lõpeta", wizard_btn_generate_name: "Genereeri nimi", wizard_ribbon_greeting: "Meeldiv tutvuda, {name}!", wizard_title_name: "Mis on sinu nimi?", wizard_desc_name: "Sisesta nimi või vali hüüdnimi", wizard_placeholder_name: "Sinu nimi",
    wizard_step2_title: "Kui vana sa oled?", wizard_step2_desc: "Vali vanusegrupp", wizard_step2_placeholder: "Vanus (nt 29)",
    wizard_step3_title: "Perekonnaseis?",
    wizard_marital_solo_title: "Üksinda", wizard_marital_solo_desc: "Pole kaaslast ega lapsi kaasas", wizard_marital_pair_title: "Kaaslane / Perega", wizard_marital_pair_desc: "Kaaslane või lapsed", wizard_marital_secret_title: "Saladus", wizard_marital_secret_desc: "Keeruline / Ei avalda",
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
    settings_title: "Seaded", settings_sect_general: "Üldine", settings_sect_appearance: "Välimus", settings_sect_data: "Andmed", settings_length_label: "Vastuse pikkus", settings_theme_label: "Teema", settings_theme_system: "Süsteem", settings_theme_light: "Hele", settings_theme_dark: "Tume", settings_opt_ask: "Küsi alati", settings_opt_short: "Lühike", settings_opt_long: "Pikk", settings_clear_data: "Kustuta andmed", settings_clear_data_desc: "Kustutab kõik.", settings_btn_clear: "Kustuta kõik",
    net_intro: "Tere tulemast võrgustikku looma. Vali endale sobiv viis.",
    net_header: "Millele soovid keskenduda?",
    net_opt_design: "Disainikogukond",
    net_opt_linkedin: "LinkedIn strateegia",
    net_opt_hobbies: "Hobid & Tegevused",
    net_opt_parents: "Lapsevanemad",
    net_opt_introvert: "Introvertidele",
  },
  wiki: {
    titles: {
      foundation: 'Põhitõed', job_strategy: 'Tööotsing', workplace: 'Töökultuur', industries: 'Tööstusharud', life: 'Elu & Tasakaal',
      identity: 'Identiteet', security: 'Sotsiaalkaitse', market: 'Turg', tools: 'Tööriistad', rights: 'Õigused', networking: 'Võrgustikud & Peidetud turg',
      social: 'Sotsiaalne', norms: 'Normid', specialist: 'Spetsialist', hands_on: 'Oskustöö', housing: 'Eluase',
      family: 'Pere', language: 'Keel',
      social_unemployment: 'Töötuskindlustus', social_housing: 'Eluasemetoetus', social_pension: 'Pension', social_kela_card: 'Kela-kaart', social_health: 'Tervishoid',
      bureaucracy_dvv: 'DVV & Isikukood', bureaucracy_migri: 'Migri', bureaucracy_tax: 'Maksukaart', bureaucracy_bank: 'Pangakonto avamine',
      job_te_office: 'TE-büroo', job_portals: 'Tööportaalid', job_entrepreneurship: 'Ettevõtlus',
      net_culture: 'Soome viis', net_linkedin: 'LinkedIn strateegia', net_hidden: 'Peidetud tööturg', net_volunteering: 'Vabatahtlik tegevus',
      job_cover_letter: 'Kaaskiri', job_interview: 'Intervjuu', job_recognition: 'Kraadide tunnustamine', job_cv_tips: 'Soome CV',
      work_contract: 'Tööleping', work_hours: 'Tööaeg', work_holidays: 'Puhkus', work_unions: 'Ametiühingud', work_probation: 'Katseaeg',
      culture_meetings: 'Koosolekud', culture_feedback: 'Tagasiside', culture_names: 'Sina-vorm', culture_punctuality: 'Täpsus', culture_coffee: 'Kohvipausid',
      culture_afterwork: 'Pärast tööd', culture_sauna: 'Saun', culture_smalltalk: 'Small Talk', culture_party: 'Peod',
      prof_engineering: 'Inseneeria', prof_business: 'Äri', prof_it: 'IT & Tehnoloogia', prof_health: 'Tervishoid', prof_service: 'Teenindus',
      housing_contracts: 'Üürileping', housing_finding: 'Korteri leidmine', housing_utilities: 'Kommunaalid', housing_recycling: 'Taaskasutus', housing_sauna: 'Pesula & Saun',
      family_school: 'Koolisüsteem', family_daycare: 'Lasteaed', family_activities: 'Hobid', family_winter: 'Talv & Lapsed', family_safety: 'Turvalisus'
    },
    articles: {
      'guide_start': { 
        title: 'Tere tulemast Soome! 🇫🇮', 
        summary: 'Soome toimib usaldusel, vaikusel ja kohvil.', 
        content: `# Ellujäämisjuhend\n\n**Filosoofia:**\nSoome toimib usaldusel, vaikusel ja kohvil. See on ühiskond, kus süsteemid töötavad, kuid pead teadma, kuidas neid kasutada.\n\n### Kuidas rakendust kasutada\n1. **Loe:** Sirvi juhendeid bürokraatia ja töökultuuri kohta.\n2. **Vestle:** Küsi AI assistendilt nõu oma konkreetse olukorra kohta.\n3. **Profiil:** Hoia oma andmed värsked täpsete nõuannete saamiseks.` 
      },
      'net_culture': {
        title: 'Võrgustike loomine: Soome viis',
        summary: 'Soomlased loovad sidemeid ühiste tegevuste kaudu, mitte tühja jutu ajamisega.',
        content: `### Talgute vaim\nVõrgustike loomine Soomes ei ole kokteilipeol visiitkaartide jagamine. See on **koos tegutsemine**.\n\n* **Vabatahtlik töö:** Liitu ürituste meeskonnaga (Slush, festivalid). Kui töötad soomlase kõrval, tekib usaldus. Usaldus viib töösoovitusteni.\n* **Ühingud:** Soomes on ühing (yhdistys) kõige jaoks. Leia oma erialale vastav.\n* **Kvaliteet üle kvantiteedi:** Üks sisukas kontakt on väärt rohkem kui 100 suvalist.`
      },
      'net_linkedin': {
        title: 'LinkedIn strateegia',
        summary: 'LinkedIn on peamine otsingumootor värbajatele Soomes.',
        content: `### Sinu digitaalne nägu\n* **Märksõnad:** Värbajad otsivad oskusi, mitte tiitleid. Kasuta pealkirjas "Java", "Projektijuhtimine", "B2B müük".\n* **Asukoht:** Määra Soome. Kui oled välismaal, muuda see "Helsingiks" (ja maini kokkuvõttes kolimisplaani), et ilmuda kohalikes otsingutes.\n* **Open to Work:** Roheline bänner on siin kultuuriliselt aktsepteeritud. See näitab motivatsiooni.\n* **Aktiivsus:** Kommenteeri kohalikke postitusi. See teeb sind nähtavaks autori võrgustikule.`
      },
      'net_hidden': {
        title: 'Peidetud tööturg',
        summary: '70-80% töökohtadest ei kuulutata välja. Pead need ise leidma.',
        content: `### Piilotyöpaikat (Peidetud töökohad)\nEttevõtted ei kuuluta tihti, sest värbamine on kallis ja aeglane.\n\n1. **Kaardista ettevõtted:** Tee nimekiri 20 ettevõttest. Ära vaata veel nende "Vabad töökohad" lehte.\n2. **Avatud avaldus (Avoin hakemus):** Saada e-kiri tiimijuhile (mitte personaliosakonda). "Olen jälginud teie tööd X vallas. Mul on oskused Y. Kas võiksime teha 15-minutilise kohvi?"\n3. **Infointervjuud:** Küsi inimestelt nende töö kohta, mitte tööd *endalt*. "Olen uus Soome energiasektoris. Kas tohiksin küsida 3 küsimust siinse töökorralduse kohta?" Enamik inimesi on nõus aitama.`
      },
      'net_volunteering': {
        title: 'Vabatahtlik tegevus',
        summary: 'Kiireim viis integreerumiseks ja oskuste tõestamiseks.',
        content: `### Miks vabatahtlikuks?\n1. **Keel:** Madala pingega keskkond soome keele harjutamiseks.\n2. **Soovitajad:** Saad kohaliku soovitaja, kes saab kinnitada sinu tööeetikat.\n3. **Võrgustik:** Kohtud aktiivsete inimestega.\n\n### Kus?\nPunane Rist, idufirmade üritused, spordiklubid, raamatukogud.`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Isikukood', 
        summary: 'Hangi isikukood, et eksisteerida ametlikult.', 
        content: `**Prioriteet: KOHE**\n\n### Missioon\nEksisteerida ametlikult. Ilma **Digi- ja rahvastikuandmete ametis (DVV)** registreerimata oled süsteemis nähtamatu.\n\n### Auhind\nSinu **Isikukood** (henkilötunnus). Formaat: *PPKKAA-XXXX*.\n\n### Milleks vaja?\n1. Pangakonto.\n2. Telefonileping.\n3. Maksukaart.\n4. Tervishoid.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Immigratsioon)', 
        summary: 'Elamisloa taotlemine ja aja broneerimine.', 
        content: `# Migri 🛂\n\n### Missioon\nHankida elamisluba (oleskelulupa).\n\n### Vihjed\n* **Enter Finland:** Kasuta veebiteenust. See on kiirem.\n* **Tuvastamine:** Pead minema teeninduspunkti isikut tõendama.\n* **Kiirrada:** Spetsialistidele ja iduettevõtjatele (14 päeva).` 
      },
      'bureaucracy_tax': { 
        title: 'Maksukaart (Verokortti)', 
        summary: 'Ilma maksukaardita on tulumaks 60%. Pole erandeid.', 
        content: `# Kuldne reegel\nKaarti pole = **60% maksu**. \n\n### Protsess\n1. Logi sisse **OmaVero** keskkonda.\n2. Hinda oma aastatulu.\n3. Lae alla PDF.\n4. Saada see palgaarvestusse/ülemusele.\n\n*Märkus: Soomes on astmeline tulumaks. Mida rohkem teenid, seda suurem protsent.*` 
      },
      'bureaucracy_bank': { 
        title: 'Pangakonto avamine', 
        summary: 'Pangakonto annab "tugeva elektroonilise tuvastuse", mis on digiteenuste võti.', 
        content: `# Väljakutse\nRahapesuseadused on ranged. Pank peab teadma raha päritolu.\n\n### Mida kaasa võtta\n1. Pass.\n2. Elamisluba.\n3. Tööleping.\n4. Isikukood (DVV-st).\n\n### Püha Graal\n**Pangakoodid** (verkkopankkitunnukset). Nendega pääsed Kela, Maksuameti ja Tervise infosüsteemidesse.` 
      },
      'social_kela_card': {
        title: 'Kela-kaart',
        summary: 'Sinine kaart tõestab, et kuulud Soome ravikindlustussüsteemi.',
        content: `# Mis see on?\nSinine kaart, mis tõendab sinu kuulumist Soome sotsiaalkindlustusse.\n\n### Kasutamine\nNäita seda:\n1. **Apteegis:** Saad retseptiravimitelt kohest soodustust.\n2. **Erakliinikus:** Saad kuludest väikese osa tagasi.`
      },
      'social_health': {
        title: 'Avalik vs. Töötervishoid',
        summary: 'Töötajana kasuta alati esimesena töötervishoidu (Työterveys). Kiirem ja tasuta.',
        content: `# Kaks süsteemi\n\n**1. Avalik (Terveysasema)**\n* **Kellele:** Kõigile elanikele.\n* **Hind:** Odav (~20€) või tasuta.\n* **Kiirus:** Võib olla aeglane. Pead helistama.\n\n**2. Töötervishoid (Työterveys)**\n* **Kellele:** Töötajatele.\n* **Hind:** Sulle tasuta (tööandja maksab).\n* **Kiirus:** Kiire. Tavaliselt erakliinikud nagu Terveystalo või Mehiläinen.`
      },
      'social_unemployment': {
        title: 'Töötushüvitis',
        summary: 'Kui kaotad töö, registreeri end TE-büroos ESIMESEL päeval.',
        content: `# Kuldne reegel\nRegistreeri end tööotsijaks **TE-büroos** (te-palvelut.fi) oma töötuse **esimesel päeval**. Kui hilined, kaotad raha.\n\n### Kes maksab?\n1. **Töötukassa (Kassa):** Kui oled liige (26 nädalat), saad sissetulekupõhist toetust (palju suurem).\n2. **Kela:** Kui pole liige, saad põhitoetust (väiksem).`
      },
      'social_housing': {
        title: 'Eluasemetoetus',
        summary: 'Kela võib maksta osa üürist, kui sissetulek on väike.',
        content: `# Üldine eluasemetoetus\n* **Kellele:** Madala sissetulekuga leibkonnad.\n* **Arvutamine:** Sõltub kogusissetulekust ja linnast.\n* **Taotlemine:** Kela veebis. Vajad üürilepingut.`
      },
      'social_pension': {
        title: 'Pensionisüsteem',
        summary: 'Kogud pensioni (eläke) igalt teenitud eurolt.',
        content: `# Kuidas toimib\nTööandja peab pensionimakse palgast automaatselt kinni.\n\n### Kontrollimine\nVaata kogunenud summat **Tyoelake.fi**.\n\n### Kolimine?\nKui kolid teise EL riiki, säilivad sinu pensioniõigused pensionieani.`
      },
      'job_market_overview': { 
        title: 'Tööturg', 
        summary: 'Maastiku mõistmine.', 
        content: `### Ülevaade\nSoome turg hindab oskusi ja suhtumist.` 
      },
      'job_te_office': {
        title: 'TE-teenused (TE-toimisto)',
        summary: 'Tööhõivebüroo aitab integratsiooni ja tööotsinguga.',
        content: `# Mida nad teevad\n* **Integratsiooniplaan:** Suunavad keelekursustele.\n* **Tööotsija staatus:** Vajalik toetuste saamiseks.\n* **Hoiatus:** Järgi nende juhiseid täpselt, et vältida "karenssi" (toetusest ilmajäämist).`
      },
      'job_portals': {
        title: 'Kust tööd leida',
        summary: 'Peamised tööportaalid.',
        content: `# Põhilehed\n* **LinkedIn:** Tippspetsialistidele.\n* **Oikotie Työpaikat:** Suurim Soomes.\n* **Duunitori:** Samuti väga populaarne.\n* **The Hub:** Parim idufirmadele.`
      },
      'job_entrepreneurship': {
        title: 'Ettevõtlus (Yrittäjyys)',
        summary: 'Soome vajab ettevõtjaid. Alustamiseks on toetused.',
        content: `# Starttiraha (Stardiraha)\nKui hakkad täiskohaga ettevõtjaks, võid saada ~700€/kuus 6-12 kuud elatise turvamiseks.\n\n**Tähtis:** Taotle **enne** ettevõtte registreerimist.`
      },
      'job_cv_tips': {
        title: 'Soome CV stiil',
        summary: 'Lühike, faktipõhine ja pildiga.',
        content: `# Kontrollnimekiri\n1. **Pikkus:** Max 2 lehte. Ideaalis 1.\n2. **Foto:** Standard. Naerata, ole professionaalne.\n3. **Profiil:** Lühike kokkuvõte alguses.\n4. **Oskused:** Loetle konkreetsed tehnoloogiad.\n5. **Toon:** Tagasihoidlik aga enesekindel. Esita fakte.`
      },
      'job_cover_letter': {
        title: 'Kaaskiri',
        summary: 'Ära korda CV-d. Vasta "Miks meie?" ja "Miks sina?".',
        content: `# Struktuur\n1. **Konks:** Miks tahad just *seda* tööd?\n2. **Väärtus:** Mis probleeme sa lahendad?\n3. **Isiksus:** Kas sobid tiimi?\n\n### Vihje\nHoia alla 1 lehekülje.`
      },
      'job_interview': {
        title: 'Tööintervjuu',
        summary: 'Ausust testitakse. Vaikus on okei.',
        content: `# Mida oodata\n* **Aus:** Kui ei tea, ütle "Ei tea, aga õpin". Ära valeta.\n* **Vaikus:** Kui intervjueerija vaikib, ära paanitse. Ta mõtleb.\n* **Kohv:** Võta alati vastu.`
      },
      'job_recognition': {
        title: 'Kraadide tunnustamine',
        summary: 'Oluline reguleeritud ametites (arstid, õpetajad).',
        content: `# Reguleeritud ametid\nTervishoius/hariduses peab kraadi tunnustama **OPH** või **Valvira**.\n\n### Üldised ametid\nIT või äri puhul pole ametlik tunnustamine tavaliselt vajalik. Oskused loevad.`
      },
      'work_contract': { 
        title: 'Tööleping', 
        summary: 'Alati kirjalik. Loe hoolikalt. Kontrolli TES-i.',
        content: `# Põhielemendid\n1. **Kestus:** Tähtajatu (toistaiseksi voimassa oleva) või Tähtajaline (määräaikainen).\n2. **TES:** Kollektiivleping. Määrab miinimumpalga ja puhkused.\n3. **Katseaeg:** Max 6 kuud.\n\n**Ära kunagi alusta tööd ilma lepinguta.**` 
      },
      'work_hours': {
        title: 'Tööaeg',
        summary: 'Standard on 7.5 või 8 tundi päevas.',
        content: `# Tasakaal\n* **Täistööaeg:** Tavaliselt 37.5 või 40 tundi/nädalas.\n* **Paindlikkus:** Paljudes kohtades "liukuma" (flex time). Tööle 7-9, koju 15-17.\n* **Lõuna:** Tavaliselt 30 min (palgata).`
      },
      'work_holidays': {
        title: 'Puhkus',
        summary: 'Soomes on pikad puhkused, aga need tuleb välja teenida.',
        content: `# Puhkuseaasta\nKogud päevi 1. aprillist 31. märtsini.\n* **Standard:** 2.5 päeva kuus = 30 päeva (5 nädalat) aastas.\n* **Suvi:** Tavaliselt juulis. Riik seisab.\n* **Puhkuseraha:** Paljud saavad 50% lisatasu (lomaraha).`
      },
      'work_unions': {
        title: 'Ametiühingud (Liitto)',
        summary: 'Väga soovitatav. Nad kontrollivad töötukassasid.',
        content: `# Miks liituda?\n1. **Raha:** Maksavad sissetulekupõhist töötushüvitist (palju suurem kui Kela).\n2. **Õigus:** Tasuta juriidiline abi töövaidlustes.\n\n### Milline?\n* **YTK:** Ainult kassa (odavam).\n* **TEK:** Inseneridele.\n* **PAM:** Teenindus.`
      },
      'work_probation': {
        title: 'Katseaeg (Koeaika)',
        summary: 'Esimesed 6 kuud on tavaliselt prooviaeg.',
        content: `# Reeglid\nKatseajal (max 6 kuud) võivad **mõlemad** pooled lepingu päevapealt lõpetada.`
      },
      'culture_meetings': { 
        title: 'Koosolekud', 
        summary: 'Soomlased on täpsed ja efektiivsed. Small talk on minimaalne.', 
        content: `# Reeglid\n1. **Alusta õigel ajal:** 09:00 on 09:00.\n2. **Päevakava:** Püsi teemas.\n3. **Vaikus:** Tähendab nõustumist või mõtlemist.\n4. **Lõpeta õigel ajal:** Austa teiste aega.` 
      },
      'culture_feedback': {
        title: 'Tagasiside',
        summary: 'Otsene ja faktipõhine. Ära võta isiklikult.',
        content: `# Otsesus\nSoomlane võib öelda: *"Raportis puudub X."*\nSee pole ebaviisakas. See on fakt vea parandamiseks. Nad eraldavad töö isikust.`
      },
      'culture_names': {
        title: 'Sina-vorm',
        summary: 'Soome on väga mitteametlik.',
        content: `# Tere, Boss\nKõik on eesnimepidi. Kutsud tegevjuhti nimega "Matti". Sinatamine on standard.`
      },
      'culture_punctuality': {
        title: 'Täpsus',
        summary: '5 minutit hilinemist on hilinemine.',
        content: `# Aeg on austus\nHilinemine on teise aja varastamine. Kui hilined 5 minutit, saada sõnum.`
      },
      'culture_coffee': {
        title: 'Kohvipausid (Kahvitauko)',
        summary: 'Püha rituaal. Sageli seadusega ette nähtud.',
        content: `# Rituaal\nEnamik lepinguid sisaldab kaht 10-15 min pausi.\n\n* **Suhtle:** Siin toimub meeskonna loomine.\n* **Kofeiin:** Soomlased joovad maailmas enim kohvi.`
      },
      'culture_afterwork': {
        title: 'Pärast tööd (AW)',
        summary: 'Reedeõhtune lõõgastus.',
        content: `# Õhkkond\nTavaliselt vaba. Võib juua alkoholi või mitte.`
      },
      'culture_sauna': {
        title: 'Saunadiplomaatia',
        summary: 'Sauna on võrdsuse koht. Isegi äris.',
        content: `# Reeglid\n1. **Võrdsus:** Saunas pole tiitleid.\n2. **Alastus:** Loomulik, mitte seksuaalne.\n3. **Äri:** Mõnikord tehakse siin otsuseid.`
      },
      'culture_smalltalk': {
        title: 'Vaikus & Small Talk',
        summary: 'Vaikus pole piinlik. See on puhkus.',
        content: `# Ära täida tühjust\nLiftis pole vaja rääkida. Noogutusest piisab.`
      },
      'culture_party': {
        title: 'Pikkujoulut',
        summary: 'Firmapeod detsembris võivad olla metsikud.',
        content: `# Erand\nSoomlased on vaoshoitud, VÄLJA ARVATUD *Pikkujoulut*. See on iga-aastane jõulupidu. Juhtub nii mõndagi.`
      },
      'prof_engineering': {
        title: 'Inseneeria Soomes',
        summary: 'Suur sektor. Inglise keel levinud.',
        content: `# Hiiglased\nKone, Wärtsilä, Nokia.\n\n### Kultuur\nFaktipõhine. Hinnatakse täpsust, mitte müügijuttu.`
      },
      'prof_business': {
        title: 'Äri & Rahandus',
        summary: 'Nõuab tihti soome keelt.',
        content: `# Barjäär\nTraditsioonilised rollid nõuavad soome keelt.\n\n### Võimalus\nVaata *International Sales* või *Export* rolle.`
      },
      'prof_it': {
        title: 'IT & Tehnoloogia',
        summary: 'Lihtsaim sektor inglise keelega.',
        content: `# Keskus\nSoome vajab koodereid. Inglise keel on töökeel (Wolt, Supercell, Relex).`
      },
      'prof_health': {
        title: 'Tervishoid',
        summary: 'Suur puudus, aga keel kohustuslik.',
        content: `# Reaalsus\nVajad Valvira litsentsi ja keelt tasemel B1/B2.`
      },
      'prof_service': {
        title: 'Teenindus',
        summary: 'Restoranid ja koristus on tavalised sisenemiskohad.',
        content: `# Alustamine\nKoristus ja köögitöö ei nõua alati keelt. Hea viis alustada.`
      },
      'housing_contracts': {
        title: 'Üürileping',
        summary: 'Turvaline ja reguleeritud.',
        content: `# Tingimused\n* **Tagatis:** Tavaliselt 2 kuud.\n* **Ülesütlemine:** Üürnikule 1 kuu.\n* **Kodukindlustus:** Peaaegu alati kohustuslik.`
      },
      'housing_finding': {
        title: 'Korteri leidmine',
        summary: 'Helsingi turg on kiire.',
        content: `# Portaalid\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Vihje\nOle kiire. Mine näitamisele valmis avaldusega.`
      },
      'housing_utilities': {
        title: 'Elekter & Internet',
        summary: 'Tavaliselt teed ise elektrilepingu.',
        content: `# Elekter\nEi sisaldu üüris. Vali pakkuja ise.\n\n### Vesi\nTihti fikseeritud tasu (nt 20€/inimene).`
      },
      'housing_recycling': {
        title: 'Taaskasutus',
        summary: 'Soomlased sorteerivad kõike.',
        content: `# Prügikastid\n* **Bio:** Toit.\n* **Muovi:** Plast.\n* **Kartonki:** Papp.\n* **Paperi:** Paber.\n\n### Pantti\nPudelid ja purgid vii poodi tagasi. Saad raha.`
      },
      'housing_sauna': {
        title: 'Pesula & Saun',
        summary: 'Majades on ühised ruumid.',
        content: `# Taloyhtiö\n* **Pesula:** Broneeri aeg nimekirjas.\n* **Lenkkisauna:** Tasuta iganädalane saun kõigile.\n* **Oma kord:** Tasuline iganädalane tund.`
      },
      'family_school': {
        title: 'Koolisüsteem',
        summary: 'Maailma tippklass. Ja tasuta.',
        content: `# Põhitõed\n* **Algus:** 7-aastaselt.\n* **Hind:** Tasuta (sh toit ja raamatud).\n* **Keel:** Soome või rootsi.`
      },
      'family_daycare': {
        title: 'Lasteaed (Päiväkoti)',
        summary: 'Igal lapsel on õigus kohale.',
        content: `# Taotlemine\n4 kuud ette. Tugevalt doteeritud.\n\n### Hind\nSõltub sissetulekust. Max ~300€/kuus.`
      },
      'family_activities': {
        title: 'Hobid & Sport',
        summary: 'Hobisid võetakse tõsiselt.',
        content: `# Valikud\n* **Raamatukogud:** Oodi pakub 3D printereid ja mänge tasuta.\n* **Sport:** Jalgpall, jäähoki.`
      },
      'family_winter': {
        title: 'Lapsed & Talv',
        summary: 'Pole halba ilma, on vale riietus.',
        content: `# Riietus\n* **Kihid:** Vill, fliis, kombinesoon.\n* **Helkur:** Kohustuslik pimedas.`
      },
      'family_safety': {
        title: 'Turvalisus',
        summary: 'Soome on turvaline. Lapsed käivad koolis üksi.',
        content: `# Iseseisvus\nÄra ehmu, kui näed 7-aastast üksi metroos. See on normaalne.`
      }
    }
  }
};
