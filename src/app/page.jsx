import Hero from '@/components/sections/Hero'
import Profile from '@/components/sections/Profile'
import Expertise from '@/components/sections/Expertise'
import Experience from '@/components/sections/Experience'
import SelectedWork from '@/components/sections/SelectedWork'
import Credentials from '@/components/sections/Credentials'
import { SITE_URL } from '@/lib/site'
import {
  CREDENTIALS,
  EXPERIENCE,
  EXPERTISE,
  IDENTITY,
  PROFILE,
  WORK,
} from '@/data/content'

/**
 * Structured data, built from the same content source as the page so the two
 * can never drift. Rendered on the server, which is the point of being on
 * Next rather than a client-only SPA.
 */
function jsonLd() {
  const personId = `${SITE_URL}/#person`

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: IDENTITY.name,
    givenName: IDENTITY.firstName,
    familyName: IDENTITY.lastName,
    jobTitle: IDENTITY.role,
    description: PROFILE.lead,
    email: IDENTITY.email,
    telephone: IDENTITY.phone,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    // sameAs is how a search engine reconciles this page with the other
    // profiles that carry the same name. Add LinkedIn here when it exists.
    sameAs: [IDENTITY.githubUrl],
    nationality: { '@type': 'Country', name: 'Malaysia' },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cyberjaya',
        addressRegion: 'Selangor',
        addressCountry: 'MY',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cyberjaya',
      addressRegion: 'Selangor',
      addressCountry: 'MY',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: CREDENTIALS.education.institution,
    },
    worksFor: {
      '@type': 'Organization',
      name: EXPERIENCE.roles[0].company,
    },
    hasOccupation: EXPERIENCE.roles.map((role) => ({
      '@type': 'Occupation',
      name: role.title,
      occupationLocation: { '@type': 'City', name: 'Cyberjaya' },
      skills: role.stack.join(', '),
    })),
    knowsAbout: EXPERTISE.columns.flatMap((column) => column.skills),
    hasCredential: CREDENTIALS.certifications.map((certification) => ({
      '@type': 'EducationalOccupationalCredential',
      name: certification.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: certification.issuer },
    })),
    subjectOf: WORK.projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      abstract: project.summary,
      keywords: project.tags.join(', '),
    })),
  }

  // A ProfilePage whose mainEntity is the Person states outright that this
  // page is *about* him, rather than leaving a crawler to infer it.
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: IDENTITY.name,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#page`,
        url: SITE_URL,
        name: `${IDENTITY.name} — ${IDENTITY.role}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        inLanguage: 'en',
      },
    ],
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Hero />
      <Profile />
      <Expertise />
      <Experience />
      <SelectedWork />
      <Credentials />
    </>
  )
}
