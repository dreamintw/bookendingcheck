import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/books")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "全部小說作品庫 | 讀前決策站"
      : "All Books — Browse the Catalog | NovelCheck";
    const desc = lang === "zh"
      ? "瀏覽全部已收錄小說，依結局類型（HE/BE/OE/Bittersweet/Ambiguous）與避雷標籤篩選，並查看 Read or Skip 決策卡。"
      : "Browse every catalogued novel by ending type and trigger warnings, with a clear Read-or-Skip verdict.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/books` }, ...langAlt("/books")],
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
    </main>
  );
}
