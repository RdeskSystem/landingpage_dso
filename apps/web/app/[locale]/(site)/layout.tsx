import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-floating-button";
import { routing, type Locale } from "@/i18n/routing";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { locale } = await params;
  const typedLocale = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 text-sm font-bold text-[var(--dso-ink)] focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar locale={typedLocale} />
      {children}
      <WhatsAppFloatingButton />
      <Footer locale={typedLocale} />
    </>
  );
}
