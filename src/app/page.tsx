"use client";

import { Navbar } from "@/landing/navbar";
import { Hero } from "@/landing/hero";
import { Features } from "@/landing/features";
import { Pricing } from "@/landing/pricing";
import { Testimonials } from "@/landing/testimoninals";
import { CallToAction } from "@/landing/cta";
import { Footer } from "@/landing/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
