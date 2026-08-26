import React, { Fragment, type ReactNode } from "react";

/** Matches the anchors authored in the landing dictionary, e.g.
 *  `<a href="/docs">documentation</a>`. DeepL is called with
 *  tag_handling: "html" for these strings, so the tags survive translation
 *  while the text around them gets reordered per language. */
const ANCHOR = /<a href="([^"]+)">(.*?)<\/a>/g;

interface RichTextProps {
  text: string;
  /** href token -> element renderer. An href with no entry degrades to plain
   *  text rather than throwing, so a mangled translation never breaks a page. */
  links: Record<string, (children: ReactNode) => ReactNode>;
}

export function RichText({ text, links }: RichTextProps) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(ANCHOR)) {
    const at = match.index ?? 0;
    if (at > cursor) parts.push(text.slice(cursor, at));
    const render = links[match[1]];
    parts.push(render ? render(match[2]) : match[2]);
    cursor = at + match[0].length;
  }
  parts.push(text.slice(cursor));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
