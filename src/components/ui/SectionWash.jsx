'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * A soft radial backdrop for a section, lit by the page's two lights.
 *
 * This replaces the tiled hairline grid that used to sit behind these
 * sections. A grid field is a generic "technical" texture that reads as
 * filler unless the surface is an actual canvas, map or blueprint — and the
 * brief asked for radial gradient backdrops, which is what this is.
 *
 * The wash is scroll-reactive: it drifts against the scroll, breathes open as
 * the section crosses the viewport, and crossfades between the warm and cool
 * light so no two sections are lit identically on the way down. That is the
 * page's one ambient motion continued below the hero — the hero owns cursor
 * and dust, everything under it answers to scroll instead, so the effects
 * never run at the same time or compete for the same attention.
 */

const WARM = 'radial-gradient(60% 55% at 50% 50%, var(--glow-warm), transparent 72%)'
const COOL = 'radial-gradient(60% 55% at 50% 50%, var(--glow-cool), transparent 72%)'

export default function SectionWash({ tone = 'cool', className = '' }) {
  /* The ref sits on the untransformed wrapper, never on the layer we animate:
     useScroll measures with getBoundingClientRect, which includes transforms,
     so putting it on the moving element would feed the scale back into its own
     input and drift. */
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /* Springing the progress rather than the output keeps the drift and the
     crossfade on the same clock — they lag the scroll together. */
  const eased = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 24,
    mass: 0.6,
  })

  const y = useTransform(eased, [0, 1], ['-14%', '14%'])
  const scale = useTransform(eased, [0, 0.5, 1], [0.88, 1.1, 0.88])
  const opacity = useTransform(eased, [0, 0.3, 0.7, 1], [0.25, 1, 1, 0.25])

  /* The section's assigned tone owns the middle of the pass — where the
     content actually reads — and yields to the other light at both edges. */
  const primary = useTransform(eased, [0, 0.5, 1], [0, 1, 0])
  const secondary = useTransform(eased, [0, 0.5, 1], [1, 0, 1])

  const warm = tone === 'warm' ? primary : secondary
  const cool = tone === 'warm' ? secondary : primary

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute ${className}`}
        style={{ background: tone === 'warm' ? WARM : COOL }}
      />
    )
  }

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <motion.div className="relative h-full w-full" style={{ y, scale, opacity }}>
        <motion.div
          className="absolute inset-0"
          style={{ background: WARM, opacity: warm }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: COOL, opacity: cool }}
        />
      </motion.div>
    </div>
  )
}
