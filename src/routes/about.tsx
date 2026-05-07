import { createFileRoute } from "@tanstack/react-router";
import { useLang, t } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NovelCheck" },
      { name: "description", content: "NovelCheck is a bilingual pre-read decision tool. We do not host full novel text — only structured ending classifications, trigger warnings, and Read-or-Skip verdicts." },
      { property: "og:title", content: "About — NovelCheck" },
      { property: "og:description", content: "A structured database to decide whether a novel is right for you. No piracy, no full text — just decision data." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const [lang] = useLang();
  const content = lang === "zh" ? {
    h1: "關於本站",
    p1: "本站是一個結構化的「讀前決策」工具，幫助讀者在 30 秒內判斷一本小說是否適合自己。",
    p2: "我們不提供小說全文，不提供盜版下載，也不做大段逐章復述。我們只提供：短摘要、結局分類（HE / BE / OE / Bittersweet / Ambiguous）、避雷標籤矩陣，以及讀 or 略決策卡。",
    p3: "所有結局劇透預設模糊處理，由您主動點擊揭露。",
    h2: "我們的分類",
    items: [
      ["HE — Happy Ending", "圓滿、團聚、希望"],
      ["BE — Bad / Tragic Ending", "主要角色死亡或悲劇收場"],
      ["OE — Open Ending", "結局留白、未明確解答"],
      ["Bittersweet", "苦樂參半，有失有得"],
      ["Ambiguous", "情感與道德上的曖昧未決"],
    ],
  } : {
    h1: "About",
    p1: "NovelCheck is a structured pre-read decision tool. We help readers decide in 30 seconds whether a novel is right for them.",
    p2: "We do not host full text or pirated downloads, and we do not paraphrase chapters. We only provide: short summaries, ending classifications (HE / BE / OE / Bittersweet / Ambiguous), trigger-warning matrices, and a Read-or-Skip verdict card.",
    p3: "All ending spoilers are blurred by default — you choose when to reveal them.",
    h2: "Our classifications",
    items: [
      ["HE — Happy Ending", "Reunion, hope, resolution."],
      ["BE — Bad / Tragic Ending", "Major character death or tragic close."],
      ["OE — Open Ending", "Deliberately unresolved."],
      ["Bittersweet", "Both gain and loss."],
      ["Ambiguous", "Emotionally or morally unsettled."],
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <h1 className="font-display text-4xl font-semibold mb-6">{content.h1}</h1>
        <div className="space-y-4 text-foreground/90 leading-relaxed">
          <p>{content.p1}</p>
          <p>{content.p2}</p>
          <p>{content.p3}</p>
        </div>
        <h2 className="font-display text-2xl font-semibold mt-10 mb-4">{content.h2}</h2>
        <ul className="space-y-3">
          {content.items.map(([k, v]) => (
            <li key={k} className="rounded-lg border border-border bg-card p-4">
              <p className="font-display font-semibold">{k}</p>
              <p className="text-sm text-muted-foreground">{v}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-10">{t.noFullText[lang]}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
