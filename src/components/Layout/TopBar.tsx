import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Zap, Circle, ShieldCheck, Menu } from 'lucide-react';
import { Persona } from '../../types';

interface TopBarProps {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  onMenuClick: () => void;
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ persona, setPersona, onMenuClick, isMobile }) => {
  const personas: Persona[] = ['investor', 'founder', 'student'];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 1.25rem' : '0 3rem',
      backgroundColor: 'rgba(10, 12, 16, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
      height: 'var(--header-height)',
      boxSizing: 'border-box',
      zIndex: 80,
      gap: '1.5rem'
    }}>
      {/* Search & Menu Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem', flex: 1, minWidth: 0 }}>
        {isMobile && (
          <motion.button
            onClick={onMenuClick}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.75rem',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Menu size={24} />
          </motion.button>
        )}
        
        <div style={{ flex: 1, maxWidth: isMobile ? '100%' : '600px', position: 'relative' }}>
          <Search size={isMobile ? 18 : 22} style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-dim)'
          }} />
          <input
            type="text"
            placeholder={isMobile ? "Search..." : "Search Global Intelligence Node..."}
            style={{
              width: '100%',
              padding: isMobile ? '0.75rem 1rem 0.75rem 3rem' : '1rem 3.5rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1rem',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: '600',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>

      {/* Profile Selector & System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2.5rem' }}>
        
        {/* Persona Switcher Chips */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '1.25rem',
            padding: '0.4rem',
            border: '1px solid var(--border-subtle)'
          }}>
            {personas.map(p => (
              <motion.button
                key={p}
                onClick={() => setPersona(p)}
                whileHover={{ backgroundColor: persona === p ? 'var(--primary)' : 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.85rem',
                  border: 'none',
                  backgroundColor: persona === p ? `var(--${p}-primary)` : 'transparent',
                  color: persona === p ? 'white' : 'var(--text-dim)',
                  fontWeight: '900',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {persona === p && <Circle size={8} fill="white" />}
                {p}
              </motion.button>
            ))}
          </div>
        )}

        {/* System Indicators */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '1.5rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)' }}>
                  <ShieldCheck size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>ENCRYPTED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--investor-primary)' }}>
                  <Zap size={18} className="pulse" />
                  <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>LIVE SYNC</span>
              </div>
          </div>
        )}

        {/* User Actions */}
        <div style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1rem' }}>
            <button className={`${isMobile ? 'hide-mobile' : ''} glass-card`} style={{ padding: '0.75rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)', background: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                <Bell size={20} />
            </button>
            <div style={{ 
                width: isMobile ? '40px' : '44px', height: isMobile ? '40px' : '44px', borderRadius: '1rem', 
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
            }}>
                <User size={isMobile ? 20 : 24} style={{ color: 'var(--text-dim)' }} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
