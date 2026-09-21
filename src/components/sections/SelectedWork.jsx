import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/ui/ProjectCard'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { WORK } from '@/data/content'

// Molten bloom sitting behind the first card, clipped by the section.
const GLOW = {
  backgroundImage:
    'radial-gradient(closest-side, var(--color-molten-500), transparent)',
}

/**
 * Section 04 — selected work.
 * A single stacked column of expandable project cards, sharing one deep
 * perspective so every tilt in the list reads as the same physical space.
 */
export default function SelectedWork() {
  const count = WORK.projects.length

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="shell relative">
        <SectionHeading
          number={WORK.number}
          label={WORK.label}
          headingId="work-title"
          headline={WORK.headline}
          intro={WORK.intro}
        />

        <Reveal className="mb-5 flex justify-end sm:mb-7">
          <p className="eyebrow tabular-nums text-steel-500">
            {count} projects
          </p>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden="true"
            style={GLOW}
            className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.09] blur-3xl sm:h-[46rem] sm:w-[46rem]"
          />

          <RevealGroup
            as="ul"
            stagger={0.1}
            className="relative space-y-4 [perspective:1400px] sm:space-y-6"
          >
            {WORK.projects.map((project) => (
              <ProjectCard
                key={project.index}
                project={project}
                privateNote={WORK.privateNote}
              />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
