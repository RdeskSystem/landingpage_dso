# DSO Company Profile Website — Blueprint & Arsitektur

> **Dokumen untuk AI agent pelaksana.** Baca seluruh dokumen sebelum menulis kode. Ikuti urutan fase di Bagian 13. Jika ada keputusan yang belum final (Bagian 14), gunakan placeholder yang ditandai `TODO(konfirmasi)` dan jangan mengarang data.

---

## 0. Ringkasan Proyek

| Item | Nilai |
|---|---|
| Klien | PT Dux Stellae Orientis (DSO) |
| Jenis | Website company profile B2B, modern, bilingual (ID default, EN) |
| Bisnis | Call Centre, Survey & Verification, Collection & Asset Management, Information & Data Services |
| Tagline utama | **People. Process. Performance.** |
| Sub-tagline | Mitra Operasional & Penagihan yang Profesional, Akurat, Responsif, Terpercaya |
| Tujuan utama | Membangun kepercayaan calon klien korporat (bank, multifinance, fintech, asuransi, dll.) dan menghasilkan lead (*Request Proposal*) |
| Tujuan sekunder | Rekrutmen agen/surveyor/collector, SEO, citra profesional |
| Sumber konten | Dua PDF compro DSO (lihat Bagian 3) |

**Prinsip:** cepat, bersih, kredibel, mudah dikelola tim DSO lewat CMS tanpa developer.

---

## 1. Tech Stack (final)

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router), TypeScript, React Server Components |
| Styling | Tailwind CSS + shadcn/ui, CSS variables untuk design tokens |
| Animasi | Framer Motion (subtle; hormati `prefers-reduced-motion`) |
| i18n | `next-intl` — locale `id` (default) dan `en`, routing `/id/...` dan `/en/...` |
| CMS | Payload CMS (self-hosted, TypeScript, satu repo/monorepo dengan frontend) |
| Database | PostgreSQL |
| Media | Storage lokal/S3-compatible, optimasi gambar AVIF/WebP |
| Peta | SVG peta Indonesia interaktif atau MapLibre GL (pilih yang paling ringan) |
| Form | React Hook Form + Zod, pesan terisi otomatis melalui `wa.me` admin |
| Follow-up | WhatsApp admin; tidak memakai SMTP atau Turnstile |
| Analytics | Plausible (utama) atau GA4 — konfigurasi via env |
| Deploy | Docker Compose di VPS, reverse proxy Caddy/Nginx, Cloudflare di depan |
| CI/CD | GitHub Actions: lint, typecheck, build, deploy |

---

## 2. Arsitektur

```
Pengunjung
   │
Cloudflare (CDN, WAF, Turnstile, cache)
   │
Reverse proxy (Caddy/Nginx)
   ├─► Next.js app (SSG/ISR + server actions)  ──REST/Local API──►  Payload CMS
   │                                                                   │
   │                                                             PostgreSQL
   │                                                             Media storage
   └─► /admin (Payload admin, dibatasi akses)

Form "Request Proposal" ─► validasi Zod ─► pesan terisi otomatis ─► WhatsApp admin
```

### Struktur repo

```
dso-website/
├─ apps/web/                 # Next.js frontend
│  ├─ app/[locale]/(site)/   # halaman publik
│  ├─ components/            # ui/, sections/, layout/
│  ├─ lib/                   # cms client, seo, utils
│  ├─ messages/{id,en}.json  # string UI
│  └─ styles/tokens.css
├─ apps/cms/                 # Payload CMS (collections, globals, access)
├─ docker/                   # Dockerfile, compose, Caddyfile
├─ .github/workflows/
├─ .env.example
└─ README.md
```

### Strategi render
- Halaman statis (Beranda, Tentang, Layanan): **SSG + ISR** (revalidate saat konten CMS berubah lewat webhook).
- Berita/Karier: ISR.
- Form kontak: server action + Turnstile.

---

## 3. Sumber Konten & Aturan Penggunaan

Dua PDF compro menjadi sumber konten:
1. **Compro Call Centre & Surveyor** — layanan operasional, teknologi, QC, value proposition.
2. **Compro General (Penagihan)** — profil, tim pimpinan, collection services, struktur organisasi, jangkauan.

### Penyatuan positioning
Website menyatukan keduanya menjadi **tiga pilar + satu pendukung**:
1. Call Centre Services
2. Survey & Verification
3. Collection & Asset Management (Desk, Field, Hybrid Collection; Repo/Asset Recovery; Somasi & Mediasi; Koordinasi Legal)
4. Information & Data Services (pendukung: data processing, reporting & dashboard, research support)

### Aturan konten publik (WAJIB)
Kedua PDF berlabel **RAHASIA**. Website bersifat publik, maka:
- ❌ Jangan tampilkan foto lapangan yang memuat wajah debitur/nasabah atau plat nomor, walaupun sudah di-blur.
- ❌ Jangan tampilkan nomor HP/email pribadi individu (mis. kontak CEO). Gunakan hanya kontak perusahaan: `+62 818 801120` dan `cs@stellaeorientis.co.id`.
- ❌ Jangan tampilkan logo klien (Adira, Indodana, BAF, dst.) sebelum ada konfirmasi izin. Buat section klien di balik feature flag `SHOW_CLIENT_LOGOS=false`.
- ❌ Jangan tampilkan badge sertifikasi (IAF, ISGGI, UAF, dll.) sebelum ada nomor sertifikat yang bisa diverifikasi. Buat section di balik flag `SHOW_CERT_BADGES=false`.
- ❌ Jangan tampilkan tangkapan layar aplikasi/dashboard yang berisi data nyata. Gunakan mockup dengan data dummy jelas berlabel "Ilustrasi".
- ⚠️ Deskripsi profil personal anggota tim (afiliasi organisasi, dsb.): tampilkan hanya nama, jabatan, ringkasan pengalaman profesional. Foto dan detail tambahan hanya setelah ada persetujuan (`TODO(konfirmasi)`).
- ✅ Gunakan bahasa penagihan yang beretika dan patuh regulasi ("humanis namun tegas", "sesuai regulasi"). Jangan menulis klaim yang menyiratkan intimidasi.

---

## 4. Design System

### 4.1 Warna (design tokens)

Diambil dari logo (bintang merah, wordmark hitam) dan slide compro.

```css
:root {
  --dso-red:        #C00000; /* primary: CTA, aksen judul, ikon */
  --dso-red-bright: #E31B23; /* hover, highlight, gradient terang */
  --dso-red-deep:   #8A0000; /* section gelap, gradient */
  --dso-ink:        #0B0B0D; /* teks utama, hero, footer */
  --dso-charcoal:   #1C1C20; /* kartu pada section gelap */
  --dso-paper:      #FFFFFF; /* background utama */
  --dso-mist:       #F4F4F6; /* section selang-seling */
  --dso-line:       #E4E4E8; /* border halus */
  --dso-muted:      #5B5B66; /* teks sekunder */
  --radius-card:    16px;
  --radius-btn:     12px;
}
```

Aturan:
- Teks kecil di atas putih: pakai `--dso-red-deep` atau `--dso-ink` (pastikan kontras WCAG AA).
- Gradient: `linear-gradient(135deg, var(--dso-red-deep), var(--dso-red-bright))`, dipakai hemat.
- Mode: light-dominan dengan section gelap (hero, CTA band, footer). Dark mode penuh: opsional/fase lanjut.

### 4.2 Tipografi
- Heading: **Plus Jakarta Sans** (700/800), tracking sedikit rapat.
- Body: **Inter** (400/500/600).
- Skala: h1 `clamp(2.25rem, 5vw, 4rem)`, h2 `clamp(1.75rem, 3.5vw, 2.75rem)`, body 16–18px.
- Muat font via `next/font` (self-host), `display: swap`.

### 4.3 Motif visual dari logo
- **Sinar bintang**: pola garis memancar dari satu titik, opacity rendah, dipakai di hero dan CTA band (SVG, bukan gambar raster).
- **Garis vertikal "|"**: penanda kecil di samping judul section (meniru garis di samping wordmark).
- **Peta Indonesia gradasi merah** untuk section jangkauan.
- **Ikon**: set konsisten (Lucide), stroke 1.75, warna merah/ink.
- **Fotografi**: gaya profesional, tim Indonesia, setting kantor/lapangan. Placeholder sementara: ilustrasi/pola, bukan foto stok acak. `TODO(konfirmasi)` foto asli.

### 4.4 Komponen inti
`Button` (primary merah, secondary outline ink, ghost), `Card`, `SectionHeader` (dengan garis vertikal), `StatCounter`, `ServiceCard`, `Stepper`, `Timeline`, `IndonesiaMap`, `LogoMarquee`, `TeamCard`, `CTABand`, `Accordion` (FAQ), `LeadForm`, `Navbar` (sticky, transparan di hero lalu solid), `Footer`, `LanguageSwitch`, `WhatsAppFloatingButton`.

### 4.5 Motion
- Reveal on scroll (fade + translateY 16px, 400–600ms), stagger kecil.
- Counter angka animasi sekali saat masuk viewport.
- Tanpa animasi berat/parallax besar; matikan bila `prefers-reduced-motion`.

---

## 5. Sitemap & Routing

```
/                      Beranda
/tentang               Tentang DSO
  /tentang/tim         Tim Kepemimpinan
  /tentang/kepatuhan   Sertifikasi & Kepatuhan (termasuk etika penagihan)
/layanan               Ikhtisar layanan
  /layanan/call-centre
  /layanan/survey-verification
  /layanan/collection
  /layanan/information-data
/teknologi             Teknologi & Kualitas
/industri              Industri yang dilayani
/jangkauan             Jangkauan area (peta) & klien
/karier                Daftar lowongan
  /karier/[slug]
/insight               Berita / artikel
  /insight/[slug]
/kontak                Kontak & Request Proposal
/privasi, /syarat      Halaman legal
```
Semua route diawali `/{locale}`. Sediakan `sitemap.xml`, `robots.txt`, halaman 404 dan 500 bermerek.

---

## 6. Spesifikasi Halaman

### 6.1 Beranda `/`
Urutan section:

1. **Hero** (background `--dso-ink` + motif sinar merah)
   - H1: "Mitra Operasional & Penagihan yang Profesional, Akurat, Terpercaya."
   - Subteks: satu kalimat tentang integrasi SDM, proses, dan teknologi.
   - CTA primer: **Konsultasi Gratis** → `/kontak`; CTA sekunder: **Lihat Layanan** → `/layanan`.
   - Elemen kanan: kartu kaca berisi 3 mini-statistik atau mockup dashboard (dummy).
2. **Trust bar / Statistik** (counter animasi), data dari global `Stats`:
   - Aset dikelola: **Rp350 miliar+**
   - Pelanggan ditangani: `TODO(konfirmasi)` (compro menulis 60.000+ dan 12.000 — jangan publikasikan sebelum dikonfirmasi)
   - Klien korporat aktif: **9**
   - Cakupan area: **9 kota**
   - Agen aktif: **73+** (pipeline 140)
3. **Tiga pilar layanan**: 3 `ServiceCard` (Call Centre, Survey & Verification, Collection & Asset Mgmt), tiap kartu: ikon, deskripsi 2 baris, 3 bullet layanan, link "Selengkapnya".
4. **Kenapa DSO** — People / Process / Performance, tiap kolom dengan 2–3 poin (SDM terlatih, SOP & QC berlapis, pelaporan real-time).
5. **Alur kerja** (`Stepper` interaktif): Data & Assignment → Review & Segmentasi → Eksekusi → Quality Control → Reporting & Follow-up.
6. **Platform & Teknologi**: mockup aplikasi mobile surveyor/collector (GPS, foto, form digital) + dashboard monitoring; catatan "Ilustrasi".
7. **Peta jangkauan**: Jakarta, Banten, Jawa Barat, Jawa Tengah, Jawa Timur, Yogyakarta, Bali, Lampung, Sulawesi/Makassar.
8. **Industri**: grid ikon — Perbankan, Pembiayaan, Fintech, Asuransi, E-commerce, Telekomunikasi, Properti, Utilities & lainnya.
9. **Klien** (`LogoMarquee`) — hanya jika `SHOW_CLIENT_LOGOS=true`.
10. **Budaya & nilai**: 6 DSO Values (Integrity & Transparency; Empowerment through Innovation; Customer Focus & Mutual Respect; Collaboration & Teamwork; Social & Economic Contribution; Sustainable Growth & Excellence).
11. **Teaser tim pimpinan** → `/tentang/tim`.
12. **CTA band merah**: "Bersama DSO, operasi lebih ringan, hasil lebih optimal." + tombol Request Proposal + WhatsApp.
13. **Footer**.

### 6.2 Tentang `/tentang`
- Filosofi nama: *Dux Stellae Orientis* = "Pemimpin Bintang dari Timur" (Latin); simbol harapan, arah, panduan.
- Latar belakang berdirinya DSO (ringkas, gabungkan narasi kedua compro).
- Visi/komitmen: "teknologi memberi arah, proses memberi konsistensi, manusia memberi nilai."
- Timeline/roadmap: `TODO(konfirmasi)` tahun berdiri dan milestone.
- Values, link ke kepatuhan.

### 6.3 Tim `/tentang/tim`
Kartu profil: nama, jabatan, ringkasan pengalaman profesional (2–3 kalimat), foto opsional. Data dari collection `TeamMembers`. Daftar awal dari compro (nama, jabatan): Founder & CEO, Corporate Legal Advisor, Business Development & Services Head, System Developer, Collection Specialist (dua orang). Hanya data profesional, sesuai Bagian 3.

### 6.4 Halaman layanan (template sama)
Struktur: hero kecil → ikhtisar → "Cakupan layanan" (checklist) → "Proses" (stepper) → "Dukungan operasional" → "KPI/kualitas" → FAQ → CTA.

- **Call Centre**: outbound/inbound, konfirmasi & verifikasi data, follow-up, reminder, appointment call, call monitoring & reporting; kanal telepon, SMS, WhatsApp, email. Dukungan: agent, supervisor, call recording, monitoring, reporting.
- **Survey & Verification**: verifikasi alamat & customer, verifikasi bisnis/lokasi, field survey, verifikasi dokumen, dokumentasi foto & kunjungan, laporan survey; platform mobile dengan GPS & foto.
- **Collection & Asset Management**: Desk Collection (in-house, telepon/SMS/WA), Field Collection, Hybrid; Manajemen aset bermasalah & proses hukum (pengawasan aset, repo/tarik aset, somasi & mediasi, koordinasi legal, laporan status aset); model **success fee** dan skema fleksibel. Segmen: pinjaman UMKM, kredit konsumen (dengan/tanpa agunan), kredit komersial & institusi. Tekankan kepatuhan regulasi & etika.
- **Information & Data Services**: data processing & management, information updating, data analysis, reporting & dashboard, research support.

### 6.5 Teknologi & Kualitas `/teknologi`
- Ekosistem terintegrasi: Client Assignment → DSO System → Call Centre/Surveyor → Real-time Data Capture → Quality Check → Dashboard & Reporting → Client Portal.
- Fitur: cloud-based, real-time monitoring, GPS tracking, digital form, call recording, CDR analytics, upload foto/dokumen, user access control, audit trail.
- Keamanan data: enkripsi, backup harian, server redundan, akses berbasis role, kepatuhan perlindungan data.
- Quality Control berlapis: QA Monitoring → Supervisor Control → Management Control.
- KPI (ilustratif, "dapat disesuaikan SLA klien"): Contact Rate ≥95%, Data Accuracy ≥95%, Valid Photo ≥98%, Report SLA ≤24 jam, QA Compliance ≥95%. Publikasikan hanya jika disetujui manajemen (`TODO(konfirmasi)`).

### 6.6 Jangkauan `/jangkauan`
Peta interaktif (hover/klik kota → detail: layanan tersedia), daftar wilayah, blok klien (flagged).

### 6.7 Karier `/karier`
Daftar lowongan dari collection `Jobs` (posisi: Call Centre Agent, Surveyor, Field Collector, Desk Collector, dst.), filter lokasi/tipe, halaman detail, form lamaran ringan atau tautan email.

### 6.8 Kontak `/kontak`
- Form **Request Proposal**: nama, perusahaan, jabatan, email, telepon, layanan diminati (multi-select), pesan, persetujuan privasi; data diteruskan ke WhatsApp admin.
- Info: Head Office — ArvaHub Office, Jl. Prof. DR. Soepomo SH No.23, Tebet Barat, Tebet, Jakarta Selatan 12810. Operational Office — Grand Centerpoint, Jl. Ahmad Yani Kav.20, Tower D GF47-49, Marga Jaya, Bekasi Selatan, Kota Bekasi 17141.
- Telepon `+62 818 801120`, email `cs@stellaeorientis.co.id`, tombol WhatsApp, embed peta (lazy, dua lokasi).
- Domain website resmi: `TODO(konfirmasi)` — compro menyebut `duxstellaeorientis.com`; email memakai `stellaeorientis.co.id`.

### 6.9 Insight `/insight`
Artikel/berita (perusahaan, tips kepatuhan, industri). Awal: boleh kosong, sembunyikan menu jika belum ada konten (`SHOW_INSIGHT`).

---

## 7. Model Data CMS (Payload)

Semua field teks yang tampil publik **localized** (`id`, `en`).

| Collection/Global | Field utama |
|---|---|
| `Services` | slug, title, summary, icon, heroImage, scope[] (list), support[] (list), process[] (step: title, desc), faq[], order, published |
| `Industries` | name, icon, description, order |
| `Clients` | name, logo, order, `permissionConfirmed` (boolean; tampil hanya bila true) |
| `TeamMembers` | name, role, bio, photo, order, `publicConsent` (boolean) |
| `CoverageCities` | name, region, lat/lng atau svgId, services[], order |
| `Certifications` | title, issuer, number, validUntil, image, verifyUrl, `verified` (boolean; tampil hanya bila true) |
| `Posts` | slug, title, excerpt, body (rich text), cover, publishedAt, seo |
| `Jobs` | slug, title, location, type, description, requirements[], status, closingDate |
| `Leads` | name, company, position, email, phone, services[], message, locale, source, status (new/contacted/closed), createdAt |
| `Media` | file, alt (localized), focal point |
| Global `SiteSettings` | contact (phone, email, whatsapp), addresses[] (label, address, mapEmbed), social[], featureFlags |
| Global `Stats` | items[] (key, value, suffix, label localized, `approved`) |
| Global `Home` | hero copy, CTA copy, section toggles |

**Access control:** publik hanya baca konten `published`; `Leads` hanya bisa dibuat lewat endpoint form dan dibaca role `admin`/`sales`. Role: `admin`, `editor`, `sales`.

---

## 8. SEO, Analytics, Aksesibilitas

- Metadata per halaman (title, description, OG image dinamis bermerek), canonical, `hreflang` id/en.
- JSON-LD: `Organization`, `LocalBusiness` (dua lokasi), `WebSite`, `BreadcrumbList`, `JobPosting` (Karier), `Article` (Insight).
- Sitemap dinamis, robots.txt.
- Kata kunci target (ID): jasa call centre, jasa survey dan verifikasi, jasa penagihan, debt collection profesional, outsourcing collection multifinance, verifikasi lokasi debitur.
- Analytics event: `cta_click`, `lead_submit`, `whatsapp_click`, `phone_click`.
- Aksesibilitas: target WCAG 2.2 AA, semantic HTML, fokus terlihat, alt text, navigasi keyboard, skip link.

---

## 9. Keamanan & Privasi

- Header keamanan: CSP ketat, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- Form: validasi server (Zod), Turnstile, rate limit per IP, sanitasi input, honeypot.
- CMS admin: 2FA jika tersedia, batasi IP/akses via proxy, password policy.
- Data lead: minimal, retensi ditetapkan (`TODO(konfirmasi)`), halaman Privasi mengacu regulasi perlindungan data pribadi Indonesia.
- Secrets hanya di env; tidak ada secret di repo.
- Backup database harian + uji restore.

---

## 10. Performa

- Target Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- `next/image` untuk semua gambar, lazy-load di bawah fold, font self-host.
- Peta dan komponen berat di-*dynamic import*.
- Hindari library besar yang tidak perlu.

---

## 11. Deployment

- `docker-compose.yml`: `web`, `cms` (atau satu service jika monolit), `postgres`, `caddy`.
- Domain + DNS lewat Cloudflare (proxy on), SSL otomatis.
- Environment: `staging` dan `production`.
- `.env.example` memuat konfigurasi database/Payload, `NEXT_PUBLIC_ANALYTICS_ID` opsional, dan feature flags; form WhatsApp tidak memerlukan SMTP atau Turnstile.
- Webhook CMS → revalidate ISR.
- Monitoring: uptime check + log error.

---

## 12. Copy Awal (ID) — boleh disesuaikan

- **Hero H1:** Mitra Operasional & Penagihan yang Profesional, Akurat, Terpercaya.
- **Hero sub:** DSO memadukan SDM terlatih, proses terstruktur, dan teknologi real-time untuk komunikasi pelanggan, verifikasi data, dan pengelolaan piutang.
- **CTA band:** Bersama DSO, operasi lebih ringan, hasil lebih optimal.
- **Filosofi:** Teknologi memberikan arah, proses memberikan konsistensi, dan manusia memberikan nilai.
- **Kepatuhan:** Setiap aktivitas dijalankan sesuai SOP, regulasi yang berlaku, dan etika profesi, dengan pendekatan humanis namun tegas.

Terjemahan EN dibuat konsisten, nada profesional dan ringkas. Simpan di `messages/{id,en}.json` dan CMS (field localized).

---

## 13. Rencana Eksekusi (urutan untuk agent)

**Fase 0 — Setup**
- [ ] Inisialisasi monorepo, TypeScript, ESLint, Prettier, Tailwind, shadcn/ui.
- [ ] Definisikan design tokens (Bagian 4) di `styles/tokens.css` dan Tailwind config.
- [ ] Setup next-intl (id/en), font, layout dasar (Navbar, Footer).
- [ ] Setup Payload + Postgres lokal via Docker.

**Fase 1 — Data & CMS**
- [ ] Buat semua collections/globals (Bagian 7) dengan localization dan access control.
- [ ] Seed konten awal dari Bagian 6 dan 12 (data yang `TODO` diberi placeholder dan flag).

**Fase 2 — Halaman & komponen**
- [ ] Bangun komponen inti (4.4).
- [ ] Beranda (6.1), lalu Layanan (6.4), Tentang/Tim (6.2–6.3), Teknologi (6.5), Jangkauan (6.6), Kontak (6.8), Karier (6.7), Insight (6.9), legal.
- [ ] Mockup platform (dummy data) sebagai komponen React/SVG.

**Fase 3 — Integrasi**
- [x] Form Request Proposal: validasi Zod, draft pesan otomatis, dan handoff langsung ke WhatsApp admin.
- [ ] SEO: metadata, JSON-LD, sitemap, hreflang, OG image.
- [ ] Feature flags untuk klien, sertifikat, insight.

**Fase 4 — QA & Launch**
- [ ] Uji responsif (360, 768, 1024, 1440), cross-browser, aksesibilitas, Lighthouse.
- [ ] Uji form (sukses, gagal, spam), uji role CMS.
- [ ] Security headers, backup, monitoring.
- [ ] Deploy staging → review → production.

### Definition of Done
- Semua halaman di sitemap tersedia dalam ID dan EN.
- Tidak ada konten terlarang (Bagian 3) di build publik.
- Lighthouse target tercapai (Bagian 10).
- Konten dapat diubah lewat CMS tanpa deploy ulang.
- Form lead menghasilkan record `Leads` dan email notifikasi.
- README berisi cara menjalankan lokal, seed data, dan deploy.

---

## 14. Keputusan Terbuka (flag `TODO(konfirmasi)` — jangan diisi sendiri)

1. Angka resmi jumlah pelanggan (60.000+ vs 12.000).
2. Domain resmi (`duxstellaeorientis.com` vs `stellaeorientis.co.id`).
3. Izin tampil logo klien dan daftar klien yang boleh dipublikasikan.
4. Sertifikat/badge yang sah beserta nomor dan tautan verifikasinya.
5. Persetujuan dan foto anggota tim, serta bio yang boleh tampil.
6. Tahun berdiri dan milestone perusahaan.
7. KPI/SLA yang boleh dipublikasikan.
8. Kebijakan retensi data lead dan teks Privasi/Syarat final.
9. Foto/video asli non-sensitif untuk hero dan halaman layanan.
