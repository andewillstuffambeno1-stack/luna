'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailFormProps {
  onSubmit?: (email: string) => void;
  placeholder?: string;
  buttonText?: string;
  variant?: 'hero' | 'cta';
  onSuccess?: (referralLink: string) => void;
}

export default function EmailForm({
  onSubmit,
  placeholder = 'Enter your email address',
  buttonText = 'Join Waitlist',
  variant = 'hero',
  onSuccess,
}: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    
    if (value.length > 0) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsValid(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        if (onSubmit) {
          onSubmit(email);
        }
        if (onSuccess && data.referralLink) {
          onSuccess(data.referralLink);
        }
        setEmail('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = variant === 'hero';
  const inputClasses = `flex w-full min-w-0 flex-1 resize-none overflow-hidden ${
    isDark
      ? 'text-white bg-card-dark border-border-dark placeholder:text-gray-400'
      : 'text-text-light dark:text-text-dark bg-transparent border-border-light dark:border-border-dark placeholder:text-subtext-light dark:placeholder:text-subtext-dark'
  } focus:outline-0 focus:ring-0 focus:border-primary h-full px-4 text-base font-normal leading-normal rounded-none border-x-0 ${
    !isValid ? 'border-red-500' : ''
  }`;

  const buttonClasses = `flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 md:h-12 md:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-wide md:text-base hover:bg-primary/90 transition-colors ${
    isLoading ? 'opacity-70 cursor-not-allowed' : ''
  }`;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[520px]">
      <div className="flex w-full flex-1 items-stretch rounded-lg h-14 md:h-16">
        <div
          className={`text-gray-400 flex border ${
            isDark
              ? 'border-border-dark bg-card-dark'
              : 'border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark'
          } items-center justify-center pl-4 rounded-l-lg border-r-0`}
        >
          <span className="material-symbols-outlined">mail</span>
        </div>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClasses}
          disabled={isLoading}
          required
        />
        <div
          className={`flex items-center justify-center rounded-r-lg border-l-0 border ${
            isDark
              ? 'border-border-dark bg-card-dark'
              : 'border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark'
          } pr-2`}
        >
          <motion.button
            type="submit"
            className={buttonClasses}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                <span className="truncate">Joining...</span>
              </span>
            ) : (
              <span className="truncate">{buttonText}</span>
            )}
          </motion.button>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}

