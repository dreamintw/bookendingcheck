import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, collectionBooks, collections, type Collection } from "@/data/collections";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";
import { COLLECTION_ENRICHMENT } from "@/data/enrichment";

const EXTRA_RELATED: Record<string, { warnings?: { slug: string; label: string }[]; collections?: { slug: string; label: string }[] }> = {
  "pet-death-warning": {
    warnings: [
      { slug: "pet-death", label: "Pet death" },
      { slug: "violence", label: "Violence" },
      { slug: "major-character-death", label: "Major character death" },
      { slug: "grief", label: "Grief" },
    ],
    collections: [
      { slug: "read-or-skip", label: "Read or skip picks" },
      { slug: "ya-trigger-warnings", label: "YA trigger warnings" },
      { slug: "sad-ending-books", label: "Sad ending books" },
      { slug: "bittersweet-ending-books", label: "Bittersweet ending books" },
    ],
  },
};

const GENERIC_FAQ_ZH = [
  { q: "這個清單多久更新一次？", a: "每週新增書目，避雷標籤會根據讀者回饋持續修訂。" },
  { q: "結局類型 HE / BE / OE / Bittersweet 怎麼判斷？", a: "我們以主角生死、核心關係結果與目標達成情況為主要判準，並標示信心分數。" },
  { q: "可以提供小說全文嗎？", a: "不行。本站只提供讀前決策資訊，不提供全文或盜版下載。" },
  { q: "如果信心分數低代表什麼？", a: "代表本書資料尚未完全核實，請以「Unknown / Low confidence」對待，自行交叉查證。" },
];
const GENERIC_FAQ_EN = [
  { q: "How often is this list updated?", a: "We add new titles weekly and revise trigger tags based on reader feedback." },
  { q: "How are HE / BE / OE / Bittersweet decided?", a: "We judge by main-character survival, the fate of the central relationship, and goal completion, and we publish a confidence score." },
  { q: "Do you provide the full text of any novel?", a: "No. We only provide pre-read decision data — no full text and no pirated downloads." },
  { q: "What does a low confidence score mean?", a: "It means the data is not fully verified yet — treat it as Unknown / Low confidence and cross-check before deciding." },
];

function normalizeQ(q: string) {
  return q.trim().toLowerCase().replace(/\s+/g, " ").replace(/[？?。.！!]+$/g, "");
}
function dedupeFaq(list: { q: string; a: string }[]) {
  const seen = new Set<string>();
  const out: { q: string; a: string }[] = [];
  for (const item of list) {
    const key = normalizeQ(item.q);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}
function faqWithFallback(c: Collection, lang: Lang) {
  const own = (c.faq ?? []).map((f) => ({ q: f.q[lang], a: f.a[lang] }));
  const enrich = COLLECTION_ENRICHMENT[c.slug];
  const enrichFaq = enrich ? enrich.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] })) : [];
  const merged = dedupeFaq([...own, ...enrichFaq]);
  if (merged.length >= 4) return merged;
  const generic = lang === "zh" ? GENERIC_FAQ_ZH : GENERIC_FAQ_EN;
  return dedupeFaq([...merged, ...generic.slice(0, 4 - merged.length)]);
}

export const Route = createFileRoute("/$lang/collections/$slug")({
  loader: ({ params }) => {
    const c = getCollection(params.slug);
    if (!c) throw notFound();
    // Return only the slug — Collection contains a non-serializable `filter`
    // function which breaks SSR dehydration and causes a hydration invariant
    // failure that blanks the page on the client.
    return { slug: c.slug };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const c = (loaderData?.slug && getCollection(loaderData.slug)) || collections[0];
    const title = c.title[lang];
    const desc = c.description[lang];
    const path = `/collections/${c.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}${path}` }, ...langAlt(path)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
              { name: lang === "zh" ? "主題清單" : "Collections", url: `${siteUrl}/${lang}/collections` },
              { name: c.h1[lang], url: `${siteUrl}/${lang}${path}` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description: desc,
            url: `${siteUrl}/${lang}${path}`,
            inLanguage: lang === "zh" ? "zh-Hant" : "en",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqWithFallback(c, lang).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const lang = useLang();
  const { slug } = Route.useLoaderData() as { slug: string };
  const collection = (getCollection(slug) ?? collections[0]) as Collection;
  const list = collectionBooks(collection);
  const intro = collection.intro[lang].split("\n\n");
  const enrich = COLLECTION_ENRICHMENT[collection.slug];

  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4" aria-label="breadcrumb">
        <a href={`/${lang}`} className="hover:underline">{t.breadcrumbHome[lang]}</a>
        <span> / </span>
        <span>{collection.h1[lang]}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">{collection.h1[lang]}</h1>
        <p className="text-base text-muted-foreground">{collection.description[lang]}</p>
      </header>

      <article className="prose prose-sm max-w-none mb-10 text-foreground/90 space-y-4">
        {intro.map((p, i) => (
          <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      </article>

      {enrich && (
        <section aria-labelledby="how-to-use" className="mb-10 rounded-xl border border-border bg-card p-6">
          <h2 id="how-to-use" className="font-display text-xl font-semibold mb-3">
            {lang === "zh" ? "如何使用這個頁面" : "How to use this page"}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90">{enrich.howToUse[lang]}</p>
        </section>
      )}

      <section aria-labelledby="books-heading" className="mb-12">
        <h2 id="books-heading" className="font-display text-2xl font-semibold mb-5">
          {lang === "zh" ? "符合此主題的作品" : "Books in this collection"}
        </h2>
        {list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            <p className="mb-3">
              {lang === "zh"
                ? "我們仍在為這個主題收錄書籍，敬請稍後回來，或先瀏覽全部作品。"
                : "We are still adding books to this collection. Check back soon or browse all books."}
            </p>
            <a href={`/${lang}/books`} className="text-accent hover:underline">
              {lang === "zh" ? "瀏覽全部作品 →" : "Browse all books →"}
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        )}
      </section>

      {(collection.related.endings?.length || collection.related.warnings?.length) && (
        <section aria-labelledby="related-heading" className="mb-12">
          <h2 id="related-heading" className="font-display text-2xl font-semibold mb-4">
            {lang === "zh" ? "相關分類" : "Related categories"}
          </h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {collection.related.endings?.map((e) => (
              <a key={e} href={`/${lang}/endings/${e}`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">
                {e}
              </a>
            ))}
            {collection.related.warnings?.map((w) => (
              <a key={w} href={`/${lang}/warnings/${w}`} className="rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent">
                #{w}
              </a>
            ))}
          </div>
        </section>
      )}

      {enrich && (
        <section aria-labelledby="what-it-means" className="mb-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 id="what-it-means" className="font-display text-xl font-semibold mb-3">
              {lang === "zh" ? "這個分類實際上代表什麼" : "What this really means"}
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
      )}

      <section aria-labelledby="faq-heading" className="mb-12">
        <h2 id="faq-heading" className="font-display text-2xl font-semibold mb-4">FAQ</h2>
        <dl className="space-y-4">
          {faqWithFallback(collection, lang).map((f, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <dt className="font-medium mb-1">{f.q}</dt>
              <dd className="text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-display text-xl font-semibold mb-3">
          {lang === "zh" ? "更多主題清單" : "More collections"}
        </h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {collections.filter((c) => c.slug !== collection.slug).slice(0, 8).map((c) => (
            <li key={c.slug}>
              <a href={`/${lang}/collections/${c.slug}`} className="rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-accent">
                {c.h1[lang]}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link to="/$lang" params={{ lang }} className="text-sm text-accent hover:underline">← {t.backHome[lang]}</Link>
        </p>
      </section>
    </main>
  );
}
