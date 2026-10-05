import { ArrowUpRight, Building2 } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { localize, industries } from "@/lib/site-content";
import { getPageMetadata } from "@/lib/seo";

type IndustriesPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: IndustriesPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  return getPageMetadata(typedLocale, "industri", "industries");
}

export default async function IndustriesPage({ params }: IndustriesPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.industries" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Sektor yang dilayani" : "Sectors we support"} title={id ? "Dibangun untuk konteks bisnis yang beragam." : "Built for varied business contexts."} description={id ? "Pendekatan dan cakupan kerja disesuaikan dengan kebutuhan proses, regulasi, dan target operasional klien." : "Our approach and scope adapt to each client's processes, regulatory context, and operational goals."} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <article key={industry.id} className="group rounded-2xl border border-[var(--dso-line)] bg-white p-7 transition hover:-translate-y-1 hover:border-[var(--dso-red)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--dso-mist)] text-[var(--dso-red)]"><Building2 size={20} aria-hidden="true" /></div>
                  <span className="text-xs font-bold tracking-[0.2em] text-black/60">0{index + 1}</span>
                </div>
                <h2 className="mt-9 font-display text-lg font-bold">{localize(industry, typedLocale)}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--dso-muted)]">{id ? "Dukungan operasional yang terstruktur dan dapat disesuaikan." : "Structured operational support shaped around the need."}</p>
              </article>
            ))}
          </div>
          <Link href={`/${typedLocale}/kontak`} className="mt-10 inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--dso-red)]">
            {id ? "Diskusikan kebutuhan Anda" : "Discuss your needs"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
