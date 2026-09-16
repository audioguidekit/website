import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LANGS } from "@/content/landing/langs";

// Agents (Claude, ChatGPT, etc.) send `Accept: text/markdown` when they want
// raw content instead of rendered HTML. Only /notes/<slug> and /docs/* have a
// markdown/MDX source to serve — see src/app/api/markdown/[...path]/route.ts.
const MARKDOWN_SECTIONS = ["/notes/", "/docs"];

function wantsMarkdown(accept: string | null) {
  if (!accept) return false;
  return accept
    .split(",")
    .some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

// ponytail: ignores Accept-Language q-values; browsers already send tags in
// preference order. Sort by q if a real client ever gets this wrong.
function pickLang(header: string | null) {
  for (const part of (header ?? "").split(",")) {
    const base = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (base === "en" || (LANGS as readonly string[]).includes(base)) return base;
  }
  return "en";
}

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

  const pathname = request.nextUrl.pathname;
  const isMarkdownCapable = MARKDOWN_SECTIONS.some((s) => pathname.startsWith(s));

  if (isMarkdownCapable && wantsMarkdown(request.headers.get("accept"))) {
    return NextResponse.rewrite(new URL(`/api/markdown${pathname}`, request.url));
  }

  // Advertise the markdown alternate (RFC 8288) so agents that fetched the
  // HTML can discover it without already knowing to send Accept: text/markdown.
  if (isMarkdownCapable) {
    const response = NextResponse.next();
    response.headers.set("Link", `<${pathname}>; rel="alternate"; type="text/markdown"`);
    return response;
  }

  // Send visitors to their language on `/` only. Visiting /de or /es directly
  // always wins, and the switcher's `lang` cookie pins the choice from then on.
  // Crawlers send no Accept-Language, so they stay on the English `/`.
  if (request.nextUrl.pathname === "/") {
    const pinned = request.cookies.get("lang")?.value;
    const lang = pinned ?? pickLang(request.headers.get("accept-language"));
    if ((LANGS as readonly string[]).includes(lang)) {
      return NextResponse.redirect(new URL(`/${lang}`, request.url), 307);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/(de|es)",
    "/notes/:path*",
    "/docs/:path*",
    "/updates",
    "/robots.txt",
    "/sitemap.xml",
  ],
};
