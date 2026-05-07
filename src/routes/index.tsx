import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    // Detect lang from Accept-Language hint isn't available here without request.
    // Default to /zh; users can switch.
    throw redirect({ to: "/$lang", params: { lang: "zh" }, search: location.search as never });
  },
});
