'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Workflow,
  DollarSign,
  Users,
  CreditCard,
  Bot,
  ShieldCheck,
  ArrowRight,
  Search,
  Globe,
  MessageSquare,
  Megaphone,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
   spanClass must be literal strings for Tailwind's scanner.
   wide=true → renders card horizontally (icon-left, text-right)
   on md+ breakpoint.
───────────────────────────────────────────────────────────────── */
const services = [
  {
    Icon:        Workflow,
    title:       'Intelligent AI Workflow Automation',
    description: 'Build 24/7 systems on n8n, Airtable, Zapier, Make, and GoHighLevel. Your operations keep running while you sleep — no manual hand-offs, no dropped steps.',
    spanClass:   'md:col-span-2 lg:col-span-2',
    wide:        true,
  },
  {
    Icon:        DollarSign,
    title:       'Custom CRM & Revenue Automation',
    description: 'Lead capture, nurturing, and pipeline automation that converts prospects into predictable revenue without manual chasing.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        Users,
    title:       'Internal Business Systems & Employee Management',
    description: 'Task automation, approval workflows, and operational comms on autopilot — freeing your team to focus on outcomes, not overhead.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        CreditCard,
    title:       'Secure Custom Payment Portals',
    description: 'Invoicing, subscriptions, and financial reporting — automated, secured, and always reconciled accurately.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        Bot,
    title:       'AI Agents, Clawbot & Claude Code Solutions',
    description: 'Conversational agents and decision-making workflows that handle client queries and internal operations around the clock.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        Search,
    title:       'AI SEO',
    description: 'Optimise your content to rank in AI-generated search results. We engineer your brand\'s presence for next-generation search engines that answer, not just list.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        Globe,
    title:       'GEO — Generative Engine Optimisation',
    description: 'Position your business as the trusted source cited by AI models like ChatGPT, Gemini, and Perplexity — ensuring you\'re recommended when it matters most.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        MessageSquare,
    title:       'AEO — Answer Engine Optimisation',
    description: 'Structure your content so voice assistants, featured snippets, and AI answer boxes surface your brand as the definitive response.',
    spanClass:   '',
    wide:        false,
  },
  {
    Icon:        Megaphone,
    title:       'AI Ads — ChatGPT Ads',
    description: 'Reach high-intent buyers inside ChatGPT with targeted AI-native ad placements — the new frontier of paid visibility before your competitors get there.',
    spanClass:   'md:col-span-2 lg:col-span-3',
    wide:        true,
  },
  {
    Icon:        ShieldCheck,
    title:       'AI Governance, Web/Mobile Dev + Training',
    description: 'Responsible AI frameworks, scalable web and mobile development, and hands-on team training — so your entire organization is AI-ready, compliant, and confident.',
    spanClass:   'md:col-span-2 lg:col-span-3',
    wide:        true,
  },
] as const

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Services() {
  const ref      = useRef(null)
  const ctaRef   = useRef(null)
  const isInView = useInView(ref,    { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden grain"
      style={{ backgroundColor: 'var(--brand-teal-dark)' }}
      ref={ref}
    >

      {/* ── Decorative orbs (section-orb → display:none on mobile) ── */}
      <div
        aria-hidden="true"
        className="section-orb absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--brand-mint)', opacity: 0.07 }}
      />
      <div
        aria-hidden="true"
        className="section-orb absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--brand-mint-muted)', opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--brand-mint)' }}
          >
            Our Services
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--brand-cream)' }}
          >
            Everything You Need to Run on AI
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--brand-ivory)', opacity: 0.82 }}
          >
            Ten service pillars covering the full stack of AI transformation —
            from workflows and automation to AI SEO, GEO, AEO, and AI Ads.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        {/*
          Desktop (lg): 3-col grid
            Row 1: Card 1 (2-col featured) + Card 2 (1-col)
            Row 2: Cards 3, 4, 5 (1-col each)
            Row 3: Card 6 (3-col full-width cap)
          Tablet (md): 2-col grid
            Card 1 and 6 span full width (md:col-span-2)
          Mobile: single column
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {services.map(({ Icon, title, description, spanClass, wide }, i) => (
            <motion.div
              key={title}
              className={[
                'relative rounded-2xl border p-7 cursor-default overflow-hidden',
                wide ? 'flex flex-col sm:flex-row gap-6 items-start' : 'flex flex-col',
                spanClass,
              ].filter(Boolean).join(' ')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderColor:     'rgba(150,230,229,0.13)',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              whileHover={{
                y:               -5,
                borderColor:     'rgba(150,230,229,0.42)',
                backgroundColor: 'rgba(255,255,255,0.09)',
                boxShadow:       '0 8px 36px rgba(150,230,229,0.10)',
              }}
            >
              {/* Subtle inner glow on the card edge — visible on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(150,230,229,0.06) 0%, transparent 70%)',
                }}
              />

              {/* Icon container */}
              <div
                className={[
                  'relative z-10 flex items-center justify-center rounded-xl shrink-0',
                  wide ? 'w-14 h-14 mt-0.5' : 'w-12 h-12 mb-5',
                ].join(' ')}
                style={{ backgroundColor: 'rgba(150,230,229,0.13)' }}
              >
                <Icon size={wide ? 26 : 22} style={{ color: 'var(--brand-mint)' }} />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3
                  className="text-xl font-bold mb-2.5 leading-snug"
                  style={{ color: 'var(--brand-cream)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-[0.9375rem] leading-relaxed"
                  style={{ color: 'rgba(255,255,251,0.66)' }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-6
                     rounded-2xl px-8 py-7"
          style={{
            backgroundColor: 'rgba(150,230,229,0.08)',
            border:          '1px solid rgba(150,230,229,0.18)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p
              className="text-xl font-bold leading-snug"
              style={{ color: 'var(--brand-cream)' }}
            >
              Ready to discuss your workflows?
            </p>
            <p
              className="text-sm mt-1.5"
              style={{ color: 'rgba(255,255,251,0.50)' }}
            >
              We&apos;ll map your highest-value automation opportunities in the first call.
            </p>
          </div>

          <motion.button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const cal = (window as any)?.Cal?.ns?.['30min']
              if (cal) {
                cal('modal', {
                  calLink: 'tokunbo-akomolede-qduo4z/30min',
                  config: { layout: 'month_view' },
                })
              }
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base
                       whitespace-nowrap shrink-0 pulse-glow cursor-pointer"
            style={{ backgroundColor: 'var(--brand-mint)', color: 'var(--brand-teal-deeper)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Call
            <ArrowRight size={17} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
