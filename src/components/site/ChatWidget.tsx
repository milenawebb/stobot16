import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Send, X } from "lucide-react";
import { chatAssistant, type ListingRef } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string; listings?: ListingRef[] };

const GREETING =
  "Здравей! Търсиш работа или персонал за фирмата си? Пиши ми и ще ти помогна.";

export function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const sessionId = useRef<string>(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()),
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const send = useServerFn(chatAssistant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({
        data: {
          sessionId: sessionId.current,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply, listings: res.listings }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Извинявай, връзката се разпадна. Опитай пак след малко." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col border-border bg-background sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[560px] sm:max-h-[80vh] sm:w-[380px] sm:border">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-display text-sm font-extrabold">Асистент стобот 16</span>
            </div>
            <button onClick={onClose} aria-label="Затвори чата" className="p-1">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className="max-w-[85%] space-y-2">
                  <p
                    className={
                      m.role === "user"
                        ? "whitespace-pre-wrap bg-secondary px-3 py-2 text-sm text-foreground"
                        : "whitespace-pre-wrap bg-primary px-3 py-2 text-sm text-primary-foreground"
                    }
                  >
                    {m.content.replace(/\*\*/g, "").replace(/^[*-]\s+/gm, "• ")}
                  </p>
                  {m.listings?.map((l) => (
                    <Link
                      key={l.slug}
                      to="/obiavi/$slug"
                      params={{ slug: l.slug }}
                      onClick={onClose}
                      className="block border border-border p-3 transition-colors hover:bg-secondary"
                    >
                      <span className="block font-display text-sm font-extrabold">{l.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {l.schedule} · {l.location} · {l.pay}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-muted-foreground">Асистентът пише…</p>}
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишете съобщение…"
              aria-label="Съобщение"
              className="min-w-0 flex-1 border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-ring"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Изпрати"
              className="grid h-10 w-10 shrink-0 place-items-center bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

    </>
  );
}
