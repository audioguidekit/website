import React from 'react';
import Image from 'next/image';

interface Testimonial {
  text: string;
  author: string;
  handle?: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[][] = [
  // Column 1
  [
    {
      text: "gave this a try and holy shit. this is a new productivity unlock",
      author: "@nexxel",
      role: "Founding Engineer, Supermemory",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_2.png"
    },
    {
      text: "This is seriously insane... So much better than VSCode it's making me sick.",
      author: "Richard Waters",
      role: "CEO, Proprietary Innovation Labs",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_3.png"
    },
    {
      text: "If you want to run multiple Claude Code agents at the same time, use Conductor. Beautiful UI and handles all the git worktree stuff for you!",
      author: "Ian Nuttall",
      role: "serial internet biz builder",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_4.png"
    }
  ],
  // Column 2
  [
    {
      text: "I've been using Conductor every day for a while now and it's the future. The last time I felt this strongly about a developer tool was Vercel and Supabase.",
      author: "Zach Blume",
      role: "Software Engineer, Stripe",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_5.png"
    },
    {
      text: "Loving using Conductor so far! Do give it a try.",
      author: "Ovais Tariq",
      role: "Co-Founder and CEO, Tigris Data",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_6.png"
    },
    {
      text: "It took some adjustment, but now I can't imagine building without @conductor_build",
      author: "Cole Bemis",
      role: "Design Engineer, Notion",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_8.png"
    }
  ],
  // Column 3
  [
    {
      text: "Conductor with multiple repos in multiple workspaces has been insane for my workflow. I feel like a true full stack engineer cross-platform",
      author: "Umar Qattan",
      role: "Sr. Software Engineer, Life360",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_7.png"
    },
    {
      text: "Future of AI software-making looks something like like this",
      author: "Raphael Schaad",
      role: "Founder Cron, Design @ Notion",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_9.png"
    },
    {
      text: "Is Conductor the new Cursor? Just used it for the first time and it's lovely",
      author: "Stammy",
      role: "Head of Design, Sesame",
      avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/images/images_2.png" // Fallback as one specific avatar was reused or similar
    }
  ]
];

const VerifiedCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-muted-foreground/40 ml-1 inline-block align-middle"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-soft transition-all duration-200 hover:border-muted-foreground/20">
    <p className="text-foreground text-[15px] font-sans leading-[1.6] mb-6 font-medium">
      {testimonial.text}
    </p>
    <div className="flex items-center gap-3">
      <div className="relative size-10 shrink-0">
        <Image
          src={testimonial.avatar}
          alt={testimonial.author}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center">
          <span className="text-foreground text-[14px] font-mono leading-none truncate">
            {testimonial.author}
          </span>
          <VerifiedCheck />
        </div>
        <span className="text-muted-foreground text-[12px] font-mono leading-tight mt-1 truncate">
          {testimonial.role}
        </span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0 items-start">
          {testimonials.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {column.map((testimonial, tIdx) => (
                <TestimonialCard 
                  key={`${colIdx}-${tIdx}`} 
                  testimonial={testimonial} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;