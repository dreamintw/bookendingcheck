import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/privacy")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh" ? "隱私權政策 | 讀前決策站" : "Privacy Policy | NovelCheck";
    const desc = lang === "zh"
      ? "讀前決策站隱私權政策：說明 cookies、Google Analytics、未來可能的第三方廣告（Google AdSense）、資料保留與聯絡刪除方式。本站不出售個人資料。"
      : "NovelCheck privacy policy: cookies, Google Analytics, possible future third-party ads (Google AdSense), data retention, and how to request deletion. We do not sell personal data.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/privacy` }, ...langAlt("/privacy")],
    };
  },
  component: Privacy,
});

function Privacy() {
  const lang = useLang();
  const updated = "2026-05-20";

  const c = lang === "zh" ? {
    h1: "隱私權政策",
    updated: `最後更新：${updated}`,
    sections: [
      ["我們收集哪些資料",
        "本站不要求註冊、不要求登入，因此不會主動蒐集姓名、電話或地址等個人識別資料。當您瀏覽本站時，伺服器與第三方分析工具可能會記錄一般技術資訊，例如 IP 位址、瀏覽器類型、裝置型號、來源頁面、瀏覽路徑與時間戳。",
      ],
      ["Cookies",
        "本站使用必要 cookies 來維持基本網站運作（例如語言偏好），並可能透過 Google Analytics 等第三方服務寫入分析用 cookies，以了解整體流量與熱門頁面。您可以隨時透過瀏覽器設定刪除或封鎖 cookies；停用後不會影響核心瀏覽功能。",
      ],
      ["Google Analytics",
        "本站使用 Google Analytics（GA4，評估 ID：G-WS6RG656JC）以彙總、匿名化的方式分析使用情況。GA 蒐集的資料受 Google 隱私權政策規範：https://policies.google.com/privacy。",
      ],
      ["第三方廣告（未來可能使用 Google AdSense）",
        "本站目前未顯示廣告。未來我們可能加入 Google AdSense 或其他第三方廣告服務。屆時這些服務（包含 Google）可能使用 cookies 或廣告識別碼，根據您先前對本站及網路上其他網站的造訪，向您顯示廣告。您可前往 https://www.google.com/settings/ads 管理個人化廣告偏好，或於 https://www.aboutads.info 停用第三方廠商的 cookies。",
      ],
      ["我們不出售個人資料",
        "本站不會將任何使用者資料販售給第三方，也不會用於與本站宗旨無關的行銷活動。",
      ],
      ["資料保留",
        "分析資料依各服務（如 Google Analytics）預設保留期保留。錯誤回報與聯絡信件保留至處理完成後合理期間，最長 24 個月。",
      ],
      ["您的權利與聯絡方式",
        "您可隨時來信查詢、更正或要求刪除本站持有的、與您相關的資料。",
        "privacy@bookendingcheck.xyz",
      ],
      ["兒童隱私",
        "本站內容面向一般讀者，不主動向 13 歲以下兒童蒐集個人資料。",
      ],
      ["政策更新",
        "本政策可能不定期更新，更新日期會註明於本頁頂部。",
      ],
    ],
  } : {
    h1: "Privacy Policy",
    updated: `Last updated: ${updated}`,
    sections: [
      ["What we collect",
        "This site does not require sign-up or login, so we do not actively collect personal identifiers such as name, phone, or address. When you visit, our server and third-party analytics tools may record general technical information such as IP address, browser type, device, referrer, navigation paths, and timestamps.",
      ],
      ["Cookies",
        "We use essential cookies to keep basic site features working (e.g. language preference) and may use third-party services such as Google Analytics that set analytics cookies to understand overall traffic and popular pages. You can delete or block cookies through your browser; disabling them does not affect core browsing.",
      ],
      ["Google Analytics",
        "This site uses Google Analytics (GA4, measurement ID G-WS6RG656JC) to analyze usage in aggregate, anonymized form. Data collected by GA is governed by Google's privacy policy: https://policies.google.com/privacy.",
      ],
      ["Third-party advertising (possible future Google AdSense)",
        "We currently do not display advertisements. We may in the future add Google AdSense or other third-party ad networks. When that happens, these services (including Google) may use cookies or advertising identifiers to serve ads based on your prior visits to this site and other sites on the internet. You can manage personalized ad preferences at https://www.google.com/settings/ads or opt out of third-party vendor cookies at https://www.aboutads.info.",
      ],
      ["We do not sell personal data",
        "We do not sell user data to third parties and do not use it for marketing unrelated to this site's purpose.",
      ],
      ["Data retention",
        "Analytics data is retained according to each provider's default (e.g. Google Analytics). Error reports and contact emails are kept for a reasonable period after handling, up to 24 months.",
      ],
      ["Your rights & how to contact us",
        "You may email us at privacy@bookendingcheck.xyz at any time to access, correct, or request deletion of data about you. We will respond within a reasonable timeframe.",
      ],
      ["Children's privacy",
        "This site is intended for general readers and does not knowingly collect data from children under 13.",
      ],
      ["Updates",
        "This policy may be updated from time to time; the update date will be shown at the top of this page.",
      ],
    ],
  };

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{c.h1}</span>
      </nav>
      <h1 className="font-display text-4xl font-semibold mb-2">{c.h1}</h1>
      <p className="text-xs text-muted-foreground mb-8">{c.updated}</p>
      <div className="space-y-6">
        {c.sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-display text-xl font-semibold mb-2">{h}</h2>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{p}</p>
          </section>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-10">{t.noFullText[lang]}</p>
    </main>
  );
}
