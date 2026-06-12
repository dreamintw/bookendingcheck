import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getAllGenres, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt } from "@/lib/seo";
import { NOINDEX_META } from "@/lib/index-allowlist";

export const Route = createFileRoute("/$lang/genres/$slug")({
  loader: ({ params }) => {
    const g = getAllGenres().find((x) => x.slug === params.slug);
    if (!g) throw notFound();
    return { genre: g };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const g = loaderData?.genre;
    const label = g ? g[lang] : params.slug;
    const title = lang === "zh" ? `${label} 類型小說 | 讀前決策站` : `${label} Novels | NovelCheck`;
    return { meta: [{ title }, NOINDEX_META], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/genres/${params.slug}` }, ...langAlt(`/genres/${params.slug}`)] };
  },
  component: GenreDetail,
});

function GenreDetail() {
  const lang = useLang();
  const { genre } = Route.useLoaderData();
  const list = books.filter((b) => slugify(b.genre.en) === genre.slug);
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/genres" params={{ lang }}>{t.genres[lang]}</Link> / <span>{genre[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{genre[lang]}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => <BookCard key={b.slug} book={b} />)}
      </div>
    </main>
  );
}
