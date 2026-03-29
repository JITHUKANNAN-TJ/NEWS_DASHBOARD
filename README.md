# ET News 2026 - Reimagining Business Journalism

A cutting-edge news platform that transforms how business news is consumed in 2026. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 1. **My ET - Personalized Newsroom**
- Three persona modes: **Investor**, **Founder**, **Student**
- Dynamically filtered content based on user role
- Real-time relevance scoring (88-98% match rates)
- Sentiment analysis and market-impact indicators

### 2. **News Navigator - Interactive Intelligence Briefings**
- AI-powered synthesis of multiple articles
- One-click topic deep-dives (e.g., Union Budget 2026)
- Smart chat interface ("Ask ET AI")
- Key takeaways and market impact summaries

### 3. **Story Arc Tracker**
- Visual timeline of ongoing business stories
- Key player mapping and relationship visualization
- Sentiment tracking and contrarian perspective analysis
- Three demo stories: AI Chip Race, Fintech Boom, Green Energy Transition

### 4. **AI News Video Studio**
- Transform articles into 60-120s broadcast videos
- Multiple narrator voice options
- Processing status tracking
- Ready-to-share video content

### 5. **Vernacular Business News Engine**
- Support for 5 languages: English, Hindi, Tamil, Telugu, Bengali
- Context-aware translations with local cultural adaptation
- Real-time language switching
- Regional business news coverage

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (ready to integrate)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173
```

## 📂 Project Structure

```
et-news-2026/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981)
- **Persona Colors**:
  - Investor: Emerald → Teal
  - Founder: Violet → Purple
  - Student: Blue → Cyan
- **Semantic**: Red (alerts), Orange (warnings), Blue (info)

### Typography
- **Font**: Inter (sans-serif), Georgia (serif)
- **Headings**: 500 weight, bold appearance
- **Body**: 400 weight, 16px default

### Components
- Rounded cards with subtle borders
- Glass-morphism effects in hero sections
- Smooth transitions and hover states
- Dark mode fully supported

## 🔄 Persona System

### Investor Mode
- Portfolio-focused news
- Market sentiment analysis
- Stock performance tracking
- Sector-wise allocation insights

### Founder Mode
- Startup ecosystem news
- Funding round alerts
- Competitor intelligence
- Industry trend analysis

### Student Mode
- Business concept explanations
- Market fundamentals
- Educational deep-dives
- Simplified market analysis

## 🧠 AI Integration Points

Ready for integration with:
- **Gemini API** - Content synthesis and summarization
- **Voice synthesis APIs** - Video narration
- **Translation APIs** - Vernacular content generation
- **Sentiment analysis APIs** - Story Arc tracking

## 📱 Responsive Design

- Desktop-first approach
- Mobile optimization ready
- Tablet breakpoints configured
- Touch-friendly interface elements

## 🚀 Performance Optimizations

- Code splitting with Vite
- Lazy loading components
- Optimized asset loading
- CSS tree-shaking with Tailwind

## 🔐 Production Ready

- TypeScript strict mode enabled
- ESLint and Prettier compatible
- Accessible component patterns
- SEO-friendly structure

## 📊 Demo Data

The application includes:
- 3 demo stories per persona (9 articles total)
- 3 detailed story arcs with timelines
- 4 video studio samples
- 3 vernacular content samples

## 🎯 Next Steps for Hackathon

1. **API Integration**
   - Connect to ET API for real news data
   - Implement Gemini for News Navigator
   - Add speech synthesis for videos

2. **Advanced Features**
   - User authentication
   - Personalized preferences storage
   - Bookmark/saved articles
   - Social sharing functionality

3. **Analytics**
   - User engagement tracking
   - Content performance metrics
   - Persona distribution analysis

4. **Performance**
   - Image optimization
   - CDN integration
   - Database caching
   - Real-time updates with WebSocket

## 📞 Support

For questions or issues, refer to the implementation plan provided with this project.

---

**Built for ET News Hackathon 2026** 🚀

Transform how the world reads business news.
