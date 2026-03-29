import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Persona, Story } from './types';
import { fetchNewsByPersona } from './services/newsService';
import { PERSONA_STORIES } from './data/mockData';

// Layout Components
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';

// Feature Components
import HomeFeed from './components/Tabs/HomeFeed';
import NewsNavigator from './components/Tabs/NewsNavigator';
import StoryArcTracker from './components/Tabs/StoryArcTracker';
import VideoStudio from './components/Tabs/VideoStudio';
import VernacularEngine from './components/Tabs/VernacularEngine';
import MarketRibbon from './components/Layout/MarketRibbon';

// Shared Components
import Toast, { ToastType } from './components/Shared/Toast';
import ImpactModal from './components/Tabs/ImpactModal';
import AuraTerminal from './components/Shared/AuraTerminal';

const App = () => {
  const [persona, setPersona] = useState<Persona>('investor');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [activeTab, setActiveTab] = useState('home');
  
  // Data State
  const [stories, setStories] = useState<Story[]>(PERSONA_STORIES[persona]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Interaction State
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Responsive Listener
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 4000);
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const liveStories = await fetchNewsByPersona(persona);
        if (liveStories.length > 0) {
          setStories(liveStories);
        } else {
          setStories(PERSONA_STORIES[persona]);
        }
      } catch (err) {
        setError('Failed to fetch live updates. Showing cached intelligence.');
        setStories(PERSONA_STORIES[persona]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [persona]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-main)',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Global Cinematic Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `radial-gradient(circle at 50% -20%, var(--${persona}-bg) 0%, transparent 70%)`,
        opacity: 0.6,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
        opacity: 0.05,
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Navigation Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(10, 12, 16, 0.4)',
        backdropFilter: 'blur(5px)',
        minWidth: 0, // Prevent flex-squashing
        width: 0 // Force flex to calculate based on available space
      }}>
        <MarketRibbon />

        {/* Global Top Bar */}
        <TopBar 
          persona={persona} 
          setPersona={setPersona} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />

        {/* Tab Content */}
        <main style={{
          flex: 1,
          padding: 'var(--main-padding)',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            >
              {activeTab === 'home' && (
                <HomeFeed 
                  persona={persona} 
                  stories={stories} 
                  isLoading={loading}
                  error={error}
                  onAnalyze={setSelectedStory}
                  onNotify={(msg) => showToast(msg, 'info')}
                />
              )}
              {activeTab === 'navigator' && (
                <NewsNavigator 
                  stories={stories}
                  persona={persona}
                  onNotify={showToast}
                />
              )}
              {activeTab === 'storyarc' && (
                <StoryArcTracker 
                  stories={stories}
                  onNotify={showToast}
                />
              )}
              {activeTab === 'video' && (
                <VideoStudio 
                  onNotify={showToast}
                />
              )}
              {activeTab === 'vernacular' && (
                <VernacularEngine 
                  onNotify={showToast}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 95
            }}
          />
        )}
      </AnimatePresence>

      {/* Global Feedback Layers */}
      <Toast 
        {...toast} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
      
      <AnimatePresence>
        {selectedStory && (
          <ImpactModal 
            story={selectedStory} 
            isOpen={!!selectedStory} 
            onClose={() => setSelectedStory(null)} 
          />
        )}
      </AnimatePresence>

      {/* Persistent AI Interaction Terminal */}
      <AuraTerminal persona={persona} />
    </div>
  );
};

export default App;
