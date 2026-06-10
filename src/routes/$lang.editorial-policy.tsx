import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/editorial-policy")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "資料與編輯政策 | 讀前決策站"
      : "Editorial Policy & Data Accuracy | NovelCheck";
    const desc = lang === "zh"
      ? "說明本站書籍結局、避雷標籤資料來源、AI 輔助流程、不確定資訊標記、錯誤回報與版權聯絡方式。"
      : "How NovelCheck sources book ending data and trigger warnings: AI-assisted drafts, editorial review, low-confidence labels, error reports, and copyright contact.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/editorial-policy` },
        ...langAlt("/editorial-policy"),
      ],
    };
  },
  component: EditorialPolicy,
});

type Section = { h: string; body: string };

function EditorialPolicy() {
  const lang = useLang();

  const en = {
    h1: "Editorial Policy & Data Accuracy",
    intro:
      "NovelCheck (bookendingcheck.xyz) is a book ending checker, trigger warning guide, reader decision tool, and spoiler-safe summary service. This page explains where our data comes from, how AI is used, how we handle uncertainty, and how to report errors.",
    sections: [
      {
        h: "1. What this site is for",
        body: "NovelCheck helps readers decide in 30 seconds whether a novel is right for them. We provide: (a) ending classifications (HE / BE / OE / Bittersweet / Ambiguous / Unknown); (b) trigger warning matrices with intensity levels; (c) a Read-or-Skip decision card; (d) short spoiler-safe summaries that avoid major twists.",
      },
      {
        h: "2. Where our data comes from",
        body: "Our data may come from AI-assisted drafts, public metadata, editorial review, user reports, and publicly available book information. We do not scrape paid content, do not copy long passages from the original work, and do not republish copyrighted summaries verbatim.",
      },
      {
        h: "3. How we use AI",
        body: "AI language models may assist with generating initial drafts of summaries, ending classifications, and trigger tags from public information. Every AI-assisted entry is subject to ongoing human review. Entries we are not yet confident about are explicitly labeled as low confidence or unknown rather than guessed at. Readers can report mistakes, and important pages are progressively corrected by editors.",
      },
      {
        h: "4. Endings and trigger warnings",
        body: "Ending tone (happy, sad, bittersweet, open, ambiguous) can be subjective and may differ across readers. Trigger warnings are also subjective — what is mildly upsetting to one reader may be severely distressing to another. We try to label intensity (low / mid / high) and to mark uncertain entries as unknown. Full ending spoilers are folded by default and revealed only when you click; spoiler-safe summaries avoid the major twists.",
      },
      {
        h: "5. What we do NOT provide",
        body: "We do not host full book texts. We do not provide pirated downloads. We do not link to piracy. We do not paraphrase chapters at length, and we are not a replacement for reading the original book. All book rights belong to the original authors and publishers.",
      },
      {
        h: "6. Reporting errors",
        body: "If you spot a wrong ending classification, a missing or mis-tagged trigger warning, or an inaccurate fact, please email us. Include the book title, the page URL, and what you believe is incorrect.",
      },
      {
        h: "7. Copyright concerns",
        body: "If you are a rights holder and believe a page on this site infringes your rights or describes your work inaccurately, please contact us and we will review and correct or remove the entry promptly.",
      },
      {
        h: "8. Privacy",
        body: "For information about cookies, analytics, and how we handle data, see our Privacy page.",
      },
    ] as Section[],
    contactH: "Contact",
    reportLabel: "Error reports (endings / triggers / book info)",
    copyLabel: "Copyright / takedown / rights-holder contact",
    privacyLink: "Privacy Policy",
  };

  const zh = {
    h1: "資料與編輯政策",
    intro:
      "讀前決策站（bookendingcheck.xyz）是一個 book ending checker、trigger warning guide、reader decision tool 與 spoiler-safe summary 工具。本頁說明本站資料來源、AI 使用方式、不確定資訊的處理、錯誤回報與版權聯絡方式。",
    sections: [
      {
        h: "1. 本站用途",
        body: "本站幫助讀者在 30 秒內判斷一本小說是否適合自己，提供四項核心功能：(a) 結局分類（HE 圓滿 / BE 悲劇 / OE 開放 / Bittersweet 苦樂參半 / Ambiguous 曖昧 / Unknown 未知）；(b) 避雷標籤矩陣與強度標示；(c) Read or Skip 讀或略決策卡；(d) 不洩露關鍵反轉的免雷短摘要。",
      },
      {
        h: "2. 資料來源",
        body: "本站資料可能來自 AI 輔助草稿、公開書籍資料、人工整理、使用者回報與公開可查的作品資訊。本站不抓取付費內容、不複製原作大段文字、不逐字轉載受著作權保護的他人摘要。",
      },
      {
        h: "3. AI 內容處理方式",
        body: "AI 語言模型可能協助根據公開資訊生成摘要、結局分類與避雷標籤的初稿。所有 AI 輔助條目都會逐步接受人工複核。對於尚未確定的條目，我們會明確標示為 Low confidence 或 Unknown，而不是臆測。讀者可回報錯誤，重要頁面會由編輯逐步人工校正。",
      },
      {
        h: "4. 結局分類與避雷標籤的主觀性",
        body: "結局氛圍（圓滿 / 悲劇 / 苦樂參半 / 開放 / 曖昧）有主觀成分，不同讀者感受可能不同；避雷標籤同樣會因人而異——對某位讀者輕微的內容，可能對另一位讀者造成強烈不適。我們會盡可能標示強度（低 / 中 / 高），對不確定者標記 Unknown。完整劇透預設折疊，由使用者主動點擊才會展開；免雷摘要會避開關鍵反轉。",
      },
      {
        h: "5. 本站不提供的內容",
        body: "本站不提供小說全文、不提供盜版下載、不連結至盜版來源、不大段復述章節內容，也不取代閱讀原作。所有書籍版權歸原作者與出版方所有。",
      },
      {
        h: "6. 錯誤回報方式",
        body: "如果您發現結局分類錯誤、避雷標籤遺漏或標錯、或事實有誤，歡迎來信。請附上書名、頁面網址，以及您認為應修正的內容。",
      },
      {
        h: "7. 版權問題聯絡方式",
        body: "若您是版權所有人，認為本站某頁面侵犯權利或描述您的作品有誤，請來信通知，我們會盡速複核並修正或下架相關條目。",
      },
      {
        h: "8. 隱私",
        body: "關於 cookies、分析工具與資料處理方式，請參閱本站隱私權政策頁。",
      },
    ] as Section[],
    contactH: "聯絡方式",
    reportLabel: "錯誤回報（結局 / 避雷標籤 / 書籍資訊）",
    copyLabel: "版權 / 移除請求 / 權利人聯絡",
    privacyLink: "隱私權政策",
  };

  const c = lang === "zh" ? zh : en;

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{c.h1}</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold mb-6">{c.h1}</h1>
      <p className="text-foreground/90 leading-relaxed mb-8">{c.intro}</p>

      <div className="space-y-6">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-xl font-semibold mb-2">{s.h}</h2>
            <p className="text-sm text-foreground/90 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold mb-3">{c.contactH}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="mailto:report@bookendingcheck.xyz" className="text-accent hover:underline">
              report@bookendingcheck.xyz
            </a>
            {" — "}{c.reportLabel}
          </li>
          <li>
            <a href="mailto:copyright@bookendingcheck.xyz" className="text-accent hover:underline">
              copyright@bookendingcheck.xyz
            </a>
            {" — "}{c.copyLabel}
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link to="/$lang/privacy" params={{ lang }} className="text-accent hover:underline">
            {c.privacyLink} →
          </Link>
          <Link to="/$lang/about" params={{ lang }} className="text-accent hover:underline">
            {lang === "zh" ? "關於本站" : "About"}
          </Link>
          <Link to="/$lang/disclaimer" params={{ lang }} className="text-accent hover:underline">
            {lang === "zh" ? "免責聲明" : "Disclaimer"}
          </Link>
        </div>
      </section>

      <p className="text-xs text-muted-foreground mt-10">{t.noFullText[lang]}</p>
    </main>
  );
}
