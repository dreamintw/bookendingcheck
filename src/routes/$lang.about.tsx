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

  const purpose = lang === "zh" ? {
    h: "本站用途",
    body: "「讀前決策站 / NovelCheck」是一個專注於小說讀前判斷的工具，主要功能包括三個面向：(1) book ending checker — 標示每本書的結局是 HE 圓滿、BE 悲劇、OE 開放、Bittersweet 苦樂參半或 Ambiguous 曖昧；(2) trigger warning guide — 整理可能引起讀者不適的內容標籤（如死亡、虐待、自傷、性暴力等），並標註強度；(3) reader decision tool — 以 Read or Skip 決策卡告訴您這本書是否適合您現在的心情與閱讀偏好。",
  } : {
    h: "What this site does",
    body: "NovelCheck is a focused pre-read tool with three core features: (1) a book ending checker that labels each book HE / BE / OE / Bittersweet / Ambiguous; (2) a trigger warning guide that maps potentially distressing content (death, abuse, self-harm, sexual violence, etc.) with intensity levels; and (3) a reader decision tool — a Read-or-Skip card that tells you whether a book fits your current mood and reading preferences.",
  };

  const sources = lang === "zh" ? {
    h: "資料來源與編輯方式",
    body: "本站的條目由四種來源組成並交叉比對：(a) AI-assisted drafts — 由語言模型根據公開資訊產生的初稿；(b) editorial review — 由人工編輯複核分類、強度與摘要措辭；(c) public metadata — 來自公開書目、出版社介紹、書評等可公開取得的資訊；(d) user reports — 讀者透過聯絡頁回報的更正與補充。對於不確定的條目，我們會明確標示為 low confidence 或 unknown，而非編造內容。",
  } : {
    h: "How we source and edit",
    body: "Every entry is built from four cross-checked sources: (a) AI-assisted drafts produced by language models from public information; (b) editorial review where humans verify classifications, intensities, and summary wording; (c) public metadata from bibliographic data, publisher copy, and reviews; (d) user reports submitted via the contact page. When uncertain, we mark entries as low confidence or unknown rather than fabricate content.",
  };

  const goal = lang === "zh" ? {
    h: "我們的目標",
    body: "我們不替您決定一本書好不好，而是讓您在 30 秒內知道：這本書的氛圍走向、可能踩到的雷、以及它是否值得在這個當下進入。最終的閱讀決定永遠在您手上。",
  } : {
    h: "Our goal",
    body: "We do not decide whether a book is good for you. We help you know — in 30 seconds — the book's emotional direction, the triggers you might hit, and whether it is worth entering right now. The final reading decision is always yours.",
  };

  const noFullText = lang === "zh" ? {
    h: "我們不做的事",
    body: "本站不提供小說全文、不提供盜版下載、不做大段逐章復述、也不取代原作閱讀。完整劇透預設折疊，由您主動點擊揭露。所有書籍版權歸原作者與出版方所有。",
  } : {
    h: "What we don't do",
    body: "We do not host full text, do not provide pirated downloads, do not paraphrase chapters, and do not replace reading the original. Full spoilers are collapsed by default and revealed only when you click. All rights belong to the original authors and publishers.",
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

      {[purpose, sources, goal, noFullText].map((s) => (
        <section key={s.h} className="mt-8">
          <h2 className="font-display text-2xl font-semibold mb-2">{s.h}</h2>
          <p className="text-foreground/90 leading-relaxed">{s.body}</p>
        </section>
      ))}

      <h2 className="font-display text-2xl font-semibold mt-10 mb-4">{c.h2}</h2>
      <ul className="space-y-3">
        {c.items.map(([k, v]) => (
          <li key={k} className="rounded-lg border border-border bg-card p-4">
            <p className="font-display font-semibold">{k}</p>
            <p className="text-sm text-muted-foreground">{v}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link to="/$lang/contact" params={{ lang }} className="text-accent hover:underline">
          {lang === "zh" ? "聯絡我們" : "Contact"}
        </Link>
        <Link to="/$lang/privacy" params={{ lang }} className="text-accent hover:underline">
          {lang === "zh" ? "隱私權政策" : "Privacy"}
        </Link>
        <Link to="/$lang/disclaimer" params={{ lang }} className="text-accent hover:underline">
          {lang === "zh" ? "免責聲明" : "Disclaimer"}
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-10">{t.noFullText[lang]}</p>
    </main>
  );
}
