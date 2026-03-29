import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Zap, 
  Activity, 
  Target, 
  ArrowUpRight, 
  Clock, 
  Briefcase, 
  Search, 
  GraduationCap,
  Sparkles,
  X,
  Brain,
  ShieldCheck,
  ChevronRight,
  Globe,
  Loader2,
  Play,
  BarChart3,
  Cpu,
  Layers
} from 'lucide-react';
import { Story, Persona } from '../../types';
import { synthesizeBriefing } from '../../services/aiService';

interface HomeFeedProps {
  persona: Persona;
  stories: Story[];
  isLoading: boolean;
  error: string | null;
  onAnalyze: (story: Story) => void;
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ persona, stories, isLoading, error, onAnalyze, onNotify }) => {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [briefingData, setBriefingData] = useState<{ summary: string; impactVectors: any[] } | null>(null);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Markets', 'Economy', 'Tech', 'Strategic'];

  const filteredStories = useMemo(() => {
    if (activeCategory === 'All') return stories;
    return stories.filter(s => s.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [stories, activeCategory]);

  const handleLiveBriefing = async () => {
    setIsBriefingOpen(true);
    setIsBriefingLoading(true);
    setBriefingData(null);
    try {
      const data = await synthesizeBriefing(persona, stories);
      setBriefingData(data);
    } catch (err) {
      onNotify("Briefing synthesis failed. Check AI configuration.", "error");
      setIsBriefingOpen(false);
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const renderDashboard = () => {
    const DashboardCard = ({ icon, label, value, trend, color }: any) => (
      <div className="glass-card" style={{ flex: '1 1 200px', padding: '1.25rem', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: `${color}15`, color, borderRadius: '0.6rem' }}>{icon}</div>
          <div style={{ color: '#10b981', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{trend}</div>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{value}</div>
      </div>
    );

    switch (persona) {
      case 'investor':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
            <DashboardCard icon={<Activity size={18} />} label="Portfolio Pulse" value="+2.4%" trend="Live" color="#10b981" />
            <DashboardCard icon={<Zap size={18} />} label="Sector Volatility" value="Low" trend="-12%" color="#3b82f6" />
            <DashboardCard icon={<Target size={18} />} label="Strategic Alpha" value="94.2" trend="+1.5" color="#a855f7" />
          </div>
        );
      case 'founder':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
            <DashboardCard icon={<Briefcase size={18} />} label="Ecosystem Signals" value="High" trend="Critical" color="#f59e0b" />
            <DashboardCard icon={<TrendingUp size={18} />} label="Venture Velocity" value="8.4x" trend="Hot" color="#ec4899" />
            <DashboardCard icon={<Search size={18} />} label="Maverick Index" value="Elite" trend="98 pct" color="#6366f1" />
          </div>
        );
      case 'student':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
            <DashboardCard icon={<GraduationCap size={18} />} label="Concepts Mastery" value="78%" trend="+5% Today" color="#3b82f6" />
            <DashboardCard icon={<Search size={18} />} label="Career Pivot" value="OPEN" trend="12 Ops" color="#10b981" />
            <DashboardCard icon={<TrendingUp size={18} />} label="Learning Arc" value="STEADY" trend="Lvl 4" color="#a855f7" />
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Tactical Header with AI Briefing */}
      <section style={{ position: 'relative', minHeight: '260px', borderRadius: '3rem', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `var(--${persona}-gradient)`,
          opacity: 0.9,
          zIndex: 0,
          boxShadow: `0 30px 80px -20px var(--${persona}-bg)`
        }} />
        <div className="flex-center stack-mobile" style={{ height: '100%', padding: 'clamp(2rem, 5vw, 4rem)', gap: '4rem', position: 'relative', zIndex: 10, alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '260px' }}>
          <div style={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
               <h1 className="heading" style={{ color: 'white', fontWeight: '900', lineHeight: '1', marginBottom: '1.25rem', letterSpacing: '-0.05em', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                 Intelligence Pulse.
               </h1>
               <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <button 
                  onClick={handleLiveBriefing} 
                  className="glass-panel" 
                  style={{ padding: '0.85rem 1.75rem', borderRadius: '1.25rem', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                   <Sparkles size={18} /> Neural Synthesis
                 </button>
                 <button className="flex-center" style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: '800', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Watch Aura <Play size={16} fill="white" />
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Categorization Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid transparent',
                    borderColor: activeCategory === cat ? 'var(--primary)' : 'transparent',
                    background: activeCategory === cat ? 'rgba(16, 185, 129, 0.05)' : 'none',
                    color: activeCategory === cat ? 'var(--primary)' : 'var(--text-dim)',
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.05em'
                }}
            >
                {cat.toUpperCase()}
            </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 800px), 1fr))', gap: '3rem' }}>
        {/* Main Stream Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '4px', height: '1.5rem', background: 'var(--primary)', borderRadius: '2px' }} />
                    <h2 className="heading" style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>Intelligence Dashboard</h2>
                </div>
                {renderDashboard()}
            </section>

            <section style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '4px', height: '1.5rem', background: 'var(--investor-primary)', borderRadius: '2px' }} />
                        <h2 className="heading" style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{activeCategory} Intelligence</h2>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex-center" style={{ padding: '10rem 0', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <div className="pulse" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)' }} />
                            <Loader2 size={40} className="spin" style={{ position: 'absolute', top: 20, left: 20, color: 'var(--primary)' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontWeight: '900', letterSpacing: '0.2em', color: 'var(--primary)', marginBottom: '0.5rem' }}>AURA NEURAL ENRICHMENT ACTIVE</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '800' }}>ANALYZING GLOBAL HEADLINES FOR {persona.toUpperCase()} RELEVANCE...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
                        <p style={{ color: '#ef4444', fontWeight: '900' }}>{error}</p>
                    </div>
                ) : (
                    <div className="grid-responsive">
                    {filteredStories.map((story, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * i }}
                            whileHover={{ y: -6 }}
                            onClick={() => onAnalyze(story)}
                            className="glass-card"
                            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.01)' }}
                        >
                        <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                            <img src={story.urlToImage || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop`} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            
                            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                <div style={{ padding: '0.3rem 0.6rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: '0.5rem', color: 'white', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '0.05em' }}>
                                    {story.source.name.toUpperCase()}
                                </div>
                            </div>

                            <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem' }}>
                                <div style={{ padding: '0.4rem 0.8rem', background: 'var(--primary-gradient)', borderRadius: '0.75rem', color: 'white', fontSize: '0.65rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                                    <Play size={10} fill="white" /> AI SHORT
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.05em' }}>{story.category.toUpperCase()}</span>
                                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-dim)' }}>{story.relevance}% RELEVANCE</span>
                            </div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: '900', lineHeight: '1.25', color: 'white' }}>{story.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontWeight: '500' }}>{story.description}</p>
                            
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem' }}>
                                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                    DEEP ANALYSIS <ArrowUpRight size={14} />
                                </div>
                                <div style={{ 
                                    padding: '0.2rem 0.5rem', 
                                    borderRadius: '0.4rem', 
                                    fontSize: '0.65rem', 
                                    fontWeight: '900',
                                    backgroundColor: story.sentiment === 'positive' ? 'rgba(16, 185, 129, 0.1)' : story.sentiment === 'warning' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                                    color: story.sentiment === 'positive' ? '#10b981' : story.sentiment === 'warning' ? '#ef4444' : 'var(--text-dim)'
                                }}>
                                    {story.sentiment.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                )}
            </section>
        </div>
      </div>

      <AnimatePresence>
        {isBriefingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="glass-panel"
              style={{ width: 'min(92vw, 800px)', padding: 'clamp(1.5rem, 5vw, 4rem)', borderRadius: '3rem', position: 'relative', background: 'rgba(15, 18, 24, 0.95)', border: '1px solid var(--border-subtle)' }}
            >
              <button 
                onClick={() => setIsBriefingOpen(false)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--primary-gradient)', borderRadius: '1.5rem', color: 'white', marginBottom: '1.25rem', boxShadow: '0 20px 40px -10px var(--primary)' }}>
                    <Brain size={40} />
                 </div>
                 <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', marginBottom: '0.5rem' }}>Strategic AI Briefing</h2>
                 <p style={{ color: 'var(--text-muted)', fontWeight: '700', fontSize: '1rem' }}>Synthesized Intelligence for the {persona.toUpperCase()} Persona</p>
              </div>

              {isBriefingLoading ? (
                <div style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <Loader2 className="spin" size={48} style={{ color: 'var(--primary)' }} />
                  <p style={{ fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.1em' }}>PROCESSING GLOBAL VECTORS...</p>
                </div>
              ) : briefingData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1.75rem' }}>
                      <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.95)', fontWeight: '500' }}>
                        {briefingData.summary}
                      </p>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      {briefingData.impactVectors.map((v: any, i: number) => (
                        <div key={i} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                           <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '900', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{v.label}</div>
                           <div style={{ fontSize: '1.35rem', fontWeight: '900', color: 'white' }}>{v.value}</div>
                        </div>
                      ))}
                   </div>
                   <button 
                    onClick={() => setIsBriefingOpen(false)}
                    style={{ width: '100%', padding: '1.1rem', borderRadius: '1.25rem', background: 'var(--primary-gradient)', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer', marginTop: '0.5rem', boxShadow: 'var(--shadow-lg)' }}
                  >
                     ACKNOWLEDGE INTEL
                   </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeFeed;
