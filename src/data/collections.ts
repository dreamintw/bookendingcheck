import { books, type Book, type Ending } from "./books";

export interface Collection {
  slug: string;
  title: { zh: string; en: string };
  h1: { zh: string; en: string };
  description: { zh: string; en: string };
  intro: { zh: string; en: string }; // long-form intro, may contain inline HTML <a>
  filter: (b: Book) => boolean;
  related: { endings?: Ending[]; warnings?: string[]; genreKeywords?: string[] };
  faq: { q: { zh: string; en: string }; a: { zh: string; en: string } }[];
}

const has = (codes: string[]) => (b: Book) =>
  b.triggers.some((t) => codes.includes(t.code));

// Helpers to keep inline link markup terse.
const aZh = (slug: string, label: string) => `<a href="/zh/collections/${slug}" class="text-accent hover:underline">${label}</a>`;
const aEn = (slug: string, label: string) => `<a href="/en/collections/${slug}" class="text-accent hover:underline">${label}</a>`;
const wZh = (code: string, label: string) => `<a href="/zh/warnings/${code}" class="text-accent hover:underline">${label}</a>`;
const wEn = (code: string, label: string) => `<a href="/en/warnings/${code}" class="text-accent hover:underline">${label}</a>`;
const eZh = (e: string, label: string) => `<a href="/zh/endings/${e}" class="text-accent hover:underline">${label}</a>`;
const eEn = (e: string, label: string) => `<a href="/en/endings/${e}" class="text-accent hover:underline">${label}</a>`;

export const collections: Collection[] = [
  {
    slug: "happy-ending-books",
    title: { zh: "HE 小說｜結局圓滿的小說推薦清單", en: "Happy Ending Books — HE Novels with Satisfying Endings" },
    h1: { zh: "HE 小說：結局圓滿的小說清單", en: "Happy Ending Books (HE Novels)" },
    description: {
      zh: "想看 HE 小說？這裡彙整所有結局圓滿、不虐主角的書單，附避雷標籤與讀前決策。",
      en: "Looking for happy ending books? A curated HE novel list with trigger warnings and Read-or-Skip verdicts.",
    },
    intro: {
      zh:
        `這個頁面收錄所有被本站判定為 HE（Happy Ending，圓滿結局）的小說。在我們的標準裡，HE 必須同時滿足三件事：主要角色在故事結束時仍然活著、核心關係修復或圓滿、主角最在意的目標基本達成。只有少一項，我們會改標 ${eZh("Bittersweet", "Bittersweet")} 或 ${eZh("OE", "OE 開放式結局")}，而不是勉強塞進 HE。\n\n` +
        `這份清單最適合三種讀者：第一，你正處在情緒低潮，需要「保證不被虐」的故事；第二，你是言情或 BL 讀者，最怕投入幾十萬字後撞上 BE；第三，你選書給孩子或家人，需要明確的安全結局。每張卡都會列出避雷標籤、適合誰、不適合誰，以及一個 0–100 的信心分數，讓你不只看「結局類型」，還能在 30 秒內判斷整本書的氛圍。\n\n` +
        `要注意的是，HE 只描述結局，不代表全程無雷。許多 HE 仍含戰爭、性描寫、家暴等內容，請務必對照避雷標籤再決定。如果你想比較不同走向，可以看 ${aZh("sad-ending-books", "BE 小說清單")}、${aZh("bittersweet-ending-books", "苦甜結局清單")}，或用 ${aZh("romance-ending-finder", "言情結局查詢")} 直接以言情類別過濾。本站不提供小說全文，也不提供盜版下載，只做讀前決策資訊。`,
      en:
        `This page lists every novel we've classified as HE (Happy Ending). To earn the HE tag in our system a book has to clear three bars: the main characters are alive at the final page, the central relationship is restored or fulfilled, and the protagonist's most important goal is meaningfully achieved. If even one of those is missing we tag the book as ${eEn("Bittersweet", "Bittersweet")} or ${eEn("OE", "Open Ending")} instead of forcing it into HE.\n\n` +
        `This list is built for three readers: someone in a low mood who needs a guaranteed-safe ending, romance and BL readers who fear investing 400 pages only to hit a tragic finish, and parents or teachers vetting a book for a younger reader. Each card surfaces full trigger warnings, a who-it's-for / who-should-skip pair, and a 0–100 confidence score so you're judging the whole reading experience, not just the last chapter.\n\n` +
        `Important: HE describes the destination, not the road. Plenty of HE titles still contain war, on-page sex, abuse or grief — always cross-check the trigger matrix. To compare moods, see our ${aEn("sad-ending-books", "Sad Ending list")}, ${aEn("bittersweet-ending-books", "Bittersweet list")}, or filter inside ${aEn("romance-ending-finder", "Romance Ending Finder")}. We never publish the full text of any novel and we don't link to pirated copies — this site is decision data only.`,
    },
    filter: (b) => b.ending === "HE",
    related: { endings: ["HE", "Bittersweet"] },
    faq: [
      { q: { zh: "HE 是什麼意思？", en: "What does HE mean?" }, a: { zh: "HE 是 Happy Ending 的縮寫，指主角存活、感情圓滿或目標達成的圓滿結局。", en: "HE stands for Happy Ending — main characters survive and the central arc resolves positively." } },
      { q: { zh: "HE 小說一定沒有避雷點嗎？", en: "Are HE books always safe?" }, a: { zh: "不一定。HE 只代表結局，過程仍可能涉及戰爭、暴力、性描寫等內容，請務必查看避雷標籤。", en: "No. HE describes the ending only. Many HE stories still contain heavy content mid-book — always check the trigger warning matrix." } },
    ],
  },
  {
    slug: "sad-ending-books",
    title: { zh: "BE 小說｜悲劇結局的小說清單", en: "Sad Ending Books — BE Novels with Tragic Endings" },
    h1: { zh: "BE 小說：悲劇結局清單", en: "Sad Ending Books (BE Novels)" },
    description: {
      zh: "BE（Bad Ending）小說清單，幫你提前知道哪些書會虐、虐到什麼程度，並判斷現在是否適合讀。",
      en: "Sad ending (BE) book list — know in advance which novels will hurt and how much, before you commit.",
    },
    intro: {
      zh:
        `這份清單只收 BE（Bad Ending / Tragic Ending）。我們對 BE 的判定相當嚴格：主角死亡、感情線徹底破滅、或主角最重視的目標失敗，三項至少達到其中一項，且結尾沒有給出明顯的修補空間。模稜兩可的會放到 ${eZh("Bittersweet", "Bittersweet")}，留白未決的會放到 ${eZh("OE", "OE")}，而不是混進 BE 拉高張力。\n\n` +
        `BE 不等於壞作品。許多文學經典正因悲劇收尾才產生強烈後勁，例如《阿基里斯之歌》、《人間失格》。但 BE 對情緒的負擔很高，特別是當你最近狀態不穩，或對 ${wZh("suicide", "自殺")}、${wZh("death", "主角死亡")}、${wZh("war", "戰爭暴力")} 這類題材敏感時，硬讀會適得其反。\n\n` +
        `所以這頁的用法不是「直接點進去看書名」，而是先讀每張卡上的避雷強度與「適合誰／不適合誰」。如果你想稍微緩和情緒，可以改看 ${aZh("bittersweet-ending-books", "苦甜結局清單")}；如果你只是想避開所有 BE，請改看 ${aZh("happy-ending-books", "HE 小說清單")}。`,
      en:
        `This page only collects BE (Bad Ending / Tragic Ending) novels. Our bar for BE is strict: the main character dies, the central relationship collapses, or the protagonist's deepest goal fails — and the ending offers no meaningful repair. Anything ambiguous goes to ${eEn("Bittersweet", "Bittersweet")}; anything left deliberately unresolved goes to ${eEn("OE", "Open Ending")}. We don't lump those into BE just to make a list look heavier.\n\n` +
        `BE is not the same as a bad book. Some of the most enduring works in literature owe their power to tragic endings — The Song of Achilles, No Longer Human, A Little Life. But BE carries real emotional cost, especially if you're already low or sensitive to ${wEn("suicide", "suicide")}, ${wEn("death", "major character death")}, or ${wEn("war", "war violence")}. Forcing yourself through one in the wrong week tends to backfire.\n\n` +
        `Use this list backwards: read each card's trigger intensity and who-should-skip notes first, then decide whether to commit. If you want softer melancholy, switch to the ${aEn("bittersweet-ending-books", "Bittersweet list")}. If you'd rather avoid BE entirely right now, jump to ${aEn("happy-ending-books", "Happy Ending Books")}.`,
    },
    filter: (b) => b.ending === "BE",
    related: { endings: ["BE", "Bittersweet"], warnings: ["death", "suicide", "grief"] },
    faq: [
      { q: { zh: "BE 和 Bittersweet 差別？", en: "BE vs Bittersweet?" }, a: { zh: "BE 整體偏向絕望、損失難以彌補；Bittersweet 則苦中有甘，仍保留某種希望或安慰。", en: "BE leans fully toward loss with little consolation. Bittersweet still leaves a thread of hope or warmth." } },
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
        `開放式結局（OE, Open Ending）指作者在最後一刻刻意停筆，不揭曉角色生死、感情走向或事件結果，把詮釋權交給讀者。OE 並非偷懶，而是一種敘事選擇，常見於文學小說、反烏托邦與科幻。\n\n` +
        `如果你享受「讀完還能反覆討論」的故事，OE 會非常適合你。但若你需要明確的答案、希望情節閉環，OE 可能讓你不舒服。下方清單會標示每本書的開放程度（資訊不足／留白／雙重解讀）以及避雷項目。\n\n` +
        `想要相對有定論的版本，可以改看 ${aZh("happy-ending-books", "HE 小說")} 或 ${aZh("sad-ending-books", "BE 小說")}；若你對「結局解讀」這件事有興趣，也可以看 ${eZh("Ambiguous", "Ambiguous 曖昧結局")}。`,
      en:
        `An Open Ending (OE) means the author intentionally withholds final answers — the fate of a character, a relationship, or a plot is left for the reader to decide. OE is a craft choice, not laziness, and is common in literary fiction, dystopia and sci-fi.\n\n` +
        `If you enjoy books that keep generating discussion after the last page, OE is for you. If you need closure, OE can be frustrating. The list below flags how open each ending is (missing information / silence / dual interpretation) and the triggers to expect.\n\n` +
        `Prefer something more decisive? Try ${aEn("happy-ending-books", "Happy Ending Books")} or ${aEn("sad-ending-books", "Sad Ending Books")}. Curious about endings that resolve the plot but leave the meaning open, see ${eEn("Ambiguous", "Ambiguous endings")}.`,
    },
    filter: (b) => b.ending === "OE",
    related: { endings: ["OE", "Ambiguous"] },
    faq: [
      { q: { zh: "OE 跟 Ambiguous 有什麼不同？", en: "OE vs Ambiguous?" }, a: { zh: "OE 是劇情未完結；Ambiguous 是劇情完結但解讀曖昧。", en: "OE leaves the plot itself unresolved. Ambiguous resolves the plot but leaves meaning open to interpretation." } },
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
        `Bittersweet（苦甜參半）的結局介於 ${eZh("HE", "HE")} 與 ${eZh("BE", "BE")} 之間：可能有人死去，但留下的人還能繼續前行；可能感情失去，但角色獲得自我成長。判定 Bittersweet 的關鍵在於——故事結束時，「失去」與「得到」必須同時可被讀者感受到，而不是純粹收束在哀傷或單純的圓滿。\n\n` +
        `這類書最適合喜歡「真實人生質感」的讀者：你不會被無條件治癒，但也不會被徹底擊碎。代表作包括《挪威的森林》、《阿基里斯之歌》、《柏青哥》。每張卡會標出甜的部分與苦的部分各佔多少，以及具體會引爆情緒的雷點。\n\n` +
        `若你想稍微往甜的方向走，可以接著看 ${aZh("happy-ending-books", "HE 清單")}；若你目前狀態剛好需要「先哭一場再睡好」，可改看 ${aZh("sad-ending-books", "BE 清單")}；對 ${wZh("grief", "悲痛")} 題材敏感的讀者請特別留意每張卡的避雷強度。`,
      en:
        `Bittersweet sits between ${eEn("HE", "HE")} and ${eEn("BE", "BE")}: someone may be lost, but those left behind keep moving; love may not survive, but a character grows into themselves. To earn the Bittersweet tag, a book must let the reader feel both the loss and the gain at the final page — not pure tragedy, not pure resolution.\n\n` +
        `This is the right shelf for readers who want emotional realism — neither cured nor crushed. Touchstones include Norwegian Wood, The Song of Achilles, Pachinko. Each card shows roughly how much sweet vs. bitter the book leans, and which specific triggers will hit hardest.\n\n` +
        `Want to lean a little sweeter? Continue to ${aEn("happy-ending-books", "Happy Ending Books")}. Want to fully cry it out? Switch to ${aEn("sad-ending-books", "Sad Ending Books")}. Readers sensitive to ${wEn("grief", "grief")} content should watch the per-card intensity ratings.`,
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
        `BL、耽美、Danmei 是同一文化光譜上的不同名稱：日系傾向稱 BL，華語圈習慣稱耽美，海外讀者多半使用 Danmei。三者最大共同點是高密度的情感拉扯——分離、誤會、暴力、強迫設定、HE 反轉 BE 等戲劇張力遠高於一般言情。\n\n` +
        `這頁不是推薦榜，而是給長期讀者的避雷工具。每張卡會明確標示是否為 ${eZh("HE", "HE")}、${eZh("BE", "BE")} 或 ${eZh("Bittersweet", "Bittersweet")}，並針對 ${wZh("dub-con", "強迫性描寫")}、${wZh("captivity", "囚禁")}、${wZh("torture", "酷刑")}、${wZh("self-harm", "自殘")} 等高頻雷點給出強度評分。長篇 Priest、肉包不吃肉、水千丞等作者的代表作都已收錄。\n\n` +
        `特別提醒：BL 的「HE」常常意味著兩人最終在一起、一起活下來；「BE」則經常以一方死亡告終，幾乎沒有中間地帶。投入幾十萬字前，請先比對避雷標籤；如果你怕踩到外遇雷點，請另外查 ${aZh("cheating-warning", "外遇避雷")}。`,
      en:
        `BL, danmei and "Boys' Love" are different names for overlapping fandoms: Japan-origin works tend to be called BL, Chinese-language works are usually called danmei (耽美), and English-reading audiences increasingly use danmei as the umbrella term. What unites them is intensity — separation, misunderstanding, violence, dubious-consent tropes and last-minute HE-to-BE flips show up far more often than in mainstream romance.\n\n` +
        `This page is a triage tool, not a top-ten list. Each card clearly tags ${eEn("HE", "HE")}, ${eEn("BE", "BE")} or ${eEn("Bittersweet", "Bittersweet")}, and rates the intensity of high-frequency triggers like ${wEn("dub-con", "dubious consent")}, ${wEn("captivity", "captivity")}, ${wEn("torture", "torture")} and ${wEn("self-harm", "self-harm")}. Long danmei works by Priest, Rou Bao Bu Chi Rou, Shui Qian Cheng and others are included.\n\n` +
        `Note on conventions: in BL/danmei, "HE" usually means both leads survive and stay together, while "BE" typically involves the death of one lead — the middle ground is thinner than in straight romance. Before you invest hundreds of thousands of characters, cross-check the warning list. If your specific fear is infidelity, see ${aEn("cheating-warning", "Cheating Warning")} too.`,
    },
    filter: (b) => /lgbt|bl|danmei|耽美/i.test(b.genre.en + b.genre.zh),
    related: { warnings: ["death", "grief", "dub-con"], endings: ["HE", "BE"] },
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
        `這頁專門解決一個問題：「我想看言情，但能不能先告訴我這本是不是 BE？」站上所有被歸入「Romance / 愛情 / 言情」類別的書都會出現在這裡，並用四種結局明確標示——${eZh("HE", "HE")}、${eZh("BE", "BE")}、${eZh("Bittersweet", "Bittersweet")}、${eZh("OE", "OE")}。\n\n` +
        `言情讀者最常踩的雷其實不只結局，而是過程：${wZh("cheating", "外遇")}、${wZh("domestic-abuse", "家暴")}、${wZh("dub-con", "強迫")}、年齡差、第三者長期介入。所以即使結局是 HE，如果你在意外遇，也未必能享受。每張卡都會把這些中段雷點與信心分數一起呈現，讓你能組合出「HE + 無外遇」、「BE + 無自殺」這類非常具體的篩選條件。\n\n` +
        `如果你正在挑當代英文言情，可以對照 ${aZh("happy-ending-books", "HE 清單")}；如果你看的是 BL/Danmei，請改看 ${aZh("bl-danmei-warnings", "BL / Danmei 避雷指南")}。`,
      en:
        `This page exists to answer one question every romance reader asks: "Tell me — is this one a BE or not?" Every title we tag as Romance / 愛情 / 言情 lives here, marked clearly as ${eEn("HE", "HE")}, ${eEn("BE", "BE")}, ${eEn("Bittersweet", "Bittersweet")} or ${eEn("OE", "OE")}.\n\n` +
        `Romance readers don't only get burned by the ending. The mid-book triggers — ${wEn("cheating", "cheating")}, ${wEn("domestic-abuse", "domestic abuse")}, ${wEn("dub-con", "dubious consent")}, large age gaps, persistent third-party interference — break just as many DNFs. Each card pairs those triggers with the ending tag and a confidence score, so you can build very specific queries like "HE without cheating" or "BE without suicide".\n\n` +
        `Browsing modern English-language romance? Pair this with ${aEn("happy-ending-books", "Happy Ending Books")}. Reading BL or Danmei instead? Switch to ${aEn("bl-danmei-warnings", "BL / Danmei Warnings")}.`,
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
        `投入一部輕小說系列前，最痛苦的是發現作者斷更或無限延期。本頁集合輕小說作品，並標示「完結 / 未完 / 暫停」狀態，搭配結局走向與避雷標籤。\n\n` +
        `資料持續擴充中，若有想查詢的書，歡迎透過全站搜尋功能直接搜尋書名或作者。也可以參考 ${aZh("is-series-finished", "系列小說是否完結")}。`,
      en:
        `Few things hurt more than starting a light novel series and discovering the author has gone on hiatus. This page tracks light novel titles with their completion status (finished / ongoing / paused) plus ending tone and triggers.\n\n` +
        `Database is expanding — use the global search above for any specific title or author. See also ${aEn("is-series-finished", "Is This Series Finished?")}.`,
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
        `對養過寵物的讀者來說，「寵物死亡」往往比主角死亡更難承受。即使整本書是 HE，幾頁的寵物臨終戲也可能讓人棄書一週。本頁集中所有含寵物死亡情節的小說，標示三種強度：「輕描淡寫（提及）」「在頁上展示」「貫穿全書反覆出現」。\n\n` +
        `這頁的設計目的是幫你做兩種決定。第一種：完全避開——直接不要碰任何出現在這份清單上的書。第二種：心理準備後再讀——可以先看每張卡的微雷層描述，掌握場景出現在第幾段、是否與主角心理創傷綁定，再決定是否進場。\n\n` +
        `相關內容也可以看 ${wZh("death", "主角死亡")} 與 ${wZh("grief", "悲痛")} 標籤；若你想直接挑一本「結局好、寵物又平安」的書，建議先過濾 ${aZh("happy-ending-books", "HE 清單")}。`,
      en:
        `For pet owners, pet death is often harder to read than human character death. A few pages near the end can derail an otherwise HE book and ruin your week. This page collects every book in our database with pet-death content, rated at three intensities: mentioned in passing, shown on-page, or recurring throughout.\n\n` +
        `Use this list two ways. To avoid the trigger entirely, simply skip every book that appears here. To read with preparation, open each card's mild-spoiler layer to see roughly where the scene falls and whether it's tied to the protagonist's trauma — then decide.\n\n` +
        `Adjacent triggers worth checking: ${wEn("death", "major character death")} and ${wEn("grief", "grief")}. If you'd rather pre-filter to "good ending, pet survives", start from ${aEn("happy-ending-books", "Happy Ending Books")}.`,
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
        `外遇是言情類最常引爆讀者強烈情緒的雷點之一。即使最終 HE，過程中的不忠仍可能讓部分讀者完全棄書。本頁專門收錄含 ${wZh("cheating", "外遇")} 或 infidelity 情節的小說，並把它們分為三種類型：「主角出軌」（伴侶之一在主線時間軸內出軌）、「配角出軌」（主要存在於父母、朋友或前任線上）、「灰色地帶」（如假性開放關係、感情未明確結束時的重疊期）。\n\n` +
        `對外遇敏感的讀者請務必看清楚這個分類，因為「主角出軌」的書即使結局再 HE，閱讀過程仍會非常難受；而「配角出軌」的書（例如《柏青哥》、《愛在瘟疫蔓延時》）多半只是背景設定，不一定會踩到你的雷。每張卡也會標示出軌是否被作品本身視為被原諒、贖罪、或從未被處理。\n\n` +
        `若你對家庭題材的不忠特別敏感，可以同時看 ${aZh("sexual-violence-warning", "性暴力避雷")} 與 ${aZh("self-harm-warning", "自傷避雷")}；若你只想找完全乾淨的言情，請從 ${aZh("happy-ending-books", "HE 小說清單")} 出發再排除這頁的書。`,
      en:
        `Cheating is one of the most polarizing tropes in romance. Even when a book ends HE, infidelity along the way is a hard DNF for many readers. This page collects every book in our database that contains ${wEn("cheating", "cheating")} or infidelity, sorted into three categories: main-lead cheating (one of the romantic leads cheats inside the timeline), side-character cheating (the infidelity belongs to parents, friends or exes), and grey-area situations (open relationships, overlap during an unclear breakup).\n\n` +
        `Pay attention to the category. A "main-lead cheating" book is painful to sit through even if the resolution is HE, while "side-character cheating" books — Pachinko, Love in the Time of Cholera — often just use it as backdrop and may not actually hit your specific trigger. Each card also notes whether the narrative treats the cheating as forgiven, atoned for, or never addressed.\n\n` +
        `Readers especially sensitive to betrayal in family contexts may also want ${aEn("sexual-violence-warning", "Sexual Violence Warning")} and ${aEn("self-harm-warning", "Self-Harm Warning")}. If you're trying to build a strictly clean romance shelf, start from ${aEn("happy-ending-books", "Happy Ending Books")} and exclude the titles on this page.`,
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
        `自傷與自殺是高敏感題材。本站對相關內容採取最嚴格的標示策略：只要出現自傷、自殺意念、企圖、或既遂情節，就一定列入此頁，並依強度分為「一閃而過」「反覆出現」「詳細描寫」三級。${wZh("suicide", "自殺")} 與 ${wZh("self-harm", "自傷")} 標籤會交叉提示。\n\n` +
        `如果你本人有相關經驗、或正處於情緒脆弱期，請優先考慮直接避開本頁所有作品。如果你是研究者、編輯、心理工作者，或希望在安全狀態下閱讀以理解他人經驗，請使用每張卡的微雷層先掌握場景強度，並在閱讀後安排足夠的緩衝時間。我們不鼓勵把這類書當成「情緒釋放工具」連續閱讀。\n\n` +
        `相關交叉避雷請看 ${wZh("depression", "憂鬱")} 與 ${aZh("ya-trigger-warnings", "YA 避雷指南")}（許多 YA 經典涉及青少年自殺）。如果你或你身邊的人正面對相關困擾，請務必聯繫當地心理諮詢資源或自殺防治熱線——書籍永遠不能取代專業協助。`,
      en:
        `Self-harm and suicide are high-sensitivity topics. We use our most aggressive flagging policy here: any book containing self-harm, suicidal ideation, attempted or completed suicide is listed on this page, rated as mentioned, recurring, or depicted in detail. The ${wEn("suicide", "suicide")} and ${wEn("self-harm", "self-harm")} tags cross-reference each other.\n\n` +
        `If you have lived experience or are in a fragile mental state, the safest default is to skip every book on this page. If you're a researcher, an editor, a mental-health professional, or you want to read these works for understanding while in a stable state, use each card's mild-spoiler layer to gauge intensity first, and build buffer time after the read. We don't recommend treating these books as a serial form of emotional release.\n\n` +
        `Adjacent triggers: ${wEn("depression", "depression")} and the ${aEn("ya-trigger-warnings", "YA Trigger Warnings")} list (many landmark YA novels involve teen suicide). If you or someone you know is struggling, please contact a local crisis line — a book is never a substitute for professional support.`,
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
        `${wZh("sexual-violence", "性暴力")} 是極高風險的雷點，即使結局 HE，也可能造成強烈不適或喚起讀者自身創傷。本頁不只列出「有沒有」，還會明確標示三件事：是「在頁上詳細描寫」「角色背景提及」還是「暗示／隱喻」；事件對主角的長期心理是否構成主軸；作品是否將這個事件視為角色弧線的一部分，還是僅作為情節推進工具。\n\n` +
        `如果你完全不想接觸此類題材，請避開所有列入此頁的書，並考慮把 ${aZh("happy-ending-books", "HE 小說清單")} 當作預設入口。如果你必須閱讀（例如課程、研究、寫作參考），請至少先看每張卡的微雷層，並避開連續閱讀多本同類題材。\n\n` +
        `對於 BL / Danmei 讀者，這類雷點還會以「強迫設定」「dub-con」等變體出現，請另外比對 ${aZh("bl-danmei-warnings", "BL / Danmei 避雷指南")}。如果是 YA 作品中的性暴力描寫，請看 ${aZh("ya-trigger-warnings", "YA 避雷")}。`,
      en:
        `${wEn("sexual-violence", "Sexual violence")} is an extreme trigger that can affect readers even when the book ends HE, and can directly re-activate personal trauma. This page goes beyond a yes/no list and tags three things explicitly: whether the content is depicted on-page in detail, only referenced as backstory, or implied; whether it shapes the protagonist's long-term psychology; and whether the narrative uses it as a character arc or merely as a plot accelerator.\n\n` +
        `If you want to avoid this entirely, skip every book listed here and consider making ${aEn("happy-ending-books", "Happy Ending Books")} your default entry point. If you must engage with the material (a course, research, writing study), at minimum read each card's mild-spoiler layer first, and avoid stacking multiple titles in the same session.\n\n` +
        `For BL / Danmei readers this trigger often appears as "forced" or "dub-con" tropes — see ${aEn("bl-danmei-warnings", "BL / Danmei Warnings")} for that variant. For SA in YA novels see ${aEn("ya-trigger-warnings", "YA Trigger Warnings")}.`,
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
        `「甜文」指通篇輕鬆、感情線順遂、極少誤會與分離；「虐文」則大量分離、誤會、犧牲，常以 ${eZh("BE", "BE")} 或 ${eZh("Bittersweet", "Bittersweet")} 收尾。本站用「結局類型 + 避雷強度 + 適合誰」三個面向幫你快速分類。\n\n` +
        `判斷準則：${eZh("HE", "HE")} + 低強度避雷 = 甜文；BE / Bittersweet + 多項高強度避雷 = 虐文。介於中間者通常是「先甜後虐」或「先虐後甜」，請查看微雷層。`,
      en:
        `"Sweet" = light tone, smooth romance, almost no separation. "Angst" = repeated separation, misunderstandings, sacrifice, usually ending ${eEn("BE", "BE")} or ${eEn("Bittersweet", "Bittersweet")}. We classify using three axes: ending type, trigger intensity, and who-it's-for.\n\n` +
        `Quick rule: ${eEn("HE", "HE")} + low-intensity warnings = sweet. BE / Bittersweet + multiple high-intensity warnings = angst. Anything in between is typically sweet-then-angst or angst-then-sweet — check the mild-spoiler layer.`,
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
        `「YA」（Young Adult）並不等於「安全」。許多 YA 經典處理的正是青春期最沉重的議題：${wZh("bullying", "霸凌")}、${wZh("suicide", "自殺")}、家暴、毒品、性暴力。市場行銷層上的「青少年向」標籤往往會讓家長、老師、甚至少年自己誤以為內容輕鬆，結果讀完反而需要更多心理空間。\n\n` +
        `本頁集合所有 YA 作品，並把每一本可能觸發的題材完整列出。對家長與老師來說，這頁可以當作選書清單；對青少年讀者來說，這頁可以幫你決定「要不要現在讀」「要不要找人陪你讀」。每張卡的微雷層會描述場景強度，但不會具體劇透結局。\n\n` +
        `延伸閱讀：${aZh("self-harm-warning", "自傷避雷")}、${aZh("sexual-violence-warning", "性暴力避雷")}、${aZh("happy-ending-books", "HE 小說清單")}（給想避開沉重 YA、找輕鬆讀物的讀者）。`,
      en:
        `"YA" does not mean "safe". Many landmark YA novels are precisely about the heaviest material of adolescence — ${wEn("bullying", "bullying")}, ${wEn("suicide", "suicide")}, domestic abuse, substance use, sexual violence. The marketing label "young adult" can mislead parents, teachers, and even teen readers into expecting something lighter than what's actually on the page.\n\n` +
        `This page collects every YA title in our database with its full trigger matrix. For parents and teachers it works as a vetting list; for teen readers it helps decide whether to read now, postpone, or read with support nearby. Each card's mild-spoiler layer describes scene intensity without spoiling the ending.\n\n` +
        `Related reading: ${aEn("self-harm-warning", "Self-Harm Warning")}, ${aEn("sexual-violence-warning", "Sexual Violence Warning")}, and ${aEn("happy-ending-books", "Happy Ending Books")} for readers who want to step away from heavy YA into something lighter.`,
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
        `在投入長篇系列之前，先確認它是否已經完結，可以省下大量等待與焦慮。本站持續追蹤主流系列的「完結 / 連載中 / 暫停 / 太監」狀態，並附上最後更新時間與作者活躍度，讓你判斷現在進坑會不會被吊在半空。\n\n` +
        `這頁特別適合三種讀者：第一，你只想看完整故事，不想追連載；第二，你正在挑長假期或寒假的「一次讀完」清單；第三，你曾被作者斷更傷害過，現在需要明確的安全感。每張卡會誠實標示信心分數——對於連載中的作品，我們會把信心壓低，避免提供過度樂觀的判斷。\n\n` +
        `相關清單：${aZh("light-novel-finished", "輕小說完結查詢")} 專門處理日系輕小說；如果你是想找「完結 + HE」的雙重保險，可以從 ${aZh("happy-ending-books", "HE 小說清單")} 開始再交叉比對本頁。`,
      en:
        `Before you commit to a long series, confirm whether it's actually finished. This page tracks completion status — finished, ongoing, on hiatus, abandoned — for the major series we cover, with last-update dates and notes on author activity, so you don't get left dangling in book three of seven.\n\n` +
        `It's most useful for three readers: those who only want to read fully completed stories; those building a "binge over the long break" list; and those who've been burned by an author hiatus before and want explicit reassurance. Each card carries an honest confidence score — for ongoing series we deliberately keep confidence low rather than pretending we know how it'll end.\n\n` +
        `See also: ${aEn("light-novel-finished", "Finished Light Novels")} for Japanese LN coverage. For double safety ("finished + HE"), start at ${aEn("happy-ending-books", "Happy Ending Books")} and cross-reference this page.`,
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
        `這頁直接呈現所有作品的「Read / Caution / Skip」決策卡，依信心分數排序。每張卡都告訴你三件事：這本書「適合誰」、「不適合誰」、整體建議是什麼，以及這個建議我們有多少把握（0–100 信心分數）。\n\n` +
        `「Read」代表大多數讀者可以放心進場；「Caution」代表有明確雷點，建議先看避雷標籤；「Skip」並不是說書不好，而是說對絕大多數情緒狀態下的讀者來說，現在讀的成本高於收穫。我們刻意不用五星制，因為五星制鼓勵「平均分數」，但讀書是非常個人的決策，更需要明確的「適合不適合你」。\n\n` +
        `如果你只有 30 秒、想快速決定下一本書，這裡是最直接的入口。想限定情緒走向，請改看 ${aZh("happy-ending-books", "HE 清單")}、${aZh("sad-ending-books", "BE 清單")} 或 ${aZh("bittersweet-ending-books", "苦甜結局清單")}。`,
      en:
        `This page surfaces every book's Read / Caution / Skip verdict in one ranked list. Each card tells you three things: who the book is for, who should skip it, and our overall recommendation — plus a 0–100 confidence score for that recommendation.\n\n` +
        `"Read" means most readers can safely commit. "Caution" means there are real triggers to check first. "Skip" doesn't mean the book is bad — it means for most current emotional states the cost outweighs the payoff. We deliberately don't use a five-star system, because stars push toward "average rating", and reading is a personal decision that needs a clear "is this for you right now?" instead.\n\n` +
        `If you have 30 seconds and need to pick your next read, start here. To filter by mood instead, see ${aEn("happy-ending-books", "Happy Ending Books")}, ${aEn("sad-ending-books", "Sad Ending Books")} or ${aEn("bittersweet-ending-books", "Bittersweet Ending Books")}.`,
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
  { slug: "bittersweet-ending-books", label: "苦甜結局小說" },
  { slug: "open-ending-books", label: "開放式結局小說" },
  { slug: "romance-ending-finder", label: "言情小說結局查詢" },
  { slug: "ya-trigger-warnings", label: "YA 小說避雷" },
  { slug: "bl-danmei-warnings", label: "BL / Danmei 小說避雷" },
  { slug: "pet-death-warning", label: "寵物死亡避雷" },
  { slug: "self-harm-warning", label: "自傷避雷" },
  { slug: "sexual-violence-warning", label: "性暴力避雷" },
  { slug: "cheating-warning", label: "外遇 / 出軌避雷" },
  { slug: "sweet-vs-angst", label: "甜文 / 虐文判斷" },
  { slug: "light-novel-finished", label: "輕小說是否完結" },
  { slug: "is-series-finished", label: "系列是否完結" },
  { slug: "read-or-skip", label: "值不值得讀" },
];

export const homepageEntriesEn: { slug: string; label: string }[] = [
  { slug: "happy-ending-books", label: "Happy Ending Books" },
  { slug: "sad-ending-books", label: "Sad Ending Books" },
  { slug: "bittersweet-ending-books", label: "Bittersweet Ending Books" },
  { slug: "open-ending-books", label: "Open Ending Books" },
  { slug: "romance-ending-finder", label: "Romance Ending Finder" },
  { slug: "ya-trigger-warnings", label: "YA Book Trigger Warnings" },
  { slug: "bl-danmei-warnings", label: "BL / Danmei Warnings" },
  { slug: "pet-death-warning", label: "Pet Death in Books" },
  { slug: "self-harm-warning", label: "Self-Harm Warning in Books" },
  { slug: "sexual-violence-warning", label: "Sexual Violence Warning in Books" },
  { slug: "cheating-warning", label: "Cheating Warning in Books" },
  { slug: "sweet-vs-angst", label: "Sweet vs Angst Books" },
  { slug: "light-novel-finished", label: "Finished Light Novels" },
  { slug: "is-series-finished", label: "Is This Series Finished?" },
  { slug: "read-or-skip", label: "Read or Skip This Book" },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function collectionBooks(c: Collection): Book[] {
  return books.filter(c.filter);
}
