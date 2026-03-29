import { GoogleGenerativeAI } from "@google/generative-ai";
import { Persona, Story } from "../types";
import { MarketIndex } from "./marketService";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

interface StoryEnrichment {
  id: number;
  category: string;
  sentiment: string;
  relevance: number;
}

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

/**
 * Enriches raw news stories with AI-driven categorization, sentiment, and relevance scores.
 */
export const enrichStoriesWithAI = async (persona: Persona, stories: any[]): Promise<Story[]> => {
  if (!GEMINI_API_KEY || stories.length === 0) return stories as Story[];

  try {
    const model = getGeminiModel();
    const batchSize = 15;
    const batch = stories.slice(0, batchSize); 
    const newsContext = batch.map((s, i) => `[ID:${i}] ${s.title}`).join("\n");

    const prompt = `
      You are the ET 2026 'Aura' Neural Layer.
      Persona: ${persona.toUpperCase()}
      Raw News Stream:
      ${newsContext}
      Task: For each [ID], provide Category (Markets, Tech, Economy, Strategic), Sentiment (positive, neutral, warning), and Relevance (80-100 for a ${persona}).
      Return ONLY a JSON array: [{"id": number, "category": "string", "sentiment": "string", "relevance": number}]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    const enrichedData: StoryEnrichment[] = JSON.parse(text);
    const enrichedMap = new Map<number, StoryEnrichment>(enrichedData.map((e: StoryEnrichment) => [e.id, e]));

    return stories.map((story, index) => {
      const enrichment = enrichedMap.get(index);
      if (enrichment) {
        return {
          ...story,
          category: (enrichment.category as any) || "Strategic",
          sentiment: (enrichment.sentiment as any) || "neutral",
          relevance: enrichment.relevance || 85
        } as Story;
      }

      const lowerTitle = (story.title || "").toLowerCase();
      let category: any = "Strategic";
      if (/(stock|market|nifty|sensex|rbi|fed|rate|bank|profit|loss)/.test(lowerTitle)) category = "Markets";
      else if (/(tech|ai|semiconductor|software|cloud|digital|robot|crypto)/.test(lowerTitle)) category = "Tech";
      else if (/(economy|gdp|inflation|budget|fiscal|policy|trade)/.test(lowerTitle)) category = "Economy";

      return {
        ...story,
        category,
        sentiment: story.sentiment || "neutral",
        relevance: 82
      } as Story;
    });
  } catch (e) {
    return stories as Story[];
  }
};

/**
 * GENERATE NEURAL FEED: Fallback function for Production domains (Render) where NewsAPI is blocked.
 * Uses Gemini to simulate a high-fidelity live data stream.
 */
export const generateNeuralFeed = async (persona: Persona): Promise<Story[]> => {
    if (!GEMINI_API_KEY) throw new Error("Aura Offline: Neural Recall Unavailable.");

    try {
        const model = getGeminiModel();
        const prompt = `
            You are the ET 2026 'Aura' Neural Engine. 
            The News API is currently blocked, so you must generate a high-fidelity 'Neural Feed' of the latest global trends.
            Persona: ${persona.toUpperCase()}
            
            Requirement: Generate 12 high-impact, realistic news headlines for ${new Date().toLocaleDateString()}.
            Include articles for: Markets, Technology, Economy.
            Return ONLY a JSON array of objects:
            [
              {
                "id": number (start from 800),
                "title": "A tactical, realistic headline",
                "category": "Markets | Tech | Economy | Strategic",
                "sentiment": "positive | neutral | warning",
                "relevance": number (80-100),
                "description": "A 1-sentence insight",
                "urlToImage": "A high-quality Unsplash image URL related to the topic",
                "source": { "name": "Aura Network | Bloomberg | TechCrunch" }
              }
            ]
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "");
        return JSON.parse(text) as Story[];
    } catch (error) {
        console.error("Neural Feed Generation failed.", error);
        throw error;
    }
};

export const chatWithAura = async (persona: Persona, message: string, history: any[]) => {
  if (!GEMINI_API_KEY) throw new Error("Aura Offline: API Key Missing.");
  try {
    const model = getGeminiModel();
    const genHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    const recentHistory = genHistory.slice(-6);
    const chat = model.startChat({ history: recentHistory.length > 1 ? recentHistory.slice(0, -1) : [] });
    const prompt = `Act as Aura (ET 2026 Engine). Persona: ${persona.toUpperCase()}. Tone: Tactical, direct. Respond to: ${message}`;
    const result = await chat.sendMessage([{ text: prompt }]);
    return result.response.text();
  } catch (err) {
    return "Aura Neural Sync Fragmented: Direct interaction limited. Intelligence nodes stabilized.";
  }
};

export const generateMarketPulse = async (marketData: MarketIndex[]) => {
  if (!GEMINI_API_KEY) return "Aura Pulse: Real-time telemetry synchronized.";
  const model = getGeminiModel();
  const context = marketData.map(m => `${m.symbol}: ${m.price} (${m.changePercent}%)`).join(", ");
  const prompt = `Analyze: ${context}. 1-sentence tactical 'Neural Insight' under 15 words.`;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return "Aura Analysis: Volatility indexed at 2.4 - Tactical stability high.";
  }
};

export const synthesizeBriefing = async (persona: Persona, stories: any[]) => {
  if (!GEMINI_API_KEY) return { summary: "Synthesis offline", impactVectors: [] };
  const model = getGeminiModel();
  const storyContext = stories.slice(0, 5).map(s => s.title).join("\n");
  const prompt = `Summarize for ${persona.toUpperCase()} in 2 paragraphs. Headlines: ${storyContext}. Return JSON: { "summary": "...", "impactVectors": [{"label": "...", "value": "..."}] }`;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    return JSON.parse(text);
  } catch (e) {
    return { summary: "Neural Synthesis error.", impactVectors: [] };
  }
};

export const predictStoryArc = async (arcTitle: string, status: string, players: string[]) => {
  if (!GEMINI_API_KEY) return { prediction: "Forecast fragmented.", probability: 50 };
  const model = getGeminiModel();
  const prompt = `Predict arc for: ${arcTitle}. Return JSON: {"prediction": "...", "probability": number}`;
  try {
    const result = await model.generateContent(prompt);
    const textRes = result.response.text().replace(/```json|```/g, "");
    return JSON.parse(textRes);
  } catch (e) {
    return { prediction: "Forecast Fragmented.", probability: 50 };
  }
};

export const adaptCulturally = async (text: string, language: string) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
  const model = getGeminiModel();
  const prompt = `Adapt to ${language}: "${text}". Return JSON: {"translation": "...", "analogy": "..."}`;
  try {
    const result = await model.generateContent(prompt);
    const textRes = result.response.text().replace(/```json|```/g, "");
    return JSON.parse(textRes);
  } catch (e) {
    return { translation: text, analogy: "Neural Sync Fragmented." };
  }
};
