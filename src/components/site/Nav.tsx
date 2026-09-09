import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { MagneticButton } from "./kinetic";

const links = [
  { href: "/#uslugi", label: "Услуги" },
  { href: "/#kak-rabotim", label: "Как работим" },
  { href: "/obiavi", label: "Обяви" },
  { href: "/#sektori", label: "Сектори" },
  { href: "/#hamalski", label: "Хамалски услуги" },
  { href: "/#kontakti", label: "Контакти" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b border-border bg-background/95 backdrop-blur" : "bg-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <a href="/" className="flex min-w-0 items-center">
          <Wordmark lang="bg" tone="light" size="text-xl" />
        </a>


        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {PHONE_DISPLAY}
          </a>
          <MagneticButton
            href="/#zayavka"
            label="Заявка за персонал"
            className="flex items-center rounded-[6px] bg-primary px-5 py-2.5 font-display text-sm font-bold  text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
          />
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="rounded-b-[32px] border-t border-border bg-background px-5 py-4 lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-3.5 font-mono text-sm text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="/#zayavka"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[6px] bg-primary px-5 py-3.5 text-center font-display text-sm font-bold  text-primary-foreground"
            >
              Заявка за персонал
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
