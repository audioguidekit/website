import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Introducing Conductor: The Parallel Agent Orchestrator",
    slug: "introducing-conductor",
    category: "Product",
    date: "Mar 15, 2024",
    excerpt: "Conductor is built for developers who need to move fast. Spin up multiple Claude Code and Codex agents in isolated workspaces without the overhead of manually managing git worktrees."
  },
  {
    title: "Version 0.28.7: Enhanced Workspace Isolation",
    slug: "version-0-28-7-release",
    category: "Release Notes",
    date: "Mar 10, 2024",
    excerpt: "The latest update brings significant performance improvements to workspace switching and deeper integration with VS Code's built-in terminal."
  },
  {
    title: "Why we switched to Geist Mono for our developer interface",
    slug: "geist-mono-typography",
    category: "Engineering",
    date: "Mar 02, 2024",
    excerpt: "Typography is the foundation of any technical product. We explore why monospaced fonts are the superior choice for high-density agent feedback loops."
  },
  {
    title: "Managing 10+ agents simultaneously: Lessons learned",
    slug: "managing-multi-agents",
    category: "Guides",
    date: "Feb 22, 2024",
    excerpt: "Scaling your workflow with coding agents requires a different mental model. Here is how our power users are orchestrating large-scale refactors with Conductor."
  }
];

const BlogList = () => {
  return (
    <section className="bg-background">
      <div className="max-w-xl mx-auto px-4 sm:px-8 pt-24 pb-32">
        {/* Header Section */}
        <div className="mb-16">
          <Link 
            href="/changelog" 
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono"
          >
            See what&apos;s new in 0.28.7
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            Updates from the Conductor team on building the next generation of coding agent infrastructure.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col items-start">
              {/* Metadata row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-secondary text-foreground px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase">
                  {post.category}
                </span>
                <span className="text-muted-foreground text-xs font-mono">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-muted-foreground font-sans text-[15px] leading-relaxed mb-4">
                {post.excerpt}
              </p>

              {/* Read More Link */}
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline underline-offset-4 decoration-border"
              >
                Read more
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Divider if not last */}
              <div className="absolute -bottom-6 left-0 right-0 h-px bg-border/40 group-last:hidden" />
            </article>
          ))}
        </div>

        {/* Footer Signup / CTA */}
        <div className="mt-24 pt-12 border-t border-border">
          <div className="bg-secondary/30 p-8 rounded-lg border border-border/50">
            <h3 className="text-lg font-semibold mb-2">Build Conductor with us</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Get notified about new releases, deep dives into agent orchestration, and early access to experimental features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="flex-grow bg-background border border-border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring font-sans"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;