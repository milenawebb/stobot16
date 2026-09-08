import { SectionHead } from "./SectionHead";
import { SpotlightCard } from "./kinetic";

const items = [
  {
    code: "S-01",
    t: "Предоставяне на персонал",
    d: "Работници на наш трудов договор, на смяна на вашия обект — толкова хора, колкото ви трябват, толкова дълго, колкото ви трябват.",
  },
  {
    code: "S-02",
    t: "Договори и осигуровки",
    d: "Трудов договор, осигуровки, трудова медицина, инструктажи — цялата документация е наша грижа, не ваша.",
  },
  {
    code: "S-03",
    t: "Увеличавате и намалявате за дни, не за месеци",
    d: "Пиков сезон или временен проект — добавяме или сваляме хора без наемане и без съкращения от ваша страна.",
  },
  {
    code: "S-04",
    t: "Ясна цена, без изненади",
    d: "Една ставка на час или на смяна. Никакви скрити такси в края на месеца.",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHead
        index="02"
        label="Услуги"
        title={
          <>
            Вие давате обекта.
            <br />
            Ние даваме хората.
          </>
        }
        lead="Поемаме наемането, документите и заместванията. При вас остава само работата."
      />

      <div className="mt-14 border-t border-border">
        {items.map((i) => (
          <SpotlightCard
            key={i.t}
            className="group grid gap-3 rounded-[28px] border-b border-border px-4 py-8 md:grid-cols-[8rem_1fr_1.1fr] md:items-baseline md:gap-8"
          >
            <span className="manifest-label transition-colors group-hover:text-primary">
              {i.code}
            </span>
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
