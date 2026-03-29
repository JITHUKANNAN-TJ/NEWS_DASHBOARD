import React, { useState } from 'react';
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
  Loader2
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
      <div className="glass-card" style={{ flex: '1 1 200px', padding: '1.50rem', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ padding: '0.6rem', background: `${color}15`, color, borderRadius: '0.75rem' }}>{icon}</div>
          <div style={{ color: '#10b981', fontWeight: '800', fontSize: '0.8rem' }}>{trend}</div>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{value}</div>
      </div>
    );

    switch (persona) {
      case 'investor':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <DashboardCard icon={<Activity size={20} />} label="Portfolio Pulse" value="+2.4%" trend="Live" color="#10b981" />
            <DashboardCard icon={<Zap size={20} />} label="Sector Volatility" value="Low" trend="-12%" color="#3b82f6" />
            <DashboardCard icon={<Target size={20} />} label="Strategic Alpha" value="94.2" trend="+1.5" color="#a855f7" />
          </div>
        );
      case 'founder':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <DashboardCard icon={<Briefcase size={20} />} label="Ecosystem Signals" value="High" trend="Critical" color="#f59e0b" />
            <DashboardCard icon={<TrendingUp size={20} />} label="Venture Velocity" value="8.4x" trend="Hot" color="#ec4899" />
            <DashboardCard icon={<Search size={20} />} label="Maverick Index" value="Elite" trend="98 pct" color="#6366f1" />
          </div>
        );
      case 'student':
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
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
      <section style={{ position: 'relative', minHeight: '320px', borderRadius: '3rem', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `var(--${persona}-gradient)`,
          opacity: 0.9,
          zIndex: 0,
          boxShadow: `0 40px 100px -20px var(--${persona}-bg)`
        }} />
        <div className="flex-center stack-mobile" style={{ height: '100%', padding: 'var(--main-padding)', gap: '4rem', position: 'relative', zIndex: 10, alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '320px' }}>
          <div style={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
               <h1 className="heading" style={{ color: 'white', fontWeight: '900', lineHeight: '1', marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>
                 Your Intel, <br/> Redefined.
               </h1>
               <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                 <button 
                  onClick={handleLiveBriefing} 
                  className="glass-panel" 
                  style={{ padding: '1rem 2rem', borderRadius: '1.25rem', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                   <Sparkles size={20} /> Live Briefing
                 </button>
                 <button className="flex-center" style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: '800', gap: '0.75rem', cursor: 'pointer' }}>
                    Watch Aura <Clock size={20} />
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Briefing Modal Overlay */}
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
              style={{ width: '100%', maxWidth: '800px', padding: 'clamp(2rem, 4vw, 4rem)', borderRadius: '3rem', position: 'relative', background: 'rgba(15, 18, 24, 0.95)', border: '1px solid var(--border-subtle)' }}
            >
              <button 
                onClick={() => setIsBriefingOpen(false)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                 <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--primary-gradient)', borderRadius: '1.5rem', color: 'white', marginBottom: '1.5rem', boxShadow: '0 20px 40px -10px var(--primary)' }}>
                    <Brain size={40} />
                 </div>
                 <h2 className="heading" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Strategic AI Briefing</h2>
                 <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.1rem' }}>Synthesized Intelligence for the {persona.toUpperCase()} Persona</p>
              </div>

              {isBriefingLoading ? (
                <div style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <Loader2 className="spin" size={48} style={{ color: 'var(--primary)' }} />
                  <p style={{ fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.1em' }}>PROCESSING GLOBAL VECTORS...</p>
                </div>
              ) : briefingData ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                   <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '2rem' }}>
                      <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                        {briefingData.summary}
                      </p>
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      {briefingData.impactVectors.map((v: any, i: number) => (
                        <div key={i} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                           <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{v.label}</div>
                           <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{v.value}</div>
                        </div>
                      ))}
                   </div>
                   <button 
                    onClick={() => setIsBriefingOpen(false)}
                    style={{ width: '100%', padding: '1.25rem', borderRadius: '1.5rem', background: 'var(--primary-gradient)', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
                  >
                     ACKNOWLEDGE INTEL
                   </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalized Dashboard */}
      <section>
        <h2 className="heading" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>Intelligence Dashboard</h2>
        {renderDashboard()}
      </section>

      {/* Main Feed */}
      <section style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="heading" style={{ fontSize: '2rem', color: 'white' }}>Intelligence Stream</h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '800' }}>FILTERED FOR {persona.toUpperCase()}</div>
        </div>

        {isLoading ? (
          <div className="flex-center" style={{ padding: '6rem 0', flexDirection: 'column', gap: '1.5rem' }}>
            <Activity className="spin text-primary" size={48} />
            <span style={{ fontWeight: '800', letterSpacing: '0.1em', opacity: 0.5 }}>SYNCHRONIZING INTEL...</span>
          </div>
        ) : error ? (
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
             <p style={{ color: '#ef4444', fontWeight: '800' }}>{error}</p>
          </div>
        ) : (
          <div className="grid-responsive">
            {stories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -8 }}
                onClick={() => onAnalyze(story)}
                className="glass-card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                   <img src={story.urlToImage || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop`} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.4rem 0.8rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: '0.5rem', color: 'white', fontSize: '0.7rem', fontWeight: '900' }}>{story.source.name.toUpperCase()}</div>
                </div>
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <h3 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1.3' }}>{story.title}</h3>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{story.description}</p>
                   <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '900', fontSize: '0.8rem' }}>
                         DEEP ANALYSIS <ArrowUpRight size={14} />
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default HomeFeed;
