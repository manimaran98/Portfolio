'use client'

import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import GithubMark from '@/components/ui/GithubMark'
import LinkedInMark from '@/components/ui/LinkedInMark'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { FOOTER } from '@/data/content'

/** External links point out of the site; the rest are mail or phone. */
const BRAND_MARKS = { github: GithubMark, linkedin: LinkedInMark }

function iconFor(link) {
  if (link.icon && BRAND_MARKS[link.icon]) return BRAND_MARKS[link.icon]
  if (link.external) return ArrowUpRight
  if (link.href.startsWith('tel:')) return Phone
  return Mail
}

/**
 * The closing statement and contact block that ends the page.
 *
 * One oversized chrome line, the contact channels as a staggered row of
 * bordered blocks, and a hairline-separated colophon. The backdrop is two
 * decorative layer — a molten glow bleeding off the bottom edge, inert to
 * pointers and hidden from assistive tech.
 */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 translate-y-1/3 bg-[radial-gradient(ellipse_at_bottom,var(--color-molten-600),transparent_70%)] opacity-20 blur-2xl"
      />

      <div className="shell relative py-20 sm:py-28">
        <Reveal>
          <p className="display chrome max-w-[18ch] text-balance break-words text-[clamp(2.5rem,11vw,9rem)]">
            {FOOTER.headline}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-steel-400">
            {FOOTER.blurb}
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 grid grid-cols-1 gap-x-10 md:grid-cols-2"
        >
          {FOOTER.links.map((link) => {
            const Icon = iconFor(link)
            const external = link.external

            return (
              <RevealItem as="li" key={link.label}>
                <a
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex min-h-[44px] flex-col gap-3 border-t border-line py-6 transition-colors duration-300 hover:border-line-strong"
                >
                  <span className="eyebrow text-steel-500">{link.label}</span>
                  <span className="flex items-center gap-2 text-base text-steel-200 transition-colors duration-300 group-hover:text-molten-300 sm:text-lg">
                    <span className="break-all">{link.value}</span>
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <div className="hairline mt-16" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.place}</p>
        </div>
      </div>
    </footer>
  )
}
