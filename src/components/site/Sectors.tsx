import {
  Boxes,
  HardHat,
  Factory,
  UtensilsCrossed,
  Truck,
  Sparkles,
  Wrench,
  Warehouse,
} from "lucide-react";
import { Reveal } from "./Reveal";

const sectors = [
  { icon: HardHat, t: "Строителство", d: "Общи работници, кофражисти, помощен персонал." },
  { icon: Factory, t: "Производство", d: "Оператори на машини, поточни линии, контрол." },
  { icon: Warehouse, t: "Складове и логистика", d: "Комисиониране, товаро-разтоварна дейност." },
  { icon: Boxes, t: "Опаковане", d: "Пакетиране, етикетиране, сортиране." },
  { icon: UtensilsCrossed, t: "ХоРеКа", d: "Кухненски помощници, миячи, сервитьори." },
  { icon: Truck, t: "Транспорт", d: "Шофьори, куриери, помощници на курс." },
  { icon: Sparkles, t: "Почистване", d: "Индустриално и следремонтно почистване." },
  { icon: Wrench, t: "Поддръжка", d: "Техници и помощен технически персонал." },
];

export function Sectors() {
  return (
    <section id="sektori" className="relative overflow-hidden py-20 lg:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Сектори</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Кадри за вашия бранш</h2>
          <p className="mt-4 text-muted-foreground">
            Placeholder текст: осигуряваме персонал за производствени, логистични и сервизни обекти
            в цялата страна.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <article className="surface-card group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary transition-colors group-hover:bg-primary">
                  <s.icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
