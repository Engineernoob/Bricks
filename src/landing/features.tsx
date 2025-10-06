"use client";

import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Lightning Fast",
    description:
      "Build and deploy applications in minutes, not months. Bricks streamlines the entire process from design to launch.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    title: "Responsive Design",
    description:
      "Every application works flawlessly across devices. Bricks ensures pixel-perfect layouts for mobile, tablet, and desktop.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    title: "Advanced Components",
    description:
      "Access a rich library of prebuilt, customizable components that accelerate UI creation and maintain design consistency.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9h2m-2 3h2m2-6h2m-2 3h2"
        />
      </svg>
    ),
    title: "Database Integration",
    description:
      "Connect to any API or database with a single click. Real-time sync keeps your data fresh and consistent across environments.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, secure auth, and compliance by default. Bricks keeps your projects protected at every layer.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Team Collaboration",
    description:
      "Collaborate live with your team. Comment, edit, and publish together — all in real time.",
  },
];

export function Features() {
  return (
    <section className="relative min-h-screen bg-white py-28 overflow-hidden">
      {/* Animated falling bricks background */}
      <FallingBricks />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -top-60 left-1/2 -z-10 h-[36rem] w-[90rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-[120px] opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl font-[Amiri] font-bold tracking-tight text-slate-900">
              Powerful Features
            </h2>
            <div className="w-12 h-px bg-slate-900 mx-auto" />
            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600 font-[Inter]">
              Everything you need to design, build, and scale modern
              applications — all without writing code.
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: "easeOut",
              }}
              className="group"
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    {feature.icon}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900 font-[Inter]">
                      {feature.title}
                    </h3>
                    <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-purple-600" />
                    <p className="leading-relaxed text-slate-600 font-[Inter]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="text-center mt-24"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-slate-200 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-3xl font-[Amiri] font-bold text-slate-900">
                Ready to start building?
              </h3>
              <p className="text-slate-600 font-[Inter] text-lg">
                Join thousands of creators using Bricks to bring ideas to life —
                faster than ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200">
                  Start Building
                </button>
                <button className="px-8 py-3 text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-lg transition-all duration-200">
                  View Examples
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
