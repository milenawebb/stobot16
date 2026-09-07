import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

import { PHONE_WA } from "@/lib/contact";

const WA_NUMBER = PHONE_WA;
const WA_TEXT = encodeURIComponent(
  "Здравейте, пиша във връзка с обява/позиция от сайта на Стобот 16.",
);

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-px">
      {open && (
        <a
          href={`viber://chat?number=%2B${WA_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="h-4 w-4" />
          Viber
        </a>
      )}

      <div className="mt-px flex items-center gap-px">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Още начини за контакт"
          className="grid h-11 w-11 place-items-center border border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        </button>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Пишете ни в WhatsApp"
          className="grid h-11 w-11 place-items-center bg-whatsapp text-[#0b3d20] transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
