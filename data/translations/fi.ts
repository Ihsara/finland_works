
import { TranslationResource } from "./types";

export const fi: TranslationResource = {
  ui: {
    landing_welcome: "Tervetuloa!", landing_subtitle: "Löydä oma polkusi Suomeen", landing_btn_quiz: "Aloita kysely", landing_btn_continue: "Avaa oppaani", landing_btn_ask: "Aloita chat", landing_btn_browse: "Selaa opasta", landing_load_sample: "Lataa esimerkki", landing_erase: "Tyhjennä tiedot", landing_add_key: "Lisää API-avain", landing_choose_lang: "Kieli",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Tervetuloa takaisin omaan Suomi-oppaaseesi.", dash_subtitle_guest: "Luodaan profiili, niin päästään alkuun.", dash_btn_guide: "Avaa opas", dash_btn_browse: "Selaa", dash_btn_ask: "Kysy AI:lta", dash_btn_history: "Historia", dash_btn_cv: "Tuo CV", dash_switch_profile: "Vaihda", dash_new_profile: "Uusi", dash_edit_profile: "Muokkaa", dash_profile_overview: "Profiili",
    dash_education: "Koulutus", dash_profession: "Ammatti", dash_languages: "Kielet", dash_narrative_aspirations: "Tavoitteet", dash_narrative_challenges: "Haasteet",
    chat_placeholder: "Kysy jotain...", chat_end_session: "Lopeta", chat_header_assistant: "Assistentti", chat_prompt_context_inquiry: "Kerro lisää kohdasta \"{sentence}\"", chat_ask_length: "Lyhyt vai pitkä vastaus?", chat_length_set_confirm: "Selvä. Säädän vastauksen pituutta.", chat_empty_state: "Aloita keskustelu kysymällä jotain alla.",
    chat_ai_greeting: "Beep boop! 🤖 Muistutus: En ole ihminen! Mutta teen parhaani auttaakseni sinua navigoimaan Suomessa.",
    btn_back_dashboard: "Takaisin", btn_save: "Tallenna",
    profile_btn_guide: "Oppaani", profile_btn_guide_desc: "Suositellut artikkelit", profile_btn_plan: "Suunnitelmani", profile_btn_plan_desc: "Tulossa pian", profile_sect_languages: "Kielitaito", profile_sect_skills: "Taidot", profile_sect_narrative: "Tarina", profile_label_aspirations: "Toiveet", profile_label_challenges: "Pelot / Haasteet", profile_label_education: "Koulutus", profile_label_profession: "Ammatti", profile_completeness: "{percentage}% valmis", profile_completeness_hint: "Vastaa vielä pariin kysymykseen", profile_btn_update: "Päivitä profiili", profile_btn_continue: "Jatka",
    
    // Profile Guest View
    profile_guest_title: "Valmistaudu elämääsi ja uraasi Suomessa",
    profile_guest_subtitle: "Vastaa muutamaan kysymykseen ja saat henkilökohtaisen 1 vuoden integraatiosuunnitelman",
    profile_guest_btn_start: "Aloita",
    profile_guest_col1: "Lakisääteiset perusasiat",
    profile_guest_col2: "Työvälineet",
    profile_guest_col3: "Elämä & Yhteisö",
    profile_guest_item_kela: "Kela", profile_guest_item_tax: "Verokortti", profile_guest_item_id: "Henkilötunnus",
    profile_guest_item_contacts: "Kontaktit", profile_guest_item_cv: "CV", profile_guest_item_portfolio: "Portfolio",
    profile_guest_item_hobbies: "Harrastukset", profile_guest_item_events: "Tapahtumat", profile_guest_item_volunteering: "Vapaaehtoistyö",
    profile_features_title: "TÄRKEIMMÄT OMINAISUUDET (DEMO)",
    profile_feat_kela: "Hae Kela-korttia",
    profile_feat_hidden: "Piilotyöpaikkatyökalu",
    profile_instr_title: "YKSITYISKOHTAISET OHJEET",
    profile_instr_cv: "Kuinka kirjoittaa suomalainen CV",
    profile_instr_tax: "Kuinka saada verokortti",
    profile_btn_explore: "Tutki kaikkia ohjeita",

    // Gamified Planner
    quest_level: "Taso {level} Tutkimusmatkailija",
    quest_xp: "{current}/{max} XP seuraavalle tasolle",
    quest_tab_board: "Urapolku",
    quest_tab_achievements: "Saavutukset",
    quest_tab_life: "Elämä & Hyvinvointi",
    quest_priority_title: "Prioriteettitehtävät",
    quest_priority_subtitle: "Kohteet jotka tallensit myöhemmäksi",
    quest_empty_priority: "Ei aktiivisia prioriteettitehtäviä. Hyvää työtä!",
    quest_empty_log: "Ei suoritettuja tehtäviä vielä. Aloita matkasi!",
    quest_btn_mark_done: "Merkitse tehdyksi",
    quest_btn_read: "Lue opas",
    quest_achievement_unlocked: "Saavutus avattu!",
    quest_fun_fact_title: "Tiesitkö?",
    quest_btn_unlock: "Avaa & Lue",
    quest_locked_msg: "Napauta paljastaaksesi salaisuuden!",
    
    // New Rubric Labels
    plan_track_career: "Urapolku",
    plan_track_life: "Pohjoismainen elämä",
    plan_step_completed: "Valmis",
    plan_step_locked: "Lukittu",
    plan_step_available: "Saatavilla",
    plan_btn_return: "Palaa suunnitelmaan",

    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Räätälöity: {name}", wiki_explore_cats: "Selaa aiheita", wiki_explore_subtitle: "Valitse aihe syventyäksesi.", wiki_full_index: "Hakemisto", wiki_full_index_subtitle: "Selaa kaikkia.", wiki_nav_list: "Lista", wiki_nav_icons: "Kuvakkeet", wiki_section_chapters: "Luvut", wiki_btn_mark_done: "Tehty", wiki_btn_later: "Myöhemmin", wiki_btn_saved: "Tallennettu", wiki_btn_completed: "Valmis", wiki_ctx_ask: "Kysy tästä", wiki_topic_label: "Aihe: {tag}", wiki_topic_desc: "Yleiskatsaus & Artikkelit", wiki_guide_prefix: "OPAS", wiki_stat_articles: "artikkelia", wiki_stat_complete: "valmis", wiki_section_prefix: "Osa", wiki_stat_articles_suffix: "artikkelia",
    wizard_header_quiz: "Kysely", wizard_greeting_short: "Moi, {name}!", wizard_title_init: "Luo profiili", wizard_title_custom: "Luodaan {name}", wizard_phase_identity: "VAIHE 1: IDENTITEETTI", wizard_phase_demo: "VAIHE 2: TAUSTA", wizard_phase_status: "VAIHE 3: STATUS", wizard_phase_skills: "VAIHE 4: TAIDOT", wizard_phase_mindset: "VAIHE 5: ASENNE", wizard_phase_vision: "VAIHE 6: VISIO", wizard_nickname_hint: "* Voit käyttää lempinimeä.", wizard_btn_ask: "Kysy", wizard_btn_next: "Seuraava", wizard_btn_prev: "Edellinen", wizard_btn_submit: "Lähetä", wizard_btn_finish_early: "Tallenna & Lopeta", wizard_btn_generate_name: "Luo nimi", wizard_ribbon_greeting: "Hauska tutustua, {name}!", wizard_title_name: "Mikä on nimesi?", wizard_desc_name: "Kirjoita nimesi tai valitse lempinimi", wizard_placeholder_name: "Nimesi",
    wizard_step2_title: "Minkä ikäinen olet?", wizard_step2_desc: "Valitse ikäryhmä", wizard_step2_placeholder: "Ikä (esim. 29)",
    wizard_step3_title: "Siviilisääty?",
    wizard_marital_solo_title: "Yksin", wizard_marital_solo_desc: "Ei puolisoa tai lapsia mukana", wizard_marital_pair_title: "Puoliso / Perhe", wizard_marital_pair_desc: "Puoliso tai lapsia", wizard_marital_secret_title: "Salaisuus", wizard_marital_secret_desc: "En kerro / Monimutkaista",
    wizard_children_title: "Onko sinulla lapsia?", wizard_children_desc: "Tämä auttaa koulu- ja päiväkotineuvoissa.", wizard_children_yes: "Kyllä", wizard_children_no: "Ei", wizard_family_details_title: "Perheen tiedot", wizard_family_count_label: "Montako lasta?", wizard_family_ages_label: "Iät?", wizard_family_ages_hint: "Valitse kaikki sopivat.", wizard_age_group_0_6: "Päiväkoti (0-6)", wizard_age_group_7_12: "Koulu (7-12)", wizard_age_group_13_17: "Nuoret (13-17)", wizard_age_group_18: "Aikuiset (18+)",
    wizard_step4_title: "Mistä olet kotoisin?", wizard_step4_desc: "Kotimaa", wizard_step4_placeholder: "Maan nimi...", wizard_step4_no_match: "Ei löytynyt", wizard_btn_search_country: "Hae maata", wizard_btn_select_region: "Valitse alue", wizard_region_europe: "Eurooppa", wizard_region_americas: "Amerikka", wizard_region_asia: "Aasia", wizard_region_africa: "Afrikka", wizard_region_oceania: "Oseania", wizard_region_middle_east: "Lähi-itä", wizard_eu_question: "EU/ETA-kansalainen?", wizard_eu_yes: "Kyllä", wizard_eu_no: "Ei",
    wizard_step5_title: "Työnteko-oikeus", wizard_permit_full_title: "Rajoittamaton", wizard_permit_full_desc: "Pysyvä, Perhe, EU, tai Suomi-tutkinto", wizard_permit_restricted_title: "Rajoitettu", wizard_permit_restricted_desc: "Työlupa sidottu työnantajaan", wizard_permit_student_title: "Opiskelija", wizard_permit_student_desc: "Rajoitetut tunnit",
    wizard_step6_title: "Koulutus", wizard_step6_desc: "Mikä kuvaa sinua parhaiten?", wizard_step6_field_label: "Ala (Valinnainen)", wizard_step6_field_placeholder: "esim. Insinööri", wizard_edu_general_title: "Yleissivistävä", wizard_edu_general_desc: "Lukio. Ei ammattia.", wizard_edu_applied_title: "Ammatillinen", wizard_edu_applied_desc: "Ammattikoulu tai AMK.", wizard_edu_uni_title: "Yliopisto", wizard_edu_uni_desc: "Akateeminen tutkinto.",
    wizard_step7_title: "Ammattisi?", wizard_step7_desc: "Tai mitä työtä etsit?", wizard_step7_placeholder: "esim. Sairaanhoitaja, Koodari",
    wizard_step8_title: "Suomen kieli", wizard_lbl_finnish_level: "Nykyinen taso", wizard_lbl_finnish_motivation: "Motivaatio", wizard_opt_lang_none: "Ei vielä", wizard_opt_lang_basics: "Perusteet (A1)", wizard_opt_lang_inter: "Keskitaso (A2-B1)", wizard_opt_lang_fluent: "Sujuva (B2+)", wizard_scale_1_motivation: "Utelias", wizard_scale_5_motivation: "Pysäyttämätön",
    wizard_step9_title: "Englannin kieli", wizard_opt_lang_en_none: "Ei osaa", wizard_opt_lang_en_basic: "Perusteet", wizard_opt_lang_en_working: "Työkieli", wizard_opt_lang_en_fluent: "Sujuva/Äidinkieli",
    wizard_step10_title: "Visio", wizard_step10_aspirations_label: "Toiveet", wizard_step10_aspirations_placeholder: "Mitä toivot saavuttavasi?", wizard_step10_challenges_label: "Haasteet", wizard_step10_challenges_placeholder: "Mikä huolettaa?",
    wizard_step12_title: "Fiilis Suomesta?", wizard_opt_cult_low: "Kaunis mysteeri", wizard_opt_cult_med: "Tarkkailen ilolla", wizard_opt_cult_high: "Sukellan syvään päätyyn",
    wizard_step13_title: "Elämänrytmi?", wizard_scale_1_life: "Vielä outoa", wizard_scale_5_life: "Kuin kotona",
    wizard_step14_title: "Työnhaku?", wizard_scale_1_career: "Tarvitsen suuntaa", wizard_scale_5_career: "Suunnitelma on",
    wizard_step15_title: "Onko polku selvä?", wizard_opt_info_none: "Hieman sumuinen", wizard_opt_info_some: "Selkenemään päin", wizard_opt_info_high: "Kristallinkirkas",
    wizard_step16_title: "Mikä innostaa?", wizard_opt_excite_career: "Ura ja työ", wizard_opt_excite_life: "Rauha & Turva", wizard_opt_excite_nature: "Luonto & Vuodenajat", wizard_opt_excite_adventure: "Seikkailu",
    wizard_rating_winter: "Talvi", wizard_rating_thaw: "Sula", wizard_rating_growth: "Kasvu", wizard_rating_bloom: "Kukinta", wizard_rating_summer: "Kesä",
    history_title: "Keskusteluhistoria", history_empty: "Ei keskusteluja.", history_tab_summary: "Tiivistelmä (AI)", history_tab_transcript: "Keskustelu", history_no_summary: "Ei tiivistelmää.", history_generating: "AI kirjoittaa...", history_generating_desc: "Tämä tapahtuu taustalla.",
    cv_title: "Analysoi CV", cv_subtitle: "Liitä CV:n teksti päivittääksesi profiilin.", cv_placeholder: "Liitä CV tähän...", cv_btn_analyze: "Analysoi & Tuo", cv_btn_processing: "Käsitellään...", cv_warning_key: "Vaatii oman API-avaimen.", cv_key_update: "Päivitä avain", cv_key_required: "Avain vaaditaan", cv_key_desc: "Yksityisyyden vuoksi käytä omaa Google Gemini API -avainta. Se tallennetaan vain laitteellesi.", cv_key_placeholder: "Liitä avain tähän...", cv_key_save: "Tallenna avain", cv_alert_success: "API-avain tallennettu.", cv_alert_error: "Analyysi epäonnistui. Tarkista avain.", cv_btn_manage_key: "API-avain",
    settings_title: "Asetukset", settings_sect_general: "Yleiset", settings_sect_appearance: "Ulkoasu", settings_sect_data: "Data & Yksityisyys", settings_length_label: "Vastauksen pituus", settings_theme_label: "Teema", settings_theme_system: "Järjestelmä", settings_theme_light: "Vaalea", settings_theme_dark: "Tumma", settings_opt_ask: "Kysy aina", settings_opt_short: "Lyhyt", settings_opt_long: "Yksityiskohtainen", settings_clear_data: "Nollaa sovellus", settings_clear_data_desc: "Tämä poistaa kaikki profiilit ja historian.", settings_btn_clear: "Poista kaikki",
    net_intro: "Tervetuloa verkostoitumaan. Valitse polkusi.",
    net_header: "Mihin keskitytään?",
    net_opt_design: "Muotoiluyhteisö",
    net_opt_linkedin: "LinkedIn-strategia",
    net_opt_hobbies: "Harrastukset & Toiminta",
    net_opt_parents: "Verkostoituminen vanhemmille",
    net_opt_introvert: "Vinkkejä introverteille",
    feedback_action: "Anna palautetta",
    net_intro_deep: 'Miksi verkostoituminen on tärkeää', net_design: 'Design-yhteisö', net_parents: 'Verkostoituminen vanhemmille', net_introvert: 'Matala kynnys', net_hobbies: 'Harrastukset', net_plan: 'Toimintasuunnitelmasi',
    net_cold_msg: 'Suora yhteydenotto', net_places: 'Verkostoitumispaikat', net_prof_style: 'Ammatillinen tyyli',
    net_hackathons: 'Hackathonit & Junction', net_slush: 'Slush: Anti-konferenssi', net_school: 'Verkostoituminen opiskellessa'
  },
  wiki: {
    titles: {
      foundation: 'Byrokratia & Perusasiat', job_strategy: 'Työnhakustrategia', workplace: 'Työkulttuuri', industries: 'Toimialaoppaat', life: 'Elämä & Tasapaino',
      identity: 'Henkilöllisyys & luvat', security: 'Sosiaaliturva', market: 'Markkina', tools: 'Työkalut', rights: 'Oikeudet', networking: 'Verkostoituminen & Piilotyöpaikat',
      social: 'Sosiaaliset rituaalit', norms: 'Ammatilliset normit', specialist: 'Asiantuntijaroolit', hands_on: 'Käytännön työ', housing: 'Asuminen & Liikenne',
      family: 'Perheen tuki', language: 'Kieli', giving: 'Vapaaehtoistyö',
      social_unemployment: 'Työttömyysturva', social_housing: 'Asumistuki', social_pension: 'Eläkejärjestelmä', social_kela_card: 'Kela-kortti', social_health: 'Julkinen terveydenhuolto',
      bureaucracy_dvv: 'DVV & Henkilötunnus', bureaucracy_migri: 'Maahanmuutto (Migri)', bureaucracy_tax: 'Verokortti', bureaucracy_bank: 'Pankkitilin avaaminen',
      job_te_office: 'TE-toimisto', job_portals: 'Työnhakuportaalit', job_entrepreneurship: 'Yrittäjyys', 
      net_culture: 'Suomalainen tapa', net_linkedin: 'LinkedIn-strategia', net_hidden: 'Piilotyöpaikat', net_volunteering: 'Vapaaehtoistyö',
      job_cover_letter: 'Hakemuskirje', job_interview: 'Työhaastattelu', job_recognition: 'Tutkintojen tunnustaminen', job_cv_tips: 'Suomalainen CV',
      work_contract: 'Työsopimus', work_hours: 'Työajat', work_holidays: 'Lomat', work_unions: 'Ammattiliitot', work_probation: 'Koeaika',
      culture_meetings: 'Kokouskulttuuri', culture_feedback: 'Palautteenanto', culture_names: 'Nimet & Tittelit', culture_punctuality: 'Täsmällisyys', culture_coffee: 'Kahvitauot',
      culture_afterwork: 'Afterwork', culture_sauna: 'Saunadiplomatia', culture_smalltalk: 'Hiljaisuus & Small Talk', culture_party: 'Työpaikan juhlat',
      prof_engineering: 'Insinöörityö', prof_business: 'Kaupallinen ala', prof_it: 'IT & Teknologia', prof_health: 'Terveys & Hoito', prof_service: 'Palveluala',
      housing_contracts: 'Vuokrasopimukset', housing_finding: 'Asunnon etsintä', housing_utilities: 'Sähkö & Vesi', housing_recycling: 'Kierrätysopas', housing_sauna: 'Pesutupa & Sauna',
      family_school: 'Koulujärjestelmä', family_daycare: 'Päiväkoti', family_activities: 'Harrastukset & Urheilu', family_winter: 'Lapset & Talvi', family_safety: 'Turvallisuus',
      vol_redcross: 'Punainen Risti', vol_animals: 'Eläinsuojelu', vol_events: 'Tapahtumat', vol_humanitarian: 'Avustustyö',
      daily_transport: 'Julkinen liikenne', daily_groceries: 'Ruokakaupat', daily_pantti: 'Pullonpalautus',
      nature_everyman: 'Jokamiehenoikeudet', nature_winter: 'Talvesta selviytyminen', nature_summer: 'Mökkielämä'
    },
    articles: {
      'guide_start': { 
        title: 'Tervetuloa Suomeen! 🇫🇮', 
        summary: 'Suomi toimii luottamuksella, hiljaisuudella ja kahvilla. Tämä opas on selviytymis-manuaalisi.', 
        content: `# Selviytymisopas\n\n**Filosofia:**\nSuomi toimii luottamuksella, hiljaisuudella ja kahvilla. Tämä on yhteiskunta, jossa järjestelmät toimivat, mutta sinun on tiedettävä, miten niitä käytetään. Luottamus on vuorovaikutuksen valuutta, ja hiljaisuus on kunnioituksen merkki.\n\n### Kuinka käyttää tätä sovellusta\n1. **Lue:** Selaa oppaita byrokratiasta ja työkulttuurista.\n2. **Chat:** Kysy AI-assistentilta juuri sinun tilanteestasi.\n3. **Profiili:** Pidä tietosi ajan tasalla saadaksesi tarkkoja neuvoja.\n\n*Sisu* on kaikki mitä tarvitset!` 
      },
      'net_culture': {
        title: 'Verkostoituminen: Suomalainen tapa',
        summary: 'Suomalaiset verkostoituvat tekemällä asioita yhdessä, eivät jutustelemalla. Luottamus on kaikki kaikessa.',
        content: `### Talkoohenki\nVerkostoituminen Suomessa on harvoin käyntikorttien jakamista cocktail-kutsuilla. Se on **yhdessä tekemistä**.\n\n* **Vapaaehtoistyö:** Liity tapahtuman tiimiin (Slush, paikalliset festivaalit). Kun työskentelet suomalaisen rinnalla, rakennat luottamusta. Luottamus johtaa työsuosituksiin.\n* **Yhdistykset:** Suomessa on yhdistys (yhdistys) kaikelle. Etsi ammattiasi vastaava.\n* **Laatu korvaa määrän:** Yksi merkityksellinen yhteys on arvokkaampi kuin 100 pinnallista kontaktia.`
      },
      'net_intro_deep': {
        title: 'Miksi verkostoituminen on tärkeää',
        summary: 'Suurin osa työpaikoista on piilossa. Verkostoituminen on avain.',
        content: `# Piilotyöpaikat\n\nSuomessa jopa 80% työpaikoista ei koskaan tule julkiseen hakuun. Ne täytetään suositusten kautta.\n\n### Miksi?\n1. **Kustannukset:** Rekrytointi on kallista.\n2. **Luottamus:** Suomalaiset palkkaavat mieluiten tutun tai tutun suositteleman.\n\n### Strategiasi\nSinun on oltava siellä, missä päätöksentekijät ovat.`
      },
      'net_linkedin': {
        title: 'LinkedIn-strategia',
        summary: 'LinkedIn on rekrytoijien tärkein hakukone Suomessa.',
        content: `### Digitaaliset kasvosi\n* **Avainsanat:** Rekrytoijat hakevat taidoilla, eivät titteleillä. Varmista, että otsikkosi on tarkka (esim. "UX Designer").\n* **Sijainti:** Aseta se Suomeen. Jos olet ulkomailla, vaihda se muotoon "Helsinki" (ja mainitse esittelyssä, että olet muuttamassa), jotta näyt paikallisissa hauissa.\n* **Open to Work:** Vihreä banneri on täällä kulttuurisesti hyväksytty. Se osoittaa motivaatiota.\n* **Aktiivisuus:** Kommentoi paikallisia julkaisuja. Se tekee sinusta näkyvän kirjoittajan verkostolle.`
      },
      'net_hidden': {
        title: 'Piilotyöpaikkojen hakkerointi',
        summary: '70-80% työpaikoista ei mainosteta. Sinun täytyy löytää ne.',
        content: `### Piilotyöpaikat\nYritykset eivät usein mainosta, koska rekrytointi on kallista ja hidasta.\n\n1. **Kartoita yritykset:** Tee lista 20 yrityksestä, joista pidät. Älä katso vielä heidän "Avoimet työpaikat" -sivuaan.\n2. **Avoin hakemus:** Lähetä sähköpostia tiiminvetäjälle (ei HR:lle). "Olen seurannut työtänne X:n parissa. Minulla on taitoja Y. Voisimmeko juoda 15 minuutin kahvit?"\n3. **Infohaastattelut:** Kysy ihmisiltä heidän työstään, älä pyydä *töitä*. "Olen uusi Suomen energiasektorilla. Voisinko kysyä 3 kysymystä siitä, miten asiat täällä toimivat?" Useimmat vastaavat kyllä.`
      },
      'net_volunteering': {
        title: 'Vapaaehtoistyö',
        summary: 'Nopein tapa integroitua ja todistaa taidot.',
        content: `### Miksi vapaaehtoistyö?\n1. **Kieli:** Matala kynnys harjoitella suomea.\n2. **Suosittelijat:** Saat paikallisen suosittelijan, joka voi todistaa työmoraalisi.\n3. **Verkosto:** Tapaat aktiivisia ihmisiä.\n\n### Missä?\nPunainen Risti, startup-tapahtumat, urheiluseurat, kirjastot.`
      },
      'net_school': {
        title: 'Verkostoituminen opiskellessa',
        summary: 'Koulu on ensimmäinen ammatillinen verkostosi.',
        content: `# Opiskelijan etu\n\nOpiskelu Suomessa on paras tapa rakentaa verkostoa. Luokkakaverisi ovat tulevia kollegoitasi.\n\n### 1. Amis\n* **Avain:** *Työssäoppiminen*.\n* **Strategia:** Kohtele jokaista harjoittelupäivää työhaastatteluna.\n\n### 2. AMK\n* **Avain:** *Opinnäytetyö*.\n* **Strategia:** Tee toimeksianto yritykselle. Se on 3-6 kuukauden työhaastattelu.\n\n### 3. Yliopisto\n* **Avain:** *Ainejärjestöt*.\n* **Kulttuuri:** Liity hallitukseen. Se on valtava signaali aktiivisuudesta.`
      },
      'net_hackathons': {
        title: 'Hackathonit & Tapahtumat',
        summary: 'Junction ja Slush ovat kultaisia mahdollisuuksia.',
        content: `# Teknologiatapahtumat\n\n* **Junction:** Euroopan isoin hackathon.\n* **Slush:** Startup-tapahtuma. Vapaaehtoistyö täällä avaa ovet jatkojuhliin, missä todellinen verkostoituminen tapahtuu.`
      },
      'net_slush': {
        title: 'Slush & Startupit',
        summary: 'Vapaaehtoistyö Slushissa on legendaarinen tapa päästä piireihin.',
        content: `# Slush: Antikonferenssi\n\nMarraskuussa Helsingissä järjestettävä Slush on maailman johtava startup-tapahtuma. Se on pimeä, äänekäs ja täynnä lasereita.\n\n### Vapaaehtoisarmeija\nSlush on rakennettu tuhansien vapaaehtoisten voimin.\n* **Miksi?** Pääset ilmaiseksi sisään, eksklusiivisiin jatkobileisiin ja liityt massiiviseen alumniverkostoon.\n* **Roolit:** Lavarakentamisesta sijoittajien opastamiseen. Se todistaa "can-do" -asennetta, jota suomalaiset rakastavat.`
      },
      'net_cold_msg': {
        title: 'Kylmäviestit',
        summary: 'Miten lähestyä ihmisiä olematta ärsyttävä.',
        content: `# Lähestymisen taide\n\nSuomalaiset ovat kiireisiä mutta avuliaita. Pidä viesti lyhyenä.\n\n### Malli\n"Hei [Nimi], näin postauksesi aiheesta [Aihe]. Olen [Taito]-asiantuntija muuttamassa Suomeen. Haluaisin kysyä yhden nopean kysymyksen [Yksityiskohta]. Ehtisitkö 10 min virtuaalikahville?"`
      },
      'net_parents': {
        title: 'Verkostoituminen vanhemmille',
        summary: 'Kiireisille vanhemmille mikrokohtaamiset ovat avain.',
        content: `# Vanhempien verkostot\n\nKun tasapainoilet työn ja perheen välillä, perinteiset tapahtumat voivat olla mahdottomia.\n\n### Mikrokohtaamiset\n* **Leikkipuistodiplomatia:** Jos näet saman vanhemman puistossa toistuvasti, sano "Moi".\n* **Päiväkodin talkoot:** Osallistu talkoisiin. Se on nopein tapa saada muiden vanhempien kunnioitus.`
      },
      'net_introvert': {
        title: 'Verkostoituminen introverteille',
        summary: 'Sinun ei tarvitse olla äänekäs. Suomi on introvertille ystävällinen maa.',
        content: `# Verkostoidu omalla tavallasi\n\nKaikki eivät pidä isoista tapahtumista. Onneksi suomalainen kulttuuri kunnioittaa tilaa.\n\n### Strategiat\n1. **Kahden kesken:** Suomalaiset suosivat syvällisiä kahdenkeskisiä keskusteluja minglailun sijaan. Pyydä yhtä ihmistä "virtuaalikahville".\n2. **Verkkoyhteisöt:** Liity alasi Discord- tai Slack-kanaville (esim. Koodiklinikka IT-alalla).`
      },
      'net_hobbies': {
        title: 'Harrastukset & Verkostot',
        summary: 'Liity paikalliseen toimintaan tavataksesi ihmisiä luonnollisesti.',
        content: `# Tapaa ihmisiä luonnollisesti\n\nSuomalaiset ystävystyvät yhteisen tekemisen kautta.\n\n### Ideoita\n* **Kansalaisopistot:** Halpoja kursseja keramiikasta kieliin.\n* **Urheilu:** Salibandy tai jalkapallo. Aloittelijaryhmät ovat loistava tapa päästä porukkaan.`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Henkilötunnus', 
        summary: 'Hanki henkilötunnus ollaksesi olemassa virallisesti.', 
        content: `**Prioriteetti: VÄLITÖN**\n\n### Tehtävä\nOlla olemassa virallisesti. Ilman rekisteröitymistä **Digi- ja väestötietovirastoon (DVV)** olet haamu järjestelmässä.\n\n### Palkinto\nSinun **Henkilötunnus** (hetu). Muoto: *PPKKVV-XXXX*.\n\n### Miksi tarvitset sitä\n1. Pankkitili.\n2. Puhelinliittymä.\n3. Verokortti.\n4. Terveyspalvelut.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Maahanmuutto)', 
        summary: 'Oleskelulupa ja ajanvarausvinkit.', 
        content: `# Migri 🛂\n\n### Tehtävä\nOleskeluluvan (oleskelulupa) saaminen.\n\n### Vinkit\n* **Enter Finland:** Käytä verkkopalvelua. Se on paljon nopeampi.\n* **Tunnistautuminen:** Sinun on käytävä palvelupisteessä todistamassa henkilöllisyytesi.\n* **Pikakaista:** Saatavilla erityisasiantuntijoille ja startup-yrittäjille (14 päivää).` 
      },
      'bureaucracy_tax': { 
        title: 'Verokortti', 
        summary: 'Ilman verokorttia veroprosentti on 60%. Ei poikkeuksia.', 
        content: `# Kultainen sääntö\nEi korttia = **60% vero**. \n\n### Prosessi\n1. Kirjaudu **OmaVeroon** pankkitunnuksilla.\n2. Arvioi vuositulot.\n3. Lataa PDF.\n4. Lähetä palkanlaskentaan/pomolle.\n\n*Huom: Suomessa on progressiivinen verotus. Mitä enemmän tienaat, sitä suurempi prosentti.*` 
      },
      'bureaucracy_bank': { 
        title: 'Pankkitilin avaaminen', 
        summary: 'Pankkitili antaa "vahvan sähköisen tunnistautumisen", avaimen kaikkiin digipalveluihin.', 
        content: `# Haaste\nRahanpesulait ovat tiukkoja. Pankin on tiedettävä rahojesi alkuperä.\n\n### Mitä mukaan\n1. Passi.\n2. Oleskelulupa.\n3. Työsopimus.\n4. Henkilötunnus (DVV:ltä).\n\n### Graalin malja\n**Verkkopankkitunnukset**. Näillä pääset Kelaan, Veroon, Terveyspalveluihin ja Postiin.` 
      },
      'social_kela_card': {
        title: 'Kela-kortti',
        summary: 'Sininen kortti todistaa, että kuulut kansalliseen sairausvakuutukseen.',
        content: `# Mikä se on?\nSininen kortti, joka todistaa kuulumisesi Suomen sosiaaliturvaan.\n\n### Käyttö\nNäytä se:\n1. **Apteekissa:** Saat suorakorvauksen reseptilääkkeistä.\n2. **Yksityisillä lääkäriasemilla:** Saat pienen osan kuluista vähennettyä.`
      },
      'social_health': {
        title: 'Julkinen vs. Työterveys',
        summary: 'Työntekijöiden tulisi käyttää työterveyttä ensin. Se on nopea ja ilmainen.',
        content: `# Kaksi järjestelmää\n\n**1. Julkinen (Terveysasema)**\n* **Kenelle:** Kaikille asukkaille.\n* **Hinta:** Halpa (~20€) tai ilmainen.\n* **Nopeus:** Voi olla hidas. Sinun täytyy soittaa varataksesi ajan.\n\n**2. Työterveys**\n* **Kenelle:** Työntekijöille.\n* **Hinta:** Ilmainen sinulle (työnantaja maksaa).\n* **Nopeus:** Nopea. Yleensä yksityiset klinikat kuten Terveystalo tai Mehiläinen.`
      },
      'social_unemployment': {
        title: 'Työttömyysturva',
        summary: 'Ilmoittaudu TE-toimistoon ENSIMMÄISENÄ työttömyyspäivänä.',
        content: `# Kultainen sääntö\nIlmoittaudu työnhakijaksi **TE-palveluihin** (te-palvelut.fi) heti **ensimmäisenä** työttömyyspäivänäsi. Jos viivyttelet, menetät rahaa.\n\n### Kuka maksaa?\n1. **Työttömyyskassa:** Jos olet jäsen (26 viikkoa), saat ansiosidonnaista päivärahaa (paljon suurempi).\n2. **Kela:** Jos et ole jäsen, saat peruspäivärahaa (pienempi).`
      },
      'social_housing': {
        title: 'Asumistuki',
        summary: 'Kela voi maksaa osan vuokrasta, jos tulot ovat pienet.',
        content: `# Yleinen asumistuki\n* **Kenelle:** Pienituloiset kotitaloudet (opiskelijat, osa-aikaiset, työttömät).\n* **Laskenta:** Riippuu kokonaistuloista ja kaupungista.\n* **Haku:** Verkossa Kelassa. Tarvitset vuokrasopimuksen.`
      },
      'social_pension': {
        title: 'Eläkejärjestelmä',
        summary: 'Kerrytät eläkettä jokaisesta ansaitusta eurosta.',
        content: `# Miten se toimii\nTyönantaja vähentää eläkemaksun palkasta automaattisesti. Sinun ei tarvitse tehdä mitään.\n\n### Tarkistus\nKatso kertynyt summa osoitteesta **Tyoelake.fi**.\n\n### Lähteminen?\nJos muutat toiseen EU-maahan, eläkeoikeudet säilyvät.`
      },
      'job_market_overview': { 
        title: 'Työmarkkinat', 
        summary: 'Ymmärrä kenttä.', 
        content: `### Yleiskatsaus\nSuomen markkinat arvostavat taitoja ja asennetta. Vaikka suomi on usein vaatimus, monet teknologia- ja insinööriyritykset toimivat englanniksi.` 
      },
      'job_te_office': {
        title: 'TE-palvelut',
        summary: 'Työvoimatoimisto auttaa kotoutumisessa ja työttömyysturvassa.',
        content: `# Mitä he tekevät\n* **Kotoutumissuunnitelma:** Määrittelevät tarvitsetko suomen kielen kursseja.\n* **Työnhakijastatus:** Pakollinen rahan saamiseksi Kelalta tai kassalta.\n* **Varoitus:** Noudata heidän ohjeitaan tarkasti välttääksesi karenssin.`
      },
      'job_portals': {
        title: 'Mistä löytää töitä',
        summary: 'Tärkeimmät portaalit, jotka sinun tulisi tietää.',
        content: `# Tärkeimmät sivustot\n* **LinkedIn:** #1 englanninkielisille/asiantuntijatöille.\n* **Oikotie Työpaikat:** Suomen suurin sivusto.\n* **Duunitori:** Myös erittäin suosittu.\n* **The Hub:** Paras startup- ja teknologiatöille.`
      },
      'job_entrepreneurship': {
        title: 'Yrittäjyys',
        summary: 'Suomi tarvitsee yrittäjiä. Aloittamiseen on rahaa.',
        content: `# Starttiraha\nJos ryhdyt päätoimiseksi yrittäjäksi, voit saada n. 700€/kk 6-12 kuukauden ajan toimeentulon turvaamiseksi.\n\n**Tärkeää:** Hae **ennen** yrityksen rekisteröintiä.`
      },
      'job_cv_tips': {
        title: 'Suomalainen CV-tyyli',
        summary: 'Lyhyt, asiapitoinen ja kuvallinen.',
        content: `# Tarkistuslista\n1. **Pituus:** Max 2 sivua. Mieluiten 1.\n2. **Kuva:** Standardi täällä. Hymyile, ammattimainen.\n3. **Profiili:** Lyhyt tiivistelmä alussa.\n4. **Taidot:** Listaa teknologiat tai kovat taidot konkreettisesti.\n5. **Sävy:** Nöyrä mutta itsevarma. Kerro faktoja, älä adjektiiveja.`
      },
      'job_cover_letter': {
        title: 'Hakemuskirje',
        summary: 'Älä toista CV:tä. Vastaa "Miksi me?" ja "Miksi sinä?".',
        content: `# Rakenne\n1. **Koukku:** Miksi haluat juuri *tämän* työn?\n2. **Arvo:** Mitä ongelmia ratkaiset heille?\n3. **Persoona:** Sovitko tiimiin?\n\n### Vinkki\nPidä alle 1 sivussa. Suomalaiset arvostavat ytimekkyyttä.`
      },
      'job_interview': {
        title: 'Työhaastattelu',
        summary: 'Rehellisyys testataan. Hiljaisuus on ok.',
        content: `# Mitä odottaa\n* **Rehellisyys:** Jos et tiedä, sano "En tiedä, mutta voin oppia". Älä valehtele.\n* **Hiljaisuus:** Jos haastattelija on hiljaa vastauksesi jälkeen, älä panikoi. Hän miettii. Älä pälätä täyttääksesi aukkoa.\n* **Kahvi:** Ota aina vastaan, jos tarjotaan. Se on rituaali.`
      },
      'job_recognition': {
        title: 'Tutkintojen tunnustaminen',
        summary: 'Kriittinen säännellyille ammateille kuten lääkärit, sairaanhoitajat, opettajat.',
        content: `# Säännellyt ammatit\nTerveys-/opetusalalla tutkinnon on oltava **OPH**:n tai **Valviran** tunnustama.\n\n### Yleiset roolit\nIT- tai liiketoiminta-aloilla virallista tunnustamista tarvitaan harvoin. Taidot merkitsevät enemmän.`
      },
      'work_contract': { 
        title: 'Työsopimus', 
        summary: 'Aina kirjallinen. Lue huolella. Tarkista TES.', 
        content: `# Avainkohdat\n1. **Kesto:** Toistaiseksi voimassa oleva tai Määräaikainen.\n2. **TES:** Työehtosopimus. Määrittelee minimipalkan ja lomat.\n3. **Koeaika:** Max 6 kuukautta.\n\n**Älä koskaan aloita töitä ilman sopimusta.**` 
      },
      'work_hours': {
        title: 'Työajat',
        summary: 'Standardi on 7,5 tai 8 tuntia päivässä.',
        content: `# Tasapaino\n* **Kokoaikainen:** Yleensä 37,5 tai 40 tuntia/viikko.\n* **Joustavuus:** Monissa paikoissa on "liukuma". Tule 7-9, lähde 15-17.\n* **Lounas:** Yleensä 30 min (palkaton).`
      },
      'work_holidays': {
        title: 'Vuosilomat',
        summary: 'Suomessa on anteliaat lomat, mutta ne pitää ansaita.',
        content: `# Lomavuosi\nAnsaitset päiviä 1. huhtikuuta - 31. maaliskuuta.\n* **Standard:** 2,5 päivää/kk = 30 päivää (5 viikkoa)/vuosi.\n* **Kesä:** Yleensä pidetään heinäkuussa. Maa pysähtyy.\n* **Lomaraha:** Monet saavat 50% lisäpalkkaa lomasta.`
      },
      'work_unions': {
        title: 'Ammattiliitot',
        summary: 'Erittäin suositeltavaa. Ne hallinnoivat työttömyyskassoja.',
        content: `# Miksi liittyä?\n1. **Raha:** He maksavat ansiosidonnaista päivärahaa (paljon korkeampi kuin Kela).\n2. **Laki:** Ilmainen lakiapu, jos työnantaja kohtelee huonosti.\n\n### Mikä liitto?\n* **YTK:** Pelkkä työttömyyskassa (halvempi).\n* **TEK:** Insinööreille.\n* **PAM:** Palvelualalle.`
      },
      'work_probation': {
        title: 'Koeaika',
        summary: 'Ensimmäiset 6 kuukautta ovat yleensä koeaikaa.',
        content: `# Säännöt\nKoeajalla (max 6 kk) **sekä sinä** että työnantaja voitte purkaa sopimuksen välittömästi ilman irtisanomisaikaa.`
      },
      'culture_meetings': { 
        title: 'Kokouskulttuuri', 
        summary: 'Suomalaiset ovat täsmällisiä ja asialistakeskeisiä. Small talk on minimaalista.', 
        content: `# Säännöt\n1. **Aloita ajoissa:** 09:00 tarkoittaa 09:00.\n2. **Asialista:** Pysy siinä.\n3. **Hiljaisuus:** Tarkoittaa hyväksyntää tai miettimistä. Ei ongelmaa.\n4. **Lopeta ajoissa:** Kunnioita muiden aikatauluja.` 
      },
      'culture_feedback': {
        title: 'Palautteenanto',
        summary: 'Palaute on suoraa ja asiapitoista. Älä ota henkilökohtaisesti.',
        content: `# Suoruus\nSuomalainen saattaa sanoa: *"Tästä raportista puuttuu X."*\nHe eivät ole epäkohteliaita. He toteavat faktan korjatakseen ongelman tehokkaasti. He erottavat työn ja ihmisen.`
      },
      'culture_names': {
        title: 'Nimet & Tittelit',
        summary: 'Hyvin epämuodollista. Titteleitä käytetään harvoin.',
        content: `# Moi Pomo\nKaikkia kutsutaan etunimellä. Kutsut toimitusjohtajaa "Matiksi", et "Herra Korhoseksi". Voit sinutella lähes kaikkia.`
      },
      'culture_punctuality': {
        title: 'Täsmällisyys',
        summary: '5 minuuttia myöhässä on myöhässä.',
        content: `# Aika on kunnioitusta\nMyöhästyminen on toisen ajan varastamista. Jos olet 5 min myöhässä, lähetä viesti.`
      },
      'culture_coffee': {
        title: 'Kahvitauot',
        summary: 'Pyhä rituaali. Usein laissa määrätty.',
        content: `# Rituaali\nUseimmissa sopimuksissa on kaksi 10-15 min taukoa.\n\n* **Sosialisoi:** Tässä ryhmäytyminen tapahtuu. Älä istu yksin työpöydän ääressä.\n* **Kofeiini:** Suomalaiset juovat eniten kahvia maailmassa.`
      },
      'culture_afterwork': {
        title: 'Afterwork (AW)',
        summary: 'Rennot juomat perjantaisin.',
        content: `# Ilmapiiri\nYleensä hyvin rentoa. Alkoholin tai virvoitusjuomien juominen on ok. Kyse on rentoutumisesta, ei humaltumisesta.`
      },
      'culture_sauna': {
        title: 'Saunadiplomatia',
        summary: 'Sauna on tasa-arvon paikka. Jopa liike-elämässä.',
        content: `# Säännöt\n1. **Tasa-arvo:** Saunassa ei ole titteleitä. CEO ja harjoittelija ovat tasa-arvoisia.\n2. **Alastomuus:** Luonnollista, ei seksuaalista.\n3. **Bisnes:** Päätöksiä tehdään joskus täällä.`
      },
      'culture_smalltalk': {
        title: 'Hiljaisuus & Small Talk',
        summary: 'Hiljaisuus ei ole kiusallista. Se on mukava tauko.',
        content: `# Älä täytä tyhjiötä\nJos olet hississä suomalaisen kanssa, ei tarvitse puhua. Nyökkäys riittää. Arvostamme sanoja; emme tuhlaa niitä.`
      },
      'culture_party': {
        title: 'Pikkujoulut',
        summary: 'Joulukuun pikkujoulut voivat olla villit.',
        content: `# Poikkeus\nSuomalaiset ovat pidättyväisiä, PAITSI *Pikkujouluissa*. Nämä ovat vuosittaiset joulujuhlat. Yleensä paljon alkoholia ja kollegat ovat paljon avoimempia. Mitä tapahtuu Pikkujouluissa, jää Pikkujouluihin.`
      },
      'prof_engineering': {
        title: 'Insinöörityö Suomessa',
        summary: 'Valtava sektori. Englantia käytetään laajasti.',
        content: `# Jätit\nKone, Wärtsilä, Nokia, Metso.\n\n### Kulttuuri\nFaktapohjaista. Valmistele tekniset yksityiskohdat. Tarkkuutta arvostetaan myyntipuheiden sijaan.`
      },
      'prof_business': {
        title: 'Kaupallinen ala',
        summary: 'Vaatii usein suomea, paitsi startupit.',
        content: `# Este\nPerinteiset roolit (HR, Kirjanpito, Pankki) vaativat sujuvaa suomea.\n\n### Mahdollisuus\nEtsi *International Sales*, *Business Analytics* tai *Export* rooleja, joissa äidinkielesi on etu.`
      },
      'prof_it': {
        title: 'IT & Teknologia',
        summary: 'Helpoin sektori englanninkielisille.',
        content: `# Keskus\nSuomi tarvitsee koodareita. Englanti on yrityskieli lähes kaikissa teknologiayrityksissä (Wolt, Supercell, Relex).\n\n### Palkkaus\nUsein kooditesti. Näytä GitHubisi.`
      },
      'prof_health': {
        title: 'Terveys & Hoito',
        summary: 'Valtava pula, mutta kieli on pakollinen.',
        content: `# Todellisuus\nTarvitset Valviran luvan. Saadaksesi sen, tarvitset yleensä B1/B2 suomen kielen. Potilasturvallisuus on etusijalla.`
      },
      'prof_service': {
        title: 'Palveluala',
        summary: 'Ravintolat ja siivous ovat yleisiä aloituspisteitä.',
        content: `# Aloitus\nSiivous ja ravintolakeittiöt palkkaavat usein ei-suomenkielisiä. Se on tapa alkaa tienata samalla kun opit kieltä.`
      },
      'housing_contracts': {
        title: 'Vuokrasopimukset',
        summary: 'Turvallisia ja säänneltyjä.',
        content: `# Ehdot\n* **Takuuvuokra:** Yleensä 2 kuukauden vuokra.\n* **Irtisanominen:** Yleensä 1 kalenterikuukausi vuokralaiselle.\n* **Kotivakuutus:** Lähes aina pakollinen.`
      },
      'housing_finding': {
        title: 'Asunnon etsintä',
        summary: 'Markkina on nopea Helsingissä.',
        content: `# Portaalit\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Vinkki\nOle nopea. Mene näyttöön valmiin hakemuksen kanssa.`
      },
      'housing_utilities': {
        title: 'Sähkö & Vesi',
        summary: 'Teet yleensä oman sähkösopimuksen.',
        content: `# Sähkö\nEi sisälly vuokraan. Sinun on valittava tarjoaja ja tehtävä sopimus.\n\n### Vesi\nUsein kiinteä maksu (esim. 20€/hlö/kk).`
      },
      'housing_recycling': {
        title: 'Kierrätysopas',
        summary: 'Suomalaiset kierrättävät kaiken.',
        content: `# Astiat\n* **Bio:** Ruokajäte.\n* **Muovi:** Muovipakkaukset.\n* **Kartonki:** Maitotölkit, pahvi.\n* **Paperi:** Paperi, sanomalehdet.\n\n### Pantti\nPulloilla ja tölkeillä on pantti (10c - 40c). Palauta kaupan automaattiin saadaksesi rahaa.`
      },
      'housing_sauna': {
        title: 'Pesutupa & Sauna',
        summary: 'Useimmissa taloissa on yhteiset tilat.',
        content: `# Taloyhtiö\n* **Pesula:** Yleensä varauslista.\n* **Lenkkisauna:** Ilmainen viikoittainen saunavuoro kaikille (miehet/naiset erikseen).\n* **Oma vuoro:** Voit varata viikoittaisen yksityisen tunnin pientä maksua vastaan.`
      },
      'family_school': {
        title: 'Koulujärjestelmä',
        summary: 'Yksi maailman parhaista. Ja ilmainen.',
        content: `# Perusteet\n* **Alkaa:** 7-vuotiaana.\n* **Hinta:** Ilmainen. Sisältää kirjat ja lämpimän lounaan.\n* **Kieli:** Yleensä suomi tai ruotsi. Kansainvälisiä kouluja on, mutta niihin on jonot.`
      },
      'family_daycare': {
        title: 'Päiväkoti',
        summary: 'Jokaisella lapsella on oikeus päivähoitoon.',
        content: `# Haku\nHae 4 kuukautta etukäteen. Voimakkaasti tuettu.\n\n### Hinta\nPerustuu tuloihin. Max ~300€/kk. Pienituloisille ilmainen.`
      },
      'family_activities': {
        title: 'Harrastukset & Urheilu',
        summary: 'Harrastukset otetaan täällä vakavasti.',
        content: `# Vaihtoehdot\n* **Kirjastot:** Oodi tarjoaa 3D-tulostimia, ompelukoneita, pelihuoneita ilmaiseksi.\n* **Urheilu:** Jalkapallo, salibandy, jääkiekko ovat isoja.\n* **Musiikki:** Musiikkiopistot ovat korkealaatuisia.`
      },
      'family_winter': {
        title: 'Lapset & Talvi',
        summary: 'Ei ole huonoa säätä, vain huonoja vaatteita.',
        content: `# Vaatetus\n* **Kerrokset:** Villakerros, fleecekerros, vedenpitävä ulkokerros.\n* **Haalari:** Yksiosainen haalari on standardi lasten univormu.\n* **Heijastimet:** Pakollisia turvallisuuden vuoksi pimeässä.`
      },
      'family_safety': {
        title: 'Turvallisuus & Itsenäisyys',
        summary: 'Suomi on erittäin turvallinen. Lapset menevät kouluun yksin.',
        content: `# Itsenäisyys\nÄlä panikoi, jos näet 7-vuotiaan yksin metrossa. Se on normaalia. Yhteiskunta pitää heidät turvassa.`
      },
      'vol_redcross': {
        title: 'Punainen Risti',
        summary: 'Helpoin tapa tavata paikallisia ja tehdä hyvää.',
        content: `# Punainen Risti\nYksi Suomen suurimmista järjestöistä. He etsivät jatkuvasti vapaaehtoisia.\n\n### Toiminta\n* **Ystävätoiminta:** Vieraile yksinäisten vanhusten luona.\n* **Läksyapu:** Auta maahanmuuttajalapsia koulutehtävissä.\n* **Festivaalit:** Ensiapu ja logistiikka kesäfestivaaleilla.\n\n### Miksi liittyä?\nSe näyttää hyvältä CV:ssä ja harjoittelet suomea turvallisessa ympäristössä.`
      },
      'vol_animals': {
        title: 'Eläinsuojelu',
        summary: 'Auta eläimiä HESY:ssä ja muissa löytöeläintaloissa.',
        content: `# HESY (Helsingin eläinsuojeluyhdistys)\nJos rakastat eläimiä, tämä on sinulle.\n\n### Mitä voit tehdä?\n* **Kissojen sosiaalistaminen:** Kyllä, silitä kissoja totuttaaksesi ne ihmisiin.\n* **Koirien ulkoilutus:** Hyvää liikuntaa ja seuraa.\n* **Siivous:** Auta pitämään tarha puhtaana.\n\nYleensä vaatii sitoutumista (esim. kerran viikossa).`
      },
      'vol_events': {
        title: 'Tapahtumavapaaehtoisuus',
        summary: 'Slush, Flow Festival, Nordic Business Forum.',
        content: `# Pikakaista verkostoihin\nIsot tapahtumat pyörivät vapaaehtoisvoimin.\n\n### Diili\nTeet 2-3 vuoroa. Vastineeksi saat:\n* Ilmaisen lipun lopputapahtumaan.\n* Ilmaista ruokaa & eksklusiiviset bileet.\n* **Alumniverkosto:** Tämä on kultakaivos. Monet löytävät töitä kanssavapaaehtoisten kautta.`
      },
      'vol_humanitarian': {
        title: 'Avustustyö',
        summary: 'Leipäjonot ja asunnottomien auttaminen.',
        content: `# Haavoittuvimpien auttaminen\nJärjestöt kuten **Hurstin Apu** organisoivat ruoanjakelua vähävaraisille.\n\n### Todellisuus\nSe on kovaa työtä, mutta erittäin palkitsevaa. Näet yhteiskunnan puolen, joka on usein piilossa. Se maadoittaa ja yhdistää sinut ihmisiin, jotka todella välittävät toisista.`
      },
      'daily_transport': { 
        title: 'Julkinen liikenne (HSL/VR)', 
        summary: 'Miten käyttää junia, busseja ja vyöhykejärjestelmää.',
        content: `# Liikkuminen\n\n### HSL (Helsingin seutu)\n* **Vyöhykkeet:** Lipun hinta riippuu vyöhykkeistä (ABCD). Helsinki on AB.\n* **Sovellus:** Lataa HSL-sovellus. Se on halvempi kuin kuljettajalta ostaminen.\n* **Sakko:** Ei lippua = 80€ tarkastusmaksu.\n\n### VR (Junat)\nPitkille matkoille. Varaa ajoissa halpojen lippujen saamiseksi.`,
      },
      'daily_groceries': { 
        title: 'Ruokakaupat', 
        summary: 'Punnitse vihannekset ja palauta pullot.', 
        content: `# Supermarketin säännöt\n\n1. **Punnitus:** Sinun täytyy punnita hedelmät/vihannekset ja liimata hintalappu pussiin *ennen* kassaa.\n2. **S-Ryhmä vs K-Ryhmä:** Kaksi pääketjua. Hanki bonuskortti (S-Etukortti) jos jäät pidemmäksi aikaa.\n3. **Alkoholi:** Olutta saa kaupoista klo 21 asti. Vahvemmat vain **Alkosta** (valtion monopoli).`,
      },
      'daily_pantti': {
        title: 'Pullonpalautus (Pantti)',
        summary: 'Älä heitä tölkkejä pois! Ne ovat rahaa.',
        content: `# Pantti-järjestelmä\n\nLähes jokaisella pullolla ja tölkillä on panttiarvo (10c - 40c).\n\n1. **Kerää:** Älä rutista niitä.\n2. **Palauta:** Automaatit ovat jokaisen kaupan eteisessä.\n3. **Raha:** Saat kuitin. Käytä se kassalla vähentääksesi ruokaostosten hintaa.`,
      },
      'nature_everyman': { 
        title: 'Jokamiehenoikeudet', 
        summary: 'Voit kävellä melkein missä vain ja poimia marjoja.', 
        content: `# Jokamiehenoikeudet\n\nSinulla on oikeus:\n1. **Kävellä:** Missä tahansa metsässä (paitsi yksityispihoilla).\n2. **Poimia:** Marjoja ja sieniä vapaasti.\n3. **Leiriytyä:** Tilapäisesti luontoon.\n\n**Säännöt:** Älä häiritse lintuja, älä jätä roskia, älä kaada puita.`, 
      },
      'nature_winter': { 
        title: 'Talvesta selviytyminen', 
        summary: 'Pimeys ja D-vitamiini.', 
        content: `# Pimeys (Kaamos)\n\nMarras-tammikuussa auringonvalo on harvinaista.\n* **D-vitamiini:** Ota lisiä. Pakollinen.\n* **Heijastimet:** Käytä niitä. Se on laki.\n* **Nastat:** Nastakengät estävät liukastumisen jäällä.`, 
      },
      'nature_summer': {
        title: 'Mökkielämä',
        summary: 'Suomalainen sielu asuu täällä.',
        content: `# Mökkielämä\n\nHeinäkuussa kaupungit tyhjenevät. Kaikki menevät mökille.\n* **Yksinkertaista:** Monilla ei ole sähköä tai juoksevaa vettä.\n* **Aktiviteetti:** Sauna, uinti, grillaus, toista.`,
      }
    }
  }
};
