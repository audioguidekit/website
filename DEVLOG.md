## 2026-06-06

### Rewrote public/llms.txt and llms-full.txt to match the real app
The two LLM-discovery files described a different product than the docs: they claimed a Next.js 15 + Tailwind stack with a fabricated `guide.json` / `config.json` / `branding` config and a made-up `npx create-audioguidekit-player` CLI, and omitted the real feature set. Rewrote both from verified ground truth: the player is **Vite 6 + React 19 + TypeScript + styled-components + React Router + Leaflet + PWA (vite-plugin-pwa/Workbox) + IndexedDB**, configured via `metadata.json` + per-language files with a `themeId`, installed via `git clone` + `bun`. Added the actual features (12 stop types, map view, translations, deep linking, feedback, themes) and the real `metadata.json` / stop field tables. Per the user's call (consistent with the earlier "Remove cost comparisons" commit), stripped all fabricated dollar figures and cost-comparison tables, keeping the qualitative value prop.

**Root cause / approach:** The llms files had drifted to describe the *marketing site's* stack (Next.js/Tailwind) rather than the *player* product they're meant to document. Verified stack from `player-react/package.json`, config/field names from `types.ts` + the generated schema, install flow from the docs, and license from `player-react/LICENSE` (MIT).

→ *Memory updated: `docs-sync-from-player-react.md`*

### Synced map docs with player-react: listView, mapMarker modes, mapMarkerIcon
Updated `content/docs/features/map.mdx` and `content/docs/content/creating-guide.mdx` to match the latest `player-react/docs/map.md`. Added the new **View modes** section (`listView` flag, map/list combination table), replaced the old `mapMarkerNumber: false` "Marker numbers" section with **Marker styles** (`mapMarker: "number" | "image" | "empty"`, including image markers + a precedence list), and fixed the tour-level custom-icon field name. Also added the missing `dark_nolabels` CARTO style and fixed the `imageColor` field (was wrongly documented as `backgroundColor`) in branding/overview.mdx earlier.

**Root cause / approach:** `player-react/.private/DEVLOG.md` gives the change overview, but its narrative named fields (`mapMarkerCustomIcon`, `mapMarkerNumber`) that were intermediate and got renamed before shipping. The real fields are `mapMarker` (enum) and tour-level `mapMarkerIcon` — verified against `types.ts` + the generated JSON schema, which are the source of truth, not the prose DEVLOG.

→ *Memory saved: `docs-sync-from-player-react.md`*

## 2026-06-01

### Removed CostComparison block from homepage
- felt bit salesy, removed it, still available in /components/sections/cost-comparisons.tsx

### Added map view documentation page
Created `content/docs/features/map.mdx` from the player-react `docs/map.md` source. Adapted technical internals doc into the site's user-facing MDX format: reordered sections for a "getting started first" flow, rewrote for non-technical readers, applied MDX components (Warning, Note, Tip), and preserved all metadata.json field references.

**Root cause / approach:** The source doc was written for developers reading the player-react repo directly; the marketing site docs assume museum staff who may not know JSON. Conversion required restructuring from "here's everything" to "enable it, add pins, pick a provider, customize."

→ *Memory saved: No new memory entries.*
