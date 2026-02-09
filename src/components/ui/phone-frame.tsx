import React from 'react';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({ children, className, priority = false }: PhoneFrameProps) {
  return (
    <div className={cn("relative mx-auto isolate rounded-[2.5rem] overflow-hidden", className)}>
      {/* Outer frame */}
      <div className="relative p-[10px] rounded-[2.5rem] bg-primary w-full">
        {/* Physical buttons - Left */}
        <div className="absolute left-[-2px] top-24 w-[3px] h-12 bg-primary rounded-l-md border-l border-white/10" />
        <div className="absolute left-[-2px] top-40 w-[3px] h-16 bg-primary rounded-l-md border-l border-white/10" />

        {/* Physical buttons - Right */}
        <div className="absolute right-[-2px] top-32 w-[3px] h-20 bg-primary rounded-r-md border-r border-white/10" />

        {/* Inner Screen Container */}
        <div className="relative w-full aspect-[375/812] bg-background overflow-hidden rounded-[30px]">
          {/* Content */}
          {children}

          {/* Dynamic Island / Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8 flex justify-center pt-3 z-50 pointer-events-none">
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center border border-white/5 px-4">
              <div className="w-2 h-2 bg-[#1a1a1a] rounded-full mr-auto" />
              <div className="w-1 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
