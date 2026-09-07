import { useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { MagneticButton } from "./kinetic";
import { SECTORS } from "@/lib/sectors";


const inputClass =
  "rounded-xl w-full border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-surface";

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
  const search = useSearch({ strict: false }) as { sector?: string };
  const company = useFakeSubmit("Заявката е изпратена. Ще се свържем с вас до 24 часа.");
  const candidate = useFakeSubmit("Кандидатурата е изпратена. Очаквайте обаждане.");
  const presetSector = search.sector && SECTORS.includes(search.sector as never) ? search.sector : "";


  return (
    <section id="kontakti" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex items-center gap-3">
        <span className="manifest-label">10</span>
        <span className="h-px w-8 bg-line/35" aria-hidden="true" />
        <span className="manifest-label">Последна спирка</span>
      </div>
      <h2 className="mt-5 max-w-3xl text-[2rem] sm:text-5xl lg:text-6xl">
        Два пътя. Изберете вашия.
      </h2>

      <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-2">
        <form onSubmit={company.onSubmit} id="zayavka" className="bg-background p-7 lg:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <h3 className="text-2xl">За фирми</h3>
            <span className="manifest-label">Заявка за персонал</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Кажете ни от какво имате нужда — отговаряме до 24 часа.
          </p>


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

          <MagneticButton
            type="submit"
            disabled={company.sending}
            label={company.sending ? "Изпращане..." : "Изпратете заявка"}
            className="mt-6 flex w-full items-center justify-center bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
          />
        </form>

        <form onSubmit={candidate.onSubmit} id="kandidati" className="bg-background p-7 lg:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <h3 className="text-2xl">За кандидати</h3>
            <span className="manifest-label">Кандидатствай за работа</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Кандидатствайте сега — плащане на време, всичко по договор.
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
              placeholder="Опит (по желание)"
              className={inputClass}
            />
          </div>

          <MagneticButton
            type="submit"
            disabled={candidate.sending}
            label={candidate.sending ? "Изпращане..." : "Изпрати кандидатура"}
            className="mt-6 flex w-full items-center justify-center border border-foreground px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:border-move hover:bg-move hover:text-move-foreground disabled:opacity-60"
          />
          <p className="manifest-label mt-4 block">
            Трудов договор, осигуровки и коректно заплащане.
          </p>
        </form>
      </div>
    </section>
  );
}
