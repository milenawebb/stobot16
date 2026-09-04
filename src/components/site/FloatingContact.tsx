import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "WhatsApp", href: "https://wa.me/359000000000", icon: MessageCircle },
    { label: "Viber", href: "viber://chat?number=%2B359000000000", icon: Phone },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-px">
      {open &&
        items.map((i) => (
          <a
            key={i.label}
            href={i.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </a>
        ))}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Бърз контакт"
        className="mt-px grid h-14 w-14 place-items-center bg-primary text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
