import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "關於本站 | 讀前決策站" : "About | NovelCheck";
    const desc = lang === "zh"
      ? "本站是雙語小說讀前決策工具，提供結局分類、避雷標籤與 Read or Skip 決策卡，不提供小說全文與盜版下載。"
      : "A bilingual pre-read decision tool: ending classifications, trigger warnings, and a Read-or-Skip card. No full text, no piracy.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/about` }, ...langAlt("/about")],
    };
  },
  component: About,
});

function About() {
  const lang = useLang();
  const c = lang === "zh" ? {
    h1: "關於本站",
    p1: "本站是一個雙語的「讀前決策」工具，幫助讀者在 30 秒內判斷一本小說是否適合自己。",
    p2: "我們不提供小說全文，不提供盜版下載，也不做大段逐章復述。我們只提供：短摘要、結局分類（HE / BE / OE / Bittersweet / Ambiguous / Unknown）、避雷標籤矩陣，以及讀 or 略決策卡。",
    p3: "完整劇透預設折疊，由您主動點擊揭露。",
    h2: "結局分類",
    items: [
      ["HE — Happy Ending", "圓滿、團聚、希望"],
      ["BE — Bad / Tragic Ending", "主要角色死亡或悲劇收場"],
      ["OE — Open Ending", "結局留白、未明確解答"],
      ["Bittersweet", "苦樂參半，有失有得"],
      ["Ambiguous", "情感與道德上的曖昧未決"],
      ["Unknown", "尚未判定 / 未提供"],
    ],
  } : {
    h1: "About",
    p1: "NovelCheck is a bilingual pre-read decision tool. We help readers decide in 30 seconds whether a novel is right for them.",
    p2: "We do not host full text or pirated downloads, and we do not paraphrase chapters. We only provide: short summaries, ending classifications (HE / BE / OE / Bittersweet / Ambiguous / Unknown), trigger-warning matrices, and a Read-or-Skip verdict card.",
    p3: "Full ending spoilers are collapsed by default — you choose when to reveal them.",
    h2: "Ending classifications",
    items: [
      ["HE — Happy Ending", "Reunion, hope, resolution."],
      ["BE — Bad / Tragic Ending", "Major character death or tragic close."],
      ["OE — Open Ending", "Deliberately unresolved."],
      ["Bittersweet", "Both gain and loss."],
      ["Ambiguous", "Emotionally or morally unsettled."],
      ["Unknown", "Not yet classified."],
    ],
  };

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.about[lang]}</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold mb-6">{c.h1}</h1>
      <div className="space-y-4 text-foreground/90 leading-relaxed">
        <p>{c.p1}</p><p>{c.p2}</p><p>{c.p3}</p>
      </div>
      <h2 className="font-display text-2xl font-semibold mt-10 mb-4">{c.h2}</h2>
      <ul className="space-y-3">
        {c.items.map(([k, v]) => (
          <li key={k} className="rounded-lg border border-border bg-card p-4">
            <p className="font-display font-semibold">{k}</p>
            <p className="text-sm text-muted-foreground">{v}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-10">{t.noFullText[lang]}</p>
    </main>
  );
}
