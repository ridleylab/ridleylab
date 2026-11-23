# RidleyLab

Platform resmi **RidleyLab** (Pelatihan AI Social Media Marketing Bisnis Jasa) untuk membantu pemilik bisnis dan tim internal membangun sistem riset konten, SOP kerja, serta alur konversi terukur berbasis Artificial Intelligence.

## Halaman Utama (Canonical: `https://ridleylab.com`)

- **Homepage**: [https://ridleylab.com](https://ridleylab.com)
- **Semua Layanan**: [https://ridleylab.com/services](https://ridleylab.com/services)
- **Online Course (Rp199.000)**: [https://ridleylab.com/services/online-course](https://ridleylab.com/services/online-course)
- **Online Mentoring via Google Meet (Rp4.000.000 / tim)**: [https://ridleylab.com/services/online-mentoring](https://ridleylab.com/services/online-mentoring)
- **Offline Mentoring Tatap Muka (Rp4.500.000 / tim)**: [https://ridleylab.com/services/offline-mentoring](https://ridleylab.com/services/offline-mentoring)
- **Layanan per Kota (`/lokasi/[city]`)**: `yogyakarta`, `jakarta`, `bandung`, `semarang`, `surabaya`, `malang`
- **Portfolio**: [https://ridleylab.com/portfolio](https://ridleylab.com/portfolio)
- **About**: [https://ridleylab.com/about](https://ridleylab.com/about)
- **Blog**: [https://ridleylab.com/blog](https://ridleylab.com/blog)
- **Feeds & Discovery**: [`/sitemap.xml`](https://ridleylab.com/sitemap.xml), [`/robots.txt`](https://ridleylab.com/robots.txt), [`/llms.txt`](https://ridleylab.com/llms.txt), [`/blog/rss`](https://ridleylab.com/blog/rss)
- **Admin CMS**: `/admin` (Protected)

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack) + TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/typography` (Adaptive Light & Dark Mode)
- **Database**: PostgreSQL (Neon) via Prisma ORM 7 (`@prisma/adapter-pg`)
- **Authentication**: NextAuth v5
- **Editor & Media**: Tiptap Rich Text Editor & UploadThing
- **AI Integration**: Google Gemini (`@google/genai`)

---

## Features

- **Adaptive Monochrome UI**: Tema terang/gelap otomatis mengikuti OS browser dengan toggle manual dan pencegahan FOUC.
- **Technical SEO & Schema.org `@graph`**: Canonical non-`www` (`https://ridleylab.com`), redirect 301 dari `www.ridleylab.com`, OpenGraph/Twitter metadata, `Organization`, `WebSite`, `Course`, `Service`, `FAQPage`, `BlogPosting`, dan `BreadcrumbList`.
- **AI Discovery & Feeds**: Endpoint dinamis `/sitemap.xml`, `/robots.txt`, `/llms.txt`, dan `/blog/rss`.
- **Blog & Internal CMS**: Manajemen artikel, kategori, tag, serta galeri media di `/admin`.

---

## Folder Structure

```txt
ridleylab/
 ├─ app/
 │   ├─ (marketing)/         # Halaman publik, layanan, lokasi, portfolio, about, blog, legal
 │   ├─ (admin)/admin/       # Panel CMS internal (terlindungi auth)
 │   ├─ (auth)/login/        # Halaman login admin (noindex)
 │   ├─ api/                 # NextAuth & UploadThing endpoints
 │   ├─ layout.tsx           # Root layout, font Manrope & ThemeProvider
 │   ├─ opengraph-image.tsx  # Dynamic OG card fallback
 │   ├─ robots.ts            # Robots policy -> https://ridleylab.com
 │   ├─ sitemap.ts           # Sitemap XML seluruh route kanonis
 │   └─ llms.txt/            # Ringkasan layanan & konten untuk AI crawlers
 │
 ├─ components/
 │   ├─ ui/                  # Primitif UI monokrom (Button, Card, Accordion, ThemeToggle, dll.)
 │   ├─ layout/              # Header, Footer, ThemeProvider
 │   ├─ sections/            # Section halaman Home, Online Course, Online & Offline Mentoring
 │   ├─ blog/                # PostCard, SearchBar, Pagination, TableOfContents
 │   ├─ portfolio/           # ClientSection & TikTok embed
 │   ├─ seo/                 # Komponen render JSON-LD
 │   └─ admin/               # Komponen dashboard CMS
 │
 ├─ config/                  # Single source of truth (site, programs, portfolio, locations, navigation)
 ├─ lib/                     # Prisma client, SEO metadata, Schema.org @graph builder, auth guard
 ├─ prisma/                  # Schema Prisma & database seeder
 └─ public/                  # Aset gambar brand, program, bukti klien, & unggahan
```

---

## Getting Started

1. Install dependensi:
   ```bash
   npm install
   ```

2. Siapkan environment variables (`.env`) sesuai `.env.example`. Pada production Vercel, pastikan `NEXTAUTH_URL="https://ridleylab.com"` (naked domain, non-`www`).

3. Generate Prisma client (jika belum):
   ```bash
   npx prisma generate
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Deployment

Proyek dikonfigurasi untuk *deployment* di **Vercel**. Pastikan domain utama di Vercel diset ke **`ridleylab.com`** (dan `www.ridleylab.com` diarahkan ke `ridleylab.com`), serta seluruh Environment Variables produksi (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, dsb.) sudah terisi.
