import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatInput = { sessionId: string; messages: ChatMessage[] };

/* ---- basic in-memory rate limit: 20 messages / hour / session ---- */
const HOUR = 60 * 60 * 1000;
const buckets = new Map<string, number[]>();

function rateLimited(sessionId: string) {
  const now = Date.now();
  const hits = (buckets.get(sessionId) ?? []).filter((t) => now - t < HOUR);
  if (hits.length >= 20) return true;
  hits.push(now);
  buckets.set(sessionId, hits);
  return false;
}

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const SYSTEM_BASE = `Ти си чат асистент на stobot 16 — българска фирма за аутсорсинг на персонал и хамалски услуги. Говориш кратко, приятелски и на "ти" с кандидати, и малко по-официално на "вие" с представители на фирми — прецени по контекста на съобщението кой пише.

Помагаш на два типа хора:
1. Кандидати, търсещи работа — питай за предпочитан сектор и локация, и предложи подходящи от текущите отворени позиции (списъкът е предоставен по-долу). Ако няма подходяща отворена позиция, кажи го честно и насочи към формата за кандидатстване, за да бъдат потърсени при отваряне на позиция.
2. Фирми, търсещи персонал — обясни накратко модела (наемаме, обучаваме, осигуряваме хора на трудов договор; фирмата получава готова смяна) и насочи към формата за заявка.

Отговаряй само въз основа на реална информация за компанията, предоставена ти тук. Никога не измисляй заплати, срокове или условия, които не са ти дадени изрично. При неясен или извън обхвата въпрос, насочи любезно към контактната форма или директен контакт. Винаги отговаряй на български.`;

const FACTS = `Телефон за контакт: +359 87 647 2224. Когато кандидат прояви интерес към конкретна позиция, задължително му предложи да се обади: „Обадете се на +359 87 647 2224 и питайте за позицията в [локация] — така е най-бързо.“

Основни факти за компанията:
- Наемаме хора на официален трудов договор с осигуровки и застраховка
- Работим в сектори: строителство, производство, складове и логистика, опаковане, ХоРеКа, транспорт, почистване, поддръжка
- Партнираме си пряко с: Quehenberger Logistic, Orbit Logistic, Sameday, Emag, Unimaster Logistic, Cargo-partner Logistic, Sila BG, Sirius 2005, Zora, Bolt Food
- Предлагаме и хамалски услуги (домашни и офис премествания, товаро-разтоварна дейност, хамали на час) — това е отделна услуга за частни клиенти, не е свързана с наемане на персонал
- Отговаряме на фирмени запитвания до 24 часа
- Следим присъствието и качеството на работата на терен през целия период на договора`;

export const chatAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: ChatInput) => data)
  .handler(async ({ data }) => {
    if (!data.sessionId || !Array.isArray(data.messages) || data.messages.length === 0) {
      throw new Error("Невалидна заявка.");
    }
    if (rateLimited(data.sessionId)) {
      return {
        reply: "Достигнахте лимита на съобщения за този час. Моля, използвайте формата за контакт.",
        listings: [] as ListingRef[],
      };
    }

    const { data: rows } = await publicClient()
      .from("job_listings")
      .select("slug, title, position, schedule, location, pay, sector")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    const listings = (rows ?? []) as ListingRef[];
    const listingsText = listings.length
      ? listings
          .map(
            (l) =>
              `- [${l.slug}] ${l.title} | позиция: ${l.position} | сектор: ${l.sector} | график: ${l.schedule} | локация: ${l.location} | заплащане: ${l.pay}`,
          )
          .join("\n")
      : "В момента няма активни обяви.";

    const system = `${SYSTEM_BASE}

Текущи отворени позиции (форматът [slug] е вътрешен идентификатор — не го показвай на потребителя):
${listingsText}

${FACTS}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env["LOVABLE_API_KEY"]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 400,
        messages: [
          { role: "system", content: system },
          ...data.messages.slice(-12).map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })),
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Твърде много заявки. Опитайте пак след малко.");
      if (res.status === 402) throw new Error("Услугата временно не е достъпна.");
      throw new Error("Асистентът е временно недостъпен.");
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "Извинявай, нещо се обърка. Опитай пак.";

    // attach listings whose position/title is mentioned in the reply
    const lower = reply.toLowerCase();
    const matched = listings.filter(
      (l) => lower.includes(l.position.toLowerCase()) || lower.includes(l.title.toLowerCase()),
    );

    return { reply, listings: matched.slice(0, 3) };
  });

export type ListingRef = {
  slug: string;
  title: string;
  position: string;
  schedule: string;
  location: string;
  pay: string;
  sector: string;
};
