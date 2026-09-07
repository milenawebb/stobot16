import type { JobListing } from "@/lib/listings.functions";

const DAY = 24 * 60 * 60 * 1000;

export function ListingBadges({ listing }: { listing: JobListing }) {
  const created = new Date(listing.created_at);
  const age = Date.now() - created.getTime();
  const days = Math.floor(age / DAY);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {listing.is_urgent && (
        <span className="border border-gold px-2 py-1 font-semibold uppercase tracking-wide text-gold">
          Спешно
        </span>
      )}
      {age < DAY ? (
        <span className="bg-primary px-2 py-1 font-semibold uppercase tracking-wide text-primary-foreground">
          Ново
        </span>
      ) : days <= 3 ? (
        <span className="border border-border px-2 py-1 text-muted-foreground">
          Публикувано преди {days} {days === 1 ? "ден" : "дни"}
        </span>
      ) : (
        <span className="text-muted-foreground">
          {created.toLocaleDateString("bg-BG", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      )}
    </div>
  );
}
