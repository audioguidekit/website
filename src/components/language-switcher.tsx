"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Lang } from "@/content/landing";

const OPTIONS: { lang: Lang; href: string; label: string }[] = [
  { lang: "en", href: "/", label: "English" },
  { lang: "de", href: "/de", label: "Deutsch" },
  { lang: "es", href: "/es", label: "Español" },
];

/** Pins the choice so middleware stops redirecting `/` by Accept-Language. */
function pin(lang: Lang) {
  document.cookie = `lang=${lang};path=/;max-age=31536000;samesite=lax`;
}

/** Inline links styled to match the footer's System_Online row. */
export function LanguageSwitcher({ current }: { current: Lang }) {
  // ponytail: the root layout hardcodes <html lang="en"> and App Router layouts
  // can't read a child segment's param. This is the locale-aware client component
  // on every landing page, so it corrects the attribute here — an inline <script>
  // would not re-run on client-side navigation between /de and /es.
  // Proper fix is two root layouts via route groups ((en) / (intl)), which means
  // moving every existing route into (en)/. hreflang tags — what search engines
  // actually use for language targeting — are already server-rendered.
  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  return (
    <span className="flex items-center gap-3">
      {OPTIONS.map((option) => (
        <Link
          key={option.lang}
          href={option.href}
          hrefLang={option.lang}
          onClick={() => pin(option.lang)}
          aria-current={option.lang === current ? "true" : undefined}
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest transition-colors",
            option.lang === current
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </Link>
      ))}
    </span>
  );
}
