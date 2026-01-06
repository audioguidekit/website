import React from 'react';

export function WhyThisExists() {
  return (
    <section className="relative py-24 bg-background overflow-hidden border-b border-border">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            PROBLEM_SPACE
          </span>
        </div>

        <h2 className="text-[32px] sm:text-[40px] font-bold text-foreground mb-10 leading-tight tracking-tight">
          Audio guides look simple <br />
          <span className="text-muted-foreground">until you build one.</span>
        </h2>

        <div className="space-y-12 text-[16px] text-muted-foreground leading-relaxed">
          <div className="relative pl-8 border-l border-border">
            <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-primary rounded-full border-2 border-white" />
            <p className="font-mono text-[12px] uppercase tracking-widest text-foreground mb-4 opacity-50">Pain Points</p>
            <ul className="space-y-4 font-mono text-[13px]">
              {[
                { id: "01", label: "Mobile browsers killing audio sessions" },
                { id: "02", label: "Spotty connectivity outdoors" },
                { id: "03", label: "Visitors using one hand while walking" },
                { id: "04", label: "Content that must work offline, always" }
              ].map((item) => (
                <li key={item.id} className="flex gap-4 group">
                  <span className="text-foreground font-bold opacity-30 group-hover:opacity-100 transition-opacity">{item.id}.</span>
                  <span className="group-hover:text-foreground transition-colors">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10 border-t border-border mt-12 relative">
            {/* Technical corner marker */}
            <div className="absolute -top-px right-0 w-4 h-4 border-t border-r border-border" />
            
            <p className="mb-6">Most solutions either:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="p-4 bg-secondary border border-border rounded-lg">
                <p className="text-[14px] leading-relaxed">
                  <span className="block font-bold text-foreground mb-1">A. OVER-ENGINEERED</span>
                  Everything forced into a proprietary platform.
                </p>
              </div>
              <div className="p-4 bg-secondary border border-border rounded-lg">
                <p className="text-[14px] leading-relaxed">
                  <span className="block font-bold text-foreground mb-1">B. DUCT-TAPED</span>
                  Leave you to fix mobile playback logic yourself.
                </p>
              </div>
            </div>
            
            <p className="font-medium text-foreground text-[18px]">
              This project exists in the gap between those two.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
