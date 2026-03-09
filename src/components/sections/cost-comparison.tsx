"use client";

import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

// EU country codes for locale detection
const EU_LOCALES = [
  "de",
  "fr",
  "it",
  "es",
  "nl",
  "pl",
  "pt",
  "ro",
  "el",
  "cs",
  "hu",
  "sv",
  "fi",
  "da",
  "sk",
  "bg",
  "hr",
  "lt",
  "lv",
  "et",
  "sl",
  "mt",
  "cy",
  "lu",
  "ie",
  "at",
  "be",
];

export function CostComparison() {
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

  useEffect(() => {
    // Detect if user is from EU based on browser locale
    const userLocale = navigator.language.toLowerCase().split("-")[0];
    const isEU = EU_LOCALES.includes(userLocale);

    if (isEU) {
      setCurrency("EUR");
    }
  }, []);

  const formatPrice = (price: number) => {
    const symbol = currency === "EUR" ? "€" : "$";
    return `${symbol}${price.toLocaleString()}`;
  };
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            COST_COMPARISON
          </span>
          <h2 className="mt-6 text-[32px] font-bold text-foreground tracking-tight">
            Own it forever. No recurring fees.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AudioGuideKit - first on mobile, second (right) on desktop */}
          <div className="bg-white border-2 border-primary/20 rounded-xl p-8 relative overflow-hidden md:order-2">
            <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl  bg-primary text-primary-foreground text-[10px] font-mono font-bold uppercase tracking-widest">
              Open Source
            </div>

            <div className="flex items-start justify-between mb-6 mt-4">
              <h3 className="text-[18px] font-bold text-foreground">
                AudioGuideKit
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-bold text-foreground">
                  {formatPrice(0)}
                </span>
                <span className="text-[16px] text-muted-foreground">
                  software
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground">
                Only pay for hosting (typically {formatPrice(0)}-
                {formatPrice(10)}/month for static sites)
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3 group">
                <Check className="mt-0.5 w-4 h-4 text-emerald-500/70 shrink-0 group-hover:scale-110" />
                <span className="text-[18px] md:text-[17px] text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                  You own all content and code
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Check className="mt-0.5 w-4 h-4 text-emerald-500/70 shrink-0 group-hover:scale-110" />
                <span className="text-[18px] md:text-[17px] text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                  Fully customizable and white-label
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Check className="mt-0.5 w-4 h-4 text-emerald-500/70 shrink-0 group-hover:scale-110" />
                <span className="text-[18px] md:text-[17px] text-muted-foreground hover:text-foreground transition-colors leading-relaxed">
                  Works forever, no subscription required
                </span>
              </div>
            </div>
          </div>

          {/* Commercial Platforms - second on mobile, first (left) on desktop */}
          <div className="bg-white border border-border rounded-xl p-8 md:order-1">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-[18px] font-bold text-foreground">
                Commercial platforms
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">
                Typical
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-bold text-foreground">
                  {formatPrice(500)}
                </span>
                <span className="text-[16px] text-muted-foreground">
                  - {formatPrice(2000)}
                </span>
                <span className="text-[14px] text-muted-foreground">
                  /month
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground">
                Plus setup fees, per-visitor charges, and annual contracts
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <X className="mt-0.5 w-4 h-4 text-muted-foreground opacity-30 shrink-0" />
                <span className="text-[15px] text-muted-foreground leading-relaxed">
                  Vendor controls your content
                </span>
              </div>
              <div className="flex items-center gap-3">
                <X className="mt-0.5 w-4 h-4 text-muted-foreground opacity-30 shrink-0" />
                <span className="text-[15px] text-muted-foreground leading-relaxed">
                  Limited customization
                </span>
              </div>
              <div className="flex items-center gap-3">
                <X className="mt-0.5 w-4 h-4 text-muted-foreground opacity-30 shrink-0" />
                <span className="text-[15px] text-muted-foreground leading-relaxed">
                  Stops working if you stop paying
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-lg">
          <p className="text-[18px] md:text-[17px] text-muted-foreground text-center text-balance">
            <span className="font-bold text-foreground">
              Save annually {formatPrice(6000)} - {formatPrice(24000)}
            </span>{" "}
            compared to typical commercial platforms. One-time setup investment,
            lifetime ownership.
          </p>
        </div>
      </div>
    </section>
  );
}
