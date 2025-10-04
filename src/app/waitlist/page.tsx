"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function WaitlistPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // ✨ Fade-up reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".fade-up"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
    );
  }, []);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
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
      } else throw new Error("Failed to join waitlist");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-blue-50 px-6 relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]"
      />

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="inline-block mb-5 px-4 py-1.5 rounded-full text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 shadow-sm fade-up">
          🚀 Early Access
        </div>

        <h1 className="fade-up text-4xl sm:text-5xl font-bold text-slate-900 font-[Amiri] mb-4">
          Join the Bricks Waitlist
        </h1>
        <p className="fade-up text-slate-600 font-[Inter] mb-8">
          Be the first to build your dream app — no code, just creativity. Get
          early access when we launch.
        </p>

        <form
          onSubmit={handleJoinWaitlist}
          className="fade-up bg-white/90 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl p-8 transition-all hover:shadow-2xl space-y-4"
        >
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 text-white font-medium"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              "Join Waitlist"
            )}
          </Button>

          {status === "success" && (
            <p className="text-green-600 text-sm mt-2">
              You’re in! We’ll email you when early access opens.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        <p className="fade-up mt-8 text-sm text-slate-500">
          Already have access?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-50 to-transparent pointer-events-none" />
    </main>
  );
}
