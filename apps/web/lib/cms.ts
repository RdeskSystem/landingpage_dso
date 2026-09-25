import type { Locale } from "@/i18n/routing";

export type ServiceContent = Readonly<{
  slug: string;
  title: string;
  summary: string;
  scope: string[];
  support: string[];
  process: Readonly<{ title: string; description: string }>[];
}>;

const serviceSlugs = [
  "call-centre",
  "survey-verification",
  "collection",
  "information-data",
] as const;

type CmsService = {
  slug?: string;
  title?: unknown;
  summary?: unknown;
  scope?: { item?: unknown }[];
  support?: { item?: unknown }[];
  process?: { title?: unknown; description?: unknown }[];
};

const fallbackServices: Record<string, Record<Locale, ServiceContent>> = {
  "call-centre": {
    id: {
      slug: "call-centre",
      title: "Call Centre",
      summary: "Komunikasi pelanggan yang profesional, responsif, dan terdokumentasi.",
      scope: ["Outbound dan inbound calling", "Konfirmasi dan follow-up", "Monitoring dan reporting"],
      support: ["Agent dan supervisor", "Call recording", "Quality monitoring"],
      process: [
        { title: "Data dan assignment", description: "Data diterima dan ditinjau sesuai kebutuhan layanan." },
        { title: "Komunikasi", description: "Interaksi dilakukan melalui kanal yang disepakati." },
        { title: "Quality control", description: "Hasil komunikasi dimonitor dan dilaporkan secara terstruktur." },
      ],
    },
    en: {
      slug: "call-centre",
      title: "Call Centre",
      summary: "Professional, responsive, and documented customer communication.",
      scope: ["Outbound and inbound calling", "Confirmation and follow-up", "Monitoring and reporting"],
      support: ["Agents and supervisors", "Call recording", "Quality monitoring"],
      process: [
        { title: "Data and assignment", description: "Data is received and reviewed against the service need." },
        { title: "Communication", description: "Interactions are handled through agreed channels." },
        { title: "Quality control", description: "Communication outcomes are monitored and reported in a structured way." },
      ],
    },
  },
  "survey-verification": {
    id: {
      slug: "survey-verification",
      title: "Survey & Verification",
      summary: "Informasi lapangan yang akurat sebagai dasar keputusan yang lebih tepat.",
      scope: ["Verifikasi customer dan alamat", "Dokumentasi foto dan lokasi", "Laporan digital terstruktur"],
      support: ["Surveyor", "GPS dan form digital", "Quality control lapangan"],
      process: [
        { title: "Assignment", description: "Tugas dan kebutuhan survey ditetapkan secara jelas." },
        { title: "Kunjungan dan verifikasi", description: "Informasi dikumpulkan melalui proses lapangan yang terdokumentasi." },
        { title: "Reporting", description: "Hasil diverifikasi dan disusun menjadi laporan digital." },
      ],
    },
    en: {
      slug: "survey-verification",
      title: "Survey & Verification",
      summary: "Accurate field information for better-informed decisions.",
      scope: ["Customer and address verification", "Photo and location documentation", "Structured digital reporting"],
      support: ["Surveyors", "GPS and digital forms", "Field quality control"],
      process: [
        { title: "Assignment", description: "Survey tasks and requirements are clearly assigned." },
        { title: "Visit and verification", description: "Information is collected through a documented field process." },
        { title: "Reporting", description: "Results are checked and organized into a digital report." },
      ],
    },
  },
  collection: {
    id: {
      slug: "collection",
      title: "Collection & Asset Management",
      summary: "Pengelolaan piutang dan aset dengan pendekatan humanis, tegas, dan sesuai regulasi.",
      scope: ["Desk, field, dan hybrid collection", "Pengawasan aset bermasalah", "Koordinasi legal dan mediasi"],
      support: ["Tim desk dan field", "Monitoring kinerja", "Pelaporan status"],
      process: [
        { title: "Review portofolio", description: "Data dan segmentasi ditinjau untuk menentukan pendekatan yang relevan." },
        { title: "Eksekusi terukur", description: "Desk, field, atau hybrid collection dijalankan sesuai SOP." },
        { title: "Follow-up dan reporting", description: "Perkembangan dan status kasus dilaporkan secara berkala." },
      ],
    },
    en: {
      slug: "collection",
      title: "Collection & Asset Management",
      summary: "Human, firm, and compliant receivables and asset management.",
      scope: ["Desk, field, and hybrid collection", "Distressed asset oversight", "Legal coordination and mediation"],
      support: ["Desk and field teams", "Performance monitoring", "Status reporting"],
      process: [
        { title: "Portfolio review", description: "Data and segmentation are reviewed to define a relevant approach." },
        { title: "Measured execution", description: "Desk, field, or hybrid collection follows the agreed SOP." },
        { title: "Follow-up and reporting", description: "Case progress and status are reported periodically." },
      ],
    },
  },
  "information-data": {
    id: {
      slug: "information-data",
      title: "Information & Data Services",
      summary: "Data yang rapi dan insight yang mudah dipakai untuk kebutuhan operasional.",
      scope: ["Data processing dan updating", "Reporting dan dashboard", "Research support"],
      support: ["Data officer", "Quality system", "Operational reporting"],
      process: [
        { title: "Input data", description: "Data dikumpulkan dari sumber dan assignment yang disepakati." },
        { title: "Quality check", description: "Data diperiksa agar lebih rapi, konsisten, dan siap digunakan." },
        { title: "Insight dan reporting", description: "Hasil disajikan dalam format yang mendukung keputusan." },
      ],
    },
    en: {
      slug: "information-data",
      title: "Information & Data Services",
      summary: "Organized data and practical insight for operational needs.",
      scope: ["Data processing and updating", "Reporting and dashboards", "Research support"],
      support: ["Data officers", "Quality systems", "Operational reporting"],
      process: [
        { title: "Data input", description: "Data is collected from agreed sources and assignments." },
        { title: "Quality check", description: "Data is checked for structure, consistency, and usability." },
        { title: "Insight and reporting", description: "Results are presented in a decision-ready format." },
      ],
    },
  },
};

export async function getServiceBySlug(slug: string, locale: Locale) {
  const encodedSlug = encodeURIComponent(slug);
  const result = await fetchCms<{ docs?: CmsService[] }>(
    `/services?where[slug][equals]=${encodedSlug}&where[published][equals]=true&locale=${locale}&depth=1&limit=1`,
  );
  const service = result?.docs?.[0];

  if (service?.slug && service.title && service.summary) {
    return normalizeService(service, locale);
  }

  return fallbackServices[slug]?.[locale] ?? null;
}

export async function getServices(locale: Locale) {
  const services = await Promise.all(serviceSlugs.map((slug) => getServiceBySlug(slug, locale)));
  return services.filter((service): service is ServiceContent => service !== null);
}

async function fetchCms<T>(path: string): Promise<T | null> {
  const baseUrl = (process.env.PAYLOAD_API_URL || "http://localhost:3001/api").replace(/\/$/, "");

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      next: { revalidate: 60, tags: ["cms"] },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function normalizeService(service: CmsService, locale: Locale): ServiceContent {
  return {
    slug: service.slug || "service",
    title: getLocalized(service.title, locale),
    summary: getLocalized(service.summary, locale),
    scope: (service.scope || []).map((item) => getLocalized(item.item, locale)).filter(Boolean),
    support: (service.support || []).map((item) => getLocalized(item.item, locale)).filter(Boolean),
    process: (service.process || []).map((step) => ({
      title: getLocalized(step.title, locale),
      description: getLocalized(step.description, locale),
    })),
  };
}

function getLocalized(value: unknown, locale: Locale) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const localized = value as Record<string, unknown>;
    return String(localized[locale] || localized.id || localized.en || "");
  }
  return "";
}
