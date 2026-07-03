import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { books, getWarning } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { BookCard } from "@/components/BookCard";
import { siteUrl, langAlt, breadcrumbJsonLd } from "@/lib/seo";
import { NOINDEX_META, WARNING_ALLOW, BOOK_ALLOW } from "@/lib/index-allowlist";
import { WARNING_ENRICHMENT } from "@/data/enrichment";
import { WARNING_CONTENT, CURATED_BY_WARNING } from "@/data/warning-content";

function isEnriched(code: string): boolean {
  return code in WARNING_CONTENT;
}

export const Route = createFileRoute("/$lang/warnings/$code")({
  loader: ({ params }) => {
    const tr = getWarning(params.code);
    if (!tr) throw notFound();
    return { trigger: tr };
  },
  head: ({ loaderData, params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const tr = loaderData?.trigger;
    if (!tr) return { meta: [{ title: "Not found" }] };
    const code = params.code;
    const canonical = `${siteUrl}/${lang}/warnings/${code}`;
    const indexed = WARNING_ALLOW.has(code) && isEnriched(code);

    if (indexed) {
      const side = WARNING_CONTENT[code][lang];
      const curated = (CURATED_BY_WARNING[code] ?? [])
        .filter((slug) => BOOK_ALLOW.has(slug))
        .map((slug) => books.find((b) => b.slug === slug))
        .filter((b): b is NonNullable<typeof b> => Boolean(b))
        .filter((b) => b.triggers.some((x) => x.code === code));

      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: side.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const scripts: { type: string; children: string }[] = [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
              { name: lang === "zh" ? "避雷標籤" : "Trigger Warnings", url: `${siteUrl}/${lang}/warnings` },
              { name: tr[lang], url: canonical },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
      ];
      if (curated.length >= 3) {
        const itemListLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: curated.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/${lang}/book/${b.slug}`,
            name: lang === "zh" ? b.title.zh : b.title.en,
          })),
        };
        scripts.push({ type: "application/ld+json", children: JSON.stringify(itemListLd) });
      }
      return {
        meta: [
          { title: side.title },
          { name: "description", content: side.metaDescription },
          { property: "og:title", content: side.title },
          { property: "og:description", content: side.metaDescription },
          { property: "og:url", content: canonical },
        ],
        links: [
          { rel: "canonical", href: canonical },
          ...langAlt(`/warnings/${code}`),
        ],
        scripts,
      };
    }

    // Non-enriched — keep noindex, thin fallback.
    const label = tr[lang];
    const title =
      lang === "zh"
        ? `避雷標籤：${label} 的小說一覽 | 讀前決策站`
        : `Books tagged "${label}" | NovelCheck`;
    const desc =
      lang === "zh"
        ? `所有含「${label}」避雷標籤的小說，附結局類型與讀 or 略決策。`
        : `All novels tagged with "${label}", with ending type and a Read-or-Skip verdict.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        NOINDEX_META,
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...langAlt(`/warnings/${code}`),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: lang === "zh" ? "首頁" : "Home", url: `${siteUrl}/${lang}` },
              { name: lang === "zh" ? "避雷標籤" : "Trigger Warnings", url: `${siteUrl}/${lang}/warnings` },
              { name: label, url: canonical },
            ]),
          ),
        },
      ],
    };
  },
  component: WarningDetail,
});

function WarningDetail() {
  const lang = useLang();
  const { trigger } = Route.useLoaderData();
  const code = trigger.code;

  if (isEnriched(code)) {
    const side = WARNING_CONTENT[code][lang];
    const curated = (CURATED_BY_WARNING[code] ?? [])
      .filter((slug) => BOOK_ALLOW.has(slug))
      .map((slug) => books.find((b) => b.slug === slug))
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .filter((b) => b.triggers.some((x) => x.code === code));

    const heading = {
      counts: lang === "zh" ? "什麼算 / 什麼不算" : "What counts as this warning",
      yes: lang === "zh" ? "算是這個避雷" : "This is tagged when…",
      no: lang === "zh" ? "不算這個避雷" : "This is NOT tagged just because…",
      spoiler: lang === "zh" ? "劇透分層" : "Spoiler levels",
      spoilerFree: lang === "zh" ? "免雷層級" : "Spoiler-free",
      spoilerMild: lang === "zh" ? "輕度劇透層級" : "Mild spoiler",
      spoilerFull: lang === "zh" ? "完整劇透層級" : "Full spoiler",
      severity: lang === "zh" ? "嚴重程度與可信度" : "Severity and confidence",
      guidance: lang === "zh" ? "讀者使用建議" : "Reader guidance",
      picks: lang === "zh" ? "本站已確認的相關作品" : "Curated books with this warning",
      related: lang === "zh" ? "相關避雷與延伸閱讀" : "Related warnings",
      faq: lang === "zh" ? "常見問題" : "Frequently asked questions",
      policy: lang === "zh" ? "資料與版權說明" : "Editorial and content notes",
    };

    return (
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
          <Link to="/$lang/warnings" params={{ lang }}>{t.warnings[lang]}</Link> /{" "}
          <span>{trigger[lang]}</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            {side.h1}
          </h1>
        </header>

        <section className="prose prose-neutral dark:prose-invert max-w-none space-y-4 mb-10">
          {side.intro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed">{p}</p>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.counts}</h2>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">{heading.yes}</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {side.whatCounts.yes.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">{heading.no}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {side.whatCounts.no.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
          {side.whatCounts.note && (
            <p className="mt-4 text-sm text-muted-foreground italic">{side.whatCounts.note}</p>
          )}
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.spoiler}</h2>
          <dl className="space-y-3 text-base">
            <div>
              <dt className="font-semibold">{heading.spoilerFree}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{side.spoilerLevels.free}</dd>
            </div>
            <div>
              <dt className="font-semibold">{heading.spoilerMild}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{side.spoilerLevels.mild}</dd>
            </div>
            <div>
              <dt className="font-semibold">{heading.spoilerFull}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{side.spoilerLevels.full}</dd>
            </div>
          </dl>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.severity}</h2>
          <p className="text-base leading-relaxed">{side.severity}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.guidance}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {side.readerGuidance.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.picks}</h2>
          {curated.length === 0 ? (
            <p className="text-muted-foreground text-sm">{side.picksEmpty}</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">{side.picksIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {curated.map((b) => <BookCard key={b.slug} book={b} />)}
              </div>
              {curated.length < 3 && (
                <p className="mt-4 text-sm text-muted-foreground">{side.picksEmpty}</p>
              )}
            </>
          )}
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.related}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {side.related.map((r) => (
              <li key={r.href}><a href={r.href} className="underline">{r.label}</a></li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">{heading.faq}</h2>
          <div className="space-y-4">
            {side.faq.map((f, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-1">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="font-display text-lg font-semibold mb-2">{heading.policy}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{side.policyNote}</p>
        </section>
      </main>
    );
  }

  // Fallback (noindex) — original thin list view, with existing enrichment if any.
  const list = books.filter((b) => b.triggers.some((x) => x.code === code));
  const enrich = WARNING_ENRICHMENT[code];
  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <Link to="/$lang/warnings" params={{ lang }}>{t.warnings[lang]}</Link> / <span>{trigger[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">{trigger[lang]}</h1>
      <p className="text-muted-foreground mb-8">
        {lang === "zh"
          ? `共 ${list.length} 本含此避雷標籤的小說。`
          : `${list.length} book${list.length === 1 ? "" : "s"} tagged with this warning.`}
      </p>

      {enrich && (
        <section className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold mb-3">
            {lang === "zh" ? "如何使用這個頁面" : "How to use this page"}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90">{enrich.howToUse[lang]}</p>
        </section>
      )}

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {lang === "zh"
            ? "目前資料庫尚未收錄含此標籤的作品，但本頁仍持續更新。"
            : "No books in our database carry this tag yet — the page updates as new titles are added."}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => <BookCard key={b.slug} book={b} />)}
        </div>
      )}
    </main>
  );
}
