import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  adminListListings,
  adminSaveListing,
  adminDeleteListing,
  type JobListing,
} from "@/lib/listings.functions";
import { SECTORS } from "@/lib/sectors";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Управление на обяви | Стобот 16" },
      { name: "description", content: "Вътрешен панел за управление на обявите за работа." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const inputClass =
  "w-full border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-surface";

const empty = {
  id: "",
  title: "",
  position: "",
  schedule: "",
  location: "",
  pay: "",
  description: "",
  sector: SECTORS[0] as string,
  is_active: true,
  is_urgent: false,
  contact_phone: "",
};

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [listings, setListings] = useState<JobListing[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("stobot_admin_pw");
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(pw: string) {
    try {
      const rows = await adminListListings({ data: { password: pw } });
      setListings(rows);
      setAuthed(true);
      sessionStorage.setItem("stobot_admin_pw", pw);
    } catch (e) {
      setAuthed(false);
      sessionStorage.removeItem("stobot_admin_pw");
      toast.error(e instanceof Error ? e.message : "Грешка при вход.");
    }
  }

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await load(password);
    setBusy(false);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await adminSaveListing({
        data: {
          password,
          ...(form.id ? { id: form.id } : {}),
          title: form.title,
          position: form.position,
          schedule: form.schedule,
          location: form.location,
          pay: form.pay,
          description: form.description,
          sector: form.sector,
          is_active: form.is_active,
          is_urgent: form.is_urgent,
          contact_phone: form.contact_phone,
        },
      });
      toast.success(form.id ? "Обявата е обновена." : "Обявата е публикувана.");
      setForm({ ...empty });
      await load(password);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Грешка при запис.");
    }
    setBusy(false);
  }

  async function onDelete(id: string) {
    setBusy(true);
    try {
      await adminDeleteListing({ data: { password, id } });
      toast.success("Обявата е изтрита.");
      await load(password);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Грешка при изтриване.");
    }
    setBusy(false);
  }

  async function toggleActive(listing: JobListing) {
    setBusy(true);
    try {
      await adminSaveListing({
        data: {
          password,
          id: listing.id,
          title: listing.title,
          position: listing.position,
          schedule: listing.schedule,
          location: listing.location,
          pay: listing.pay,
          description: listing.description ?? "",
          sector: listing.sector,
          is_active: !listing.is_active,
          is_urgent: listing.is_urgent,
          contact_phone: listing.contact_phone ?? "",
        },
      });
      await load(password);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Грешка.");
    }
    setBusy(false);
  }

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <form onSubmit={onLogin} className="w-full max-w-sm border border-border p-8">
          <h1 className="text-2xl">Вход в панела</h1>
          <p className="mt-3 text-sm text-muted-foreground">Въведете администраторската парола.</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Парола"
            className={`${inputClass} mt-6`}
          />
          <button
            type="submit"
            disabled={busy}
            className="mt-4 w-full bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Проверка..." : "Вход"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <h1 className="text-3xl">Обяви за работа</h1>

      <form onSubmit={onSave} className="mt-10 border border-border p-6 lg:p-8">
        <h2 className="text-xl">{form.id ? "Редакция на обява" : "Нова обява"}</h2>
        <div className="mt-6 space-y-3">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Заглавие (напр. Търсим работници на смяна)"
            className={inputClass}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="Позиция (напр. Складов работник)"
              className={inputClass}
            />
            <input
              required
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              placeholder="График (напр. Дневна смяна)"
              className={inputClass}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Локация (напр. София, склад Орбита)"
              className={inputClass}
            />
            <input
              required
              value={form.pay}
              onChange={(e) => setForm({ ...form, pay: e.target.value })}
              placeholder="Заплащане (напр. 15 лв/час)"
              className={inputClass}
            />
          </div>
          <select
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
            className={inputClass}
          >
            {SECTORS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            value={form.contact_phone}
            onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
            placeholder="Телефон за тази обява (по желание, по подразбиране +359 87 647 2224)"
            className={inputClass}
          />
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание (по желание)"
            className={inputClass}
          />
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            Активна обява
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.is_urgent}
              onChange={(e) => setForm({ ...form, is_urgent: e.target.checked })}
            />
            Спешна позиция
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={busy}
            className="bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
          >
            {form.id ? "Запази промените" : "Публикувай обявата"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm({ ...empty })}
              className="border border-foreground px-6 py-4 font-display text-sm font-bold uppercase tracking-wide"
            >
              Отказ
            </button>
          )}
        </div>
      </form>

      <div className="mt-12 space-y-3">
        {listings.map((l) => (
          <div
            key={l.id}
            className="flex flex-wrap items-center justify-between gap-4 border border-border p-5"
          >
            <div className="min-w-0">
              <p className="truncate text-base">{l.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {l.position} · {l.schedule} · {l.location} · {l.pay}
                {l.is_urgent && " · спешна"}
                {!l.is_active && " · неактивна"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    id: l.id,
                    title: l.title,
                    position: l.position,
                    schedule: l.schedule,
                    location: l.location,
                    pay: l.pay,
                    description: l.description ?? "",
                    sector: l.sector,
                    is_active: l.is_active,
                    is_urgent: l.is_urgent,
                    contact_phone: l.contact_phone ?? "",
                  })
                }
                className="border border-border px-4 py-2 transition-colors hover:border-primary"
              >
                Редакция
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void toggleActive(l)}
                className="border border-border px-4 py-2 transition-colors hover:border-primary"
              >
                {l.is_active ? "Деактивирай" : "Активирай"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onDelete(l.id)}
                className="border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                Изтрий
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
