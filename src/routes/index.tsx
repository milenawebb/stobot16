import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { PartnerTicker } from "@/components/site/PartnerTicker";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Sectors } from "@/components/site/Sectors";
import { Brands } from "@/components/site/Brands";
import { Moving } from "@/components/site/Moving";
import { Forms } from "@/components/site/Forms";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";

const title = "Аутсорсинг на персонал и хамалски услуги в България";
const description =
  "Обучен, осигурен и застрахован персонал на трудов договор за вашия обект. Плюс хамалски услуги и премествания за фирми и частни клиенти.";

export const Route = createFileRoute("/")({
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
      <Stats />
      <Services />
      <Process />
      <Sectors />
      <Brands />
      <Moving />
      <Forms />
      <Footer />
      <FloatingContact />
    </main>
  );
}
