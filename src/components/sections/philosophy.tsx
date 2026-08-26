import React from 'react';
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

export function Philosophy({ t = en.philosophy }: { t?: Dict["philosophy"] }) {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-[600px] mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            CORE_VALUES
          </span>
        </div>

        <div className="border border-border rounded-lg bg-secondary/10 overflow-hidden divide-y divide-border">
          {t.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-6 transition-colors hover:bg-background/50 text-center">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">{item.title}</span>
              <p className="text-[18px] md:text-[17px] text-foreground leading-relaxed text-balance">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
