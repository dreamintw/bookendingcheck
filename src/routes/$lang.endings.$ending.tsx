import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { siteUrl, langAlt } from "@/lib/seo";
import {
  ENDING_ALLOW,
  BOOK_ALLOW,
  NOINDEX_META,
} from "@/lib/index-allowlist";
import {
  ENDING_CONTENT,
  CURATED_BY_ENDING,
} from "@/data/ending-content";

type EnrichedEnding = keyof typeof ENDING_CONTENT;

function isEnriched(e: Ending): e is EnrichedEnding {
  return e in ENDING_CONTENT;
}

export const Route = createFileRoute("/$lang/endings/$ending")({
  loader: ({ params }) => {
    if (!ENDINGS.includes(params.ending as Ending)) throw notFound();
    return { ending: params.ending as Ending };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const e = (loaderData?.ending ?? "HE") as Ending;
    const indexed = ENDING_ALLOW.has(e) && isEnriched(e);

    if (indexed) {
      const side = ENDING_CONTENT[e as EnrichedEnding][lang];
      const canonical = `${siteUrl}/${lang}/endings/${e}`;
      const curated = (CURATED_BY_ENDING[e as EnrichedEnding] ?? [])
        .filter((slug) => BOOK_ALLOW.has(slug))
        .map((slug) => books.find((b) => b.slug === slug))
        .filter((b): b is NonNullable<typeof b> => Boolean(b));

      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: side.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };

      const scripts: { type: string; children: string }[] = [
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
      ];

      if (curated.length >= 3) {
        const itemListLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: curated.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/${lang}/book/${b.slug}`,
            name: lang === "zh" ? b.title.zh : b.title.en,
          })),
        };
        scripts.push({ type: "application/ld+json", children: JSON.stringify(itemListLd) });
      }

      return {
        meta: [
          { title: side.title },
          { name: "description", content: side.metaDescription },
          { property: "og:title", content: side.title },
          { property: "og:description", content: side.metaDescription },
          { property: "og:url", content: canonical },
        ],
        links: [
          { rel: "canonical", href: canonical },
          ...langAlt(`/endings/${e}`),
        ],
        scripts,
      };
    }

    // Non-enriched (currently only Unknown) — keep noindex.
    const title =
      lang === "zh"
        ? `${e} 結局小說一覽 | 讀前決策站`
        : `${e} Ending Novels | NovelCheck`;
    const desc =
      lang === "zh"
        ? `所有結局類型為 ${e} 的小說，含避雷標籤與讀前決策。`
        : `All novels with ${e} endings, with trigger warnings and a Read-or-Skip card.`;
    return {
      meta: [{ title }, { name: "description", content: desc }, NOINDEX_META],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/endings/${e}` },
        ...langAlt(`/endings/${e}`),
      ],
    };
  },
  component: EndingDetail,
});

function EndingDetail() {
  const lang = useLang();
  const { ending } = Route.useLoaderData();

  if (!isEnriched(ending)) {
    // Fallback thin view for Unknown (noindex).
    const list = books.filter((b) => b.ending === ending);
    return (
      <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
          <Link to="/$lang/endings" params={{ lang }}>{t.endings[lang]}</Link> /{" "}
          <span>{ending}</span>
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

  const side = ENDING_CONTENT[ending][lang];
  const curated = (CURATED_BY_ENDING[ending] ?? [])
    .filter((slug) => BOOK_ALLOW.has(slug))
    .map((slug) => books.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const heading = {
    qualifies: lang === "zh" ? "什麼算 / 什麼不算" : "What qualifies as this ending",
    yes: lang === "zh" ? "算是這個結局" : "This is this ending when…",
    no: lang === "zh" ? "不算這個結局" : "This is NOT this ending just because…",
    feels: lang === "zh" ? "讀完的感受" : "How this ending may feel",
    good: lang === "zh" ? "適合哪些讀者" : "Best for readers who…",
    notGood: lang === "zh" ? "可能不適合" : "May not be for readers who…",
    spoiler: lang === "zh" ? "如何在不被劇透的情況下使用本頁" : "How to use this page without spoilers",
    picks: lang === "zh" ? "本站已整理的相關作品" : "Curated books with this ending",
    related: lang === "zh" ? "延伸閱讀路徑" : "Related reading paths",
    faq: lang === "zh" ? "常見問題" : "Frequently asked questions",
    policy: lang === "zh" ? "資料與版權說明" : "Editorial and content notes",
  };

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/endings" params={{ lang }}>{t.endings[lang]}</Link> /{" "}
        <span>{ending}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            {side.h1}
          </h1>
        </div>
        <EndingBadge ending={ending} full />
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-4 mb-10">
        {side.intro.map((p, i) => (
          <p key={i} className="text-base leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.qualifies}</h2>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">{heading.yes}</h3>
        <ul className="list-disc pl-6 space-y-1 mb-4">
          {side.qualifies.yes.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">{heading.no}</h3>
        <ul className="list-disc pl-6 space-y-1">
          {side.qualifies.no.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
        {side.qualifies.note && (
          <p className="mt-4 text-sm text-muted-foreground italic">{side.qualifies.note}</p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{side.comparison.heading}</h2>
        <p className="text-base leading-relaxed">{side.comparison.body}</p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.feels}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {side.feels.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </section>

      <section className="mb-10 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-xl font-semibold mb-3">{heading.good}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {side.goodFor.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold mb-3">{heading.notGood}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {side.notFor.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.spoiler}</h2>
        <p className="text-base leading-relaxed">{side.spoilerNote}</p>
      </section>

      {lang === "en" && (ending === "BE" || ending === "Ambiguous") && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Reader-favourite guide in this category</h2>
          {ending === "BE" ? (
            <p className="text-base leading-relaxed">
              Start with our{" "}
              <a href="/en/book/the-song-of-achilles" className="text-accent hover:underline">
                The Song of Achilles ending guide
              </a>{" "}
              — it explains why we file the book as BE rather than bittersweet, lists the heaviest warnings, and keeps full spoilers folded.
            </p>
          ) : (
            <p className="text-base leading-relaxed">
              A good place to see how we handle open endings is{" "}
              <a href="/en/book/piranesi" className="text-accent hover:underline">
                what does the Piranesi ending mean
              </a>{" "}
              — spoiler-safe meaning first, complete explanation only if you expand it.
            </p>
          )}
        </section>
      )}



      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.picks}</h2>
        {curated.length === 0 ? (
          <p className="text-muted-foreground">{side.picksEmpty}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">{side.picksIntro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {curated.map((b) => <BookCard key={b.slug} book={b} />)}
            </div>
            {curated.length < 3 && (
              <p className="mt-4 text-sm text-muted-foreground">{side.picksEmpty}</p>
            )}
          </>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.related}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {side.related.map((r) => (
            <li key={r.href}><a href={r.href} className="underline">{r.label}</a></li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{heading.faq}</h2>
        <div className="space-y-4">
          {side.faq.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="font-display text-lg font-semibold mb-2">{heading.policy}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{side.policyNote}</p>
      </section>
    </main>
  );
}
