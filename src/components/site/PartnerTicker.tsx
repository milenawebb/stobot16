const partners = [
  "Quehenberger Logistic",
  "Orbit Logistic",
  "Sameday",
  "Emag",
  "Unimaster Logistic",
  "Cargo-partner Logistic",
  "Sila BG",
  "Sirius 2005",
  "Zora",
  "Bold Foods",
];

function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-3 pr-3" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner}
          className="glass-panel flex shrink-0 items-center rounded-lg px-5 py-3 text-sm font-semibold tracking-tight whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(201,160,92,0.35)] sm:text-base"
          style={{ color: "#FFFFFF" }}
        >
          {partner}
        </div>
      ))}
    </div>
  );
}

export function PartnerTicker() {
  return (
    <section
      id="partnyori"
      aria-labelledby="partners-title"
      className="border-b border-border"
      style={{ background: "#130F3E" }}
    >
      <div className="mx-auto max-w-7xl px-5 pt-10 pb-6 lg:px-8">
        <h2
          id="partners-title"
          className="max-w-3xl text-xl leading-snug font-bold sm:text-2xl"
          style={{ color: "#FFFFFF" }}
        >
          10 логистични партньора, 95 обекта всеки месец
        </h2>
      </div>
      <div className="marquee-fade group overflow-hidden pb-10">
        <div className="marquee-track marquee-track-partners flex w-max px-5 group-hover:[animation-play-state:paused] lg:px-8">
          <PartnerSet />
          <PartnerSet hidden />
        </div>
      </div>
    </section>
  );
}
