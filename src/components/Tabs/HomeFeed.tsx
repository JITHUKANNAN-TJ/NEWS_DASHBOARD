import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Zap, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  Target,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Persona, Story } from '../../types';

interface HomeFeedProps {
  persona: Persona;
  stories: Story[];
  isLoading: boolean;
  error: string | null;
  onAnalyze: (story: Story) => void;
  onNotify: (msg: string) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ persona, stories, isLoading, error, onAnalyze, onNotify }) => {
  
  const renderPersonaDashboard = () => {
    const DashboardCard = ({ icon, label, value, trend, color }: any) => (
      <div className="glass-card" style={{ padding: '1.5rem', flex: '1 1 200px' }}>
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
                 <button onClick={() => onNotify("Live Briefing Scheduled.")} className="glass-panel" style={{ padding: '1rem 2rem', borderRadius: '1.25rem', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer' }}>
                   Live Briefing
                 </button>
                 <button className="flex-center" style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: '800', gap: '0.75rem', cursor: 'pointer' }}>
                    Watch Aura <Clock size={20} />
                 </button>
               </div>
            </motion.div>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            {renderPersonaDashboard()}
          </div>
        </div>
      </section>

      {/* Intelligence Feed */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 className="heading" style={{ color: 'white', fontWeight: '900' }}>Strategic Broadcast</h2>
          <div className="hide-mobile" style={{ display: 'flex', gap: '0.75rem' }}>
            {['All', 'Markets', 'Tech', 'Geopolitics'].map(tag => (
              <button key={tag} className="glass-card" style={{ padding: '0.5rem 1.25rem', borderRadius: '1rem', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>{tag}</button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem' }}>
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
