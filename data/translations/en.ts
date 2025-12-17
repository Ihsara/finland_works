
import { TranslationResource } from "./types";

export const en: TranslationResource = {
  ui: {
    nav_guide: "Guide", nav_chat: "Chat", nav_plan: "Plan", nav_profile: "Profile",
    landing_welcome: "Welcome!", landing_subtitle: "Find your way to work in Vantaa", 
    landing_slide1: "Your personal guide to Finland",
    landing_slide2: "Master the bureaucracy",
    landing_slide3: "Find hidden jobs",
    landing_slide4: "Click below to start!",
    landing_trust_badge: "100% Local Privacy. No data leaves your device.",
    landing_btn_quiz: "Personalize it for you!", landing_btn_quiz_alt: "Create your plan", 
    landing_btn_continue: "Open my guide", 
    landing_btn_ask: "Chat with Assistant", landing_btn_ask_alt: "Get Advice",
    landing_btn_browse: "Browse Guide", landing_btn_browse_alt: "Make Vantaa works!",
    landing_load_sample: "Load Sample", landing_erase: "Erase Data", landing_add_key: "Add API Key", landing_choose_lang: "Language",
    dash_greeting: "Moi, {name}!", dash_greeting_guest: "Moi!", dash_subtitle: "Welcome back to your personal Vantaa guide.", dash_subtitle_guest: "Let's build a profile to get started.", dash_btn_guide: "Open Guide", dash_btn_browse: "Browse", dash_btn_ask: "Chat with Assistant", dash_btn_history: "History", dash_btn_cv: "Import CV", dash_switch_profile: "Switch", dash_new_profile: "New", dash_edit_profile: "Edit", dash_profile_overview: "Profile",
    dash_education: "Education", dash_profession: "Profession", dash_languages: "Languages", dash_narrative_aspirations: "Aspirations", dash_narrative_challenges: "Challenges",
    chat_placeholder: "Ask something...", chat_end_session: "End", chat_header_assistant: "Assistant", chat_prompt_context_inquiry: "Tell me more about \"{sentence}\"", chat_ask_length: "Short or detailed answer?", chat_length_set_confirm: "Got it. I will adjust the length.", chat_empty_state: "Start the conversation by asking a question below.",
    chat_ai_greeting: "Beep boop! 🤖 I am your Vantaa integration assistant. How can I help you today?",
    btn_back_dashboard: "Back", btn_save: "Save",
    profile_btn_guide: "My Guide", profile_btn_guide_desc: "Recommended articles", profile_btn_plan: "My Plan", profile_btn_plan_desc: "Coming soon", profile_sect_languages: "Languages", profile_sect_skills: "Skills", profile_sect_narrative: "Story", profile_label_aspirations: "Hopes", profile_label_challenges: "Fears", profile_label_education: "Education", profile_label_profession: "Profession", profile_completeness: "{percentage}% complete", profile_completeness_hint: "Answer a few more questions", profile_btn_update: "Update Profile", profile_btn_continue: "Continue",
    
    // Profile Guest View (New)
    profile_guest_title: "Prepare for Your Life and Career in Vantaa",
    profile_guest_subtitle: "Answer a few questions and get your personalized 1-year integration plan",
    profile_guest_btn_start: "Start",
    profile_guest_col1: "Legal Essentials",
    profile_guest_col2: "Job Tools",
    profile_guest_col3: "Life & Community",
    profile_guest_item_kela: "Kela", profile_guest_item_tax: "Tax Card", profile_guest_item_id: "ID Code",
    profile_guest_item_contacts: "Contacts", profile_guest_item_cv: "CV", profile_guest_item_portfolio: "Portfolio",
    profile_guest_item_hobbies: "Hobbies", profile_guest_item_events: "Events", profile_guest_item_volunteering: "Volunteering",
    profile_features_title: "KEY FEATURES (DEMO)",
    profile_feat_kela: "Apply for Kela Card",
    profile_feat_hidden: "Hidden Job Market Tool",
    profile_instr_title: "STEP-BY-STEP INSTRUCTIONS",
    profile_instr_cv: "How to write Finnish CV",
    profile_instr_tax: "How to get a tax card",
    profile_btn_explore: "Explore all instructions",

    // Gamified Planner
    quest_level: "Level {level}",
    quest_xp: "{current}/{max} XP to next level",
    quest_tab_board: "Career Journey",
    quest_tab_achievements: "Achievements",
    quest_tab_life: "Life & Wellbeing",
    quest_priority_title: "Priority Quests",
    quest_priority_subtitle: "Items you saved for later",
    quest_empty_priority: "No priority quests active. Good job!",
    quest_empty_log: "No quests completed yet. Start your journey!",
    quest_btn_mark_done: "Mark Done",
    quest_btn_read: "Read Guide",
    quest_achievement_unlocked: "Achievement Unlocked!",
    quest_fun_fact_title: "Did you know?",
    quest_btn_unlock: "Unlock & Read",
    quest_locked_msg: "Tap to reveal a secret!",
    
    // New Rubric Labels
    plan_track_career: "Career Path",
    plan_track_life: "Nordic Life & Impact",
    plan_step_completed: "Completed",
    plan_step_locked: "Locked",
    plan_step_available: "Available",
    plan_btn_return: "Return to Plan",

    // Fun Facts (New)
    quest_fact_foundation: "In Finland, your personal ID code (henkilötunnus) tells your birthday and gender! The separator char (+, -, A) tells the century you were born in.",
    quest_fact_job_strategy: "70-80% of jobs in Finland are never advertised publicly. They are filled through networking and direct contact.",
    quest_fact_workplace: "Coffee breaks are statutory in Finland! Almost every contract mandates two 15-minute coffee breaks per day.",
    quest_fact_industries: "Finland has the most metal bands per capita in the world. Even Nokia was originally a rubber boot company.",
    quest_fact_life: "Finland has over 3 million saunas for 5.5 million people. That's more than one sauna for every two people!",

    // NEW DASHBOARD CONTENT
    dash_hero_title: "PREPARE FOR YOUR LIFE AND CAREER IN FINLAND",
    dash_hero_subtitle: "Answer a few questions and get your personalized 1-year integration plan",
    dash_hero_btn: "Start",
    dash_intro_text: "Discover Vantaa and Finland with confidence. Get guidance on legal essentials, find the right job with tailored tools, and connect with your community through hobbies, events, and volunteering.",
    dash_intro_tags: "STUDENTS • SPOUSES OF WORKERS • PROFESSIONALS • JOBSEEKERS",
    
    dash_sect_kb_title: "KNOWLEDGE BASE",
    dash_sect_kb_desc: "Essential information about working and living in Finland.",
    dash_card_networking: "Networking",
    dash_card_culture: "Work Culture",
    dash_card_recruitment: "Recruitment",
    dash_card_rights: "Work Rights",
    dash_btn_explore: "Explore All",

    dash_sect_guides_title: "STEP-BY-STEP GUIDES",
    dash_card_guide_cv: "How to write Finnish CV",
    dash_card_guide_tax: "How to get a tax card",
    dash_card_guide_kela: "How to get a Kela card",

    dash_sect_living_title: "LIVING IN VANTAA",
    dash_sect_living_subtitle: "Based on your profile",
    dash_card_living_events: "Events & Meetups",
    dash_card_living_sports: "Sports & Hobby Clubs",
    dash_card_living_community: "Community Groups",
    dash_sect_events_title: "Upcoming Events in Vantaa",

    dash_sect_features_title: "KEY FEATURES (DEMO)",
    dash_feat_hidden_job: "Hidden Job Market Tool",
    dash_feat_apply_kela: "Apply for Kela Card",

    dash_footer_ask: "ASK ME SOMETHING",
    dash_footer_hint: "My answers will be more accurate if you take the Quiz",
    dash_btn_go_chat: "Go to Chat",

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
    net_hackathons: 'Hackathons & Junction', net_slush: 'Slush: The Anti-Conference', net_school: 'Networking in School',
    
    // New: CV Preview
    cv_preview_title: "Live Preview (A4)",
    cv_btn_print: "Print PDF",
    cv_sect_profile: "Profile",
    cv_sect_experience: "Experience",
    cv_sect_education: "Education",
    cv_sect_skills: "Skills",
    cv_sect_soft_skills: "Soft Skills",
    cv_preview_disclaimer: "This is a simplified template. Download and edit for full details.",
    cv_placeholder_name: "Alex Esimerkki",
    cv_placeholder_summary: "Motivated professional looking for opportunities in the Helsinki capital region. Eager to learn and contribute to Finnish working life."
  },
  wiki: {
    titles: {
      foundation: 'Bureaucracy & Basics', job_strategy: 'Job Strategy', workplace: 'Work Culture', industries: 'Industry Guides', life: 'Nordic Life & Impact',
      identity: 'Identity & Permits', security: 'Social Security', market: 'The Market', tools: 'Tools', rights: 'Rights', networking: 'Networking & Hidden Market',
      social: 'Social Rituals', norms: 'Professional Norms', specialist: 'Specialist Roles', hands_on: 'Hands-on Work', housing: 'Housing & Transport',
      family: 'Family Support', language: 'Language', giving: 'Giving Back',
      social_unemployment: 'Unemployment Benefits', social_housing: 'Housing Allowance', social_pension: 'Pension System', social_kela_card: 'Kela Card', social_health: 'Public Healthcare',
      bureaucracy_dvv: 'DVV & Personal ID', bureaucracy_migri: 'Immigration (Migri)', bureaucracy_tax: 'Tax Card', bureaucracy_bank: 'Opening Bank Account', bureaucracy_ihh: 'International House',
      job_te_office: 'TE Office', job_portals: 'Job Portals', job_entrepreneurship: 'Entrepreneurship', 
      net_culture: 'The Finnish Way', net_linkedin: 'LinkedIn Strategy', net_hidden: 'Hidden Job Market', net_volunteering: 'Volunteering',
      job_cover_letter: 'Cover Letter', job_interview: 'The Interview', job_recognition: 'Degree Recognition', job_cv_tips: 'Finnish CV',
      work_contract: 'Employment Contract', work_hours: 'Working Hours', work_holidays: 'Holidays', work_unions: 'Unions', work_probation: 'Probation Period',
      culture_meetings: 'Meeting Culture', culture_feedback: 'Giving Feedback', culture_names: 'Names & Titles', culture_punctuality: 'Punctuality', culture_coffee: 'Coffee Breaks',
      culture_afterwork: 'Afterwork', culture_sauna: 'Sauna Diplomacy', culture_smalltalk: 'Silence & Small Talk', culture_party: 'Office Parties',
      prof_engineering: 'Engineering', prof_business: 'Business & Finance', prof_it: 'IT & Tech', prof_health: 'Health & Nursing', prof_service: 'Service Industry',
      housing_contracts: 'Rental Contracts', housing_finding: 'Finding Apartments', housing_utilities: 'Utilities', housing_recycling: 'Recycling Guide', housing_sauna: 'Laundry & Sauna',
      family_school: 'School System', family_daycare: 'Daycare', family_activities: 'Hobbies & Sports', family_winter: 'Kids & Winter', family_safety: 'Safety',
      vol_redcross: 'Red Cross & NGOs', vol_animals: 'Animal Shelters', vol_events: 'Event Volunteering', vol_humanitarian: 'Humanitarian Work',
      daily_transport: 'Public Transport (HSL)', daily_groceries: 'Grocery Shopping', daily_pantti: 'Bottle Recycling',
      nature_everyman: "Everyman's Rights", nature_winter: 'Surviving Winter', nature_summer: 'Summer Cottages',
      vantaa_library_tikkurila: 'Tikkurila Library', vantaa_nature: 'Vantaa Nature', vantaa_ring_rail: 'The Ring Rail', vantaa_info_points: 'Vantaa Info', vantaa_aviapolis: 'Aviapolis Hub', vantaa_multicultural: 'Multicultural Vantaa',
      // New entries
      vantaa_parks: 'Urban Parks & Greenery', vantaa_saunas_guide: 'Public Saunas', vantaa_libraries_services: 'Library Services', vantaa_river_seasons: 'River Vantaanjoki', vantaa_swimming_halls: 'Swimming Halls'
    },
    articles: {
      'guide_start': { 
        title: 'Welcome to Finland! 🇫🇮', 
        summary: 'Finland runs on trust, silence, and coffee. This guide is your survival manual.', 
        content: `# Your Survival Manual\n\n**The Philosophy:**\nFinland runs on trust, silence, and coffee. It is a society where systems work, but you must know how to use them. Trust is the currency of interaction, and silence is a sign of respect.\n\n### How to use this app\n1. **Read:** Browse the guides on bureaucracy and work culture.\n2. **Chat:** Ask the AI Assistant about your specific situation.\n3. **Profile:** Keep your data fresh to get accurate advice.\n\n*Sisu* (Guts) is all you need!` 
      },
      'vantaa_parks': {
        title: 'Vantaa Parks: Your Green Living Room',
        summary: 'Explore Vantaa\'s extensive network of parks, from manicured gardens to wild forests. A guide for families and solo walkers.',
        content: `# The Green City\n\nVantaa is known as a green city. You are never more than 300 meters from a green area. Parks here are safe, clean, and free for everyone.\n\n### Notable Parks\n1.  **Tikkurila Kirjastopuisto (Library Park):** Located right next to the Dixi station. It has a skate park, large grassy areas for picnics, and is a hub for youth. Safe and well-lit in the evenings.\n2.  **Soltorp (Hiekkaharju):** A quieter, more traditional park perfect for walking dogs or reading.\n3.  **Tammisto Nature Reserve:** An ancient oak forest. Strict rules apply (stay on paths), but it is magical in autumn.\n\n### For Families\nLook for **Leikkipuisto** (Play Parks). In summer, many offer free warm lunches for children under 16 (part of the city's welfare program). They are fenced and safe.\n\n### For Women & Elders\nVantaa invests heavily in lighting. Main park paths are well-lit throughout winter, making evening walks safe. Benches are frequent on main routes.`
      },
      'vantaa_saunas_guide': {
        title: 'Public Saunas: A Hot Guide',
        summary: 'Where to find authentic public saunas in Vantaa, including the famous smoke saunas of Kuusijärvi.',
        content: `# Sweat like a Local\n\nMost apartments have saunas, but **public saunas** are where the community gathers. \n\n### Kuusijärvi: The Sauna Mecca\nLocated in East Vantaa (Bus 739/736).\n*   **Smoke Saunas (Savusauna):** The traditional experience. Dark, soft heat, and a distinct smoky smell. Pre-booking is recommended on weekends.\n*   **Electric Saunas:** Cheaper and always available. Men and women have separate sides.\n*   **Swimming:** The lake is open year-round. In winter, holes are cut in the ice (avanto). It is extremely good for blood circulation.\n\n### Accessibility & Rules\n*   **Nudity:** In single-sex saunas, nudity is the norm. In mixed public saunas (rare), swimsuits are worn. At Kuusijärvi, swimsuits are required in the smoke saunas because they are mixed.\n*   **Hygiene:** **Shower first** without a swimsuit. Sit on a towel (pefletti).\n*   **Hydration:** Bring a water bottle. It is safe to drink tap water.`
      },
      'vantaa_libraries_services': {
        title: 'More than Books: Library Services',
        summary: 'Vantaa libraries (Helmet network) offer 3D printing, sewing machines, and safe spaces for everyone.',
        content: `# The Helmet Network\n\nYour library card works in Vantaa, Helsinki, Espoo, and Kauniainen. Libraries are **community living rooms**.\n\n### Beyond Books\n1.  **Makerspaces (Paja):** Located in Tikkurila (Dixi). You can use 3D printers, laser cutters, vinyl cutters, and sewing machines for free. Bring your own materials (fabric/plastic) or pay a small fee.\n2.  **Meeting Rooms:** Soundproof rooms for study or work calls. Bookable via *Varaamo*.\n3.  **Digitization:** Convert old VHS tapes or cassettes to digital files.\n\n### Inclusivity\n*   **For Seniors:** "Digiopastus" (Digital support) helps you use smartphones and online banking.\n*   **For Youth:** Specific zones with gaming consoles and comfortable seating. No silence required.\n*   **Multilingual:** Books in dozens of languages, from Russian to Somali.`
      },
      'vantaa_river_seasons': {
        title: 'River Vantaanjoki: Year-Round Life',
        summary: 'The river that defines the city. Fishing, canoeing, and winter walking.',
        content: `# The City's Artery\n\nThe Vantaa River winds through the entire city. It is a recreational paradise.\n\n### Summer Activities\n*   **Canoeing:** You can rent kayaks at various points. The route from Pitkäkoski to Haltiala is scenic.\n*   **Fishing:** You need a permit (fisheries management fee + local permit). The river has trout and salmon.\n*   **Picnics:** The riverbanks at *Tammisto* and *Haltiala Farm* are perfect for family outings.\n\n### Winter Activities\n*   **Walking:** The paths are plowed. It is beautiful when frozen.\n*   **Skiing:** When snow is deep enough, tracks are made on the fields next to the river.\n\n### Accessibility\nThe main paths along the river are wide, flat gravel. They are excellent for **wheelchairs** and **baby strollers**.`
      },
      'vantaa_swimming_halls': {
        title: 'Swimming Halls: Affordable Wellness',
        summary: '5 major halls in Vantaa offering pools, gyms, and therapy. A guide for families and seniors.',
        content: `# The Halls\nVantaa has 5 main swimming halls: **Tikkurila**, **Myyrmäki**, **Hakunila**, **Korso**, and **Martinlaakso**.\n\n### What to expect\n*   **Price:** Very affordable (~6€ adults, cheaper for kids/seniors).\n*   **Gyms:** Most halls have a gym included in the price.\n*   **Saunas:** Always included.\n\n### Specific Needs\n*   **Families:** Tikkurila and Myyrmäki have children's pools and slides. **Baby Swimming** (vauvauinti) classes are available on weekends.\n*   **Seniors:** Look for "Therapy Pools" (terapiaallas). The water is warmer (+32°C) and gentle on joints. Tikkurila and Myyrmäki have these.\n*   **Women:** Some halls offer women-only swimming shifts (naisten vuoro). Check the Vantaa.fi website for current schedules.\n*   **Accessibility:** All halls have lifts for entering the pool if you cannot use stairs.`
      },
      'bureaucracy_dvv': { 
        title: 'DVV & Personal ID', 
        summary: 'Get your Personal Identity Code to exist officially.', 
        content: `**Priority: IMMEDIATE**\n\n### The Mission\nTo exist officially. Without registering at the **Digital and Population Data Services Agency (DVV)**, you are a ghost in the system.\n\n### The Prize\nYour **Personal Identity Code** (henkilötunnus). Format: *DDMMYY-XXXX*.\n\n### Why you need it\n1. Bank account.\n2. Phone contract.\n3. Tax card.\n4. Health services.\n\n### Official Resource\n[→ Registering as a foreigner (DVV)](https://dvv.fi/en/foreigner-registration)` 
      },
      'bureaucracy_ihh': {
        title: 'International House Helsinki (IHH)',
        summary: 'The one-stop shop for bureaucracy in the capital region.',
        content: `# One Roof, Many Services\n\nIf you live in Helsinki, Espoo, or Vantaa, **International House Helsinki (IHH)** is your best friend. It brings together Migri, DVV, Vero (Tax), and Kela under one roof.\n\n### What can you do?\n1. **Register:** Get your Personal ID Code (DVV).\n2. **Tax:** Get your tax card.\n3. **Social Security:** Advice on Kela benefits.\n4. **Work:** Employment coaching.\n\n### Important\nMost services require booking an appointment in advance. Location: **Lintulahdenkuja 2, Helsinki**.`
      },
      'bureaucracy_migri': { 
        title: 'Migri (Immigration)', 
        summary: 'Residence Permit and important 2024 policy updates.', 
        content: `# Migri 🛂\n\n### The Mission\nGetting your Residence Permit (oleskelulupa).\n\n### Key Hacks\n* **Enter Finland:** Use the online service. It is much faster.\n* **Identification:** You must visit a service point to prove who you are.\n* **Fast Track:** Available for specialists and startup entrepreneurs (14 days).\n\n### ⚠️ IMPORTANT POLICY UPDATES (2024-2025)\nThe Finnish government has tightened immigration rules. Be aware of these changes:\n\n1.  **Citizenship Requirement:** Extended from 5 to 8 years.\n2.  **Work Permits (3-Month Rule):** If you lose your job, you generally have **3 months** to find a new one or face deportation.\n3.  **Income Limits:** Sponsorship thresholds have increased.\n\n*Always check [migri.fi](https://migri.fi) for the latest rules.*` 
      },
      'bureaucracy_tax': { 
        title: 'Tax Card', 
        summary: 'Without a tax card, you get taxed 60%. No exceptions.', 
        content: `# The Golden Rule\nNo card = **60% tax**. \n\n### The Process\n1. Log in to **MyTax (OmaVero)** with bank codes.\n2. Estimate your annual income.\n3. Download PDF.\n4. Send to payroll/boss.\n\n*Note: Finland has progressive tax. The more you earn, the higher the percentage.*` 
      },
      'bureaucracy_bank': { 
        title: 'Opening Bank Account', 
        summary: 'Bank account gives you "strong electronic identification", the key to all digital services.', 
        content: `# The Challenge\nMoney laundering laws are strict. The bank needs to know the origin of your money.\n\n### What to bring\n1. Passport.\n2. Residence Permit.\n3. Employment Contract.\n4. Personal ID code (from DVV).\n\n### The Holy Grail\n**Bank Codes** (verkkopankkitunnukset). These allow you to log into Kela, Tax, Health, and Posti.` 
      },
      'social_kela_card': {
        title: 'Kela Card (Important)',
        summary: 'Your proof of eligibility for Finnish social security and healthcare.',
        content: `# The Kela Card\nThis blue card proves you are covered by the Finnish National Health Insurance (NHI). **It is NOT an ID** for alcohol or travel.\n\n### What do you get?\n1.  **Medicine Discounts:** Show the card at pharmacies for immediate deduction.\n2.  **Private Healthcare:** Small reimbursements (Kela-korvaus) at private clinics.\n3.  **Taxi:** Reimbursement for health-related travel.\n\n### EHIC\nOrder the **European Health Insurance Card** (free) from Kela for travel within the EU.`
      },
      'social_health': {
        title: 'Public vs. Occupational Health',
        summary: 'Employees should use Occupational Health (Työterveys) first. It is fast and free.',
        content: `# Two Systems\n\n**1. Public (Terveysasema)**\n* **For:** All residents.\n* **Cost:** Cheap (~20€) or free.\n* **Speed:** Can be slow. You must call to book.\n\n**2. Occupational (Työterveys)**\n* **For:** Employees.\n* **Cost:** Free for you (employer pays).\n* **Speed:** Fast. Usually private clinics like Terveystalo or Mehiläinen.`
      },
      'social_unemployment': {
        title: 'Unemployment Benefits',
        summary: 'Register at TE Office on the FIRST day of unemployment.',
        content: `# The Golden Rule\nRegister as a jobseeker at **TE Services** (te-palvelut.fi) on your very **first day** of unemployment. If you delay, you lose money.\n\n### Who pays?\n1. **Union Fund (Kassa):** If you are a member (26 weeks), you get earnings-related allowance (much higher).\n2. **Kela:** If not a member, you get basic allowance (lower).`
      },
      'housing_finding': {
        title: 'Finding Apartments',
        summary: 'The market is fast in Helsinki. Be prepared.',
        content: `# Portals\n* **Oikotie Asunnot**\n* **Vuokraovi**\n\n### Strategy\n1. **Be Fast:** Good apartments go in days.\n2. **Profile:** Have a pre-written message introducing yourself (job, non-smoker, no pets helps).\n3. **Deposit:** Usually 2 months' rent.`
      },
      'housing_contracts': {
        title: 'Rental Contracts',
        summary: 'Secure and regulated. Know your rights.',
        content: `# Terms\n* **Duration:** Indefinite (toistaiseksi voimassa oleva) is best.\n* **Notice:** Usually 1 calendar month for tenant.\n* **Home Insurance:** Almost always mandatory.\n* **Electricity:** You must make your own contract.`
      },
      'family_daycare': {
        title: 'Daycare (Päiväkoti)',
        summary: 'Apply 4 months in advance. Every child has a right to a spot.',
        content: `# The 4-Month Rule\nYou must apply for a municipal daycare place at least **four months** before you need it. \n\n### Urgent?\nIf you get a job or study place suddenly, the time is reduced to 2 weeks, but spots are harder to find.\n\n### Cost\nBased on family income and size. Maximum is ~300€/month. Low-income families pay nothing.`
      },
      'family_school': {
        title: 'School System',
        summary: 'One of the best in the world. And free.',
        content: `# Basics\n* **Starts:** Year the child turns 7.\n* **Pre-school (Eskari):** Compulsory at age 6 (free).\n* **Cost:** Free. Includes books, tools, and a hot lunch every day.\n* **Language:** Usually Finnish or Swedish. International schools exist but have queues.`
      },
      'work_contract': { 
        title: 'Employment Contract', 
        summary: 'Always written. Read carefully. Check TES.', 
        content: `# Key Elements\n1. **Duration:** Permanent or Fixed-term.\n2. **TES:** Collective Agreement. Defines minimum salary and holidays.\n3. **Trial Period:** Max 6 months. During this time, either side can terminate immediately.\n\n**Never start work without a written contract.**` 
      },
      'work_unions': {
        title: 'Trade Unions',
        summary: 'Highly recommended. They manage unemployment funds.',
        content: `# Why join?\n1. **Money:** They pay earnings-related allowance (much higher than Kela).\n2. **Law:** Free legal help if employer treats you badly.\n\n### Which one?\n* **YTK:** Just the fund (cheaper).\n* **TEK:** For engineers.\n* **PAM:** Service sector.`
      },
      'nature_everyman': { 
        title: 'Everyman\'s Rights', 
        summary: 'You can walk almost anywhere and pick berries.', 
        content: `# Jokamiehenoikeudet\n\nYou have the right to:\n1. **Walk:** Anywhere in forests (except private gardens).\n2. **Pick:** Berries and mushrooms freely.\n3. **Camp:** Temporarily in nature.\n\n**Rules:** Do not disturb birds, do not leave trash, do not cut trees.`, 
      },
      'nature_winter': { 
        title: 'Surviving Winter', 
        summary: 'Darkness and Vitamin D.', 
        content: `# The Darkness (Kaamos)\n\nIn Nov-Jan, sunlight is rare.\n* **Vitamin D:** Take supplements. Mandatory.\n* **Reflectors:** Wear them. It's the law.\n* **Spikes:** Shoes with spikes prevent slipping on ice.`, 
      },
      'culture_sauna': {
        title: 'Sauna Diplomacy',
        summary: 'Sauna is a place of equality. Even in business.',
        content: `# Rules\n1. **Equality:** In sauna, there are no titles. CEO and intern are equal.\n2. **Nudity:** Natural, not sexual.\n3. **Business:** Decisions are sometimes made here.`
      },
      'culture_coffee': {
        title: 'Coffee Breaks',
        summary: 'Sacred ritual. Often mandated by law.',
        content: `# Kahvitauko\nFinns drink the most coffee in the world (12kg/year). Most contracts have two 10-15 min breaks. This is where team bonding happens. Don't sit alone at your desk.`
      },
      'job_market_overview': { 
        title: 'The Hidden Job Market', 
        summary: 'Why 80% of jobs are never advertised.', 
        content: `# The Iceberg\nIn Finland, public job ads are just the tip of the iceberg. The "Hidden Job Market" (Piilotyöpaikat) accounts for 70-80% of hires.\n\n### Why?\n1. **Cost:** Advertising is expensive.\n2. **Trust:** Finns prefer to hire someone recommended by a network.\n\n### Strategy\nYou cannot apply to these jobs online. You must find them through networking, direct contact, and "Open Applications" (Avoin hakemus).` 
      },
      'job_te_office': { 
        title: 'TE Services (TE-toimisto)', 
        summary: 'Mandatory for unemployment benefits. Register on day 1.', 
        content: `# Your First Stop\n**TE Services** (Employment and Economic Development Office) is the government agency for job seekers.\n\n### Why register?\n* **Money:** You CANNOT get unemployment benefits from Kela or a Union unless you are registered as an "unemployed job seeker" at TE.\n* **Integration:** They provide free Finnish language courses (Kotoutumiskoulutus).\n\n### The Process\n1. Go to [te-palvelut.fi](https://tyomarkkinatori.fi/).\n2. Log in with bank codes.\n3. Click "Ilmoittaudu työnhakijaksi" (Register as job seeker).\n4. **Do it on your first day of unemployment.** Retroactive registration is not possible.` 
      },
      'job_portals': { 
        title: 'Where to find jobs', 
        summary: 'The main aggregators and niche sites.', 
        content: `# Major Portals\n* **LinkedIn:** Essential for white-collar, IT, and English-speaking jobs. Use "Helsinki" location to be found.\n* **Oikotie Työpaikat:** The biggest general job board in Finland.\n* **Duunitori:** Very popular, good social media integration.\n* **The Hub:** The go-to place for **Startup** jobs (mostly English speaking).\n\n### Tips\nSet up "Job Alerts" (Hakuvahti) on Oikotie and Duunitori so you get emails immediately when a job opens.` 
      },
      'job_entrepreneurship': { 
        title: 'Entrepreneurship (Starttiraha)', 
        summary: 'Get paid to start your own business.', 
        content: `# Starttiraha (Startup Grant)\nFinland wants you to start a business. The state provides a grant (approx. 700€/month) for 6-12 months to secure your livelihood while you start.\n\n### The Catch\nYou must apply for the grant **BEFORE** you register your company (Y-tunnus). If you register first, you lose the money.\n\n### Where to get help?\n* **Uusyrityskeskus:** Free business advising. They help you write the business plan required for Starttiraha.` 
      },
      'job_cv_tips': { 
        title: 'Finnish CV Style', 
        summary: 'Keep it short, factual, and include a photo.', 
        content: `# The Finnish Style\nFinns value efficiency. They don't want to read a novel.\n\n### Checklist\n1. **Length:** Max 2 pages. Ideally 1 page.\n2. **Photo:** Standard practice. Use a professional, smiling headshot.\n3. **Profile:** A short summary (3-4 lines) at the top about who you are.\n4. **Skills:** List "Hard Skills" (Java, Welding, Photoshop) clearly.\n5. **Tone:** Humble but confident. State facts ("I increased sales by 20%"), not adjectives ("I am an amazing super-salesman").` 
      },
      'job_cover_letter': { 
        title: 'Cover Letter', 
        summary: 'Do not repeat your CV. Answer "Why us?" and "Why you?".', 
        content: `# The Pitch\nYour CV tells *what* you did. The Cover Letter tells *why* you fit.\n\n### Structure\n1. **The Hook:** Why do you want *this specific* job? Show you researched them.\n2. **The Value:** How can you solve their problems? Give concrete examples.\n3. **The Personality:** Will you fit the team?\n\n### Tip\nKeep it under 1 page. PDF format always.` 
      },
      'job_interview': { 
        title: 'The Interview', 
        summary: 'Honesty is tested. Silence is okay.', 
        content: `# What to expect\n* **Honesty:** If you don't know the answer, say "I don't know, but I can learn". Do not lie or bluff. Finns value honesty above all.\n* **Silence:** If the interviewer is silent after your answer, **don't panic**. They are thinking. Do not babble to fill the silence.\n* **Coffee:** Always accept if offered. It's a ritual.` 
      },
      'job_recognition': { 
        title: 'Degree Recognition', 
        summary: 'Critical for regulated professions like doctors and teachers.', 
        content: `# Regulated Professions\nIf you want to work as a Doctor, Nurse, Teacher, or Lawyer, your foreign degree must be recognized by the Finnish National Agency for Education (**OPH**) or **Valvira** (for health).\n\n### General Roles\nFor IT, Business, or Marketing, official recognition is rarely needed. Your skills and portfolio matter more than the stamp on your diploma.` 
      },
      'work_hours': { 
        title: 'Working Hours', 
        summary: 'Standard is 7.5 or 8 hours a day. Work-life balance is real.', 
        content: `# The Balance\n* **Full-time:** Usually 37.5 or 40 hours/week.\n* **Flexibility:** Many offices use "liukuma" (flex time). You can arrive between 7-9 and leave between 15-17.\n* **Lunch:** Typically 30 mins. It is usually unpaid (own time), so the work day is 7.5h + 0.5h lunch.` 
      },
      'work_holidays': { 
        title: 'Annual Holidays', 
        summary: 'Finland has generous holidays, but you earn them.', 
        content: `# The Credit Year\nYou earn holiday days from April 1st to March 31st.\n* **Standard:** 2.5 days per month worked = 30 days (5 weeks) per year.\n* **Summer:** Finns take 3-4 weeks off in **July**. The country basically stops.\n* **Holiday Bonus:** Many collective agreements include "Lomaraha" (Holiday Money), which is an extra 50% salary paid when you take holiday.` 
      },
      'work_probation': { 
        title: 'Probation Period', 
        summary: 'The first 6 months are usually a trial.', 
        content: `# Koeaika\nDuring the probation period (max 6 months), **both you** and the employer can terminate the contract immediately without notice period. No specific reason is needed, but it cannot be discriminatory.` 
      },
      'culture_meetings': { 
        title: 'Meeting Culture', 
        summary: 'Punctual, agenda-driven, and efficient.', 
        content: `# The Rules\n1. **Start on time:** 09:00 means 09:00. Not 09:05.\n2. **Agenda:** Stick to it. Finns like structure.\n3. **Silence:** Silence in a meeting means agreement or thinking. It does not mean something is wrong.\n4. **End on time:** Respect people's calendars.` 
      },
      'culture_feedback': { 
        title: 'Giving Feedback', 
        summary: 'Direct and factual. Don\'t take it personally.', 
        content: `# Directness\nA Finn might say: *"This report is missing data X."*\nThey are not being rude. They are stating a fact to fix the problem efficiently. They separate the work from the person. Do not read emotional subtext where there is none.` 
      },
      'culture_names': { 
        title: 'Names & Titles', 
        summary: 'Very informal. Titles are rarely used.', 
        content: `# Hyvä Matti\nHierarchy is low. You call the CEO by their first name. You address doctors and professors by first name. The formal "Te" (Vous/Sie) is almost extinct in workplaces.` 
      },
      'culture_punctuality': { 
        title: 'Punctuality', 
        summary: '5 minutes late is late.', 
        content: `# Time is Respect\nIn Finland, being late is considered stealing the other person's time. If you are going to be 5 minutes late, send a message. If you are on time, you are late (aim for 5 min early).` 
      },
      'culture_afterwork': { 
        title: 'Afterwork (AW)', 
        summary: 'Casual drinks on Fridays.', 
        content: `# The Atmosphere\n"AW" is common in cities. It is usually very casual. It is acceptable to drink alcohol or non-alcoholic drinks. It's about relaxing, not getting drunk (usually).` 
      },
      'culture_smalltalk': { 
        title: 'Silence & Small Talk', 
        summary: 'Silence is not awkward. It is a comfortable break.', 
        content: `# Don't fill the void\nIf you are in an elevator with a Finn, you don't need to talk. A nod is enough. Finns value words; they don't use them to just fill air. If you have nothing to say, enjoy the silence together.` 
      },
      'culture_party': { 
        title: 'Office Parties', 
        summary: 'Pikkujoulut (Little Christmas) can be wild.', 
        content: `# The Exception\nFinns are reserved, EXCEPT at *Pikkujoulut*. These are the annual Christmas parties held in Nov-Dec. There is often heavy drinking and colleagues become much more open. What happens at Pikkujoulut, stays at Pikkujoulut.` 
      },
      'prof_engineering': { 
        title: 'Engineering in Finland', 
        summary: 'A huge sector. English is widely used.', 
        content: `# The Giants\nKone, Wärtsilä, Nokia, Metso, Valmet.\n\n### Culture\nEngineering culture here is very fact-based. Prepare to back up your claims with data. Precision is valued over sales pitches.` 
      },
      'prof_business': { 
        title: 'Business & Finance', 
        summary: 'Often requires Finnish, except in startups.', 
        content: `# The Barrier\nTraditional roles (HR, Accounting, Banking) often require fluent Finnish due to laws and local clients.\n\n### The Opportunity\nLook for *International Sales*, *Business Analytics*, or *Export* roles where your native language and market knowledge are assets.` 
      },
      'prof_it': { 
        title: 'IT & Tech', 
        summary: 'The easiest sector for English speakers.', 
        content: `# The Hub\nFinland is desperate for coders. English is the company language in almost all tech companies (Wolt, Supercell, Relex).\n\n### Hiring\nExpect a coding test. Show your GitHub.` 
      },
      'prof_health': { 
        title: 'Health & Nursing', 
        summary: 'Huge shortage, but language is mandatory.', 
        content: `# The Reality\nTo work as a nurse or doctor, you need a license from **Valvira**. To get it, you usually need Finnish skills at level B1 or B2. Patient safety comes first.` 
      },
      'prof_service': { 
        title: 'Service Industry', 
        summary: 'Restaurants and cleaning are common entry points.', 
        content: `# The Start\nCleaning and restaurant kitchens often hire non-Finnish speakers. It is hard work, but a way to start earning and get into the system (and get Occupational Health care!).` 
      },
      'housing_utilities': { 
        title: 'Electricity & Internet', 
        summary: 'You usually make your own electricity contract.', 
        content: `# Electricity\nIt is NOT included in the rent. You must choose a provider (e.g., Helen, Fortum) and make a contract.\n\n### Water\nOften a fixed fee (e.g., 20€/person/month) added to rent.\n\n### Internet\nMany buildings have free basic internet (Taloyhtiölaajakaista). You just need to register or buy a faster speed.` 
      },
      'housing_recycling': { 
        title: 'Recycling Guide', 
        summary: 'Finns recycle everything. It is a civic duty.', 
        content: `# The Bins\nYour building has a recycling room (Jätekatos).\n* **Bio:** Food waste (no plastic bags!).\n* **Muovi:** Plastic packaging.\n* **Kartonki:** Milk cartons, cardboard.\n* **Paperi:** Paper, newspapers.\n* **Lasi/Metalli:** Glass and Metal.\n\n### Pantti\nPlastic bottles and aluminum cans have a deposit (10c - 40c). Don't crush them! Return them to the machine at any supermarket to get money back.` 
      },
      'housing_sauna': { 
        title: 'Laundry & Sauna', 
        summary: 'Most buildings have shared facilities.', 
        content: `# Taloyhtiö Life\n* **Pesutupa (Laundry):** Usually there is a booking list. It is cheap or free. Respect the times.\n* **Lenkkisauna:** A free weekly sauna turn for everyone (men/women separate).\n* **Oma vuoro:** You can book your own weekly private sauna hour for a small monthly fee.` 
      },
      'family_activities': { 
        title: 'Hobbies & Sports', 
        summary: 'Hobbies are taken seriously here.', 
        content: `# Options\n* **Libraries:** Oodi and others offer 3D printers, sewing machines, and gaming rooms for free.\n* **Sports:** Football, Floorball (Salibandy), and Ice Hockey are huge.\n* **Music:** Music institutes (Musiikkiopisto) are high quality but competitive.` 
      },
      'family_winter': { 
        title: 'Kids & Winter', 
        summary: 'There is no bad weather, only bad clothes.', 
        content: `# Clothing Strategy\n* **Layers:** Wool layer, fleece layer, waterproof outer layer.\n* **Haalari:** The one-piece overall is the standard uniform for Finnish children.\n* **Reflectors:** Essential for safety in the dark winter months.` 
      },
      'family_safety': { 
        title: 'Safety', 
        summary: 'Finland is super safe. Kids go to school alone.', 
        content: `# Independence\nDon't panic if you see a 7-year-old taking the metro alone. It is normal here. The society is designed to be safe for them.` 
      },
      'vol_redcross': { 
        title: 'Red Cross & NGOs', 
        summary: 'Classic volunteering opportunities.', 
        content: `# Red Cross (Punainen Risti)\nThey always need volunteers for friend visitors (ystävätoiminta) or thrift shops (Kontti).\n\n### Why?\nIt looks great on a CV and shows you care about the community.` 
      },
      'vol_animals': { 
        title: 'Animal Shelters', 
        summary: 'Help cats and dogs.', 
        content: `# HESY\nThe Helsinki Society for Animal Protection often needs help. Walking dogs or socializing with cats. A great way to meet empathetic locals.` 
      },
      'vol_events': { 
        title: 'Event Volunteering', 
        summary: 'The best way to get free tickets and meet people.', 
        content: `# Festivals\nFlow Festival, Slush, World Village Festival.\n\n### The Deal\nYou work 2-3 shifts, you get a free pass for the rest of the festival, food, and a staff party. The "Staff Party" is often the best place to network.` 
      },
      'vol_humanitarian': { 
        title: 'Humanitarian Work', 
        summary: 'Food aid and support.', 
        content: `# Hurstin apu\nFamous food aid distributor in Helsinki. Hard work, but very respected.` 
      },
      'daily_transport': { 
        title: 'Public Transport (HSL)', 
        summary: 'No cash allowed. Download the app.', 
        content: `# HSL Zones\nThe region is divided into zones A, B, C, D.\n* **Helsinki:** AB\n* **Vantaa:** BC\n* **Airport:** C\n* **All:** ABCD\n\n### The App\nDownload **HSL App**. You can buy tickets and plan routes. It is cheaper than buying from a machine.` 
      },
      'daily_groceries': { 
        title: 'Grocery Shopping', 
        summary: 'Weigh your own veggies.', 
        content: `# The Rules\n1. **The Scale:** You must weigh your own vegetables and stick the price tag on the bag. Cashiers do not have scales.\n2. **The Duopoly:** S-Group (Prisma, S-Market, Alepa) vs K-Group (Citymarket, K-Supermarket). Get the loyalty card (S-Etukortti) if you stay long.\n3. **Alcohol:** Beer is sold in supermarkets until 9 PM. Wine and spirits only in **Alko** (state monopoly).` 
      },
      'daily_pantti': { 
        title: 'Bottle Recycling', 
        summary: 'Don\'t throw away cans! They are money.', 
        content: `# Pantti\nAlmost every bottle and can has a deposit (10c - 40c).\n1. Collect them.\n2. Take them to the machine at any supermarket.\n3. Get a receipt.\n4. Use receipt to pay for groceries or get cash.` 
      },
      'nature_summer': { 
        title: 'Summer Cottages (Mökki)', 
        summary: 'The Finnish soul lives here.', 
        content: `# Mökki Life\nIn July, cities empty. Everyone goes to the cottage.\n* **Basic:** Many cottages have no electricity or running water.\n* **Activities:** Sauna, swim, grill, repeat.\n* **Invite:** If a Finn invites you to their Mökki, it is a huge sign of friendship.` 
      },
      'vantaa_library_tikkurila': { title: 'Tikkurila Library', summary: 'Dixi.', content: 'Library info.' },
      'vantaa_nature': { title: 'Vantaa Nature', summary: 'Kuusijärvi.', content: 'Nature info.' },
      'vantaa_ring_rail': { title: 'The Ring Rail', summary: 'Train.', content: 'Train info.' },
      'vantaa_info_points': { title: 'Vantaa Info', summary: 'Help.', content: 'Info points.' },
      'vantaa_aviapolis': { title: 'Aviapolis Hub', summary: 'Airport.', content: 'Airport info.' },
      'vantaa_multicultural': { title: 'Multicultural Vantaa', summary: 'Diverse.', content: 'Diverse info.' },
      'net_culture': { title: 'Networking', summary: 'Info.', content: 'Net info.' },
      'net_linkedin': { title: 'LinkedIn', summary: 'Info.', content: 'Net info.' },
      'net_hidden': { title: 'Hidden Jobs', summary: 'Info.', content: 'Net info.' },
      'net_volunteering': { title: 'Volunteering', summary: 'Info.', content: 'Net info.' },
    }
  }
};
