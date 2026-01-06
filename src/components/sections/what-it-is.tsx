import React from 'react';
import { Check, X } from 'lucide-react';

export function WhatItIs() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      {/* Subtle vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border/30 hidden lg:block" />
      
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            SCOPE_DEFINITION
          </span>
          <h2 className="mt-6 text-[32px] font-bold text-foreground tracking-tight">Capabilities & Constraints</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          {/* It Is */}
          <div className="relative">
            <h3 className="text-[12px] font-mono font-bold text-foreground mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full ring-4 ring-primary/10"></span>
              Core Strength
            </h3>
            <ul className="space-y-6">
              {[
                "Production-ready player logic",
                "Mobile-first gesture controls",
                "Offline manifest generation",
                "Clean embedding API",
                "Zero tracking or telemetry"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[14px] text-muted-foreground group">
                  <div className="mt-1 w-4 h-4 rounded border border-border flex items-center justify-center bg-secondary group-hover:border-primary transition-colors">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="group-hover:text-foreground transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* It Isn't */}
          <div className="relative">
            <h3 className="text-[12px] font-mono font-bold text-muted-foreground mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 border-2 border-border rounded-full"></span>
              Non-Goals
            </h3>
            <ul className="space-y-6">
              {[
                "Content Management System",
                "Audio hosting or storage",
                "Visitor data analytics",
                "Paid subscription layers"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[14px] text-muted-foreground/60 group">
                  <div className="mt-1 w-4 h-4 rounded border border-border flex items-center justify-center bg-secondary/50">
                    <X className="w-2.5 h-2.5 text-muted-foreground/40" />
                  </div>
                  <span className="group-hover:text-muted-foreground transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 p-6 bg-secondary border border-border rounded-lg relative overflow-hidden group transition-all hover:shadow-soft">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <kbd className="text-[10px]">INFRA</kbd>
          </div>
          <p className="text-[15px] text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-6">
            Think of this as the <span className="text-foreground font-medium">un-opinionated infrastructure</span> for your audio content. You provide the files, we provide the flawless playback experience.
          </p>
        </div>
      </div>
    </section>
  );
}
