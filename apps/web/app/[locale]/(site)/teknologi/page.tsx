import { Activity, Database, FileClock, FormInput, Globe2, LockKeyhole, MapPinned, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type TechnologyPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: TechnologyPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  return getPageMetadata(typedLocale, "teknologi", "technology");
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.technology" });
  const id = typedLocale === "id";
  const features = id
    ? [
        [Globe2, "Cloud-based workflow", "Akses sistem yang terstruktur untuk kebutuhan operasional."],
        [Activity, "Real-time monitoring", "Visibilitas aktivitas, status, dan tindak lanjut."],
        [MapPinned, "GPS dan digital form", "Pencatatan lokasi dan data lapangan yang konsisten."],
        [FileClock, "Call recording dan audit trail", "Dokumentasi untuk quality control dan review."],
        [LockKeyhole, "Role-based access", "Akses disesuaikan dengan tanggung jawab pengguna."],
        [Database, "Backup dan redundancy", "Fondasi data yang disiapkan untuk kontinuitas operasional."],
      ]
    : [
        [Globe2, "Cloud-based workflow", "Structured access for operational needs."],
        [Activity, "Real-time monitoring", "Visibility across activity, status, and follow-up."],
        [MapPinned, "GPS and digital forms", "Consistent location and field data capture."],
        [FileClock, "Call recording and audit trail", "Documentation for quality control and review."],
        [LockKeyhole, "Role-based access", "Access aligned with each user's responsibility."],
        [Database, "Backup and redundancy", "A foundation prepared for operational continuity."],
      ];
  const flow = id
    ? ["Client assignment", "DSO system", "Call Centre / Surveyor", "Real-time data capture", "Quality check", "Dashboard & reporting"]
    : ["Client assignment", "DSO system", "Call Centre / Surveyor", "Real-time data capture", "Quality check", "Dashboard & reporting"];

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Ekosistem terintegrasi" : "Integrated ecosystem"} title={id ? "Data bergerak melalui alur yang terlihat." : "Data moves through a visible workflow."} description={id ? "Teknologi mendukung assignment, eksekusi, quality check, dan reporting tanpa menggantikan peran manusia dalam pengambilan keputusan." : "Technology supports assignment, execution, quality checks, and reporting without replacing human judgment."} />
          <div className="mt-12 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {flow.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-[var(--dso-line)] bg-white p-5">
                <span className="text-xs font-bold tracking-[0.18em] text-[var(--dso-red)]">0{index + 1}</span>
                <p className="mt-7 text-sm font-bold leading-5">{step}</p>
                {index < flow.length - 1 ? <span className="absolute -right-2 top-9 z-10 hidden h-3 w-3 rotate-45 border-r border-t border-[var(--dso-line)] bg-white xl:block" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Fitur utama" : "Core features"} title={id ? "Teknologi yang bekerja di belakang operasi." : "Technology that works behind the operation."} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map(([Icon, title, description]) => (
              <article key={title as string} className="rounded-2xl border border-[var(--dso-line)] p-7">
                <Icon size={24} className="text-[var(--dso-red)]" strokeWidth={1.6} aria-hidden="true" />
                <h2 className="mt-8 font-display text-lg font-bold">{title as string}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--dso-muted)]">{description as string}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-5 rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-7 text-white sm:p-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <ShieldCheck className="text-[var(--dso-red-bright)]" size={29} strokeWidth={1.6} aria-hidden="true" />
              <h2 className="mt-8 font-display text-2xl font-bold">{id ? "Quality control berlapis" : "Layered quality control"}</h2>
            </div>
            <p className="text-sm leading-7 text-white/60">{id ? "QA monitoring, supervisor control, dan management control menjadi bagian dari cara DSO menjaga kualitas, akurasi, dan integritas setiap aktivitas." : "QA monitoring, supervisor control, and management control help DSO protect quality, accuracy, and integrity across activities."}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
