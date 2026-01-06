import React from 'react';

const signals = [
  "Non-developers need to edit content",
  "Multiple guides or locations appear",
  "Analytics start influencing decisions",
  "Reliability and updates matter more than control",
];

export function Friction() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10 text-right">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            SCALING_FRICTION
          </span>
        </div>

        <p className="text-[16px] text-foreground font-bold mb-10 tracking-tight">At some point, teams hit friction:</p>

        <div className="space-y-4">
          {signals.map((signal, i) => (
            <div key={i} className="flex items-center gap-6 p-4 border border-border/50 rounded-lg group hover:bg-secondary transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-150 transition-transform" />
              <p className="text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
                {signal}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border relative">
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border/30" />
          <p className="text-[14px] text-muted-foreground italic leading-relaxed">
            When that happens, people usually want tooling, not more code. That’s where a managed solution can help—but only when you’re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
