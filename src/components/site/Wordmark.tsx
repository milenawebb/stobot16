import { cn } from "@/lib/utils";

type WordmarkProps = {
  /** "light" = white lockup for indigo/graphite backgrounds, "dark" = indigo lockup for white. */
  tone?: "light" | "dark";
  className?: string;
  /** Tailwind text size class driving the whole lockup. */
  size?: string;
};

export function Wordmark({
  tone = "light",
  className,
  size = "text-2xl",
}: WordmarkProps) {
  const light = tone === "light";

  return (
    // safe area ≈ half the circle diameter on all sides
    <span
      className={cn("inline-flex items-start p-[0.3em]", size, className)}
      aria-label="stobot 16"
    >
      <span
        className={cn(
          "font-display font-extrabold leading-none tracking-[-0.03em]",
          light ? "text-white" : "text-[#130F3E]",
        )}
      >
        stobot
      </span>
      <span
        className={cn(
          "-ml-[0.06em] grid aspect-square w-[0.58em] shrink-0 -translate-y-[0.12em] place-items-center rounded-full",
          light ? "bg-white" : "bg-[#130F3E]",
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "numeral text-[0.3em] leading-none",
            light ? "text-[#130F3E]" : "text-white",
          )}
        >
          16
        </span>
      </span>
    </span>
  );
}
