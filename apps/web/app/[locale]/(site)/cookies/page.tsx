import { getTranslations } from "next-intl/server";
import { LegalNotice } from "@/components/legal-notice";
import { PageHero } from "@/components/page-hero";
import { routing, type Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type CookiePolicyPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: CookiePolicyPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  return getPageMetadata(typedLocale, "cookies", "cookies");
}

export default async function CookiePolicyPage({ params }: CookiePolicyPageProps) {
  const { locale } = await params;
  const typedLocale = getLocale(locale);
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.cookies" });

  return (
    <main id="main-content">
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <LegalNotice locale={typedLocale} kind="cookies" />
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}
