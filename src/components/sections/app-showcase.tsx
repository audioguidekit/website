'use client';

import React from 'react';
import { PhoneFrame } from '@/components/ui/phone-frame';

const features = [
  {
    title: "Discover Tours",
    description: "Browse through available audio tours in your vicinity with an intuitive interface.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Immersive Experience",
    description: "High-quality audio narration combined with rich visual content for every stop.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Offline Ready",
    description: "Download entire tours to your device and enjoy them without any internet connection.",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1974&auto=format&fit=crop"
  }
];

export function AppShowcase() {
  return (
    <section className="w-full py-24 bg-background border-b border-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            APP_SHOWCASE
          </span>
          <h2 className="mt-6 text-[32px] font-bold text-foreground tracking-tight">
            Designed for the modern explorer.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="mb-10 w-full">
                <PhoneFrame className="w-full max-w-[260px] mockup-shadow">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </PhoneFrame>
              </div>

              <div className="text-center md:text-left w-full">
                <h3 className="text-[16px] font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
