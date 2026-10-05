import { Cookie, FileCheck2, FileLock2 } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";

type LegalKind = "privacy" | "terms" | "cookies";
type LegalSection = Readonly<{
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}>;
type LegalDocument = Readonly<{
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
}>;

const documents: Record<Locale, Record<LegalKind, LegalDocument>> = {
  id: {
    privacy: {
      updated: "5 Oktober 2026",
      intro: "Kebijakan ini berlaku untuk website PT Dux Stellae Orientis (DSO), form Request Proposal, area admin, dan layanan Web SFTP di sftp.duxorientis.com.",
      sections: [
        {
          title: "Data yang kami proses",
          paragraphs: ["Data yang Anda isi pada form Request Proposal dapat mencakup nama, perusahaan, jabatan, email, nomor telepon, layanan yang diminati, dan pesan. Sistem juga dapat memproses data teknis seperti alamat IP, waktu akses, browser, dan permintaan halaman untuk operasi serta keamanan layanan."],
          bullets: ["Form website menyiapkan pesan WhatsApp; DSO tidak menyimpan kiriman form tersebut ke database website.", "Saat form membuka WhatsApp, isi pesan dikirim ke WhatsApp/Meta melalui tautan. DSO menerima pesan setelah Anda menekan tombol Kirim di WhatsApp.", "Jika menggunakan Web SFTP, nama akun, informasi sesi, nama file, dan isi file yang Anda unggah diproses untuk menyediakan transfer file.", "Jangan kirim kata sandi, data kartu pembayaran, atau data pribadi nasabah/debitur yang tidak diperlukan melalui form atau WhatsApp."],
        },
        {
          title: "Tujuan pemrosesan",
          paragraphs: ["DSO menggunakan informasi untuk menanggapi permintaan proposal dan pertanyaan layanan, berkomunikasi tentang layanan yang diminta, mengoperasikan transfer file yang diotorisasi, menjaga keamanan sistem, serta memenuhi kewajiban hukum."],
        },
        {
          title: "WhatsApp dan pihak ketiga",
          paragraphs: ["Jika Anda melanjutkan form ke WhatsApp, informasi pada draft pesan diproses oleh WhatsApp/Meta sesuai kebijakan dan ketentuan mereka. DSO tidak mengendalikan sistem, keamanan, atau masa penyimpanan WhatsApp. Penyedia hosting dan infrastruktur juga dapat memproses data teknis seperlunya untuk menjalankan layanan."],
        },
        {
          title: "Dasar dan pembagian data",
          paragraphs: ["Pemrosesan dilakukan untuk menindaklanjuti permintaan yang Anda ajukan, berdasarkan persetujuan saat menggunakan form, kepentingan operasional yang wajar, atau kewajiban hukum yang berlaku. DSO tidak menjual data pribadi. Akses internal dibatasi kepada personel yang membutuhkannya untuk pekerjaan."],
        },
        {
          title: "Pemindahan lintas negara",
          paragraphs: ["WhatsApp/Meta atau penyedia teknologi dapat memproses informasi di negara selain Indonesia sesuai infrastruktur dan kebijakan mereka. Dengan membuka tautan WhatsApp, Anda menggunakan layanan pihak ketiga tersebut."],
        },
        {
          title: "Penyimpanan dan penghapusan",
          paragraphs: ["Form yang belum dikirim melalui WhatsApp tidak disimpan oleh website. Percakapan WhatsApp dan berkas SFTP dapat dipertahankan selama diperlukan untuk tindak lanjut layanan, hubungan kerja, keamanan, atau kewajiban hukum. Berkas SFTP dapat dihapus oleh pengguna yang memiliki akses atau oleh DSO sesuai kebutuhan proyek."],
        },
        {
          title: "Keamanan dan hak Anda",
          paragraphs: ["Website menggunakan HTTPS dan koneksi SFTP menggunakan SSH. Akun Web SFTP dibatasi ke folder yang diberikan. Anda dapat meminta akses, koreksi, atau penghapusan informasi yang dikelola DSO dengan menghubungi cs@stellaeorientis.co.id. Kami dapat meminta verifikasi identitas dan menindaklanjuti permintaan sesuai hukum yang berlaku."],
        },
        {
          title: "Anak-anak dan perubahan kebijakan",
          paragraphs: ["Website ini ditujukan untuk komunikasi bisnis, bukan untuk anak di bawah 18 tahun. DSO dapat memperbarui kebijakan ini; versi terbaru dan tanggal berlakunya akan ditampilkan pada halaman ini."],
        },
      ],
    },
    terms: {
      updated: "5 Oktober 2026",
      intro: "Dengan mengakses website DSO atau menggunakan Web SFTP, Anda menyetujui syarat penggunaan ini. Jika tidak setuju, hentikan penggunaan layanan.",
      sections: [
        {
          title: "Informasi dan permintaan layanan",
          paragraphs: ["Konten website disediakan untuk memberi informasi umum tentang DSO dan layanannya. Pengiriman Request Proposal melalui WhatsApp bukan penawaran yang mengikat dan tidak membentuk kontrak. Ruang lingkup, harga, SLA, dan kewajiban para pihak hanya berlaku setelah disepakati dalam dokumen atau perjanjian terpisah."],
        },
        {
          title: "Penggunaan yang diperbolehkan",
          paragraphs: ["Anda wajib menggunakan website dan layanan secara sah, menjaga kerahasiaan kredensial, serta tidak mencoba mengganggu atau memperoleh akses tanpa izin."],
          bullets: ["Jangan mengunggah atau mengirim berkas yang melanggar hukum, berisi malware, atau memuat data yang tidak berhak Anda bagikan.", "Gunakan SFTP hanya untuk folder dan pekerjaan yang diberikan kepada akun Anda; jangan membagikan kredensial kepada pihak lain.", "Pastikan Anda memiliki hak dan otorisasi untuk seluruh data yang dikirim melalui form, WhatsApp, atau SFTP."],
        },
        {
          title: "Request Proposal dan WhatsApp",
          paragraphs: ["Form website membuka WhatsApp dengan draft pesan berisi data yang Anda isi. Anda tetap harus meninjau dan menekan Kirim di WhatsApp. WhatsApp merupakan layanan pihak ketiga dengan ketentuan dan kebijakan privasinya sendiri."],
        },
        {
          title: "Web SFTP dan berkas",
          paragraphs: ["Akses Web SFTP diberikan per akun dan dibatasi ke folder yang ditentukan. Anda bertanggung jawab atas hak akses, isi, keakuratan, dan salinan cadangan berkas yang diunggah. DSO dapat membatasi atau menangguhkan akses untuk melindungi sistem, data, atau pengguna lain."],
        },
        {
          title: "Kekayaan intelektual dan tautan eksternal",
          paragraphs: ["Nama, logo, desain, dan konten DSO dilindungi oleh hak yang berlaku kecuali dinyatakan lain. Anda boleh mengakses website untuk keperluan informasi bisnis yang wajar, tetapi tidak boleh menyalin atau menggunakan materi DSO untuk tujuan komersial tanpa izin. Tautan WhatsApp dan layanan eksternal tunduk pada ketentuan penyedianya."],
        },
        {
          title: "Ketersediaan dan batas tanggung jawab",
          paragraphs: ["DSO berupaya menjaga website dan Web SFTP berfungsi, tetapi tidak menjamin layanan selalu tersedia tanpa gangguan. Sejauh diizinkan hukum, DSO tidak bertanggung jawab atas gangguan pihak ketiga, kehilangan yang timbul dari penggunaan tanpa otorisasi, atau keputusan yang dibuat hanya berdasarkan informasi umum website. Syarat ini tidak membatasi hak yang tidak dapat dikesampingkan oleh hukum."],
        },
        {
          title: "Hukum dan perubahan",
          paragraphs: ["Syarat ini ditafsirkan berdasarkan hukum Republik Indonesia. DSO dapat memperbaruinya dengan menerbitkan versi baru pada halaman ini. Pertanyaan dapat dikirim ke cs@stellaeorientis.co.id."],
        },
      ],
    },
    cookies: {
      updated: "5 Oktober 2026",
      intro: "Halaman ini menjelaskan cookie dan penyimpanan sesi pada website DSO dan Web SFTP. Website utama tidak menggunakan cookie iklan.",
      sections: [
        {
          title: "Cookie yang diperlukan",
          bullets: ["NEXT_LOCALE: cookie sesi untuk menyimpan pilihan bahasa pada web.duxorientis.com. Cookie ini menggunakan path / dan SameSite=Lax.", "sftp.sid: cookie sesi login Web SFTP pada sftp.duxorientis.com. Cookie ini HttpOnly, Secure, SameSite=Lax, dan masa sesi maksimal sekitar satu jam.", "Cookie autentikasi CMS hanya digunakan ketika staf yang berwenang masuk ke area admin."],
        },
        {
          title: "Analitik",
          paragraphs: ["Plausible Analytics saat ini tidak diaktifkan pada website. Jika diaktifkan, konfigurasi yang digunakan dirancang untuk analitik tanpa cookie dan mengukur kunjungan serta interaksi dasar; kebijakan ini akan diperbarui bila praktiknya berubah."],
        },
        {
          title: "Layanan pihak ketiga dan kontrol browser",
          paragraphs: ["Jika Anda membuka WhatsApp, layanan tersebut dapat menggunakan cookie dan teknologi sendiri yang dikendalikan oleh Meta. Anda dapat menghapus atau memblokir cookie melalui pengaturan browser. Memblokir cookie sesi dapat membuat pilihan bahasa tidak tersimpan atau mengharuskan Anda masuk kembali ke Web SFTP."],
        },
        {
          title: "Pertanyaan",
          paragraphs: ["Untuk pertanyaan mengenai cookie atau privasi, hubungi cs@stellaeorientis.co.id."],
        },
      ],
    },
  },
  en: {
    privacy: {
      updated: "October 5, 2026",
      intro: "This policy applies to the PT Dux Stellae Orientis (DSO) website, Request Proposal form, admin area, and Web SFTP service at sftp.duxorientis.com.",
      sections: [
        {
          title: "Information we process",
          paragraphs: ["The Request Proposal form may contain your name, company, job title, email, phone number, services of interest, and message. The website infrastructure may also process technical data such as IP address, access time, browser, and requested pages for service operation and security."],
          bullets: ["The website form prepares a WhatsApp message; it does not store the form submission in a website database.", "When the form opens WhatsApp, the message text is sent to WhatsApp/Meta through the link. DSO receives the message after you press Send in WhatsApp.", "When using Web SFTP, your account name, session information, file names, and uploaded file contents are processed to provide file transfer.", "Do not send passwords, payment-card details, or unnecessary customer/debtor personal data through the form or WhatsApp."],
        },
        {
          title: "How we use information",
          paragraphs: ["DSO uses information to respond to proposal requests and service questions, coordinate requested services, operate authorized file transfers, protect systems, and meet legal obligations."],
        },
        {
          title: "WhatsApp and third parties",
          paragraphs: ["If you continue from the form to WhatsApp, the draft message is processed by WhatsApp/Meta under its own terms and privacy policy. DSO does not control WhatsApp's systems, security, or retention. Hosting and infrastructure providers may also process technical data as needed to operate the services."],
        },
        {
          title: "Legal basis and sharing",
          paragraphs: ["Processing supports requests you make, your consent when using the form, reasonable operational interests, and applicable legal obligations. DSO does not sell personal data. Internal access is limited to personnel who need it for their work."],
        },
        {
          title: "International transfers",
          paragraphs: ["WhatsApp/Meta or technology providers may process information in countries outside Indonesia according to their infrastructure and policies. Opening a WhatsApp link means using that third-party service."],
        },
        {
          title: "Retention and deletion",
          paragraphs: ["A form that has not been sent through WhatsApp is not stored by the website. WhatsApp conversations and SFTP files may be retained as needed for service follow-up, business records, security, or legal requirements. SFTP files may be removed by an authorized user or by DSO according to project needs."],
        },
        {
          title: "Security and your rights",
          paragraphs: ["The website uses HTTPS and SFTP connections use SSH. Web SFTP accounts are restricted to their assigned folders. You may request access, correction, or deletion of information managed by DSO by contacting cs@stellaeorientis.co.id. We may verify your identity and respond in accordance with applicable law."],
        },
        {
          title: "Children and policy changes",
          paragraphs: ["This is a business website and is not intended for children under 18. DSO may update this policy; the latest version and effective date will appear on this page."],
        },
      ],
    },
    terms: {
      updated: "October 5, 2026",
      intro: "By accessing the DSO website or using Web SFTP, you agree to these terms. If you do not agree, stop using the services.",
      sections: [
        {
          title: "Information and service requests",
          paragraphs: ["Website content provides general information about DSO and its services. Submitting a Request Proposal through WhatsApp is not a binding offer and does not create a contract. Scope, pricing, SLAs, and the parties' obligations apply only when agreed in a separate document or agreement."],
        },
        {
          title: "Acceptable use",
          paragraphs: ["You must use the website and services lawfully, protect your credentials, and not attempt to disrupt or access systems without authorization."],
          bullets: ["Do not upload or send unlawful files, malware, or data you are not authorized to share.", "Use SFTP only for the folder and work assigned to your account; do not share credentials.", "Ensure you have the rights and authorization for data sent through the form, WhatsApp, or SFTP."],
        },
        {
          title: "Request Proposal and WhatsApp",
          paragraphs: ["The website form opens WhatsApp with a draft containing the details you entered. You must review it and press Send in WhatsApp. WhatsApp is a third-party service subject to its own terms and privacy policy."],
        },
        {
          title: "Web SFTP and files",
          paragraphs: ["Web SFTP access is provided per account and restricted to an assigned folder. You are responsible for authorization, content, accuracy, and backups of uploaded files. DSO may limit or suspend access to protect systems, data, or other users."],
        },
        {
          title: "Intellectual property and external links",
          paragraphs: ["DSO names, logos, design, and content are protected by applicable rights unless otherwise stated. You may use the website for reasonable business information, but may not copy or commercially use DSO material without permission. WhatsApp and other external services are governed by their providers' terms."],
        },
        {
          title: "Availability and liability",
          paragraphs: ["DSO aims to keep the website and Web SFTP available but does not guarantee uninterrupted service. To the extent permitted by law, DSO is not responsible for third-party outages, unauthorized use, or decisions based solely on general website information. These terms do not limit rights that cannot be excluded by law."],
        },
        {
          title: "Governing law and changes",
          paragraphs: ["These terms are governed by the laws of the Republic of Indonesia. DSO may update them by publishing a new version on this page. Questions may be sent to cs@stellaeorientis.co.id."],
        },
      ],
    },
    cookies: {
      updated: "October 5, 2026",
      intro: "This page explains cookies and session storage on the DSO website and Web SFTP. The main website does not use advertising cookies.",
      sections: [
        {
          title: "Necessary cookies",
          bullets: ["NEXT_LOCALE: a session cookie that remembers the language choice on web.duxorientis.com. It uses the / path and SameSite=Lax.", "sftp.sid: the Web SFTP login-session cookie on sftp.duxorientis.com. It is HttpOnly, Secure, SameSite=Lax, and lasts up to about one hour.", "CMS authentication cookies are used only when authorized staff sign in to the admin area."],
        },
        {
          title: "Analytics",
          paragraphs: ["Plausible Analytics is currently disabled on the website. If enabled, the configured integration is designed to measure visits and basic interactions without cookies; this policy will be updated if that practice changes."],
        },
        {
          title: "Third-party services and browser controls",
          paragraphs: ["When you open WhatsApp, that service may use its own cookies and technologies controlled by Meta. You can clear or block cookies in your browser settings. Blocking session cookies may prevent language preference from being remembered or require you to sign in to Web SFTP again."],
        },
        {
          title: "Questions",
          paragraphs: ["For questions about cookies or privacy, contact cs@stellaeorientis.co.id."],
        },
      ],
    },
  },
};

const policyPaths: Record<LegalKind, string> = {
  privacy: "privasi",
  terms: "syarat",
  cookies: "cookies",
};

export function LegalNotice({ locale, kind }: Readonly<{ locale: Locale; kind: LegalKind }>) {
  const document = documents[locale][kind];
  const Icon = kind === "privacy" ? FileLock2 : kind === "terms" ? FileCheck2 : Cookie;
  const links = locale === "id"
    ? { privacy: "Privasi", terms: "Syarat", cookies: "Kebijakan Cookie" }
    : { privacy: "Privacy", terms: "Terms", cookies: "Cookie Policy" };

  return (
    <section className="bg-[var(--dso-mist)] py-14 sm:py-20">
      <div className="container-shell max-w-4xl">
        <article className="rounded-[var(--radius-card)] border border-[var(--dso-line)] bg-white p-7 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--dso-line)] pb-6">
            <Icon className="text-[var(--dso-red)]" size={28} strokeWidth={1.6} aria-hidden="true" />
            <p className="text-right text-xs text-[var(--dso-muted)]">
              {locale === "id" ? "Berlaku sejak " : "Effective "}{document.updated}
            </p>
          </div>
          <p className="mt-7 text-sm leading-7 text-[var(--dso-muted)]">{document.intro}</p>

          <div className="mt-8 divide-y divide-[var(--dso-line)]">
            {document.sections.map((section, index) => (
              <section key={section.title} className="py-6 first:pt-0 last:pb-0">
                <h2 className="font-display text-lg font-bold text-[var(--dso-ink)]">{index + 1}. {section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-7 text-[var(--dso-muted)]">{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="mt-3 grid gap-2 pl-5 text-sm leading-7 text-[var(--dso-muted)]">
                    {section.bullets.map((bullet) => <li key={bullet} className="list-disc">{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--dso-line)] pt-6 text-sm font-semibold">
            {(Object.keys(policyPaths) as LegalKind[]).filter((page) => page !== kind).map((page) => (
              <Link key={page} href={`/${locale}/${policyPaths[page]}`} className="text-[var(--dso-red)] hover:underline">
                {links[page]}
              </Link>
            ))}
            <a href="mailto:cs@stellaeorientis.co.id" className="text-[var(--dso-ink)] hover:underline">
              cs@stellaeorientis.co.id
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
