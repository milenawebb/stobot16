import { useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { MagneticButton } from "./kinetic";
import { SECTORS } from "@/lib/sectors";
import { CLIENTS_PHONE, WORKERS_PHONE } from "@/lib/contact";
import { submitCandidateApplication } from "@/lib/candidates.functions";
import { submitCompanyRequest } from "@/lib/requests.functions";

export const COMPANY_SUCCESS = "Заявката е изпратена. Ще се свържем с вас до 24 часа.";

function str(f: FormData, k: string) {
  const v = f.get(k);
  return typeof v === "string" ? v : "";
}

export function useCompanySubmit(source: "home" | "chuzhbina") {
  const [sending, setSending] = useState(false);
  return {
    sending,
    onSubmit: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const f = new FormData(form);
      setSending(true);
      try {
        await submitCompanyRequest({
          data: {
            source,
            company: str(f, "company"),
            contact_name: str(f, "name"),
            phone: str(f, "phone"),
            email: str(f, "email"),
            sector: str(f, "sector") || undefined,
            workers: str(f, "people") || undefined,
            city: str(f, "city") || undefined,
            message: str(f, "details") || undefined,
            gdpr_consent: f.get("gdpr") === "on",
          },
        });
        form.reset();
        toast.success(COMPANY_SUCCESS);
      } catch {
        toast.error("Заявката не беше изпратена. Опитайте отново или се обадете.");
      } finally {
        setSending(false);
      }
    },
  };
}


export const textareaClass =
  "rounded-3xl w-full border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-surface";

export const inputClass =
  "rounded-[6px] w-full border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-surface";

function useCandidateSubmit() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  return {
    sending,
    status,
    onSubmit: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const f = new FormData(form);
      setSending(true);
      setStatus("idle");
      try {
        await submitCandidateApplication({
          data: {
            name: str(f, "name"),
            phone: str(f, "phone"),
            city: str(f, "city") || undefined,
            position: str(f, "sector") || undefined,
            message: str(f, "experience") || undefined,
            consent: (f.get("gdpr") === "on") as true,
            website: str(f, "website") || undefined,
          },
        });
        form.reset();
        setStatus("ok");
      } catch {
        setStatus("error");
      } finally {
        setSending(false);
      }
    },
  };
}

export function Forms() {
  const search = useSearch({ strict: false }) as { sector?: string; listing?: string };
  const company = useCompanySubmit("home");
  const candidate = useCandidateSubmit();
  const presetSector = search.sector && SECTORS.includes(search.sector as never) ? search.sector : "";


  return (
    <section id="kontakti" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <h2 className="max-w-3xl text-[2rem] sm:text-5xl lg:text-6xl">
        Свържете се с нас
      </h2>

      <div className="mt-14 grid gap-px rounded-[32px] border border-border bg-border lg:grid-cols-2">
        <form onSubmit={company.onSubmit} id="zayavka" className="rounded-[30px] bg-background p-7 lg:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <h3 className="text-2xl">За фирми</h3>
            <span className="manifest-label">Заявка за персонал</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Кажете ни от какво имате нужда. Отговаряме до 24 часа.
          </p>
          <a
            href={`tel:${CLIENTS_PHONE.tel}`}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-primary"
          >
            Обадете се: {CLIENTS_PHONE.display}
          </a>


          <div className="mt-6 space-y-3">
            <input required name="company" placeholder="Фирма" className={inputClass} />
            <input required name="name" placeholder="Лице за контакт" className={inputClass} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input required name="phone" placeholder="Телефон" className={inputClass} />
              <input type="email" name="email" placeholder="Имейл" className={inputClass} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="people" placeholder="Брой работници" className={inputClass} />
              <input name="city" placeholder="Град / обект" className={inputClass} />
            </div>
            <textarea
              name="details"
              rows={3}
              placeholder="Кратко описание на дейността"
              className={textareaClass}
            />
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input required type="checkbox" name="gdpr" className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]" />
              <span>Съгласен/на съм данните ми да бъдат обработвани съгласно <a href="/poveritelnost" className="text-foreground underline underline-offset-4">политиката за поверителност</a>.</span>
            </label>
          </div>

          <MagneticButton
            type="submit"
            disabled={company.sending}
            label={company.sending ? "Изпращане..." : "Изпратете заявка"}
            className="mt-6 flex w-full items-center justify-center rounded-[6px] bg-primary px-6 py-4 font-display text-sm font-bold  text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
          />
        </form>

        <form onSubmit={candidate.onSubmit} id="kandidati" className="relative rounded-[30px] bg-background p-7 lg:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <h3 className="text-2xl">За кандидати</h3>
            <span className="manifest-label">Кандидатствай за работа</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Кандидатствайте сега. Плащането е навреме и всичко е по договор.
          </p>


          <div className="mt-6 space-y-3">
            <input required name="name" placeholder="Име и фамилия" className={inputClass} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input required name="phone" placeholder="Телефон" className={inputClass} />
              <input name="city" placeholder="Град" className={inputClass} />
            </div>
            <select
              key={presetSector}
              name="sector"
              className={inputClass}
              defaultValue={presetSector}
            >
              <option value="" disabled>
                Желана сфера
              </option>
              {SECTORS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <textarea
              name="experience"
              rows={3}
              placeholder={search.listing ? `Кандидатура за: ${search.listing}` : "Опит (по желание)"}
              defaultValue={search.listing ? `Кандидатствам за: ${search.listing}` : undefined}
              className={textareaClass}
            />

            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input required type="checkbox" name="gdpr" className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]" />
              <span>Съгласен/на съм данните ми да бъдат обработвани съгласно <a href="/poveritelnost" className="text-foreground underline underline-offset-4">политиката за поверителност</a>.</span>
            </label>
          </div>

          <MagneticButton
            type="submit"
            disabled={candidate.sending}
            label={candidate.sending ? "Изпращане..." : "Изпрати кандидатура"}
            className="mt-6 flex w-full items-center justify-center rounded-[6px] border border-foreground px-6 py-4 font-display text-sm font-bold  text-foreground transition-colors hover:border-move hover:bg-move hover:text-move-foreground disabled:opacity-60"
          />
          {candidate.status === "ok" && (
            <p role="status" className="mt-4 rounded-[6px] border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground">Благодарим! Ще се свържем с вас.</p>
          )}
          {candidate.status === "error" && (
            <p role="alert" className="mt-4 rounded-[6px] border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
              Не успяхме да изпратим. Обадете се на <a href={`tel:${WORKERS_PHONE.tel}`} className="underline underline-offset-4">{WORKERS_PHONE.display}</a>.
            </p>
          )}
          <p className="manifest-label mt-4 block">
            Трудов договор, осигуровки и коректно заплащане.
          </p>
        </form>
      </div>
    </section>
  );
}
