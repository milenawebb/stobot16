type Props = { className?: string };

/**
 * Custom brand mark for the AI assistant: a stylised globe (meridian grid)
 * forming a dome-like head, with two friendly dot eyes peeking out beneath it.
 * Clean single-colour line art, legible at small sizes.
 */
export function AssistantMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* globe outline */}
      <circle cx="16" cy="15" r="10" />
      {/* equator + latitude lines */}
      <path d="M6 15h20" />
      <path d="M7.6 9.8h16.8" />
      <path d="M7.6 20.2h16.8" />
      {/* meridians */}
      <path d="M16 5c3.4 3 5 6.4 5 10s-1.6 7-5 10c-3.4-3-5-6.4-5-10s1.6-7 5-10z" />
      {/* eyes peeking out below the grid */}
      <circle cx="12.6" cy="17.6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19.4" cy="17.6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
