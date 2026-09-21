'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { RevealItem } from './Reveal'

/**
 * One role on the experience timeline. Collapsed it shows the summary;
 * expanded it reveals the full responsibility list. The first (current)
 * role starts open.
 */
export default function TimelineItem({ role, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const reduced = useReducedMotion()
  const panelId = `role-panel-${role.id}`

  return (
    <RevealItem as="li" className="relative pl-8 sm:pl-14">
      {/* Node on the rail */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full sm:left-[0.5px] ${
          role.current ? 'bg-molten-500' : 'bg-canvas-sunk ring-1 ring-line-strong'
        }`}
      >
        {role.current ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-molten-500 opacity-60" />
        ) : null}
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="eyebrow text-molten-500">{role.period}</span>
        <span className="eyebrow rounded-full border border-line px-2 py-1 text-steel-400">
          {role.type}
        </span>
      </div>

      <h3 className="display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] text-ink">
        {role.company}
      </h3>
      <p className="mt-1 text-sm font-medium tracking-wide text-steel-300">
        {role.title}
      </p>

      <p className="measure mt-4 text-sm leading-relaxed text-steel-400 sm:text-base">
        {role.summary}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        {...(open ? { 'aria-controls': panelId } : {})}
        className="mt-3 -mx-2 min-h-[44px] px-2 py-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors hover:text-molten-400"
      >
        {open ? 'Hide detail' : 'What I did'}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0.15 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <ul className="measure mt-5 space-y-3 border-l border-line pl-5">
              {role.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative text-sm leading-relaxed text-steel-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.4rem] top-[0.6em] h-px w-3 bg-line-strong"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {role.stack.map((item) => (
                <li
                  key={item}
                  className="rounded border border-line bg-surface px-2 py-1 text-[0.6875rem] tracking-wide text-steel-400 uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-10 hairline" aria-hidden="true" />
    </RevealItem>
  )
}
