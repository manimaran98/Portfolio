/**
 * A soft radial backdrop for a section.
 *
 * This replaces the tiled hairline grid that used to sit behind these
 * sections. A grid field is a generic "technical" texture that reads as
 * filler unless the surface is an actual canvas, map or blueprint — and the
 * brief asked for radial gradient backdrops, which is what this is.
 */
export default function SectionWash({ tone = 'cool', className = '' }) {
  const color = tone === 'warm' ? 'var(--glow-warm)' : 'var(--glow-cool)'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(60% 55% at 50% 50%, ${color}, transparent 72%)`,
      }}
    />
  )
}
