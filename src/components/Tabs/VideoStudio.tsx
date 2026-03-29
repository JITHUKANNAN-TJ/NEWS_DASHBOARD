import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Play, 
  Sparkles, 
  Wand2, 
  MonitorPlay, 
  Save, 
  Film, 
  CheckCircle, 
  Loader2, 
  Music, 
  Type, 
  Share2, 
  Cpu,
  Radio,
  Activity,
  Maximize
} from 'lucide-react';

interface VideoStudioProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const VideoStudio: React.FC<VideoStudioProps> = ({ onNotify }) => {
  const [isProducing, setIsProducing] = useState(false);
  const [prodStep, setProdStep] = useState(0);

  const productionSteps = [
    { name: "Narrative Synthesis", icon: Type, detail: "Generating editorial arc and AI voice masters..." },
    { name: "Neural Composition", icon: Film, detail: "Rendering spatial overlays and market data viz..." },
    { name: "Cipher Encoding", icon: MonitorPlay, detail: "Finalizing 4K stream with Dolby Atmos mastering..." }
  ];

  const handleStartProduction = () => {
    setIsProducing(true);
    setProdStep(0);
    
    const interval = setInterval(() => {
      setProdStep(prev => {
        if (prev >= productionSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProducing(false);
            onNotify("Visual Intelligence Report: Online.", "success");
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{
        padding: 'clamp(1rem, 3vw, 3rem)',
        borderRadius: '3rem',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        backgroundColor: 'rgba(10, 12, 16, 0.4)'
      }}
    >
      {/* Cinematic Header */}
      <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '2rem',
            background: 'var(--student-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 20px 40px -10px var(--student-primary)',
            flexShrink: 0
          }}>
            <Video size={40} />
          </div>
          <div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '900', color: 'white', letterSpacing: '-0.04em' }}>AI Video Studio</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.25rem' }}>Automated broadcast-grade visual intelligence production.</p>
          </div>
        </div>
        
        <button 
          onClick={handleStartProduction}
          disabled={isProducing}
          style={{
            padding: '1.25rem 2.5rem',
            background: 'var(--student-gradient)',
            color: 'white',
            border: 'none',
            borderRadius: '1.25rem',
            fontWeight: '900',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            width: 'auto'
          }}
        >
          {isProducing ? <Loader2 className="spin" size={24} /> : <Wand2 size={24} />}
          {isProducing ? 'MASTERING...' : 'GENERATE BROADCAST'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem', flex: 1 }}>
        {/* Advanced Preview Module */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{
            flex: 1,
            backgroundColor: '#050608',
            borderRadius: '3rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)',
            border: '1px solid var(--border-subtle)',
            aspectRatio: '16/9',
            minHeight: '220px'
          }}>
            {/* Broadcast HUD Layers */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', padding: 'clamp(1rem, 2vw, 2rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ef4444', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                            <Radio size={14} className="pulse" /> LIVE
                        </div>
                        <div className="hide-mobile" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '800', opacity: 0.6 }}>AURA-7v2 // MASTER</div>
                    </div>
                    <div style={{ textAlign: 'right', color: 'white' }}>
                        <div style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: '900', letterSpacing: '0.1em' }}>18:42:09</div>
                        <div className="hide-mobile" style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.5 }}>GLOBAL SYNC ACTIVE</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ maxWidth: '85%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: 'clamp(1rem, 1.5vw, 1.5rem)', borderRadius: '1.5rem', borderLeft: '4px solid var(--student-primary)' }}>
                        <div style={{ color: 'var(--student-primary)', fontWeight: '900', fontSize: '0.7rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>NEWS TICKER</div>
                        <div style={{ color: 'white', fontWeight: '800', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', lineHeight: '1.2' }}>Quantum Compute Regulation Passes: Strategic pivots expected in sector weighted indices...</div>
                    </div>
                    <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'white', opacity: 0.6, fontSize: '0.7rem', fontWeight: '800' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Activity size={12} /> BITRATE: 125MBPS</div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Cpu size={12} /> GPU: 92% LOAD</div>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
              {isProducing ? (
                <motion.div 
                  key="producing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050608', position: 'relative' }}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', zIndex: 10 }}
                  >
                    <div style={{ color: 'var(--student-primary)', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                      {React.createElement(productionSteps[prodStep].icon, { size: 80, className: "pulse" })}
                    </div>
                    <h3 className="heading" style={{ color: 'white', fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.75rem' }}>{productionSteps[prodStep].name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '500' }}>{productionSteps[prodStep].detail}</p>
                  </motion.div>

                  <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                    <div className="pulse" style={{ position: 'absolute', top: '20%', left: '20%', width: '40%', height: '40%', background: 'var(--student-primary)', borderRadius: '50%', filter: 'blur(120px)' }} />
                    <div className="pulse" style={{ position: 'absolute', bottom: '20%', right: '20%', width: '40%', height: '40%', background: 'var(--investor-primary)', borderRadius: '50%', filter: 'blur(120px)' }} />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" 
                    alt="Studio Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <motion.button 
                      onClick={() => onNotify("Select an article to begin visual synthesis.", "info")}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                      style={{ 
                        width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(30px)', border: '2px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)'
                      }}
                    >
                      <Play size={40} fill="white" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNotify("Spatial profile: 'Institutional Focus' active.", "info")}
                className="glass-card" 
                style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', fontWeight: '800', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', fontSize: '0.9rem' }}
              >
                <Music size={18} /> Atmos Mix
              </button>
              <button 
                onClick={() => onNotify("Visual Preset: 'Market Command' applied.", "info")}
                className="glass-card" 
                style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', fontWeight: '800', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', fontSize: '0.9rem' }}
              >
                <Maximize size={18} /> Data Overlay
              </button>
            </div>
            <div style={{ color: 'var(--text-muted)', fontWeight: '800', letterSpacing: '0.05em', fontSize: '0.8rem' }}>4K MASTER // PRORES 422</div>
          </div>
        </div>

        {/* Intelligence Assets Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 2vw, 2.5rem)', borderRadius: '2.5rem', flex: 1, backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <h3 className="heading" style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Sparkles size={24} style={{ color: 'var(--student-primary)' }} /> Asset Inventory
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { name: "Semiconductor Market Data", sync: "98%" },
                { name: "Global Supply Chain B-Roll", sync: "LIVE" },
                { name: "CEO Interview Audio (40hz)", sync: "HD" },
                { name: "Regional Sentiment Maps", sync: "89%" }
              ].map((asset, i) => (
                <div key={i} style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '1rem', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--student-primary)', flexShrink: 0 }}>
                    <Activity size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700' }}>INTELLIGENCE LAYER ACTIVE</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--student-primary)', flexShrink: 0 }}>{asset.sync}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.25rem' }}>
            <motion.div 
              onClick={() => onNotify("Visual project state synchronized.", "success")}
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }} 
              whileTap={{ scale: 0.98 }}
              className="glass-card" 
              style={{ padding: '1.5rem', borderRadius: '1.75rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
            >
              <Save size={28} style={{ color: 'var(--student-primary)' }} />
              <div style={{ fontWeight: '900', fontSize: '1rem' }}>SAVE REEL</div>
            </motion.div>
            <motion.div 
              onClick={() => onNotify("Dispatching 4K master to CDN...", "info")}
              whileHover={{ y: -5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }} 
              whileTap={{ scale: 0.98 }}
              className="glass-card" 
              style={{ padding: '1.5rem', borderRadius: '1.75rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
            >
              <Share2 size={28} style={{ color: 'var(--student-primary)' }} />
              <div style={{ fontWeight: '900', fontSize: '1rem' }}>EXPORT ALL</div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoStudio;
