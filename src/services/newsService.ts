import { Story, Persona } from '../types';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByPersona = async (persona: Persona): Promise<Story[]> => {
  if (!API_KEY) {
    console.warn('NewsAPI Key missing. Falling back to mock data.');
    return [];
  }

  // Map persona to relevant search queries
  const queryMap: Record<Persona, string> = {
    investor: 'stock market OR Sensex OR Nifty OR investment',
    founder: 'startup OR funding OR unicorn OR venture capital',
    student: 'finance explainer OR economy basics OR business education'
  };

  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(queryMap[persona])}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.articles.map((article: any, index: number) => ({
      id: index + 100, // Offset for dynamic IDs
      title: article.title,
      category: persona.charAt(0).toUpperCase() + persona.slice(1),
      sentiment: analyzeSentiment(article.title),
      relevance: Math.floor(Math.random() * (99 - 85 + 1)) + 85, // Mock relevance for now
      urlToImage: article.urlToImage,
      description: article.description,
      source: article.source
    }));
  } catch (error) {
    console.error('Failed to fetch live news:', error);
    throw error;
  }
};

const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'warning' => {
  const positiveWords = ['surge', 'growth', 'gain', 'rise', 'profit', 'expansion', 'buy', 'win'];
  const negativeWords = ['slump', 'drop', 'fall', 'loss', 'crisis', 'crash', 'sell', 'warning', 'inflation'];
  
  const lowerText = text.toLowerCase();
  
  if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
  if (negativeWords.some(word => lowerText.includes(word))) return 'warning';
  return 'neutral';
};
