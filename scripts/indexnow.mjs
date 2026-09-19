#!/usr/bin/env node
/**
 * Notifies IndexNow (Bing, Yandex, Seznam, ...) that our URLs changed.
 * Pulls the live sitemap so it always matches what's actually deployed.
 *
 *   npm run indexnow          # submit every URL in the sitemap
 *   npm run indexnow -- <url> # submit just one URL
 */
const SITE = "https://audioguidekit.org";
const KEY = "bce09ff20c84335abf1e6afa5f5f7261";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const arg = process.argv[2];

const urlList = arg
  ? [arg]
  : await fetch(`${SITE}/sitemap.xml`)
      .then((res) => res.text())
      .then((xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log(`Submitted ${urlList.length} URL(s) — IndexNow responded ${res.status} ${res.statusText}`);
