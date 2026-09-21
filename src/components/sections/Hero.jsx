'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, Download, Mail, Phone } from 'lucide-react'
import GithubMark from '@/components/ui/GithubMark'
import LinkedInMark from '@/components/ui/LinkedInMark'
import Spotlight from '@/components/ui/Spotlight'
import ParticleField from '@/components/ui/ParticleField'
import { useFinePointer } from '@/hooks/useFinePointer'
import { HERO, IDENTITY } from '@/data/content'

const EASE = [0.16, 1, 0.3, 1]

/* The portrait is already a transparent cutout, so all the mask has to do is
   dissolve the bottom edge so the figure grows out of the page. */
const PORTRAIT_MASK =
  'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 74%, rgba(0,0,0,0.6) 89%, rgba(0,0,0,0) 100%)'

/* One cutout per theme — the edge feathering is baked per background, so the
   dark-canvas version reads wrong on the light one. Swapped by the
   .portrait-dark / .portrait-light rules in globals.css rather than by state:
   a hook would render the wrong portrait in the prerendered HTML and flip it
   after hydration, and would show nothing at all with JavaScript off. */
const PORTRAITS = [
  { src: '/profile-dark-mode.png', visibility: 'portrait-dark' },
  { src: '/profile-white-mode.png', visibility: 'portrait-light' },
]

/* Punches a 1px ring out of the conic sweep. */
const RING_MASK =
  'radial-gradient(closest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))'

const RING_GRADIENT =
  'conic-gradient(from 0deg, transparent 0deg, var(--ring-cool) 52deg, transparent 128deg, transparent 216deg, var(--ring-warm) 290deg, transparent 360deg)'

/* Three stacked passes: a tight one to kill the hard alpha edge, then two
   wider, fainter ones so the figure sits in the page instead of on it. On a
   wrapper rather than the <img> so it does not clobber the grayscale filter. */
const PORTRAIT_HALO =
  'drop-shadow(0 0 1.5px var(--portrait-halo-tight)) drop-shadow(0 0 7px var(--portrait-halo-mid)) drop-shadow(0 0 22px var(--portrait-halo-wide))'

const PORTRAIT_GLOW =
  'radial-gradient(48% 44% at 52% 40%, var(--portrait-glow-core), var(--portrait-glow-halo) 46%, transparent 72%)'

/**
 * The hero: the page's only <h1>, a masked portrait cutout, and the four
 * backdrop layers (grid, spotlight, dust, noise) that give the section depth.
 *
 * Entrance animations run on mount rather than on scroll — this block is
 * already in view. Pointer parallax is spring-damped and listens on `window`
 * only when the pointer is fine and motion is allowed; every motion hook is
 * called unconditionally so the hook order can never shift between renders.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const finePointer = useFinePointer()
  const parallax = finePointer && !reduced

  // Pointer position as a -0.5 .. 0.5 fraction of the viewport.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 50, damping: 20, mass: 0.9 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const portraitX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const portraitY = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const portraitRotateY = useTransform(sx, [-0.5, 0.5], [-4, 4])
  const portraitRotateX = useTransform(sy, [-0.5, 0.5], [4, -4])

  // The glow travels less than half as far as the portrait — that lag between
  // the two layers is what the eye reads as depth.
  const glowX = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const glowY = useTransform(sy, [-0.5, 0.5], [-8, 8])

  useEffect(() => {
    if (!parallax) return

    const onMove = (event) => {
      px.set(event.clientX / window.innerWidth - 0.5)
      py.set(event.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [parallax, px, py])

  // Fade-and-lift for the supporting copy.
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.4 : 0.8,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  })

  // Headline lines slide up out of their overflow-hidden mask; under reduced
  // motion they stay put and simply fade.
  const line = (delay) => ({
    initial: { y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: reduced ? 0.45 : 0.9,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  })

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-24 sm:pb-28 lg:pt-32 lg:pb-32"
    >
      <Spotlight />
      <ParticleField />
      <div
        aria-hidden="true"
        className="noise pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <div className="shell relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Text */}
          <div className="lg:col-span-6">
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.4 : 0.7, ease: EASE }}
            >
              <motion.span
                aria-hidden="true"
                className="block h-px w-10 shrink-0 bg-gradient-to-r from-molten-500 to-transparent sm:w-14"
                initial={{ scaleX: reduced ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: 'left center' }}
                transition={{ duration: reduced ? 0.3 : 0.9, ease: EASE }}
              />
              <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-steel-400">
                <span>{HERO.eyebrow[0]}</span>
                <span aria-hidden="true" className="text-molten-500">
                  /
                </span>
                <span>{HERO.eyebrow[1]}</span>
              </p>
            </motion.div>

            <h1
              id="hero-title"
              aria-label={IDENTITY.name}
              className="display mt-7 text-[clamp(2.5rem,8.2vw,7.5rem)]"
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="chrome block" {...line(0.12)}>
                  {IDENTITY.firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" {...line(0.24)}>
                  <span className="chrome">{IDENTITY.lastName}</span>
                  <span className="molten">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="mt-7 max-w-xl text-base text-steel-300 sm:text-lg"
              {...rise(0.5)}
            >
              {HERO.statement}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
              {...rise(0.64)}
            >
              <a
                href={HERO.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-molten-500 px-6 py-3 text-sm font-medium text-on-accent transition-colors duration-300 hover:bg-molten-400"
              >
                {HERO.primaryCta.label}
                <ArrowDownRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>

              <a
                href={IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-steel-200 transition-colors duration-300 hover:border-molten-500/50 hover:text-molten-200"
              >
                <GithubMark className="h-4 w-4" />
                GitHub
              </a>

              <a
                href={IDENTITY.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-steel-200 transition-colors duration-300 hover:border-molten-500/50 hover:text-molten-200"
              >
                <LinkedInMark className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href={IDENTITY.resumeUrl}
                download={IDENTITY.resumeFileName}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-steel-200 transition-colors duration-300 hover:border-molten-500/50 hover:text-molten-200"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Résumé
              </a>
            </motion.div>

            <motion.div className="mt-10 max-w-xl" {...rise(0.78)}>
              <div aria-hidden="true" className="hairline" />
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-steel-400 sm:text-sm">
                <a
                  href={IDENTITY.phoneHref}
                  className="-mx-2 inline-flex min-h-[44px] items-center gap-2 px-2 transition-colors duration-300 hover:text-molten-300"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {IDENTITY.phone}
                </a>
                <a
                  href={IDENTITY.emailHref}
                  className="-mx-2 inline-flex min-h-[44px] min-w-0 items-center gap-2 px-2 transition-colors duration-300 hover:text-molten-300"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{IDENTITY.email}</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0.5 : 1,
              delay: reduced ? 0 : 0.42,
              ease: EASE,
            }}
          >
            <div
              className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[30rem]"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-12 -inset-y-14"
                style={{ x: glowX, y: glowY, backgroundImage: PORTRAIT_GLOW }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-[8%] aspect-square rounded-full"
                style={{
                  backgroundImage: RING_GRADIENT,
                  maskImage: RING_MASK,
                  WebkitMaskImage: RING_MASK,
                }}
                animate={reduced ? undefined : { rotate: 360 }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 54, repeat: Infinity, ease: 'linear' }
                }
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[6%] h-10 w-10 border-l border-t border-molten-500/30"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-[6%] h-10 w-10 border-r border-t border-steel-500/30"
              />

              <motion.div
                className="relative aspect-[1177/1336] w-full"
                style={{
                  x: portraitX,
                  y: portraitY,
                  rotateX: portraitRotateX,
                  rotateY: portraitRotateY,
                  transformStyle: 'preserve-3d',
                  maskImage: PORTRAIT_MASK,
                  WebkitMaskImage: PORTRAIT_MASK,
                }}
              >
                <div
                  className="relative h-full w-full"
                  style={{ filter: PORTRAIT_HALO }}
                >
                  {PORTRAITS.map(({ src, visibility }) => (
                    <Image
                      key={src}
                      src={src}
                      alt={HERO.portraitAlt}
                      width={1177}
                      height={1336}
                      priority
                      sizes="(min-width: 1024px) 30rem, 80vw"
                      className={`portrait-figure absolute inset-0 h-full w-full object-contain object-bottom ${visibility}`}
                    />
                  ))}
                </div>

                {/* Outside the halo wrapper on purpose. PORTRAIT_HALO is a
                    drop-shadow, which traces the alpha of everything it
                    filters — a full-rect gradient inside it would give the
                    cutout a rectangular shadow. Out here it still blends
                    against the portrait, because the transformed parent is
                    the stacking context they share. */}
                <div aria-hidden="true" className="portrait-key" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      {reduced ? null : (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 lg:bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        >
          <div className="shell flex justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <span className="eyebrow rotate-180 text-steel-500 [writing-mode:vertical-rl]">
                {HERO.scrollHint}
              </span>
              <span className="relative block h-12 w-px overflow-hidden bg-line">
                <motion.span
                  className="absolute left-1/2 top-0 block h-1.5 w-1.5 rounded-full bg-molten-500"
                  style={{ x: '-50%' }}
                  animate={{ y: [0, 42], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
