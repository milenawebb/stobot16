import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3 lg:px-8">
        <div>
          <Wordmark lang="bg" tone="light" size="text-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Placeholder: аутсорсинг на обучен и осигурен персонал и хамалски услуги в България.
          </p>
        </div>

        <div className="space-y-2 font-mono text-sm text-muted-foreground">
          <p>+359 000 000 000</p>
          <p>office@example.bg</p>
          <p>София, България</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {[
            ["#kak-rabotim", "Как работим"],
            ["#sektori", "Сектори"],
            ["#hamalski", "Хамалски услуги"],
            ["#kandidati", "Кариери"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-primary">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 lg:px-8">
        <p className="manifest-label text-center">
          © {new Date().getFullYear()} КАДРИ.БГ — Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
