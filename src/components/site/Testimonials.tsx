import { SectionHead } from "./SectionHead";
import { Reveal } from "./motion-kit";

const items = [
  // PLACEHOLDER — replace with real client quote before launch
  {
    code: "T-01",
    quote:
      "В рамките на два дни получихме екип за нощна смяна и покрихме пиковия сезон без забавяне на пратките.",
    name: "Оперативен директор",
    company: "Логистичен партньор, София",
  },
  // PLACEHOLDER — replace with real client quote before launch
  {
    code: "T-02",
    quote:
      "Хората идват подготвени и с редовни документи. Отчитането на часовете е прозрачно и не отнема време на нашия екип.",
    name: "Ръководител склад",
    company: "Дистрибуция, Пловдив",
  },
  // PLACEHOLDER — replace with real client quote before launch
  {
    code: "T-03",
    quote:
      "Екипите идват подготвени и документите са изрядни. Това е основната причина да продължаваме договора трета година.",
    name: "Мениджър производство",
    company: "Производствена база, Варна",
  },
];

export function Testimonials() {
  return (
    <section id="otzivi" className="relative overflow-hidden border-b border-border bg-paper py-20 text-paper-foreground lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          index="09"
          title="Отзиви"
          tone="paper"
        />
        <div className="mt-14 grid gap-px rounded-[32px] bg-paper-foreground/15 lg:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.code} delay={idx * 0.12} x={idx === 0 ? -12 : idx === 2 ? 12 : 0} className="h-full">
            <figure
              className="flex h-full flex-col justify-between rounded-[28px] bg-paper p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-paper-foreground/5 lg:p-8"
            >
              <div>
                <blockquote className="text-lg leading-snug">{i.quote}</blockquote>
              </div>
              <figcaption className="mt-8 border-t border-paper-foreground/20 pt-4">
                 <p className="font-display text-lg font-extrabold leading-tight">{i.name}</p>
                <p className="mt-1 text-sm text-paper-foreground/65">{i.company}</p>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
