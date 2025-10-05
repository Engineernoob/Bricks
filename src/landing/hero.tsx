"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FallingBricks } from "@/components/FallingBricks";
import Typed from "typed.js";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // ✨ GSAP reveal animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6",
        )
        .fromTo(
          ".hero-btns",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5",
        )
        .fromTo(
          ".hero-terminal",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.4",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ✨ Typed.js + custom moving cursor
  useEffect(() => {
    if (!typedRef.current || !cursorRef.current) return;

    typedRef.current.innerHTML = "";

    const cursor = cursorRef.current;
    const typed = new Typed(typedRef.current, {
      strings: [
        "bricks new my-app",
        "Creating app structure...",
        "Adding database schema...",
        "Deploying to Bricks Cloud...",
        "✔ Deployed successfully",
      ],
      typeSpeed: 40,
      backSpeed: 18,
      backDelay: 1000,
      startDelay: 300,
      smartBackspace: true,
      loop: true,
      showCursor: false, // we’re handling our own
      onBegin: () => blinkCursor(cursor),
      onStringTyped: () => blinkCursor(cursor),
      onComplete: () => blinkCursor(cursor),
    });

    // Watch for text changes → move cursor
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (typedRef.current) typedRef.current.innerHTML = "";
    };
  }, []);

  // ✨ Cursor blink animation helper
  const blinkCursor = (cursor: HTMLSpanElement) => {
    gsap.killTweensOf(cursor);
    gsap.fromTo(
      cursor,
      { opacity: 1 },
      {
        opacity: 0.2,
        duration: 0.5,
        yoyo: true,
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
      {/* 🧱 Animated bricks background */}
      <FallingBricks />

      {/* 🔮 Subtle gradient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-3xl opacity-20"
      />

      {/* 💎 Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        {/* Headline */}
        <h1 className="hero-title font-[Amiri] text-5xl sm:text-7xl font-bold tracking-tight text-slate-900">
          Build your dream app{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            brick by brick
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 font-[Inter]">
          The next generation of no-code development. Design, connect, and
          deploy production-ready apps — faster than ever.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth">
            <Button
              size="lg"
              className="px-8 py-3 text-white bg-slate-900 hover:bg-slate-800 transition-all"
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Learn more
            </Button>
          </Link>
        </div>

        {/* 🖥️ Terminal Animation */}
        <div className="hero-terminal mt-20 mx-auto max-w-lg rounded-lg border border-slate-200 bg-white/80 shadow-xl backdrop-blur-md p-4 text-left font-mono text-sm text-slate-700 relative">
          <div className="flex items-center gap-1 mb-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="relative inline-block">
            <pre
              ref={typedRef}
              className="min-h-[6rem] text-slate-800 inline-block"
            />
            <span
              ref={cursorRef}
              className=" justify-center top-0 text-blue-600 font-bold"
              style={{
                left: 0,
                opacity: 1,
              }}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
}
