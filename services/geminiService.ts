import { GoogleGenAI } from "@google/genai";
import { Message, Sender, UserProfile } from "../types";

// Helper to initialize the AI client with the stored key
const getClient = (apiKey: string) => {
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION_BASE = `
You are "Finland Works!", a highly curated assistant designed to help immigrants start their life in Finland.
Your tone should be encouraging, practical, direct, and realistic. 
You are talking to a user with a specific profile. 
ALWAYS tailor your advice to their profession, language level, and family status.
Keep responses concise and scannable (use bullet points).
If the user asks about legal matters, advise checking Migri.fi but give general guidance.
`;

export const createSystemInstruction = (profile: UserProfile): string => {
  return `${SYSTEM_INSTRUCTION_BASE}
  
  USER PROFILE:
  Name: ${profile.name}
  Origin: ${profile.originCountry}
  Age: ${profile.ageRange}
  Marital Status: ${profile.maritalStatus}
  Profession: ${profile.profession}
  Education: ${profile.education.degree} in ${profile.education.field}
  Language Skills: ${profile.languages.map(l => `${l.language} (${l.level})`).join(', ')}
  Challenges: ${profile.challenges.join(', ')}
  Aspirations: ${profile.aspirations.join(', ')}
  `;
};

export const sendMessageToGemini = async (
  apiKey: string,
  history: Message[],
  newMessage: string,
  profile: UserProfile
): Promise<string> => {
  const ai = getClient(apiKey);
  
  // Convert internal message format to Gemini API format if needed, 
  // but typically we just need the system instruction and the new message 
  // in a "stateless" way or maintain chat object. 
  // For this implementation, we will use the Chat helper.

  const systemInstruction = createSystemInstruction(profile);

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
  apiKey: string,
  messages: Message[]
): Promise<string> => {
  const ai = getClient(apiKey);
  
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
