import { FileLock2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export function LegalNotice({ locale, kind }: Readonly<{ locale: Locale; kind: "privacy" | "terms" }>) {
  const id = locale === "id";
  return (
    <section className="bg-[var(--dso-mist)] py-20 sm:py-28">
      <div className="container-shell max-w-3xl">
        <div className="rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-8 sm:p-12">
          <FileLock2 className="text-[var(--dso-red)]" size={28} strokeWidth={1.6} aria-hidden="true" />
          <h2 className="mt-8 font-display text-2xl font-bold">{id ? "Dokumen sedang dalam review." : "Document under review."}</h2>
          <p className="mt-5 text-sm leading-8 text-[var(--dso-muted)]">{kind === "privacy"
            ? id ? "Kebijakan Privasi final akan memuat jenis data yang diproses, tujuan penggunaan, hak pemilik data, keamanan, dan kebijakan retensi lead setelah disetujui manajemen." : "The final Privacy Policy will describe processed data, purposes, data subject rights, security, and lead retention after management approval."
            : id ? "Syarat penggunaan final akan ditambahkan setelah review legal." : "The final Terms of Use will be added after legal review."}</p>
          <p className="mt-8 border-t border-[var(--dso-line)] pt-5 text-sm text-[var(--dso-muted)]">{id ? "Untuk pertanyaan umum, gunakan cs@stellaeorientis.co.id." : "For general questions, contact cs@stellaeorientis.co.id."}</p>
        </div>
      </div>
    </section>
  );
}
