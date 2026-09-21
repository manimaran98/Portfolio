'use client'

import { Download } from 'lucide-react'
import { Reveal, RevealGroup, RevealHeading, RevealItem } from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import SectionWash from '@/components/ui/SectionWash'
import TiltCard from '@/components/ui/TiltCard'
import { IDENTITY, PROFILE } from '@/data/content'

/**
 * Section 01 — the lead statement carries the poster type here, so the
 * heading runs bare. Paragraphs read left, the facts panel sticks right.
 */
export default function Profile() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="relative overflow-x-clip py-24 sm:py-32 lg:py-40"
    >
      <SectionWash
        tone="warm"
        className="top-0 right-0 hidden h-full w-[42rem] max-w-[50%] lg:block"
      />

      <div className="shell relative">
        <SectionHeading number={PROFILE.number} label={PROFILE.label} />

        <RevealHeading id="profile-title" className="display chrome max-w-5xl text-balance pb-[0.09em] text-[clamp(1.75rem,5.5vw,4rem)] leading-[1.03]">
          {PROFILE.lead}
        </RevealHeading>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Reading column */}
          <RevealGroup className="space-y-6 sm:space-y-7 lg:col-span-7">
            {PROFILE.paragraphs.map((paragraph, index) => (
              <RevealItem
                as="p"
                key={paragraph}
                className={`measure text-base leading-relaxed sm:text-[1.0625rem] ${
                  index === 0 ? 'text-steel-300' : 'text-steel-400'
                }`}
              >
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Facts panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal delay={0.1}>
                <TiltCard className="group" intensity={4}>
                  <div className="glass rounded-2xl p-6 sm:p-8">
                    <dl>
                      {PROFILE.facts.map((fact, index) => (
                        <div
                          key={fact.k}
                          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 ${
                            index === 0 ? 'pt-0' : 'border-t border-line'
                          }`}
                        >
                          <dt className="eyebrow text-steel-500">{fact.k}</dt>
                          <dd className="text-sm font-medium text-ink">
                            {fact.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-2 hairline" aria-hidden="true" />

                    <a
                      href={IDENTITY.resumeUrl}
                      download={IDENTITY.resumeFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl border border-line px-4 py-3.5 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors duration-300 hover:border-molten-500/40 hover:bg-molten-500/10 hover:text-molten-200"
                    >
                      <Download size={15} aria-hidden="true" />
                      Download résumé
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
