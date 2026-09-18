# AudioGuideKit Website

Code for site [audioguidekit.org](https://audioguidekit.org) — an open-source, self-hosted PWA audio guide player for museums and cultural institutions.

## About

AudioGuideKit is an open-source audio guide solution designed for museums, galleries, and cultural institutions:

- Self-hosted PWA player — works on any device without app stores
- Offline support — content caches automatically
- Multilingual — built-in support for multiple languages

The player component is available at [@audioguidekit/react-player](https://github.com/audioguidekit/react-player)

## Development

```bash
npm install
npm run dev
```
## Deployment
Auto-deploy to Vercel once the code is pushed ti Guthub. 

## Markdown for AI agents

`npm run build` converts every prerendered page into markdown in `public/md/` (gitignored) using the `web-for-agents` library, vendored as `vendor/web-for-agents-*.tgz` (its source is kept outside this repo). `src/middleware.ts` serves that markdown when an agent sends `Accept: text/markdown` or requests `/page.md`.

- **New pages** must set `alternates: { canonical: <own URL>, types: { 'text/markdown': mdPath(<path>) } }` in their metadata. The root layout deliberately sets no canonical, because Next merges `alternates` shallowly. A `'use client'` page gets its metadata from a route `layout.tsx` (see `src/app/updates/layout.tsx`).
- **Updating the library:** the site keeps using the vendored tarball until it's replaced. After changing web-for-agents, run `npm pack --pack-destination <this repo>/vendor` in the library, delete the old tarball, point `package.json` at the new file, run `npm install`, and commit the tarball with the lockfile.
- **Check after deploy:** `curl -H "accept: text/markdown" https://audioguidekit.org/docs` should return `text/markdown`.

## License

MIT
