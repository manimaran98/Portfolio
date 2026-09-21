'use client'

import { useCallback, useEffect, useState } from 'react'

export const THEME_STORAGE_KEY = 'theme'

/** What the OS is asking for right now. */
function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * Reads and controls the active theme.
 *
 * The attribute on <html> is the single source of truth — an inline script in
 * the document head sets it before first paint, so there is no flash and no
 * hydration mismatch. This hook mirrors that attribute into React state and
 * writes back to it.
 *
 * `theme` is null until mounted, which is deliberate: the server cannot know
 * the visitor's preference, so the toggle renders in a neutral state and only
 * commits to an icon once the client has read the real value.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(null)

  useEffect(() => {
    const read = () =>
      document.documentElement.getAttribute('data-theme') || systemTheme()

    setThemeState(read())

    // Follow the OS only while the visitor has not made an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onSystemChange = () => {
      let stored = null
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY)
      } catch {}
      if (stored) return
      const next = systemTheme()
      document.documentElement.setAttribute('data-theme', next)
      setThemeState(next)
    }
    mq.addEventListener('change', onSystemChange)

    // Keep in step if anything else flips the attribute.
    const observer = new MutationObserver(() => setThemeState(read()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      mq.removeEventListener('change', onSystemChange)
      observer.disconnect()
    }
  }, [])

  const setTheme = useCallback((next) => {
    const root = document.documentElement

    // Cross-fade the swap, unless the visitor asked for less motion.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!still) {
      root.classList.add('theme-transition')
      window.setTimeout(() => root.classList.remove('theme-transition'), 420)
    }

    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setTheme(
      (document.documentElement.getAttribute('data-theme') || systemTheme()) === 'dark'
        ? 'light'
        : 'dark'
    )
  }, [setTheme])

  return { theme, setTheme, toggle, mounted: theme !== null }
}
