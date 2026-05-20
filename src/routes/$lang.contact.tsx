import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

const CONTACT_EMAIL = "contact@bookendingcheck.xyz";
const COPYRIGHT_EMAIL = "copyright@bookendingcheck.xyz";
const REPORT_EMAIL = "report@bookendingcheck.xyz";
const PRIVACY_EMAIL = "privacy@bookendingcheck.xyz";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "聯絡我們 | 讀前決策站" : "Contact | NovelCheck";
    const desc = lang === "zh"
      ? "聯絡讀前決策站：錯誤回報、版權問題、一般合作。本站提供 mailto 聯絡，所有回報皆會人工審閱。"
      : "Contact NovelCheck: report errors, copyright concerns, or general inquiries. We review every report manually.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/contact` }, ...langAlt("/contact")],
    };
  },
  component: Contact,
});

function Contact() {
  const lang = useLang();
  const c = lang === "zh" ? {
    h1: "聯絡我們",
    intro: "我們重視讀者回饋。請依照您的需求選擇下方對應的聯絡方式，所有信件會由人工審閱，通常在 7 個工作日內回覆。",
    sections: [
      {
        h: "錯誤回報（結局 / 避雷標籤 / 書籍資訊）",
        p: "若您發現某本書的結局分類、避雷標籤、摘要或作者資訊有誤，請來信並附上：書名、頁面 URL、您認為正確的資訊與來源。",
        email: REPORT_EMAIL,
        label: "寄送錯誤回報",
      },
      {
        h: "版權問題（DMCA / 內容下架）",
        p: "若您是版權持有人，認為本站某頁面侵害了您的權益，請來信並附上：作品名稱、相關頁面 URL、您與版權的關係，以及您希望我們採取的措施。",
        email: COPYRIGHT_EMAIL,
        label: "寄送版權通知",
      },
      {
        h: "一般聯絡（合作 / 問題 / 建議）",
        p: "其他任何問題、合作邀約或功能建議，歡迎來信。",
        email: CONTACT_EMAIL,
        label: "一般聯絡",
      },
      {
        h: "隱私與資料刪除（Cookies / 查詢 / 更正）",
        p: "若您想查詢、更正或刪除與您相關的資料，或對本站的隱私權政策與 Cookie 使用有疑問，請來信。",
        email: PRIVACY_EMAIL,
        label: "寄送隱私/資料請求",
      },
    ],
    note: "本站目前未提供線上表單，僅透過 email 聯絡。聯絡信箱均已啟用轉寄，所有回報皆會由人工審閱。我們不會將您的 email 用於行銷，也不會轉售給第三方。",
  } : {
    h1: "Contact",
    intro: "We value reader feedback. Pick the address that matches your request below — every email is reviewed by a human, usually within 7 business days.",
    sections: [
      {
        h: "Report an error (ending / trigger / book info)",
        p: "If a book's ending classification, trigger warnings, summary, or author info looks wrong, email us with: the book title, the page URL, what you believe is correct, and your source.",
        email: REPORT_EMAIL,
        label: "Send an error report",
      },
      {
        h: "Copyright concerns (DMCA / takedown)",
        p: "If you are a rights holder and believe a page on this site infringes your rights, email us with: the work, the page URL, your relationship to the rights, and what action you'd like us to take.",
        email: COPYRIGHT_EMAIL,
        label: "Send a copyright notice",
      },
      {
        h: "General contact (partnership / questions / suggestions)",
        p: "For anything else — partnerships, questions, or feature requests — email us here.",
        email: CONTACT_EMAIL,
        label: "General contact",
      },
    ],
    note: "We do not yet offer an online form — email is the only contact channel. We never use your email for marketing and never sell it to third parties.",
  };

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{c.h1}</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold mb-6">{c.h1}</h1>
      <p className="text-foreground/90 leading-relaxed mb-8">{c.intro}</p>
      <div className="space-y-5">
        {c.sections.map((s) => (
          <section key={s.email} className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold mb-2">{s.h}</h2>
            <p className="text-sm text-muted-foreground mb-3">{s.p}</p>
            <a href={`mailto:${s.email}`} className="text-sm font-medium text-accent hover:underline">
              {s.label} → {s.email}
            </a>
          </section>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-8">{c.note}</p>
      <p className="text-xs text-muted-foreground mt-2">{t.noFullText[lang]}</p>
    </main>
  );
}
