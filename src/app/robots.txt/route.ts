import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    `User-agent: *
Allow: /
Sitemap: https://buildwithbricks.com/sitemap.xml
Host: buildwithbricks.com`,
    { headers: { "Content-Type": "text/plain" } },
  );
}
