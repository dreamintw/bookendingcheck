import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBook, books, slugify } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { EndingBadge } from "@/components/EndingBadge";
import { DecisionCard } from "@/components/DecisionCard";
import { SpoilerBlock } from "@/components/SpoilerBlock";
import { TriggerMatrix } from "@/components/TriggerMatrix";
import { ChevronLeft, Check, X } from "lucide-react";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";
import { BOOK_ENRICHMENT } from "@/data/enrichment";
import { BOOK_ALLOW, NOINDEX_META } from "@/lib/index-allowlist";

export const Route = createFileRoute("/$lang/book/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData, params }) => {
    const b = loaderData?.book;
    const lang = (params.lang as Lang) ?? "zh";
    if (!b) return { meta: [{ title: "Not found" }] };
    // Per-slug CTR overrides for high-impression pages
    const ctrOverrides: Record<string, { en?: { title: string; desc: string }; zh?: { title: string; desc: string } }> = {
      "the-song-of-achilles": {
        en: {
          title: "The Song of Achilles Ending: Happy or Sad? Warnings & Spoilers | NovelCheck",
          desc: "Is The Song of Achilles HE, BE, or bittersweet? Get a spoiler-safe answer, major-character-death and war-violence warnings, a Read-or-Skip verdict, and optional full spoilers.",
        },
      },
      "piranesi": {
        en: {
          title: "Piranesi Ending Explained: Meaning, Happy or Sad? | NovelCheck",
          desc: "What does the Piranesi ending mean, and is it happy or sad? Start spoiler-free, check captivity and identity warnings, then open the complete ending explanation only when ready.",
        },
        zh: {
          title: "《皮拉內西》結局解析｜無雷摘要、劇透分層與閱讀建議 | NovelCheck",
          desc: "《皮拉內西》結局解析：先看無雷摘要與結局氛圍，再依需求展開劇透分層，完整劇透預設折疊，並附避雷標籤與閱讀建議。",
        },
      },
    };

    const override = ctrOverrides[b.slug]?.[lang];
    const title = override?.title ?? (lang === "zh"
      ? `《${b.title.zh}》結局與避雷標籤｜${b.author.zh} | 讀前決策站`
      : `${b.title.en} — Ending, Trigger Warnings & Verdict | NovelCheck`);
    const desc = override?.desc ?? (lang === "zh"
      ? `${b.title.zh}（${b.author.zh}）：結局類型 ${b.ending}，${b.triggers.length} 項避雷標籤，含讀 or 略決策卡。${b.summary.zh}`.slice(0, 280)
      : `${b.title.en} by ${b.author.en}: ending type ${b.ending}, ${b.triggers.length} trigger warnings, and a Read-or-Skip verdict. ${b.summary.en}`.slice(0, 280));

    const indexable = BOOK_ALLOW.has(b.slug);
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "book" },
        ...(indexable ? [] : [NOINDEX_META]),
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/book/${b.slug}` },
        ...langAlt(`/book/${b.slug}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: b.title[lang],
            alternateName: lang === "zh" ? b.title.en : b.title.zh,
            author: { "@type": "Person", name: b.author[lang] },
            datePublished: String(b.year),
            genre: b.genre[lang],
            isbn: b.isbn,
            description: b.summary[lang],
            inLanguage: lang,
            url: `${siteUrl}/${lang}/book/${b.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd([
            { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
            { name: lang === "zh" ? "作品庫" : "Books", url: `${siteUrl}/${lang}/books` },
            { name: b.title[lang], url: `${siteUrl}/${lang}/book/${b.slug}` },
          ])),
        },
        ...(BOOK_ENRICHMENT[b.slug]?.faq?.length
          ? [{
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: BOOK_ENRICHMENT[b.slug].faq.map((f) => ({
                  "@type": "Question",
                  name: f.q[lang],
                  acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
                })),
              }),
            }]
          : []),
      ],
    };
  },
  notFoundComponent: NotFound,
  component: BookDetail,
});

function NotFound() {
  const lang = useLang();
  return (
    <main className="flex-1 flex items-center justify-center text-center px-4 py-20">
      <div>
        <h1 className="font-display text-3xl mb-2">{t.notFound[lang]}</h1>
        <Link to="/$lang" params={{ lang }} className="text-accent hover:underline">{t.backHome[lang]}</Link>
      </div>
    </main>
  );
}

const CTR_HERO: Record<string, { en?: { h1: string; intro: string }; zh?: { h1: string; intro: string } }> = {
  "the-song-of-achilles": {
    en: {
      h1: "Does The Song of Achilles Have a Happy or Sad Ending?",
      intro: "Short answer: it is not a happy ending. Madeline Miller's retelling closes on loss and grief rather than a HE, and we classify it as BE. Beyond that one-line answer, this page gives you why we file it as sad rather than bittersweet, the major-character-death and war-violence warnings, how emotionally intense the final stretch is, a Read-or-Skip verdict, and full spoilers folded away so you only open them if you have already decided you want the details.",
    },
  },
  "piranesi": {
    en: {
      h1: "Piranesi Ending Explained: What Does It Mean?",
      intro: "Susanna Clarke's Piranesi ends on an ambiguous note rather than a clean happy or sad one, and this page explains what that ending means in layers. You start spoiler-free with the ending tone and what the House stands for, then get the captivity, gaslighting and identity-erasure warnings, then a Read-or-Skip verdict. The complete ending explanation sits in a collapsed block near the bottom, so you can stop at whichever layer suits you.",
    },
    zh: {
      h1: "《皮拉內西》結局解析",
      intro: "本頁以分層方式說明《皮拉內西》的結局。先提供無雷摘要與結局氛圍，再給出微雷走向，最後才是完整劇透。完整劇透預設折疊，你可以停在任一層級，依自己的需求決定要不要繼續往下看。下方同時附上避雷標籤與閱讀建議。",
    },
  },
};

// Extra long-form sections for the two highest-impression English pages.
// Each block is hand-written and must not restate the existing "Ending tone
// explained" copy.
const CTR_SECTIONS: Record<string, { en?: { heading: string; body: string[] } }> = {
  "the-song-of-achilles": {
    en: {
      heading: "Happy, sad, or bittersweet?",
      body: [
        "We file The Song of Achilles as BE rather than bittersweet, and the distinction matters if you are choosing a book for a specific mood. In our taxonomy, bittersweet means the loss is offset by something the surviving characters get to keep and use: a future, a changed life, a relationship that continues in a different shape. Sad, or BE, means the loss is the final state — the book stops while the grief is still the loudest thing in the room, and nothing in the last pages is offered as compensation.",
        "Readers who call it bittersweet are usually responding to two real things. The first is the tenderness of the first half, which is warm enough that many people finish the book remembering the intimacy as strongly as the ending. The second is the sense of resolution in the closing pages: the novel does grant a quiet, formal kind of closure rather than ending mid-collapse, and that closure can read as consoling. Both readings are fair descriptions of the experience.",
        "Our classification tracks outcome, not aftertaste. Because the outcome is loss with no restored future, the ending is BE by our rules, even though the tone of the final pages is gentler than the events. Practically: if you want a book that hurts and then hands you something to hold, this is not it. If you want a book that hurts beautifully and asks you to sit with it, it is. The trigger matrix below and the folded full spoilers will tell you how much intensity you are signing up for before you commit.",
      ],
    },
  },
  "piranesi": {
    en: {
      heading: "What does the Piranesi ending mean?",
      body: [
        "The ending of Piranesi is about who you are after a place has finished making you. The narrator spends the novel with an identity that was not chosen and a name that was not his, and the ending has to answer a harder question than whether he escapes: whether the person the House produced is someone worth continuing to be. Clarke's answer is not a restoration. Nothing rewinds him to who he was before, and the novel does not treat that as a failure.",
        "Loss runs in both directions here, which is why readers often find the last pages harder to categorise than the plot events suggest. There is loss of the years and the self that were taken, and there is also loss of the House itself — a world that was genuinely beautiful to him, and genuinely a cage. Grieving something that harmed you is a strange, specific feeling, and the ending is built to hold both truths without asking you to pick one.",
        "That is the double meaning the book keeps circling. The House is captivity and it is also the source of the narrator's attention, gentleness and capacity for wonder; those qualities are not damage, they are his. The ending declines to declare the House either a prison to be denounced or a home to be idealised, and it declines to say his current self is a lesser draft of an earlier one.",
        "So the mood is acceptance rather than triumph or defeat. He carries what the House gave him into a life that is not organised around it, and the novel closes with that continuity intact rather than resolved. If you need to know exactly which choices and images carry that acceptance in the final chapter, open the collapsed full explanation below — everything above this line stays spoiler-safe.",
      ],
    },
  },
};

// SSR-rendered but collapsed by default: the text ships in the raw HTML inside
// a <details>, so crawlers can read it while readers must actively expand.
const FULL_SPOILER_DETAILS: Record<string, { en?: { summary: string; body: string[] } }> = {
  "piranesi": {
    en: {
      summary: "Full spoilers — the complete Piranesi ending explained (click to expand)",
      body: [
        "Spoilers from here. The narrator is not a native of the House. He is Matthew Rose Sorensen, a researcher who was lured into the labyrinth by Val Ketterley, an academic who used the world as a private resource and used the people he brought there as disposable labour. Sorensen's memory was stripped by the House itself, and the identity that grew in its place — the gentle, meticulous, deeply attentive Piranesi — is the person the reader has spent the book with and come to like.",
        "The ending's central tension is therefore not escape but succession. Recovering Sorensen's records and history does not delete Piranesi, and returning to the world does not restore Sorensen. What emerges is a third person who holds both: someone who remembers the researcher's life as documented fact and the House's years as lived experience, and who does not rank one above the other. Clarke stages the rescue so that the practical danger resolves while this identity question stays deliberately open.",
        "Ketterley's exposure and the intervention that ends the captivity are handled almost briskly, which is a choice. The novel refuses to let the thriller machinery become the point. What it lingers on instead is the narrator standing in ordinary modern surroundings and still reading them with the House's habits of attention — noticing weather, kindness, and the shape of things as if they were statues in a hall.",
        "The final movement is the return. He goes back, or wants to go back, not because he is broken but because the House is where his sense of meaning was formed, and the novel treats that as legitimate rather than pathological. Nothing declares whether he will settle in either world. That refusal is the meaning: the book argues that a self assembled inside captivity is still a real self, that grief and gratitude can be aimed at the same place, and that acceptance — not rescue, not vengeance — is the only honest ending available to him.",
      ],
    },
  },
};


function BookDetail() {
  const { book } = Route.useLoaderData();
  const lang = useLang();
  const related = books.filter((b) => b.slug !== book.slug && b.ending === book.ending).slice(0, 3);
  const hero = CTR_HERO[book.slug]?.[lang];
  const extraSection = lang === "en" ? CTR_SECTIONS[book.slug]?.en : undefined;
  const fullDetails = lang === "en" ? FULL_SPOILER_DETAILS[book.slug]?.en : undefined;



  return (
    <main className="mx-auto max-w-4xl w-full px-4 py-10 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/books" params={{ lang }}>{t.books[lang]}</Link> /{" "}
        <span>{book.title[lang]}</span>
      </nav>
      <Link to="/$lang/books" params={{ lang }} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> {t.books[lang]}
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <EndingBadge ending={book.ending} full />
          <span className="text-xs text-muted-foreground">{book.year} · {book.genre[lang]}</span>
          {book.isbn && <span className="text-xs text-muted-foreground">ISBN {book.isbn}</span>}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-2">
          {hero?.h1 ?? book.title[lang]}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.by[lang]}{" "}
          <Link
            to="/$lang/authors/$slug"
            params={{ lang, slug: slugify(book.author.en) }}
            className="text-foreground hover:text-accent hover:underline"
          >
            {book.author[lang]}
          </Link>
          {lang === "zh" && <span className="text-sm ml-2">／ {book.title.en}</span>}
        </p>
      </header>

      {hero?.intro && (
        <section className="mb-8 rounded-xl border border-border bg-card p-5">
          <p className="text-base leading-relaxed text-foreground/90">{hero.intro}</p>
        </section>
      )}



      <div className="rounded-2xl border border-border bg-card p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t.decision[lang]}</p>
          <h2 className="font-display text-xl font-semibold">{book.title[lang]}</h2>
        </div>
        <DecisionCard decision={book.decision} confidence={book.confidence} />
      </div>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-3">{t.summary[lang]}</h2>
        <p className="text-base leading-relaxed text-foreground/90">{book.summary[lang]}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-10">
        <SpoilerBlock level="soft" title={t.spoilerSoft[lang]}>{book.spoilerSoft[lang]}</SpoilerBlock>
        <SpoilerBlock level="hard" title={t.spoilerHard[lang]}>{book.spoilerHard[lang]}</SpoilerBlock>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">{t.triggers[lang]}</h2>
        <div className="rounded-xl border border-border bg-card p-5">
          <TriggerMatrix triggers={book.triggers} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-[color:var(--read)]/30 bg-[color:var(--read)]/5 p-5">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-[color:var(--read)]">
            <Check className="h-4 w-4" /> {t.whoFor[lang]}
          </h3>
          <ul className="space-y-1.5 text-sm">
            {book.whoFor[lang].map((line: string) => <li key={line}>· {line}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-destructive">
            <X className="h-4 w-4" /> {t.whoNot[lang]}
          </h3>
          <ul className="space-y-1.5 text-sm">
            {book.whoNot[lang].map((line: string) => <li key={line}>· {line}</li>)}
          </ul>
        </div>
      </section>

      {(() => {
        const en = BOOK_ENRICHMENT[book.slug];
        if (!en) return null;
        const sameEnding = (en.similarByEnding ?? []).map((s) => books.find((b) => b.slug === s)).filter(Boolean);
        const sameWarning = (en.similarByWarning ?? []).map((s) => books.find((b) => b.slug === s)).filter(Boolean);
        return (
          <>
            <section className="mb-10 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold mb-2">{lang === "zh" ? "結局調性說明" : "Ending tone explained"}</h2>
                <p className="text-sm leading-relaxed text-foreground/90">{en.endingTone[lang]}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold mb-2">{lang === "zh" ? "主要避雷標籤說明" : "Main trigger warnings explained"}</h2>
                <p className="text-sm leading-relaxed text-foreground/90">{en.warningsExplained[lang]}</p>
              </div>
            </section>
            <section className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h2 className="font-display text-lg font-semibold mb-2">{lang === "zh" ? "免雷判決" : "Spoiler-safe verdict"}</h2>
              <p className="text-sm leading-relaxed text-foreground/90">{en.verdict[lang]}</p>
            </section>
            {sameWarning.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-lg font-semibold mb-3">{lang === "zh" ? "避雷標籤相近的書" : "Similar warning profile"}</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {sameWarning.map((r: any) => (
                    <Link key={r.slug} to="/$lang/book/$slug" params={{ lang, slug: r.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-accent/60">
                      <EndingBadge ending={r.ending} />
                      <p className="font-display font-semibold mt-2">{r.title[lang]}</p>
                      <p className="text-xs text-muted-foreground">{r.author[lang]}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            <section className="mb-10">
              <h2 className="font-display text-lg font-semibold mb-3">FAQ</h2>
              <dl className="space-y-3">
                {en.faq.map((f, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <dt className="font-medium mb-1">{f.q[lang]}</dt>
                    <dd className="text-sm text-muted-foreground">{f.a[lang]}</dd>
                  </div>
                ))}
              </dl>
            </section>
            {(en.relatedLinks?.length ?? 0) > 0 && (
              <section className="mb-10 rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold mb-3">
                  {lang === "zh" ? "延伸閱讀清單" : "Where to go next"}
                </h2>
                <ul className="space-y-2 text-sm">
                  {en.relatedLinks!.map((rl) => (
                    <li key={rl.path}>
                      <a href={`/${lang}${rl.path}`} className="text-accent hover:underline">
                        {rl.label[lang]}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        );
      })()}

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold mb-4">{t.relatedEnding[lang]}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map((r) => (
              <Link key={r.slug} to="/$lang/book/$slug" params={{ lang, slug: r.slug }} className="rounded-lg border border-border bg-card p-4 hover:border-accent/60 transition-colors">
                <EndingBadge ending={r.ending} />
                <p className="font-display font-semibold mt-2">{r.title[lang]}</p>
                <p className="text-xs text-muted-foreground">{r.author[lang]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
