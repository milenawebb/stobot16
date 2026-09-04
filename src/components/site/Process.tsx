import { SectionHead } from "./SectionHead";

const steps = [
  { t: "Заявка и анализ", d: "Placeholder: уточняваме брой хора, график, умения и локация." },
  { t: "Подбор и обучение", d: "Placeholder: подбираме кадри и провеждаме инструктаж по позиция." },
  {
    t: "Договори и осигуровки",
    d: "Placeholder: наемаме хората при нас — договор, осигуровки, застраховка.",
  },
  { t: "Стартиране на обекта", d: "Placeholder: екипът излиза на смяна с координатор от наша страна." },
  { t: "Контрол и заместване", d: "Placeholder: следим присъствие и качество, заместваме при отсъствие." },
];

export function Process() {
  return (
    <section
      id="kak-rabotim"
      className="border-y border-border bg-paper text-paper-foreground"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead
          index="03"
          label="Маршрут на изпълнение"
          tone="paper"
          title="Как работим"
          lead="Placeholder текст: пет спирки от първия разговор до работещ екип на обекта."
        />

        <ol className="mt-14 grid gap-px bg-paper-foreground/15 md:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className="group relative bg-paper p-6 transition-colors hover:bg-paper-foreground hover:text-paper"
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 shrink-0 bg-primary" aria-hidden="true" />
                <span className="h-px flex-1 bg-paper-foreground/25 group-hover:bg-paper/30" aria-hidden="true" />
              </div>
              <p className="manifest-label mt-5 block group-hover:text-paper/70">
                Стъпка {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-foreground/70 group-hover:text-paper/80">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
