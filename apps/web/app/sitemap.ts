import type { MetadataRoute } from "next";

const siteUrl = "https://web.duxorientis.com";
const paths = [
  "",
  "/tentang",
  "/tentang/tim",
  "/tentang/kepatuhan",
  "/layanan",
  "/layanan/call-centre",
  "/layanan/survey-verification",
  "/layanan/collection",
  "/layanan/information-data",
  "/teknologi",
  "/industri",
  "/jangkauan",
  "/karier",
  "/insight",
  "/kontak",
  "/privasi",
  "/syarat",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["id", "en"].flatMap((locale) =>
      paths.map((path) => ({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
      })),
    ),
  ];
}
