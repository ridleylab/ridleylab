import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";
import { locations } from "@/config/locations";

export const metadata = {
  title: `System & SEO Overview - ${siteConfig.name} Admin`,
};

export default function AdminSettingsPage() {
  const envChecks = [
    {
      name: "DATABASE_URL",
      configured: Boolean(process.env.DATABASE_URL),
      purpose: "Koneksi PostgreSQL Neon via Prisma",
    },
    {
      name: "NEXTAUTH_SECRET",
      configured: Boolean(process.env.NEXTAUTH_SECRET),
      purpose: "Enkripsi sesi login admin NextAuth",
    },
    {
      name: "GOOGLE_API_KEY",
      configured: Boolean(process.env.GOOGLE_API_KEY),
      purpose: "Gemini AI Writer, Inline Rewrite & Generate SEO",
    },
    {
      name: "UPLOADTHING_TOKEN",
      configured: Boolean(process.env.UPLOADTHING_TOKEN),
      purpose: "Upload gambar & Media Gallery",
    },
    {
      name: "NEXT_PUBLIC_GA_ID",
      configured: Boolean(process.env.NEXT_PUBLIC_GA_ID),
      purpose: "Google Analytics 4 measurement",
    },
    {
      name: "NEXT_PUBLIC_GTM_ID",
      configured: Boolean(process.env.NEXT_PUBLIC_GTM_ID),
      purpose: "Google Tag Manager container",
    },
  ];

  const seoEndpoints = [
    { label: "Sitemap XML", path: "/sitemap.xml" },
    { label: "Robots Policy", path: "/robots.txt" },
    { label: "LLMs Discovery", path: "/llms.txt" },
    { label: "Blog RSS Feed", path: "/blog/rss" },
    { label: "Default OG Image", path: "/opengraph-image" },
    { label: "Services Hub", path: "/services" },
  ];

  const programRows = [
    programs.onlineCourse,
    programs.onlineMentoring,
    programs.offlineMentoring,
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          System &amp; SEO Overview
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Status konfigurasi terpusat dari{" "}
          <code className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900">
            config/*.ts
          </code>{" "}
          serta kesiapan integrasi environment produksi.
        </p>
      </div>

      {/* Site Config Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Globe size={16} />
            <h2 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
              Identitas &amp; Domain Kanonis
            </h2>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Brand</dt>
              <dd className="font-semibold text-zinc-950 dark:text-zinc-100">
                {siteConfig.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Canonical URL</dt>
              <dd className="font-mono text-xs text-zinc-950 dark:text-zinc-100">
                {siteConfig.url}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Founder</dt>
              <dd className="font-medium text-zinc-950 dark:text-zinc-100">
                {siteConfig.founder.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">WhatsApp</dt>
              <dd className="font-mono text-xs text-zinc-950 dark:text-zinc-100">
                {siteConfig.contact.whatsappDisplay}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Email</dt>
              <dd className="font-mono text-xs text-zinc-950 dark:text-zinc-100">
                {siteConfig.contact.email}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500 dark:text-zinc-400">Lokasi Terjadwal</dt>
              <dd className="font-medium text-zinc-950 dark:text-zinc-100 text-right">
                {locations.map((l) => l.city).join(", ")}
              </dd>
            </div>
          </dl>
        </div>

        {/* Env Integration Status */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <ShieldCheck size={16} />
            <h2 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
              Status Environment Integrations
            </h2>
          </div>

          <div className="space-y-3">
            {envChecks.map((env) => (
              <div
                key={env.name}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-mono font-semibold text-zinc-950 dark:text-zinc-100">
                    {env.name}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {env.purpose}
                  </p>
                </div>

                {env.configured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900 font-semibold shrink-0">
                    <CheckCircle2 size={12} />
                    <span>Aktif</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700 font-semibold shrink-0">
                    <XCircle size={12} />
                    <span>Kosong</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Pricing Overview */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-4">
        <h2 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          Katalog Program Aktif (config/programs.ts)
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {programRows.map((prog) => (
            <div
              key={prog.key}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {prog.badge}
              </p>
              <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50 mt-1">
                {prog.name}
              </p>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                {[prog.priceFormatted, prog.priceUnit].filter(Boolean).join(" ")}
              </p>
              <Link
                href={prog.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white mt-3"
              >
                <span>{prog.path}</span>
                <ExternalLink size={11} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Verification Links */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-4">
        <h2 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
          Verifikasi Endpoint SEO &amp; AI Crawlers
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {seoEndpoints.map((ep) => (
            <Link
              key={ep.path}
              href={ep.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-950 dark:hover:border-zinc-400 transition-colors"
            >
              <span>{ep.label}</span>
              <ExternalLink size={12} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
