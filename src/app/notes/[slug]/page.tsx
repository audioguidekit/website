import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import { getPostData, getSortedPostsData } from '@/lib/notes';
import { format, parseISO } from 'date-fns';
import { NewsletterForm } from '@/components/sections/newsletter-form';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@agilek',
    },
  };
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
            href="/notes"
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground transition-colors mb-12 uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            RETURN_TO_NOTES
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-secondary text-muted-foreground px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-widest border border-border">
                {postData.category}
              </span>
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

              <img
                src="/images/author-avatar.jpeg"
                alt={postData.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-foreground">{postData.author}</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://x.com/agilek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                    X
                  </a>
                  <span className="text-muted-foreground">·</span>
                  <a
                    href="https://bsky.app/profile/acler.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                    BSKY
                  </a>
                </div>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
