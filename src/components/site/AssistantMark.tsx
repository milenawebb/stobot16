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
      {/* dome: upper half of a globe forming the head */}
      <path d="M3 19a13 13 0 0 1 26 0" />
      {/* latitude lines across the dome */}
      <path d="M5.4 13.2h21.2" />
      <path d="M10 8.3h12" />
      {/* meridian curving over the dome */}
      <path d="M16 6c3.6 3.4 5.4 8 5.4 13M16 6c-3.6 3.4-5.4 8-5.4 13" />
      {/* eyes peeking out beneath the dome */}
      <circle cx="11.6" cy="23.4" r="2" fill="currentColor" stroke="none" />
      <circle cx="20.4" cy="23.4" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
