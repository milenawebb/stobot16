import { useState } from "react";
import { SectionHead } from "./SectionHead";

const industries = [
  "Складове и логистика",
  "Производство",
  "Строителство",
  "Опаковане",
  "HoReCa",
  "Почистване",
];

const volumes = ["1 до 5 души", "6 до 15 души", "16 до 40 души", "40+ души"];

const skills = ["Без опит", "Складов работник", "Оператор на машина", "Хамалски дейности", "Шофьор"];
const cities = ["София", "Пловдив", "Варна", "Бургас", "Стара Загора"];

const hiring: Record<string, string[]> = {
  "Без опит": ["Опаковане", "Складове и логистика", "Почистване"],
  "Складов работник": ["Складове и логистика", "Производство"],
  "Оператор на машина": ["Производство", "Опаковане"],
  "Хамалски дейности": ["Премествания", "Транспорт"],
  Шофьор: ["Транспорт", "Логистика"],
};

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="manifest-label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none rounded-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function QuickMatch() {
  const [tab, setTab] = useState<"company" | "candidate">("company");
  const [industry, setIndustry] = useState(industries[0]!);
  const [volume, setVolume] = useState(volumes[0]!);
  const [skill, setSkill] = useState(skills[0]!);
  const [city, setCity] = useState(cities[0]!);

  const openSectors = hiring[skill] ?? [];

  return (
    <section id="match" className="relative overflow-hidden border-b border-border py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          index="07"
          label="Бърза проверка"
          title="Проверете за 10 секунди"
          lead="Изберете параметри и вижте ориентировъчен отговор. Отнема 10 секунди и не изисква обаждане или регистрация."
        />

        <div className="mt-12 grid gap-px rounded-[32px] border border-border bg-border lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] bg-background p-6 lg:p-8">
            <div className="flex overflow-hidden rounded-full border border-border">
              {(
                [
                  ["company", "За фирми"],
                  ["candidate", "За кандидати"],
                ] as const
              ).map(([key, text]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  aria-pressed={tab === key}
                  className={`flex-1 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    tab === key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              {tab === "company" ? (
                <>
                  <Field label="Бранш" value={industry} options={industries} onChange={setIndustry} />
                  <Field label="Брой хора" value={volume} options={volumes} onChange={setVolume} />
                </>
              ) : (
                <>
                  <Field label="Умения" value={skill} options={skills} onChange={setSkill} />
                  <Field label="Град" value={city} options={cities} onChange={setCity} />
                </>
              )}
            </div>
          </div>

          <div className="rounded-[30px] bg-secondary p-6 lg:p-8">
            <span className="manifest-label">Резултат</span>
            {tab === "company" ? (
              <div className="mt-6">
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Ориентировъчно време за първо предложение на екип за{" "}
                  <span className="text-foreground">{industry.toLowerCase()}</span>, {volume}.
                </p>
                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Договор", "Трудов, с осигуровки"],
                    ["Застраховка", "Включена"],
                    ["Заместване", "До 24 часа"],
                    ["Фактуриране", "Месечно"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-[22px] border border-border bg-transparent p-4"
                    >
                      <dt className="manifest-label">{k}</dt>
                      <dd className="mt-2 text-sm text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <div className="mt-6">
                <p className="font-display text-3xl font-bold leading-tight lg:text-4xl">
                  Свободни позиции в {city}
                </p>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {openSectors.map((s) => (
                    <li key={s} className="flex items-center justify-between py-4">
                      <span className="text-base">{s}</span>
                      <span className="manifest-label text-primary">набира</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Данните са примерни. Изпратете кратко заявление и ще се свържем с вас.
                </p>
                <a
                  href="#kandidati"
                  className="mt-6 inline-block rounded-full border border-primary bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                >
                  Кандидатствай
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
