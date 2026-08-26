import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { RichText } from "@/components/rich-text";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

export function EditingExperience({ t = en.editing }: { t?: Dict["editing"] }) {
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
                {t.headingA}
                <br />
                <span className="text-muted-foreground text-[28px] sm:text-[36px]">
                  {t.headingB}
                </span>
              </h2>
            </div>
          </div>

          {/* Block 1: Tour Content */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">
                {t.block1Title}
              </h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                {t.block1Body}
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-white/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">
                    src/tour/en.json
                  </span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>
                    {`{`}
                    <br />
                    <span className="text-muted-foreground/40">02 </span>
                    {`  "id": "barcelona",`}
                    <br />
                    <span className="text-muted-foreground/40">03 </span>
                    {`  "language": "en",`}
                    <br />
                    <span className="text-muted-foreground/40">04 </span>
                    {`  "title": "Unlimited Barcelona",`}
                    <br />
                    <span className="text-muted-foreground/40">05 </span>
                    {`  "description": "Discover Barcelona from ancient times to modern day",`}
                    <br />
                    <span className="text-muted-foreground/40">06 </span>
                    {`  "totalDuration": "20 minutes",`}
                    <br />
                    <span className="text-muted-foreground/40">07 </span>
                    {`  "totalStops": 10,`}
                    <br />
                    <span className="text-muted-foreground/40">08 </span>
                    {`  "stops": [`}
                    <br />
                    <span className="text-muted-foreground/40">09 </span>
                    {`    {`}
                    <br />
                    <span className="text-muted-foreground/40">10 </span>
                    {`      "id": "1",`}
                    <br />
                    <span className="text-muted-foreground/40">11 </span>
                    {`      "type": "audio",`}
                    <br />
                    <span className="text-muted-foreground/40">12 </span>
                    {`      "title": "Welcome and Instructions",`}
                    <br />
                    <span className="text-muted-foreground/40">13 </span>
                    {`      "duration": "1:30",`}
                    <br />
                    <span className="text-muted-foreground/40">14 </span>
                    {`      "image": "/images/01.jpeg",`}
                    <br />
                    <span className="text-muted-foreground/40">15 </span>
                    {`      "audioFile": "/audio/en/01.mp3",`}
                    <br />
                    <span className="text-muted-foreground/40">16 </span>
                    {`      "transcription": "Welcome to Unlimited Barcelona..."`}
                    <br />
                    <span className="text-muted-foreground/40">17 </span>
                    {`    }`}
                    <br />
                    <span className="text-muted-foreground/40">18 </span>
                    {`  ]`}
                    <br />
                    <span className="text-muted-foreground/40">19 </span>
                    {`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: App Layout */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">
                {t.block2Title}
              </h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                {t.block2Body}
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-white/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">
                    src/tour/en.json
                  </span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>
                    {`{`}
                    <br />
                    <span className="text-muted-foreground/40">02 </span>
                    {`  "id": "barcelona",`}
                    <br />
                    <span className="text-muted-foreground/40">03 </span>
                    {`  "defaultLanguage": "en",`}
                    <br />
                    <span className="text-muted-foreground/40">04 </span>
                    {`  "offlineMode": "optional",`}
                    <br />
                    <span className="text-muted-foreground/40">05 </span>
                    {`  "transitionAudio": "/audio/chime.m4a",`}
                    <br />
                    <span className="text-muted-foreground/40">06 </span>
                    {`  "themeId": "default-light",`}
                    <br />
                    <span className="text-muted-foreground/40">07 </span>
                    {`  "transcriptAvailable": true,`}
                    <br />
                    <span className="text-muted-foreground/40">08 </span>
                    {`  "collectFeedback": true,`}
                    <br />
                    <span className="text-muted-foreground/40">09 </span>
                    {`  "showLanguageLabel": false,`}
                    <br />
                    <span className="text-muted-foreground/40">10 </span>
                    {`  "showStopImage": "thumbnail",`}
                    <br />
                    <span className="text-muted-foreground/40">11 </span>
                    {`  "showStopDuration": true,`}
                    <br />
                    <span className="text-muted-foreground/40">12 </span>
                    {`  "showStopNumber": true,`}
                    <br />
                    <span className="text-muted-foreground/40">13 </span>
                    {`  "fullscreenPlayer": true,`}
                    <br />
                    <span className="text-muted-foreground/40">14 </span>
                    {`  "showProgressBar": true,`}
                    <br />
                    <span className="text-muted-foreground/40">15 </span>
                    {`  "backgroundColor": "#1A2634",`}
                    <br />
                    <span className="text-muted-foreground/40">16 </span>
                    {`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Theme */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">
                {t.block3Title}
              </h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                {t.block3Body}
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-white/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">
                    src/theme.config.ts
                  </span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>
                    {`export const theme = {`}
                    <br />
                    <span className="text-muted-foreground/40">02 </span>
                    {`  colors: {`}
                    <br />
                    <span className="text-muted-foreground/40">03 </span>
                    {`    brand: "#1a1a1a",`}
                    <br />
                    <span className="text-muted-foreground/40">04 </span>
                    {`    accent: "#E2E2E2",`}
                    <br />
                    <span className="text-muted-foreground/40">05 </span>
                    {`    background: "#ffffff",`}
                    <br />
                    <span className="text-muted-foreground/40">06 </span>
                    {`    text: "#000000"`}
                    <br />
                    <span className="text-muted-foreground/40">07 </span>
                    {`  },`}
                    <br />
                    <span className="text-muted-foreground/40">08 </span>
                    {`  typography: {`}
                    <br />
                    <span className="text-muted-foreground/40">09 </span>
                    {`    fontPrimary: "Geist Sans",`}
                    <br />
                    <span className="text-muted-foreground/40">10 </span>
                    {`    fontMono: "Geist Mono",`}
                    <br />
                    <span className="text-muted-foreground/40">11 </span>
                    {`    baseSize: "16px"`}
                    <br />
                    <span className="text-muted-foreground/40">12 </span>
                    {`  },`}
                    <br />
                    <span className="text-muted-foreground/40">13 </span>
                    {`  borderRadius: "12px"`}
                    <br />
                    <span className="text-muted-foreground/40">14 </span>
                    {`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Languages */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="w-full max-w-[800px] mb-12">
              <h3 className="text-[24px] font-bold mb-4 tracking-tight">
                {t.block4Title}
              </h3>
              <p className="text-muted-foreground text-[18px] leading-relaxed">
                <RichText
                  text={t.block4Body}
                  links={{
                    "#langs": (children) => (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="underline decoration-dotted underline-offset-6 decoration-muted-foreground/40 cursor-help">
                            {children}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{t.block4Tooltip}</TooltipContent>
                      </Tooltip>
                    ),
                  }}
                />
              </p>
            </div>
            <div className="w-full relative">
              <div className="w-full bg-white/30 border border-border rounded-xl overflow-hidden shadow-2xl mockup-shadow">
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground opacity-70 uppercase tracking-widest">
                    src/translations/de.ts
                  </span>
                  <div className="w-10" />
                </div>
                <div className="p-6 sm:p-10 font-mono text-[13px] sm:text-[15px] leading-relaxed overflow-x-auto">
                  <pre className="text-foreground/80">
                    <span className="text-muted-foreground/40">01 </span>
                    {`import { Translations } from '../types';`}
                    <br />
                    <span className="text-muted-foreground/40">02 </span>
                    <br />
                    <span className="text-muted-foreground/40">03 </span>
                    {`export const de: Translations = {`}
                    <br />
                    <span className="text-muted-foreground/40">04 </span>
                    {`  loading: {`}
                    <br />
                    <span className="text-muted-foreground/40">05 </span>
                    {`    tourData: 'Tourdaten werden geladen...',`}
                    <br />
                    <span className="text-muted-foreground/40">06 </span>
                    {`    preparing: 'Ihre Tour wird vorbereitet...',`}
                    <br />
                    <span className="text-muted-foreground/40">07 </span>
                    {`  },`}
                    <br />
                    <span className="text-muted-foreground/40">08 </span>
                    {`  errors: {`}
                    <br />
                    <span className="text-muted-foreground/40">09 </span>
                    {`    loadFailed: 'Fehler beim Laden der Daten',`}
                    <br />
                    <span className="text-muted-foreground/40">10 </span>
                    {`    retry: 'Erneut versuchen',`}
                    <br />
                    <span className="text-muted-foreground/40">11 </span>
                    {`  },`}
                    <br />
                    <span className="text-muted-foreground/40">12 </span>
                    {`  // ...`}
                    <br />
                    <span className="text-muted-foreground/40">13 </span>
                    {`}`}
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
