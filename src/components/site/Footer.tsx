import { Phone, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { CLIENTS_PHONE, WORKERS_PHONE } from "@/lib/contact";
import { LEGAL, LEGAL_COMPANY_LINE, openChat } from "@/lib/legal";

const linkClass = "inline-flex min-h-10 items-center text-sm text-white/60 transition-colors hover:text-white";

const columns: { title: string; links: { href?: string; label: string; chat?: boolean }[] }[] = [
  {
    title: "Услуги",
    links: [
      { href: "/#uslugi", label: "Персонал" },
      { href: "/#hamalski", label: "Хамалски услуги" },
      { href: "/#hamalski", label: "Преместване" },
      { href: "/#sektori", label: "Секторите" },
    ],
  },
  {
    title: "За кандидати",
    links: [
      { href: "/obiavi", label: "Свободни позиции" },
      { href: "/#kandidati", label: "Търся работа" },
      { label: "AI асистент", chat: true },
    ],
  },
  {
    title: "За фирми",
    links: [
      { href: "/#zayavka", label: "Нуждая се от персонал" },
      { href: "/stobot-hr", label: "Stobot HR" },
    ],
  },
];

const legalLinks = [
  { href: "/poveritelnost", label: "Политика за поверителност" },
  { href: "/biskvitki", label: "Политика за бисквитките" },
  { href: "/obshti-usloviya", label: "Общи условия" },
];

const pill =
  "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-primary";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:grid-cols-3 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr_1.4fr] lg:px-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Wordmark tone="light" size="text-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Подбор и осигуряване на персонал, хамалски услуги и работници от трети страни.
          </p>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-bold text-white">{c.title}</h3>
            <ul className="mt-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.chat ? (
                    <button type="button" onClick={openChat} className={linkClass}>
                      {l.label}
                    </button>
                  ) : (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h3 className="text-sm font-bold text-white">Контакти</h3>
          <ul className="mt-4 flex flex-col items-start gap-2">
            <li>
              <a href={`tel:${WORKERS_PHONE.tel}`} className={pill}>
                <Phone className="h-4 w-4 text-primary" /> Работници: {WORKERS_PHONE.display}
              </a>
            </li>
            <li>
              <a href={`tel:${CLIENTS_PHONE.tel}`} className={pill}>
                <Phone className="h-4 w-4 text-primary" /> Фирми: {CLIENTS_PHONE.display}
              </a>
            </li>
            {LEGAL.email && (
              <li>
                <a href={`mailto:${LEGAL.email}`} className={pill}>
                  <Mail className="h-4 w-4 text-primary" /> {LEGAL.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 py-6 text-xs text-white/50 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <p>© 2026 stobot 16. Всички права запазени.</p>
            <p>{LEGAL_COMPANY_LINE}</p>
            {LEGAL.registration && <p className="text-white/40">{LEGAL.registration}</p>}
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-9 items-center rounded-full border border-white/10 px-3 transition-colors hover:border-primary hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-1.5">
              Разработено от
              <a href="https://mfiveconsult.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                МВ5 Консулт
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
