'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

/**
 * Light/dark switch. Renders a stable, correctly sized shell on the server and
 * only swaps in an icon once the client knows the real theme — that is what
 * keeps the nav from shifting on hydration.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle, mounted } = useTheme()
  const reduced = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? 'light' : 'dark'} theme`
          : 'Switch colour theme'
      }
      title={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : undefined}
      className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-steel-300 transition-colors duration-300 hover:border-molten-500/50 hover:text-molten-400 ${className}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {mounted ? (
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: reduced ? 0 : -70, scale: reduced ? 1 : 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: reduced ? 0 : 70, scale: reduced ? 1 : 0.6 }}
            transition={{ duration: reduced ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? (
              <Moon aria-hidden="true" className="h-[18px] w-[18px]" />
            ) : (
              <Sun aria-hidden="true" className="h-[18px] w-[18px]" />
            )}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  )
}
