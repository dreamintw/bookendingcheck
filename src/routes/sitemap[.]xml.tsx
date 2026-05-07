import { createFileRoute } from "@tanstack/react-router";
import { books, ENDINGS, getAllTriggers, getAllGenres, getAllAuthors } from "@/data/books";
import { collections } from "@/data/collections";
import { siteUrl } from "@/lib/seo";

const langs = ["zh", "en"] as const;

function urlEntry(path: string) {
  const zh = `${siteUrl}/zh${path}`;
  const en = `${siteUrl}/en${path}`;
  const alt = langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}${path}"/>`).join("\n");
  const xDef = `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`;
  return [zh, en].map((loc) => `  <url>\n    <loc>${loc}</loc>\n${alt}\n${xDef}\n  </url>`).join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
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
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
