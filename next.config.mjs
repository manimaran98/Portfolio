/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The page is fully static content, so Next prerenders it to real HTML at
  // build time — crawlers and link previews get the text, not an empty shell.
  // To deploy to a plain static host (GitHub Pages, S3, Netlify drop) instead
  // of a Node server, uncomment the line below and run `npm run build`:
  // output: 'export',
}

export default nextConfig
