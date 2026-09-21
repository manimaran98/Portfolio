/**
 * Canonical site constants.
 *
 * Kept out of layout.jsx so robots.js, sitemap.js and page.jsx can read the
 * origin without importing the whole root layout (and with it next/font) just
 * to get one string.
 */

/**
 * The canonical origin, without a trailing slash.
 *
 * Every canonical link, sitemap entry and social-card URL is built from this,
 * so a wrong value silently points search engines at the wrong host. The
 * default is the live domain; NEXT_PUBLIC_SITE_URL overrides it for previews.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://manimaranmahesan.com'
).replace(/\/$/, '')

/** Apex is canonical. Redirect www -> apex at the host, not in the app. */
export const SITE_HOST = new URL(SITE_URL).host
