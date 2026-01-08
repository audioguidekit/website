'use client';

import React, { useState } from 'react';
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success('Command copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy command');
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-background transition-all hover:bg-secondary/50 cursor-copy font-mono text-[13px] text-muted-foreground",
        className
      )}
      aria-label={`Copy ${command} command`}
    >
      <div className="flex items-center gap-2">
        <span className="text-foreground/50">▲ ~</span>
        <span>{command}</span>
      </div>
      
      <div className="relative flex items-center justify-center w-4 h-4">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
