import { Wordmark } from "./Wordmark";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import fifthExitLogo from "@/assets/fifthexit-logo-for-dark.png.asset.json";

const quickLinks = [
  ["#uslugi", "Услуги"],
  ["#kak-rabotim", "Как работим"],
  ["#sektori", "Сектори"],
  ["#hamalski", "Преместване"],
  ["#obiavi", "Обяви"],
  ["#kontakti", "Контакти"],
] as const;

const legalLinks = [
  ["#", "Поверителност"],
  ["#", "Условия за ползване"],
  ["#", "Бисквитки"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        {/* Column 1 — brand */}
        <div>
          <Wordmark tone="light" size="text-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Аутсорсинг на обучен и осигурен персонал и услуги за преместване в България.
          </p>
        </div>

        {/* Column 2 — quick links */}
        <div>
          <h3 className="text-sm font-bold text-white">Бързи връзки</h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — contacts */}
        <div>
          <h3 className="text-sm font-bold text-white">Контакти</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href="mailto:info@stobot16.com" className="transition-colors hover:text-white">
                info@stobot16.com
              </a>
            </li>
            <li>София, България</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 py-6 text-xs text-white/50 md:flex-row md:justify-between">
          <p className="text-center md:text-left">
            © 2026 Стобот 16. Всички права запазени.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-center">
            {legalLinks.map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="flex items-center justify-center gap-1.5 text-center md:justify-end">
            Разработено от
            <a
              href="https://fifthexit.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center opacity-80 transition-opacity hover:opacity-100"
            >
              <img
                src={fifthExitLogo.url}
                alt="Fifth Exit"
                className="h-5 w-auto"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
