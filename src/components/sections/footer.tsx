import React from 'react';
import { Logo } from '@/components/ui/logo';

const steps = [
  "Clone repo",
  "Add your audio files",
  "Define your guide config",
  "Deploy",
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Github', href: 'https://github.com' },
  ];

  return (
    <footer className="w-full max-w-[1400px] bg-background py-24 border-x border-border mx-auto">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4">
              <Logo className="h-6 w-auto" />
              <p className="text-muted-foreground text-[14px] leading-relaxed max-w-[300px]">

              Open-source audio guide player for museums, galleries, and exhibitions. Reliable audio, offline support, wide customization and easy self-hosting.
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Navigation</span>
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

          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Quick Start</span>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground w-4 h-4 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-mono uppercase tracking-tight text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            © {currentYear} AUDIO TOUR PROJECT • MIT LICENSE
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
