import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { listActiveListings } from "@/lib/listings.functions";
import { PHONE_TEL } from "@/lib/contact";

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

function matchesSector(listingSector: string, selectedSector: string) {
  const listing = listingSector.toLocaleLowerCase("bg");
  const selected = selectedSector.toLocaleLowerCase("bg");
  return listing.includes(selected) || selected.includes(listing);
}

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
        className="mt-2 w-full appearance-none rounded-[6px] border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
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
  const { data: listings = [], isPending } = useQuery({
    queryKey: ["quick-match-listings"],
    queryFn: () => listActiveListings(),
  });
  const candidateSectors = hiring[skill] ?? [];
  const matches = listings.filter((listing) => {
    if (tab === "company") return matchesSector(listing.sector, industry);
    const cityMatches = listing.location.toLocaleLowerCase("bg").includes(city.toLocaleLowerCase("bg"));
    return cityMatches && candidateSectors.some((sector) => matchesSector(listing.sector, sector));
  });
  const resultSector = tab === "company" ? industry : skill;

  return (
    <section id="match" className="relative overflow-hidden border-b border-border py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          index="07"
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
            <div className="mt-6">
              {isPending ? (
                <p className="text-sm text-muted-foreground">Проверяваме активните обяви...</p>
              ) : matches.length > 0 ? (
                <>
                  <p className="font-display text-3xl font-bold leading-tight lg:text-4xl">
                    В момента имаме {matches.length} {matches.length === 1 ? "отворена позиция" : "отворени позиции"}
                    {tab === "candidate" ? ` в ${city}` : ` в ${resultSector.toLowerCase()}`}.
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Това са реалните активни обяви към момента.
                  </p>
                  <Link
                    to="/obiavi"
                    search={{ sector: matches[0]?.sector }}
                    className="mt-6 inline-block rounded-[6px] border border-primary bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                  >
                    Виж обявите
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-display text-3xl font-bold leading-tight lg:text-4xl">
                    В момента няма отворени позиции в този сектор.
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Обадете се. Възможно е да имаме подходяща позиция, която още не е публикувана.
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-[6px] border border-primary bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                  >
                    <Phone className="h-4 w-4" /> Обади се сега
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
