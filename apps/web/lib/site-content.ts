import type { Locale } from "@/i18n/routing";

type Localized<T> = Readonly<{ id: T; en: T }>;

export function localize<T>(value: Localized<T>, locale: Locale) {
  return value[locale];
}

export const values = [
  {
    title: { id: "Integrity & Transparency", en: "Integrity & Transparency" },
    description: { id: "Menjunjung kejujuran, etika, dan keterbukaan dalam setiap pekerjaan.", en: "We uphold honesty, ethics, and openness in every engagement." },
  },
  {
    title: { id: "Empowerment through Innovation", en: "Empowerment through Innovation" },
    description: { id: "Mengembangkan kapabilitas tim melalui pembelajaran, teknologi, dan cara kerja adaptif.", en: "We grow team capability through learning, technology, and adaptive ways of working." },
  },
  {
    title: { id: "Customer Focus & Mutual Respect", en: "Customer Focus & Mutual Respect" },
    description: { id: "Membangun hubungan kerja yang saling menghargai dan berorientasi pada solusi.", en: "We build respectful working relationships focused on practical solutions." },
  },
  {
    title: { id: "Collaboration & Teamwork", en: "Collaboration & Teamwork" },
    description: { id: "Bekerja sebagai satu tim untuk mencapai tujuan yang disepakati.", en: "We work as one team toward shared outcomes." },
  },
  {
    title: { id: "Social & Economic Contribution", en: "Social & Economic Contribution" },
    description: { id: "Menghadirkan kontribusi yang bertanggung jawab bagi ekosistem usaha dan tenaga kerja.", en: "We create responsible contribution for the business and workforce ecosystem." },
  },
  {
    title: { id: "Sustainable Growth & Excellence", en: "Sustainable Growth & Excellence" },
    description: { id: "Membangun pertumbuhan yang konsisten dengan standar layanan yang terus berkembang.", en: "We build consistent growth with continuously improving service standards." },
  },
] as const;

export const teamRoles = [
  { id: "Founder & CEO", en: "Founder & CEO" },
  { id: "Corporate Legal Advisor", en: "Corporate Legal Advisor" },
  { id: "Business Development & Services Head", en: "Business Development & Services Head" },
  { id: "System Developer", en: "System Developer" },
  { id: "Collection Specialist", en: "Collection Specialist" },
  { id: "Collection Specialist", en: "Collection Specialist" },
] as const;

export const industries = [
  { id: "Perbankan", en: "Banking" },
  { id: "Pembiayaan", en: "Finance" },
  { id: "Fintech", en: "Fintech" },
  { id: "Asuransi", en: "Insurance" },
  { id: "E-commerce", en: "E-commerce" },
  { id: "Telekomunikasi", en: "Telecommunications" },
  { id: "Properti", en: "Property" },
  { id: "Utilities", en: "Utilities" },
] as const;

export const ADMIN_WHATSAPP_NUMBER = "62818801120";

export const coverageLocations = [
  { id: "DKI Jakarta", en: "Jakarta", x: 378, y: 350 },
  { id: "Banten", en: "Banten", x: 356, y: 350 },
  { id: "Jawa Barat", en: "West Java", x: 400, y: 362 },
  { id: "Jawa Tengah", en: "Central Java", x: 438, y: 365 },
  { id: "Jawa Timur", en: "East Java", x: 478, y: 369 },
  { id: "Yogyakarta", en: "Yogyakarta", x: 444, y: 376 },
  { id: "Bali", en: "Bali", x: 535, y: 376 },
  { id: "Lampung", en: "Lampung", x: 305, y: 328 },
  { id: "Sulawesi", en: "Sulawesi", x: 705, y: 294 },
] as const;
