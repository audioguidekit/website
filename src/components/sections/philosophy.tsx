import React from 'react';

export function Philosophy() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            CORE_VALUES
          </span>
        </div>

        <div className="border border-border rounded-lg bg-secondary/10 overflow-hidden divide-y divide-border">
          {[
            { title: "One thing, done well", desc: "Solve a single problem without feature creep." },
            { title: "Fully yours", desc: "Your data, your infrastructure. No lock-in." },
            { title: "Simple by design", desc: "Fewer moving parts mean fewer surprises." },
            { title: "Great DX and UX", desc: "Clear for developers. Smooth for visitors." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 p-6 transition-colors hover:bg-background/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">{item.title}</span>
              <p className="text-[18px] md:text-[17px] text-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
