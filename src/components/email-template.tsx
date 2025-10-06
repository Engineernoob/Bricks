import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
  ctaUrl?: string;
}

export function EmailTemplate({
  firstName = "there",
  ctaUrl,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        padding: "40px 0",
      }}
    >
      {/* Email Container */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
            color: "#fff",
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              fontFamily: "Amiri, Georgia, serif",
            }}
          >
            Welcome to Bricks
          </div>
          <p
            style={{
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              opacity: 0.9,
            }}
          >
            Build your dream app — brick by brick.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "32px 24px", textAlign: "left" }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "20px",
              fontWeight: "600",
              color: "#0f172a",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Hey {firstName},
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#334155",
              fontFamily: "Inter, sans-serif",
            }}
          >
            You’re officially on the <strong>Bricks Waitlist</strong> 🎉 Soon,
            you’ll get early access to the platform that lets you design,
            connect, and deploy full-stack apps — all visually.
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#334155",
              fontFamily: "Inter, sans-serif",
              marginTop: "12px",
            }}
          >
            We’ll notify you as soon as your invite is ready. In the meantime,
            you can follow our progress and updates below 👇
          </p>

          {/* CTA */}
          {ctaUrl && (
            <a
              href={ctaUrl}
              style={{
                display: "inline-block",
                marginTop: "24px",
                padding: "14px 28px",
                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                color: "#ffffff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                transition: "opacity 0.3s ease",
              }}
            >
              View Waitlist
            </a>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "#64748b",
            backgroundColor: "#f9fafb",
            fontFamily: "Inter, sans-serif",
          }}
        >
          © {new Date().getFullYear()} Bricks. All rights reserved.
          <br />
          <a
            href="https://bricks.app"
            style={{
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            bricks.app
          </a>
        </div>
      </div>
    </div>
  );
}
