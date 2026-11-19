import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import coordinatorPhoto from "@/assets/process-coordinator.jpg";
import crewPhoto from "@/assets/process-crew.jpg";
import trainingPhoto from "@/assets/process-training.jpg";
import contractsPhoto from "@/assets/process-contracts.jpg";
import supervisionPhoto from "@/assets/process-supervision.jpg";

export type ProcessStep = { number: string; title: string; body: string; image: string };

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Заявка и анализ",
    body: "Казвате ни колко хора, за какво и къде. Отговаряме до 24 часа.",
    image: coordinatorPhoto,
  },
  {
    number: "02",
    title: "Подбор и обучение",
    body: "Подбираме хора с нужните умения и ги подготвяме конкретно за вашата позиция, преди да излязат на смяна.",
    image: trainingPhoto,
  },
  {
    number: "03",
    title: "Договори и осигуровки",
    body: "Наемаме хората при нас с всички документи по закон. Подготовката на договорите е наша грижа.",
    image: contractsPhoto,
  },
  {
    number: "04",
    title: "Стартиране на обекта",
    body: "Екипът излиза на смяна с наш координатор на терен, който следи присъствие и качество от първия ден.",
    image: crewPhoto,
  },
  {
    number: "05",
    title: "Текущ контрол",
    body: "Следим присъствието и качеството на терен през целия период на договора.",
    image: supervisionPhoto,
  },
];


export const processImages = { coordinatorPhoto, trainingPhoto, contractsPhoto, crewPhoto, supervisionPhoto };

export function Process({
  id = "kak-rabotim",
  heading = "От заявка до работещ екип",
  steps = defaultSteps,
  footnote,
}: {
  id?: string;
  heading?: string;
  steps?: ProcessStep[];
  footnote?: string;
} = {}) {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % steps.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + steps.length) % steps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = steps.length - 1;
    else return;
    e.preventDefault();
    setActiveStep(next);
    tabRefs.current[next]?.focus();
  };

  const footnoteEl = footnote ? (
    <p className="rounded-full border border-border bg-surface/60 px-5 py-3 text-sm leading-relaxed text-muted-foreground">
      {footnote}
    </p>
  ) : null;

  return (
    <section id={id} className="border-b border-border py-20 lg:py-0">
      {/* Mobile heading */}
      <div className="mx-auto max-w-7xl px-5 lg:hidden">
        <h2 className="max-w-2xl text-[2rem] sm:text-5xl">{heading}</h2>
      </div>

      {/* Desktop: normal-height section with clickable, expanding photo cards */}
      <div className="mx-auto hidden max-w-7xl px-8 py-24 lg:block">
        <h2 className="max-w-3xl text-5xl xl:text-6xl">{heading}</h2>
        <div role="tablist" aria-label={heading} className="mt-10 flex h-[460px] gap-3">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <motion.button
                key={step.number}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                layout
                transition={transition}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveStep(index)}
                onKeyDown={(e) => onKey(e, index)}
                style={{ flexGrow: isActive ? 4.2 : 1, flexBasis: 0 }}
                className={`group relative min-w-0 overflow-hidden rounded-[32px] text-left outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "" : "transition-transform duration-200 hover:-translate-y-1"
                }`}
              >
                <img
                  src={step.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/0 transition-opacity duration-300 ${
                    isActive ? "opacity-95" : "opacity-80"
                  }`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 font-display text-sm font-bold text-primary-foreground">
                  {step.number}
                </span>
                <span lang="bg" className={`absolute inset-x-0 bottom-0 block ${isActive ? "p-5 xl:p-7" : "p-4"}`}>
                  <span
                    className={`block font-display font-semibold text-foreground ${
                      isActive ? "text-3xl xl:text-4xl" : "hyphens-auto break-words text-sm leading-snug xl:text-base"
                    }`}
                  >
                    {step.title}
                  </span>
                  {isActive && (
                    <motion.span
                      key={`body-${step.number}`}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition, delay: reduced ? 0 : 0.12 }}
                      className="mt-3 block max-w-lg text-base leading-relaxed text-foreground/85 xl:text-lg"
                    >
                      {step.body}
                    </motion.span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
        {footnoteEl ? <div className="mt-8">{footnoteEl}</div> : null}
      </div>

      {/* Mobile: stacked steps, no pinning */}
      <div className="mx-auto mt-10 max-w-7xl px-5 lg:hidden">
        <ol className="space-y-8">
          {steps.map((step) => (
            <li key={`mobile-${step.number}`} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary font-display text-sm font-bold text-primary-foreground">
                {step.number}
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {footnoteEl ? <div className="mt-8">{footnoteEl}</div> : null}
      </div>
    </section>
  );
}
