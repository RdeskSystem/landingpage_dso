import { BarChart3, Headphones, Radar, ShieldCheck, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { routing, type Locale } from "@/i18n/routing";
import { getServices } from "@/lib/cms";
import { getPageMetadata } from "@/lib/seo";

const serviceIcons: Record<string, LucideIcon> = {
  "call-centre": Headphones,
  "survey-verification": Radar,
  collection: ShieldCheck,
  "information-data": BarChart3,
};

type ServicesPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  return getPageMetadata(typedLocale, "layanan", "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.services" });
  const common = await getTranslations({ locale: typedLocale, namespace: "common" });
  const services = await getServices(typedLocale);

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              icon={serviceIcons[service.slug] ?? Headphones}
              title={service.title}
              description={service.summary}
              bullets={service.scope}
              href={`/${typedLocale}/layanan/${service.slug}`}
              tone={index === 2 ? "dark" : "paper"}
              linkLabel={common("learnMore")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
