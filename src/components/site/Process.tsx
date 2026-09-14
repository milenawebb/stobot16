import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import coordinatorPhoto from "@/assets/process-coordinator.jpg";
import crewPhoto from "@/assets/process-crew.jpg";
import trainingPhoto from "@/assets/process-training.jpg";
import contractsPhoto from "@/assets/process-contracts.jpg";
import supervisionPhoto from "@/assets/process-supervision.jpg";

const steps = [
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

const triggerPositions = ["top-0", "top-[100vh]", "top-[200vh]", "top-[300vh]", "top-[400vh]"];

function StepLabels({ activeStep }: { activeStep: number }) {
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

export function Process() {
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

  return (
    <section id="kak-rabotim" className="border-b border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="max-w-2xl text-[2rem] sm:text-5xl lg:text-6xl">
          От заявка до работещ екип
        </h2>
      </div>

      {/* Desktop: sticky pinned panel + 5 IntersectionObserver trigger markers */}
      <div className="relative mt-12 hidden h-[500vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <StepLabels activeStep={activeStep} />

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
                    className="h-[420px] w-full object-cover"
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
          </div>
        </div>

        {/* Five full-viewport observer zones make each step stable under wheel/trackpad scrolling. */}
        {steps.map((step, index) => (
          <div
            key={`trigger-${step.number}`}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            data-step-index={index}
            className={`pointer-events-none absolute inset-x-0 h-screen ${triggerPositions[index]}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Mobile: stacked steps, no pinning */}
      <div className="mx-auto mt-12 max-w-7xl px-5 lg:hidden">
        <ol className="space-y-10">
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
      </div>
    </section>
  );
}
