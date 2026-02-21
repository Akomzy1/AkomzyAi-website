'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   EDITABLE CONSTANTS — add / remove tools here freely
   Dot colours must stay within the brand palette.
───────────────────────────────────────────────────────────────── */
const tools = [
  { name: 'n8n',          dot: 'var(--brand-teal)'         },
  { name: 'Airtable',     dot: 'var(--brand-mint)'         },
  { name: 'Zapier',       dot: 'var(--brand-mint-muted)'   },
  { name: 'Make',         dot: 'var(--brand-teal)'         },
  { name: 'GoHighLevel',  dot: 'var(--brand-mint-bright)'  },
  { name: 'Claude AI',    dot: 'var(--brand-mint)'         },
  { name: 'OpenAI',       dot: 'var(--brand-teal)'         },
  { name: 'Notion',       dot: 'var(--brand-mint-muted)'   },
  { name: 'Slack',        dot: 'var(--brand-mint-bright)'  },
  { name: 'HubSpot',      dot: 'var(--brand-teal)'         },
  { name: 'Stripe',       dot: 'var(--brand-mint)'         },
  { name: 'Vercel',       dot: 'var(--brand-mint-muted)'   },
] as const

/* ─────────────────────────────────────────────────────────────────
   CHIP — shared pill component
   Hover state is handled by the .marquee-chip CSS class below
   (inline styles alone can't express :hover).
───────────────────────────────────────────────────────────────── */
function Chip({ name, dot }: { name: string; dot: string }) {
  return (
    <div className="marquee-chip">
      <span
        aria-hidden="true"
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: dot }}
      />
      {name}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
   Marquee mechanic:
     The @keyframes marquee in globals.css goes:
       translateX(0) → translateX(-50%)
     So the animated element must be exactly 2× the visible track
     width (both sets side by side). When it reaches −50% it has
     moved exactly one full set off-screen and the duplicate fills
     in seamlessly. The animation loops at 0 and it all repeats.

   Reduced motion:
     useReducedMotion() (Framer Motion) detects the OS preference.
     When true, we skip the marquee entirely and render chips in a
     static flex-wrap grid — every tool is still visible.
───────────────────────────────────────────────────────────────── */
export default function TechMarquee() {
  const ref           = useRef(null)
  const isInView      = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  return (
    <>
      {/* ── Scoped hover styles for .marquee-chip ────────────────
          Using a JSX <style> block so :hover can override the
          base colours without needing !important on inline styles.
      ─────────────────────────────────────────────────────────── */}
      <style>{`
        .marquee-chip {
          display:          inline-flex;
          align-items:      center;
          gap:              0.625rem;
          padding:          0.625rem 1.25rem;
          border-radius:    9999px;
          border:           1px solid rgba(39, 102, 117, 0.15);
          background-color: #ffffff;
          color:            var(--dark-text);
          font-size:        0.875rem;
          font-weight:      500;
          white-space:      nowrap;
          cursor:           default;
          user-select:      none;
          transition:
            background-color 0.22s ease,
            color            0.22s ease,
            border-color     0.22s ease;
        }
        .marquee-chip:hover {
          background-color: rgba(150, 230, 229, 0.13);
          color:            var(--brand-teal);
          border-color:     rgba(150, 230, 229, 0.42);
        }
      `}</style>

      <section
        ref={ref}
        className="py-20"
        style={{ backgroundColor: 'var(--off-white)' }}
      >
        {/* ── Section heading ── */}
        <motion.div
          className="text-center mb-10 px-4"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--brand-mint-muted)' }}
          >
            Our Tech Stack
          </p>
          <p
            className="text-base font-medium"
            style={{ color: 'var(--muted-text)' }}
          >
            Powered by the tools you trust
          </p>
        </motion.div>

        {/* ── Reduced-motion: static flex-wrap ── */}
        {reducedMotion ? (
          <motion.div
            className="max-w-4xl mx-auto px-6 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {tools.map(({ name, dot }) => (
              <Chip key={name} name={name} dot={dot} />
            ))}
          </motion.div>
        ) : (
          /* ── Animated marquee ── */
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/*
              Track: inline-flex so its width = sum of both <ul> widths
              (= 2× one set). animate-marquee from globals.css applies
              translateX(0) → translateX(-50%) = scrolls exactly 1 set.
              gap-6 on the track ensures the seam between set A's last
              item and set B's first item matches the intra-set gap.
            */}
            <div className="animate-marquee inline-flex gap-6 py-3">

              {/* Set A — the real content, accessible to screen readers */}
              <ul
                className="flex gap-6 items-center list-none m-0 p-0 shrink-0"
                aria-label="Technology partners"
              >
                {tools.map(({ name, dot }) => (
                  <li key={`a-${name}`}>
                    <Chip name={name} dot={dot} />
                  </li>
                ))}
              </ul>

              {/* Set B — visual duplicate, hidden from screen readers */}
              <ul
                aria-hidden="true"
                className="flex gap-6 items-center list-none m-0 p-0 shrink-0"
              >
                {tools.map(({ name, dot }) => (
                  <li key={`b-${name}`}>
                    <Chip name={name} dot={dot} />
                  </li>
                ))}
              </ul>

            </div>

            {/* Left edge fade */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, var(--off-white) 0%, transparent 100%)',
              }}
            />
            {/* Right edge fade */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, var(--off-white) 0%, transparent 100%)',
              }}
            />
          </motion.div>
        )}
      </section>
    </>
  )
}
