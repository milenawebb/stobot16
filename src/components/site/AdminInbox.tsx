import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  adminListInbox,
  adminSetInboxStatus,
  adminDeleteInboxRow,
  type CandidateRow,
  type CompanyRow,
} from "@/lib/candidates.functions";

type Table = "candidate_applications" | "company_requests";

const fmt = (d: string) =>
  new Date(d).toLocaleString("bg-BG", { dateStyle: "medium", timeStyle: "short" });

const pillBtn = "rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary disabled:opacity-60";

export function AdminInbox({ password, tab }: { password: string; tab: "candidates" | "companies" }) {
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const r = await adminListInbox({ data: { password } });
      setCandidates(r.candidates);
      setCompanies(r.companies);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Грешка при зареждане.");
    }
  }
  useEffect(() => { void load(); }, [password]); // eslint-disable-line react-hooks/exhaustive-deps

  async function toggle(table: Table, id: string, status: string) {
    setBusy(true);
    try {
      await adminSetInboxStatus({ data: { password, table, id, status: status === "new" ? "done" : "new" } });
      await load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Грешка."); }
    setBusy(false);
  }
  async function remove(table: Table, id: string) {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете записа?")) return;
    setBusy(true);
    try {
      await adminDeleteInboxRow({ data: { password, table, id } });
      toast.success("Записът е изтрит.");
      await load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Грешка."); }
    setBusy(false);
  }

  const Status = ({ table, id, status }: { table: Table; id: string; status: string }) => (
    <button
      type="button"
      disabled={busy}
      onClick={() => void toggle(table, id, status)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${status === "new" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}
    >
      {status === "new" ? "Нов" : "Обработен"}
    </button>
  );

  const rows = tab === "candidates" ? candidates : companies;
  if (rows.length === 0) return <p className="mt-10 text-sm text-muted-foreground">Няма записи.</p>;

  return (
    <div className="mt-10 space-y-3">
      {tab === "candidates"
        ? candidates.map((c) => (
            <article key={c.id} className="rounded-[28px] border border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base">{c.name}</p>
                  <a href={`tel:${c.phone}`} className="mt-1 inline-block text-sm text-primary underline underline-offset-4">{c.phone}</a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[c.position, c.city, fmt(c.created_at)].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Status table="candidate_applications" id={c.id} status={c.status} />
                  <button type="button" disabled={busy} onClick={() => void remove("candidate_applications", c.id)} className={pillBtn}>Изтрий</button>
                </div>
              </div>
              {c.message && <p className="mt-3 whitespace-pre-line break-words text-sm">{c.message}</p>}
            </article>
          ))
        : companies.map((r) => (
            <article key={r.id} className="rounded-[28px] border border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base">
                    {r.company}{" "}
                    <span className="ml-1 rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">
                      {r.source === "chuzhbina" ? "Stobot HR" : "Начална страница"}
                    </span>
                  </p>
                  <p className="mt-1 text-sm">{r.contact_name} · <a href={`tel:${r.phone}`} className="text-primary underline underline-offset-4">{r.phone}</a>{r.email && <> · <a href={`mailto:${r.email}`} className="underline underline-offset-4">{r.email}</a></>}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[r.sector, r.workers && `${r.workers} души`, r.city, fmt(r.created_at)].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Status table="company_requests" id={r.id} status={r.status} />
                  <button type="button" disabled={busy} onClick={() => void remove("company_requests", r.id)} className={pillBtn}>Изтрий</button>
                </div>
              </div>
              {r.message && <p className="mt-3 whitespace-pre-line break-words text-sm">{r.message}</p>}
            </article>
          ))}
    </div>
  );
}
