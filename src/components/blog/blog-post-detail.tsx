import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Download, ChevronRight } from 'lucide-react';

/**
 * BlogPostDetail Component
 * 
 * Clones the blog post detail page structure with a clean reading experience,
 * mono-space headings, high-contrast text, and simple technical placeholders.
 * Adheres to the "Technical Minimalist" aesthetic with Creme/Sepia theme.
 */

const BlogPostDetail = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation - Fixed Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-200">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-mono font-bold text-primary-foreground text-xl">C</span>
            </div>
          </a>
          <div className="flex items-center gap-8">
            <a href="/blog" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Blog</a>
            <a href="https://docs.conductor.build" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Docs</a>
            <a href="https://www.workatastartup.com/companies/conductor" className="text-sm font-medium hover:text-primary transition-colors">Join Us</a>
            <button className="hidden sm:inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-all cursor-pointer">
              Download
              <kbd className="inline-flex items-center justify-center size-5 text-[10px] font-mono font-medium bg-background/20 rounded border border-white/20">D</kbd>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 pb-24 px-4 sm:px-8">
        <div className="max-w-[672px] mx-auto">
          {/* Breadcrumb / Back Link */}
          <a href="/blog" className="group inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-12 font-mono">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO BLOG
          </a>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#F3EFE8] text-[#6B6B6B] px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">Technical</span>
              <time className="text-[12px] font-mono text-[#6B6B6B]">MARCH 14, 2024</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
              Parallel Context Injection for Multi-Agent Workflows
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E8E2D9] overflow-hidden">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_12.png"
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Melty Labs</span>
                <span className="text-xs text-[#6B6B6B] font-mono">@conductor_build</span>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <article className="prose prose-neutral max-w-none text-[#1A1A1A]">
            <p className="text-xl leading-relaxed text-[#333333] mb-8 font-sans">
              One of the hardest parts of running parallel coding agents is ensuring contextual consistency. When Claude Code and Codex work on separate branches concurrently, the overhead of synchronization can become a bottleneck.
            </p>

            <div className="my-12 relative rounded-xl overflow-hidden border border-[#E8E2D9] bg-background mockup-shadow">
              <div className="bg-[#F3EFE8] px-4 py-2 border-b border-[#E8E2D9] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8E2D9]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8E2D9]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E8E2D9]"></div>
                </div>
                <div className="text-[10px] font-mono text-[#6B6B6B] mx-auto">context_orchestration.ts</div>
              </div>
              <div className="p-8 bg-background overflow-hidden">
                <pre className="font-mono text-sm leading-relaxed text-[#333333] overflow-x-auto">
                  {`interface AgentWorkspace {
  id: string;
  sourceBranch: string;
  injectedContext: string[]; // Parallel diff snapshots
}

async function orchestrate(agents: Agent[]) {
  const snapshots = await getRepoState();
  return Promise.all(
    agents.map(a => a.spawn({ 
      isolated: true,
      context: snapshots 
    }))
  );
}`}
                </pre>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-12 font-mono uppercase tracking-tight">Isolated Workspaces</h2>
            <p className="mb-6 leading-relaxed">
              Every agent in Conductor runs in its own isolated git worktree. This prevents the "compilation race condition" where two agents might try to modify the same build artifacts simultaneously. 
            </p>
            
            <blockquote className="border-l-4 border-[#333333] pl-6 my-8 italic text-[#6B6B6B]">
              "The ability to see at a glance what four agents are doing simultaneously without context switching is the primary design goal of the Conductor dashboard."
            </blockquote>

            <h2 className="text-2xl font-semibold mb-4 mt-12 font-mono uppercase tracking-tight">Real-time Review Loop</h2>
            <p className="mb-6 leading-relaxed">
              As an agent completes a task, the changes are streamed directly to your main workspace for review. We use a custom protocol to diff the worktree against your HEAD without requiring a commit-push-pull cycle.
            </p>

            <div className="my-10 p-6 bg-[#F3EFE8] rounded-lg border border-[#E8E2D9]">
              <div className="flex items-start gap-4">
                <div className="bg-[#1A1A1A] text-[#FDFBF7] p-2 rounded">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Try this in the latest build</h4>
                  <p className="text-sm text-[#6B6B6B] mb-3">Conductor v0.28.7 includes the new parallel context injector by default.</p>
                  <a href="#" className="text-sm font-mono font-bold underline decoration-2 underline-offset-4 hover:text-[#333333]">
                    $ brew upgrade conductor
                  </a>
                </div>
              </div>
            </div>

            <p className="mb-12 leading-relaxed">
              In the next update, we're exploring multi-repo orchestration where a single Conductor instance can manage agents across your frontend and backend repos simultaneously, coordinating cross-stack API changes.
            </p>
          </article>

          {/* Article Footer */}
          <footer className="pt-12 mt-12 border-t border-[#E8E2D9]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex gap-4">
                <button className="text-sm font-mono hover:text-[#333333] transition-colors uppercase tracking-widest text-[#6B6B6B] border border-[#E8E2D9] px-4 py-2 rounded-md hover:bg-[#F3EFE8]">
                  Twitter
                </button>
                <button className="text-sm font-mono hover:text-[#333333] transition-colors uppercase tracking-widest text-[#6B6B6B] border border-[#E8E2D9] px-4 py-2 rounded-md hover:bg-[#F3EFE8]">
                  Share
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B6B6B] font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEMS OPERATIONAL
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#FDFBF7] border-t border-[#E8E2D9] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <p className="text-sm font-mono text-[#6B6B6B] mb-4">© 2024 MELTY LABS</p>
              <h3 className="text-xl font-bold mb-1">We built Conductor using Conductor.</h3>
              <p className="text-[#6B6B6B] text-sm">We think you'll like it as much as we do.</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-sm font-mono text-[#6B6B6B]">
              <a href="/blog" className="hover:text-[#1A1A1A] transition-colors">BLOG</a>
              <a href="https://docs.conductor.build" className="hover:text-[#1A1A1A] transition-colors">DOCS</a>
              <a href="/privacy" className="hover:text-[#1A1A1A] transition-colors">PRIVACY</a>
              <a href="/jobs" className="hover:text-[#1A1A1A] transition-colors font-bold text-[#1A1A1A]">JOIN US</a>
              <a href="https://twitter.com/conductor_build" className="hover:text-[#1A1A1A] transition-colors">FOLLOW US ON X</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostDetail;