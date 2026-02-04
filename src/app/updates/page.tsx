import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';

export const metadata: Metadata = {
  title: 'Updates - Changelog & roadmap',
  description: 'Latest updates, changelog, and roadmap for AudioGuideKit. See what we are working on and what is coming next.',
  openGraph: {
    title: 'Updates - AudioGuideKit changelog & roadmap',
    description: 'Latest updates and roadmap for AudioGuideKit open-source audio guide player.',
  },
};
import { getCommits } from '@/lib/github';
import { GitCommit, Github, Rocket, Wrench, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type RoadmapItem = {
  id: string;
  title: React.ReactNode;
  status: 'planned' | 'in-progress';
  quarter?: string;
};

const roadmapItems: RoadmapItem[] = [
  { id: '6', title: 'Alternative layout for the main UI and player', status: 'planned', quarter: 'Q1/2026' },
  { id: '6', title: 'Multiple guides support in one app', status: 'planned', quarter: 'Q1/2026' },
  { id: '3', title: <>More stop types than audio as revealed <Link href="/docs/content/stop-types" className="underline hover:text-amber-600">in documentation</Link></>, status: 'planned', quarter: 'Q2/2026' },
  { id: '3', title: 'Support for more languages on UI', status: 'planned', quarter: 'Q2/2026' },
  { id: '4', title: 'Outdoor guides support', status: 'planned', quarter: 'Q2/2026' },
  { id: '2', title: 'Content management system', status: 'planned', quarter: 'Q3/2026' },
  { id: '1', title: 'More themes for the app', status: 'in-progress' },
  { id: '7', title: 'Better support for offline audio', status: 'in-progress' },
];

// Pre-grouped roadmap items to avoid multiple filter iterations
const groupedRoadmapItems = roadmapItems.reduce(
  (acc, item) => {
    acc[item.status].push(item);
    return acc;
  },
  { 'planned': [] as RoadmapItem[], 'in-progress': [] as RoadmapItem[] }
);

export default async function UpdatesPage() {
  const owner = process.env.GITHUB_OWNER || 'audioguidekit';
  const repo = process.env.GITHUB_REPO || 'player-react';
  const commits = await getCommits(owner, repo, 15);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navigation />

      <main className="w-full max-w-[1400px] border-x border-border relative pt-32 pb-24 min-h-[90vh]">
        {/* Intersection Markers */}
        <div className="absolute top-32 -left-[5px] w-[10px] h-[10px] flex items-center justify-center text-border z-20">
          <div className="absolute w-px h-full bg-border" />
          <div className="absolute h-px w-full bg-border" />
        </div>
        <div className="absolute top-32 -right-[5px] w-[10px] h-[10px] flex items-center justify-center text-border z-20">
          <div className="absolute w-px h-full bg-border" />
          <div className="absolute h-px w-full bg-border" />
        </div>

        <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
          <header className="mb-20">
            <div className="mb-6">
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
                PAST + FUTURE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">Development updates</h1>
            <p className="text-[18px] text-muted-foreground leading-relaxed">
              Updates on what we’re building and where it’s heading.
            </p>
          </header>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-blue-500/50 to-emerald-500/50 ml-[4px]" />

            <div className="space-y-4">
              {/* PLANNED SECTION */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-[6px] w-[9px] h-[9px] bg-amber-500/30 rounded-full border-2 border-amber-500/50 z-10" />
                <span className="text-[12px] font-mono font-semibold text-amber-500 uppercase tracking-widest">
                  FUTURE // PLANNED
                </span>

                <div className="mt-4 rounded-xl border border-amber-500/10 bg-amber-500/5 overflow-hidden">
                  {groupedRoadmapItems['planned'].map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 py-3 px-4 ${index !== 0 ? 'border-t border-amber-500/10' : ''}`}
                    >
                      <Rocket className="w-4 h-4 text-amber-500/60 shrink-0" />
                      <span className="text-[15px] text-foreground">{item.title}</span>
                      {item.quarter && (
                        <span className="ml-auto text-[12px] font-mono text-amber-800/60 uppercase">{item.quarter}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* IN PROGRESS SECTION */}
              <div className="relative pl-8 pt-8 pb-0">
                <div className="absolute left-0 top-[38px] w-[9px] h-[9px] bg-blue-500/30 rounded-full border-2 border-blue-500/50 z-10 animate-pulse" />
                <span className="text-[12px] font-mono font-semibold text-blue-500 uppercase tracking-widest">
                  NOW // IN_PROGRESS
                </span>

                <div className="mt-4 rounded-xl border border-blue-500/10 bg-blue-500/5 overflow-hidden">
                  {groupedRoadmapItems['in-progress'].map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 py-3 px-4 ${index !== 0 ? 'border-t border-blue-500/10' : ''}`}
                    >
                      <Wrench className="w-4 h-4 text-blue-500/80 shrink-0" />
                      <span className="text-[15px] text-foreground">{item.title}</span>
                      <span className="ml-auto text-[12px] font-mono text-blue-500 uppercase tracking-wider">Building</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DELIVERED SECTION */}
              <div className="relative pl-8 pt-8 pb-0">
                <div className="absolute left-0 top-[38px] w-[9px] h-[9px] bg-emerald-500 rounded-full border-2 border-background z-10" />
                <span className="text-[12px] font-mono font-semibold text-emerald-500 uppercase tracking-widest">
                  DELIVERED // SHIPPED
                </span>
              </div>

              {commits.length > 0 ? (
                <>
                  {commits.map((commit) => (
                    <div key={commit.sha} className="relative pl-8 group">
                      <div className="absolute left-0 top-[10px] w-[9px] h-[9px] bg-emerald-500 rounded-full border-2 border-background z-10 transition-transform group-hover:scale-125" />

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-emerald-500/70" />
                          <span className="text-[13px] font-mono">
                            Shipped {formatRelativeTime(commit.date)}:{' '}
                            <a
                              href={commit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-secondary px-1.5 py-0.5 rounded text-[11px] font-mono border border-border/50 hover:bg-secondary/80 transition-colors"
                              title={commit.message}
                            >
                              {commit.sha}
                            </a>
                          </span>
                        </div>

                        <h2 className="text-[16px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                          {commit.message.split('\n')[0]}
                        </h2>
                      </div>
                    </div>
                  ))}

                  <div className="pt-8 pl-8">
                    <Button variant="outline" size="sm" asChild className="font-mono text-[11px] uppercase tracking-wider h-9">
                      <a
                        href={`https://github.com/${owner}/${repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-3.5 h-3.5" />
                        View full history on GitHub
                      </a>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 border border-dashed border-border rounded-lg bg-secondary/10">
                  <p className="text-sm text-muted-foreground font-mono">NO_COMMITS_FOUND</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border mt-32 py-12 flex flex-col items-center gap-6">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="/notes" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Notes</a>
              <a href="/updates" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Updates</a>
              <a href="/docs" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Documentation</a>
              <a href="https://github.com/nicobrinkkemper/audioguide-demo-react" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Github</a>
            </nav>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center">
              © {new Date().getFullYear()} AudioGuideKit • MIT License • <a href="/llms.txt" className="hover:text-foreground transition-colors">LLMs.txt</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
