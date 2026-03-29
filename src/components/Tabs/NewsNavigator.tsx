import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Brain, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Cpu,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface NewsNavigatorProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const NewsNavigator: React.FC<NewsNavigatorProps> = ({ onNotify }) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthStep, setSynthStep] = useState(0);

  const synthSteps = [
    { name: "Narrative Synthesis", icon: Brain, detail: "Deep-mapping global intelligence vectors..." },
    { name: "Structural Mapping", icon: Cpu, detail: "Identifying market-altering catalyst nodes..." },
    { name: "Strategic Evaluation", icon: ShieldCheck, detail: "Assessing structural risk & impact alpha..." }
  ];

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setSynthStep(0);
    
    const interval = setInterval(() => {
      setSynthStep(prev => {
        if (prev >= synthSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSynthesizing(false);
            onNotify("Intelligence Briefing: Strategic Layer Online.", "success");
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
        gap: '2.5rem',
        backgroundColor: 'rgba(10, 12, 16, 0.4)',
        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)'
      }}
    >
      {/* Cinematic Header */}
      <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '2rem',
            background: 'var(--founder-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 20px 40px -10px var(--founder-primary)',
            flexShrink: 0
          }}>
            <Brain size={40} />
          </div>
          <div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '900', color: 'white', letterSpacing: '-0.04em' }}>News Navigator</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.25rem' }}>AI-powered interactive intelligence briefings.</p>
          </div>
        </div>
        
        <button 
          onClick={handleSynthesize}
          disabled={isSynthesizing}
          style={{
            padding: '1.25rem 2.5rem',
            background: 'var(--founder-gradient)',
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
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            width: 'auto'
          }}
        >
          {isSynthesizing ? <Activity className="spin" size={24} /> : <Sparkles size={24} />}
          {isSynthesizing ? 'SYNTHESIZING...' : 'START DEEP BROWSE'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1 }}>
        {/* Synthesis Status Area */}
        <AnimatePresence mode="wait">
          {isSynthesizing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ color: 'var(--founder-primary)', display: 'flex', justifyContent: 'center' }}>
                  {React.createElement(synthSteps[synthStep].icon, { size: 64, className: "pulse" })}
                </div>
                <div>
                   <h3 className="heading" style={{ color: 'white', fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>{synthSteps[synthStep].name}</h3>
                   <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', fontWeight: '600' }}>{synthSteps[synthStep].detail}</p>
                </div>
                <div style={{ width: '100%', maxWidth: '400px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((synthStep + 1) / synthSteps.length) * 100}%` }}
                    style={{ height: '100%', background: 'var(--founder-primary)', boxShadow: '0 0 15px var(--founder-primary)' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intelligence Briefing Document */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem', flex: 1 }}>
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
             <h4 style={{ fontWeight: '900', color: 'white', fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Zap size={20} className="text-primary" /> Integrated Summary
             </h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                  Strategic indicators suggest a structural pivot in the semiconductor sector. Regional focus shifts from long-lead nodes to agile local manufacturing pods, driven by Q1 regulatory shifts.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                    {[
                      { icon: <TrendingUp size={18} />, label: "GDP Impact", val: "+2.4%" },
                      { icon: <Globe size={18} />, label: "Supply Risk", val: "Critical" },
                      { icon: <BarChart3 size={18} />, label: "Tech Saturation", val: "Lo" }
                    ].map((m, i) => (
                      <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', borderRadius: '1.25rem', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border-subtle)', flex: '1 1 140px' }}>
                        <div style={{ color: 'var(--primary)' }}>{m.icon}</div>
                        <div>
                           <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800' }}>{m.label}</div>
                           <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'white' }}>{m.val}</div>
                        </div>
                      </div>
                    ))}
                </div>
             </div>
          </div>

          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
             <h4 style={{ fontWeight: '900', color: 'white', fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Cpu size={20} className="text-primary" /> Intelligence Nodes
             </h4>
             <div className="grid-responsive" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  "Market Summary: Semiconductor Q1",
                  "Editorial: The Rise of GenAI Ops",
                  "Data Table: Export Volumes 2026",
                  "Interview Transcript: CEO Alpha"
                ].map((node, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
                     style={{ 
                       padding: '1.5rem', 
                       backgroundColor: 'rgba(255,255,255,0.01)', 
                       borderRadius: '1.5rem', 
                       border: '1px solid var(--border-subtle)', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'space-between',
                       cursor: 'pointer'
                     }}
                   >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                        <span style={{ fontWeight: '800', color: 'white', fontSize: '1.1rem' }}>{node}</span>
                      </div>
                      <ChevronRight size={20} style={{ color: 'var(--text-dim)' }} />
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsNavigator;
