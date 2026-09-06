import { useState } from "react";
import heroImg from "@/assets/hero-crew.jpg";

const paths = {
  company: {
    headline: "350+ души на договор. Нула главоболия по наемането за вас.",
    support: "Наемаме, обучаваме и осигуряваме хората — вие получавате готова смяна на обекта.",
    stat: "95+",
    statLabel: "партньори",
    cta: "Изпратете заявка",
    href: "#zayavka",
  },
  candidate: {
    headline: "350+ хора вече работят с нас. Договор, осигуровки, коректно плащане.",
    support: "Трудов договор, осигуровки и коректно заплащане от първия ден.",
    stat: "350+",
    statLabel: "наети хора",
    cta: "Кандидатствайте сега",
    href: "#kandidati",
  },
} as const;

type PathKey = keyof typeof paths;

export function Hero() {
  const [path, setPath] = useState<PathKey>("company");
  const active = paths[path];

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-border pt-28 lg:pt-36">
      <img
        src={heroImg}
        alt="Екип от обучени работници на индустриален обект"
        width={1600}
        height={1100}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20 grayscale"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(100deg, #130F3E 30%, #130F3Ee6 65%, #130F3Ebf)" }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70" />

      {/* MOBILE HERO */}
      <div className="mx-auto max-w-7xl px-5 pb-14 md:hidden">
        <div
          role="tablist"
          aria-label="Изберете вашия път"
          className="flex w-full rounded-full border border-white/25 bg-white/10 p-1"
        >
          {(
            [
              ["company", "Търся персонал"],
              ["candidate", "Търся работа"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={path === key}
              onClick={() => setPath(key)}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                path === key ? "bg-white text-[#130F3E] shadow-sm" : "text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div key={path} className="animate-in fade-in duration-300">
          <h1 className="mt-8 text-[2.15rem] leading-[1.03] text-white">{active.headline}</h1>

          <p className="mt-5 text-base leading-relaxed text-white/75">{active.support}</p>

          <p className="mt-6 flex items-baseline gap-2">
            <span className="numeral text-4xl text-white">{active.stat}</span>
            <span className="manifest-label">{active.statLabel}</span>
          </p>

          <a
            href={active.href}
            className="mt-7 block w-full bg-primary px-8 py-5 text-center font-display text-base font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            {active.cta}
          </a>
        </div>
      </div>

      {/* DESKTOP HERO */}
      <div className="mx-auto hidden max-w-7xl px-5 pb-16 md:block lg:px-8 lg:pb-24">
        <div className="flex flex-wrap items-center gap-3">
          <span className="manifest-label">Манифест 001</span>
          <span className="h-px flex-1 bg-line/35" aria-hidden="true" />
          <span className="manifest-label">Аутсорсинг на персонал / България</span>
        </div>

        <h1 className="mt-8 max-w-5xl text-[2.75rem] leading-[0.92] sm:text-6xl lg:text-[5.25rem]">
          350+ души на договор.
          <span className="block text-white/70">12 сектора.</span>
          Нула главоболия по наемането за вас.
        </h1>

        {/* the single orchestrated animation: the route line drawing in on load */}
        <div className="mt-10 flex items-center">
          <span className="route-stop h-3 w-3 shrink-0 rounded-full bg-white" aria-hidden="true" />
          <span className="route-line-x h-px flex-1 bg-line/60" aria-hidden="true" />
          <span
            className="route-stop h-3 w-3 shrink-0 rounded-full border border-line/60 [animation-delay:1.5s]"
            aria-hidden="true"
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ние наемаме, обучаваме и осигуряваме хората. Вие получавате готова смяна на обекта — с
            договор, осигуровки, застраховка и заместник, ако някой отсъства.
          </p>

          <dl className="grid grid-cols-3 gap-px bg-border">
            {[
              ["12", "години опит"],
              ["95+", "партньори"],
              ["24ч", "заместване"],
            ].map(([v, k]) => (
              <div key={k} className="bg-background px-4 py-5">
                <dt className="numeral text-3xl sm:text-4xl">{v}</dt>
                <dd className="manifest-label mt-1 block">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex w-full flex-col gap-px bg-border sm:w-fit sm:flex-row sm:items-stretch">
          <a
            href="#zayavka"
            className="bg-primary px-8 py-5 text-center font-display text-base font-bold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Нуждая се от персонал
          </a>
          <a
            href="#kandidati"
            className="bg-background px-8 py-5 text-center font-display text-base font-bold tracking-wide text-foreground uppercase transition-colors hover:bg-move hover:text-move-foreground"
          >
            Търся работа
          </a>
        </div>
      </div>
    </section>
  );
}
