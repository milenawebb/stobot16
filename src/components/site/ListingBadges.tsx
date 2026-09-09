import type { JobListing } from "@/lib/listings.functions";

export function ListingBadges({ listing }: { listing: JobListing }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {listing.is_urgent && (
        <span className="rounded-full border border-gold px-3 py-1 font-semibold uppercase tracking-wide text-gold">
          Спешно
        </span>
      )}
    </div>
  );
}
