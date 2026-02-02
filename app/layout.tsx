import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer"
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["sans-serif"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";

export const metadata: Metadata = {
  title: {
    default: "Alphorax",
    template: "%s | Alphorax",
  },
  description: "Smart AI, reliable software, trusted IT consulting.",
  metadataBase: new URL(baseUrl),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alphorax",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://linkedin.com/company/alphorax",
      "https://github.com/alphorax",
      "https://twitter.com/alphorax",
      "https://facebook.com/alphorax",
      "https://instagram.com/alphorax",
      "https://youtube.com/alphorax",
      "https://x.com/@alphorax",
    ],
  };
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FNS3P4DVCZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FNS3P4DVCZ');
            `,
          }}
        />
      </head>
      <body className={`min-h-screen bg-gradient-to-b from-secondary-charcoal to-[#001933] text-white`}>
        {/* ✅ Inject global structured data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
