'use client';

import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScOo7TDCIwDZaHCSnb7Bc0UWAwbsAYYDDhhcUqQyNYpHRPRNA/formResponse';
  const EMAIL_ENTRY_ID = 'entry.770250772';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !GOOGLE_FORM_URL || !EMAIL_ENTRY_ID) return;

    setStatus('loading');

    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, email);

    try {
      // Use no-cors mode as Google Forms doesn't support CORS for direct AJAX submissions
      // This means we won't know for sure if it succeeded, but we assume it did if no network error
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setStatus('success');
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-secondary/30 p-8 rounded-xl border border-border">
      <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
        SUBSCRIBE_FOR_UPDATES
      </span>
      <h3 className="text-xl font-bold text-foreground mb-2">No spam. No marketing. Just updates.</h3>
      <p className="text-[14px] text-muted-foreground mb-8">
      New features and technical guides, straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-grow bg-background border border-border px-4 py-2 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-primary font-mono transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-primary text-primary-foreground px-8 py-2 rounded-full text-[13px] font-bold hover:opacity-90 transition-all uppercase tracking-widest flex items-center justify-center min-w-[120px] disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            'Subscribe'
          )}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-[12px] text-destructive font-mono">
          Submission failed. Please try again.
        </p>
      )}

      {status === 'success' && (
        <p className="mt-2 text-[12px] text-primary font-mono">
          You have been added to the list.
        </p>
      )}
    </div>
  );
}
