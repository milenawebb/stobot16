import type { ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  id,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      id={id}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
