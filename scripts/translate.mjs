#!/usr/bin/env node
/**
 * Translates the landing-page dictionary with DeepL.
 *
 * Only strings that CHANGED since the last successful run are sent — the diff
 * is against src/content/landing/_translated-en.json, a committed snapshot of
 * the English source as of that run.
 *
 *   npm run translate              # translate what changed
 *   npm run translate -- --dry-run # report what would be sent, call nothing
 *   npm run translate -- --force   # re-translate everything
 *
 * Needs DEEPL_API_KEY (read from .env.local or the environment).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "content", "landing");
const SNAPSHOT = path.join(DIR, "_translated-en.json");
const LANGS = ["de", "es"];
const BATCH = 50; // DeepL's max texts per request

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes("--dry-run");
const FORCE = argv.includes("--force");

const readJson = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {});
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");

/** Flatten to "a.b.0.c" -> string. Only string leaves are translatable. */
function flatten(node, prefix = "", out = {}) {
  if (typeof node === "string") {
    out[prefix] = node;
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      flatten(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

/** Rebuild the nested shape of `template` using values from a flat map. */
function unflatten(template, flat, prefix = "") {
  if (typeof template === "string") return flat[prefix];
  if (Array.isArray(template)) {
    return template.map((item, i) => unflatten(item, flat, `${prefix}.${i}`));
  }
  const out = {};
  for (const [key, value] of Object.entries(template)) {
    out[key] = unflatten(value, flat, prefix ? `${prefix}.${key}` : key);
  }
  return out;
}

const hrefs = (text) => [...text.matchAll(/<a href="([^"]+)">/g)].map((m) => m[1]).sort().join("|");

async function deepl(key, texts, target, html) {
  const base = key.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  const out = [];

  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const response = await fetch(`${base}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch,
        source_lang: "EN",
        target_lang: target.toUpperCase(),
        preserve_formatting: true,
        // Only the strings carrying <a> anchors get HTML parsing; plain prose
        // stays plain so DeepL never entity-escapes an ampersand.
        ...(html ? { tag_handling: "html" } : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL ${target} ${response.status}: ${(await response.text()).slice(0, 300)}`);
    }
    out.push(...(await response.json()).translations.map((entry) => entry.text));
  }
  return out;
}

/** `npm run translate -- --self-check` — the shape round-trip and the anchor
 *  guard are the two things that silently corrupt output if they break. */
function selfCheck() {
  const assert = (ok, msg) => {
    if (!ok) throw new Error(`self-check failed: ${msg}`);
  };

  const sample = {
    a: "one",
    nested: { b: "two", list: ["x", "y"] },
    items: [{ q: "q1", a: "a1" }, { q: "q2", a: "a2" }],
  };
  const flat = flatten(sample);
  assert(flat["nested.list.1"] === "y", "flatten misses array elements");
  assert(flat["items.1.q"] === "q2", "flatten misses object-in-array");
  assert(Object.keys(flat).length === 8, `expected 8 leaves, got ${Object.keys(flat).length}`);
  assert(
    JSON.stringify(unflatten(sample, flat)) === JSON.stringify(sample),
    "flatten -> unflatten is not a round-trip",
  );

  // unflatten rebuilds English's shape, so a translated value lands in place
  // and arrays keep their length.
  const translated = unflatten(sample, { ...flat, "items.0.a": "übersetzt" });
  assert(translated.items[0].a === "übersetzt", "unflatten drops translated values");
  assert(translated.items.length === 2, "unflatten changes array length");

  // The anchor guard must reject a dropped, added, or renamed href.
  const src = 'The <a href="/docs">docs</a> and <a href="#issue">an issue</a>.';
  assert(hrefs(src) === hrefs('Die <a href="#issue">ein Issue</a> und <a href="/docs">Doku</a>.'),
    "anchor guard should ignore anchor order");
  assert(hrefs(src) !== hrefs('Die <a href="/docs">Doku</a>.'), "anchor guard misses a dropped link");
  assert(hrefs(src) !== hrefs('Die <a href="/doku">Doku</a> und <a href="#issue">ein Issue</a>.'),
    "anchor guard misses a renamed href");
  assert(hrefs("no anchors here") === "", "hrefs should be empty for plain text");

  console.log("self-check passed");
}

async function main() {
  if (argv.includes("--self-check")) return selfCheck();

  try {
    process.loadEnvFile?.(path.join(DIR, "..", "..", "..", ".env.local"));
  } catch {
    /* no .env.local — fall back to the ambient environment */
  }

  const en = readJson(path.join(DIR, "en.json"));
  const snapshot = FORCE ? {} : readJson(SNAPSHOT);
  const source = flatten(en);
  const snapFlat = flatten(snapshot);

  const key = process.env.DEEPL_API_KEY;
  if (!key && !DRY_RUN) {
    console.error("DEEPL_API_KEY is not set (put it in .env.local).");
    process.exit(1);
  }

  let sentTotal = 0;
  const mangled = [];

  for (const lang of LANGS) {
    const file = path.join(DIR, `${lang}.json`);
    const existing = flatten(readJson(file));

    // Drop keys that no longer exist in English, then find what needs work.
    const kept = {};
    for (const p of Object.keys(source)) {
      if (existing[p] !== undefined) kept[p] = existing[p];
    }
    const stale = Object.keys(source).filter((p) => kept[p] === undefined || source[p] !== snapFlat[p]);

    if (stale.length === 0) {
      console.log(`${lang}: 0 keys — up to date`);
      continue;
    }
    if (DRY_RUN) {
      console.log(`${lang}: would send ${stale.length} keys`);
      for (const p of stale) console.log(`    ${p}`);
      sentTotal += stale.length;
      continue;
    }

    const plain = stale.filter((p) => !source[p].includes("<a href="));
    const rich = stale.filter((p) => source[p].includes("<a href="));

    const results = [
      ...(await deepl(key, plain.map((p) => source[p]), lang, false)).map((text, i) => [plain[i], text]),
      ...(await deepl(key, rich.map((p) => source[p]), lang, true)).map((text, i) => [rich[i], text]),
    ];

    // A dropped or renamed anchor silently kills a link on the page. Collect
    // every offender across both languages so one run surfaces all the source
    // strings that need rewording, rather than one per attempt.
    for (const [p, text] of results) {
      if (hrefs(source[p]) !== hrefs(text)) {
        mangled.push({ lang, path: p, en: source[p], out: text });
        continue;
      }
      kept[p] = text;
    }
    if (mangled.length) continue;

    writeJson(file, unflatten(en, kept));
    console.log(`${lang}: translated ${stale.length} keys -> ${path.relative(process.cwd(), file)}`);
    sentTotal += stale.length;
  }

  if (DRY_RUN) {
    console.log(`\nDry run — nothing sent. ${sentTotal} keys are stale.`);
    return;
  }

  if (mangled.length) {
    console.error(
      `\n${mangled.length} string(s) lost or renamed an anchor in translation. ` +
        `Reword the English source so each <a> wraps a self-contained phrase ` +
        `(a compound noun the target language can keep in one piece), then re-run.\n`,
    );
    for (const m of mangled) {
      console.error(`  ${m.path} [${m.lang}]\n    en: ${m.en}\n    ${m.lang}: ${m.out}\n`);
    }
    process.exit(1);
  }

  // Only now, with every language written, is the snapshot safe to advance.
  // A failure above leaves it stale so the next run retries the whole set.
  writeJson(SNAPSHOT, en);
  console.log(sentTotal === 0 ? "\nNothing to do." : `\nDone — ${sentTotal} keys translated.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
