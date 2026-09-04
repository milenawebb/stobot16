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
    <div className="flex shrink-0 items-stretch" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div
          key={brand}
          className="flex h-32 w-52 shrink-0 flex-col justify-between border-r border-paper-foreground/15 px-6 py-5 transition-colors hover:bg-paper-foreground hover:text-paper sm:h-36 sm:w-60"
        >
          <span className="h-8 w-8 border border-current opacity-30" aria-hidden="true" />
          <span className="font-display text-xl font-extrabold sm:text-2xl">{brand}</span>
        </div>
      ))}
    </div>
  );
}

export function Brands() {
  return (
    <section
      aria-labelledby="brands-title"
      className="overflow-hidden border-y border-border bg-paper py-20 text-paper-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="manifest-label">05</span>
          <span className="h-px w-8 bg-paper-foreground/20" aria-hidden="true" />
          <span className="manifest-label">Крайни обекти</span>
        </div>
        <h2 id="brands-title" className="mt-5 max-w-4xl text-[2rem] sm:text-5xl lg:text-6xl">
          Доверие от екипи по проекти за водещи марки
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper-foreground/70">
          Наши служители са работили в складове, обекти и проекти на разпознаваеми международни и
          български марки чрез логистичните ни партньори.
        </p>
      </div>

      <div className="mt-14 border-y border-paper-foreground/15">
        {brandRows.map((brands, index) => (
          <div
            key={brands[0]}
            className={`marquee-fade group overflow-hidden ${
              index === 1 ? "border-t border-paper-foreground/15" : ""
            }`}
          >
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
