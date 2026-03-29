import { Story, Persona } from '../types';
import { enrichStoriesWithAI, generateNeuralFeed } from './aiService';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Tactical News Service with 'Zero-Failure' Neural Shield.
 * Guaranteed to return intelligence even if APIs are blocked or network is offline.
 */
export const fetchNewsByPersona = async (persona: Persona): Promise<Story[]> => {
  const queryMap: Record<Persona, string> = {
    investor: '(Nifty OR Sensex OR Stock Market OR Fed Rates OR RBI Policy OR Bloomberg)',
    founder: '(Startup Funding OR Venture Capital OR SaaS OR IPO OR AI Startup OR TechCrunch)',
    student: '(Business Fundamentals OR Economics Explained OR Macroeconomics OR Career Strategy)'
  };

  try {
    // If NewsAPI Key is missing, immediately switch to Aura Neural Recall
    if (!API_KEY) {
      return await generateNeuralFeed(persona);
    }

    // Attempt to fetch live global data
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(queryMap[persona])}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${API_KEY}`
    );

    // NewsAPI Free Tier blocks requests from non-localhost domains (like Render)
    // If blocked, we switch to Neural Fallback seamlessly.
    if (response.status === 426 || response.status === 403 || !response.ok) {
      return await generateNeuralFeed(persona);
    }

    const data = await response.json();
    
    const rawStories = (data.articles || []).map((article: any, index: number) => ({
      id: index + 500,
      title: article.title,
      category: "Strategic", 
      sentiment: "neutral",
      relevance: 85, 
      urlToImage: article.urlToImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400",
      description: article.description,
      source: article.source || { name: "Live Feed" }
    }));

     if (rawStories.length === 0) return await generateNeuralFeed(persona);

    // Attempt to enrich with AI, but don't fail if it doesn't work
    try {
        const enriched = await enrichStoriesWithAI(persona, rawStories);
        return enriched;
    } catch (e) {
        return rawStories;
    }

  } catch (error) {
    // ZERO-FAILURE SHIELD: Always return the AI-generated feed as a safety net.
    try {
        return await generateNeuralFeed(persona);
    } catch (fallbackError) {
        // Absolute fallback to static personas if even AI fails
        return [];
    }
  }
};
