import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPromptData, PromptRequest, Tone } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize client securely
const ai = new GoogleGenAI({ apiKey });

export const generateAiPrompt = async (request: PromptRequest): Promise<GeneratedPromptData> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  const model = "gemini-2.5-flash"; // Optimized for speed and quality

  const systemInstruction = `You are an expert AI Prompt Engineer. Your goal is to create high-quality, effective prompts for beginners to use with LLMs.
  
  The user will provide a Use Case, a Tone, a Target Platform, and optionally a Specific Topic.
  You must generate:
  1. The actual prompt text the user should copy-paste.
  2. A brief explanation of what the prompt does.
  3. Instructions on how to use it (e.g., "Fill in the [brackets]").
  4. The expected result from the AI.
  
  Keep the language beginner-friendly.`;

  // Determine the effective tone
  const effectiveTone = request.tone === Tone.CUSTOM && request.customTone 
    ? request.customTone 
    : request.tone;

  const topicContext = request.topic ? ` about "${request.topic}"` : '';
  const userPrompt = `Create a ${effectiveTone} prompt for ${request.platform} specifically for: ${request.useCase}${topicContext}.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            promptText: { type: Type.STRING, description: "The actual prompt to copy." },
            explanation: { type: Type.STRING, description: "What this prompt achieves." },
            howToUse: { type: Type.STRING, description: "Simple instructions." },
            expectedResult: { type: Type.STRING, description: "What the output will look like." },
          },
          required: ["promptText", "explanation", "howToUse", "expectedResult"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response generated.");
    }

    return JSON.parse(jsonText) as GeneratedPromptData;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback in case of API error to ensure the app "works offline" or on failure gracefully
    return {
      promptText: `Act as a ${effectiveTone} expert in ${request.useCase}. Please help me with${request.topic ? ' ' + request.topic : '... [Insert details here]'}.`,
      explanation: "A generic fallback prompt since the AI generator is currently unavailable.",
      howToUse: request.topic ? "Copy and paste into your AI tool." : "Replace [Insert details here] with your specific topic.",
      expectedResult: "A helpful response based on your input.",
    };
  }
};