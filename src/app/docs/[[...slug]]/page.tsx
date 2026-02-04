import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs/mdx';
import { mdxComponents } from '@/components/docs/mdx-components';
import { findCurrentAndAdjacent } from '@/lib/docs/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({
    slug: slug.length === 0 ? undefined : slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const pathname = slug.length === 0 ? '/docs' : `/docs/${slug.join('/')}`;
  const { prev, next } = findCurrentAndAdjacent(pathname);

  return (
    <article className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        {slug.map((segment, index) => (
          <span key={segment} className="flex items-center gap-2">
            <span>/</span>
            <span className={index === slug.length - 1 ? 'text-foreground' : ''}>
              {index === slug.length - 1
                ? doc.meta.title
                : segment.replace(/-/g, ' ').replace(/^\w/, l => l.toUpperCase())}
            </span>
          </span>
        ))}
      </div>

      {/* Title & Description */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{doc.meta.title}</h1>
        {doc.meta.description && (
          <p className="text-lg text-muted-foreground">{doc.meta.description}</p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={doc.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: 'slack-ochin',
                  },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Pagination */}
      <nav className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-medium text-foreground">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <div>
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-medium text-foreground">{next.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
