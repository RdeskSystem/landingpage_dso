import type { CollectionConfig, Field } from "payload";
import {
  consentedTeamOnly,
  isAdmin,
  isAdminOrEditor,
  isAdminOrSales,
  permittedClientsOnly,
  publishedOnly,
  verifiedCertificationsOnly,
} from "../access";
import { revalidateCollectionAfterChange, revalidateCollectionAfterDelete } from "../revalidate-cms";

const localizedText = (name: string, required = false): Field => ({
  name,
  type: "text",
  localized: true,
  required,
});

const localizedTextarea = (name: string, required = false): Field => ({
  name,
  type: "textarea",
  localized: true,
  required,
});

const publishedField: Field = {
  name: "published",
  type: "checkbox",
  defaultValue: false,
};

const orderField: Field = {
  name: "order",
  type: "number",
  defaultValue: 0,
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    admin: ({ req }) =>
      Boolean(
        req.user &&
          typeof req.user === "object" &&
          "role" in req.user &&
          (req.user as { role?: string }).role === "admin",
      ),
    create: isAdmin,
    read: isAdminOrEditor,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Sales", value: "sales" },
      ],
    },
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf", "video/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "focalPoint",
      type: "group",
      fields: [
        { name: "x", type: "number", min: 0, max: 1, defaultValue: 0.5 },
        { name: "y", type: "number", min: 0, max: 1, defaultValue: 0.5 },
      ],
    },
  ],
};

export const Services: CollectionConfig = {
  slug: "services",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: publishedOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    { name: "slug", type: "text", required: true, unique: true },
    localizedText("title", true),
    localizedTextarea("summary", true),
    { name: "icon", type: "text" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "scope",
      type: "array",
      fields: [localizedText("item", true)],
    },
    {
      name: "support",
      type: "array",
      fields: [localizedText("item", true)],
    },
    {
      name: "process",
      type: "array",
      fields: [localizedText("title", true), localizedTextarea("description", true)],
    },
    {
      name: "faq",
      type: "array",
      fields: [localizedText("question", true), localizedTextarea("answer", true)],
    },
    orderField,
    publishedField,
  ],
};

export const Industries: CollectionConfig = {
  slug: "industries",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: publishedOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [{ name: "slug", type: "text", required: true, unique: true }, localizedText("name", true), { name: "icon", type: "text" }, localizedTextarea("description"), orderField, publishedField],
};

export const Clients: CollectionConfig = {
  slug: "clients",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: permittedClientsOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    localizedText("name", true),
    { name: "logo", type: "upload", relationTo: "media" },
    orderField,
    { name: "permissionConfirmed", type: "checkbox", defaultValue: false },
  ],
};

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: consentedTeamOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    { name: "name", type: "text", required: true },
    localizedText("role", true),
    localizedTextarea("bio", true),
    { name: "photo", type: "upload", relationTo: "media" },
    orderField,
    { name: "publicConsent", type: "checkbox", defaultValue: false },
  ],
};

export const CoverageCities: CollectionConfig = {
  slug: "coverage-cities",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: publishedOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    localizedText("name", true),
    localizedText("region"),
    { name: "latitude", type: "number" },
    { name: "longitude", type: "number" },
    { name: "svgId", type: "text" },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true },
    orderField,
    publishedField,
  ],
};

export const Certifications: CollectionConfig = {
  slug: "certifications",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: verifiedCertificationsOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    localizedText("title", true),
    localizedText("issuer", true),
    { name: "number", type: "text" },
    { name: "validUntil", type: "date" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "verifyUrl", type: "text" },
    { name: "verified", type: "checkbox", defaultValue: false },
  ],
};

export const Posts: CollectionConfig = {
  slug: "posts",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: publishedOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    { name: "slug", type: "text", required: true, unique: true },
    localizedText("title", true),
    localizedTextarea("excerpt", true),
    { name: "body", type: "richText" },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "publishedAt", type: "date" },
    {
      name: "seo",
      type: "group",
      fields: [localizedText("title"), localizedTextarea("description")],
    },
    publishedField,
  ],
};

export const Jobs: CollectionConfig = {
  slug: "jobs",
  hooks: { afterChange: [revalidateCollectionAfterChange], afterDelete: [revalidateCollectionAfterDelete] },
  access: { read: publishedOnly, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdminOrEditor },
  fields: [
    { name: "slug", type: "text", required: true, unique: true },
    localizedText("title", true),
    { name: "location", type: "text", required: true },
    { name: "type", type: "select", options: ["Full-time", "Part-time", "Contract", "Internship"] },
    localizedTextarea("description", true),
    { name: "requirements", type: "array", fields: [localizedText("item", true)] },
    { name: "status", type: "select", defaultValue: "open", options: ["open", "closed", "draft"] },
    { name: "closingDate", type: "date" },
    publishedField,
  ],
};

export const Leads: CollectionConfig = {
  slug: "leads",
  access: {
    create: () => true,
    read: isAdminOrSales,
    update: isAdminOrSales,
    delete: isAdmin,
  },
  admin: { defaultColumns: ["name", "company", "email", "status", "createdAt"] },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "position", type: "text" },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "services", type: "select", hasMany: true, options: ["call-centre", "survey-verification", "collection", "information-data"] },
    { name: "message", type: "textarea" },
    { name: "locale", type: "select", options: ["id", "en"] },
    { name: "source", type: "text", defaultValue: "website" },
    { name: "status", type: "select", defaultValue: "new", options: ["new", "contacted", "closed"] },
  ],
};

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Services,
  Industries,
  Clients,
  TeamMembers,
  CoverageCities,
  Certifications,
  Posts,
  Jobs,
  Leads,
];
