import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Начало" },
  { id: "partnyori", label: "Партньори" },
  { id: "uslugi", label: "Услуги" },
  { id: "kak-rabotim", label: "Как работим" },
  { id: "sektori", label: "Сектори" },
  { id: "marki", label: "Марки" },
  { id: "hamalski", label: "Хамалски услуги" },
  { id: "obiavi", label: "Обяви" },
  { id: "otzivi", label: "Отзиви" },
  { id: "kontakti", label: "Контакти" },
];

export function SectionDots() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const mark = window.innerHeight * 0.35;
      let current = sections[0]!.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mark) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Навигация по секции"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
            onClick={() =>
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="group relative flex h-3 w-3 items-center justify-center"
          >
            <span
              className={`block rounded-full border border-white transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 scale-100 bg-white opacity-100"
                  : "h-2 w-2 bg-transparent opacity-40 group-hover:opacity-90"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#130F3E] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
