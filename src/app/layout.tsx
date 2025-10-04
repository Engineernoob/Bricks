import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
