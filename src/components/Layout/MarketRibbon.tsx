import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, Globe, ShieldCheck, Activity, Loader2 } from 'lucide-react';
import { MarketIndex, fetchMarketIndices } from '../../services/marketService';
import { generateMarketPulse } from '../../services/aiService';

const MarketRibbon: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketIndex[]>([]);
  const [currentInsight, setCurrentInsight] = useState("Aura Pulse: Real-time telemetry synchronized.");
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchIndices = async () => {
    try {
      const data = await fetchMarketIndices();
      setMarketData(data);
      
      // Every time we get new market data, we ask Gemini for a 1-sentence tactical pulse
      setIsSyncing(true);
      const insight = await generateMarketPulse(data);
      setCurrentInsight(insight);
    } catch (error) {
       console.error("Market-Sense Pulse Lost.");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 60000); // 1-minute Polling to balance cost/speed
    return () => clearInterval(interval);
  }, []);

  if (marketData.length === 0) return null;

  return (
    <div style={{
      width: '100%',
      height: '52px',
      backgroundColor: 'rgba(10, 12, 16, 0.9)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 90
    }}>
      {/* Neural Insight Hub (Left Fixed) */}
      <div style={{
        padding: '0 2rem',
        height: '100%',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexShrink: 0,
        color: 'var(--primary)',
        width: 'min(100%, 480px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ position: 'relative' }}>
            <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSyncing ? '#a855f7' : 'var(--primary)', boxShadow: `0 0 10px ${isSyncing ? '#a855f7' : 'var(--primary)'}` }} />
            {isSyncing && <Loader2 size={12} className="spin" style={{ position: 'absolute', top: -2, left: -2, color: '#a855f7' }} />}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ fontSize: '0.85rem', fontWeight: '800', fontStyle: 'italic', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {isSyncing ? "AURA IS ANALYZING GLOBAL VOLATILITY..." : currentInsight}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee Ticker */}
      <div style={{ flex: 1, overflow: 'hidden', height: '100%', position: 'relative' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4rem',
            paddingLeft: '2rem',
            height: '100%',
            whiteSpace: 'nowrap'
          }}
        >
          {/* Double content for seamless scroll */}
          {[...marketData, ...marketData, ...marketData].map((index, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{index.symbol}</span>
              <span style={{ fontSize: '1rem', fontWeight: '800', color: 'white' }}>{index.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem', 
                color: index.change >= 0 ? '#10b981' : '#ef4444', 
                fontWeight: '900', 
                fontSize: '0.8rem',
                backgroundColor: index.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
                border: `1px solid ${index.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
              }}>
                {index.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {index.changePercent >= 0 ? `+${index.changePercent}%` : `${index.changePercent}%`}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Global System Status (Right Fixed) */}
      <div className="hide-mobile" style={{
        padding: '0 2rem',
        height: '100%',
        borderLeft: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexShrink: 0,
        backgroundColor: 'rgba(10, 12, 16, 0.95)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-dim)' }}>
            <Globe size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>NEURAL RECALL: ACTIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)' }}>
            <Activity size={16} className="pulse" />
            <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>LIVE REALITY SYNC</span>
        </div>
      </div>
    </div>
  );
};

export default MarketRibbon;
