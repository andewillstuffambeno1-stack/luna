'use client';

import { motion } from 'framer-motion';

const valueProps = [
  {
    icon: 'auto_awesome',
    title: 'Smart Guidance',
    description: 'AI-powered roadmap builder that adapts to your travel purpose and destination',
  },
  {
    icon: 'notifications_active',
    title: 'Real-time Updates',
    description: 'Official government procedure changes delivered instantly to your device',
  },
  {
    icon: 'emoji_events',
    title: 'Gamified Progress',
    description: 'Duolingo-style engagement keeps you motivated through complex processes',
  },
  {
    icon: 'verified_user',
    title: 'Document Security',
    description: 'Secure passport/visa verification to protect against fraud and fake documents',
  },
];

export default function ValueProps() {
  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20">
      <div className="flex flex-col max-w-5xl flex-1 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            Why Choose Lunaflight?
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-3xl mx-auto">
            Navigating global travel and residence procedures can be complex. Lunaflight simplifies every step with intelligent, secure, and personalized guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-1 gap-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 flex-col cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>
                {prop.icon}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{prop.title}</h3>
                <p className="text-subtext-light dark:text-subtext-dark text-base">{prop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

