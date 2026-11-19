import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingContact } from "./FloatingContact";
import { LEGAL_UPDATED } from "@/lib/legal";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({ title, intro, sections }: { title: string; intro?: ReactNode; sections: LegalSection[] }) {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <article className="mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <h1 className="text-[2.25rem] leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 inline-flex rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
            Последна актуализация: {LEGAL_UPDATED}
          </p>
          {intro && <div className="mt-6 text-base leading-relaxed text-muted-foreground">{intro}</div>}
          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-semibold sm:text-2xl">{s.heading}</h2>
                <div className="legal-body mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Footer />
      <FloatingContact />
    </main>
  );
}

export function legalHead(path: string, title: string, description: string) {
  const url = `https://stobot16.lovable.app${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
