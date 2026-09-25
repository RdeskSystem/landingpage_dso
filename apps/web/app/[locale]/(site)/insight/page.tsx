import { BookOpenText, LockKeyhole } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { routing, type Locale } from "@/i18n/routing";

type InsightPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export default async function InsightPage({ params }: InsightPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.insight" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--dso-mist)] text-[var(--dso-red)]"><BookOpenText size={25} aria-hidden="true" /></div>
            <h2 className="mt-8 font-display text-2xl font-bold">{id ? "Insight belum diaktifkan." : "Insights are not active yet."}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--dso-muted)]">{id ? "Menu Insight disembunyikan sampai artikel pertama siap dan feature flag SHOW_INSIGHT disetujui." : "The Insights menu remains hidden until the first article is ready and SHOW_INSIGHT is approved."}</p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--dso-mist)] px-4 py-2 text-xs font-bold text-[var(--dso-muted)]"><LockKeyhole size={14} aria-hidden="true" />SHOW_INSIGHT=false</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
