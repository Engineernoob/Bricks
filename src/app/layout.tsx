import "./globals.css";
import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/landing/navbar";

// ───────────────────────────────
// Fonts
// ───────────────────────────────
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-amiri",
});

// ───────────────────────────────
// Metadata
// ───────────────────────────────
export const metadata: Metadata = {
  title: "Bricks – Build Your Dream App Brick by Brick",
  description:
    "Bricks is a no-code full-stack builder. Drag, drop, and deploy apps instantly with powerful blocks, flexible data, and seamless hosting.",
  keywords: [
    "Bricks",
    "no-code app builder",
    "build apps without code",
    "full-stack no-code",
    "drag and drop apps",
    "web app builder",
    "app builder platform",
    "visual development",
  ],
  openGraph: {
    title: "Bricks – Build Your Dream App Brick by Brick",
    description:
      "From idea to app in minutes. Bricks lets you build, customize, and deploy full-stack apps without writing code.",
    url: "https://bricks.app",
    siteName: "Bricks",
    images: [
      {
        url: "https://bricks.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bricks – No-Code App Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bricks – Build Your Dream App Brick by Brick",
    description:
      "Build your dream app, brick by brick. The fastest no-code full-stack builder for makers, founders, and teams.",
    images: ["https://bricks.app/og-image.png"],
    creator: "@shebuildsfire",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// ───────────────────────────────
// Layout
// ───────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${amiri.variable} bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased`}
        >
          {/* Global Navigation */}
          <Navbar />

          {/* Main Page Content */}
          <main className="pt-24 min-h-screen">{children}</main>

          {/* Global UI */}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
