import { useSyncExternalStore } from "react";

export type Lang = "zh" | "en";

const KEY = "novelcheck.lang";
let current: Lang = "zh";
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  const saved = localStorage.getItem(KEY) as Lang | null;
  if (saved === "zh" || saved === "en") current = saved;
  else if (navigator.language.startsWith("en")) current = "en";
}

export function getLang(): Lang { return current; }
export function setLang(l: Lang) {
  current = l;
  if (typeof window !== "undefined") localStorage.setItem(KEY, l);
  listeners.forEach((fn) => fn());
}
function subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn); }

export function useLang(): [Lang, (l: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, () => current, () => current);
  return [lang, setLang];
}

export const t = {
  siteName: { zh: "讀前決策站", en: "NovelCheck" },
  tagline: {
    zh: "查小說結局、避雷標籤與是否值得讀",
    en: "Check book endings, trigger warnings, and decide whether a novel is right for you.",
  },
  searchPlaceholder: { zh: "搜尋書名、作者、標籤…", en: "Search title, author, tag…" },
  browseAll: { zh: "瀏覽全部作品", en: "Browse all books" },
  home: { zh: "首頁", en: "Home" },
  books: { zh: "作品庫", en: "Books" },
  about: { zh: "關於", en: "About" },
  ending: { zh: "結局類型", en: "Ending" },
  triggers: { zh: "避雷標籤", en: "Trigger Warnings" },
  decision: { zh: "讀 or 略", en: "Read or Skip" },
  read: { zh: "值得讀", en: "Read" },
  skip: { zh: "建議略過", en: "Skip" },
  caution: { zh: "謹慎閱讀", en: "Caution" },
  summary: { zh: "簡短摘要（無雷）", en: "Short Summary (No Spoilers)" },
  spoilerSoft: { zh: "輕度劇透：氛圍與走向", en: "Mild spoilers: tone & direction" },
  spoilerHard: { zh: "完整結局劇透", en: "Full ending spoilers" },
  reveal: { zh: "點擊顯示", en: "Click to reveal" },
  hide: { zh: "隱藏", en: "Hide" },
  whoFor: { zh: "適合誰讀", en: "Who it's for" },
  whoNot: { zh: "誰應避開", en: "Who should skip" },
  noResults: { zh: "找不到符合的作品", en: "No matches found" },
  filterEnding: { zh: "依結局篩選", en: "Filter by ending" },
  all: { zh: "全部", en: "All" },
  by: { zh: "作者", en: "by" },
  notFound: { zh: "找不到此作品", en: "Book not found" },
  backHome: { zh: "回首頁", en: "Back home" },
  endingHE: { zh: "HE 圓滿結局", en: "HE — Happy Ending" },
  endingBE: { zh: "BE 悲劇結局", en: "BE — Bad / Tragic Ending" },
  endingOE: { zh: "OE 開放結局", en: "OE — Open Ending" },
  endingBittersweet: { zh: "Bittersweet 苦樂參半", en: "Bittersweet" },
  endingAmbiguous: { zh: "Ambiguous 曖昧結局", en: "Ambiguous" },
  endingShortHE: { zh: "HE", en: "HE" },
  endingShortBE: { zh: "BE", en: "BE" },
  endingShortOE: { zh: "OE", en: "OE" },
  endingShortBittersweet: { zh: "Bittersweet", en: "Bittersweet" },
  endingShortAmbiguous: { zh: "Ambiguous", en: "Ambiguous" },
  intensity: { zh: "強度", en: "Intensity" },
  low: { zh: "低", en: "Low" },
  med: { zh: "中", en: "Mid" },
  high: { zh: "高", en: "High" },
  noFullText: {
    zh: "本站不提供小說全文與盜版下載，僅提供讀前決策資訊。",
    en: "We do not host full text or pirated downloads — only pre-read decision info.",
  },
  heroSub: {
    zh: "30 秒判斷一本小說是否適合你：結局、雷點、決策卡，一次看清。",
    en: "Decide in 30 seconds: endings, trigger warnings, and a clear read-or-skip card.",
  },
};

export function tr<K extends keyof typeof t>(key: K, lang: Lang): string {
  return t[key][lang];
}
