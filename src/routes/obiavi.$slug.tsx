import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, MapPin, Wallet, ArrowLeft, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { Nav } from "@/components/site/Nav";
import { MagneticButton } from "@/components/site/kinetic";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { getListingBySlug } from "@/lib/listings.functions";

export const Route = createFileRoute("/obiavi/$slug")({
  loader: async ({ params }) => {
    const listing = await getListingBySlug({ data: { slug: params.slug } });
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Обявата не е налична | stobot 16" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `Работа: ${loaderData.position}, ${loaderData.schedule.toLowerCase()} — ${loaderData.location} | stobot 16`;
    const description = `${loaderData.position} — ${loaderData.schedule.toLowerCase()}, ${loaderData.location}. Заплащане ${loaderData.pay}. Трудов договор и осигуровки от първия ден.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: loaderData.position,
            description: loaderData.description ?? loaderData.title,
            datePosted: loaderData.created_at,
            employmentType: loaderData.schedule.toLowerCase().includes("половин")
              ? "PART_TIME"
              : "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: "stobot 16",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: loaderData.location,
                addressCountry: "BG",
              },
            },
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "EUR",
              value: { "@type": "QuantitativeValue", unitText: loaderData.pay },
            },
          }),
        },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div role="alert" className="px-5 py-40 text-center text-muted-foreground">
      Грешка при зареждане: {error instanceof Error ? error.message : String(error)}
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-5 py-40 text-center text-muted-foreground">
      Тази обява вече не е активна.
    </div>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const listing = Route.useLoaderData();

  return (
    <main>
      <Nav />

      <article className="mx-auto max-w-4xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
        <Link
          to="/obiavi"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Всички обяви
        </Link>

        <span className="manifest-label mt-8 block">{listing.sector}</span>
        <h1 className="mt-4 text-[2rem] leading-tight sm:text-5xl">{listing.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{listing.position}</p>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-3">
          {[
            [Clock, "График", listing.schedule],
            [MapPin, "Локация", listing.location],
            [Wallet, "Заплащане", listing.pay],
          ].map(([Icon, label, value]) => {
            const I = Icon as typeof Clock;
            return (
              <div key={label as string} className="min-w-0 bg-background p-5 sm:min-h-40 sm:p-6">
                <I className="h-5 w-5 text-primary" />
                <dt className="manifest-label mt-4 block">{label as string}</dt>
                <dd className="mt-1 text-base text-foreground">{value as string}</dd>
              </div>
            );
          })}
        </dl>

        {listing.description && (
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/85">
            {listing.description}
          </p>
        )}

        <div className="mt-10 flex flex-col items-start gap-3">
          <MagneticButton
            href={`tel:${listing.contact_phone ?? PHONE_TEL}`}
            className="inline-flex items-center gap-3 rounded-[6px] bg-primary px-8 py-5 font-display text-base font-bold  text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <Phone className="h-5 w-5" /> Обади се сега — {listing.contact_phone ?? PHONE_DISPLAY}
          </MagneticButton>
          <Link
            to="/"
            search={{ sector: listing.sector }}
            hash="kandidati"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            или оставете кандидатура по-долу
          </Link>
        </div>
      </article>

      <Footer />
      <FloatingContact />
    </main>
  );
}
