import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, ENDINGS, type Ending } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { homepageEntriesZh, homepageEntriesEn } from "@/data/collections";
import { BookCard } from "@/components/BookCard";
import { EndingBadge } from "@/components/EndingBadge";
import { Search, Sparkles } from "lucide-react";
import { siteUrl, langAlt } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "小說結局查詢、避雷標籤與讀前決策工具 | 讀前決策站"
      : "Book Ending Checker & Reader Decision Tool | NovelCheck";
    const desc = lang === "zh"
      ? "輸入書名，快速查看這本小說是 HE、BE、OE，是否有高風險雷點，以及它是否適合你現在閱讀。"
      : "Search a book to check its ending tone, trigger warnings, spoiler-safe summary, and whether it is right for you.";
    const zhFaq = [
      ["這個網站會提供小說全文或下載嗎？", "不會。讀前決策站不提供小說全文、不提供盜版下載、不提供任何違反版權的閱讀連結。我們只提供結局類型、避雷標籤、免雷摘要與分層劇透等讀前決策資訊。"],
      ["HE、BE、OE 是什麼意思？", "HE 指 Happy Ending 圓滿結局，BE 指 Bad / Tragic Ending 悲劇或主角不幸的結局，OE 指 Open Ending 開放式結局。另外還有 Bittersweet 苦樂參半 和 Ambiguous 曖昧結局。"],
      ["避雷標籤本身會不會就是劇透？", "避雷標籤只標示主題層級（例如寵物死亡、外遇、自傷、性暴力），不會告訴你發生在第幾章、發生在誰身上。完整劇情仍保留在預設折疊的完整劇透區。"],
      ["完整劇透會直接顯示出來嗎？", "不會。每本書的完整劇透預設都是折疊狀態，需要主動點擊「展開完整劇透」才會顯示。免雷摘要與避雷標籤則永遠可見。"],
      ["可以用中文或英文書名搜尋嗎？", "可以。搜尋欄同時支援中文書名、英文書名、作者中英文名與 ISBN。"],
      ["資料有誤或不確定怎麼辦？", "部分書目的結局或標籤會標記為 low confidence 或 unknown，表示資料尚未完全確認。可透過關於頁的聯絡方式回報修正。"],
    ];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}` },
        ...langAlt("/"),
      ],
      scripts: lang === "zh" ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: zhFaq.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      }] : undefined,
    };
  },
  component: HomePage,
});

const endingsList: (Ending | "All")[] = ["All", ...ENDINGS];

function HomePage() {
  const lang = useLang();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Ending | "All">("All");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return books.filter((b) => {
      if (filter !== "All" && b.ending !== filter) return false;
      if (!needle) return true;
      const hay = [b.title.zh, b.title.en, b.author.zh, b.author.en, b.genre.zh, b.genre.en, b.isbn ?? "", ...b.triggers.flatMap((tr) => [tr.zh, tr.en])].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [q, filter]);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {lang === "zh" ? "讀前 30 秒決策" : "30-second pre-read"}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-4">
            {t.tagline[lang]}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.heroSub[lang]}
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder[lang]}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              aria-label={t.searchPlaceholder[lang]}
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {endingsList.map((e) => (
              <button
                key={e}
                onClick={() => setFilter(e)}
                className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${filter === e ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {e === "All" ? t.all[lang] : <EndingBadge ending={e} />}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <Link to="/$lang/endings" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByEnding[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/warnings" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByWarning[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/genres" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByGenre[lang]}</Link>
            <span>·</span>
            <Link to="/$lang/authors" params={{ lang }} className="hover:text-foreground underline-offset-4 hover:underline">{t.browseByAuthor[lang]}</Link>
          </div>
        </div>
      </section>

      {(() => {
        const hasSearched = q.trim().length > 0;
        const booksSection = (
          <section key="books" className="mx-auto max-w-6xl w-full px-4 py-12 border-b border-border">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">{t.browseAll[lang]}</h2>
              <Link to="/$lang/books" params={{ lang }} className="text-sm text-accent hover:underline">
                {t.books[lang]} →
              </Link>
            </div>
            {results.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">{t.noResults[lang]}</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((b) => <BookCard key={b.slug} book={b} />)}
              </div>
            )}
          </section>
        );
        const needSection = (
          <section key="need" aria-labelledby="reader-need-heading" className="bg-card/40 flex-1 border-b border-border">
            <div className="mx-auto max-w-6xl w-full px-4 py-12">
              <div className="mb-6">
                <h2 id="reader-need-heading" className="font-display text-2xl md:text-3xl font-semibold">
                  {lang === "zh" ? "依讀者需求瀏覽（Browse by Reader Need）" : "Browse by Reader Need"}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {lang === "zh"
                    ? "選一個最貼近你目前需求的入口，30 秒找到下一本書。"
                    : "Pick the entry that matches your current need — find your next book in 30 seconds."}
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(lang === "zh" ? homepageEntriesZh : homepageEntriesEn).map((entry) => (
                  <li key={entry.slug}>
                    <a
                      href={`/${lang}/collections/${entry.slug}`}
                      className="block rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-accent hover:text-accent hover:shadow-sm transition-colors"
                    >
                      {entry.label} →
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                <a href={`/${lang}/collections`} className="hover:text-foreground underline-offset-4 hover:underline">
                  {lang === "zh" ? "查看全部主題清單" : "See all collections"} →
                </a>
              </p>
            </div>
          </section>
        );
        const zhIntro = lang === "zh" ? (
          <section key="zh-intro" aria-labelledby="zh-intro-heading" className="border-b border-border">
            <div className="mx-auto max-w-4xl w-full px-4 py-12 space-y-10">
              <div className="space-y-3">
                <h2 id="zh-intro-heading" className="font-display text-2xl md:text-3xl font-semibold">
                  關於讀前決策站｜中文小說讀前查詢工具
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-7">
                  讀前決策站是一個專為中文讀者設計的<strong>小說讀前決策工具</strong>。
                  在你正式翻開一本小說之前，我們幫你 30 秒內看清這本書的結局走向（HE 圓滿、BE 悲劇、OE 開放、Bittersweet 苦樂參半、Ambiguous 曖昧結局），
                  整理出常見的<strong>避雷標籤</strong>（例如寵物死亡、外遇出軌、自傷、性暴力、家暴、童年創傷等），
                  並提供<strong>分層劇透設計</strong>：免雷摘要永遠可見，微雷氛圍與完整劇透預設折疊，由你自己決定要看到哪一層。
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-7">
                  我們收錄英文原作、翻譯小說、言情、奇幻、推理、文學等多種類型，
                  支援用中文書名、英文書名、作者、ISBN 或標籤查詢。
                  本站不提供小說全文，也不提供任何盜版下載連結，
                  只專注在「這本書現在適不適合你讀」這一個問題。
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold">什麼時候會用到讀前決策站？</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="rounded-md border border-border bg-card px-3 py-2">想先確認是 HE 還是 BE，再決定要不要入坑</li>
                  <li className="rounded-md border border-border bg-card px-3 py-2">想避開寵物死亡、外遇、自傷、性暴力等高強度雷點</li>
                  <li className="rounded-md border border-border bg-card px-3 py-2">想看免雷摘要，但不想被完整劇透爆雷</li>
                  <li className="rounded-md border border-border bg-card px-3 py-2">想判斷一本小說「現在」適不適合自己的心情</li>
                  <li className="rounded-md border border-border bg-card px-3 py-2">看完一本書想找走向、氛圍相近的作品</li>
                  <li className="rounded-md border border-border bg-card px-3 py-2">看完一本書想找避雷標籤類似的安全替代</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold">中文讀者熱門入口</h3>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/endings/HE">HE 圓滿結局小說 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/endings/BE">BE 悲劇結局小說 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/endings/OE">OE 開放結局小說 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/endings/Bittersweet">Bittersweet 苦樂參半 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/warnings">避雷標籤總覽 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/genres">依類型瀏覽 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/authors">依作者瀏覽 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/collections">主題書單 →</a></li>
                  <li><a className="block rounded-md border border-border bg-card px-3 py-2 hover:border-accent hover:text-accent" href="/zh/books">作品庫 →</a></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold">常見問題 FAQ</h3>
                <div className="space-y-3 text-sm">
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">這個網站會提供小說全文或下載嗎？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">不會。讀前決策站<strong>不提供小說全文、不提供盜版下載、不提供任何違反版權的閱讀連結</strong>。我們只提供結局類型、避雷標籤、免雷摘要與分層劇透等讀前決策資訊。</p>
                  </details>
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">HE、BE、OE 是什麼意思？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">HE 指 Happy Ending 圓滿結局，BE 指 Bad / Tragic Ending 悲劇或主角不幸的結局，OE 指 Open Ending 開放式結局。另外還有 Bittersweet（苦樂參半）和 Ambiguous（曖昧結局）等中間值。</p>
                  </details>
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">避雷標籤本身會不會就是劇透？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">我們把避雷標籤設計成「主題層級」而非「情節層級」，例如「寵物死亡」「外遇」「自傷」「性暴力」。它會告訴你存在這個主題，但不會告訴你發生在第幾章、發生在誰身上。完整劇情仍然保留在預設折疊的完整劇透區。</p>
                  </details>
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">完整劇透會直接顯示出來嗎？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">不會。每本書的完整劇透預設都是<strong>折疊狀態</strong>，需要你主動點擊「展開完整劇透」才會顯示。免雷摘要與避雷標籤則永遠可見。</p>
                  </details>
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">可以用中文或英文書名搜尋嗎？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">可以。搜尋欄同時支援中文書名、英文書名、作者中英文名與 ISBN。若是翻譯小說，輸入原文或譯名都應該能找到。</p>
                  </details>
                  <details className="rounded-md border border-border bg-card px-4 py-3">
                    <summary className="cursor-pointer font-medium">資料有誤或不確定怎麼辦？</summary>
                    <p className="mt-2 text-muted-foreground leading-7">部分書目的結局或標籤會標記為 low confidence 或 unknown，表示資料尚未完全確認。歡迎透過<a className="underline underline-offset-4 hover:text-foreground" href="/zh/about">關於頁</a>聯絡方式回報修正。</p>
                  </details>
                </div>
              </div>
            </div>
          </section>
        ) : null;
        return hasSearched ? <>{booksSection}{needSection}{zhIntro}</> : <>{needSection}{zhIntro}{booksSection}</>;
      })()}
    </>
  );
}
