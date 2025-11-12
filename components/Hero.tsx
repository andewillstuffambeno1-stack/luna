'use client';

import { motion } from 'framer-motion';
import EmailForm from './EmailForm';

interface HeroProps {
  onEmailSubmit?: (referralLink: string) => void;
}

export default function Hero({ onEmailSubmit }: HeroProps) {
  return (
    <div className="relative w-full flex justify-center py-5">
      <div className="flex flex-col max-w-5xl flex-1 px-4 md:px-10 lg:px-20">
        <div className="flex min-h-[80vh] flex-col gap-6 md:gap-8 rounded-xl items-center justify-center p-4 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzIuOkZcy4fXFk4cNxvzWMqWn3WDIeICWjT4E6ebIAse4nneuT3oBIHnksOY3huWtnvnV-0b4bfvMkKOnJi8jeuGI6JC7ZzPiVZLD18o19zqvWvcxWhvF10gs7hpiV_U1P13C5HgZTHmjRFkm0OrS7uGRQK1cyRZbveJPCSffU5Gh7d6Q4nlNwjXEWL5AzX_QpQW0foXKlEKEYmZcm_VvPSr171f_puMD-GVqo9wLLFGEN7ZNQTpJzadUqLAX9_J3B8bMl3f8Lv9o")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 text-center max-w-3xl z-10"
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Your Journey Starts Here. Government Procedures Made Simple.
            </h1>
            <h2 className="text-gray-200 text-lg font-normal leading-normal md:text-xl">
              Lunaflight guides you through every official travel requirement with real-time updates, personalized roadmaps, and smart notifications. No more confusion, no more missed deadlines.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[520px] z-10"
          >
            <EmailForm
              variant="hero"
              placeholder="Enter your email address"
              buttonText="Join Waitlist"
              onSuccess={onEmailSubmit}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white text-sm z-10"
          >
            Get Early Access + 50% Off Launch Price
          </motion.p>

          {/* Animated moon/flight path decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-32 h-1 bg-white/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

