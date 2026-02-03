import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertCircle, Info, AlertTriangle, Lightbulb, ChevronDown } from 'lucide-react';
import { CodeBlockWrapper } from './code-block-wrapper';

// Note component
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
      <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
      <div className="text-sm text-blue-800 dark:text-blue-200 [&>p]:m-0">{children}</div>
    </div>
  );
}

// Warning component
export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
      <div className="text-sm text-amber-800 dark:text-amber-200 [&>p]:m-0">{children}</div>
    </div>
  );
}

// Tip component
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
      <Lightbulb className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
      <div className="text-sm text-green-800 dark:text-green-200 [&>p]:m-0">{children}</div>
    </div>
  );
}

// Steps component
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 ml-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

// Step component
export function Step({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="relative pb-6 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground before:content-[counter(step)]" />
      <h4 className="mb-2 font-semibold">{title}</h4>
      {children && <div className="text-muted-foreground">{children}</div>}
    </div>
  );
}

// Cards/CardGroup components
export function CardGroup({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div className={cn(
      "my-6 grid gap-4",
      cols === 2 && "md:grid-cols-2",
      cols === 3 && "md:grid-cols-3",
    )}>
      {children}
    </div>
  );
}

export function Card({
  title,
  icon,
  href,
  children
}: {
  title: string;
  icon?: string;
  href?: string;
  children?: React.ReactNode
}) {
  const content = (
    <div className={cn(
      "group rounded-lg border border-border bg-card p-4 transition-colors",
      href && "hover:border-primary/30 hover:bg-secondary cursor-pointer"
    )}>
      <h4 className="mb-1 font-semibold group-hover:text-primary transition-colors">{title}</h4>
      {children && <div className="text-sm text-muted-foreground [&>p]:m-0">{children}</div>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// Cards alias for Card (some MDX uses Cards)
export const Cards = CardGroup;

// Tabs components
export function Tabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      {children}
    </div>
  );
}

export function Tab({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer items-center justify-between py-3 font-medium hover:text-primary transition-colors">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

// Accordion component
export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group my-4 rounded-lg border border-border">
      <summary className="flex cursor-pointer items-center justify-between p-4 font-medium hover:bg-secondary transition-colors rounded-lg">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border p-4 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

// Code block styling is handled by default MDX rendering

// Custom link component
function CustomLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className="text-primary hover:underline" {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props}>
      {children}
    </a>
  );
}

// Export all MDX components
export const mdxComponents = {
  Note,
  Warning,
  Tip,
  Steps,
  Step,
  Cards,
  Card,
  CardGroup,
  Tabs,
  Tab,
  Accordion,
  a: CustomLink,
  // Typography
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-2xl font-semibold tracking-tight border-b border-border pb-2" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold" {...props}>{children}</h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-4 mb-2 text-lg font-semibold" {...props}>{children}</h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground" {...props}>{children}</blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (no data-rehype-pretty-code-figure means inline)
    const isInline = !className?.includes('language-');
    if (isInline) {
      return (
        <code className="rounded bg-[#F3EFE8] text-[#333333] px-[0.4em] py-[0.2em] font-mono text-[0.875em] border border-[#E8E2D9]" {...props}>
          {children}
        </code>
      );
    }
    // Code block (inside pre) - styled by rehype-pretty-code
    return (
      <code className={cn("font-mono text-[0.875em] leading-[1.7]", className)} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-[#f9fafb] px-5 py-4 text-sm border border-[#e5e7eb] [&>code]:bg-transparent [&>code]:p-0 [&>code]:border-0" {...props}>
      {children}
    </pre>
  ),
  figure: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // rehype-pretty-code wraps code blocks in figure
    const dataAttr = (props as Record<string, unknown>)['data-rehype-pretty-code-figure'];
    if (dataAttr !== undefined) {
      return (
        <CodeBlockWrapper {...props}>
          {children}
        </CodeBlockWrapper>
      );
    }
    return <figure {...props}>{children}</figure>;
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border" {...props}>{children}</thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border" {...props}>{children}</tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props}>{children}</tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="py-3 pr-4 text-left font-semibold text-foreground" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="py-3 pr-4 text-muted-foreground" {...props}>{children}</td>
  ),
  hr: () => <hr className="my-8 border-border" />,
};
