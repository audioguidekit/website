import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/audioguidekit-logo.svg"
      alt="AudioGuideKit"
      width={166}
      height={24}
      className={cn("w-[160px] sm:w-[200px] h-auto", className)}
      priority
    />
  );
}
