import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Phone, ShieldCheck, UserSearch, Users } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { Process, processImages, type ProcessStep } from "@/components/site/Process";
import { ParallaxImage, SafeReveal as Reveal } from "@/components/site/motion-kit";
import { SectionDots } from "@/components/site/SectionDots";
import { ParticleField } from "@/components/site/ParticleField";
import heroImg from "@/assets/hero-crew.jpg";
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

type LicenseRow = { label: string; value: string };
type License = {
  title: string;
  rows?: LicenseRow[];
  description?: string;
  number?: string;
  // Optional: set only with the redacted scan (personal data and signature hidden).
  imageSrc?: string;
  imageCaption?: string;
};
const LICENSE_IMAGE_CAPTION = "Копие на удостоверението (личните данни и подписът са скрити)";
// Text only: the certificate scan contains private data, so never add imageSrc for it.
const LICENSES: License[] = [
  {
    title: "Регистрация за посредническа дейност по наемане на работа",
    rows: [
      { label: "Издаден от", value: "Министерство на труда и социалната политика" },
      {
        label: "Правно основание",
        value:
          "чл. 28, ал. 5 от Закона за насърчаване на заетостта и Наредбата за условията и реда за извършване на посредническа дейност по наемане на работа",
      },
      { label: "Регистрационен номер", value: "№ 4055 / 16.02.2026 г." },
      { label: "Валидност", value: "безсрочна" },
      { label: "Дружество", value: "Стобот ЕйчАр ЕООД, ЕИК 208648435, гр. София" },
      {
        label: "Посреднически услуги",
        value:
          "(1) информиране и консултиране на търсещи работа лица и на работодатели; (2) насочване и подпомагане за започване на работа, включително в друго населено място в страната или в други държави.",
      },
    ],
  },
];

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

const DOTS = [
  { id: "top", label: "Начало" },
  { id: "za-kogo", label: "За кого е" },
  { id: "darzhavi", label: "Държави и позиции" },
  { id: "kak-proticha", label: "Как протича" },
  { id: "registratsii", label: "Регистрации" },
  { id: "zapitvane", label: "Запитване" },
  { id: "vaprosi", label: "Въпроси" },
];

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
    <main className="overflow-x-clip">
      <Nav />

      <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-border pb-14 pt-28 lg:pb-20 lg:pt-32">
        <ParallaxImage
          src={heroImg}
          alt="Екип от работници на индустриален обект"
          width={1600}
          height={1100}
          distance={50}
          direction="up"
          wrapperClassName="absolute inset-0 -z-20"
          className="h-[115%] w-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(100deg, #130F3Ee6 15%, #130F3E99 60%, #130F3E59)" }}
        />
        <ParticleField className="-z-10 opacity-80" />
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
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
        </div>
      </section>

      <section id="za-kogo" className="scroll-mt-20 border-b border-border py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-[2rem] sm:text-5xl">За кого е</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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

      <section id="darzhavi" className="scroll-mt-20 border-b border-border py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:px-8">
          <ChipRow heading="Държави, от които подбираме" items={COUNTRIES} more="и други държави" note="Не виждате вашата държава? Попитайте — разглеждаме и други." />
          <ChipRow heading="За какви позиции" items={POSITIONS} more="и др." note="Подбираме според изискванията на вашата позиция." />
        </div>
      </section>

      <Process
        id="kak-proticha"
        heading="Как протича"
        steps={steps}
        footnote="Сроковете зависят от компетентните институции и не могат да бъдат гарантирани предварително."
      />

      {LICENSES.length > 0 && <Licenses items={LICENSES} />}

      <section id="zapitvane" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 lg:px-8 lg:py-20">
        <form onSubmit={form.onSubmit} className="max-w-3xl rounded-[32px] border border-border bg-background p-6 sm:p-10">
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
              <span>Съгласен/на съм данните ми да бъдат обработвани за целите на запитването съгласно <a href="/poveritelnost" className="text-foreground underline underline-offset-4">политиката за поверителност</a>.</span>
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

      <section className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <a href={`tel:${CLIENTS_PHONE.tel}`} className={`${primaryBtn} inline-flex text-base`}>
            <Phone className="h-4 w-4" /> Обадете се: {CLIENTS_PHONE.display}
          </a>
        </div>
      </section>

      <section id="vaprosi" className="mx-auto max-w-7xl scroll-mt-20 border-t border-border px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-[2rem] sm:text-5xl">Често задавани въпроси</h2>
        <Accordion type="single" collapsible className="mt-8 max-w-3xl space-y-3">
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="rounded-[28px] border border-border px-6">
              <AccordionTrigger className="text-left text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
      <SectionDots sections={DOTS} />
      <FloatingContact />
    </main>
  );
}

function ChipRow({ heading, items, more, note }: { heading: string; items: string[]; more: string; note: string }) {
  return (
    <div>
      <h2 className="text-[2rem] sm:text-5xl">{heading}</h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {items.map((c) => <li key={c} className={chip}>{c}</li>)}
        <li className={mutedChip}>{more}</li>
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">{note}</p>
    </div>
  );
}

function Licenses({ items }: { items: License[] }) {
  return (
    <section id="registratsii" className="mx-auto max-w-7xl scroll-mt-20 border-b border-border px-5 py-14 lg:px-8 lg:py-20">
      <h2 className="text-[2rem] sm:text-5xl">Регистрации и удостоверения</h2>
      <ul className="mt-8 flex flex-wrap gap-4">
        {items.map((l) => (
          <li key={l.title} className="glass-panel flex max-w-3xl items-start gap-4 rounded-[28px] border border-border p-5 text-left sm:p-6">
            {!l.imageSrc && (
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/15">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </span>
            )}
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
                  <p className="mt-3 text-center text-xs text-muted-foreground">{l.imageCaption ?? LICENSE_IMAGE_CAPTION}</p>
                </DialogContent>
              </Dialog>
            )}
            <div className="min-w-0 text-sm leading-relaxed">
              <p className="text-base font-semibold">{l.title}</p>
              {l.number && <p className="mt-1 font-mono text-primary">{l.number}</p>}
              {l.description && <p className="mt-2 text-muted-foreground">{l.description}</p>}
              {l.rows && l.rows.length > 0 && (
                <dl className="mt-4 grid gap-x-8 gap-y-3 border-t border-border pt-4 sm:grid-cols-[10.5rem_1fr]">
                  {l.rows.map((r) => (
                    <div key={r.label} className="sm:contents">
                      <dt className="text-xs font-medium text-muted-foreground">{r.label}</dt>
                      <dd className="m-0 text-sm text-foreground">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {l.imageSrc && (
                <p className="mt-3 text-xs text-muted-foreground">{l.imageCaption ?? LICENSE_IMAGE_CAPTION}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
