import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { NextIntlClientProvider } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata, seoCopy } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = routing.locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;
  const home = seoCopy[locale].home;

  return {
    ...buildPageMetadata(locale, "", home.title, home.description, home.keywords),
    title: { default: home.title, template: "%s | DSO" },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: requestedLocale } = await params;

  if (!hasLocale(routing.locales, requestedLocale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;
  const messages = await getMessages();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://web.duxorientis.com/#organization",
        name: "PT Dux Stellae Orientis",
        alternateName: "DSO",
        url: "https://web.duxorientis.com",
        logo: "https://web.duxorientis.com/brand/logo.png",
        email: "cs@stellaeorientis.co.id",
        telephone: "+62 818 801120",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+62 818 801120",
          email: "cs@stellaeorientis.co.id",
          availableLanguage: ["Indonesian", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://web.duxorientis.com/#website",
        url: "https://web.duxorientis.com",
        name: "Dux Stellae Orientis",
        publisher: { "@id": "https://web.duxorientis.com/#organization" },
        inLanguage: ["id-ID", "en-US"],
      },
    ],
  };

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
