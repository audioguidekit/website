import React from 'react';
import { Navigation } from '@/components/sections/navigation';
import { Hero } from '@/components/sections/hero';
import { CoreFeatures } from '@/components/sections/core-features';
import { WhoItIsFor } from '@/components/sections/who-it-is-for';
import { EditingExperience } from '@/components/sections/editing-experience';
import { Philosophy } from '@/components/sections/philosophy';
import { CTA } from '@/components/sections/cta';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/sections/footer';
import HowItWorks from '@/components/sections/how-it-works';
import { AppShowcase } from '@/components/sections/app-showcase';
import { TryPlayer } from '@/components/sections/try-player';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navigation />
      <main className="w-full max-w-[1400px] border-x border-border relative pt-16 md:pt-22 bg-background">
        <Hero />
        <CoreFeatures />
        <WhoItIsFor />
        <AppShowcase />
        <TryPlayer />
        <EditingExperience />
        <HowItWorks />
        <FAQ />
        <Philosophy />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
