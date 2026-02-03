import React from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "Why audio guide player?",
    answer: "At first, we tried to scratch our own itch. Then we discovered that most audio tour solutions are either clunky hardware or locked-in platforms. This is a modern alternative you actually own."
  },
  {
    question: "Why is this open source?",
    answer: "Audio playback shouldn't lock you into a vendor (it happens more often than not!). Open source means you see exactly what runs, avoid dependency, and everyone benefits from improvements."
  },
  {
    question: "Can I use this commercially?",
    answer: "Yes! This project is open-source with MIT license."
  },
  {
    question: "Does it work only for audio guides?",
    answer: "Nope, you can build literally any audio app on top of this. But audio guides for museums, galleries and cultural institutions are our focus, so expect more features for these down the road."
  },
  {
    question: "Why doesn't this include a CMS?",
    answer: "A CMS turns a player into a platform. Auth, permissions, media management — and that's a different beast. We stop before that line on purpose. A management system is on the roadmap later in 2026."
  },
  {
    question: "How do I actually 'deploy' this?",
    answer: "The output is a static site. Host on Vercel, Netlify, anywhere. No database, no server. If you can push to GitHub, you're good."
  },
  {
    question: "What's the catch?",
    answer: "You need to invest some time, especially if you have no technical skills. You'll be the one updating JSON files and adding all guide content. But hey, if you follow the documentation, you will make it. Guaranteed!"
  },
  {
    question: "Is there a roadmap?",
    answer: "Check the updates. We build what we need and ship it. Want a specific feature? Reach out via GitHub."
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
              <h3 className="text-[18px] md:text-[17px] font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {faq.question}
              </h3>
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground font-mono text-sm leading-[1.6] mt-0.5 select-none opacity-30 group-hover:opacity-100 transition-opacity">
                  └
                </span>
                <p className="text-[16px] md:text-[16px] text-muted-foreground font-normal leading-relaxed group-hover:text-foreground transition-colors">
                  {faq.answer.split(/(updates|documentation)/i).map((part, i) =>
                    part.toLowerCase() === 'updates' ? (
                      <Link key={i} href="/updates" className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium">
                        {part}
                      </Link>
                    ) : part.toLowerCase() === 'documentation' ? (
                      <Link key={i} href="/docs" className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium">
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
