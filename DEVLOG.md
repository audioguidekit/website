## 2026-06-01

### Added map view documentation page
Created `content/docs/features/map.mdx` from the player-react `docs/map.md` source. Adapted technical internals doc into the site's user-facing MDX format: reordered sections for a "getting started first" flow, rewrote for non-technical readers, applied MDX components (Warning, Note, Tip), and preserved all metadata.json field references.

**Root cause / approach:** The source doc was written for developers reading the player-react repo directly; the marketing site docs assume museum staff who may not know JSON. Conversion required restructuring from "here's everything" to "enable it, add pins, pick a provider, customize."

→ *Memory saved: No new memory entries.*
