import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
};

const COLORS = ["rgba(255,255,255,", "rgba(201,160,92,", "rgba(165,163,189,"];

/**
 * Ambient canvas particle field in the Stobot palette.
 * Purely decorative: never blocks pointer events, pauses when hidden,
 * honours prefers-reduced-motion and thins out on small screens.
 */
export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const seed = () => {
      const isMobile = window.innerWidth < 768;
      const count = Math.min(isMobile ? 28 : 70, Math.round((width * height) / 22000));
      particles = Array.from({ length: Math.max(12, count) }, () => {
        const z = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.14 * z,
          vy: (Math.random() - 0.5) * 0.12 * z,
          r: (0.6 + Math.random() * 1.5) * z,
          c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${(0.12 + p.z * 0.35).toFixed(2)})`;
        ctx.fill();
      }
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onVisibility = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
