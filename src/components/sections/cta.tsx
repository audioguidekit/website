import React from "react";
import { TerminalCopy } from "@/components/ui/terminal-copy";

const FEATURES = [
  "5 minute setup",
  "Free forever",
  "No lock-in",
  "Open source",
];

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 bg-secondary/50 border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded mb-6">
            Start_now
          </span>

          <h2 className="text-[32px] sm:text-[40px] md:text-[56px] font-bold text-foreground tracking-tight leading-[1.05] mb-6">
            Get the player
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                {feature}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-4 px-5 py-2 bg-foreground/[0.03] border border-foreground/10 rounded-md hover:border-foreground/20 transition-colors mb-8">
            <TerminalCopy
              command="npx create-audioguidekit-player my-project"
              className="text-[14px] sm:text-[15px]"
            />
          </div>

          <a
            href="/docs"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-6 rounded-full transition-all text-[15px]"
          >
            Read documentation
          </a>
        </div>
      </div>
    </section>
  );
}
