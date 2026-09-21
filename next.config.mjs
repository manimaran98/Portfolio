/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'

/**
 * `script-src` carries 'unsafe-inline' deliberately, not out of laziness: the
 * no-flash theme script in layout.jsx and Next's own hydration bootstrap are
 * both inline, and a static prerender has no per-request nonce to hand them.
 * `style-src` needs it for the same reason — Framer Motion writes inline
 * styles on every animated element.
 */
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim()

const nextConfig = {
  reactStrictMode: true,

  // The page is fully static content, so Next prerenders it to real HTML at
  // build time — crawlers and link previews get the text, not an empty shell.
  //
  // To deploy to a plain static host (GitHub Pages, S3, Netlify drop) instead
  // of a Node server you need BOTH lines below, not just the first: `export`
  // does not support next/image's default loader, so the build fails on the
  // hero portrait without `unoptimized`. Note that `headers()` is also
  // unsupported under `export` — set the headers below at the host instead.
  //
  //   output: 'export',
  //   images: { unoptimized: true },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
