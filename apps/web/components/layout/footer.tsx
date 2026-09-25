import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type FooterProps = Readonly<{ locale: Locale }>;

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <footer className="bg-[var(--dso-ink)] text-white">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.3fr_0.7fr_1fr] md:py-20">
        <div>
          <Link href={`/${locale}`} aria-label="DSO home">
            <Image
              src="/brand/logo.png"
              alt="Dux Stellae Orientis"
              width={574}
              height={534}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">{t("tagline")}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--dso-red-text)]">
            {t("office")}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <Link className="transition hover:text-white" href={`/${locale}/tentang`}>
              {nav("about")}
            </Link>
            <Link className="transition hover:text-white" href={`/${locale}/layanan`}>
              {nav("services")}
            </Link>
            <Link className="transition hover:text-white" href={`/${locale}/teknologi`}>
              {nav("technology")}
            </Link>
            <Link className="transition hover:text-white" href={`/${locale}/kontak`}>
              {nav("contact")}
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Contact</p>
          <div className="mt-5 grid gap-4 text-sm text-white/65">
            <a className="flex gap-3 transition hover:text-white" href="tel:+62818801120">
              <Phone size={17} className="mt-0.5 text-[var(--dso-red-bright)]" aria-hidden="true" />
              +62 818 801120
            </a>
            <a className="flex gap-3 transition hover:text-white" href="mailto:cs@stellaeorientis.co.id">
              <Mail size={17} className="mt-0.5 text-[var(--dso-red-bright)]" aria-hidden="true" />
              cs@stellaeorientis.co.id
            </a>
            <div className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--dso-red-bright)]" aria-hidden="true" />
              Jakarta Selatan and Bekasi
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2" aria-label="Website by Rulimenaproject">
              <svg className="h-7 w-7 text-[var(--dso-red-bright)]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M16 2 19.3 12.7 30 16l-10.7 3.3L16 30l-3.3-10.7L2 16l10.7-3.3L16 2Z" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="16" cy="16" r="3" fill="currentColor" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/50">by</span>
                <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white">Rulimenaproject</span>
              </span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link className="hover:text-white" href={`/${locale}/privasi`}>{t("privacy")}</Link>
            <Link className="hover:text-white" href={`/${locale}/syarat`}>{t("terms")}</Link>
            <a className="inline-flex items-center gap-1 hover:text-white" href="#top">
              Top <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
