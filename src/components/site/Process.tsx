import { useEffect, useRef, useState } from "react";
import { SectionHead } from "./SectionHead";

const steps = [
  {
    t: "Заявка и анализ",
    d: "Казвате ни колко хора, за какво и къде. Отговаряме до 24 часа с реалистичен план.",
  },
  {
    t: "Подбор и обучение",
    d: "Подбираме хора с нужните умения и ги подготвяме конкретно за вашата позиция, преди да излязат на смяна.",
  },
  {
    t: "Договори и осигуровки",
    d: "Наемаме хората при нас — с всички документи по закон. Вие не пипате нито един договор.",
  },
  {
    t: "Стартиране на обекта",
    d: "Екипът излиза на смяна с наш координатор на терен, който следи присъствие и качество от първия ден.",
  },
  {
    t: "Контрол и заместване",
    d: "При отсъствие изпращаме заместник до 24 часа. Смяната на обекта не спира.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  // Only one step is rendered at a time: on change we fade the current step
  // out, then swap content and fade the new one in — never two steps visible.
  const [displayed, setDisplayed] = useState(0);
  const [fadedIn, setFadedIn] = useState(true);

  useEffect(() => {
    if (active === displayed) return;
    setFadedIn(false);
    const swap = window.setTimeout(() => {
      setDisplayed(active);
      setFadedIn(true);
    }, 150);
    return () => window.clearTimeout(swap);
  }, [active, displayed]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kak-rabotim"
      className="relative border-y border-border bg-paper text-paper-foreground"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
          <SectionHead
            index="03"
            label="Маршрут на изпълнение"
            tone="paper"
            title="Как работим"
            lead="Placeholder текст: пет спирки от първия разговор до работещ екип на обекта."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            {/* Step indicator */}
            <div className="flex items-center gap-4 lg:flex-col lg:items-stretch">
              <p className="manifest-label text-paper-foreground/55">
                Стъпка {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <div className="flex flex-1 items-center gap-2 lg:mt-2 lg:flex-col lg:items-stretch">
                {steps.map((s, i) => (
                  <div
                    key={s.t}
                    aria-hidden="true"
                    className={`h-0.5 flex-1 transition-colors duration-300 lg:h-8 lg:w-0.5 lg:flex-none ${
                      i <= active ? "bg-primary" : "bg-paper-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step content — exactly one step rendered at a time */}
            <div className="relative min-h-56 sm:min-h-44">
              <div
                key={displayed}
                className={`transition-[opacity,transform] duration-200 ease-out ${
                  fadedIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 bg-primary" aria-hidden="true" />
                  <span className="h-px flex-1 bg-paper-foreground/25" aria-hidden="true" />
                  <span className="font-serif text-5xl leading-none text-primary">
                    {String(displayed + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl sm:text-3xl">{steps[displayed]!.t}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper-foreground/70 sm:text-base">
                  {steps[displayed]!.d}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
