import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Persona, Story } from '../../types';
import { PERSONA_CONFIG } from '../../data/mockData';
import { 
  AlertCircle, 
  Loader2, 
  TrendingUp, 
  Zap, 
  Target, 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  Search
} from 'lucide-react';

interface HomeFeedProps {
  persona: Persona;
  stories: Story[];
  isLoading: boolean;
  error: string | null;
  onAnalyze: (story: Story) => void;
  onNotify: (message: string) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ persona, stories, isLoading, error, onAnalyze, onNotify }) => {
  const config = PERSONA_CONFIG[persona];
  const Icon = config.icon;
  const themeVar = `--${persona}-primary`;

  const renderPersonaDashboard = () => {
    switch(persona) {
      case 'investor':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <DashboardCard icon={<BarChart3 size={20} />} label="Market Heatmap" value="BULLISH" trend="+2.4%" color="#10b981" />
            <DashboardCard icon={<Globe size={20} />} label="Global Macro" value="STABLE" trend="0.0%" color="#3b82f6" />
            <DashboardCard icon={<Zap size={20} />} label="Signal Strength" value="HIGH" trend="89%" color="#f59e0b" />
          </div>
        );
      case 'founder':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <DashboardCard icon={<Briefcase size={20} />} label="Ecosystem Pulse" value="ACTIVE" trend="+12 Deals" color="#7c3aed" />
            <DashboardCard icon={<Target size={20} />} label="Competitor Moves" value="ALERT" trend="3 New" color="#ef4444" />
            <DashboardCard icon={<Sparkles size={20} />} label="Growth Signals" value="POSITIVE" trend="92%" color="#10b981" />
          </div>
        );
      case 'student':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <DashboardCard icon={<GraduationCap size={20} />} label="Concepts Mastery" value="78%" trend="+5% Today" color="#3b82f6" />
            <DashboardCard icon={<Search size={20} />} label="Career Pivot" value="OPEN" trend="12 Ops" color="#10b981" />
            <DashboardCard icon={<TrendingUp size={20} />} label="Learning Arc" value="STEADY" trend="Lvl 4" color="#a855f7" />
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
    >
      {/* Cinematic Hero Section */}
      <section style={{ position: 'relative', minHeight: '320px', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `var(--${persona}-gradient)`,
          borderRadius: '3rem',
          opacity: 0.9,
          zIndex: 0,
          boxShadow: `0 40px 100px -20px var(--${persona}-bg)`
        }} />
        
        {/* Animated Background Mesh */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
          opacity: 0.1,
          zIndex: 1,
          borderRadius: '3rem'
        }} />

        <div style={{ padding: '4rem', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ maxWidth: '600px' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
            >
              <span style={{ padding: '0.4rem 1rem', borderRadius: '2rem', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', fontSize: '0.75rem', fontWeight: '900', color: 'white', letterSpacing: '0.1em' }}>
                MY ET 2026 • {persona.toUpperCase()} MODE
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '4rem', fontWeight: '900', color: 'white', lineHeight: '0.95', marginBottom: '1.5rem' }}>
              {config.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.85)', fontWeight: '500', lineHeight: '1.4' }}>
              {config.description}
            </motion.p>
          </div>
          
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              width: '180px', height: '180px', borderRadius: '3rem', background: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Icon size={80} strokeWidth={1.5} />
          </motion.div>
        </div>
      </section>

      {/* Intelligence Dashboard Wrapper */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Intelligence Dashboard</h2>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>
        {renderPersonaDashboard()}
      </section>

      {/* Feed Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Dynamic News Stream</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>AI-Synthesized for your specific risk profile.</p>
          </div>
          {isLoading && <Loader2 className="spin" size={32} style={{ color: `var(${themeVar})` }} />}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1, 2, 3, 4].map(n => <SkeletonCard key={n} />)
            ) : stories.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'var(--bg-surface)', borderRadius: '2rem' }}>
                    <AlertCircle size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                    <p style={{ fontWeight: '700', color: 'var(--text-muted)' }}>No intelligence synced for this vector currently.</p>
                </div>
            ) : (
              stories.map((story, i) => (
                <NewsCard 
                  key={story.id} 
                  story={story} 
                  index={i} 
                  persona={persona}
                  onAnalyze={() => onAnalyze(story)} 
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
};

const DashboardCard = ({ icon, label, value, trend, color }: any) => (
    <motion.div 
      whileHover={{ y: -8 }}
      className="glass-card" 
      style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)' }}
    >
        <div style={{ padding: '1rem', borderRadius: '1.25rem', backgroundColor: `${color}15`, color: color }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '900' }}>{value}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: trend.startsWith('+') ? '#10b981' : trend.startsWith('-') ? '#ef4444' : color }}>{trend}</span>
            </div>
        </div>
    </motion.div>
);

const NewsCard = ({ story, index, persona, onAnalyze }: any) => {
    const themeVar = `--${persona}-primary`;
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01, x: 10 }}
            className="glass-panel"
            style={{
                padding: '2.5rem',
                borderRadius: '2.5rem',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '1fr 200px',
                gap: '2rem',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.02)'
            }}
            onClick={onAnalyze}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <span style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: '1rem', 
                        backgroundColor: 'var(--bg-surface)', 
                        fontSize: '0.75rem', 
                        fontWeight: '900', 
                        color: `var(${themeVar})`,
                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)'
                    }}>
                        {story.category.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                        {story.relevance}% RELEVANCE
                    </span>
                    <div style={{ 
                        width: '10px', height: '10px', borderRadius: '50%', 
                        backgroundColor: story.sentiment === 'positive' ? '#10b981' : story.sentiment === 'warning' ? '#ef4444' : '#64748b',
                        boxShadow: `0 0 15px ${story.sentiment === 'positive' ? '#10b981' : story.sentiment === 'warning' ? '#ef4444' : '#64748b'}`
                    }} />
                </div>
                <h3 className="heading" style={{ fontSize: '1.85rem', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    {story.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: `var(${themeVar})`, fontWeight: '800', fontSize: '0.9rem' }}>
                    OPEN INTELLIGENCE BRIEFING <ArrowRight size={18} />
                </div>
            </div>
            
            {/* Visual Preview Placeholder */}
            <div style={{ 
                height: '140px', 
                width: '100%', 
                borderRadius: '1.5rem', 
                background: `linear-gradient(45deg, var(--bg-surface), var(--bg-main))`,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-subtle)'
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                <div className="flex-center" style={{ height: '100%' }}>
                    <Sparkles size={32} style={{ opacity: 0.1, color: `var(${themeVar})` }} />
                </div>
            </div>
        </motion.div>
    );
};

const SkeletonCard = () => (
    <div className="glass-card animate-shimmer" style={{ height: '180px', borderRadius: '2.5rem', opacity: 0.1 }} />
);

export default HomeFeed;
