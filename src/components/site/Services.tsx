import { SectionHead } from "./SectionHead";
import { SpotlightCard } from "./kinetic";
import { Reveal } from "./motion-kit";

const items = [
  {
    t: "Предоставяне на персонал",
    d: "Работници на наш трудов договор, на смяна на вашия обект. Вие определяте броя хора и периода.",
  },
  {
    t: "Договори и осигуровки",
    d: "Трудов договор, осигуровки, трудова медицина и инструктажи. Цялата документация е наша грижа.",
  },
  {
    t: "Гъвкав брой хора",
    d: "При пиков сезон или временен проект добавяме или сваляме хора, без вие да наемате и съкращавате.",
  },
  {
    t: "Ясна цена, без изненади",
    d: "Една ставка на час или на смяна, без скрити такси в края на месеца.",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHead
        index="02"
        label="Услуги"
        title="Какво поемаме вместо вас"
        lead="Поемаме наемането, документите и заместванията."
      />

      <div className="mt-14 border-t border-border">
        {items.map((i) => (
          <SpotlightCard
            key={i.t}
            className="group grid gap-3 rounded-[28px] border-b border-border px-4 py-8 md:grid-cols-[1fr_1.1fr] md:items-baseline md:gap-8"
          >
            <h3 className="text-2xl transition-transform duration-200 group-hover:translate-x-1 md:text-3xl">
              {i.t}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{i.d}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
