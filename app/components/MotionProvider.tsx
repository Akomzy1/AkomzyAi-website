'use client'

/**
 * MotionProvider
 *
 * Wraps the page in Framer Motion's `MotionConfig` with
 * `reducedMotion="user"` so that ALL framer-motion animations
 * (scroll-reveals, orb floats, hover effects) automatically
 * respect the OS "prefers-reduced-motion: reduce" setting.
 *
 * This complements globals.css which already suppresses CSS
 * animations and transitions under reduced-motion; this file
 * covers the JS-driven Framer Motion layer.
 *
 * Usage: wrap root layout children — see app/page.tsx.
 */

import { MotionConfig } from 'framer-motion'

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
