'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

/* ── Anchor map (must stay in sync with section id= in page.tsx) ── */
const navLinks = [
  { label: 'Services',     href: '#services'    },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about'        },
  { label: 'Contact',      href: '#contact'      },
]

/* Section IDs observed for active-state highlighting */
const SECTION_IDS = ['services', 'how-it-works', 'about', 'contact']

/* Navbar pixel heights — must mirror h-16 / h-20 Tailwind classes */
const NAV_H_MOBILE  = 64
const NAV_H_DESKTOP = 80
const SCROLL_BUFFER = 8

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId,   setActiveId]   = useState('')

  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)

  /* ── Scroll: darken nav after 20px ───────────────────────────── */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  /* ── Body scroll-lock while mobile overlay is open ───────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /* ── Active-section tracking via IntersectionObserver ─────────
     rootMargin cuts off the bottom 55% of the viewport, so only
     sections near the top of the screen are considered "active".  */
  useEffect(() => {
    const map = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => map.set(e.target.id, e.intersectionRatio))
        // Pick the observed section with the highest visible ratio
        let best = ''
        let bestRatio = 0
        map.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; best = id }
        })
        if (best) setActiveId(best)
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* ── Focus management: first link on open, hamburger on close ── */
  useEffect(() => {
    if (mobileOpen) {
      requestAnimationFrame(() => {
        overlayRef.current
          ?.querySelector<HTMLElement>('a[href], button')
          ?.focus()
      })
    }
  }, [mobileOpen])

  /* ── Keyboard: Escape closes overlay + Tab focus-trap ─────────── */
  useEffect(() => {
    if (!mobileOpen) return

    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"]), button:not([disabled])',
          ),
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  /* ── Smooth-scroll handler ───────────────────────────────────── */
  const scrollTo = useCallback(
    (
      e: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>,
      href: string,
    ) => {
      if (!href.startsWith('#')) return
      e.preventDefault()

      const wasOpen = mobileOpen
      if (wasOpen) setMobileOpen(false)

      const doScroll = () => {
        const el = document.getElementById(href.slice(1))
        if (!el) return
        const navH   = window.innerWidth >= 1024 ? NAV_H_DESKTOP : NAV_H_MOBILE
        const top    = el.getBoundingClientRect().top + window.scrollY - navH - SCROLL_BUFFER
        window.scrollTo({ top, behavior: 'smooth' })
      }

      /* Delay scroll until mobile overlay fade-out completes (200ms) */
      wasOpen ? setTimeout(doScroll, 220) : doScroll()
    },
    [mobileOpen],
  )

  /* ── Helper: close overlay and return focus to hamburger ─────── */
  const closeOverlay = useCallback(() => {
    setMobileOpen(false)
    setTimeout(() => hamburgerRef.current?.focus(), 220)
  }, [])

  /* ─────────────────────────────────────────────────────────────── */

  return (
    <>
      {/* ════════════════ DESKTOP / STICKY NAV ════════════════════ */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(27, 79, 92, 0.92)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(150, 230, 229, 0.12)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo wordmark ─────────────────────────────────── */}
            <Link
              href="/"
              aria-label="AkomzyAi Consulting — back to top"
              className="shrink-0 leading-none rounded focus-visible:outline-none"
              style={
                { '--tw-ring-color': 'var(--brand-mint)' } as React.CSSProperties
              }
              onClick={(e) => {
                /* If already at top just prevent default; else scroll to top */
                if (window.scrollY === 0) e.preventDefault()
                else {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              {/* Visible wordmark */}
              <span
                className="text-xl lg:text-2xl font-extrabold tracking-tight"
                aria-hidden="true"
              >
                <span style={{ color: 'var(--brand-mint)' }}>Akomzy</span>
                <span style={{ color: 'var(--brand-cream)' }}>Ai</span>
                <span
                  className="font-semibold"
                  style={{ color: 'var(--brand-cream)', opacity: 0.82 }}
                >
                  {' '}Consulting
                </span>
              </span>
              <span className="sr-only">AkomzyAi Consulting</span>
            </Link>

            {/* ── Desktop links (center) ────────────────────────── */}
            <ul
              className="hidden lg:flex items-center gap-1 list-none m-0 p-0"
              role="list"
            >
              {navLinks.map(({ label, href }) => {
                const id       = href.slice(1)
                const isActive = activeId === id
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => scrollTo(e, href)}
                      aria-current={isActive ? 'location' : undefined}
                      className="relative flex items-center px-3 py-2 text-sm font-medium rounded-md
                                 transition-colors duration-150 outline-none
                                 focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={
                        {
                          color: isActive
                            ? 'var(--brand-mint)'
                            : 'var(--brand-ivory)',
                          '--tw-ring-color':        'var(--brand-mint)',
                          '--tw-ring-offset-color': 'transparent',
                        } as React.CSSProperties
                      }
                    >
                      {label}
                      {/* Mint underline — scales in when active */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0.5 h-px rounded-full"
                        style={{
                          backgroundColor: 'var(--brand-mint)',
                          transform:        isActive ? 'scaleX(1)' : 'scaleX(0)',
                          opacity:          isActive ? 1 : 0,
                          transition:       'transform 200ms ease, opacity 200ms ease',
                          transformOrigin:  'left',
                        }}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* ── Desktop CTA (right) ───────────────────────────── */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-bold
                           transition-all duration-200 hover:scale-[1.04] pulse-glow
                           outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  {
                    backgroundColor:      'var(--brand-mint)',
                    color:                'var(--brand-teal-deeper)',
                    '--tw-ring-color':    'var(--brand-mint)',
                    '--tw-ring-offset-color': 'transparent',
                  } as React.CSSProperties
                }
              >
                Book a Call
              </a>
            </div>

            {/* ── Mobile hamburger ──────────────────────────────── */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-overlay"
              aria-haspopup="dialog"
              className="lg:hidden p-2 rounded-lg transition-colors duration-150
                         outline-none focus-visible:ring-2"
              style={
                {
                  color:             'var(--brand-ivory)',
                  '--tw-ring-color': 'var(--brand-mint)',
                } as React.CSSProperties
              }
            >
              <span aria-hidden="true">
                {mobileOpen
                  ? <X    size={24} strokeWidth={2.5} />
                  : <Menu size={24} strokeWidth={2.5} />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════ MOBILE OVERLAY ══════════════════════════ */}
      {/*
        visibility:hidden keeps elements out of tab order when closed.
        The delayed visibility transition lets opacity fade out before hiding.
        Focus-trap + Escape key are handled in the useEffect above.
      */}
      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
        style={{
          backgroundColor: 'var(--brand-teal-deeper)',
          opacity:    mobileOpen ? 1 : 0,
          visibility: mobileOpen ? 'visible' : 'hidden',
          /* Show instantly / fade-out then hide */
          transition: mobileOpen
            ? 'opacity 200ms ease, visibility 0ms ease'
            : 'opacity 200ms ease, visibility 0ms 200ms ease',
        }}
      >
        {/* Top bar with logo + close button */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 h-16"
          style={{ borderBottom: '1px solid rgba(150, 230, 229, 0.1)' }}
        >
          <span
            className="text-xl font-extrabold tracking-tight"
            aria-hidden="true"
          >
            <span style={{ color: 'var(--brand-mint)' }}>Akomzy</span>
            <span style={{ color: 'var(--brand-cream)' }}>Ai</span>
            <span
              className="font-semibold"
              style={{ color: 'var(--brand-cream)', opacity: 0.82 }}
            >
              {' '}Consulting
            </span>
          </span>
          <button
            onClick={closeOverlay}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg transition-colors duration-150
                       outline-none focus-visible:ring-2"
            style={
              {
                color:             'var(--brand-ivory)',
                '--tw-ring-color': 'var(--brand-mint)',
              } as React.CSSProperties
            }
          >
            <X size={24} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation links">
          <ul className="flex flex-col items-center gap-1 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => {
              const id       = href.slice(1)
              const isActive = activeId === id
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    aria-current={isActive ? 'location' : undefined}
                    tabIndex={mobileOpen ? 0 : -1}
                    className="block px-8 py-4 text-3xl font-bold tracking-tight rounded-xl
                               transition-all duration-150 outline-none focus-visible:ring-2"
                    style={
                      {
                        color: isActive
                          ? 'var(--brand-mint)'
                          : 'var(--brand-ivory)',
                        backgroundColor: isActive
                          ? 'rgba(150, 230, 229, 0.08)'
                          : 'transparent',
                        '--tw-ring-color': 'var(--brand-mint)',
                      } as React.CSSProperties
                    }
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, '#contact')}
          tabIndex={mobileOpen ? 0 : -1}
          className="mt-2 px-10 py-4 rounded-xl text-xl font-bold
                     transition-all duration-200 hover:scale-[1.04] pulse-glow
                     outline-none focus-visible:ring-2"
          style={
            {
              backgroundColor:      'var(--brand-mint)',
              color:                'var(--brand-teal-deeper)',
              '--tw-ring-color':    'var(--brand-mint)',
              '--tw-ring-offset-color': 'transparent',
            } as React.CSSProperties
          }
        >
          Book a Call
        </a>

        {/* Brand tagline */}
        <p
          className="absolute bottom-8 text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--brand-mint-muted)' }}
          aria-hidden="true"
        >
          AI Automations • Governance • Training
        </p>
      </div>
    </>
  )
}
