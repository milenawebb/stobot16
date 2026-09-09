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
          className="flex shrink-0 items-center rounded-lg border px-5 py-3 text-sm font-semibold tracking-tight whitespace-nowrap transition-colors sm:text-base"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "#FFFFFF",
          }}
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
        <span
          className="inline-block rounded border px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.18em] uppercase"
          style={{
            borderColor: "rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Партньори
        </span>
        <h2
          id="partners-title"
          className="mt-4 max-w-3xl text-xl leading-snug font-bold sm:text-2xl"
          style={{ color: "#FFFFFF" }}
        >
          Логистични партньори, за които работят нашите екипи
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
