import en from "./en.json";
import de from "./de.json";
import es from "./es.json";

export { LANGS, isLang, type Lang } from "./langs";

import type { Lang } from "./langs";

export type Dict = typeof en;

/** Overlay a partial translation on top of English, so a key the translation
 *  script hasn't filled in yet renders in English instead of disappearing. */
function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return base;
    return base.map((item, i) => merge(item, over[i])) as T;
  }
  if (typeof base === "object") {
    const out = { ...(base as object) } as Record<string, unknown>;
    for (const key of Object.keys(out)) {
      out[key] = merge(out[key], (over as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}

const dicts: Record<Lang, Dict> = {
  en,
  de: merge(en, de),
  es: merge(en, es),
};

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? en;
}
