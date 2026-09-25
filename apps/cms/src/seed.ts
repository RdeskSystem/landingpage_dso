import { getPayload } from "payload";
import config from "./payload.config";

const services = [
  {
    slug: "call-centre",
    title: { id: "Call Centre", en: "Call Centre" },
    summary: {
      id: "Komunikasi pelanggan yang profesional, responsif, dan terdokumentasi.",
      en: "Professional, responsive, and documented customer communication.",
    },
    icon: "headphones",
    scope: [
      { item: { id: "Outbound dan inbound calling", en: "Outbound and inbound calling" } },
      { item: { id: "Konfirmasi dan follow-up", en: "Confirmation and follow-up" } },
      { item: { id: "Monitoring dan reporting", en: "Monitoring and reporting" } },
    ],
    support: [
      { item: { id: "Agent dan supervisor", en: "Agents and supervisors" } },
      { item: { id: "Call recording", en: "Call recording" } },
      { item: { id: "Quality monitoring", en: "Quality monitoring" } },
    ],
    process: [
      { title: { id: "Data dan assignment", en: "Data and assignment" }, description: { id: "Data diterima dan ditinjau sesuai kebutuhan layanan.", en: "Data is received and reviewed against the service need." } },
      { title: { id: "Komunikasi", en: "Communication" }, description: { id: "Interaksi dilakukan melalui kanal yang disepakati.", en: "Interactions are handled through agreed channels." } },
      { title: { id: "Quality control", en: "Quality control" }, description: { id: "Hasil komunikasi dimonitor dan dilaporkan secara terstruktur.", en: "Communication outcomes are monitored and reported in a structured way." } },
    ],
    published: true,
    order: 1,
  },
  {
    slug: "survey-verification",
    title: { id: "Survey & Verification", en: "Survey & Verification" },
    summary: {
      id: "Informasi lapangan yang akurat sebagai dasar keputusan yang lebih tepat.",
      en: "Accurate field information for better-informed decisions.",
    },
    icon: "radar",
    scope: [
      { item: { id: "Verifikasi customer dan alamat", en: "Customer and address verification" } },
      { item: { id: "Dokumentasi foto dan lokasi", en: "Photo and location documentation" } },
      { item: { id: "Laporan digital terstruktur", en: "Structured digital reporting" } },
    ],
    support: [
      { item: { id: "Surveyor", en: "Surveyors" } },
      { item: { id: "GPS dan form digital", en: "GPS and digital forms" } },
      { item: { id: "Quality control lapangan", en: "Field quality control" } },
    ],
    process: [
      { title: { id: "Assignment", en: "Assignment" }, description: { id: "Tugas dan kebutuhan survey ditetapkan secara jelas.", en: "Survey tasks and requirements are clearly assigned." } },
      { title: { id: "Kunjungan dan verifikasi", en: "Visit and verification" }, description: { id: "Informasi dikumpulkan melalui proses lapangan yang terdokumentasi.", en: "Information is collected through a documented field process." } },
      { title: { id: "Reporting", en: "Reporting" }, description: { id: "Hasil diverifikasi dan disusun menjadi laporan digital.", en: "Results are checked and organized into a digital report." } },
    ],
    published: true,
    order: 2,
  },
  {
    slug: "collection",
    title: { id: "Collection & Asset Management", en: "Collection & Asset Management" },
    summary: {
      id: "Pengelolaan piutang dan aset dengan pendekatan humanis, tegas, dan sesuai regulasi.",
      en: "Human, firm, and compliant receivables and asset management.",
    },
    icon: "shield-check",
    scope: [
      { item: { id: "Desk, field, dan hybrid collection", en: "Desk, field, and hybrid collection" } },
      { item: { id: "Pengawasan aset bermasalah", en: "Distressed asset oversight" } },
      { item: { id: "Koordinasi legal dan mediasi", en: "Legal coordination and mediation" } },
    ],
    support: [
      { item: { id: "Tim desk dan field", en: "Desk and field teams" } },
      { item: { id: "Monitoring kinerja", en: "Performance monitoring" } },
      { item: { id: "Pelaporan status", en: "Status reporting" } },
    ],
    process: [
      { title: { id: "Review portofolio", en: "Portfolio review" }, description: { id: "Data dan segmentasi ditinjau untuk menentukan pendekatan yang relevan.", en: "Data and segmentation are reviewed to define a relevant approach." } },
      { title: { id: "Eksekusi terukur", en: "Measured execution" }, description: { id: "Desk, field, atau hybrid collection dijalankan sesuai SOP.", en: "Desk, field, or hybrid collection follows the agreed SOP." } },
      { title: { id: "Follow-up dan reporting", en: "Follow-up and reporting" }, description: { id: "Perkembangan dan status kasus dilaporkan secara berkala.", en: "Case progress and status are reported periodically." } },
    ],
    published: true,
    order: 3,
  },
  {
    slug: "information-data",
    title: { id: "Information & Data Services", en: "Information & Data Services" },
    summary: {
      id: "Data yang rapi dan insight yang mudah dipakai untuk kebutuhan operasional.",
      en: "Organized data and practical insight for operational needs.",
    },
    icon: "bar-chart",
    scope: [
      { item: { id: "Data processing dan updating", en: "Data processing and updating" } },
      { item: { id: "Reporting dan dashboard", en: "Reporting and dashboards" } },
      { item: { id: "Research support", en: "Research support" } },
    ],
    support: [
      { item: { id: "Data officer", en: "Data officers" } },
      { item: { id: "Quality system", en: "Quality systems" } },
      { item: { id: "Operational reporting", en: "Operational reporting" } },
    ],
    process: [
      { title: { id: "Input data", en: "Data input" }, description: { id: "Data dikumpulkan dari sumber dan assignment yang disepakati.", en: "Data is collected from agreed sources and assignments." } },
      { title: { id: "Quality check", en: "Quality check" }, description: { id: "Data diperiksa agar lebih rapi, konsisten, dan siap digunakan.", en: "Data is checked for structure, consistency, and usability." } },
      { title: { id: "Insight dan reporting", en: "Insight and reporting" }, description: { id: "Hasil disajikan dalam format yang mendukung keputusan.", en: "Results are presented in a decision-ready format." } },
    ],
    published: true,
    order: 4,
  },
];

const industries = [
  ["banking", "Perbankan", "Banking"],
  ["finance", "Pembiayaan", "Finance"],
  ["fintech", "Fintech", "Fintech"],
  ["insurance", "Asuransi", "Insurance"],
  ["ecommerce", "E-commerce", "E-commerce"],
  ["telecom", "Telekomunikasi", "Telecommunications"],
  ["property", "Properti", "Property"],
  ["utilities", "Utilities", "Utilities"],
] as const;

const cities = [
  ["jakarta", "Jakarta", "DKI Jakarta"],
  ["banten", "Banten", "Banten"],
  ["jawa-barat", "Jawa Barat", "West Java"],
  ["jawa-tengah", "Jawa Tengah", "Central Java"],
  ["jawa-timur", "Jawa Timur", "East Java"],
  ["yogyakarta", "Yogyakarta", "Yogyakarta"],
  ["bali", "Bali", "Bali"],
  ["lampung", "Lampung", "Lampung"],
  ["sulawesi", "Sulawesi", "Sulawesi"],
] as const;

type SeedData = Record<string, unknown>;

async function upsert(collection: string, field: string, value: string, data: SeedData) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
    locale: "id",
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      locale: "all",
      data,
      overrideAccess: true,
    });
    return "updated";
  }

  await payload.create({
    collection,
    locale: "all",
    data,
    overrideAccess: true,
  });
  return "created";
}

async function updateLocalizedGlobal(slug: "site-settings" | "home" | "stats", data: SeedData) {
  await payload.updateGlobal({
    slug,
    locale: "all",
    data,
    overrideAccess: true,
  });
}

const payload = await getPayload({ config });

for (const service of services) await upsert("services", "slug", service.slug, service);

for (const [key, id, en] of industries) {
  await upsert("industries", "slug", key, {
    slug: key,
    name: { id, en },
    icon: key,
    description: { id: `Dukungan operasional untuk sektor ${id}.`, en: `Operational support for the ${en} sector.` },
    order: industries.findIndex(([industryKey]) => industryKey === key) + 1,
    published: true,
  });
}

for (const [key, id, en] of cities) {
  await upsert("coverage-cities", "svgId", key, {
    name: { id, en },
    region: { id, en },
    svgId: key,
    order: cities.findIndex(([cityKey]) => cityKey === key) + 1,
    published: true,
  });
}

await updateLocalizedGlobal("site-settings", {
    contact: {
      phone: "+62 818 801120",
      email: "cs@stellaeorientis.co.id",
      whatsapp: "62818801120",
    },
    addresses: [
      {
        label: { id: "Head Office", en: "Head Office" },
        address: {
          id: "ArvaHub Office, Jl. Prof. DR. Soepomo SH No.23, Tebet Barat, Jakarta Selatan 12810.",
          en: "ArvaHub Office, Jl. Prof. DR. Soepomo SH No.23, Tebet Barat, South Jakarta 12810.",
        },
      },
      {
        label: { id: "Operational Office", en: "Operational Office" },
        address: {
          id: "Grand Centerpoint, Jl. Ahmad Yani Kav.20, Tower D GF47-49, Bekasi Selatan 17141.",
          en: "Grand Centerpoint, Jl. Ahmad Yani Kav.20, Tower D GF47-49, South Bekasi 17141.",
        },
      },
    ],
    featureFlags: { showClientLogos: false, showCertBadges: false, showInsight: false },
  });

await updateLocalizedGlobal("home", {
    hero: {
      eyebrow: { id: "People. Process. Performance.", en: "People. Process. Performance." },
      title: {
        id: "Mitra operasional dan penagihan yang bergerak dengan kepastian.",
        en: "An operations and collection partner built for certainty.",
      },
      description: {
        id: "DSO memadukan SDM terlatih, proses terstruktur, dan teknologi real-time untuk komunikasi pelanggan, verifikasi data, serta pengelolaan piutang.",
        en: "DSO combines trained people, structured processes, and real-time technology for customer communication, data verification, and receivables management.",
      },
    },
    cta: {
      title: { id: "Bersama DSO, operasi lebih ringan dan hasil lebih optimal.", en: "With DSO, operations feel lighter and outcomes go further." },
      description: { id: "Ceritakan kebutuhan operasional Anda.", en: "Tell us what your operation needs." },
    },
    sections: { showClients: false, showTeam: true, showCoverage: true },
  });

await updateLocalizedGlobal("stats", {
    items: [
      { key: "assets-managed", value: "Rp350 miliar+", label: { id: "Aset dikelola", en: "Assets managed" }, approved: false },
      { key: "corporate-clients", value: "9", label: { id: "Klien korporat aktif", en: "Active corporate clients" }, approved: false },
      { key: "coverage", value: "9", suffix: "kota", label: { id: "Cakupan area", en: "Coverage" }, approved: false },
      { key: "active-agents", value: "73+", label: { id: "Agen aktif", en: "Active agents" }, approved: false },
    ],
  });

console.log("DSO seed completed. All numerical stats remain unapproved by default.");
process.exit(0);
