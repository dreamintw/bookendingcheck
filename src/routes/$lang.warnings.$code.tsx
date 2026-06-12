import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getWarning } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";
import { NOINDEX_META } from "@/lib/index-allowlist";
import { WARNING_ENRICHMENT } from "@/data/enrichment";

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
        NOINDEX_META,
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
        // FAQPage JSON-LD intentionally omitted here: the same FAQ content is
        // hosted on the corresponding /collections/{slug}-warning page (canonical
        // FAQPage source). Emitting it on both URLs triggers GSC
        // "duplicate field" warnings for FAQPage rich results.

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
  const enrich = WARNING_ENRICHMENT[trigger.code];
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

      {enrich && (
        <>
          <section className="mb-8 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold mb-3">
              {lang === "zh" ? "如何使用這個頁面" : "How to use this page"}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{enrich.howToUse[lang]}</p>
          </section>
          <section className="mb-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold mb-3">
                {lang === "zh" ? "這個避雷標籤的定義" : "What this warning means"}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/90">{enrich.whatItMeans[lang]}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold mb-3">
                {lang === "zh" ? "讀者決策建議" : "Reader decision tips"}
              </h2>
              <ul className="space-y-2 text-sm text-foreground/90">
                {enrich.decisionTips[lang].map((tip, i) => (
                  <li key={i} className="flex gap-2"><span className="text-accent">·</span><span>{tip}</span></li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

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

      {enrich && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold mb-4">FAQ</h2>
          <dl className="space-y-4">
            {enrich.faq.map((f, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <dt className="font-medium mb-1">{f.q[lang]}</dt>
                <dd className="text-sm text-muted-foreground">{f.a[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-12 border-t border-border pt-6 text-sm">
        <p className="font-medium mb-2">{lang === "zh" ? "相關分類" : "Related categories"}</p>
        <div className="flex flex-wrap gap-2">
          <a href={`/${lang}/collections/happy-ending-books`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">{lang === "zh" ? "HE 小說" : "Happy Ending Books"}</a>
          <a href={`/${lang}/collections/sad-ending-books`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">{lang === "zh" ? "BE 小說" : "Sad Ending Books"}</a>
          <a href={`/${lang}/collections/${trigger.code}-warning`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">{trigger[lang]}</a>
          <a href={`/${lang}/warnings`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">{lang === "zh" ? "全部避雷" : "All warnings"}</a>
        </div>
      </section>
    </main>
  );
}

