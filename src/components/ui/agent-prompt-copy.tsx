"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ClaudeAvatar, CodexAvatar, CursorAvatar, LovableAvatar, V0Avatar } from "./agent-avatars";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

export const AGENT_PROMPT = `Clone the AudioGuideKit player and help me set it up:

git clone https://github.com/audioguidekit/player-react.git
cd player-react
bun install
bun run dev

Read docs/adding-tours.md and docs/themes.md, then help me add my first tour and customize the theme/branding.`;

interface AgentPromptCopyProps {
  className?: string;
  t?: Dict["copy"];
}

export function AgentPromptCopy({ className, t = en.copy }: AgentPromptCopyProps) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fireConfetti = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      zIndex: 9999,
      colors: ["#E129D2", "#606060", "#D9D9D9", "#191919"],
    });
  };

  const showCopiedState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT);
      showCopiedState();
      fireConfetti();
      toast.success(t.agentCopied);
    } catch {
      toast.error(t.agentFailed);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
        copyToClipboard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={copyToClipboard}
      className={cn(
        "group flex items-center justify-center gap-3 cursor-copy font-mono text-[13px] text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
      aria-label={t.agentAria}
    >
      {/* Fixed-width stack sized to the resting (overlapped) layout, so the
          default look is unchanged. The rightmost avatar (nearest the label)
          stays anchored; the rest slide further left on hover to spread out —
          overflowing the box a little is fine, there's just page background there. */}
      <div className="relative w-[104px] h-6 shrink-0">
        <div className="absolute inset-y-0 left-0 group-hover:left-[-32px] transition-[left] duration-300 ease-out">
          <ClaudeAvatar />
        </div>
        <div className="absolute inset-y-0 left-5 group-hover:left-[-4px] transition-[left] duration-300 ease-out">
          <CodexAvatar />
        </div>
        <div className="absolute inset-y-0 left-10 group-hover:left-6 transition-[left] duration-300 ease-out">
          <CursorAvatar />
        </div>
        <div className="absolute inset-y-0 left-[60px] group-hover:left-[52px] transition-[left] duration-300 ease-out">
          <LovableAvatar />
        </div>
        <div className="absolute inset-y-0 left-20 transition-[left] duration-300 ease-out">
          <V0Avatar />
        </div>
      </div>

      <span>{t.agentLabel}</span>

      <div className="relative flex items-center justify-center w-5 h-5">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute"
            >
              <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
            </motion.div>
          ) : (
            <>
              <kbd className="absolute hidden md:inline-flex items-center justify-center size-5 text-[10px] font-mono font-bold bg-background text-muted-foreground rounded border border-border opacity-100 group-hover:opacity-0 transition-opacity">
                P
              </kbd>
              <Copy className="w-3.5 h-3.5 absolute opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
