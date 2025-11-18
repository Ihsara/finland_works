export interface WikiArticle {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export const WIKI_CONTENT: WikiArticle[] = [
  {
    id: 'arrival',
    title: 'Arrival & Legality',
    icon: 'CheckCircle',
    content: `
# Welcome to Finland! 🇫🇮

Landing in a new country is exciting but also full of bureaucracy. Here is the "Holy Trinity" of getting settled legally.

### 1. The DVV (Digital and Population Data Services Agency)
Think of this as the central nervous system of Finnish society. 
*   **What it is:** They maintain the Population Information System.
*   **Why you need it:** To get your **Personal Identity Code** (henkilötunnus). You cannot open a bank account or get a phone contract without this.
*   **Action:** Visit a DVV service point immediately upon arrival if you didn't get an identity code with your residence permit.

### 2. Migri (Finnish Immigration Service)
*   **The Card:** Your Residence Permit card is your golden ticket. It proves your right to live, work, or study here.
*   **Types:** 
    *   **Type A (Continuous):** Usually for permanent work or family ties. The path to citizenship.
    *   **Type B (Temporary):** Usually for students or temporary work.
    *   **Type P (Permanent):** The goal!
*   **Tip:** Always keep your address updated with Migri and DVV.

### 3. Police (Poliisi)
*   For EU citizens, you register your right of residence at the police, not Migri (though this process changes, so always check valid sources!).
*   They also issue Finnish ID cards, which are incredibly useful for proving your identity in daily life.
`
  },
  {
    id: 'money',
    title: 'Money & Banking',
    icon: 'User',
    content: `
# Banking & Taxes 💶

### Opening a Bank Account
This can be surprisingly tricky! Finnish banks have strict anti-money laundering laws.
*   **What you need:** Passport, Residence Permit, Finnish Personal ID Code, and often proof of address or employment contract.
*   **Strong Electronic Identification (Vahva tunnistautuminen):** This is **CRITICAL**. It's your digital key to *everything*—logging into Kela, tax office, health services, etc. Ask your bank specifically for this!

### The Tax Card (Verokortti)
*   Finland has a progressive tax system.
*   **How it works:** You give a tax card to your employer. If you don't, they automatically deduct **60%** of your salary! 😱
*   **Action:** Order one from **Vero.fi** as soon as you have a job. It's fast and digital.
`
  },
  {
    id: 'family',
    title: 'Family & Children',
    icon: 'UserPlus',
    content: `
# Bringing the Family 👨‍👩‍👧‍👦

Finland is one of the most family-friendly countries in the world.

### Daycare (Päiväkoti)
*   **Right to Care:** Every child under school age (7) has a subjective right to early childhood education, regardless of whether parents are working.
*   **Cost:** Heavily subsidized. Maximum fees are around €300/month, but often much lower based on income.
*   **Application:** Apply 4 months in advance via your municipality's website.

### School (Koulu)
*   **Basic Education:** Starts at age 7. It is free, inclusive, and high-quality.
*   **Lunch:** A warm meal is served every day for free. Yes, really!
*   **Afternoon Clubs:** First and second graders often go to "iltapäiväkerho" after school while parents finish work.

### Neuvola (Child Health Clinic)
*   Your best friend during pregnancy and early childhood. They monitor growth, give vaccinations, and offer support—all free.
`
  },
  {
    id: 'life',
    title: 'Social & Leisure',
    icon: 'Languages',
    content: `
# Living Your Life 🌲

Integration isn't just paperwork; it's finding your place.

### Nature & Everyman's Rights (Jokamiehenoikeudet)
*   You can walk, ski, or cycle almost anywhere in nature, even on private land (provided you don't disturb the owner).
*   You can pick berries and mushrooms freely. 🫐🍄

### Libraries (Kirjasto)
*   Finnish libraries are living rooms. You can borrow books, tools, sewing machines, 3D print, or just hang out warm and dry.
*   **Oodi** in Helsinki is a masterpiece, but local libraries are just as important.

### Volunteering & Associations
*   Finns love associations (yhdistys). From sports clubs to dog enthusiasts.
*   Joining one is the **fastest way to make Finnish friends**. Look for "Vapaaehtoistyö" (Volunteer work).
`
  }
];
