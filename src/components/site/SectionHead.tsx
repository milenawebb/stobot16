import type { ReactNode } from "react";
import { Reveal, RevealWords } from "./motion-kit";

export function SectionHead({
  index,
  label,
  title,
  lead,
  tone = "dark",
}: {
  index: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "paper";
}) {
  const headingClass = `${label ? "mt-5 " : ""}text-[2rem] leading-[0.95] sm:text-5xl lg:text-6xl`;
  return (
    <div className="max-w-3xl">
      {label ? (
        <div className="flex items-center gap-3">
          <span className="manifest-label">{label}</span>
        </div>
      ) : null}
      {typeof title === "string" ? (
        <RevealWords text={title} className={headingClass} />
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}
      {lead ? (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 max-w-xl text-base leading-relaxed ${
              tone === "paper" ? "text-paper-foreground/70" : "text-muted-foreground"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
