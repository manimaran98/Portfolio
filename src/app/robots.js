import { SITE_URL } from '@/lib/site'

/**
 * Nothing here is private, so everything is crawlable. The sitemap pointer is
 * the part that matters — it is how a crawler that arrives at the origin
 * finds the page without waiting to be linked to.
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
