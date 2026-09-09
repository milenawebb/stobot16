import movingImg from "@/assets/moving.jpg";
import { ParallaxImage } from "./motion-kit";

const items = [
  {
    t: "Домашни премествания",
    d: "Опаковаме, пренасяме и монтираме мебелите ви. Услугата може да приключи в рамките на ден.",
  },
  {
    t: "Офис премествания",
    d: "Работим извън работно време, за да не спираме бизнеса ви нито за час.",
  },
  {
    t: "Товаро-разтоварни дейности",
    d: "Осигуряваме камиони и хора за товари от една палета до цял склад.",
  },
  {
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
            <span className="manifest-label text-move-foreground/70">Собствена услуга</span>
          </div>
          <h2 className="mt-5 max-w-xl text-[2rem] text-move-foreground sm:text-5xl lg:text-6xl">
            Премествания с наши хора и камиони
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-move-foreground/80">
            Отделен екип и отделни камиони, с хора, които всеки ден носят мебели по тесни стълбища.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[32px] bg-move-foreground/20 sm:grid-cols-2">
            {items.map((i) => (
              <div
                key={i.t}
                className="group p-5 transition-colors hover:bg-move-foreground hover:text-move"
                style={{ background: "#17171B" }}
              >
                <p className="font-display text-lg font-bold">{i.t}</p>
                <p className="mt-1 text-sm text-move-foreground/75 group-hover:text-move/80">
                  {i.d}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#zayavka"
            className="mt-10 inline-block rounded-full bg-move-foreground px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-move transition-colors hover:bg-white/80"
          >
            Оферта за преместване
          </a>
        </div>

        <ParallaxImage
          src={movingImg}
          alt="Хамали товарят мебели в камион"
          width={1200}
          height={900}
          distance={30}
          wrapperClassName="h-full w-full overflow-hidden rounded-[32px] border border-move-foreground/25"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
