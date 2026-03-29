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
  BookOpen,
  Wifi,
  Loader2
} from 'lucide-react';
import { adaptCulturally } from '../../services/aiService';

interface VernacularEngineProps {
  onNotify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const VernacularEngine: React.FC<VernacularEngineProps> = ({ onNotify }) => {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [aiContent, setAiContent] = useState<{ translation: string; analogy: string } | null>(null);

  const languages = [
    { name: 'Hindi', native: 'हिन्दी', region: 'North/Central India' },
    { name: 'Tamil', native: 'தமிழ்', region: 'South India' },
    { name: 'Bengali', native: 'বাংলা', region: 'East India' },
    { name: 'Marathi', native: 'मराठी', region: 'West India' },
    { name: 'Gujarati', native: 'ગુજરાતી', region: 'West India' },
    { name: 'Telugu', native: 'తెలుగు', region: 'South India' }
  ];

  const handleTranslate = async () => {
    setIsTranslating(true);
    setAiContent(null);

    const sourceText = "The central bank is expected to maintain its hawkish stance in the upcoming policy meeting, citing persistent inflationary pressures in the manufacturing sector.";
    
    try {
      const data = await adaptCulturally(sourceText, selectedLang);
      setAiContent(data);
      setIsTranslating(false);
      onNotify(`Cultural mapping for ${selectedLang} complete.`, "success");
    } catch (error) {
      setIsTranslating(false);
      onNotify("Adaptation failed. Sync with Aura Engine lost.", "error");
    }
  };

  const handleVoiceNarration = () => {
    if (!aiContent) {
        onNotify("Adapt content first to generate voice masters.", "info");
        return;
    }
    onNotify(`Aura Vernacular Narration: Initiating ${selectedLang} synthesis...`, "success");
    
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(aiContent.translation);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    // Attempt to find a matching voice if possible, else use default
    synth.speak(utterance);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        padding: 'clamp(1rem, 3vw, 3.5rem)',
        borderRadius: '3rem',
        minHeight: '85vh',
        backgroundColor: 'rgba(10, 12, 16, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}
    >
      {/* Cinematic Header */}
      <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            boxShadow: '0 20px 40px -10px var(--investor-primary)',
            flexShrink: 0
          }}>
            <Globe size={40} />
          </div>
          <div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '900', color: 'white', letterSpacing: '-0.04em' }}>Cultural Adaptor</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.25rem' }}>Vernacular intelligence beyond simple translation.</p>
          </div>
        </div>
        
        <button 
          onClick={handleTranslate}
          disabled={isTranslating}
          style={{
            padding: '1.25rem 2.5rem',
            background: 'var(--investor-gradient)',
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
          {isTranslating ? <RefreshCcw className="spin" size={24} /> : <Languages size={24} />}
          {isTranslating ? 'ADAPTING...' : 'ADAPT CONTENT'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '3rem', flex: 1 }}>
        {/* Language Selection Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Map size={18} style={{ color: 'var(--investor-primary)' }} /> Select Cultural Paradigm
          </h4>
          <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {languages.map((lang) => (
              <motion.div
                key={lang.name}
                onClick={() => setSelectedLang(lang.name)}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  cursor: 'pointer',
                  border: selectedLang === lang.name ? '3px solid var(--investor-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedLang === lang.name ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.01)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', marginBottom: '0.2rem' }}>{lang.native}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: selectedLang === lang.name ? 'var(--investor-primary)' : 'var(--text-dim)' }}>{lang.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.75rem', fontWeight: '700' }}>{lang.region}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Adaptation & Preview Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 3rem)', borderRadius: '2.5rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                ) : aiContent ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}
                  >
                     <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--investor-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>ADAPTED TARGET ({selectedLang.toUpperCase()})</div>
                        <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', lineHeight: '1.3', color: 'white' }}>
                          {aiContent.translation}
                        </p>
                     </div>

                     {/* Cultural Analogy Card */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ padding: '1.75rem', borderRadius: '2rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}
                     >
                        <div style={{ padding: '1rem', borderRadius: '1.25rem', backgroundColor: 'var(--founder-bg)', color: 'var(--founder-primary)', flexShrink: 0 }}>
                            <BookOpen size={24} />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--founder-primary)', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>CULTURAL ANALOGY</div>
                            <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white' }}>{aiContent.analogy}</div>
                        </div>
                     </motion.div>
                  </motion.div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                    <Languages size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                    <p style={{ fontWeight: '700' }}>Select a paradigm to begin cultural mapping.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Aura Voice Control Center */}
            <div style={{
              marginTop: 'clamp(2rem, 5vw, 5rem)',
              padding: 'clamp(1.5rem, 2vw, 2.5rem)',
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: '2.5rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <motion.div
                onClick={handleVoiceNarration}
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--founder-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: 'var(--shadow-lg)', flexShrink: 0 }}
              >
                <Volume2 size={36} />
              </motion.div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div className="heading" style={{ fontWeight: '900', fontSize: '1.4rem', color: 'white' }}>Aura Voice Broadcast</div>
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Synthesized {selectedLang} accent • Neural Fidelity: 98%</div>
              </div>
              <div className="hide-mobile" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="pulse" style={{ width: '4px', height: '24px', background: 'var(--founder-primary)', borderRadius: '2px' }} />
                <div className="pulse" style={{ width: '4px', height: '36px', background: 'var(--founder-primary)', borderRadius: '2px', animationDelay: '0.2s' }} />
                <div className="pulse" style={{ width: '4px', height: '18px', background: 'var(--founder-primary)', borderRadius: '2px', animationDelay: '0.4s' }} />
              </div>
              <button 
                onClick={() => onNotify("Packaging master vernacular audio...", "info")}
                style={{ padding: '1rem 2rem', borderRadius: '1.25rem', background: 'none', border: '2px solid var(--border-subtle)', color: 'white', fontWeight: '900', cursor: 'pointer', transition: 'all 0.3s ease', width: 'auto' }}
              >
                DOWNLOAD MASTER
              </button>
            </div>
          </div>
        </div>
    </motion.div>
  );
};

export default VernacularEngine;
