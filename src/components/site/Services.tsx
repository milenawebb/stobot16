import { Users, ClipboardCheck, Repeat2, Calculator } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Users,
    t: "Предоставяне на персонал",
    d: "Placeholder: работници на наш трудов договор, работещи на вашия обект — по смени и график.",
  },
  {
    icon: ClipboardCheck,
    t: "Администрация и осигуровки",
    d: "Placeholder: договори, ТРЗ, осигуровки, трудова медицина и инструктажи — изцяло наш ангажимент.",
  },
  {
    icon: Repeat2,
    t: "Гъвкав капацитет",
    d: "Placeholder: увеличавайте или намалявайте екипа според натоварването, без наемане и съкращения.",
  },
  {
    icon: Calculator,
    t: "Предвидима цена",
    d: "Placeholder: ясна ставка на час или на човек за смяна — без скрити разходи.",
  },
];

export function Services() {
  return (
    <section id="uslugi" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Услуги</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Вие давате обекта. Ние даваме хората.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Placeholder текст: поемаме наемането, документите и заместванията, за да остане при вас
            само производството.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 90}>
              <div className="surface-card h-full p-6 transition-colors hover:border-primary/40">
                <i.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{i.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
