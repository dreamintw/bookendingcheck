import { createFileRoute, Link } from "@tanstack/react-router";
import { books, getAllTriggers } from "@/data/books";
import { useLang, t, type Lang } from "@/lib/i18n";
import { siteUrl, langAlt } from "@/lib/seo";

const EN_FAQ = [
  {
    q: "What are book trigger warnings?",
    a: "Book trigger warnings (also called content warnings) are short labels that flag potentially distressing themes in a novel — for example pet death, sexual violence, suicide, self-harm, or domestic abuse. They are not plot spoilers: they tell you a theme is present, not when, how, or to whom it happens. The goal is to let readers make an informed choice before opening a book.",
  },
  {
    q: "Are trigger warnings spoilers?",
    a: "No. We deliberately separate the warning code, intensity (low / mid / high), and a spoiler-soft note from the full-spoiler block. You can read the trigger profile of any book without learning the plot. The full-spoiler reveal stays collapsed by default and only opens when you click it.",
  },
  {
    q: "How does this site separate mild spoilers from full spoilers?",
    a: "Every book page is layered. Layer one is a spoiler-safe summary you can read freely. Layer two is a mild-spoiler tone note (ending tone, emotional weight, broad direction). Layer three is the full-spoiler block — collapsed by default — with concrete plot reveals. The trigger warning list lives outside the spoiler layers so you can scan it without committing to spoilers.",
  },
  {
    q: "Does this site provide full book texts?",
    a: "No. We never host the full text of any novel and we do not link to pirated downloads. The site only provides pre-read decision data: endings, trigger warnings, spoiler-safe summaries, and read-or-skip verdicts. Copyright belongs to the original authors and publishers.",
  },
  {
    q: "Can I report a missing warning?",
    a: "Yes — please email report@bookendingcheck.xyz with the book title, the warning that is missing, and any context (page range or chapter is helpful but not required). Reader-submitted corrections are how this database stays accurate.",
  },
  {
    q: "What does Unknown mean on a warning or ending tag?",
    a: "Unknown means we have not yet verified that field for that book. Treat Unknown as low confidence — the book may or may not contain the theme. We prefer to mark Unknown over guessing, because a wrong warning is worse than a missing one for the readers who rely on these tags.",
  },
];

const POPULAR_WARNINGS = [
  { slug: "pet-death", label: "Pet death" },
  { slug: "cheating", label: "Cheating / infidelity" },
  { slug: "self-harm", label: "Self-harm" },
  { slug: "suicide", label: "Suicide" },
  { slug: "sexual-violence", label: "Sexual violence" },
  { slug: "domestic-abuse", label: "Domestic abuse" },
  { slug: "major-character-death", label: "Major character death" },
];

const RELATED_COLLECTIONS = [
  { slug: "pet-death-warning", label: "Pet death warning list" },
  { slug: "cheating-warning", label: "Cheating warning list" },
  { slug: "self-harm-warning", label: "Self-harm warning list" },
  { slug: "sexual-violence-warning", label: "Sexual violence warning list" },
  { slug: "read-or-skip", label: "Read or skip picks" },
];

export const Route = createFileRoute("/$lang/warnings/")({
  head: ({ params }) => {
    const lang = (params.lang as Lang) ?? "zh";
    const title =
      lang === "zh"
        ? "避雷標籤總覽 | 讀前決策站"
        : "Book Trigger Warnings Guide — Content Warnings, Spoiler-Safe | NovelCheck";
    const desc =
      lang === "zh"
        ? "依避雷標籤瀏覽小說：自殺、自傷、性暴力、家暴、寵物死亡、外遇、成癮、霸凌、精神疾病等。"
        : "A guide to book trigger warnings and content warnings. Browse novels by warning category — pet death, cheating, self-harm, suicide, sexual violence, domestic abuse, major character death — with spoiler-safe notes and read-or-skip guidance.";

    const scripts: Array<{ type: string; children: string }> = [];
    if (lang === "en") {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: EN_FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Popular trigger warning categories",
          itemListElement: POPULAR_WARNINGS.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/en/warnings/${w.slug}`,
            name: w.label,
          })),
        }),
      });
    }

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [
        { rel: "canonical", href: `${siteUrl}/${lang}/warnings` },
        ...langAlt("/warnings"),
      ],
      scripts,
    };
  },
  component: WarningsIndex,
});

function WarningsIndex() {
  const lang = useLang();
  const all = getAllTriggers();
  return (
    <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/$lang" params={{ lang }}>{t.breadcrumbHome[lang]}</Link> /{" "}
        <span>{t.warnings[lang]}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">
        {lang === "zh" ? "避雷標籤總覽" : "Book Trigger Warnings Guide"}
      </h1>

      {lang === "en" && (
        <section className="mb-10 max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/90">
          <p>
            This is the central index for <strong>book trigger warnings</strong> (also
            called content warnings) on NovelCheck. Use it to look up which novels in
            our database contain specific themes — pet death, cheating, self-harm,
            suicide, sexual violence, domestic abuse, major character death, and
            dozens more — without spoiling the plot. Every warning links to a
            dedicated page where you can see the books carrying that tag, an
            intensity label (low, mid, high, or unknown), and a spoiler-safe note.
          </p>
          <p>
            Trigger warnings are <strong>not plot spoilers</strong>. We deliberately
            separate the warning code and intensity from the full-spoiler block, so
            you can scan a book&apos;s content profile without learning when, how, or
            to whom a scene happens. If you want more detail you can open the
            spoiler-soft layer; the full-spoiler reveal stays collapsed by default
            and only opens on a click. The goal of this site is reader decision
            support, not plot disclosure.
          </p>
          <p>
            Use this page two ways. First, as a <strong>safety filter</strong>: pick
            the warnings you want to avoid and skip every book that carries them.
            Second, as a <strong>preparation tool</strong>: read the spoiler-soft
            note for the books you are curious about, decide whether to read with
            preparation, and only open the full-spoiler block once you are sure.
            Cross-checking related warnings (for example pet death + grief, or
            self-harm + depression) usually gives a sharper picture than any single
            tag alone.
          </p>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">How to use content warnings</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground/90">
            <li>Start with the spoiler-free summary on each book page before scanning warnings.</li>
            <li>Check high-intensity warnings first — those are the most likely deal-breakers.</li>
            <li>Open the mild-spoiler layer only when you need more context than a tag gives.</li>
            <li>Open the full-spoiler block only by choice — it stays collapsed by default.</li>
            <li>Compare books with similar warning profiles to choose the safer or more prepared read.</li>
            <li>Cross-check related warnings (pet death + grief, self-harm + suicide, etc.) for a fuller picture.</li>
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold mb-3">Warning severity</h2>
          <ul className="space-y-2 text-sm text-foreground/90">
            <li><strong>High</strong> — the theme is on-page, sustained, or central to the plot. Most likely to affect sensitive readers.</li>
            <li><strong>Medium / Mid</strong> — the theme appears in concrete scenes but is bounded; aftermath or recovery is present.</li>
            <li><strong>Low</strong> — the theme is referenced, off-page, or appears briefly without graphic depiction.</li>
            <li><strong>Unknown</strong> — we have not yet verified this field for this book. Treat as low confidence and cross-check before deciding.</li>
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Popular warning categories</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {POPULAR_WARNINGS.map((w) => (
              <li key={w.slug}>
                <a href={`/en/warnings/${w.slug}`} className="text-accent hover:underline">
                  {w.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lang === "en" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold mb-3">Related reader needs</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {RELATED_COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <a href={`/en/collections/${c.slug}`} className="text-accent hover:underline">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-12">
        <h2 className="font-display text-xl font-semibold mb-4">
          {lang === "zh" ? "全部避雷標籤" : "All trigger warning tags"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {all.map((tr) => {
            const count = books.filter((b) => b.triggers.some((x) => x.code === tr.code)).length;
            return (
              <Link
                key={tr.code}
                to="/$lang/warnings/$code"
                params={{ lang, code: tr.code }}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm hover:border-accent/60 transition-colors"
              >
                {tr[lang]} <span className="text-muted-foreground text-xs">· {count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {lang === "en" && (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {EN_FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium text-base mb-1">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
