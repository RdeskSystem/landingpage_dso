# DSO Website - Project Progress

Dokumen kerja untuk memulai dan melacak pembangunan website company profile PT Dux Stellae Orientis (DSO). Gunakan bersama `docs/DSO Company Profile Website - Blueprint.md`.

**Tanggal pembaruan:** 2026-09-26
**Status proyek:** Production online; admin login assets fixed, WhatsApp form, Services catalog, and Indonesia coverage maps deployed
**Fase aktif:** Fase 4 - Final content review and optional integrations

## 1. Baseline Proyek

| Item | Keputusan |
|---|---|
| Klien | PT Dux Stellae Orientis (DSO) |
| URL publik | `https://web.duxorientis.com` |
| Canonical site URL | `https://web.duxorientis.com` |
| Locale | `id` sebagai default, `en` sebagai bahasa kedua |
| Routing | `/{locale}/...` |
| Framework | Next.js App Router + TypeScript |
| CMS | Payload CMS |
| Database | PostgreSQL |
| Kontak publik | `+62 818 801120`, `cs@stellaeorientis.co.id` |
| Logo kanonik | `assets/logo.png` |
| Favicon kanonik | `assets/favicon.ico` |
| Admin CMS | `/admin`, akses terbatas |

Domain `web.duxorientis.com` ditetapkan berdasarkan instruksi proyek terbaru dan menggantikan referensi domain lama di dokumen sumber. Jangan gunakan `duxstellaeorientis.com` sebagai canonical, metadata, sitemap, tautan CTA, atau konfigurasi deployment.

## 2. Progress Saat Ini

| Area | Status | Catatan |
|---|---|---|
| Blueprint arsitektur | Selesai | Sudah dibaca dan dijadikan acuan implementasi |
| Compro Call Centre & Surveyor | Selesai dibaca | Sumber konten rahasia; perlu penyaringan publik |
| Compro General | Selesai dibaca | Sumber konten rahasia; perlu penyaringan publik |
| Aset logo | Siap | `assets/logo.png`, PNG RGBA transparan |
| Aset favicon | Siap | `assets/favicon.ico`, favicon transparan multi-size |
| Domain | Ditetapkan | `https://web.duxorientis.com` |
| Scaffold aplikasi | Selesai | npm workspaces, `apps/web`, dan `apps/cms` |
| Design tokens | Selesai | Token DSO dan Tailwind 4 sudah tersedia |
| CMS dan database | Berjalan | Payload native via PM2; PostgreSQL Docker sehat; baseline migration applied; bilingual seed terverifikasi |
| CMS client | Selesai | REST fetch dengan fallback lokal dan revalidation 60 detik |
| Halaman publik | Fase 2 awal selesai | Homepage, layanan, kontak, profil, teknologi, industri, coverage, karier, insight, dan legal tersedia |
| Form Request Proposal | Terimplementasi | Validasi Zod lalu mengirim draft pesan melalui WhatsApp ke nomor admin `62818801120`; tanpa SMTP/API key |
| Deployment | Live | Web/CMS native via PM2, Nginx, HTTPS; PostgreSQL masih container Docker |

## 3. Sumber dan Aturan Konten

- `docs/DSO Company Profile Website - Blueprint.md` adalah acuan arsitektur, sitemap, model data, dan urutan fase.
- `docs/Company Profile PT Dux Stellae Orientis - Call Centre & Surveyor.md` adalah sumber layanan Call Centre, Survey & Verification, teknologi, quality control, dan value proposition.
- `docs/Company Profile PT Dux Stellae Orientis - General.md` adalah sumber profil, collection, asset management, jangkauan, dan struktur tim.
- Kedua dokumen compro berlabel rahasia. Konten publik harus ditulis ulang secara aman, bukan menyalin seluruh dokumen mentah.
- Gunakan hanya kontak perusahaan publik: `+62 818 801120` dan `cs@stellaeorientis.co.id`.
- Jangan mempublikasikan nomor telepon, email, afiliasi organisasi, atau detail pribadi anggota tim.
- Jangan mempublikasikan wajah debitur/nasabah, plat nomor, data nyata, screenshot dashboard nyata, atau dokumen lapangan sensitif.
- Jangan menampilkan logo klien sebelum izin tertulis. Default `SHOW_CLIENT_LOGOS=false`.
- Jangan menampilkan badge sertifikasi sebelum nomor dan tautan verifikasi disetujui. Default `SHOW_CERT_BADGES=false`.
- Gunakan bahasa penagihan yang profesional, humanis, tegas, dan sesuai regulasi. Hindari klaim intimidasi.
- Semua angka dan klaim performa yang tampil publik harus melalui field `approved` atau persetujuan manajemen.

## 4. Asset Mapping

Sumber aset yang harus digunakan oleh website adalah folder `assets/`.

| Sumber | Target saat app dibuat | Kegunaan |
|---|---|---|
| `assets/logo.png` | `apps/web/public/brand/logo.png` | Logo header, hero, footer, OG image jika sesuai |
| `assets/favicon.ico` | `apps/web/public/favicon.ico` | Browser favicon |

Salinan yang sudah ada di `public/` boleh dipakai sebagai hasil sementara, tetapi perubahan sumber logo harus dilakukan pada `assets/` terlebih dahulu. Verifikasi kembali alpha channel dan tampilan logo di latar terang serta gelap setelah asset pipeline dibuat.

## 5. Feature Flags Awal

Gunakan nilai aman berikut pada local, staging, dan production sampai ada persetujuan:

```env
SHOW_CLIENT_LOGOS=false
SHOW_CERT_BADGES=false
SHOW_INSIGHT=false
```

## 6. Rencana Eksekusi

### Fase 0 - Setup

- [x] Inisialisasi workspace/monorepo dengan `apps/web` dan `apps/cms`.
- [x] Tetapkan npm workspaces, TypeScript, ESLint, Prettier, dan konfigurasi workspace.
- [x] Buat Next.js App Router dengan route group publik `app/[locale]/(site)/`.
- [x] Setup `next-intl` untuk `id` dan `en`; `id` menjadi locale default.
- [x] Set `NEXT_PUBLIC_SITE_URL=https://web.duxorientis.com`.
- [x] Salin atau expose asset dari `assets/` ke `apps/web/public/brand/`.
- [x] Tambahkan `logo`, `favicon`, canonical, sitemap, robots, dan metadata berbasis domain final.
- [x] Tambahkan font self-host melalui `next/font`: Plus Jakarta Sans dan Inter.
- [x] Definisikan design tokens DSO di `styles/tokens.css` dan konfigurasi Tailwind.
- [x] Bangun layout awal: skip link, Navbar, Footer, dan language switch.
- [x] Siapkan Payload CMS, PostgreSQL lokal, Docker Compose, Dockerfile, dan `.env.example`.
- [x] Dokumentasikan cara menjalankan lokal di `README.md`.

### Fase 1 - Data dan CMS

- [x] Buat collections `Services`, `Industries`, `Clients`, `TeamMembers`, `CoverageCities`, `Certifications`, `Posts`, `Jobs`, `Leads`, dan `Media`.
- [x] Buat globals `SiteSettings`, `Stats`, dan `Home`.
- [x] Aktifkan localization untuk seluruh teks publik (`id`, `en`).
- [x] Terapkan access control untuk `published`, role `admin`, `editor`, dan `sales`.
- [x] Terapkan persetujuan `permissionConfirmed`, `publicConsent`, `verified`, dan `approved`.
- [x] Siapkan seed copy awal yang aman; eksekusi menunggu PostgreSQL aktif.
- [x] Batasi pembacaan data lead ke role yang berwenang; alur form publik diarahkan langsung ke WhatsApp.

### Fase 2 - Halaman dan Komponen

- [x] Bangun fondasi UI awal: Button, SectionHeader, ServiceCard, HeroVisual, Navbar, dan Footer.
- [x] Bangun vertical slice Beranda dengan hero, services, workflow, technology, coverage, dan CTA.
- [x] Bangun halaman Kontak awal dengan Request Proposal form.
- [x] Bangun detail Layanan dan empat template layanan dengan CMS fallback.
- [x] Bangun Tentang, Tim, dan Kepatuhan dengan konten publik yang aman.
- [x] Bangun Teknologi, Industri, dan Jangkauan.
- [x] Bangun halaman Kontak, Karier, Insight, dan legal bilingual; data lowongan/artikel tetap menunggu CMS/approval.
- [x] Buat mockup aplikasi/dashboard dengan data dummy dan label `Ilustrasi`.
- [x] Pastikan semua halaman tersedia untuk `id` dan `en`.

### Fase 3 - Integrasi

- [x] Implementasikan Request Proposal dengan React Hook Form, validasi Zod client-side, dan pesan WhatsApp terisi otomatis.
- [x] Arahkan pengiriman form langsung ke nomor WhatsApp admin yang sudah digunakan situs; SMTP dan Turnstile tidak diperlukan.
- [x] Implementasikan event Plausible `cta_click`, `lead_submit`, `whatsapp_click`, dan `phone_click`; aktif setelah `NEXT_PUBLIC_ANALYTICS_ID` diisi.
- [x] Tambahkan JSON-LD Organization dan WebSite; tipe halaman lain menunggu konten dinamis.
- [x] Tambahkan metadata, OG image, canonical, `hreflang`, sitemap dinamis, dan robots.
- [x] Tambahkan webhook CMS terautentikasi untuk revalidate ISR; endpoint dan hook CMS sudah smoke-tested.
- [x] Pastikan semua feature flag memiliki default aman.
- [x] Siapkan Payload Nodemailer adapter bersyarat untuk email autentikasi/reset; aktivasi menunggu kredensial SMTP Mailspace. Form Request Proposal tetap melalui WhatsApp.
- [ ] Mailbox untuk setiap pengguna harus dibuat/diaktifkan di penyedia email; CMS users bukan mailbox.

### Fase 4 - QA dan Launch

- [x] Uji homepage dan Coverage pada viewport 360, 768, 1024, dan 1440 pixel; tidak ada horizontal overflow.
- [ ] Uji keyboard navigation dan visible focus; audit axe homepage, Services, Coverage, dan Contact menunjukkan 0 violation (kontras pada gradient masih `incomplete`).
- [x] Uji validasi form dan draft WhatsApp ID dengan data QA; link mengarah ke nomor admin beserta isi form, pesan tidak dikirim.
- [ ] Uji access control Payload untuk publik, editor, sales, dan admin.
- [x] Tambahkan CSP, HSTS, X-Frame-Options, Referrer-Policy, dan Permissions-Policy.
- [x] Jalankan lint, typecheck, dan build.
- [ ] Jalankan Lighthouse dan pemeriksaan broken links.
- [ ] Uji backup database dan restore di staging.
- [x] Deploy production native ke `web.duxorientis.com`.
- [ ] Deploy staging dan lakukan review konten sebelum final launch.

## 7. Sitemap Implementasi

Semua route publik memakai prefix locale:

- [x] `/{locale}` - Beranda
- [ ] `/{locale}/tentang`
- [ ] `/{locale}/tentang/tim`
- [ ] `/{locale}/tentang/kepatuhan`
- [x] `/{locale}/layanan`
- [x] `/{locale}/layanan/call-centre`
- [x] `/{locale}/layanan/survey-verification`
- [x] `/{locale}/layanan/collection`
- [x] `/{locale}/layanan/information-data`
- [ ] `/{locale}/teknologi`
- [x] `/{locale}/industri`
- [x] `/{locale}/jangkauan`
- [ ] `/{locale}/karier`
- [ ] `/{locale}/karier/[slug]`
- [ ] `/{locale}/insight`
- [ ] `/{locale}/insight/[slug]`
- [x] `/{locale}/kontak`
- [ ] `/{locale}/privasi`
- [ ] `/{locale}/syarat`
- [ ] `/sitemap.xml`, `/robots.txt`, halaman 404, dan halaman 500 bermerek

## 8. Content Blockers

Jangan mengisi keputusan berikut dari asumsi. Gunakan placeholder dan flag sampai ada konfirmasi:

- [ ] Jumlah pelanggan resmi: sumber memuat `60.000+` dan `12.000`.
- [x] Domain publik: `https://web.duxorientis.com`.
- [ ] Izin dan daftar logo klien.
- [ ] Sertifikasi, nomor sertifikat, tanggal berlaku, dan URL verifikasi.
- [ ] Persetujuan publikasi foto, nama, dan bio anggota tim.
- [ ] Tahun berdiri dan milestone perusahaan.
- [ ] KPI/SLA yang boleh dipublikasikan.
- [x] Publikasikan Kebijakan Privasi, Syarat Penggunaan, dan Kebijakan Cookie bilingual sesuai alur WhatsApp, website, dan Web SFTP.
- [ ] Konfirmasi jadwal retensi berkas SFTP sesuai kebutuhan proyek dan review legal manajemen.
- [ ] Foto/video asli non-sensitif untuk hero dan halaman layanan.

## 9. Environment Baseline

`.env.example` minimal harus menyediakan:

```env
DATABASE_URI=
PAYLOAD_SECRET=
NEXT_PUBLIC_SITE_URL=https://web.duxorientis.com
PAYLOAD_API_URL=http://localhost:3001/api
PAYLOAD_REVALIDATE_URL=http://localhost:3000/api/revalidate
PAYLOAD_REVALIDATE_SECRET=
NEXT_PUBLIC_ANALYTICS_ID=
SHOW_CLIENT_LOGOS=false
SHOW_CERT_BADGES=false
SHOW_INSIGHT=false
```

Jangan memasukkan secret, kredensial database/Payload, atau data pribadi ke repository.

## 10. Definition of Done

- [x] Route sitemap tersedia dalam bahasa Indonesia dan Inggris; production smoke test untuk route layanan ID/EN berhasil.
- [x] Domain, canonical, metadata, sitemap, robots, dan link internal memakai `https://web.duxorientis.com`.
- [ ] Tidak ada konten rahasia atau data pribadi yang lolos ke build publik.
- [ ] Logo dan favicon berasal dari `assets/` dan tampil transparan.
- [x] Perubahan CMS memanggil webhook ISR dan merevalidasi tag `cms`.
- [x] Form Request Proposal memvalidasi input, lalu meneruskan pesan terisi otomatis ke WhatsApp admin.
- [x] Feature flag klien, sertifikasi, dan insight bekerja dengan default aman.
- [ ] Target Lighthouse dan aksesibilitas blueprint telah diverifikasi.
- [x] README mencakup setup lokal, native deploy, backup, dan rollback.

## 11. Next Action

Urutan pekerjaan berikutnya:

1. Login admin di browser dengan akun yang telah dibuat dan uji access control tiap role.
2. Isi `NEXT_PUBLIC_ANALYTICS_ID` hanya jika domain Plausible disetujui; tidak ada key yang diperlukan untuk form WhatsApp.
3. Selesaikan keyboard QA, Lighthouse, broken links, serta backup/restore di staging.
4. Deploy staging dan validasi rollback sebelum perubahan production berikutnya.

## 12. Bootstrap Verification

- [x] `npm install`
- [x] `npm run lint`
- [x] `npm run typecheck` untuk frontend dan CMS
- [x] `npm run build` untuk frontend dan CMS
- [x] Smoke test seluruh route publik ID, homepage EN, `/api/health`, `/sitemap.xml`, dan `/robots.txt` berhasil dengan HTTP 200.
- [x] Production runtime: web/CMS native via PM2 + Nginx/HTTPS; PostgreSQL masih Docker dan healthy.
- [x] Seed production: 4 services, 8 industries, 9 coverage entries; localized id/en values and nested arrays verified.
- [x] Baseline migration diuji pada PostgreSQL sementara; schema cocok dengan production dan `payload migrate:status` menampilkan `Yes`.
- [x] Akun admin sudah dibuat; white screen diperbaiki, aset CMS merespons `200`, dan form login tampil di browser.
- [x] Payload REST, health, route layanan ID/EN, dan database persistence berhasil di-smoke-test.
- [x] Production smoke test: root redirect, route ID/EN, health, sitemap, robots, and CMS APIs respond successfully.
- [x] `/api/revalidate`: unauthenticated request returns `401`, configured Bearer secret returns `200`.
- [x] Plausible analytics remains optional; fill `NEXT_PUBLIC_ANALYTICS_ID` only if the domain is approved.

Catatan dependency: `npm install` melaporkan 7 vulnerability transitive berseverity rendah/moderat dari toolchain Payload/Drizzle/esbuild. Review sebelum hardening final.
