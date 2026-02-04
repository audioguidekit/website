'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { docsNavigation, type NavGroup } from '@/lib/docs/navigation';

function NavGroupComponent({ group }: { group: NavGroup }) {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <h4 className="mb-2 px-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-foreground">
        {group.title}
      </h4>
      <ul className="space-y-1">
        {group.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="fixed top-32 bottom-0 w-64 pb-8 pr-4 overflow-y-auto z-10 bg-background">
        {docsNavigation.map((group) => (
          <NavGroupComponent key={group.title} group={group} />
        ))}
      </nav>
    </aside>
  );
}

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-[1px] lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-[70] w-72 bg-background border-r border-border p-6 overflow-y-auto lg:hidden">
        <nav className="pt-16">
          {docsNavigation.map((group) => (
            <div key={group.title} className="mb-6">
              <h4 className="mb-2 px-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
