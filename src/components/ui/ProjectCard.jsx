'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Lock, Plus } from 'lucide-react'
import TiltCard from './TiltCard'
import { RevealItem } from './Reveal'

/**
 * A 3D tilt-hover card for one project.
 * The card body expands in place to show the engineering detail, so the
 * list stays scannable until someone asks for more.
 */
export default function ProjectCard({ project, privateNote }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = `project-panel-${project.index}`

  return (
    <RevealItem as="li">
      <TiltCard className="group" intensity={5}>
        <article className="glass relative overflow-hidden rounded-2xl transition-colors duration-500 group-hover:border-line-strong">
          {/* Molten edge that lights up on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-molten-500 via-molten-300 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
          />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="eyebrow tabular-nums text-molten-500">
                    {project.index}
                  </span>
                  <span className="eyebrow text-steel-500">
                    {project.category}
                  </span>
                </div>

                <h3 className="display mt-4 text-[clamp(1.75rem,5.5vw,3.5rem)] text-ink transition-colors duration-500 group-hover:text-molten-200">
                  {project.name}
                </h3>

                <p className="mt-2 text-sm text-steel-400">{project.subtitle}</p>

                <p className="measure mt-5 text-sm leading-relaxed text-steel-300 sm:text-base">
                  {project.summary}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-molten-500/25 bg-molten-500/[0.07] px-3 py-1 text-[0.75rem] leading-none text-molten-200"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-2 min-h-[44px] px-2 py-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors hover:text-molten-400"
                  >
                    View repository
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.14em] text-steel-500 uppercase">
                    <Lock size={12} aria-hidden="true" />
                    {privateNote}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              {...(open ? { 'aria-controls': panelId } : {})}
              className="mt-5 -mx-2 min-h-[44px] px-2 py-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors hover:text-molten-400"
            >
              <Plus
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
              />
              {open ? 'Close' : 'Engineering detail'}
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
                    duration: reduced ? 0.15 : 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <ul className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-steel-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <p className="eyebrow mb-3 text-steel-500">Full stack</p>
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <li
                          key={item}
                          className="rounded border border-line bg-surface px-2 py-1 text-[0.6875rem] tracking-wide text-steel-400"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </article>
      </TiltCard>
    </RevealItem>
  )
}
