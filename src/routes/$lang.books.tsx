import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { siteUrl, langAlt } from "@/lib/seo";

const EN_FAQ = [
  {
    q: "What is this book library for?",
    a: "The library is a pre-read decision tool. For each novel we summarize the ending tone (HE, BE, OE, Bittersweet, Ambiguous), list trigger warnings with intensity levels, and give a clear read-or-skip verdict so you can decide whether a book is right for you right now.",
  },
  {
    q: "Can I check whether a book has a happy ending?",
    a: "Yes. Every entry is tagged with an ending type. You can filter the catalog by HE (Happy Ending), BE (Bad / Tragic Ending), OE (Open Ending), Bittersweet, Ambiguous, or Unknown, or browse curated collections such as happy-ending books and sad-ending books.",
  },
  {
    q: "Are full spoilers shown immediately?",
    a: "No. Each book page has three spoiler layers: a spoiler-safe summary, a mild-spoiler tone note, and a full-spoiler section that is collapsed by default. You only see hard spoilers if you click to reveal them.",
  },
  {
    q: "How are trigger warnings handled?",
    a: "Trigger warnings are listed with a low / mid / high intensity label so you can judge severity at a glance. You can also browse the dedicated warning pages (for example pet death, cheating, self-harm) to find or avoid books that contain a specific theme.",
  },
  {
    q: "Does this site provide full book texts?",
    a: "No. We never host the full text of any novel and we do not link to pirated downloads. The library only provides pre-read decision information — endings, warnings, summaries, and reader guidance. Copyright belongs to the original authors and publishers.",
  },
  {
    q: "How can I report incorrect book information?",
    a: "If an ending tag or trigger warning looks wrong, please email report@bookendingcheck.xyz with the book title and the issue. Copyright or takedown requests should go to copyright@bookendingcheck.xyz.",
  },
];

const COLLECTION_LINKS = [
  { slug: "happy-ending-books", label: "Happy ending books" },
  { slug: "sad-ending-books", label: "Sad ending books" },
  { slug: "bittersweet-ending-books", label: "Bittersweet ending books" },
  { slug: "romance-ending-finder", label: "Romance ending finder" },
  { slug: "ya-trigger-warnings", label: "YA trigger warnings" },
  { slug: "cheating-warning", label: "Cheating warning list" },
  { slug: "pet-death-warning", label: "Pet death warning list" },
  { slug: "read-or-skip", label: "Read or skip picks" },
];

const WARNING_LINKS = [
  { slug: "pet-death", label: "Pet death" },
  { slug: "cheating", label: "Cheating / infidelity" },
  { slug: "self-harm", label: "Self-harm" },
  { slug: "sexual-violence", label: "Sexual violence" },
  { slug: "major-character-death", label: "Major character death" },
];

const ENDING_LINKS: { slug: Ending; label: string }[] = [
  { slug: "HE", label: "HE — Happy Ending" },
  { slug: "BE", label: "BE — Bad / Tragic Ending" },
  { slug: "OE", label: "OE — Open Ending" },
  { slug: "Bittersweet", label: "Bittersweet" },
  { slug: "Ambiguous", label: "Ambiguous" },
];

export const Route = createFileRoute("/$lang/books")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "全部小說作品庫 | 讀前決策站"
      : "Book Library — Endings, Trigger Warnings & Read-or-Skip | NovelCheck";
    const desc = lang === "zh"
      ? "瀏覽全部已收錄小說，依結局類型（HE/BE/OE/Bittersweet/Ambiguous）與避雷標籤篩選，並查看 Read or Skip 決策卡。"
      : "Browse the full novel library by ending tone (HE, BE, OE, Bittersweet, Ambiguous), check trigger warnings, read spoiler-safe summaries, and get a clear read-or-skip verdict before you start.";

    const scripts: Array<{ type: string; children: string }> = [];

    if (lang === "en") {
      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: EN_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Featured books",
        itemListElement: books.slice(0, 25).map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteUrl}/en/book/${b.slug}`,
          name: b.title.en,
        })),
      };
      scripts.push(
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
        { type: "application/ld+json", children: JSON.stringify(itemListLd) },
      );
    }

    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/books` }, ...langAlt("/books")],
      scripts,
    };
  },
  component: BooksPage,
});

const endingsList: (Ending | "All")[] = ["All", ...ENDINGS];

function BooksPage() {
  const lang = useLang();
  const [filter, setFilter] = useState<Ending | "All">("All");
  const list = useMemo(() => filter === "All" ? books : books.filter((b) => b.ending === filter), [filter]);

  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.books[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">{t.books[lang]}</h1>
      <p className="text-muted-foreground mb-6">{t.filterEnding[lang]}</p>

      {lang === "en" && (
        <section className="mb-10 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/90">
          <p>
            Welcome to the NovelCheck book library — a pre-read decision tool for readers
            who want to know what they are getting into before opening the first page. Every
            novel in the catalog is tagged with an ending tone (HE, BE, OE, Bittersweet,
            Ambiguous, or Unknown), a set of trigger warnings with low / mid / high
            intensity, a spoiler-safe summary, and a plain-language read-or-skip verdict.
          </p>
          <p>
            Use this library to <strong>browse novels by ending tone</strong>, <strong>check
            trigger warnings</strong> before you commit emotional energy to a book,{" "}
            <strong>compare spoiler-safe summaries</strong> across similar titles, and{" "}
            <strong>find read-or-skip guidance</strong> tailored to your current mood. You
            can also discover books by genre, by specific content warning, or by emotional
            tone — useful when you need a comfort read, want to avoid a particular theme,
            or are looking for something that matches a very specific feeling.
          </p>
          <p>
            We are deliberately spoiler-conscious. Every book page is structured in three
            layers: a safe summary you can read freely, a mild-spoiler note about tone and
            direction, and a full-spoiler block that stays collapsed until you choose to
            reveal it. The library does not host full novel text and does not link to
            pirated copies — only the information you need to decide whether a book is
            right for you right now.
          </p>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">How to use this library</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/90">
            <li>Search by title or author to jump straight to a book&apos;s decision card.</li>
            <li>Browse by ending type using the filter buttons below or the ending pages.</li>
            <li>Check content warnings before reading so a book never blindsides you.</li>
            <li>Use the layered spoiler blocks safely — full spoilers stay hidden by default.</li>
            <li>Compare similar books via the &ldquo;Who it&apos;s for&rdquo; and &ldquo;Who should skip&rdquo; sections.</li>
            <li>Follow links to collection and warning pages to discover more titles in the same vein.</li>
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Browse by reader need</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {COLLECTION_LINKS.map((c) => (
              <li key={c.slug}>
                <a href={`/en/collections/${c.slug}`} className="text-accent hover:underline">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Browse by warning</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {WARNING_LINKS.map((w) => (
              <li key={w.slug}>
                <a href={`/en/warnings/${w.slug}`} className="text-accent hover:underline">
                  {w.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Browse by ending</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            {ENDING_LINKS.map((e) => (
              <li key={e.slug}>
                <a href={`/en/endings/${e.slug}`} className="text-accent hover:underline">
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {endingsList.map((e) => (
          <button key={e} onClick={() => setFilter(e)}
            className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${filter === e ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {e === "All" ? t.all[lang] : <EndingBadge ending={e} />}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">{t.noResults[lang]}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => <BookCard key={b.slug} book={b} />)}
        </div>
      )}

      {lang === "en" && (
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {EN_FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium text-base mb-1">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
