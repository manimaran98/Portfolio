'use client'

import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `threshold` pixels.
 * Used to condense the floating nav. The listener is passive and only
 * writes state when the boolean actually flips, so it does not re-render
 * on every scroll event.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled((prev) => {
          const next = window.scrollY > threshold
          return prev === next ? prev : next
        })
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
