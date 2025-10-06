import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    // 1️⃣ Add to Clerk Waitlist
    const clerkRes = await fetch("https://api.clerk.com/v1/waitlist_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!clerkRes.ok) {
      const text = await clerkRes.text();
      console.error("❌ Clerk Waitlist error:", text);
      return NextResponse.json(
        { success: false, error: "Failed to add to waitlist" },
        { status: 400 },
      );
    }

    // 2️⃣ Send Resend Welcome Email
    const { error } = await resend.emails.send({
      from: "Bricks <hello@bricks.app>",
      to: [email],
      subject: "Welcome to Bricks 🎉",
      react: await EmailTemplate({
        firstName: firstName || "there",
        ctaUrl: "https://bricks.app/waitlist",
      }),
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Email failed to send" },
        { status: 500 },
      );
    }

    console.log("✅ Added to waitlist & email sent:", email);
    return NextResponse.json({ success: true, email });
  } catch (err) {
    console.error("🔥 Waitlist API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
