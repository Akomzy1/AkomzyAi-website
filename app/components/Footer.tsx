'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Twitter, Linkedin, Instagram } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
───────────────────────────────────────────────────────────────── */
const quickLinks = [
  { label: 'Services',     href: '#services'     },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about'        },
  { label: 'Contact',      href: '#contact'      },
] as const

/* Replace href values with real profile URLs before launch */
const socials = [
  { Icon: Twitter,   label: 'Twitter / X', href: '#' },
  { Icon: Linkedin,  label: 'LinkedIn',    href: '#' },
  { Icon: Instagram, label: 'Instagram',   href: '#' },
] as const

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Footer() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      {/* ── Scoped hover styles ───────────────────────────────────
          .footer-link  : muted mint → brighter mint on hover
          .footer-social: subtle border pill, brightens on hover
      ─────────────────────────────────────────────────────────── */}
      <style>{`
        .footer-link {
          color:      var(--brand-mint-muted);
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--brand-mint-bright);
        }
        .footer-social {
          display:          flex;
          align-items:      center;
          justify-content:  center;
          width:            2.5rem;
          height:           2.5rem;
          border-radius:    0.5rem;
          border:           1px solid rgba(150, 230, 229, 0.12);
          color:            var(--brand-mint-muted);
          transition:
            background-color 0.2s ease,
            color            0.2s ease,
            border-color     0.2s ease;
        }
        .footer-social:hover {
          background-color: rgba(150, 230, 229, 0.14);
          color:            var(--brand-mint-bright);
          border-color:     rgba(150, 230, 229, 0.30);
        }
      `}</style>

      <footer
        ref={ref}
        className="relative grain"
        style={{ backgroundColor: 'var(--brand-teal-deeper)' }}
      >
        {/* Top gradient rule */}
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, rgba(150,230,229,0.18) 50%, transparent 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ── Three-column grid ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14"
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >

            {/* ── Brand column ── */}
            <div>
              {/* Wordmark */}
              <div className="flex items-baseline gap-0 mb-3">
                <span
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: 'var(--brand-mint)' }}
                >
                  Akomzy
                </span>
                <span
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: 'var(--brand-cream)' }}
                >
                  Ai
                </span>
                <span
                  className="text-2xl font-semibold tracking-tight ml-1.5"
                  style={{ color: 'var(--brand-cream)' }}
                >
                  Consulting
                </span>
              </div>

              {/* Tagline */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
                style={{ color: 'var(--brand-mint-muted)' }}
              >
                AI Automations&nbsp;&bull;&nbsp;Governance&nbsp;&bull;&nbsp;Training
              </p>

              {/* One-liner */}
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: 'rgba(255,255,251,0.40)' }}
              >
                Helping growth-stage businesses automate operations, govern AI
                responsibly, and scale with confidence.
              </p>
            </div>

            {/* ── Quick links ── */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: 'var(--brand-cream)' }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3.5">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link text-sm font-medium">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Connect ── */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: 'var(--brand-cream)' }}
              >
                Connect
              </h4>

              {/* Social icon pills */}
              <div className="flex items-center gap-3 mb-8">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="footer-social"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              {/* Soft CTA */}
              <a href="#contact" className="footer-link text-sm font-medium">
                Get in touch &rarr;
              </a>
            </div>

          </motion.div>

          {/* ── Bottom bar ── */}
          <motion.div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(150,230,229,0.10)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,251,0.28)' }}
            >
              &copy; 2026 AkomzyAi Consulting. All rights reserved.
            </p>
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,251,0.18)' }}
            >
              Built with Next.js &middot; Powered by AI
            </p>
          </motion.div>

        </div>
      </footer>
    </>
  )
}
