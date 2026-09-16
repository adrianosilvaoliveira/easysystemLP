import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReset } from "@/components/layout/ScrollReset";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Control | Do balcão ao contador, em uma tela só",
    template: "%s | Control",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "sistema de gestão",
    "NFC-e",
    "NF-e",
    "PDV offline",
    "ERP Brasil",
    "emissão fiscal",
    "SEUPDV",
    "painel do contador",
  ],
  authors: [{ name: site.company, url: site.url }],
  creator: site.company,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "Control | Do balcão ao contador, em uma tela só",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Control | Do balcão ao contador, em uma tela só",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-text">
        <Script id="reset-initial-scroll" src="/reset-scroll.js" strategy="beforeInteractive" />
        <ScrollReset />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
