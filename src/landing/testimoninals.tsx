"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Startup Founder",
      feedback:
        "Bricks saved me weeks of development time. I launched my MVP in a weekend without writing a single line of code.",
      color: "from-blue-500 via-indigo-500 to-purple-600",
      initials: "AJ",
    },
    {
      name: "Sofia Martinez",
      role: "Product Designer",
      feedback:
        "The drag-and-drop builder feels natural and powerful. I built a prototype for my client and deployed it instantly.",
      color: "from-pink-500 via-rose-500 to-orange-400",
      initials: "SM",
    },
    {
      name: "David Kim",
      role: "Indie Hacker",
      feedback:
        "Bricks is a game-changer for indie founders. I went from idea to working app faster than ever before.",
      color: "from-teal-500 via-cyan-500 to-blue-500",
      initials: "DK",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 py-24 sm:py-32 overflow-hidden relative"
    >
      {/* Subtle glow background */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-[Amiri] font-bold tracking-tight text-slate-900">
            Loved by makers, founders, and teams
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 font-[Inter]">
            Bricks helps builders at every level turn ideas into
            production-ready apps — fast, simple, and beautiful.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-slate-700 text-base leading-relaxed">
                “{t.feedback}”
              </p>

              {/* Name + gradient badge */}
              <div className="mt-6 flex items-center gap-x-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${t.color} text-white font-semibold text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-600 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
