'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const steps = [
  {
    number: '1',
    icon: 'edit_note',
    title: 'Tell Us Your Journey',
    shortDescription: 'Provide basic details about your travel plans, destination, and purpose of visit.',
    longDescription: "Our smart form asks for key information like your citizenship, destination country, and the type of visa or permit you need. It's quick, intuitive, and completely secure.",
  },
  {
    number: '2',
    icon: 'map',
    title: 'Get Your Roadmap',
    shortDescription: 'Receive a personalized, step-by-step checklist of all required procedures and documents.',
    longDescription: "Lunaflight's AI analyzes your info and generates a custom plan, breaking down complex government requirements into simple, manageable tasks with clear deadlines.",
  },
  {
    number: '3',
    icon: 'flight_takeoff',
    title: 'Fly Confidently',
    shortDescription: 'Complete each task with AI-powered guidance and track your progress towards a successful journey.',
    longDescription: "Upload documents, get real-time status updates, and receive timely reminders. We're with you from application to approval, ensuring you're always on track.",
  },
];

export default function HowItWorks() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20 bg-card-light dark:bg-card-dark">
      <div className="flex flex-col items-center max-w-5xl flex-1 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            How It Works in 3 Simple Steps
          </h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              className="group/card cursor-pointer rounded-xl border border-border-light bg-background-light p-6 transition-all duration-300 hover:border-primary hover:shadow-lg dark:border-border-dark dark:bg-background-dark dark:hover:border-primary"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary transition-colors duration-300 group-hover/card:bg-primary group-hover/card:text-white">
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-primary">STEP {step.number}</p>
                    <p className="text-xl font-bold leading-normal text-text-light dark:text-text-dark">
                      {step.title}
                    </p>
                  </div>
                </div>
                <p className="text-subtext-light dark:text-subtext-dark">{step.shortDescription}</p>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-subtext-light dark:text-subtext-dark">{step.longDescription}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

