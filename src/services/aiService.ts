import { GoogleGenerativeAI } from "@google/generative-ai";
import { Persona, Story, StoryAnalysis } from "../types";
import { MarketIndex } from "./marketService";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

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

/**
 * Enriches raw news stories with AI-driven categorization AND Deep Analysis.
 */
export const enrichStoriesWithAI = async (persona: Persona, stories: any[]): Promise<Story[]> => {
  if (!GEMINI_API_KEY || stories.length === 0) return stories as Story[];
  try {
    const model = getGeminiModel();
    const batch = stories.slice(0, 10); 
    const newsContext = batch.map((s, i) => `[ID:${i}] ${s.title}`).join("\n");
    
    const prompt = `
      Persona: ${persona.toUpperCase()}.
      Task: For each news ID, provide Category (Markets|Tech|Economy), Sentiment (positive|neutral|warning), and a DEEP ANALYSIS object.
      Analysis object: {"sentimentLabel": "BULLISH|BEARISH|NEUTRAL", "sentimentDetail": "1 sentence detail", "actionLabel": "CRITICAL|MONITOR|ADJUST", "actionDetail": "1 sentence action", "neuralBreakdown": "2 sentence neural insight"}
      Return JSON array of items with "id" and "analysis".
      News: ${newsContext}
    `;

    const result = await model.generateContent(prompt);
    const enrichedData = extractJson(result.response.text());
    if (!enrichedData) return stories as Story[];
    const enrichedMap = new Map<number, any>(enrichedData.map((e: any) => [e.id, e]));

    return stories.map((story, index) => {
      const enrichment = enrichedMap.get(index);
      return enrichment ? { 
        ...story, 
        category: enrichment.category || story.category,
        sentiment: enrichment.sentiment || story.sentiment,
        analysis: enrichment.analysis 
      } : story as Story;
    });
  } catch (e) {
    return stories as Story[];
  }
};

/**
 * GENERATE NEURAL FEED: Fallback function for Render.
 * Guaranteed content with UNIQUE Analysis objects for each story.
 */
export const generateNeuralFeed = async (persona: Persona): Promise<Story[]> => {
    const neuralSeed: Story[] = [
        { 
          id: 801, title: "Aura Neural Recall: Global Signal Syncing...", category: "Strategic", sentiment: "positive", relevance: 98, description: "Intelligence nodes recalibrating for 2026 tactical baseline.", source: { name: "Aura Core" }, urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Aura signals high accumulation in adjacent sectors. Volatility remains indexed.",
            actionLabel: "MONITOR",
            actionDetail: "Observe sector rotation patterns for 72 hours before expanding exposure.",
            neuralBreakdown: "System-wide recalibration shows an 87% correlation with prior upward macro-cycles."
          }
        },
        { 
          id: 802, title: "Capital Alpha: Institutional Sector Rotation Detected", category: "Markets", sentiment: "neutral", relevance: 92, description: "Shift from legacy equities to autonomous infrastructure assets.", source: { name: "Bloomberg" }, urlToImage: "https://images.unsplash.com/photo-1611974717482-58a2ca5fe475?q=80&w=600",
          analysis: {
            sentimentLabel: "NEUTRAL",
            sentimentDetail: "Institutional volume is masking a short-term liquidity trap in growth stocks.",
            actionLabel: "ADJUST",
            actionDetail: "Rebalance core weightings toward infrastructure and defensives.",
            neuralBreakdown: "Capital flow vectors are shifting toward energy-dense computing corridors."
          }
        },
        { 
          id: 803, title: "Neural Compute Shortage Predicted for Q3 2026", category: "Tech", sentiment: "warning", relevance: 95, description: "Regional data center demand exceeds current grid capacity.", source: { name: "TechCrunch" }, urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600",
          analysis: {
            sentimentLabel: "CAUTIOUS",
            sentimentDetail: "Supply chain bottlenecks for H300-equivalent clusters are intensifying.",
            actionLabel: "CRITICAL",
            actionDetail: "Secure reserved compute capacity for high-priority neural operations.",
            neuralBreakdown: "Energy grid stability in tech corridors is currently the primary vector of risk."
          }
        },
        { 
          id: 804, title: "RBI Holds Repo Rates Amid Global Inflation Cooling", category: "Economy", sentiment: "positive", relevance: 88, description: "Monetary policy remains focused on long-term stability goals.", source: { name: "Financial Express" }, urlToImage: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Steady rates provide clear predictability for medium-term capex cycles.",
            actionLabel: "MONITOR",
            actionDetail: "Watch fiscal deficit targets in upcoming quarterly reviews.",
            neuralBreakdown: "Currency stability is attracting significant institutional inflow."
          }
        },
        { 
          id: 805, title: "Nifty 2026 Outlook: 32,000 Target on Earnings Momentum", category: "Markets", sentiment: "positive", relevance: 94, description: "Analysts project 14% growth in blue-chip valuation segments.", source: { name: "ET Markets" }, urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Corporate earnings multiples are expanding due to efficiency gains.",
            actionLabel: "ADJUST",
            actionDetail: "Increase exposure to large-cap technology and materials.",
            neuralBreakdown: "Market momentum is diverging from traditional macro indicators due to neural efficiency."
          }
        },
        { 
          id: 806, title: "The Sovereign Cloud: India's New Data Defense Strategy", category: "Tech", sentiment: "positive", relevance: 91, description: "Indigenous infrastructure nodes reaching critical mass.", source: { name: "The Economic Times" }, urlToImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Data sovereignty is creating a multi-billion dollar domestic cloud market.",
            actionLabel: "ADJUST",
            actionDetail: "Prioritize investments in regional data centers and cooling tech.",
            neuralBreakdown: "Infrastructure-level localization is de-risking geopolitical data threats."
          }
        },
        { 
          id: 807, title: "Energy Grid Upgrade: Solar Integration Hits Record High", category: "Economy", sentiment: "positive", relevance: 86, description: "Renewable baseload stabilizes industrial production costs.", source: { name: "Aura Network" }, urlToImage: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=600",
          analysis: {
            sentimentLabel: "NEUTRAL",
            sentimentDetail: "Grid storage capacity must expand significantly to handle solar peak flows.",
            actionLabel: "MONITOR",
            actionDetail: "Focus on grid-scale battery and pumped hydro infrastructure.",
            neuralBreakdown: "Transition from peak-based to buffer-based energy models is underway."
          }
        },
        { 
          id: 808, title: "Global Supply Chain 2.0: The Rise of Southeast Corridors", category: "Strategic", sentiment: "neutral", relevance: 84, description: "New logistics protocols cutting delivery latency by 30%.", source: { name: "Logistics Intel" }, urlToImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600",
          analysis: {
            sentimentLabel: "NEUTRAL",
            sentimentDetail: "Logistics automation is offsetting rising localized manufacturing costs.",
            actionLabel: "MONITOR",
            actionDetail: "Assess maritime and rail corridor efficiency metrics quarterly.",
            neuralBreakdown: "Physical goods movement is being optimized via Aura-level predictive routing."
          }
        },
        { 
          id: 809, title: "VC Sentiment Survey: Seed Stage Activity Rebounds", category: "Tech", sentiment: "positive", relevance: 97, description: "Founders focusing on hardware-first AI solutions see 2x valuation.", source: { name: "Founder Intel" }, urlToImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Dry powder is finally being deployed into deep-tech hardware startups.",
            actionLabel: "ADJUST",
            actionDetail: "Increase angel network volume in edge-computing and robotics.",
            neuralBreakdown: "The market is moving past 'Software-only' AI toward physical world integration."
          }
        },
        { 
          id: 810, title: "Interest Rate Reset: What it Means for Your Portfolio", category: "Markets", sentiment: "warning", relevance: 93, description: "Strategic debt restructuring recommended for long-term holders.", source: { name: "Aura Advisor" }, urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600",
          analysis: {
            sentimentLabel: "CAUTIOUS",
            sentimentDetail: "Bond yields are signaling a potential shift in long-term inflation targets.",
            actionLabel: "CRITICAL",
            actionDetail: "Hedge fixed-income positions and reduce debt exposure by 15%.",
            neuralBreakdown: "Neural growth is decoupling from debt-based expansion for the first time."
          }
        },
        { 
          id: 811, title: "The Next Billion Users: Digital Onboarding Surges", category: "Economy", sentiment: "positive", relevance: 89, description: "Rural connectivity leads to massive retail banking expansion.", source: { name: "RBI Network" }, urlToImage: "https://images.unsplash.com/photo-1512428559083-a401c338e4a7?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Digital-first banking is capturing the informal credit market sector.",
            actionLabel: "ADJUST",
            actionDetail: "Look for retail banking and fintech alpha in Tier-3 cities.",
            neuralBreakdown: "Network effects in rural finance are reaching a critical exponential point."
          }
        },
        { 
          id: 812, title: "Fusion Breakthrough: First Commercial Grid Prototype Test", category: "Tech", sentiment: "positive", relevance: 99, description: "Clean baseline power project moves into final neural verification.", source: { name: "Scientific Aura" }, urlToImage: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600",
          analysis: {
            sentimentLabel: "BULLISH",
            sentimentDetail: "Abundant clean energy would effectively end energy-based inflation cycles.",
            actionLabel: "MONITOR",
            actionDetail: "Investigate early-stage material science firms linked to fusion core R&D.",
            neuralBreakdown: "Technological singularity event approaching. Energy scarcity vectors declining."
          }
        }
    ];

    if (!GEMINI_API_KEY) return neuralSeed;

    try {
        const model = getGeminiModel();
        const prompt = `
            Persona: ${persona.toUpperCase()}. Generate 12 realistic 2026 news articles.
            Requirement: For EVERY article, you MUST provide a unique "analysis" object.
            Analysis object: {"sentimentLabel": "...", "sentimentDetail": "...", "actionLabel": "...", "actionDetail": "...", "neuralBreakdown": "..."}
            Return ONLY JSON array: [{"id": 800+, "title": "...", "category": "Markets|Tech|Economy", "analysis": {...}, "urlToImage": "Unsplash URL", "source": {"name": "..."}}]
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
    const model = getGeminiModel();
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
    const model = getGeminiModel();
    const result = await (getGeminiModel()).generateContent(`Adapt to ${lang}: "${text}". Return JSON: {"translation": "...", "analogy": "..."}`);
    const data = extractJson(result.response.text());
    return data || { translation: text, analogy: "Neural Sync Fragmented." };
  } catch (e) {
    return { translation: text, analogy: "Neural Sync Fragmented." };
  }
};
