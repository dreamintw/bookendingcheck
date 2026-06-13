// AdSense Review Mode — index allowlist.
// Anything not listed here is served with <meta name="robots" content="noindex,follow">
// and excluded from sitemap-simple.xml / sitemap.xml.
// Keep this single source of truth so route heads and the sitemap builder agree.

export const NOINDEX_META = { name: "robots", content: "noindex,follow" } as const;

// Top-level paths (no /en or /zh prefix) that stay indexable.
export const HUB_PATHS = [
  "",                  // /en, /zh
  "/books",
  "/warnings",
  "/about",
  "/contact",
  "/privacy",
  "/disclaimer",
  "/editorial-policy",
  // Phase 2 — thickened tag-cloud hubs now have intros, FAQs, JSON-LD,
  // and curated internal links. Detail pages under each remain noindex.
  "/authors",
  "/collections",
  "/genres",
  "/endings",
] as const;

export const COLLECTION_ALLOW = new Set<string>([
  "pet-death-warning",
  "sad-ending-books",
  "happy-ending-books",
  "bittersweet-ending-books",
  "open-ending-books",
  "romance-ending-finder",
  "ya-trigger-warnings",
  "read-or-skip",
]);

export const BOOK_ALLOW = new Set<string>([
  "the-song-of-achilles",
  "piranesi",
  "the-remains-of-the-day",
  "norwegian-wood",
  "no-longer-human",
  "pride-and-prejudice",
  "the-giver",
  "beach-read",
  "me-before-you",
  "the-fault-in-our-stars",
  "it-ends-with-us",
  "the-time-travelers-wife",
  "red-white-and-royal-blue",
]);

export const AUTHOR_ALLOW = new Set<string>([
  "aldous-huxley",
  "kazuo-ishiguro",
  "madeline-miller",
  "haruki-murakami",
]);

// During AdSense review all warning / ending / genre detail pages are noindex.
export const WARNING_ALLOW: Set<string> = new Set();
export const ENDING_ALLOW: Set<string> = new Set();
export const GENRE_ALLOW: Set<string> = new Set();

// Index/list hubs for warnings / endings / authors / collections / genres are
// pure tag clouds without long-form content, so we noindex them too while the
// review is in progress. /warnings is the exception (kept as a core hub per
// the brief) — that's why it lives in HE HUB_PATHS but the OTHER list pages
// aren't there.
