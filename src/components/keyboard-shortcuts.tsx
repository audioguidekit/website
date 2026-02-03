'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (event.key.toLowerCase() === 'g') {
        window.location.href = 'https://github.com/audioguidekit/player-react';
      }

      if (event.key.toLowerCase() === 'd') {
        window.location.href = '/docs';
      }

      if (event.key.toLowerCase() === 'c') {
        navigator.clipboard.writeText('npx create-audioguidekit-player my-project');
        toast.success('Command copied to clipboard');
        window.dispatchEvent(new CustomEvent('terminal-copy'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
