import React from 'react';

export function Philosophy() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            CORE_PHILOSOPHY
          </span>
        </div>

        <div className="border border-border rounded-lg bg-secondary/10 overflow-hidden divide-y divide-border">
          {[
            { title: "TRUST", desc: "No dark patterns or hidden tracking." },
            { title: "VALUE", desc: "The open-source version must be useful on its own." },
            { title: "STABILITY", desc: "Reliability is prioritized over novelty." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 p-6 transition-colors hover:bg-background/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">{item.title}</span>
              <p className="text-[16px] text-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[14px] text-muted-foreground italic">
            Pull requests are welcome. If the community helps improve it, everyone wins.
          </p>
        </div>
      </div>
    </section>
  );
}
