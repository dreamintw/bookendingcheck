import { books, type Book, type Ending } from "./books";

export interface Collection {
  slug: string;
  title: { zh: string; en: string };
  h1: { zh: string; en: string };
  description: { zh: string; en: string };
  intro: { zh: string; en: string }; // 300-600 words long-form intro
  filter: (b: Book) => boolean;
  related: { endings?: Ending[]; warnings?: string[]; genreKeywords?: string[] };
  faq: { q: { zh: string; en: string }; a: { zh: string; en: string } }[];
}

const has = (codes: string[]) => (b: Book) =>
  b.triggers.some((t) => codes.includes(t.code));

export const collections: Collection[] = [
  {
    slug: "happy-ending-books",
    title: {
      zh: "HE 小說｜結局圓滿的小說推薦清單",
      en: "Happy Ending Books — HE Novels with Satisfying Endings",
    },
    h1: { zh: "HE 小說：結局圓滿的小說清單", en: "Happy Ending Books (HE Novels)" },
    description: {
      zh: "想看 HE 小說？這裡彙整所有結局圓滿、不虐主角的書單，附避雷標籤與讀前決策。",
      en: "Looking for happy ending books? A curated HE novel list with trigger warnings and Read-or-Skip verdicts.",
    },
    intro: {
      zh:
        "這個頁面整理所有被標記為 HE（Happy Ending，圓滿結局）的小說。HE 小說的核心特徵是：主要角色在故事結束時保持存活、彼此關係修復或圓滿、或主角達成重要目標。對於正在情緒低潮、想要「保證不被虐」的讀者來說，HE 是最安全的選擇。\n\n在這個列表中，我們不只標示結局類型，還會標示完整的避雷標籤（如戰爭、悲傷、性描寫等），以及這本書「適合誰」、「不適合誰」、整體閱讀信心分數。這樣即使你只想看 HE，也可以一眼判斷哪一本最符合當下的心情。\n\n若你正在比較 HE 與 BE，可以再看看 BE 小說、苦甜結局清單，或進一步用避雷標籤交叉篩選。所有資料以 30 秒讀前決策為原則，不提供小說全文，也不提供盜版下載。",
      en:
        "This page lists every book in our database tagged with a Happy Ending (HE). HE means main characters survive, key relationships are restored, and the protagonist completes their goal. If you are in a low mood and want a story that is guaranteed not to gut-punch you, HE is the safest pick.\n\nEach entry below shows full trigger warnings, who the book is for, who should skip it, and an overall confidence score. Even within HE you can avoid heavy themes (war, addiction, grief) by scanning the warning matrix.\n\nFor comparison, see our Sad Ending and Bittersweet Ending lists, or filter by genre and trigger. We do not host full text or piracy — only structured pre-read decision data.",
    },
    filter: (b) => b.ending === "HE",
    related: { endings: ["HE", "Bittersweet"] },
    faq: [
      {
        q: { zh: "HE 是什麼意思？", en: "What does HE mean?" },
        a: {
          zh: "HE 是 Happy Ending 的縮寫，指主角存活、感情圓滿或目標達成的圓滿結局。",
          en: "HE stands for Happy Ending — main characters survive and the central arc resolves positively.",
        },
      },
      {
        q: { zh: "HE 小說一定沒有避雷點嗎？", en: "Are HE books always safe?" },
        a: {
          zh: "不一定。HE 只代表結局，過程仍可能涉及戰爭、暴力、性描寫等內容，請務必查看避雷標籤。",
          en: "No. HE describes the ending only. Many HE stories still contain heavy content mid-book — always check the trigger warning matrix.",
        },
      },
    ],
  },
  {
    slug: "sad-ending-books",
    title: {
      zh: "BE 小說｜悲劇結局的小說清單",
      en: "Sad Ending Books — BE Novels with Tragic Endings",
    },
    h1: { zh: "BE 小說：悲劇結局清單", en: "Sad Ending Books (BE Novels)" },
    description: {
      zh: "BE（Bad Ending）小說清單，幫你提前知道哪些書會虐、虐到什麼程度，並判斷現在是否適合讀。",
      en: "Sad ending (BE) book list — know in advance which novels will hurt and how much, before you commit.",
    },
    intro: {
      zh:
        "BE（Bad Ending / Tragic Ending）通常指主角死亡、關係徹底破裂、或目標失敗的結局。BE 不一定是「壞作品」，許多文學經典正是因為悲劇收尾才產生強烈的後勁，例如《阿基里斯之歌》、《人間失格》。\n\n但 BE 對讀者的情緒負擔很高，特別是當你近期心情低落、或對「主角死亡」、「自殺」這類題材敏感時。本頁列出所有 BE 小說，並清楚標示自殺、藥物濫用、戰爭、悲痛等避雷項目，讓你在閱讀前 30 秒就能判斷自己是否承受得住。\n\n若你想要相對輕一點的悲傷感受，可以改看 Bittersweet（苦甜參半）類別。",
      en:
        "BE (Bad Ending / Tragic Ending) typically means the main character dies, the central relationship collapses, or the protagonist's goal fails. BE does not equal a bad book — many literary classics owe their power to tragic endings (e.g. The Song of Achilles, No Longer Human).\n\nThe emotional cost is high, especially if you are sensitive to themes like suicide, character death, or war. Use the trigger warning matrix to decide whether to read now, postpone, or skip.\n\nIf you want a lighter form of melancholy, see the Bittersweet Ending list instead.",
    },
    filter: (b) => b.ending === "BE",
    related: { endings: ["BE", "Bittersweet"], warnings: ["death", "suicide", "grief"] },
    faq: [
      {
        q: { zh: "BE 和 Bittersweet 差別？", en: "BE vs Bittersweet?" },
        a: {
          zh: "BE 整體偏向絕望、損失難以彌補；Bittersweet 則苦中有甘，仍保留某種希望或安慰。",
          en: "BE leans fully toward loss with little consolation. Bittersweet still leaves a thread of hope or warmth.",
        },
      },
    ],
  },
  {
    slug: "open-ending-books",
    title: { zh: "開放式結局小說｜OE 清單", en: "Open Ending Books (OE) — Novels Without a Final Answer" },
    h1: { zh: "開放式結局小說（OE）", en: "Open Ending Books (OE)" },
    description: {
      zh: "OE 開放式結局小說一覽，作者刻意不給標準答案的作品清單。",
      en: "Books with open endings (OE) — where the author deliberately leaves the resolution to the reader.",
    },
    intro: {
      zh:
        "開放式結局（OE, Open Ending）指作者在最後一刻刻意停筆，不揭曉角色生死、感情走向或事件結果。讀者必須自己決定怎麼解讀。OE 並非偷懶，而是一種敘事選擇，常見於文學小說、反烏托邦與科幻。\n\n如果你享受「讀完還能反覆討論」的故事，OE 會非常適合你。但若你需要明確的答案、希望情節閉環，OE 可能讓你不舒服。下方清單同時標示每本書的氛圍、避雷項目，以及它的開放程度（資訊不足、留白、雙重解讀）。",
      en:
        "An Open Ending (OE) means the author intentionally withholds final answers — the fate of a character, a relationship, or a plot is left for the reader to decide. OE is a craft choice, not laziness, and is common in literary fiction, dystopia and sci-fi.\n\nIf you enjoy books that keep generating discussion after the last page, OE is for you. If you need closure, OE can be frustrating. The list below flags how open each ending is and what triggers to expect.",
    },
    filter: (b) => b.ending === "OE",
    related: { endings: ["OE", "Ambiguous"] },
    faq: [
      {
        q: { zh: "OE 跟 Ambiguous 有什麼不同？", en: "OE vs Ambiguous?" },
        a: {
          zh: "OE 是劇情未完結；Ambiguous 是劇情完結但解讀曖昧。",
          en: "OE leaves the plot itself unresolved. Ambiguous resolves the plot but leaves meaning open to interpretation.",
        },
      },
    ],
  },
  {
    slug: "bittersweet-ending-books",
    title: { zh: "苦甜結局小說｜Bittersweet Ending 清單", en: "Bittersweet Ending Books" },
    h1: { zh: "苦甜結局小說（Bittersweet）", en: "Bittersweet Ending Books" },
    description: {
      zh: "Bittersweet 結局小說，悲中有甜、有遺憾也有救贖的作品清單。",
      en: "Bittersweet ending novels — sorrow tempered by warmth, regret balanced by hope.",
    },
    intro: {
      zh:
        "Bittersweet（苦甜參半）的結局介於 HE 與 BE 之間：可能有人死去，但留下的人還能繼續前行；可能感情失去，但角色得到自我成長。它的情緒層次比純 HE 或純 BE 更複雜，後勁也常常更長。\n\n這類書適合喜歡「真實人生質感」的讀者：你不會被無條件治癒，但也不會徹底心碎。本清單會標出每本書甜的部分與苦的部分各佔多少。",
      en:
        "Bittersweet sits between HE and BE: someone may be lost, but those left behind keep moving; love may not survive, but a character grows into themselves. The emotional aftertaste is layered and often longer-lasting than a pure HE or BE.\n\nIdeal for readers who want emotional realism — neither cured nor crushed. The list shows how much sweet vs. bitter each book leans.",
    },
    filter: (b) => b.ending === "Bittersweet",
    related: { endings: ["Bittersweet", "HE", "BE"] },
    faq: [],
  },
  {
    slug: "bl-danmei-warnings",
    title: { zh: "BL / Danmei 小說避雷指南", en: "BL / Danmei Novels Trigger Warning Guide" },
    h1: { zh: "BL / Danmei 小說避雷與結局查詢", en: "BL / Danmei Trigger Warnings & Endings" },
    description: {
      zh: "BL、耽美、Danmei 小說避雷標籤與 HE/BE 速查，避開高風險雷點。",
      en: "Trigger warnings and HE/BE quick check for BL / Danmei novels.",
    },
    intro: {
      zh:
        "BL / 耽美 / Danmei 是同一文化光譜的不同名稱，常見高密度的情感拉扯與重雷情節：分離、誤會、暴力、性侵設定、HE 反轉 BE 等。本頁專門整理 LGBTQ+ 主題作品的結局走向與避雷標籤，讓你在投入大量時間前先確認雷點。\n\n注意：BL 的「HE」常常意味著兩人最終在一起、一起活下來；「BE」則經常以一方死亡告終。請務必對照避雷標籤再決定是否閱讀。",
      en:
        "BL / Danmei novels often deliver intense emotional swings: separation, misunderstandings, violence, dubious-consent tropes, last-minute HE-to-BE flips. This page surfaces LGBTQ+ titles with their ending tone and full trigger matrix so you can commit your time wisely.\n\nNote: in BL, 'HE' usually means both leads survive and stay together; 'BE' often involves the death of one lead. Always cross-check the warning list.",
    },
    filter: (b) => /lgbt|bl|danmei|耽美/i.test(b.genre.en + b.genre.zh),
    related: { warnings: ["death", "grief"], endings: ["HE", "BE"] },
    faq: [],
  },
  {
    slug: "romance-ending-finder",
    title: { zh: "言情小說結局查詢｜HE / BE 一覽", en: "Romance Book Ending Finder — HE or BE?" },
    h1: { zh: "言情小說 HE / BE 結局查詢", en: "Romance Book Ending Finder" },
    description: {
      zh: "言情小說結局速查：哪些是 HE、哪些是 BE，搭配避雷標籤幫你決定要不要入坑。",
      en: "Quickly look up whether a romance novel ends HE or BE, with full trigger warnings.",
    },
    intro: {
      zh:
        "讀言情小說時，最怕投入幾十萬字後看到 BE。本頁集合所有「愛情 / 言情」類別的書，明確標示結局是 HE、BE、Bittersweet 還是 OE，並列出可能踩雷的內容（外遇、暴力、第三者、年齡差等）。\n\n你可以用避雷標籤交叉篩選，例如「HE + 無外遇」、或「BE + 無自殺」，快速找到符合心情的作品。",
      en:
        "Romance readers fear nothing more than investing 400 pages only to hit a BE. This page collects every romance title with its exact ending and the triggers most likely to break a reader's heart (cheating, violence, age gaps, etc.).\n\nFilter by ending + warnings — e.g. 'HE without cheating' or 'BE without suicide' — to find the right book for your current mood.",
    },
    filter: (b) => /romance|愛情|言情/i.test(b.genre.en + b.genre.zh),
    related: { endings: ["HE", "BE", "Bittersweet"], warnings: ["cheating"] },
    faq: [],
  },
  {
    slug: "light-novel-finished",
    title: { zh: "輕小說是否完結查詢", en: "Light Novel Status — Is It Finished?" },
    h1: { zh: "輕小說是否完結？", en: "Light Novel — Is This Series Finished?" },
    description: {
      zh: "查詢輕小說系列是否已完結，避免追到一半作者斷更。",
      en: "Check whether a light novel series is fully completed before committing.",
    },
    intro: {
      zh:
        "投入一部輕小說系列前，最痛苦的是發現作者斷更或無限延期。本頁集合輕小說作品，並標示「完結 / 未完 / 暫停」狀態，搭配結局走向與避雷標籤。\n\n資料持續擴充中，若有想查詢的書，歡迎透過全站搜尋功能直接搜尋書名或作者。",
      en:
        "Few things hurt more than starting a light novel series and discovering the author has gone on hiatus. This page tracks light novel titles with their completion status (finished / ongoing / paused) plus ending tone and triggers.\n\nDatabase is expanding — use the global search above for any specific title or author.",
    },
    filter: (b) => /light novel|輕小說|ya/i.test(b.genre.en + b.genre.zh),
    related: { endings: ["HE", "OE"] },
    faq: [],
  },
  {
    slug: "pet-death-warning",
    title: { zh: "寵物死亡避雷｜小說避雷標籤", en: "Pet Death in Books — Trigger Warning List" },
    h1: { zh: "寵物死亡避雷標籤", en: "Pet Death Trigger Warning" },
    description: {
      zh: "標記了寵物死亡情節的小說清單，提前避雷。",
      en: "Books that contain pet death scenes — flagged so you can avoid or prepare.",
    },
    intro: {
      zh:
        "對於養寵物的讀者來說，「寵物死亡」可能是比主角死亡更難承受的雷點。本頁集合所有含寵物死亡情節的小說，標示強度（輕描淡寫 / 詳細描寫 / 反覆出現）。\n\n若你想完全避開這類劇情，請避免以下作品；若你能接受並想做好心理準備，可以先閱讀劇透層第二層的氛圍提示。",
      en:
        "For pet owners, pet death can be harder to read than human character death. This page lists every book in our database with pet-death scenes, with intensity ratings (mentioned / shown in detail / recurring).\n\nUse it to avoid these books, or read the mild-spoiler layer to prepare yourself emotionally before committing.",
    },
    filter: has(["pet-death", "animal-death"]),
    related: { warnings: ["pet-death", "death", "grief"] },
    faq: [],
  },
  {
    slug: "cheating-warning",
    title: { zh: "外遇避雷｜含出軌情節的小說", en: "Cheating Warning in Books" },
    h1: { zh: "外遇避雷標籤", en: "Cheating / Infidelity Warning" },
    description: {
      zh: "包含外遇、出軌情節的小說避雷清單。",
      en: "Books that include cheating or infidelity storylines, flagged in advance.",
    },
    intro: {
      zh:
        "外遇是言情類最常見、也最容易引起讀者強烈情緒的雷點之一。即使最終 HE，過程中的不忠仍可能讓部分讀者完全棄書。本頁列出所有含外遇情節的小說，並標示是「主角出軌」「配角出軌」或「曖昧灰色地帶」。",
      en:
        "Cheating is one of the most polarizing tropes in romance. Even if the book ends HE, infidelity along the way can be a hard DNF for many readers. This page lists every book with cheating, distinguishing main-lead cheating, side-character cheating, and grey-area situations.",
    },
    filter: has(["cheating", "infidelity"]),
    related: { warnings: ["cheating"], endings: ["HE", "BE"] },
    faq: [],
  },
  {
    slug: "self-harm-warning",
    title: { zh: "自傷 / 自殺避雷｜小說避雷清單", en: "Self-Harm Warning in Books" },
    h1: { zh: "自傷 / 自殺避雷標籤", en: "Self-Harm / Suicide Warning" },
    description: {
      zh: "含自傷、自殺意念或自殺情節的小說，附強度標示。",
      en: "Books containing self-harm, suicidal ideation, or completed suicide — with intensity ratings.",
    },
    intro: {
      zh:
        "自傷與自殺是高敏感題材。對於有相關經驗、或正處於情緒脆弱期的讀者，建議避開或在專業支持下閱讀。本頁列出所有含相關情節的書，並標示強度（一閃而過 / 反覆出現 / 詳細描寫）。\n\n如果你或身邊的人正面對相關困擾，請聯繫當地的心理諮詢資源或自殺防治熱線。",
      en:
        "Self-harm and suicide are high-sensitivity topics. If you have lived experience or are in a fragile mental state, consider skipping these or reading them with support. Each entry shows intensity (mentioned / recurring / depicted in detail).\n\nIf you or someone you know is struggling, please reach out to a local crisis helpline.",
    },
    filter: has(["suicide", "self-harm", "depression"]),
    related: { warnings: ["suicide", "depression"], endings: ["BE", "Bittersweet"] },
    faq: [],
  },
  {
    slug: "sexual-violence-warning",
    title: { zh: "性暴力避雷｜小說避雷清單", en: "Sexual Violence Warning in Books" },
    h1: { zh: "性暴力避雷標籤", en: "Sexual Violence Warning" },
    description: {
      zh: "含性暴力、性侵情節的小說避雷清單，附強度與是否在頁上描寫。",
      en: "Books containing sexual violence — flagged with intensity and on-page vs. off-page indicators.",
    },
    intro: {
      zh:
        "性暴力是極高風險的雷點，即使結局 HE，也可能造成強烈不適。本頁明確標示是「在頁上描寫」「角色背景提及」「暗示」三種強度，並提示是否影響主角的長期心理。\n\n如果你完全不想接觸此類題材，請避開所有列入此頁的書。",
      en:
        "Sexual violence is an extreme trigger that can affect readers even when the book ends HE. Entries here are tagged on-page / referenced / implied, plus whether it shapes the protagonist long-term.\n\nIf you want to avoid this entirely, skip every book listed here.",
    },
    filter: has(["sexual-violence", "rape", "csa"]),
    related: { warnings: ["sexual-violence"], endings: ["BE", "Bittersweet"] },
    faq: [],
  },
  {
    slug: "sweet-vs-angst",
    title: { zh: "甜文 vs 虐文判斷指南", en: "Sweet vs Angst — How to Tell Before You Read" },
    h1: { zh: "甜文 / 虐文判斷", en: "Sweet vs Angst Decider" },
    description: {
      zh: "如何在 30 秒內判斷一本小說是甜文還是虐文，附判斷指標與書單。",
      en: "Decide in 30 seconds whether a novel is sweet or angst, with indicators and a curated list.",
    },
    intro: {
      zh:
        "「甜文」指通篇輕鬆、感情線順遂、極少誤會與分離；「虐文」則大量分離、誤會、犧牲，常以 BE 或 Bittersweet 收尾。本站用「結局類型 + 避雷強度 + 適合誰」三個面向幫你快速分類。\n\n判斷準則：HE + 低強度避雷 = 甜文；BE / Bittersweet + 多項高強度避雷 = 虐文。介於中間者通常是「先甜後虐」或「先虐後甜」，請查看微雷層。",
      en:
        "'Sweet' = light tone, smooth romance, almost no separation. 'Angst' = repeated separation, misunderstandings, sacrifice, usually ending BE or Bittersweet. We classify using three axes: ending type, trigger intensity, and who-it's-for.\n\nQuick rule: HE + low-intensity warnings = sweet. BE / Bittersweet + multiple high-intensity warnings = angst. Anything in between is typically sweet-then-angst or angst-then-sweet — check the mild-spoiler layer.",
    },
    filter: (b) => b.ending === "HE" || b.ending === "BE" || b.ending === "Bittersweet",
    related: { endings: ["HE", "BE", "Bittersweet"] },
    faq: [],
  },
  {
    slug: "ya-trigger-warnings",
    title: { zh: "YA 青少年小說避雷指南", en: "YA Book Trigger Warnings" },
    h1: { zh: "YA 青少年小說避雷", en: "YA Book Trigger Warnings" },
    description: {
      zh: "青少年小說（YA）避雷標籤一覽，含校園霸凌、自殺、性、暴力等。",
      en: "Trigger warning matrix for YA novels — bullying, suicide, sex, violence and more.",
    },
    intro: {
      zh:
        "YA（青少年文學）並不等於「安全」。許多 YA 經典涉及霸凌、自殺、家暴、毒品等沉重題材。本頁集合所有 YA 作品並標示完整避雷項目，特別適合家長、老師或青少年自己參考。",
      en:
        "YA does not mean 'safe'. Many landmark YA novels deal with bullying, suicide, abuse, and substance use. This page collects every YA title with the full trigger matrix — useful for parents, teachers, and teen readers themselves.",
    },
    filter: (b) => /ya|young adult|青少年/i.test(b.genre.en + b.genre.zh),
    related: { warnings: ["suicide", "bullying", "depression"] },
    faq: [],
  },
  {
    slug: "is-series-finished",
    title: { zh: "系列小說是否完結查詢", en: "Is This Series Finished?" },
    h1: { zh: "這個系列完結了嗎？", en: "Is This Series Finished?" },
    description: {
      zh: "查詢系列小說是否已完結、暫停或仍在連載。",
      en: "Check whether a novel series is finished, on hiatus, or still ongoing.",
    },
    intro: {
      zh:
        "在投入長篇系列之前，先確認它是否已經完結，可以省下大量等待與焦慮。本站持續更新主流系列的完結狀態，並標示最後更新時間與作者活躍度。",
      en:
        "Before committing to a long series, confirm whether it is finished. We track completion status, last update date, and author activity for major series.",
    },
    filter: () => true,
    related: { endings: ["HE", "OE"] },
    faq: [],
  },
  {
    slug: "read-or-skip",
    title: { zh: "讀 or 略 決策清單", en: "Read or Skip This Book — Decision List" },
    h1: { zh: "讀 or 略 決策清單", en: "Read or Skip This Book" },
    description: {
      zh: "依信心分數排序的讀 or 略決策清單，30 秒判斷一本書是否值得讀。",
      en: "All books ranked by Read-or-Skip confidence — decide in 30 seconds.",
    },
    intro: {
      zh:
        "本頁直接呈現所有作品的「Read / Caution / Skip」決策卡，依信心分數排序。每張卡都告訴你：適合誰、不適合誰、目前的整體建議是什麼。\n\n若你只有 30 秒、想快速決定下一本書，這裡是最直接的入口。",
      en:
        "This page surfaces every book's Read / Caution / Skip verdict in one ranked list. Each card tells you who it's for, who should skip, and the overall recommendation.\n\nIf you have 30 seconds and need to pick your next read, start here.",
    },
    filter: () => true,
    related: { endings: ["HE", "BE", "Bittersweet", "OE"] },
    faq: [],
  },
];

// Homepage entry order, per language (matches the user's brief)
export const homepageEntriesZh: { slug: string; label: string }[] = [
  { slug: "happy-ending-books", label: "HE 小說" },
  { slug: "sad-ending-books", label: "BE 小說" },
  { slug: "open-ending-books", label: "開放式結局小說" },
  { slug: "bittersweet-ending-books", label: "苦甜結局小說" },
  { slug: "bl-danmei-warnings", label: "BL / Danmei 小說避雷" },
  { slug: "romance-ending-finder", label: "言情小說 HE/BE" },
  { slug: "light-novel-finished", label: "輕小說是否完結" },
  { slug: "pet-death-warning", label: "寵物死亡避雷" },
  { slug: "cheating-warning", label: "外遇避雷" },
  { slug: "self-harm-warning", label: "自傷 / 自殺避雷" },
  { slug: "sexual-violence-warning", label: "性暴力避雷" },
  { slug: "sweet-vs-angst", label: "甜文 / 虐文判斷" },
];

export const homepageEntriesEn: { slug: string; label: string }[] = [
  { slug: "happy-ending-books", label: "Happy Ending Books" },
  { slug: "sad-ending-books", label: "Sad Ending Books" },
  { slug: "open-ending-books", label: "Open Ending Books" },
  { slug: "bittersweet-ending-books", label: "Bittersweet Ending Books" },
  { slug: "romance-ending-finder", label: "Romance Book Ending Finder" },
  { slug: "ya-trigger-warnings", label: "YA Book Trigger Warnings" },
  { slug: "pet-death-warning", label: "Pet Death in Books" },
  { slug: "cheating-warning", label: "Cheating Warning in Books" },
  { slug: "self-harm-warning", label: "Self-Harm Warning in Books" },
  { slug: "sexual-violence-warning", label: "Sexual Violence Warning in Books" },
  { slug: "is-series-finished", label: "Is This Series Finished" },
  { slug: "read-or-skip", label: "Read or Skip This Book" },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function collectionBooks(c: Collection): Book[] {
  return books.filter(c.filter);
}
