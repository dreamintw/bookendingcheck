import type { Book } from "@/data/books";
import { Link } from "@tanstack/react-router";
import { useLang, t } from "@/lib/i18n";
import { EndingBadge } from "./EndingBadge";

export function BookCard({ book }: { book: Book }) {
  const lang = useLang();
  const decisionDot = {
    read: "bg-[color:var(--read)]",
    skip: "bg-[color:var(--skip)]",
    caution: "bg-[color:var(--caution)]",
  }[book.decision];
  return (
    <Link
      to="/$lang/book/$slug"
      params={{ lang, slug: book.slug }}
      className="group block rounded-xl border border-border bg-card p-5 hover:border-accent/60 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-accent transition-colors">
          {book.title[lang]}
        </h3>
        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${decisionDot}`} aria-hidden />
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        {t.by[lang]} {book.author[lang]} · {book.year} · {book.genre[lang]}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <EndingBadge ending={book.ending} />
        {book.triggers.slice(0, 2).map((tr) => (
          <span key={tr.code} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
            {tr[lang]}
          </span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{book.summary[lang]}</p>
    </Link>
  );
}
