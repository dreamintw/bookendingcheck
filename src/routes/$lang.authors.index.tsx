import { createFileRoute, Link } from "@tanstack/react-router";
import { books, getAllAuthors, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/authors/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "依作者瀏覽小說 | 讀前決策站" : "Browse Novels by Author | NovelCheck";
    return { meta: [{ title }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/authors` }, ...langAlt("/authors")] };
  },
  component: AuthorsIndex,
});

function AuthorsIndex() {
  const lang = useLang();
  const all = getAllAuthors();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4"><Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.authors[lang]}</span></nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{t.browseByAuthor[lang]}</h1>
      <div className="flex flex-wrap gap-2">
        {all.map((a) => {
          const count = books.filter((b) => slugify(b.author.en) === a.slug).length;
          return (
            <Link key={a.slug} to="/$lang/authors/$slug" params={{ lang, slug: a.slug }} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:border-accent/60">
              {a[lang]} <span className="text-muted-foreground text-xs">· {count}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
