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

import { RevealWords } from "./motion-kit";

function BrandSet({ brands, hidden = false }: { brands: string[]; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <span
          key={brand}
          className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-paper-foreground/20 px-5 py-3 font-display text-lg font-extrabold transition-colors hover:bg-paper-foreground hover:text-paper sm:px-7 sm:py-4 sm:text-2xl"
        >
          {brand}
        </span>
      ))}
    </div>
  );
}

export function Brands() {
  return (
    <section
      id="marki"
      aria-label="Марки, с които сме работили"
      className="overflow-hidden border-y border-border bg-paper py-20 text-paper-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <RevealWords
          text="Обекти, на които работят нашите екипи"
          className="max-w-4xl text-[2rem] sm:text-5xl lg:text-6xl"
        />
      </div>

      <div className="mt-14 border-y border-paper-foreground/15">
        {brandRows.map((brands, index) => (
          <div
            key={brands[0]}
            className={`marquee-fade group overflow-hidden py-4 ${
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
