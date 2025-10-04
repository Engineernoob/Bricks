"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Database, LayoutGrid as Layout } from "lucide-react";

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".feature-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
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

  const features = [
    {
      name: "Visual Builder",
      description:
        "Drag and drop blocks to design your interface. Add text, inputs, buttons, and tables with ease.",
      icon: Layout,
    },
    {
      name: "Schema Editor",
      description:
        "Define your data structure with collections and fields. Create models and connect them instantly.",
      icon: Database,
    },
    {
      name: "Instant Deploy",
      description:
        "Publish your app instantly and share it with a unique URL. Updates go live immediately.",
      icon: Zap,
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-white py-24 sm:py-32 overflow-hidden"
    >
      {/* soft radial gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[30rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-[Amiri] font-bold tracking-tight text-slate-900">
            Everything you need to build full-stack apps
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 font-[Inter]">
            Bricks combines a visual builder, schema editor, and instant deploy
            into a complete no-code platform for production-ready apps.
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="feature-card flex flex-col items-start text-left rounded-xl border border-slate-200 bg-white/70 backdrop-blur-md p-8 shadow-sm hover:shadow-md transition-all"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <feature.icon
                    className="h-6 w-6 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 font-[Inter]">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
