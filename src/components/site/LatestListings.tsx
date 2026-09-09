import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionHead } from "./SectionHead";
import { ListingCard } from "./ListingCard";
import { listActiveListings } from "@/lib/listings.functions";

export function LatestListings() {
  const { data } = useQuery({
    queryKey: ["latest-listings"],
    queryFn: () => listActiveListings(),
  });

  const listings = (data ?? []).slice(0, 3);

  return (
    <section id="obiavi" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHead
        index="08"
        title="Свободни позиции точно сега"
        lead="Отворени позиции при наши партньори с договор, осигуровки и ясно заплащане."
      />

      {listings.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      ) : (
        <p className="mt-10 max-w-xl text-base text-muted-foreground">
          В момента няма отворени позиции. Кандидатствайте и ще ви потърсим, щом се появи подходяща.
        </p>
      )}

      <Link
        to="/obiavi"
        className="mt-10 inline-block rounded-[6px] border border-foreground px-8 py-4 font-display text-sm font-bold  text-foreground transition-colors hover:bg-move hover:border-move hover:text-move-foreground"
      >
        Виж всички обяви
      </Link>
    </section>
  );
}
