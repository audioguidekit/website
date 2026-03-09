import React from "react";

const steps = [
  {
    title: "Works out of the box",
    description:
      "Complete and ready to deploy. Everything you need is included—just add your audio files and go.",
  },
  {
    title: "Deploy anywhere",
    description:
      "Host it anywhere. No database, no monthly fees, switch providers anytime.",
  },
  {
    title: "Online + Offline",
    description:
      "Works without internet. Perfect for museums with weak WiFi or underground exhibits",
  },
  {
    title: "Built for visitors on the move",
    description:
      "Large buttons, clear progress, easy to use while standing. Designed for people walking through exhibits, not sitting at desks.",
  },
  {
    title: "Match your brand",
    description:
      "Add your logo and colors through simple settings. No coding required, but full source access if you need it.",
  },
];

export function CoreFeatures() {
  return (
    <section className="relative w-full py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            CORE_FEATURES
          </span>
          <h2 className="mt-6 text-[32px] font-bold text-foreground tracking-tight">
            Everything you need to launch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden shadow-soft">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 group hover:bg-secondary transition-colors duration-200"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[12px] font-mono font-bold text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="w-1.5 h-1.5 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
              </div>
              <h3 className="text-[18px] md:text-[17px] font-bold text-foreground mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-[16px] md:text-[15px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
          {/* Empty technical filler card */}
          <div className="bg-secondary/50 p-8 flex items-center justify-center opacity-30">
            <span className="font-mono text-[10px] tracking-widest uppercase">
              END_OF_LIST
            </span>
          </div>
        </div>

        {/* Integrations */}
        <div className="mt-20 flex flex-col items-center">
          <h3 className="text-[13px] font-mono font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em]">
            INTEGRATIONS
          </h3>
          <p className="text-[18px] md:text-[17px] text-muted-foreground text-center max-w-[700px] font-normal leading-relaxed">
            Use your existing tools—host audio on any CDN, track visitors with
            your analytics platform, process payments through your provider.
          </p>
        </div>
      </div>
    </section>
  );
}
