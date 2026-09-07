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
          className="flex h-24 w-44 shrink-0 items-center justify-center border-r border-paper-foreground/15 px-6 transition-colors hover:bg-paper-foreground hover:text-paper sm:h-28 sm:w-56"
        >
          <span className="font-display text-xl font-extrabold whitespace-nowrap sm:text-2xl">
            {brand}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Brands() {
  return (
    <section
      id="marki"
      aria-labelledby="brands-title"
      className="overflow-hidden border-y border-border bg-paper py-20 text-paper-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="manifest-label text-paper-foreground/55">05</span>
          <span className="h-px w-8 bg-paper-foreground/20" aria-hidden="true" />
          <span className="manifest-label text-paper-foreground/55">Крайни обекти</span>
        </div>
        <RevealWords
          text="Доверие от екипи по проекти за водещи марки"
          className="mt-5 max-w-4xl text-[2rem] sm:text-5xl lg:text-6xl"
        />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper-foreground/70">
          Хората ни работят на терен за разпознаваеми марки — не по документи, а на място, всеки
          ден.
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
