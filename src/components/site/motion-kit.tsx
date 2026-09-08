import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
          }}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const hidden =
    direction === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";

  return (
    <div
      ref={ref}
      className={`${/(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(wrapperClassName) ? "" : "relative"} overflow-hidden ${wrapperClassName}`}
    >
      <motion.div
        className="h-full w-full"
        style={reduced ? {} : { y }}
        initial={reduced ? false : { clipPath: hidden }}
        whileInView={reduced ? {} : { clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, amount: 0.2 }}
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
