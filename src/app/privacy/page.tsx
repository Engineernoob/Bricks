import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Build with Bricks",
  description:
    "Learn how Build with Bricks collects, uses, and protects your data. Your privacy and security are our top priority.",
  alternates: {
    canonical: "https://buildwithbricks.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Build with Bricks",
    description:
      "Learn how Build with Bricks collects, uses, and protects your data.",
    url: "https://buildwithbricks.com/privacy",
    siteName: "Build with Bricks",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-white text-slate-800 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-[Amiri] font-bold mb-8 text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-slate-600 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6">
          At <strong>Build with Bricks</strong> (“Bricks”, “we”, “our”, or
          “us”), your privacy is important to us. This Privacy Policy explains
          how we collect, use, and protect your information when you use our
          website, applications, and related services (collectively, the
          “Services”).
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email, and data you
            provide via forms.
          </li>
          <li>
            <strong>Usage Data:</strong> Analytics and technical information
            about your device.
          </li>
          <li>
            <strong>Cookies:</strong> Used for authentication and analytics
            purposes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>To provide, improve, and personalize our Services</li>
          <li>To communicate updates and support responses</li>
          <li>To ensure compliance and prevent misuse</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Data Sharing</h2>
        <p>
          We do not sell personal data. We share limited data with trusted
          partners to operate and improve our Services, always under
          confidentiality agreements.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Security</h2>
        <p>
          We use encryption and secure hosting (Vercel, AWS) to protect your
          data, but no system is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Contact Us</h2>
        <p>
          Have questions? Reach us at{" "}
          <a
            href="mailto:privacy@buildwithbricks.com"
            className="text-indigo-600 underline"
          >
            privacy@buildwithbricks.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
