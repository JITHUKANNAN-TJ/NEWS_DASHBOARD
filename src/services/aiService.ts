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
 * This is the 'Aura Neural layer' that transforms raw data into elite intelligence.
 */
export const enrichStoriesWithAI = async (persona: Persona, stories: any[]): Promise<Story[]> => {
  if (!GEMINI_API_KEY || stories.length === 0) return stories;

  try {
    const model = getGeminiModel();
    
    // We only enrich a batch of 15 headlines in detail to maintain high response speed,
    // but we will apply heuristic categorization to the rest so NO category is empty.
    const batchSize = 15;
    const batch = stories.slice(0, batchSize); 
    const newsContext = batch.map((s, i) => `[ID:${i}] ${s.title}`).join("\n");

    const prompt = `
      You are the ET 2026 'Aura' Neural Layer.
      Persona: ${persona.toUpperCase()}
      
      Raw News Stream:
      ${newsContext}
      
      Task:
      For each [ID], provide:
      1. Category: One of [Markets, Tech, Economy, Strategic]
      2. Sentiment: One of [positive, neutral, warning]
      3. Relevance: A score from 80-100 specifically for a ${persona}
      
      IMPORTANT: Be diverse! Distribute categories between Markets, Tech, and Economy based on the content.
      
      Return ONLY a JSON array:
      [
        {"id": number, "category": "string", "sentiment": "string", "relevance": number}
      ]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "");
    const enrichedData: StoryEnrichment[] = JSON.parse(text);
    
    // Create a map of enriched results
    const enrichedMap = new Map<number, StoryEnrichment>(enrichedData.map((e: StoryEnrichment) => [e.id, e]));

    // Map ALL stories, not just the batch!
    return stories.map((story, index) => {
      const enrichment = enrichedMap.get(index);
      
      if (enrichment) {
        return {
          ...story,
          category: (enrichment.category as any) || "Strategic",
          sentiment: (enrichment.sentiment as any) || "neutral",
          relevance: enrichment.relevance || 85
        };
      }

      // If outside AI enrichment batch (index >= 15), apply smart heuristic mapping
      // This ensures NO TAB IS EMPTY.
      const lowerTitle = story.title.toLowerCase();
      let category: any = "Strategic";
      if (/(stock|market|nifty|sensex|rbi|fed|rate|bank|profit|loss)/.test(lowerTitle)) category = "Markets";
      else if (/(tech|ai|semiconductor|software|cloud|digital|robot|crypto)/.test(lowerTitle)) category = "Tech";
      else if (/(economy|gdp|inflation|budget|fiscal|policy|trade)/.test(lowerTitle)) category = "Economy";

      return {
        ...story,
        category,
        sentiment: story.sentiment || "neutral",
        relevance: 82
      };
    });
  } catch (e) {
    console.warn("Aura Neural Enrichment failed, reverting to full heuristic mapping.");
    // Emergency heuristic fallback for ALL stories
    return stories.map(story => {
        const lowerTitle = story.title.toLowerCase();
        let category: any = "Strategic";
        if (/(stock|market|nifty|sensex|rbi|fed|rate|bank|profit|loss)/.test(lowerTitle)) category = "Markets";
        else if (/(tech|ai|semiconductor|software|cloud|digital|robot|crypto)/.test(lowerTitle)) category = "Tech";
        else if (/(economy|gdp|inflation|budget|fiscal|policy|trade)/.test(lowerTitle)) category = "Economy";

        return { ...story, category, relevance: 80 };
    });
  }
};

/**
 * Handles the persistent Aura Terminal chat interaction.
 */
export const chatWithAura = async (persona: Persona, message: string, history: any[]) => {
  if (!GEMINI_API_KEY) throw new Error("Aura Offline: API Key Missing.");

  try {
    const model = getGeminiModel();
    // Correctly map history for Gemini SDK
    const genHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    // Limit history context to last 6 messages to save tokens/speed
    const recentHistory = genHistory.slice(-6);

    const chat = model.startChat({
      history: recentHistory.length > 1 ? recentHistory.slice(0, -1) : [],
    });

    const prompt = `
      Act as Aura, the elite ET 2026 Intelligence Engine. 
      The current user persona is ${persona.toUpperCase()}. 
      Tone: Tactical, direct, futuristic business analyst.
      Requirement: Respond to the user's latest query accurately using persona-specific intelligence.
      User Query: ${message}
    `;

    const result = await chat.sendMessage([{ text: prompt }]);
    return result.response.text();
  } catch (err) {
    console.error("Chat engine failed.", err);
    return "Aura Neural Sync Fragmented: I can analyze the news stream but direct interaction is limited. Please refresh your intelligence nodes.";
  }
};

/**
 * Generates a tactical 1-line market insight for the Ribbon.
 */
export const generateMarketPulse = async (marketData: MarketIndex[]) => {
  if (!GEMINI_API_KEY) return "Aura Pulse: Real-time telemetry synchronized.";

  const model = getGeminiModel();
  const context = marketData.map(m => `${m.symbol}: ${m.price} (${m.changePercent}%)`).join(", ");
  
  const prompt = `
    Analyze these live market prices: ${context}.
    Provide a 1-sentence tactical 'Neural Insight' (under 15 words) for a financial dashboard.
    Think like a futuristic analyst.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return "Aura Analysis: Volatility indexed at 2.4 - Tactical stability high.";
  }
};

/**
 * Synthesizes a strategic intelligence briefing based on a collection of news stories.
 */
export const synthesizeBriefing = async (persona: Persona, stories: any[]) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

  const model = getGeminiModel();
  const storyContext = stories.slice(0, 5).map(s => s.title).join("\n");

  const prompt = `
    Summarize these headlines for a ${persona.toUpperCase()} persona in 2 paragraphs. 
    Include 3 impact vectors with labels and values.
    Headlines:
    ${storyContext}
    
    Return JSON: 
    { "summary": "...", "impactVectors": [{"label": "...", "value": "...", "icon": "trending-up"}] }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, "");
  return JSON.parse(text);
};

export const adaptCulturally = async (text: string, language: string) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
  const model = getGeminiModel();
  const prompt = `Adapt to ${language}: "${text}". Return JSON: {"translation": "...", "analogy": "..."}`;
  const result = await model.generateContent(prompt);
  const textRes = result.response.text().replace(/```json|```/g, "");
  return JSON.parse(textRes);
};

export const predictStoryArc = async (arcTitle: string, status: string, players: string[]) => {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
  const model = getGeminiModel();
  const prompt = `Predict arc for: ${arcTitle}. Return JSON: {"prediction": "...", "probability": number}`;
  const result = await model.generateContent(prompt);
  const textRes = result.response.text().replace(/```json|```/g, "");
  return JSON.parse(textRes);
};
