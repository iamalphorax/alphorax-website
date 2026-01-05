import React from 'react'
import Hero from '@/components/Homepage/Hero'
import Services from '@/components/Homepage/Services'
import About from '@/components/Homepage/About'
import FeaturedProjects from '@/components/Homepage/FeaturedProjects'
import CTA from '@/components/Homepage/CTA'
import Testimonials from "@/components/Homepage/testimonials";

import { getContent } from '@/lib/cms'
import { ServicesConfig } from '@/types/services'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com"),
  title: "Smart AI, reliable software, trusted IT consulting | Alphorax",
  description:
    "Alphorax delivers forward-thinking digital infrastructure, AI integrations, and cloud systems built for scale.",
  keywords: ["Tech Solutions", "AI Systems", "Cloud", "Alphorax"],
  openGraph: {
    title: "Smart AI, reliable software, trusted IT consulting | Alphorax",
    description: "Alphorax delivers forward-thinking digital infrastructure, AI integrations, and cloud systems built for scale.",
    url: "/",
    siteName: "Alphorax",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alphorax",
    description:
      "Modern tech infrastructure and AI solutions for tomorrow’s businesses.",
    images: ["/twitter-card.png"],
  },
};

const Home = async () => {
  const [testimonialsData, servicesRawData, heroData, aboutData, projectsData, ctaData] = await Promise.all([
    getContent("testimonials.md"),
    getContent("services.md"),
    getContent("home-hero.md"),
    getContent("home-about.md"),
    getContent("home-projects.md"),
    getContent("home-cta.md")
  ]);

  const servicesData = (servicesRawData as ServicesConfig)?.services;

  return (
    <main>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Hero data={heroData as any} />
      <Services services={servicesData} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <About data={aboutData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <FeaturedProjects data={projectsData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Testimonials data={testimonialsData as any} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <CTA data={ctaData as any} />
    </main>
  )
}
export default Home
