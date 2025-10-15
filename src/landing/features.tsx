"use client";

import { motion } from "motion/react";
import {
  Rocket,
  MonitorSmartphone,
  Layers,
  Database,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FallingBricks } from "@/components/FallingBricks";

const features = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Lightning Fast",
    description:
      "From idea to deployment in minutes. Bricks handles everything — design, logic, and hosting — so you can move at the speed of thought.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Responsive by Design",
    description:
      "Every layout is adaptive out of the box. Build once, launch anywhere — mobile, tablet, and desktop.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Smart Components",
    description:
      "A growing library of drag-and-drop components with real logic. Customize, connect, and reuse across projects.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Live Data Sync",
    description:
      "Connect APIs, databases, or Supabase instantly. Bricks keeps your data live, cached, and consistent.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with encrypted storage, auth, and role-based access built in — zero config needed.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborative Editing",
    description:
      "Edit, comment, and build together in real time. Bricks brings multiplayer development to the no-code era.",
  },
];

export function Features() {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 py-28 overflow-hidden">
      {/* Animated bricks */}
      <FallingBricks />

      {/* Glow gradient */}
      <div
        aria-hidden="true"
        className="absolute -top-60 left-1/2 -z-10 h-[36rem] w-[90rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[120px] opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-[Amiri] font-bold tracking-tight text-slate-900">
            Everything You Need to Build Beautifully
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto my-4 animate-pulse" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 font-[Inter] leading-relaxed">
            Bricks combines design, data, and deployment into one seamless
            experience — so you can focus on creating.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15 * index,
                ease: "easeOut",
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md mb-6 group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 font-[Inter]">
                  {feature.title}
                </h3>
                <div className="w-8 h-px bg-gradient-to-r from-indigo-500 to-purple-500 my-3 group-hover:opacity-100 opacity-70 transition-opacity" />
                <p className="leading-relaxed text-slate-600 font-[Inter] text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="text-center mt-24"
        >
          <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-12 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
            <h3 className="text-3xl font-[Amiri] font-bold text-slate-900 mb-4">
              Ready to Start Building?
            </h3>
            <p className="text-slate-600 font-[Inter] text-lg mb-8 max-w-2xl mx-auto">
              Join a new generation of makers who design, ship, and scale apps
              with Bricks — no code required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200">
                Start Building
              </button>
              <button className="px-8 py-3 text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-lg transition-all duration-200">
                Explore Examples
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}