
import { TranslationResource } from "./types";

export const fi: TranslationResource = {
  ui: {
    landing_welcome: "Tervetuloa!", landing_subtitle: "Löydä polkusi työhön Suomessa", landing_btn_quiz: "Kerro itsestäsi", landing_btn_continue: "Avaa oppaani", landing_btn_ask: "Aloita keskustelu", landing_btn_browse: "Selaa opasta", landing_load_sample: "Lataa malliprofiili", landing_erase: "Tyhjennä tiedot", landing_add_key: "Lisää API-avain", landing_choose_lang: "Valitse kieli",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Tervetuloa takaisin henkilökohtaiseen oppaaseesi.", dash_subtitle_guest: "Luodaan sinulle profiili, jotta pääsemme alkuun.", dash_btn_guide: "Avaa opas", dash_btn_browse: "Selaa opasta", dash_btn_ask: "Kysy tekoälyltä", dash_btn_history: "Historia", dash_btn_cv: "Tuo CV", dash_switch_profile: "Vaihda", dash_new_profile: "Uusi", dash_edit_profile: "Muokkaa", dash_profile_overview: "Profiili",
    dash_education: "Koulutus", dash_profession: "Ammatti", dash_languages: "Kielet", dash_narrative_aspirations: "Tavoitteet", dash_narrative_challenges: "Haasteet",
    chat_placeholder: "Kysy jotain...", chat_end_session: "Lopeta", chat_header_assistant: "Avustaja", chat_prompt_context_inquiry: "Kerro lisää kohdasta \"{sentence}\"", chat_ask_length: "Haluatko lyhyen vai kattavan vastauksen?", chat_empty_state: "Aloita keskustelu kysymällä jotain alla.", chat_length_set_confirm: "Selvä. Miten voin auttaa?",
    btn_back_dashboard: "Takaisin", btn_save: "Tallenna",
    profile_btn_guide: "Oppaani", profile_btn_guide_desc: "Suositellut artikkelit", profile_btn_plan: "Suunnitelma", profile_btn_plan_desc: "Tulossa pian", profile_sect_languages: "Kielet", profile_sect_skills: "Taidot", profile_sect_narrative: "Tarina", profile_label_aspirations: "Tavoitteet", profile_label_challenges: "Pelot / haasteet", profile_label_education: "Koulutus", profile_label_profession: "Ammatti", profile_completeness: "{percentage}% valmis", profile_completeness_hint: "Vastaa vielä muutamaan kysymykseen", profile_btn_update: "Päivitä profiili", profile_btn_continue: "Jatka kyselyä",
    wiki_header_title: "Suomi Toimii!", wiki_header_subtitle: "Räätälöity: {name}", wiki_explore_cats: "Selaa aiheita", wiki_explore_subtitle: "Valitse aihe syventyäksesi yksityiskohtiin.", wiki_full_index: "Hakemisto", wiki_full_index_subtitle: "Selaa kaikkia aiheita.", wiki_nav_list: "Lista", wiki_nav_icons: "Kuvakkeet", wiki_section_chapters: "Luvut", wiki_btn_mark_done: "Merkitse tehdyksi", wiki_btn_later: "Myöhemmin", wiki_btn_saved: "Tallennettu", wiki_btn_completed: "Valmis", wiki_ctx_ask: "Kysy tästä lauseesta", wiki_topic_label: "Aihe: {tag}", wiki_topic_desc: "Aiheen yleiskatsaus & artikkelit", wiki_guide_prefix: "OPAS", wiki_stat_articles: "artikkelia", wiki_stat_complete: "valmis", wiki_section_prefix: "Osa",
    wizard_header_quiz: "Kysely", wizard_greeting_short: "Moi, {name}!", wizard_title_init: "Luo profiilisi", wizard_title_custom: "{name}: Hahmonluonti", wizard_phase_identity: "VAIHE 1: IDENTITEETTI", wizard_phase_demo: "VAIHE 2: TAUSTA", wizard_phase_status: "VAIHE 3: STATUS", wizard_phase_skills: "VAIHE 4: TAIDOT", wizard_phase_mindset: "VAIHE 5: ASENNE", wizard_phase_vision: "VAIHE 6: VISIO", wizard_nickname_hint: "* Voit käyttää lempinimeä pysyäksesi anonyyminä.", wizard_btn_ask: "Kysy", wizard_btn_next: "Seuraava", wizard_btn_prev: "Edellinen", wizard_btn_submit: "Valmis", wizard_btn_finish_early: "Tallenna & Lopeta", wizard_btn_generate_name: "Keksi lempinimi!", wizard_ribbon_greeting: "Hauska tavata, {name}!", wizard_title_name: "Mikä on nimesi?", wizard_desc_name: "Syötä nimesi tai valitse lempinimi", wizard_placeholder_name: "Nimesi",
    wizard_step2_title: "Minkä ikäinen olet?", wizard_step2_desc: "Valitse ikäryhmä", wizard_step2_placeholder: "Ikäsi",
    wizard_step3_title: "Siviilisääty?",
    wizard_marital_solo_title: "Soolo", wizard_marital_solo_desc: "Ei puolisoa tai lapsia mukana", wizard_marital_pair_title: "Kumppani / Perhe", wizard_marital_pair_desc: "Muutan puolison, kumppanin tai lasten kanssa", wizard_marital_secret_title: "Salaisuus", wizard_marital_secret_desc: "Monimutkaista / En kerro",
    wizard_children_title: "Onko sinulla lapsia?", wizard_children_desc: "Tämä auttaa meitä neuvomaan päivähoito- ja kouluasioissa.", wizard_children_yes: "Kyllä", wizard_children_no: "Ei", wizard_family_details_title: "Kerro perheestäsi", wizard_family_count_label: "Montako lasta?", wizard_family_ages_label: "Minkä ikäisiä he ovat?", wizard_family_ages_hint: "Valitse kaikki sopivat.", wizard_age_group_0_6: "Päivähoito (0-6)", wizard_age_group_7_12: "Koulu (7-12)", wizard_age_group_13_17: "Teinit (13-17)", wizard_age_group_18: "Aikuiset (18+)",
    wizard_step4_title: "Mistä olet kotoisin?", wizard_step4_desc: "Valitse alkuperä", wizard_step4_placeholder: "Kirjoita maan nimi...", wizard_step4_no_match: "Ei tuloksia", wizard_btn_search_country: "Hae maa", wizard_btn_select_region: "Valitse alue", wizard_region_europe: "Eurooppa", wizard_region_americas: "Amerikka", wizard_region_asia: "Aasia", wizard_region_africa: "Afrikka", wizard_region_oceania: "Oseania", wizard_region_middle_east: "Lähi-itä", wizard_eu_question: "EU/ETA-kansalainen?", wizard_eu_yes: "Kyllä", wizard_eu_no: "Ei",
    wizard_step5_title: "Työoikeus & Lupa", wizard_permit_full_title: "Rajoittamaton", wizard_permit_full_desc: "Pysyvä, Perhe, EU tai Suomalainen tutkinto", wizard_permit_restricted_title: "Rajoitettu", wizard_permit_restricted_desc: "Työlupa sidottu alaan/työnantajaan", wizard_permit_student_title: "Opiskelija", wizard_permit_student_desc: "Rajoitetut työtunnit",
    wizard_step6_title: "Ylin koulutusaste", wizard_step6_desc: "Mikä kuvaa taustaasi parhaiten?", wizard_step6_field_label: "Ala (Valinnainen)", wizard_step6_field_placeholder: "esim. Insinööri, Taide", wizard_edu_general_title: "Yleissivistävä", wizard_edu_general_desc: "Lukio / Peruskoulu.", wizard_edu_applied_title: "Ammatillinen / AMK", wizard_edu_applied_desc: "Ammattikoulu tai Ammattikorkeakoulu.", wizard_edu_uni_title: "Yliopistotutkinto", wizard_edu_uni_desc: "Akateeminen tutkinto (Kandi, Maisteri, Tohtori).",
    wizard_step7_title: "Mikä on ammattisi?", wizard_step7_desc: "Tai mitä työtä etsit?", wizard_step7_placeholder: "esim. Sairaanhoitaja, Hitsaaja, Koodari",
    wizard_step8_title: "Suomen kieli", wizard_lbl_finnish_level: "Nykyinen taso", wizard_lbl_finnish_motivation: "Motivaatio oppia", wizard_opt_lang_none: "Ei vielä", wizard_opt_lang_basics: "Alkeet (A1)", wizard_opt_lang_inter: "Keskitaso (A2-B1)", wizard_opt_lang_fluent: "Sujuv (B2+)", wizard_scale_1_motivation: "Utelias", wizard_scale_5_motivation: "Pysäyttämätön",
    wizard_step9_title: "Englannin kieli", wizard_opt_lang_en_none: "Ei osaa", wizard_opt_lang_en_basic: "Perusteet", wizard_opt_lang_en_working: "Työkieli", wizard_opt_lang_en_fluent: "Natiivi/Sujuva",
    wizard_step10_title: "Visiosi", wizard_step10_aspirations_label: "Tavoitteet", wizard_step10_aspirations_placeholder: "Mitä toivot saavuttavasi?", wizard_step10_challenges_label: "Haasteet", wizard_step10_challenges_placeholder: "Mikä huolettaa?",
    wizard_step12_title: "Miltä suomalainen kulttuuri tuntuu?", wizard_opt_cult_low: "Kaunis mysteeri", wizard_opt_cult_med: "Tarkkailen ilolla", wizard_opt_cult_high: "Sukellan syvään päähän",
    wizard_step13_title: "Miten löydät elämänrytmin täällä?", wizard_scale_1_life: "Vielä jäässä", wizard_scale_5_life: "Kuin kotona",
    wizard_step14_title: "Kuinka varma olet työnhausta?", wizard_scale_1_career: "Tarvitsen suunnan", wizard_scale_5_career: "Minulla on suunnitelma",
    wizard_step15_title: "Kuinka selkeä polkusi on?", wizard_opt_info_none: "Hieman sumuinen", wizard_opt_info_some: "Pilvet hälvenevät", wizard_opt_info_high: "Kristallinkirkas",
    wizard_step16_title: "Mikä tuo sinulle iloa täällä?", wizard_opt_excite_career: "Uran rakentaminen", wizard_opt_excite_life: "Rauha & turva", wizard_opt_excite_nature: "Luonto & vuodenajat", wizard_opt_excite_adventure: "Seikkailu",
    wizard_rating_winter: "Talvi", wizard_rating_thaw: "Kevät", wizard_rating_growth: "Kasvu", wizard_rating_bloom: "Kukoistus", wizard_rating_summer: "Kesä",
    history_title: "Aikaisemmat keskustelut", history_empty: "Ei vielä keskusteluja.", history_tab_summary: "Tiivistelmä (AI)", history_tab_transcript: "Koko teksti", history_no_summary: "Ei tiivistelmää saatavilla.", history_generating: "AI kirjoittaa tiivistelmää...", history_generating_desc: "Tämä tapahtuu taustalla.",
    cv_title: "Analysoi CV", cv_subtitle: "Liitä CV:si teksti päivittääksesi profiilisi automaattisesti.", cv_placeholder: "Liitä CV/Ansioluettelo tähän...", cv_btn_analyze: "Analysoi & Tuo", cv_btn_processing: "Käsitellään...", cv_warning_key: "Henkilökohtainen API-avain vaaditaan.", cv_key_update: "Päivitä avain", cv_key_required: "API-avain vaaditaan", cv_key_desc: "Analysoidaksesi CV:n turvallisesti, syötä oma Gemini API-avaimesi.", cv_key_placeholder: "Liitä avain tähän...", cv_key_save: "Tallenna", cv_alert_success: "Avain tallennettu.", cv_alert_error: "CV:n analysointi epäonnistui.", cv_btn_manage_key: "API-avain",
    settings_title: "Asetukset", settings_sect_general: "Yleiset", settings_sect_appearance: "Ulkoasu", settings_sect_data: "Tiedot & Yksityisyys", settings_length_label: "Vastauksen pituus", settings_theme_label: "Teema", settings_theme_system: "Järjestelmä", settings_theme_light: "Vaalea", settings_theme_dark: "Tumma", settings_opt_ask: "Kysy aina", settings_opt_short: "Tiivis", settings_opt_long: "Kattava", settings_clear_data: "Nollaa sovelluksen tiedot", settings_clear_data_desc: "Tämä poistaa kaikki profiilit ja historian.", settings_btn_clear: "Nollaa kaikki",
    net_intro: "Tervetuloa verkostoitumaan – omalla tavallasi. Valitse sinulle sopiva tapa.",
    net_header: "Mihin haluat keskittyä juuri nyt?",
    net_opt_design: "Kohtaa ihmisiä (Design)",
    net_opt_linkedin: "LinkedIn-strategia",
    net_opt_hobbies: "Harrastukset & Toiminta",
    net_opt_parents: "Verkostoituminen vanhemmille",
    net_opt_introvert: "Vinkkejä introverteille",
  },
  wiki: {
    titles: {
      foundation: 'Perusasiat', job_strategy: 'Työnhakustrategia', workplace: 'Työkulttuuri', industries: 'Toimialaoppaat', life: 'Elämä & Tasapaino',
      identity: 'Henkilöllisyys & luvat', security: 'Sosiaaliturva', market: 'Työmarkkinat', tools: 'Työkalut', rights: 'Oikeudet & Syrjintä', networking: 'Verkostoituminen',
      social: 'Sosiaaliset rituaalit', norms: 'Ammatilliset normit', specialist: 'Asiantuntijat', hands_on: 'Käytännön työ', housing: 'Asuminen & Liikenne',
      family: 'Perhe', language: 'Kieli',
      social_unemployment: 'Työttömyysturva', social_housing: 'Asumistuki', social_pension: 'Eläkejärjestelmä', social_kela_card: 'Kela-kortti', social_health: 'Julkinen terveydenhuolto',
      bureaucracy_dvv: 'DVV & Henkilötunnus', bureaucracy_migri: 'Migri (Maahanmuutto)', bureaucracy_tax: 'Verokortti', bureaucracy_bank: 'Pankkitilin avaaminen',
      job_te_office: 'TE-toimisto', job_portals: 'Työpaikkasivustot', job_entrepreneurship: 'Yrittäjyys',
      net_culture: 'Verkostoitumiskulttuuri', net_linkedin: 'LinkedIn Strategia', net_hidden: 'Piilotyöpaikat', net_volunteering: 'Vapaaehtoistyö',
      job_cover_letter: 'Hakemuskirje', job_interview: 'Työhaastattelu', job_recognition: 'Tutkintojen tunnustaminen', job_cv_tips: 'Suomalainen CV',
      work_contract: 'Työsopimus', work_hours: 'Työajat', work_holidays: 'Vuosiloma', work_unions: 'Ammattiliitot', work_probation: 'Koeaika',
      culture_meetings: 'Kokouskulttuuri', culture_feedback: 'Palautteenanto', culture_names: 'Sinuttelu', culture_punctuality: 'Täsmällisyys', culture_coffee: 'Kahvitauot',
      culture_afterwork: 'Afterwork', culture_sauna: 'Saunadiplomatia', culture_smalltalk: 'Hiljaisuus & Small Talk', culture_party: 'Pikkujoulut',
      prof_engineering: 'Insinöörityö', prof_business: 'Kaupallinen ala', prof_it: 'IT & Teknologia', prof_health: 'Terveydenhuolto', prof_service: 'Palveluala',
      housing_contracts: 'Vuokrasopimus', housing_finding: 'Asunnon löytäminen', housing_utilities: 'Sähkö & Internet', housing_recycling: 'Kierrätysopas', housing_sauna: 'Pesutupa & Sauna',
      family_school: 'Koulujärjestelmä', family_daycare: 'Päiväkoti', family_activities: 'Harrastukset', family_winter: 'Lapset & Talvi', family_safety: 'Turvallisuus'
    },
    articles: {
      'guide_start': { 
        title: 'Tervetuloa Suomeen! 🇫🇮', 
        summary: 'Suomi toimii luottamuksella, hiljaisuudella ja kahvilla.',
        content: `### Selviytymisoppaasi\n\n**Filosofia:**\nSuomi on yhteiskunta, jossa systeemit toimivat, mutta sinun täytyy tietää kuinka niitä käytetään. Luottamus on kanssakäymisen valuuttaa, ja hiljaisuutta pidetään kunnioituksena.\n\n### Kuinka käytät tätä sovellusta\n1. **Lue:** Selaa oppaita.\n2. **Keskustele:** Kysy tekoälyltä.\n3. **Profiili:** Pidä tietosi ajan tasalla.` 
      },
      'net_culture': {
        title: 'Verkostoitumiskulttuuri',
        summary: 'Suomalaiset verkostoituvat tekemisen, eivät puhumisen kautta.',
        content: `### Talkoohenki\nVerkostoituminen Suomessa ei ole cocktail-kutsuilla seisoskelua. Se on **yhdessä tekemistä**.\n\n* **Vapaaehtoistyö:** Liity tapahtumatiimiin (Slush, festivaalit). Kun teet töitä suomalaisen rinnalla, rakennat luottamusta. Luottamus johtaa suosituksiin.\n* **Järjestöt:** Suomessa on yhdistys kaikelle. Etsi oman alasi järjestö.\n* **Laatu korvaa määrän:** Yksi aito yhteys on arvokkaampi kuin 100 käyntikorttia.`
      },
      'net_linkedin': {
        title: 'LinkedIn Strategia',
        summary: 'LinkedIn on rekrytoijien tärkein hakukone.',
        content: `### Digitaaliset kasvosi\n* **Avainsanat:** Rekrytoijat hakevat osaamista, eivät titteleitä. Käytä otsikossa sanoja "Java", "Projektinhallinta", "B2B-myynti".\n* **Sijainti:** Aseta sijainniksi Suomi. Jos olet ulkomailla, vaihda se silti "Helsinkiin" (ja mainitse muuttoaikeesi tekstissä), jotta näyt hauissa.\n* **Open to Work:** Vihreä banneri on täällä hyväksytty ja suositeltu. Se kertoo motivaatiosta.`
      },
      'net_hidden': {
        title: 'Piilotyöpaikat',
        summary: '70-80% työpaikoista ei tule koskaan julkiseen hakuun.',
        content: `### Miten löytää piilotyöpaikka?\nYritykset eivät ilmoita paikkoja, koska rekrytointi on kallista ja hidasta.\n\n1. **Kartouita:** Tee lista 20 kiinnostavasta yrityksestä.\n2. **Avoin hakemus:** Lähetä sähköposti suoraan tiiminvetäjälle (ei HR:lle). "Olen seurannut työtänne X:n parissa. Osaan Y:tä. Voisimmeko juoda 15 minuutin kahvit?"\n3. **Tiedonkeruuhaastattelut:** Kysy ihmisiltä heidän työstään, älä *pyydä* töitä. "Olen uusi alalla. Voinko kysyä 3 kysymystä siitä, miten tämä ala toimii Suomessa?" Useimmat auttavat mielellään.`
      },
      'net_volunteering': {
        title: 'Vapaaehtoistyö',
        summary: 'Nopein tapa integroitua ja todistaa taitosi.',
        content: `### Miksi vapaaehtoistyö?\n1. **Kieli:** Matala kynnys harjoitella suomea.\n2. **Suosittelijat:** Saat paikallisen suosittelijan, joka voi todistaa työmoraalisi.\n3. **Verkosto:** Tapaat aktiivisia ihmisiä.\n\n### Missä?\nPunainen Risti, startup-tapahtumat, urheiluseurat, kirjastot.`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Henkilötunnus', 
        summary: 'Hanki henkilötunnus, jotta olet virallisesti olemassa.',
        content: `**Prioriteetti: HETI**\n\n### Missio\nOlla olemassa virallisesti. Tarvitset **Henkilötunnuksen** (hetu).\n\n### Prosessi\n1. **Varaa aika:** DVV:n verkkosivuilta.\n2. **Asiakirjat:** Passi, oleskelulupa, työsopimus.\n3. **Kotikunta:** Tärkeä terveydenhuollon kannalta.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Maahanmuutto)', 
        summary: 'Hoida oleskelulupa Enter Finland -palvelussa.',
        content: `### Missio\nOleskelulupa.\n\n### Vinkit\n* **Enter Finland:** Käytä aina verkkopalvelua.\n* **Tunnistautuminen:** Varaa aika palvelupisteelle heti.\n* **Pikakaista:** Erityisasiantuntijoille ja startup-yrittäjille (14 pv).` 
      },
      'bureaucracy_tax': { 
        title: 'Verokortti', 
        summary: 'Ilman verokorttia palkasta menee 60% veroa.',
        content: `### Sääntö\nEi korttia = **60% veroa**.\n\n### Prosessi\n1. Kirjaudu **OmaVeroon**.\n2. Arvioi vuoden tulot.\n3. Lataa PDF.\n4. Lähetä palkanlaskentaan.` 
      },
      'bureaucracy_bank': { 
        title: 'Pankkitilin avaaminen', 
        summary: 'Pankkitunnukset ovat avain kaikkiin digipalveluihin.',
        content: `### Haaste\nPankit ovat tarkkoja rahanpesulakien takia.\n\n### Mukaan\n1. Passi.\n2. Oleskelulupa.\n3. Työsopimus.\n4. Henkilötunnus.\n\n### Palkinto\n**Vahva tunnistautuminen** (pankkitunnukset). Tällä pääset Kelaan, Verottajalle ja Omakantaan.` 
      },
      'social_kela_card': {
        title: 'Kela-kortti',
        summary: 'Sininen kortti todistaa kuulumisesi sairausvakuutukseen.',
        content: `### Mikä se on?\nTodiste siitä, että kuulut Suomen sosiaaliturvaan.\n\n### Käyttö\nNäytä apteekissa tai lääkäriasemalla saadaksesi suorakorvauksen.`
      },
      'social_health': {
        title: 'Julkinen vs. Työterveys',
        summary: 'Työntekijän kannattaa aina käyttää työterveyttä.',
        content: `### Kaksi järjestelmää\n\n**1. Julkinen (Terveysasema)**\n* **Kenelle:** Kaikille kuntalaisille.\n* **Hinta:** Pieni maksu (~20€).\n* **Nopeus:** Voi olla hidas.\n\n**2. Työterveys**\n* **Kenelle:** Työntekijöille.\n* **Hinta:** Sinulle ilmainen.\n* **Nopeus:** Nopea. Usein yksityisellä (Terveystalo, Mehiläinen).`
      },
      'social_unemployment': {
        title: 'Työttömyysturva',
        summary: 'Ilmoittaudu TE-toimistoon HETI ensimmäisenä työttömyyspäivänä.',
        content: `### Kultainen sääntö\nIlmoittaudu työttömäksi työnhakijaksi **TE-palveluihin** viimeistään ensimmäisenä työttömyyspäivänä.\n\n### Kuka maksaa?\n1. **Työttömyyskassa:** Jos olet jäsen, saat ansiopäivärahaa (enemmän).\n2. **Kela:** Jos et ole jäsen, saat peruspäivärahaa (vähemmän).`
      },
      'social_housing': {
        title: 'Asumistuki',
        summary: 'Kela voi maksaa osan vuokrasta, jos tulot ovat pienet.',
        content: `### Yleinen asumistuki\n* **Kenelle:** Pienituloisille ruokakunnille.\n* **Haku:** Hae Kelan asiointipalvelussa. Tarvitset vuokrasopimuksen.`
      },
      'social_pension': {
        title: 'Eläkejärjestelmä',
        summary: 'Kerrytät eläkettä jokaisesta tienatusta eurosta.',
        content: `### Miten se toimii\nTyönantaja pidättää eläkemaksun automaattisesti palkasta.\n\n### Tarkistus\nVoit tarkistaa kertyneen eläkkeesi osoitteesta **Tyoelake.fi**.`
      },
      'job_market_overview': { 
        title: 'Piilotyöpaikat', 
        summary: '70-80% työpaikoista ei tule julkiseen hakuun.', 
        content: `### Piilotyömarkkinat\nSuurin osa paikoista täytetään suhteilla tai suorilla yhteydenotoilla.\n\n### Strategia\n1. **Suora kontaktointi:** Älä odota ilmoitusta. Lähetä sähköpostia suoraan pomolle.\n2. **LinkedIn:** Pidä profiili kunnossa.\n3. **Luottamus:** Suomalainen palkkaa tutun tai suositellun.` 
      },
      'job_te_office': {
        title: 'TE-palvelut',
        summary: 'TE-toimisto auttaa kotoutumisessa ja työnhaussa.',
        content: `### Tehtävät\n* **Kotoutumissuunnitelma:** Kielikurssit.\n* **Työnhakijastatus:** Pakollinen työttömyysturvan saamiseksi.\n* **CV-netti:** Profiilin julkaisu.`
      },
      'job_portals': {
        title: 'Mistä löytää töitä',
        summary: 'Tärkeimmät sivustot.',
        content: `### Sivustot\n* **LinkedIn:** Asiantuntijatyöt.\n* **Oikotie Työpaikat:** Suurin suomalainen.\n* **Duunitori:** Suosittu.\n* **The Hub:** Startupit.`
      },
      'job_entrepreneurship': {
        title: 'Yrittäjyys',
        summary: 'Starttiraha auttaa alkuun.',
        content: `### Starttiraha\nNoin 700€/kk tuki uudelle yrittäjälle 6-12 kk ajan.\n\n**Tärkeää:** Hae tukea **ennen** yrityksen perustamista.`
      },
      'job_cv_tips': {
        title: 'Suomalainen CV',
        summary: 'Lyhyt, asiallinen ja kuvallinen.',
        content: `### Muistilista\n1. **Pituus:** Max 2 sivua.\n2. **Kuva:** Vakio Suomessa.\n3. **Profiili:** Lyhyt tiivistelmä alussa.\n4. **Tyyli:** Ole rehellinen mutta itsevarma. Kerro faktoja.`
      },
      'job_cover_letter': {
        title: 'Hakemuskirje',
        summary: 'Vastaa kysymykseen "Miksi juuri sinä?".',
        content: `### Rakenne\n1. **Motivaatio:** Miksi haluat juuri tämän työn?\n2. **Arvo:** Mitä ongelmia ratkaiset?\n3. **Persoona:** Sovitko tiimiin?`
      },
      'job_interview': {
        title: 'Työhaastattelu',
        summary: 'Rehellisyys on tärkeintä.',
        content: `### Odotukset\n* **Rehellisyys:** Älä valehtele. Jos et osaa, sano että opit.\n* **Hiljaisuus:** Älä pelkää taukoja keskustelussa.`
      },
      'job_recognition': {
        title: 'Tutkintojen tunnustaminen',
        summary: 'Tärkeää säännellyillä aloilla (lääkärit, opettajat).',
        content: `### Viranomaiset\n**OPH** (Opetushallitus) tai **Valvira** (Sosiaali- ja terveysala).`
      },
      'work_contract': { 
        title: 'Työsopimus', 
        summary: 'Aina kirjallisena. Tarkista TES.',
        content: `### Elementit\n1. **Kesto:** Toistaiseksi voimassa oleva vai määräaikainen.\n2. **TES:** Työehtosopimus määrittää minimipalkan ja lomat.\n3. **Koeaika:** Max 6 kk.` 
      },
      'work_hours': {
        title: 'Työajat',
        summary: 'Normaalisti 7,5 tai 8 tuntia päivässä.',
        content: `### Jousto\n* **Liukuma:** Voit usein aloittaa klo 7-9 välillä.\n* **Lounas:** Yleensä 30 min (omalla ajalla).`
      },
      'work_holidays': {
        title: 'Vuosiloma',
        summary: 'Lomaa kertyy 2-2,5 päivää kuukaudessa.',
        content: `### Lomakausi\n* **Kesäloma:** Pidetään yleensä heinäkuussa.\n* **Lomaraha:** Monet saavat 50% ekstraa lomapalkasta (lomaltapaluuraha).`
      },
      'work_unions': {
        title: 'Ammattiliitot',
        summary: 'Liittyminen on suositeltavaa. He hallinnoivat työttömyyskassoja.',
        content: `### Miksi liittyä?\n1. **Turva:** Ansiopäiväraha on paljon suurempi kuin Kelan tuki.\n2. **Apua:** Lakimiesapua riitatilanteissa.\n\n### Esimerkkejä\n* **YTK:** Pelkkä kassa (halvempi).\n* **TEK:** Tekniikan ala.\n* **PAM:** Palvelualat.`
      },
      'work_probation': {
        title: 'Koeaika',
        summary: 'Ensimmäiset 6kk ovat usein koeaikaa.',
        content: `### Säännöt\nKoeajalla kumpi tahansa voi purkaa sopimuksen ilman irtisanomisaikaa.`
      },
      'culture_meetings': { 
        title: 'Kokouskulttuuri', 
        summary: 'Kokoukset ovat tehokkaita ja alkavat ajallaan.', 
        content: `### Säännöt\n1. **Aloitus:** Täsmälleen tasalta.\n2. **Agenda:** Pysy asiassa.\n3. **Lopetus:** Kunnioita muiden kalenteria.` 
      },
      'culture_feedback': {
        title: 'Palaute',
        summary: 'Suoraa ja rehellistä.',
        content: `### Tyyli\nSuomalainen palaute voi tuntua tylyltä, mutta se on vain asioihin keskittymistä. Älä ota henkilökohtaisesti.`
      },
      'culture_names': {
        title: 'Sinuttelu',
        summary: 'Suomessa ollaan epämuodollisia.',
        content: `### Matti eikä Herra Johtaja\nKaikkia puhutellaan etunimellä, myös toimitusjohtajaa.`
      },
      'culture_punctuality': {
        title: 'Täsmällisyys',
        summary: '5 minuuttia myöhässä on myöhässä.',
        content: `### Kunnioitus\nMyöhästyminen koetaan toisen ajan varastamisena. Ilmoita heti, jos myöhästyt.`
      },
      'culture_coffee': {
        title: 'Kahvitauko',
        summary: 'Pyhä rituaali. Usein lakisääteinen.',
        content: `### Sosiaalinen hetki\nMene muiden mukaan kahvihuoneeseen, vaikka joisit vettä. Siellä tapahtuu ryhmäytyminen.`
      },
      'culture_afterwork': {
        title: 'Afterwork (AW)',
        summary: 'Rentoa oleskelua töiden jälkeen.',
        content: `### Tyyli\nVapaaehtoista. Voi juoda alkoholia tai limua.`
      },
      'culture_sauna': {
        title: 'Saunadiplomatia',
        summary: 'Sauna on tasa-arvoinen paikka.',
        content: `### Säännöt\n1. **Tasa-arvo:** Saunassa tittelit jäävät naulakkoon.\n2. **Alastomuus:** Luonnollista, ei seksuaalista.\n3. **Bisnes:** Joskus päätökset tehdään lauteilla.`
      },
      'culture_smalltalk': {
        title: 'Hiljaisuus & Small Talk',
        summary: 'Hiljaisuus ei ole kiusallista.',
        content: `### Älä täytä tyhjyyttä\nHississä ei tarvitse puhua. Nyökkäys riittää.`
      },
      'culture_party': {
        title: 'Pikkujoulut',
        summary: 'Firman pikkujoulut voivat olla railakkaat.',
        content: `### Poikkeus sääntöön\nSuomalaiset vapautuvat pikkujouluissa. Mitä tapahtuu pikkujouluissa, jää pikkujouluihin.`
      },
      'prof_engineering': {
        title: 'Insinöörityö',
        summary: 'Iso ala, englanti yleistä.',
        content: `### Yritykset\nKone, Wärtsilä, Nokia, Metso.\n\n### Tyyli\nFaktapohjaista. Valmistaudu teknisiin yksityiskohtiin.`
      },
      'prof_business': {
        title: 'Kaupallinen ala',
        summary: 'Vaatii usein suomea.',
        content: `### Mahdollisuudet\nKansainvälinen myynti, Business Analytics tai startupit.`
      },
      'prof_it': {
        title: 'IT & Teknologia',
        summary: 'Helpoin ala englanninkieliselle.',
        content: `### Kieli\nEnglanti on työkieli lähes kaikissa teknologiayrityksissä (Wolt, Supercell, Relex).`
      },
      'prof_health': {
        title: 'Sosiaali- ja terveysala',
        summary: 'Huutava pula tekijöistä, mutta kielitaito pakollinen.',
        content: `### Vaatimukset\nTarvitset Valviran laillistuksen ja kielitaidon (B1/B2). Potilasturvallisuus on ykkösasia.`
      },
      'prof_service': {
        title: 'Palveluala',
        summary: 'Yleinen väylä työelämään.',
        content: `### Työt\nSiivous ja ravintola-ala palkkaavat usein myös ilman täydellistä suomen taitoa.`
      },
      'housing_contracts': {
        title: 'Vuokrasopimus',
        summary: 'Yleensä toistaiseksi voimassa oleva.',
        content: `### Ehdot\n* **Takuuvuokra:** Yleensä 2kk vuokra.\n* **Irtisanominen:** Asukkaalla 1 kk.\n* **Kotivakuutus:** Pakollinen.`
      },
      'housing_finding': {
        title: 'Asunnon löytäminen',
        summary: 'Markkina on nopea Helsingissä.',
        content: `### Portaalit\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Vinkki\nOle nopea. Mene näyttöön valmiin hakemuksen kanssa.`
      },
      'housing_utilities': {
        title: 'Sähkö & Internet',
        summary: 'Tee oma sähkösopimus.',
        content: `### Sähkö\nEi kuulu yleensä vuokraan. Kilpailuta sähköyhtiöt.\n\n### Vesi\nUsein kiinteä maksu (esim. 20€/hlö/kk).`
      },
      'housing_recycling': {
        title: 'Kierrätys',
        summary: 'Suomessa kierrätetään kaikki.',
        content: `### Astiat\nBio, Muovi, Kartonki, Paperi, Metalli, Lasi.\n\n### Pantti\nPullot ja tölkit palautetaan kauppaan. Siitä saa rahaa.`
      },
      'housing_sauna': {
        title: 'Pesutupa & Sauna',
        summary: 'Taloyhtiön yhteiset tilat.',
        content: `### Käyttö\n* **Lenkkisauna:** Ilmainen yhteisvuoro viikoittain.\n* **Oma vuoro:** Varataan maksua vastaan.`
      },
      'family_school': {
        title: 'Koulujärjestelmä',
        summary: 'Ilmainen ja maailman kärkeä.',
        content: `### Perusasiat\n* **Alkaa:** 7-vuotiaana.\n* **Hinta:** Ilmainen (kirjat ja ruoka).\n* **Kieli:** Suomi tai ruotsi.`
      },
      'family_daycare': {
        title: 'Päiväkoti',
        summary: 'Jokaisella lapsella on oikeus hoitoon.',
        content: `### Haku\nHae 4kk etukäteen. Kunnallinen on edullinen (max ~300€/kk).`
      },
      'family_activities': {
        title: 'Harrastukset',
        summary: 'Kirjastot ja liikunta.',
        content: `### Mahdollisuudet\n* **Kirjastot:** Oodi tarjoaa 3D-tulostimia ja pelejä ilmaiseksi.\n* **Musiikkiopistot:** Laadukasta opetusta.`
      },
      'family_winter': {
        title: 'Lapset & Talvi',
        summary: 'Ei ole huonoa säätä, on vain huonoja vaatteita.',
        content: `### Varusteet\n* **Kerrokset:** Villa, fleece, toppahaalari.\n* **Heijastin:** Pakollinen pimeällä.`
      },
      'family_safety': {
        title: 'Turvallisuus',
        summary: 'Suomi on turvallinen maa lapsille.',
        content: `### Itsenäisyys\nEkaluokkalaiset kulkevat usein kouluun yksin. Se on normaalia.`
      }
    }
  }
};
