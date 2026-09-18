import type { Metadata } from "next";
import { mdPath } from "web-for-agents";

// The page is a client component, which can't export metadata.
export const metadata: Metadata = {
  alternates: { canonical: "https://audioguidekit.org/updates", types: { "text/markdown": mdPath("/updates") } },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
