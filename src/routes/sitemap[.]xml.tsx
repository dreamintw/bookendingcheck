import { createFileRoute } from "@tanstack/react-router";
import { books } from "@/data/books";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const base = "https://example.com";
        const urls = [
          `${base}/`,
          `${base}/books`,
          `${base}/about`,
          ...books.map((b) => `${base}/books/${b.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
