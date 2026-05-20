import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/disclaimer")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "免責聲明 | 讀前決策站" : "Disclaimer | NovelCheck";
    const desc = lang === "zh"
      ? "讀前決策站免責聲明：本站不提供小說全文與盜版下載、不替代原作閱讀；結局與避雷資訊可能不完整或有誤；完整劇透預設折疊。"
      : "NovelCheck disclaimer: we do not host full text or pirated downloads, we do not replace the original work, ending and trigger info may be incomplete or wrong, and full spoilers are collapsed by default.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/disclaimer` }, ...langAlt("/disclaimer")],
    };
  },
  component: Disclaimer,
});

function Disclaimer() {
  const lang = useLang();
  const c = lang === "zh" ? {
    h1: "免責聲明",
    items: [
      ["本站不提供小說全文",
        "讀前決策站僅提供讀前判斷資訊，包含短摘要、結局分類、避雷標籤與決策卡。本站任何頁面均不會、也不應被當成小說全文閱讀來源。"],
      ["本站不提供盜版下載",
        "本站不提供任何形式的小說檔案下載、線上閱讀全文、或盜版連結。若您希望閱讀完整作品，請透過合法管道購買、借閱正版。"],
      ["本站不替代原作閱讀",
        "本站提供的所有摘要、分類與標籤皆為輔助決策用途，不替代原作的閱讀體驗。我們鼓勵讀者支持原作者與正版出版方。"],
      ["結局與避雷資訊可能不完整或有誤",
        "本站資料由 AI 協作草稿、編輯審閱、公開書目資訊與讀者回報共同組成，仍可能存在錯誤、過時或主觀判斷。標示為 low confidence 或 unknown 的條目尤其不應視為定論。若您發現錯誤，歡迎透過聯絡頁回報。"],
      ["完整劇透預設折疊",
        "為了保護尚未閱讀完原作的讀者，full spoilers 區塊在所有書籍頁面預設為折疊狀態，需由使用者主動點擊展開。任何因主動展開而看到劇透造成的不快，由使用者自行承擔。"],
      ["版權聲明",
        "本站提及的所有書名、作者姓名、出版社、封面與書摘相關權利，均歸原作者與出版方所有。本站僅在「合理使用 / 評論與資訊性質」範圍內引用最少必要資訊。若您是版權持有人並認為有任何使用不當之處，請透過聯絡頁來信，我們會儘速處理。"],
      ["責任限制",
        "本站內容僅供參考，因使用本站資訊所做的任何閱讀、購買或其他決定，均由使用者自行負責；本站不對因此造成的任何損失承擔責任。"],
    ],
  } : {
    h1: "Disclaimer",
    items: [
      ["We do not host full text",
        "NovelCheck only provides pre-read decision information: short summaries, ending classifications, trigger warnings, and verdict cards. No page on this site is, or should be used as, a source for reading the full novel."],
      ["We do not host pirated downloads",
        "We do not provide novel file downloads, full-text online reading, or links to pirated copies. To read the full work, please buy or borrow it through legitimate channels."],
      ["We do not replace the original work",
        "All summaries, classifications, and tags on this site are decision aids and do not replace the experience of reading the original. We encourage readers to support the authors and publishers."],
      ["Ending and trigger information may be incomplete or wrong",
        "Our data combines AI-assisted drafts, editorial review, public bibliographic information, and reader reports. It may contain errors, be outdated, or reflect subjective judgement. Entries marked low confidence or unknown should not be treated as definitive. If you spot an error, please report it via the contact page."],
      ["Full spoilers are collapsed by default",
        "To protect readers who have not yet finished the original, full-spoiler sections on every book page are collapsed by default and must be explicitly expanded. Discomfort caused by voluntarily revealing those spoilers is the reader's responsibility."],
      ["Copyright",
        "All book titles, author names, publishers, covers, and excerpt-related rights belong to their respective authors and publishers. This site quotes only the minimum necessary information under fair use for review and informational purposes. If you are a rights holder and believe any use is improper, please contact us via the contact page and we will respond promptly."],
      ["Limitation of liability",
        "Content on this site is provided for reference only. Any reading, purchase, or other decision made based on information here is the user's own responsibility, and this site is not liable for any resulting loss."],
    ],
  };

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{c.h1}</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold mb-6">{c.h1}</h1>
      <div className="space-y-6">
        {c.items.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-display text-xl font-semibold mb-2">{h}</h2>
            <p className="text-sm text-foreground/90 leading-relaxed">{p}</p>
          </section>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-10">
        <Link to="/$lang/contact" params={{ lang }} className="hover:underline">
          {lang === "zh" ? "回報錯誤 / 版權聯絡 →" : "Report an error / copyright contact →"}
        </Link>
      </p>
    </main>
  );
}
