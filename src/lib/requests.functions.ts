import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  source: z.enum(["home", "chuzhbina"]),
  company: z.string().trim().min(1).max(200),
  contact_name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().max(255).email().optional().or(z.literal("")),
  sector: z.string().trim().max(100).optional(),
  workers: z.string().trim().max(40).optional(),
  city: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  gdpr_consent: z.boolean(),
});

export type CompanyRequestInput = z.input<typeof schema>;

export const submitCompanyRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    if (data.source === "chuzhbina" && !data.gdpr_consent) throw new Error("Необходимо е съгласие.");
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const url = process.env["SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL;
    if (!url || !key) throw new Error("Липсва конфигурация на базата данни.");
    const sb = createClient<Database>(url, key, {
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
    const { error } = await sb.from("company_requests").insert({
      source: data.source,
      company: data.company,
      contact_name: data.contact_name,
      phone: data.phone,
      email: data.email || null,
      sector: data.sector || null,
      workers: data.workers || null,
      city: data.city || null,
      message: data.message || null,
      gdpr_consent: data.gdpr_consent,
    });
    if (error) throw new Error("Заявката не беше записана. Опитайте отново или се обадете.");
    return { ok: true };
  });
