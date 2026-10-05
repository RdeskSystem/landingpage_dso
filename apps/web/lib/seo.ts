import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://web.duxorientis.com";

type SeoCopy = Readonly<{
  title: string;
  description: string;
  keywords: readonly string[];
  index?: boolean;
}>;

export const seoCopy = {
  id: {
    home: {
      title: "Mitra Operasional dan Penagihan Indonesia",
      description: "DSO mendukung bisnis Indonesia dengan layanan call centre, survey dan verifikasi lapangan, collection, serta pengolahan data operasional.",
      keywords: ["mitra operasional Indonesia", "jasa call centre", "survey dan verifikasi lapangan", "jasa collection", "pengolahan data operasional"],
    },
    about: {
      title: "Tentang DSO dan Kapabilitas Operasional",
      description: "Kenali Dux Stellae Orientis, mitra operasional yang memadukan people, process, dan performance untuk mendukung bisnis di Indonesia.",
      keywords: ["Dux Stellae Orientis", "profil perusahaan DSO", "mitra operasi bisnis", "layanan operasional Indonesia"],
    },
    team: {
      title: "Tim dan Kapabilitas Operasional DSO",
      description: "Kenali cakupan peran tim DSO dalam layanan komunikasi pelanggan, verifikasi lapangan, collection, dan dukungan data.",
      keywords: ["tim operasional DSO", "kapabilitas layanan DSO", "tim call centre", "tim survey lapangan"],
    },
    compliance: {
      title: "Etika Collection dan Kepatuhan Operasional",
      description: "Pendekatan DSO mengutamakan etika komunikasi, SOP, quality control, dan perlindungan data dalam pelaksanaan layanan.",
      keywords: ["etika collection", "kepatuhan operasional", "SOP collection", "quality control operasional", "perlindungan data"],
    },
    services: {
      title: "Layanan Operasional: Call Centre, Survey & Collection",
      description: "Jelajahi layanan call centre, survey dan verifikasi, collection, serta information dan data services untuk kebutuhan bisnis.",
      keywords: ["layanan operasional bisnis", "layanan call centre", "survey verification", "collection dan asset management", "information data services"],
    },
    technology: {
      title: "Teknologi Operasional dan Pelaporan Lapangan",
      description: "Teknologi DSO mendukung GPS, form digital, monitoring, audit trail, quality control, dan pelaporan aktivitas operasional.",
      keywords: ["teknologi operasional", "GPS survey lapangan", "form digital operasional", "monitoring aktivitas", "pelaporan lapangan"],
    },
    industries: {
      title: "Mitra Operasional untuk Industri Indonesia",
      description: "Dukungan operasional DSO untuk sektor perbankan, pembiayaan, fintech, asuransi, telekomunikasi, properti, dan sektor terkait.",
      keywords: ["layanan operasional perbankan", "layanan pembiayaan", "operasional fintech", "layanan asuransi", "mitra operasional industri"],
    },
    coverage: {
      title: "Jangkauan Layanan Operasional di Indonesia",
      description: "Lihat area layanan DSO di Jakarta, Banten, Jawa Barat, Jawa Tengah, Jawa Timur, Yogyakarta, Bali, Lampung, dan Sulawesi.",
      keywords: ["jangkauan layanan Indonesia", "layanan operasional Jakarta", "survey lapangan Indonesia", "coverage collection Indonesia"],
    },
    careers: {
      title: "Karier di DSO",
      description: "Informasi posisi dan proses rekrutmen DSO akan dipublikasikan setelah lowongan tersedia.",
      keywords: ["karier DSO", "lowongan kerja operasional", "karier call centre", "karier surveyor"],
      index: false,
    },
    insight: {
      title: "Insight Operasional DSO",
      description: "Artikel tentang operasi, data, collection, dan kepatuhan akan tersedia setelah konten dipublikasikan.",
      keywords: ["insight operasional", "insight collection", "data dan kepatuhan bisnis"],
      index: false,
    },
    contact: {
      title: "Kontak DSO dan Request Proposal",
      description: "Hubungi DSO untuk kebutuhan call centre, survey dan verifikasi, collection, atau pengelolaan data. Lanjutkan permintaan proposal melalui WhatsApp.",
      keywords: ["kontak DSO", "request proposal layanan operasional", "konsultasi call centre", "hubungi DSO Indonesia"],
    },
    privacy: {
      title: "Kebijakan Privasi DSO",
      description: "Pelajari penggunaan data pada website, form WhatsApp, dan Web SFTP PT Dux Stellae Orientis.",
      keywords: ["kebijakan privasi DSO", "privasi data", "perlindungan data Indonesia"],
    },
    terms: {
      title: "Syarat Penggunaan Website DSO",
      description: "Ketentuan penggunaan website, layanan proposal, dan Web SFTP PT Dux Stellae Orientis.",
      keywords: ["syarat penggunaan DSO", "ketentuan website", "ketentuan layanan SFTP"],
    },
    cookies: {
      title: "Kebijakan Cookie DSO",
      description: "Informasi tentang cookie bahasa, sesi login Web SFTP, dan analitik pada layanan DSO.",
      keywords: ["kebijakan cookie DSO", "cookie website", "cookie sesi login"],
    },
  },
  en: {
    home: {
      title: "Operations and Collections Partner in Indonesia",
      description: "DSO supports Indonesian businesses with call centre, field survey and verification, collection, and operational data services.",
      keywords: ["operations partner Indonesia", "call centre services", "field survey and verification", "collection services", "operational data services"],
    },
    about: {
      title: "About DSO and Its Operations Capabilities",
      description: "Learn about Dux Stellae Orientis, an operations partner combining people, process, and performance to support businesses in Indonesia.",
      keywords: ["Dux Stellae Orientis", "DSO company profile", "business operations partner", "operations services Indonesia"],
    },
    team: {
      title: "DSO Team and Operational Capabilities",
      description: "Explore DSO role coverage across customer communication, field verification, collection, and data services.",
      keywords: ["DSO operations team", "DSO service capabilities", "call centre team", "field survey team"],
    },
    compliance: {
      title: "Collection Ethics and Operational Compliance",
      description: "DSO prioritizes ethical communication, SOPs, quality control, and data protection across service delivery.",
      keywords: ["collection ethics", "operational compliance", "collection SOP", "operational quality control", "data protection"],
    },
    services: {
      title: "Operations Services: Call Centre, Survey & Collection",
      description: "Explore call centre, survey and verification, collection, and information and data services for business operations.",
      keywords: ["business operations services", "call centre services", "survey verification", "collection and asset management", "information data services"],
    },
    technology: {
      title: "Operations Technology and Field Reporting",
      description: "DSO technology supports GPS, digital forms, activity monitoring, audit trails, quality control, and operational reporting.",
      keywords: ["operations technology", "GPS field survey", "digital operations forms", "activity monitoring", "field reporting"],
    },
    industries: {
      title: "Operations Partner for Indonesian Industries",
      description: "DSO supports banking, finance, fintech, insurance, telecommunications, property, and related business sectors.",
      keywords: ["banking operations services", "finance operations support", "fintech operations", "insurance services", "industry operations partner"],
    },
    coverage: {
      title: "Operational Service Coverage Across Indonesia",
      description: "Explore DSO service areas in Jakarta, Banten, West Java, Central Java, East Java, Yogyakarta, Bali, Lampung, and Sulawesi.",
      keywords: ["Indonesia service coverage", "operational services Jakarta", "field survey Indonesia", "collection coverage Indonesia"],
    },
    careers: {
      title: "Careers at DSO",
      description: "DSO roles and recruitment details will be published when positions are available.",
      keywords: ["DSO careers", "operations jobs Indonesia", "call centre careers", "surveyor careers"],
      index: false,
    },
    insight: {
      title: "DSO Operations Insights",
      description: "Articles on operations, data, collection, and compliance will be available when published.",
      keywords: ["operations insights", "collection insights", "business data and compliance"],
      index: false,
    },
    contact: {
      title: "Contact DSO and Request a Proposal",
      description: "Contact DSO about call centre, survey and verification, collection, or data services. Continue proposal requests on WhatsApp.",
      keywords: ["contact DSO", "request operations proposal", "call centre consultation", "contact DSO Indonesia"],
    },
    privacy: {
      title: "DSO Privacy Policy",
      description: "Learn how data is used on the PT Dux Stellae Orientis website, WhatsApp form, and Web SFTP service.",
      keywords: ["DSO privacy policy", "data privacy", "Indonesia data protection"],
    },
    terms: {
      title: "DSO Website Terms of Use",
      description: "Terms for the PT Dux Stellae Orientis website, proposal service, and Web SFTP service.",
      keywords: ["DSO terms of use", "website terms", "SFTP service terms"],
    },
    cookies: {
      title: "DSO Cookie Policy",
      description: "Details about language, Web SFTP login-session, and analytics cookies used by DSO services.",
      keywords: ["DSO cookie policy", "website cookies", "login session cookies"],
    },
  },
} as const satisfies Record<Locale, Record<string, SeoCopy>>;

export type SeoPageKey = keyof typeof seoCopy.id;

const baseKeywords: Record<Locale, readonly string[]> = {
  id: ["DSO Indonesia", "mitra operasional Indonesia", "jasa operasional bisnis"],
  en: ["DSO Indonesia", "operations partner Indonesia", "business operations services"],
};

export function localizedUrl(locale: Locale, path = "") {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  return `${SITE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ""}`;
}

export function buildPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  keywords: readonly string[] = [],
): Metadata {
  const canonical = localizedUrl(locale, path);
  const otherLocale = locale === "id" ? "en" : "id";
  const ogLocale = locale === "id" ? "id_ID" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [...new Set([...baseKeywords[locale], ...keywords])],
    alternates: {
      canonical,
      languages: {
        id: localizedUrl("id", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("id", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Dux Stellae Orientis",
      url: canonical,
      title,
      description,
      locale: ogLocale,
      alternateLocale: [otherLocale === "id" ? "id_ID" : "en_US"],
      images: [{ url: "/brand/logo.png", width: 574, height: 534 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/logo.png"],
    },
  };
}

export function getPageMetadata(locale: Locale, path: string, key: SeoPageKey): Metadata {
  const copy = seoCopy[locale][key] as SeoCopy;
  const metadata = buildPageMetadata(locale, path, copy.title, copy.description, copy.keywords);

  return copy.index === false
    ? { ...metadata, robots: { index: false, follow: true } }
    : metadata;
}
