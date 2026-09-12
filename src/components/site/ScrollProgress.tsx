import { motion, useScroll, useSpring } from "framer-motion";

/** Thin page-scroll progress bar, sits under the fixed header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gold/80"
    />
  );
}
