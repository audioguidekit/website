'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { Sidebar, MobileSidebar } from '@/components/docs/sidebar';
import { Menu } from 'lucide-react';

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
          className="fixed bottom-4 right-4 z-30 lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex px-4 sm:px-8 lg:px-16 py-8">
          <Sidebar />
          <main className="flex-1 min-w-0 lg:pl-8">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
