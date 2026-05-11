import { createFileRoute, redirect } from "@tanstack/react-router";

// Server-side 308 permanent redirect from "/" to "/en" (default language home).
// 308 preserves method semantics and signals permanence to crawlers; this avoids
// "/" being treated as a parallel canonical of the language home pages.
export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    throw redirect({
      to: "/$lang",
      params: { lang: "en" },
      search: location.search as never,
      statusCode: 308,
    });
  },
});
