'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ClipboardList,
  TrendingDown,
  Zap,
  HelpCircle,
  Clock,
  DollarSign,
  Layers,
  ArrowRight,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
───────────────────────────────────────────────────────────────── */
const HEADING    = 'Sound Familiar?'
const INTRO      = 'These are the conversations we have with every founder before they work with us.'

const BRIDGE_HEADING = 'This Is Exactly What We Fix'
const BRIDGE_BODY    =
  'AkomzyAi acts as your strategic AI partner and hands-on implementation team. We diagnose your ' +
  'operational gaps, design AI-powered systems around your actual workflow, and build them — so ' +
  'you move from chaos to compounding efficiency without the trial-and-error.'

const painPoints = [
  {
    Icon:        ClipboardList,
    title:       'Drowning in Manual Work',
    description: 'Your team handles tasks a system could automate in seconds — data entry, approval chains, follow-up sequences that never end.',
  },
  {
    Icon:        TrendingDown,
    title:       'Growth Creates More Bottlenecks',
    description: 'Every new client stretches your team thinner. Scaling means hiring more, not building smarter — and the ceiling keeps dropping.',
  },
  {
    Icon:        Zap,
    title:       'Leads and Revenue Slipping Away',
    description: 'Without automation, hot leads go cold, follow-ups fall through the cracks, and revenue opportunities vanish before you can capture them.',
  },
  {
    Icon:        HelpCircle,
    title:       'AI Feels Overwhelming',
    description: "You know AI is essential — but where to start, which tools to trust, and how to implement responsibly remains unclear.",
  },
]

const outcomes = [
  {
    Icon:        Clock,
    title:       'Hours Back Every Week',
    description: 'Repetitive tasks run on autopilot. Your team shifts from maintenance mode to momentum — focused on the work that drives revenue.',
  },
  {
    Icon:        DollarSign,
    title:       'Leaner Operational Costs',
    description: 'AI-powered systems replace manual processes, reducing your cost base without reducing output. Do more with the team you already have.',
  },
  {
    Icon:        Layers,
    title:       'Infrastructure That Scales',
    description: 'Systems architected to grow with you — more clients, more revenue, without the proportional increase in overhead and headcount.',
  },
]

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function ProblemSolution() {
  const painRef    = useRef(null)
  const bridgeRef  = useRef(null)
  const outcomeRef = useRef(null)

  const painInView    = useInView(painRef,    { once: true, margin: '-80px' })
  const bridgeInView  = useInView(bridgeRef,  { once: true, margin: '-80px' })
  const outcomeInView = useInView(outcomeRef, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ backgroundColor: 'var(--off-white)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={painRef}
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 28 }}
          animate={painInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--brand-mint-muted)' }}
          >
            The Problem
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--brand-teal)' }}
          >
            {HEADING}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-text)' }}>
            {INTRO}
          </p>
        </motion.div>

        {/* ── Pain point cards — 2×2 grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {painPoints.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="group bg-white rounded-2xl p-8 flex gap-5 cursor-default"
              style={{
                borderLeft:  '3px solid var(--brand-teal)',
                boxShadow:   '0 2px 12px rgba(27,79,92,0.06)',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={painInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.10 * (i + 1) }}
              whileHover={{
                y:         -3,
                boxShadow: '0 10px 28px rgba(27,79,92,0.12)',
              }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: 'rgba(39,102,117,0.09)' }}
              >
                <Icon size={18} style={{ color: 'var(--brand-teal)' }} />
              </div>

              {/* Text */}
              <div>
                <h3
                  className="text-lg font-bold mb-2 leading-snug"
                  style={{ color: 'var(--dark-text)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--muted-text)' }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bridge — problem → solution pivot ── */}
        <motion.div
          ref={bridgeRef}
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Connector arrow */}
          <div
            className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-7"
            style={{
              backgroundColor: 'var(--brand-teal)',
              color:           'var(--brand-mint)',
            }}
          >
            <ArrowRight size={18} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--brand-mint-muted)' }}
          >
            The AkomzyAi Approach
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight"
            style={{ color: 'var(--brand-teal)' }}
          >
            {BRIDGE_HEADING}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--muted-text)' }}
          >
            {BRIDGE_BODY}
          </p>
        </motion.div>

        {/* ── Outcome cards — 3 col ── */}
        <div
          ref={outcomeRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {outcomes.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl p-8 text-center cursor-default"
              style={{
                border:    '1px solid rgba(39,102,117,0.12)',
                boxShadow: '0 2px 12px rgba(27,79,92,0.05)',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={outcomeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 * i }}
              whileHover={{
                y:         -4,
                boxShadow: '0 12px 32px rgba(27,79,92,0.11)',
                borderColor: 'rgba(39,102,117,0.28)',
              }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: 'rgba(150,230,229,0.15)' }}
              >
                <Icon size={22} style={{ color: 'var(--brand-teal)' }} />
              </div>

              <h3
                className="text-lg font-bold mb-3 leading-snug"
                style={{ color: 'var(--dark-text)' }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted-text)' }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
