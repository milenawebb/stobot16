import { useEffect, useRef, useState } from "react";
import { SectionHead } from "./SectionHead";

const stats = [
  { value: 500, suffix: "+", label: "разпределени работници" },
  { value: 12, suffix: "", label: "сектора на обслужване" },
  { value: 24, suffix: " ч.", label: "средно време за заместване" },
  { value: 98, suffix: "%", label: "покрити смени по график" },
];

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function Stat({ value, suffix, label, run }: (typeof stats)[number] & { run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="bg-background p-6 lg:p-8">
      <p className="numeral text-5xl leading-none tabular-nums lg:text-7xl">
        {n}
        <span className="text-white/60">{suffix}</span>
      </p>
      <p className="mt-4 text-base text-foreground">{label}</p>
    </div>
  );
}

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="zashto" className="relative overflow-hidden border-b border-border py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          index="08"
          label="Показатели"
          title="Числата зад екипите"
          lead="Числата зад екипите — фиксирани договори, ясно отчитане на часовете, бърза реакция при отсъствия."
        />
        <div
          ref={ref}
          className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
