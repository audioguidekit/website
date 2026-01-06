import React from 'react';
import Image from 'next/image';

/**
 * TrustedBy Component
 * 
 * A logo cloud section featuring monochrome partner logos.
 * Adheres to the "Technical Minimalist" aesthetic with monospaced labels
 * and a clean grid layout.
 */

const logos = [
  {
    name: 'Linear',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/linear-1.svg',
    width: 84,
    height: 20,
  },
  {
    name: 'Vercel',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/vercel-3.svg',
    width: 90,
    height: 20,
  },
  {
    name: 'Notion',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/notion-wordmark-5.svg',
    width: 88,
    height: 20,
  },
  {
    name: 'Stripe',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/stripe-wordmark-7.svg',
    width: 80,
    height: 32,
  },
  {
    name: 'Life360',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/blacksmith-wordmark-9.svg', // Fallback to available asset if specific is missing
    width: 70,
    height: 24,
    label: 'Life360'
  },
  {
    name: 'Blacksmith',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/blacksmith-wordmark-9.svg',
    width: 120,
    height: 20,
  },
  {
    name: 'Reducto',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/reducto-11.svg',
    width: 100,
    height: 20,
  },
  {
    name: 'Tigris',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cfbe9038-8ecd-4e89-8472-fd4b3a6f8d2a-conductor-build/assets/svgs/tigris-12.svg',
    width: 80,
    height: 24,
  },
];

const TrustedBy = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center">
          {/* Section Label */}
          <p className="font-mono text-[12px] text-[#6B6B6B] mb-12 tracking-tight">
            Trusted by builders at
          </p>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12 md:gap-x-24 items-center justify-items-center w-full max-w-4xl mx-auto opacity-80">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
              >
                {/* 
                  Note: If an asset like 'Life360' is not in the provided svgs but is in the screenshot,
                  we rely on the Fallback Source rule. Since the instructions specifically mention
                  Linear, Vercel, Notion, and Stripe, we prioritize those.
                */}
                {logo.label === 'Life360' ? (
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full"></div>
                    </div>
                    <span className="font-sans font-bold text-lg tracking-tight text-[#1A1A1A]">Life360</span>
                  </div>
                ) : (
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain h-6 w-auto"
                    style={{ filter: 'brightness(0) saturate(100%)' }} // Ensures monochrome dark variant
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;