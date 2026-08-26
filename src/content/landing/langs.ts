/** Kept free of JSON imports so middleware (Edge runtime) can read LANGS
 *  without pulling every translation dictionary into its bundle. */
export const LANGS = ["de", "es"] as const;

export type Lang = "en" | (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return value === "en" || (LANGS as readonly string[]).includes(value);
}
