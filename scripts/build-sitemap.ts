import { writeFileSync, mkdirSync } from "node:fs";
import { books, ENDINGS, getAllTriggers, getAllGenres, getAllAuthors } from "../src/data/books";
import { collections } from "../src/data/collections";
import { siteUrl } from "../src/lib/seo";

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

const paths = [
  "",
  "/books",
  "/about",
  "/endings",
  "/warnings",
  "/genres",
  "/authors",
  "/collections",
  ...ENDINGS.map((e) => `/endings/${e}`),
  ...getAllTriggers().map((t) => `/warnings/${t.code}`),
  ...getAllGenres().map((g) => `/genres/${g.slug}`),
  ...getAllAuthors().map((a) => `/authors/${a.slug}`),
  ...collections.map((c) => `/collections/${c.slug}`),
  ...books.map((b) => `/book/${b.slug}`),
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map((p) => urlEntry(p === "" ? "" : p)).join("\n")}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", body);
console.log(`Wrote public/sitemap.xml (${paths.length * 2} URLs)`);

// Simplified fallback sitemap: plain <url><loc> only, no xhtml:link / lastmod / changefreq / priority.
const simpleLocs: string[] = [];
for (const p of paths) {
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
