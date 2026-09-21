'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * A hairline molten progress bar pinned to the very top of the viewport.
 *
 * The spring is bypassed under `prefers-reduced-motion`: the bar still tracks
 * the scroll position, it just stops overshooting and settling. The global
 * reduced-motion block in globals.css cannot do this for us — it neutralises
 * CSS animation and transition, and this is a JS-driven motion value.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-molten-600 via-molten-400 to-molten-200"
    />
  )
}
