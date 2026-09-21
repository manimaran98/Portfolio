/**
 * The LinkedIn mark as inline SVG.
 * lucide-react v1 dropped brand icons, so the real glyph is drawn here —
 * same reason as GithubMark.
 */
export default function LinkedInMark({ size = 16, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M3.06 4.32a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM1.8 5.44h2.52V14H1.8V5.44Zm4.44 0h2.41v1.17h.04c.34-.62 1.16-1.28 2.39-1.28 2.55 0 3.02 1.62 3.02 3.73V14h-2.52V9.57c0-1.06-.02-2.42-1.5-2.42-1.5 0-1.73 1.15-1.73 2.34V14H5.84V5.44h.4Z" />
    </svg>
  )
}
