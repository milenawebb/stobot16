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
import { SpotlightCard } from "./kinetic";
import sectorsStrip from "@/assets/sectors-strip.jpg";
import { ParallaxImage } from "./motion-kit";

const sectors = [
  {
    icon: HardHat,
    t: "Строителство",
    d: "Общи работници, кофражисти, помощен персонал за обекти в цялата страна.",
  },
  {
    icon: Factory,
    t: "Производство",
    d: "Оператори на машини и поточни линии, с бърз старт на смяна.",
  },
  {
    icon: Warehouse,
    t: "Складове и логистика",
    d: "Комисиониране и товаро-разтоварна дейност — включително нощни смени.",
  },
  { icon: Boxes, t: "Опаковане", d: "Пакетиране, етикетиране и сортиране за пикови периоди." },
  {
    icon: UtensilsCrossed,
    t: "ХоРеКа",
    d: "Кухненски помощници, миячи и сервитьори при спешна нужда.",
  },
  { icon: Truck, t: "Транспорт", d: "Шофьори, куриери и помощници на курс, готови за старт." },
  {
    icon: Sparkles,
    t: "Почистване",
    d: "Индустриално и следремонтно почистване, по график или еднократно.",
  },
  {
    icon: Wrench,
    t: "Поддръжка",
    d: "Техници и помощен технически персонал за текуща поддръжка.",
  },
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
          lead="осигуряваме персонал за производствени, логистични и сервизни обекти в цялата страна."
        />

        <div className="mt-14 grid gap-px rounded-[32px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <SpotlightCard
              as="article"
              key={s.t}
              className="group rounded-[28px] bg-background p-6"
            >
              <span className="manifest-label absolute right-4 top-4 ">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-6 text-xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 h-48 w-[calc(100%-2.5rem)] max-w-7xl overflow-hidden rounded-[32px] lg:h-64">
        <ParallaxImage
          src={sectorsStrip}
          alt="Работници на смяна в складова база"
          width={1920}
          height={720}
          distance={35}
          direction="up"
          wrapperClassName="h-full w-full"
          className="h-[120%] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-background/70" />
      </div>
    </section>
  );
}
