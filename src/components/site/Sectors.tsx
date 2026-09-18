import {
  ArrowUpRight,
  Boxes,
  HardHat,
  Factory,
  Truck,
  Sparkles,
  Wrench,
  Warehouse,
} from "lucide-react";
import { SectionHead } from "./SectionHead";
import { SpotlightCard } from "./kinetic";
import sectorsStrip from "@/assets/sectors-strip.jpg";
import { ParallaxImage, Reveal } from "./motion-kit";
import { STAFFING_SECTORS } from "@/lib/sectors";

const sectorDetails = {
  Строителство: {
    icon: HardHat,
    d: "Общи работници, кофражисти, помощен персонал за обекти в цялата страна.",
  },
  Производство: {
    icon: Factory,
    d: "Оператори на машини и поточни линии, с бърз старт на смяна.",
  },
  "Складове и логистика": {
    icon: Warehouse,
    d: "Комисиониране и товаро-разтоварна дейност, включително нощни смени.",
  },
  Опаковане: { icon: Boxes, d: "Пакетиране, етикетиране и сортиране за пикови периоди." },
  Транспорт: { icon: Truck, d: "Шофьори, куриери и помощници на курс, готови за старт." },
  Почистване: {
    icon: Sparkles,
    d: "Индустриално и следремонтно почистване, по график или еднократно.",
  },
  Поддръжка: {
    icon: Wrench,
    d: "Техници и помощен технически персонал за текуща поддръжка.",
  },
} as const;

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
          {STAFFING_SECTORS.map((sector, i) => {
            const details = sectorDetails[sector];
            const Icon = details.icon;
            return (
            <Reveal key={sector} delay={(i % 4) * 0.07} x={i % 2 === 0 ? -18 : 18} className="h-full">
              <SpotlightCard as="article" className="group h-full bg-background p-6">
                <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 text-xl">{sector}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {details.d}
                </p>
              </SpotlightCard>
            </Reveal>
            );
          })}

          <Reveal delay={0.28} x={18} className="h-full">
            <a href="#zayavka" className="group block h-full">
              <SpotlightCard
                as="div"
                className="h-full bg-background p-6 ring-1 ring-inset ring-primary/15"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-primary/[0.05]"
                />
                <Plus className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-90" />
                <h3 className="mt-6 text-xl">Друг сектор?</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Свържете се с нас — вероятно имаме решение и извън изброените сектори.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary">
                  Заявка за персонал
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </SpotlightCard>
            </a>
          </Reveal>
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
