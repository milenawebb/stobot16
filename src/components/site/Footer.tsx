import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-bold">
            КАДРИ<span className="text-primary">.БГ</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Placeholder: аутсорсинг на обучен и осигурен персонал и хамалски услуги в България.
          </p>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> +359 000 000 000
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> office@example.bg
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> София, България
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <a href="#kak-rabotim" className="hover:text-foreground">
            Как работим
          </a>
          <a href="#sektori" className="hover:text-foreground">
            Сектори
          </a>
          <a href="#hamalski" className="hover:text-foreground">
            Хамалски услуги
          </a>
          <a href="#kandidati" className="hover:text-foreground">
            Кариери
          </a>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} КАДРИ.БГ — Всички права запазени.
      </div>
    </footer>
  );
}
