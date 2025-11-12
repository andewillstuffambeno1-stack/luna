let mailchimp: any = null;

// Initialize Mailchimp if API key is provided (server-side only)
if (typeof window === 'undefined' && process.env.MAILCHIMP_API_KEY) {
  mailchimp = require('@mailchimp/mailchimp_marketing').default;
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_KEY.split('-')[1] || '',
  });
}

export interface EmailSubmissionResult {
  success: boolean;
  message: string;
  referralLink?: string;
}

function generateReferralLink(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lunaflight.com';
  const encodedEmail = encodeURIComponent(email);
  const timestamp = Date.now();
  const hash = btoa(`${email}-${timestamp}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  return `${baseUrl}/waitlist?ref=${hash}&email=${encodedEmail}`;
}

export async function submitToMailchimp(
  email: string,
  listId: string
): Promise<EmailSubmissionResult> {
  try {
    if (!process.env.MAILCHIMP_API_KEY || !mailchimp) {
      throw new Error('Mailchimp API key not configured');
    }

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      tags: ['waitlist', 'early-bird'],
    });

    const referralLink = generateReferralLink(email);

    return {
      success: true,
      message: 'Successfully added to waitlist!',
      referralLink,
    };
  } catch (error: any) {
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      const referralLink = generateReferralLink(email);
      return {
        success: true,
        message: 'You are already on the waitlist!',
        referralLink,
      };
    }
    throw error;
  }
}

export async function submitToConvertKit(
  email: string,
  formId?: string
): Promise<EmailSubmissionResult> {
  try {
    // For form subscriptions, use API Key (public)
    // For direct subscriber creation, use API Secret (private)
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const apiSecret = process.env.CONVERTKIT_API_SECRET;

    if (!apiKey && !apiSecret) {
      throw new Error('ConvertKit API credentials not configured');
    }

    let url: string;
    let body: any;

    if (formId && apiKey) {
      // Form subscription endpoint - uses public API key
      url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
      body = {
        api_key: apiKey,
        email,
        tags: ['waitlist', 'early-bird'],
      };
    } else if (apiSecret) {
      // Direct subscriber creation - uses API secret
      url = `https://api.convertkit.com/v3/subscribers`;
      body = {
        api_secret: apiSecret,
        email,
        tags: ['waitlist', 'early-bird'],
      };
    } else {
      throw new Error('ConvertKit API credentials not properly configured');
    }

    console.log('ConvertKit API call:', { url, email, hasFormId: !!formId });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('ConvertKit API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(
        responseData.message || 
        responseData.error || 
        `Failed to subscribe: ${response.statusText} (${response.status})`
      );
    }

    console.log('ConvertKit API success:', responseData);

    const referralLink = generateReferralLink(email);

    return {
      success: true,
      message: 'Successfully added to waitlist!',
      referralLink,
    };
  } catch (error: any) {
    console.error('ConvertKit subscription error:', error);
    
    // Handle duplicate subscriber gracefully
    if (
      error.message?.includes('already subscribed') || 
      error.message?.includes('duplicate') ||
      error.message?.includes('already exists')
    ) {
      const referralLink = generateReferralLink(email);
      return {
        success: true,
        message: 'You are already on the waitlist!',
        referralLink,
      };
    }
    throw error;
  }
}

export async function submitEmail(email: string): Promise<EmailSubmissionResult> {
  // Check if ConvertKit is configured
  const hasConvertKit = process.env.CONVERTKIT_API_KEY || process.env.CONVERTKIT_API_SECRET;
  
  if (hasConvertKit) {
    try {
      const formId = process.env.CONVERTKIT_FORM_ID;
      console.log('Attempting ConvertKit subscription:', { email, formId, hasApiKey: !!process.env.CONVERTKIT_API_KEY, hasApiSecret: !!process.env.CONVERTKIT_API_SECRET });
      return await submitToConvertKit(email, formId);
    } catch (error: any) {
      console.error('ConvertKit subscription failed:', error);
      // Re-throw the error so the API route can handle it properly
      // Don't silently fall back - we want to know if ConvertKit fails
      throw new Error(`ConvertKit subscription failed: ${error.message}`);
    }
  }

  // Fallback to Mailchimp if ConvertKit is not configured
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    try {
      return await submitToMailchimp(email, process.env.MAILCHIMP_LIST_ID);
    } catch (error) {
      console.error('Mailchimp error:', error);
      throw error;
    }
  }

  // If no email service is configured, throw an error
  throw new Error('No email service configured. Please set up ConvertKit or Mailchimp credentials.');
}

