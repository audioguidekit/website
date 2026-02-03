'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { Typewriter } from '@/components/ui/typewriter';
import { TerminalCopy } from '@/components/ui/terminal-copy';
import { ProjectStatusShowcase } from './project-status-showcase';

// Dynamic import for motion components - reduces initial bundle
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

const MotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1),
  { ssr: false }
);

const MotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  { ssr: false }
);

const MotionSpan = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.span),
  { ssr: false }
);

// Static badge element - hoisted to module scope
const OpenSourceBadge = (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-secondary text-muted-foreground border border-border uppercase tracking-widest">
    Open Source • MIT License
  </span>
);

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white border-b border-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-8 items-center py-20">

          <div className="relative z-40">
            {/* Supporting Note */}
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              {OpenSourceBadge}
            </MotionDiv>

            {/* Headline */}
            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-[40px] md:text-[64px] font-bold text-foreground tracking-tight leading-[1] mb-6"
            >
              An open-source <br />
              <span className="text-muted-foreground">audio guide player</span>
              <br className="hidden md:block" />
              <span className="whitespace-nowrap"> for <span className="relative inline-block"><span className="invisible">cultural institutions_</span><span className="absolute left-0 top-0 whitespace-nowrap"><Typewriter words={['museums', 'galleries', 'cultural institutions']} /><MotionSpan
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: (v) => v < 0.5 ? 0 : 1
                }}
                className="inline-block"
              >
                _
              </MotionSpan></span></span></span>
            </MotionH1>

            {/* Subheadline */}
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[18px] sm:text-[20px] text-muted-foreground leading-relaxed mb-6 text-balance lg:max-w-[640px]"
            >
              A lightweight audio guide player built in React for the web. Runs online and offline as a PWA, self-hosted by default, with customizable branding and no platform lock-in.
            </MotionP>

            {/* Primary CTA - Terminal + Status */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-4 px-5 py-2 bg-foreground/[0.03] border border-foreground/10 rounded-md hover:border-foreground/20 transition-colors">
                <TerminalCopy command="npx create-audioguidekit-player my-project" className="text-[15px] sm:text-[17px]" />
              </div>
              <div className="pt-4">
                <ProjectStatusShowcase />
              </div>
            </MotionDiv>
          </div>


          <div className="relative flex justify-center lg:justify-start py-8">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [-6, -4, -6],
                y: [0, -15, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative z-30 lg:-ml-16"
            >
              <PhoneFrame className="w-[280px] sm:w-[320px] shrink-0 mockup-shadow">
                <img
                  src="/images/screenshot-main.png"
                  alt="AudioGuideKit player interface"
                  className="w-full h-full object-cover"
                />
              </PhoneFrame>
            </MotionDiv>

            {/* Technical accents around the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial from-border/20 to-transparent -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
