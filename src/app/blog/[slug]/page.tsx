import React from 'react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import Link from 'next/link';
import { ArrowLeft, Share2, Clock } from 'lucide-react';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { format, parseISO } from 'date-fns';
import { NewsletterForm } from '@/components/sections/newsletter-form';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

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
          {/* Back link */}
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground transition-colors mb-12 uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Return_to_Journal
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-widest border border-border">
                {postData.category}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {postData.readingTime}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                {format(parseISO(postData.date), 'MMM dd, yyyy')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-10">
              {postData.title}
            </h1>

            <div className="flex items-center gap-4 py-8 border-y border-border relative">
              {/* Technical markers on the borders */}
              <div className="absolute -top-px left-0 w-4 h-px bg-primary" />
              <div className="absolute -bottom-px right-0 w-4 h-px bg-primary" />
              
              <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold text-sm">
                {postData.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-foreground">{postData.author}</span>
                <span className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">{postData.authorTwitter}</span>
              </div>
            </div>
          </header>

            {/* Article Content */}
            <article 
              className="prose prose-neutral max-w-none blog-content technical-article"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />

            {/* Newsletter CTA */}
            <div className="mt-20 pt-16 border-t border-border relative">
              <div className="absolute -top-px left-0 w-8 h-px bg-primary" />
              <NewsletterForm />
            </div>

            {/* Article Footer */}

          <footer className="mt-20 pt-12 border-t border-border relative">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-px bg-border" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-2 border border-border rounded-full text-[12px] font-mono font-bold uppercase tracking-widest hover:bg-secondary transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                  Share_Entry
                </button>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] opacity-50">
                End_of_Transmission
              </div>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
