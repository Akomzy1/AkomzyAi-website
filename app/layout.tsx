import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
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
    default:  'AkomzyAi Consulting | AI Automations, Governance & Training',
    template: '%s | AkomzyAi',
  },

  description:
    'AkomzyAi helps businesses automate, govern, and scale with AI. From intelligent workflows to revenue-generating systems — we build AI-powered operations that run 24/7.',

  keywords: [
    'AI consulting',
    'AI automation',
    'AI governance',
    'workflow automation',
    'n8n automation',
    'GoHighLevel',
    'Make',
    'Zapier',
    'business automation',
    'AI training',
    'AI agents',
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
    title:       'AkomzyAi Consulting | AI Automations, Governance & Training',
    description: 'AI Automations • Governance • Training. We help businesses automate, govern, and scale with AI.',
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
    title:       'AkomzyAi Consulting | AI Automations, Governance & Training',
    description: 'AI Automations • Governance • Training.',
    images:      ['/images/og-image.png'],
  },
}

/* ── Root layout ──────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
