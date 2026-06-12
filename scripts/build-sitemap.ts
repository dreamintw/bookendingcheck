import { writeFileSync, mkdirSync } from "node:fs";
import { books, ENDINGS, getAllTriggers, getAllGenres, getAllAuthors } from "../src/data/books";
import { collections } from "../src/data/collections";
import { siteUrl } from "../src/lib/seo";
import {
  HUB_PATHS,
  COLLECTION_ALLOW,
  BOOK_ALLOW,
  AUTHOR_ALLOW,
  WARNING_ALLOW,
  ENDING_ALLOW,
  GENRE_ALLOW,
} from "../src/lib/index-allowlist";

const langs = ["zh", "en"] as const;

function urlEntry(path: string) {
  const zh = `${siteUrl}/zh${path}`;
  const en = `${siteUrl}/en${path}`;
  const alt = langs
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}${path}"/>`)
    .join("\n");
  const xDef = `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`;
  return [zh, en]
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n${alt}\n${xDef}\n  </url>`)
    .join("\n");
}

// AdSense Review Mode: only include allowlisted, fully-fleshed-out URLs.
const indexablePaths: string[] = [
  ...HUB_PATHS,
  ...collections.filter((c) => COLLECTION_ALLOW.has(c.slug)).map((c) => `/collections/${c.slug}`),
  ...books.filter((b) => BOOK_ALLOW.has(b.slug)).map((b) => `/book/${b.slug}`),
  ...getAllAuthors().filter((a) => AUTHOR_ALLOW.has(a.slug)).map((a) => `/authors/${a.slug}`),
  ...ENDINGS.filter((e) => ENDING_ALLOW.has(e)).map((e) => `/endings/${e}`),
  ...getAllTriggers().filter((t) => WARNING_ALLOW.has(t.code)).map((t) => `/warnings/${t.code}`),
  ...getAllGenres().filter((g) => GENRE_ALLOW.has(g.slug)).map((g) => `/genres/${g.slug}`),
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexablePaths.map((p) => urlEntry(p === "" ? "" : p)).join("\n")}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", body);
console.log(`Wrote public/sitemap.xml (${indexablePaths.length * 2} URLs)`);

const simpleLocs: string[] = [];
for (const p of indexablePaths) {
  const clean = p === "" ? "" : p;
  simpleLocs.push(`${siteUrl}/en${clean}`);
  simpleLocs.push(`${siteUrl}/zh${clean}`);
}
const simpleBody = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${simpleLocs.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync("public/sitemap-simple.xml", simpleBody);
console.log(`Wrote public/sitemap-simple.xml (${simpleLocs.length} URLs)`);
