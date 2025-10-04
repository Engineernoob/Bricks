"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ToyBrickIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // ✨ GSAP intro animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-slate-200 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <ToyBrickIcon className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-slate-900 text-lg">Bricks</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-[Inter]">
            <Link
              href="#features"
              className="text-slate-700 hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-slate-700 hover:text-slate-900 transition-colors"
              scroll={false}
            >
              Pricing
            </Link>
            <Link href="/auth">
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-slate-900"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-slate-700 hover:text-slate-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="sm:hidden border-t border-slate-200 pt-4 pb-6 flex flex-col gap-4 text-sm font-[Inter]">
            <Link
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Pricing
            </Link>
            <Link
              href="/auth"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Sign in
            </Link>
            <Link href="/auth" onClick={() => setMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white">
                Get started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
