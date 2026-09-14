import cargoPartnerAsset from "@/assets/partners/cargo-partner.svg.asset.json";
import emagAsset from "@/assets/partners/emag.svg.asset.json";
import orbitAsset from "@/assets/partners/orbit.png.asset.json";
import quehenbergerAsset from "@/assets/partners/quehenberger.svg.asset.json";
import samedayAsset from "@/assets/partners/sameday-clean.jpg.asset.json";
import silaBgAsset from "@/assets/partners/sila-bg.png.asset.json";
import unimastersAsset from "@/assets/partners/unimasters.svg.asset.json";

type Partner = {
  name: string;
  logo?: string;
  darkLogoSurface?: boolean;
  imageClassName?: string;
};

const partners: Partner[] = [
  {
    name: "Quehenberger Logistic",
    logo: quehenbergerAsset.url,
    imageClassName: "w-44 sm:w-48",
  },
  {
    name: "Orbit Logistic",
    logo: orbitAsset.url,
    imageClassName: "w-36 sm:w-40",
  },
  { name: "Sameday", logo: samedayAsset.url, imageClassName: "h-auto w-40 sm:w-44" },
  { name: "Emag", logo: emagAsset.url, imageClassName: "w-32 sm:w-36" },
  {
    name: "Unimaster Logistic",
    logo: unimastersAsset.url,
    imageClassName: "w-40 sm:w-44",
  },
  {
    name: "Cargo-partner Logistic",
    logo: cargoPartnerAsset.url,
    darkLogoSurface: true,
    imageClassName: "w-10 sm:w-11",
  },
  {
    name: "Sila BG",
    logo: silaBgAsset.url,
    darkLogoSurface: true,
    imageClassName: "w-10 sm:w-11",
  },
  { name: "Sirius 2005" },
  { name: "Zora" },
  { name: "Bold Foods" },
];

function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-3 pr-3" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="glass-panel flex h-16 min-w-28 max-w-full shrink-0 items-center justify-center rounded-lg p-1.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(201,160,92,0.35)] sm:h-[4.5rem] sm:p-2 sm:text-base"
          style={{ color: "#FFFFFF" }}
        >
          {partner.logo ? (
            <span
              className={`flex h-[52px] max-w-full items-center justify-center overflow-hidden rounded-[6px] px-1.5 sm:h-14 sm:px-2 ${partner.darkLogoSurface ? "bg-background" : "bg-paper"}`}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} лого`}
                className={`block max-h-10 max-w-full object-contain sm:max-h-10 ${partner.imageClassName ?? "w-40"}`}
                loading="eager"
                decoding="async"
              />
            </span>
          ) : (
            <span className="px-2">{partner.name}</span>
          )}
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
