"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

// ───────────────────────────────
// Footer Data
// ───────────────────────────────
const links = {
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  Resources: [
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { name: "Twitter", href: "https://twitter.com/shebuildsfire", icon: "ri-twitter-x-line" },
  { name: "GitHub", href: "https://github.com/bricks", icon: "ri-github-line" },
  { name: "LinkedIn", href: "https://linkedin.com/company/bricks", icon: "ri-linkedin-line" },
];

// ───────────────────────────────
// Component
// ───────────────────────────────
export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.ok ? setStatus("success") : setStatus("error");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-slate-100 bg-white/70 backdrop-blur-lg shadow-[0_-8px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* ── Brand & Description ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-slate-900 rounded-sm" />
            <span className="font-[Amiri] text-2xl text-slate-900">Bricks</span>
          </div>
          <p className="text-slate-600 font-[Inter] max-w-lg mx-auto">
            Build apps faster, smarter, and beautifully.  
            Visual development for modern creators and teams.
          </p>
        </motion.div>

        {/* ── Newsletter ── */}
        <motion.form
          onSubmit={handleSubscribe}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md mx-auto mb-16 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Join the waitlist"
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === "success"
                ? "bg-green-600 text-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {status === "loading"
              ? "Subscribing..."
              : status === "success"
                ? "Joined!"
                : "Subscribe"}
          </button>
        </motion.form>

        {/* ── Links ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 text-center md:text-left"
        >
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-slate-900 font-semibold mb-3">{category}</h4>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* ── Social & Meta ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-8 text-sm text-slate-500">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                <i className={`${s.icon} text-lg`} />
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Bricks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
