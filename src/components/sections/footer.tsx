'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { ContactModal } from '@/components/ui/contact-modal';
import { LanguageSwitcher } from '@/components/language-switcher';
import en from '@/content/landing/en.json';
import type { Dict, Lang } from '@/content/landing';

export function Footer({
  t = en.footer,
  tagline = en.common.tagline,
  tContact = en.contact,
  lang,
}: {
  t?: Dict['footer'];
  tagline?: string;
  tContact?: Dict['contact'];
  /** Omit to hide the language switcher (e.g. on the 404 page). */
  lang?: Lang;
}) {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const footerLinks = [
    { label: t.notes, href: '/notes' },
    { label: t.updates, href: '/updates' },
    { label: t.docs, href: '/docs' },
    { label: t.github, href: 'https://github.com/audioguidekit/player-react' },
    { label: t.contact, href: '#', onClick: () => setIsContactModalOpen(true) },
  ];

  return (
    <footer className="w-full max-w-[1400px] bg-background py-24 border-x border-border mx-auto">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-4 flex flex-col items-center">
            <Logo className="w-[100px] sm:w-[140px]" />
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[500px] text-center">
              {tagline}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col items-center gap-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center">
            © {currentYear} AudioGuideKit • MIT LICENSE • <a href="/llms.txt" className="hover:text-foreground transition-colors">LLMs.txt</a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System_Online</span>
            {lang && (
              <>
                <span className="font-mono text-[10px] text-border">•</span>
                <LanguageSwitcher current={lang} />
              </>
            )}
          </div>
        </div>
      </div>

      <ContactModal
        t={tContact}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
}
