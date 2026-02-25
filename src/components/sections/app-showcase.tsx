'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { useIsMobile } from '@/hooks/use-mobile';

const features = [
  {
    title: "Quick overview",
    description: "Get a clear overview of the guide and use it online or offline.",
    lightImage: "/screenshots/audioguidekit-tour-start-screen-light.png",
    darkImage: "/screenshots/audioguidekit-tour-start-screen-dark.png"
  },
  {
    title: "Simple audio guide",
    description: "All stops in one place, with a simple audio player and transcript support.",
    lightImage: "/screenshots/audioguidekit-tour-tracklist-progress-light.png",
    darkImage: "/screenshots/audioguidekit-tour-tracklist-progress-dark.png"
  },
  {
    title: "Full transcripts",
    description: "Follow along with complete transcripts for every audio stop.",
    lightImage: "/screenshots/audioguidekit-tour-transcript-light.png",
    darkImage: "/screenshots/audioguidekit-tour-transcript-dark.png"
  },
  {
    title: "Fullscreen player",
    description: "An immersive fullscreen experience for focused listening.",
    lightImage: "/screenshots/audioguidekit-tour-player-fullscreen-light.png",
    darkImage: "/screenshots/audioguidekit-tour-player-fullscreen-dark.png"
  },
  {
    title: "Visitor feedback",
    description: "Collect visitor feedback once the guide is complete.",
    lightImage: "/screenshots/audioguidekit-tour-rating-feedback-light.png",
    darkImage: "/screenshots/audioguidekit-tour-rating-feedback-dark.png"
  }
];

export function AppShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const isMobile = useIsMobile();

  const visible = isMobile ? 1 : 3;
  const maxIndex = features.length - visible;
  const safeIndex = Math.min(startIndex, maxIndex);

  // Clamp index when visible count changes (e.g. on resize)
  useEffect(() => {
    setStartIndex(i => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setStartIndex(i => Math.max(0, i - 1));
  const next = () => setStartIndex(i => Math.min(maxIndex, i + 1));

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section className="w-full pt-24 pb-8 md:py-24 bg-background">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            APP_SHOWCASE
          </span>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-[32px] font-bold text-foreground tracking-tight">
                Designed for the modern visitor
              </h2>
              <p className="mt-2 text-[15px] text-muted-foreground">
                Comes with light and dark themes, both easily customisable to match your brand.
              </p>
            </div>

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

        {/* Carousel track */}
        <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${safeIndex * (100 / visible)}%)` }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center px-6"
                style={{ width: `${100 / visible}%` }}
              >
                <div className="mb-10 w-full">
                  <PhoneFrame className="w-full max-w-[260px] mockup-shadow">
                    <img
                      src={isDarkMode ? feature.darkImage : feature.lightImage}
                      alt={feature.title}
                      className="w-full h-auto block"
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

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={prev}
            disabled={safeIndex === 0}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  i === safeIndex
                    ? 'w-4 bg-foreground'
                    : 'w-1.5 bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={safeIndex === maxIndex}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
