import { useCountUp } from "@/lib/use-reveal";

const stats = [
  { value: 480, suffix: "+", label: "Завършени проекта" },
  { value: 12, suffix: "", label: "Години опит" },
  { value: 95, suffix: "+", label: "Партньорски компании" },
  { value: 350, suffix: "+", label: "Работници на договор" },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div ref={ref} className="surface-card px-6 py-8 text-center">
      <p className="font-display text-4xl font-bold text-primary sm:text-5xl">
        {current}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
