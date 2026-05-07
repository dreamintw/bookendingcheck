import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { Search, Sparkles } from "lucide-react";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "小說結局查詢、避雷標籤與讀前決策工具 | 讀前決策站"
      : "Book Ending Checker & Reader Decision Tool | NovelCheck";
    const desc = lang === "zh"
      ? "輸入書名，快速查看這本小說是 HE、BE、OE，是否有高風險雷點，以及它是否適合你現在閱讀。"
      : "Search a book to check its ending tone, trigger warnings, spoiler-safe summary, and whether it is right for you.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}` },
        ...langAlt("/"),
      ],
    };
  },
  component: HomePage,
});

const endingsList: (Ending | "All")[] = ["All", ...ENDINGS];

function HomePage() {
  const lang = useLang();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Ending | "All">("All");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return books.filter((b) => {
      if (filter !== "All" && b.ending !== filter) return false;
      if (!needle) return true;
      const hay = [b.title.zh, b.title.en, b.author.zh, b.author.en, b.genre.zh, b.genre.en, b.isbn ?? "", ...b.triggers.flatMap((tr) => [tr.zh, tr.en])].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [q, filter]);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {lang === "zh" ? "讀前 30 秒決策" : "30-second pre-read"}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
            {t.tagline[lang]}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.heroSub[lang]}
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder[lang]}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              aria-label={t.searchPlaceholder[lang]}
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {endingsList.map((e) => (
              <button
                key={e}
                onClick={() => setFilter(e)}
                className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${filter === e ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {e === "All" ? t.all[lang] : <EndingBadge ending={e} />}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <Link to="/$lang/endings" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByEnding[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/warnings" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByWarning[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/genres" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByGenre[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/authors" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByAuthor[lang]}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold">{t.browseAll[lang]}</h2>
          <Link to="/$lang/books" params={{ lang }} className="text-sm text-accent hover:underline">
            {t.books[lang]} →
          </Link>
        </div>
        {results.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{t.noResults[lang]}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        )}
      </section>
    </>
  );
}
