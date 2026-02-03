import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';

const messages = [
  {
    tagline: "You've wandered off the tour.",
    description: "This exhibit doesn't exist. Let's get you back to the main gallery."
  },
  {
    tagline: "This stop isn't on the map.",
    description: "Looks like you've found an uncharted area. Time to retrace your steps."
  },
  {
    tagline: "The audio guide is silent here.",
    description: "There's nothing to hear at this location. Head back to explore more."
  },
  {
    tagline: "You've reached a closed wing.",
    description: "This section of the museum doesn't exist. Let us guide you elsewhere."
  },
  {
    tagline: "No exhibit at this coordinates.",
    description: "Your guide can't find anything here. Return to the main tour."
  },
  {
    tagline: "This room is empty.",
    description: "Nothing to see here — the art must have moved. Let's find it together."
  }
];

export default function NotFound() {
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navigation />
      <main className="w-full max-w-[1400px] border-x border-border relative pt-16 md:pt-22 bg-background flex-1 flex items-center justify-center">
        <div className="px-4 sm:px-8 py-24 text-center">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded mb-8">
            PAGE_NOT_FOUND
          </span>

          <h1 className="text-[64px] sm:text-[96px] font-bold text-foreground tracking-tight leading-[1] mb-4">
            404
          </h1>

          <p className="text-[20px] sm:text-[24px] text-foreground font-medium mb-4">
            {message.tagline}
          </p>

          <p className="text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto text-balance">
            {message.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-8 rounded-full transition-all text-[15px]"
            >
              Back to home
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center justify-center bg-background text-foreground border border-border hover:bg-secondary font-medium h-12 px-8 rounded-full transition-all text-[15px]"
            >
              Read notes
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
