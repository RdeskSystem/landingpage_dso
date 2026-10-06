import path from "node:path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { collections } from "./collections";
import { globals } from "./globals";

const smtpHost = process.env.PAYLOAD_EMAIL_SMTP_HOST;
const smtpUser = process.env.PAYLOAD_EMAIL_SMTP_USER;
const smtpPassword = process.env.PAYLOAD_EMAIL_SMTP_PASS;
const smtpPort = Number(process.env.PAYLOAD_EMAIL_SMTP_PORT || 587);

if (smtpHost && smtpUser && smtpPassword && (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535)) {
  throw new Error("PAYLOAD_EMAIL_SMTP_PORT must be a valid TCP port.");
}

const emailAdapter = smtpHost && smtpUser && smtpPassword
  ? nodemailerAdapter({
      defaultFromAddress: process.env.PAYLOAD_EMAIL_FROM_ADDRESS || smtpUser,
      defaultFromName: process.env.PAYLOAD_EMAIL_FROM_NAME || "PT Dux Stellae Orientis",
      transportOptions: {
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPassword },
      },
    })
  : undefined;

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
  ...(emailAdapter ? { email: emailAdapter } : {}),
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
