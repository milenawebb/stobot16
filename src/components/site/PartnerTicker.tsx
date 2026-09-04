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
    <div className="flex shrink-0 items-stretch" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner}
          className="flex h-14 shrink-0 items-center gap-3 border-r border-border px-6 font-mono text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
        >
          <span className="h-6 w-6 shrink-0 border border-line/40" aria-hidden="true" />
          {partner}
        </div>
      ))}
    </div>
  );
}

export function PartnerTicker() {
  return (
    <section aria-labelledby="partners-title" className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 lg:px-8">
        <span className="h-2 w-2 bg-primary" aria-hidden="true" />
        <h2 id="partners-title" className="manifest-label font-normal">
          Директни партньори в логистиката — 10 действащи договора
        </h2>
      </div>
      <div className="marquee-fade group overflow-hidden border-t border-border">
        <div className="marquee-track marquee-track-partners flex w-max group-hover:[animation-play-state:paused]">
          <PartnerSet />
          <PartnerSet hidden />
        </div>
      </div>
    </section>
  );
}
