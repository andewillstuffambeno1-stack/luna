'use client';

import { useEffect, useRef } from 'react';

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
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    // ConvertKit form HTML with all required attributes
    const formHTML = `
      <form action="https://app.kit.com/forms/8766891/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="8766891" data-uid="4c9fe7fc8b" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800">
        <div data-style="clean">
          <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
          <div data-element="fields" data-stacked="false" class="seva-fields formkit-fields">
            <div class="formkit-field">
              <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="${placeholder}" required="" type="email">
            </div>
            <button data-element="submit" class="formkit-submit formkit-submit">
              <div class="formkit-spinner"><div></div><div></div><div></div></div>
              <span class="">${buttonText}</span>
            </button>
          </div>
          <div class="formkit-powered-by-convertkit-container">
            <a href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" data-element="powered-by" class="formkit-powered-by-convertkit" data-variant="dark" target="_blank" rel="nofollow">Built with Kit</a>
          </div>
        </div>
      </form>
    `;

    formRef.current.innerHTML = formHTML;

    // Hide error alert when empty
    const hideEmptyAlert = () => {
      const alert = formRef.current?.querySelector('.formkit-alert');
      if (alert && (!alert.textContent?.trim() || alert.children.length === 0)) {
        (alert as HTMLElement).style.display = 'none';
      }
    };

    // Hide alert initially and after ConvertKit initializes
    hideEmptyAlert();

    // Initialize ConvertKit form
    const initConvertKit = () => {
      if ((window as any).CK && typeof (window as any).CK.load === 'function') {
        (window as any).CK.load();
        // Hide alert after initialization
        setTimeout(hideEmptyAlert, 100);
      } else if ((window as any).convertkit && typeof (window as any).convertkit.load === 'function') {
        (window as any).convertkit.load();
        setTimeout(hideEmptyAlert, 100);
      }
    };

    // Try to initialize immediately if script is already loaded
    initConvertKit();

    // Also try after a short delay to ensure script is loaded
    const timeoutId = setTimeout(initConvertKit, 500);

    // Generate referral link using the same logic as email.ts
    const generateReferralLink = (email: string): string => {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lunaflight.com';
      const encodedEmail = encodeURIComponent(email);
      const timestamp = Date.now();
      // Create a hash similar to email.ts logic
      const hash = btoa(`${email}-${timestamp}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
      return `${baseUrl}/waitlist?ref=${hash}&email=${encodedEmail}`;
    };

    // Listen for form submission success
    const handleFormSuccess = () => {
      const form = formRef.current?.querySelector('form');
      if (form) {
        const emailInput = form.querySelector('input[name="email_address"]') as HTMLInputElement;
        const email = emailInput?.value || '';
        
        if (email && onSuccess) {
          // Generate referral link using proper logic
          const referralLink = generateReferralLink(email);
          onSuccess(referralLink);
        }
        
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
      }
    };

    // Track if we've already handled success to avoid duplicate calls
    let successHandled = false;
    // Store email before form submission (in case form is cleared after submission)
    let submittedEmail = '';

    // Listen for success message and manage alert visibility
    const observer = new MutationObserver(() => {
      const successAlert = formRef.current?.querySelector('.formkit-alert-success');
      if (successAlert && successAlert.textContent?.trim() && !successHandled) {
        successHandled = true;
        // Use stored email if available, otherwise try to get from form
        const email = submittedEmail || (() => {
          const form = formRef.current?.querySelector('form');
          const emailInput = form?.querySelector('input[name="email_address"]') as HTMLInputElement;
          return emailInput?.value || '';
        })();
        
        if (email && onSuccess) {
          const referralLink = generateReferralLink(email);
          onSuccess(referralLink);
        }
      }
      
      // Hide error alert if empty, show if it has content
      const errorAlert = formRef.current?.querySelector('.formkit-alert-error');
      if (errorAlert) {
        if (!errorAlert.textContent?.trim() || errorAlert.children.length === 0) {
          (errorAlert as HTMLElement).style.display = 'none';
        } else {
          (errorAlert as HTMLElement).style.display = 'block';
        }
      }
    });

    if (formRef.current) {
      observer.observe(formRef.current, { childList: true, subtree: true, characterData: true });
    }

    // Also listen for ConvertKit form submission events
    const form = formRef.current?.querySelector('form');
    if (form) {
      // Capture email before form submission
      form.addEventListener('submit', (e) => {
        // Reset success handled flag on new submission
        successHandled = false;
        const emailInput = form.querySelector('input[name="email_address"]') as HTMLInputElement;
        if (emailInput?.value) {
          submittedEmail = emailInput.value;
        }
      });
    }

    // Listen for ConvertKit custom events if available
    let handleConvertKitSuccess: ((event: any) => void) | null = null;
    if (typeof window !== 'undefined') {
      handleConvertKitSuccess = (event: any) => {
        if (!successHandled) {
          // Try to get email from event, stored email, or form
          const email = event.detail?.email || submittedEmail || (() => {
            const form = formRef.current?.querySelector('form');
            const emailInput = form?.querySelector('input[name="email_address"]') as HTMLInputElement;
            return emailInput?.value || '';
          })();
          
          if (email) {
            successHandled = true;
            const referralLink = generateReferralLink(email);
            if (onSuccess) {
              onSuccess(referralLink);
            }
          }
        }
      };

      // Listen for ConvertKit form success events
      window.addEventListener('convertkit:subscribed', handleConvertKitSuccess);
      window.addEventListener('ck:subscribed', handleConvertKitSuccess);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (typeof window !== 'undefined' && handleConvertKitSuccess) {
        window.removeEventListener('convertkit:subscribed', handleConvertKitSuccess);
        window.removeEventListener('ck:subscribed', handleConvertKitSuccess);
      }
    };
  }, [placeholder, buttonText, onSuccess]);

  const variantClass = variant === 'hero' ? 'convertkit-form-hero' : 'convertkit-form-cta';

  return (
    <div className={`w-full max-w-[520px] ${variantClass}`}>
      <div ref={formRef} className="convertkit-form-wrapper" />
    </div>
  );
}

