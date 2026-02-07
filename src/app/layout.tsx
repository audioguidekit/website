import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://audioguidekit.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AudioGuideKit - open-source audio guide player in React",
    template: "%s | AudioGuideKit",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  description:
    "Free, open-source audio guide player for museums, galleries, and cultural institutions. Self-hosted PWA that works offline. No vendor lock-in, no per-visitor fees.",
  keywords: [
    "audio guide",
    "museum audio guide",
    "audio tour",
    "self-guided tour",
    "museum technology",
    "open source audio player",
    "PWA audio guide",
    "offline audio guide",
    "gallery audio tour",
    "cultural institution",
    "heritage audio guide",
    "walking tour app",
    "exhibition audio",
    "free audio guide software",
  ],
  authors: [{ name: "AudioGuideKit", url: siteUrl }],
  creator: "AudioGuideKit",
  publisher: "AudioGuideKit",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "AudioGuideKit - open-source audio guide player in React",
    description:
      "Build audio guides for museums and cultural institutions. Free, self-hosted, works offline. No vendor lock-in.",
    type: "website",
    siteName: "AudioGuideKit",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AudioGuideKit - open-source audio guide player in React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioGuideKit - open-source audio guide player in React",
    description:
      "Build audio guides for museums and cultural institutions. Free, self-hosted, works offline.",
    creator: "@audiotour_oss",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="fde99ccc-ba6c-4f43-8017-1fac4547a234"
          strategy="afterInteractive"
        />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <KeyboardShortcuts />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
