import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const APEX_HOST = "bookendingcheck.xyz";

// Server-side 301 canonicalization for the production domain:
//   - http  -> https
//   - www.bookendingcheck.xyz -> bookendingcheck.xyz
//   - trailing slash on /zh/ and /en/ language homes -> no trailing slash
// Other hosts (lovable.app preview/published, custom dev domains) are passed through unchanged.
function canonicalRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const host = url.host.toLowerCase();
  const isApex = host === APEX_HOST || host === `www.${APEX_HOST}`;
  if (!isApex) return null;

  let changed = false;

  if (url.protocol === "http:") {
    url.protocol = "https:";
    changed = true;
  }
  if (host === `www.${APEX_HOST}`) {
    url.host = APEX_HOST;
    changed = true;
  }
  if (url.pathname === "/zh/" || url.pathname === "/en/") {
    url.pathname = url.pathname.slice(0, -1);
    changed = true;
  }

  if (!changed) return null;
  // Use explicit 301 via Location header — Response.redirect() emits 302 by default
  // in the Workers runtime regardless of the status arg.
  return new Response(null, {
    status: 301,
    headers: { location: url.toString() },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = canonicalRedirect(request);
      if (redirect) return redirect;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
