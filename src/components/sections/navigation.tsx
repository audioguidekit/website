'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// Navigation links hoisted to module scope to avoid recreation on each render
const navLinks = [
  { name: 'Notes', href: '/notes' },
  { name: 'Updates', href: '/updates' },
  { name: 'Documentation', href: '/docs', kbd: 'D' },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[1400px] bg-background/20 backdrop-blur-md border-b border-x border-border h-16 md:h-22 flex items-center justify-between px-4 sm:px-16 pointer-events-auto relative">

        <Link href="/" className="flex items-center group shrink-0" aria-label="Audio Tour Home">
          <Logo className="transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-mono font-medium transition-colors relative flex items-center h-16 md:h-22 group",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {link.kbd && (
                  <kbd className="hidden md:inline-flex items-center justify-center size-5 text-[10px] font-mono font-bold bg-foreground/5 text-muted-foreground rounded border border-border ml-2 group-hover:text-foreground transition-colors">
                    {link.kbd}
                  </kbd>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_-1px_4px_rgba(var(--primary),0.5)]" />
                )}
              </Link>
            );
          })}

          <a
            href="https://github.com/audioguidekit/player-react"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 font-medium h-9 px-4 rounded-full transition-all text-[13px] group"
          >
            <GitHubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
            <kbd className="hidden md:inline-flex items-center justify-center size-5 text-[10px] font-mono font-bold bg-background/10 text-background rounded border border-white/20 ml-1">
              G
            </kbd>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border pointer-events-auto">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-[15px] font-mono font-medium transition-colors py-3 px-4 rounded-lg",
                    isActive
                      ? "text-foreground bg-foreground/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <a
              href="https://github.com/audioguidekit/player-react"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 font-medium py-3 px-4 rounded-lg transition-all text-[15px] mt-2"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
