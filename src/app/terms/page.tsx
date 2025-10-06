import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Build with Bricks",
  description:
    "Review the Terms of Service for Build with Bricks. Understand your rights, responsibilities, and usage guidelines for our platform.",
  alternates: {
    canonical: "https://buildwithbricks.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Build with Bricks",
    description:
      "Review the Terms of Service for Build with Bricks and learn how our platform operates.",
    url: "https://buildwithbricks.com/terms",
    siteName: "Build with Bricks",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-white text-slate-800 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-[Amiri] font-bold mb-8 text-slate-900">
          Terms of Service
        </h1>
        <p className="text-slate-600 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6">
          Welcome to <strong>Build with Bricks</strong> (“Bricks”, “we”, “our”,
          or “us”). By using our platform, you agree to these Terms of Service
          (“Terms”). Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Use of the Service
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>You must be at least 13 years old to use our services.</li>
          <li>
            You may not reverse-engineer, copy, or resell our code or designs.
          </li>
          <li>We may suspend access for misuse or violation of laws.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Subscriptions</h2>
        <p>
          Paid subscriptions renew automatically unless canceled. You may cancel
          anytime from your account dashboard.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          3. Intellectual Property
        </h2>
        <p>
          All code, UI components, and content are property of Build with
          Bricks. You retain rights to your data and creations made using our
          tools.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          4. Limitation of Liability
        </h2>
        <p>
          We are not liable for any indirect or consequential damages arising
          from the use or inability to use our Services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Changes</h2>
        <p>
          We may update these Terms periodically. Continued use constitutes
          acceptance of the latest version.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Contact</h2>
        <p>
          For any legal inquiries, contact us at{" "}
          <a
            href="mailto:legal@buildwithbricks.com"
            className="text-indigo-600 underline"
          >
            legal@buildwithbricks.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
