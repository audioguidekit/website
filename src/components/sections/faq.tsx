'use client';

import React, { useState, type ReactNode } from "react";
import Link from "next/link";
import { ContactModal } from "@/components/ui/contact-modal";
import { RichText } from "@/components/rich-text";
import en from "@/content/landing/en.json";
import type { Dict } from "@/content/landing";

const LINK_CLASS =
  "text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium";

const ISSUE_URL = "https://github.com/audioguidekit/player-react/issues/new";
const FEATURE_URL = `${ISSUE_URL}?template=feature_request.md`;

export function FAQ({
  t = en.faq,
  tContact = en.contact,
}: {
  t?: Dict["faq"];
  tContact?: Dict["contact"];
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // href token -> element. Tokens are authored in en.json and survive
  // translation because DeepL is called with tag_handling: "html".
  const links: Record<string, (children: ReactNode) => ReactNode> = {
    "/notes/why": (children) => (
      <Link href="/notes/why" className={LINK_CLASS}>
        {children}
      </Link>
    ),
    "/updates": (children) => (
      <Link href="/updates" className={LINK_CLASS}>
        {children}
      </Link>
    ),
    "/docs": (children) => (
      <Link href="/docs" className={LINK_CLASS}>
        {children}
      </Link>
    ),
    "#issue": (children) => (
      <Link href={ISSUE_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </Link>
    ),
    "#feature": (children) => (
      <Link href={FEATURE_URL} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
        {children}
      </Link>
    ),
    "#contact": (children) => (
      <button
        onClick={() => setIsContactModalOpen(true)}
        className={`${LINK_CLASS} cursor-pointer`}
      >
        {children}
      </button>
    ),
  };

  return (
    <section className="bg-white py-24 border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            HONEST_FAQ
          </span>
        </div>

        <div className="space-y-12">
          {t.items.map((faq, index) => (
            <div key={index} className="flex flex-col gap-3 group">
              <h3 className="text-[18px] md:text-[17px] font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {faq.q}
              </h3>
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground font-mono text-sm leading-[1.6] mt-0.5 select-none opacity-30 group-hover:opacity-100 transition-opacity">
                  └
                </span>
                <p className="text-[16px] md:text-[16px] text-muted-foreground font-normal leading-relaxed group-hover:text-foreground transition-colors">
                  <RichText text={faq.a} links={links} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[12px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
            {t.end}
          </p>
        </div>
      </div>

      <ContactModal
        t={tContact}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}
