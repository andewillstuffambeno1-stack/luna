'use client';

import { motion } from 'framer-motion';
import EmailForm from './EmailForm';

interface FinalCTAProps {
  onEmailSubmit?: (referralLink: string) => void;
}

export default function FinalCTA({ onEmailSubmit }: FinalCTAProps) {
  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20">
      <div className="flex flex-col items-center max-w-5xl flex-1 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl max-w-2xl text-text-light dark:text-text-dark">
            Don't Miss Your Flight to Stress-Free Travel
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-2xl mx-auto">
            Be the first to know when we launch and secure your exclusive 50% discount. Your seamless journey is just one click away.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-lg"
        >
          <EmailForm
            variant="cta"
            placeholder="your.email@example.com"
            buttonText="Secure My 50% Discount →"
            onSuccess={onEmailSubmit}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 text-subtext-light dark:text-subtext-dark flex-wrap justify-center"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Data Secured</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">cancel</span>
            <span>No Spam</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">unsubscribe</span>
            <span>Unsubscribe Anytime</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

