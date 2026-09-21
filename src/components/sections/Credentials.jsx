'use client'

import { Award, BadgeCheck, Download, GraduationCap, Mail } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TiltCard from '@/components/ui/TiltCard'
import { CREDENTIALS, IDENTITY } from '@/data/content'

/**
 * Section 05 — the degree on the left, certifications on the right,
 * closed by a strip pointing at the full résumé and a direct line.
 */
export default function Credentials() {
  const { education, certifications } = CREDENTIALS

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="shell">
        <SectionHeading
          number={CREDENTIALS.number}
          label={CREDENTIALS.label}
          headingId="credentials-title"
          headline={CREDENTIALS.headline}
        />

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {/* Education */}
          <Reveal>
            <TiltCard className="group h-full" intensity={5}>
              <article className="glass flex h-full flex-col rounded-2xl p-6 transition-colors duration-500 group-hover:border-molten-500/25 sm:p-8">
                <p className="eyebrow text-molten-500">Education</p>

                <h3 className="display mt-6 text-[clamp(1.35rem,3vw,2rem)] text-ink">
                  {education.degree}
                </h3>

                <p className="mt-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-molten-500/30 bg-molten-500/10 px-3 py-1.5 text-xs font-medium tracking-wide text-molten-200">
                    <Award size={13} aria-hidden="true" />
                    {education.honours}
                  </span>
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-8 text-sm text-steel-400">
                  <GraduationCap
                    size={16}
                    aria-hidden="true"
                    className="text-steel-500"
                  />
                  <span>{education.institution}</span>
                  <span className="text-steel-500" aria-hidden="true">
                    /
                  </span>
                  <span className="tabular-nums">{education.period}</span>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {/* Certifications */}
          <div>
            <Reveal delay={0.08}>
              <p className="eyebrow text-molten-500">Certifications</p>
            </Reveal>

            <RevealGroup as="ul" delay={0.12} className="mt-6 space-y-4">
              {certifications.map((certification) => (
                <RevealItem
                  as="li"
                  key={certification.name}
                  className="glass flex items-center gap-4 rounded-2xl border border-line p-5 transition duration-300 hover:border-molten-500/30 motion-safe:hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-molten-500/25 bg-molten-500/10 text-molten-400"
                  >
                    <BadgeCheck size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">
                      {certification.name}
                    </span>
                    <span className="mt-1 block text-xs text-steel-500">
                      {certification.issuer}
                    </span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Closing strip */}
        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <div className="hairline" aria-hidden="true" />
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-steel-400">
              Prefer it on one page, or would rather just talk it through?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={IDENTITY.resumeUrl}
                download={IDENTITY.resumeFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors duration-300 hover:border-molten-500/40 hover:bg-molten-500/10 hover:text-molten-200"
              >
                <Download size={15} aria-hidden="true" />
                Full résumé
              </a>

              <a
                href={IDENTITY.emailHref}
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-xs font-medium tracking-[0.18em] text-steel-300 uppercase transition-colors duration-300 hover:border-line-strong hover:text-ink"
              >
                <Mail size={15} aria-hidden="true" />
                Email me
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
