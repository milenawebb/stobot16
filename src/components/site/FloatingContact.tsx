import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "WhatsApp", href: "https://wa.me/359000000000", icon: MessageCircle },
    { label: "Viber", href: "viber://chat?number=%2B359000000000", icon: Phone },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open &&
        items.map((i) => (
          <a
            key={i.label}
            href={i.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-colors hover:bg-surface-2"
          >
            <i.icon className="h-4 w-4 text-primary" />
            {i.label}
          </a>
        ))}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Бърз контакт"
        className={cn(
          "grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
