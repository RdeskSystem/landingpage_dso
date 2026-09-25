import type { GlobalConfig } from "payload";
import { isAdminOrEditor } from "../access";
import { revalidateGlobalAfterChange } from "../revalidate-cms";

const localizedText = (name: string, required = false) => ({
  name,
  type: "text" as const,
  localized: true,
  required,
});

const localizedTextarea = (name: string, required = false) => ({
  name,
  type: "textarea" as const,
  localized: true,
  required,
});

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  access: { read: () => true, update: isAdminOrEditor },
  fields: [
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "phone", type: "text", defaultValue: "+62 818 801120" },
        { name: "email", type: "email", defaultValue: "cs@stellaeorientis.co.id" },
        { name: "whatsapp", type: "text", defaultValue: "62818801120" },
      ],
    },
    {
      name: "addresses",
      type: "array",
      fields: [
        localizedText("label", true),
        localizedTextarea("address", true),
        { name: "mapEmbed", type: "text" },
      ],
    },
    {
      name: "social",
      type: "array",
      fields: [{ name: "platform", type: "text" }, { name: "url", type: "text" }],
    },
    {
      name: "featureFlags",
      type: "group",
      fields: [
        { name: "showClientLogos", type: "checkbox", defaultValue: false },
        { name: "showCertBadges", type: "checkbox", defaultValue: false },
        { name: "showInsight", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};

export const Stats: GlobalConfig = {
  slug: "stats",
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  access: { read: () => true, update: isAdminOrEditor },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "key", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "suffix", type: "text" },
        localizedText("label", true),
        { name: "approved", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};

export const Home: GlobalConfig = {
  slug: "home",
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  access: { read: () => true, update: isAdminOrEditor },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [localizedText("eyebrow"), localizedText("title", true), localizedTextarea("description", true)],
    },
    {
      name: "cta",
      type: "group",
      fields: [localizedText("title"), localizedTextarea("description")],
    },
    {
      name: "sections",
      type: "group",
      fields: [
        { name: "showClients", type: "checkbox", defaultValue: false },
        { name: "showTeam", type: "checkbox", defaultValue: true },
        { name: "showCoverage", type: "checkbox", defaultValue: true },
      ],
    },
  ],
};

export const globals: GlobalConfig[] = [SiteSettings, Stats, Home];
