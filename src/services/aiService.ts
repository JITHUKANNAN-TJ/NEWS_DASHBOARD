import { GoogleGenerativeAI } from "@google/generative-ai";
import { Persona } from "../types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

/**
 * Synthesizes a strategic intelligence briefing based on a collection of news stories.
 */
export const synthesizeBriefing = async (persona: Persona, stories: any[]) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

  const model = getGeminiModel();
  const storyContext = stories.map(s => `Title: ${s.title}\nDescription: ${s.description}`).join("\n\n");

  const prompt = `
    You are the ET News 2026 'Aura' Intelligence Engine. 
    Your role is to synthesize a high-fidelity strategic briefing for a ${persona.toUpperCase()} persona.
    
    Context:
    ${storyContext}
    
    Task:
    1. Provide a professional 'Integrated Summary' (max 2 paragraphs).
    2. Identify 3 'Strategic Impact Vectors' (e.g. GDP Impact, Supply Risk, Growth Alpha) with a value (e.g. +2.4%, Critical, etc.)
    3. The tone must be 'Next-Level' futuristic editorial, like an elite intelligence agency for business.
    
    Return the response in JSON format:
    {
      "summary": "string",
      "impactVectors": [
        { "label": "string", "value": "string", "icon": "trending-up | globe | zap | activity" }
      ]
    }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return JSON.parse(text.replace(/```json|```/g, ""));
  } catch (e) {
    console.error("JSON Parsing failed for AI response, returning fallback.", text);
    return null;
  }
};

/**
 * Adapts content for cross-cultural business analogies (Vernacular Engine).
 */
export const adaptCulturally = async (text: string, language: string) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

  const model = getGeminiModel();
  const prompt = `
    You are the 'Cultural Adaptor' for ET News 2026.
    
    Content: "${text}"
    Target Language: ${language}
    
    Task:
    1. Translate the summary into ${language}.
    2. Create a unique 'Cultural Analogy' that relates the business concept to a local regional metaphor (e.g. Bazaars, Temples, Haveli, Monsoon cycles).
    
    Return the response in JSON:
    {
      "translation": "string",
      "analogy": "string"
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  try {
    return JSON.parse(responseText.replace(/```json|```/g, ""));
  } catch (e) {
    console.error("Cultural adaptation failed.", responseText);
    return null;
  }
};

/**
 * Generates a narrative prediction for a story arc.
 */
export const predictStoryArc = async (arcTitle: string, status: string, players: string[]) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

  const model = getGeminiModel();
  const prompt = `
    Role: ET 2026 Predictive Engine.
    Story Arc: "${arcTitle}"
    Status: ${status}
    Players: ${players.join(", ")}
    
    Task:
    Predict the 'Next Structural Catalyst' node for Q4 2026.
    Return a 1-sentence forecasting insight and a 'Probability' score (0-100).
    
    Return JSON:
    {
      "prediction": "string",
      "probability": number
    }
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  try {
    return JSON.parse(responseText.replace(/```json|```/g, ""));
  } catch (e) {
    return { prediction: "Awaiting next structural node sync...", probability: 85 };
  }
};
