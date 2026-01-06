import React from 'react';

export function WhatYouDontGet() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10 text-right">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            SCOPE_RESTRICTIONS
          </span>
        </div>

        <h2 className="text-[28px] font-bold text-foreground mb-10 tracking-tight">Explicit Exclusions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Web-based content editor",
            "User management system",
            "Dashboards or analytics UI",
            "Multi-guide orchestration"
          ].map((item, i) => (
            <div key={i} className="p-4 border border-border rounded-lg bg-secondary/20 flex items-center gap-4 group hover:bg-background transition-colors">
              <span className="text-[12px] font-mono text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
              <p className="text-[14px] text-muted-foreground group-hover:text-foreground transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-[14px] text-muted-foreground italic leading-relaxed">
              Those problems are real—but they’re a different category. We focus on <span className="text-foreground font-bold">playing audio well</span>, not building a complex system.
            </p>
          </div>
          <div className="shrink-0 pt-2">
            <kbd className="text-[10px] font-mono uppercase tracking-widest opacity-40">Modular_Design</kbd>
          </div>
        </div>
      </div>
    </section>
  );
}
