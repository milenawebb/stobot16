import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import coordinatorPhoto from "@/assets/process-coordinator.jpg";
import crewPhoto from "@/assets/process-crew.jpg";

const steps = [
  {
    number: "01",
    title: "Заявка и анализ",
    body: "Казвате ни колко хора, за какво и къде. Отговаряме до 24 часа с реалистичен план.",
  },
  {
    number: "02",
    title: "Подбор и обучение",
    body: "Подбираме хора с нужните умения и ги подготвяме конкретно за вашата позиция, преди да излязат на смяна.",
  },
  {
    number: "03",
    title: "Договори и осигуровки",
    body: "Наемаме хората при нас — с всички документи по закон. Вие не пипате нито един договор.",
  },
  {
    number: "04",
    title: "Стартиране на обекта",
    body: "Екипът излиза на смяна с наш координатор на терен, който следи присъствие и качество от първия ден.",
  },
  {
    number: "05",
    title: "Контрол и заместване",
    body: "При отсъствие изпращаме заместник до 24 часа. Смяната на обекта не спира.",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep]!;

  const go = (dir: -1 | 1) =>
    setActiveStep((s) => Math.min(steps.length - 1, Math.max(0, s + dir)));

  return (
    <section id="kak-rabotim" className="border-b border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="manifest-label">Как работим</span>
        </div>
        <h2 className="mt-5 max-w-2xl text-[2rem] sm:text-5xl lg:text-6xl">
          Пет стъпки от заявка до работещ екип.
        </h2>

        {/* Clickable circle stepper */}
        <div className="mt-12 flex w-full max-w-full items-center">
          {steps.map((step, index) => {
            const isDone = index <= activeStep;
            const isActive = index === activeStep;
            return (
              <div
                key={step.number}
                className={`flex min-w-0 items-center ${
                  index < steps.length - 1 ? "flex-1" : "flex-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-label={`Стъпка ${step.number}: ${step.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary font-display text-sm font-bold transition-all duration-300 sm:h-14 sm:w-14 sm:text-base ${
                    isDone ? "bg-primary text-primary-foreground" : "bg-transparent text-primary"
                  } ${isActive ? "scale-110" : "hover:scale-105"}`}
                >
                  {step.number}
                </button>
                {index < steps.length - 1 && (
                  <div className="relative mx-1 h-0.5 flex-1 overflow-hidden bg-primary/25 sm:mx-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary"
                      animate={{ width: index < activeStep ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden overflow-hidden rounded-[32px] lg:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={`photo-${active.number}`}
                src={activeStep % 2 === 0 ? coordinatorPhoto : crewPhoto}
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
                transition={{ duration: 0.25 }}
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

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={activeStep === 0}
                aria-label="Предишна стъпка"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={activeStep === steps.length - 1}
                aria-label="Следваща стъпка"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
