import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

const FAQ_EN = [
  { q: "Why doesn't NovelCheck publish big genre book lists?", a: "Hundreds of sites already rank novels by genre. NovelCheck's job is the layer most lists skip — ending type, trigger warnings, spoiler layering, and a read-or-skip verdict. Genre is a coarse filter, not the main lens." },
  { q: "What should I use instead of a genre page?", a: "If you want ending-driven picks, use the ending collections (happy, sad, open, bittersweet). If you want safety-driven picks, use the trigger warnings hub. If you only know the title, search the full library." },
  { q: "Will you ever expand the genre detail pages?", a: "Yes — once a genre has enough fully written-up books to support an intro, FAQ, and ending profile, that genre page will return. For now we only keep this overview as the entry point." },
  { q: "Do you cover romance, fantasy, mystery, literary fiction?", a: "Yes, across the books we have written up. Use the collections below as the practical entry points; they cut across genre lines around reader intent." },
  { q: "Do you provide full text or summaries that replace the book?", a: "No. We do not host or link to full book texts or pirated downloads, and we don't retell plots in long form. Full spoilers always sit behind an explicit click." },
  { q: "How are books selected?", a: "Editorial selection prioritizes books readers ask about most around endings and warnings. See the Editorial Policy for details." },
];
const FAQ_ZH = [
  { q: "為什麼 NovelCheck 沒有大量類型書單？", a: "按類型排書的網站已經很多。NovelCheck 補的是大多數書單沒做的一層：結局類型、避雷標籤、分層劇透與「該讀還是該跳」的結論。類型只是粗篩，不是主要視角。" },
  { q: "那我應該用什麼入口？", a: "想按結局挑書，請看 HE / BE / OE / 苦甜 等主題清單。想避開特定內容，請看避雷標籤總覽。只記得書名，請用全書庫搜尋。" },
  { q: "個別類型的詳細頁未來會補上嗎？", a: "會。等某個類型下已經完成深度整理的書夠多、可以撐起導讀、FAQ 與結局輪廓時，該類型的詳細頁會重新開放。目前只保留這個總覽頁。" },
  { q: "你們有沒有覆蓋言情、奇幻、推理、文學小說？", a: "有，覆蓋在我們深度整理過的書裡。實用的入口是下方的主題清單，它們是跨類型按閱讀意圖切的。" },
  { q: "本站會提供小說全文或取代閱讀的長摘要嗎？", a: "不會。本站不提供小說全文、不提供盜版下載、不大段複述原作情節，完整劇透一律需要主動展開。" },
  { q: "書是怎麼挑的？", a: "編輯優先選讀者最常詢問結局與避雷的書。詳細規範請看編輯政策頁。" },
];

export const Route = createFileRoute("/$lang/genres/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "依類型瀏覽：結局與避雷視角的小說入口｜NovelCheck"
      : "Browse by Genre — Endings & Trigger-Aware Reading | NovelCheck";
    const desc = lang === "zh"
      ? "NovelCheck 不只是類型書單，而是用結局、避雷與分層劇透幫你決定要不要讀。本頁說明如何用類型視角搭配本站工具找書。"
      : "NovelCheck isn't a generic genre list — we layer endings, trigger warnings, and spoiler controls on top of genre so you can decide what to read.";
    const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `${siteUrl}/${lang}/genres` },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/genres` }, ...langAlt("/genres")],
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
  component: GenresIndex,
});

function GenresIndex() {
  const lang = useLang();
  const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{lang === "zh" ? "類型" : "Genres"}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        {lang === "zh" ? "依類型瀏覽（結局與避雷視角）" : "Browse by Genre — with Endings & Warnings"}
      </h1>

      {lang === "zh" ? (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>類型（genre）只是粗篩。NovelCheck 不打算和現有的「2024 最佳奇幻」「TOP 50 推理」這種網站搶流量，因為這些清單通常沒回答讀者最在意的問題：「結局好不好？」「會不會出現我最怕的橋段？」「能不能先看一頁就決定要不要繼續？」我們做的是把這層讀前決策疊在類型之上。</p>
          <p>因此本站不會用類型當主要入口，而是用主題清單、避雷標籤、結局類型來組織書庫。個別類型的詳細頁仍在補充內容，等該類型下深度整理的書足以撐起導讀與 FAQ，會再重新加回這個總覽頁。</p>
          <h2 className="font-display text-xl font-semibold mt-6">如何使用本頁</h2>
          <ol>
            <li>知道想看的結局：直接走 <a href={`/${lang}/collections/happy-ending-books`}>HE</a> / <a href={`/${lang}/collections/sad-ending-books`}>BE</a> / <a href={`/${lang}/collections/open-ending-books`}>開放</a> / <a href={`/${lang}/collections/bittersweet-ending-books`}>苦甜</a> 書單。</li>
            <li>有想避開的內容：先看 <a href={`/${lang}/warnings`}>避雷標籤總覽</a>，或直接看 <a href={`/${lang}/collections/pet-death-warning`}>寵物死亡避雷</a>。</li>
            <li>只想要一頁讀前判斷：用 <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a> 卡片。</li>
            <li>想用書名或作者找：走 <a href={`/${lang}/books`}>全書庫</a> 或 <a href={`/${lang}/authors`}>作者入口</a>。</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">本站不做的事</h2>
          <p>本站不提供小說全文、不提供盜版下載、不做章節重寫，所有完整劇透預設折疊。詳細編輯規範請看 <a href={`/${lang}/editorial-policy`}>編輯政策</a>。</p>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>Genre is a coarse filter. NovelCheck isn't trying to out-rank the standard "Top 50 Fantasy 2024" lists, because those lists rarely answer the questions readers actually have: does it end well? does it contain the scene I dread? can I tell in one screen whether to keep reading? Our job is to layer that decision data on top of genre.</p>
          <p>That's why genre isn't our primary entry. We organize the catalog around collections, trigger warnings, and ending type instead. Individual genre pages are still being expanded; once a given genre has enough fully written-up books to support its own intro and FAQ, it will return to this overview.</p>
          <h2 className="font-display text-xl font-semibold mt-6">How to use this page</h2>
          <ol>
            <li>If you know the ending you want, go straight to <a href={`/${lang}/collections/happy-ending-books`}>HE</a>, <a href={`/${lang}/collections/sad-ending-books`}>BE</a>, <a href={`/${lang}/collections/open-ending-books`}>open</a>, or <a href={`/${lang}/collections/bittersweet-ending-books`}>bittersweet</a> picks.</li>
            <li>If there's something you're avoiding, start at the <a href={`/${lang}/warnings`}>trigger warnings hub</a> or our <a href={`/${lang}/collections/pet-death-warning`}>pet-death warning guide</a>.</li>
            <li>If you only want a one-screen pre-read verdict, use the <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a> cards.</li>
            <li>If you have a title or author in mind, use the <a href={`/${lang}/books`}>full library</a> or the <a href={`/${lang}/authors`}>authors hub</a>.</li>
          </ol>
          <h2 className="font-display text-xl font-semibold mt-6">What this site does not do</h2>
          <p>We do not host or link to full book texts or pirated downloads, and we don't rewrite chapters. Full spoilers stay folded by default. The full editorial rulebook lives on the <a href={`/${lang}/editorial-policy`}>Editorial Policy</a> page.</p>
        </div>
      )}

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "建議從這些入口開始" : "Start here instead"}
      </h2>
      <ul className="text-sm space-y-1 mb-10 list-disc pl-5">
        <li><a href={`/${lang}/books`} className="underline hover:text-accent">{lang === "zh" ? "全書庫" : "Full book library"}</a></li>
        <li><a href={`/${lang}/warnings`} className="underline hover:text-accent">{lang === "zh" ? "避雷標籤總覽" : "Trigger warnings hub"}</a></li>
        <li><a href={`/${lang}/collections/happy-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "HE 書單" : "Happy-ending picks"}</a></li>
        <li><a href={`/${lang}/collections/sad-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "BE 書單" : "Sad-ending picks"}</a></li>
        <li><a href={`/${lang}/collections/bittersweet-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "苦甜結局書單" : "Bittersweet picks"}</a></li>
        <li><a href={`/${lang}/collections/romance-ending-finder`} className="underline hover:text-accent">{lang === "zh" ? "Romance Ending Finder" : "Romance Ending Finder"}</a></li>
        <li><a href={`/${lang}/collections/read-or-skip`} className="underline hover:text-accent">{lang === "zh" ? "Read-or-Skip 讀前決策" : "Read-or-Skip decision cards"}</a></li>
        <li><a href={`/${lang}/authors`} className="underline hover:text-accent">{lang === "zh" ? "依作者瀏覽" : "Browse by author"}</a></li>
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
