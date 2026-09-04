import { SectionHead } from "./SectionHead";

const items = [
  {
    code: "S-01",
    t: "Предоставяне на персонал",
    d: "Placeholder: работници на наш трудов договор, работещи на вашия обект — по смени и график.",
  },
  {
    code: "S-02",
    t: "Администрация и осигуровки",
    d: "Placeholder: договори, ТРЗ, осигуровки, трудова медицина и инструктажи — изцяло наш ангажимент.",
  },
  {
    code: "S-03",
    t: "Гъвкав капацитет",
    d: "Placeholder: увеличавайте или намалявайте екипа според натоварването, без наемане и съкращения.",
  },
  {
    code: "S-04",
    t: "Предвидима цена",
    d: "Placeholder: ясна ставка на час или на човек за смяна — без скрити разходи.",
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
        lead="Placeholder текст: поемаме наемането, документите и заместванията, за да остане при вас само производството."
      />

      <div className="mt-14 border-t border-border">
        {items.map((i) => (
          <div
            key={i.t}
            className="group grid gap-3 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-[8rem_1fr_1.1fr] md:items-baseline md:gap-8"
          >
            <span className="manifest-label transition-colors group-hover:text-primary">
              {i.code}
            </span>
            <h3 className="text-2xl transition-transform duration-200 group-hover:translate-x-1 md:text-3xl">
              {i.t}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
