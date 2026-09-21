'use client'

import SectionWash from '@/components/ui/SectionWash'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import TimelineItem from '@/components/ui/TimelineItem'
import { RevealGroup } from '@/components/ui/Reveal'
import { EXPERIENCE } from '@/data/content'

// Both rails sit on the same axis as the node dots TimelineItem renders.
const RAIL = 'pointer-events-none absolute inset-y-0 left-0 w-px -translate-x-1/2 sm:left-[0.5px]'

/**
 * Section 03 — the experience timeline.
 * A static rail carries the roles; a molten progress rail is welded to the
 * section's own scroll range on top of it, so the timeline fills as you read.
 */
export default function Experience() {
  const containerRef = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 60%'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  })

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-x-clip py-16 sm:py-20 lg:py-24"
    >
      <SectionWash
        tone="cool"
        className="top-0 left-0 hidden h-full w-[40rem] max-w-[48%] lg:block"
      />
      <div className="shell">
        <SectionHeading
          number={EXPERIENCE.number}
          label={EXPERIENCE.label}
          headingId="experience-title"
          headline={EXPERIENCE.headline}
        />

        <div ref={containerRef} className="relative">
          <span
            aria-hidden="true"
            className={`${RAIL} bg-gradient-to-b from-molten-500/40 via-line to-transparent`}
          />

          <motion.span
            aria-hidden="true"
            style={{
              scaleY: reduced ? 1 : progress,
              transformOrigin: 'top',
            }}
            className={`${RAIL} bg-gradient-to-b from-molten-300 via-molten-500 to-molten-600`}
          />

          <RevealGroup
            as="ul"
            stagger={0.14}
            className="space-y-12 sm:space-y-16"
          >
            {EXPERIENCE.roles.map((role, i) => (
              <TimelineItem key={role.id} role={role} defaultOpen={i === 0} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
