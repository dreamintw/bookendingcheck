import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";
import { COLLECTION_ALLOW } from "@/lib/index-allowlist";

const FAQ_EN = [
  { q: "What is a NovelCheck collection?", a: "A collection is an editorial entry point organized around a reader need — happy endings, sad endings, pet-death warning, romance ending finder, read-or-skip — not around a genre or author." },
  { q: "Why use a collection instead of just browsing books?", a: "Collections answer the question you actually have ('does it end happily?', 'will my cat die?'). The full library is sorted by title and metadata; collections are sorted by intent." },
  { q: "Do the collections contain spoilers?", a: "Collection pages stay spoiler-safe. They tell you the ending type, the warnings, and a short verdict. Full spoilers only appear behind expanded blocks on each book's detail page." },
  { q: "Why don't I see every collection here?", a: "For now we only surface collections that already have a full intro, FAQ, curated picks, and a verdict. Other collections are still being expanded and will return once they meet the same editorial standard." },
  { q: "Do you provide the full text of any novel?", a: "No. NovelCheck does not host or link to pirated downloads, full chapters, or long plot retellings. We summarize so you can decide; we don't replace the book." },
  { q: "How do I suggest a new collection?", a: "Email report@bookendingcheck.xyz with the reader need you want covered and any example titles. Copyright concerns go to copyright@bookendingcheck.xyz." },
];
const FAQ_ZH = [
  { q: "主題清單（collection）是什麼？", a: "主題清單是按讀者需求整理的入口，例如 HE 書單、BE 書單、寵物死亡避雷、Romance Ending Finder、Read-or-Skip，不是按類型或作者切分。" },
  { q: "為什麼要看主題清單而不是直接瀏覽全書庫？", a: "主題清單回答的是你真正會問的問題（「會 HE 嗎？」「小貓會死嗎？」）。全書庫只能按書名與書籍資訊排序，主題清單是按閱讀意圖排序。" },
  { q: "主題清單頁會有劇透嗎？", a: "主題清單頁本身保持無雷，只給出結局類型、避雷標籤與一句話結論。完整劇透只會出現在每本書詳細頁的展開區塊裡。" },
  { q: "為什麼不是每個主題清單都看得到？", a: "目前只公開已經寫好導讀、FAQ、精選與結論的主題清單。其他主題清單仍在補充內容，完成後會逐步開放。" },
  { q: "本站會提供小說全文嗎？", a: "不會。本站不提供小說全文、不提供盜版下載，也不大段複述原作情節。我們做的是「幫你決定要不要讀」，不是取代閱讀。" },
  { q: "我想建議新的 collection 怎麼辦？", a: "請寄信至 report@bookendingcheck.xyz，描述你希望覆蓋的讀者需求與相關書目。版權問題請寄 copyright@bookendingcheck.xyz。" },
];

export const Route = createFileRoute("/$lang/collections/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "主題清單｜依讀者需求挑下一本書｜NovelCheck"
      : "Collections — Browse by Reader Need | NovelCheck";
    const desc = lang === "zh"
      ? "HE / BE / 開放結局 / 寵物死亡避雷 / Romance Ending Finder / Read-or-Skip：依你目前的閱讀需求挑下一本書。"
      : "Happy endings, sad endings, pet-death warnings, romance ending finder, read-or-skip — pick the entry that matches your need.";
    const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `${siteUrl}/${lang}/collections` },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/collections` }, ...langAlt("/collections")],
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
  component: CollectionsIndex,
});

function CollectionsIndex() {
  const lang = useLang();
  const featured = collections.filter((c) => COLLECTION_ALLOW.has(c.slug));
  const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{lang === "zh" ? "主題清單" : "Collections"}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        {lang === "zh" ? "依讀者需求瀏覽" : "Browse by Reader Need"}
      </h1>

      {lang === "zh" ? (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>主題清單（collection）是 NovelCheck 最常被使用的入口。它不是按類型（奇幻、推理、文學小說）切分的書單，而是按「你現在實際要解決的問題」切分：今天想要保證 HE 才敢翻、想避開寵物死亡情節、想知道一本浪漫小說最後到底有沒有在一起、想看一頁就決定要不要繼續讀。每個主題清單都附有導讀、精選書目、結論卡片與 FAQ，而不是只丟一個標籤給你。</p>
          <p>本頁目前只公開已經完成深度整理的主題清單。其他主題清單仍在補充導讀與 FAQ，完成後會逐步加回這個入口，避免在尚未寫好時就推給讀者。</p>
          <h2 className="font-display text-xl font-semibold mt-6">如何使用本頁</h2>
          <ol>
            <li>從下方挑一個最貼近你目前需求的主題清單，30 秒內就能拿到一份精選清單與一句話結論。</li>
            <li>不確定要 HE 還是 BE？先看 <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a> 卡片。</li>
            <li>想避開特定內容，搭配 <a href={`/${lang}/warnings`}>避雷標籤總覽</a> 一起看。</li>
            <li>想用作者或書名查，回 <a href={`/${lang}/authors`}>作者入口</a> 或 <a href={`/${lang}/books`}>全書庫</a>。</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">本站不做的事</h2>
          <p>本站不提供小說全文、不提供盜版下載、不大段複述原作情節，所有完整劇透預設折疊。資料來源與編輯規範請看 <a href={`/${lang}/editorial-policy`}>編輯政策</a>。</p>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>Collections are the most-used entry point on NovelCheck. They are not genre buckets (fantasy, mystery, literary fiction). They're organized around the question you actually have right now: "I only want to start it if the ending is happy", "I need to avoid pet-death scenes today", "in this romance, do they actually end up together?", "should I keep reading or skip this one?". Each collection ships with an intro, a curated pick list, a verdict card, and an FAQ — not a bare tag page.</p>
          <p>For now we only surface collections that have been written up in full. Other collections are still being expanded and will return to this hub once they meet the same editorial standard.</p>
          <h2 className="font-display text-xl font-semibold mt-6">How to use this page</h2>
          <ol>
            <li>Pick the collection closest to what you actually need. You'll get a curated list and a one-line verdict in under thirty seconds.</li>
            <li>Not sure whether you want HE or BE? Start with <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a>.</li>
            <li>Avoiding specific content? Pair this with the <a href={`/${lang}/warnings`}>trigger warnings hub</a>.</li>
            <li>Searching by author or title? Use the <a href={`/${lang}/authors`}>authors hub</a> or the <a href={`/${lang}/books`}>full library</a>.</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">What this site does not do</h2>
          <p>We do not host or link to full book texts or pirated downloads, and we don't retell plots in long form. Full spoilers stay folded by default. Source-of-data and editorial rules are documented on our <a href={`/${lang}/editorial-policy`}>Editorial Policy</a> page.</p>
        </div>
      )}

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "目前精選主題清單" : "Featured collections"}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 mb-10">
        {featured.map((c) => (
          <li key={c.slug}>
            <a href={`/${lang}/collections/${c.slug}`} className="block rounded-lg border border-border p-4 hover:border-accent hover:shadow-sm">
              <div className="font-medium">{c.h1[lang]}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description[lang]}</div>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "其他入口" : "Other ways in"}
      </h2>
      <ul className="text-sm space-y-1 mb-10 list-disc pl-5">
        <li><a href={`/${lang}/books`} className="underline hover:text-accent">{lang === "zh" ? "全書庫" : "Full book library"}</a></li>
        <li><a href={`/${lang}/authors`} className="underline hover:text-accent">{lang === "zh" ? "依作者瀏覽" : "Browse by author"}</a></li>
        <li><a href={`/${lang}/warnings`} className="underline hover:text-accent">{lang === "zh" ? "避雷標籤總覽" : "Trigger warnings hub"}</a></li>
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

      <p className="mt-8 text-xs text-muted-foreground">{t.noFullText[lang]}</p>
    </main>
  );
}
