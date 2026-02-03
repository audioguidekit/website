'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TerminalCopyProps {
  command: string;
  className?: string;
}

export function TerminalCopy({ command, className }: TerminalCopyProps) {
  const [copied, setCopied] = useState(false);

  const showCopiedState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      showCopiedState();
      toast.success('Command copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy command');
    }
  };

  useEffect(() => {
    const handleCopyEvent = () => showCopiedState();
    window.addEventListener('terminal-copy', handleCopyEvent);
    return () => window.removeEventListener('terminal-copy', handleCopyEvent);
  }, []);

  return (
    <button
      onClick={copyToClipboard}
      onKeyDown={(e) => {
        if (e.key === 'c' && !e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          copyToClipboard();
        }
      }}
    className={cn(
      "group relative flex items-center gap-3 cursor-copy font-mono text-[13px] text-muted-foreground hover:text-foreground transition-colors py-1",
      className
    )}
    aria-label={`Copy ${command} command. Press C to copy.`}
  >
    <div className="flex items-center gap-2">
      <span className="text-foreground/30 font-bold">$</span>
      <span>{command}</span>
    </div>
      
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
                C
              </kbd>
              <Copy className="w-3.5 h-3.5 absolute opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
