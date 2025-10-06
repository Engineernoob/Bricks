"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // ✨ Fade-up on scroll
  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  // 💫 Floating shimmer badge
  useEffect(() => {
    if (!badgeRef.current) return;

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(badgeRef.current, {
      y: -4,
      duration: 2.2,
      ease: "power1.inOut",
    });

    gsap.to(badgeRef.current, {
      backgroundPosition: "200% center",
      duration: 4,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <section
      ref={ctaRef}
      id="cta"
      className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center"
    >
      {/* ✨ Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        {/* 🚀 Animated badge */}
        <div
          ref={badgeRef}
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium text-white bg-[linear-gradient(110deg,rgba(255,255,255,0.15),rgba(255,255,255,0.25),rgba(255,255,255,0.15))] bg-[length:200%_auto] border border-white/10 backdrop-blur-md shadow-sm"
        >
          🚀 Early Access Opening Soon
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-[Amiri] font-bold tracking-tight text-white leading-tight">
          Build the Future of No-Code
        </h2>
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-300 font-[Inter] max-w-2xl mx-auto">
          Be among the first to experience{" "}
          <span className="text-white">Bricks</span> — a no-code platform for
          creators who think in systems, not syntax.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist">
            <Button
              size="lg"
              className="gap-2 px-8 py-3 bg-white text-slate-900 hover:bg-slate-100 font-medium shadow-md hover:shadow-lg transition-all"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border border-slate-600/40 text-black hover:border-slate-200/50"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}
