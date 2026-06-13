import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

const ENDING_TYPES = [
  {
    code: "HE",
    en: { name: "Happy Ending (HE)", body: "Main characters end in a stable, hopeful place. Conflicts resolve in their favor. Best when you need comfort reading or a guaranteed soft landing." },
    zh: { name: "Happy Ending（HE）", body: "主要角色最後落在穩定、有希望的位置，主要衝突偏向圓滿。適合需要安心結局、舒適閱讀的時候。" },
  },
  {
    code: "BE",
    en: { name: "Bad / Sad Ending (BE)", body: "The ending is a loss — death, separation, defeat. Often emotionally rewarding but heavy. Don't pick BE when you're already low-energy." },
    zh: { name: "Bad / Sad Ending（BE）", body: "結局是失去——死亡、分離、失敗。情感深刻但沉重。狀態低落時不建議直接挑 BE。" },
  },
  {
    code: "OE",
    en: { name: "Open Ending (OE)", body: "The book closes without committing to a clear outcome. Readers are meant to interpret. Avoid if you need closure tonight." },
    zh: { name: "Open Ending（OE）", body: "結尾沒有給出明確答案，留給讀者解讀。今晚需要明確收束的話請避開。" },
  },
  {
    code: "BITTERSWEET",
    en: { name: "Bittersweet", body: "Gain and loss at once. Characters get part of what they wanted but pay for it. The most common 'literary' ending shape." },
    zh: { name: "苦甜（Bittersweet）", body: "同時有得失，角色得到部分想要的東西，但付出代價。也是「文學小說」最常見的結局形狀。" },
  },
  {
    code: "AMBIGUOUS",
    en: { name: "Ambiguous", body: "Even the basic facts of the ending are debated. Great for re-reading and discussion, frustrating if you wanted a verdict." },
    zh: { name: "曖昧（Ambiguous）", body: "連結局的基本事實都有爭議。適合重讀與討論，但若你想要一個明確答案會覺得不痛快。" },
  },
  {
    code: "UNKNOWN",
    en: { name: "Unknown / Not yet classified", body: "Conceptual category only — used when a book hasn't been fully classified yet. We don't currently surface 'Unknown' pages as a destination." },
    zh: { name: "Unknown（尚未分類）", body: "僅為概念分類，代表該書尚未完成結局分類。本站目前不把 Unknown 當成獨立入口推。" },
  },
];

const FAQ_EN = [
  { q: "How do you decide which ending type a book is?", a: "Editorial review of the actual ending plus reader feedback. We map to one of HE / BE / OE / Bittersweet / Ambiguous; ambiguous and bittersweet aren't synonyms — see definitions above." },
  { q: "Is HE always 'and they lived happily ever after'?", a: "No. HE means the main arc resolves positively and the central characters are in a stable place. Some loss along the way is normal." },
  { q: "What's the difference between bittersweet and ambiguous?", a: "Bittersweet has a clear outcome that mixes gain and loss. Ambiguous means the outcome itself isn't clear — the text deliberately leaves it open to interpretation." },
  { q: "Why isn't 'Unknown' a real entry point?", a: "Unknown is a holding bucket for books we haven't classified yet. Treating it as a destination would push readers to thin pages, which isn't useful." },
  { q: "Will the per-ending detail pages come back?", a: "Yes, in a later phase. We're rebuilding each one with a proper intro, FAQ, picks, and reader-decision guidance before reopening them to search." },
  { q: "Do you spoil the ending on this page?", a: "No. This page only defines the categories. Individual book pages keep full spoilers folded behind an explicit click." },
];
const FAQ_ZH = [
  { q: "結局類型是怎麼判定的？", a: "由編輯實際讀完結局並參考讀者回報，對應到 HE / BE / OE / 苦甜 / 曖昧。其中苦甜和曖昧不是同義詞，定義請看上方說明。" },
  { q: "HE 一定是「從此過著幸福快樂的日子」嗎？", a: "不一定。HE 指主線正向收束、主要角色落在穩定位置，過程中有失去仍然算正常。" },
  { q: "苦甜（Bittersweet）和曖昧（Ambiguous）差在哪？", a: "苦甜是結局明確，但同時包含得與失。曖昧是結局本身就不明確，文本刻意留給讀者解讀。" },
  { q: "為什麼 Unknown 不是入口？", a: "Unknown 只是「尚未分類」的暫存桶。把它當成入口會把使用者帶到薄頁，沒有實際價值。" },
  { q: "個別結局的 detail 頁未來會回來嗎？", a: "會。每一個結局類型 detail 頁會在後續階段重建好導讀、FAQ、精選與閱讀建議後，再重新開放索引。" },
  { q: "本頁會劇透書的結局嗎？", a: "不會。本頁只定義結局類別。個別書的完整劇透一律折疊，需要主動點擊才會展開。" },
];

export const Route = createFileRoute("/$lang/endings/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title = lang === "zh"
      ? "結局類型總覽：HE / BE / OE / 苦甜 / 曖昧 怎麼分｜NovelCheck"
      : "Ending Types Explained — HE, BE, OE, Bittersweet, Ambiguous | NovelCheck";
    const desc = lang === "zh"
      ? "一頁看懂 HE / BE / OE / 苦甜 / 曖昧的差異，挑書前先確認自己今天能承受哪一種結局。"
      : "Understand the difference between happy, sad, open, bittersweet, and ambiguous endings before you pick your next book.";
    const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `${siteUrl}/${lang}/endings` },
      ],
      links: [{ rel: "canonical", href: `${siteUrl}/${lang}/endings` }, ...langAlt("/endings")],
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
  component: EndingsIndex,
});

function EndingsIndex() {
  const lang = useLang();
  const faq = lang === "zh" ? FAQ_ZH : FAQ_EN;
  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> / <span>{lang === "zh" ? "結局類型" : "Endings"}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
        {lang === "zh" ? "結局類型總覽" : "Ending Types Explained"}
      </h1>

      {lang === "zh" ? (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>NovelCheck 把小說結局分成五個實用類別：HE（圓滿）、BE（悲傷或失去）、OE（開放）、苦甜（同時得失）、曖昧（結局本身不明確）。另外保留一個 Unknown 桶，代表本站還沒做完該書的分類；它只是運作中的暫存，不會被當成入口推給讀者。</p>
          <p>會這樣分，是因為大部分讀者真正在意的不是「這本書是奇幻還是文學」，而是「我今天能不能承受 BE」「我需要一個明確答案還是可以接受開放」。這頁不會告訴你哪一本書屬於哪一類——那是每一本書的詳細頁要做的事——而是先幫你把詞彙對齊。</p>
          <h2 className="font-display text-xl font-semibold mt-6">如何使用本頁</h2>
          <ol>
            <li>先讀下方五個結局類型的定義，確認自己今晚能接受哪一種。</li>
            <li>挑好了，再走對應的 collection，例如 <a href={`/${lang}/collections/happy-ending-books`}>HE 書單</a>、<a href={`/${lang}/collections/sad-ending-books`}>BE 書單</a>、<a href={`/${lang}/collections/open-ending-books`}>開放結局</a> 或 <a href={`/${lang}/collections/bittersweet-ending-books`}>苦甜書單</a>。</li>
            <li>對某本書的結局好奇，但又怕被雷？走 <a href={`/${lang}/books`}>全書庫</a> 點進該書詳細頁，那裡有分層劇透，完整結局預設折疊。</li>
            <li>對「該不該繼續讀下去」猶豫不決，請看 <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a>。</li>
          </ol>
        </div>
      ) : (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-foreground/90 leading-relaxed">
          <p>NovelCheck sorts novel endings into five practical buckets: HE (happy), BE (sad / loss), OE (open), Bittersweet (gain and loss together), and Ambiguous (the ending itself isn't clear). We also keep an internal "Unknown" bucket for books we haven't classified yet, but we don't promote Unknown as an entry point.</p>
          <p>The reason for these buckets is simple: what most readers actually want to know is not "is this fantasy or literary fiction?" but "can I handle a BE today?" or "do I need a definitive ending or can I sit with an open one?". This page doesn't tell you which novel is which — that's the job of each book's detail page — it lines up the vocabulary first.</p>
          <h2 className="font-display text-xl font-semibold mt-6">How to use this page</h2>
          <ol>
            <li>Read the five definitions below and decide which ending you can sit with tonight.</li>
            <li>Then go to the matching collection: <a href={`/${lang}/collections/happy-ending-books`}>HE picks</a>, <a href={`/${lang}/collections/sad-ending-books`}>BE picks</a>, <a href={`/${lang}/collections/open-ending-books`}>open endings</a>, or <a href={`/${lang}/collections/bittersweet-ending-books`}>bittersweet picks</a>.</li>
            <li>Curious about one specific book without getting spoiled? Open it from the <a href={`/${lang}/books`}>full library</a>. Each book page layers spoilers; the full ending stays folded by default.</li>
            <li>Torn on whether to keep reading at all, use <a href={`/${lang}/collections/read-or-skip`}>Read-or-Skip</a>.</li>
          </ol>
        </div>
      )}

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "五種主要結局類型" : "The five core ending types"}
      </h2>
      <ul className="space-y-3 mb-10">
        {ENDING_TYPES.map((e) => (
          <li key={e.code} className="rounded-lg border border-border p-4">
            <div className="font-medium mb-1">{e[lang].name}</div>
            <p className="text-sm text-muted-foreground">{e[lang].body}</p>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-semibold mb-3">
        {lang === "zh" ? "推薦下一步" : "Where to go next"}
      </h2>
      <ul className="text-sm space-y-1 mb-10 list-disc pl-5">
        <li><a href={`/${lang}/collections/happy-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "HE 書單" : "Happy-ending picks"}</a></li>
        <li><a href={`/${lang}/collections/sad-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "BE 書單" : "Sad-ending picks"}</a></li>
        <li><a href={`/${lang}/collections/open-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "開放結局書單" : "Open-ending picks"}</a></li>
        <li><a href={`/${lang}/collections/bittersweet-ending-books`} className="underline hover:text-accent">{lang === "zh" ? "苦甜結局書單" : "Bittersweet picks"}</a></li>
        <li><a href={`/${lang}/collections/romance-ending-finder`} className="underline hover:text-accent">{lang === "zh" ? "Romance Ending Finder" : "Romance Ending Finder"}</a></li>
        <li><a href={`/${lang}/warnings`} className="underline hover:text-accent">{lang === "zh" ? "避雷標籤總覽" : "Trigger warnings hub"}</a></li>
        <li><a href={`/${lang}/books`} className="underline hover:text-accent">{lang === "zh" ? "全書庫" : "Full book library"}</a></li>
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

      <p className="mt-8 text-xs text-muted-foreground">
        {lang === "zh"
          ? "本站不提供小說全文，不提供盜版下載，不大段複述原作情節；完整劇透預設折疊。"
          : "We do not host full book texts or pirated downloads, and we don't retell plots in long form. Full spoilers stay folded by default."}
      </p>
    </main>
  );
}
