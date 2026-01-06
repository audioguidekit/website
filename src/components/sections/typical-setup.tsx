import React from 'react';

const steps = [
  "Static site or frontend app",
  "Local audio files or CDN-hosted assets",
  "One guide, one language—or more if you want",
  "Hosted on Netlify, Vercel, or your own server",
];

export function TypicalSetup() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            ARCHITECTURE_STACK
          </span>
        </div>

        <h2 className="text-[28px] font-bold text-foreground mb-10 tracking-tight">Typical Deployment</h2>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-6 p-4 bg-secondary/50 border border-border rounded-lg group hover:bg-secondary transition-colors">
              <span className="text-[12px] font-mono font-bold text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity">
                {String.fromCharCode(65 + i)}
              </span>
              <p className="text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
                {step}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[14px] font-mono text-foreground uppercase tracking-wider opacity-60">
            Runtime Status: <span className="text-primary font-bold">Stateless</span>
          </p>
          <p className="mt-2 text-[14px] text-muted-foreground">
            No backend required. No services to babysit. Fully portable.
          </p>
        </div>
      </div>
    </section>
  );
}
