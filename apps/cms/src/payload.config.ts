import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { collections } from "./collections";
import { globals } from "./globals";

export default buildConfig({
  admin: {
    user: "users",
  },
  collections,
  globals,
  editor: lexicalEditor(),
  localization: {
    locales: ["id", "en"],
    defaultLocale: "id",
  },
  secret: process.env.PAYLOAD_SECRET || "development-only-payload-secret",
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        "postgresql://dso:dso_local_password@localhost:5432/dso",
    },
  }),
  typescript: {
    outputFile: path.resolve(process.cwd(), "generated-types.ts"),
  },
});
