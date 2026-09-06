import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
                h.delete("Authorization");
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });

        const { data } = await supabase
          .from("job_listings")
          .select("slug, updated_at")
          .eq("is_active", true);

        const urls = [
          `<url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
          `<url><loc>${origin}/obiavi</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`,
          ...(data ?? []).map(
            (row: { slug: string; updated_at: string }) =>
              `<url><loc>${origin}/obiavi/${row.slug}</loc><lastmod>${new Date(row.updated_at).toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`,
          ),
        ].join("");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
          { headers: { "Content-Type": "application/xml; charset=utf-8" } },
        );
      },
    },
  },
});
