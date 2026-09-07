import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Wallet } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import type { JobListing } from "@/lib/listings.functions";
import { ListingBadges } from "./ListingBadges";

export function ListingCard({ listing }: { listing: JobListing }) {
  return (
    <article className="flex flex-col border border-border bg-background p-6 transition-colors hover:border-primary">
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

      <a
        href={`tel:${listing.contact_phone ?? PHONE_TEL}`}
        className="mt-6 flex items-center justify-center gap-2 bg-primary px-5 py-4 font-display text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        <Phone className="h-4 w-4" /> Обади се сега
      </a>
      <span className="mt-2 text-center text-xs text-muted-foreground">
        {listing.contact_phone ?? PHONE_DISPLAY} — или оставете кандидатура
      </span>

      <div className="mt-4 flex flex-wrap gap-px bg-border">
        <Link
          to="/"
          search={{ sector: listing.sector }}
          hash="kandidati"
          className="flex-1 bg-background px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-move hover:text-move-foreground"
        >
          Кандидатствай
        </Link>
        <Link
          to="/obiavi/$slug"
          params={{ slug: listing.slug }}
          className="flex-1 bg-background px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-move hover:text-move-foreground"
        >
          Детайли
        </Link>
      </div>
    </article>
  );
}
