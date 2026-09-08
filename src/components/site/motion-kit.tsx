import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Reveals when scrolled into view, but is visible by default: the hidden
 * state is only applied after mount, once we know an observer is watching,
 * and a timeout always guarantees a reveal even if detection fails.
 */
function useRevealed(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // already on screen: stay visible

    setRevealed(false);
    const show = () => setRevealed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    // safety net: never leave content hidden
    const timer = window.setTimeout(show, 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, enabled]);

  return revealed;
}

/** Heading whose words fade+slide in, staggered, when scrolled into view. */
export function RevealWords({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const revealed = useRevealed(ref, !reduced);
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <MotionTag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: revealed ? i * 0.05 : 0 }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}


/**
 * Photo with a clip-path wipe reveal on first view and a gentle
 * scroll-linked parallax translate.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  width,
  height,
  distance = 40,
  direction = "left",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  width?: number;
  height?: number;
  distance?: number;
  direction?: "left" | "up";
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const revealed = useRevealed(ref, !reduced);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const hidden = direction === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";

  return (
    <div
      ref={ref}
      className={`${/(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(wrapperClassName) ? "" : "relative"} overflow-hidden ${wrapperClassName}`}
    >
      <motion.div
        className="h-full w-full"
        style={reduced ? {} : { y }}
        animate={reduced ? {} : { clipPath: revealed ? "inset(0 0% 0 0)" : hidden }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >

        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          className={className}
        />
      </motion.div>
      {children}
    </div>
  );
}
