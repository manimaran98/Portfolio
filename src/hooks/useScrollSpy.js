'use client'

import { useEffect, useState } from 'react'

/**
 * Highlights the nav link for the section currently crossing the upper
 * third of the viewport. Uses IntersectionObserver rather than a scroll
 * handler, so nothing runs per frame.
 *
 * @param {string[]} ids section element ids, in document order
 * @returns {string|null} the id of the active section
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    // Track ratios ourselves so the *most* visible section wins, rather than
    // whichever one fired the callback last.
    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let best = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        setActiveId(best)
      },
      {
        // Bias the "active" band toward the top half of the screen.
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
