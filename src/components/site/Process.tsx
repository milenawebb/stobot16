import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
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

const INDIGO = "#130F3E";
const WHITE = "#FFFFFF";

export function Process() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    setActiveStep(stepIndex);
  });

  const active = steps[activeStep] ?? steps[0]!;

  return (
    <section
      ref={containerRef}
      id="kak-rabotim"
      style={{ height: `${steps.length * 100}vh`, position: "relative", background: INDIGO }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "32px" : "80px",
          padding: isMobile ? "0 16px" : "0 20px",
          overflow: "hidden",
          boxSizing: "border-box",
          maxWidth: "100%",
        }}
      >
        {/* Vertical (or horizontal on mobile) circle stepper */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {steps.map((step, index) => {
            const isActive = index <= activeStep;
            const baseColor = index % 2 === 0 ? WHITE : INDIGO;
            return (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  alignItems: "center",
                  flex: isMobile && index < steps.length - 1 ? "1 1 0" : "0 0 auto",
                  minWidth: 0,
                }}
              >
                <motion.div
                  animate={{
                    scale: index === activeStep ? 1.15 : 1,
                    backgroundColor: isActive ? baseColor : "rgba(0,0,0,0)",
                    borderColor: WHITE,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: isMobile ? 40 : 56,
                    height: isMobile ? 40 : 56,
                    flexShrink: 0,
                    borderRadius: "50%",
                    border: `2px solid ${WHITE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: isMobile ? 14 : 16,
                    color: isActive ? (baseColor === WHITE ? INDIGO : WHITE) : WHITE,
                  }}
                >
                  {step.number}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      width: isMobile ? "auto" : 2,
                      flex: isMobile ? "1 1 0" : "0 0 auto",
                      minWidth: isMobile ? 8 : undefined,
                      height: isMobile ? 2 : 60,
                      background: "rgba(255,255,255,0.25)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      animate={
                        isMobile
                          ? { width: index < activeStep ? "100%" : "0%" }
                          : { height: index < activeStep ? "100%" : "0%" }
                      }
                      transition={{ duration: 0.3 }}
                      style={{
                        width: isMobile ? undefined : "100%",
                        height: isMobile ? "100%" : undefined,
                        background: WHITE,
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting photography, changing per step */}
        {!isMobile && (
          <motion.img
            key={`photo-${active.number}`}
            src={activeStep % 2 === 0 ? coordinatorPhoto : crewPhoto}
            alt="Наш екип на обект"
            loading="lazy"
            width={1024}
            height={1280}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: 340,
              height: 420,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        )}

        {/* Active step text content */}
        <div style={{ maxWidth: 480 }}>
          <motion.div
            key={active.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ color: WHITE, opacity: 0.5, fontSize: 14, marginBottom: 12 }}>
              Стъпка {active.number} / {String(steps.length).padStart(2, "0")}
            </div>
            <h3 style={{ color: WHITE, fontSize: isMobile ? 26 : 32, fontWeight: 700 }}>
              {active.title}
            </h3>
            <p style={{ color: WHITE, opacity: 0.8, fontSize: isMobile ? 16 : 18, marginTop: 12 }}>
              {active.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
