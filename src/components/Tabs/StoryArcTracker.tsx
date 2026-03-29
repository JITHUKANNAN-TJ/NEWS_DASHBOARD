import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Share2, 
  Info, 
  Calendar, 
  Target,
  Zap,
  Eye,
  AlertTriangle,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { STORY_ARCS } from '../../data/mockData';

interface StoryArcTrackerProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoryArcTracker: React.FC<StoryArcTrackerProps> = ({ onNotify }) => {
  const [selectedArc, setSelectedArc] = useState<string | null>(STORY_ARCS[0].id);

  const activeArc = STORY_ARCS.find(a => a.id === selectedArc);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2.5rem', height: '100%' }}
    >
      {/* Sidebar: Intelligent Arc Selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ padding: '0 0.5rem' }}>
            <h2 className="heading" style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <BarChart3 size={28} style={{ color: 'var(--primary)' }} /> Active Arcs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Tracking 12 evolving narratives across 48 sectors.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {STORY_ARCS.map((arc) => (
            <motion.div
                key={arc.id}
                onClick={() => setSelectedArc(arc.id)}
                whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderRadius: '1.75rem',
                  cursor: 'pointer',
                  border: selectedArc === arc.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedArc === arc.id ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.01)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: selectedArc === arc.id ? 'var(--primary)' : 'var(--text-main)', lineHeight: '1.2' }}>{arc.title}</h3>
                    <div style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: '900', 
                        backgroundColor: arc.sentiment === 'bullish' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: arc.sentiment === 'bullish' ? '#10b981' : 'var(--text-muted)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '0.5rem',
                        letterSpacing: '0.05em'
                    }}>
                        {arc.status.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>{arc.coverage} Vector Reports</span>
                    </div>
                    <ChevronRight size={18} color={selectedArc === arc.id ? 'var(--primary)' : 'var(--text-dim)'} />
                </div>
            </motion.div>
            ))}
        </div>
      </div>

      {/* Main Narrative Engine */}
      <AnimatePresence mode="wait">
        {activeArc && (
          <motion.div
            key={activeArc.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel"
            style={{ padding: '3.5rem', borderRadius: '3rem', border: '1px solid var(--border-subtle)', backgroundColor: 'rgba(18, 21, 28, 0.2)' }}
          >
            {/* Arc Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '70%' }}>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}
                    >
                        <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', background: 'var(--investor-bg)', color: 'var(--investor-primary)', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                            NARRATIVE ARC 2026-A
                        </span>
                        <div style={{ display: 'flex', gap: '0.4rem', color: 'var(--text-dim)', fontWeight: '700', fontSize: '0.85rem' }}>
                            <Calendar size={14} /> ACTIVE SINCE JAN 12.
                        </div>
                    </motion.div>
                    <h2 className="heading" style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', lineHeight: '1', letterSpacing: '-0.04em' }}>
                        {activeArc.title}
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '1rem', borderRadius: '1.25rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}>
                        <Share2 size={24} />
                    </button>
                    <button className="glass-card" style={{ padding: '1rem', borderRadius: '1.25rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}>
                        <Info size={24} />
                    </button>
                </div>
            </div>

            {/* Cinematic Timeline & Sentiment Wave */}
            <section style={{ marginBottom: '5rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h4 style={{ fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingUp size={18} style={{ color: 'var(--primary)' }} /> Visual Narrative Timeline
                    </h4>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dim)' }}>PROBABILITY ACCURACY: 92%</div>
                </div>

                <div style={{ position: 'relative', height: '180px', display: 'flex', alignItems: 'flex-end', padding: '0 2rem' }}>
                    {/* Sentiment Wave SVG */}
                    <svg style={{ position: 'absolute', bottom: '60px', left: 0, width: '100%', height: '100px', zIndex: 0 }}>
                        <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 0 80 Q 200 10, 400 60 T 800 20 T 1200 90"
                            stroke="var(--primary)"
                            strokeWidth="2"
                            fill="none"
                            style={{ opacity: 0.3 }}
                        />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1 }}>
                        {activeArc.timeline.map((event, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '120px' }}
                            >
                                <div style={{ 
                                    width: '16px', height: '16px', borderRadius: '50%', 
                                    background: idx > 2 ? 'rgba(255,255,255,0.1)' : 'var(--primary)', 
                                    boxShadow: idx <= 2 ? '0 0 20px var(--primary)' : 'none',
                                    border: '4px solid var(--bg-surface)'
                                }} className={idx === 3 ? "pulse" : ""} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '900', color: idx > 2 ? 'var(--text-dim)' : 'white', marginBottom: '0.4rem', lineHeight: '1.2' }}>{event}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '800' }}>Q{idx + 1} '26</div>
                                    {idx === 3 && (
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.05em' }}>PREDICTED</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intelligence Layers Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
                {/* Key Players Layer */}
                <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ fontWeight: '900', color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                        <Users size={20} style={{ color: 'var(--student-primary)' }} /> Core Influence Node
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {activeArc.players.map((player, i) => (
                            <motion.div 
                                key={player} 
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'rgba(255,255,255,0.01)',
                                    borderRadius: '1.5rem',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ 
                                    width: '64px', height: '64px', borderRadius: '50%', 
                                    background: i % 2 === 0 ? 'var(--student-gradient)' : 'var(--founder-gradient)', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    color: 'white', fontSize: '1.5rem', fontWeight: '900', boxShadow: 'var(--shadow-md)'
                                }}>
                                    {player[0]}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'white' }}>{player}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700', marginTop: '0.25rem' }}>Primary Structural Catalyst</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Perspective & Forecast Layer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '2rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: '#f59e0b' }}>
                            <AlertTriangle size={20} />
                            <span style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contrarian Perspective</span>
                        </div>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(245, 158, 11, 0.9)', fontWeight: '600', lineHeight: '1.5' }}>
                            "Established Fab leaders may face capital flight as 'Agile Local' manufacturing pods disrupt traditional long-cycle economies of scale."
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '2rem', background: 'var(--investor-bg)', border: '1px solid var(--investor-light)', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--investor-primary)' }}>
                                <Activity size={20} />
                                <span style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Market Impact Vector</span>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--investor-primary)' }}>HIGH</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dim)' }}>
                                <span>Narrative Saturation</span>
                                <span>68%</span>
                             </div>
                             <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} style={{ height: '100%', background: 'var(--investor-primary)', borderRadius: '4px', boxShadow: '0 0 10px var(--investor-primary)' }} />
                             </div>
                             <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                                <div style={{ color: 'var(--investor-primary)', fontWeight: '900', fontSize: '0.75rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Target size={14} /> WHAT TO WATCH NEXT
                                </div>
                                <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem' }}>Q4 Regulatory Clearance for Pod-Fabs.</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StoryArcTracker;
