'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { ContactModal } from '@/components/ui/contact-modal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const footerLinks = [
    { label: 'Notes', href: '/notes' },
    { label: 'Updates', href: '/updates' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Github', href: 'https://github.com/audioguidekit/player-react' },
    { label: 'Contact', href: '#', onClick: () => setIsContactModalOpen(true) },
  ];

  return (
    <footer className="w-full max-w-[1400px] bg-background py-24 border-x border-border mx-auto">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-4 flex flex-col items-center">
            <Logo className="w-[100px] sm:w-[140px]" />
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[500px] text-center">
              A modern web-based audio guide that works on any device. Works online and offline, hosts on your own servers, and lets you customize colors and branding. No vendor fees or contracts.
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
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System_Online</span>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
}
