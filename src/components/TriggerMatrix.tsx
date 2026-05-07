import type { Trigger } from "@/data/books";
import { useLang, t } from "@/lib/i18n";

const intensityCls = {
  low: "bg-[color:var(--he)]/15 text-[color:var(--he)] border-[color:var(--he)]/30",
  mid: "bg-[color:var(--caution)]/15 text-[color:var(--caution)] border-[color:var(--caution)]/40",
  high: "bg-destructive/15 text-destructive border-destructive/40",
};

export function TriggerMatrix({ triggers }: { triggers: Trigger[] }) {
  const [lang] = useLang();
  if (triggers.length === 0) {
    return <p className="text-sm text-muted-foreground">—</p>;
  }
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
          <th className="py-2 font-medium">{t.triggers[lang]}</th>
          <th className="py-2 font-medium w-24 text-right">{t.intensity[lang]}</th>
        </tr>
      </thead>
      <tbody>
        {triggers.map((tr) => (
          <tr key={tr.code} className="border-b border-border/60 last:border-0">
            <td className="py-2.5">{tr[lang]}</td>
            <td className="py-2.5 text-right">
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${intensityCls[tr.intensity]}`}>
                {t[tr.intensity === "low" ? "low" : tr.intensity === "mid" ? "med" : "high"][lang]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
