import { LucideIcon } from 'lucide-react';

export type Persona = 'investor' | 'founder' | 'student';

export interface PersonaConfig {
  title: string;
  gradient: string;
  icon: LucideIcon;
  description: string;
}

export interface Story {
  id: number;
  title: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'warning';
  relevance: number;
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
