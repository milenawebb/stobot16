import { useReveal } from "@/lib/use-reveal";
import { Reveal } from "./Reveal";

const steps = [
  { t: "Заявка и анализ", d: "Placeholder: уточняваме брой хора, график, умения и локация." },
  { t: "Подбор и обучение", d: "Placeholder: подбираме кадри и провеждаме инструктаж по позиция." },
  { t: "Договори и осигуровки", d: "Placeholder: наемаме хората при нас — договор, осигуровки, застраховка." },
  { t: "Стартиране на обекта", d: "Placeholder: екипът излиза на смяна с координатор от наша страна." },
  { t: "Контрол и заместване", d: "Placeholder: следим присъствие и качество, заместваме при отсъствие." },
];

export function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="kak-rabotim" className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Процес</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Как работим</h2>
        <p className="mt-4 text-muted-foreground">
          Placeholder текст: пет стъпки от първия разговор до работещ екип на обекта.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-14 pl-8 lg:pl-0">
        <div className="absolute left-[11px] top-0 h-full w-px bg-border lg:left-1/2" />
        <div
          className="absolute left-[11px] top-0 w-px bg-[image:var(--gradient-accent)] transition-[height] duration-[2200ms] ease-out lg:left-1/2"
          style={{ height: visible ? "100%" : "0%" }}
        />

        <ol className="space-y-10">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.t}
              delay={i * 120}
              className="relative lg:grid lg:grid-cols-2 lg:gap-12"
            >
              <span className="absolute -left-8 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-primary bg-background text-[11px] font-bold text-primary lg:left-1/2 lg:-translate-x-1/2">
                {i + 1}
              </span>
              <div
                className={
                  i % 2 === 0
                    ? "surface-card p-6 lg:col-start-1 lg:mr-10 lg:text-right"
                    : "surface-card p-6 lg:col-start-2 lg:ml-10"
                }
              >
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
