import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Zap, 
  Brain, 
  Terminal as TerminalIcon,
  Minimize2,
  Maximize2,
  Loader2
} from 'lucide-react';
import { Persona } from '../../types';

interface AuraTerminalProps {
  persona: Persona;
}

const AuraTerminal: React.FC<AuraTerminalProps> = ({ persona }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'aura'; content: string }[]>([
    { role: 'aura', content: `Aura Intelligence Online. Sync'd with ${persona.toUpperCase()} profile. How can I assist your narrative analysis today?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Mock AI Response logic (for hackathon stability)
    // In production, this would call aiService.ts/Gemini
    setTimeout(() => {
        let response = "";
        if (userMsg.toLowerCase().includes('market')) {
            response = "Market Synthesis: Analysis shows short-term volatility in the Tech sector, but long-term accumulation remains steady. Recommend monitoring institutional flow.";
        } else if (userMsg.toLowerCase().includes('nifty')) {
            response = "Nifty 50 analysis detects a support level at 24,200. Aura Neural predicts a potential 0.5% breakout if global yields stabilize.";
        } else {
            response = `Interesting perspective. From a ${persona} standpoint, this narrative suggests emerging alpha in adjacent sectors. Shall I run a deep-dive?`;
        }
        
        setMessages(prev => [...prev, { role: 'aura', content: response }]);
        setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'var(--primary-gradient)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px -10px var(--primary)',
            fontSize: '2rem'
          }}
        >
          <Sparkles size={32} />
        </motion.button>
      )}

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                height: isMinimized ? '60px' : '600px',
                width: isMinimized ? '300px' : 'min(90vw, 450px)'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              backgroundColor: 'rgba(10, 12, 16, 0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2rem',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.4rem', borderRadius: '0.75rem', background: 'var(--primary-gradient)', color: 'white' }}>
                    <TerminalIcon size={18} />
                </div>
                <span style={{ fontWeight: '900', fontSize: '1rem', color: 'white', letterSpacing: '0.05em' }}>AURA TERMINAL</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                    onClick={() => setIsMinimized(!isMinimized)} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                >
                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                    onClick={() => setIsOpen(false)} 
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                >
                    <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div 
                    ref={scrollRef}
                    style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {messages.map((msg, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: msg.role === 'aura' ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ 
                                alignSelf: msg.role === 'aura' ? 'flex-start' : 'flex-end',
                                maxWidth: '85%',
                                padding: '1.25rem',
                                borderRadius: msg.role === 'aura' ? '0 1.5rem 1.5rem 1.5rem' : '1.5rem 0 1.5rem 1.5rem',
                                backgroundColor: msg.role === 'aura' ? 'rgba(255,255,255,0.03)' : 'var(--primary)',
                                border: msg.role === 'aura' ? '1px solid var(--border-subtle)' : 'none',
                                color: 'white',
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                fontWeight: '500'
                            }}
                        >
                            {msg.content}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', padding: '1rem' }}>
                            <Loader2 className="spin" size={16} color="var(--primary)" />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '800' }}>AURA IS ANALYZING...</span>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask Aura anything..."
                            style={{ 
                                flex: 1, 
                                padding: '1.25rem 1.75rem', 
                                borderRadius: '1.25rem', 
                                background: 'rgba(255,255,255,0.02)', 
                                border: '1px solid var(--border-subtle)',
                                color: 'white',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                fontSize: '1rem'
                            }}
                        />
                        <motion.button 
                            onClick={handleSend}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ 
                                padding: '0 1.5rem', 
                                borderRadius: '1.25rem', 
                                background: 'var(--primary-gradient)', 
                                border: 'none', 
                                color: 'white', 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Send size={20} />
                        </motion.button>
                    </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuraTerminal;
