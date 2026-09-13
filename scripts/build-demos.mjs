#!/usr/bin/env node
/**
 * Builds the two live player demos (Barcelona, New York) shown at /examples
 * and copies the static output into public/demo/<name>/. Manual, on-demand —
 * never runs as part of `npm run build`, so the site's own build never
 * depends on player-react being checked out or buildable.
 *
 *   npm run demos:build
 *
 * Needs a sibling clone of player-react (default: ../player-react, override
 * with PLAYER_REPO_PATH) with `bun install` already run and the
 * `feat/multi-deployment-tours` deployment tooling (scripts/deployments/) —
 * see that repo's scripts/deployments/README.md.
 *
 * Two fixes are required to host a player-react build under a site subpath
 * like /demo/<name>/ instead of at its own domain root, applied here as
 * temporary, uncommitted edits to the player-react checkout (reverted via
 * `git checkout` immediately after each build):
 *
 *   1. index.html hardcodes `navigator.serviceWorker.register("/sw.js", {
 *      scope: "/" })`. Registering that from /demo/<name>/ would give the
 *      service worker control of this ENTIRE site's origin, not just the
 *      demo — disabled for these builds.
 *   2. src/index.tsx's <BrowserRouter> has no basename, so client-side
 *      routes resolve from "/" instead of "/demo/<name>/". Fixed by passing
 *      Vite's BASE_URL (trailing slash stripped — Next always serves this
 *      route without one, and react-router's prefix match needs both sides
 *      to agree) as the router basename.
 *
 * A third issue is data, not code: app.json / metadata.json store image URLs
 * as root-relative paths ("/images/app/hero.webp"), which is correct for a
 * root deployment but 404s under a subpath. Rewritten below by rewriting the
 * staged JSON in place before building (mirrors what player-react's own
 * `--remote-assets` build flag does, just targeting a local subpath instead
 * of a remote R2 URL).
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, cpSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAYER_REPO = path.resolve(SITE_ROOT, process.env.PLAYER_REPO_PATH || "../player-react");

const DEPLOYMENTS = ["barcelona", "new-york"];

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

function patchPlayerRepo() {
  const indexHtml = path.join(PLAYER_REPO, "index.html");
  const html = readFileSync(indexHtml, "utf8");
  const patchedHtml = html.replace(
    `"serviceWorker" in navigator &&\n                !/localhost/.test(window.location)\n            ) {`,
    `"serviceWorker" in navigator &&\n                !/localhost/.test(window.location) &&\n                false /* disabled for this build: hardcoded scope:"/" would hijack the parent origin when embedded under a subpath */\n            ) {`
  );
  if (patchedHtml === html) throw new Error("index.html: service-worker registration block not found — player-react may have changed, update the patch in build-demos.mjs");
  writeFileSync(indexHtml, patchedHtml);

  const indexTsx = path.join(PLAYER_REPO, "src/index.tsx");
  const tsx = readFileSync(indexTsx, "utf8");
  const patchedTsx = tsx.replace(
    "<BrowserRouter>",
    "<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\\/$/, '') || '/'}>"
  );
  if (patchedTsx === tsx) throw new Error("src/index.tsx: <BrowserRouter> not found — update the patch in build-demos.mjs");
  writeFileSync(indexTsx, patchedTsx);
}

function revertPlayerRepoPatch() {
  run("git checkout -- index.html src/index.tsx", PLAYER_REPO);
}

/** Rewrite root-relative "/images/..." and "/audio/..." asset paths in the staged
 * tour JSON to live under the demo's own base path, so they resolve once hosted
 * at /demo/<name>/ instead of "/". Remote (https://...) URLs are untouched — they
 * never start with a bare "/images/" or "/audio/" string. */
function rewriteLocalAssetPaths(base) {
  const tourDataDir = path.join(PLAYER_REPO, "src/data/tour");
  const jsonFiles = [];
  for (const name of readdirSync(tourDataDir)) {
    if (name === "_fixture") continue;
    const entryPath = path.join(tourDataDir, name);
    if (statSync(entryPath).isDirectory()) {
      for (const file of readdirSync(entryPath)) {
        if (file.endsWith(".json")) jsonFiles.push(path.join(entryPath, file));
      }
    } else if (name.endsWith(".json")) {
      jsonFiles.push(entryPath); // app.json
    }
  }

  for (const filePath of jsonFiles) {
    const text = readFileSync(filePath, "utf8");
    const rewritten = text
      .replaceAll('"/images/', `"${base}images/`)
      .replaceAll('"/audio/', `"${base}audio/`);
    if (rewritten !== text) writeFileSync(filePath, rewritten);
  }
}

function buildDeployment(name) {
  const base = `/demo/${name}/`;
  console.log(`\n=== Building "${name}" (base ${base}) ===`);

  run(`bun scripts/deployments/use.ts ${name}`, PLAYER_REPO);
  rewriteLocalAssetPaths(base);

  const distDir = path.join(PLAYER_REPO, "dist-demo", name);
  rmSync(path.join(PLAYER_REPO, "dist"), { recursive: true, force: true });
  rmSync(distDir, { recursive: true, force: true });
  run(`bunx vite build --base=${base} --outDir dist-demo/${name}`, PLAYER_REPO);

  const dest = path.join(SITE_ROOT, "public/demo", name);
  rmSync(dest, { recursive: true, force: true });
  cpSync(distDir, dest, { recursive: true });
  rmSync(distDir, { recursive: true, force: true });

  // barcelona's tour JSON is git-tracked in player-react; discard our rewrite.
  if (name === "barcelona") {
    run("git checkout -- src/data/tour/barcelona", PLAYER_REPO);
  }

  console.log(`✓ Copied to public/demo/${name}/`);
}

if (!existsSync(PLAYER_REPO)) {
  console.error(`player-react checkout not found at ${PLAYER_REPO} (set PLAYER_REPO_PATH to override)`);
  process.exit(1);
}

patchPlayerRepo();
try {
  for (const name of DEPLOYMENTS) buildDeployment(name);
} finally {
  revertPlayerRepoPatch();
  // Leave the player-react checkout on its own documented default.
  run("bun scripts/deployments/use.ts barcelona", PLAYER_REPO);
  run("git checkout -- src/data/tour/barcelona", PLAYER_REPO);
}

console.log("\nAll demos built. Review the public/demo/ diff and commit if it looks right.");
