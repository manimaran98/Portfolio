import Link from 'next/link'
import { IDENTITY, NAV_LINKS } from '@/data/content'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

/**
 * The 404 inherits the nav and footer from the root layout, so it only needs
 * to fill the middle — and to offer a way onward rather than a dead end.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center py-24 sm:py-32">
      <div className="shell">
        <p className="eyebrow text-molten-500">404</p>

        <h1 className="display chrome mt-6 max-w-3xl text-[clamp(2.25rem,8vw,5.5rem)] leading-[1.03]">
          This page does not exist.
        </h1>

        <p className="measure mt-6 text-base leading-relaxed text-steel-400">
          The link may be out of date, or the address mistyped. Everything on
          this site lives on a single page — these are the parts of it.
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-full bg-molten-500 px-6 text-sm font-medium text-on-accent transition-colors duration-300 hover:bg-molten-400"
            >
              Back to the start
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={`/#${link.id}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line px-5 text-sm text-steel-200 transition-colors duration-300 hover:border-molten-500/50 hover:text-molten-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hairline mt-12" aria-hidden="true" />
        <p className="mt-5 text-sm text-steel-500">
          Or write to{' '}
          <a
            href={IDENTITY.emailHref}
            className="text-steel-300 underline decoration-line-strong underline-offset-4 transition-colors hover:text-molten-300"
          >
            {IDENTITY.email}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
