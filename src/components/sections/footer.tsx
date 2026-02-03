import React from 'react';
import { Logo } from '@/components/ui/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Notes', href: '/notes' },
    { label: 'Updates', href: '/updates' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Github', href: 'https://github.com/audioguidekit/player-react' },
  ];

  return (
    <footer className="w-full max-w-[1400px] bg-background py-24 border-x border-border mx-auto">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-4">
              <Logo />
              <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[500px]">

              Open-source audio guide player for museums, galleries, and cultural institutions. Built in React for the web. Runs online and offline as a PWA, self-hosted by default, with customizable branding and no platform lock-in.
            </p>
          </div>

          <nav className="flex flex-justify gap-4 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
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
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System_Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
