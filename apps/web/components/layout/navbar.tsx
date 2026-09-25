import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type NavbarProps = Readonly<{ locale: Locale }>;

export async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const otherLocale = locale === "id" ? "en" : "id";
  const links = [
    { href: `/${locale}/tentang`, label: t("about") },
    { href: `/${locale}/layanan`, label: t("services") },
    { href: `/${locale}/teknologi`, label: t("technology") },
    { href: `/${locale}/jangkauan`, label: t("coverage") },
    { href: `/${locale}/karier`, label: t("careers") },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="container-shell flex h-20 items-center justify-between gap-8">
        <Link href={`/${locale}`} className="shrink-0" aria-label="DSO home">
          <Image
            src="/brand/logo.png"
            alt="Dux Stellae Orientis"
            width={574}
            height={534}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={`/${otherLocale}`}
            className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold tracking-widest text-white/70 transition hover:border-white/40 hover:text-white"
            aria-label={`Switch language to ${otherLocale}`}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/kontak`}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            {t("request")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/20 text-white [&::-webkit-details-marker]:hidden">
            <Menu size={20} aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </summary>
          <div className="absolute right-0 top-14 w-64 rounded-2xl border border-white/10 bg-[var(--dso-charcoal)] p-3 shadow-2xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
              <Link
                href={`/${otherLocale}`}
                className="rounded-lg px-3 py-2 text-xs font-bold tracking-widest text-white/70"
              >
                {otherLocale.toUpperCase()}
              </Link>
              <Link
                href={`/${locale}/kontak`}
                className={cn(buttonVariants({ variant: "primary", size: "sm" }), "flex-1")}
              >
                {t("request")}
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
