'use client'

import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useFinePointer } from '@/hooks/useFinePointer'

/**
 * 3D tilt-hover physics with a pointer-tracked specular glare.
 *
 * The tilt is spring-damped rather than following the cursor directly, which
 * is what makes it read as a physical panel instead of a CSS transform.
 * Disabled entirely on coarse pointers and under reduced motion — in that
 * case this renders a plain div and attaches no listeners at all.
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 9,
  glare = true,
  ...rest
}) {
  const ref = useRef(null)
  const finePointer = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = finePointer && !reduced

  // Normalised pointer position within the card, -0.5 .. 0.5
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), spring)

  // Glare follows the cursor across the surface.
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, var(--glare), transparent 60%)`

  const handleMove = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  if (!enabled) {
    return (
      <div ref={ref} className={`relative ${className}`} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative [perspective:1200px] ${className}`}
      {...rest}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden="true"
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
    </motion.div>
  )
}
