"use client";

import Link from "next/link";
import { ToyBrickIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  // ✨ Soft fade-up animation on scroll
  useEffect(() => {
    if (!footerRef.current) return;
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 24 },
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
      className="relative border-t border-slate-200 bg-white/70 backdrop-blur-md"
    >
      {/* Decorative gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-[Inter]">
            <Link href="#features" className="hover:text-slate-900 transition">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-slate-900 transition">
              Docs
            </Link>
            <Link href="/waitlist" className="hover:text-slate-900 transition">
              Join Waitlist
            </Link>
            <Link href="/contact" className="hover:text-slate-900 transition">
              Contact
            </Link>
            <Link href="/blog" className="hover:text-slate-800 transition">
              Blog
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-[Inter]">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Bricks. Crafted with precision, built
            for creativity.
          </p>
          <p className="mt-3 sm:mt-0 text-center sm:text-right">
            Designed with ❤️ by{" "}
            <Link
              href="https://github.com/Engineernoob"
              target="_blank"
              className="text-slate-700 hover:text-blue-600 transition"
            >
              Taahirah Denmark
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
