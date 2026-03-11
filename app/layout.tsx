import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

/* ── Google Fonts ──────────────────────────────────────────────── */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/* ── Site-wide metadata ────────────────────────────────────────────
   title.template applies to all child pages:
     e.g. a /blog/[slug] page exporting title: 'Post Title' renders
     "Post Title | AkomzyAi" automatically.
   title.default is used by the root page (app/page.tsx) which does
   not export its own metadata.
─────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://akomzyai.com'), // TODO: confirm domain before deploy

  title: {
    default:  'AkomzyAi Consulting | AI Automation, GEO, AEO, AI SEO & AI Ads',
    template: '%s | AkomzyAi Consulting',
  },

  description:
    'AkomzyAi Consulting helps growth-stage businesses automate operations, rank in AI-generated search (AI SEO), get cited by ChatGPT & Gemini (GEO), win AI answer boxes (AEO), run ChatGPT Ads, and govern AI responsibly. Free 30-min discovery call.',

  keywords: [
    /* Core brand */
    'AkomzyAi Consulting',
    'AI consulting',
    'AI automation',
    /* AI SEO / GEO / AEO */
    'AI SEO',
    'Generative Engine Optimisation',
    'GEO',
    'Answer Engine Optimisation',
    'AEO',
    'AI search optimisation',
    'rank in ChatGPT',
    'rank in Perplexity',
    'rank in Google SGE',
    /* AI Ads */
    'AI Ads',
    'ChatGPT Ads',
    'AI native advertising',
    /* Automation stack */
    'workflow automation',
    'n8n automation',
    'GoHighLevel automation',
    'Make automation',
    'Zapier automation',
    'Airtable automation',
    'CRM automation',
    'revenue automation',
    /* Governance & development */
    'AI governance',
    'AI training',
    'AI agents',
    'Claude AI agents',
    'web development',
    'mobile development',
    /* Audience */
    'AI for small business',
    'AI for growth-stage businesses',
    'business automation consulting',
  ],

  authors:  [{ name: 'AkomzyAi Consulting', url: 'https://akomzyai.com' }],
  creator:  'AkomzyAi Consulting',
  category: 'technology',

  /* Canonical + alternate languages */
  alternates: {
    canonical: 'https://akomzyai.com',
  },

  /* Crawling rules */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:            true,
      follow:           true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },

  /* Open Graph ─────────────────────────────────────────────────── */
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://akomzyai.com',
    siteName:    'AkomzyAi Consulting',
    title:       'AkomzyAi Consulting | AI Automation, GEO, AEO, AI SEO & AI Ads',
    description: 'AI Automation • GEO • AEO • AI SEO • AI Ads • Governance. We help growth-stage businesses rank in AI search, get cited by ChatGPT, and automate 24/7.',
    images: [
      {
        /* TODO: create a 1200×630 branded card and add to /public/images/ */
        url:    '/images/og-image.png',
        width:  1200,
        height: 630,
        alt:    'AkomzyAi Consulting — AI Automations, Governance & Training',
      },
    ],
  },

  /* Twitter / X Card ───────────────────────────────────────────── */
  twitter: {
    card:        'summary_large_image',
    /* TODO: set real Twitter handle once account is created */
    /* site:     '@akomzyai', */
    title:       'AkomzyAi Consulting | AI Automation, GEO, AEO, AI SEO & AI Ads',
    description: 'AI Automation • GEO • AEO • AI SEO • AI Ads • Governance for growth-stage businesses.',
    images:      ['/images/og-image.png'],
  },
}

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                  let cal = C.Cal; let ar = arguments;
                  if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
                  if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return; }
                  p(cal, ar);
                };
              })(window, "https://app.cal.eu/embed/embed.js", "init");
              Cal("init", "30min", {origin:"https://app.cal.eu"});
              Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
              Cal.ns["30min"]("preload", {"calLink":"tokunbo-akomolede-qduo4z/30min"});
            `,
          }}
        />
      </body>
    </html>
  )
}
