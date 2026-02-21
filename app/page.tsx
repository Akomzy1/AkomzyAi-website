/**
 * AkomzyAi Consulting — One-Page Landing
 *
 * Section anchor map (kept in sync with Navbar navLinks):
 *   #about         → ProblemSolution   pain points + strategic partner pitch
 *   #services      → Services          6-pillar bento grid
 *   #how-it-works  → HowItWorks        4-step process timeline
 *   #contact       → CTASection        primary conversion / book-a-call
 *
 * Scroll offset: CSS scroll-padding-top in globals.css (4.5rem mobile,
 * 5.5rem desktop) + JS offset in Navbar.tsx for pinpoint accuracy.
 *
 * Loading strategy
 * ─────────────────
 * Navbar and Hero are direct imports — they are above the fold and
 * must hydrate immediately. All below-fold sections use next/dynamic
 * so their JS bundles are code-split and downloaded only when the
 * browser is idle. SSR remains enabled (default) for SEO.
 */

import dynamic from 'next/dynamic'

import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import MotionProvider  from './components/MotionProvider'

/* ── Below-the-fold sections — code-split, SSR-enabled ─────────── */
const ProblemSolution = dynamic(() => import('./components/ProblemSolution'))
const Services        = dynamic(() => import('./components/Services'))
const HowItWorks      = dynamic(() => import('./components/HowItWorks'))
const Results         = dynamic(() => import('./components/Results'))
const TechMarquee     = dynamic(() => import('./components/TechMarquee'))
const CTASection      = dynamic(() => import('./components/CTASection'))
const Footer          = dynamic(() => import('./components/Footer'))

/* ── Organization JSON-LD ───────────────────────────────────────────
   Structured data for Google's Knowledge Panel and rich results.
   Update `sameAs` with real social profile URLs before launch.
   Schema: https://schema.org/Organization
─────────────────────────────────────────────────────────────────── */
const orgJsonLd = {
  '@context':   'https://schema.org',
  '@type':      'Organization',
  name:         'AkomzyAi Consulting',
  url:          'https://akomzyai.com',
  logo:         'https://akomzyai.com/images/logo.png', // TODO: upload real logo
  description:  'AI Automations, Governance & Training for growth-stage businesses.',
  email:        'hello@akomzyai.com',           // TODO: confirm address
  contactPoint: {
    '@type':       'ContactPoint',
    contactType:   'customer service',
    email:         'hello@akomzyai.com',
    availableLanguage: 'English',
  },
  sameAs: [
    // TODO: add real profile URLs once social accounts are live
    // 'https://twitter.com/akomzyai',
    // 'https://linkedin.com/company/akomzyai',
    // 'https://instagram.com/akomzyai',
  ],
  offers: {
    '@type':       'Service',
    name:          'AI Automation Consulting',
    description:   'Intelligent workflow automation, CRM, AI agents, governance, and training.',
    provider: {
      '@type': 'Organization',
      name:    'AkomzyAi Consulting',
    },
  },
}

export default function Home() {
  return (
    <>
      {/* ── Organization structured data (injected into <head> by Next.js) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/*
        MotionProvider wraps every section so Framer Motion respects the
        OS "prefers-reduced-motion: reduce" preference globally.
        This handles JS-driven animations; globals.css handles CSS ones.
      */}
      <MotionProvider>

        {/* ── Skip-to-content (keyboard / screen-reader accessibility) ──
            Hidden until focused; surfaces on Tab with brand mint styling. */}
        <a
          href="#main-content"
          className={[
            'sr-only',
            'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]',
            'focus:px-5 focus:py-2.5 focus:rounded-lg focus:text-sm focus:font-bold focus:shadow-lg',
          ].join(' ')}
          style={{ backgroundColor: 'var(--brand-mint)', color: 'var(--brand-teal-deeper)' }}
        >
          Skip to main content
        </a>

        {/* ── Sticky navigation ─────────────────────────────────────────
            Fixed, transparent → teal/blur on scroll.
            Hash links use JS smooth-scroll to offset below navbar height. */}
        <Navbar />

        {/* ── Main content ──────────────────────────────────────────── */}
        <main id="main-content" tabIndex={-1}>

          {/* 1. HERO — full-viewport, teal-deeper, animated mint orbs
                 Primary CTA  → #contact ("Book a Discovery Call")
                 Secondary    → #services ("See Our Solutions")       */}
          <Hero />

          {/* 2. PROBLEM → SOLUTION                       id="about"
                 Off-white bg. Surfaces the 4 core pain points every
                 B2B founder feels, then pivots to AkomzyAi's value prop:
                 "Your Strategic AI Partner — From Discovery to Scale"  */}
          <ProblemSolution />

          {/* 3. SERVICES BENTO GRID                   id="services"
                 Teal-dark bg. Glassmorphic 3-col grid, 6 pillars:
                 Workflow Automation · CRM · Internal Ops · Payments
                 AI Agents · Governance + Training                     */}
          <Services />

          {/* 4. HOW IT WORKS                         id="how-it-works"
                 Off-white bg. 4-step timeline with teal connector:
                 Discovery → Design → Build & Deploy → Optimize       */}
          <HowItWorks />

          {/* 5. RESULTS / SOCIAL PROOF
                 Teal-deeper bg. Animated counters: 500+ hours saved,
                 60% cost reduction, 100+ workflows, 50+ businesses.
                 Three founder/operator testimonial cards.             */}
          <Results />

          {/* 6. TECH STACK MARQUEE
                 Off-white bg. Infinite-scroll marquee of platforms:
                 n8n · Airtable · Zapier · Make · GoHighLevel · Claude
                 Notion · Slack · HubSpot · Stripe · OpenAI · Vercel  */}
          <TechMarquee />

          {/* 7. CTA / CONTACT                          id="contact"
                 Teal gradient bg. Single-focus conversion block.
                 "Book Your Free Discovery Call" → Calendly embed.
                 Contact form via Formspree. No commitment required.   */}
          <CTASection />

        </main>

        {/* ── Footer (outside <main> per HTML5 landmark semantics) ───── */}
        <Footer />

      </MotionProvider>
    </>
  )
}
