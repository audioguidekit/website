'use client';

import React from "react";
import { Navigation } from "@/components/sections/navigation";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SimpleFooter } from "@/components/sections/simple-footer";

type ChangelogTag = "Release" | "New" | "Improved" | "Fixed";

type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  tag: ChangelogTag;
  description: React.ReactNode;
};

const owner = process.env.GITHUB_OWNER || "audioguidekit";
const repo = process.env.GITHUB_REPO || "player-react";

const tagStyles: Record<ChangelogTag, string> = {
  Release: "text-violet-700 dark:text-violet-400 bg-violet-500/10",
  New: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10",
  Improved: "text-blue-700 dark:text-blue-400 bg-blue-500/10",
  Fixed: "text-amber-700 dark:text-amber-400 bg-amber-500/10",
};

function groupByDate(entries: ChangelogEntry[]) {
  const groups: { date: string; entries: ChangelogEntry[] }[] = [];
  for (const entry of entries) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === entry.date) {
      lastGroup.entries.push(entry);
    } else {
      groups.push({ date: entry.date, entries: [entry] });
    }
  }
  return groups;
}

// Newest first.
const changelog: ChangelogEntry[] = [
  {
    id: "multi-tour",
    date: "Sep 12, 2026",
    title: "Multiple tours in one app",
    tag: "New",
    description: (
      <>
        Ship several tours from a single deployment. Visitors get a themeable tour-selection screen with app-level branding (logo, hero, splash), and each tour keeps its own map, marker, and route configuration.
        Read the{" "}
        <Link href="/docs/content/multi-tour" className="underline hover:text-foreground transition-colors">
          docs
        </Link>{" "}
        or try the{" "}
        <a
          href="/demo/new-york"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          New York demo
        </a>
        .
      </>
    ),
  },
  {
    id: "map-marker-route-colors",
    date: "Sep 12, 2026",
    title: "Per-tour map marker and route colors",
    tag: "New",
    description:
      "With the introduction of multiple tours in one app, we added support for per-tour marker overrides (color, weight, opacity, dash pattern) – this lets you restyle a tour's markers and route line to match its own basemap or branding – no new theme required.",
  },
  {
    id: "default-basemap",
    date: "Sep 12, 2026",
    title: "OpenFreeMap replaces Carto as default provider",
    tag: "Improved",
    description:
      "The map now defaults to OpenFreeMap, so map view renders out of the box with no API key or usage quota to configure.",
  },
  {
    id: "custom-map-style",
    date: "Sep 12, 2026",
    title: "Bring your own vector map style",
    tag: "New",
    description:
      "The map now renders vector tiles natively alongside the existing raster providers. Bring your own map style as style.json file to render a fully custom vector basemap, crisp at every zoom level, with no tile server of your own to run.",
  },
  {
    id: "outdoor-maps",
    date: "Jun 6, 2026",
    title: "Outdoor guides with map view",
    tag: "New",
    description:
      "Outdoor tours are now supported with a full map view, marker styles, and list/map combination modes.",
  },
  {
    id: "offline-playback",
    date: "Feb 2026",
    title: "Better offline playback",
    tag: "Improved",
    description:
      "Improved reliability of offline audio playback so guides keep working without a connection once downloaded.",
  },
  {
    id: "alt-layout",
    date: "Feb 2026",
    title: "Customizable layout options",
    tag: "New",
    description:
      "Added support for different layout options for the main UI and player, selectable per deployment.",
  },
  {
    id: "themes",
    date: "Feb 2026",
    title: "Themes support",
    tag: "New",
    description:
      "The player enables you to define your own theme and branding. By default, it ships with customizable light and dark themes out of the box.",
  },
  {
    id: "v1",
    date: "Feb 2026",
    title: "Released v1.0.0",
    tag: "Release",
    description: "First stable release of the audio guide player.",
  },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Navigation />

      <main className="w-full max-w-[1400px] border-x border-border relative pt-32 pb-24 min-h-[90vh]">
        {/* Intersection Markers */}
        <div className="absolute top-32 -left-[5px] w-[10px] h-[10px] flex items-center justify-center text-border z-20">
          <div className="absolute w-px h-full bg-border" />
          <div className="absolute h-px w-full bg-border" />
        </div>
        <div className="absolute top-32 -right-[5px] w-[10px] h-[10px] flex items-center justify-center text-border z-20">
          <div className="absolute w-px h-full bg-border" />
          <div className="absolute h-px w-full bg-border" />
        </div>

        <div className="max-w-[672px] mx-auto px-4 sm:px-8 relative z-10">
          <header className="mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium tracking-widest text-muted-foreground bg-secondary uppercase border border-border rounded">
                CHANGELOG
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6">
              Changelog
            </h1>
            <p className="text-[18px] text-muted-foreground leading-relaxed">
              What&apos;s shipped, as it ships.{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/17VvcMKVEXHMuCPpiul2ugfMSrXd8Xbj6V98JvUUYFpM/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                See what&apos;s planned next
              </a>{" "}
              in the roadmap spreadsheet — feel free to leave comments there.
            </p>
          </header>

          <div className="relative">
            <div className="absolute left-[6px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {groupByDate(changelog).map((group) => (
                <div key={group.date} className="relative grid grid-cols-1 gap-3 sm:grid-cols-[110px_1fr] sm:gap-8">
                  <div className="absolute left-0 top-[6px] w-[13px] h-[13px] rounded-full bg-background border-2 border-muted-foreground/40" />
                  <span className="pl-6 text-[13px] font-mono text-muted-foreground pt-px">
                    {group.date}
                  </span>

                  <div className="space-y-8 pl-6 sm:pl-0">
                    {group.entries.map((entry) => (
                      <div key={entry.id}>
                        <div className="flex items-center gap-2 mb-3">
                          <h2 className="text-[18px] font-semibold text-foreground">
                            {entry.title}
                          </h2>
                          <span
                            className={`px-2 py-0.5 text-[11px] font-mono font-medium tracking-wider uppercase rounded shrink-0 ${tagStyles[entry.tag]}`}
                          >
                            {entry.tag}
                          </span>
                        </div>
                        <p className="text-[15px] text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 pl-8">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-mono text-[11px] uppercase tracking-wider h-9"
              >
                <a
                  href={`https://github.com/${owner}/${repo}/commits/main/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  View full history on GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <SimpleFooter className="mt-32" />
        </div>
      </main>
    </div>
  );
}
