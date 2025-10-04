import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server"; // ✅ Correct import for App Router
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // ✅ Await the async auth() call
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth"); // redirect to your custom auth page
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* 🧭 Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors"
          >
            🧱 Bricks
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-slate-100 transition-colors"
              >
                Builder
              </Button>
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </nav>

      {/* 📦 Main content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        {children}
      </main>

      {/* ⚙️ Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bricks — Build your dream app, brick by
        brick.
      </footer>
    </div>
  );
}
