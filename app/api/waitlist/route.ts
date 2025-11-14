import { NextRequest, NextResponse } from 'next/server';
import { submitEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  let body: { email?: string } = {};
  try {
    body = await request.json();
    const { email } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Submit to email service
    const result = await submitEmail(email);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Waitlist submission error:', {
      message: error.message,
      stack: error.stack,
      email: body?.email,
    });
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}

