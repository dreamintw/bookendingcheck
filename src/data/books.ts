export type Ending = "HE" | "BE" | "OE" | "Bittersweet" | "Ambiguous" | "Unknown";
export type Decision = "read" | "skip" | "caution";
export type Intensity = "low" | "mid" | "high";

export interface Trigger {
  code: string;
  zh: string;
  en: string;
  intensity: Intensity;
}

export interface Book {
  slug: string;
  isbn?: string;
  title: { zh: string; en: string };
  author: { zh: string; en: string };
  year: number;
  genre: { zh: string; en: string };
  ending: Ending;
  decision: Decision;
  confidence: number; // 0-100
  summary: { zh: string; en: string };
  spoilerSoft: { zh: string; en: string };
  spoilerHard: { zh: string; en: string };
  whoFor: { zh: string[]; en: string[] };
  whoNot: { zh: string[]; en: string[] };
  triggers: Trigger[];
  originalLanguage?: string;
  relatedBooks?: string[];
}

import { extraBooks } from "./books-extra";

export const ENDINGS: Ending[] = ["HE", "BE", "OE", "Bittersweet", "Ambiguous", "Unknown"];

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
}

export const books: Book[] = [
  {
    slug: "the-song-of-achilles",
    isbn: "9780062060624",
    title: { zh: "阿基里斯之歌", en: "The Song of Achilles" },
    author: { zh: "瑪德琳・米勒", en: "Madeline Miller" },
    year: 2011,
    genre: { zh: "歷史 / 神話 / LGBTQ+", en: "Historical / Mythology / LGBTQ+" },
    ending: "BE",
    decision: "caution",
    confidence: 88,
    summary: {
      zh: "重述特洛伊戰爭，從帕特羅克洛斯的視角描繪他與阿基里斯之間的羈絆與宿命。",
      en: "A retelling of the Trojan War through Patroclus's eyes, tracing his bond with Achilles and their fated path.",
    },
    spoilerSoft: {
      zh: "全書整體基調溫柔但走向沉重，後段情緒壓力非常大。",
      en: "Tender first half, but the back half is emotionally heavy and grief-driven.",
    },
    spoilerHard: {
      zh: "帕特羅克洛斯戰死，阿基里斯隨後被殺，兩人最終在冥界合葬，是典型 BE。",
      en: "Patroclus dies in battle, Achilles is killed soon after; they are united only in death — a classic BE.",
    },
    whoFor: {
      zh: ["喜歡神話重述", "願意接受心碎結局", "喜愛抒情散文"],
      en: ["Love mythology retellings", "OK with heartbreak", "Enjoy lyrical prose"],
    },
    whoNot: {
      zh: ["只想看 HE", "排斥主角死亡", "近期情緒低落"],
      en: ["Need a HE", "Hate main character death", "In a low mood right now"],
    },
    triggers: [
      { code: "death", zh: "主角死亡", en: "Major character death", intensity: "high" },
      { code: "war", zh: "戰爭暴力", en: "War violence", intensity: "high" },
      { code: "grief", zh: "強烈悲痛", en: "Intense grief", intensity: "high" },
    ],
  },
  {
    slug: "pride-and-prejudice",
    isbn: "9780141439518",
    title: { zh: "傲慢與偏見", en: "Pride and Prejudice" },
    author: { zh: "珍・奧斯汀", en: "Jane Austen" },
    year: 1813,
    genre: { zh: "古典 / 愛情", en: "Classic / Romance" },
    ending: "HE",
    decision: "read",
    confidence: 95,
    summary: {
      zh: "伊莉莎白與達西在誤解與成長中走向理解，是英國文學最經典的浪漫喜劇之一。",
      en: "Elizabeth and Darcy move from misunderstanding to mutual respect — a cornerstone of romantic comedy.",
    },
    spoilerSoft: {
      zh: "節奏輕快、結局溫暖，沒有重大悲劇。",
      en: "Bright pacing and a warm finish — no major tragedies.",
    },
    spoilerHard: {
      zh: "兩人最終結婚，姐姐 Jane 也與 Bingley 結合，圓滿 HE。",
      en: "Elizabeth marries Darcy, Jane marries Bingley — full HE.",
    },
    whoFor: {
      zh: ["想看 HE", "喜歡機智對白", "古典愛情入門"],
      en: ["Want a HE", "Love witty dialogue", "Classic romance newcomers"],
    },
    whoNot: {
      zh: ["要求黑暗深沉", "不耐煩 19 世紀文體"],
      en: ["Want dark / heavy themes", "Dislike 19th-century prose"],
    },
    triggers: [
      { code: "classism", zh: "階級偏見", en: "Classism", intensity: "low" },
    ],
  },
  {
    slug: "no-longer-human",
    isbn: "9780811204811",
    title: { zh: "人間失格", en: "No Longer Human" },
    author: { zh: "太宰治", en: "Osamu Dazai" },
    year: 1948,
    genre: { zh: "日本文學 / 純文學", en: "Japanese Literature / Literary" },
    ending: "BE",
    decision: "skip",
    confidence: 90,
    summary: {
      zh: "以三本手記呈現一名男子自我毀滅的一生，是太宰治半自傳式代表作。",
      en: "Three notebooks chronicle one man's self-destruction — Dazai's semi-autobiographical masterpiece.",
    },
    spoilerSoft: {
      zh: "全書極度壓抑、孤獨與虛無，沒有任何救贖時刻。",
      en: "Relentlessly bleak — isolation, addiction, no redemption arc.",
    },
    spoilerHard: {
      zh: "葉藏精神崩潰、被送入療養院，淪為「失去做人資格」的人。",
      en: "Yozo collapses mentally, is committed, and becomes 'disqualified as a human being.'",
    },
    whoFor: {
      zh: ["研究日本純文學", "情緒穩定且想理解虛無感"],
      en: ["Study Japanese literature", "Emotionally stable and curious about nihilism"],
    },
    whoNot: {
      zh: ["有自殺意念", "正處於憂鬱期", "需要溫暖故事"],
      en: ["Have suicidal ideation", "Currently depressed", "Need a warm story"],
    },
    triggers: [
      { code: "suicide", zh: "自殺意念", en: "Suicidal ideation", intensity: "high" },
      { code: "addiction", zh: "藥物濫用", en: "Substance abuse", intensity: "high" },
      { code: "depression", zh: "嚴重憂鬱", en: "Severe depression", intensity: "high" },
    ],
  },
  {
    slug: "norwegian-wood",
    isbn: "9780375704024",
    title: { zh: "挪威的森林", en: "Norwegian Wood" },
    author: { zh: "村上春樹", en: "Haruki Murakami" },
    year: 1987,
    genre: { zh: "日本文學 / 成長", en: "Japanese Literature / Coming-of-age" },
    ending: "Bittersweet",
    decision: "caution",
    confidence: 80,
    summary: {
      zh: "渡邊在 60 年代末的東京，於兩個女子與好友之死之間徘徊的青春輓歌。",
      en: "In late-60s Tokyo, Toru drifts between two women and the shadow of his friend's death.",
    },
    spoilerSoft: {
      zh: "氣氛憂鬱但抒情，並非全然絕望，結局留白。",
      en: "Melancholic but lyrical; ending is reflective rather than fully dark.",
    },
    spoilerHard: {
      zh: "直子自殺，渡邊在電話中呼喚綠子，未來懸而未決——苦樂參半。",
      en: "Naoko takes her life; Toru calls Midori from a phone booth, future unresolved — bittersweet.",
    },
    whoFor: {
      zh: ["喜歡村上抒情風", "接受開放/苦澀結局"],
      en: ["Love Murakami's lyricism", "OK with open / bittersweet ends"],
    },
    whoNot: {
      zh: ["對自殺題材敏感", "想要明確 HE"],
      en: ["Sensitive to suicide themes", "Want a clear HE"],
    },
    triggers: [
      { code: "suicide", zh: "自殺", en: "Suicide", intensity: "high" },
      { code: "grief", zh: "悲傷", en: "Grief", intensity: "mid" },
      { code: "sex", zh: "性描寫", en: "Sexual content", intensity: "mid" },
    ],
  },
  {
    slug: "the-remains-of-the-day",
    isbn: "9780679731726",
    title: { zh: "長日將盡", en: "The Remains of the Day" },
    author: { zh: "石黑一雄", en: "Kazuo Ishiguro" },
    year: 1989,
    genre: { zh: "文學 / 歷史", en: "Literary / Historical" },
    ending: "Ambiguous",
    decision: "read",
    confidence: 85,
    summary: {
      zh: "英國管家史蒂文斯回首一生奉獻，發現自己錯過了愛情與道德判斷。",
      en: "An English butler retraces a life of service and realizes what love and judgment he missed.",
    },
    spoilerSoft: {
      zh: "節制內斂，情感壓抑卻深刻。",
      en: "Restrained, quiet, but emotionally devastating in retrospect.",
    },
    spoilerHard: {
      zh: "他與肯頓小姐的重逢無果，回到府邸繼續服務，未來模糊。",
      en: "His reunion with Miss Kenton leads nowhere; he returns to service — future ambiguous.",
    },
    whoFor: {
      zh: ["喜歡文學深度", "願意接受留白"],
      en: ["Love literary depth", "Comfortable with ambiguity"],
    },
    whoNot: {
      zh: ["想要強情節", "需要明確結局"],
      en: ["Want plot-driven action", "Need a clear ending"],
    },
    triggers: [
      { code: "regret", zh: "強烈悔恨", en: "Deep regret", intensity: "mid" },
    ],
  },
  {
    slug: "the-giver",
    isbn: "9780544336261",
    title: { zh: "記憶傳承人", en: "The Giver" },
    author: { zh: "洛伊絲・勞瑞", en: "Lois Lowry" },
    year: 1993,
    genre: { zh: "反烏托邦 / YA", en: "Dystopia / YA" },
    ending: "OE",
    decision: "read",
    confidence: 78,
    summary: {
      zh: "在一個沒有色彩與痛苦的「完美社區」，少年喬納斯被選為記憶傳承人。",
      en: "In a colorless 'perfect' community, young Jonas is chosen to receive its hidden memories.",
    },
    spoilerSoft: {
      zh: "節奏緊湊、思辨性強，結尾開放可解讀。",
      en: "Tight pacing, thought-provoking; the ending is famously open.",
    },
    spoilerHard: {
      zh: "喬納斯帶著嬰兒逃離社區，最終是否得救由讀者決定。",
      en: "Jonas escapes with baby Gabriel; whether they survive is left to the reader.",
    },
    whoFor: {
      zh: ["反烏托邦入門", "喜歡開放結局"],
      en: ["Dystopia newcomers", "Enjoy open endings"],
    },
    whoNot: {
      zh: ["需要明確答案", "排斥兒童置於險境"],
      en: ["Need clear answers", "Sensitive to children in danger"],
    },
    triggers: [
      { code: "infanticide", zh: "嬰兒被「解除」", en: "Infant 'release'", intensity: "high" },
      { code: "control", zh: "極權控制", en: "Authoritarian control", intensity: "mid" },
    ],
  },
];

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}

// Canonical warning catalog. Independent of any specific book so a warning
// page can exist even when no book yet carries that trigger.
export const WARNING_CATALOG: Trigger[] = [
  { code: "pet-death", zh: "寵物死亡", en: "Pet death", intensity: "high" },
  { code: "death", zh: "主角死亡", en: "Major character death", intensity: "high" },
  { code: "suicide", zh: "自殺", en: "Suicide", intensity: "high" },
  { code: "self-harm", zh: "自傷", en: "Self-harm", intensity: "high" },
  { code: "sexual-violence", zh: "性暴力", en: "Sexual violence", intensity: "high" },
  { code: "domestic-abuse", zh: "家暴", en: "Domestic abuse", intensity: "high" },
  { code: "cheating", zh: "外遇 / 出軌", en: "Cheating / infidelity", intensity: "mid" },
  { code: "addiction", zh: "成癮", en: "Addiction", intensity: "high" },
  { code: "bullying", zh: "霸凌", en: "Bullying", intensity: "mid" },
  { code: "depression", zh: "憂鬱", en: "Depression", intensity: "high" },
  { code: "grief", zh: "悲痛", en: "Grief", intensity: "mid" },
  { code: "war", zh: "戰爭暴力", en: "War violence", intensity: "high" },
  { code: "sex", zh: "性描寫", en: "Sexual content", intensity: "mid" },
  { code: "regret", zh: "強烈悔恨", en: "Deep regret", intensity: "mid" },
  { code: "infanticide", zh: "嬰兒被「解除」", en: "Infant 'release'", intensity: "high" },
  { code: "control", zh: "極權控制", en: "Authoritarian control", intensity: "mid" },
  { code: "classism", zh: "階級偏見", en: "Classism", intensity: "low" },
];

export function getWarning(code: string): Trigger | undefined {
  return WARNING_CATALOG.find((w) => w.code === code)
    ?? getAllTriggers().find((w) => w.code === code);
}

export function getAllTriggers(): Trigger[] {
  const map = new Map<string, Trigger>();
  for (const w of WARNING_CATALOG) map.set(w.code, w);
  for (const b of books) for (const t of b.triggers) if (!map.has(t.code)) map.set(t.code, t);
  return Array.from(map.values());
}

export function getAllGenres() {
  const map = new Map<string, { slug: string; zh: string; en: string }>();
  for (const b of books) {
    const slug = slugify(b.genre.en);
    if (!map.has(slug)) map.set(slug, { slug, zh: b.genre.zh, en: b.genre.en });
  }
  return Array.from(map.values());
}

export function getAllAuthors() {
  const map = new Map<string, { slug: string; zh: string; en: string }>();
  for (const b of books) {
    const slug = slugify(b.author.en);
    if (!map.has(slug)) map.set(slug, { slug, zh: b.author.zh, en: b.author.en });
  }
  return Array.from(map.values());
}
