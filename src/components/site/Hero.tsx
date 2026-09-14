import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "./kinetic";
import { ParallaxImage } from "./motion-kit";
import { ParticleField } from "./ParticleField";
import heroImg from "@/assets/hero-crew.jpg";

const paths = {
  company: {
    headline: "500+ души на трудов договор в 12 сектора. Наемането и документите са наша работа.",
    support: "Ние наемаме, обучаваме и осигуряваме хората. Вие получавате готова смяна на обекта, с договор, осигуровки, застраховка и заместник при отсъствие.",
    cta: "Изпратете заявка",
    href: "#zayavka",
  },
  candidate: {
    headline: "Кажи къде и кога можеш да работиш. Ще ти предложим подходяща смяна.",
    support: "Избери работа в строителството, складовете, HoReCa или производството.",
    cta: "Виж свободните места",
    href: "/obiavi",
  },
} as const;

type PathKey = keyof typeof paths;

const heroStats = [
  ["500+", "разпределени работници"],
  ["95", "обекта"],
  ["12", "сектора"],
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function useEnter() {
  const reduced = useReducedMotion();
  return (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.75, ease: EASE, delay },
        };
}

export function Hero() {
  const [path, setPath] = useState<PathKey>("company");
  const active = paths[path];
  const enter = useEnter();

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-border pt-28 lg:pt-36">
      <ParallaxImage
        src={heroImg}
        alt="Екип от обучени работници на индустриален обект"
        width={1600}
        height={1100}
        distance={50}
        direction="up"
        wrapperClassName="absolute inset-0 -z-20"
        className="h-[115%] w-full object-cover opacity-60"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(100deg, #130F3Ecc 20%, #130F3E73 60%, #130F3E40)" }}
      />
      <ParticleField className="-z-10 opacity-80" />

      {/* MOBILE HERO */}
      <div className="visible mx-auto max-w-7xl px-5 pb-14 opacity-100 md:hidden">
        <motion.div
          {...enter(0)}
          role="tablist"
          aria-label="Изберете вашия път"
          className="glass-panel flex w-full rounded-[6px] p-1"
        >
          {(
            [
              ["company", "Търся персонал"],
              ["candidate", "Търся работа"],
            ] as const
          ).map(([key, label]) => (
            <motion.button
              key={key}
              type="button"
              whileTap={{ scale: 0.96 }}
              role="tab"
              aria-selected={path === key}
              onClick={() => setPath(key)}
              className={`flex-1 rounded-[6px] px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                path === key ? "bg-white text-[#130F3E] shadow-sm" : "text-white/80"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        <div key={path} className="visible relative opacity-100">
          <span className="hero-halo -top-6 left-0 h-40 w-64" aria-hidden="true" />
          <motion.h1 {...enter(0.08)} className="mt-8 text-[2.15rem] leading-[1.03] text-white">
            {active.headline}
          </motion.h1>

          <motion.p {...enter(0.18)} className="mt-5 text-base leading-relaxed text-white/75">
            {active.support}
          </motion.p>

          {path === "company" && (
            <motion.dl {...enter(0.26)} className="mt-6 grid grid-cols-3 gap-px rounded-[28px] bg-border">
              {heroStats.map(([v, k]) => (
                <div key={k} className="rounded-[24px] bg-background px-2 py-4 text-center">
                  <dt className="numeral text-xl text-white">{v}</dt>
                  <dd className="manifest-label mt-1 block text-[0.6rem] leading-tight text-white/70">{k}</dd>
                </div>
              ))}
            </motion.dl>
          )}

          <motion.div {...enter(0.34)}>
            <MagneticButton
              href={active.href}
              label={active.cta}
              className="mt-7 flex w-full items-center justify-center rounded-[6px] bg-primary px-8 py-5 text-center font-display text-base font-bold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            />
          </motion.div>
        </div>
      </div>

      {/* DESKTOP HERO */}
      <div className="relative mx-auto hidden max-w-7xl px-5 pb-16 opacity-100 md:block lg:px-8 lg:pb-24">
        <span className="hero-halo -top-10 left-0 h-[22rem] w-[38rem]" aria-hidden="true" />
        <motion.h1
          {...enter(0.05)}
          className="fluid-display relative max-w-5xl leading-[0.92]"
        >
          500+ души на трудов договор в 12 сектора.
          <span className="block text-white/70">Наемането и документите са наша работа.</span>
        </motion.h1>

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
          <motion.p {...enter(0.2)} className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ние наемаме, обучаваме и осигуряваме хората. Вие получавате готова смяна на обекта, с
            договор, осигуровки, застраховка и заместник при отсъствие.
          </motion.p>

          <motion.dl {...enter(0.3)} className="grid grid-cols-3 gap-px rounded-[28px] bg-border">
            {heroStats.map(([v, k]) => (
              <div key={k} className="rounded-[24px] bg-background px-4 py-5">
                <dt className="numeral text-3xl sm:text-4xl">{v}</dt>
                <dd className="manifest-label mt-1 block">{k}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          {...enter(0.4)}
          className="mt-10 flex w-full flex-col gap-3 sm:w-fit sm:flex-row sm:items-stretch"
        >
          <MagneticButton
            href="#zayavka"
            label="Нуждая се от персонал"
            className="flex items-center justify-center rounded-[6px] bg-primary px-8 py-5 text-center font-display text-base font-bold text-primary-foreground shadow-[0_25px_60px_-30px_rgba(201,160,92,0.8)] transition-colors hover:bg-foreground hover:text-background"
          />
          <MagneticButton
            href="/obiavi"
            label="Търся работа"
            className="glass-panel flex items-center justify-center rounded-[6px] px-8 py-5 text-center font-display text-base font-bold text-foreground transition-colors hover:bg-move hover:text-move-foreground"
          />
        </motion.div>
      </div>
    </section>
  );
}
