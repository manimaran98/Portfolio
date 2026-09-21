'use client'

import { Reveal, RevealHeading } from './Reveal'

/**
 * The numbered section header used by 01–05.
 * `number` and `label` form the small eyebrow; `headline` is the poster type.
 */
export default function SectionHeading({ number, label, headline, intro, headingId }) {
  return (
    <header className="mb-14 sm:mb-20">
      <Reveal className="flex items-center gap-4">
        <span className="eyebrow text-molten-500 tabular-nums">{number}</span>
        <span className="eyebrow text-steel-400">{label}</span>
        <span className="hairline flex-1" aria-hidden="true" />
      </Reveal>

      {headline ? (
        <RevealHeading
          id={headingId}
          wrapperClassName="mt-7"
          className="display chrome max-w-5xl pb-[0.09em] text-[clamp(2.25rem,7.5vw,5.5rem)]"
        >
          {headline}
        </RevealHeading>
      ) : null}

      {intro ? (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  )
}
