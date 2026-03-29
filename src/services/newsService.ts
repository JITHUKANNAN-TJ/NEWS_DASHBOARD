import { Story, Persona } from '../types';
import { enrichStoriesWithAI } from './aiService';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Tactical News Service to fetch REAL WORLD data.
 * Replaces mock stories with a live 100-article global stream.
 */
export const fetchNewsByPersona = async (persona: Persona): Promise<Story[]> => {
  if (!API_KEY) {
    console.warn('NewsAPI Key missing. Falling back to mock data.');
    return [];
  }

  // Tactical Query Map for Real-World Depth
  const queryMap: Record<Persona, string> = {
    investor: '(Nifty OR Sensex OR Stock Market OR Fed Rates OR RBI Policy OR Bloomberg)',
    founder: '(Startup Funding OR Venture Capital OR SaaS OR IPO OR AI Startup OR TechCrunch)',
    student: '(Business Fundamentals OR Economics Explained OR Macroeconomics OR Career Strategy)'
  };

  try {
    // Increase pageSize to 100 for 'Real Platform' depth
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(queryMap[persona])}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Initial Heuristic Mapping (Categories, Sentiment)
    const rawStories = data.articles.map((article: any, index: number) => ({
      id: index + 500,
      title: article.title,
      category: "Strategic", // Default, will be enriched by AI
      sentiment: analyzeSentimentHeuristic(article.title),
      relevance: 85, // Default, will be enriched by AI
      urlToImage: article.urlToImage,
      description: article.description,
      source: article.source
    }));

    // Neural Enrichment Layer (Optional Batching)
    // We only enrich the first 15 to maintain initial load performance
    const enriched = await enrichStoriesWithAI(persona, rawStories);
    
    return enriched;
  } catch (error) {
    console.error('Global Intel Sync Failed:', error);
    throw error;
  }
};

const analyzeSentimentHeuristic = (text: string): 'positive' | 'neutral' | 'warning' => {
  const higherText = text.toLowerCase();
  if (/(surge|gain|profit|rise|beat|high|bullish)/.test(higherText)) return 'positive';
  if (/(slump|fall|loss|drop|miss|warning|bearish)/.test(higherText)) return 'warning';
  return 'neutral';
};
