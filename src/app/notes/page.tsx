import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSortedPostsData } from '@/lib/notes';
import { format, parseISO } from 'date-fns';
import { NewsletterForm } from '@/components/sections/newsletter-form';

const siteUrl = 'https://audioguidekit.org';
const defaultOgImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'Notes - Engineering blog',
  description: 'Technical deep-dives, architectural decisions, and development updates from the AudioGuideKit project. Learn about building audio guides for museums.',
  openGraph: {
    title: 'Notes - AudioGuideKit engineering blog',
    description: 'Technical deep-dives and development updates from the AudioGuideKit project.',
    url: `${siteUrl}/notes`,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: 'AudioGuideKit' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [defaultOgImage],
  },
};

export default async function NotesPage() {
  const blogPosts = await getSortedPostsData();

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
                NOTES_INDEX
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">Notes on development</h1>
            <p className="text-[18px] text-muted-foreground leading-relaxed">
            Learn about the background of the project, understand key design & development decisions, and follow ongoing work and updates.
            </p>
          </header>

          <div className="space-y-20">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group flex flex-col items-start relative pl-8 border-l border-border">
                {/* Technical dot on the line */}
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-primary rounded-full border-2 border-white" />
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-widest bg-secondary px-2 py-0.5 border border-border rounded">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                    {format(parseISO(post.date), 'MMM dd, yyyy')}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/notes/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/notes/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-mono font-bold text-foreground group/link uppercase tracking-widest"
                >
                  Read_Entry
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>

          {/* Newsletter / CTA */}
          <div className="mt-32 pt-16 border-t border-border relative">
            {/* Technical marker */}
            <div className="absolute -top-px left-0 w-8 h-px bg-primary" />

            <NewsletterForm />
          </div>

          {/* Footer */}
          <footer className="border-t border-border mt-16 py-12 flex flex-col items-center gap-6">
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
