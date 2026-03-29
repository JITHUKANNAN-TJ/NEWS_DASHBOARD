import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, BarChart3, Info, ChevronRight, Activity, ShieldCheck, Brain } from 'lucide-react';
import { Story } from '../../types';

interface ImpactModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImpactModal: React.FC<ImpactModalProps> = ({ story, isOpen, onClose }) => {
  if (!story) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(15px)',
              zIndex: 9999,
              cursor: 'pointer'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(92vw, 900px)',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'rgba(15, 18, 24, 0.98)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '3rem',
              zIndex: 10000,
              padding: 'clamp(1.5rem, 5vw, 4rem)',
              boxShadow: '0 50px 150px -20px rgba(0,0,0,0.8)',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                    {story.category.toUpperCase()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)' }}>
                    <ShieldCheck size={14} /> {story.relevance}% RELEVANCE
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                style={{
                  padding: '0.8rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '3rem', color: 'white', letterSpacing: '-0.04em' }}>
              {story.title}
            </h2>

            {/* Analysis Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
              <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2.5rem', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Activity size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Market Sentiment</span>
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '0.75rem', color: 'white' }}>
                  {story.sentiment === 'positive' ? 'BULLISH' : story.sentiment === 'warning' ? 'CAUTIOUS' : 'NEUTRAL'}
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
                  Aura signals high accumulation in adjacent sectors. Volatility indicators remain indexed at 2.4.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2.5rem', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--investor-primary)' }}>
                  <Zap size={20} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Action Score</span>
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '0.75rem', color: 'white' }}>
                  CRITICAL
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
                  Recommended positional adjustment across core weights. Risk threshold is currently within sync limits.
                </p>
              </div>
            </div>

            {/* Neural Summary Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <h3 className="heading" style={{ fontSize: '1.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
                <Brain size={28} style={{ color: 'var(--primary)' }} /> Neural Component Breakdown
              </h3>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '2.5rem', border: '1px solid var(--border-subtle)' }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontStyle: 'italic', fontSize: '1.15rem', fontWeight: '500' }}>
                  "Targeting 12 macro-indicators, our Aura AI identifies a significant shift in capital flow following this announcement. Sector-level technicals show accumulation patterns above support levels. Correlation with historical Q3 trends is 87%."
                </p>
              </div>
            </div>

            {/* Contrarian View Overlay */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#ef4444' }}>
                    <Info size={16} />
                    <span style={{ fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.05em' }}>CONTRARIAN PERSPECTIVE SURFACED</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'rgba(239, 68, 68, 0.8)', fontWeight: '600' }}>
                    Institutional volume may mask a short-term liquidity trap. Proceed with caution on derivative positions.
                </p>
            </div>

            <div style={{ marginTop: '3.5rem' }}>
              <button 
                onClick={onClose}
                className="glass-card"
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  borderRadius: '1.5rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '900',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                ACTIVATE DEEP ANALYSIS <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImpactModal;
