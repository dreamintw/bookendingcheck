import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { Eye, EyeOff, Lock } from "lucide-react";

export function SpoilerBlock({ level, title, children }: { level: "soft" | "hard"; title: string; children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(level === "soft");
  const lang = useLang();
  const tone = level === "hard" ? "border-destructive/40 bg-destructive/5" : "border-[color:var(--caution)]/40 bg-[color:var(--caution)]/5";
  return (
    <div className={`rounded-lg border ${tone} p-4`}>
      <div className="flex items-center justify-between mb-2 gap-2">
        <h3 className="font-display text-sm font-semibold flex items-center gap-1.5">
          {level === "hard" && <Lock className="h-3.5 w-3.5" />} {title}
        </h3>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {revealed ? t.hide[lang] : t.reveal[lang]}
        </button>
      </div>
      {revealed ? (
        <p className="text-sm leading-relaxed">{children}</p>
      ) : (
        <button onClick={() => setRevealed(true)} className="text-sm leading-relaxed text-left w-full spoiler-blur cursor-pointer">
          {children}
        </button>
      )}
    </div>
  );
}
