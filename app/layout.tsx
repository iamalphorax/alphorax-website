import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Alphorax | Tech Solutions Reimagined',
  description: 'The Future of Tech Solutions Starts Here.',
  keywords: ['Alphorax', 'Tech', 'Innovation', 'Coming Soon', 'Startup'],
  metadataBase: new URL('https://alphorax.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Alphorax | Tech Solutions Reimagined',
    description: 'Something futuristic is launching soon.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Alphorax Logo',
      },
    ],
    url: 'https://alphorax.com',
    siteName: 'Alphorax',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
