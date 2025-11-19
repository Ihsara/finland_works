
import { Icons } from "../components/Icon";

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export interface WikiArticle {
  id: string;          // Semantic ID (e.g., 'dvv_registration'). Stable for storage.
  title: string;       // Display Title
  icon: keyof typeof Icons; // Icon name matching Lucide-react exports
  tags: string[];      // Tags for AI filtering and User Profile matching
  content: string;     // Markdown content
}

export interface WikiCategory {
  id: string;          // Semantic Category ID (e.g., 'bureaucracy')
  title: string;       // Group Title
  icon: keyof typeof Icons;
  articles: WikiArticle[];
}

// ---------------------------------------------------------------------------
// ADMIN AREA: EDIT CONTENT HERE
// ---------------------------------------------------------------------------

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    id: 'bureaucracy',
    title: 'Bureaucracy & Legal Foundation',
    icon: 'Shield',
    articles: [
      {
        id: 'bureaucracy_dvv',
        title: 'The DVV & Personal ID',
        icon: 'Fingerprint',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# The DVV (Digital and Population Data Services Agency) 🆔

**Priority: IMMEDIATE**

### The Mission
To legally exist in Finland. Without this, you are a ghost in the system.

### The Prize
Your **Personal Identity Code** (henkilötunnus). It looks like *010190-123X*.
You need this for:
1.  Opening a bank account.
2.  Getting a phone contract.
3.  Getting a tax card.
4.  Visiting a doctor.

### How to get it
*   **Students/Workers:** You might have started the request at Migri.
*   **EU Citizens:** You register your right of residence at Migri, then go to DVV.
*   **Action:** You must visit a DVV service point physically to verify your identity. Book an appointment online WEEKS in advance if possible.
`
      },
      {
        id: 'bureaucracy_migri',
        title: 'Migri & Residence Permits',
        icon: 'CreditCard',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# Migri (Finnish Immigration Service) 🛂

### The Mission
To stay in Finland legally.

### The Prize
Your **Residence Permit Card** (oleskelulupa).

### The Golden Rule: Address Updates
If you move (even to the building next door), you **must** notify DVV/Migri.
*   If Migri sends you a letter asking for information and you don't reply because you didn't get the mail, they can cancel your permit.
*   Always use the Posti "Muuttoilmoitus" (Notification of Move) service immediately.
`
      },
      {
        id: 'bureaucracy_police_id',
        title: 'The Police & Official ID',
        icon: 'ShieldAlert',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# The Police (Poliisi) 👮

### The Confusion
Your Residence Permit card is **NOT** an official ID for banking identification purposes ("Strong Electronic Identification"). It proves you can live here, but banks often reject it for opening the "full" digital package.

### The Solution
You need a **Finnish ID Card** (Henkilökortti) issued by the Police.
1.  Go to a photographer (get the code sent to the Police server electronically).
2.  Apply online via Poliisi.fi or visit the station.
3.  **Cost:** ~€50-60.
4.  **Why:** This card allows you to log in to government services if your bank creates issues with foreign passports.
`
      },
      {
        id: 'bureaucracy_strong_auth',
        title: 'Banking & Strong Auth',
        icon: 'Key',
        tags: ['general', 'arrival', 'mandatory'],
        content: `
# Banking & Digital Identity 🏦

### Strong Electronic Identification (Vahva tunnistautuminen)
This is the "Key to the Kingdom".
*   **What it is:** Bank codes (Mobiiliavain / Tunnuslukulaite).
*   **What it unlocks:** Kela, Tax Office (Vero), Health Services (Omakanta), Post Office, Job Applications.

### The Catch-22
Banks are strict. To give you these codes, they often require:
1.  Finnish Personal ID (DVV).
2.  Finnish Address.
3.  Passport + Residence Permit + Finnish ID Card (sometimes).
4.  A reason for the account (Job contract / Study certificate).

**Advice:** Do not leave the bank until you understand exactly what document is missing. Be persistent.
`
      },
      {
        id: 'bureaucracy_tax',
        title: 'The Tax Card (Verokortti)',
        icon: 'Percent',
        tags: ['worker', 'student', 'general'],
        content: `
# The Tax Card (Verokortti) 🧾

### The Scary Rule
If you do not give your employer a tax card, they are legally required to deduct **60%** of your salary.

### The Easy Fix
1.  Go to **Vero.fi** -> MyTax (OmaVero).
2.  Order a tax card. It takes 5 minutes.
3.  Send the PDF to your boss.

### How it works
*   You estimate your income for the year (e.g., €30,000).
*   Vero gives you a percentage (e.g., 18%).
*   If you earn *more* than the limit, the percentage jumps ("Additional percentage").
*   **Tip:** Estimate slightly too high. You will get the extra money back next December as a "Tax Refund" (Veronpalautus).
`
      }
    ]
  },
  {
    id: 'living',
    title: 'Living & Infrastructure',
    icon: 'Home',
    articles: [
       {
        id: 'living_housing',
        title: 'Housing & Contracts',
        icon: 'Home',
        tags: ['student', 'general', 'arrival'],
        content: `
# Housing 🏠

### Student Housing (HOAS, TOAS, TYS)
*   **Cost:** 50% cheaper than private market.
*   **Solu (Shared):** Own room, shared kitchen/toilet. Cheap, social, character-building.
*   **Timing:** Apply 4 months early. August is chaos.

### Private Market (Oikotie, Vuokraovi)
*   **Deposit (Vuokravakuus):** Usually 1-2 months' rent.
*   **Home Insurance (Kotivakuutus):** Mandatory. You cannot get the keys without it.
*   **Electricity:** You must make your own electricity contract. Compare prices!
`
      },
      {
        id: 'living_transport',
        title: 'Public Transport',
        icon: 'Train',
        tags: ['student', 'youth', 'general'],
        content: `
# Moving Around 🚌

### Student Discounts (The Magic Cards)
You are not a "student" until you have the digital card.
1.  **Frank / Kide.app:** Download these.
2.  **VR (Trains):** -30% to -50%.
3.  **HSL / Local Bus:** -45% on monthly tickets.

### Zones (ABC)
*   Helsinki area is divided into zones. You cannot buy a "Zone B" ticket if you travel from A to B. You need "AB".
*   **The Fine:** €80 if you are caught without a ticket. Inspectors are ninjas.
`
      },
       {
        id: 'living_seasons',
        title: 'Surviving the Seasons',
        icon: 'Sun',
        tags: ['culture', 'general'],
        content: `
# Surviving the Elements ❄️

### Kaamos (Polar Night)
*   Nov-Jan. The sun barely rises.
*   **Survival:** Vitamin D supplements are mandatory. Bright light lamps help. Go outside at noon.

### Winter Clothing
*   **Layers:** Base layer (Merino wool) + Mid layer (Fleece) + Shell (Wind/Waterproof).
*   **Shoes:** Traction is key. Ice is slippery.
`
      }
    ]
  },
  {
    id: 'health',
    title: 'Health & Well-being',
    icon: 'Heart',
    articles: [
      {
        id: 'health_kela',
        title: 'Kela (Social Security)',
        icon: 'Umbrella',
        tags: ['general', 'family'],
        content: `
# Kela 🏥

*   **Myth:** "I moved here, so Kela pays me." -> **False.**
*   **Reality:** Benefits are residence-based. You must apply for a **Kela Card**.
*   **European Health Insurance Card (EHIC):** If you are from EU, use your home country's card for immediate necessary treatment until you get into the Finnish system.
`
      },
      {
        id: 'health_services',
        title: 'Public vs. Occupational Health',
        icon: 'Stethoscope',
        tags: ['worker', 'general'],
        content: `
# Where to go when sick? 🤒

### 1. Occupational Health (Työterveys) - BEST
*   If you work, your boss pays for this (Terveystalo, Mehiläinen, etc.).
*   **Fast.** You get a doctor in hours. Use this first!

### 2. Student Health (YTHS) - GOOD
*   For University students.
*   Very cheap, but you must pay the "Healthcare Fee" to Kela once per term proactively.

### 3. Public Health Station (Terveysasema) - OK
*   Cheap (~€20).
*   Queues can be long. Call at 8:00 AM sharp to get a time.
`
      },
      {
        id: 'health_vaccines',
        title: 'Vaccinations & Nature',
        icon: 'Syringe',
        tags: ['health', 'family', 'general'],
        content: `
# Vaccinations 💉

### The TBE Danger (Ticks/Punkki) 🕷️
*   Finland has ticks in the grass/forests. They carry TBE (Brain inflammation) and Lyme disease.
*   **Risk Areas:** Coast, Archipelago, Lakeland.
*   **Vaccine:** TBE vaccine ("Punkkirokotus") is highly recommended if you like nature. It costs money (~€40/dose) unless you live in a high-risk zone.

### General
*   Influenza vaccines are often free for risk groups or provided by employers in the fall.
`
      }
    ]
  },
  {
    id: 'work_study',
    title: 'Work & Study Life',
    icon: 'Briefcase',
    articles: [
       {
        id: 'work_unions',
        title: 'Unions & Unemployment',
        icon: 'Users',
        tags: ['worker', 'student'],
        content: `
# Unions & The Kassa 🛡️

### The Secret
Basic unemployment money from Kela is low.
**Earnings-related allowance** is high.

### How to get it
You must join an **Unemployment Fund (Työttömyyskassa)** (e.g., YTK or a Union) **while you are working**.
*   If you lose your job, the fund pays you a % of your previous salary.
*   If you join *after* you lose your job, it is too late.
`
      },
      {
        id: 'study_culture',
        title: 'Student Culture',
        icon: 'GraduationCap',
        tags: ['student', 'youth'],
        content: `
# Student Life 🎓

### Haalarit (Overalls)
*   The uniform of the student. Color depends on your major.
*   **Patches:** You earn them at parties. Sew them on by hand. Never wash the overalls.

### Time
*   **Academic Quarter:** "10:00" usually means class starts at 10:15.
*   **Lecturers:** You call them by their first name. No "Professor Sir".
`
      }
    ]
  },
  {
    id: 'outdoors',
    title: 'Nature & Outdoors',
    icon: 'TreePine',
    articles: [
      {
        id: 'outdoors_everyman',
        title: 'Everyman\'s Rights (Camping)',
        icon: 'Tent',
        tags: ['culture', 'leisure', 'general'],
        content: `
# Jokamiehenoikeudet (Everyman's Rights) 🌲

In Finland, nature belongs to everyone. You do not need permission to enjoy the forest, but you have responsibilities.

### WHAT YOU CAN DO ✅
*   **Walk, ski, cycle** essentially anywhere (except private gardens).
*   **Pick wild berries and mushrooms** (Blueberries and Lingonberries are free gold!).
*   **Temporary Camping:** You can sleep in a tent for 1-2 nights in the forest, as long as you are not near someone's house.

### WHAT YOU CANNOT DO ❌
*   **Disturb Privacy:** Do not walk close to private homes (pihapiiri). If you see a house, keep your distance.
*   **Take Wood:** You cannot cut down trees or take fallen wood for a fire without the landowner's permission.
*   **Litter:** What you bring in, you take out.
*   **Disturb Animals:** especially during nesting season (Spring).
`
      },
      {
        id: 'outdoors_fire',
        title: 'Fire Safety & Cottages',
        icon: 'Flame',
        tags: ['safety', 'general'],
        content: `
# Fire Safety & The "Pelti" 🔥

### 1. Making Fire in Nature
*   **Designated Spots:** Only make fires in built fireplaces (nuotiopaikka).
*   **Metsäpalovaroitus (Forest Fire Warning):**
    *   **CRITICAL:** If the weather service declares a forest fire warning, **ALL OPEN FIRE IS BANNED**. Even in designated pits.
    *   Check status at **Ilmatieteenlaitos.fi** (FMI). Ignorance is not a valid excuse for burning down a forest.

### 2. Cottage Etiquette: The Damper (Pelti)
Using a Finnish wood stove involves a metal plate (damper) in the chimney.
*   **OPEN IT:** Before lighting the fire. If you forget, the room fills with smoke.
*   **CLOSE IT:** Only when the embers are **completely black/dead**.
*   **THE DANGER:** Closing it too early (while embers are red) traps **Carbon Monoxide** inside. It is odorless and kills you in your sleep. When in doubt, leave it slightly open.
`
      }
    ]
  },
  {
    id: 'culture',
    title: 'Finnish Culture',
    icon: 'Coffee',
    articles: [
      {
        id: 'culture_visiting',
        title: 'Visiting a Finnish Home',
        icon: 'Gift',
        tags: ['culture', 'general'],
        content: `
# Visiting Etiquette ☕

### 1. The Shoes 👞
**Absolute Rule:** Take your shoes off at the door. Walking inside with street shoes is considered extremely dirty and rude.

### 2. Punctuality ⏰
*   If invited for 18:00, arrive at 18:00.
*   18:05 is late. 17:50 is too early (the host is likely in their underwear/towel panic-cleaning).
*   Do not show up unannounced. "Dropping by" is rare.

### 3. Gifts 🎁
It is polite to bring a small token.
*   **Coffee:** A packet of *Juhla Mokka* is the standard currency of friendship.
*   **Flowers:** Safe bet.
*   **Alcohol:** A bottle of wine is acceptable for dinner parties.
`
      },
      {
        id: 'culture_celebrations',
        title: 'Celebrations & Fireworks',
        icon: 'Calendar',
        tags: ['culture', 'leisure'],
        content: `
# Major Celebrations 🎉

### Vappu (May 1st) 🎈
*   The start of Spring (and usually rain/sleet).
*   **Students:** Put on their overalls and white caps.
*   **Picnic:** Everyone goes to the park (Kaivopuisto in Helsinki) regardless of weather. Drink "Sima" (mead) and eat "Munkki" (donuts).

### Juhannus (Midsummer) ☀️
*   Late June. The sun doesn't set.
*   **Cities die:** Everyone leaves for a cottage (mökki).
*   **Bonfires (Kokko):** Big fires are lit by the lake.

### Fireworks & New Year (Uusivuosi) 🎆
Finland has strict laws on explosives.
*   **Selling:** Fireworks are sold in supermarkets **only between Dec 27 - Dec 31**.
*   **Firing Time:** You are legally allowed to set them off **ONLY on Dec 31 from 18:00 to Jan 1 02:00**.
*   **Safety Goggles:** Mandatory by law for the shooter AND spectators.
*   **Zones:** Many city centers (like Helsinki center) completely ban personal fireworks. Check local news.
*   **Etiquette:** Clean up your debris the next morning.
`
      },
       {
        id: 'culture_manners',
        title: 'Unspoken Rules',
        icon: 'Coffee',
        tags: ['culture', 'general'],
        content: `
# Unspoken Rules 🤫

1.  **Silence is Gold:** We don't fill silence with small talk. It's comfortable.
2.  **Personal Space:** At the bus stop, 2 meters distance is polite.
3.  **Coffee:** We drink the most coffee in the world. "Kahvitauko" (coffee break) at work is sacred.
`
      },
      {
        id: 'culture_sauna',
        title: 'The Sauna Protocol',
        icon: 'ThermometerSun',
        tags: ['culture', 'general'],
        content: `
# The Sauna 🧖

*   **Nakedness:** It is not sexual. It is for cleaning and relaxing. Families go together. Strangers usually segregate by gender (public saunas), but mixed saunas exist (wear a swimsuit there).
*   **Löyly:** The steam. Ask "Saisiko heittää löylyä?" (Can I throw water?) if others are present.
*   **Vasta/Vihta:** Beating yourself with birch branches increases circulation. It smells amazing.
*   **The Post-Sauna:** Cooling off outside (even in winter) is mandatory. A "Saunakalja" (Sauna beer) or cider is the traditional hydrator.
`
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// DYNAMIC HELPERS
// ---------------------------------------------------------------------------

// Helper interface for flattened consumption
export interface EnrichedWikiArticle extends WikiArticle {
  categoryTitle: string;
  displayId: string; // e.g., "1.1"
  categoryId: string;
}

// Flattens the hierarchy and generates the "1.1" style IDs dynamically
export const getAllFlattenedArticles = (): EnrichedWikiArticle[] => {
  return WIKI_CATEGORIES.flatMap((cat, catIdx) => 
    cat.articles.map((art, artIdx) => ({
      ...art,
      categoryTitle: cat.title,
      categoryId: cat.id,
      displayId: `${catIdx + 1}.${artIdx + 1}` // Generates 1.1, 1.2, 2.1, etc.
    }))
  );
};
