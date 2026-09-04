import { useState, type FormEvent } from "react";
import { Building2, UserRound, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

const inputClass =
  "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function useFakeSubmit(message: string) {
  const [sending, setSending] = useState(false);
  return {
    sending,
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSending(true);
      setTimeout(() => {
        setSending(false);
        (e.target as HTMLFormElement).reset();
        toast.success(message);
      }, 700);
    },
  };
}

export function Forms() {
  const company = useFakeSubmit("Заявката е изпратена. Ще се свържем с вас до 24 часа.");
  const candidate = useFakeSubmit("Кандидатурата е изпратена. Очаквайте обаждане.");

  return (
    <section id="kontakti" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Контакт</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Два пътя — изберете вашия</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal id="zayavka">
          <form
            onSubmit={company.onSubmit}
            className="surface-card h-full border-primary/30 p-7 lg:p-9"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-accent)]">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold">За фирми</h3>
                <p className="text-sm text-muted-foreground">Заявка за персонал</p>
              </div>
            </div>

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
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={company.sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {company.sending ? "Изпращане..." : "Изпратете заявка"}
            </button>
          </form>
        </Reveal>

        <Reveal id="kandidati" delay={120}>
          <form onSubmit={candidate.onSubmit} className="surface-card h-full p-7 lg:p-9">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary">
                <UserRound className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold">За кандидати</h3>
                <p className="text-sm text-muted-foreground">Кандидатствай за работа</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <input required name="name" placeholder="Име и фамилия" className={inputClass} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input required name="phone" placeholder="Телефон" className={inputClass} />
                <input name="city" placeholder="Град" className={inputClass} />
              </div>
              <select name="sector" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Желана сфера
                </option>
                <option>Строителство</option>
                <option>Производство</option>
                <option>Склад и логистика</option>
                <option>ХоРеКа</option>
                <option>Хамалски услуги</option>
              </select>
              <textarea
                name="experience"
                rows={3}
                placeholder="Опит (по желание)"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={candidate.sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-bold transition-colors hover:bg-surface-2 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {candidate.sending ? "Изпращане..." : "Изпрати кандидатура"}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              Placeholder: трудов договор, осигуровки и коректно заплащане.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
