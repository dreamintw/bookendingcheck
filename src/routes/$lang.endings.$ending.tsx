import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { siteUrl, langAlt } from "@/lib/seo";
import { NOINDEX_META } from "@/lib/index-allowlist";

export const Route = createFileRoute("/$lang/endings/$ending")({
  loader: ({ params }) => {
    if (!ENDINGS.includes(params.ending as Ending)) throw notFound();
    return { ending: params.ending as Ending };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const e = loaderData?.ending ?? "HE";
    const title = lang === "zh" ? `${e} 結局小說一覽 | 讀前決策站` : `${e} Ending Novels | NovelCheck`;
    const desc = lang === "zh" ? `所有結局類型為 ${e} 的小說，含避雷標籤與讀前決策。` : `All novels with ${e} endings, with trigger warnings and a Read-or-Skip card.`;
    return { meta: [{ title }, { name: "description", content: desc }, NOINDEX_META], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/endings/${e}` }, ...langAlt(`/endings/${e}`)] };
  },
  component: EndingDetail,
});

function EndingDetail() {
  const lang = useLang();
  const { ending } = Route.useLoaderData();
  const list = books.filter((b) => b.ending === ending);
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/endings" params={{ lang }}>{t.endings[lang]}</Link> / <span>{ending}</span>
      </nav>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-semibold">{ending}</h1>
        <EndingBadge ending={ending} full />
      </div>
      {list.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">{t.noResults[lang]}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => <BookCard key={b.slug} book={b} />)}
        </div>
      )}
    </main>
  );
}
