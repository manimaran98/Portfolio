'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { IDENTITY, NAV_LINKS } from '@/data/content'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useScrolled } from '@/hooks/useScrolled'

/* Module scope: useScrollSpy takes this as an effect dependency, so the
   array reference has to stay stable across renders. */
const SECTION_IDS = NAV_LINKS.map((link) => link.id)

/* Split the monogram on its trailing dot so the period can be accented
   without hardcoding the initials. */
const MONOGRAM_STEM = IDENTITY.monogram.replace(/\.+$/, '')
const MONOGRAM_DOT = IDENTITY.monogram.slice(MONOGRAM_STEM.length)

const PANEL_ID = 'mobile-nav-panel'

function ResumeLink({ className }) {
  return (
    <a
      href={IDENTITY.resumeUrl}
      download={IDENTITY.resumeFileName}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Résumé
    </a>
  )
}

function ContactButton({ className }) {
  return (
    <a href={IDENTITY.emailHref} className={className}>
      Get in touch
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

/**
 * The floating site header.
 *
 * Transparent over the hero, then condensing into a glass bar once the page
 * scrolls — a plain CSS transition, so nothing re-layouts per frame. The
 * centre links track the visible section through `useScrollSpy`, and the
 * active one carries a shared `layoutId` underline that glides between them.
 * Below `lg` the links collapse into a full-screen panel: the site's one
 * piece of enter/exit choreography, flattened to a fade under
 * `prefers-reduced-motion`.
 */
export default function Navbar() {
  const scrolled = useScrolled(24)
  const activeId = useScrollSpy(SECTION_IDS)
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Lock the page behind the panel, and always hand scrolling back.
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Growing past the lg breakpoint reveals the inline nav — drop the panel
  // rather than leave a locked page behind an invisible overlay.
  useEffect(() => {
    if (!open) return

    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      if (mq.matches) setOpen(false)
    }

    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [open])

  // Move focus into the panel so keyboard and screen-reader users land there.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  const panelVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.2 : 0.45,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: reduced ? 0 : 0.06,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : -16,
      transition: { duration: reduced ? 0.15 : 0.28, ease: [0.4, 0, 1, 1] },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-molten-500 px-5 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:min-h-[44px] focus:items-center"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'glass border-b border-line py-2'
            : 'border-b border-transparent bg-transparent py-4'
        }`}
      >
        <div className="shell flex items-center justify-between gap-4">
          <a
            href="#top"
            className="display -ml-2 flex min-h-[44px] min-w-[44px] items-center px-2 text-xl text-ink transition-opacity duration-300 hover:opacity-80"
          >
            {MONOGRAM_STEM}
            <span className="text-molten-500">{MONOGRAM_DOT}</span>
            <span className="sr-only">{IDENTITY.name} — back to top</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:flex-1 lg:justify-center"
          >
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id

                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`eyebrow relative flex min-h-[44px] items-center px-3 transition-colors duration-300 ${
                        isActive
                          ? 'text-ink'
                          : 'text-steel-400 hover:text-steel-200'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          aria-hidden="true"
                          className="absolute inset-x-3 bottom-2 h-px bg-molten-500"
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 380, damping: 32 }
                          }
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="h-11 w-11" />

            <div className="hidden items-center gap-2 md:flex">
              <ResumeLink className="eyebrow flex min-h-[44px] items-center gap-2 px-3 text-steel-400 transition-colors duration-300 hover:text-steel-200" />
              <ContactButton className="flex min-h-[44px] items-center gap-2 rounded-full bg-molten-500 px-5 text-sm font-medium text-on-accent transition-colors duration-300 hover:bg-molten-400" />
            </div>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls={PANEL_ID}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-steel-200 transition-colors duration-300 hover:border-line-strong hover:text-ink lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={PANEL_ID}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label="Site navigation"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 overflow-y-auto outline-none lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-canvas/95 backdrop-blur-xl"
            />

            <div className="relative flex min-h-full flex-col justify-between pb-10 pt-28">
              <nav aria-label="Mobile" className="shell">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeId === link.id

                    return (
                      <motion.li key={link.id} variants={itemVariants}>
                        <a
                          href={`#${link.id}`}
                          onClick={close}
                          aria-current={isActive ? 'true' : undefined}
                          className={`display flex min-h-[64px] items-center border-b border-line text-[clamp(2.25rem,12vw,3.75rem)] transition-colors duration-300 ${
                            isActive
                              ? 'text-ink'
                              : 'text-steel-400 hover:text-steel-200'
                          }`}
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="shell mt-12 flex flex-col gap-6">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <ContactButton className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-molten-500 px-6 text-sm font-medium text-on-accent transition-colors duration-300 hover:bg-molten-400" />
                  <ResumeLink className="eyebrow flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line px-6 text-steel-300 transition-colors duration-300 hover:border-line-strong hover:text-ink" />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-1 text-sm text-steel-400"
                >
                  <a
                    href={IDENTITY.emailHref}
                    onClick={close}
                    className="flex min-h-[44px] items-center break-all transition-colors duration-300 hover:text-molten-300"
                  >
                    {IDENTITY.email}
                  </a>
                  <a
                    href={IDENTITY.phoneHref}
                    onClick={close}
                    className="flex min-h-[44px] items-center transition-colors duration-300 hover:text-molten-300"
                  >
                    {IDENTITY.phone}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
