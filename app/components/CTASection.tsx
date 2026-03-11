'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Calendar,
  Clock,
  Send,
  AlertCircle,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────
   CONFIGURATION — update both values before going live
───────────────────────────────────────────────────────────────── */

/**
 * FORMSPREE ENDPOINT
 * 1. Sign up at https://formspree.io
 * 2. Create a new form (set "Email" to hello@akomzyai.com)
 * 3. Copy the endpoint URL and paste it below
 * Example: 'https://formspree.io/f/xrgjaklq'
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'


/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type Status = 'idle' | 'submitting' | 'success' | 'error'
type Fields = { name: string; email: string; company: string; message: string }
const EMPTY: Fields = { name: '', email: '', company: '', message: '' }

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function CTASection() {
  const headerRef = useRef(null)
  const isInView  = useInView(headerRef, { once: true, margin: '-80px' })

  /* Form state */
  const [fields,   setFields]   = useState<Fields>(EMPTY)
  const [honeypot, setHoneypot] = useState('')       // spam trap
  const [status,   setStatus]   = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    /*
      Honeypot check — the _gotcha field is hidden from real users
      (display:none + tabIndex=-1 + aria-hidden). Bots fill every
      input they see; if it's non-empty we know it's spam. We bail
      silently rather than showing an error, so bots get no feedback.
      Formspree also performs its own server-side _gotcha check.
    */
    if (honeypot) return

    setStatus('submitting')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ ...fields, _gotcha: honeypot }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => { setFields(EMPTY); setStatus('idle') }

  return (
    <>
      {/* ── Scoped styles for form inputs ─────────────────────────────
          Inline styles alone can't express :focus / ::placeholder,
          so we use a scoped <style> block for those states only.
      ─────────────────────────────────────────────────────────────── */}
      <style>{`
        .cta-input {
          display:          block;
          width:            100%;
          background-color: rgba(15, 54, 64, 0.55);
          border:           1px solid rgba(150, 230, 229, 0.20);
          border-radius:    0.75rem;
          padding:          0.6875rem 1rem;
          color:            var(--brand-ivory);
          font-size:        0.9375rem;
          line-height:      1.5;
          outline:          none;
          transition:       border-color 0.2s ease,
                            background-color 0.2s ease,
                            box-shadow 0.2s ease;
        }
        .cta-input::placeholder {
          color: rgba(255, 255, 251, 0.30);
        }
        .cta-input:focus {
          border-color:     rgba(150, 230, 229, 0.55);
          background-color: rgba(15, 54, 64, 0.72);
          box-shadow:       0 0 0 3px rgba(150, 230, 229, 0.10);
        }
      `}</style>

      <section
        id="contact"
        className="py-24 relative overflow-hidden grain"
        style={{
          background: 'linear-gradient(145deg, var(--brand-teal) 0%, var(--brand-teal-deeper) 100%)',
        }}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3
                     w-[38rem] h-[38rem] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--brand-mint)', opacity: 0.09 }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ════════════════════════════════════════════════════════
              HEADLINE BLOCK
              ════════════════════════════════════════════════════ */}
          <motion.div
            ref={headerRef}
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--brand-mint)' }}
            >
              Get Started Today
            </p>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
              style={{ color: 'var(--brand-cream)' }}
            >
              Ready to Scale with AI?
            </h2>

            <p
              className="text-xl mb-8"
              style={{ color: 'var(--brand-ivory)', opacity: 0.82 }}
            >
              No commitment. Just clarity.
            </p>

            {/* Primary CTA — opens Cal.com modal */}
            <motion.button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const cal = (window as any)?.Cal?.ns?.['30min']
                if (cal) cal('modal', { calLink: 'tokunbo-akomolede-qduo4z/30min', config: { layout: 'month_view' } })
              }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl
                         font-bold text-lg pulse-glow cursor-pointer"
              style={{ backgroundColor: 'var(--brand-mint)', color: 'var(--brand-teal-deeper)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Your Free Discovery Call
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.button>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              TWO-COLUMN CONTACT GRID
              Mobile:  Form (order-1) above Calendly (order-2)
              Desktop: Calendly (lg:order-1) left, Form (lg:order-2) right
              ════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── LEFT: Calendly booking ──────────────────────────── */}
            <div
              id="booking"
              className="order-2 lg:order-1 rounded-2xl overflow-hidden"
              style={{
                backgroundColor:    'rgba(255,255,255,0.04)',
                border:             '1px solid rgba(150,230,229,0.13)',
                backdropFilter:     'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Card header */}
              <div
                className="px-8 pt-8 pb-6"
                style={{ borderBottom: '1px solid rgba(150,230,229,0.10)' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                  style={{ color: 'var(--brand-mint)' }}
                >
                  Fastest option
                </p>
                <h3
                  className="text-2xl font-bold leading-snug mb-1"
                  style={{ color: 'var(--brand-cream)' }}
                >
                  Book a Call
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,251,0.52)' }}>
                  30-min free discovery session — no sales pressure.
                </p>
              </div>

              {/*
                ── CALENDLY SLOT ─────────────────────────────────────────────
                PLACEHOLDER: shown when CALENDLY_URL is not yet configured.
                See the config block at the top of this file for full
                inline-embed instructions (Calendly JS snippet + next/script).
                ─────────────────────────────────────────────────────────────
              */}
              {/* Cal.com booking */}
              <div
                className="flex flex-col items-center justify-center text-center gap-6 px-8 py-14"
                style={{ minHeight: '380px' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(150,230,229,0.12)' }}
                >
                  <Calendar size={28} style={{ color: 'var(--brand-mint)' }} />
                </div>

                <div>
                  <p
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--brand-cream)' }}
                  >
                    Pick a time that works for you
                  </p>
                  <p
                    className="text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ color: 'rgba(255,255,251,0.50)' }}
                  >
                    30-minute free discovery session. No sales pressure — just
                    an honest conversation about how AI can move your business forward.
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: 'rgba(255,255,251,0.38)' }}
                >
                  <Clock size={13} />
                  30 min · Free · No commitment
                </div>

                <motion.button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const cal = (window as any)?.Cal?.ns?.['30min']
                    if (cal) cal('modal', { calLink: 'tokunbo-akomolede-qduo4z/30min', config: { layout: 'month_view' } })
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                             font-bold text-base pulse-glow cursor-pointer"
                  style={{ backgroundColor: 'var(--brand-mint)', color: 'var(--brand-teal-deeper)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Your Free Call
                  <ArrowRight size={17} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>

            {/* ── RIGHT: Contact form ──────────────────────────────── */}
            <div
              className="order-1 lg:order-2 rounded-2xl"
              style={{
                backgroundColor:    'rgba(255,255,255,0.04)',
                border:             '1px solid rgba(150,230,229,0.13)',
                backdropFilter:     'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Card header */}
              <div
                className="px-8 pt-8 pb-6"
                style={{ borderBottom: '1px solid rgba(150,230,229,0.10)' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                  style={{ color: 'var(--brand-mint)' }}
                >
                  Prefer to write first?
                </p>
                <h3
                  className="text-2xl font-bold leading-snug mb-1"
                  style={{ color: 'var(--brand-cream)' }}
                >
                  Send a Message
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,251,0.52)' }}>
                  We reply to every message within 24 hours.
                </p>
              </div>

              {/* Form / Success toggle */}
              <div className="px-8 py-8">
                <AnimatePresence mode="wait">

                  {/* ── SUCCESS ── */}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center text-center
                                 gap-5 py-12"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{    opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(150,230,229,0.15)' }}
                      >
                        <CheckCircle2 size={30} style={{ color: 'var(--brand-mint)' }} />
                      </div>

                      <div>
                        <p
                          className="text-xl font-bold mb-2"
                          style={{ color: 'var(--brand-cream)' }}
                        >
                          Message received!
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgba(255,255,251,0.58)' }}
                        >
                          We&apos;ll be in touch within 24 hours.
                          <br />Keep an eye on your inbox.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-sm font-semibold underline underline-offset-4
                                   transition-opacity hover:opacity-60"
                        style={{ color: 'var(--brand-mint)' }}
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}

                  {/* ── FORM ── */}
                  {status !== 'success' && (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{    opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/*
                        ── HONEYPOT FIELD — DO NOT REMOVE ────────────────────
                        Completely invisible to real users:
                          · display:none  — not rendered visually
                          · tabIndex=-1   — skipped by keyboard navigation
                          · aria-hidden   — skipped by screen readers
                          · autoComplete off — not auto-filled by password managers
                        Spam bots blindly fill every input they can find.
                        If this field is non-empty we silently discard the
                        submission. Formspree also checks _gotcha server-side.
                        ─────────────────────────────────────────────────────
                      */}
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        aria-hidden="true"
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ display: 'none' }}
                      />

                      {/* Name + Email — 2-col on sm+ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cta-name"
                            className="block text-xs font-semibold uppercase
                                       tracking-[0.12em] mb-1.5"
                            style={{ color: 'var(--brand-mint-muted)' }}
                          >
                            Name{' '}
                            <span aria-hidden="true" style={{ color: 'var(--brand-mint)' }}>
                              *
                            </span>
                          </label>
                          <input
                            id="cta-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Your name"
                            value={fields.name}
                            onChange={handleChange}
                            className="cta-input"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cta-email"
                            className="block text-xs font-semibold uppercase
                                       tracking-[0.12em] mb-1.5"
                            style={{ color: 'var(--brand-mint-muted)' }}
                          >
                            Email{' '}
                            <span aria-hidden="true" style={{ color: 'var(--brand-mint)' }}>
                              *
                            </span>
                          </label>
                          <input
                            id="cta-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={fields.email}
                            onChange={handleChange}
                            className="cta-input"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label
                          htmlFor="cta-company"
                          className="block text-xs font-semibold uppercase
                                     tracking-[0.12em] mb-1.5"
                          style={{ color: 'var(--brand-mint-muted)' }}
                        >
                          Company{' '}
                          <span
                            className="ml-1 text-[10px] font-normal normal-case tracking-normal"
                            style={{ color: 'rgba(255,255,251,0.33)' }}
                          >
                            optional
                          </span>
                        </label>
                        <input
                          id="cta-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Your company name"
                          value={fields.company}
                          onChange={handleChange}
                          className="cta-input"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="cta-message"
                          className="block text-xs font-semibold uppercase
                                     tracking-[0.12em] mb-1.5"
                          style={{ color: 'var(--brand-mint-muted)' }}
                        >
                          Message{' '}
                          <span aria-hidden="true" style={{ color: 'var(--brand-mint)' }}>
                            *
                          </span>
                        </label>
                        <textarea
                          id="cta-message"
                          name="message"
                          required
                          rows={4}
                          placeholder="Tell us about your business and what you'd like to automate…"
                          value={fields.message}
                          onChange={handleChange}
                          className="cta-input"
                          style={{ resize: 'none' }}
                        />
                      </div>

                      {/* Error message */}
                      {status === 'error' && (
                        <div
                          className="flex items-start gap-2.5 text-sm rounded-xl px-4 py-3"
                          role="alert"
                          aria-live="polite"
                          style={{
                            backgroundColor: 'rgba(255, 90, 90, 0.10)',
                            border:          '1px solid rgba(255, 90, 90, 0.22)',
                            color:           'rgba(255, 185, 185, 0.95)',
                          }}
                        >
                          <AlertCircle size={15} className="shrink-0 mt-0.5" />
                          <span>
                            Something went wrong. Email us directly at{' '}
                            <a
                              href="mailto:hello@akomzyai.com"
                              className="font-semibold underline underline-offset-2"
                            >
                              hello@akomzyai.com
                            </a>
                          </span>
                        </div>
                      )}

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center gap-2.5
                                   w-full py-4 rounded-xl font-bold text-base
                                   disabled:opacity-60 pulse-glow"
                        style={{
                          backgroundColor: 'var(--brand-mint)',
                          color:           'var(--brand-teal-deeper)',
                          cursor:          status === 'submitting' ? 'not-allowed' : 'pointer',
                        }}
                        whileHover={status !== 'submitting' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            Send Message
                          </>
                        )}
                      </motion.button>

                      <p
                        className="text-center text-xs"
                        style={{ color: 'rgba(255,255,251,0.32)' }}
                      >
                        Every submission is read and replied to personally.
                      </p>
                    </motion.form>
                  )}

                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Trust footer */}
          <motion.p
            className="text-center text-sm mt-12"
            style={{ color: 'rgba(255,255,251,0.32)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Trusted by 50+ businesses · Response within 24 hours · No commitment required
          </motion.p>

        </div>
      </section>
    </>
  )
}
