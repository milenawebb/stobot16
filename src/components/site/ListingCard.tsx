import { Link } from "@tanstack/react-router";
import { Clock, FileUp, MapPin, Phone, Wallet } from "lucide-react";
import { PHONE_TEL } from "@/lib/contact";
import type { JobListing } from "@/lib/listings.functions";
import { ListingBadges } from "./ListingBadges";
import { MagneticButton, SpotlightCard } from "./kinetic";

export function ListingCard({ listing }: { listing: JobListing }) {
  return (
    <SpotlightCard
      as="article"
      className="flex flex-col rounded-[28px] border border-border bg-background p-6 transition-colors hover:border-primary"
    >
      <ListingBadges listing={listing} />
      <span className="manifest-label mt-3 block">{listing.sector}</span>
      <h3 className="mt-3 text-xl">
        <Link
          to="/obiavi/$slug"
          params={{ slug: listing.slug }}
          className="transition-colors hover:text-primary"
        >
          {listing.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{listing.position}</p>

      <dl className="mt-5 space-y-2 text-sm text-foreground/85">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-primary" />
          <dd>{listing.schedule}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          <dd>{listing.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 shrink-0 text-primary" />
          <dd className="numeral text-base">{listing.pay}</dd>
        </div>
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <MagneticButton
          href={`tel:${listing.contact_phone ?? PHONE_TEL}`}
          className="flex min-w-0 items-center justify-center gap-2 rounded-[6px] bg-primary px-3 py-4 text-center font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground hover:text-background sm:text-base"
        >
          <Phone className="h-4 w-4 shrink-0" /> Обади се сега
        </MagneticButton>
        <Link
          to="/"
          search={{ sector: listing.sector, listing: listing.title }}
          hash="kandidati"
          className="flex min-w-0 items-center justify-center gap-2 rounded-[6px] border border-border bg-background px-3 py-4 text-center font-display text-sm font-bold text-foreground transition-colors hover:bg-move hover:text-move-foreground sm:text-base"
        >
          <FileUp className="h-4 w-4 shrink-0" /> Изпрати CV
        </Link>
      </div>
      <div className="mt-2">
        <Link
          to="/obiavi/$slug"
          params={{ slug: listing.slug }}
          className="block rounded-[6px] border border-border bg-background px-5 py-3 text-center font-display text-sm font-bold text-foreground transition-colors hover:bg-move hover:text-move-foreground"
        >
          Детайли
        </Link>
      </div>
    </SpotlightCard>
  );
}
