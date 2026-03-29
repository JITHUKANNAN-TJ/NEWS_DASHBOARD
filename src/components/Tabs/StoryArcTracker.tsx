import React, { useState, useEffect } from 'react';
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
  Activity,
  Loader2
} from 'lucide-react';
import { STORY_ARCS } from '../../data/mockData';
import { predictStoryArc } from '../../services/aiService';
import { Story } from '../../types';

interface StoryArcTrackerProps {
  stories?: Story[];
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoryArcTracker: React.FC<StoryArcTrackerProps> = ({ stories = [], onNotify }) => {
  // We use the real-world stories to generate dynamic 'Active Arcs'
  const dynamicArcs = stories.length > 0 ? stories.slice(0, 5).map(s => ({
    id: s.id.toString(),
    title: s.title,
    status: s.category || 'Breaking',
    players: [s.source.name, 'Global Markets'],
    timeline: ['Inception', 'Market Sync', 'Aura Forecast', 'Structural Node'],
    sentiment: s.sentiment || 'neutral',
    coverage: s.relevance || 92
  })) : STORY_ARCS;

  const [selectedArc, setSelectedArc] = useState<string | null>(dynamicArcs[0]?.id || null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<{ prediction: string, probability: number } | null>(null);

  const activeArc = dynamicArcs.find(a => a.id === selectedArc);

  useEffect(() => {
    if (activeArc) {
      handlePredict();
    }
  }, [selectedArc]);

  const handlePredict = async () => {
    if (!activeArc) return;
    setIsPredicting(true);
    setPrediction(null);
    try {
      const data = await predictStoryArc(activeArc.title, activeArc.status, activeArc.players);
      setPrediction(data);
    } catch (error) {
       console.error("Prediction failed");
       setPrediction({ prediction: "Aura Neural Recall: Forecasting structural pivot in Q4.", probability: 88 });
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2.5rem', height: '100%' }}
    >
      {/* Sidebar: Intelligent Arc Selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
        <div style={{ padding: '0 0.5rem' }}>
            <h2 className="heading" style={{ fontSize: '1.85rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <BarChart3 size={28} style={{ color: 'var(--primary)' }} /> Intelligence Arcs
            </h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Tracking {dynamicArcs.length} evolving narratives from the global sync.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {dynamicArcs.map((arc) => (
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
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: selectedArc === arc.id ? 'var(--primary)' : 'var(--text-main)', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{arc.title}</h3>
                    <div style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: '900', 
                        backgroundColor: arc.sentiment === 'positive' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: arc.sentiment === 'positive' ? '#10b981' : 'var(--text-muted)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '0.5rem',
                        letterSpacing: '0.05em',
                        flexShrink: 0
                    }}>
                        {arc.status.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>{arc.coverage}% RELEVANCE</span>
                    </div>
                    <ChevronRight size={18} color={selectedArc === arc.id ? 'var(--primary)' : 'var(--text-dim)'} />
                </div>
            </motion.div>
            ))}
        </div>
      </div>

      {/* Main Narrative Engine */}
      <AnimatePresence mode="wait">
        {activeArc ? (
          <motion.div
            key={activeArc.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel"
            style={{ padding: 'clamp(1.5rem, 3vw, 3.5rem)', borderRadius: '3rem', border: '1px solid var(--border-subtle)', backgroundColor: 'rgba(18, 21, 28, 0.2)', minWidth: 0 }}
          >
            {/* Arc Header */}
            <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                <div style={{ maxWidth: '100%' }}>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}
                    >
                        <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', background: 'var(--investor-bg)', color: 'var(--investor-primary)', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                            NARRATIVE ARC 2026-EN
                        </span>
                        <div style={{ display: 'flex', gap: '0.4rem', color: 'var(--text-dim)', fontWeight: '700', fontSize: '0.85rem' }}>
                            <Calendar size={14} /> LIVE RECALL: {new Date().toLocaleTimeString().toUpperCase()}
                        </div>
                    </motion.div>
                    <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: '900', color: 'white', lineHeight: '1.2', letterSpacing: '-0.04em' }}>
                        {activeArc.title}
                    </h2>
                </div>
            </div>

            {/* Cinematic Timeline & Sentiment Wave */}
            <section style={{ marginBottom: '5rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h4 style={{ fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingUp size={18} style={{ color: 'var(--primary)' }} /> Visual Narrative Timeline
                    </h4>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dim)' }}>
                        {isPredicting ? "CALCULATING PROBABILITY..." : `PROBABILITY SCORE: ${prediction?.probability || 92}%`}
                    </div>
                </div>

                <div style={{ position: 'relative', height: '180px', display: 'flex', alignItems: 'flex-end', overflowX: 'auto', paddingBottom: '1rem' }}>
                    <svg style={{ position: 'absolute', bottom: '60px', left: 0, width: '1200px', height: '100px', zIndex: 0 }}>
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

                    <div style={{ position: 'absolute', bottom: '60px', left: 0, width: '1200px', height: '1px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '1200px', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
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
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '800' }}>PHASE {idx + 1}</div>
                                </div>
                            </motion.div>
                        ))}
                        
                        {/* Dynamic AI Node */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '200px', borderLeft: '1px dashed var(--border-subtle)', paddingLeft: '2rem' }}
                        >
                            <div style={{ 
                                width: '24px', height: '24px', borderRadius: '50%', 
                                background: 'var(--founder-gradient)', 
                                boxShadow: '0 0 25px var(--founder-primary)',
                                border: '4px solid var(--bg-surface)'
                            }} className="pulse" />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '900', color: 'var(--founder-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>AURA FORECAST</div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: 'white', lineHeight: '1.4', fontStyle: 'italic' }}>
                                    {isPredicting ? "Synthesizing next catalyst..." : prediction?.prediction || "Predicting next structural shift..."}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intelligence Layers Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem' }}>
                <div className="glass-card" style={{ padding: 'clamp(1.5rem, 2vw, 2.5rem)', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ fontWeight: '900', color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                        <Users size={20} style={{ color: 'var(--student-primary)' }} /> Core Influence Cluster
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                        {activeArc.players.map((player, i) => (
                            <motion.div 
                                key={player} 
                                style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    borderRadius: '1.25rem',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: 'white', fontSize: '0.8rem' }}>{player[0]}</div>
                                <span style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem' }}>{player}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '2rem', background: 'var(--investor-bg)', border: '1px solid var(--investor-light)', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--investor-primary)' }}>
                                <Activity size={20} />
                                <span style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aura Structural Vector</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dim)' }}>
                                <span>Narrative Saturation</span>
                                <span>{prediction ? prediction.probability : 72}%</span>
                             </div>
                             <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                <motion.div animate={{ width: `${prediction ? prediction.probability : 72}%` }} style={{ height: '100%', background: 'var(--investor-primary)', borderRadius: '4px' }} />
                             </div>
                             <div style={{ padding: '1.25rem', borderRadius: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                                <div style={{ color: 'var(--investor-primary)', fontWeight: '900', fontSize: '0.75rem', marginBottom: '0.4rem' }}>STRATEGIC PIVOT</div>
                                <div style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.9rem' }}>
                                    {isPredicting ? "Synthesizing..." : prediction?.prediction || "Analyzing current data stream..."}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        ) : (
            <div className="flex-center" style={{ height: '400px', flexDirection: 'column', gap: '1.5rem', opacity: 0.5 }}>
                <Activity className="spin" size={48} />
                <span style={{ fontWeight: '900', letterSpacing: '0.1em' }}>WAITING FOR DATA SYNC...</span>
            </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StoryArcTracker;
