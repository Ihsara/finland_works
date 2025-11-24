import { TranslationResource } from "./types";

export const fi: TranslationResource = {
  ui: {
    landing_welcome: "Tervetuloa!", landing_subtitle: "Löydä polkusi työhön Suomessa", landing_btn_quiz: "Kerro itsestäsi", landing_btn_continue: "Avaa oppaani", landing_btn_ask: "Aloita keskustelu", landing_btn_browse: "Selaa opasta",
    dash_greeting: "Moi, {name}!", dash_subtitle: "Tervetuloa takaisin henkilökohtaiseen oppaaseesi.", dash_btn_guide: "Avaa opas", dash_btn_browse: "Selaa opasta", dash_btn_ask: "Kysy tekoälyltä", dash_btn_history: "Historia", dash_btn_cv: "Tuo CV", dash_profile_overview: "Profiili",
    wiki_header_title: "Suomi Toimii!", wiki_explore_cats: "Selaa aiheita", wiki_full_index: "Hakemisto", wiki_nav_list: "Lista", wiki_nav_icons: "Kuvakkeet", wiki_section_chapters: "Luvut", wiki_btn_mark_done: "Merkitse tehdyksi", wiki_btn_later: "Myöhemmin", wiki_stat_articles: "artikkelia", wiki_stat_complete: "valmis",
    profile_btn_guide: "Oppaani", profile_btn_plan: "Suunnitelma", profile_sect_languages: "Kielet", profile_sect_skills: "Taidot", profile_sect_narrative: "Tarina",
    chat_placeholder: "Kysy jotain...", chat_end_session: "Lopeta", chat_header_assistant: "Avustaja",
    settings_title: "Asetukset", settings_theme_label: "Teema", settings_length_label: "Vastauksen pituus", settings_opt_ask: "Kysy aina", settings_opt_short: "Tiivis", settings_opt_long: "Kattava",
    btn_back_dashboard: "Takaisin",
    wizard_title_init: "Luo profiilisi", wizard_title_name: "Mikä on nimesi?", wizard_btn_next: "Seuraava", wizard_btn_prev: "Edellinen", wizard_step4_title: "Mistä olet kotoisin?", wizard_btn_search_country: "Hae maa", wizard_region_europe: "Eurooppa", wizard_step5_title: "Työoikeus"
  },
  wiki: {
    titles: {
      foundation: 'Perusasiat', job_strategy: 'Työnhakustrategia', workplace: 'Työkulttuuri', industries: 'Toimialaoppaat', life: 'Elämä & Tasapaino',
      identity: 'Henkilöllisyys & luvat', security: 'Sosiaaliturva', market: 'Työmarkkinat', tools: 'Työkalut', rights: 'Oikeudet & Syrjintä',
      social: 'Sosiaaliset rituaalit', norms: 'Ammatilliset normit', specialist: 'Asiantuntijat', hands_on: 'Käytännön työ', housing: 'Asuminen & Liikenne',
      family: 'Perhe', language: 'Kieli',
      social_unemployment: 'Työttömyysturva', social_housing: 'Asumistuki', social_pension: 'Eläkejärjestelmä',
      bureaucracy_dvv: 'DVV & Henkilötunnus', bureaucracy_migri: 'Migri (Maahanmuutto)', bureaucracy_tax: 'Verokortti',
      job_te_office: 'TE-toimisto', job_portals: 'Työpaikkasivustot', job_entrepreneurship: 'Yrittäjyys',
      job_cover_letter: 'Hakemuskirje', job_interview: 'Työhaastattelu', job_linkedin: 'LinkedIn-vinkit', job_recognition: 'Tutkintojen tunnustaminen',
      work_contract: 'Työsopimus', work_hours: 'Työajat', work_holidays: 'Vuosiloma',
      culture_meetings: 'Kokouskulttuuri', culture_feedback: 'Palautteenanto', culture_names: 'Sinuttelu',
      prof_engineering: 'Insinöörityö', prof_business: 'Kaupallinen ala',
      housing_contracts: 'Vuokrasopimus', family_school: 'Koulujärjestelmä'
    },
    articles: {
      'guide_start': { title: 'Tervetuloa Suomeen! 🇫🇮', content: `# Selviytymisoppaasi\n\n**Filosofia:**\nSuomi toimii luottamuksella, hiljaisuudella ja kahvilla.\n\n### Kuinka käytät tätä sovellusta\n1. **Lue:** Selaa oppaita.\n2. **Keskustele:** Kysy tekoälyltä.\n3. **Profiili:** Pidä tietosi ajan tasalla.` },
      'bureaucracy_dvv': { title: 'DVV & Henkilötunnus', content: `# DVV (Digi- ja väestötietovirasto) 🆔\n\n**Prioriteetti: HETI**\n\n### Tehtävä\nOlla olemassa virallisesti. Tarvitset **henkilötunnuksen**.\n\n### Mihin tarvitset sitä?\n1. Pankkitili.\n2. Puhelinliittymä.\n3. Verokortti.` },
      'bureaucracy_migri': { title: 'Migri (Maahanmuuttovirasto)', content: `# Migri 🛂\n\n### Tehtävä\nHanki oleskelulupa.\n\n### Vinkit\n* **Varaa aika ajoissa:** Jonot ovat pitkiä.\n* **Pikakaista:** Erityisasiantuntijoille.` },
      'bureaucracy_tax': { title: 'Verokortti', content: `# Verokortti 💳\n\n**Sääntö:** Ilman korttia vero on 60%.\n\n### Prosessi\n1. Kirjaudu **OmaVeroon**.\n2. Arvioi tulot.\n3. Lähetä kortti työnantajalle.` },
      'social_unemployment': { title: 'Työttömyysturva', content: `# Jäitkö työttömäksi? 📉\n\n### 1. Ilmoittaudu heti\nIlmoittaudu työnhakijaksi **TE-toimistoon** heti ensimmäisenä päivänä.\n\n### 2. Maksajat\n* **Kela:** Peruspäiväraha.\n* **Työttömyyskassa:** Ansiopäiväraha (jos olet jäsen).` },
      'job_market_overview': { title: 'Työmarkkinat', content: `# Piilotyöpaikat 📉\n\n**70-80% paikoista ei ole julkisessa haussa.**\n\n### Strategiat\n* **Verkostoidu:** Suurin osa paikoista menee suhteilla.\n* **Ota yhteyttä:** Lähetä avoin hakemus.` },
      'culture_meetings': { title: 'Kokouskulttuuri', content: `# Kokoukset 📅\n\n**Tehokkaita & Täsmällisiä.**\n\n* **Aloitus:** Tismalleen ajoissa.\n* **Asialista:** Pysy siinä.\n* **Ei turinaa:** Mene asiaan.` },
      'culture_essentials': { title: 'Arvot', content: `# Luottamus & Hiljaisuus 🤫\n\n1. **Luottamus:** Tee mitä lupaat.\n2. **Hiljaisuus:** Älä täytä hiljaisuutta turhalla puheella.` }
    }
  }
};
