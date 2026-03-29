import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Search, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  Sparkles, 
  Filter, 
  Database, 
  FileText, 
  ShieldAlert, 
  LineChart, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

interface NewsNavigatorProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const NewsNavigator: React.FC<NewsNavigatorProps> = ({ onNotify }) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const synthesisSteps = [
    "Ingesting 120+ global data vectors...",
    "Harmonizing cross-sector sentiment...",
    "Isolating structural alpha signals...",
    "Drafting Intelligence Briefing..."
  ];

  const handleSynthesize = () => {
    if (!searchQuery.trim()) {
      onNotify("Aura requires a focus vector to synthesize intelligence.", "info");
      return;
    }
    
    setIsSynthesizing(true);
    setSynthesisStep(0);
    
    const interval = setInterval(() => {
      setSynthesisStep(prev => {
        if (prev >= synthesisSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSynthesizing(false);
            onNotify("Intelligence Briefing: 'Quantum Shift' Synced.", "success");
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        padding: '3rem',
        borderRadius: '3rem',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        backgroundColor: 'rgba(18, 21, 28, 0.4)'
      }}
    >
      {/* Dynamic Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '1.75rem',
            background: 'var(--founder-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 12px 32px -8px var(--founder-primary)'
          }}>
            <Brain size={36} />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>Intelligence Navigator</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.2rem' }}>Generative Synthesis of the 2026 Global Landscape.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass-card" style={{ padding: '0.9rem 1.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', background: 'rgba(255,255,255,0.03)' }}>
            <Filter size={20} /> Parameters
          </button>
          <button className="glass-card" style={{ padding: '0.9rem 1.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', background: 'rgba(255,255,255,0.03)' }}>
            <Database size={20} /> Data Nodes
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Search Command Center */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
            <Search size={24} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intelligence vectors: e.g. 'Hydrogen Infrastructure Q3' or 'AI Governance Shifts'..."
            style={{
              width: '100%',
              padding: '1.75rem 3rem',
              paddingLeft: '4.5rem',
              paddingRight: '14rem',
              borderRadius: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '2px solid var(--border-subtle)',
              fontSize: '1.3rem',
              fontWeight: '500',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />
          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '0.75rem',
              bottom: '0.75rem',
              padding: '0 2rem',
              background: 'var(--founder-gradient)',
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              fontWeight: '900',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {isSynthesizing ? <Sparkles className="spin" size={20} /> : <Zap size={20} />}
            {isSynthesizing ? 'SYNTHESIZING' : 'GENERATE BRIEFING'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isSynthesizing ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '2rem',
                padding: '5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2.5rem',
                border: '1px solid var(--border-subtle)',
                minHeight: '500px'
              }}
            >
              <div style={{ position: 'relative' }}>
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    border: '4px solid rgba(124, 58, 237, 0.2)',
                    borderTopColor: 'var(--founder-primary)'
                  }}
                />
                <div className="flex-center" style={{ position: 'absolute', inset: 0, color: 'var(--founder-primary)' }}>
                  <Brain size={64} className="pulse" />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 className="heading" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.75rem' }}>{synthesisSteps[synthesisStep]}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>AI Agent <span style={{ color: 'var(--founder-primary)', fontWeight: '800' }}>Aura</span> is cross-referencing 2026 intelligence nodes...</p>
              </div>
              <div style={{ width: '400px', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${(synthesisStep + 1) * 25}%` }}
                  style={{ height: '100%', backgroundColor: 'var(--founder-primary)' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem' }}
            >
              {/* Deep Briefing Document */}
              <div className="glass-card" style={{ padding: '3.5rem', backgroundColor: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '1rem', backgroundColor: 'var(--investor-bg)', color: 'var(--investor-primary)' }}>
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="heading" style={{ fontSize: '2.25rem', fontWeight: '900', lineHeight: '1' }}>The Silicon Sovereignty Report</h3>
                            <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Synthesized Intelligence Briefing • Ref: ET-2026-X42</p>
                        </div>
                    </div>
                    <div style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'var(--founder-bg)', color: 'var(--founder-primary)', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                        HIGH CONFIDENCE (94%)
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <Zap size={18} style={{ color: '#f59e0b' }} /> Executive Summary
                        </h4>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.7', color: 'var(--text-muted)', fontWeight: '500' }}>
                            The Q3 shift in domestic chip manufacturing signals a fundamental decoupling from established Asian supply chains. AI-specific hardware demand has reached a critical inflection point, with local fabrication units hitting 88% capacity. This structural pivot is expected to drive a <span style={{ color: 'var(--investor-primary)', fontWeight: '800' }}>14.2% sector-wide revaluation</span> by December 2026.
                        </p>
                    </section>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--investor-primary)' }}>
                                <LineChart size={20} />
                                <span style={{ fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase' }}>Strategic Gains</span>
                            </div>
                            <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '600' }}>
                                    <ArrowUpRight size={18} style={{ flexShrink: 0, color: 'var(--investor-primary)' }} />
                                    Portfolio weight increase in 'Tier 2' Fab sub-contractors.
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '600' }}>
                                    <ArrowUpRight size={18} style={{ flexShrink: 0, color: 'var(--investor-primary)' }} />
                                    Accelerated scaling for ASIC-design startups.
                                </li>
                            </ul>
                        </div>
                        <div style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#ef4444' }}>
                                <ShieldAlert size={20} />
                                <span style={{ fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase' }}>Systemic Risks</span>
                            </div>
                            <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '600' }}>
                                    <ChevronRight size={18} style={{ flexShrink: 0, color: '#ef4444' }} />
                                    Energy grid instability for high-power compute clusters.
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '600' }}>
                                    <ChevronRight size={18} style={{ flexShrink: 0, color: '#ef4444' }} />
                                    Raw material bottleneck (Neon/Palladium) via local sourcing.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Explorer Q&A */}
                <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--founder-bg)', color: 'var(--founder-primary)' }}>
                            <MessageSquare size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '900' }}>Interactive Explorer</h4>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        {["Equity Impact?", "Regulatory hurdles?", "Timeline for Q4?"].map(q => (
                            <button key={q} className="glass-cardPersona" style={{ 
                                padding: '0.6rem 1.25rem', borderRadius: '2rem', border: '1px solid var(--border-subtle)', 
                                backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer',
                                color: 'var(--text-muted)', transition: 'all 0.2s ease'
                            }}>
                                {q}
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text" 
                            placeholder="Ask Aura deeper intelligence questions..."
                            style={{
                                width: '100%', padding: '1.25rem 2rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-main)',
                                border: '1px solid var(--border-subtle)', color: 'var(--text-main)', outline: 'none', fontWeight: '500'
                            }}
                        />
                        <button style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--founder-primary)', cursor: 'pointer' }}>
                            <ChevronRight size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>
              </div>

              {/* Sidebar: Briefing Layers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '2rem' }}>
                    <h5 style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Intelligence Sources</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Global Markets Tech', 'Energy Sector Reports', 'Logistics Node Data', 'Sentiment Pulse AI'].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: '700' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '2px', background: 'var(--founder-primary)' }} />
                                {s}
                                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.5 }}>ACTIVE</span>
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '1.75rem', borderRadius: '2rem', background: 'var(--investor-bg)', border: '1px solid var(--investor-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <TrendingUp size={18} style={{ color: 'var(--investor-primary)' }} />
                        <span style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--investor-primary)' }}>Sector Relevance</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {['Semi-Con', 'Energy', 'Gov-Tech'].map((sec, i) => (
                            <div key={sec} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--investor-primary)' }}>{sec}</span>
                                <div style={{ height: '6px', width: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
                                    <div style={{ height: '100%', background: 'var(--investor-primary)', width: `${90 - i * 20}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-cardPersona" 
                    style={{ padding: '1.5rem', borderRadius: '1.5rem', textAlign: 'center', backgroundColor: 'var(--founder-primary)', color: 'white', cursor: 'pointer', fontWeight: '900' }}
                    onClick={() => onNotify("Full PDF Briefing generating...", "info")}
                  >
                    DOWNLOAD INTEL REPORT
                  </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsNavigator;
