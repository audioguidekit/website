import React from 'react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSortedPostsData } from '@/lib/blog';
import { format, parseISO } from 'date-fns';
import { NewsletterForm } from '@/components/sections/newsletter-form';

export default async function BlogPage() {
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
                BLOG_INDEX
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">Engineering Journal</h1>
            <p className="text-[18px] text-muted-foreground leading-relaxed">
              Technical deep dives, architectural decisions, and updates from the project.
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
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
