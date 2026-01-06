import React from 'react';
import { cn } from '@/lib/utils';

export function EditingExperience() {
  return (
    <section className="relative py-32 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col gap-24">
            {/* Section Heading */}
            <div className="flex flex-col items-start lg:items-center">
              <div className="max-w-[800px] w-full">
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
                  CONFIGURABILITY
                </span>
                <h2 className="mt-6 text-[32px] sm:text-[48px] font-bold text-foreground tracking-tight leading-tight">
                  A developer-friendly workflow.<br />
                  <span className="text-muted-foreground text-[28px] sm:text-[36px]">Everything lives in your git repo.</span>
                </h2>
              </div>
            </div>

          {/* Block 1: Tour Content */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">1. Editing tour content</h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                No database or complex CMS. Manage your tour stops, metadata, and audio links in a simple JSON file.
                Reorder stops by simply moving items in the array.
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-secondary/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">src/content/tour.json</span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>{`{`}<br />
                    <span className="text-muted-foreground/40">02 </span>{`  "title": "Prague Old Town Walk",`}<br />
                    <span className="text-muted-foreground/40">03 </span>{`  "stops": [`}<br />
                    <span className="text-muted-foreground/40">04 </span>{`    {`}<br />
                    <span className="text-muted-foreground/40">05 </span>{`      "id": "astronomical-clock",`}<br />
                    <span className="text-muted-foreground/40">06 </span>{`      "title": "Astronomical Clock",`}<br />
                    <span className="text-muted-foreground/40">07 </span>{`      "audio": "/audio/clock.mp3",`}<br />
                    <span className="text-muted-foreground/40">08 </span>{`      "image": "/images/clock.jpg",`}<br />
                    <span className="text-muted-foreground/40">09 </span>{`      "description": "Built in 1410, it's the oldest working..."`}<br />
                    <span className="text-muted-foreground/40">10 </span>{`    },`}<br />
                    <span className="text-muted-foreground/40">11 </span>{`    {`}<br />
                    <span className="text-muted-foreground/40">12 </span>{`      "id": "charles-bridge",`}<br />
                    <span className="text-muted-foreground/40">13 </span>{`      "title": "Charles Bridge",`}<br />
                    <span className="text-muted-foreground/40">14 </span>{`      "audio": "/audio/bridge.mp3",`}<br />
                    <span className="text-muted-foreground/40">15 </span>{`      "description": "A historic stone bridge crossing Vltava..."`}<br />
                    <span className="text-muted-foreground/40">16 </span>{`    }`}<br />
                    <span className="text-muted-foreground/40">17 </span>{`  ]`}<br />
                    <span className="text-muted-foreground/40">18 </span>{`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Theme */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">2. Customizing the theme</h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                Fine-tune the look and feel using a single TypeScript configuration.
                Adjust colors, typography, and spacing in seconds.
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-secondary/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">src/theme.config.ts</span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>{`export const theme = {`}<br />
                    <span className="text-muted-foreground/40">02 </span>{`  colors: {`}<br />
                    <span className="text-muted-foreground/40">03 </span>{`    brand: "#1a1a1a",`}<br />
                    <span className="text-muted-foreground/40">04 </span>{`    accent: "#E2E2E2",`}<br />
                    <span className="text-muted-foreground/40">05 </span>{`    background: "#ffffff",`}<br />
                    <span className="text-muted-foreground/40">06 </span>{`    text: "#000000"`}<br />
                    <span className="text-muted-foreground/40">07 </span>{`  },`}<br />
                    <span className="text-muted-foreground/40">08 </span>{`  typography: {`}<br />
                    <span className="text-muted-foreground/40">09 </span>{`    fontPrimary: "Geist Sans",`}<br />
                    <span className="text-muted-foreground/40">10 </span>{`    fontMono: "Geist Mono",`}<br />
                    <span className="text-muted-foreground/40">11 </span>{`    baseSize: "16px"`}<br />
                    <span className="text-muted-foreground/40">12 </span>{`  },`}<br />
                    <span className="text-muted-foreground/40">13 </span>{`  borderRadius: "12px"`}<br />
                    <span className="text-muted-foreground/40">14 </span>{`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Languages */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">3. Multi-language support</h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                Add any language by creating a simple translation file. The player handles directionality
                and font optimization automatically.
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-secondary/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">src/content/translations/de.json</span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>{`{`}<br />
                    <span className="text-muted-foreground/40">02 </span>{`  "common": {`}<br />
                    <span className="text-muted-foreground/40">03 </span>{`    "play": "Abspielen",`}<br />
                    <span className="text-muted-foreground/40">04 </span>{`    "pause": "Pause",`}<br />
                    <span className="text-muted-foreground/40">05 </span>{`    "next_stop": "Nächste Haltestelle",`}<br />
                    <span className="text-muted-foreground/40">06 </span>{`    "previous_stop": "Vorherige Haltestelle",`}<br />
                    <span className="text-muted-foreground/40">07 </span>{`    "transcript": "Transkription"`}<br />
                    <span className="text-muted-foreground/40">08 </span>{`  },`}<br />
                    <span className="text-muted-foreground/40">09 </span>{`  "stops": {`}<br />
                    <span className="text-muted-foreground/40">10 </span>{`    "clock": "Astronomische Uhr",`}<br />
                    <span className="text-muted-foreground/40">11 </span>{`    "bridge": "Karlsbrücke"`}<br />
                    <span className="text-muted-foreground/40">12 </span>{`  }`}<br />
                    <span className="text-muted-foreground/40">13 </span>{`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
