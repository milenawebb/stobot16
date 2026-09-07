import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type JobListing = {
  id: string;
  slug: string;
  title: string;
  position: string;
  schedule: string;
  location: string;
  pay: string;
  description: string | null;
  sector: string;
  is_active: boolean;
  is_urgent: boolean;
  created_at: string;
};

const COLUMNS = "id, slug, title, position, schedule, location, pay, description, sector, is_active, is_urgent, created_at";

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

export const listActiveListings = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("job_listings")
    .select(COLUMNS)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as JobListing[];
});

export const getListingBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { data: row, error } = await publicClient()
      .from("job_listings")
      .select(COLUMNS)
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as JobListing | null;
  });

/* ---------------- admin ---------------- */

function checkPassword(password: string) {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected || password !== expected) throw new Error("Грешна парола.");
}

const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
  ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .split("")
    .map((c) => CYR[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

type ListingInput = {
  password: string;
  id?: string;
  title: string;
  position: string;
  schedule: string;
  location: string;
  pay: string;
  description?: string;
  sector: string;
  is_active: boolean;
  is_urgent?: boolean;
};

export const adminListListings = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("job_listings")
      .select(COLUMNS)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as JobListing[];
  });

export const adminSaveListing = createServerFn({ method: "POST" })
  .inputValidator((data: ListingInput) => data)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      title: data.title,
      position: data.position,
      schedule: data.schedule,
      location: data.location,
      pay: data.pay,
      description: data.description ?? null,
      sector: data.sector,
      is_active: data.is_active,
      is_urgent: data.is_urgent ?? false,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("job_listings").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true };
    }

    const base = slugify(`${data.position}-${data.location}`) || "obyava";
    let slug = base;
    for (let i = 2; i < 50; i++) {
      const { data: existing } = await supabaseAdmin
        .from("job_listings")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      slug = `${base}-${i}`;
    }
    const { error } = await supabaseAdmin.from("job_listings").insert({ ...payload, slug });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteListing = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; id: string }) => data)
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("job_listings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
