import SectionHeading from '@/components/ui/SectionHeading'
import BentoCard from '@/components/ui/BentoCard'
import SectionWash from '@/components/ui/SectionWash'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { EXPERTISE } from '@/data/content'

/**
 * Section 02 — the expertise bento grid.
 * Three honestly ranked tiers, staggered in as the section enters view and
 * stretched to equal height so the grid reads as one slab.
 */
export default function Expertise() {
  const lastIndex = EXPERTISE.columns.length - 1

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <SectionWash className="inset-x-0 top-0 h-[75%]" />

      <div className="shell relative">
        <SectionHeading
          number={EXPERTISE.number}
          label={EXPERTISE.label}
          headingId="expertise-title"
          headline={EXPERTISE.headline}
          intro={EXPERTISE.intro}
        />

        <RevealGroup
          stagger={0.12}
          className="grid items-stretch gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {EXPERTISE.columns.map((column, i) => (
            <RevealItem
              key={column.index}
              className={
                i === lastIndex
                  ? 'h-full md:col-span-2 lg:col-span-1'
                  : 'h-full'
              }
            >
              <BentoCard {...column} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
