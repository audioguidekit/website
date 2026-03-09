'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/navigation';
import { Sidebar, MobileSidebar } from '@/components/docs/sidebar';
import { PanelRightClose } from 'lucide-react';
import { SimpleFooter } from '@/components/sections/simple-footer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navigation />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="w-full max-w-[1400px] border-x border-border relative pt-16 md:pt-22 bg-background min-h-screen">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed bottom-4 left-4 z-30 lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg"
          aria-label="Open navigation"
        >
          <PanelRightClose className="w-5 h-5" />
        </button>

        <div className="flex items-start px-4 sm:px-8 lg:px-16 py-8 min-h-screen">
          <Sidebar />
          <div className="flex-1 min-w-0 lg:pl-8 flex flex-col">
            <main className="flex-1" data-pagefind-body>
              {children}
            </main>
            <SimpleFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
