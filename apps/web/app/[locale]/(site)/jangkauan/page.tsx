import { MapPinned, Route, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { CoverageMap } from "@/components/coverage-map";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type CoveragePageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: CoveragePageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  return getPageMetadata(typedLocale, "jangkauan", "coverage");
}

export default async function CoveragePage({ params }: CoveragePageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.coverage" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-6 text-white sm:p-9">
            <div className="flex items-center justify-between"><span className="eyebrow eyebrow-light">INDONESIA COVERAGE</span><MapPinned className="text-[var(--dso-red-bright)]" size={22} aria-hidden="true" /></div>
            <CoverageMap locale={typedLocale} />
            <p className="relative mt-5 text-xs uppercase tracking-[0.18em] text-white/70">{id ? "Area layanan aktif ditandai pada peta." : "Active service areas are marked on the map."}</p>
          </div>
          <div>
            <SectionHeader eyebrow={id ? "Pendekatan area" : "Area approach"} title={id ? "Pemahaman lokal dengan disiplin kerja profesional." : "Local understanding with professional discipline."} description={id ? "Tim DSO mendukung kebutuhan operasional di sembilan area layanan yang ditandai pada peta." : "DSO teams support operational needs across the nine service areas marked on the map."} />
            <div className="mt-10 grid gap-4">
              <div className="flex gap-4 rounded-2xl border border-[var(--dso-line)] bg-white p-5"><Route className="mt-1 shrink-0 text-[var(--dso-red)]" size={20} aria-hidden="true" /><div><h2 className="font-display font-bold">{id ? "Layanan fleksibel" : "Flexible service"}</h2><p className="mt-2 text-sm leading-6 text-[var(--dso-muted)]">{id ? "Model desk, field, dan hybrid dapat disesuaikan dengan kebutuhan proyek." : "Desk, field, and hybrid models can be shaped around project needs."}</p></div></div>
              <div className="flex gap-4 rounded-2xl border border-[var(--dso-line)] bg-white p-5"><ShieldCheck className="mt-1 shrink-0 text-[var(--dso-red)]" size={20} aria-hidden="true" /><div><h2 className="font-display font-bold">{id ? "Visibilitas dan kontrol" : "Visibility and control"}</h2><p className="mt-2 text-sm leading-6 text-[var(--dso-muted)]">{id ? "Status aktivitas dan pelaporan dirancang agar mudah ditinjau." : "Activity status and reporting are designed for straightforward review."}</p></div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
