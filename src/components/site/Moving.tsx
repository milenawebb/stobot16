import movingImg from "@/assets/moving.jpg";

const items = [
  {
    code: "M-01",
    t: "Домашни премествания",
    d: "Опаковаме, пренасяме и монтираме мебелите ви — готово за един ден.",
  },
  {
    code: "M-02",
    t: "Офис премествания",
    d: "Работим извън работно време, за да не спираме бизнеса ви нито за час.",
  },
  {
    code: "M-03",
    t: "Товаро-разтоварни дейности",
    d: "Камиони и хора при нужда — от една палета до цял склад.",
  },
  {
    code: "M-04",
    t: "Хамали на час",
    d: "От 2 до 10 души, точно когато са ви нужни, без ангажимент за цял ден.",
  },
];

export function Moving() {
  return (
    <section
      id="hamalski"
      className="relative overflow-hidden border-b border-border"
      style={{ background: "#17171B" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <div className="flex items-center gap-3">
            <span className="manifest-label text-move-foreground/70">06</span>
            <span className="h-px w-8 bg-move-foreground/30" aria-hidden="true" />
            <span className="manifest-label text-move-foreground/70">Собствена услуга</span>
          </div>
          <h2 className="mt-5 max-w-xl text-[2rem] text-move-foreground sm:text-5xl lg:text-6xl">
            Хамалски услуги и премествания
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-move-foreground/80">
            Placeholder текст: отделна линия услуги със собствени екипи и транспорт — за фирми и за
            частни клиенти, в удобен за вас час.
          </p>

          <div className="mt-10 grid gap-px bg-move-foreground/20 sm:grid-cols-2">
            {items.map((i) => (
              <div
                key={i.t}
                className="group p-5 transition-colors hover:bg-move-foreground hover:text-move"
                style={{ background: "#17171B" }}
              >
                <span className="manifest-label group-hover:text-move/70">{i.code}</span>
                <p className="mt-3 font-display text-lg font-bold">{i.t}</p>
                <p className="mt-1 text-sm text-move-foreground/75 group-hover:text-move/80">
                  {i.d}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#zayavka"
            className="mt-10 inline-block bg-move-foreground px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-move transition-colors hover:bg-white/80"
          >
            Оферта за преместване
          </a>
        </div>

        <img
          src={movingImg}
          alt="Хамали товарят мебели в камион"
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full border border-move-foreground/25 object-cover"
        />
      </div>
    </section>
  );
}
