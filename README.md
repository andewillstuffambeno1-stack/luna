# Lunaflight Landing Page

A sleek, conversion-optimized waitlist landing page for Lunaflight - an AI-powered travel companion app.

## Features

- ✅ Automatic day/night mode switching based on local time (6 AM - 6 PM = light, 6 PM - 6 AM = dark)
- ✅ Mobile-first responsive design
- ✅ SEO-optimized with schema markup
- ✅ Email integration (Mailchimp/ConvertKit)
- ✅ Real-time countdown timer (60 days from launch)
- ✅ Social proof counter with animations
- ✅ Interactive feature showcase carousel
- ✅ Cookie consent banner (GDPR/CCPA compliant)
- ✅ Exit intent popup
- ✅ Confirmation modal with referral links
- ✅ Google Analytics & Facebook Pixel ready
- ✅ Smooth animations with Framer Motion
- ✅ Parallax scrolling effects

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Configure your environment variables in `.env.local`:
   - Add your Mailchimp API key and list ID, OR
   - Add your ConvertKit API key and form ID
   - Add Google Analytics ID (optional)
   - Add Facebook Pixel ID (optional)
   - Set your app URL for referral links

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `MAILCHIMP_API_KEY` - Your Mailchimp API key
- `MAILCHIMP_LIST_ID` - Your Mailchimp list ID
- `CONVERTKIT_API_KEY` - Your ConvertKit API key (alternative to Mailchimp)
- `CONVERTKIT_FORM_ID` - Your ConvertKit form ID
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID
- `NEXT_PUBLIC_APP_URL` - Your app URL for referral links

## Project Structure

```
lunaflight/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Email submission API
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Main landing page
│   └── globals.css               # Global styles & theme
├── components/
│   ├── Hero.tsx                  # Hero section
│   ├── ValueProps.tsx            # Value proposition cards
│   ├── HowItWorks.tsx            # 3-step process
│   ├── EarlyBirdBenefits.tsx     # Benefits with countdown
│   ├── FeatureShowcase.tsx       # App mockup carousel
│   ├── Testimonials.tsx          # Testimonial cards
│   ├── CommunitySection.tsx      # Social proof
│   ├── FAQ.tsx                   # Collapsible FAQ
│   ├── FinalCTA.tsx              # Final call-to-action
│   ├── Footer.tsx                # Footer with moon icon
│   ├── EmailForm.tsx             # Reusable email form
│   ├── CookieConsent.tsx         # GDPR cookie banner
│   ├── ExitIntent.tsx            # Exit intent popup
│   ├── ConfirmationModal.tsx     # Post-signup modal
│   └── ThemeProvider.tsx         # Theme initialization
└── lib/
    ├── theme.ts                  # Day/night mode logic
    ├── email.ts                  # Email service integration
    └── countdown.ts              # Countdown utilities
```

## Customization

### Theme Colors
Edit `app/globals.css` to customize the color scheme:
- `--primary`: Accent color (default: #2563eb)
- `--background-light/dark`: Background colors
- `--text-light/dark`: Text colors
- `--subtext-light/dark`: Secondary text colors

### Launch Date
The countdown timer is set to 60 days from the current date. To change this, edit `components/EarlyBirdBenefits.tsx`:

```typescript
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 60); // Change 60 to your desired days
```

### Social Proof Counter
Edit the initial value in `components/EarlyBirdBenefits.tsx`:
```typescript
const [socialProof, setSocialProof] = useState(2847); // Change to your number
```

## Performance

The page is optimized for:
- Fast loading (<2s target)
- Mobile-first responsive design
- SEO best practices
- Accessibility (ARIA labels, semantic HTML)

## Analytics

Google Analytics and Facebook Pixel are configured but require environment variables. Events tracked:
- `waitlist_signup` - Email submission
- `exit_intent_conversion` - Exit intent popup interaction
- `Lead` - Facebook Pixel lead event

## License

© 2025 Lunaflight. All Rights Reserved.
