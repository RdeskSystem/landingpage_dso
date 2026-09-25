import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeader } from "@/components/section-header";
import { routing, type Locale } from "@/i18n/routing";

type ContactPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "pages.contact" });
  const copy = await getTranslations({ locale: typedLocale, namespace: "leadForm" });

  return (
    <main id="main-content" className="bg-[var(--dso-mist)]">
      <section className="relative overflow-hidden bg-[var(--dso-ink)] pb-24 pt-44 text-white sm:pb-32">
        <div className="starburst absolute inset-0" aria-hidden="true" />
        <div className="container-shell relative max-w-4xl">
          <span className="eyebrow eyebrow-light">{t("eyebrow")}</span>
          <h1 className="display-heading mt-7 text-4xl font-extrabold leading-[1.05] sm:text-6xl">{t("title")}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">{t("description")}</p>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <aside className="rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-7 text-white sm:p-9">
          <SectionHeader eyebrow={copy("infoEyebrow")} title={copy("infoTitle")} description={copy("infoDescription")} light />
          <div className="mt-10 grid gap-5 text-sm text-white/65">
            <a href="tel:+62818801120" className="flex gap-3 hover:text-white">
              <Phone size={18} className="mt-0.5 text-[var(--dso-red-bright)]" aria-hidden="true" />
              <span>+62 818 801120</span>
            </a>
            <a href="mailto:cs@stellaeorientis.co.id" className="flex gap-3 break-all hover:text-white">
              <Mail size={18} className="mt-0.5 text-[var(--dso-red-bright)]" aria-hidden="true" />
              <span>cs@stellaeorientis.co.id</span>
            </a>
            <div className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--dso-red-bright)]" aria-hidden="true" />
              <span>ArvaHub Office, Jl. Prof. DR. Soepomo SH No.23, Tebet Barat, Jakarta Selatan 12810.</span>
            </div>
            <div className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--dso-red-bright)]" aria-hidden="true" />
              <span>Grand Centerpoint, Jl. Ahmad Yani Kav.20, Tower D GF47-49, Bekasi Selatan 17141.</span>
            </div>
          </div>
        </aside>

        <div className="rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-7 sm:p-10">
          <SectionHeader eyebrow={copy("formEyebrow")} title={copy("formTitle")} description={copy("formDescription")} />
          <div className="mt-8">
            <LeadForm
              locale={typedLocale}
              copy={{
                name: copy("name"),
                company: copy("company"),
                position: copy("position"),
                email: copy("email"),
                phone: copy("phone"),
                services: copy("services"),
                serviceOptions: {
                  "call-centre": copy("serviceOptions.callCentre"),
                  "survey-verification": copy("serviceOptions.survey"),
                  collection: copy("serviceOptions.collection"),
                  "information-data": copy("serviceOptions.data"),
                },
                message: copy("message"),
                privacy: copy("privacy"),
                submit: copy("submit"),
                optional: copy("optional"),
                required: copy("required"),
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
