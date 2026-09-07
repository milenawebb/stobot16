import type { ReactNode } from "react";
import { RevealWords } from "./motion-kit";

export function SectionHead({
  index,
  label,
  title,
  lead,
  tone = "dark",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "paper";
}) {
  const rule = tone === "paper" ? "bg-paper-foreground/20" : "bg-line/35";
  const headingClass = "mt-5 text-[2rem] leading-[0.95] sm:text-5xl lg:text-6xl";
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="manifest-label">{index}</span>
        <span className={`h-px w-8 ${rule}`} aria-hidden="true" />
        <span className="manifest-label">{label}</span>
      </div>
      {typeof title === "string" ? (
        <RevealWords text={title} className={headingClass} />
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}
      {lead ? (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed ${
            tone === "paper" ? "text-paper-foreground/70" : "text-muted-foreground"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
