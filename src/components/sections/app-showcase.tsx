'use client';

import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { PhoneFrame } from '@/components/ui/phone-frame';

const features = [
  {
    title: "Quick overview",
    description: "Get a clear overview of the guide and use it online or offline.",
    lightImage: "/images/screenshot-start.png",
    darkImage: "/images/screenshot-start.png" // TODO: add dark variant
  },
  {
    title: "Simple audio guide",
    description: "All stops in one place, with a simple audio player and transcript support.",
    lightImage: "/images/screenshot-audio.png",
    darkImage: "/images/screenshot-audio.png" // TODO: add dark variant
  },
  {
    title: "Visitor feedback",
    description: "Collect visitor feedback once the guide is complete.",
    lightImage: "/images/screenshot-feedback.png",
    darkImage: "/images/screenshot-feedback.png" // TODO: add dark variant
  }
];

export function AppShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            APP_SHOWCASE
          </span>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-[32px] font-bold text-foreground tracking-tight">
              Designed for the modern visitor
            </h2>

            <div className="flex items-center bg-secondary border border-border rounded-md p-0.5 w-fit">
              <button
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono font-medium rounded transition-colors cursor-pointer ${!isDarkMode
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
                aria-label="Light mode preview"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono font-medium rounded transition-colors cursor-pointer ${isDarkMode
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
                aria-label="Dark mode preview"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
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
                    src={isDarkMode ? feature.darkImage : feature.lightImage}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </PhoneFrame>
              </div>

              <div className="text-center w-full">
                <h3 className="text-[18px] md:text-[17px] font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[16px] md:text-[15px] text-muted-foreground leading-relaxed">
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
