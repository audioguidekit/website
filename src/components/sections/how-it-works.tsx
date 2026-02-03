import React from 'react';

const steps = [
  {
    number: "1.",
    title: "Clone the repository",
    description: "Access the player source code",
  },
  {
    number: "2.",
    title: "Add audio content",
    description: "Use local files or CDN-hosted assets",
  },
  {
    number: "3.",
    title: "Configure theme and languages",
    description: "Set up your theme and supported languages",
  },
  {
    number: "4.",
    title: "Deploy the app",
    description: "Host anywhere that serves static files",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-background border-b border-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[600px]">
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
            <p className="text-[14px] text-muted-foreground">
              Fully static. No servers, no databases, no maintenance.
            </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;