# RIDLEY

Platform resmi RIDLEY (Pelatihan AI Social Media Marketing) untuk membantu bisnis jasa membangun sistem konten dan alur konversi otomatis berbasis AI.

## Pages

- **Homepage**: [https://www.ridleylab.com/](https://www.ridleylab.com/)
- **Online Course**: [https://www.ridleylab.com/online-course/](https://www.ridleylab.com/online-course/)
- **Offline Mentoring**: [https://www.ridleylab.com/offline-mentoring/](https://www.ridleylab.com/offline-mentoring/)
- **Blog**: [https://www.ridleylab.com/blog](https://www.ridleylab.com/blog)
- **Admin Dashboard**: `/admin` (Protected)

---

## Tech Stack

Proyek ini telah direstrukturisasi dari HTML statis menjadi aplikasi React modern berkinerja tinggi:

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS & Global CSS
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Content**: MDX (untuk artikel blog)
- **Editor**: Custom Rich Text Editor (Tiptap)

---

## Features

- **Responsive Design**: Mendukung layar Desktop, Tablet, dan Mobile.
- **Dynamic SEO & Metadata**: Implementasi metadata dinamis untuk setiap halaman dan artikel.
- **Rich Schema.org (JSON-LD)**: 
  - Struktur SEO modular (`WebPage`, `Service`, `FAQPage`, `Organization`, `WebSite`) untuk mesin pencari.
- **Open Graph**: Teroptimasi penuh untuk *sharing* ke WhatsApp, Facebook, Instagram, dsb.
- **Admin Panel**: Sistem CMS internal untuk membuat, mengedit, dan menerbitkan artikel blog (`/admin`).
- **Markdown & MDX Support**: Penulisan artikel interaktif menggunakan MDX.

---

## Folder Structure

```txt
ridleylab/
 ├─ app/                     # Next.js App Router (Halaman dan Rute API)
 │   ├─ admin/               # Panel Admin (Terlindungi)
 │   ├─ api/                 # Endpoint API (Autentikasi, Gambar, dll)
 │   ├─ blog/                # Halaman Blog & Artikel
 │   ├─ offline-mentoring/   # Halaman Offline Mentoring
 │   ├─ online-course/       # Halaman Online Course
 │   └─ page.tsx             # Homepage
 │
 ├─ components/              # Komponen React yang dapat digunakan ulang
 │   ├─ admin/               # Komponen spesifik untuk Panel Admin
 │   ├─ layout/              # Navbar, Footer, Container
 │   └─ sections/            # Blok antarmuka yang sudah diekstrak:
 │       ├─ home/            # (Hero, Problem, CTA, dll)
 │       ├─ offline-mentoring/
 │       └─ online-course/
 │
 ├─ lib/                     # Utilitas dan Konfigurasi
 │   ├─ db/                  # Prisma Database Client
 │   └─ seo/
 │       └─ schema/          # Skema JSON-LD Modular (pages.ts, organization.ts, dll)
 │
 ├─ prisma/                  # Skema Database & Seeder
 ├─ public/                  # Aset Statis (Gambar, robots.txt, sitemap, manifest)
 └─ middleware.ts            # Proteksi Rute NextAuth
```

---

## Getting Started

Untuk menjalankan proyek ini secara lokal:

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan migrasi database Prisma (opsional jika `dev.db` sudah ada):
   ```bash
   npx prisma db push
   ```

3. Jalankan server pengembangan (Development Server):
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Deployment
Proyek ini dikonfigurasi untuk *deployment* secara langsung ke **Vercel**. Pastikan untuk mengatur seluruh Environment Variables (`.env`) yang dibutuhkan seperti `NEXTAUTH_SECRET` saat rilis ke produksi.