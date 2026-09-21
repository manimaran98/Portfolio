'use client'

import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useFinePointer } from '@/hooks/useFinePointer'

/**
 * A soft spotlight that trails the cursor across the hero.
 * Falls back to a fixed off-centre glow on touch devices and under
 * reduced motion, so the section still has a light source.
 */
export default function Spotlight() {
  const finePointer = useFinePointer()
  const reduced = useReducedMotion()
  const active = finePointer && !reduced

  // Pointer position as a 0..1 fraction of the viewport.
  const x = useMotionValue(0.55)
  const y = useMotionValue(0.28)

  const spring = { stiffness: 60, damping: 24, mass: 0.8 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  // Every hook below runs unconditionally — the fallback branch returns later.
  const keyX = useTransform(sx, (v) => `${(v * 100).toFixed(2)}%`)
  const keyY = useTransform(sy, (v) => `${(v * 100).toFixed(2)}%`)
  const fillX = useTransform(sx, (v) => `${(v * 100 + 16).toFixed(2)}%`)
  const fillY = useTransform(sy, (v) => `${(v * 100 + 14).toFixed(2)}%`)

  const background = useMotionTemplate`radial-gradient(38rem 30rem at ${keyX} ${keyY}, var(--glow-warm), transparent 60%), radial-gradient(52rem 38rem at ${fillX} ${fillY}, var(--glow-cool), transparent 65%)`

  useEffect(() => {
    if (!active) return

    const onMove = (event) => {
      x.set(event.clientX / window.innerWidth)
      y.set(event.clientY / window.innerHeight)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [active, x, y])

  if (!active) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60rem 40rem at 62% 22%, var(--glow-warm), transparent 62%), radial-gradient(48rem 34rem at 18% 72%, var(--glow-cool), transparent 65%)',
        }}
      />
    )
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ background }}
    />
  )
}
