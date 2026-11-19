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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const URL = "https://stobot16.lovable.app/stobot-hr";
const title = "Stobot HR — работници от трети страни | stobot 16";
const description =
  "Stobot HR: организираме подбора и документите за работници от Турция, Индия, Пакистан, Филипини, Украйна, Виетнам и други трети страни, заедно с вашата фирма и по закона.";
const keywords =
  "Stobot HR, работници от трети страни, работници от Турция, работници от Индия, работници от Пакистан, работници от Филипини, работници от Украйна, работници от Виетнам";

type License = { title: string; description?: string; number?: string; imageSrc?: string };
// Empty for now: the client's certificate image will be uploaded and added here in a follow-up.
const LICENSES: License[] = [];

const COUNTRIES = ["Турция", "Индия", "Пакистан", "Филипини", "Украйна", "Виетнам"];
const POSITIONS = ["Складови работници", "Товарене и разтоварване", "Шофьори", "Работници в производство", "Общи работници"];

const FAQ = [
  { q: "От кои държави подбирате работници?", a: "Подбираме работници от Турция, Индия, Пакистан, Филипини, Украйна, Виетнам и други държави. Ако не виждате вашата, попитайте — разглеждаме и други." },
  { q: "За какви позиции?", a: "Складови работници, товарене и разтоварване, шофьори, работници в производство, общи работници и други. Подбираме според изискванията на вашата позиция." },
  { q: "Колко време отнема процесът?", a: "Сроковете зависят от компетентните институции и не могат да бъдат гарантирани предварително." },
  { q: "Как да изпратя запитване?", a: `Попълнете формата за запитване на тази страница или се обадете на ${CLIENTS_PHONE.display}.` },
];

const chip = "rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm text-foreground";
const mutedChip = "rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted-foreground";

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
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
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

      <ChipSection heading="Държави, от които подбираме" items={COUNTRIES} more="и други държави" note="Не виждате вашата държава? Попитайте — разглеждаме и други." />
      <ChipSection heading="За какви позиции" items={POSITIONS} more="и др." note="Подбираме според изискванията на вашата позиция." bordered />

      <Process
        id="kak-proticha"
        heading="Как протича"
        steps={steps}
        footnote="Сроковете зависят от компетентните институции и не могат да бъдат гарантирани предварително."
      />

      {LICENSES.length > 0 && <Licenses items={LICENSES} />}

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

      <section className="mx-auto max-w-3xl px-5 pb-16 lg:pb-24">
        <h2 className="text-[2rem] sm:text-5xl">Често задавани въпроси</h2>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="rounded-[28px] border border-border px-6">
              <AccordionTrigger className="text-left text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}

function ChipSection({ heading, items, more, note, bordered }: { heading: string; items: string[]; more: string; note: string; bordered?: boolean }) {
  return (
    <section className={bordered ? "border-b border-border py-16 lg:py-24" : "py-16 lg:py-24"}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-[2rem] sm:text-5xl">{heading}</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {items.map((c) => <li key={c} className={chip}>{c}</li>)}
          <li className={mutedChip}>{more}</li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}

function Licenses({ items }: { items: License[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <h2 className="text-[2rem] sm:text-5xl">Лицензи и регистрации</h2>
      <ul className="mt-8 flex flex-wrap gap-4">
        {items.map((l) => (
          <li key={l.title} className="glass-panel flex max-w-sm items-center gap-4 rounded-[28px] border border-border p-4">
            {l.imageSrc && (
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" aria-label={`Виж ${l.title}`} className="shrink-0 overflow-hidden rounded-2xl border border-border transition-colors hover:border-primary">
                    <img src={l.imageSrc} alt={l.title} loading="lazy" className="h-20 w-16 object-cover" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl rounded-[28px] p-4">
                  <DialogTitle className="sr-only">{l.title}</DialogTitle>
                  <img src={l.imageSrc} alt={l.title} className="max-h-[80vh] w-full rounded-2xl object-contain" />
                </DialogContent>
              </Dialog>
            )}
            <div className="text-sm">
              <p className="font-semibold">{l.title}</p>
              {l.description && <p className="mt-1 text-muted-foreground">{l.description}</p>}
              {l.number && <p className="mt-1 font-mono">{l.number}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
