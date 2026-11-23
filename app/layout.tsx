import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const themeInitScript = `(function(){try{var t=localStorage.getItem("ridleylab-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: siteConfig.titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/blog/rss`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)] transition-colors duration-200">
        <ThemeProvider>
          <GoogleAnalytics />
          <GoogleTagManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
