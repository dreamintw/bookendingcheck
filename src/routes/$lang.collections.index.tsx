import { createFileRoute } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/collections/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "主題清單｜依讀者需求瀏覽 | 讀前決策站" : "Browse by Reader Need — Collections | NovelCheck";
    const desc = lang === "zh"
      ? "依讀者需求快速瀏覽：HE、BE、開放結局、避雷標籤、甜文 / 虐文判斷等主題清單。"
      : "Browse by reader need: HE, BE, open endings, trigger warnings, sweet-vs-angst, and more.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/collections` }, ...langAlt("/collections")],
    };
  },
  component: CollectionsIndex,
});

function CollectionsIndex() {
  const lang = useLang();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">
        {lang === "zh" ? "依讀者需求瀏覽" : "Browse by Reader Need"}
      </h1>
      <p className="text-muted-foreground mb-8">
        {lang === "zh" ? "選一個最貼近你目前需求的入口，30 秒內找到下一本書。" : "Pick the entry that matches your need — find your next book in 30 seconds."}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {collections.map((c) => (
          <li key={c.slug}>
            <a href={`/${lang}/collections/${c.slug}`} className="block rounded-lg border border-border p-4 hover:border-accent hover:shadow-sm">
              <div className="font-medium">{c.h1[lang]}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description[lang]}</div>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-muted-foreground">{t.noFullText[lang]}</p>
    </main>
  );
}
