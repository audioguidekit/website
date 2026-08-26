## 2026-08-26

### Landing page i18n (DE + ES) with a DeepL sync script
Extracted ~1,150 words of landing copy out of 13 section components into `src/content/landing/en.json`, added `/de` and `/es` as statically generated pages, an Accept-Language redirect on `/` with a cookie override, a bottom-of-page language switcher, and `npm run translate` — a deterministic script that sends only strings changed since the last successful run to DeepL. No i18n dependency added; every landing component takes an optional `t` prop defaulting to its English slice, so `/docs`, `/notes` and `not-found` (which also render `Navigation`/`Footer`) are untouched.

**Root cause / approach:** Two landmines that aren't visible from a skim. (1) `faq.tsx` injected all 7 in-answer links by `split()`-ing each answer on a regex of literal English phrases — any translation would silently produce link-free plain text, no error. Replaced with real `<a href="TOKEN">` markup in the dictionary, `tag_handling: "html"` on DeepL (in a batch separate from plain prose, so DeepL never entity-escapes an ampersand), and a shared `RichText` renderer mapping tokens to elements; the script hard-fails if a translation drops or renames an href. (2) App Router root layouts can't read a child segment's param, so `<html lang>` can't be per-locale without splitting every route into an `(en)` group — corrected client-side instead, with server-rendered hreflang tags carrying the real signal. Also: change detection is a committed snapshot of `en.json` rather than hashes, so `git diff` shows exactly what will be re-sent, and the snapshot only advances after *every* language succeeds — a partial failure retries the whole changed set.

**What the live DeepL run exposed (all silent failures):** the hero headline was split across two
keys, so DeepL translated `"An open-source"` blind and invented a noun (`"Ein Open-Source-Projekt"`)
— fixed by making each key a phrase that stands alone. German compounded
`step-by-step <a>documentation</a>` into one word and *dropped the anchor*, and
`<a>Contact us to discuss your requirements</a>` came back as *two* anchors around a German comma
clause — the anchor guard caught both, and the fix is wording each `<a>` as a self-contained noun
phrase. And `<html lang>` had to become a `useEffect` in the switcher rather than an inline script,
because a script doesn't re-run on client-side navigation between /de and /es.

Switcher sits in the footer's `System_Online` row; `Footer` renders it only when given a `lang`
prop, so the 404 page (which also uses `Footer`) doesn't get one.

→ *Memory saved: `landing-i18n-deepl.md`*

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
