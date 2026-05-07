import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBook, books } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { EndingBadge } from "@/components/EndingBadge";
import { DecisionCard } from "@/components/DecisionCard";
import { SpoilerBlock } from "@/components/SpoilerBlock";
import { TriggerMatrix } from "@/components/TriggerMatrix";
import { ChevronLeft, Check, X } from "lucide-react";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/$lang/book/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData, params }) => {
    const b = loaderData?.book;
    const lang = (params.lang as Lang) ?? "zh";
    if (!b) return { meta: [{ title: "Not found" }] };
    const title = lang === "zh"
      ? `《${b.title.zh}》結局與避雷標籤｜${b.author.zh} | 讀前決策站`
      : `${b.title.en} — Ending, Trigger Warnings & Verdict | NovelCheck`;
    const desc = lang === "zh"
      ? `${b.title.zh}（${b.author.zh}）：結局類型 ${b.ending}，${b.triggers.length} 項避雷標籤，含讀 or 略決策卡。${b.summary.zh}`.slice(0, 280)
      : `${b.title.en} by ${b.author.en}: ending type ${b.ending}, ${b.triggers.length} trigger warnings, and a Read-or-Skip verdict. ${b.summary.en}`.slice(0, 280);

    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "book" },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/book/${b.slug}` },
        ...langAlt(`/book/${b.slug}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: b.title[lang],
            alternateName: lang === "zh" ? b.title.en : b.title.zh,
            author: { "@type": "Person", name: b.author[lang] },
            datePublished: String(b.year),
            genre: b.genre[lang],
            isbn: b.isbn,
            description: b.summary[lang],
            inLanguage: lang,
            url: `${siteUrl}/${lang}/book/${b.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
            { name: lang === "zh" ? "作品庫" : "Books", url: `${siteUrl}/${lang}/books` },
            { name: b.title[lang], url: `${siteUrl}/${lang}/book/${b.slug}` },
          ])),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: BookDetail,
});

function NotFound() {
  const lang = useLang();
  return (
    <main className="flex-1 flex items-center justify-center text-center px-4 py-20">
      <div>
        <h1 className="font-display text-3xl mb-2">{t.notFound[lang]}</h1>
        <Link to="/$lang" params={{ lang }} className="text-accent hover:underline">{t.backHome[lang]}</Link>
      </div>
    </main>
  );
}

function BookDetail() {
  const { book } = Route.useLoaderData();
  const lang = useLang();
  const related = books.filter((b) => b.slug !== book.slug && b.ending === book.ending).slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl w-full px-4 py-10 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/books" params={{ lang }}>{t.books[lang]}</Link> /{" "}
        <span>{book.title[lang]}</span>
      </nav>
      <Link to="/$lang/books" params={{ lang }} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> {t.books[lang]}
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <EndingBadge ending={book.ending} full />
          <span className="text-xs text-muted-foreground">{book.year} · {book.genre[lang]}</span>
          {book.isbn && <span className="text-xs text-muted-foreground">ISBN {book.isbn}</span>}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-2">
          {book.title[lang]}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.by[lang]} <span className="text-foreground">{book.author[lang]}</span>
          {lang === "zh" && <span className="text-sm ml-2">／ {book.title.en}</span>}
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t.decision[lang]}</p>
          <h2 className="font-display text-xl font-semibold">{book.title[lang]}</h2>
        </div>
        <DecisionCard decision={book.decision} confidence={book.confidence} />
      </div>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{t.summary[lang]}</h2>
        <p className="text-base leading-relaxed text-foreground/90">{book.summary[lang]}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-10">
        <SpoilerBlock level="soft" title={t.spoilerSoft[lang]}>{book.spoilerSoft[lang]}</SpoilerBlock>
        <SpoilerBlock level="hard" title={t.spoilerHard[lang]}>{book.spoilerHard[lang]}</SpoilerBlock>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">{t.triggers[lang]}</h2>
        <div className="rounded-xl border border-border bg-card p-5">
          <TriggerMatrix triggers={book.triggers} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-[color:var(--read)]/30 bg-[color:var(--read)]/5 p-5">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-[color:var(--read)]">
            <Check className="h-4 w-4" /> {t.whoFor[lang]}
          </h3>
          <ul className="space-y-1.5 text-sm">
            {book.whoFor[lang].map((line) => <li key={line}>· {line}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-destructive">
            <X className="h-4 w-4" /> {t.whoNot[lang]}
          </h3>
          <ul className="space-y-1.5 text-sm">
            {book.whoNot[lang].map((line) => <li key={line}>· {line}</li>)}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">{t.relatedEnding[lang]}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map((r) => (
              <Link key={r.slug} to="/$lang/book/$slug" params={{ lang, slug: r.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-accent/60 transition-colors">
                <EndingBadge ending={r.ending} />
                <p className="font-display font-semibold mt-2">{r.title[lang]}</p>
                <p className="text-xs text-muted-foreground">{r.author[lang]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
