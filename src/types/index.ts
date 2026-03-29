import { LucideIcon } from 'lucide-react';

export type Persona = 'investor' | 'founder' | 'student';

export interface PersonaConfig {
  title: string;
  gradient: string;
  icon: LucideIcon;
  description: string;
}

export interface StoryAnalysis {
  sentimentLabel: string;
  sentimentDetail: string;
  actionLabel: string;
  actionDetail: string;
  neuralBreakdown: string;
}

export interface Story {
  id: number;
  title: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'warning';
  relevance: number;
  urlToImage?: string;
  description?: string;
  source: {
    name: string;
  };
  analysis?: StoryAnalysis;
}

export interface StoryArc {
  id: string;
  title: string;
  status: string;
  players: string[];
  timeline: string[];
  sentiment: 'bullish' | 'neutral' | 'bearish';
  coverage: number;
}

export interface VideoSample {
  title: string;
  duration: string;
  status: 'Ready' | 'Processing' | 'New';
}

export interface VernacularItem {
  title: string;
  excerpt: string;
  language: string;
}
