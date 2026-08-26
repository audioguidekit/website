import React from "react";
import type { Metadata } from "next";
import { Landing } from "@/components/landing";
import { landingMetadata } from "@/lib/landing-metadata";

export const metadata: Metadata = landingMetadata("en");

export default function LandingPage() {
  return <Landing lang="en" />;
}
