"use client";

import Link from "next/link";
import { ToyBrickIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // ✨ Subtle fade-in animation on scroll
  useEffect(() => {
    if (!footerRef.current) return;
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      },
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-slate-200 bg-white/70 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <ToyBrickIcon
              className="h-5 w-5 text-blue-600"
              aria-hidden="true"
            />
            <span className="font-semibold text-slate-900 tracking-tight">
              Bricks
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6 text-sm text-slate-600 font-[Inter]">
            <Link href="#features" className="hover:text-slate-900 transition">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-slate-900 transition">
              Docs
            </Link>
            <Link href="/auth" className="hover:text-slate-900 transition">
              Sign in
            </Link>
          </nav>

          {/* Socials */}
          <div className="flex gap-4">
            <Link
              href="https://twitter.com/shebuildsfire"
              target="_blank"
              className="text-slate-500 hover:text-slate-900 transition"
            >
              <TwitterIcon className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/Engineernoob"
              target="_blank"
              className="text-slate-500 hover:text-slate-900 transition"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100" />

        {/* Bottom Section */}
        <div className="text-center text-xs text-slate-500 font-[Inter]">
          © {new Date().getFullYear()} Bricks. Crafted with precision, built
          for creativity.
        </div>
      </div>
    </footer>
  );
}
