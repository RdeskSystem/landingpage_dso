import { ArrowLeft, ArrowUpRight, Check, CircleDot, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getServiceBySlug } from "@/lib/cms";
import { routing, type Locale } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo";

type ServicePageProps = Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const typedLocale = getLocale(locale);
  const service = await getServiceBySlug(slug, typedLocale);
  if (!service) return { title: typedLocale === "id" ? "Layanan tidak ditemukan" : "Service not found", robots: { index: false, follow: false } };

  const keywords = getServiceKeywords(slug, typedLocale);
  const title = typedLocale === "id"
    ? `${service.title} untuk Bisnis Indonesia`
    : `${service.title} Services in Indonesia`;
  const description = typedLocale === "id"
    ? `${service.summary} Didukung proses kerja terstruktur, quality control, dan pelaporan.`
    : `${service.summary} Delivered through structured processes, quality control, and reporting.`;

  return buildPageMetadata(typedLocale, `layanan/${slug}`, title, description, keywords);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const typedLocale = getLocale(locale);
  const service = await getServiceBySlug(slug, typedLocale);
  if (!service) notFound();

  const common = await getTranslations({ locale: typedLocale, namespace: "common" });
  const copy = typedLocale === "id"
    ? {
        scopeEyebrow: "Cakupan layanan",
        scopeTitle: "Dibangun untuk pekerjaan yang harus selesai dengan jelas.",
        supportEyebrow: "Dukungan operasional",
        processEyebrow: "Proses kerja",
        processTitle: "Terstruktur dari awal sampai akhir.",
        ctaTitle: "Butuh pendekatan yang sesuai operasi Anda?",
        ctaDescription: "Ceritakan kebutuhan Anda dan tim DSO akan membantu menyusun langkah berikutnya.",
        cta: "Request Proposal",
      }
    : {
        scopeEyebrow: "Service scope",
        scopeTitle: "Built for work that needs to be clear and accountable.",
        supportEyebrow: "Operational support",
        processEyebrow: "Working process",
        processTitle: "Structured from start to finish.",
        ctaTitle: "Need an approach shaped around your operation?",
        ctaDescription: "Tell us what you need and the DSO team will help define the next step.",
        cta: "Request Proposal",
      };

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-[var(--dso-ink)] pb-24 pt-44 text-white sm:pb-32">
        <div className="starburst absolute inset-0" aria-hidden="true" />
        <div className="container-shell relative grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div className="max-w-3xl">
            <Link href={`/${typedLocale}/layanan`} className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" />
              {common("viewServices")}
            </Link>
            <span className="eyebrow eyebrow-light">{service.title}</span>
            <h1 className="display-heading mt-7 text-4xl font-extrabold leading-[1.04] sm:text-6xl">{service.summary}</h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <ShieldCheck className="text-[var(--dso-red-bright)]" size={27} strokeWidth={1.6} aria-hidden="true" />
            <p className="mt-5 text-sm leading-7 text-white/60">
              {typedLocale === "id" ? "Setiap aktivitas dijalankan dengan SOP, quality control, dan pelaporan yang dapat ditelusuri." : "Every activity follows SOPs, quality control, and traceable reporting."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">{copy.scopeEyebrow}</span>
            <h2 className="display-heading mt-5 text-3xl font-bold leading-tight sm:text-4xl">{copy.scopeTitle}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.scope.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[var(--dso-line)] bg-white p-5 text-sm leading-6 text-[var(--dso-muted)]">
                <Check size={19} className="mt-0.5 shrink-0 text-[var(--dso-red)]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">{copy.processEyebrow}</span>
            <h2 className="display-heading mt-5 text-3xl font-bold leading-tight sm:text-4xl">{copy.processTitle}</h2>
            <div className="mt-10 grid gap-4">
              {service.support.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[var(--dso-muted)]">
                  <CircleDot size={17} className="text-[var(--dso-red)]" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {service.process.map((step, index) => (
              <div key={step.title} className="relative flex gap-5 rounded-2xl border border-[var(--dso-line)] p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dso-red)] text-xs font-bold text-white">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--dso-ink)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--dso-muted)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dso-red)] py-20 text-white sm:py-24">
        <div className="container-shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display-heading text-3xl font-bold sm:text-5xl">{copy.ctaTitle}</h2>
            <p className="mt-5 text-base leading-7 text-white/90">{copy.ctaDescription}</p>
          </div>
          <Link href={`/${typedLocale}/kontak`} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "border-white bg-white text-[var(--dso-red)] hover:bg-[var(--dso-ink)] hover:text-white") }>
            {copy.cta}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function getLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}

function getServiceKeywords(slug: string, locale: Locale) {
  const keywords: Record<string, Record<Locale, string[]>> = {
    "call-centre": {
      id: ["jasa call centre Indonesia", "inbound outbound call centre", "layanan komunikasi pelanggan"],
      en: ["call centre services Indonesia", "inbound outbound calling", "customer communication services"],
    },
    "survey-verification": {
      id: ["survey lapangan Indonesia", "verifikasi alamat dan customer", "field verification"],
      en: ["field survey Indonesia", "customer and address verification", "field verification services"],
    },
    collection: {
      id: ["jasa collection Indonesia", "pengelolaan piutang", "collection dan asset management"],
      en: ["collection services Indonesia", "receivables management", "collection and asset management"],
    },
    "information-data": {
      id: ["pengolahan data operasional", "layanan information data", "dashboard dan reporting"],
      en: ["operational data services", "information and data services", "business reporting"],
    },
  };
  return keywords[slug]?.[locale] ?? [];
}
