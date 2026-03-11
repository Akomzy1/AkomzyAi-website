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

/* ── Structured Data (@graph) ──────────────────────────────────────
   Comprehensive JSON-LD for SEO, AI SEO, GEO & AEO.
   Covers: WebSite · Organization · ProfessionalService ·
           FAQPage · ItemList (services)
   Update sameAs + logo before launch.
─────────────────────────────────────────────────────────────────── */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [

    /* ── 1. WebSite ─────────────────────────────────────────────── */
    {
      '@type':       'WebSite',
      '@id':         'https://akomzyai.com/#website',
      url:           'https://akomzyai.com',
      name:          'AkomzyAi Consulting',
      description:   'AI Automations, GEO, AEO, AI SEO, AI Ads & Governance for growth-stage businesses.',
      inLanguage:    'en-GB',
      publisher:     { '@id': 'https://akomzyai.com/#organization' },
    },

    /* ── 2. Organization + ProfessionalService ──────────────────── */
    {
      '@type':       ['Organization', 'ProfessionalService'],
      '@id':         'https://akomzyai.com/#organization',
      name:          'AkomzyAi Consulting',
      alternateName: ['AkomzyAi', 'Akomzy AI'],
      url:           'https://akomzyai.com',
      logo:          'https://akomzyai.com/images/logo.png',
      email:         'hello@akomzyai.com',
      description:   'AkomzyAi Consulting helps growth-stage businesses automate operations with AI, rank in AI-generated search results (AI SEO), get cited by ChatGPT and Gemini (GEO), appear in AI answer boxes (AEO), run ChatGPT Ads, and govern AI responsibly.',
      areaServed:    'Worldwide',
      priceRange:    '££',
      knowsAbout: [
        'AI Automation',
        'Generative Engine Optimisation',
        'Answer Engine Optimisation',
        'AI SEO',
        'AI Ads',
        'ChatGPT Ads',
        'n8n Automation',
        'GoHighLevel',
        'Make Automation',
        'Zapier Automation',
        'AI Governance',
        'Claude AI',
        'AI Agents',
        'Workflow Automation',
        'CRM Automation',
      ],
      contactPoint: {
        '@type':           'ContactPoint',
        contactType:       'customer service',
        email:             'hello@akomzyai.com',
        availableLanguage: 'English',
      },
      sameAs: [
        // 'https://twitter.com/akomzyai',
        // 'https://linkedin.com/company/akomzyai',
        // 'https://instagram.com/akomzyai',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'AI Consulting Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intelligent AI Workflow Automation', description: 'Build 24/7 automation systems on n8n, Airtable, Zapier, Make, and GoHighLevel.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom CRM & Revenue Automation', description: 'Lead capture, nurturing, and pipeline automation that converts prospects into predictable revenue.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI SEO', description: 'Optimise content to rank in AI-generated search results and next-generation search engines.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO — Generative Engine Optimisation', description: 'Position your business as the trusted source cited by ChatGPT, Gemini, and Perplexity.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AEO — Answer Engine Optimisation', description: 'Structure content so voice assistants and AI answer boxes surface your brand as the definitive response.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Ads — ChatGPT Ads', description: 'Targeted AI-native ad placements inside ChatGPT to reach high-intent buyers.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agents & Claude Code Solutions', description: 'Conversational AI agents and decision-making workflows for client queries and internal operations.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Governance, Web/Mobile Dev & Training', description: 'Responsible AI frameworks, scalable web and mobile development, and hands-on team training.' } },
        ],
      },
    },

    /* ── 3. WebPage ─────────────────────────────────────────────── */
    {
      '@type':          'WebPage',
      '@id':            'https://akomzyai.com/#webpage',
      url:              'https://akomzyai.com',
      name:             'AkomzyAi Consulting | AI Automations, GEO, AEO, AI SEO & AI Ads',
      isPartOf:         { '@id': 'https://akomzyai.com/#website' },
      about:            { '@id': 'https://akomzyai.com/#organization' },
      description:      'AkomzyAi Consulting delivers AI automation, GEO, AEO, AI SEO, ChatGPT Ads and AI governance for growth-stage businesses.',
      inLanguage:       'en-GB',
      dateModified:     new Date().toISOString().split('T')[0],
    },

    /* ── 4. FAQPage — critical for AEO & GEO ───────────────────── */
    {
      '@type': 'FAQPage',
      '@id':   'https://akomzyai.com/#faq',
      mainEntity: [
        {
          '@type':          'Question',
          name:             'What is GEO (Generative Engine Optimisation)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'GEO — Generative Engine Optimisation — is the practice of optimising your brand and content so that AI models like ChatGPT, Google Gemini, and Perplexity cite and recommend your business in their generated responses. AkomzyAi Consulting specialises in GEO strategies that position your brand as a trusted, frequently cited authority inside AI-generated answers.',
          },
        },
        {
          '@type':          'Question',
          name:             'What is AEO (Answer Engine Optimisation)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'AEO — Answer Engine Optimisation — is the process of structuring your website content so that voice assistants (Siri, Alexa, Google Assistant), featured snippets, and AI answer boxes surface your brand as the definitive response to user queries. AkomzyAi Consulting uses AEO to help businesses win zero-click positions and voice search results.',
          },
        },
        {
          '@type':          'Question',
          name:             'What is AI SEO and how is it different from traditional SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'AI SEO focuses on optimising your content to rank in AI-generated search results — including Google SGE (Search Generative Experience), Bing Copilot, and Perplexity. Unlike traditional SEO which targets blue-link rankings, AI SEO engineers your brand presence for next-generation search engines that answer rather than list. AkomzyAi Consulting builds AI SEO strategies that ensure your business appears in both traditional and AI-powered search.',
          },
        },
        {
          '@type':          'Question',
          name:             'What are ChatGPT Ads (AI Ads)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'ChatGPT Ads — also called AI Ads — are targeted paid placements inside ChatGPT and other AI platforms that let brands reach high-intent buyers directly within AI conversations. AkomzyAi Consulting helps businesses set up and optimise AI-native ad campaigns before the market becomes saturated.',
          },
        },
        {
          '@type':          'Question',
          name:             'What AI automation tools does AkomzyAi Consulting use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'AkomzyAi Consulting builds automation systems on n8n, Zapier, Make (formerly Integromat), Airtable, GoHighLevel, Notion, HubSpot, Slack, Stripe, and Claude AI. We select the right stack for each client\'s specific workflows and growth goals.',
          },
        },
        {
          '@type':          'Question',
          name:             'How long does it take to implement AI automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'Most AI automation projects at AkomzyAi Consulting follow a four-step process: Discovery, Design, Build & Deploy, and Optimise & Scale. Simple workflows can be live within days. Complex multi-system automations typically take two to six weeks. We provide full documentation, training, and ongoing support.',
          },
        },
        {
          '@type':          'Question',
          name:             'Does AkomzyAi Consulting offer AI governance services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'Yes. AkomzyAi Consulting provides AI governance frameworks that ensure your AI systems are responsible, compliant, and auditable. This includes policy development, risk assessment, and staff training so your entire organisation is AI-ready and confident.',
          },
        },
        {
          '@type':          'Question',
          name:             'Is the discovery call really free with no commitment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'Yes. AkomzyAi Consulting offers a free 30-minute discovery call with no commitment required. We map your highest-value automation opportunities in the first call and respond to every enquiry within 24 hours.',
          },
        },
      ],
    },

  ],
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
