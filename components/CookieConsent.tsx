'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    
    // Initialize analytics if consent given
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark p-4 md:p-6 shadow-lg"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-text-light dark:text-text-dark">
                We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                By clicking "Accept", you consent to our use of cookies. 
                <a href="#" className="text-primary hover:underline ml-1">
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors"
              >
                Reject
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 text-sm font-bold bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

