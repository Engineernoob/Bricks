"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function BlogHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // ✨ Fade in animation on scroll
  useEffect(() => {
    if (!heroRef.current) return;

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-32 sm:py-40"
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute -top-60 left-1/2 -z-10 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full
        bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-[Amiri] text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          Building Bricks in Public
        </h1>

        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 font-[Inter] max-w-2xl mx-auto">
          Follow the journey of building{" "}
          <span className="font-semibold">Bricks</span> — updates, progress, and
          everything we’re shipping next.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#latest-posts"
            className="text-blue-600 hover:text-blue-800 font-medium transition-all underline underline-offset-4"
          >
            Read the latest updates ↓
          </a>
        </div>
      </div>
    </section>
  );
}
