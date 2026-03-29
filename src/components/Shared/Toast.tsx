import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    error: <AlertCircle className="text-rose-500" size={20} />
  };

  const colors = {
    success: 'border-emerald-500/20 bg-emerald-500/5',
    info: 'border-blue-500/20 bg-blue-500/5',
    error: 'border-rose-500/20 bg-rose-500/5'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
          }}
        >
          <div className={`glass-panel ${colors[type]}`} style={{
            padding: '1rem 1.5rem',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            minWidth: '300px',
            border: '1px solid var(--border-subtle)'
          }}>
            {icons[type]}
            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)', flex: 1 }}>
              {message}
            </span>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
