import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getAllAuthors, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/authors/$slug")({
  loader: ({ params }) => {
    const a = getAllAuthors().find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { author: a };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const a = loaderData?.author;
    const label = a ? a[lang] : params.slug;
    const title = lang === "zh" ? `${label} 的小說 | 讀前決策站` : `Books by ${label} | NovelCheck`;
    return { meta: [{ title }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/authors/${params.slug}` }, ...langAlt(`/authors/${params.slug}`)] };
  },
  component: AuthorDetail,
});

function AuthorDetail() {
  const lang = useLang();
  const { author } = Route.useLoaderData();
  const list = books.filter((b) => slugify(b.author.en) === author.slug);
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/authors" params={{ lang }}>{t.authors[lang]}</Link> / <span>{author[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{author[lang]}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => <BookCard key={b.slug} book={b} />)}
      </div>
    </main>
  );
}
