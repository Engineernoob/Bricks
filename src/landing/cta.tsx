"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);

  // ✨ Animate fade-up on scroll
  useEffect(() => {
    if (!ctaRef.current) return;

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
    >
      {/* Background glow and overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-[Amiri] font-bold tracking-tight text-white drop-shadow-md">
          Start building your dream app today
        </h2>
        <p className="mt-6 text-lg leading-8 text-blue-100 font-[Inter] max-w-2xl mx-auto">
          Bricks helps you go from idea to full-stack app in minutes — no code
          required. Just drag, drop, and deploy.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist">
            <Button
              size="lg"
              className="gap-2 px-8 py-3 bg-white text-blue-700 hover:bg-blue-50 font-medium shadow-md hover:shadow-lg transition-all"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border border-white text-white hover:bg-white/10 backdrop-blur transition-all"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative gradient edge fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
