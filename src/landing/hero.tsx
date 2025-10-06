"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Typed from "typed.js";
import { FallingBricks } from "@/components/FallingBricks";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // ✨ GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 },
      )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6",
        )
        .fromTo(
          ".hero-btns",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          ".hero-terminal",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ✨ Typed.js typing effect
  useEffect(() => {
    if (!typedRef.current || !cursorRef.current) return;

    typedRef.current.innerHTML = "";

    const cursor = cursorRef.current;
    const typed = new Typed(typedRef.current, {
      strings: [
        "bricks new my-app",
        "Creating app structure...",
        "Connecting database...",
        "Deploying to Bricks Cloud...",
        "✔ Build complete",
      ],
      typeSpeed: 38,
      backSpeed: 18,
      backDelay: 1000,
      startDelay: 200,
      smartBackspace: true,
      loop: true,
      showCursor: false,
      onBegin: () => blinkCursor(cursor),
    });

    const observer = new MutationObserver(() => {
      if (!typedRef.current) return;
      const range = document.createRange();
      range.selectNodeContents(typedRef.current);
      range.collapse(false);
      const rects = range.getBoundingClientRect();
      const containerRect = typedRef.current.getBoundingClientRect();
      cursor.style.left = `${rects.right - containerRect.left}px`;
    });

    observer.observe(typedRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      typed.destroy();
      observer.disconnect();
      gsap.killTweensOf(cursor);
    };
  }, []);

  // Cursor blink helper
  const blinkCursor = (cursor: HTMLSpanElement) => {
    gsap.killTweensOf(cursor);
    gsap.fromTo(
      cursor,
      { opacity: 1 },
      {
        opacity: 0.2,
        duration: 0.6,
        yoyo: false,
        repeat: -1,
        ease: "power1.inOut",
      },
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white py-32 sm:py-40"
    >
      {/* 🧱 Subtle falling bricks */}
      <FallingBricks />

      {/* 💎 Main content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="hero-title font-[Amiri] text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Build your dream app,
          <br /> brick by brick.
        </h1>

        <p className="hero-sub mt-6 text-base sm:text-lg text-slate-900 font-[Mono] leading-relaxed max-w-2xl mx-auto">
          Bricks is a no-code full-stack builder. Design, connect, and deploy —
          no code required.
        </p>

        {/* CTA buttons */}
        <div className="hero-btns mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth">
            <Button className="px-8 py-3 bg-slate-900 text-white hover:bg-slate-800 font-medium transition-all">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="#features">
            <Button
              variant="ghost"
              className="px-8 py-3 text-slate-900 hover:text-slate-900 hover:bg-slate-100 font-medium transition-all"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* 🖥️ Terminal typing animation */}
        <div className="hero-terminal mt-20 mx-auto max-w-lg rounded-md border border-slate-500 bg-white/70 shadow-sm backdrop-blur-sm p-4 text-left font-mono text-sm text-slate-700 relative">
          <div className="flex items-center gap-1 mb-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="relative inline-block">
            <pre ref={typedRef} className="min-h-[5rem] inline-block" />
            <span
              ref={cursorRef}
              className="absolute top-0 text-slate-800 font-bold"
              style={{ left: 0, opacity: 1 }}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
}
