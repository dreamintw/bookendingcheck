import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getWarning } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";

const CUSTOM_META: Record<string, { title: { zh: string; en: string }; desc: { zh: string; en: string }; h1: { zh: string; en: string } }> = {
  "pet-death": {
    title: {
      zh: "小說寵物死亡避雷｜讀前決策站",
      en: "Pet Death in Books | Trigger Warning Guide",
    },
    desc: {
      zh: "查詢哪些小說包含寵物死亡雷點，查看免雷提示、避雷標籤與讀前決策建議。",
      en: "Find books that include pet death warnings, spoiler-safe notes, and read-or-skip guidance before you start reading.",
    },
    h1: { zh: "小說寵物死亡避雷", en: "Pet Death in Books" },
  },
};

export const Route = createFileRoute("/$lang/warnings/$code")({
  loader: ({ params }) => {
    const tr = getWarning(params.code);
    if (!tr) throw notFound();
    return { trigger: tr };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const tr = loaderData?.trigger;
    if (!tr) return { meta: [{ title: "Not found" }] };
    const custom = CUSTOM_META[params.code];
    const label = tr[lang];
    const title = custom?.title[lang]
      ?? (lang === "zh" ? `避雷標籤：${label} 的小說一覽 | 讀前決策站` : `Books tagged "${label}" | NovelCheck`);
    const desc = custom?.desc[lang]
      ?? (lang === "zh" ? `所有含「${label}」避雷標籤的小說，附結局類型與讀 or 略決策。` : `All novels tagged with "${label}", with ending type and a Read-or-Skip verdict.`);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/warnings/${params.code}` },
        ...langAlt(`/warnings/${params.code}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
            { name: lang === "zh" ? "避雷標籤" : "Trigger Warnings", url: `${siteUrl}/${lang}/warnings` },
            { name: label, url: `${siteUrl}/${lang}/warnings/${params.code}` },
          ])),
        },
      ],
    };
  },
  component: WarningDetail,
});

function WarningDetail() {
  const lang = useLang();
  const { trigger } = Route.useLoaderData();
  const custom = CUSTOM_META[trigger.code];
  const h1 = custom?.h1[lang] ?? trigger[lang];
  const list = books.filter((b) => b.triggers.some((x) => x.code === trigger.code));
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/warnings" params={{ lang }}>{t.warnings[lang]}</Link> / <span>{trigger[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">{h1}</h1>
      <p className="text-muted-foreground mb-8">
        {lang === "zh"
          ? `共 ${list.length} 本含此避雷標籤的小說。`
          : `${list.length} book${list.length === 1 ? "" : "s"} tagged with this warning.`}
      </p>
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {lang === "zh"
            ? "目前資料庫尚未收錄含此標籤的作品，但本頁仍持續更新。請改瀏覽其他避雷標籤或回到首頁搜尋。"
            : "No books in our database carry this tag yet — the page updates as new titles are added. Browse other warnings or search from the home page."}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => <BookCard key={b.slug} book={b} />)}
        </div>
      )}
    </main>
  );
}
