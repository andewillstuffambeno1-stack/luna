'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getTimeBasedTheme } from '@/lib/theme';

function getMoonPhase(): string {
  const theme = getTimeBasedTheme();
  const hour = new Date().getHours();
  
  // Simple moon phase based on time of day
  if (hour >= 6 && hour < 12) return 'brightness_1'; // Full moon (day)
  if (hour >= 12 && hour < 18) return 'brightness_2'; // Waning
  if (hour >= 18 && hour < 24) return 'dark_mode'; // New moon (night)
  return 'brightness_3'; // Waxing (late night/early morning)
}

export default function Footer() {
  const [moonIcon, setMoonIcon] = useState('brightness_1');

  useEffect(() => {
    setMoonIcon(getMoonPhase());
    const interval = setInterval(() => {
      setMoonIcon(getMoonPhase());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="px-4 md:px-10 lg:px-20 flex justify-center py-10 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark">
      <div className="max-w-5xl flex-1 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-sm text-subtext-light dark:text-subtext-dark text-center sm:text-left">
          <p>© 2025 Lunaflight. Making global mobility accessible to everyone.</p>
          <nav className="mt-2 flex gap-4 justify-center sm:justify-start">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contact
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-subtext-light dark:text-subtext-dark">
          <a className="hover:text-primary transition-colors" href="#" aria-label="Twitter">
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
          <a className="hover:text-primary transition-colors" href="#" aria-label="GitHub">
            <span className="material-symbols-outlined">code</span>
          </a>
          <a className="hover:text-primary transition-colors" href="#" aria-label="Website">
            <span className="material-symbols-outlined">public</span>
          </a>
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="material-symbols-outlined"
            title="Moon phase indicator"
          >
            {moonIcon}
          </motion.span>
        </div>
      </div>
    </footer>
  );
}

