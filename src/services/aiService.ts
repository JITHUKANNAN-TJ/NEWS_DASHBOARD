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

const extractJson = (text: string) => {
    try {
        const match = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
        if (!match) return null;
        return JSON.parse(match[0]);
    } catch (e) {
        return null;
    }
};

export const enrichStoriesWithAI = async (persona: Persona, stories: any[]): Promise<Story[]> => {
  if (!GEMINI_API_KEY || stories.length === 0) return stories as Story[];
  try {
    const model = getGeminiModel();
    const batch = stories.slice(0, 10); 
    const newsContext = batch.map((s, i) => `[ID:${i}] ${s.title}`).join("\n");
    const result = await model.generateContent(`Persona: ${persona}. Provide JSON array: [{"id": number, "category": "Markets|Tech|Economy|Strategic", "sentiment": "positive|neutral|warning", "relevance": 80-100}] for: ${newsContext}`);
    const enrichedData = extractJson(result.response.text());
    if (!enrichedData) return stories as Story[];
    const enrichedMap = new Map<number, StoryEnrichment>(enrichedData.map((e: any) => [e.id, e]));
    return stories.map((story, index) => {
      const enrichment = enrichedMap.get(index);
      return enrichment ? { ...story, category: (enrichment.category as any) || "Strategic", sentiment: (enrichment.sentiment as any) || "neutral", relevance: enrichment.relevance || 85 } : story as Story;
    });
  } catch (e) {
    return stories as Story[];
  }
};

/**
 * GENERATE NEURAL FEED: Fallback function for Render.
 * Expanded to 12+ High-Fidelity Tactical Signals.
 */
export const generateNeuralFeed = async (persona: Persona): Promise<Story[]> => {
    const neuralSeed: Story[] = [
        { id: 801, title: "Aura Neural Recall: Global Signal Syncing...", category: "Strategic", sentiment: "positive", relevance: 98, description: "Intelligence nodes recalibrating for 2026 tactical baseline.", source: { name: "Aura Core" }, urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600" },
        { id: 802, title: "Capital Alpha: Institutional Sector Rotation Detected", category: "Markets", sentiment: "neutral", relevance: 92, description: "Shift from legacy equities to autonomous infrastructure assets.", source: { name: "Bloomberg Intelligence" }, urlToImage: "https://images.unsplash.com/photo-1611974717482-58a2ca5fe475?q=80&w=600" },
        { id: 803, title: "Neural Compute Shortage Predicted for Q3 2026", category: "Tech", sentiment: "warning", relevance: 95, description: "Regional data center demand exceeds current grid capacity.", source: { name: "TechCrunch Neural" }, urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600" },
        { id: 804, title: "RBI Holds Repo Rates Amid Global Inflation Cooling", category: "Economy", sentiment: "positive", relevance: 88, description: "Monetary policy remains focused on long-term stability goals.", source: { name: "Financial Express" }, urlToImage: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600" },
        { id: 805, title: "Nifty 2026 Outlook: 32,000 Target on Earnings Momentum", category: "Markets", sentiment: "positive", relevance: 94, description: "Analysts project 14% growth in blue-chip valuation segments.", source: { name: "ET Markets" }, urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600" },
        { id: 806, title: "The Sovereign Cloud: India's New Data Defense Strategy", category: "Tech", sentiment: "positive", relevance: 91, description: "Indigenous infrastructure nodes reaching critical mass.", source: { name: "The Economic Times" }, urlToImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600" },
        { id: 807, title: "Energy Grid Upgrade: Solar Integration Hits Record High", category: "Economy", sentiment: "positive", relevance: 86, description: "Renewable baseload stabilizes industrial production costs.", source: { name: "Aura Network" }, urlToImage: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=600" },
        { id: 808, title: "Global Supply Chain 2.0: The Rise of Southeast Corridors", category: "Strategic", sentiment: "neutral", relevance: 84, description: "New logistics protocols cutting delivery latency by 30%.", source: { name: "Logistics Intelligence" }, urlToImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600" },
        { id: 809, title: "VC Sentiment Survey: Seed Stage Activity Rebounds", category: "Tech", sentiment: "positive", relevance: 97, description: "Founders focusing on hardware-first AI solutions see 2x valuation.", source: { name: "Founder Intel" }, urlToImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600" },
        { id: 810, title: "Interest Rate Reset: What it Means for Your Portfolio", category: "Markets", sentiment: "warning", relevance: 93, description: "Strategic debt restructuring recommended for long-term holders.", source: { name: "Aura Advisor" }, urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600" },
        { id: 811, title: "The Next Billion Users: Digital Onboarding Surges", category: "Economy", sentiment: "positive", relevance: 89, description: "Rural connectivity leads to massive retail banking expansion.", source: { name: "RBI Network" }, urlToImage: "https://images.unsplash.com/photo-1512428559083-a401c338e4a7?q=80&w=600" },
        { id: 812, title: "Fusion Breakthrough: First Commercial Grid Prototype Test", category: "Tech", sentiment: "positive", relevance: 99, description: "Clean baseline power project moves into final neural verification.", source: { name: "Scientific Aura" }, urlToImage: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600" }
    ];

    if (!GEMINI_API_KEY) return neuralSeed;

    try {
        const model = getGeminiModel();
        const result = await model.generateContent(`Persona: ${persona.toUpperCase()}. Generate 12 realistic 2026 news articles. Return ONLY JSON array: [{"id": 800+, "title": "...", "category": "Markets|Tech|Economy", "sentiment": "positive|neutral|warning", "relevance": 90+, "description": "...", "urlToImage": "Unsplash URL", "source": {"name": "..."}}]`);
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
    const chat = model.startChat({ history: (history || []).map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })).slice(-4) });
    const result = await chat.sendMessage([{ text: message }]);
    return result.response.text();
  } catch (err) {
    return "Neural Sync Fragmented.";
  }
};

export const generateMarketPulse = async (marketData: MarketIndex[]) => {
  if (!GEMINI_API_KEY) return "Aura Pulse: Tactical data synchronizing.";
  try {
    const result = await (getGeminiModel()).generateContent(`Analyze markets: ${marketData.map(m => `${m.symbol}: ${m.price}`).join(", ")}. 1-sentence insight.`);
    return result.response.text().trim();
  } catch (e) {
    return "Aura Analysis: Volatility indexed at 2.4.";
  }
};

export const synthesizeBriefing = async (persona: Persona, stories: any[]) => {
  if (!GEMINI_API_KEY) return { summary: "Synthesis offline", impactVectors: [] };
  try {
    const result = await (getGeminiModel()).generateContent(`Summarize headlines for ${persona}. Return JSON: { "summary": "...", "impactVectors": [{"label": "...", "value": "..."}] }`);
    const data = extractJson(result.response.text());
    return data || { summary: "Synthesis Fragmented", impactVectors: [] };
  } catch (e) {
    return { summary: "Neural Synthesis error.", impactVectors: [] };
  }
};

export const predictStoryArc = async (title: string, status: string, players: any[]) => {
  if (!GEMINI_API_KEY) return { prediction: "Forecast fragmented.", probability: 50 };
  try {
    const result = await (getGeminiModel()).generateContent(`Predict arc for: ${title}. Return JSON: {"prediction": "...", "probability": number}`);
    const data = extractJson(result.response.text());
    return data || { prediction: "Forecast Fragmented.", probability: 50 };
  } catch (e) {
    return { prediction: "Forecast Fragmented.", probability: 50 };
  }
};

export const adaptCulturally = async (text: string, lang: string) => {
  if (!GEMINI_API_KEY) return { translation: text, analogy: "Syncing..." };
  try {
    const result = await (getGeminiModel()).generateContent(`Adapt to ${lang}: "${text}". Return JSON: {"translation": "...", "analogy": "..."}`);
    const data = extractJson(result.response.text());
    return data || { translation: text, analogy: "Neural Sync Fragmented." };
  } catch (e) {
    return { translation: text, analogy: "Neural Sync Fragmented." };
  }
};
