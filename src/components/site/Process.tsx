import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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


function StepLabels({ activeStep, steps }: { activeStep: number; steps: ProcessStep[] }) {
  return (
    <div className="flex w-full max-w-full flex-wrap gap-x-10 gap-y-2" aria-hidden="true">
      {steps.map((step, index) => (
        <span
          key={step.number}
          className={`font-display text-sm font-semibold transition-opacity duration-300 ${
            index === activeStep ? "text-white opacity-100" : "text-white opacity-45"
          }`}
        >
          {step.title}
        </span>
      ))}
    </div>
  );
}

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
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const active = steps[activeStep]!;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset["stepIndex"]);
            if (!Number.isNaN(index)) setActiveStep(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of triggerRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const footnoteEl = footnote ? (
    <p className="rounded-full border border-border bg-surface/60 px-5 py-3 text-sm leading-relaxed text-muted-foreground">
      {footnote}
    </p>
  ) : null;

  return (
    <section id={id} className="border-b border-border py-20 lg:py-0">
      {/* Mobile heading; on desktop the heading lives inside the pinned panel */}
      <div className="mx-auto max-w-7xl px-5 lg:hidden">
        <h2 className="max-w-2xl text-[2rem] sm:text-5xl">{heading}</h2>
      </div>

      {/* Desktop: one viewport of scroll per step; heading, labels and photo pin together under the fixed header */}
      <div className="relative hidden lg:block" style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center pb-8 pt-24">
          <div className="mx-auto w-full max-w-7xl px-8">
            <h2 className="max-w-3xl text-5xl xl:text-6xl">{heading}</h2>
            <div className="mt-8">
              <StepLabels activeStep={activeStep} steps={steps} />
            </div>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-[32px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`photo-${active.number}`}
                    src={active.image}
                    alt="Наш екип на обект"
                    loading="lazy"
                    width={1024}
                    height={1280}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-[min(420px,44vh)] w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.number}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <span className="manifest-label">
                      Стъпка {active.number} / {String(steps.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-3xl lg:text-4xl">{active.title}</h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
                      {active.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {footnoteEl ? <div className="mt-8">{footnoteEl}</div> : null}
          </div>
        </div>

        {/* One full-viewport observer zone per step keeps each step stable under wheel/trackpad scrolling. */}
        {steps.map((step, index) => (
          <div
            key={`trigger-${step.number}`}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            data-step-index={index}
            style={{ top: `${index * 100}vh` }}
            className="pointer-events-none absolute inset-x-0 h-screen"
            aria-hidden="true"
          />
        ))}
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
