'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS
───────────────────────────────────────────────────────────────── */
const stats = [
  {
    value:  500,
    suffix: '+',
    label:  'Hours Saved',
    sub:    'Per client, on average',
  },
  {
    value:  60,
    suffix: '%',
    label:  'Cost Reduction',
    sub:    'In operational overhead',
  },
  {
    value:  100,
    suffix: '+',
    label:  'Workflows Deployed',
    sub:    'Across diverse industries',
  },
  {
    value:  50,
    suffix: '+',
    label:  'Businesses Served',
    sub:    'From startups to enterprises',
  },
] as const

/* Placeholder testimonials — replace with real quotes before launch */
const testimonials = [
  {
    quote: 'Our lead follow-up went from manual and inconsistent to fully automated — same day, every time. The impact on our close rate was immediate.',
    role:  'Operations Manager',
    org:   'Professional Services Firm',
  },
  {
    quote: 'Within the first month we recovered hours every week that used to disappear into admin work. The systems they built just run in the background.',
    role:  'Founder',
    org:   'B2B SaaS Platform',
  },
  {
    quote: 'Finally an AI partner that thinks about governance from day one, not as an afterthought. That gave our leadership team real confidence to move fast.',
    role:  'CEO',
    org:   'FinTech Startup',
  },
] as const

/* ─────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
   Uses requestAnimationFrame + easeOutQuart for smooth deceleration.
   Each instance has its own IntersectionObserver trigger.
───────────────────────────────────────────────────────────────── */
function AnimatedCounter({
  value,
  suffix,
}: {
  value:  number
  suffix: string
}) {
  const [display, setDisplay] = useState(0)
  const spanRef  = useRef<HTMLSpanElement>(null)
  const isInView = useInView(spanRef, { once: true, margin: '-40px' })
  const rafId    = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isInView) return

    const DURATION = 1800 // ms
    const start    = performance.now()

    /* easeOutQuart: fast start, smooth deceleration */
    const ease = (t: number) => 1 - Math.pow(1 - t, 4)

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      setDisplay(Math.round(ease(t) * value))
      if (t < 1) rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => { if (rafId.current !== undefined) cancelAnimationFrame(rafId.current) }
  }, [isInView, value])

  return (
    <span ref={spanRef}>
      {display}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Results() {
  const headerRef      = useRef(null)
  const statsRef       = useRef(null)
  const testimonialRef = useRef(null)

  const headerInView      = useInView(headerRef,      { once: true, margin: '-80px' })
  const statsInView       = useInView(statsRef,       { once: true, margin: '-60px' })
  const testimonialInView = useInView(testimonialRef, { once: true, margin: '-60px' })

  return (
    <section
      className="py-24 relative overflow-hidden grain"
      style={{ backgroundColor: 'var(--brand-teal-deeper)' }}
    >
      {/* ── Decorative orbs (section-orb → display:none on mobile) ── */}
      <div
        aria-hidden="true"
        className="section-orb absolute -top-32 -right-20 w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--brand-mint)', opacity: 0.07 }}
      />
      <div
        aria-hidden="true"
        className="section-orb absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--brand-teal)', opacity: 0.22 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--brand-mint)' }}
          >
            Results That Speak
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: 'var(--brand-cream)' }}
          >
            Real Impact. Measurable Results.
          </h2>
        </motion.div>

        {/* ── Stats grid ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {stats.map(({ value, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              className="rounded-2xl px-6 py-8 text-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border:          '1px solid rgba(150,230,229,0.13)',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.10 * i }}
            >
              {/* Animated number */}
              <div
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold mb-2 leading-none tabular-nums"
                style={{ color: 'var(--brand-mint-bright)' }}
              >
                <AnimatedCounter value={value} suffix={suffix} />
              </div>

              {/* Label */}
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--brand-cream)' }}
              >
                {label}
              </div>

              {/* Sub-label */}
              <div
                className="text-xs leading-snug"
                style={{ color: 'rgba(255,255,251,0.58)' }}
              >
                {sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <div ref={testimonialRef}>

          {/* Sub-heading */}
          <motion.p
            className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-8"
            style={{ color: 'var(--brand-mint)' }}
            initial={{ opacity: 0 }}
            animate={testimonialInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ quote, role, org }, i) => (
              <motion.div
                key={role + org}
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border:          '1px solid rgba(150,230,229,0.13)',
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * (i + 1) }}
                whileHover={{
                  borderColor:     'rgba(150,230,229,0.30)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Quote icon */}
                <Quote
                  size={22}
                  className="mb-5 shrink-0"
                  style={{ color: 'var(--brand-mint)', opacity: 0.8 }}
                />

                {/* Quote body */}
                <p
                  className="text-[0.9375rem] leading-relaxed italic mb-6 flex-1"
                  style={{ color: 'var(--brand-ivory)', opacity: 0.88 }}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Separator */}
                <div
                  className="mb-5 h-px w-10"
                  style={{ backgroundColor: 'rgba(150,230,229,0.25)' }}
                />

                {/* Attribution — placeholder, no real names */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.15em]"
                    style={{ color: 'var(--brand-cream)' }}
                  >
                    {role}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--brand-mint-muted)' }}
                  >
                    {org}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
