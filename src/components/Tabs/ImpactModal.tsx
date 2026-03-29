import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, BarChart3, Info } from 'lucide-react';
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
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              cursor: 'pointer'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '85vh',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2.5rem',
              zIndex: 10000,
              padding: '3rem',
              boxShadow: '0 40px 120px rgba(0,0,0,0.3)'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                right: '2.5rem',
                top: '2.5rem',
                padding: '0.75rem',
                borderRadius: '1rem',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ padding: '0.4rem 0.8rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-main)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)' }}>
                {story.category}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)' }}>
                {story.relevance}% RELEVANCE MATCH
              </span>
            </div>

            <h2 className="editorial-serif" style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '2.5rem', color: 'var(--text-main)' }}>
              {story.title}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <TrendingUp size={20} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Market Sentiment</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  {story.sentiment === 'positive' ? 'Bullish' : story.sentiment === 'warning' ? 'Cautious' : 'Neutral'}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  AI analysis suggests a high probability of sector-wide impact within 48 hours.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#a855f7' }}>
                  <Zap size={20} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Action Score</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  High
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Strategic opportunity identified. Recommended review of current portfolio weights.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BarChart3 size={20} /> AI Component Breakdown
              </h3>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontStyle: 'italic' }}>
                  "Targeting 12 macro-indicators, our Aura AI identifies a significant shift in capital flow following this announcement. Sector-level technicals show accumulation patterns above support levels. Correlation with historical Q3 trends is 87%."
                </p>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <button 
                onClick={onClose}
                className="glass-card"
                style={{
                  flex: 1,
                  padding: '1.25rem',
                  borderRadius: '1.25rem',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                GENERATE DEEP REPORT <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default ImpactModal;
