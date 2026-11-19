import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Phone, UserSearch, Users } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { Process, processImages, type ProcessStep } from "@/components/site/Process";
import { Reveal } from "@/components/site/motion-kit";
import { MagneticButton } from "@/components/site/kinetic";
import { inputClass, textareaClass, useCompanySubmit } from "@/components/site/Forms";
import { STAFFING_SECTORS } from "@/lib/sectors";
import { CLIENTS_PHONE } from "@/lib/contact";

const URL = "https://stobot16.lovable.app/stobot-hr";
const title = "Stobot HR — работници от трети страни | stobot 16";
const description =
  "Stobot HR: организираме подбора и документите за работници от трети страни заедно с вашата фирма, стъпка по стъпка и в рамките на действащата нормативна уредба.";

// Fill in the real license numbers from the client before launch.
const LICENSES: { name: string; number: string }[] = [];

const audience = [
  { icon: UserSearch, title: "Липса на кадри на местния пазар" },
  { icon: CalendarClock, title: "Сезонни и пикови нужди" },
  { icon: Users, title: "Дългосрочно попълване на екипи" },
];

const steps: ProcessStep[] = [
  { number: "01", title: "Запитване и нужди", body: "Уточняваме позиции, брой хора и изисквания.", image: processImages.coordinatorPhoto },
  { number: "02", title: "Подбор", body: "Подбираме кандидати според вашите изисквания.", image: processImages.trainingPhoto },
  { number: "03", title: "Документи", body: "Подготвяме необходимите документи и съдействаме при процедурите пред компетентните институции.", image: processImages.contractsPhoto },
  { number: "04", title: "Пристигане и въвеждане", body: "Посрещаме и въвеждаме хората на обекта.", image: processImages.crewPhoto },
  { number: "05", title: "Работа по договор", body: "Работят по трудов договор при спазване на българското трудово законодателство.", image: processImages.supervisionPhoto },
];

export const Route = createFileRoute("/stobot-hr")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ForeignWorkersPage,
});

const primaryBtn =
  "flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground hover:text-background";
const ghostBtn =
  "flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 font-mono text-sm text-foreground transition-colors hover:border-primary";

function ForeignWorkersPage() {
  const form = useCompanySubmit("chuzhbina");
  const fieldClass = inputClass.replace("rounded-[6px]", "rounded-full");
  return (
    <main className="overflow-x-hidden">
      <Nav />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <Reveal>
          <span className="mb-5 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-sm font-bold text-primary">
            Stobot HR
          </span>
        </Reveal>
        <Reveal>
          <h1 className="max-w-4xl text-[2.25rem] leading-[0.95] sm:text-6xl lg:text-7xl">
            Работници от трети страни. Процесът — по закона.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Ако не намирате хора на местния пазар, организираме подбора и документите заедно с вас — стъпка по стъпка и в рамките на действащата нормативна уредба.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#zapitvane" className={primaryBtn}>Изпратете запитване</a>
            <a href={`tel:${CLIENTS_PHONE.tel}`} className={ghostBtn}>
              <Phone className="h-4 w-4 text-primary" /> {CLIENTS_PHONE.display}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-[2rem] sm:text-5xl">За кого е</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {audience.map(({ icon: Icon, title: t }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="glass-panel h-full rounded-[32px] border border-border p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process
        id="kak-proticha"
        heading="Как протича"
        steps={steps}
        footnote="Сроковете зависят от компетентните институции и не могат да бъдат гарантирани предварително."
      />

      {LICENSES.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="text-[2rem] sm:text-5xl">Лицензи и регистрации</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {LICENSES.map((l) => (
              <li key={l.number} className="rounded-full border border-border px-5 py-2.5 text-sm">
                {l.name}: <span className="font-mono">{l.number}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
        <form id="zapitvane" onSubmit={form.onSubmit} className="scroll-mt-28 rounded-[32px] border border-border bg-background p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl">Запитване от фирма</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Опишете нуждите си и ще се свържем с вас до 24 часа.
          </p>
          <div className="mt-6 space-y-3">
            <input required name="company" maxLength={200} placeholder="Фирма" className={fieldClass} />
            <input required name="name" maxLength={200} placeholder="Лице за контакт" className={fieldClass} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input required name="phone" type="tel" maxLength={40} placeholder="Телефон" className={fieldClass} />
              <input required name="email" type="email" maxLength={255} placeholder="Имейл" className={fieldClass} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select required name="sector" defaultValue="" className={fieldClass}>
                <option value="" disabled>Сектор</option>
                {STAFFING_SECTORS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <input required name="people" type="number" min={1} max={10000} placeholder="Брой работници" className={fieldClass} />
            </div>
            <textarea name="details" rows={3} maxLength={2000} placeholder="Кратко съобщение" className={textareaClass} />
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input required type="checkbox" name="gdpr" className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]" />
              <span>Съгласен/на съм данните ми да бъдат обработвани за целите на запитването съгласно GDPR.</span>
            </label>
          </div>
          <MagneticButton
            type="submit"
            disabled={form.sending}
            label={form.sending ? "Изпращане..." : "Изпратете запитване"}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
          />
        </form>
      </section>

      <section className="border-t border-border px-5 py-16 text-center">
        <a href={`tel:${CLIENTS_PHONE.tel}`} className={`${primaryBtn} mx-auto inline-flex text-base`}>
          <Phone className="h-4 w-4" /> Обадете се: {CLIENTS_PHONE.display}
        </a>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
