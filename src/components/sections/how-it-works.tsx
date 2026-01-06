import React from 'react';

const steps = [
  {
    number: "1.",
    title: "Clone the repository",
    description: "Get access to the player's source code",
  },
  {
    number: "2.",
    title: "Prepare the audio tour content",
    description: "Local audio files or CDN-hosted assets works best",
  },
  {
    number: "3.",
    title: "Customize theme and supported languages",
    description: "Your brand, one guide, one or more languages",
  },
  {
    number: "4.",
    title: "Deploy the app",
    description: "Host on Netlify, Vercel, or your own server",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-background border-b border-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        {/* Labeled Header Box */}
        <div className="mb-10">
          <span className="inline-block px-2 py-1 text-[10px] font-mono tracking-wider text-muted-foreground bg-secondary uppercase border border-border rounded-sm">
            How it works
          </span>
        </div>

        {/* Numbered List of Steps */}
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Step Number */}
              <span className="text-sm font-mono text-muted-foreground pt-1 min-w-[24px]">
                {step.number}
              </span>

              {/* Step Content */}
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-semibold text-foreground leading-tight">
                  {step.title}
                </h3>
                <p className="text-[15px] text-muted-foreground font-mono leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-[14px] font-mono text-foreground uppercase tracking-wider opacity-60">
              Runtime Status: <span className="text-primary font-bold">Stateless</span>
            </p>
            <p className="mt-2 text-[14px] text-muted-foreground">
              No backend required. No services to babysit. Fully portable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;