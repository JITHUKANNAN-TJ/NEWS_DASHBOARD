import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Languages, 
  Globe, 
  Volume2, 
  Check, 
  Sparkles, 
  Mic, 
  RefreshCcw, 
  Map, 
  MessageSquare,
  Zap,
  BookOpen
} from 'lucide-react';

interface VernacularEngineProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const VernacularEngine: React.FC<VernacularEngineProps> = ({ onNotify }) => {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { name: 'Hindi', native: 'हिन्दी', region: 'North India', analogy: "Like a 'Bazaar' shift - sudden and high-volume." },
    { name: 'Tamil', native: 'தமிழ்', region: 'South India', analogy: "Steady as a 'Temple' foundation - long-term stability focus." },
    { name: 'Bengali', native: 'বাংলা', region: 'East India', analogy: "Fluid as a 'River' trade - high adaptability requirements." },
    { name: 'Marathi', native: 'मराठी', region: 'West India', analogy: "Resilient as a 'Fort' - protective of capital assets." },
    { name: 'Gujarati', native: 'ગુજરાતી', region: 'West India', analogy: "Sharp as a 'Merchant's' eye - optimization of every paisa." },
    { name: 'Telugu', native: 'తెలుగు', region: 'South India', analogy: "Precise as 'Tech' code - performance-driven logic." }
  ];

  const currentLang = languages.find(l => l.name === selectedLang) || languages[0];

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      onNotify(`Cultural mapping for ${selectedLang} complete.`, "success");
    }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{
        padding: '3rem',
        borderRadius: '3rem',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        backgroundColor: 'rgba(10, 12, 16, 0.4)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '2rem',
            background: 'var(--investor-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 20px 40px -10px var(--investor-primary)'
          }}>
            <Languages size={40} />
          </div>
          <div>
            <h2 className="heading" style={{ fontSize: '2.75rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Vernacular Engine</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.25rem' }}>AI-powered cultural adaptation across 12+ Indian paradigms.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
           <button 
            onClick={() => onNotify("Aura Microphone active. Analyzing local dialect...", "info")}
            className="glass-card" 
            style={{ padding: '0.9rem 1.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', background: 'rgba(255,255,255,0.03)' }}
          >
            <Mic size={20} /> Voice Sync
          </button>
           <button 
            onClick={() => onNotify("Global language nodes synchronized.", "success")}
            className="glass-card" 
            style={{ padding: '0.9rem 1.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', background: 'rgba(255,255,255,0.03)' }}
          >
            <Globe size={20} /> All Nodes
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '3rem', flex: 1 }}>
        {/* Language & Regional Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '0.1em', marginBottom: '2rem', textTransform: 'uppercase' }}>Selected Paradigm</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                {languages.map((lang) => (
                <motion.div
                    key={lang.name}
                    onClick={() => {
                        setSelectedLang(lang.name);
                        onNotify(`Switching cultural logic to ${lang.name} datasets...`, "info");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card"
                    style={{
                        padding: '1.5rem',
                        borderRadius: '1.5rem',
                        cursor: 'pointer',
                        border: selectedLang === lang.name ? '2px solid var(--investor-primary)' : '1px solid var(--border-subtle)',
                        backgroundColor: selectedLang === lang.name ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.5, marginBottom: '0.5rem', color: selectedLang === lang.name ? 'var(--investor-primary)' : 'white' }}>{lang.region.toUpperCase()}</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '900', marginBottom: '0.25rem' }}>{lang.name}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.8, color: 'var(--investor-primary)' }}>{lang.native}</div>
                </motion.div>
                ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', borderRadius: '2rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: 'var(--student-primary)' }}>
                <Map size={20} />
                <span style={{ fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Regional Data Overlay</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '800' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Local News Volume</span>
                    <span style={{ color: 'var(--student-primary)' }}>+24%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '800' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Regional Volatility</span>
                    <span style={{ color: 'var(--student-primary)' }}>LOW</span>
                </div>
            </div>
          </div>
        </div>

        {/* Translation & Cultural Adaptation Experience */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '3.5rem', borderRadius: '3rem', flex: 1, position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'var(--investor-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--investor-primary)' }}>
                    <Sparkles size={24} />
                </div>
                <div>
                    <h4 className="heading" style={{ fontSize: '1.5rem', fontWeight: '900' }}>Intelligence Synthesis</h4>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Context-Aware Broadcast Layer</p>
                </div>
              </div>
              <button 
                onClick={handleTranslate}
                disabled={isTranslating}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--investor-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1.25rem',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {isTranslating ? <RefreshCcw className="spin" size={20} /> : <Zap size={20} />}
                {isTranslating ? 'ADAPTING...' : 'REFRESH INTEL'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <section>
                <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--text-dim)', marginBottom: '1rem', letterSpacing: '0.1em' }}>MASTER SOURCE (GLOBAL ENGLISH)</div>
                <p style={{ fontSize: '1.35rem', fontWeight: '600', lineHeight: '1.6', color: 'var(--text-main)', opacity: 0.8 }}>
                  "The central bank is expected to maintain its hawkish stance in the upcoming policy meeting, citing persistent inflationary pressures in the manufacturing sector."
                </p>
              </section>

              <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

              <AnimatePresence mode="wait">
                {isTranslating ? (
                  <motion.div 
                    key="translating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
                  >
                    <div className="pulse" style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--investor-primary)' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--investor-primary)', opacity: 0.6 }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--investor-primary)', opacity: 0.3 }} />
                    </div>
                    <p style={{ fontWeight: '800', color: 'var(--investor-primary)', letterSpacing: '0.1em' }}>MAPPING CULTURAL VECTORS...</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                  >
                     <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--investor-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>ADAPTED TARGET ({selectedLang.toUpperCase()})</div>
                        <p style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.3', color: 'white' }}>
                          {selectedLang === 'Hindi' ? 
                            "केंद्रीय बैंक आगामी नीति बैठक में अपना सख्त रुख बरकरार रख सकता है, क्योंकि विनिर्माण क्षेत्र में मुद्रास्फीति का दबाव बना हुआ है।" :
                           selectedLang === 'Tamil' ?
                            "உற்பத்தித் துறையில் நீடித்த பணவீக்க அழுத்தங்களைக் மேற்கோள் காட்டி, வரவிருக்கும் கொள்கை கூட்டத்தில் மத்திய வங்கி தனது பருந்து நிலைப்பாட்டை தக்க வைத்துக் கொள்ளும் என்று எதிர்பார்க்கப்படுகிறது." :
                            `Intelligence briefing successfully adapted for ${selectedLang} cultural context.`
                          }
                        </p>
                     </div>

                     {/* Cultural Analogy Card */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ padding: '2rem', borderRadius: '2rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
                     >
                        <div style={{ padding: '1rem', borderRadius: '1.25rem', backgroundColor: 'var(--founder-bg)', color: 'var(--founder-primary)' }}>
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--founder-primary)', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>CULTURAL ANALOGY</div>
                            <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white' }}>{currentLang.analogy}</div>
                        </div>
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Aura Voice Control Center */}
            <div style={{
              marginTop: '5rem',
              padding: '2.5rem',
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: '2.5rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <motion.div
                onClick={() => onNotify("Aura Vernacular Narration: Initiated.", "success")}
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--founder-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: 'var(--shadow-lg)' }}
              >
                <Volume2 size={36} />
              </motion.div>
              <div style={{ flex: 1 }}>
                <div className="heading" style={{ fontWeight: '900', fontSize: '1.4rem', color: 'white' }}>Aura Voice Broadcast</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Synthesized {selectedLang} accent • Neural Fidelity: 98%</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="pulse" style={{ width: '4px', height: '24px', background: 'var(--founder-primary)', borderRadius: '2px' }} />
                <div className="pulse" style={{ width: '4px', height: '36px', background: 'var(--founder-primary)', borderRadius: '2px', animationDelay: '0.2s' }} />
                <div className="pulse" style={{ width: '4px', height: '18px', background: 'var(--founder-primary)', borderRadius: '2px', animationDelay: '0.4s' }} />
              </div>
              <button 
                onClick={() => onNotify("Packaging master vernacular audio...", "info")}
                style={{ padding: '1rem 2rem', borderRadius: '1.25rem', background: 'none', border: '2px solid var(--border-subtle)', color: 'white', fontWeight: '900', cursor: 'pointer', transition: 'all 0.3s ease' }}
              >
                DOWNLOAD MASTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VernacularEngine;
