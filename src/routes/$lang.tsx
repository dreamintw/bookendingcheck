import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isLang } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
