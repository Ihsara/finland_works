import { GoogleGenAI, Type } from "@google/genai";
import { Message, Sender, UserProfile, LanguageCode } from "../types";
import { EnrichedWikiArticle } from "../data/wikiContent";
import { WikiProgressData, getApiKey } from "./storageService";
import { getNetworkingResponse, getNetworkingOptionsXML } from "../data/networkingContent";

declare var process: { env: { API_KEY: string } };

const getClient = () => {
  const effectiveKey = getApiKey() || process.env.API_KEY;
  if (!effectiveKey) throw new Error("API Key not found. Please enter it in the settings.");
  return new GoogleGenAI({ apiKey: effectiveKey });
};

const SYSTEM_INSTRUCTION_BASE = `
You are "Finland Works!", a highly curated assistant designed to help immigrants start their life in Finland.
ALWAYS tailor your advice to their **residence permit type**, profession, language level, family status, AND their emotional confidence levels.

TONE & LANGUAGE INSTRUCTIONS:
1. **Inclusive & Welcoming:** Make the user feel that they belong here.
2. **Plain Language:** Use simple, clear vocabulary.
3. **Non-Judgmental & Empathetic:** If the user is struggling, acknowledge that moving is hard.
4. **Celebratory:** When they complete a task, celebrate it warmly!

[INTERACTIVE QUESTIONS & OPTIONS]
When you determine that the user needs to make a choice, or when you want to guide them through a multi-step process by asking a multiple-choice question, YOU MUST FORMAT YOUR RESPONSE USING XML TAGS.
Do NOT use JSON. Use the format below:

<reply>
Write your main conversational response here. Explain the context or advice.
</reply>

<question>
<header>A short header for the buttons (e.g., Choose a topic)</header>
<option value="Technical ID string">Button Label</option>
<option value="Another ID">Button Label 2</option>
</question>

RULES FOR INTERACTIVE XML:
1. Ensure \`Button Label\` is short and UI-friendly (2-5 words).
2. Ensure \`value\` is a clear, technical ID string if it refers to a known flow, or simple text if it's a free choice.

[INTERACTIVE FLOW - NETWORKING]
If the user asks about "Networking", "Meeting people", or "Finding connections" in a general sense, or if the context indicates they are starting the networking module, DO NOT generate a standard text response.
INSTEAD, output the exact XML string provided in the networking options block below.
`;

export const createSystemInstruction = (
  profile: UserProfile,
  wikiProgress: WikiProgressData,
  articles: EnrichedWikiArticle[],
  language: LanguageCode,
  responseLength?: 'short' | 'long'
): string => {
  const isGuest = profile.id === 'guest';
  const userTags = new Set<string>(['general', 'arrival']);
  if (!isGuest) {
      const permit = profile.residencePermitType.toLowerCase();
      if (permit.includes('student')) userTags.add('student');
      if (permit.includes('work') || permit.includes('specialist')) userTags.add('worker');
      const marital = profile.maritalStatus.toLowerCase();
      if (marital.includes('child') || marital.includes('family') || marital.includes('kid')) userTags.add('family');
      if (profile.ageRange === '18-25') {
        userTags.add('youth');
        userTags.add('student');
      }
  }

  const guideInfo = articles.filter(a => a.tags.some(t => userTags.has(t))).map(a => `
  [GUIDE SECTION ${a.displayId}]
  Title: ${a.title}
  Category: ${a.categoryTitle}
  Summary:
  ${a.summary}
  [END SECTION ${a.displayId}]
  `).join('\n');
  
  const guideTrack = articles.map(article => {
    const data = wikiProgress.items[article.id];
    const status = data?.status;
    let statusText = 'Not started';
    if (status === 'done') statusText = 'DONE ✅';
    if (status === 'later') statusText = 'REMIND ME LATER ⏰';
    return `[${article.displayId}] ${article.title}: ${statusText}`;
  }).join('\n');

  let userProfileBlock = "";
  if (isGuest) {
      userProfileBlock = `
      USER PROFILE:
      Status: GUEST (No data available).
      Treat as a new, unknown user. Do NOT hallucinate personal details.
      `;
  } else {
      userProfileBlock = `
      USER PROFILE:
      Name: ${profile.name}
      Residence Permit: ${profile.residencePermitType}
      Origin: ${profile.originCountry}
      Profession: ${profile.profession}
      Finnish Motivation: ${profile.finnishMotivation || 'Unknown'}
      Confidence (Career): ${profile.confidenceCareer || 'Unknown'}
      `;
  }

  let lengthInstruction = "";
  if (responseLength === 'short') lengthInstruction = `[RESPONSE LENGTH]: SHORT & CONCISE (Under 100 words).`;
  else if (responseLength === 'long') lengthInstruction = `[RESPONSE LENGTH]: DETAILED & COMPREHENSIVE.`;

  return `${SYSTEM_INSTRUCTION_BASE}
  
  LANGUAGE INSTRUCTION:
  The user is currently viewing the app in language code: "${language}".
  **You MUST reply in this language.**

  ${lengthInstruction}
  ${userProfileBlock}

  <guide track>
  ${guideTrack}
  </guide track>

  <guide info>
  ${guideInfo}
  </guide info>

  [NETWORKING OPTIONS]
  ${getNetworkingOptionsXML(language)}
  `;
};

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  profile: UserProfile,
  wikiProgress: WikiProgressData,
  articles: EnrichedWikiArticle[],
  language: LanguageCode,
  responseLength?: 'short' | 'long'
): Promise<string> => {
  const networkingResponse = getNetworkingResponse(newMessage, language);
  if (networkingResponse) {
    return JSON.stringify({
        type: "navigation_link",
        data: {
            message: networkingResponse.text,
            articleId: networkingResponse.articleId || ""
        }
    });
  }

  const ai = getClient();
  const systemInstruction = createSystemInstruction(profile, wikiProgress, articles, language, responseLength);

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
    if (error.message?.includes('429')) throw new Error("API usage limit reached.");
    throw error;
  }
};

export interface SummaryResult { summary: string; title: string; }

export const summarizeConversation = async (messages: Message[]): Promise<SummaryResult> => {
  const ai = getClient();
  const transcript = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
  const prompt = `Analyze the conversation. Provide: 1. A short title (max 6 words). 2. A summary of key advice (under 150 words). TRANSCRIPT:\n${transcript}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            title: { type: Type.STRING }
          }
        }
      }
    });
    const json = JSON.parse(response.text || '{}');
    return { summary: json.summary || "Summary not available.", title: json.title || "Conversation" };
  } catch (error) {
    console.error("Summary Error:", error);
    throw error;
  }
};

export const analyzeCV = async (cvText: string): Promise<Partial<UserProfile>> => {
  const ai = getClient();
  const prompt = `Analyze the following CV text and extract information to populate a User Profile for an immigrant integration app in Finland. Return JSON with schema: { name, profession, education: { degree, field }, languages: [{ language, level }], aspirations: [], challenges: [] } CV TEXT:\n${cvText}`;

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
            education: { type: Type.OBJECT, properties: { degree: { type: Type.STRING }, field: { type: Type.STRING } } },
            languages: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { language: { type: Type.STRING }, level: { type: Type.STRING } } } },
            aspirations: { type: Type.ARRAY, items: { type: Type.STRING } },
            challenges: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("CV Analysis Error", error);
    throw new Error("Could not analyze CV.");
  }
};