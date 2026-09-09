import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

/** Splits label text into per-letter spans that wave upward on hover. */
export function KineticText({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          variants={{
            rest: { y: 0 },
            hover: { y: -2 },
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20, delay: i * 0.015 }}
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

type MagneticProps = {
  children?: ReactNode;
  label?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  strength?: number;
  target?: string;
  rel?: string;
};

/**
 * Magnetic, radius-morphing, press-reactive button.
 * Pass `label` for the kinetic letter wave, or `children` for custom content.
 */
export function MagneticButton({
  children,
  label,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
  strength = 7,
  target,
  rel,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const common = {
    ref: ref as never,
    className,
    onMouseMove: onMove,
    onMouseLeave: reset,
    initial: "rest" as const,
    animate: "rest" as const,
    whileHover: "hover" as const,
    whileTap: { scale: 0.96 },
    variants: {
      rest: { borderRadius: 6 },
      hover: { borderRadius: 6 },
    },
    transition: { duration: 0.3, ease: "easeOut" as const },
    style: { x, y },
  };

  const content = label ? <KineticText text={label} /> : children;

  if (href) {
    return (
      <motion.a href={href} aria-label={ariaLabel} target={target} rel={rel} {...common}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      {...common}
    >
      {content}
    </motion.button>
  );
}

/** Card wrapper with a cursor-following radial spotlight. */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
  radius = 220,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <Tag
      ref={ref as never}
      onMouseMove={(e: React.MouseEvent) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className={`relative isolate overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0,
          background: pos
            ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.11), transparent 60%)`
            : undefined,
        }}
      />
      {children}
    </Tag>
  );
}
