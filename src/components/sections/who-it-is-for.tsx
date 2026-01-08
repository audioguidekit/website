import React from 'react';
import { Check } from 'lucide-react';

const users = [
  "A museum, gallery, or any other cultural venue needing audio guide",
  "A developer building a city audio guide or walking tour",
  "An agency prototyping a tourism audio product",
  "An indie project that needs solid mobile audio UX fast",
  "A botanical garden or nature reserve with poor cellular connectivity",
  "A historical society mapping out local heritage walks and landmarks",
  "A university providing self-guided campus tours for prospective students",
  "A curator building a lightweight companion for a temporary art exhibition",
  "A tourism board creating regional driving or walking tour narratives"
];

export function WhoItIsFor() {
  return (
    <section className="relative py-24 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            USER_PROFILES
          </span>
        </div>

        <h2 className="text-[28px] font-bold text-foreground mb-10 tracking-tight">Who is it for?</h2>

        <div className="space-y-3">
          {users.map((user, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <Check className="mt-1 w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <p className="text-[16px] text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                {user}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
