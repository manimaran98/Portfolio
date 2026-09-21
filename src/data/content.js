/**
 * Every word on this site lives here.
 * Components render this file — they never hardcode copy.
 * Facts are sourced from docs/Manimaran_Mahesan_Resume.pdf.
 */

export const IDENTITY = {
  name: 'Manimaran Mahesan',
  firstName: 'Manimaran',
  lastName: 'Mahesan',
  monogram: 'MM.',
  role: 'Senior Full Stack Developer',
  location: 'Cyberjaya, Malaysia',
  locationLong: 'Cyberjaya, Selangor, Malaysia',
  phone: '+6016-2153958',
  phoneHref: 'tel:+60162153958',
  email: 'manimaranmahesan@hotmail.com',
  emailHref:
    'mailto:manimaranmahesan@hotmail.com?subject=Let%27s%20build%20something',
  githubHandle: 'manimaran98',
  githubUrl: 'https://github.com/manimaran98',
  resumeUrl: '/Manimaran_Mahesan_Resume.pdf',
  resumeFileName: 'Manimaran-Mahesan-Resume.pdf',
}

/** Centre-of-nav links. Each `id` must match a <section id> on the page. */
export const NAV_LINKS = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'credentials', label: 'Education' },
]

export const HERO = {
  eyebrow: ['Senior Full Stack Developer', 'Cyberjaya, Malaysia'],
  statement:
    'Backend-leaning engineer who owns the whole line — from the schema to the RHEL box it runs on.',
  primaryCta: { label: 'View selected work', href: '#work' },
  portraitAlt: 'Portrait of Manimaran Mahesan',
  scrollHint: 'Scroll',
}

export const PROFILE = {
  number: '01',
  label: 'Profile',
  lead: 'Four years building production systems across web, desktop, and mobile.',
  paragraphs: [
    'Backend-leaning by instinct. Java and Spring Boot, C# and .NET, Python and FastAPI — services backed by PostgreSQL, MySQL and MSSQL, designed so the data layer holds even when the application layer is wrong.',
    'Front end is not an afterthought. React, Angular and TypeScript, wired to the same APIs I design, so the contract between the two is never a guess.',
    'Day-to-day ownership of the environments this runs in: RHEL servers, Docker deployments, CI/CD pipelines, and root-cause analysis on live defects — shipping the fix and the prevention, not the surface patch.',
    'Complete systems delivered independently, including a commercially licensed POS platform and an LLM-integrated research application with enforced tool and database boundaries.',
  ],
  facts: [
    { k: 'Experience', v: '4 years' },
    { k: 'Platforms', v: 'Web / Desktop / Mobile' },
    { k: 'Based in', v: 'Cyberjaya, MY' },
    { k: 'Focus', v: 'Backend & systems' },
  ],
}

export const EXPERTISE = {
  number: '02',
  label: 'Expertise',
  headline: 'Engineered for production.',
  intro:
    'Three tiers, honestly ranked. What I build with daily, what I have shipped, and where I keep the guardrails tight.',
  columns: [
    {
      index: '01',
      title: 'Core stack',
      subtitle: 'Production foundations',
      blurb:
        'The tools I reach for first. Daily drivers, load-bearing, no warm-up needed.',
      skills: [
        'Java',
        'Spring Boot',
        'C#',
        'ASP.NET',
        'Python',
        'FastAPI',
        'TypeScript',
        'React',
        'Angular',
        'Node.js',
        'REST APIs',
        'SQL databases',
        'Docker',
        'Linux (RHEL)',
        'Git',
        'CI/CD',
      ],
    },
    {
      index: '02',
      title: 'Experienced',
      subtitle: 'Systems & delivery',
      blurb:
        'Shipped to production in real projects. Reached for when the problem calls for it.',
      skills: [
        'Next.js',
        'React Native',
        'Electron',
        'WebSockets',
        'Microservices',
        'JWT/RBAC',
        'Prisma',
        'Firebase',
        'Nginx',
        'AWS',
        'Tailwind CSS',
      ],
    },
    {
      index: '03',
      title: 'AI engineering',
      subtitle: 'Bounded intelligence',
      blurb:
        'LLM features built around reliability, control and explicit trust boundaries — the model never gets more reach than the task needs.',
      skills: [
        'Allowlisted read-only tool calling',
        'Provider routing & failover',
        'Anthropic',
        'OpenAI',
        'Gemini',
        'Groq',
        'Ollama',
        'RAG',
        'Database-level boundaries',
      ],
    },
  ],
}

export const EXPERIENCE = {
  number: '03',
  label: 'Experience',
  headline: 'Systems shipped. Problems solved.',
  roles: [
    {
      id: 'infomina',
      company: 'Infomina Berhad',
      title: 'Senior Full Stack Developer',
      type: 'Contract',
      period: 'May 2025 — Present',
      current: true,
      summary:
        'Own delivery of full-stack features across web, Windows desktop and mobile, from design through production deployment and ongoing support.',
      bullets: [
        'Design and build backend services and REST APIs in Java Spring Boot, Node.js and FastAPI, selecting the appropriate stack per service, with Angular and TypeScript on the front end.',
        'Introduced Redis caching over MySQL to cut database load on read-heavy endpoints and improve response times.',
        'Maintain RHEL production servers: containerise applications with Docker, automate operational tasks in Shell, and act as escalation point for live defects across application and infrastructure layers.',
        'Diagnose production incidents through log analysis and root-cause investigation, then ship fixes and preventive changes rather than surface patches.',
        'Built desktop and automation tooling with Electron and Python Tkinter, integrating OCR and automated number plate recognition to replace manual data entry.',
        'Use AI-assisted development for prototyping, refactoring and test scaffolding, with review and testing before anything reaches production.',
      ],
      stack: ['Java', 'Spring Boot', 'Angular', 'Node.js', 'FastAPI', 'Redis', 'Docker', 'RHEL'],
    },
    {
      id: 'consolsys',
      company: 'Consolsys Sdn. Bhd.',
      title: 'Software Engineer',
      type: 'Permanent',
      period: 'March 2023 — May 2025',
      current: false,
      summary:
        'Maintained and extended backend services and web applications, taking features from requirement through release.',
      bullets: [
        'Built and extended backend services and web applications in C#, ASP.NET, JavaScript and Angular.',
        'Investigated complex production defects through code-level debugging and root-cause analysis, resolving issues that had resisted earlier fixes and improving overall system stability.',
        'Optimised MSSQL queries and batch-processing workflows, improving data throughput on long-running jobs.',
        'Managed build and release through Visual Studio, GitLab and CI/CD pipelines, and supported deployments and post-release issues in production.',
      ],
      stack: ['C#', 'ASP.NET', 'Angular', 'JavaScript', 'MSSQL', 'GitLab CI'],
    },
    {
      id: 'protech',
      company: 'Protech Digital',
      title: 'Application Developer',
      type: 'Full-time',
      period: 'September 2022 — February 2023',
      current: false,
      summary:
        'Developed application features and backend components against relational databases.',
      bullets: [
        'Developed application features and backend components, implementing data-driven functionality and tuning SQL queries against relational databases.',
        'Debugged and resolved reported defects, working alongside senior developers to deliver fixes on schedule.',
      ],
      stack: ['SQL', 'Backend components', 'Debugging'],
    },
  ],
}

export const WORK = {
  number: '04',
  label: 'Selected work',
  headline: 'Built beyond the brief.',
  intro:
    'Five systems, each solving a problem that only shows up once the thing is actually in production.',
  privateNote: 'Private repository — available on request',
  projects: [
    {
      index: '01',
      name: 'AI Trader',
      category: 'AI / Fintech',
      subtitle: 'Market Research & Trading Simulation Platform',
      tags: ['FastAPI', 'TimescaleDB', 'LLMs'],
      summary:
        'A self-hosted workspace for researching market data, practising trade execution against historical data, and keeping a trade journal — built as a multi-service system rather than a chat wrapper.',
      highlights: [
        'FastAPI backend over TimescaleDB, Redis for caching and quota coordination, and MinIO for private file storage, orchestrated with Docker Compose.',
        'Six external data providers sit behind a quota gateway using per-pool token buckets, circuit breaking and request auditing.',
        'Solved the look-ahead problem in the replay engine by clamping every candle query to a session cursor, so simulated trades can never see future data.',
        'Order fills, margin, partial closes and liquidation are enforced as tested ledger invariants.',
        'Constrained the LLM assistant to an allowlisted read-only tool registry and a dedicated SELECT-only PostgreSQL role, so the data boundary holds even if application logic is wrong.',
      ],
      stack: [
        'FastAPI',
        'Python',
        'PostgreSQL/TimescaleDB',
        'Redis',
        'MinIO',
        'Docker',
        'React',
        'TypeScript',
        'WebSockets',
        'Ollama',
        'Anthropic / OpenAI / Gemini',
      ],
      repo: null,
    },
    {
      index: '02',
      name: 'Enterprise POS System',
      category: 'Desktop / Security',
      subtitle: 'POS System & ERP Software',
      tags: ['Electron', 'Spring Boot', 'AES-256'],
      summary:
        'A commercially licensed point-of-sale product for retail tills: cashier terminal, dual-screen customer display, inventory with expiry tracking, shift and cash-drawer management, and reporting.',
      highlights: [
        'Three-tier architecture end to end: an Electron/React desktop client, a Spring Boot REST and WebSocket backend, and a PostgreSQL database with Flyway-managed migrations.',
        'Moved thermal receipt and barcode printing into a separate Python ESC/POS HTTP service running as a Windows service, removing native printer driver dependencies from the Electron client.',
        'Implemented the licensing system that makes the product commercially sellable: AES-256-GCM with PBKDF2 derivation and HMAC-SHA256 integrity, bound to a hardware fingerprint, enforcing user, device, terminal and feature limits across perpetual, trial and subscription keys.',
        'Secured and deployed with JWT authentication, an annotation-driven access matrix enforced through AOP, rate limiting and encrypted configuration.',
        'Shipped via Docker Compose behind Nginx with SSL termination, scheduled backups and audit log export.',
      ],
      stack: [
        'Electron',
        'React',
        'TypeScript',
        'Redux Toolkit',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'Flyway',
        'Docker',
        'Nginx',
        'Python',
        'JWT',
      ],
      repo: null,
    },
    {
      index: '03',
      name: 'Papercup',
      category: 'Mobile / Cloud POS',
      subtitle: 'Multi-Store Cloud POS Platform',
      tags: ['React Native', 'Firebase', 'Offline-first'],
      summary:
        'A cloud point-of-sale system for a cafe business: a React Native app on store devices for sales and shifts, plus a web dashboard for managing stores, staff, inventory and reporting.',
      highlights: [
        'Kept money-handling logic off the client entirely — checkout, sale voiding, shift lifecycle, inventory adjustment and voucher redemption run as transactional Cloud Functions that re-validate prices and decrement inventory atomically.',
        'Made offline sales safe by persisting queued checkouts with idempotency keys to a command ledger, so a replayed transaction after reconnection cannot create a duplicate sale — the core correctness problem in offline-first retail.',
        'Enforced role-based access through Firebase custom claims, Firestore security rules and store-scoped authorisation profiles, with employee PINs verified server-side against stored hashes.',
        'Shared business rules live in a common TypeScript package across mobile, web and backend.',
      ],
      stack: [
        'React Native',
        'React',
        'TypeScript',
        'Firebase Auth',
        'Firestore',
        'Cloud Functions',
        'Node.js',
        'Zod',
        'npm workspaces',
      ],
      repo: null,
    },
    {
      index: '04',
      name: 'DofE Malaysia',
      category: 'Platform / Workflow',
      subtitle: 'Programme Registration Platform',
      tags: ['Next.js', 'Prisma', 'State machines'],
      summary:
        'The public website and registration system for a national youth award programme, handling individual and school-cohort enrolment plus an admin dashboard for reviewing registrations and managing site content.',
      highlights: [
        'Built bulk registration so teachers can enrol whole cohorts by manual entry or CSV upload, generating tracked batches with unique reference numbers, validation feedback, notification emails and CSV export.',
        'Implemented a review state machine — submitted, under review, needs correction, approved, rejected, cancelled — with organisation-scoped access, so partner organisations see only their own registrants.',
        'Handled participant data with bcrypt hashing, signed httpOnly JWT sessions, Zod validation, per-IP rate limiting and parameterised queries.',
        'Uploads are proxied through authenticated routes rather than exposing the storage bucket.',
      ],
      stack: [
        'Next.js',
        'React',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Zod',
        'bcrypt',
        'JWT',
        'MinIO / S3',
        'Docker',
        'Caddy',
      ],
      repo: null,
    },
    {
      index: '05',
      name: 'Halen Miaga',
      category: 'Commerce / AI',
      subtitle: 'E-Commerce Platform',
      tags: ['Laravel', 'Stripe', 'LLM assistant'],
      summary:
        'An online bag retailer with storefront, cart, Stripe checkout, invoicing, and an admin area for stock, suppliers, deliveries and sales reporting.',
      highlights: [
        'Full commerce flow from catalogue through Stripe checkout to invoicing and fulfilment.',
        'Added a storefront assistant backed by LLM providers with failover between Gemini and Groq, rate limiting and CAPTCHA verification.',
        'Escalation into an admin help-desk queue when the model cannot resolve a query, so no customer is left talking to a dead end.',
      ],
      stack: ['Laravel', 'PHP', 'MySQL', 'Phinx', 'Docker', 'Nginx', 'Stripe API', 'Gemini', 'Groq'],
      repo: 'https://github.com/manimaran98/Bag-Ecommerce',
    },
  ],
}

export const CREDENTIALS = {
  number: '05',
  label: 'Credentials',
  headline: 'Foundations on paper.',
  education: {
    degree: 'Bachelor of Computer Science (Hons)',
    honours: 'First Class Honours',
    institution: 'Universiti Selangor',
    period: '2019 — 2022',
  },
  certifications: [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
    { name: 'AWS re/Start Program', issuer: 'Amazon Web Services' },
  ],
}

export const FOOTER = {
  headline: "Let's build what others won't.",
  blurb:
    'Open to work that needs someone who will own the whole line — the API, the client, and the server it lands on.',
  links: [
    {
      label: 'Start a conversation',
      value: IDENTITY.email,
      href: IDENTITY.emailHref,
      external: false,
    },
    {
      label: 'GitHub',
      value: IDENTITY.githubHandle,
      href: IDENTITY.githubUrl,
      external: true,
    },
    {
      label: 'Call',
      value: IDENTITY.phone,
      href: IDENTITY.phoneHref,
      external: false,
    },
  ],
  copyright: '© 2026 ' + IDENTITY.name,
  place: IDENTITY.locationLong,
}
