import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBook, books } from "@/data/books";
import { useLang, t } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { EndingBadge } from "@/components/EndingBadge";
import { DecisionCard } from "@/components/DecisionCard";
import { SpoilerBlock } from "@/components/SpoilerBlock";
import { TriggerMatrix } from "@/components/TriggerMatrix";
import { ChevronLeft, Check, X } from "lucide-react";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.book;
    if (!b) return { meta: [{ title: "Not found — NovelCheck" }] };
    const title = `${b.title.en} / ${b.title.zh} — Ending, Triggers & Verdict | NovelCheck`;
    const desc = `${b.title.en} by ${b.author.en}: ending type ${b.ending}, ${b.triggers.length} trigger warnings, and a Read-or-Skip verdict. ${b.summary.en}`.slice(0, 300);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "book" },
      ],
      links: [{ rel: "canonical", href: `/books/${b.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: b.title.en,
            alternateName: b.title.zh,
            author: { "@type": "Person", name: b.author.en },
            datePublished: String(b.year),
            genre: b.genre.en,
            description: b.summary.en,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => {
    const [lang] = useLang();
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-display text-3xl mb-2">{t.notFound[lang]}</h1>
            <Link to="/" className="text-accent hover:underline">{t.backHome[lang]}</Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  },
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground mb-3">{error.message}</p>
        <button onClick={reset} className="text-accent hover:underline">Try again</button>
      </div>
    </div>
  ),
  component: BookDetail,
});

function BookDetail() {
  const { book } = Route.useLoaderData();
  const [lang] = useLang();

  const related = books.filter((b) => b.slug !== book.slug && b.ending === book.ending).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-4xl w-full px-4 py-10 flex-1">
        <Link to="/books" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" /> {t.books[lang]}
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <EndingBadge ending={book.ending} full />
            <span className="text-xs text-muted-foreground">{book.year} · {book.genre[lang]}</span>
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
          <DecisionCard decision={book.decision} />
        </div>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{t.summary[lang]}</h2>
          <p className="text-base leading-relaxed text-foreground/90">{book.summary[lang]}</p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 mb-10">
          <SpoilerBlock level="soft" title={t.spoilerSoft[lang]}>
            {book.spoilerSoft[lang]}
          </SpoilerBlock>
          <SpoilerBlock level="hard" title={t.spoilerHard[lang]}>
            {book.spoilerHard[lang]}
          </SpoilerBlock>
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
              {book.whoFor[lang].map((line: string) => <li key={line}>· {line}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-destructive">
              <X className="h-4 w-4" /> {t.whoNot[lang]}
            </h3>
            <ul className="space-y-1.5 text-sm">
              {book.whoNot[lang].map((line: string) => <li key={line}>· {line}</li>)}
            </ul>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold mb-4">
              {lang === "zh" ? "同類結局推薦" : "Similar endings"}
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.slug} to="/books/$slug" params={{ slug: r.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-accent/60 transition-colors">
                  <EndingBadge ending={r.ending} />
                  <p className="font-display font-semibold mt-2">{r.title[lang]}</p>
                  <p className="text-xs text-muted-foreground">{r.author[lang]}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
