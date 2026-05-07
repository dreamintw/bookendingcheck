import { Link } from "@tanstack/react-router";
import { useLang, t } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";
import { BookOpenCheck } from "lucide-react";

export function SiteHeader() {
  const [lang] = useLang();
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <BookOpenCheck className="h-5 w-5 text-accent" />
          <span>{t.siteName[lang]}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link to="/" activeOptions={{ exact: true }} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
            {t.home[lang]}
          </Link>
          <Link to="/books" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
            {t.books[lang]}
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
            {t.about[lang]}
          </Link>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const [lang] = useLang();
  return (
    <footer className="border-t border-border mt-16 py-8 text-xs text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 space-y-2">
        <p>{t.noFullText[lang]}</p>
        <p>© {new Date().getFullYear()} {t.siteName[lang]}</p>
      </div>
    </footer>
  );
}
