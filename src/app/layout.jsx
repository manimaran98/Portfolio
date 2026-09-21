import { Inter, Oswald } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { IDENTITY } from '@/data/content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

/**
 * The canonical origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment —
 * every canonical link, sitemap entry and social-card URL is built from it,
 * so a wrong value silently points search engines at the wrong host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://manimaranmahesan.com'
).replace(/\/$/, '')

// Leads with the name, because the search that matters most is the person's
// own name; role and location follow for the queries that describe the job.
const TITLE = `${IDENTITY.name} — ${IDENTITY.role} in ${IDENTITY.location}`
const DESCRIPTION =
  'Manimaran Mahesan is a senior full stack developer in Cyberjaya, Malaysia, with four years building production systems across web, desktop and mobile — Java, Spring Boot, C#/.NET, Python, FastAPI, React and Angular, on RHEL and Docker.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${IDENTITY.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${IDENTITY.name} — Portfolio`,
  authors: [{ name: IDENTITY.name, url: SITE_URL }],
  creator: IDENTITY.name,
  publisher: IDENTITY.name,
  category: 'technology',
  keywords: [
    IDENTITY.name,
    'Manimaran',
    'Mahesan',
    'Senior Full Stack Developer',
    'Full Stack Developer Malaysia',
    'Software Engineer Cyberjaya',
    'Java developer Malaysia',
    'Spring Boot',
    'FastAPI',
    'React',
    'Angular',
    'Cyberjaya',
    'Selangor',
    'Malaysia',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    // `profile` tells crawlers this page is about a person, not a brand.
    type: 'profile',
    firstName: IDENTITY.firstName,
    lastName: IDENTITY.lastName,
    username: IDENTITY.githubHandle,
    url: '/',
    siteName: IDENTITY.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_MY',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
  },
  },
}

export const viewport = {
  // One entry per scheme so the browser chrome matches the active theme.
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
    { media: '(prefers-color-scheme: light)', color: '#f5f4f1' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Runs before first paint so the correct theme is on <html> when the page
 * renders. Without this the server's markup paints in one theme and the
 * client corrects it a frame later — the classic flash.
 */
const NO_FLASH = `(function(){try{
var s=localStorage.getItem('theme');
var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${oswald.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        {/* Scroll reveals start hidden — body copy at opacity 0, headings
            translated out of their overflow mask — and Framer Motion raises
            them on hydration. With scripting off nothing ever would, so the
            page would read as blank below the fold. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"],[style*="opacity: 0"],[style*="translateY"],[style*="translateX"]{opacity:1!important;transform:none!important;clip-path:none!important}</style>',
          }}
        />
      </head>
      <body className="bg-canvas text-ink antialiased">
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
