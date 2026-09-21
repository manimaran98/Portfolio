'use client'

import { useEffect, useState } from 'react'

/**
 * True only on devices with a precise pointer (mouse / trackpad).
 * Starts false so the server render and the first client render agree —
 * pointer-driven effects mount in after hydration, never during SSR.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}
