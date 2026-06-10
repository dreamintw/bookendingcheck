import { Link } from "@tanstack/react-router";
import { useLang, t } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";
import { BookOpenCheck } from "lucide-react";

export function SiteHeader() {
  const lang = useLang();
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/$lang" params={{ lang }} className="flex items-center gap-2 font-display text-lg font-semibold">
          <BookOpenCheck className="h-5 w-5 text-accent" />
          <span>{t.siteName[lang]}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/$lang" params={{ lang }} activeOptions={{ exact: true }} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
            {t.home[lang]}
          </Link>
          <Link to="/$lang/books" params={{ lang }} className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
            {t.books[lang]}
          </Link>
          <Link to="/$lang/endings" params={{ lang }} className="text-muted-foreground hover:text-foreground hidden sm:inline" activeProps={{ className: "text-foreground font-medium" }}>
            {t.endings[lang]}
          </Link>
          <Link to="/$lang/warnings" params={{ lang }} className="text-muted-foreground hover:text-foreground hidden sm:inline" activeProps={{ className: "text-foreground font-medium" }}>
            {t.warnings[lang]}
          </Link>
          <Link to="/$lang/about" params={{ lang }} className="text-muted-foreground hover:text-foreground hidden md:inline" activeProps={{ className: "text-foreground font-medium" }}>
            {t.about[lang]}
          </Link>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const lang = useLang();
  const labels = lang === "zh"
    ? { about: "關於", contact: "聯絡我們", privacy: "隱私權", disclaimer: "免責聲明", editorial: "資料與編輯政策" }
    : { about: "About", contact: "Contact", privacy: "Privacy", disclaimer: "Disclaimer", editorial: "Editorial Policy" };
  return (
    <footer className="border-t border-border mt-16 py-8 text-xs text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 space-y-3">
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/$lang/about" params={{ lang }} className="hover:text-foreground">{labels.about}</Link>
          <Link to="/$lang/contact" params={{ lang }} className="hover:text-foreground">{labels.contact}</Link>
          <Link to="/$lang/editorial-policy" params={{ lang }} className="hover:text-foreground">{labels.editorial}</Link>
          <Link to="/$lang/privacy" params={{ lang }} className="hover:text-foreground">{labels.privacy}</Link>
          <Link to="/$lang/disclaimer" params={{ lang }} className="hover:text-foreground">{labels.disclaimer}</Link>
        </nav>
        <p>{t.noFullText[lang]}</p>
        <p>© {new Date().getFullYear()} {t.siteName[lang]}</p>
      </div>
    </footer>
  );
}
