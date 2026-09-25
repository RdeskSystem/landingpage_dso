import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ServiceCardProps = Readonly<{
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  tone?: "paper" | "dark";
  linkLabel: string;
}>;

export function ServiceCard({
  icon: Icon,
  title,
  description,
  bullets,
  href,
  tone = "paper",
  linkLabel,
}: ServiceCardProps) {
  const dark = tone === "dark";

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-card)] border p-7 transition duration-300 hover:-translate-y-1",
        dark
          ? "border-white/10 bg-[var(--dso-charcoal)] text-white hover:border-[var(--dso-red-bright)]"
          : "border-[var(--dso-line)] bg-white hover:border-[var(--dso-red)] hover:shadow-[0_18px_50px_rgba(11,11,13,0.08)]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            dark ? "bg-[var(--dso-red)] text-white" : "bg-[var(--dso-mist)] text-[var(--dso-red)]",
          )}
        >
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <span className={cn("text-xs font-bold tracking-widest", dark ? "text-white/70" : "text-black/60")}>DSO</span>
      </div>
      <h2 className={cn("display-heading mt-7 text-xl font-bold", dark ? "text-white" : "text-[var(--dso-ink)]")}>{title}</h2>
      <p className={cn("mt-3 text-sm leading-6", dark ? "text-white/55" : "text-[var(--dso-muted)]")}>{description}</p>
      <ul className={cn("mt-6 grid gap-3 border-t pt-5 text-sm", dark ? "border-white/10 text-white/65" : "border-[var(--dso-line)] text-[var(--dso-muted)]")}>
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--dso-red)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={cn("mt-auto flex items-center gap-2 pt-8 text-sm font-bold", dark ? "text-white" : "text-[var(--dso-ink)]")}
      >
        {linkLabel}
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
