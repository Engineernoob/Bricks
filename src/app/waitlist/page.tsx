"use client";

import { Waitlist } from "@clerk/nextjs";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Join the Bricks Waitlist
        </h1>
        <p className="text-slate-600 mb-8">
          Be the first to build your dream app. Get early access when we launch.
        </p>

        <div className="bg-white shadow-lg border border-slate-200 rounded-lg p-6">
          <Waitlist />
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Already have access?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  );
}
