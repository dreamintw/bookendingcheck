import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getAllTriggers } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/warnings/$code")({
  loader: ({ params }) => {
    const tr = getAllTriggers().find((x) => x.code === params.code);
    if (!tr) throw notFound();
    return { trigger: tr };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const tr = loaderData?.trigger;
    const label = tr ? tr[lang] : params.code;
    const title = lang === "zh" ? `避雷標籤：${label} 的小說一覽 | 讀前決策站` : `Books tagged "${label}" | NovelCheck`;
    const desc = lang === "zh" ? `所有含「${label}」避雷標籤的小說，附結局類型與讀 or 略決策。` : `All novels tagged with "${label}", with ending type and a Read-or-Skip verdict.`;
    return { meta: [{ title }, { name: "description", content: desc }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/warnings/${params.code}` }, ...langAlt(`/warnings/${params.code}`)] };
  },
  component: WarningDetail,
});

function WarningDetail() {
  const lang = useLang();
  const { trigger } = Route.useLoaderData();
  const list = books.filter((b) => b.triggers.some((x) => x.code === trigger.code));
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/warnings" params={{ lang }}>{t.warnings[lang]}</Link> / <span>{trigger[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{trigger[lang]}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => <BookCard key={b.slug} book={b} />)}
      </div>
    </main>
  );
}
