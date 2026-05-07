import { Link, useLocation, useParams } from "@tanstack/react-router";
import type { Lang } from "@/lib/i18n";

export function LangSwitch() {
  const params = useParams({ strict: false }) as { lang?: string };
  const loc = useLocation();
  const current: Lang = params.lang === "en" ? "en" : "zh";

  const buildHref = (target: Lang) => {
    const path = loc.pathname;
    if (/^\/(zh|en)(\/|$)/.test(path)) {
      return path.replace(/^\/(zh|en)/, `/${target}`) || `/${target}`;
    }
    return `/${target}`;
  };

  return (
    <div className="inline-flex rounded-md border border-border bg-card text-xs font-medium overflow-hidden">
      <Link
        to={buildHref("zh")}
        className={`px-2.5 py-1 transition-colors ${current === "zh" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={current === "zh"}
        hrefLang="zh"
      >
        中文
      </Link>
      <Link
        to={buildHref("en")}
        className={`px-2.5 py-1 transition-colors ${current === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={current === "en"}
        hrefLang="en"
      >
        EN
      </Link>
    </div>
  );
}
