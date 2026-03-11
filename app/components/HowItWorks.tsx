'use client'

import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, PenTool, Rocket, TrendingUp, ArrowRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
───────────────────────────────────────────────────────────────── */
const steps = [
  {
    number:      '01',
    Icon:        Search,
    title:       'Discovery',
    description: 'We audit your operations and pinpoint the highest-value automation opportunities specific to your business model.',
    benefit:     'Know exactly what to build — before spending a penny.',
  },
  {
    number:      '02',
    Icon:        PenTool,
    title:       'Design',
    description: 'We architect AI-powered systems tailored to your workflows, tools, and how your team actually works.',
    benefit:     'A clear blueprint built around your reality, not a template.',
  },
  {
    number:      '03',
    Icon:        Rocket,
    title:       'Build & Deploy',
    description: 'We implement, test, and launch your automated workflows with full documentation, training, and handover.',
    benefit:     'Production-ready systems delivered on schedule, every time.',
  },
  {
    number:      '04',
    Icon:        TrendingUp,
    title:       'Optimize & Scale',
    description: 'Ongoing support, AI governance, performance monitoring, and continuous scaling as your business grows.',
    benefit:     'Your long-term AI partner — not a one-time vendor.',
  },
] as const

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const sectionRef = useRef(null)
  const ctaRef     = useRef(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' })
  const ctaInView  = useInView(ctaRef,     { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      className="py-24 relative"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>

        {/* ── Section header ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--brand-mint-muted)' }}
          >
            How It Works
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--brand-teal)' }}
          >
            From First Call to Full Automation
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            A clear, structured four-step process that delivers results without
            disrupting your day-to-day operations.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Desktop horizontal connector
              Runs at the vertical centre of the mint circles (h-16 = 4rem → centre = 2rem).
              Hidden on mobile; animated scaleX left→right on reveal. */}
          <motion.div
            aria-hidden="true"
            className="absolute hidden lg:block h-0.5 pointer-events-none z-0"
            style={{
              top:             '2rem',
              left:            'calc(12.5% + 2.25rem)',
              right:           'calc(12.5% + 2.25rem)',
              backgroundColor: 'var(--brand-teal)',
              opacity:         0.20,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/*
            Layout strategy
            ───────────────
            Mobile  → flex-col  : steps stack vertically; a short teal
                                   connector div is inserted between each step.
            Desktop → lg:grid lg:grid-cols-4 : four equal columns.
                       The connector divs carry lg:hidden so they don't
                       disturb the grid count.
          */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
            {steps.map(({ number, Icon, title, description, benefit }, i) => (
              <Fragment key={number}>

                {/* ── Step card ── */}
                <motion.div
                  className="flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.14 * i }}
                >
                  {/* Mint circle — the numbered anchor */}
                  <div
                    className="relative z-10 shrink-0 w-16 h-16 rounded-full
                               flex items-center justify-center
                               text-2xl font-extrabold shadow-md"
                    style={{
                      backgroundColor: 'var(--brand-mint)',
                      color:           'var(--brand-teal-deeper)',
                    }}
                  >
                    {number}

                    {/* Subtle pulse ring */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: '0 0 0 6px rgba(150,230,229,0.18)',
                      }}
                    />
                  </div>

                  {/* Step content */}
                  <div className="pt-1 pb-4 lg:pt-0 lg:pb-0 lg:mt-6">
                    {/* Icon pill — secondary visual cue */}
                    <div
                      className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                 text-xs font-semibold mb-4"
                      style={{
                        backgroundColor: 'rgba(39,102,117,0.09)',
                        color:           'var(--brand-teal)',
                      }}
                    >
                      <Icon size={12} />
                      Step {number}
                    </div>

                    <h3
                      className="text-xl font-bold mb-2.5 leading-snug"
                      style={{ color: 'var(--dark-text)' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: 'var(--muted-text)' }}
                    >
                      {description}
                    </p>

                    {/* Benefit line */}
                    <p
                      className="text-sm font-medium italic"
                      style={{ color: 'var(--brand-teal)', opacity: 0.82 }}
                    >
                      {benefit}
                    </p>
                  </div>
                </motion.div>

                {/* Mobile vertical connector — hidden on lg+ (avoids grid disruption) */}
                {i < steps.length - 1 && (
                  <motion.div
                    aria-hidden="true"
                    className="lg:hidden ml-8 w-px self-stretch"
                    style={{
                      height:          '2.5rem',
                      backgroundColor: 'var(--brand-teal)',
                      opacity:         0.22,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.14 * i + 0.4 }}
                  />
                )}

              </Fragment>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          ref={ctaRef}
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const cal = (window as any)?.Cal?.ns?.['30min']
              if (cal) cal('modal', { calLink: 'tokunbo-akomolede-qduo4z/30min', config: { layout: 'month_view' } })
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base
                       transition-colors duration-200 pulse-glow cursor-pointer"
            style={{ backgroundColor: 'var(--brand-teal)', color: 'var(--brand-mint)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Start with a Discovery Call
            <ArrowRight size={17} strokeWidth={2.5} />
          </motion.button>
          <p
            className="mt-3 text-sm"
            style={{ color: 'var(--muted-text)', opacity: 0.7 }}
          >
            Free · No commitment · Response within 24 hours
          </p>
        </motion.div>

      </div>
    </section>
  )
}
