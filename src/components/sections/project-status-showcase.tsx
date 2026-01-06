'use client';

import React, { useEffect, useState } from 'react';
import { GitCommit } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '@/lib/utils';

export function ProjectStatusShowcase() {
  const [commit, setCommit] = useState<GitHubCommit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommit() {
      try {
        const response = await fetch('/api/github/latest-commit');
        if (response.ok) {
          const data = await response.json();
          setCommit(data);
        }
      } catch (error) {
        console.error('Failed to fetch commit:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCommit();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-mono"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <GitCommit className="w-4 h-4 text-emerald-500/70" />
        <span>
          {loading ? (
            <span className="animate-pulse">Fetching latest pulse...</span>
          ) : commit ? (
            <>
              Updated {formatRelativeTime(commit.date)}:{' '}
              <a 
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary px-1.5 py-0.5 rounded text-[11px] font-mono border border-border/50 hover:bg-secondary/80 transition-colors"
                title={commit.message}
              >
                {commit.sha}
              </a>
            </>
          ) : (
            <span>Updated today: <code className="bg-secondary px-1.5 py-0.5 rounded text-[11px] font-mono border border-border/50">ae8f2b1</code></span>
          )}
        </span>
      </div>
      
      <span className="hidden sm:block text-border">|</span>
      
      <a 
        href="/changelog" 
        className="text-muted-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary/30 underline-offset-4"
      >
        See what we did and what we plan
      </a>
    </motion.div>
  );
}
