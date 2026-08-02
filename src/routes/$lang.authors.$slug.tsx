import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getAllAuthors, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";
import { AUTHOR_ENRICHMENT } from "@/data/enrichment";
import { AUTHOR_ALLOW, NOINDEX_META } from "@/lib/index-allowlist";
import { Check, X } from "lucide-react";

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
    const en = AUTHOR_ENRICHMENT[params.slug];
    const list = a ? books.filter((b) => slugify(b.author.en) === a.slug) : [];
    const titles = list.map((b) => b.title[lang]).slice(0, 3).join(lang === "zh" ? "、" : ", ");

    const title =
      lang === "zh"
        ? `${label}的小說：結局類型、避雷標籤與讀前決策 | 讀前決策站`
        : `Books by ${label}: Endings, Trigger Warnings & Read-or-Skip | NovelCheck`;

    const desc = en
      ? (lang === "zh"
          ? `${label}作品的常見結局傾向、避雷標籤與適讀對象。本站已收錄 ${list.length} 本：${titles}。含每本讀 or 略決策卡。`
          : `${label}'s typical ending tendencies, common trigger warnings, and reader fit. ${list.length} books catalogued including ${titles}. Read-or-Skip verdict on every book.`)
      : (lang === "zh"
          ? `${label}作品列表，含每本書結局類型、避雷標籤與「讀 or 略」決策。本站已收錄 ${list.length} 本。`
          : `Browse ${list.length} books by ${label} with ending type, trigger warnings, and a Read-or-Skip verdict on each.`);

    const canonical = `${siteUrl}/${lang}/authors/${params.slug}`;

    const scripts = [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
            { name: lang === "zh" ? "作者" : "Authors", url: `${siteUrl}/${lang}/authors` },
            { name: label as string, url: canonical },
          ]),
        ),
      },
      ...(en?.faq?.length
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: en.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q[lang],
                  acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
                })),
              }),
            },
          ]
        : []),
    ];

    const indexable = AUTHOR_ALLOW.has(params.slug);
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 280) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 280) },
        ...(indexable ? [] : [NOINDEX_META]),
      ],
      links: [{ rel: "canonical", href: canonical }, ...langAlt(`/authors/${params.slug}`)],
      scripts,
    };
  },
  component: AuthorDetail,
});

function AuthorDetail() {
  const lang = useLang();
  const { author } = Route.useLoaderData();
  const list = books.filter((b) => slugify(b.author.en) === author.slug);
  const en = AUTHOR_ENRICHMENT[author.slug];

  // Aggregate ending + warning facets from this author's catalogued books
  const endingCounts = new Map<string, number>();
  const warningCounts = new Map<string, { code: string; label: string; n: number }>();
  const genreSet = new Map<string, { slug: string; label: string }>();
  for (const b of list) {
    endingCounts.set(b.ending, (endingCounts.get(b.ending) ?? 0) + 1);
    for (const tr of b.triggers) {
      const cur = warningCounts.get(tr.code);
      warningCounts.set(tr.code, {
        code: tr.code,
        label: tr[lang],
        n: (cur?.n ?? 0) + 1,
      });
    }
    const gslug = slugify(b.genre.en);
    if (!genreSet.has(gslug)) genreSet.set(gslug, { slug: gslug, label: b.genre[lang] });
  }
  const topWarnings = Array.from(warningCounts.values()).sort((a, b) => b.n - a.n).slice(0, 6);
  const endingList = Array.from(endingCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <main className="mx-auto max-w-4xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/authors" params={{ lang }}>{t.authors[lang]}</Link> / <span>{author[lang]}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">{author[lang]}</h1>
        {lang === "zh" && <p className="text-sm text-muted-foreground">{author.en}</p>}
      </header>

      {en ? (
        <section className="mb-8 rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl font-semibold mb-2">
            {lang === "zh" ? "作者簡介" : "About the author"}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{en.bio[lang]}</p>
        </section>
      ) : (
        <section className="mb-8 rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            {lang === "zh"
              ? `本站已收錄 ${author[lang]} 的 ${list.length} 本作品。完整作者背景介紹整理中（low confidence）。`
              : `${list.length} books by ${author.en} catalogued on this site. Full author profile in progress (low confidence).`}
          </p>
        </section>
      )}

      {en && (
        <section className="mb-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold mb-2">
              {lang === "zh" ? "作品常見結局傾向" : "Common ending tendencies"}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{en.endingTendency[lang]}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold mb-2">
              {lang === "zh" ? "作品常見避雷標籤" : "Common trigger warnings"}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{en.commonWarnings[lang]}</p>
          </div>
        </section>
      )}

      {en && (
        <section className="mb-8 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[color:var(--read)]/30 bg-[color:var(--read)]/5 p-5">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-[color:var(--read)]">
              <Check className="h-4 w-4" /> {lang === "zh" ? "適合哪些讀者" : "Who this author is for"}
            </h3>
            <ul className="space-y-1.5 text-sm">
              {en.whoFor[lang].map((line) => <li key={line}>· {line}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-destructive">
              <X className="h-4 w-4" /> {lang === "zh" ? "不適合哪些讀者" : "Who should skip"}
            </h3>
            <ul className="space-y-1.5 text-sm">
              {en.whoNot[lang].map((line) => <li key={line}>· {line}</li>)}
            </ul>
          </div>
        </section>
      )}

      {en && (
        <section className="mb-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="font-display text-lg font-semibold mb-2">
            {lang === "zh" ? "從哪本作品開始讀" : "Where to start"}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90">{en.startWith[lang]}</p>
          {lang === "en" && slug === "madeline-miller" && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              Deciding between them? Our{" "}
              <a href="/en/book/the-song-of-achilles" className="text-accent hover:underline">
                The Song of Achilles ending guide
              </a>{" "}
              answers the happy-or-sad question first and lists the heaviest warnings before you commit.
            </p>
          )}
        </section>
      )}


      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">
          {lang === "zh" ? `本站收錄的 ${author[lang]} 作品` : `Books by ${author.en} on this site`}
        </h2>
        {list.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {lang === "zh" ? "尚無收錄作品。" : "No catalogued books yet."}
          </p>
        )}
      </section>

      {(endingList.length > 0 || topWarnings.length > 0 || genreSet.size > 0) && (
        <section className="mb-10 rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-lg font-semibold mb-3">
            {lang === "zh" ? "相關探索" : "Related browsing"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {endingList.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {lang === "zh" ? "結局類型" : "Ending types"}
                </p>
                <ul className="space-y-1">
                  {endingList.map(([code, n]) => (
                    <li key={code}>
                      <Link
                        to="/$lang/endings/$ending"
                        params={{ lang, ending: code }}
                        className="text-accent hover:underline"
                      >
                        {code}
                      </Link>
                      <span className="text-muted-foreground"> · {n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {topWarnings.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {lang === "zh" ? "避雷標籤" : "Trigger warnings"}
                </p>
                <ul className="space-y-1">
                  {topWarnings.map((w) => (
                    <li key={w.code}>
                      <Link
                        to="/$lang/warnings/$code"
                        params={{ lang, code: w.code }}
                        className="text-accent hover:underline"
                      >
                        {w.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {genreSet.size > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {lang === "zh" ? "類型" : "Genres"}
                </p>
                <ul className="space-y-1">
                  {Array.from(genreSet.values()).map((g) => (
                    <li key={g.slug}>
                      <Link
                        to="/$lang/genres/$slug"
                        params={{ lang, slug: g.slug }}
                        className="text-accent hover:underline"
                      >
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link to="/$lang/books" params={{ lang }} className="text-accent hover:underline">
              {lang === "zh" ? "← 全部作品庫" : "← All books"}
            </Link>
            <Link to="/$lang/authors" params={{ lang }} className="text-accent hover:underline">
              {lang === "zh" ? "← 全部作者" : "← All authors"}
            </Link>
            <Link to="/$lang/collections" params={{ lang }} className="text-accent hover:underline">
              {lang === "zh" ? "主題書單" : "Collections"}
            </Link>
          </div>
        </section>
      )}

      {en?.faq?.length ? (
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold mb-3">FAQ</h2>
          <dl className="space-y-3">
            {en.faq.map((f, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <dt className="font-medium mb-1">{f.q[lang]}</dt>
                <dd className="text-sm text-muted-foreground">{f.a[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </main>
  );
}
