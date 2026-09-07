import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { ListingCard } from "@/components/site/ListingCard";
import { MagneticButton } from "@/components/site/kinetic";
import { listActiveListings } from "@/lib/listings.functions";

const title = "Свободни работни места — обяви за работа | Стобот 16";
const description =
  "Актуални обяви за работа в складове, транспорт, производство, строителство и хамалски услуги. Трудов договор, осигуровки и коректно заплащане.";

export const Route = createFileRoute("/obiavi/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => listActiveListings(),
  errorComponent: ({ error }) => (
    <div role="alert" className="px-5 py-40 text-center text-muted-foreground">
      Грешка при зареждане на обявите: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-5 py-40 text-center text-muted-foreground">Няма намерени обяви.</div>
  ),
  component: ListingsPage,
});

function ListingsPage() {
  const listings = Route.useLoaderData();
  const [sector, setSector] = useState<string>("Всички");

  const sectors = ["Всички", ...Array.from(new Set(listings.map((l) => l.sector)))];
  const visible = sector === "Всички" ? listings : listings.filter((l) => l.sector === sector);

  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pt-40">
        <div className="flex items-center gap-3">
          <span className="manifest-label">Обяви</span>
          <span className="h-px w-8 bg-line/35" aria-hidden="true" />
          <span className="manifest-label">Свободни позиции</span>
        </div>
        <h1 className="mt-5 max-w-3xl text-[2.15rem] sm:text-5xl lg:text-6xl">
          Отворени позиции точно сега
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Всички позиции са с трудов договор и осигуровки.
        </p>
        <MagneticButton
          href={`tel:${PHONE_TEL}`}
          className="mt-6 inline-flex items-center gap-3 bg-primary px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <Phone className="h-5 w-5" /> Обадете се направо: {PHONE_DISPLAY}
        </MagneticButton>
        <p className="mt-3 text-sm text-muted-foreground">или оставете кандидатура по-долу</p>

        {listings.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  sector === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-surface-2/40 p-8">
            <p className="max-w-xl text-base leading-relaxed text-foreground/85">
              В момента няма отворени позиции — кандидатствайте и ще ви потърсим, щом се появи
              подходяща.
            </p>
            <Link
              to="/"
              hash="kandidati"
              className="mt-6 inline-block rounded-xl bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Изпрати кандидатура
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
