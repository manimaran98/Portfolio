'use client'

import SkillTag from './SkillTag'
import TiltCard from './TiltCard'

const TONES = {
  '01': { accent: 'text-molten-500', tag: 'molten', ring: 'group-hover:border-molten-500/30' },
  '02': { accent: 'text-steel-300', tag: 'steel', ring: 'group-hover:border-steel-300/25' },
  '03': { accent: 'text-ink', tag: 'chrome', ring: 'group-hover:border-line-strong' },
}

/**
 * One column of the expertise bento grid: an index, a title, a blurb,
 * and the skill set as chips.
 */
export default function BentoCard({ index, title, subtitle, blurb, skills }) {
  const tone = TONES[index] ?? TONES['02']

  return (
    <TiltCard className="group h-full" intensity={6}>
      <article
        className={`glass flex h-full flex-col rounded-2xl p-6 transition-colors duration-500 sm:p-8 ${tone.ring}`}
      >
        <div className="flex items-baseline gap-3">
          <span className={`eyebrow tabular-nums ${tone.accent}`}>{index}</span>
          <span className="eyebrow text-steel-500">/</span>
          <h3 className="eyebrow text-steel-300">{title}</h3>
        </div>

        <p className="display mt-6 text-[clamp(1.5rem,3.2vw,2rem)] text-ink">
          {subtitle}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-steel-400">{blurb}</p>

        <ul className="mt-7 flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <SkillTag key={skill} tone={tone.tag}>
              {skill}
            </SkillTag>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <span
            className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-molten-500 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
            aria-hidden="true"
          />
        </div>
      </article>
    </TiltCard>
  )
}
