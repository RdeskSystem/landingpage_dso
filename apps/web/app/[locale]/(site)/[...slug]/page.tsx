import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const staticRoutes = [
  ["tentang"],
  ["tentang", "tim"],
  ["tentang", "kepatuhan"],
  ["layanan"],
  ["layanan", "call-centre"],
  ["layanan", "survey-verification"],
  ["layanan", "collection"],
  ["layanan", "information-data"],
  ["teknologi"],
  ["industri"],
  ["jangkauan"],
  ["karier"],
  ["insight"],
  ["kontak"],
  ["privasi"],
  ["syarat"],
].map((slug) => ({ slug }));

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    staticRoutes.map(({ slug }) => ({ locale, slug })),
  );
}

type PlaceholderPageProps = Readonly<{
  params: Promise<{ locale: string; slug: string[] }>;
}>;

type PageCopy = Readonly<{ eyebrow: string; title: string; description: string }>;

export default async function PlaceholderPage({ params }: PlaceholderPageProps) {
  const { locale, slug } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  const pages = await getTranslations({ locale: typedLocale, namespace: "pages" });
  const key = getPageKey(slug);
  const copyKeys = {
    about: ["about.eyebrow", "about.title", "about.description"],
    team: ["team.eyebrow", "team.title", "team.description"],
    compliance: ["compliance.eyebrow", "compliance.title", "compliance.description"],
    services: ["services.eyebrow", "services.title", "services.description"],
    call: ["call.eyebrow", "call.title", "call.description"],
    survey: ["survey.eyebrow", "survey.title", "survey.description"],
    collection: ["collection.eyebrow", "collection.title", "collection.description"],
    data: ["data.eyebrow", "data.title", "data.description"],
    technology: ["technology.eyebrow", "technology.title", "technology.description"],
    industries: ["industries.eyebrow", "industries.title", "industries.description"],
    coverage: ["coverage.eyebrow", "coverage.title", "coverage.description"],
    careers: ["careers.eyebrow", "careers.title", "careers.description"],
    insight: ["insight.eyebrow", "insight.title", "insight.description"],
    contact: ["contact.eyebrow", "contact.title", "contact.description"],
    privacy: ["privacy.eyebrow", "privacy.title", "privacy.description"],
    terms: ["terms.eyebrow", "terms.title", "terms.description"],
    notFound: ["notFound.eyebrow", "notFound.title", "notFound.description"],
  } as const;
  const selected = copyKeys[key];
  const copy: PageCopy = {
    eyebrow: pages(selected[0]),
    title: pages(selected[1]),
    description: pages(selected[2]),
  };
  const common = await getTranslations({ locale: typedLocale, namespace: "common" });

  return (
    <main id="main-content" className="bg-[var(--dso-mist)]">
      <section className="relative overflow-hidden bg-[var(--dso-ink)] pb-24 pt-44 text-white sm:pb-32">
        <div className="starburst absolute inset-0" aria-hidden="true" />
        <div className="container-shell relative max-w-4xl">
          <span className="eyebrow eyebrow-light">{copy.eyebrow}</span>
          <h1 className="display-heading mt-7 text-4xl font-extrabold leading-[1.05] sm:text-6xl">{copy.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">{copy.description}</p>
        </div>
      </section>
      <section className="container-shell py-20 sm:py-28">
        <div className="rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-7 shadow-[0_15px_50px_rgba(11,11,13,0.05)] sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--dso-mist)] text-[var(--dso-red)]">
            <ArrowUpRight size={21} aria-hidden="true" />
          </div>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--dso-muted)]">
            {typedLocale === "id"
              ? "Fondasi halaman ini sudah disiapkan. Konten terstruktur, data CMS, dan detail operasional akan ditambahkan mengikuti persetujuan publikasi."
              : "This page foundation is ready. Structured content, CMS data, and operational details will be added after publication approval."}
          </p>
          <Link href={`/${typedLocale}`} className={cn(buttonVariants({ variant: "secondary" }), "mt-8") }>
            <ArrowLeft size={16} aria-hidden="true" />
            {common("backHome")}
          </Link>
        </div>
      </section>
    </main>
  );
}

function getPageKey(slug: string[]) {
  const path = slug.join("/");
  if (path.startsWith("tentang/tim")) return "team";
  if (path.startsWith("tentang/kepatuhan")) return "compliance";
  if (path === "tentang") return "about";
  if (path.startsWith("layanan/call-centre")) return "call";
  if (path.startsWith("layanan/survey-verification")) return "survey";
  if (path.startsWith("layanan/collection")) return "collection";
  if (path.startsWith("layanan/information-data")) return "data";
  if (path === "layanan") return "services";
  if (path === "teknologi") return "technology";
  if (path === "industri") return "industries";
  if (path === "jangkauan") return "coverage";
  if (path.startsWith("karier")) return "careers";
  if (path.startsWith("insight")) return "insight";
  if (path === "kontak") return "contact";
  if (path === "privasi") return "privacy";
  if (path === "syarat") return "terms";
  return "notFound";
}
