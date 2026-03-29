import { 
  TrendingUp, Zap, Globe, BarChart3, Video, Brain
} from 'lucide-react';
import { Persona, PersonaConfig, Story, StoryArc, VideoSample, VernacularItem } from '../types';

export const USER_PERSONAS: Persona[] = ['investor', 'founder', 'student'];

export const PERSONA_CONFIG: Record<Persona, PersonaConfig> = {
  investor: {
    title: 'Portfolio Watchlist',
    gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    icon: TrendingUp,
    description: 'Markets. Portfolios. Moves that matter.'
  },
  founder: {
    title: 'Startup Intelligence',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    icon: Zap,
    description: 'Funding. Competitors. Your competitive edge.'
  },
  student: {
    title: 'Business Explainers',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    icon: Globe,
    description: 'Learn. Understand. Master business news.'
  }
};

export const PERSONA_STORIES: Record<Persona, Story[]> = {
  investor: [
    { id: 1, title: 'RIL Q3 Earnings Beat Expectations', category: 'Markets', sentiment: 'positive', relevance: 95 },
    { id: 2, title: 'Nifty 50 Reaches New All-Time High', category: 'Index', sentiment: 'positive', relevance: 92 },
    { id: 3, title: 'Tech Sector Volatility: What It Means', category: 'Analysis', sentiment: 'neutral', relevance: 88 },
  ],
  founder: [
    { id: 1, title: '$2B Funding Round for Indian AI Startup', category: 'Funding', sentiment: 'positive', relevance: 98 },
    { id: 2, title: 'SoftBank Backs 5 New Startups This Month', category: 'Funding', sentiment: 'positive', relevance: 94 },
    { id: 3, title: 'Competitor Launches New Product Line', category: 'Competition', sentiment: 'warning', relevance: 91 },
  ],
  student: [
    { id: 1, title: 'What is Quantitative Easing? A Starter Guide', category: 'Explainer', sentiment: 'neutral', relevance: 100 },
    { id: 2, title: 'Understanding Cryptocurrency Regulation', category: 'Explainer', sentiment: 'neutral', relevance: 96 },
    { id: 3, title: 'ESG Investing Explained in 5 Minutes', category: 'Explainer', sentiment: 'neutral', relevance: 94 },
  ]
};

export const STORY_ARCS: StoryArc[] = [
  {
    id: 'ai-chip-race',
    title: 'The Great AI Chip Race',
    status: 'Breaking',
    players: ['NVIDIA', 'Apple', 'Intel', 'Qualcomm'],
    timeline: ['Announcement', 'Prototype', 'Beta Launch', 'Production'],
    sentiment: 'bullish',
    coverage: 47
  },
  {
    id: 'fintech-boom',
    title: "India's Fintech Revolution 2026",
    status: 'Ongoing',
    players: ['Paytm', 'PhonePe', 'PolicyBazaar', 'BharatPe'],
    timeline: ['Regulation Change', 'IPO Rush', 'International Expansion', 'Tech Integration'],
    sentiment: 'bullish',
    coverage: 156
  },
  {
    id: 'green-energy',
    title: 'Green Energy Transition',
    status: 'Long-term',
    players: ['Adani Green', 'ReNew Power', 'JSW Energy', 'NTPC'],
    timeline: ['Policy Initiative', 'Investment Surge', 'Scale-up Phase', 'Grid Integration'],
    sentiment: 'neutral',
    coverage: 89
  }
];

export const VIDEO_SAMPLES: VideoSample[] = [
  { title: 'RIL Earnings', duration: '90s', status: 'Ready' },
  { title: 'Budget Impact', duration: '120s', status: 'Processing' },
  { title: 'Tech Sector Rally', duration: '60s', status: 'New' },
  { title: 'Green Energy Surge', duration: '110s', status: 'Ready' }
];

export const VERNACULAR_ITEMS: VernacularItem[] = [
  {
    title: 'RIL तीसरी तिमाही के नतीजे',
    excerpt: 'रिलायंस इंडस्ट्रीज ने अपनी Q3 की कमाई में अपेक्षाओं को पछाड़ दिया है।',
    language: 'Hindi'
  },
  {
    title: 'இந்தியாவின் ஸ்டார்டப் வெடிப்பு 2026',
    excerpt: 'இந்தியாவில் ஸ்டார்டப் செயல்பாடு சாதாரணத்தை ஆச்சரியகரமாக தாண்டிவிட்டுள்ளது।',
    language: 'Tamil'
  },
  {
    title: 'భారత ఫిన్టెక్ విప్లవం',
    excerpt: 'డిజిటల్ నిర్వహణ భారతదేశంలో ఆర్థిక సేవల భవిష్యత్తును రూపుచేస్తుంది.',
    language: 'Telugu'
  }
];
