'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('exit-intent-shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleDownload = () => {
    // In a real implementation, this would download a PDF
    // For now, we'll just close the modal
    setIsVisible(false);
    
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_conversion', {
        event_category: 'engagement',
        event_label: 'checklist_download',
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background-light dark:bg-background-dark rounded-xl p-8 max-w-md w-full border border-border-light dark:border-border-dark shadow-2xl">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">
                  Wait! Don't Leave Empty-Handed
                </h3>
                <p className="text-subtext-light dark:text-subtext-dark mb-6">
                  Get our free Visa Preparation Checklist PDF - a comprehensive guide to help you prepare for your visa application.
                </p>
                <button
                  onClick={handleDownload}
                  className="w-full px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-colors mb-4"
                >
                  Download Free Checklist
                </button>
                <button
                  onClick={handleClose}
                  className="text-sm text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
                >
                  No thanks, I'll pass
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

