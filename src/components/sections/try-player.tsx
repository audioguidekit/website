import React from 'react';
import Image from 'next/image';

export function TryPlayer() {
  return (
    <section className="w-full pt-0 pb-12 md:py-24 bg-background border-b border-border">
      <div className="hidden md:block w-[80%] mx-auto h-px bg-border -mt-24 mb-24" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center lg:items-center">
          <div className="max-w-[800px] w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="hidden md:block">
              <h2 className="text-[32px] font-bold text-foreground tracking-tight mb-4">
                Test the player now
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-md">
                Experience our player on your own in seconds by scanning this QR code or clicking the button below.
              </p>
              <a
                href="https://audioguidekit.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-6 rounded-full transition-all text-[15px] mt-4 w-fit"
              >
                Try the player
              </a>
            </div>
            {/* QR code for desktop */}
            <div className="hidden md:block w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] shrink-0">
              <Image
                src="/images/qr.svg"
                alt="QR code to test the audio guide player"
                width={240}
                height={240}
                className="w-full h-full"
                priority
              />
            </div>
            {/* Button for mobile */}
            <a
              href="https://audioguidekit.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-medium h-12 px-6 rounded-full transition-all text-[15px]"
            >
              Try the player
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
