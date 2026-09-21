'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

/**
 * Slow-drifting dust motes behind the hero.
 *
 * Canvas rather than DOM nodes so a few dozen particles cost one composited
 * layer instead of dozens. Renders nothing under reduced motion, and the loop
 * suspends while the tab is hidden.
 */
export default function ParticleField({ density = 0.00006 }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles = []
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Canvas takes colour strings, not CSS variables, and getComputedStyle
    // will not resolve light-dark() inside an unregistered custom property —
    // it hands back the literal text. So the two dust colours are branched
    // here instead. Keep them in step with --molten-400 / --steel-200/300
    // in globals.css.
    const light = theme === 'light'
    const warmRgb = light ? '194, 74, 8' : '255, 171, 92'
    const coolRgb = light ? '90, 104, 120' : '223, 231, 239'

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(Math.max(width * height * density, 18), 90))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.35,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.03),
        a: Math.random() * 0.4 + 0.08,
        // A minority of motes pick up the molten accent.
        warm: Math.random() > 0.78,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.warm
          ? `rgba(${warmRgb}, ${p.a})`
          : `rgba(${coolRgb}, ${p.a * 0.75})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const onVisibility = () => (document.hidden ? stop() : start())

    build()
    start()

    const observer = new ResizeObserver(build)
    observer.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density, theme])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
