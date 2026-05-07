import { createFileRoute, Link } from "@tanstack/react-router";
import { books, getAllGenres, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/genres/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "依類型瀏覽小說 | 讀前決策站" : "Browse Novels by Genre | NovelCheck";
    return { meta: [{ title }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/genres` }, ...langAlt("/genres")] };
  },
  component: GenresIndex,
});

function GenresIndex() {
  const lang = useLang();
  const all = getAllGenres();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4"><Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.genres[lang]}</span></nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{t.browseByGenre[lang]}</h1>
      <div className="flex flex-wrap gap-2">
        {all.map((g) => {
          const count = books.filter((b) => slugify(b.genre.en) === g.slug).length;
          return (
            <Link key={g.slug} to="/$lang/genres/$slug" params={{ lang, slug: g.slug }} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:border-accent/60">
              {g[lang]} <span className="text-muted-foreground text-xs">· {count}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
