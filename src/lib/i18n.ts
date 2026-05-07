import { useParams } from "@tanstack/react-router";

export type Lang = "zh" | "en";

export function isLang(v: unknown): v is Lang {
  return v === "zh" || v === "en";
}

export function useLang(): Lang {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLang(params.lang) ? params.lang : "zh";
}

export const t = {
  siteName: { zh: "讀前決策站", en: "NovelCheck" },
  tagline: {
    zh: "小說結局查詢、避雷標籤與讀前決策工具",
    en: "Book Ending Checker & Reader Decision Tool",
  },
  heroSub: {
    zh: "輸入書名，快速查看這本小說是 HE、BE、OE，是否有高風險雷點，以及它是否適合你現在閱讀。",
    en: "Search a book to check its ending tone, trigger warnings, spoiler-safe summary, and whether it is right for you.",
  },
  searchPlaceholder: { zh: "搜尋書名、作者或 ISBN…", en: "Search title, author or ISBN…" },
  browseAll: { zh: "瀏覽全部作品", en: "Browse all books" },
  home: { zh: "首頁", en: "Home" },
  books: { zh: "作品庫", en: "Books" },
  about: { zh: "關於", en: "About" },
  endings: { zh: "結局類型", en: "Endings" },
  warnings: { zh: "避雷標籤", en: "Trigger Warnings" },
  genres: { zh: "類型", en: "Genres" },
  authors: { zh: "作者", en: "Authors" },
  ending: { zh: "結局類型", en: "Ending" },
  triggers: { zh: "避雷標籤", en: "Trigger Warnings" },
  decision: { zh: "讀 or 略", en: "Read or Skip" },
  read: { zh: "值得讀", en: "Read" },
  skip: { zh: "建議略過", en: "Skip" },
  caution: { zh: "謹慎閱讀", en: "Caution" },
  confidence: { zh: "信心分數", en: "Confidence" },
  summary: { zh: "免雷摘要", en: "Spoiler-Safe Summary" },
  spoilerSoft: { zh: "微雷提示：氛圍與走向", en: "Mild Spoilers: tone & direction" },
  spoilerHard: { zh: "完整劇透（預設折疊）", en: "Full Spoilers (collapsed by default)" },
  reveal: { zh: "點擊展開完整劇透", en: "Click to reveal full spoilers" },
  hide: { zh: "收起", en: "Hide" },
  whoFor: { zh: "適合誰讀", en: "Who it's for" },
  whoNot: { zh: "不適合誰", en: "Who should skip" },
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
  endingUnknown: { zh: "Unknown 未知", en: "Unknown" },
  endingShortHE: { zh: "HE", en: "HE" },
  endingShortBE: { zh: "BE", en: "BE" },
  endingShortOE: { zh: "OE", en: "OE" },
  endingShortBittersweet: { zh: "Bittersweet", en: "Bittersweet" },
  endingShortAmbiguous: { zh: "Ambiguous", en: "Ambiguous" },
  endingShortUnknown: { zh: "Unknown", en: "Unknown" },
  intensity: { zh: "強度", en: "Intensity" },
  low: { zh: "低", en: "Low" },
  med: { zh: "中", en: "Mid" },
  high: { zh: "高", en: "High" },
  noFullText: {
    zh: "本站不提供小說全文與盜版下載，僅提供讀前決策資訊。",
    en: "We do not host full text or pirated downloads — only pre-read decision info.",
  },
  browseByEnding: { zh: "依結局瀏覽", en: "Browse by ending" },
  browseByWarning: { zh: "依避雷標籤瀏覽", en: "Browse by trigger warning" },
  browseByGenre: { zh: "依類型瀏覽", en: "Browse by genre" },
  browseByAuthor: { zh: "依作者瀏覽", en: "Browse by author" },
  relatedEnding: { zh: "同類結局推薦", en: "Similar endings" },
  breadcrumbHome: { zh: "首頁", en: "Home" },
} as const;
