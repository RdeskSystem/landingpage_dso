import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";

const locales = ["id", "en"] as const;
const paths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "tentang", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "tentang/tim", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "tentang/kepatuhan", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "layanan", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "layanan/call-centre", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "layanan/survey-verification", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "layanan/collection", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "layanan/information-data", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "teknologi", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "industri", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "jangkauan", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "kontak", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "privasi", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "syarat", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "cookies", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.flatMap((locale) =>
      paths.map(({ path, priority, changeFrequency }) => ({
        url: localizedUrl(locale, path),
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            id: localizedUrl("id", path),
            en: localizedUrl("en", path),
            "x-default": localizedUrl("id", path),
          },
        },
      })),
    ),
  ];
}
