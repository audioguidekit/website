'use client';

import React from 'react';
import { ArrowRight, Github, Play } from 'lucide-react';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { ProjectStatusShowcase } from './project-status-showcase';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Hero() {
  const videoUrl = "https://player.vimeo.com/external/517090025.sd.mp4?s=d01072a2e485459345c70752179659a224a0d9b5&profile_id=165&oauth2_token_id=57447761";

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white border-b border-border pl-2 pr-2 lg:pl-32 lg:pr-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-24 lg:gap-20 items-center py-20">

          <div>
            {/* Supporting Note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-secondary text-muted-foreground border border-border uppercase tracking-widest">
                v1.0.0 • Open Source • MIT License
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] sm:text-[64px] font-bold text-foreground tracking-tight leading-[1] mb-6"
            >
              An open-source <br />
              <span className="text-muted-foreground">
                audio guide player</span> for museums
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: (v) => v < 0.5 ? 0 : 1
                }}
                className="ml-0.5 inline-block"
              >
                _
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[18px] sm:text-[20px] text-muted-foreground leading-relaxed mb-10 text-balance lg:max-w-[540px]"
            >
              A lightweight, offline-first player for cities, museums, and walking tours. Built for the web. Self-hosted. No platform lock-in.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="https://github.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-[14px] font-medium transition-all hover:opacity-90 shadow-soft"
              >
                <Github className="w-4 h-4" />
                View GitHub
              </a>
              <a
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-background text-foreground border border-border px-8 py-3 rounded-full text-[14px] font-medium transition-all hover:bg-secondary"
              >
                <Play className="w-3 h-3 fill-current" />
                Live Demo
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 w-full"
            >
              <ProjectStatusShowcase />
            </motion.div>
          </div>


          <div className="relative flex justify-center lg:justify-end">
            <motion.div
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
              className="relative z-30 lg:-mr-12"
            >
              <PhoneFrame className="w-full max-w-[280px] sm:max-w-[320px] mockup-shadow">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                  alt="App Interface"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </PhoneFrame>
            </motion.div>

            {/* Technical accents around the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial from-border/20 to-transparent -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
