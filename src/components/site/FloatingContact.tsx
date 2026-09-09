import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Phone, Plus, X } from "lucide-react";

import { PHONE_TEL } from "@/lib/contact";
import { ChatWidget } from "./ChatWidget";

const actions = [
  { key: "call", label: "Обади се", icon: Phone },
  { key: "chat", label: "Чат", icon: MessageSquare },
] as const;

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {open && (
            <div className="pointer-events-auto flex flex-col items-end gap-3">
              {actions.map((a, i) => {
                const content = (
                  <>
                    <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                      {a.label}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground shadow-lg">
                      <a.icon className="h-5 w-5" />
                    </span>
                  </>
                );
                return (
                  <motion.div
                    key={a.key}
                    initial={{ opacity: 0, scale: 0.6, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 8 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26, delay: i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    {a.key === "call" ? (
                      <a href={`tel:${PHONE_TEL}`} aria-label="Обади се" className="flex items-center gap-2">
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-label="Отвори чат асистента"
                        onClick={() => {
                          setChatOpen(true);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2"
                      >
                        {content}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Затвори менюто за контакт" : "Отвори менюто за контакт"}
          whileTap={{ scale: 0.94 }}
          className="pointer-events-auto grid h-14 w-14 place-items-center rounded-md bg-primary text-primary-foreground shadow-xl"
        >
          <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
          </motion.span>
        </motion.button>
      </div>
    </>
  );
}
