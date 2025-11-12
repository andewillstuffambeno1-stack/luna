'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const features = [
  {
    title: 'Onboarding Questionnaire',
    description: 'Simple, intuitive questions to understand your travel needs',
    image: 'https://via.placeholder.com/400x800/2563eb/ffffff?text=Questionnaire',
  },
  {
    title: 'Country Roadmap',
    description: 'Personalized checklist with progress tracking and milestones',
    image: 'https://via.placeholder.com/400x800/000000/ffffff?text=Roadmap',
  },
  {
    title: 'Document Verification',
    description: 'Secure upload and verification of your travel documents',
    image: 'https://via.placeholder.com/400x800/2563eb/ffffff?text=Documents',
  },
  {
    title: 'History Timeline',
    description: 'Track your journey and view all completed procedures',
    image: 'https://via.placeholder.com/400x800/000000/ffffff?text=History',
  },
];

export default function FeatureShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20 bg-card-light dark:bg-card-dark">
      <div className="flex flex-col max-w-5xl flex-1 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            See Lunaflight in Action
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-3xl mx-auto">
            Explore key features that make visa procedures simple and stress-free.
          </p>
        </motion.div>

        <div className="w-full max-w-4xl">
          <div className="relative">
            {/* App Mockup Carousel */}
            <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-background-dark border border-border-dark shadow-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : index > currentIndex ? 100 : -100,
                    scale: index === currentIndex ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                  style={{ zIndex: index === currentIndex ? 10 : 1 }}
                >
                  <div className="w-full h-full max-w-sm mx-auto flex items-center justify-center bg-card-dark rounded-lg border border-border-dark overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${feature.image})`,
                        filter: isDarkMode ? 'none' : 'invert(1)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Navigation Buttons */}
              <button
                onClick={prevFeature}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-lg transition-all backdrop-blur-sm"
                aria-label="Previous feature"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={nextFeature}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-lg transition-all backdrop-blur-sm"
                aria-label="Next feature"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-black text-white rounded-full p-3 shadow-lg transition-all backdrop-blur-sm"
                aria-label="Toggle preview mode"
              >
                <span className="material-symbols-outlined">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>

            {/* Feature Info */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-center"
            >
              <h3 className="text-2xl font-bold text-text-dark mb-2">
                {features[currentIndex].title}
              </h3>
              <p className="text-subtext-dark">
                {features[currentIndex].description}
              </p>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-border-dark hover:bg-primary/50 w-2'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

