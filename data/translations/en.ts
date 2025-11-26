
import { TranslationResource } from "./types";

export const en: TranslationResource = {
  ui: {
    landing_welcome: "Welcome!", landing_subtitle: "Find your way to work in Finland", landing_btn_quiz: "Tell me about yourself", landing_btn_continue: "Explore My Guide", landing_btn_ask: "Start a conversation", landing_btn_browse: "Browse the Guide", landing_load_sample: "Load Sample", landing_erase: "Erase Cache", landing_add_key: "Add Gemini API Key", landing_choose_lang: "Choose Language",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Welcome back to your personal Finland guide.", dash_subtitle_guest: "Let's set up your profile to get started.", dash_btn_guide: "Open My Guide", dash_btn_browse: "Browse Guide", dash_btn_ask: "Start a conversation", dash_btn_history: "Past Conversations", dash_btn_cv: "Import CV", dash_switch_profile: "Switch Profile", dash_new_profile: "New", dash_edit_profile: "Edit", dash_profile_overview: "My Profile Overview",
    dash_education: "Education", dash_profession: "Profession", dash_languages: "Languages", dash_narrative_aspirations: "Aspirations", dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...", chat_end_session: "End Session", chat_header_assistant: "Assistant", chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"", chat_ask_length: "Should I keep it brief, or would you like the full details?", chat_empty_state: "Start the conversation by asking a question below.", chat_length_set_confirm: "Got it. How can I help you?",
    btn_back_dashboard: "Back to Dashboard", btn_save: "Save",
    profile_btn_guide: "My Guide", profile_btn_guide_desc: "Recommended articles", profile_btn_plan: "My Plan", profile_btn_plan_desc: "Coming soon", profile_sect_languages: "Languages", profile_sect_skills: "Skills", profile_sect_narrative: "Personal Narrative", profile_label_aspirations: "Aspirations", profile_label_challenges: "Fears / challenges", profile_label_education: "Education", profile_label_profession: "Profession", profile_completeness: "{percentage}% complete", profile_completeness_hint: "Answer a few more questions for better advice", profile_btn_update: "Update Profile", profile_btn_continue: "Continue the Quiz",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Curated for {name}", wiki_explore_cats: "Explore Categories", wiki_explore_subtitle: "Select a topic to dive into the details.", wiki_full_index: "Full Index", wiki_full_index_subtitle: "Browse all topics below.", wiki_section_chapters: "Chapters", wiki_btn_saved: "Saved", wiki_btn_later: "Later", wiki_btn_completed: "Completed", wiki_btn_mark_done: "Mark Done", wiki_ctx_ask: "Start a chat with this sentence", wiki_topic_label: "Topic: {tag}", wiki_topic_desc: "Topic Overview & Related Articles", wiki_guide_prefix: "GUIDE", wiki_stat_articles: "Articles", wiki_stat_complete: "Complete", wiki_section_prefix: "Section",
    wizard_header_quiz: "Quiz", wizard_greeting_short: "Hi, {name}!", wizard_title_init: "Create Your Profile", wizard_title_custom: "{name} Character Creation", wizard_phase_identity: "PHASE 1: IDENTITY", wizard_phase_demo: "PHASE 2: BACKGROUND", wizard_phase_status: "PHASE 3: STATUS", wizard_phase_skills: "PHASE 4: SKILLS", wizard_phase_mindset: "PHASE 5: MINDSET", wizard_phase_vision: "PHASE 6: VISION", wizard_nickname_hint: "* You can use a generated nickname to stay anonymous.", wizard_btn_ask: "Ask a question", wizard_btn_next: "Next", wizard_btn_prev: "Previous", wizard_btn_submit: "Submit", wizard_btn_finish_early: "Save & Finish Now", wizard_btn_generate_name: "Give me a nickname!", wizard_ribbon_greeting: "Nice to meet you, {name}!", wizard_title_name: "What would you like to be called?", wizard_desc_name: "Enter your own name or choose", wizard_placeholder_name: "Your name",
    wizard_step2_title: "How old are you?", wizard_step2_desc: "Select your age group", wizard_step2_placeholder: "Your age (e.g. 29)",
    wizard_step3_title: "What's your marital status?",
    wizard_marital_solo_title: "Flying Solo", wizard_marital_solo_desc: "Just me – no partner or children", wizard_marital_pair_title: "Partnered / Family", wizard_marital_pair_desc: "Moving with a spouse, partner, or children", wizard_marital_secret_title: "It's a Mystery", wizard_marital_secret_desc: "It's complicated / secret",
    wizard_children_title: "Do you have children?", wizard_children_desc: "This helps us give relevant advice about schools and daycare.", wizard_children_yes: "Yes", wizard_children_no: "No", wizard_family_details_title: "Tell us about your family", wizard_family_count_label: "How many children?", wizard_family_ages_label: "What age groups are they in?", wizard_family_ages_hint: "Select all that apply. This changes the advice for schools.", wizard_age_group_0_6: "Daycare (0-6)", wizard_age_group_7_12: "School (7-12)", wizard_age_group_13_17: "Teens (13-17)", wizard_age_group_18: "Adults (18+)",
    wizard_step4_title: "Where do you come from?", wizard_step4_desc: "Select your origin", wizard_step4_placeholder: "Start typing country name...", wizard_step4_no_match: "No matches found", wizard_btn_search_country: "Search Country", wizard_btn_select_region: "Select Region", wizard_region_europe: "Europe", wizard_region_americas: "Americas", wizard_region_asia: "Asia", wizard_region_africa: "Africa", wizard_region_oceania: "Oceania", wizard_region_middle_east: "Middle East", wizard_eu_question: "EU/EEA Citizen?", wizard_eu_yes: "Yes", wizard_eu_no: "No",
    wizard_step5_title: "Working Rights & Permit", wizard_permit_full_title: "Unlimited Rights", wizard_permit_full_desc: "Permanent, Family, EU, or Finnish Degree", wizard_permit_restricted_title: "Sector Restricted", wizard_permit_restricted_desc: "Work Permit tied to a specific field/employer", wizard_permit_student_title: "Student", wizard_permit_student_desc: "Limited hours allowed alongside studies",
    wizard_step6_title: "Highest Education Level", wizard_step6_desc: "Which path best describes your background?", wizard_step6_field_label: "Field of Study (Optional)", wizard_step6_field_placeholder: "e.g. Engineering, Arts", wizard_edu_general_title: "General Education", wizard_edu_general_desc: "High School / Lukio only. No trade qualification.", wizard_edu_applied_title: "Vocational & Applied", wizard_edu_applied_desc: "Trade School (Amis) or Applied Sciences (AMK).", wizard_edu_uni_title: "University Degree", wizard_edu_uni_desc: "Academic degree (Bachelor's, Master's, PhD).",
    wizard_step7_title: "What is your profession?", wizard_step7_desc: "Or what job are you looking for?", wizard_step7_placeholder: "e.g. Nurse, Welder, Developer",
    wizard_step8_title: "Finnish Language", wizard_lbl_finnish_level: "Current Level", wizard_lbl_finnish_motivation: "Motivation to Learn", wizard_opt_lang_none: "None yet", wizard_opt_lang_basics: "Basics (A1)", wizard_opt_lang_inter: "Intermediate (A2-B1)", wizard_opt_lang_fluent: "Fluent (B2+)", wizard_scale_1_motivation: "Curious", wizard_scale_5_motivation: "Unstoppable",
    wizard_step9_title: "English Language Level", wizard_opt_lang_en_none: "None", wizard_opt_lang_en_basic: "Basic", wizard_opt_lang_en_working: "Working Proficiency", wizard_opt_lang_en_fluent: "Native/Fluent",
    wizard_step10_title: "Your Vision", wizard_step10_aspirations_label: "Aspirations", wizard_step10_aspirations_placeholder: "What do you hope to achieve?", wizard_step10_challenges_label: "Challenges", wizard_step10_challenges_placeholder: "Any specific worries?",
    wizard_step12_title: "How does Finnish culture feel to you right now?", wizard_opt_cult_low: "It's a beautiful mystery", wizard_opt_cult_med: "I'm happily observing", wizard_opt_cult_high: "I'm diving in deep",
    wizard_step13_title: "How are you finding the rhythm of life here?", wizard_scale_1_life: "Still thawing", wizard_scale_5_life: "Feels like home",
    wizard_step14_title: "How confident are you in your job search?", wizard_scale_1_career: "I need direction", wizard_scale_5_career: "I have a plan",
    wizard_step15_title: "How clear is your path forward?", wizard_opt_info_none: "It's a bit foggy", wizard_opt_info_some: "The clouds are clearing", wizard_opt_info_high: "Crystal clear",
    wizard_step16_title: "What brings you the most joy here?", wizard_opt_excite_career: "Building my career", wizard_opt_excite_life: "The peace & safety", wizard_opt_excite_nature: "Nature & seasons", wizard_opt_excite_adventure: "Just being on an adventure",
    wizard_rating_winter: "Winter", wizard_rating_thaw: "Thaw", wizard_rating_growth: "Growth", wizard_rating_bloom: "Bloom", wizard_rating_summer: "Summer",
    history_title: "Past Conversations", history_empty: "No conversations recorded yet.", history_tab_summary: "Summary (AI)", history_tab_transcript: "Transcript", history_no_summary: "No summary available for this conversation.", history_generating: "AI is writing summary...", history_generating_desc: "This happens in the background. You can check back in a few seconds.",
    cv_title: "Analyze CV", cv_subtitle: "Paste your CV text to automatically update your profile.", cv_placeholder: "Paste your CV/Resume text here...", cv_btn_analyze: "Analyze & Import", cv_btn_processing: "Processing...", cv_warning_key: "Personalized API Key required.", cv_key_update: "Update API Key", cv_key_required: "API Key Required", cv_key_desc: "To analyze your CV securely, please provide your own Google Gemini API key. It is stored locally on your device.", cv_key_placeholder: "Paste API Key here...", cv_key_save: "Save Key", cv_alert_success: "API Key saved successfully.", cv_alert_error: "Failed to analyze CV. Please try again or check your API key validity.", cv_btn_manage_key: "API Key",
    settings_title: "Settings", settings_sect_general: "General", settings_sect_appearance: "Appearance", settings_sect_data: "Data & Privacy", settings_length_label: "Answer Length", settings_theme_label: "Theme", settings_theme_system: "System Default", settings_theme_light: "Light", settings_theme_dark: "Dark", settings_opt_ask: "Always Ask Me", settings_opt_short: "Short & Concise", settings_opt_long: "Detailed", settings_clear_data: "Reset Application Data", settings_clear_data_desc: "This will erase all profiles, history, and keys.", settings_btn_clear: "Reset Everything",
    net_intro: "Welcome to Networking — Your Way. Pick what fits you today — big or small.",
    net_header: "What do you want to focus on right now?",
    net_opt_design: "Meet people in Design",
    net_opt_linkedin: "LinkedIn Strategy",
    net_opt_hobbies: "Hobbies & Activities",
    net_opt_parents: "Networking for Parents",
    net_opt_introvert: "Low-pressure Tips",
  },
  wiki: {
    titles: {
      foundation: 'The Essentials', job_strategy: 'Job Search Strategy', workplace: 'Workplace Culture', industries: 'Industry Guides', life: 'Life & Balance',
      identity: 'Identity & Permits', security: 'Social Security', market: 'The Market', tools: 'Tools', rights: 'Rights & Bias', networking: 'Networking & Hidden Market',
      social: 'Social Rituals', norms: 'Professional Norms', specialist: 'Specialist Roles', hands_on: 'Hands-on Work', housing: 'Housing & Transport',
      family: 'Family Support', language: 'Language',
      social_unemployment: 'Unemployment Benefits', social_housing: 'Housing Allowance', social_pension: 'Pension System', social_kela_card: 'The Kela Card', social_health: 'Public Healthcare',
      bureaucracy_dvv: 'The DVV & Personal ID', bureaucracy_migri: 'Migri (Immigration)', bureaucracy_tax: 'Tax Card', bureaucracy_bank: 'Opening a Bank Account',
      job_te_office: 'TE Services', job_portals: 'Job Boards', job_entrepreneurship: 'Entrepreneurship', 
      net_culture: 'The Finnish Way', net_linkedin: 'LinkedIn Strategy', net_hidden: 'Hidden Job Market', net_volunteering: 'Volunteering',
      job_cover_letter: 'Cover Letter', job_interview: 'Job Interview', job_recognition: 'Degree Recognition', job_cv_tips: 'Finnish CV Style',
      work_contract: 'Employment Contract', work_hours: 'Working Hours', work_holidays: 'Annual Holidays', work_unions: 'Trade Unions', work_probation: 'Probation Period',
      culture_meetings: 'Meeting Culture', culture_feedback: 'Giving Feedback', culture_names: 'First Names', culture_punctuality: 'Punctuality', culture_coffee: 'Coffee Breaks',
      culture_afterwork: 'Afterwork Drinks', culture_sauna: 'Sauna Diplomacy', culture_smalltalk: 'Silence & Small Talk', culture_party: 'Office Parties (Pikkujoulut)',
      prof_engineering: 'Engineering', prof_business: 'Business & Finance', prof_it: 'IT & Technology', prof_health: 'Healthcare & Nursing', prof_service: 'Service Industry',
      housing_contracts: 'Rental Contracts', housing_finding: 'Finding an Apartment', housing_utilities: 'Electricity & Internet', housing_recycling: 'Recycling Guide', housing_sauna: 'Laundry & Sauna',
      family_school: 'School System', family_daycare: 'Daycare (Päiväkoti)', family_activities: 'Hobbies & Sports', family_winter: 'Kids & Winter', family_safety: 'Safety & Independence'
    },
    articles: {
      'guide_start': { 
        title: 'Welcome to Finland! 🇫🇮', 
        summary: 'Finland functions on trust, silence, and coffee. This app is your survival guide.',
        content: `### Your Survival Guide\n\n**The Philosophy:**\nFinland is a society where systems work, but you must know how to use them. Trust is the currency of interaction, and silence is considered a form of respect.\n\n### How to use this app\n1. **Read:** Browse the guides for bureaucracy and work culture.\n2. **Chat:** Use the AI Assistant. It knows your profile and can give specific advice.\n3. **Profile:** Keep your info updated.` 
      },
      'net_culture': {
        title: 'Networking: The Finnish Way',
        summary: 'Finns network through shared activities, not small talk. Trust is everything.',
        content: `### The "Talkoot" Spirit\nNetworking in Finland is rarely about mingling at a cocktail party with a business card. It is about **doing things together**.\n\n* **Volunteering:** Join an event team (Slush, Nordic Business Forum, local festivals). When you work alongside a Finn, you build trust. Trust leads to job recommendations.\n* **Associations:** Finland has an association (yhdistys) for everything. Find the one for your profession.\n* **Quality over Quantity:** One meaningful connection is worth 100 loose contacts.`
      },
      'net_linkedin': {
        title: 'LinkedIn Strategy',
        summary: 'LinkedIn is the main search engine for recruiters in Finland.',
        content: `### Your Digital Face\n* **Keywords:** Recruiters search for skills, not titles. Use "Java", "Project Management", "B2B Sales" in your headline.\n* **Location:** Set it to Finland. If you are abroad, change it to "Helsinki" (and mention in About section you are relocating) to appear in local searches.\n* **Open to Work:** The green banner is culturally accepted here. It shows motivation.\n* **Activity:** Comment on local posts. It makes you visible to the author's network.`
      },
      'net_hidden': {
        title: 'Hacking the Hidden Market',
        summary: '70-80% of jobs are not advertised. You must find them.',
        content: `### Piilotyöpaikat (Hidden Jobs)\nCompanies often don't advertise because recruitment is expensive and slow.\n\n1. **Map Companies:** Make a list of 20 companies you like. Don't look at their "Open Positions" page yet.\n2. **The Open Application (Avoin hakemus):** Send an email to the Team Lead (not HR). "I've been following your work on X. I have skills in Y. Can we have a 15-min coffee?"\n3. **Informational Interviews:** Ask people about their job, not *for* a job. "I'm new to the Finnish energy sector. Could I ask you 3 questions about how it works here?" Most people say yes.`
      },
      'net_volunteering': {
        title: 'Volunteering',
        summary: 'The fastest way to integrate and prove your skills.',
        content: `### Why Volunteer?\n1. **Language:** Low pressure environment to practice Finnish.\n2. **References:** You get a local referee who can vouch for your work ethic.\n3. **Network:** You meet active people. \n\n### Where?\nRed Cross, startup events, local sports clubs, libraries.`
      },
      'bureaucracy_dvv': { 
        title: 'The DVV & Personal ID', 
        summary: 'The Digital and Population Data Services Agency (DVV) issues your Personal Identity Code (henkilötunnus).',
        content: `**Priority: IMMEDIATE**\n\n### The Mission\nTo legally exist in Finland. Without a registration at the **Digital and Population Data Services Agency (DVV)**, you are a ghost in the system.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). Format: *DDMMYY-XXXX*.\n\n### The Process\n1. **Visit DVV:** Book an appointment online weeks in advance.\n2. **Documents:** Bring Passport, Residence Permit, and Contract.\n3. **Municipality (Kotikunta):** Crucial for healthcare rights.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Immigration)', 
        summary: 'Migri handles your Residence Permit (oleskelulupa). Use "Enter Finland".',
        content: `### The Mission\nTo get your Residence Permit (oleskelulupa).\n\n### Key Steps\n* **Enter Finland:** Use the online service. It is faster.\n* **Identification:** You must visit a service point to prove who you are.\n* **Fast Track:** Available for specialists and startup entrepreneurs (14 days).` 
      },
      'bureaucracy_tax': { 
        title: 'Tax Card (Verokortti)', 
        summary: 'You must give a tax card to your employer, or they will deduct 60% of your salary.',
        content: `### The Rule\nNo card = **60% tax**. No exceptions.\n\n### The Process\n1. Log in to **MyTax (OmaVero)** with online banking codes.\n2. Estimate your annual income.\n3. Download the PDF.\n4. Email it to your payroll department.\n\n*Note: Finland has a progressive tax system. The more you earn, the higher the percentage.*` 
      },
      'bureaucracy_bank': { 
        title: 'Opening a Bank Account', 
        summary: 'A bank account gives you "strong electronic identification" (verkkopankkitunnukset), the key to all digital services.',
        content: `### The Challenge\nBanks have strict anti-money laundering laws. They need to know where your money comes from.\n\n### What to bring\n1. Passport (not just ID card).\n2. Residence Permit.\n3. Employment Contract.\n4. Personal ID Code (from DVV).\n\n### The Holy Grail\n**Strong Electronic Identification** (verkkopankkitunnukset). This allows you to log in to Kela, Tax, Health, and Posti services.` 
      },
      'social_kela_card': {
        title: 'The Kela Card',
        summary: 'The blue Kela card proves you are covered by Finnish National Health Insurance.',
        content: `### What is it?\nA blue card that proves you belong to the Finnish social security system.\n\n### How to use it\nShow it at: \n1. **Pharmacies:** You get a direct discount on prescribed medicine.\n2. **Private Clinics:** You get a small deduction from the cost.\n\n### How to get it\nApply via the Kela online service. You usually need a permanent address in Finland.`
      },
      'social_health': {
        title: 'Public vs. Occupational Health',
        summary: 'Employees should always use Occupational Health (Työterveys) first. It is faster and free.',
        content: `### Two Systems\n\n**1. Public Health (Terveysasema)**\n* **For:** Everyone with a municipality of residence.\n* **Cost:** Small fee (~20€) or free.\n* **Speed:** Can be slow. You must call your local health station.\n\n**2. Occupational Health (Työterveys)**\n* **For:** Employees.\n* **Cost:** Free for you (employer pays).\n* **Speed:** Fast. Often includes private clinics like Terveystalo or Mehiläinen.\n\n**Rule of Thumb:** If you are sick from work, use Occupational Health.`
      },
      'social_unemployment': {
        title: 'Unemployment Benefits',
        summary: 'If you lose your job, register at the TE Office on your FIRST day of unemployment.',
        content: `### The Golden Rule\nRegister as a jobseeker at **TE Services** (te-palvelut.fi) on your **very first day** of unemployment. If you delay, you lose money.\n\n### Who pays?\n1. **The Union Fund (Kassa):** If you have been a member of a union/fund for 26 weeks, you get *earnings-related allowance* (much higher).\n2. **Kela:** If you are not a member, you get the *basic daily allowance* (significantly lower).`
      },
      'social_housing': {
        title: 'Housing Allowance',
        summary: 'Kela can pay a portion of your rent if your income is low.',
        content: `### General Housing Allowance\n* **For whom:** Low-income households (students, part-time workers, unemployed).\n* **Calculation:** Based on your total household income and the city you live in.\n* **Application:** Apply online at Kela. You need your rental agreement.`
      },
      'social_pension': {
        title: 'Pension System',
        summary: 'You earn pension (eläke) for every euro you earn in Finland.',
        content: `### How it works\nEmployers automatically deduct pension contributions from your salary. You don't need to do anything.\n\n### Checking it\nYou can check how much you have accumulated at **Tyoelake.fi**.\n\n### Moving away?\nIf you move to another EU country, your pension rights wait for you until retirement age.`
      },
      'job_market_overview': { 
        title: 'The Job Market', 
        summary: 'Understanding the landscape.', 
        content: `### Overview\nThe Finnish market values skills and attitude. While Finnish language is often required, many tech and engineering roles operate in English.` 
      },
      'job_te_office': {
        title: 'TE Services (TE-toimisto)',
        summary: 'The Employment Office helps with integration, language courses, and unemployment security.',
        content: `### What they do\n* **Integration Plan:** They verify if you need Finnish courses.\n* **Job Seeker Status:** Required to receive any money from Kela or Unions.\n* **CV-net:** A portal to upload your profile.\n\n### Note\nTheir service can be bureaucratic. Always follow their instructions exactly to avoid "karenssi" (losing benefits).`
      },
      'job_portals': {
        title: 'Where to find jobs',
        summary: 'The main job boards you should bookmark.',
        content: `### Major Sites\n* **LinkedIn:** The #1 place for English-speaking expert jobs.\n* **Oikotie Työpaikat:** The biggest Finnish job board.\n* **Duunitori:** Also very popular.\n* **The Hub:** Best for Startup & Tech jobs.\n* **Work in Finland:** Official government portal for English jobs.`
      },
      'job_entrepreneurship': {
        title: 'Entrepreneurship (Yrittäjyys)',
        summary: 'Finland needs entrepreneurs. There is money available to help you start.',
        content: `### Starttiraha (Startup Grant)\nIf you become a full-time entrepreneur, you can get ~700€/month for 6-12 months to secure your livelihood while you start.\n\n**Important:** You must apply **before** you register the company.\n\n### Types of companies\n* **Toiminimi (Tmi):** Sole trader. Easy to set up.\n* **Oy (Osakeyhtiö):** Limited company. Better for growth.`
      },
      'job_cv_tips': {
        title: 'The Finnish CV Style',
        summary: 'Keep it short, factual, and include a photo.',
        content: `### Checklist\n1. **Length:** Max 2 pages. Ideally 1.\n2. **Photo:** Standard practice in Finland. Smile, look professional.\n3. **Profile:** A short summary at the top.\n4. **Skills:** List specific technologies or hard skills.\n5. **Tone:** Be humble but confident. State facts, don't brag with adjectives.`
      },
      'job_cover_letter': {
        title: 'The Cover Letter',
        summary: 'Don\'t repeat your CV. Answer "Why us?" and "Why you?".',
        content: `### Structure\n1. **Hook:** Why do you want *this* specific job?\n2. **Value:** What problems can you solve for them?\n3. **Personality:** Will you fit the team?\n\n### Tip\nKeep it under 1 page. Finns value brevity.`
      },
      'job_interview': {
        title: 'The Job Interview',
        summary: 'Honesty is tested. Silence is okay.',
        content: `### What to expect\n* **Honesty:** If you don't know, say "I don't know, but I can learn". Never lie.\n* **Silence:** If the interviewer is silent after your answer, don't panic. They are thinking. Don't babble to fill the void.\n* **Coffee:** Always say yes if offered (or ask for water). It's a ritual.`
      },
      'job_recognition': {
        title: 'Degree Recognition',
        summary: 'Crucial for regulated professions like doctors, nurses, and teachers.',
        content: `### Regulated Professions\nFor health/education roles, your degree must be recognized by **OPH** (Finnish National Agency for Education) or **Valvira**.\n\n### General Roles\nFor IT, business, or marketing, formal recognition is rarely needed. Your skills matter more.`
      },
      'work_contract': { 
        title: 'Employment Contract', 
        summary: 'Always written. Read it carefully. Check the Collective Agreement (TES).',
        content: `### Key Elements\n1. **Duration:** Permanent (toistaiseksi voimassa oleva) or Fixed-term (määräaikainen).\n2. **TES:** Mentions which Collective Agreement applies. This determines your minimum pay and holidays.\n3. **Trial Period:** Max 6 months.\n\n**Never start working without a signed contract.**` 
      },
      'work_hours': {
        title: 'Working Hours',
        summary: 'Standard is 7.5 or 8 hours a day. Overtime must be paid.',
        content: `### The Balance\n* **Full time:** Usually 37.5 or 40 hours/week.\n* **Flexibility:** Many companies offer "liukuma" (flex time). You can start between 7-9 and leave between 15-17.\n* **Lunch:** Usually 30 mins (unpaid).`
      },
      'work_holidays': {
        title: 'Annual Holidays',
        summary: 'Finland has generous holidays, but you must earn them.',
        content: `### The Credit Year\nYou earn holiday days from April 1st to March 31st. \n* **Standard:** 2.5 days per month worked = 30 days (5 weeks) per year.\n* **Summer:** Usually taken in July. The whole country stops.\n* **Holiday Bonus:** Many industries pay 50% extra salary for the holiday period (lomaraha).`
      },
      'work_unions': {
        title: 'Trade Unions (Liitto)',
        summary: 'Highly recommended. They control the unemployment funds.',
        content: `### Why join?\n1. **Money:** They pay earnings-related unemployment allowance (much more than Kela).\n2. **Legal:** Free legal help if your employer treats you wrong.\n\n### Which one?\n* **YTK:** Just the unemployment fund (cheaper).\n* **TEK:** For engineers.\n* **PAM:** For service workers.`
      },
      'work_probation': {
        title: 'Probation Period (Koeaika)',
        summary: 'The first 6 months are usually a trial.',
        content: `### The Rules\nDuring probation (max 6 months), **both** you and the employer can terminate the contract immediately without a notice period.\n\n*Note: They still need a proper reason, they cannot fire you for discriminatory reasons.*`
      },
      'culture_meetings': { 
        title: 'Meeting Culture', 
        summary: 'Finns are punctual and agenda-driven. Small talk is minimal.', 
        content: `### The Rules\n1. **Start on time:** If a meeting is at 09:00, you are there at 08:59.\n2. **The Agenda:** Stick to it. Finns like structure.\n3. **Silence:** Silence means people are thinking or agree. It does not mean something is wrong.\n4. **End on time:** Respect everyone's calendar.` 
      },
      'culture_feedback': {
        title: 'Giving & Receiving Feedback',
        summary: 'Feedback is direct and fact-based. Don\'t take it personally.',
        content: `### Directness\nA Finn might say: *"This report is missing X."*\nThey are not being rude. They are just stating a fact to fix the problem efficiently. They separate the person from the work.`
      },
      'culture_names': {
        title: 'First Names',
        summary: 'Finland is very informal. Titles are rarely used.',
        content: `### Hello, Boss\nEveryone uses first names. You call the CEO "Matti", not "Mr. Korhonen". You can use "sinä" (you) with almost everyone.`
      },
      'culture_punctuality': {
        title: 'Punctuality',
        summary: '5 minutes late is late.',
        content: `### Time is Respect\nBeing late is considered stealing the other person's time. If you are going to be 5 minutes late, send a message.`
      },
      'culture_coffee': {
        title: 'Coffee Breaks (Kahvitauko)',
        summary: 'A sacred ritual. It is often legally mandated.',
        content: `### The Ritual\nMost contracts include two 10-15 minute coffee breaks.\n\n* **Socialize:** This is where the real bonding happens. Don't sit alone at your desk.\n* **Decaf?** Good luck. Finns drink the most coffee in the world.`
      },
      'culture_afterwork': {
        title: 'Afterwork (AW)',
        summary: 'Casual drinks on Fridays.',
        content: `### The Vibe\nUsually casual. It's okay to drink alcohol, and it's okay to drink mocktails. It's about relaxing, not getting drunk (usually).`
      },
      'culture_sauna': {
        title: 'Sauna Diplomacy',
        summary: 'The sauna is a place of equality. Even in business.',
        content: `### The Rules\n1. **Equality:** In the sauna, there are no titles. The CEO and the intern are equal.\n2. **Nudity:** It is non-sexual. It's just natural.\n3. **Business:** Decisions are sometimes made here, or at least relationships are cemented.`
      },
      'culture_smalltalk': {
        title: 'Silence & Small Talk',
        summary: 'Silence is not awkward. It is a comfortable pause.',
        content: `### Don't fill the void\nIf you are in an elevator with a Finn, you don't have to talk. A nod is enough. We value words; we don't waste them on stating the obvious (like the weather, unless it's really extreme).`
      },
      'culture_party': {
        title: 'Office Parties (Pikkujoulut)',
        summary: '"Little Christmas" parties in December can get wild.',
        content: `### The Exception\nFinns are reserved, EXCEPT at *Pikkujoulut*. This is the annual Christmas party. There is usually plenty of alcohol, and colleagues might be much more open/loud than usual. What happens at Pikkujoulut, stays at Pikkujoulut.`
      },
      'prof_engineering': {
        title: 'Engineering in Finland',
        summary: 'A huge sector. English is widely used.',
        content: `### Key Players\nKone, Wärtsilä, Nokia, Metso.\n\n### Culture\nFact-based. Prepare technical details. Precision is valued over sales speeches.`
      },
      'prof_business': {
        title: 'Business & Finance',
        summary: 'Often requires Finnish, but startups are an exception.',
        content: `### The Barrier\nTraditional roles (HR, Accouting, Banks) usually require fluent Finnish. \n\n### The Opportunity\nLook for *International Sales*, *Business Analytics*, or *Export* roles where your native language is an asset.`
      },
      'prof_it': {
        title: 'IT & Technology',
        summary: 'The easiest sector for English speakers.',
        content: `### The Hub\nFinland needs coders. English is the company language in almost all tech companies (Wolt, Supercell, Relex).\n\n### Hiring\nThey often use coding tests. Show your GitHub.`
      },
      'prof_health': {
        title: 'Healthcare & Nursing',
        summary: 'Huge shortage of workers, but Finnish is mandatory.',
        content: `### The Reality\nYou need Valvira licensing. To get it, you usually need Finnish level B1/B2. Patient safety is the priority.`
      },
      'prof_service': {
        title: 'Service Industry',
        summary: 'Restaurants and cleaning are common entry points.',
        content: `### Entry Level\nCleaning and restaurant kitchens often hire non-Finnish speakers. It's a way to start earning while you learn the language.`
      },
      'housing_contracts': {
        title: 'Rental Contracts',
        summary: 'Secure and regulated. Usually indefinite.',
        content: `### Terms\n* **Deposit:** Usually 2 months' rent.\n* **Notice:** Usually 1 calendar month for you.\n* **Home Insurance:** Almost always mandatory.`
      },
      'housing_finding': {
        title: 'Finding an Apartment',
        summary: 'The market is fast in Helsinki.',
        content: `### Portals\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Tip\nHave your profile text ready. When you go to a showing, be ready to decide immediately.`
      },
      'housing_utilities': {
        title: 'Electricity & Internet',
        summary: 'You usually make your own electricity contract.',
        content: `### Electricity\nIt is not included in rent. You must choose a provider and make a contract.\n\n### Water\nOften a fixed fee (e.g., 20€/person/month).`
      },
      'housing_recycling': {
        title: 'Recycling Guide',
        summary: 'Finns recycle everything. It saves money and the planet.',
        content: `### The Bins\n* **Bio:** Food waste.\n* **Muovi:** Plastic packaging.\n* **Kartonki:** Milk cartons, boxes.\n* **Paperi:** Mail, newspapers.\n* **Sekajäte:** Mixed waste (try to minimize this).\n\n### Pantti\nBottles and cans have a deposit (10c - 40c). Return them to the machine at the supermarket to get money back.`
      },
      'housing_sauna': {
        title: 'Laundry & Sauna',
        summary: 'Most buildings have shared facilities.',
        content: `### Taloyhtiö (Housing Company)\n* **Laundry:** Usually a booking list (varauslista) in the room.\n* **Lenkkisauna:** A free weekly sauna slot for everyone (e.g., Men on Fridays 18-20).\n* **Own turn:** You can book a private weekly hour for a small monthly fee.`
      },
      'family_school': {
        title: 'School System',
        summary: 'One of the best in the world. And it is free.',
        content: `### Basics\n* **Starts:** Age 7.\n* **Cost:** Free. Including books and warm lunch.\n* **Language:** Usually Finnish or Swedish. International schools exist but have queues.`
      },
      'family_daycare': {
        title: 'Daycare (Päiväkoti)',
        summary: 'Every child has a right to daycare.',
        content: `### Application\nApply 4 months in advance. It is heavily subsidized.\n\n### Cost\nDepends on income. Max is ~300€/month. Low income families pay 0€.`
      },
      'family_activities': {
        title: 'Hobbies & Sports',
        summary: 'Hobbies are taken seriously here.',
        content: `### Options\n* **Libraries:** Oodi and others offer 3D printing, sewing machines, and gaming rooms for free.\n* **Sports:** Football, floorball, and ice hockey are huge.\n* **Music:** Music schools (musiikkiopisto) are high quality.`
      },
      'family_winter': {
        title: 'Kids & Winter',
        summary: 'There is no bad weather, only bad clothes.',
        content: `### Clothing\n* **Layers:** Wool layer, fleece layer, outer layer.\n* **Haalari:** The one-piece overall is the standard kid uniform.\n* **Reflectors:** Essential for safety in the dark. Hang them on jackets and backpacks.`
      },
      'family_safety': {
        title: 'Safety & Independence',
        summary: 'Finland is safe. Kids walk to school alone.',
        content: `### Independence\nDon't be alarmed if you see a 7-year-old taking the metro alone. It is normal. We trust society to keep them safe.`
      }
    }
  }
};
