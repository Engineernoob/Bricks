"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

// ───────────────────────────────
// Footer link data
// ───────────────────────────────
const footerLinks = {
  Product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Security", href: "/security" },
  ],
};

// ───────────────────────────────
// Social links
// ───────────────────────────────
const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/bricks",
    icon: "ri-twitter-x-line",
  },
  { name: "GitHub", href: "https://github.com/bricks", icon: "ri-github-line" },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/bricks",
    icon: "ri-linkedin-line",
  },
  {
    name: "Discord",
    href: "https://discord.gg/bricks",
    icon: "ri-discord-line",
  },
];

// ───────────────────────────────
// Component
// ───────────────────────────────
export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-slate-900 rounded-sm" />
                <span className="text-lg font-[Amiri] text-slate-900">
                  Bricks
                </span>
              </div>
              <p className="text-slate-600 max-w-sm leading-relaxed font-[Inter]">
                The visual development platform that empowers anyone to build
                powerful applications without code.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.05,
                    }}
                    className="text-slate-400 hover:text-slate-700 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <i className={`${social.icon} text-lg`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + categoryIndex * 0.1,
                }}
                className="col-span-1 space-y-4"
              >
                <h4 className="text-slate-900 font-semibold">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + categoryIndex * 0.1 + linkIndex * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>

        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-8 border-t border-slate-100"
        >
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-slate-900 font-medium">Stay updated</h4>
              <p className="text-sm text-slate-600">
                Get the latest news and updates from Bricks.
              </p>
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-colors duration-200"
                disabled={status === "loading"}
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                  status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                    ? "Subscribed!"
                    : "Subscribe"}
              </button>
            </div>
          </form>

          {status === "error" && (
            <p className="mt-3 text-sm text-red-600 text-center md:text-right">
              Something went wrong. Please try again later.
            </p>
          )}
        </motion.div>

        {/* Bottom meta section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="py-6 border-t border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-slate-600">
            <div>
              © {new Date().getFullYear()} Bricks. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/status"
                className="hover:text-slate-900 transition-colors"
              >
                Status
              </Link>
              <Link
                href="/changelog"
                className="hover:text-slate-900 transition-colors"
              >
                Changelog
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
