import React from "react";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

const HowItWorks = ({ t = en.howItWorks }: { t?: Dict["howItWorks"] }) => {
  return (
    <section className="w-full py-16 sm:py-20 bg-background border-b border-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[600px]">
            {/* Labeled Header Box */}
            <div className="mb-10">
              <span className="inline-block px-2 py-1 text-[10px] font-mono tracking-wider text-muted-foreground bg-secondary uppercase border border-border rounded-sm">
                How_it_works
              </span>
            </div>

            {/* Numbered List of Steps */}
            <div className="space-y-10">
              {t.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Step Number */}
                  <span className="text-sm font-mono text-muted-foreground pt-1 min-w-[24px]">
                    {index + 1}.
                  </span>

                  {/* Step Content */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] md:text-[17px] font-semibold text-foreground leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[16px] md:text-[16px] text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-12 pt-8 border-t border-border space-y-4">
                <p className="text-[16px] md:text-[15px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.timelineLabel}</span> {t.timeline}
                </p>
                <p className="text-[16px] md:text-[15px] text-muted-foreground">
                  {t.static}
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
