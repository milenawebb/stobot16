import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { publicClient, checkPassword } from "./listings.functions";

const PHONE_RE = /^\+?[0-9][0-9\s\-().]{5,19}$/;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(25).regex(PHONE_RE),
  position: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true),
  website: z.string().max(200).optional(), // honeypot
});

export type CandidateApplicationInput = z.input<typeof schema>;

async function hashIp(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`stobot:${ip}`));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const submitCandidateApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot filled → pretend success, store nothing.
    if (data.website) return { ok: true };
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const ipHash = await hashIp(ip);
    const sb = publicClient();
    const { data: count } = await sb.rpc("candidate_recent_count", { _ip_hash: ipHash });
    if ((count ?? 0) >= 5) throw new Error("Твърде много опити. Опитайте по-късно или се обадете.");
    const { error } = await sb.from("candidate_applications").insert({
      name: data.name,
      phone: data.phone,
      position: data.position || null,
      city: data.city || null,
      message: data.message || null,
      consent: true,
      source: "home",
      ip_hash: ipHash,
    });
    if (error) throw new Error("Кандидатурата не беше записана.");
    // TODO: notify by email once LEGAL.email is set
    return { ok: true };
  });

/* ---------------- admin ---------------- */

export type CandidateRow = {
  id: string; created_at: string; name: string; phone: string; position: string | null;
  city: string | null; message: string | null; status: string; source: string;
};
export type CompanyRow = {
  id: string; created_at: string; source: string; company: string; contact_name: string; phone: string;
  email: string | null; sector: string | null; workers: string | null; city: string | null;
  message: string | null; status: string;
};

const tableSchema = z.enum(["candidate_applications", "company_requests"]);

async function admin() {
  return (await import("@/integrations/supabase/client.server")).supabaseAdmin;
}

export const adminListInbox = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const sb = await admin();
    const [c, r] = await Promise.all([
      sb.from("candidate_applications")
        .select("id, created_at, name, phone, position, city, message, status, source")
        .order("created_at", { ascending: false }),
      sb.from("company_requests")
        .select("id, created_at, source, company, contact_name, phone, email, sector, workers, city, message, status")
        .order("created_at", { ascending: false }),
    ]);
    if (c.error) throw new Error(c.error.message);
    if (r.error) throw new Error(r.error.message);
    return { candidates: (c.data ?? []) as CandidateRow[], companies: (r.data ?? []) as CompanyRow[] };
  });

export const adminSetInboxStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ password: z.string(), table: tableSchema, id: z.string().uuid(), status: z.enum(["new", "done"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await (await admin()).from(data.table).update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteInboxRow = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ password: z.string(), table: tableSchema, id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await (await admin()).from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
