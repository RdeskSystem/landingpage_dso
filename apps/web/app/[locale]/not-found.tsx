import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

type NotFoundProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function NotFound({ params }: NotFoundProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.notFound" });

  return (
    <main className="flex min-h-[70vh] items-center bg-[var(--dso-ink)] py-32 text-white">
      <div className="container-shell max-w-3xl">
        <span className="eyebrow eyebrow-light">{t("eyebrow")}</span>
        <h1 className="display-heading mt-6 text-5xl font-extrabold">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-white/60">{t("description")}</p>
        <Link href={`/${typedLocale}`} className="mt-8 inline-flex rounded-xl bg-[var(--dso-red)] px-5 py-3 text-sm font-bold text-white">
          {typedLocale === "id" ? "Kembali ke beranda" : "Back to home"}
        </Link>
      </div>
    </main>
  );
}
