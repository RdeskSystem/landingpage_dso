import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { localize, teamRoles } from "@/lib/site-content";
import { getPageMetadata } from "@/lib/seo";

type TeamPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  return getPageMetadata(getLocale(locale), "tentang/tim", "team");
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.team" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Kapabilitas" : "Capability"} title={id ? "Peran yang saling melengkapi." : "Roles that work as one capability."} description={id ? "Profil personal akan diterbitkan melalui CMS setelah persetujuan publikasi tersedia. Untuk saat ini, website menampilkan struktur peran tanpa data pribadi." : "Personal profiles will be published through the CMS after publication consent is available. For now, the website shows role coverage without personal data."} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {teamRoles.map((role, index) => (
              <article key={`${role.id}-${index}`} className="rounded-2xl border border-[var(--dso-line)] bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--dso-mist)] text-[var(--dso-red)]"><BriefcaseBusiness size={20} aria-hidden="true" /></div>
                  <span className="text-xs font-bold tracking-[0.2em] text-black/60">0{index + 1}</span>
                </div>
                <h2 className="mt-8 font-display text-lg font-bold text-[var(--dso-ink)]">{localize(role, typedLocale)}</h2>
                <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[var(--dso-muted)]"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--dso-red)]" aria-hidden="true" />{id ? "Data publikasi menunggu persetujuan." : "Public profile data pending approval."}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
