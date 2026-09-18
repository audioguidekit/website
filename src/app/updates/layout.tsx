import type { Metadata } from "next";
import { mdPath } from "web-for-agents";

const siteUrl = "https://audioguidekit.org";
const description = "What's shipped in AudioGuideKit, release by release.";
const ogImage = `${siteUrl}/og-image.png`;

// The page is a client component, which can't export metadata.
// openGraph/twitter are set here so they don't inherit the homepage's from the root layout.
export const metadata: Metadata = {
  title: "Changelog",
  description,
  alternates: { canonical: `${siteUrl}/updates`, types: { "text/markdown": mdPath("/updates") } },
  openGraph: {
    title: "AudioGuideKit changelog",
    description,
    url: `${siteUrl}/updates`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "AudioGuideKit" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
