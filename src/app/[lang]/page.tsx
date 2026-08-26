import React from "react";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { landingMetadata } from "@/lib/landing-metadata";
import { LANGS, isLang } from "@/content/landing";

// Only /de and /es exist; anything else 404s instead of rendering the page.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return landingMetadata(isLang(lang) ? lang : "en");
}

export default async function LocalizedLandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <Landing lang={lang} />;
}
