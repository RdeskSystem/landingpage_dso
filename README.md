# DSO Website

Website company profile PT Dux Stellae Orientis dengan Next.js, Tailwind CSS, Payload CMS, dan PostgreSQL.

## Baseline

- Public domain: `https://web.duxorientis.com`
- Default locale: `id`
- Secondary locale: `en`
- Frontend: `apps/web`
- CMS configuration: `apps/cms`
- Canonical brand assets: `assets/logo.png` dan `assets/favicon.ico`

## Requirements

- Node.js 20.9 atau lebih baru
- npm 10 atau lebih baru
- Docker dan Docker Compose untuk PostgreSQL lokal/development

Bootstrap lokal tidak memakai Docker. Production web dan CMS sudah berjalan native; PostgreSQL production saat ini masih memakai satu container Docker.

## Local Frontend

```bash
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:3000/id` atau `http://localhost:3000/en`.

Pemeriksaan lokal:

```bash
npm run lint
npm run typecheck
npm run build
```

## Local Services with Docker

```bash
docker compose up -d postgres
npm run dev
```

Pada development, Payload mengaktifkan schema push otomatis. Jalankan seed bilingual yang idempotent:

```bash
npm run seed --workspace=@dso/cms
```

Seed mengisi layanan, industri, coverage, globals, dan feature flags. Statistik numerik tetap `approved=false` sampai ada persetujuan manajemen. Baseline migration versioned di `apps/cms/src/migrations` telah diuji pada database PostgreSQL sementara, dicocokkan dengan schema production, dan ditandai applied di production. Untuk database baru non-development, jalankan migration sebelum seed; jangan memakai schema push di production.

Untuk menjalankan seluruh service setelah Docker tersedia:

```bash
docker compose up --build
```

PostgreSQL lokal tersedia pada port `5432`. CMS configuration menggunakan:

```text
postgresql://dso:dso_local_password@localhost:5432/dso
```

## Production Deployment (Native)

Production web berjalan melalui PM2 pada port `3002`, Payload CMS pada port `3001`, dan Nginx menangani HTTP/HTTPS. PostgreSQL adalah satu-satunya service Docker yang masih dipakai (`localhost:5432`).

Deploy dari `/root/web` setelah `.env` tersedia:

```bash
npm ci
set -a && . ./.env && set +a
NODE_ENV=production npm run migrate --workspace=@dso/cms
npm run lint
npm run typecheck
npm run build
mkdir -p apps/web/.next/standalone/apps/web/public apps/web/.next/standalone/apps/web/.next/static apps/cms/.next/standalone/apps/cms/.next/static
cp -a apps/web/public/. apps/web/.next/standalone/apps/web/public/
cp -a apps/web/.next/static/. apps/web/.next/standalone/apps/web/.next/static/
cp -a apps/cms/.next/static/. apps/cms/.next/standalone/apps/cms/.next/static/
pm2 startOrReload ecosystem.config.js --update-env
pm2 save
nginx -t && systemctl reload nginx
```

`PAYLOAD_REVALIDATE_SECRET` harus sama pada proses web dan CMS. CMS memakai `PAYLOAD_REVALIDATE_URL=http://127.0.0.1:3002/api/revalidate`; jangan mengirim secret melalui URL. Form Request Proposal membuka WhatsApp admin langsung dan tidak memerlukan SMTP atau Turnstile. `NEXT_PUBLIC_ANALYTICS_ID` berisi domain Plausible (opsional) dan perubahan nilainya memerlukan rebuild web. Simpan `.env` di server dengan permission `600`.

CMS dibangun dengan asset prefix `/cms-assets` agar chunk Next.js CMS tidak bertabrakan dengan chunk frontend. Pastikan snippet `deploy/nginx/cms-assets.conf` dimasukkan di dalam server block `web.duxorientis.com`; request `/admin` dan `/api/` harus diteruskan ke port CMS `3001`.

Sebelum release, buat backup runtime dan database:

```bash
tar -czf /var/backups/dso-standalone-$(date +%Y%m%d_%H%M%S).tar.gz -C /root/web apps/web/.next/standalone apps/cms/.next/standalone
docker exec web-postgres-1 pg_dump -U dso -d dso -Fc > /var/backups/dso-$(date +%Y%m%d_%H%M%S).dump
```

Rollback runtime memakai archive `dso-standalone-YYYYMMDD_HHMMSS.tar.gz` yang dipilih, lalu `pm2 startOrReload ecosystem.config.js --update-env && pm2 save`. Uji restore database di staging sebelum rollback production. Hindari `docker compose down -v` pada database production.

## Environment

Salin `.env.example` menjadi `.env`. Jangan commit secret, kredensial database/Payload, atau data pribadi.

`NEXT_PUBLIC_SITE_URL` harus tetap:

```env
NEXT_PUBLIC_SITE_URL=https://web.duxorientis.com
```

Untuk frontend lokal dengan CMS lokal, gunakan:

```env
PAYLOAD_API_URL=http://localhost:3001/api
PAYLOAD_REVALIDATE_URL=http://localhost:3000/api/revalidate
PAYLOAD_REVALIDATE_SECRET=
```

Jangan mengisi `NEXT_PUBLIC_ANALYTICS_ID` sampai domain Plausible production disetujui.

## Project Structure

```text
apps/
  web/                  Next.js frontend
  cms/                  Payload collections, globals, access control
assets/                 Source logo dan favicon
docker/                 Dockerfile dan Caddyfile
progress.md             Checklist implementasi
```

## Content Safety

Dokumen compro di `docs/` bersifat rahasia. Jangan menyalin data pribadi, logo klien, badge sertifikasi, screenshot data nyata, wajah debitur/nasabah, atau plat nomor ke website publik. Gunakan placeholder `TODO(konfirmasi)` untuk keputusan yang belum final.

Feature flags awal:

```env
SHOW_CLIENT_LOGOS=false
SHOW_CERT_BADGES=false
SHOW_INSIGHT=false
```

## Next Steps

Lihat `progress.md` untuk status deployment, migration baseline, credential yang masih dibutuhkan, approval konten, dan QA launch.
