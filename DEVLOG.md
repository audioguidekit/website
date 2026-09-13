## 2026-09-13

### Added live player demos (Barcelona, New York) at /demo/*
Built two real player-react deployments (the tracked `barcelona` demo tour, and the `new-york` tours-content deployment — a multi-tour bundle of "New York" + "Lower Manhattan") into static output and hosted them on this site at `/demo/barcelona` and `/demo/new-york` via a Next.js route handler (`src/app/demo/[deployment]/[[...slug]]/route.ts`) that SPA-falls-back to each build's `index.html`. Surfaced from three places only (no dedicated showcase page — tried a `/examples` page + nav/footer links first, reverted per feedback that it was more than asked for): the hero's floating phone mockup and the existing "Try the player" section now point at the local `/demo/barcelona` demo instead of the old `audioguidekit.vercel.app` hosted instance (with a hover-shadow affordance added to the phone mockup), and the `/updates` changelog's multi-tour entry links to both the docs page and the New York demo.

**Root cause / approach:** Hosting an SPA build under a subpath of an already-running site (rather than its own domain root) hits two sharp edges neither obvious from player-react's own docs: (1) its `index.html` hardcodes `navigator.serviceWorker.register("/sw.js", { scope: "/" })` — registering that from `/demo/barcelona/` would hand a service worker control of the **entire parent origin**, silently hijacking every request the marketing site makes for any visitor who opens a demo page. Disabled for these builds only (temporary, uncommitted edit to player-react, reverted after each build). (2) `BrowserRouter` has no `basename`, so it always resolves from `/`. Fixed by passing Vite's `import.meta.env.BASE_URL` — but that constant always carries a trailing slash, while Next.js always strips the trailing slash from the served URL (`/demo/barcelona/` 308s to `/demo/barcelona`) — the mismatch makes every react-router route silently fail to match (blank page, no error, nothing in the console) because `"/demo/barcelona".startsWith("/demo/barcelona/")` is false. Fixed by stripping the trailing slash before passing it as `basename`. A third, data-only issue: `app.json`/`metadata.json` store image URLs as root-relative paths (`/images/app/hero.webp`), correct for a root deployment but 404-equivalent (broken `<img>`, black splash) under a subpath — fixed by rewriting those paths to `/demo/<name>/images/...` in the staged JSON before building, mirroring what player-react's own `--remote-assets` build flag already does for R2 URLs.

Consolidated all of this into `scripts/build-demos.mjs` (`npm run demos:build`) — manual/on-demand only, never part of this site's own build, so the site never depends on a player-react checkout existing. Points at a sibling `../player-react` clone by default (`PLAYER_REPO_PATH` to override).

→ *Memory saved: `player-react-subpath-hosting.md`*

## 2026-09-12

### Reworked /updates from a roadmap into a traditional changelog
Replaced the 3-lane Planned/In Progress/Delivered roadmap (with quarter estimates) on `src/app/updates/page.tsx` with a single chronological timeline of shipped entries only — date, title, category tag, short description. Quarter estimates created false commitments for unshipped work and gave delivered items no room to explain what changed. The Google Sheet roadmap link moved into the intro paragraph, reframed as "what's planned next" rather than being enumerated on-page.

**Root cause / approach:** Data model collapsed from `RoadmapItem`/`DeliveredItem` to one `ChangelogEntry[]` (date, title, tag, description), still hand-curated directly in the page file — no new content pipeline. Seeded from real shipped milestones already in this DEVLOG/repo history.

→ *No new memory entries — a self-contained UI rewrite with no non-obvious gotchas.*

## 2026-08-26

### Fixed DE/ES translation errors found in a full read-through review
Read `de.json`/`es.json` end-to-end as landing copy (not string-by-string) and found DeepL had produced several real errors: "Fully yours" → literal letter sign-offs ("Mit freundlichen Grüßen"/"Atentamente") in both languages, ES "Online + Offline" → "En línea + Presencial" (in-person, the opposite of offline), "stops" (tour stops) → "pauses/breaks" in both languages, mismatched roadmap terminology between an FAQ question and its answer, and light/dark toggle labels that didn't match their own aria-label wording. Also found DE silently drifting between "Sie" and "du" mid-page.

**Root cause / approach:** Fixed at the English source (ambiguous phrasing is what DeepL mistranslates) rather than hand-patching target files, then re-ran `npm run translate`. The Sie/du drift got a systemic fix: added `formality: "more"` to the DE DeepL call in `scripts/translate.mjs` — a per-call knob, not a per-string reword. A `--force` full retranslation (needed so formality applied everywhere) introduced 3 incidental wording regressions elsewhere in the file, caught by reviewing the full diff afterward and reverted individually.

→ *No new memory entries — [[landing-i18n-deepl]] already covers the workflow; this was applying it, not learning something new about it.*

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

**Follow-up bug — switching /de → English still showed German.** `next/link` prefetches `/` as soon
as the footer switcher scrolls into view, before any `lang` cookie exists, so middleware redirected
the *prefetch* and Next's router cached "/ = the German payload"; the later click just replayed it.
Trying to skip prefetches in middleware is a dead end: Next 15.5 strips `RSC` and
`Next-Router-Prefetch` before middleware runs (it sees only accept, accept-language, host,
user-agent, x-forwarded-*, confirmed by echoing the header keys back on the redirect). Fixed on the
client instead — the switcher uses a plain `<a>` (no prefetch, real navigation, so the cookie set in
the same click is already there when middleware runs), and the nav logo now points at the current
locale's home rather than always `/`.

→ *Memory saved: `landing-i18n-deepl.md`*

## 2026-08-21

### Added AGENTS.md to player-react so the doc pointer survives the copy-paste prompt
`src/components/ui/agent-prompt-copy.tsx` ships a "Copy agent prompt" button whose text tells the agent to read `docs/adding-tours.md` and `docs/themes.md` after cloning player-react — but that instruction only existed in this one-off prompt, with nothing durable in the cloned repo itself for a later session (or a different agent) to rediscover. Added `player-react/AGENTS.md`: setup commands plus pointers to `docs/adding-tours.md`, `docs/themes.md`, `docs/README.md`, and `llms.txt`. Committed to `dev`, cherry-picked alone onto `main`, tagged/released as `player-react` `v1.1.0` (per user's choice — the other 7 unreleased `dev` commits, multi-tour/map/splash/etc., stay unreleased for now).

**Root cause / approach:** Checked whether a `CLAUDE.md` would also help — player-react's own `.gitignore` excludes `CLAUDE.md`, so one would be invisible to every future clone; `AGENTS.md` is the file that actually ships. No file existed in either name before this.

→ *No new memory entries — the "docs mirror player-react" fact this touches is already captured in `docs-sync-from-player-react.md`.*

## 2026-06-09

### Documented multi-tour support (selection screen + app.json)
The player gained multi-tour support (player-react commit `5774613`): several tours per deployment, each in its own `src/data/tour/<id>/` folder, with a tour-selection screen themed by an optional app-level `app.json`. Added a new docs page `content/docs/content/multi-tour.mdx` (wired into `src/lib/docs/navigation.ts` under Content creation), cross-linked it from `creating-guide.mdx` and `content/overview.mdx`, and added the feature + `app.json` config to both `public/llms.txt` and `public/llms-full.txt`.

**Root cause / approach:** The player-react `docs/multi-tour.md` is still uncommitted (working-tree only), so per the established rule I verified every `app.json` field against `player-react/types.ts` (`AppConfig` / `TourCardConfig`) and the generated `src/schema/app-config.schema.json` rather than trusting prose — they matched exactly. Build gotcha: the docs `CLAUDE.md` advertises `<Info>`/`<Check>` callouts but only `Note`/`Warning`/`Tip` are registered in `mdx-components.tsx`; `<Info>` compiled fine but broke static prerender. Swapped to `<Note>`.

→ *Memory updated: `docs-sync-from-player-react.md`*

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
