"use client";

import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";

const testimonials = [
  {
    content:
      "Bricks transformed how we build internal tools. What used to take our team weeks now takes hours. The visual editor is incredibly intuitive, and the deployment process is seamless.",
    author: "Sarah Chen",
    role: "Head of Product",
    company: "TechFlow",
    avatar: "SC",
  },
  {
    content:
      "As a designer with limited coding experience, Bricks gave me the power to bring my ideas to life. The component library is extensive and the customization options are endless.",
    author: "Marcus Johnson",
    role: "Senior Designer",
    company: "CreativeStudio",
    avatar: "MJ",
  },
  {
    content:
      "We migrated our entire customer portal to Bricks in just two weeks. The performance is excellent, and our customers love the improved experience.",
    author: "Elena Rodriguez",
    role: "Engineering Manager",
    company: "DataVault",
    avatar: "ER",
  },
  {
    content:
      "The collaboration features in Bricks are game-changing. Our design and development teams can work together in real-time, eliminating back-and-forth.",
    author: "David Kim",
    role: "CTO",
    company: "InnovateNow",
    avatar: "DK",
  },
  {
    content:
      "Bricks helped us prototype and validate our MVP in record time. The rapid iteration capabilities allowed us to test multiple concepts and gather feedback quickly.",
    author: "Priya Patel",
    role: "Founder",
    company: "StartupLab",
    avatar: "PP",
  },
  {
    content:
      "The enterprise-grade security and compliance made Bricks an easy choice. We're building mission-critical applications with confidence.",
    author: "Alex Thompson",
    role: "VP of Technology",
    company: "GlobalCorp",
    avatar: "AT",
  },
];

const stats = [
  { number: "50 000 +", label: "Applications Built" },
  { number: "99.9 %", label: "Uptime Guarantee" },
  { number: "500 +", label: "Happy Customers" },
  { number: "24 / 7", label: "Support Available" },
];

export function Testimonials() {
  return (
    <section className="relative min-h-screen bg-white py-24">
      <FallingBricks />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-slate-900 font-[Amiri] text-4xl">
              Loved by Builders Everywhere
            </h2>
            <div className="w-12 h-px bg-slate-900 mx-auto" />
            <p className="max-w-2xl mx-auto mt-6 text-slate-900 font-[Inter]">
              See what teams around the world are saying about building with
              Bricks.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-semibold text-slate-900 mb-1">
                    {s.number}
                  </div>
                  <div className="text-sm text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + i * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 border border-slate-100 hover:bg-white transition duration-300 h-full">
                <div className="space-y-6">
                  <p className="leading-relaxed italic text-slate-900">
                    “{t.content}”
                  </p>
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-900">
                        {t.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        {t.author}
                      </div>
                      <div className="text-sm text-slate-900">
                        {t.role} at {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 border border-slate-100 text-center">
            <blockquote className="max-w-3xl mx-auto text-xl italic text-slate-900 leading-relaxed">
              “Bricks didn’t just change how we build—it transformed our entire
              approach to product development. We’re shipping faster, iterating
              more efficiently, and our team is happier than ever.”
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-slate-900">JW</span>
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Jamie Wilson</div>
                <div className="text-slate-900 text-sm">
                  VP of Engineering · TechCorp
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 border border-slate-100">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-slate-900 font-[Amiri] text-2xl">
                Join the Community
              </h3>
              <p className="text-slate-900 font-[Amiri] leading-relaxed">
                Become part of a growing community of builders shaping the
                future of application development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200">
                  Start Building Today
                </button>
                <button className="px-8 py-3 text-slate-900 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors duration-200">
                  Read Case Studies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
