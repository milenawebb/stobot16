import { ArrowRight, Package, Sofa, Building2, Clock } from "lucide-react";
import movingImg from "@/assets/moving.jpg";
import { Reveal } from "./Reveal";

const items = [
  { icon: Sofa, t: "Домашни премествания", d: "Placeholder: опаковане, пренос, монтаж." },
  { icon: Building2, t: "Офис премествания", d: "Placeholder: извън работно време, без престой." },
  { icon: Package, t: "Товаро-разтоварни дейности", d: "Placeholder: камиони, складове, доставки." },
  { icon: Clock, t: "Хамали на час", d: "Placeholder: екип от 2 до 10 души при нужда." },
];

export function Moving() {
  return (
    <section
      id="hamalski"
      className="relative overflow-hidden border-y border-border py-20 lg:py-28"
      style={{ background: "oklch(0.225 0.03 240)" }}
    >
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "oklch(0.78 0.13 195 / 0.14)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-move">
            Собствена услуга
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Хамалски услуги и{" "}
            <span className="bg-[image:var(--gradient-move)] bg-clip-text text-transparent">
              премествания
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Placeholder текст: отделна линия услуги със собствени екипи и транспорт — за фирми и за
            частни клиенти, в удобен за вас час.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((i, idx) => (
              <Reveal key={i.t} delay={idx * 90}>
                <div className="h-full rounded-2xl border border-move/25 bg-background/40 p-5 transition-colors hover:border-move/60">
                  <i.icon className="h-5 w-5 text-move" />
                  <p className="mt-3 font-display font-semibold">{i.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <a
            href="#zayavka"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-move)] px-6 py-3.5 text-sm font-bold text-move-foreground transition-transform hover:scale-[1.02]"
          >
            Оферта за преместване
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={150}>
          <img
            src={movingImg}
            alt="Хамали товарят мебели в камион"
            loading="lazy"
            width={1200}
            height={900}
            className="w-full rounded-3xl border border-move/25 object-cover shadow-[var(--shadow-soft)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
