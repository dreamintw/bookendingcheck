import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, type Ending } from "@/data/books";
import { useLang, t } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "All Books — NovelCheck 作品庫" },
      { name: "description", content: "Browse every catalogued novel with ending classification (HE/BE/OE/Bittersweet/Ambiguous), trigger warnings and a Read-or-Skip verdict." },
      { property: "og:title", content: "All Books — NovelCheck" },
      { property: "og:description", content: "Filter novels by ending type and trigger warnings. Bilingual catalog." },
    ],
    links: [{ rel: "canonical", href: "/books" }],
  }),
  component: BooksPage,
});

const endings: (Ending | "All")[] = ["All", "HE", "BE", "OE", "Bittersweet", "Ambiguous"];

function BooksPage() {
  const [lang] = useLang();
  const [filter, setFilter] = useState<Ending | "All">("All");
  const list = useMemo(() => filter === "All" ? books : books.filter((b) => b.ending === filter), [filter]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">{t.books[lang]}</h1>
        <p className="text-muted-foreground mb-6">{t.filterEnding[lang]}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {endings.map((e) => (
            <button
              key={e}
              onClick={() => setFilter(e)}
              className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${filter === e ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
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
      <SiteFooter />
    </div>
  );
}
