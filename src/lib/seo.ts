export const siteUrl = "https://bookendingcheck.xyz";

export function langAlt(path: string) {
  // path should start with "/" and NOT include /zh or /en
  const clean = path.startsWith("/") ? path : `/${path}`;
  const zhHref = `${siteUrl}/zh${clean === "/" ? "" : clean}`;
  const enHref = `${siteUrl}/en${clean === "/" ? "" : clean}`;
  return [
    { rel: "alternate", hrefLang: "zh", href: zhHref },
    { rel: "alternate", hrefLang: "en", href: enHref },
    { rel: "alternate", hrefLang: "x-default", href: enHref },
  ];
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
