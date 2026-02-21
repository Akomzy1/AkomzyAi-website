'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
   Update these without touching layout or animation logic.
───────────────────────────────────────────────────────────────── */
const HEADLINE    = 'We Help Businesses Automate, Govern & Scale with AI'
const SUBHEADLINE =
  'From intelligent workflows to revenue-generating systems — we architect AI-powered operations that run 24/7 and compound as your business grows.'
const TRUST = {
  tagline:    'AI Automations • Governance • Training',
  businesses: '50+',
  sla:        'Response within 24 hours',
  commitment: 'No commitment required',
} as const

/* ─────────────────────────────────────────────────────────────────
   MOTION HELPERS
───────────────────────────────────────────────────────────────── */
/** Shared entrance animation — fade + rise + micro-scale */
function entrance(delay: number) {
  return {
    initial:    { opacity: 0, y: 30, scale: 0.97 } as const,
    animate:    { opacity: 1, y: 0,  scale: 1    } as const,
    transition: {
      duration: 0.72,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  /* ── Mouse parallax (desktop only — springs back on leave) ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const sx   = useSpring(rawX, { stiffness: 38, damping: 22 })
  const sy   = useSpring(rawY, { stiffness: 38, damping: 22 })

  /* Each orb gets a different multiplier for depth illusion */
  const o1x = useTransform(sx, [-0.5, 0.5], [-28, 28])
  const o1y = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const o2x = useTransform(sx, [-0.5, 0.5], [22, -22])
  const o2y = useTransform(sy, [-0.5, 0.5], [14, -14])
  const o3x = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const o3y = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const o4x = useTransform(sx, [-0.5, 0.5], [8, -8])
  const o4y = useTransform(sy, [-0.5, 0.5], [12, -12])

  const trackMouse = (e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - r.left  - r.width  / 2) / r.width)
    rawY.set((e.clientY - r.top   - r.height / 2) / r.height)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={trackMouse}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      aria-label="Hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden grain"
      style={{ backgroundColor: 'var(--brand-teal-deeper)' }}
    >
      {/* ════════════════════════════════════════════════════════
          BACKGROUND LAYERS  (bottom → top stacking order)
          ════════════════════════════════════════════════════ */}

      {/* 1 · Subtle dot-mesh grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(150,230,229,0.055) 1px, transparent 0)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* 2 · Radial vignette — softens edges, focuses centre */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(27,79,92,0.55) 0%, transparent 72%)',
        }}
      />

      {/* 3 · Floating mint orbs (parallax + independent float)
           hero-orbs class → display:none on mobile via globals.css */}
      <div
        aria-hidden="true"
        className="hero-orbs absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Orb A — large, top-left, primary mint */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560, height: 560,
            top: '-8%', left: '-10%',
            backgroundColor: 'var(--brand-mint)',
            opacity: 0.11,
            filter: 'blur(72px)',
            willChange: 'transform',
            x: o1x, y: o1y,
          }}
          animate={{ scale: [1, 1.07, 1], opacity: [0.09, 0.15, 0.09] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orb B — medium, bottom-right, mint-muted */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: '2%', right: '-6%',
            backgroundColor: 'var(--brand-mint-muted)',
            opacity: 0.10,
            filter: 'blur(60px)',
            willChange: 'transform',
            x: o2x, y: o2y,
          }}
          animate={{ scale: [1.04, 1, 1.04], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />

        {/* Orb C — small, upper-right, teal (warm depth) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 260, height: 260,
            top: '12%', right: '8%',
            backgroundColor: 'var(--brand-teal)',
            opacity: 0.20,
            filter: 'blur(48px)',
            willChange: 'transform',
            x: o3x, y: o3y,
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Orb D — tiny accent, mid-left, mint-bright */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 160, height: 160,
            top: '52%', left: '12%',
            backgroundColor: 'var(--brand-mint-bright)',
            opacity: 0.08,
            filter: 'blur(40px)',
            willChange: 'transform',
            x: o4x, y: o4y,
          }}
          animate={{
            scale:   [1, 1.28, 1],
            opacity: [0.05, 0.11, 0.05],
            x:       [0, 10, 0],
            y:       [0, -12, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════
          CONTENT
          ════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}
      >

        {/* ── Eyebrow pill ── */}
        <motion.div {...entrance(0)} className="mb-7">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]"
            style={{
              color:           'var(--brand-mint)',
              backgroundColor: 'rgba(150, 230, 229, 0.09)',
              border:          '1px solid rgba(150, 230, 229, 0.20)',
            }}
          >
            {TRUST.tagline}
          </span>
        </motion.div>

        {/* ── Headline ── */}
        {/*
          Three accent words ("Automate", "Govern", "Scale") are individually
          wrapped in spans so they can be independently coloured/animated if
          needed without restructuring the headline.
        */}
        <motion.h1
          {...entrance(0.13)}
          className="font-extrabold leading-[1.07] tracking-[-0.025em] mb-7"
          style={{
            color:     'var(--brand-cream)',
            fontSize:  'clamp(2.4rem, 5.5vw + 0.5rem, 5.25rem)',
          }}
        >
          {/* Split text preserves exact copy from CLAUDE.md spec */}
          We Help Businesses{' '}
          <span style={{ color: 'var(--brand-mint)' }}>Automate</span>
          {', '}
          <span style={{ color: 'var(--brand-mint)' }}>Govern</span>
          {' & '}
          <span style={{ color: 'var(--brand-mint)' }}>Scale</span>
          {' with AI'}
        </motion.h1>

        {/* ── Subheadline — outcomes-focused ── */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 0.88, y: 0, scale: 1 }}
          transition={{ duration: 0.72, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed max-w-[42rem] mx-auto mb-10"
          style={{ color: 'var(--brand-ivory)' }}
        >
          {SUBHEADLINE}
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          {...entrance(0.34)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Primary — mint fill */}
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 font-bold rounded-xl pulse-glow
                       outline-none focus-visible:ring-2"
            style={{
              backgroundColor:      'var(--brand-mint)',
              color:                'var(--brand-teal-deeper)',
              padding:              '1rem 2.5rem',
              fontSize:             '1.0625rem',
              lineHeight:           1,
              '--tw-ring-color':    'var(--brand-mint)',
              '--tw-ring-offset-color': 'transparent',
            } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Discovery Call
          </motion.a>

          {/* Ghost — mint border */}
          <motion.a
            href="#services"
            className="inline-flex items-center gap-2 font-bold rounded-xl border-2
                       outline-none focus-visible:ring-2"
            style={{
              backgroundColor:      'transparent',
              color:                'var(--brand-mint)',
              borderColor:          'var(--brand-mint)',
              padding:              '1rem 2.5rem',
              fontSize:             '1.0625rem',
              lineHeight:           1,
              '--tw-ring-color':    'var(--brand-mint)',
              '--tw-ring-offset-color': 'transparent',
            } as React.CSSProperties}
            whileHover={{
              scale:           1.05,
              backgroundColor: 'rgba(150, 230, 229, 0.10)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            See Our Solutions
          </motion.a>
        </motion.div>

        {/* ── Trust indicator row ── */}
        <motion.div
          {...entrance(0.46)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          role="list"
          aria-label="Trust indicators"
        >

          {/* · Businesses served · */}
          <div role="listitem" className="flex items-center gap-2.5">
            {/* Decorative avatar stack */}
            <div
              className="flex -space-x-2 shrink-0"
              aria-hidden="true"
            >
              {(['A', 'B', 'C', 'D'] as const).map((letter, i) => (
                <div
                  key={letter}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center
                             text-[10px] font-bold select-none"
                  style={{
                    backgroundColor: i % 2 === 0
                      ? 'var(--brand-teal)'
                      : 'var(--brand-teal-dark)',
                    borderColor: 'var(--brand-teal-deeper)',
                    color:       'var(--brand-mint)',
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--brand-cream)' }}
            >
              {TRUST.businesses} businesses served
            </span>
          </div>

          <Divider />

          {/* · Response SLA · */}
          <TrustItem text={TRUST.sla} />

          <Divider />

          {/* · No commitment · */}
          <TrustItem text={TRUST.commitment} />

        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SCROLL INDICATOR
          ════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: 'var(--brand-mint-muted)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--brand-mint-muted)' }}
        >
          <ArrowDown size={15} strokeWidth={2.2} />
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════
          SECTION TRANSITION — fade to ProblemSolution off-white
          ════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--off-white) 100%)',
        }}
      />
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   INTERNAL MICRO-COMPONENTS
───────────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <span
      aria-hidden="true"
      className="hidden sm:block w-px h-4 shrink-0"
      style={{ backgroundColor: 'rgba(150, 230, 229, 0.22)' }}
    />
  )
}

function TrustItem({ text }: { text: string }) {
  return (
    <div role="listitem" className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: 'var(--brand-mint)' }}
      />
      <span
        className="text-sm"
        style={{ color: 'var(--brand-ivory)', opacity: 0.72 }}
      >
        {text}
      </span>
    </div>
  )
}
