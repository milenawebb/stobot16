import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { PartnerTicker } from "@/components/site/PartnerTicker";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Sectors } from "@/components/site/Sectors";
import { Brands } from "@/components/site/Brands";
import { Moving } from "@/components/site/Moving";
import { LatestListings } from "@/components/site/LatestListings";
import { QuickMatch } from "@/components/site/QuickMatch";
import { Testimonials } from "@/components/site/Testimonials";
import { Forms } from "@/components/site/Forms";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { SectionDots } from "@/components/site/SectionDots";

const title = "стобот 16, аутсорсинг на персонал и хамалски услуги";
const description =
  "Обучен, осигурен и застрахован персонал на трудов договор за вашия обект. Плюс хамалски услуги и премествания за фирми и частни клиенти.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { sector?: string } =>
    typeof search["sector"] === "string" ? { sector: search["sector"] as string } : {},
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
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <PartnerTicker />

      {/* route line: one continuous path through the page, drawn once on load */}
      <div className="relative">
        <span
          className="route-line-y pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-line/25 lg:left-8 lg:block"
          aria-hidden="true"
        />
        <Services />
        <Process />
        <Sectors />
        <Brands />
        <Moving />
        <LatestListings />
        <QuickMatch />
        <Testimonials />
        <Forms />
      </div>

      <Footer />
      <SectionDots />
      <FloatingContact />
    </main>
  );
}
