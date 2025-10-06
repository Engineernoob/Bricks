"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FallingBricks } from "@/components/FallingBricks";

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".pricing-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  const tiers = [
    {
      name: "Starter",
      priceMonthly: "Free",
      priceYearly: "coming soon",
      description:
        "Perfect for exploring Bricks and building your first project.",
      features: [
        "5 active projects",
        "Visual builder access",
        "Community support",
        "Starter integrations",
      ],
      highlight: false,
      cta: "Join Waitlist",
      discount: null,
    },
    {
      name: "Pro",
      priceMonthly: "TBA",
      priceYearly: "TBA",
      description:
        "For indie hackers and solo founders ready to launch production apps.",
      features: [
        "Unlimited projects",
        "Custom domains",
        "Priority support",
        "API & automation access",
        "Advanced components",
      ],
      highlight: true,
      cta: "Join Waitlist",
      discount: null,
    },
    {
      name: "Team",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      description:
        "For teams needing collaboration, permissions, and advanced analytics.",
      features: [
        "Team workspaces",
        "Role-based permissions",
        "Project analytics",
        "Dedicated support",
        "Enterprise integrations",
      ],
      highlight: false,
      cta: "Join Waitlist",
      discount: null,
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-white py-28 overflow-hidden"
    >
      <FallingBricks />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[90rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl font-[Amiri] font-bold text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <div className="w-12 h-px bg-slate-900 mx-auto mt-4" />
            <p className="mt-6 text-lg text-slate-900 font-[Amiri]">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Toggle */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-sm font-medium text-slate-900">
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  isYearly ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                    isYearly ? "translate-x-7" : ""
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-900">
                Yearly <span className="text-indigo-600">–20%</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-3 mb-20">
          {tiers.map((tier, index) => {
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
                className={`pricing-card relative rounded-2xl border ${
                  tier.highlight
                    ? "border-slate-300 bg-white/90 shadow-lg hover:shadow-xl"
                    : "border-slate-100 bg-white/70 shadow-sm hover:shadow-md"
                } transition-all duration-300`}
              >
                {tier.highlight && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3
                      className={`text-xl font-semibold ${
                        tier.highlight
                          ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
                          : "text-slate-900"
                      }`}
                    >
                      {tier.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mt-4 text-3xl font-[Amiri] text-slate-900">
                      {tier.priceMonthly}
                      {tier.priceMonthly !== "Free" && (
                        <span className="text-sm text-slate-600 ml-1">
                          /month
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-slate-600 font-[Inter] text-sm">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-3 text-slate-700 font-[Inter]">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-x-2">
                        <Check
                          className={`h-4 w-4 ${
                            tier.highlight ? "text-indigo-500" : "text-blue-600"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-8">
                    <Link href="/waitlist">
                      <Button
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                          tier.highlight
                            ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white hover:opacity-90"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {tier.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
