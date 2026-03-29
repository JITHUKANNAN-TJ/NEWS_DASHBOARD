import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  TrendingUp, Brain, BarChart3, Video, Globe, 
  Menu, X, User, ChevronRight, Settings, LogOut,
  Command,
  Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeTab, setActiveTab, isMobile }) => {
  const menuItems = [
    { id: 'home', icon: TrendingUp, label: 'My ET Feed' },
    { id: 'navigator', icon: Brain, label: 'News Navigator' },
    { id: 'storyarc', icon: BarChart3, label: 'Story Arc' },
    { id: 'video', icon: Video, label: 'Video Studio' },
    { id: 'vernacular', icon: Globe, label: 'Vernacular' }
  ];

  const sidebarVariants: Variants = {
    open: { 
      width: isMobile ? 'min(85vw, 320px)' : '300px',
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 }
    },
    closed: { 
      width: isMobile ? 0 : '96px',
      x: isMobile ? '-100%' : 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 }
    }
  };

  return (
    <motion.div 
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        height: '100vh',
        boxShadow: isOpen ? '10px 0 40px rgba(0,0,0,0.5)' : 'none',
        position: isMobile ? 'fixed' : 'relative',
        left: 0,
        top: 0,
        zIndex: 100,
        overflow: 'hidden'
      }}
    >
      {/* Branding Section */}
      <div style={{
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100px',
        borderBottom: '1px solid var(--border-subtle)',
        minWidth: '280px'
      }}>
        <motion.div 
          animate={{ opacity: (isOpen || !isMobile) ? 1 : 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--investor-gradient)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 16px -4px var(--investor-primary)'
          }}>
            <Command size={24} />
          </div>
          <h1 className="heading" style={{ fontWeight: '900', fontSize: '1.75rem', color: 'white', letterSpacing: '-0.05em' }}>ET 2026</h1>
        </motion.div>
        
        {isMobile && (
          <motion.button
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: '0.6rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </motion.button>
        )}
      </div>

      {/* Primary Navigation */}
      <nav style={{ flex: 1, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '280px' }}>
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (isMobile) setIsOpen(false);
            }}
            whileHover={{ x: 6, backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              border: '1px solid transparent',
              borderColor: activeTab === item.id ? 'var(--border-subtle)' : 'transparent',
              backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeTab === item.id ? 'var(--primary)' : 'var(--text-dim)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
          >
            <item.icon size={24} style={{ 
                flexShrink: 0,
                color: activeTab === item.id ? 'var(--primary)' : 'inherit'
            }} />
            
            <AnimatePresence>
              {(isOpen || (!isMobile && isOpen)) && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  style={{ fontWeight: '800', fontSize: '1rem', letterSpacing: '0.02em' }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {activeTab === item.id && (
              <motion.div 
                layoutId="navTabIndicator"
                style={{ 
                    position: 'absolute', 
                    left: 0, 
                    width: '4px', 
                    height: '24px', 
                    backgroundColor: 'var(--primary)',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 15px var(--primary)'
                }} 
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* System Status / User Section */}
      <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid var(--border-subtle)', minWidth: '280px' }}>
        <AnimatePresence>
          {isOpen ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--founder-gradient)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '900',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  JD
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Intelligence Analyst</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> SYSTEM ONLINE
                    </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <motion.button whileHover={{ scale: 1.05 }} className="glass-card" style={{ flex: 1, padding: '0.75rem', fontSize: '0.8rem', fontWeight: '900', opacity: 0.5, background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>
                  <Settings size={16} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="glass-card" style={{ flex: 1, padding: '0.75rem', fontSize: '0.8rem', fontWeight: '900', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' }}>
                  <LogOut size={16} />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-center"
              style={{ padding: '0.5rem' }}
            >
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                background: 'var(--founder-gradient)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', color: 'white', 
                fontWeight: '900', boxShadow: 'var(--shadow-sm)'
              }}>
                JD
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
