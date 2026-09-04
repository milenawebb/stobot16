import { ArrowRight, BadgeCheck, ShieldCheck, FileCheck2 } from "lucide-react";
import heroImg from "@/assets/hero-crew.jpg";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 lg:pt-36">
      <img
        src={heroImg}
        alt="Екип от обучени работници на индустриален обект"
        width={1600}
        height={1100}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(110deg, var(--background) 20%, oklch(0.19 0.028 258 / 0.72) 60%, oklch(0.19 0.028 258 / 0.55))",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Аутсорсинг на персонал в България
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Обучен и осигурен персонал,
            <span className="block bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
              готов за вашия обект
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Placeholder текст: наемаме, обучаваме и осигуряваме хората — вие получавате работеща
            смяна на обекта. Трудови договори, социални осигуровки, застраховка и заместване при
            отсъствие.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#zayavka"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-7 py-4 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Нуждая се от персонал
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#kandidati"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/70 px-7 py-4 text-sm font-bold backdrop-blur transition-colors hover:bg-surface-2"
          >
            Търся работа
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={220} className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: FileCheck2, t: "Трудови договори", d: "Пълна документация и осигуровки" },
            { icon: ShieldCheck, t: "Застраховани екипи", d: "Трудова медицина и инструктаж" },
            { icon: BadgeCheck, t: "Заместване до 24ч", d: "Гарантирана наличност на смяната" },
          ].map((f) => (
            <div key={f.t} className="surface-card p-5">
              <f.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display font-semibold">{f.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
