'use client';

import React, { useRef } from 'react';
import { CopyButton } from './copy-button';

export function CodeBlockWrapper({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  const getCodeText = () => {
    if (ref.current) {
      const code = ref.current.querySelector('code');
      return code?.textContent || '';
    }
    return '';
  };

  return (
    <figure
      ref={ref}
      className={`relative group my-6 overflow-x-auto rounded-xl border border-[#e5e7eb] [&_pre]:bg-transparent [&_pre]:border-0 [&_pre]:my-0 [&_pre]:px-5 [&_pre]:py-4 ${className || ''}`}
      {...props}
    >
      {children}
      <CopyButton getText={getCodeText} />
    </figure>
  );
}
