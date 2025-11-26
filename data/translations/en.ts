
import { TranslationResource } from "./types";

export const en: TranslationResource = {
  ui: {
    landing_welcome: "Welcome!", landing_subtitle: "Find your way to work in Finland", landing_btn_quiz: "Tell me about you", landing_btn_continue: "Open my guide", landing_btn_ask: "Start a chat", landing_btn_browse: "Browse the Guide", landing_load_sample: "Load Sample", landing_erase: "Erase Data", landing_add_key: "Add API Key", landing_choose_lang: "Language",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Welcome back to your personal Finland guide.", dash_subtitle_guest: "Let's build a profile to get started.", dash_btn_guide: "Open Guide", dash_btn_browse: "Browse", dash_btn_ask: "Ask AI", dash_btn_history: "History", dash_btn_cv: "Import CV", dash_switch_profile: "Switch", dash_new_profile: "New", dash_edit_profile: "Edit", dash_profile_overview: "Profile",
    dash_education: "Education", dash_profession: "Profession", dash_languages: "Languages", dash_narrative_aspirations: "Aspirations", dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...", chat_end_session: "End", chat_header_assistant: "Assistant", chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"", chat_ask_length: "Short or detailed answer?", chat_length_set_confirm: "Got it. I will adjust the length.", chat_empty_state: "Start the conversation by asking a question below.",
    btn_back_dashboard: "Back", btn_save: "Save",
    profile_btn_guide: "My Guide", profile_btn_guide_desc: "Recommended articles", profile_btn_plan: "My Plan", profile_btn_plan_desc: "Coming soon", profile_sect_languages: "Languages", profile_sect_skills: "Skills", profile_sect_narrative: "Story", profile_label_aspirations: "Hopes", profile_label_challenges: "Fears", profile_label_education: "Education", profile_label_profession: "Profession", profile_completeness: "{percentage}% complete", profile_completeness_hint: "Answer a few more questions", profile_btn_update: "Update Profile", profile_btn_continue: "Continue",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Curated for {name}", wiki_explore_cats: "Explore Topics", wiki_explore_subtitle: "Pick a topic to dive in.", wiki_full_index: "Index", wiki_full_index_subtitle: "Browse everything.", wiki_nav_list: "List", wiki_nav_icons: "Icons", wiki_section_chapters: "Chapters", wiki_btn_mark_done: "Done", wiki_btn_later: "Later", wiki_btn_saved: "Saved", wiki_btn_completed: "Completed", wiki_ctx_ask: "Ask about this", wiki_topic_label: "Topic: {tag}", wiki_topic_desc: "Overview & Articles", wiki_guide_prefix: "GUIDE", wiki_stat_articles: "articles", wiki_stat_complete: "done", wiki_section_prefix: "Section",
    wizard_header_quiz: "Questionnaire", wizard_greeting_short: "Hi, {name}!", wizard_title_init: "Create Profile", wizard_title_custom: "Building {name}", wizard_phase_identity: "PHASE 1: IDENTITY", wizard_phase_demo: "PHASE 2: BACKGROUND", wizard_phase_status: "PHASE 3: STATUS", wizard_phase_skills: "PHASE 4: SKILLS", wizard_phase_mindset: "PHASE 5: MINDSET", wizard_phase_vision: "PHASE 6: VISION", wizard_nickname_hint: "* You can use a nickname.", wizard_btn_ask: "Ask", wizard_btn_next: "Next", wizard_btn_prev: "Back", wizard_btn_submit: "Submit", wizard_btn_finish_early: "Save & Finish", wizard_btn_generate_name: "Generate name", wizard_ribbon_greeting: "Nice to meet you, {name}!", wizard_title_name: "What is your name?", wizard_desc_name: "Type your name or pick a nickname", wizard_placeholder_name: "Your name",
    wizard_step2_title: "How old are you?", wizard_step2_desc: "Choose your age group", wizard_step2_placeholder: "Age (e.g. 29)",
    wizard_step3_title: "Marital Status?",
    wizard_marital_solo_title: "Solo", wizard_marital_solo_desc: "No partner or children here", wizard_marital_pair_title: "Partnered / Family", wizard_marital_pair_desc: "With spouse or children", wizard_marital_secret_title: "Secret", wizard_marital_secret_desc: "It's complicated / I won't say",
    wizard_children_title: "Do you have children?", wizard_children_desc: "This helps us with school and daycare advice.", wizard_children_yes: "Yes", wizard_children_no: "No", wizard_family_details_title: "Family Details", wizard_family_count_label: "How many?", wizard_family_ages_label: "Ages?", wizard_family_ages_hint: "Select all that apply.", wizard_age_group_0_6: "Daycare (0-6)", wizard_age_group_7_12: "School (7-12)", wizard_age_group_13_17: "Teens (13-17)", wizard_age_group_18: "Adults (18+)",
    wizard_step4_title: "Where are you from?", wizard_step4_desc: "Country of origin", wizard_step4_placeholder: "Type country name...", wizard_step4_no_match: "No match found", wizard_btn_search_country: "Search Country", wizard_btn_select_region: "Select Region", wizard_region_europe: "Europe", wizard_region_americas: "Americas", wizard_region_asia: "Asia", wizard_region_africa: "Africa", wizard_region_oceania: "Oceania", wizard_region_middle_east: "Middle East", wizard_eu_question: "EU/EEA Citizen?", wizard_eu_yes: "Yes", wizard_eu_no: "No",
    wizard_step5_title: "Right to Work", wizard_permit_full_title: "Unlimited", wizard_permit_full_desc: "Permanent, Family, EU, or Finnish Degree", wizard_permit_restricted_title: "Restricted", wizard_permit_restricted_desc: "Work-based permit tied to employer", wizard_permit_student_title: "Student", wizard_permit_student_desc: "Limited hours",
    wizard_step6_title: "Highest Education", wizard_step6_desc: "Which describes you best?", wizard_step6_field_label: "Field (Optional)", wizard_step6_field_placeholder: "e.g. Engineering", wizard_edu_general_title: "General", wizard_edu_general_desc: "High school. No trade.", wizard_edu_applied_title: "Vocational", wizard_edu_applied_desc: "Trade school or Applied University (AMK).", wizard_edu_uni_title: "University", wizard_edu_uni_desc: "Academic degree (Bachelor, Master, PhD).",
    wizard_step7_title: "Your Profession?", wizard_step7_desc: "Or what work you are looking for?", wizard_step7_placeholder: "e.g. Nurse, Welder, Coder",
    wizard_step8_title: "Finnish Language", wizard_lbl_finnish_level: "Current Level", wizard_lbl_finnish_motivation: "Motivation", wizard_opt_lang_none: "None yet", wizard_opt_lang_basics: "Basics (A1)", wizard_opt_lang_inter: "Intermediate (A2-B1)", wizard_opt_lang_fluent: "Fluent (B2+)", wizard_scale_1_motivation: "Curious", wizard_scale_5_motivation: "Unstoppable",
    wizard_step9_title: "English Language", wizard_opt_lang_en_none: "None", wizard_opt_lang_en_basic: "Basic", wizard_opt_lang_en_working: "Working Proficiency", wizard_opt_lang_en_fluent: "Native/Fluent",
    wizard_step10_title: "Vision", wizard_step10_aspirations_label: "Aspirations", wizard_step10_aspirations_placeholder: "What do you hope to achieve?", wizard_step10_challenges_label: "Challenges", wizard_step10_challenges_placeholder: "What worries you?",
    wizard_step12_title: "Feeling about Finnish culture?", wizard_opt_cult_low: "A beautiful mystery", wizard_opt_cult_med: "Happily observing", wizard_opt_cult_high: "Diving in deep",
    wizard_step13_title: "Rhythm of life?", wizard_scale_1_life: "Still strange", wizard_scale_5_life: "Like home",
    wizard_step14_title: "Confidence in job hunting?", wizard_scale_1_career: "Need guidance", wizard_scale_5_career: "I have a plan",
    wizard_step15_title: "Is the path clear?", wizard_opt_info_none: "A bit foggy", wizard_opt_info_some: "Clearing up", wizard_opt_info_high: "Crystal clear",
    wizard_step16_title: "What excites you most?", wizard_opt_excite_career: "Building a career", wizard_opt_excite_life: "Peace & Safety", wizard_opt_excite_nature: "Nature & Seasons", wizard_opt_excite_adventure: "Adventure",
    wizard_rating_winter: "Winter", wizard_rating_thaw: "Thaw", wizard_rating_growth: "Growth", wizard_rating_bloom: "Bloom", wizard_rating_summer: "Summer",
    history_title: "Chat History", history_empty: "No conversations yet.", history_tab_summary: "Summary (AI)", history_tab_transcript: "Transcript", history_no_summary: "No summary available.", history_generating: "AI is writing summary...", history_generating_desc: "This happens in background.",
    cv_title: "Analyze CV", cv_subtitle: "Paste your CV text to auto-fill your profile.", cv_placeholder: "Paste CV text here...", cv_btn_analyze: "Analyze & Import", cv_btn_processing: "Processing...", cv_warning_key: "Personal API Key required.", cv_key_update: "Update Key", cv_key_required: "Key Required", cv_key_desc: "For privacy, please use your own Google Gemini API Key. It is stored only on your device.", cv_key_placeholder: "Paste Key here...", cv_key_save: "Save Key", cv_alert_success: "API Key saved.", cv_alert_error: "Analysis failed. Please check your key.", cv_btn_manage_key: "API Key",
    settings_title: "Settings", settings_sect_general: "General", settings_sect_appearance: "Appearance", settings_sect_data: "Data & Privacy", settings_length_label: "Answer Length", settings_theme_label: "Theme", settings_theme_system: "System Default", settings_theme_light: "Light", settings_theme_dark: "Dark", settings_opt_ask: "Always Ask", settings_opt_short: "Short", settings_opt_long: "Detailed", settings_clear_data: "Reset App Data", settings_clear_data_desc: "This will erase all profiles, history, and keys.", settings_btn_clear: "Erase All",
    net_intro: "Welcome to Networking. Pick your path.",
    net_header: "What should we focus on?",
    net_opt_design: "Design Community",
    net_opt_linkedin: "LinkedIn Strategy",
    net_opt_hobbies: "Hobbies & Activities",
    net_opt_parents: "Networking for Parents",
    net_opt_introvert: "Tips for Introverts",
    feedback_action: "Give Feedback",
    net_intro_deep: 'Why Networking Matters', net_design: 'Design Community', net_parents: 'Networking for Parents', net_introvert: 'Low-Pressure Networking', net_hobbies: 'Hobby Networking', net_plan: 'Your Action Plan',
    net_cold_msg: 'The Art of the Cold Message', net_places: 'Networking Venues', net_prof_style: 'Finnish Professional Style',
    net_hackathons: 'Hackathons & Junction', net_slush: 'Slush: The Anti-Conference', net_school: 'Networking in School'
  },
  wiki: {
    titles: {
      foundation: 'Bureaucracy & Basics', job_strategy: 'Job Strategy', workplace: 'Work Culture', industries: 'Industry Guides', life: 'Life & Balance',
      identity: 'Identity & Permits', security: 'Social Security', market: 'The Market', tools: 'Tools', rights: 'Rights', networking: 'Networking & Hidden Market',
      social: 'Social Rituals', norms: 'Professional Norms', specialist: 'Specialist Roles', hands_on: 'Hands-on Work', housing: 'Housing & Transport',
      family: 'Family Support', language: 'Language',
      social_unemployment: 'Unemployment Benefits', social_housing: 'Housing Allowance', social_pension: 'Pension System', social_kela_card: 'Kela Card', social_health: 'Public Healthcare',
      bureaucracy_dvv: 'DVV & Personal ID', bureaucracy_migri: 'Immigration (Migri)', bureaucracy_tax: 'Tax Card', bureaucracy_bank: 'Opening Bank Account',
      job_te_office: 'TE Office', job_portals: 'Job Portals', job_entrepreneurship: 'Entrepreneurship', 
      net_culture: 'The Finnish Way', net_linkedin: 'LinkedIn Strategy', net_hidden: 'Hidden Job Market', net_volunteering: 'Volunteering',
      job_cover_letter: 'Cover Letter', job_interview: 'The Interview', job_recognition: 'Degree Recognition', job_cv_tips: 'Finnish CV',
      work_contract: 'Employment Contract', work_hours: 'Working Hours', work_holidays: 'Holidays', work_unions: 'Unions', work_probation: 'Probation Period',
      culture_meetings: 'Meeting Culture', culture_feedback: 'Giving Feedback', culture_names: 'Names & Titles', culture_punctuality: 'Punctuality', culture_coffee: 'Coffee Breaks',
      culture_afterwork: 'Afterwork', culture_sauna: 'Sauna Diplomacy', culture_smalltalk: 'Silence & Small Talk', culture_party: 'Office Parties',
      prof_engineering: 'Engineering', prof_business: 'Business & Finance', prof_it: 'IT & Tech', prof_health: 'Health & Nursing', prof_service: 'Service Industry',
      housing_contracts: 'Rental Contracts', housing_finding: 'Finding Apartments', housing_utilities: 'Utilities', housing_recycling: 'Recycling Guide', housing_sauna: 'Laundry & Sauna',
      family_school: 'School System', family_daycare: 'Daycare', family_activities: 'Hobbies & Sports', family_winter: 'Kids & Winter', family_safety: 'Safety'
    },
    articles: {
      'guide_start': { 
        title: 'Welcome to Finland! 🇫🇮', 
        summary: 'Finland runs on trust, silence, and coffee. This guide is your survival manual.', 
        content: `# Your Survival Manual\n\n**The Philosophy:**\nFinland runs on trust, silence, and coffee. It is a society where systems work, but you must know how to use them. Trust is the currency of interaction, and silence is a sign of respect.\n\n### How to use this app\n1. **Read:** Browse the guides on bureaucracy and work culture.\n2. **Chat:** Ask the AI Assistant about your specific situation.\n3. **Profile:** Keep your data fresh to get accurate advice.\n\n*Sisu* (Guts) is all you need!` 
      },
      'net_culture': {
        title: 'Networking: The Finnish Way',
        summary: 'Finns connect through doing things together, not small talk. Trust is everything.',
        content: `### The "Talkoot" Spirit\nNetworking in Finland is rarely about mingling with business cards at a cocktail party. It is about **working together**.\n\n* **Volunteering:** Join the team of an event (Slush, Nordic Business Forum, local festivals). When you work side-by-side with a Finn, you build trust. Trust leads to job recommendations.\n* **Associations:** Finland has an association (yhdistys) for everything. Find the one for your profession.\n* **Quality over Quantity:** One meaningful connection is worth more than 100 loose contacts.`
      },
      'net_intro_deep': {
        title: 'Why Networking Matters',
        summary: 'Most jobs are hidden. Networking is the key to unlock them.',
        content: `# The Hidden Job Market\n\nIf there's one thing you should know, it's this: networking isn't just "nice to have" - it's one of the most powerful tools you can use.\n\nIn Finland, **trust** plays a huge role. Employers want to know who can vouch for you. Because of that, many jobs never make it to job portals – this is the so-called "hidden job market". These jobs are filled quietly through recommendations, small circles, and informal connections.\n\nThe hidden job market holds **70-80 percent** of Finland's actual open job positions.\n\n### It's Human\nNetworking here doesn't require a big personality. You can start small: join a local hobby group, attend an event at your city's international house, or say hello to someone at a meetup. Every conversation is a tiny bridge.\n\nThink of networking as planting seeds. Some grow quickly, others take time. Work and belonging go hand in hand.`
      },
      'net_linkedin': {
        title: 'LinkedIn Strategy',
        summary: 'LinkedIn is the main search engine for recruiters in Finland.',
        content: `# Build a Finnish-Friendly LinkedIn\n\nLinkedIn is one of the strongest career tools in Finland. Because the job market is small and professional communities are tight-knit, LinkedIn functions like a public portfolio and a networking hub.\n\n### Your Quick Wins\n1. **Headline:** Keywords matter. Recruiters search for skills. Instead of just "Designer", use "Aspiring Product Designer | 3D Modeling | Graphic Design".\n2. **Location:** Set it to Finland (or Helsinki area) to appear in local searches.\n3. **Open to Work:** The green banner is culturally accepted here and shows motivation.\n4. **Activity:** Comment on local posts. A friendly message, a comment on someone's post, or sharing what you're learning builds visibility. Consistency beats showing off.\n\n### Culture Note\nFinns appreciate sincerity. You don't need to "sell" yourself aggressively. Just be clear about what you can do.`
      },
      'net_hobbies': {
        title: 'Hobbies & "Soft" Networking',
        summary: 'Join local activities to meet people naturally without pressure.',
        content: `# Meet People Naturally\n\nNot all networking happens at business events. Some of the most meaningful connections grow out of everyday activities.\n\n### Why it works\nFinns bond over **shared activities** rather than small talk. Joining a hobby group gives you a natural reason to interact.\n\n### Ideas\n* **Adult Education Centres (Kansalaisopisto):** Take a cheap course in pottery, photography, or language. You will meet locals in a relaxed setting.\n* **Sports:** Floorball, football, or ice hockey. Joining a "beginner group" creates an instant team bond.\n* **Volunteering:** Events like festivals or charity work (Red Cross) connect you with active people.\n\nThis "soft networking" builds trust over time, which can eventually lead to job tips.`
      },
      'net_parents': {
        title: 'Networking for Parents',
        summary: 'Limited time? Use your daily rhythm to build connections.',
        content: `# Networking for Busy Parents\n\nWhen you're balancing work and family, traditional networking events might be impossible. But you have a secret weapon: other parents.\n\n### Micro-Interactions\n* **Playground Diplomacy:** If you see the same parent at the park (leikkipuisto) repeatedly, say "Moi". Small chats about kids often lead to "So, what do you do?"\n* **Daycare Events:** Participate in "talkoot" (volunteer cleaning/fixing days) at the daycare. It earns you massive respect and connects you with other local families.\n* **Online Groups:** Facebook groups like "Mothers in Business" (MiB) are very active and powerful professional networks in Finland.`
      },
      'net_introvert': {
        title: 'Low-Pressure Networking',
        summary: 'You don\'t need to be loud. Finland is an introvert-friendly country.',
        content: `# Networking Your Way\n\nNot everyone likes big events. Luckily, Finnish culture respects personal space and silence.\n\n### Strategies\n1. **One-on-One:** Finns prefer deep 1-on-1 conversation over mingling in a crowd. Ask one person for a "virtual coffee" (15 min call) to ask for advice. It is less scary and more effective.\n2. **Online Communities:** Join Discord or Slack communities for your industry (e.g., IGDA for game dev, Koodiklinikka for IT). You can observe first and engage when ready.\n3. **Library Events:** Libraries like Oodi host quiet workshops and book clubs. Very low pressure environments to be around people.`
      },
      'net_hidden': {
        title: 'Hacking the Hidden Market',
        summary: '70-80% of jobs are not advertised. You must find them.',
        content: `### Piilotyöpaikat (Hidden Jobs)\nCompanies often don't advertise because recruitment is expensive and slow.\n\n1. **Map Companies:** Make a list of 20 companies you like. Don't look at their "Open Positions" page yet.\n2. **Open Application (Avoin hakemus):** Email the Team Lead (not HR). "I've been following your work on X. I have skills in Y. Could we have a 15-min coffee?"\n3. **Info Interviews:** Ask people about their job, not *for* a job. "I'm new to the Finnish energy sector. Could I ask you 3 questions about how things work here?" Most people will say yes.`
      },
      'net_volunteering': {
        title: 'Volunteering',
        summary: 'The fastest way to integrate and prove skills.',
        content: `### Why Volunteer?\n1. **Language:** Low-pressure environment to practice Finnish.\n2. **References:** You gain a local reference who can vouch for your work ethic.\n3. **Network:** You meet active people.\n\n### Where?\nRed Cross, startup events, sports clubs, libraries.`
      },
      'net_school': {
        title: 'Networking in School',
        summary: 'School is your first professional network. From Vocational to University.',
        content: `# The Student Advantage\n\nStudying in Finland is the single best way to build a network. Your classmates are your future colleagues.\n\n### 1. Vocational (Amis)\n* **The Key:** *Työssäoppiminen* (On-the-job learning).\n* **Strategy:** Treat every internship day like a job interview. Be active, ask questions, and sit with the staff during coffee breaks. Many students are hired directly by their internship employer.\n\n### 2. Applied Sciences (AMK)\n* **The Key:** *Opinnäytetyö* (Thesis).\n* **Strategy:** Avoid writing a purely theoretical thesis. Find a "commissioned thesis" (toimeksianto) from a company. You solve a real problem for them; they get to know you. It is essentially a 3-6 month job interview.\n* **Projects:** AMK courses often involve real client projects. Volunteer to be the project manager or the client liaison.\n\n### 3. University (Yliopisto)\n* **The Key:** *Ainejärjestöt* (Subject Organizations).\n* **Culture:** Every major has a "guild" or club (look for the colored overalls/haalarit). They host "excursions" (visits to companies) and career nights. Joining the board of your student organization is a massive signal of activity to recruiters.`
      },
      'net_hackathons': {
        title: 'Hackathons (Junction)',
        summary: 'Show your skills in action. Finland is famous for tech events.',
        content: `# Hackathons: Show, Don't Just Tell\n\nFinland has a massive hackathon culture, with **Junction** being Europe's leading hackathon.\n\n### What is it?\nA 48-hour event where you build a project in a team to solve a challenge given by partner companies (like Supercell, Kone, or Reaktor).\n\n### Why go?\n1. **Recruitment:** Companies send their tech leads to mentor you. If they see you coding/designing well, they might hire you on the spot.\n2. **Networking:** You bond deeply with your team under pressure.\n3. **It's not just for coders:** Teams need designers and business people too.`
      },
      'net_slush': {
        title: 'Slush & Startup Events',
        summary: 'Volunteering at Slush is a legendary way to enter the ecosystem.',
        content: `# Slush: The Anti-Conference\n\nHeld in November in Helsinki, Slush is the world's leading startup event. It is dark, loud, and full of lasers.\n\n### The Volunteer Army\nSlush is built by thousands of volunteers. \n* **Why volunteer?** You get free access to the event, exclusive afterparties, and you join a massive alumni network of active people.\n* **Roles:** Everything from building the stage to guiding VIP investors. It proves you have a "can-do" attitude, which Finns love.`
      },
      'net_cold_msg': {
        title: 'The Cold Message',
        summary: 'How to approach people without being annoying.',
        content: `# The Art of Approach\n\nFinns are busy but helpful. Keep it short.\n\n### Template\n"Hi [Name], I saw your post about [Topic]. I am an expert in [Skill] moving to Finland. I would love to ask one quick question about [Specific detail]. Do you have 10 mins for a virtual coffee?"`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Personal ID', 
        summary: 'Get your Personal Identity Code to exist legally.', 
        content: `**Priority: IMMEDIATE**\n\n### The Mission\nTo exist officially. Without registering at the **Digital and Population Data Services Agency (DVV)**, you are a ghost in the system.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). Format: *DDMMYY-XXXX*.\n\n### Why you need it\n1. Bank account.\n2. Phone contract.\n3. Tax card.\n4. Health services.` 
      },
      'bureaucracy_migri': { 
        title: 'Migri (Immigration)', 
        summary: 'Residence Permit and booking tips.', 
        content: `# Migri 🛂\n\n### The Mission\nGetting your Residence Permit (oleskelulupa).\n\n### Tips\n* **Enter Finland:** Use the online service. It is much faster.\n* **Identification:** You must visit a service point to prove your identity.\n* **Fast Track:** Available for specialists and startup entrepreneurs (14 days).` 
      },
      'bureaucracy_tax': { 
        title: 'Tax Card (Verokortti)', 
        summary: 'Without a tax card, 60% tax is withheld. No exceptions.', 
        content: `# The Golden Rule\nNo card = **60% tax**. \n\n### Process\n1. Log in to **MyTax (OmaVero)** with bank codes.\n2. Estimate annual income.\n3. Download PDF.\n4. Email to payroll/boss.\n\n*Note: Finland has progressive taxation. The more you earn, the higher the percentage.*` 
      },
      'bureaucracy_bank': { 
        title: 'Opening Bank Account', 
        summary: 'Bank account gives "strong electronic identification", the key to all digital services.', 
        content: `# The Challenge\nMoney laundering laws are strict. The bank needs to know where your money comes from.\n\n### What to bring\n1. Passport.\n2. Residence permit.\n3. Employment contract.\n4. Personal ID code (from DVV).\n\n### The Holy Grail\n**Bank Codes** (verkkopankkitunnukset). These let you log into Kela, Tax, Health, and Posti services.` 
      },
      'social_kela_card': {
        title: 'Kela Card',
        summary: 'Blue card proving you are covered by national health insurance.',
        content: `# What is it?\nA blue card proving you belong to the Finnish social security system.\n\n### Usage\nShow it at:\n1. **Pharmacy:** To get direct reimbursements on prescription medicine.\n2. **Private clinics:** To get a small part of the cost deducted.`
      },
      'social_health': {
        title: 'Public vs. Occupational Health',
        summary: 'Employees should use Occupational Health (Työterveys) first. It is fast and free.',
        content: `# Two Systems\n\n**1. Public (Terveysasema)**\n* **For:** All residents.\n* **Cost:** Cheap (~20€) or free.\n* **Speed:** Can be slow. You must call to book.\n\n**2. Occupational (Työterveys)**\n* **For:** Employees.\n* **Cost:** Free for you (employer pays).\n* **Speed:** Fast. Usually private clinics like Terveystalo or Mehiläinen.`
      },
      'social_unemployment': {
        title: 'Unemployment Benefits',
        summary: 'Register at TE Office on the FIRST day of unemployment.',
        content: `# The Golden Rule\nRegister as a job seeker at **TE Services** (te-palvelut.fi) on your **very first day** of unemployment. If you delay, you lose money.\n\n### Who pays?\n1. **Union Fund (Kassa):** If you are a member (26 weeks), you get earnings-related allowance (much higher).\n2. **Kela:** If not a member, you get basic allowance (lower).`
      },
      'social_housing': {
        title: 'Housing Allowance',
        summary: 'Kela can pay part of the rent if income is low.',
        content: `# General Housing Allowance\n* **For:** Low-income households (students, part-time, unemployed).\n* **Calculation:** Depends on total income and city.\n* **Apply:** Online at Kela. Need rental contract.`
      },
      'social_pension': {
        title: 'Pension System',
        summary: 'You accumulate pension (eläke) for every euro earned.',
        content: `# How it works\nEmployer deducts pension fee from salary automatically. You do nothing.\n\n### Checking\nSee your accrued amount at **Tyoelake.fi**.\n\n### Leaving?\nIf you move to another EU country, pension rights are preserved.`
      },
      'job_market_overview': { 
        title: 'The Job Market', 
        summary: 'Understanding the landscape.', 
        content: `### Overview\nThe Finnish market values skills and attitude. While Finnish is often a requirement, many tech and engineering companies operate in English.` 
      },
      'job_te_office': {
        title: 'TE Services (TE-toimisto)',
        summary: 'Employment office helps with integration and unemployment benefits.',
        content: `# What they do\n* **Integration Plan:** Determine if you need Finnish courses.\n* **Jobseeker Status:** Mandatory to get money from Kela or Union.\n* **Warning:** Follow their instructions strictly to avoid "karenssi" (suspension of benefits).`
      },
      'job_portals': {
        title: 'Where to Find Jobs',
        summary: 'Main portals you should know.',
        content: `# Major Sites\n* **LinkedIn:** #1 for English/specialist jobs.\n* **Oikotie Työpaikat:** The biggest Finnish site.\n* **Duunitori:** Also very popular.\n* **The Hub:** Best for Startups & Tech.`
      },
      'job_entrepreneurship': {
        title: 'Entrepreneurship (Yrittäjyys)',
        summary: 'Finland needs entrepreneurs. There is money to start.',
        content: `# Starttiraha (Startup Grant)\nIf you become a full-time entrepreneur, you can get ~700€/month for 6-12 months to secure your livelihood.\n\n**Important:** Apply **before** registering the company.`
      },
      'job_cv_tips': {
        title: 'Finnish CV Style',
        summary: 'Short, factual, and with a photo.',
        content: `# Checklist\n1. **Length:** Max 2 pages. Ideally 1.\n2. **Photo:** Standard here. Smile, professional.\n3. **Profile:** Short summary at the top.\n4. **Skills:** List technologies or hard skills concretely.\n5. **Tone:** Humble but confident. State facts, not adjectives.`
      },
      'job_cover_letter': {
        title: 'Cover Letter',
        summary: 'Don\'t repeat CV. Answer "Why us?" and "Why you?".',
        content: `# Structure\n1. **The Hook:** Why do you want *this* job?\n2. **The Value:** What problems will you solve for them?\n3. **The Personality:** Will you fit the team?\n\n### Tip\nKeep it under 1 page. Finns appreciate brevity.`
      },
      'job_interview': {
        title: 'Job Interview',
        summary: 'Honesty is tested. Silence is okay.',
        content: `# What to expect\n* **Honesty:** If you don't know, say "I don't know, but I can learn". Do not lie.\n* **Silence:** If the interviewer is silent after your answer, don't panic. They are thinking. Don't babble to fill the gap.\n* **Coffee:** Always accept if offered. It's a ritual.`
      },
      'job_recognition': {
        title: 'Degree Recognition',
        summary: 'Critical for regulated professions like doctors, nurses, teachers.',
        content: `# Regulated Professions\nFor health/education, degree must be recognized by **OPH** or **Valvira**.\n\n### General Roles\nFor IT or business, official recognition is rarely needed. Skills matter more.`
      },
      'work_contract': { 
        title: 'Employment Contract', 
        summary: 'Always written. Read carefully. Check TES.', 
        content: `# Key Elements\n1. **Duration:** Permanent (toistaiseksi voimassa oleva) or Fixed-term (määräaikainen).\n2. **TES:** Collective Agreement. Defines minimum salary and holidays.\n3. **Probation:** Max 6 months.\n\n**Never start work without a contract.**` 
      },
      'work_hours': {
        title: 'Working Hours',
        summary: 'Standard is 7.5 or 8 hours a day.',
        content: `# Balance\n* **Full time:** Usually 37.5 or 40 hours/week.\n* **Flexibility:** Many places have "liukuma" (flex time). Arrive 7-9, leave 15-17.\n* **Lunch:** Usually 30 mins (unpaid).`
      },
      'work_holidays': {
        title: 'Annual Holidays',
        summary: 'Finland has generous holidays, but they must be earned.',
        content: `# Credit Year\nYou earn days from April 1 to March 31.\n* **Standard:** 2.5 days/month = 30 days (5 weeks)/year.\n* **Summer:** Usually taken in July. The country stops.\n* **Bonus:** Many get 50% extra salary for holiday (lomaraha).`
      },
      'work_unions': {
        title: 'Unions (Liitto)',
        summary: 'Highly recommended. They control unemployment funds.',
        content: `# Why join?\n1. **Money:** They pay earnings-related unemployment allowance (much higher than Kela).\n2. **Legal:** Free legal help if employer treats you badly.\n\n### Which one?\n* **YTK:** Just the unemployment fund (cheaper).\n* **TEK:** For engineers.\n* **PAM:** Service sector.`
      },
      'work_probation': {
        title: 'Probation Period (Koeaika)',
        summary: 'First 6 months are usually a trial.',
        content: `# Rules\nDuring probation (max 6 months), **both you** and employer can terminate contract immediately without notice period.`
      },
      'culture_meetings': { 
        title: 'Meeting Culture', 
        summary: 'Finns are punctual and agenda-driven. Small talk is minimal.', 
        content: `# Rules\n1. **Start on time:** 09:00 means 09:00.\n2. **Agenda:** Stick to it.\n3. **Silence:** Means agreement or thinking. Not a problem.\n4. **End on time:** Respect others' schedules.` 
      },
      'culture_feedback': {
        title: 'Giving Feedback',
        summary: 'Feedback is direct and factual. Don\'t take it personally.',
        content: `# Directness\nA Finn might say: *"This report is missing X."*\nThey are not rude. They are stating a fact to fix the problem efficiently. They separate work and person.`
      },
      'culture_names': {
        title: 'Names & Titles',
        summary: 'Very informal. Titles are rarely used.',
        content: `# Hi Boss\nEveryone goes by first name. You call the CEO "Matti", not "Mr. Korhonen". You can use "sinä" (you) with almost everyone.`
      },
      'culture_punctuality': {
        title: 'Punctuality',
        summary: '5 minutes late is late.',
        content: `# Time is Respect\nBeing late is stealing someone else's time. If you are 5 mins late, send a message.`
      },
      'culture_coffee': {
        title: 'Coffee Breaks (Kahvitauko)',
        summary: 'Sacred ritual. Often mandated by law.',
        content: `# The Ritual\nMost contracts have two 10-15 min breaks.\n\n* **Socialize:** This is where bonding happens. Don't sit alone at your desk.\n* **Caffeine:** Finns drink the most coffee in the world.`
      },
      'culture_afterwork': {
        title: 'Afterwork (AW)',
        summary: 'Casual drinks on Fridays.',
        content: `# Atmosphere\nUsually very casual. Okay to drink alcohol or soft drinks. It's about relaxing, not getting drunk.`
      },
      'culture_sauna': {
        title: 'Sauna Diplomacy',
        summary: 'Sauna is a place of equality. Even in business.',
        content: `# Rules\n1. **Equality:** In sauna, there are no titles. CEO and intern are equal.\n2. **Nudity:** Non-sexual. Just natural.\n3. **Business:** Decisions are sometimes made here.`
      },
      'culture_smalltalk': {
        title: 'Silence & Small Talk',
        summary: 'Silence is not awkward. It is a comfortable pause.',
        content: `# Don't fill the void\nIf you are in an elevator with a Finn, no need to talk. A nod is enough. We value words; we don't waste them.`
      },
      'culture_party': {
        title: 'Office Parties (Pikkujoulut)',
        summary: '"Little Christmas" parties in December can get wild.',
        content: `# The Exception\nFinns are reserved, EXCEPT at *Pikkujoulut*. This is the annual Christmas party. Usually lots of alcohol and colleagues are much more open. What happens at Pikkujoulut, stays at Pikkujoulut.`
      },
      'prof_engineering': {
        title: 'Engineering in Finland',
        summary: 'Huge sector. English is widely used.',
        content: `# Giants\nKone, Wärtsilä, Nokia, Metso.\n\n### Culture\nFact-based. Prepare technical details. Precision is valued over sales talk.`
      },
      'prof_business': {
        title: 'Business & Finance',
        summary: 'Often requires Finnish, except startups.',
        content: `# Barrier\nTraditional roles (HR, Accounting, Banking) need fluent Finnish.\n\n### Opportunity\nLook for *International Sales*, *Business Analytics* or *Export* roles where your native language is an asset.`
      },
      'prof_it': {
        title: 'IT & Tech',
        summary: 'Easiest sector for English speakers.',
        content: `# The Hub\nFinland needs coders. English is the company language at almost all tech companies (Wolt, Supercell, Relex).\n\n### Hiring\nOften a code test. Show your GitHub.`
      },
      'prof_health': {
        title: 'Health & Nursing',
        summary: 'Huge shortage, but language is mandatory.',
        content: `# Reality\nYou need Valvira license. To get it, usually need B1/B2 Finnish. Patient safety is priority.`
      },
      'prof_service': {
        title: 'Service Industry',
        summary: 'Restaurants and cleaning are common entry points.',
        content: `# Entry\nCleaning and restaurant kitchens often hire non-Finnish speakers. It is a way to start earning while learning the language.`
      },
      'housing_contracts': {
        title: 'Rental Contracts',
        summary: 'Secure and regulated.',
        content: `# Terms\n* **Deposit:** Usually 2 months rent.\n* **Notice:** Usually 1 calendar month for tenant.\n* **Home Insurance:** Almost always mandatory.`
      },
      'housing_finding': {
        title: 'Finding Apartments',
        summary: 'Market is fast in Helsinki.',
        content: `# Portals\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Tip\nBe fast. Go to showing with application ready.`
      },
      'housing_utilities': {
        title: 'Electricity & Internet',
        summary: 'You usually make your own electricity contract.',
        content: `# Electricity\nNot included in rent. You must choose a provider and make a contract.\n\n### Water\nOften a fixed fee (e.g. 20€/person/month).`
      },
      'housing_recycling': {
        title: 'Recycling Guide',
        summary: 'Finns recycle everything.',
        content: `# Bins\n* **Bio:** Food waste.\n* **Muovi:** Plastic packaging.\n* **Kartonki:** Milk cartons, cardboard.\n* **Paperi:** Paper, newspapers.\n\n### Pantti\nBottles and cans have a deposit (10c - 40c). Return to machine in supermarket to get money.`
      },
      'housing_sauna': {
        title: 'Laundry & Sauna',
        summary: 'Most buildings have shared facilities.',
        content: `# Taloyhtiö (Housing Company)\n* **Laundry:** Usually a booking list (varauslista).\n* **Lenkkisauna:** Free weekly sauna hour for everyone (men/women separate).\n* **Own turn:** You can book a weekly private hour for a small fee.`
      },
      'family_school': {
        title: 'School System',
        summary: 'One of the best in the world. And free.',
        content: `# Basics\n* **Start:** 7 years old.\n* **Cost:** Free. Includes books and hot lunch.\n* **Language:** Usually Finnish or Swedish. International schools exist but have queues.`
      },
      'family_daycare': {
        title: 'Daycare (Päiväkoti)',
        summary: 'Every child has a right to daycare.',
        content: `# Apply\nApply 4 months in advance. Heavily subsidized.\n\n### Cost\nBased on income. Max ~300€/month. Low income is free.`
      },
      'family_activities': {
        title: 'Hobbies & Sports',
        summary: 'Hobbies are taken seriously here.',
        content: `# Options\n* **Libraries:** Oodi offers 3D printers, sewing machines, gaming rooms for free.\n* **Sports:** Football, floorball, ice hockey are huge.\n* **Music:** Music schools (musiikkiopisto) are high quality.`
      },
      'family_winter': {
        title: 'Kids & Winter',
        summary: 'No bad weather, only bad clothes.',
        content: `# Clothing\n* **Layers:** Wool layer, fleece layer, waterproof outer.\n* **Haalari:** One-piece overall is the standard kid uniform.\n* **Reflectors:** Mandatory to stay safe in the dark.`
      },
      'family_safety': {
        title: 'Safety & Independence',
        summary: 'Finland is very safe. Kids go to school alone.',
        content: `# Independence\nDon't panic if you see a 7-year-old alone on the metro. It is normal. Society keeps them safe.`
      }
    }
  }
};
