"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Check } from "lucide-react";

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for exploring and launching your first app.",
      features: [
        "Visual builder access",
        "1 active project",
        "Community support",
        "Basic integrations",
      ],
      highlight: false,
      gradient: "from-slate-200 to-slate-100",
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Unlock advanced features and faster deployments.",
      features: [
        "Unlimited projects",
        "Custom domains",
        "Priority support",
        "API access",
      ],
      highlight: true,
      gradient: "from-blue-600 via-indigo-500 to-purple-600",
    },
    {
      name: "Team",
      price: "$49",
      period: "per month",
      description: "Collaborate, scale, and manage team workflows easily.",
      features: [
        "Team workspaces",
        "Role-based permissions",
        "Analytics dashboard",
        "Dedicated support",
      ],
      highlight: false,
      gradient: "from-slate-200 to-slate-100",
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative bg-white py-24 sm:py-32 overflow-hidden"
    >
      {/* soft background gradient */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-[Amiri] font-bold tracking-tight text-slate-900">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 font-[Inter]">
            Build for free, scale when you’re ready. No hidden fees, no limits
            on creativity.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-20 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card flex flex-col justify-between rounded-2xl border ${
                tier.highlight
                  ? "border-transparent bg-gradient-to-r shadow-xl hover:shadow-2xl transition-all from-blue-600 via-indigo-500 to-purple-600"
                  : "border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              } p-[2px]`}
            >
              <div
                className={`flex flex-col h-full rounded-2xl p-8 ${
                  tier.highlight
                    ? "bg-white/90 backdrop-blur-md"
                    : "bg-white/90 backdrop-blur-md"
                }`}
              >
                <div className="text-center">
                  <h3
                    className={`text-xl font-semibold ${
                      tier.highlight
                        ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
                        : "text-slate-900"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-4 text-slate-600 font-[Inter] text-sm">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline justify-center gap-x-1">
                    <span className="text-4xl font-bold text-slate-900">
                      {tier.price}
                    </span>
                    <span className="text-slate-500 text-sm">
                      / {tier.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700 font-[Inter]">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-2">
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
                <div className="mt-10">
                  <button
                    className={`w-full rounded-lg px-5 py-3 font-medium transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white hover:opacity-90"
                        : "border border-slate-300 text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tier.highlight ? "Get Started" : "Try for Free"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
