import React from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "why audio guide player?",
    answer: "Many museums, galleries and other public institutions use audio tours to enhance visitor experience. But they either have old, clunky physical players or are locked into platforms that are not always reliable or user-friendly. This project aims to offer a modern, lightweight and offline-first open source player without a vendor lock-in."
  },
  {
    question: "why is this open source?",
    answer: "Because something as fundamental as audio playback shouldn’t lock institutions into a vendor’s platform. Open-sourcing it means you can see exactly what runs on visitors’ devices, avoid long-term vendor dependency, and ensure that improvements flow back to everyone—not just a single company."
  },
  {
    question: "can i use this commercially?",
    answer: "Yes, absolutely! But you need to be prepared to edit and manage files manually. There is no 'admin panel' for non-technical staff (yet) so you need to have some basic technical skills or someone around to help you. We plan to introduce a (paid) cloud system for tour management and analytics in the future."
  },
  {
    question: "is it only for audio tours or guides?",
    answer: "No, you can use it for any kind of audio application. But please be aware audio tours are our primary focus and we plan to introduce some specific features for audio tours in the future."
  },
  {
    question: "why doesn’t this include a CMS?",
    answer: "Because a CMS changes everything. The moment you add authentication, permissions, and media management, you’re no longer shipping a player. You’re shipping a platform. This project deliberately stops before that line."
  },
  {
    question: "how do i actually 'deploy' this?",
    answer: "It’s just a Next.js site. You can host it on Vercel, Netlify, or even a Raspberry Pi. There is no database to configure and no 'server' to manage beyond the frontend. If you can push to GitHub, you can deploy this."
  },
  {
    question: "what’s the catch?",
    answer: "The catch is that you have to manage files. There is no 'admin panel' for your non-technical staff to break things, but that also means you are the one renaming images and updating JSON files."
  },
  {
    question: "is there a roadmap?",
    answer: "Yes, check the changelog. We build what we need for our own projects and ship it. If you need a specific feature, the best way to get it is to build it yourself, or contact us via email in GitHub profile."
  }
];

export function FAQ() {
  return (
    <section className="bg-white py-24 border-b border-border overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
            HONEST_FAQ
          </span>
        </div>

        <div className="space-y-12">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-3 group">
              <h3 className="text-[16px] font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {faq.question}
              </h3>
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground font-mono text-sm leading-[1.6] mt-0.5 select-none opacity-30 group-hover:opacity-100 transition-opacity">
                  └
                </span>
                <p className="text-[15px] text-muted-foreground font-normal leading-relaxed group-hover:text-foreground transition-colors">
                  {faq.answer.split(/(changelog)/i).map((part, i) =>
                    part.toLowerCase() === 'changelog' ? (
                      <Link key={i} href="/changelog" className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium">
                        {part}
                      </Link>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[12px] font-mono text-muted-foreground uppercase tracking-[0.2em]">End of FAQs</p>
        </div>
      </div>
    </section>
  );
}
