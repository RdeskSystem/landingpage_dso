import { ArrowUpRight, BriefcaseBusiness, MailCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type CareersPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: CareersPageProps) {
  const { locale } = await params;
  return getPageMetadata(getLocale(locale), "karier", "careers");
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.careers" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader eyebrow={id ? "Bergabung bersama DSO" : "Join DSO"} title={id ? "Ruang untuk tumbuh dengan cara kerja yang bertanggung jawab." : "Room to grow through responsible work."} description={id ? "Informasi lowongan dan proses lamaran akan dikelola melalui CMS. Kami tidak menampilkan posisi atau kontak rekrutmen yang belum dikonfirmasi." : "Open roles and application details will be managed through the CMS. We do not publish unconfirmed positions or recruitment contacts."} />
          <div className="rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--dso-mist)] text-[var(--dso-red)]"><BriefcaseBusiness size={22} aria-hidden="true" /></div>
            <h2 className="mt-8 font-display text-2xl font-bold">{id ? "Lowongan akan hadir di sini." : "Open roles will appear here."}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--dso-muted)]">{id ? "Saat collection Jobs memiliki lowongan yang dipublikasikan, halaman ini akan menyediakan filter lokasi, tipe pekerjaan, detail persyaratan, dan alur lamaran." : "Once the Jobs collection has published roles, this page will provide location and type filters, requirements, and the application flow."}</p>
            <div className="mt-8 flex gap-3 rounded-xl bg-[var(--dso-mist)] p-4 text-sm leading-6 text-[var(--dso-muted)]"><MailCheck size={19} className="mt-0.5 shrink-0 text-[var(--dso-red)]" aria-hidden="true" />{id ? "Gunakan kontak perusahaan untuk pertanyaan umum, bukan kontak pribadi." : "Use the company contact for general questions, not personal contacts."}</div>
            <Link href={`/${typedLocale}/kontak`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--dso-red)]">{id ? "Hubungi DSO" : "Contact DSO"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
