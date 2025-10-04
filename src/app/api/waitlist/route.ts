import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const res = await fetch("https://api.clerk.com/v1/waitlist_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Clerk Waitlist error:", text);
      return NextResponse.json(
        { error: "Failed to add to waitlist" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
