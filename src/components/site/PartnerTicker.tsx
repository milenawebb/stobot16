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
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner}
          className="flex h-14 shrink-0 items-center gap-3 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-muted-foreground shadow-[var(--shadow-soft)]"
        >
          <span className="h-7 w-7 shrink-0 rounded border border-dashed border-border bg-surface-2" aria-hidden="true" />
          {partner}
        </div>
      ))}
    </div>
  );
}

export function PartnerTicker() {
  return (
    <section aria-labelledby="partners-title" className="border-y border-border bg-background py-7">
      <h2
        id="partners-title"
        className="mb-4 text-center text-xs font-semibold uppercase text-muted-foreground"
      >
        Директни партньори в логистиката
      </h2>
      <div className="marquee-fade group overflow-hidden">
        <div className="marquee-track marquee-track-partners flex w-max group-hover:[animation-play-state:paused]">
          <PartnerSet />
          <PartnerSet hidden />
        </div>
      </div>
    </section>
  );
}