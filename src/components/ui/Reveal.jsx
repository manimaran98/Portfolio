'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * The single scroll-reveal primitive for the whole site.
 *
 * `Reveal`      — one element, fades and lifts in once.
 * `RevealGroup` — a container that staggers its `RevealItem` children.
 * `RevealItem`  — a child of RevealGroup; inherits the stagger timing.
 *
 * Under `prefers-reduced-motion` every variant collapses to a plain fade,
 * so nothing moves across the screen.
 */

const DISTANCE = 26

export function Reveal({
  children,
  delay = 0,
  y = DISTANCE,
  className,
  as = 'div',
  amount = 0.3,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduced ? 0.25 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
  amount = 0.2,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  y = DISTANCE,
  as = 'div',
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0.25 : 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Section headlines get their own arrival: the type rises out of its own
 * baseline behind an overflow mask, rather than fading in like body copy.
 * That contrast with the Reveal fade is the point.
 *
 * The observer watches the WRAPPER, not the heading. The heading starts
 * translated a full height down, which puts it completely outside the
 * wrapper's overflow clip — and IntersectionObserver intersects the clipped
 * visual rect, so a `whileInView` on the heading itself reports zero visible
 * area and never fires. The wrapper is neither transformed nor clipped, so
 * it is the only reliable thing to observe.
 */
export function RevealHeading({
  children,
  className,
  wrapperClassName = '',
  as = 'h2',
  delay = 0.06,
  ...rest
}) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const MotionTag = motion[as] ?? motion.h2

  const hidden = reduced ? { opacity: 0, y: 0 } : { opacity: 1, y: '106%' }
  const shown = { opacity: 1, y: 0 }

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <MotionTag
        className={className}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{
          duration: reduced ? 0.3 : 0.95,
          delay: reduced ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        {...rest}
      >
        {children}
      </MotionTag>
    </div>
  )
}
