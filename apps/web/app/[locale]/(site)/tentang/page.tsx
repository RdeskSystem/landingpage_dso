import { ArrowUpRight, Compass, Lightbulb, UsersRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";
import { localize, values } from "@/lib/site-content";
import { getPageMetadata } from "@/lib/seo";

type AboutPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  return getPageMetadata(getLocale(locale), "tentang", "about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.about" });
  const id = typedLocale === "id";

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-white py-20 sm:py-28">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-8 text-white sm:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--dso-red)]/30 blur-3xl" aria-hidden="true" />
            <Compass className="relative text-[var(--dso-red-bright)]" size={34} strokeWidth={1.5} aria-hidden="true" />
            <p className="relative mt-16 font-display text-3xl font-bold leading-tight">Dux Stellae Orientis</p>
            <p className="relative mt-4 text-sm leading-7 text-white/55">{id ? "Pemimpin Bintang dari Timur - simbol harapan, arah, dan panduan." : "Leader of the Stars from the East - a symbol of hope, direction, and guidance."}</p>
          </div>
          <div>
            <SectionHeader
              eyebrow={id ? "Awal sebuah langkah" : "A considered beginning"}
              title={id ? "Membangun kapabilitas yang relevan untuk kebutuhan operasi Indonesia." : "Building capability that fits the realities of Indonesian operations."}
              description={id ? "DSO hadir untuk mendukung komunikasi pelanggan, verifikasi informasi, kegiatan lapangan, dan pengelolaan piutang melalui kombinasi manusia, proses, dan teknologi." : "DSO supports customer communication, information verification, field activity, and receivables management through the combination of people, process, and technology."}
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                { icon: UsersRound, label: id ? "Manusia" : "People" },
                { icon: Compass, label: id ? "Proses" : "Process" },
                { icon: Lightbulb, label: id ? "Teknologi" : "Technology" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-[var(--dso-line)] p-4">
                  <Icon size={19} className="text-[var(--dso-red)]" aria-hidden="true" />
                  <p className="mt-5 text-sm font-bold text-[var(--dso-ink)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell">
          <SectionHeader eyebrow={id ? "Nilai DSO" : "DSO values"} title={id ? "Budaya yang menjadi cara kerja." : "Culture translated into daily work."} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value, index) => (
              <article key={value.title.id} className="rounded-2xl border border-[var(--dso-line)] bg-white p-7">
                <span className="text-xs font-bold tracking-[0.2em] text-[var(--dso-red)]">0{index + 1}</span>
                <h2 className="mt-8 font-display text-xl font-bold text-[var(--dso-ink)]">{localize(value.title, typedLocale)}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--dso-muted)]">{localize(value.description, typedLocale)}</p>
              </article>
            ))}
          </div>
          <a href={`/${typedLocale}/tentang/kepatuhan`} className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[var(--dso-ink)] hover:text-[var(--dso-red)]">
            {id ? "Pelajari kepatuhan" : "Explore compliance"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
