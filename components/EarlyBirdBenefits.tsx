'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { calculateCountdown, formatTimeUnit, type CountdownTime } from '@/lib/countdown';

const benefits = [
  '50% discount on all subscription plans for first 6 months',
  'Priority access to beta features including document verification',
  'Personal onboarding session with our travel experts',
  'Lifetime access to automatic day/night mode interface',
];

export default function EarlyBirdBenefits() {
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 60, hours: 0, minutes: 0, seconds: 0 });
  const [socialProof, setSocialProof] = useState(2847);

  useEffect(() => {
    // Set launch date to 60 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 60);

    const updateCountdown = () => {
      setCountdown(calculateCountdown(launchDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate social proof counter
    const target = 2847;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setSocialProof(target);
        clearInterval(timer);
      } else {
        setSocialProof(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 flex justify-center py-10 md:py-20">
      <div className="flex flex-col items-center max-w-5xl flex-1 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="tracking-tight text-3xl font-bold md:text-4xl text-text-light dark:text-text-dark">
            Exclusive Early Bird Benefits
          </h2>
          <p className="text-subtext-light dark:text-subtext-dark text-lg max-w-3xl mx-auto">
            Join the waitlist now and lock in these one-time offers before we launch to the public.
          </p>
        </motion.div>

        <div className="w-full max-w-4xl p-8 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-text-light dark:text-text-dark"
                >
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <p className="text-center font-semibold text-text-light dark:text-text-dark">Offer ends in:</p>
              <div className="flex gap-2 sm:gap-4">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((item, index) => (
                  <div key={item.label} className="flex grow basis-0 flex-col items-stretch gap-2">
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="flex h-16 sm:h-20 grow items-center justify-center rounded-lg px-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark"
                    >
                      <p className="text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark">
                        {formatTimeUnit(item.value)}
                      </p>
                    </motion.div>
                    <div className="flex items-center justify-center">
                      <p className="text-sm font-normal text-subtext-light dark:text-subtext-dark">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-lg font-semibold text-text-light dark:text-text-dark">
              Join <span className="text-primary">{socialProof.toLocaleString()}+</span> travelers already on the waitlist
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

