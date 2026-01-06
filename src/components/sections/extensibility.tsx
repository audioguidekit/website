import React from 'react';

export function Extensibility() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            EXTENSIBILITY_HOOKS
          </span>
        </div>

        <h2 className="text-[28px] font-bold text-foreground mb-10 tracking-tight">Structured for Growth</h2>

        <div className="space-y-4">
          {[
            "Clean separation between playback, UI, and data",
            "Replace file-based content with your own adapter",
            "Add analytics hooks if you need them",
            "Fork it without guilt"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 p-4 border border-border/50 rounded-lg group hover:border-primary transition-colors">
              <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
              <p className="text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[14px] text-muted-foreground italic">
            If you want to grow beyond files later, the seams are visible and the architecture is ready.
          </p>
        </div>
      </div>
    </section>
  );
}
