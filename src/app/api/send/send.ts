import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Bricks <hello@bricks.app>",
      to: [email],
      subject: "Welcome to Bricks 🎉",
      react: await EmailTemplate({
        firstName: firstName || "there",
        ctaUrl: "https://bricks.app/waitlist",
      }),
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    console.log("✅ Email sent:", data?.id);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("🔥 Error sending email:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
