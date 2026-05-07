import type { Decision } from "@/data/books";
import { useLang, t } from "@/lib/i18n";
import { Check, X, AlertTriangle } from "lucide-react";

export function DecisionCard({ decision }: { decision: Decision }) {
  const [lang] = useLang();
  const map = {
    read: { label: t.read[lang], Icon: Check, cls: "border-[color:var(--read)] bg-[color:var(--read)]/10 text-[color:var(--read)]" },
    skip: { label: t.skip[lang], Icon: X, cls: "border-[color:var(--skip)] bg-[color:var(--skip)]/10 text-[color:var(--skip)]" },
    caution: { label: t.caution[lang], Icon: AlertTriangle, cls: "border-[color:var(--caution)] bg-[color:var(--caution)]/10 text-[color:var(--caution)]" },
  }[decision];
  const { Icon } = map;
  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-display text-base font-semibold ${map.cls}`}>
      <Icon className="h-5 w-5" />
      {map.label}
    </div>
  );
}
