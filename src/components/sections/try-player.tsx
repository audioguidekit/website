import React from "react";
import Image from "next/image";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

const PLAYER_URL = "https://audioguidekit.vercel.app/";

export function TryPlayer({ t = en.tryPlayer }: { t?: Dict["tryPlayer"] }) {
  return (
    <section className="w-full pt-0 pb-12 md:py-24 bg-background border-b border-border">
      <div className="hidden md:block w-[80%] mx-auto h-px bg-border -mt-24 mb-24" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center lg:items-center">
          <div className="max-w-[800px] w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="hidden md:block">
              <h2 className="text-[32px] font-bold text-foreground tracking-tight mb-4">
                {t.heading}
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-md text-balance">
                {t.body}
              </p>
              <a
                href={PLAYER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-6 rounded-full transition-all text-[15px] mt-4 w-fit"
              >
                {t.cta}
              </a>
            </div>
            {/* QR code for desktop */}
            <div className="hidden md:block w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] shrink-0">
              <Image
                src="/images/qr.svg"
                alt={t.qrAlt}
                width={240}
                height={240}
                className="w-full h-full"
                priority
              />
            </div>
            {/* Button for mobile */}
            <a
              href={PLAYER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-6 rounded-full transition-all text-[15px]"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
