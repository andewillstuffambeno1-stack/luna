'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: 'When will Lunaflight launch?',
    answer: "We're targeting 60 days from now for our official launch. Waitlist members get early access 2 weeks before public release.",
  },
  {
    question: 'What countries will be supported?',
    answer: 'We launch with 50+ countries including US, UK, Canada, Australia, Schengen Zone, and major Asian destinations. New countries added monthly.',
  },
  {
    question: 'How much will subscriptions cost?',
    answer: 'Basic: $9.99/month, Pro: $19.99/month, Premium: $39.99/month. Waitlist members get 50% off all plans for first 6 months.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Bank-level encryption, GDPR/CCPA compliant, and zero-knowledge architecture for document verification.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20 bg-card-light dark:bg-card-dark">
      <div className="flex flex-col max-w-3xl flex-1 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-card-light dark:hover:bg-card-dark transition-colors"
              >
                <span className="text-lg font-bold text-text-light dark:text-text-dark pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-symbols-outlined text-primary flex-shrink-0"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-subtext-light dark:text-subtext-dark">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

