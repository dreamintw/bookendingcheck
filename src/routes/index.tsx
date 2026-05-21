import { createFileRoute, redirect } from "@tanstack/react-router";

// Server-side 301 permanent redirect from "/" to absolute "/en" URL.
// Using an absolute Location URL and 301 (instead of 308) matches the most
// widely-understood signal for permanent canonical redirects in Google Search.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      href: "https://bookendingcheck.xyz/en",
      statusCode: 301,
    });
  },
});
