import { SITE_URL } from '@/lib/site'

/**
 * One page, but a sitemap still earns its place: it gives the crawler a
 * canonical URL and a change signal instead of leaving both to be guessed.
 */
export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
