import { cn } from "@/lib/utils";

type SectionHeaderProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}>;

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className={cn("eyebrow", light && "eyebrow-light")}>{eyebrow}</span>
      <h2
        className={cn(
          "display-heading mt-5 text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.8rem]",
          light ? "text-white" : "text-[var(--dso-ink)]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-7", light ? "text-white/60" : "text-[var(--dso-muted)]")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
