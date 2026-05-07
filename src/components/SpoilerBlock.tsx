import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { Eye, EyeOff } from "lucide-react";

export function SpoilerBlock({ level, title, children }: { level: "soft" | "hard"; title: string; children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [lang] = useLang();
  const tone = level === "hard" ? "border-destructive/40 bg-destructive/5" : "border-[color:var(--caution)]/40 bg-[color:var(--caution)]/5";
  return (
    <div className={`rounded-lg border ${tone} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-sm font-semibold">{title}</h3>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {revealed ? t.hide[lang] : t.reveal[lang]}
        </button>
      </div>
      <p className={`text-sm leading-relaxed ${revealed ? "" : "spoiler-blur"}`} onClick={() => !revealed && setRevealed(true)}>
        {children}
      </p>
    </div>
  );
}
