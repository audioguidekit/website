import React from "react";
import { Check } from "lucide-react";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

export function WhoItIsFor({ t = en.whoItIsFor }: { t?: Dict["whoItIsFor"] }) {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            USER_PROFILES
          </span>
        </div>

        <h2 className="text-[28px] font-bold text-foreground mb-10 tracking-tight">
          {t.heading}
        </h2>

        <div className="space-y-3">
          {t.items.map((user, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <Check className="mt-1 w-4 h-4 text-emerald-500/70 shrink-0 group-hover:scale-110 transition-transform" />
              <p className="text-[18px] md:text-[17px] text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                {user}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
