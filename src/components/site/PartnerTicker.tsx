import cargoPartnerLogo from "@/assets/partners/cargo-partner-light.svg";
import boltFoodLogo from "@/assets/partners/bolt-food-white.svg";
import emagLogo from "@/assets/partners/emag.svg";
import orbitLogo from "@/assets/partners/orbit-full.jpg";
import quehenbergerLogo from "@/assets/partners/quehenberger.svg";
import samedayLogo from "@/assets/partners/sameday-horizontal.png";
import siriusLogo from "@/assets/partners/sirius-2005.png";
import silaBgLogo from "@/assets/partners/sila-bg-clear.png";
import unimastersLogo from "@/assets/partners/unimasters.svg";
import zoraLogo from "@/assets/partners/zora.webp";

type Partner = {
  name: string;
  logo?: string;
  imageClassName?: string;
  badgeClassName?: string;
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
    imageClassName: "w-44 sm:w-48",
  },
  { name: "Sameday", logo: samedayAsset.url, imageClassName: "w-48 sm:w-56" },
  { name: "Emag", logo: emagAsset.url, imageClassName: "w-32 sm:w-36" },
  {
    name: "Unimaster Logistic",
    logo: unimastersAsset.url,
    imageClassName: "w-40 sm:w-44",
  },
  {
    name: "Cargo-partner Logistic",
    logo: cargoPartnerAsset.url,
    imageClassName: "w-24 sm:w-28",
  },
  {
    name: "Sila BG",
    logo: silaBgAsset.url,
    imageClassName: "w-12 sm:w-14",
  },
  { name: "Sirius 2005", logo: siriusAsset.url, imageClassName: "w-44 sm:w-48" },
  { name: "Zora", logo: zoraAsset.url, imageClassName: "w-40 sm:w-44" },
  {
    name: "Bolt Food",
    logo: boltFoodAsset.url,
    imageClassName: "w-36 sm:w-40",
    badgeClassName: "bg-bolt",
  },
];

function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-3 pr-3" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner.name}
          className={`${partner.logo ? `border border-border/50 ${partner.badgeClassName ?? "bg-paper"}` : "glass-panel"} flex h-16 min-w-28 max-w-full shrink-0 items-center justify-center overflow-hidden rounded-lg px-2 py-1.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(201,160,92,0.35)] sm:h-[4.5rem] sm:px-2.5 sm:py-2 sm:text-base`}
          style={{ color: "#FFFFFF" }}
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={`${partner.name} лого`}
              className={`block max-h-12 max-w-full object-contain ${partner.imageClassName ?? "w-40"}`}
              loading="eager"
              decoding="async"
            />
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
