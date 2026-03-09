'use client';

import React, { useState } from "react";
import Link from "next/link";
import { ContactModal } from "@/components/ui/contact-modal";

const faqs = [
  {
    question: "Why audio guide player?",
    answer:
      "We built this to solve our own audio guide needs (read the full story). After evaluating existing solutions, we found most were either expensive locked-in platforms or clunky hardware rentals. This is a modern alternative you actually own.",
  },
  {
    question: "Why is this open source?",
    answer:
      "Audio playback shouldn't lock you into a vendor (it happens more often than not). Open source means you see exactly what runs, avoid vendor dependency, and everyone benefits from improvements.",
  },
  {
    question: "Can I use this commercially?",
    answer:
      "Yes. This project is open-source with an MIT license, which allows commercial use without restrictions.",
  },
  {
    question: "Does it work only for audio guides?",
    answer:
      "No. While it's designed for museums and galleries, you can adapt it for any audio-based application. Audio guides for cultural institutions remain our primary focus, so expect continued development in that direction.",
  },
  {
    question: "Why doesn't this include a CMS?",
    answer:
      "A CMS turns a player into a platform. Authentication, permissions, media management—that's a different scope entirely. We deliberately focus on the player itself. However, a simple headless management system for audio guides is on the roadmap for later in 2026.",
  },
  {
    question: "How do I actually 'deploy' this?",
    answer:
      "It's a standard website that you can host on any web server. Popular options include Vercel, Netlify, or your own infrastructure. No database, no backend server required. If you can upload files to a web host, you can deploy this.",
  },
  {
    question: "What's the catch?",
    answer:
      "You need to invest some time, especially if you have limited technical experience. You'll handle updating configuration files and managing your guide content. With basic technical knowledge and our step-by-step documentation, most teams can successfully implement this.",
  },
  {
    question: "What technical skills do I need?",
    answer:
      "Basic web development knowledge is helpful: editing configuration files (JSON), uploading files to a server, and using version control. If you have a web developer on staff or work with a development agency, they'll find this straightforward to implement.",
  },
  {
    question: "Where can I get help?",
    answer:
      "The documentation covers step-by-step setup and common scenarios. For technical questions or community support, open a GitHub issue.",
  },
  {
    question: "Do you offer implementation services?",
    answer:
      "Yes. We provide paid consulting for setup, content migration, customization, and training. Whether you need full implementation or just initial guidance, we can help. Contact us to discuss your requirements.",
  },
  {
    question: "Is there a roadmap?",
    answer:
      "Yes. We maintain an active roadmap based on our own requirements and user feedback. Check the updates page for current progress, or submit feature requests via GitHub.",
  },
];

export function FAQ() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
                  {faq.answer
                    .split(
                      /(read the full story|on the roadmap|updates page|documentation|open a GitHub issue|submit feature requests|Contact us to discuss your requirements)/i,
                    )
                    .map((part, i) =>
                      part === "Contact us to discuss your requirements" ? (
                        <button
                          key={i}
                          onClick={() => setIsContactModalOpen(true)}
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium cursor-pointer"
                        >
                          {part}
                        </button>
                      ) : part.toLowerCase() === "read the full story" ? (
                        <Link
                          key={i}
                          href="/notes/why"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : part.toLowerCase() === "on the roadmap" ? (
                        <Link
                          key={i}
                          href="/updates"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : part.toLowerCase() === "updates page" ? (
                        <Link
                          key={i}
                          href="/updates"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : part.toLowerCase() === "documentation" ? (
                        <Link
                          key={i}
                          href="/docs"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : part.toLowerCase() === "open a github issue" ? (
                        <Link
                          key={i}
                          href="https://github.com/audioguidekit/player-react/issues/new"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : part.toLowerCase() === "submit feature requests" ? (
                        <Link
                          key={i}
                          href="https://github.com/audioguidekit/player-react/issues/new?template=feature_request.md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary transition-all font-medium"
                        >
                          {part}
                        </Link>
                      ) : (
                        part
                      ),
                    )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[12px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
            End of FAQs
          </p>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}
