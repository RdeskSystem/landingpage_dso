import {
  BarChart3,
  Database,
  Headphones,
  Map,
  Radar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HeroVisual } from "@/components/hero-visual";
import { CoverageMap } from "@/components/coverage-map";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "home" });
  const common = await getTranslations({ locale: typedLocale, namespace: "common" });

  const services = [
    {
      key: "call",
      icon: Headphones,
      href: `/${typedLocale}/layanan/call-centre`,
      tone: "paper" as const,
    },
    {
      key: "survey",
      icon: Radar,
      href: `/${typedLocale}/layanan/survey-verification`,
      tone: "paper" as const,
    },
    {
      key: "collection",
      icon: ShieldCheck,
      href: `/${typedLocale}/layanan/collection`,
      tone: "dark" as const,
    },
    {
      key: "data",
      icon: BarChart3,
      href: `/${typedLocale}/layanan/information-data`,
      tone: "paper" as const,
    },
  ];

  const principles = [
    { key: "people", icon: UsersRound },
    { key: "process", icon: Workflow },
    { key: "performance", icon: BarChart3 },
  ];

  const workflow = ["one", "two", "three", "four", "five"] as const;
  const stats = [
    { value: "04", label: t("stats.services") },
    { value: "02", label: t("stats.locations") },
    { value: "ID/EN", label: t("stats.languages") },
    { value: "B2B", label: t("stats.model") },
  ];

  return (
    <main id="main-content">
      <section id="top" className="relative overflow-hidden bg-[var(--dso-ink)] text-white">
        <div className="starburst absolute inset-0" aria-hidden="true" />
        <div className="container-shell relative grid min-h-[720px] items-center gap-16 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-44">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-light">{t("eyebrow")}</span>
            <h1 className="display-heading mt-7 max-w-xl text-4xl font-extrabold leading-[1.04] sm:text-6xl lg:text-[4.2rem]">
              {t("title")}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/60 sm:text-lg">{t("description")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${typedLocale}/kontak`} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                {t("primaryCta")}
                <Sparkles size={17} aria-hidden="true" />
              </Link>
              <Link href={`/${typedLocale}/layanan`} className={cn(buttonVariants({ variant: "dark", size: "lg" }))}>
                {t("secondaryCta")}
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              <span>Professional</span>
              <span className="h-1 w-1 rounded-full bg-[var(--dso-red-bright)]" />
              <span>Accurate</span>
              <span className="h-1 w-1 rounded-full bg-[var(--dso-red-bright)]" />
              <span>Trusted</span>
            </div>
          </div>
          <HeroVisual
            label={t("heroLabel")}
            status={t("heroStatus")}
            statusValue={t("heroStatusValue")}
            statOne={t("heroStatOne")}
            statTwo={t("heroStatTwo")}
            statThree={t("heroStatThree")}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--dso-red)] to-transparent" />
      </section>

      <section className="border-b border-[var(--dso-line)] bg-white">
        <div className="container-shell grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">{t("trustEyebrow")}</span>
            <h2 className="display-heading mt-4 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">{t("trustTitle")}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--dso-muted)]">{t("trustDescription")}</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--dso-line)] bg-[var(--dso-line)] sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-4 sm:p-5">
                <p className="display-heading text-xl font-extrabold text-[var(--dso-red)] sm:text-2xl">{stat.value}</p>
                <p className="mt-2 text-[11px] leading-4 text-[var(--dso-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dso-mist)] py-24 sm:py-32">
        <div className="container-shell">
          <SectionHeader
            eyebrow={t("servicesEyebrow")}
            title={t("servicesTitle")}
            description={t("servicesDescription")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={t(`services.${service.key}.title`)}
                description={t(`services.${service.key}.description`)}
                bullets={[
                  t(`services.${service.key}.bullet1`),
                  t(`services.${service.key}.bullet2`),
                  t(`services.${service.key}.bullet3`),
                ]}
                href={service.href}
                tone={service.tone}
                linkLabel={common("learnMore")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--dso-ink)] py-24 text-white sm:py-32">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[var(--dso-red-deep)]/10" aria-hidden="true" />
        <div className="container-shell relative">
          <SectionHeader
            eyebrow={t("whyEyebrow")}
            title={t("whyTitle")}
            description={t("whyDescription")}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/10 md:grid-cols-3">
            {principles.map(({ key, icon: Icon }, index) => (
              <div key={key} className="bg-[var(--dso-ink)] p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <Icon className="text-[var(--dso-red-bright)]" size={25} strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-xs font-bold tracking-[0.2em] text-white/70">0{index + 1}</span>
                </div>
                <h3 className="display-heading mt-14 text-2xl font-bold">{t(`principles.${key}.title`)}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">{t(`principles.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-pattern py-24 sm:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow={t("workflowEyebrow")}
            title={t("workflowTitle")}
          />
          <div className="grid gap-3 sm:grid-cols-5">
            {workflow.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-[var(--dso-line)] bg-white p-5 shadow-[0_10px_35px_rgba(11,11,13,0.04)] sm:min-h-40">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dso-red)] text-xs font-bold text-white">0{index + 1}</span>
                <p className="mt-7 text-sm font-bold leading-5 text-[var(--dso-ink)]">{t(`workflow.${step}`)}</p>
                {index < workflow.length - 1 ? <span className="absolute -right-2 top-9 z-10 hidden h-3 w-3 rotate-45 border-r border-t border-[var(--dso-line)] bg-white sm:block" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow={t("technologyEyebrow")}
              title={t("technologyTitle")}
              description={t("technologyDescription")}
            />
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Smartphone, label: "Digital form" },
                { icon: Map, label: "GPS capture" },
                { icon: Database, label: "Data security" },
                { icon: BarChart3, label: "Reporting" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-[var(--dso-line)] p-4">
                  <Icon size={19} className="text-[var(--dso-red)]" strokeWidth={1.7} aria-hidden="true" />
                  <p className="mt-5 text-xs font-semibold leading-4 text-[var(--dso-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-5 shadow-[0_25px_80px_rgba(11,11,13,0.16)] sm:p-8">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--dso-red)]/20 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-white/70">DSO FIELD SYSTEM</p>
                  <p className="mt-2 text-sm font-bold text-white">Live assignment board</p>
                </div>
                <div className="rounded-lg bg-[var(--dso-red)] p-2 text-white"><Radar size={16} aria-hidden="true" /></div>
              </div>
              <div className="mt-7 grid grid-cols-[0.9fr_1.1fr] gap-4">
                <div className="grid gap-3">
                  <div className="rounded-xl bg-white/10 p-4"><p className="text-2xl font-bold text-white">98%</p><p className="mt-1 text-[10px] text-white/70">Data completeness</p></div>
                  <div className="rounded-xl bg-white/10 p-4"><p className="text-2xl font-bold text-white">24h</p><p className="mt-1 text-[10px] text-white/70">Reporting cycle</p></div>
                </div>
                <div className="relative min-h-44 overflow-hidden rounded-xl border border-white/10 bg-[#17171b]">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  <span className="live-map-dot absolute left-[28%] top-[30%] h-3 w-3 rounded-full bg-[var(--dso-red-bright)] shadow-[0_0_0_8px_rgba(227,27,35,.18),0_0_24px_rgba(227,27,35,.9)]" />
                  <span className="live-map-dot absolute left-[62%] top-[58%] h-3 w-3 rounded-full bg-[#4ee39a] shadow-[0_0_0_8px_rgba(78,227,154,.15),0_0_24px_rgba(78,227,154,.8)]" style={{ animationDelay: "700ms" }} />
                  <span className="absolute left-[45%] top-[72%] h-2 w-2 rounded-full bg-white/70" />
                  <span className="absolute bottom-3 left-3 text-[9px] font-bold tracking-widest text-white/70">LIVE MAP</span>
                </div>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--dso-red-text)]">{t("technologyLabel")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--dso-mist)] py-24 sm:py-32">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionHeader
            eyebrow={t("coverageEyebrow")}
            title={t("coverageTitle")}
            description={t("coverageDescription")}
          />
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--dso-ink)] p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <span className="eyebrow eyebrow-light">INDONESIA COVERAGE</span>
              <Map size={21} className="text-[var(--dso-red-bright)]" aria-hidden="true" />
            </div>
            <CoverageMap locale={typedLocale} compact />
            <Link href={`/${typedLocale}/jangkauan`} className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--dso-red-bright)]">
              {t("coverageLink")}
              <ArrowUpRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--dso-red)] py-20 text-white sm:py-24">
        <div className="starburst absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-light">{t("ctaEyebrow")}</span>
            <h2 className="display-heading mt-5 text-3xl font-bold leading-tight sm:text-5xl">{t("ctaTitle")}</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/90">{t("ctaDescription")}</p>
          </div>
          <Link href={`/${typedLocale}/kontak`} className="relative z-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-white/20 bg-[var(--dso-ink)] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-white hover:text-[var(--dso-red)]">
            {t("ctaButton")}
            <Sparkles size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">-&gt;</span>;
}
