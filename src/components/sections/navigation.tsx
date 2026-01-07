'use client';

import React from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

/**
 * Navigation Component for the Audio Tour project.
 * Adheres to the creme developer-oriented theme.
 */
export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[1400px] bg-background/20 backdrop-blur-md border-b border-x border-border h-16 flex items-center justify-between px-4 sm:px-8 pointer-events-auto relative">

          <Link href="/" className="flex items-center group" aria-label="Audio Tour Home">
            <Logo className="h-6 w-auto transition-transform group-hover:scale-105" />
          </Link>


        <div className="flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-mono font-medium transition-colors relative flex items-center h-16 group",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_-1px_4px_rgba(var(--primary),0.5)]" />
                )}
              </Link>
            );
          })}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 font-medium h-9 px-4 rounded-full transition-all text-[13px] group"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
            <kbd className="hidden md:inline-flex items-center justify-center size-5 text-[10px] font-mono font-bold bg-background/10 text-background rounded border border-white/20 ml-1">
              G
            </kbd>
          </a>
        </div>
      </div>
    </nav>
  );
}
