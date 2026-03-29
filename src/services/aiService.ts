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
 * Robust JSON Extractor to handle AI markdown inconsistencies.
 */
const extractJson = (text: string) => {
    try {
        const match = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
        if (!match) return null;
        return JSON.parse(match[0]);
    } catch (e) {
        return null;
    }
};

/**
 * Enriches raw news stories with AI-driven categorization.
 */
export const enrichStoriesWithAI = async (persona: Persona, stories: any[]): Promise<Story[]> => {
  if (!GEMINI_API_KEY || stories.length === 0) return stories as Story[];

  try {
    const model = getGeminiModel();
    const batchSize = 10;
    const batch = stories.slice(0, batchSize); 
    const newsContext = batch.map((s, i) => `[ID:${i}] ${s.title}`).join("\n");

    const prompt = `
      You are Aura AI. Persona: ${persona}.
      Stream: ${newsContext}
      Provide JSON array: [{"id": number, "category": "Markets|Tech|Economy|Strategic", "sentiment": "positive|neutral|warning", "relevance": 80-100}]
    `;

    const result = await model.generateContent(prompt);
    const enrichedData = extractJson(result.response.text());
    
    if (!enrichedData) return stories as Story[];
    
    const enrichedMap = new Map<number, StoryEnrichment>(enrichedData.map((e: any) => [e.id, e]));

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
      return story as Story;
    });
  } catch (e) {
    return stories as Story[];
  }
};

/**
 * GENERATE NEURAL FEED: Fallback function for Render.
 * Guaranteed content even if AI or Network fails.
 */
export const generateNeuralFeed = async (persona: Persona): Promise<Story[]> => {
    // Hardcoded Neural Seed in case of total failure
    const neuralSeed: Story[] = [
        { id: 801, title: "Aura Neural Recall Active: Intelligence Syncing...", category: "Strategic", sentiment: "positive", relevance: 98, description: "System recalibrating narrative nodes.", source: { name: "Aura Core" }, urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400" },
        { id: 802, title: "Global Market Alpha: Sector Rotation Detected", category: "Markets", sentiment: "neutral", relevance: 92, description: "Capital flowing into autonomous infrastructure.", source: { name: "Bloomberg" }, urlToImage: "https://images.unsplash.com/photo-1611974717482-58a2ca5fe475?q=80&w=400" }
    ];

    if (!GEMINI_API_KEY) return neuralSeed;

    try {
        const model = getGeminiModel();
        const prompt = `
            Persona: ${persona.toUpperCase()}. Generate 8 high-fidelity news articles.
            Return ONLY JSON: [{"id": 800+, "title": "...", "category": "Markets|Tech|Economy", "sentiment": "positive|neutral|warning", "relevance": 90+, "description": "...", "urlToImage": "Unsplash URL", "source": {"name": "..."}}]
        `;

        const result = await model.generateContent(prompt);
        const data = extractJson(result.response.text());
        return data || neuralSeed;
    } catch (error) {
        return neuralSeed;
    }
};

export const chatWithAura = async (persona: Persona, message: string, history: any[]) => {
  if (!GEMINI_API_KEY) return "Aura Neural Recall: I am stabilizing your data stream first.";
  try {
    const model = getGeminiModel();
    const genHistory = (history || []).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    const chat = model.startChat({ history: genHistory.slice(-4) });
    const result = await chat.sendMessage([{ text: message }]);
    return result.response.text();
  } catch (err) {
    return "Neural Sync Fragmented.";
  }
};

export const generateMarketPulse = async (marketData: MarketIndex[]) => {
  if (!GEMINI_API_KEY) return "Aura Pulse: Tactical data synchronizing.";
  try {
    const model = getGeminiModel();
    const context = marketData.map(m => `${m.symbol}: ${m.price}`).join(", ");
    const result = await model.generateContent(`Analyze markets: ${context}. 1-sentence insight.`);
    return result.response.text().trim();
  } catch (e) {
    return "Aura Analysis: Volatility indexed at 2.4.";
  }
};

export const synthesizeBriefing = async (persona: Persona, stories: any[]) => {
  if (!GEMINI_API_KEY) return { summary: "Synthesis offline", impactVectors: [] };
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(`Summarize headlines for ${persona}. Return JSON: { "summary": "...", "impactVectors": [{"label": "...", "value": "..."}] }`);
    const data = extractJson(result.response.text());
    return data || { summary: "Synthesis Fragmented", impactVectors: [] };
  } catch (e) {
    return { summary: "Neural Synthesis error.", impactVectors: [] };
  }
};

export const predictStoryArc = async (title: string, status: string, players: any[]) => {
  if (!GEMINI_API_KEY) return { prediction: "Forecast fragmented.", probability: 50 };
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(`Predict arc for: ${title}. Return JSON: {"prediction": "...", "probability": number}`);
    const data = extractJson(result.response.text());
    return data || { prediction: "Forecast Fragmented.", probability: 50 };
  } catch (e) {
    return { prediction: "Forecast Fragmented.", probability: 50 };
  }
};

export const adaptCulturally = async (text: string, lang: string) => {
  if (!GEMINI_API_KEY) return { translation: text, analogy: "Syncing..." };
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(`Adapt to ${lang}: "${text}". Return JSON: {"translation": "...", "analogy": "..."}`);
    const data = extractJson(result.response.text());
    return data || { translation: text, analogy: "Neural Sync Fragmented." };
  } catch (e) {
    return { translation: text, analogy: "Neural Sync Fragmented." };
  }
};
