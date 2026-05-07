import { createFileRoute, Link } from "@tanstack/react-router";
import { ENDINGS, books } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { EndingBadge } from "@/components/EndingBadge";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/endings/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "依結局類型瀏覽小說 | 讀前決策站" : "Browse Novels by Ending Type | NovelCheck";
    const desc = lang === "zh" ? "依 HE / BE / OE / Bittersweet / Ambiguous 等結局類型瀏覽全部小說。" : "Browse all novels by ending: HE, BE, OE, Bittersweet, Ambiguous.";
    return { meta: [{ title }, { name: "description", content: desc }], links: [{ rel: "canonical", href: `${siteUrl}/${lang}/endings` }, ...langAlt("/endings")] };
  },
  component: EndingsIndex,
});

function EndingsIndex() {
  const lang = useLang();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4"><Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.endings[lang]}</span></nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{t.browseByEnding[lang]}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ENDINGS.map((e) => {
          const count = books.filter((b) => b.ending === e).length;
          return (
            <Link key={e} to="/$lang/endings/$ending" params={{ lang, ending: e }} className="rounded-xl border border-border bg-card p-5 hover:border-accent/60 transition-colors">
              <EndingBadge ending={e} full />
              <p className="text-xs text-muted-foreground mt-2">{count} {lang === "zh" ? "本" : "books"}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
