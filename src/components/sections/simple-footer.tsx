'use client';

import React, { useState } from 'react';
import { ContactModal } from '@/components/ui/contact-modal';

interface SimpleFooterProps {
  className?: string;
}

export function SimpleFooter({ className = "" }: SimpleFooterProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <footer className={`max-w-3xl border-t border-border mt-8 py-12 flex flex-col items-center gap-6 ${className}`}>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a href="/notes" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Notes</a>
          <a href="/updates" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Updates</a>
          <a href="/docs" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Documentation</a>
          <a href="https://github.com/audioguidekit/player-react" className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Github</a>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest cursor-pointer"
          >
            Contact
          </button>
        </nav>
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center">
          © {new Date().getFullYear()} AudioGuideKit • MIT License • <a href="/llms.txt" className="hover:text-foreground transition-colors">LLMs.txt</a>
        </p>
      </footer>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
