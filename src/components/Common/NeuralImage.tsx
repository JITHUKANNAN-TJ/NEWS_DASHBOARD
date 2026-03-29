import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Image as ImageIcon, Loader2 } from 'lucide-react';

interface NeuralImageProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const NeuralImage: React.FC<NeuralImageProps> = ({ src, alt, className, style }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackKeywords = ['technology', 'business', 'cyberpunk', 'neural', 'network', 'abstraction'];
  const keyword = fallbackKeywords[Math.floor(Math.random() * fallbackKeywords.length)];
  const fallbackSrc = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop&q=${keyword}`;

  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: 'rgba(255,255,255,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style 
      }}
    >
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, background: 'var(--card-bg)' }}
          >
            <Loader2 className="spin" size={20} color="var(--primary)" />
          </motion.div>
        )}

        {error ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 18, 24, 0.4) 100%)',
              gap: '0.5rem',
              textAlign: 'center',
              padding: '1rem'
            }}
          >
            <Brain size={24} color="var(--primary)" style={{ opacity: 0.5 }} />
            <span style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>NEURAL RECALL MODE</span>
          </motion.div>
        ) : (
          <motion.img
            key="image"
            src={src || fallbackSrc}
            alt={alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: loading ? 0 : 1, scale: loading ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              display: loading ? 'none' : 'block'
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeuralImage;
