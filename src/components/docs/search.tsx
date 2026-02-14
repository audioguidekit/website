'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface PagefindResult {
  id: string;
  url: string;
  excerpt: string;
  meta: { title?: string };
  sub_results?: {
    title: string;
    url: string;
    excerpt: string;
  }[];
}

interface PagefindSearchResult {
  id: string;
  data: () => Promise<PagefindResult>;
}

interface PagefindInstance {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindSearchResult[] }>;
}

export function DocSearch({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pagefind, setPagefind] = useState<PagefindInstance | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Load Pagefind on first interaction
  const loadPagefind = useCallback(async () => {
    if (pagefind) return pagefind;
    try {
      const pf = await import(
        // @ts-expect-error — Pagefind generates this at build time
        /* webpackIgnore: true */ '/pagefind/pagefind.js'
      );
      await pf.init();
      setPagefind(pf);
      return pf as PagefindInstance;
    } catch {
      setLoadError(true);
      return null;
    }
  }, [pagefind]);

  // Search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    let cancelled = false;

    async function doSearch() {
      const pf = await loadPagefind();
      if (!pf || cancelled) return;

      const search = await pf.search(query);
      if (cancelled) return;

      const data = await Promise.all(
        search.results.slice(0, 8).map((r) => r.data())
      );
      if (!cancelled) {
        setResults(data);
        setActiveIndex(-1);
      }
    }

    const timeout = setTimeout(doSearch, 150);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query, loadPagefind]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Close on click outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function cleanUrl(url: string) {
    // Pagefind indexes .next/server/app/ so URLs come back as
    // /server/app/docs/features/deeplinking.html — strip the prefix and extension
    return url
      .replace(/^\/server\/app/, '')
      .replace(/\.html$/, '')
      .replace(/\/index$/, '');
  }

  function navigate(url: string) {
    router.push(cleanUrl(url));
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onNavigate?.();
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].url);
    }
  }

  const showResults = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            loadPagefind();
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Search docs..."
          className="w-full h-9 pl-8 pr-16 rounded-md border border-input bg-transparent text-sm font-mono outline-none transition-colors placeholder:text-muted-foreground hover:border-foreground/30 focus-visible:border-foreground/50"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-popover shadow-md overflow-hidden max-h-80 overflow-y-auto">
          {loadError && (
            <p className="px-3 py-4 text-xs font-mono text-muted-foreground text-center">
              Run <code className="bg-muted px-1 py-0.5 rounded">npm run build</code> to enable search
            </p>
          )}

          {!loadError && results.length === 0 && query.trim() && (
            <p className="px-3 py-4 text-xs font-mono text-muted-foreground text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.map((result, i) => (
            <button
              key={result.id}
              onClick={() => navigate(result.url)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`w-full text-left px-3 py-2.5 border-b border-border last:border-b-0 transition-colors ${
                i === activeIndex ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
            >
              <span className="block text-sm font-medium text-foreground truncate">
                {result.meta?.title || cleanUrl(result.url)}
              </span>
              {result.excerpt && (
                <span
                  className="block mt-0.5 text-xs text-muted-foreground line-clamp-2 [&_mark]:bg-primary/15 [&_mark]:text-foreground [&_mark]:rounded-sm [&_mark]:px-0.5"
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && query && (
        <button
          onClick={() => {
            setQuery('');
            setResults([]);
            inputRef.current?.focus();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 sm:hidden text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
