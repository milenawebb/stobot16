import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { SectionHead } from "./SectionHead";

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
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    setActiveStep(stepIndex);
  });

  return (
    <section
      ref={containerRef}
      id="kak-rabotim"
      className="relative border-y border-border bg-paper text-paper-foreground"
      style={{ height: `${steps.length * 100}vh`, position: "relative" }}
    >
      <div
        className="flex px-5 lg:px-8"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="w-full max-w-7xl">
          <SectionHead
            index="03"
            label="Маршрут на изпълнение"
            tone="paper"
            title="Как работим"
            lead="Placeholder текст: пет спирки от първия разговор до работещ екип на обекта."
          />

          <div className="mx-auto mt-12 w-full max-w-[700px]" style={{ position: "relative" }}>
            <div className="mb-6 flex items-center gap-4">
              <p className="manifest-label whitespace-nowrap text-paper-foreground/60">
                Стъпка {String(activeStep + 1).padStart(2, "0")} /{" "}
                {String(steps.length).padStart(2, "0")}
              </p>
              <div className="flex flex-1 gap-2" aria-hidden="true">
                {steps.map((step, index) => (
                  <span
                    key={step.number}
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      index <= activeStep ? "bg-primary" : "bg-paper-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {steps.map((step, index) =>
              index === activeStep ? (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 bg-primary" aria-hidden="true" />
                    <span className="h-px flex-1 bg-paper-foreground/25" aria-hidden="true" />
                    <span className="font-serif text-5xl leading-none text-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-paper-foreground/80 sm:text-lg">
                    {step.body}
                  </p>
                </motion.div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}