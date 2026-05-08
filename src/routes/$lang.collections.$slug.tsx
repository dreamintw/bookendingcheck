import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, collectionBooks, collections, type Collection } from "@/data/collections";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/$lang/collections/$slug")({
  loader: ({ params }) => {
    const c = getCollection(params.slug);
    if (!c) throw notFound();
    return { collection: c };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const c = loaderData?.collection ?? collections[0];
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
        ...(c.faq.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: c.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q[lang],
                    acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const lang = useLang();
  const { collection } = Route.useLoaderData() as { collection: Collection };
  const list = collectionBooks(collection);
  const intro = collection.intro[lang].split("\n\n");

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
          <p key={i} className="leading-relaxed">{p}</p>
        ))}
      </article>

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

      {collection.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="font-display text-2xl font-semibold mb-4">FAQ</h2>
          <dl className="space-y-4">
            {collection.faq.map((f, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <dt className="font-medium mb-1">{f.q[lang]}</dt>
                <dd className="text-sm text-muted-foreground">{f.a[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

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
