
import { GoogleGenAI, Type } from "@google/genai";
import { Message, Sender, UserProfile, LanguageCode } from "../types";
import { EnrichedWikiArticle } from "../data/wikiContent";
import { WikiProgressData, getApiKey } from "./storageService";

declare var process: { env: { API_KEY: string } };

// Helper to initialize the AI client with the stored key
const getClient = () => {
  // PRIORITY 1: Manually entered key from LocalStorage (User Override)
  const userKey = getApiKey();
  
  // PRIORITY 2: Environment variable (Deployment Config)
  // If userKey exists, it takes precedence over the environment variable.
  const effectiveKey = userKey || process.env.API_KEY;

  if (!effectiveKey) {
    throw new Error("API Key not found. Please enter it in the settings.");
  }
  return new GoogleGenAI({ apiKey: effectiveKey });
};

const SYSTEM_INSTRUCTION_BASE = `
You are "Finland Works!", a highly curated assistant designed to help immigrants start their life in Finland.
You are talking to a user with a specific profile.
ALWAYS tailor your advice to their **residence permit type**, profession, language level, family status, AND their emotional confidence levels.

TONE & LANGUAGE INSTRUCTIONS:
1. **Inclusive & Welcoming:** Make the user feel that they belong here and that Finland wants them. Be their supportive partner in this journey.
2. **Plain Language:** Use simple, clear vocabulary. Avoid complex grammar, slang, or idioms. Explain concepts as if explaining to a friend who is learning.
3. **Non-Judgmental & Empathetic:** If the user is struggling or procrastinating, do NOT scold them. Acknowledge that moving is hard. Offer a "safe space" to discuss blockers.
4. **Celebratory:** When they complete a task, celebrate it warmly!
`;

// Modified to accept LanguageCode
export const createSystemInstruction = (
  profile: UserProfile,
  wikiProgress: WikiProgressData,
  articles: EnrichedWikiArticle[],
  language: LanguageCode
): string => {
  
  const isGuest = profile.id === 'guest';

  // 1. Determine User Tags for filtering
  const userTags = new Set<string>(['general', 'arrival']);
  const permit = profile.residencePermitType.toLowerCase();
  if (permit.includes('student')) userTags.add('student');
  if (permit.includes('work') || permit.includes('specialist')) userTags.add('worker');
  
  const marital = profile.maritalStatus.toLowerCase();
  if (marital.includes('child') || marital.includes('family') || marital.includes('kid')) userTags.add('family');
  
  if (profile.ageRange === '18-25') {
    userTags.add('youth');
    userTags.add('student');
  }

  // 2. Filter Articles
  const relevantArticles = articles.filter(article => 
    article.tags.some(t => userTags.has(t))
  );

  // 3. Guide Info
  const guideInfo = relevantArticles.map(a => `
  [GUIDE SECTION ${a.displayId}]
  Title: ${a.title}
  Category: ${a.categoryTitle}
  Content:
  ${a.content}
  [END SECTION ${a.displayId}]
  `).join('\n');
  
  // 4. Generate the Guide Track list with BEHAVIORAL METRICS
  const now = Date.now();
  let stagnationAlert = false;
  let procrastinationAlert = false;

  // Check Global Stagnation (Checking guide often but not updating)
  // Skip for guest
  if (!isGuest && wikiProgress.globalStats.sessionsWithoutUpdate > 3 && wikiProgress.globalStats.totalSessions > 5) {
      stagnationAlert = true;
  }

  const guideTrack = articles.map(article => {
    const data = wikiProgress.items[article.id];
    const status = data?.status;
    
    let statusText = 'Not started';
    let metrics = '';

    if (status === 'done') {
        statusText = 'DONE ✅';
        metrics = `(Completed on ${new Date(data.lastUpdated).toLocaleDateString()})`;
    }
    if (status === 'later') {
        statusText = 'REMIND ME LATER ⏰';
        
        // Calculate procrastination
        const daysPending = Math.floor((now - (data.markedLaterAt || now)) / (1000 * 60 * 60 * 24));
        const checks = data.viewsSinceLater || 0;
        
        metrics = `(Marked later ${daysPending} days ago. User viewed guide ${checks} times since then without doing this.)`;
        
        if (checks > 2 || daysPending > 7) {
            metrics += " [PROCRASTINATION ALERT: User might be avoiding this]";
            procrastinationAlert = true;
        }
    }
    
    return `[${article.displayId}] ${article.title}: ${statusText} ${metrics}`;
  }).join('\n');

  // 5. Construct Specific Behavioral Prompts
  let behavioralPrompt = "";
  
  if (isGuest) {
      behavioralPrompt += `
      [CRITICAL - GUEST MODE]: 
      You are talking to a user who has NOT created a profile yet ("Guest"). 
      1. **Do NOT assume** their residence permit type, origin country, or family status.
      2. If they ask a question where the answer depends on their status (e.g., "Can I get social security?" or "Do I need a visa?"), you MUST gently ask clarifying questions first.
      3. Do not refer to "your profile" or "your settings".
      4. Keep advice applicable to a general immigrant audience until you know more.
      `;
  } else {
      // Add behavioral context based on new psychological fields
      // Updated to handle numeric values ("1", "2", etc.)
      
      const lowConfidenceLife = ['1', '2', 'lost', 'support', 'adjusting', 'alienated'];
      const isLowConfidenceLife = lowConfidenceLife.some(val => profile.confidenceLife?.toLowerCase().includes(val));

      if (isLowConfidenceLife) {
          behavioralPrompt += `[SOCIAL CONNECTION]: The user feels they are still adjusting or disconnected (Resonance Level ${profile.confidenceLife}/5). Be extra reassuring. Focus on community building, making friends, and finding belonging. Validate their feelings of being an outsider if they arise.\n`;
      }
      
      const highConfidenceLife = ['4', '5', 'home', 'confident'];
      const isHighConfidenceLife = highConfidenceLife.some(val => profile.confidenceLife?.toLowerCase().includes(val));
      if (isHighConfidenceLife) {
          behavioralPrompt += `[SOCIAL CONNECTION]: The user feels well-integrated and at home (Resonance Level ${profile.confidenceLife}/5). You can suggest more advanced local activities, deep cultural nuances, or volunteering.\n`;
      }

      const lowConfidenceCareer = ['1', '2', 'unsure', 'ideas', 'lost'];
      const isLowConfidenceCareer = lowConfidenceCareer.some(val => profile.confidenceCareer?.toLowerCase().includes(val));
      
      if (isLowConfidenceCareer) {
          behavioralPrompt += `[CAREER COACHING]: The user lacks career direction (Level ${profile.confidenceCareer}/5). Ask probing questions to find their transferable skills. Don't just list job sites; help them find their value proposition.\n`;
      }

      const highMotivationFinnish = ['4', '5', 'very committed', 'high'];
      const isHighMotivationFinnish = highMotivationFinnish.some(val => profile.finnishMotivation?.toLowerCase().includes(val));

      if (isHighMotivationFinnish) {
          behavioralPrompt += `[MOTIVATION CONTEXT]: The user is highly motivated (Level ${profile.finnishMotivation}/5) to learn Finnish. Encouragingly use simple Finnish phrases in your replies to help them practice (e.g., "Hyvää huomenta!" or "Tsemppiä!").\n`;
      }

      const lowMotivationFinnish = ['1', '2', 'just starting', 'not fully committed', 'low', 'none'];
      const isLowMotivationFinnish = lowMotivationFinnish.some(val => profile.finnishMotivation?.toLowerCase().includes(val));

      if (isLowMotivationFinnish) {
          behavioralPrompt += `[MOTIVATION CONTEXT]: The user is hesitant about Finnish (Level ${profile.finnishMotivation}/5). Do not pressure them. Emphasize English solutions first, then gently suggest simple Finnish words only when necessary.\n`;
      }

      if (profile.primaryExcitement) {
          behavioralPrompt += `[ENGAGEMENT HOOK]: The user is most excited about "${profile.primaryExcitement}". Connect your advice to this topic when possible to keep them engaged.\n`;
      }
  }

  if (stagnationAlert) {
      behavioralPrompt += `
      [CRITICAL INSIGHT]: The user has opened the guide multiple times recently (${wikiProgress.globalStats.sessionsWithoutUpdate} sessions) without marking anything new as done.
      ACTION: They might be stuck or overwhelmed but afraid to ask.
      1. Gently ask: "I noticed you've been checking the guide a few times. Is there a specific step that feels a bit confusing or difficult right now?"
      2. Do NOT sound like a boss checking work. Sound like a friend offering a hand.
      `;
  }

  if (procrastinationAlert) {
      behavioralPrompt += `
      [CRITICAL INSIGHT]: Several items are marked "Remind Me Later" and have been ignored for a while.
      ACTION: Identify the item marked 'later' with the highest procrastination count.
      1. Gently bring it up: "I see we put [Topic] on hold for a while. Sometimes that part is the most annoying. Do you want to break it down into smaller steps today?"
      `;
  }

  return `${SYSTEM_INSTRUCTION_BASE}
  
  LANGUAGE INSTRUCTION:
  The user is currently viewing the app in language code: "${language}".
  **You MUST reply in this language.**
  However, if referring to specific Finnish institutions (Kela, Migri, DVV, TE-toimisto), ALWAYS keep the Finnish name in parentheses if you translate it, e.g. "Social Insurance Institution (Kela)".

  USER PROFILE:
  Name: ${profile.name}
  Residence Permit / Ground: ${profile.residencePermitType}
  Origin: ${profile.originCountry}
  Age: ${profile.ageRange}
  Marital Status: ${profile.maritalStatus}
  Profession: ${profile.profession}
  Education: ${profile.education.degree} in ${profile.education.field}
  Language Skills: ${profile.languages.map(l => `${l.language} (${l.level})`).join(', ')}
  Challenges: ${profile.challenges.join(', ')}
  Aspirations: ${profile.aspirations.join(', ')}

  PSYCHOLOGICAL PROFILE (USE THIS TO ADJUST TONE):
  Motivation to Learn Finnish: ${profile.finnishMotivation || 'Unknown'}
  Cultural Interest: ${profile.cultureInterest || 'Unknown'}
  Social Connection / Belonging: ${profile.confidenceLife || 'Unknown'}
  Confidence (Career): ${profile.confidenceCareer || 'Unknown'}
  Current Info Level: ${profile.infoLevel || 'Unknown'}
  Excited About: ${profile.primaryExcitement || 'Unknown'}

  <guide purposes>
  You are not just a chatbot; you are an active guide for the user's integration journey.
  
  BEHAVIORAL GUIDANCE:
  ${behavioralPrompt}
  
  SPECIFIC BEHAVIORS:
  1. **Check Essentials:** If <guide track> shows "Not started" or "later" on Bureaucracy (DVV, Migri), gently probe understanding.
  2. **Celebrate:** If they just marked something done, be genuinely happy for them!
  3. **Deep Dive:** If the user seems stuck (based on the alerts above), stop giving generic info. Ask deep-dive questions to understand the emotional or logistical blocker. Note these blockers in your response so we can remember them.
  </guide purposes>

  <guide track>
  Global Stats: User has visited the guide ${wikiProgress.globalStats.totalSessions} times. First visit: ${new Date(wikiProgress.globalStats.firstSessionAt).toLocaleDateString()}.
  ${guideTrack}
  </guide track>

  <guide info>
  The following are the full contents of the survival guides relevant to this user's profile. 
  References to 'Section 1.1' etc correspond to the guide track above.
  
  ${guideInfo}
  </guide info>
  `;
};

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  profile: UserProfile,
  wikiProgress: WikiProgressData,
  articles: EnrichedWikiArticle[],
  language: LanguageCode
): Promise<string> => {
  const ai = getClient();
  
  const systemInstruction = createSystemInstruction(profile, wikiProgress, articles, language);

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
    history: history.map(m => ({
      role: m.sender === Sender.USER ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))
  });

  try {
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('429')) {
      throw new Error("API usage limit reached. Please check your key.");
    }
    throw error;
  }
};

export const summarizeConversation = async (
  messages: Message[]
): Promise<string> => {
  const ai = getClient();
  
  const transcript = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
  const prompt = `
  Summarize the following conversation between a user and an advisor about moving to/living in Finland.
  Highlight key advice given and any action items for the user.
  Keep it brief (under 150 words).
  
  TRANSCRIPT:
  ${transcript}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Summary not available.";
  } catch (error) {
    console.error("Summary Error:", error);
    throw error;
  }
};

export const analyzeCV = async (cvText: string): Promise<Partial<UserProfile>> => {
  const ai = getClient();

  const prompt = `
    Analyze the following Curriculum Vitae (CV) text and extract information to populate a User Profile for an immigrant integration app in Finland.
    
    Return ONLY a JSON object with the following schema (all fields optional if not found):
    {
      "name": string,
      "profession": string,
      "education": {
        "degree": string,
        "field": string
      },
      "languages": [ { "language": string, "level": string } ],
      "aspirations": string[],
      "challenges": string[] (Infer potential challenges based on gaps or origin vs Finland context)
    }

    CV TEXT:
    ${cvText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            profession: { type: Type.STRING },
            education: {
              type: Type.OBJECT,
              properties: {
                degree: { type: Type.STRING },
                field: { type: Type.STRING }
              }
            },
            languages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  language: { type: Type.STRING },
                  level: { type: Type.STRING }
                }
              }
            },
            aspirations: { type: Type.ARRAY, items: { type: Type.STRING } },
            challenges: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return json;
  } catch (error) {
    console.error("CV Analysis Error", error);
    throw new Error("Could not analyze CV. Please try again.");
  }
};
