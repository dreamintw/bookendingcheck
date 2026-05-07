import { createFileRoute, Link } from "@tanstack/react-router";
import { books, getAllTriggers } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/warnings/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "避雷標籤總覽 | 讀前決策站" : "Trigger Warning Index | NovelCheck";
    const desc = lang === "zh" ? "依避雷標籤瀏覽小說：自殺、自傷、性暴力、家暴、寵物死亡、外遇、成癮、霸凌、精神疾病等。" : "Browse novels by trigger warnings: suicide, self-harm, sexual violence, domestic abuse, pet death, infidelity, addiction, bullying, mental illness, and more.";
    return { meta: [{ title }, { name: "description", content: desc }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/warnings` }, ...langAlt("/warnings")] };
  },
  component: WarningsIndex,
});

function WarningsIndex() {
  const lang = useLang();
  const all = getAllTriggers();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4"><Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.warnings[lang]}</span></nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{t.browseByWarning[lang]}</h1>
      <div className="flex flex-wrap gap-2">
        {all.map((tr) => {
          const count = books.filter((b) => b.triggers.some((x) => x.code === tr.code)).length;
          return (
            <Link key={tr.code} to="/$lang/warnings/$code" params={{ lang, code: tr.code }}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:border-accent/60 transition-colors">
              {tr[lang]} <span className="text-muted-foreground text-xs">· {count}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
