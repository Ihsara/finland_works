
import { TranslationResource } from "./types";

export const en: TranslationResource = {
  ui: {
    landing_welcome: "Welcome!", landing_subtitle: "Find your way to work in Finland", landing_btn_quiz: "Tell me about yourself", landing_btn_continue: "Explore My Guide", landing_btn_ask: "Start a conversation", landing_btn_browse: "Browse the Guide", landing_load_sample: "Load Sample", landing_erase: "Erase Cache", landing_add_key: "Add Gemini API Key", landing_choose_lang: "Choose Language",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Welcome back to your personal guide.", dash_subtitle_guest: "Let's create a profile to get started.", dash_btn_guide: "Open Guide", dash_btn_browse: "Browse Guide", dash_btn_ask: "Ask AI", dash_btn_history: "History", dash_btn_cv: "Import CV", dash_switch_profile: "Switch", dash_new_profile: "New", dash_edit_profile: "Edit", dash_profile_overview: "Profile",
    dash_education: "Education", dash_profession: "Profession", dash_languages: "Languages", dash_narrative_aspirations: "Aspirations", dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...", chat_end_session: "End", chat_header_assistant: "Assistant", chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"", chat_ask_length: "Short or detailed answer?", chat_empty_state: "Start the conversation by asking a question below.", chat_length_set_confirm: "Got it. How can I help?",
    btn_back_dashboard: "Back", btn_save: "Save",
    profile_btn_guide: "My Guide", profile_btn_guide_desc: "Recommended articles", profile_btn_plan: "My Plan", profile_btn_plan_desc: "Coming soon", profile_sect_languages: "Languages", profile_sect_skills: "Skills", profile_sect_narrative: "Narrative", profile_label_aspirations: "Goals", profile_label_challenges: "Fears / Challenges", profile_label_education: "Education", profile_label_profession: "Profession", profile_completeness: "{percentage}% complete", profile_completeness_hint: "Answer a few more questions", profile_btn_update: "Update Profile", profile_btn_continue: "Continue Quiz",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Curated for {name}", wiki_explore_cats: "Explore Topics", wiki_explore_subtitle: "Select a topic to dive into details.", wiki_full_index: "Index", wiki_full_index_subtitle: "Browse everything.", wiki_nav_list: "List", wiki_nav_icons: "Icons", wiki_section_chapters: "Chapters", wiki_btn_mark_done: "Mark Done", wiki_btn_later: "Read Later", wiki_btn_saved: "Saved", wiki_btn_completed: "Completed", wiki_ctx_ask: "Ask about this", wiki_topic_label: "Topic: {tag}", wiki_topic_desc: "Overview & Articles", wiki_guide_prefix: "GUIDE", wiki_stat_articles: "articles", wiki_stat_complete: "done", wiki_section_prefix: "Section",
    wizard_header_quiz: "Quiz", wizard_greeting_short: "Hi, {name}!", wizard_title_init: "Create Profile", wizard_title_custom: "Building {name}", wizard_phase_identity: "PHASE 1: IDENTITY", wizard_phase_demo: "PHASE 2: BACKGROUND", wizard_phase_status: "PHASE 3: STATUS", wizard_phase_skills: "PHASE 4: SKILLS", wizard_phase_mindset: "PHASE 5: MINDSET", wizard_phase_vision: "PHASE 6: VISION", wizard_nickname_hint: "* You can use a nickname to stay anonymous.", wizard_btn_ask: "Ask", wizard_btn_next: "Next", wizard_btn_prev: "Back", wizard_btn_submit: "Submit", wizard_btn_finish_early: "Save & Finish", wizard_btn_generate_name: "Generate Name", wizard_ribbon_greeting: "Nice to meet you, {name}!", wizard_title_name: "What is your name?", wizard_desc_name: "Enter your name or pick a nickname", wizard_placeholder_name: "Your Name",
    wizard_step2_title: "How old are you?", wizard_step2_desc: "Select age group", wizard_step2_placeholder: "Age (e.g. 29)",
    wizard_step3_title: "Marital status?",
    wizard_marital_solo_title: "Solo", wizard_marital_solo_desc: "No partner or children accompanying", wizard_marital_pair_title: "Partner / Family", wizard_marital_pair_desc: "Moving with spouse, partner or kids", wizard_marital_secret_title: "Secret", wizard_marital_secret_desc: "It's complicated / Won't say",
    wizard_children_title: "Do you have children?", wizard_children_desc: "This helps us tailor advice on schools and daycare.", wizard_children_yes: "Yes", wizard_children_no: "No", wizard_family_details_title: "Family Details", wizard_family_count_label: "How many children?", wizard_family_ages_label: "Ages?", wizard_family_ages_hint: "Select all that apply.", wizard_age_group_0_6: "Daycare (0-6)", wizard_age_group_7_12: "School (7-12)", wizard_age_group_13_17: "Teenagers (13-17)", wizard_age_group_18: "Adults (18+)",
    wizard_step4_title: "Where are you from?", wizard_step4_desc: "Country of Origin", wizard_step4_placeholder: "Type country name...", wizard_step4_no_match: "No matches found", wizard_btn_search_country: "Search Country", wizard_btn_select_region: "Select Region", wizard_region_europe: "Europe", wizard_region_americas: "Americas", wizard_region_asia: "Asia", wizard_region_africa: "Africa", wizard_region_oceania: "Oceania", wizard_region_middle_east: "Middle East", wizard_eu_question: "EU/EEA Citizen?", wizard_eu_yes: "Yes", wizard_eu_no: "No",
    wizard_step5_title: "Right to Work & Permit", wizard_permit_full_title: "Unlimited", wizard_permit_full_desc: "Permanent, Family, EU, or Finnish Degree", wizard_permit_restricted_title: "Restricted", wizard_permit_restricted_desc: "Work permit tied to employer/field", wizard_permit_student_title: "Student", wizard_permit_student_desc: "Limited hours",
    wizard_step6_title: "Highest Education", wizard_step6_desc: "Which describes you best?", wizard_step6_field_label: "Field of Study (Optional)", wizard_step6_field_placeholder: "e.g. Engineering, Arts", wizard_edu_general_title: "General Education", wizard_edu_general_desc: "High School / Secondary. No vocational qualification.", wizard_edu_applied_title: "Vocational / Applied", wizard_edu_applied_desc: "Vocational school or University of Applied Sciences (AMK).", wizard_edu_uni_title: "University Degree", wizard_edu_uni_desc: "Academic degree (Bachelor, Master, PhD).",
    wizard_step7_title: "What is your profession?", wizard_step7_desc: "Or what work are you looking for?", wizard_step7_placeholder: "e.g. Nurse, Welder, Coder",
    wizard_step8_title: "Finnish Language", wizard_lbl_finnish_level: "Current Level", wizard_lbl_finnish_motivation: "Motivation to Learn", wizard_opt_lang_none: "None yet", wizard_opt_lang_basics: "Basics (A1)", wizard_opt_lang_inter: "Intermediate (A2-B1)", wizard_opt_lang_fluent: "Fluent (B2+)", wizard_scale_1_motivation: "Curious", wizard_scale_5_motivation: "Unstoppable",
    wizard_step9_title: "English Language", wizard_opt_lang_en_none: "None", wizard_opt_lang_en_basic: "Basic", wizard_opt_lang_en_working: "Working Proficiency", wizard_opt_lang_en_fluent: "Native/Fluent",
    wizard_step10_title: "Your Vision", wizard_step10_aspirations_label: "Aspirations", wizard_step10_aspirations_placeholder: "What do you hope to achieve?", wizard_step10_challenges_label: "Challenges", wizard_step10_challenges_placeholder: "What worries you?",
    wizard_step12_title: "How does Finnish culture feel to you?", wizard_opt_cult_low: "A beautiful mystery", wizard_opt_cult_med: "Happily observing", wizard_opt_cult_high: "Diving in deep",
    wizard_step13_title: "How are you finding the rhythm of life?", wizard_scale_1_life: "Still thawing out", wizard_scale_5_life: "Like home",
    wizard_step14_title: "How confident are you about finding work?", wizard_scale_1_career: "I need direction", wizard_scale_5_career: "I have a plan",
    wizard_step15_title: "Is the path ahead clear?", wizard_opt_info_none: "A bit foggy", wizard_opt_info_some: "Clouds are clearing", wizard_opt_info_high: "Crystal clear",
    wizard_step16_title: "What brings you the most joy here?", wizard_opt_excite_career: "Building a career", wizard_opt_excite_life: "Peace & safety", wizard_opt_excite_nature: "Nature & seasons", wizard_opt_excite_adventure: "The adventure",
    wizard_rating_winter: "Winter", wizard_rating_thaw: "Thaw", wizard_rating_growth: "Growth", wizard_rating_bloom: "Bloom", wizard_rating_summer: "Summer",
    history_title: "Past Conversations", history_empty: "No conversations yet.", history_tab_summary: "Summary (AI)", history_tab_transcript: "Full Transcript", history_no_summary: "No summary available.", history_generating: "AI is writing summary...", history_generating_desc: "This happens in the background.",
    cv_title: "Analyze CV", cv_subtitle: "Paste your CV text to automatically populate your profile.", cv_placeholder: "Paste CV/Resume text here...", cv_btn_analyze: "Analyze & Import", cv_btn_processing: "Processing...", cv_warning_key: "Personal API Key required.", cv_key_update: "Update Key", cv_key_required: "Key Required", cv_key_desc: "To securely analyze your CV, please enter your own Gemini API Key. It is stored only on your device.", cv_key_placeholder: "Paste key here...", cv_key_save: "Save Key", cv_alert_success: "API Key saved.", cv_alert_error: "Failed to analyze CV. Please check your key and try again.", cv_btn_manage_key: "API Key",
    settings_title: "Settings", settings_sect_general: "General", settings_sect_appearance: "Appearance", settings_sect_data: "Data & Privacy", settings_length_label: "Response Length", settings_theme_label: "Theme", settings_theme_system: "System Default", settings_theme_light: "Light", settings_theme_dark: "Dark", settings_opt_ask: "Always Ask", settings_opt_short: "Short & Concise", settings_opt_long: "Detailed", settings_clear_data: "Reset Application Data", settings_clear_data_desc: "This will delete all profiles, history, and API keys.", settings_btn_clear: "Clear Everything",
    net_intro: "Welcome to Networking. Choose the way that fits you.",
    net_header: "What should we focus on today?",
    net_opt_design: "Meet the Design Community",
    net_opt_linkedin: "LinkedIn Strategy",
    net_opt_hobbies: "Hobbies & Activities",
    net_opt_parents: "Networking for Parents",
    net_opt_introvert: "Tips for Introverts",
    feedback_action: "Give Feedback",
  },
  wiki: {
    titles: {
      foundation: 'The Essentials', job_strategy: 'Job Strategy', workplace: 'Workplace Culture', industries: 'Industry Guides', life: 'Life & Balance',
      identity: 'Identity & Permits', security: 'Social Security', market: 'The Market', tools: 'Tools', rights: 'Rights & Discrimination', networking: 'Networking & Hidden Market',
      social: 'Social Rituals', norms: 'Professional Norms', specialist: 'Specialist Roles', hands_on: 'Hands-on Work', housing: 'Housing & Transport',
      family: 'Family Support', language: 'Language',
      social_unemployment: 'Unemployment Benefits', social_housing: 'Housing Allowance', social_pension: 'Pension System', social_kela_card: 'Kela Card', social_health: 'Public Healthcare',
      bureaucracy_dvv: 'DVV & Personal ID', bureaucracy_migri: 'Migri (Immigration)', bureaucracy_tax: 'Tax Card', bureaucracy_bank: 'Opening a Bank Account',
      job_te_office: 'TE Office', job_portals: 'Job Sites', job_entrepreneurship: 'Entrepreneurship', job_networking: 'Networking',
      job_cover_letter: 'Cover Letter', job_interview: 'Job Interview', job_linkedin: 'LinkedIn Tips', job_recognition: 'Degree Recognition', job_cv_tips: 'Finnish CV Style',
      work_contract: 'Employment Contract', work_hours: 'Working Hours', work_holidays: 'Annual Leave', work_unions: 'Trade Unions', work_probation: 'Probation Period',
      culture_meetings: 'Meeting Culture', culture_feedback: 'Giving Feedback', culture_names: 'First Names', culture_punctuality: 'Punctuality', culture_coffee: 'Coffee Breaks',
      culture_afterwork: 'Afterwork', culture_sauna: 'Sauna Diplomacy', culture_smalltalk: 'Silence & Small Talk', culture_party: 'Office Parties',
      prof_engineering: 'Engineering', prof_business: 'Business & Finance', prof_it: 'IT & Tech', prof_health: 'Healthcare & Nursing', prof_service: 'Service Industry',
      housing_contracts: 'Rental Contracts', housing_finding: 'Finding an Apartment', housing_utilities: 'Electricity & Internet', housing_recycling: 'Recycling Guide', housing_sauna: 'Laundry & Sauna',
      family_school: 'School System', family_daycare: 'Daycare (Päiväkoti)', family_activities: 'Hobbies & Sports', family_winter: 'Kids & Winter', family_safety: 'Safety & Independence'
    },
    articles: {
      'guide_start': { 
        title: 'Welcome to Finland! 🇫🇮', 
        summary: 'Finland runs on trust, silence, and coffee. This guide is your survival manual.', 
        content: `# Your Survival Manual\n\n**The Philosophy:**\nFinland runs on trust, silence, and coffee. It is a society where systems work, but you must know how to use them. Trust is the currency of interaction, and silence is a sign of respect.\n\n### How to use this app\n1. **Read:** Browse the guides on bureaucracy and work culture.\n2. **Chat:** Ask the AI Assistant about your specific situation.\n3. **Profile:** Keep your data fresh to get accurate advice.\n\n*Sisu* (Guts) is all you need!` 
      },
      'net_culture': {
        title: 'Networking: The Finnish Way',
        summary: 'Finns build networks through doing things together, not small talk. Trust is everything.',
        content: `### The "Talkoot" Spirit\nNetworking in Finland is rarely about handing out business cards at a cocktail party. It is about **doing work together**.\n\n* **Volunteering:** Join the team of an event (like Slush, Nordic Business Forum, or a local festival). When you work side-by-side with a Finn, you build trust. Trust leads to job recommendations.\n* **Associations:** Finland has an association (yhdistys) for everything. Find the one for your profession.\n* **Quality over Quantity:** One meaningful connection is worth more than 100 loose contacts.`
      },
      'net_linkedin': {
        title: 'LinkedIn Strategy',
        summary: 'LinkedIn is the primary search engine for recruiters in Finland.',
        content: `### Your Digital Face\n* **Keywords:** Recruiters search for skills, not titles. Ensure your headline says "Java", "Project Management", "B2B Sales".\n* **Location:** Set it to Finland. If you are abroad, change it to "Helsinki" (and note in the About section you are relocating) to appear in local searches.\n* **Open to Work:** The green banner is culturally accepted here. It shows motivation.\n* **Activity:** Comment on local posts. It makes you visible to the author's network.`
      },
      'net_hidden': {
        title: 'Hacking the Hidden Market',
        summary: '70-80% of jobs are not advertised. You must find them.',
        content: `### Piilotyöpaikat (Hidden Jobs)\nCompanies often don't advertise because hiring is expensive and slow.\n\n1. **Company Mapping:** Make a list of 20 companies you like. Don't look at their "Open Jobs" page yet.\n2. **Open Application (Avoin hakemus):** Email the Team Lead (not HR). "I've been following your work on X. I have skills in Y. Could we have a 15min coffee?"\n3. **Informational Interviews:** Ask people about their job, not *for* a job. "I'm new to the Finnish Energy sector. Could I ask you 3 questions about how things work here?" Most people will say yes.`
      },
      'net_volunteering': {
        title: 'Volunteering',
        summary: 'The fastest way to integrate and prove skills.',
        content: `### Why Volunteer?\n1. **Language:** Low-pressure environment to practice Finnish.\n2. **References:** You get a local reference who can vouch for your work ethic.\n3. **Network:** You meet active people.\n\n### Where?\nRed Cross, startup events, local sports clubs, libraries.`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Personal ID', 
        summary: 'Get your Personal Identity Code to exist officially. Without it, you are invisible.', 
        content: `# The DVV (Digital Agency) 🆔\n\n**Priority: IMMEDIATE**\n\n### The Mission\nTo exist legally in Finland. Without registering at the **Digital and Population Data Services Agency (DVV)**, you are a ghost in the system.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). Format: *DDMMYY-XXXX*.\n\n### Why you need it\n1. Bank account.\n2. Phone contract.\n3. Tax card.\n4. Health services.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Immigration)', 
        summary: 'Getting your Residence Permit (oleskelulupa). Use the Enter Finland service.', 
        content: `# Migri 🛂\n\n### The Mission\nGetting your Residence Permit (oleskelulupa).\n\n### Key Moves\n* **Enter Finland:** Use this online service. It is much faster.\n* **Identification:** You must visit a service point to prove you are you.\n* **Fast Track:** Available for specialists and startup entrepreneurs (14 days).` 
      },
      'bureaucracy_tax': { 
        title: 'Tax Card (Verokortti)', 
        summary: 'Without a tax card, 60% of your salary is withheld. No exceptions.', 
        content: `# The Tax Card (Verokortti) 💳\n\n**Golden Rule:** No card = **60% tax**.\n\n### The Process\n1. Log in to **MyTax (OmaVero)** with bank codes.\n2. Estimate annual income.\n3. Download PDF.\n4. Send to payroll/boss.\n\n*Note: Finland has progressive tax. The more you earn, the higher the percentage.*` 
      },
      'bureaucracy_bank': { 
        title: 'Opening a Bank Account', 
        summary: 'A bank account gives you "strong electronic identification", the key to all digital services.', 
        content: `# The Challenge\nMoney laundering laws are strict. The bank needs to know where your money comes from.\n\n### What to bring\n1. Passport.\n2. Residence Permit.\n3. Employment Contract.\n4. Personal ID Code (from DVV).\n\n### The Holy Grail\n**Bank Codes** (verkkopankkitunnukset). These allow you to log in to Kela, Tax, Health, and Posti services.` 
      },
      'social_kela_card': {
        title: 'Kela Card',
        summary: 'The blue card that proves you belong to the National Health Insurance.',
        content: `# What is it?\nA blue card proving you are covered by Finnish social security.\n\n### Use it\nShow it at:\n1. **Pharmacies:** To get a direct discount on prescribed medicine.\n2. **Private Clinics:** To get a small part of the cost reimbursed.`
      },
      'social_health': {
        title: 'Public vs. Occupational Health',
        summary: 'Employees should use Occupational Health (Työterveys) first. It is faster and free.',
        content: `# Two Systems\n\n**1. Public (Terveysasema)**\n* **For:** All residents.\n* **Cost:** Cheap (~20€) or free.\n* **Speed:** Can be slow. You must call to book.\n\n**2. Occupational (Työterveys)**\n* **For:** Employees.\n* **Cost:** Free for you (employer pays).\n* **Speed:** Fast. Usually private clinics like Terveystalo or Mehiläinen.`
      },
      'social_unemployment': {
        title: 'Unemployment Benefits',
        summary: 'Register at the TE Office on your FIRST day of unemployment.',
        content: `# Lost your job? 📉\n\n### 1. Register Immediately\nRegister as a job seeker at **TE Services** on your **first day** of unemployment. If you delay, you lose money.\n\n### 2. The Payers\n* **Union Fund (Kassa):** If you are a member (26 weeks+), you get earnings-related allowance (much higher).\n* **Kela:** If not a member, you get basic allowance (lower).`
      },
      'social_housing': {
        title: 'Housing Allowance',
        summary: 'Kela can pay part of your rent if income is low.',
        content: `# General Housing Allowance\n* **Who:** Low-income households (students, part-time workers, unemployed).\n* **Calculation:** Based on total income and the city you live in.\n* **Apply:** Online at Kela. You need a rental contract.`
      },
      'social_pension': {
        title: 'Pension System',
        summary: 'You accumulate pension (eläke) for every euro earned.',
        content: `# How it works\nThe employer deducts the pension fee automatically from your salary. You do not need to do anything.\n\n### Checking\nYou can check your accrued amount at **Tyoelake.fi**.\n\n### Leaving?\nIf you move to another EU country, your pension rights are preserved until retirement age.`
      },
      'job_market_overview': { 
        title: 'The Job Market', 
        summary: 'Understanding the landscape.', 
        content: `### Overview\nThe Finnish market values skills and attitude. While Finnish language is often a gatekeeper, many tech and engineering firms operate in English.` 
      },
      'job_te_office': {
        title: 'TE Services (TE-toimisto)',
        summary: 'The employment office helps with integration and unemployment benefits.',
        content: `### What they do\n* **Integration Plan:** They determine if you need a language course.\n* **Job Seeker Status:** Mandatory to get money from Kela or Union.\n* **Warning:** Always follow their instructions strictly to avoid a "karenssi" (suspension of benefits).`
      },
      'job_portals': {
        title: 'Where to Find Jobs',
        summary: 'The main websites you should know.',
        content: `### The Big Ones\n* **LinkedIn:** #1 for English/Specialist jobs.\n* **Oikotie Työpaikat:** The biggest Finnish site.\n* **Duunitori:** Very popular.\n* **The Hub:** Best for Startups & Tech.`
      },
      'job_entrepreneurship': {
        title: 'Entrepreneurship (Yrittäjyys)',
        summary: 'Finland needs entrepreneurs. There is grant money to start.',
        content: `### Starttiraha (Startup Grant)\nIf you become a full-time entrepreneur, you can get ~700€/month for 6-12 months to secure your livelihood.\n\n**Important:** You must apply **before** registering the company.`
      },
      'job_cv_tips': {
        title: 'Finnish CV Style',
        summary: 'Short, factual, and with a photo.',
        content: `### Checklist\n1. **Length:** Max 2 pages. Ideally 1.\n2. **Photo:** Standard here. Smile professionally.\n3. **Profile:** Short summary at the top.\n4. **Skills:** List specific technologies or hard skills.\n5. **Tone:** Humble but confident. State facts, not adjectives.`
      },
      'job_cover_letter': {
        title: 'Cover Letter',
        summary: 'Don\'t repeat your CV. Answer "Why us?" and "Why you?".',
        content: `### Structure\n1. **The Hook:** Why do you want *this* job?\n2. **The Value:** What problem will you solve for them?\n3. **The Personality:** Do you fit the team?\n\n### Tip\nKeep it under 1 page. Finns appreciate brevity.`
      },
      'job_interview': {
        title: 'Job Interview',
        summary: 'Honesty is tested. Silence is okay.',
        content: `### What to expect\n* **Honesty:** If you don't know, say "I don't know, but I can learn". Do not lie.\n* **Silence:** If the interviewer is silent after your answer, don't panic. They are thinking. Don't babble to fill the gap.\n* **Coffee:** Always accept if offered. It's a ritual.`
      },
      'job_recognition': {
        title: 'Degree Recognition',
        summary: 'Crucial for doctors, nurses, and teachers.',
        content: `### Regulated Professions\nFor health/education, your degree must be recognized by **OPH** or **Valvira**.\n\n### General Roles\nFor IT, business, or marketing, official recognition is rarely needed. Skills matter more.`
      },
      'work_contract': { 
        title: 'Employment Contract', 
        summary: 'Always written. Read carefully. Check the TES.', 
        content: `### Key Elements\n1. **Duration:** Permanent (toistaiseksi voimassa oleva) or Fixed-term (määräaikainen).\n2. **TES:** Collective Agreement. It defines minimum pay and holidays.\n3. **Probation:** Max 6 months.\n\n**Never start work without a contract.**` 
      },
      'work_hours': {
        title: 'Working Hours',
        summary: 'Standard is 7.5 or 8 hours a day.',
        content: `### Balance\n* **Full time:** Usually 37.5 or 40 hours/week.\n* **Flexibility:** Many firms have "liukuma" (flex time). Arrive 7-9, leave 15-17.\n* **Lunch:** Usually 30 mins (unpaid).`
      },
      'work_holidays': {
        title: 'Annual Leave',
        summary: 'Finland has generous holidays, but they must be earned.',
        content: `### Credit Year\nYou accumulate days from 1 April to 31 March.\n* **Standard:** 2.5 days/month worked = 30 days (5 weeks)/year.\n* **Summer:** Usually taken in July. The whole country stops.\n* **Holiday Bonus:** Many places pay 50% extra salary for the holiday period (lomaraha).`
      },
      'work_unions': {
        title: 'Trade Unions (Liitto)',
        summary: 'Highly recommended. They control the unemployment funds.',
        content: `### Why join?\n1. **Money:** They pay earnings-related unemployment allowance (much higher than Kela).\n2. **Law:** Free legal help if your employer treats you badly.\n\n### Which one?\n* **YTK:** Just the unemployment fund (cheaper).\n* **TEK:** For engineers.\n* **PAM:** For service industries.`
      },
      'work_probation': {
        title: 'Probation Period (Koeaika)',
        summary: 'The first 6 months are often a trial.',
        content: `### Rules\nDuring probation (max 6 months), **both you** and the employer can terminate the contract immediately without notice period.`
      },
      'culture_meetings': { 
        title: 'Meeting Culture', 
        summary: 'Meetings are efficient and punctual. Small talk is minimal.', 
        content: `### Rules\n1. **Start on time:** 09:00 means 09:00.\n2. **Agenda:** Stick to it. Finns love structure.\n3. **Silence:** Silence means agreement or thinking. It does not mean something is wrong.\n4. **End on time:** Respect others' calendars.` 
      },
      'culture_feedback': {
        title: 'Giving Feedback',
        summary: 'Direct and honest. Do not take it personally.',
        content: `### Directness\nA Finn might say: *"This report is missing X."*\nThey are not being rude. They are just stating a fact to fix the problem efficiently. They separate the work from the person.`
      },
      'culture_names': {
        title: 'First Names',
        summary: 'Very informal. Titles are rarely used.',
        content: `### Hello Boss\nEveryone goes by their first name. You call the CEO "Matti", not "Mr. Korhonen". You can use "sinä" (you) with almost everyone.`
      },
      'culture_punctuality': {
        title: 'Punctuality',
        summary: '5 minutes late is late.',
        content: `### Time is Respect\nBeing late is seen as stealing someone else's time. If you are running 5 minutes late, send a message.`
      },
      'culture_coffee': {
        title: 'Coffee Break (Kahvitauko)',
        summary: 'Sacred ritual. Often mandated by law.',
        content: `### The Ritual\nMost contracts have two 10-15 min breaks.\n\n* **Socialize:** This is where team bonding happens. Don't sit alone at your desk.\n* **Caffeine:** Finns drink the most coffee in the world.`
      },
      'culture_afterwork': {
        title: 'Afterwork (AW)',
        summary: 'Casual drinks on Fridays.',
        content: `### The Vibe\nUsually very relaxed. Having alcohol is fine, or soda. It's about relaxing, not getting drunk.`
      },
      'culture_sauna': {
        title: 'Sauna Diplomacy',
        summary: 'Sauna is a place of equality. Even in business.',
        content: `### Rules\n1. **Equality:** In the sauna, there are no titles. The CEO and the intern are equal.\n2. **Nudity:** It is natural, not sexual.\n3. **Business:** Decisions are sometimes made on the benches.`
      },
      'culture_smalltalk': {
        title: 'Silence & Small Talk',
        summary: 'Silence is not awkward. It is a comfortable rest.',
        content: `### Don't fill the void\nIf you are in an elevator with a Finn, no need to talk. A nod is enough. We value words; we don't waste them on stating the obvious.`
      },
      'culture_party': {
        title: 'Office Parties (Pikkujoulut)',
        summary: 'The "Little Christmas" party in December can be wild.',
        content: `### The Exception\nFinns are reserved, EXCEPT at *Pikkujoulut*. This is the annual Christmas party. There is usually a lot of alcohol and colleagues might be surprisingly open. What happens at Pikkujoulut, stays at Pikkujoulut.`
      },
      'prof_engineering': {
        title: 'Engineering in Finland',
        summary: 'Huge sector. English is widely used.',
        content: `### The Giants\nKone, Wärtsilä, Nokia, Metso.\n\n### Culture\nFact-based. Prepare technical details. Accuracy is valued over sales pitches.`
      },
      'prof_business': {
        title: 'Business & Finance',
        summary: 'Often requires Finnish language, except in Startups.',
        content: `### The Barrier\nTraditional roles (HR, Accounting, Banking) usually need fluent Finnish.\n\n### The Opportunity\nLook for *International Sales*, *Business Analytics*, or *Export* roles where your native language is an asset.`
      },
      'prof_it': {
        title: 'IT & Tech',
        summary: 'The easiest sector for English speakers.',
        content: `### The Hub\nFinland needs coders. English is the company language in almost all tech firms (Wolt, Supercell, Relex).\n\n### Hiring\nExpect code tests. Show your GitHub.`
      },
      'prof_health': {
        title: 'Healthcare & Nursing',
        summary: 'Huge shortage of workers, but language is mandatory.',
        content: `### The Reality\nYou need Valvira licensing. To get it, you usually need Finnish level B1/B2. Patient safety is priority #1.`
      },
      'prof_service': {
        title: 'Service Industry',
        summary: 'Restaurants and cleaning are common entry points.',
        content: `### Entry Level\nCleaning and restaurant kitchens often hire without fluent Finnish. It is a way to start earning while learning the language.`
      },
      'housing_contracts': {
        title: 'Rental Contracts',
        summary: 'Secure and regulated. Usually open-ended.',
        content: `### Terms\n* **Deposit:** Usually 2 months rent.\n* **Notice:** Usually 1 calendar month for the tenant.\n* **Home Insurance:** Almost always mandatory.`
      },
      'housing_finding': {
        title: 'Finding an Apartment',
        summary: 'The market is fast in Helsinki.',
        content: `### Portals\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Tip\nBe fast. Have your profile/application ready. When you go to a viewing, be ready to decide.`
      },
      'housing_utilities': {
        title: 'Electricity & Internet',
        summary: 'You usually make your own electricity contract.',
        content: `### Electricity\nNot included in rent. You must choose a provider and sign a contract.\n\n### Water\nOften a fixed fee (e.g., 20€/person/month).`
      },
      'housing_recycling': {
        title: 'Recycling Guide',
        summary: 'Finns recycle everything. It saves money and the planet.',
        content: `### The Bins\n* **Bio:** Food waste.\n* **Muovi:** Plastic packaging.\n* **Kartonki:** Milk cartons, cardboard.\n* **Paperi:** Paper, newspapers.\n\n### Pantti\nBottles and cans have a deposit (10c - 40c). Return them to the machine at the supermarket to get money back.`
      },
      'housing_sauna': {
        title: 'Laundry & Sauna',
        summary: 'Most buildings have shared facilities.',
        content: `### Taloyhtiö (Housing Company)\n* **Laundry:** There is usually a booking list (varauslista).\n* **Lenkkisauna:** A free weekly sauna hour for men and one for women.\n* **Private Slot:** You can book a weekly private hour for a small fee.`
      },
      'family_school': {
        title: 'School System',
        summary: 'One of the best in the world. And free.',
        content: `### The Basics\n* **Starts:** At age 7.\n* **Cost:** Free. Includes books, pencils, and a hot lunch.\n* **Language:** Usually Finnish or Swedish. International schools exist but have queues.`
      },
      'family_daycare': {
        title: 'Daycare (Päiväkoti)',
        summary: 'Every child has a subjective right to daycare.',
        content: `### Applying\nApply 4 months in advance. It is heavily subsidized.\n\n### Cost\nDepends on income. Max ~300€/month. Low income families pay 0€.`
      },
      'family_activities': {
        title: 'Hobbies & Sports',
        summary: 'Hobbies are taken seriously here.',
        content: `### Options\n* **Libraries:** Oodi and others offer 3D printers, sewing machines, and gaming rooms for free.\n* **Sports:** Football, floorball, and ice hockey are huge.\n* **Music:** Music schools (musiikkiopisto) are high quality.`
      },
      'family_winter': {
        title: 'Kids & Winter',
        summary: 'There is no bad weather, only bad clothes.',
        content: `### Gear\n* **Layers:** Wool layer, fleece layer, waterproof outer layer.\n* **Haalari:** The one-piece overall is the standard kid uniform.\n* **Reflectors:** Mandatory to be safe in the dark.`
      },
      'family_safety': {
        title: 'Safety & Independence',
        summary: 'Finland is very safe. Kids walk to school alone.',
        content: `### Independence\nDon't be alarmed if you see a 7-year-old on the metro alone. It is normal. The society looks out for them.`
      }
    }
  }
};
