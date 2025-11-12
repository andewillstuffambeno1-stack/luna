'use client';

import { useState } from 'react';
import ThemeProvider from '@/components/ThemeProvider';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import HowItWorks from '@/components/HowItWorks';
import EarlyBirdBenefits from '@/components/EarlyBirdBenefits';
import FeatureShowcase from '@/components/FeatureShowcase';
import Testimonials from '@/components/Testimonials';
import CommunitySection from '@/components/CommunitySection';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ExitIntent from '@/components/ExitIntent';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  const handleEmailSuccess = (link: string) => {
    setReferralLink(link);
    setShowModal(true);
    
    // Track conversion
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'email_submission',
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="relative w-full flex flex-col overflow-x-hidden min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <main className="flex-1">
          <Hero onEmailSubmit={handleEmailSuccess} />
          <ValueProps />
          <HowItWorks />
          <EarlyBirdBenefits />
          <FeatureShowcase />
          <Testimonials />
          <CommunitySection />
          <FAQ />
          <FinalCTA onEmailSubmit={handleEmailSuccess} />
        </main>
        <Footer />
        <CookieConsent />
        <ExitIntent />
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          referralLink={referralLink}
        />
      </div>
    </ThemeProvider>
  );
}
