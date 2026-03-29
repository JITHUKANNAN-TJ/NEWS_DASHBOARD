import { Story, Persona } from '../types';
import { enrichStoriesWithAI, generateNeuralFeed } from './aiService';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Tactical News Service to fetch REAL WORLD data.
 * Includes a Neural Fallback for production domains (Render/Vercel) where NewsAPI is blocked.
 */
export const fetchNewsByPersona = async (persona: Persona): Promise<Story[]> => {
  // Tactical Query Map for Real-World Depth
  const queryMap: Record<Persona, string> = {
    investor: '(Nifty OR Sensex OR Stock Market OR Fed Rates OR RBI Policy OR Bloomberg)',
    founder: '(Startup Funding OR Venture Capital OR SaaS OR IPO OR AI Startup OR TechCrunch)',
    student: '(Business Fundamentals OR Economics Explained OR Macroeconomics OR Career Strategy)'
  };

  try {
    if (!API_KEY) {
      console.warn('NewsAPI Key missing. Reverting to Aura Neural Recall.');
      return await generateNeuralFeed(persona);
    }

    // Attempt to fetch live global data
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(queryMap[persona])}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${API_KEY}`
    );

    // NewsAPI Free Tier blocks requests from non-localhost domains (like Render)
    // If we get a 426 (Upgrade Required) or 403, we switch to Neural Fallback.
    if (response.status === 426 || response.status === 403) {
      console.warn('NewsAPI Domain Block detected. Activating Aura Neural Recall mode.');
      return await generateNeuralFeed(persona);
    }

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Initial Heuristic Mapping (Categories, Sentiment)
    const rawStories = data.articles.map((article: any, index: number) => ({
      id: index + 500,
      title: article.title,
      category: "Strategic", 
      sentiment: analyzeSentimentHeuristic(article.title),
      relevance: 85, 
      urlToImage: article.urlToImage,
      description: article.description,
      source: article.source
    }));

    // Neural Enrichment Layer
    const enriched = await enrichStoriesWithAI(persona, rawStories);
    return enriched;

  } catch (error) {
    console.error('Global Intel Sync Fragmented. Activating Aura Neural Recall.');
    // Emergency Fallback: If network fails or CORS blocks, use AI-generated feed.
    try {
        return await generateNeuralFeed(persona);
    } catch (fallbackError) {
        console.error('Neural Fallback failed.', fallbackError);
        throw error;
    }
  }
};

const analyzeSentimentHeuristic = (text: string): 'positive' | 'neutral' | 'warning' => {
  const higherText = (text || "").toLowerCase();
  if (/(surge|gain|profit|rise|beat|high|bullish)/.test(higherText)) return 'positive';
  if (/(slump|fall|loss|drop|miss|warning|bearish)/.test(higherText)) return 'warning';
  return 'neutral';
};
