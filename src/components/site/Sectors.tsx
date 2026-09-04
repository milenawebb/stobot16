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
import { SectionHead } from "./SectionHead";

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
        <SectionHead
          index="04"
          label="Сектори на разпределение"
          title="Кадри за вашия бранш"
          lead="Placeholder текст: осигуряваме персонал за производствени, логистични и сервизни обекти в цялата страна."
        />

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <article
              key={s.t}
              className="group relative bg-background p-6 transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <span className="manifest-label absolute right-4 top-4 group-hover:text-primary-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
              <h3 className="mt-6 text-xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/85">
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
