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
import { ParallaxImage, Reveal } from "./motion-kit";

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
    d: "Комисиониране и товаро-разтоварна дейност, включително нощни смени.",
  },
  { icon: Boxes, t: "Опаковане", d: "Пакетиране, етикетиране и сортиране за пикови периоди." },
  {
    icon: UtensilsCrossed,
    t: "HoReCa",
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
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          index="04"
          label="Сектори на разпределение"
          title="Кадри за вашия бранш"
          lead="Осигуряваме персонал за производствени, логистични и сервизни обекти в цялата страна."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[32px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 0.07} x={i % 2 === 0 ? -18 : 18}>
              <SpotlightCard as="article" className="group h-full bg-background p-6">
                <s.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </SpotlightCard>
            </Reveal>
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
        <div className="pointer-events-none absolute inset-0 bg-background/20" />
      </div>
    </section>
  );
}
