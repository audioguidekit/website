'use client';

import React, { useEffect, useState } from 'react';
import { GitCommit } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

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
    <div className="flex items-center gap-4 text-[13px] font-mono whitespace-nowrap">
      <a
        href={commit?.url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary/30 underline-offset-4"
      >
        <GitCommit className="w-4 h-4 text-emerald-500/70" />
        <span>
          {loading ? (
            <span className="animate-pulse">Fetching latest pulse...</span>
          ) : commit ? (
            <>Updated {formatRelativeTime(commit.date)}</>
          ) : (
            <span>Updated today</span>
          )}
        </span>
      </a>

      <span className="hidden sm:block text-border">|</span>

      <a
        href="/docs"
        className="text-muted-foreground hover:text-primary transition-colors underline decoration-border hover:decoration-primary/30 underline-offset-4"
      >
        See documentation
      </a>
    </div>
  );
}
