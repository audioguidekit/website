import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const websiteKey = process.env.SITELINE_WEBSITE_KEY;

  if (websiteKey) {
    const url = request.nextUrl.href;
    const userAgent = request.headers.get("user-agent") ?? "";
    const ref = request.headers.get("referer") ?? "";
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "";

    const trackingUrl = new URL(
      "https://api.siteline.ai/v1/intake/pageview"
    );
    trackingUrl.searchParams.set("url", url);
    trackingUrl.searchParams.set("userAgent", userAgent);
    trackingUrl.searchParams.set("ref", ref);
    trackingUrl.searchParams.set("ip", ip);
    trackingUrl.searchParams.set("websiteKey", websiteKey);

    // Fire and forget — no await, zero latency impact
    fetch(trackingUrl.toString()).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/notes/:path*",
    "/docs/:path*",
    "/updates",
  ],
};
