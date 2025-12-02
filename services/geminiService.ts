import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface SongConcept {
  title: string;
  genre: string;
  mood: string;
  lyricsSnippet: string;
  instrumentationIdeas: string[];
}

export const generateSongConcept = async (
  vision: string,
  genre: string
): Promise<SongConcept> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a song concept based on the following vision: "${vision}" and genre: "${genre}". 
      Provide a catchy title, a mood description, a short snippet of lyrics (chorus), and some instrumentation ideas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            genre: { type: Type.STRING },
            mood: { type: Type.STRING },
            lyricsSnippet: { type: Type.STRING },
            instrumentationIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "genre", "mood", "lyricsSnippet", "instrumentationIdeas"],
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response text from Gemini");
    }
    return JSON.parse(text) as SongConcept;
  } catch (error) {
    console.error("Error generating song concept:", error);
    throw error;
  }
};

export const editImage = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};