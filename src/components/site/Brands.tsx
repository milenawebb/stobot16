import { Reveal } from "./Reveal";

const brandRows = [
  [
    "Nike",
    "Nivea",
    "LPP",
    "Cropp Town",
    "House",
    "Reserved",
    "Sinsay",
    "Ikea",
    "A1",
    "Yettel",
    "Huawei",
    "Gardenia",
    "Praktiker",
    "Zara",
  ],
  [
    "Würth",
    "Temu",
    "Shein",
    "Trendyol",
    "Diana",
    "New Yorker",
    "Primeks",
    "Adidas",
    "Reebok",
    "Under Armour",
    "Ken",
    "Bojenci",
    "Borchvor",
  ],
];

function BrandSet({ brands, hidden = false }: { brands: string[]; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-4 pr-4" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div
          key={brand}
          className="flex h-28 w-48 shrink-0 flex-col justify-between rounded-lg border border-border bg-brand-card p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/40 hover:bg-surface-2 sm:h-32 sm:w-56"
        >
          <span className="h-9 w-9 rounded-md border border-dashed border-border bg-surface" aria-hidden="true" />
          <span className="font-display text-lg font-bold text-foreground sm:text-xl">{brand}</span>
        </div>
      ))}
    </div>
  );
}

export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="overflow-hidden bg-brand-band py-20 lg:py-28">
      <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
        <h2 id="brands-title" className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          Доверие от екипи по проекти за водещи марки
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Наши служители са работили в складове, обекти и проекти на разпознаваеми международни и
          български марки чрез логистичните ни партньори.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {brandRows.map((brands, index) => (
          <div key={brands[0]} className="marquee-fade group overflow-hidden">
            <div
              className={`marquee-track flex w-max group-hover:[animation-play-state:paused] ${
                index === 0 ? "marquee-track-brands" : "marquee-track-brands-reverse"
              }`}
            >
              <BrandSet brands={brands} />
              <BrandSet brands={brands} hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}