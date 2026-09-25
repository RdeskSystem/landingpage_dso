import { FileCheck2, LockKeyhole, Scale } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";

type CompliancePageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export default async function CompliancePage({ params }: CompliancePageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.compliance" });
  const id = typedLocale === "id";
  const principles = id
    ? [
        { icon: Scale, title: "Etika penagihan", description: "Komunikasi dilakukan secara profesional, humanis, dan tidak menyiratkan intimidasi." },
        { icon: FileCheck2, title: "SOP dan quality control", description: "Aktivitas dijalankan melalui proses terstruktur dengan review dan pelaporan." },
        { icon: LockKeyhole, title: "Keamanan data", description: "Akses, dokumentasi, dan penggunaan data mengikuti kebutuhan operasional dan prinsip perlindungan data." },
      ]
    : [
        { icon: Scale, title: "Collection ethics", description: "Communication is professional, human, and never intended to intimidate." },
        { icon: FileCheck2, title: "SOPs and quality control", description: "Activities follow structured processes with review and reporting." },
        { icon: LockKeyhole, title: "Data security", description: "Access, documentation, and data use follow operational need and data protection principles." },
      ];

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Prinsip kerja" : "Working principles"} title={id ? "Kepatuhan dibangun ke dalam proses." : "Compliance is built into the process."} description={id ? "DSO memprioritaskan proses yang dapat dipahami, dikendalikan, dan dipertanggungjawabkan." : "DSO prioritizes processes that can be understood, controlled, and accounted for."} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-[var(--dso-line)] p-7">
                <Icon size={25} className="text-[var(--dso-red)]" strokeWidth={1.6} aria-hidden="true" />
                <h2 className="mt-8 font-display text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--dso-muted)]">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-[var(--dso-red)]/20 bg-[var(--dso-red)]/5 p-6 text-sm leading-7 text-[var(--dso-red-deep)]">
            {id ? "Badge sertifikasi dan klaim KPI tidak ditampilkan sampai nomor sertifikat, tautan verifikasi, dan persetujuan publik tersedia." : "Certification badges and KPI claims remain hidden until certificate numbers, verification links, and public approval are available."}
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
