import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";
import { AUTHOR_ALLOW, BOOK_ALLOW } from "@/lib/index-allowlist";

const FEATURED_AUTHORS = [
  { slug: "madeline-miller", en: "Madeline Miller", zh: "瑪德琳・米勒" },
  { slug: "haruki-murakami", en: "Haruki Murakami", zh: "村上春樹" },
  { slug: "kazuo-ishiguro", en: "Kazuo Ishiguro", zh: "石黑一雄" },
  { slug: "aldous-huxley", en: "Aldous Huxley", zh: "阿道斯・赫胥黎" },
] as const;

const FAQ_EN = [
  { q: "What does the authors hub do?", a: "It groups every author NovelCheck has researched in depth so you can see their ending tendencies, common trigger warnings, and reader decision notes in one place — without spoiling the book." },
  { q: "Why are only a few authors listed?", a: "For now, we only surface authors whose pages already carry a full editorial overview, FAQ, and curated book list. Other author pages are still being expanded and will return once they meet the same editorial standard." },
  { q: "Do you publish full biographies?", a: "No. We summarize what a reader needs to decide whether to pick up the next book — tone, recurring themes, ending profile, content warnings — not encyclopedia-style life stories." },
  { q: "Where does the data come from?", a: "Editorial review of the books we cover, publicly available book metadata, and reader feedback. See our Editorial Policy for the full data-source breakdown." },
  { q: "Do you provide the full text of any novel?", a: "No. NovelCheck does not host or link to pirated downloads, full chapters, or large plot retellings. We provide spoiler-safe summaries and layered spoiler blocks only." },
  { q: "How do I report an error on an author page?", a: "Email report@bookendingcheck.xyz with the URL and the correction. Copyright concerns go to copyright@bookendingcheck.xyz." },
];
const FAQ_ZH = [
  { q: "作者入口頁的用途是什麼？", a: "把本站深度整理過的作者集中起來，讓你一次看到他們的結局傾向、常見避雷標籤與閱讀建議，不會劇透內容。" },
  { q: "為什麼只列出少數作者？", a: "目前只公開已經寫好完整編輯導讀、FAQ 與精選書單的作者。其他作者的詳細頁仍在補充內容，完成後會逐步開放。" },
  { q: "你們會寫完整傳記嗎？", a: "不會。我們只整理「決定要不要讀下一本」會用到的資訊：寫作語調、反覆出現的主題、結局走向、避雷內容，不做百科式生平。" },
  { q: "資料來源是什麼？", a: "本站作品的編輯整理、公開可得的書籍資訊，以及讀者回報。完整來源請看編輯政策頁。" },
  { q: "本站會提供小說全文嗎？", a: "不會。本站不提供小說全文、不提供盜版下載、不大段複述原作情節，只提供無雷摘要與分層劇透。" },
  { q: "發現作者頁有錯誤怎麼回報？", a: "請寄信至 report@bookendingcheck.xyz，附上頁面網址與更正內容。版權問題請寄 copyright@bookendingcheck.xyz。" },
];

export const Route = createFileRoute("/$lang/authors/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "依作者瀏覽：結局傾向與避雷導讀｜NovelCheck"
      : "Browse Authors — Ending Profiles & Trigger Guides | NovelCheck";
    const desc = lang === "zh"
      ? "用作者視角找下一本書：每位作者的結局傾向、常見避雷標籤、讀前決策與相似閱讀建議，全部無雷整理。"
      : "Pick your next read by author. Ending tendencies, common trigger warnings, and spoiler-safe reading decisions for every author we cover.";
    const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `${siteUrl}/${lang}/authors` },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/authors` }, ...langAlt("/authors")],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }],
    };
  },
  component: AuthorsIndex,
});

function AuthorsIndex() {
  const lang = useLang();
  const featured = FEATURED_AUTHORS.filter((a) => AUTHOR_ALLOW.has(a.slug));
  const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{t.authors[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        {lang === "zh" ? "依作者瀏覽" : "Browse by Author"}
      </h1>

      {lang === "zh" ? (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>NovelCheck 的作者入口頁不是百科。我們不抄傳記、不大段複述情節，只整理讀者決定「要不要讀下一本」會用到的資訊：作者反覆出現的主題、結局傾向（HE / BE / 開放 / 苦甜）、最常被回報的避雷標籤，以及和哪些作者氣質相近。每位上架作者都附有編輯導讀、本站收錄作品清單、無雷摘要連結與分層劇透頁。</p>
          <p>本站目前優先深耕少數作者，而不是一次推出大量未完成的頁面。這個入口頁只列出已經寫好完整導讀的作者；其他作者的詳細頁仍在補充導讀與 FAQ，完成後會逐步開放。</p>
          <h2 className="font-display text-xl font-semibold mt-6">如何使用本頁</h2>
          <ol>
            <li>下方列出本站目前已富化的作者。點進去可以看到該作者在本站收錄的書、常見讀者顧慮、結局與避雷輪廓，以及相近作者推薦。</li>
            <li>若你已經知道書名，直接到 <a href={`/${lang}/books`}>全書庫</a> 用書名搜尋更快。</li>
            <li>若你只想避開特定內容，可以從 <a href={`/${lang}/warnings`}>避雷標籤</a> 或 <a href={`/${lang}/collections/pet-death-warning`}>寵物死亡避雷專題</a> 開始。</li>
            <li>若你想直接挑結局類型，請走 <a href={`/${lang}/collections/happy-ending-books`}>HE 書單</a> 或 <a href={`/${lang}/collections/sad-ending-books`}>BE 書單</a>。</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">本站不提供的東西</h2>
          <p>本站不提供小說全文、不提供盜版下載、不提供章節掃描，也不會大段複述原作情節。所有完整劇透預設折疊，需要使用者主動點擊展開。完整資料政策請見 <a href={`/${lang}/editorial-policy`}>編輯政策</a>。</p>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>NovelCheck's authors hub is not an encyclopedia. We don't copy biographies and we don't retell plots in long form. We organize the things a reader actually needs before picking up the next book by a given author: recurring themes, ending tendencies (happy, sad, open, bittersweet), the trigger warnings readers report most often, and which other authors feel adjacent in tone.</p>
          <p>For now we only surface authors whose pages already carry a full editorial overview, a curated book list, common reader concerns, an ending and warning profile, and an FAQ. Other author pages are still being expanded and will return once they meet the same editorial standard.</p>
          <h2 className="font-display text-xl font-semibold mt-6">How to use this page</h2>
          <ol>
            <li>Pick an author below to see the books we cover, common reader concerns, the author's ending and warning profile, and related-author suggestions.</li>
            <li>If you already know the title, jump straight to the <a href={`/${lang}/books`}>full library</a> and search by name.</li>
            <li>If you want to avoid specific content, start from the <a href={`/${lang}/warnings`}>trigger warnings hub</a> or our <a href={`/${lang}/collections/pet-death-warning`}>pet death warning guide</a>.</li>
            <li>If you're picking by ending type, try the <a href={`/${lang}/collections/happy-ending-books`}>happy-ending list</a> or the <a href={`/${lang}/collections/sad-ending-books`}>sad-ending list</a>.</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">What this site does not do</h2>
          <p>NovelCheck does not host or link to full book texts, pirated downloads, or scanned chapters, and we don't retell long passages of the original work. Full spoilers are folded by default and only expand when the reader chooses to. The full data-source breakdown lives on our <a href={`/${lang}/editorial-policy`}>Editorial Policy</a> page.</p>
        </div>
      )}

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "目前已完成深度整理的作者" : "Authors we've fully written up"}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2 mb-10">
        {featured.map((a) => (
          <li key={a.slug}>
            <a href={`/${lang}/authors/${a.slug}`} className="block rounded-lg border border-border p-4 hover:border-accent hover:shadow-sm">
              <div className="font-medium">{a[lang]}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === "zh" ? "結局傾向 · 避雷輪廓 · 讀者顧慮 · 相近作者" : "Ending profile · warnings · reader concerns · related authors"}
              </div>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "可能更適合的入口" : "Other ways in"}
      </h2>
      <ul className="text-sm space-y-1 mb-10 list-disc pl-5">
        <li><a href={`/${lang}/books`} className="underline hover:text-accent">{lang === "zh" ? "全書庫（按書名搜尋）" : "Full book library (search by title)"}</a></li>
        <li><a href={`/${lang}/warnings`} className="underline hover:text-accent">{lang === "zh" ? "避雷標籤總覽" : "Trigger warnings hub"}</a></li>
        <li><a href={`/${lang}/collections/read-or-skip`} className="underline hover:text-accent">{lang === "zh" ? "Read-or-Skip 讀前決策" : "Read-or-Skip decision guide"}</a></li>
        <li><a href={`/${lang}/collections/romance-ending-finder`} className="underline hover:text-accent">{lang === "zh" ? "Romance Ending Finder" : "Romance Ending Finder"}</a></li>
        {BOOK_ALLOW.has("the-song-of-achilles") && <li><a href={`/${lang}/book/the-song-of-achilles`} className="underline hover:text-accent">The Song of Achilles — ending guide</a></li>}
        {BOOK_ALLOW.has("norwegian-wood") && <li><a href={`/${lang}/book/norwegian-wood`} className="underline hover:text-accent">Norwegian Wood — ending guide</a></li>}
        <li><a href={`/${lang}/editorial-policy`} className="underline hover:text-accent">{lang === "zh" ? "編輯政策" : "Editorial Policy"}</a></li>
      </ul>

      <h2 className="font-display text-xl font-semibold mb-3">FAQ</h2>
      <div className="space-y-4">
        {faq.map((f) => (
          <div key={f.q} className="rounded-lg border border-border p-4">
            <div className="font-medium mb-1">{f.q}</div>
            <div className="text-sm text-muted-foreground">{f.a}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
