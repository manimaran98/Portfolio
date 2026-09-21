'use client'

/**
 * A single skill chip. `tone` picks the accent used on hover so each
 * expertise column reads as its own family.
 */
const TONES = {
  molten: 'hover:border-molten-500/50 hover:text-molten-200 hover:bg-molten-500/10',
  steel: 'hover:border-steel-300/40 hover:text-steel-200 hover:bg-surface-strong',
  chrome: 'hover:border-line-strong hover:text-ink hover:bg-surface-strong',
}

export default function SkillTag({ children, tone = 'steel' }) {
  return (
    <li
      className={`rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] leading-none text-steel-300 transition-colors duration-300 ${
        TONES[tone] ?? TONES.steel
      }`}
    >
      {children}
    </li>
  )
}
